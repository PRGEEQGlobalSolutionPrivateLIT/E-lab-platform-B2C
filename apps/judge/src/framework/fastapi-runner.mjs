import {

  execFile,

} from 'node:child_process';

import {

  mkdtemp,

  mkdir,

  rm,

  writeFile,

} from 'node:fs/promises';

import {

  tmpdir,

} from 'node:os';

import {

  dirname,

  join,

  relative,

  resolve,

  sep,

} from 'node:path';

import {

  promisify,

} from 'node:util';

const execFileAsync =

  promisify(execFile);

const FASTAPI_IMAGE =

  process.env.FASTAPI_IMAGE ||

  'elab-judge-fastapi:latest';

const EXECUTION_TIMEOUT_MS =

  Number(

    process.env

      .FASTAPI_EXECUTION_TIMEOUT_MS ||

      30000,

  );

const MEMORY_LIMIT =

  process.env.FASTAPI_MEMORY_LIMIT ||

  '512m';

const CPU_LIMIT =

  process.env.FASTAPI_CPU_LIMIT ||

  '1.0';

const PIDS_LIMIT =

  process.env.FASTAPI_PIDS_LIMIT ||

  '128';

const MAX_BUFFER =

  10 * 1024 * 1024;

/* =========================================================

   OUTPUT

\\========================================================= */

function normalizeOutput(

  value,

) {

  return String(

    value ?? '',

  )

    .replace(

      /\r\n/g,

      '\n',

    )

    .trim();

}

/* =========================================================

   SAFE WORKSPACE PATH

\\========================================================= */

function safeRelativePath(

  filePath,

) {

  const normalized =

    String(

      filePath ?? '',

    )

      .replace(

        /\\/g,

        '/',

      )

      .trim();

  if (

    !normalized ||

    normalized === '.' ||

    normalized === '..' ||

    normalized.startsWith('/') ||

    normalized.includes('../')

  ) {

    throw new Error(

      `Invalid FastAPI workspace file path: ${filePath}`,

    );

  }

  return normalized;

}

function isPathInside(

  parentPath,

  childPath,

) {

  const relativePath =

    relative(

      parentPath,

      childPath,

    );

  return (

    relativePath === '' ||

    (

      !relativePath.startsWith(

        '..',

      ) &&

      !relativePath.startsWith(

        sep,

      )

    )

  );

}

/* =========================================================

   WRITE LEARNER FILES

\\========================================================= */

async function writeWorkspaceFiles({

  workspacePath,

  files,

}) {

  for (

    const file

    of files

  ) {

    const relativePath =

      safeRelativePath(

        file?.path,

      );

    const targetPath =

      resolve(

        workspacePath,

        relativePath,

      );

    if (

      !isPathInside(

        workspacePath,

        targetPath,

      )

    ) {

      throw new Error(

        `Invalid FastAPI workspace file path: ${relativePath}`,

      );

    }

    await mkdir(

      dirname(

        targetPath,

      ),

      {

        recursive: true,

      },

    );

    await writeFile(

      targetPath,

      String(

        file?.content ?? '',

      ),

      'utf8',

    );

  }

}

/* =========================================================

   TEST NORMALIZATION

\\========================================================= */

function normalizeTest(

  test,

  index,

) {

  return {

    id:

      test?.id ??

      `test-${index + 1}`,

    name:

      test?.title ??

      test?.name ??

      `Test ${index + 1}`,

    method:

      String(

        test?.method ??

        'GET',

      ).toUpperCase(),

    path:

      String(

        test?.path ??

        '/',

      ),

    expectedStatus:

      Number(

        test?.expectedStatus ??

        200,

      ),

    expectedJson:

      test?.expectedJson ??

      test?.expectedBody ??

      null,

  };

}

/* =========================================================

   CREATE PYTHON TEST RUNNER

\\========================================================= */

function createPythonRunner(

  tests,

) {

  const normalizedTests =

    (

      Array.isArray(

        tests,

      )

        ? tests

        : []

    ).map(

      normalizeTest,

    );

  const serializedTests =

    JSON.stringify(

      normalizedTests,

    );

  return `

import json

import sys

import time

import httpx

BASE_URL = "http://127.0.0.1:8000"

TESTS = json.loads(

    ${JSON.stringify(serializedTests)}

)

def wait_for_server():

    last_error = None

    for _ in range(50):

        try:

            response = httpx.get(

                BASE_URL + "/",

                timeout=0.5,

            )

            if response.status_code:

                return

        except Exception as exc:

            last_error = exc

        time.sleep(0.1)

    raise RuntimeError(

        f"FastAPI server did not start: {last_error}"

    )

def run_test(test):

    method = test.get(

        "method",

        "GET",

    )

    path = test.get(

        "path",

        "/",

    )

    expected_status = test.get(

        "expectedStatus",

        200,

    )

    expected_json = test.get(

        "expectedJson",

        None,

    )

    try:

        response = httpx.request(

            method,

            BASE_URL + path,

            timeout=3.0,

        )

        actual_status = (

            response.status_code

        )

        try:

            actual_json = (

                response.json()

            )

        except Exception:

            actual_json = None

        passed = (

            actual_status ==

            expected_status

        )

        if (

            expected_json is not None

        ):

            passed = (

                passed and

                actual_json ==

                expected_json

            )

        return {

            "id":

                test.get("id"),

            "name":

                test.get("name"),

            "passed":

                passed,

            "method":

                method,

            "path":

                path,

            "expectedStatus":

                expected_status,

            "actualStatus":

                actual_status,

            "expectedJson":

                expected_json,

            "actualJson":

                actual_json,

        }

    except Exception as exc:

        return {

            "id":

                test.get("id"),

            "name":

                test.get("name"),

            "passed":

                False,

            "method":

                method,

            "path":

                path,

            "expectedStatus":

                expected_status,

            "actualStatus":

                None,

            "expectedJson":

                expected_json,

            "actualJson":

                None,

            "error":

                str(exc),

        }

def main():

    wait_for_server()

    results = []

    for test in TESTS:

        results.append(

            run_test(test)

        )

    print(

        "__ELAB_TEST_RESULTS__" +

        json.dumps(results)

    )

if __name__ == "__main__":

    main()

`;

}

/* =========================================================

   DOCKER COMMAND

\\========================================================= */

function createDockerArgs(

  workspacePath,

) {

  const dockerWorkspace =

    workspacePath.replace(

      /\\/g,

      '/',

    );

  const command = [

    'set -e',

    'export HOME=/tmp',

    'uvicorn main:app --host 127.0.0.1 --port 8000 --log-level warning > /tmp/fastapi.log 2>&1 &',

    'SERVER_PID=$!',

    'cleanup() { kill "$SERVER_PID" 2>/dev/null || true; wait "$SERVER_PID" 2>/dev/null || true; }',

    'trap cleanup EXIT',

    'python /workspace/__elab_runner.py',

  ].join('\n');

  return [

    'run',

    '--rm',

    '--network',

    'none',

    '--memory',

    MEMORY_LIMIT,

    '--cpus',

    CPU_LIMIT,

    '--pids-limit',

    PIDS_LIMIT,

    '--cap-drop',

    'ALL',

    '--security-opt',

    'no-new-privileges',

    '--tmpfs',

    '/tmp:rw,nosuid,nodev,size=256m',

    '--mount',

    `type=bind,source=${dockerWorkspace},target=/workspace`,

    '--workdir',

    '/workspace',

    FASTAPI_IMAGE,

    'sh',

    '-lc',

    command,

  ];

}

/* =========================================================

   PARSE TEST RESULTS

\\========================================================= */

function parseTestResults(

  stdout,

) {

  const marker =

    '__ELAB_TEST_RESULTS__';

  const lines =

    String(

      stdout ?? '',

    ).split(

      /\r?\n/,

    );

  const resultLine =

    lines.find(

      (line) =>

        line.startsWith(

          marker,

        ),

    );

  if (

    !resultLine

  ) {

    return [];

  }

  try {

    return JSON.parse(

      resultLine.slice(

        marker.length,

      ),

    );

  } catch {

    return [];

  }

}

/* =========================================================

   CLEAN STDOUT

\\========================================================= */

function cleanStdout(

  stdout,

) {

  return String(

    stdout ?? '',

  )

    .split(

      /\r?\n/,

    )

    .filter(

      (line) =>

        !line.startsWith(

          '__ELAB_TEST_RESULTS__',

        ),

    )

    .join(

      '\n',

    )

    .trim();

}

/* =========================================================

   ERROR TEXT

\\========================================================= */

function getErrorText(

  error,

) {

  const stdout =

    normalizeOutput(

      error?.stdout,

    );

  const stderr =

    normalizeOutput(

      error?.stderr,

    );

  return [

    stdout,

    stderr,

  ]

    .filter(

      Boolean,

    )

    .join(

      '\n',

    );

}

/* =========================================================

   FASTAPI FRAMEWORK RUNNER

\\========================================================= */

export async function runFastApiFramework({

  problemSlug,

  files,

  tests = [],

}) {

  const workspaceFiles =

    Array.isArray(

      files,

    )

      ? files

      : [];

  if (

    workspaceFiles.length ===

    0

  ) {

    return {

      runtime:

        'fastapi',

      problemSlug,

      status:

        'INVALID_REQUEST',

      output:

        '',

      stderr:

        'FastAPI workspace does not contain any files.',

      message:

        'FastAPI workspace does not contain any files.',

      exitCode:

        1,

      tests:

        [],

      testResults:

        [],

      passedTests:

        0,

      totalTests:

        0,

    };

  }

  const tempRoot =

    await mkdtemp(

      join(

        tmpdir(),

        'elab-fastapi-',

      ),

    );

  const workspacePath =

    join(

      tempRoot,

      'workspace',

    );

  try {

    await mkdir(

      workspacePath,

      {

        recursive: true,

      },

    );

    await writeWorkspaceFiles({

      workspacePath,

      files:

        workspaceFiles,

    });

    const runnerPath =

      join(

        workspacePath,

        '__elab_runner.py',

      );

    await writeFile(

      runnerPath,

      createPythonRunner(

        tests,

      ),

      'utf8',

    );

    const dockerArgs =

      createDockerArgs(

        workspacePath,

      );

    const {

      stdout,

      stderr,

    } =

      await execFileAsync(

        'docker',

        dockerArgs,

        {

          timeout:

            EXECUTION_TIMEOUT_MS,

          maxBuffer:

            MAX_BUFFER,

          windowsHide:

            true,

        },

      );

    const testResults =

      parseTestResults(

        stdout,

      );

    const passedTests =

      testResults.filter(

        (test) =>

          test?.passed ===

          true,

      ).length;

    const totalTests =

      testResults.length;

    const testsPassed =

      totalTests ===

        0 ||

      passedTests ===

        totalTests;

    const output =

      cleanStdout(

        stdout,

      );

    return {

      runtime:

        'fastapi',

      problemSlug,

      status:

        testsPassed

          ? 'SUCCESS'

          : 'TEST_FAILED',

      output,

      stderr:

        normalizeOutput(

          stderr,

        ),

      message:

        testsPassed

          ? 'FastAPI execution successful.'

          : `${passedTests}/${totalTests} FastAPI test(s) passed.`,

      exitCode:

        testsPassed

          ? 0

          : 1,

      tests:

        testResults,

      testResults,

      passedTests,

      totalTests,

    };

  } catch (

    error

  ) {

    const timedOut =

      error?.killed ===

        true ||

      error?.code ===

        'ETIMEDOUT' ||

      error?.signal ===

        'SIGTERM';

    const errorText =

      getErrorText(

        error,

      );

    return {

      runtime:

        'fastapi',

      problemSlug,

      status:

        timedOut

          ? 'TIME_LIMIT_EXCEEDED'

          : 'RUNTIME_ERROR',

      output:

        '',

      stderr:

        errorText ||

        error?.message ||

        'FastAPI execution failed.',

      message:

        timedOut

          ? 'The FastAPI application exceeded the execution time limit.'

          : (

              errorText ||

              error?.message ||

              'FastAPI execution failed.'

            ),

      exitCode:

        typeof error?.code ===

        'number'

          ? error.code

          : 1,

      tests:

        [],

      testResults:

        [],

      passedTests:

        0,

      totalTests:

        0,

    };

  } finally {

    await rm(

      tempRoot,

      {

        recursive:

          true,

        force:

          true,

      },

    );

  }

}

export default runFastApiFramework;
