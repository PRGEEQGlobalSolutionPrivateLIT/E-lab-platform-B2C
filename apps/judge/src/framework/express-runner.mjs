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
  resolve,
} from 'node:path';

import {
  promisify,
} from 'node:util';

const execFileAsync =
  promisify(
    execFile,
  );

const EXPRESS_IMAGE =
  'elab-judge-express:latest';

const RESULT_MARKER =
  '__ELAB_FRAMEWORK_RESULT__';

/* =========================================================
   FILE PATH VALIDATION
========================================================= */

function normalizeFilePath(
  filePath,
) {
  if (
    typeof filePath !==
    'string'
  ) {
    throw new Error(
      'Framework file path must be a string.',
    );
  }

  const normalized =
    filePath
      .replace(
        /\\/g,
        '/',
      )
      .trim();

  if (
    !normalized ||
    normalized.startsWith(
      '/',
    ) ||
    normalized ===
      '..' ||
    normalized.includes(
      '../',
    )
  ) {
    throw new Error(
      `Invalid framework file path: ${filePath}`,
    );
  }

  return normalized;
}

/* =========================================================
   WRITE LEARNER FILES
========================================================= */

async function writeFrameworkFiles(
  workspaceDir,
  files,
) {
  for (
    const file of files
  ) {
    const safePath =
      normalizeFilePath(
        file.path,
      );

    const target =
      resolve(
        workspaceDir,
        safePath,
      );

    const root =
      resolve(
        workspaceDir,
      );

    if (
      target !== root &&
      !target.startsWith(
        `${root}\\`,
      ) &&
      !target.startsWith(
        `${root}/`,
      )
    ) {
      throw new Error(
        `Invalid framework file path: ${file.path}`,
      );
    }

    await mkdir(
      dirname(
        target,
      ),
      {
        recursive:
          true,
      },
    );

    await writeFile(
      target,
      file.content,
      'utf8',
    );
  }
}

/* =========================================================
   DEFAULT RUN TESTS

   These are used when the learner clicks Run.

   Submission can provide a different hidden-test array.
========================================================= */

function getDefaultExpressTests(
  problemSlug,
) {
  if (
    problemSlug ===
    'express-hello-route'
  ) {
    return [
      {
        method:
          'GET',

        path:
          '/hello',

        expectedStatus:
          200,

        expectedBody: {
          message:
            'Hello Express',
        },
      },
    ];
  }

  return [];
}

/* =========================================================
   NORMALIZE TESTS
========================================================= */

function normalizeTests(
  problemSlug,
  tests,
) {
  /*
   * Submit:
   * API sends hidden tests.
   */

  if (
    Array.isArray(
      tests,
    ) &&
    tests.length >
      0
  ) {
    return tests;
  }

  /*
   * Run:
   * Use public/default tests.
   */

  return getDefaultExpressTests(
    problemSlug,
  );
}

/* =========================================================
   CREATE EXPRESS TEST RUNNER

   This JavaScript runs INSIDE the Express Docker container.
========================================================= */

function createExpressTestRunner(
  tests,
) {
  /*
   * JSON.stringify is important.
   *
   * Never interpolate individual hidden-test
   * values directly into executable JavaScript.
   */

  const serializedTests =
    JSON.stringify(
      tests,
    );

  const serializedMarker =
    JSON.stringify(
      RESULT_MARKER,
    );

  return `
const app =
  require('/workspace/server.js');

const tests =
  ${serializedTests};

const RESULT_MARKER =
  ${serializedMarker};

let server = null;

/* =========================================================
   DEEP EQUALITY

   Object property order should not matter.
========================================================= */

function deepEqual(
  actual,
  expected
) {
  if (
    actual === expected
  ) {
    return true;
  }

  if (
    typeof actual !==
      typeof expected
  ) {
    return false;
  }

  if (
    actual === null ||
    expected === null
  ) {
    return false;
  }

  if (
    Array.isArray(actual) ||
    Array.isArray(expected)
  ) {
    if (
      !Array.isArray(actual) ||
      !Array.isArray(expected)
    ) {
      return false;
    }

    if (
      actual.length !==
      expected.length
    ) {
      return false;
    }

    for (
      let index = 0;
      index < actual.length;
      index += 1
    ) {
      if (
        !deepEqual(
          actual[index],
          expected[index]
        )
      ) {
        return false;
      }
    }

    return true;
  }

  if (
    typeof actual ===
    'object'
  ) {
    const actualKeys =
      Object.keys(
        actual
      ).sort();

    const expectedKeys =
      Object.keys(
        expected
      ).sort();

    if (
      actualKeys.length !==
      expectedKeys.length
    ) {
      return false;
    }

    for (
      let index = 0;
      index < actualKeys.length;
      index += 1
    ) {
      if (
        actualKeys[index] !==
        expectedKeys[index]
      ) {
        return false;
      }
    }

    for (
      const key of actualKeys
    ) {
      if (
        !deepEqual(
          actual[key],
          expected[key]
        )
      ) {
        return false;
      }
    }

    return true;
  }

  return false;
}

/* =========================================================
   PARSE RESPONSE BODY
========================================================= */

async function readResponseBody(
  response
) {
  const text =
    await response.text();

  if (
    !text
  ) {
    return '';
  }

  try {
    return JSON.parse(
      text
    );
  } catch {
    return text;
  }
}

/* =========================================================
   RUN ONE HTTP TEST
========================================================= */

async function runTest(
  test,
  index
) {
  const method =
    String(
      test.method ??
      'GET'
    ).toUpperCase();

  const testPath =
    String(
      test.path ??
      '/'
    );

  const requestOptions = {
    method
  };

  if (
    test.body !==
      undefined
  ) {
    requestOptions.headers = {
      'Content-Type':
        'application/json'
    };

    requestOptions.body =
      JSON.stringify(
        test.body
      );
  }

  try {
    const response =
      await fetch(
        'http://127.0.0.1:3000' +
          testPath,
        requestOptions
      );

    const responseBody =
      await readResponseBody(
        response
      );

    const statusPassed =
      response.status ===
        test.expectedStatus;

    const hasExpectedBody =
      Object.prototype
        .hasOwnProperty
        .call(
          test,
          'expectedBody'
        );

    const bodyPassed =
      !hasExpectedBody ||
      deepEqual(
        responseBody,
        test.expectedBody
      );

    const passed =
      statusPassed &&
      bodyPassed;

    return {
      testNumber:
        index + 1,

      passed,

      method,

      path:
        testPath,

      statusCode:
        response.status,

      expectedStatus:
        test.expectedStatus,

      body:
        responseBody,

      expectedBody:
        hasExpectedBody
          ? test.expectedBody
          : undefined,

      message:
        passed
          ? 'HTTP test passed.'
          : 'HTTP response did not match the expected result.'
    };
  } catch (
    error
  ) {
    return {
      testNumber:
        index + 1,

      passed:
        false,

      method,

      path:
        testPath,

      statusCode:
        null,

      expectedStatus:
        test.expectedStatus,

      body:
        null,

      expectedBody:
        test.expectedBody,

      message:
        error instanceof Error
          ? error.message
          : String(error)
    };
  }
}

/* =========================================================
   MAIN
========================================================= */

async function main() {
  try {
    /* =====================================================
       CHECK APP EXPORT
    ===================================================== */

    if (
      !app ||
      typeof app.listen !==
        'function'
    ) {
      throw new Error(
        'server.js must export the Express app using module.exports = app;'
      );
    }

    /* =====================================================
       CHECK TESTS
    ===================================================== */

    if (
      !Array.isArray(
        tests
      ) ||
      tests.length ===
        0
    ) {
      console.error(
        'No Express tests were provided.'
      );

      process.exitCode =
        30;

      return;
    }

    /* =====================================================
       START EXPRESS
    ===================================================== */

    server =
      app.listen(
        3000,
        '127.0.0.1'
      );

    await new Promise(
      (
        resolve,
        reject
      ) => {
        server.once(
          'listening',
          resolve
        );

        server.once(
          'error',
          reject
        );
      }
    );

    /* =====================================================
       EXECUTE TESTS
    ===================================================== */

    const results = [];

    for (
      let index = 0;
      index < tests.length;
      index += 1
    ) {
      const result =
        await runTest(
          tests[index],
          index
        );

      results.push(
        result
      );
    }

    /* =====================================================
       FINAL RESULT
    ===================================================== */

    const passedTests =
      results.filter(
        (
          result
        ) =>
          result.passed ===
          true
      ).length;

    const totalTests =
      results.length;

    const allPassed =
      totalTests > 0 &&
      passedTests ===
        totalTests;

    const finalResult = {
      passed:
        allPassed,

      passedTests,

      totalTests,

      results
    };

    /*
     * Use a marker because learner code may
     * use console.log().
     *
     * We only parse the marked Judge result.
     */

    console.log(
      RESULT_MARKER +
      JSON.stringify(
        finalResult
      )
    );

    if (
      !allPassed
    ) {
      process.exitCode =
        10;
    }
  } catch (
    error
  ) {
    console.error(
      error instanceof Error
        ? error.stack
        : String(error)
    );

    process.exitCode =
      20;
  } finally {
    if (
      server
    ) {
      await new Promise(
        (
          resolve,
        ) => {
          server.close(
            resolve,
          );
        },
      );
    }
  }
}

main();
`;
}

/* =========================================================
   PARSE MARKED RESULT

   Learner console.log output is ignored for result parsing.
========================================================= */

function parseFrameworkResult(
  stdout,
) {
  const text =
    String(
      stdout ??
      '',
    );

  const lines =
    text.split(
      /\r?\n/,
    );

  for (
    let index =
      lines.length - 1;
    index >= 0;
    index -= 1
  ) {
    const line =
      lines[
        index
      ];

    if (
      !line.startsWith(
        RESULT_MARKER,
      )
    ) {
      continue;
    }

    const json =
      line.slice(
        RESULT_MARKER.length,
      );

    try {
      return JSON.parse(
        json,
      );
    } catch {
      return null;
    }
  }

  return null;
}

/* =========================================================
   REMOVE INTERNAL RESULT MARKER FROM DISPLAY OUTPUT
========================================================= */

function cleanOutput(
  stdout,
) {
  return String(
    stdout ??
    '',
  )
    .split(
      /\r?\n/,
    )
    .filter(
      (
        line,
      ) =>
        !line.startsWith(
          RESULT_MARKER,
        ),
    )
    .join(
      '\n',
    )
    .trim();
}

/* =========================================================
   RUN EXPRESS FRAMEWORK

   Run:
   - tests omitted
   - public/default tests used

   Submit:
   - hidden tests supplied by NestJS
========================================================= */

export async function runExpressFramework({
  problemSlug,
  files,
  tests,
}) {
  /* =======================================================
     VALIDATE FILES
  ======================================================= */

  if (
    !Array.isArray(
      files,
    ) ||
    files.length ===
      0
  ) {
    return {
      runtime:
        'express',

      status:
        'INVALID_REQUEST',

      message:
        'At least one Express source file is required.',

      testResults: [],
    };
  }

  /* =======================================================
     RESOLVE TESTS
  ======================================================= */

  const resolvedTests =
    normalizeTests(
      problemSlug,
      tests,
    );

  if (
    resolvedTests.length ===
    0
  ) {
    return {
      runtime:
        'express',

      status:
        'INVALID_REQUEST',

      message:
        `No Express tests configured for ${problemSlug}.`,

      testResults: [],
    };
  }

  /* =======================================================
     TEMP WORKSPACE
  ======================================================= */

  const tempDirectory =
    await mkdtemp(
      join(
        tmpdir(),
        'elab-express-',
      ),
    );

  try {
    /* =====================================================
       WRITE STUDENT FILES
    ===================================================== */

    await writeFrameworkFiles(
      tempDirectory,
      files,
    );

    /* =====================================================
       CREATE TEST RUNNER
    ===================================================== */

    const runnerCode =
      createExpressTestRunner(
        resolvedTests,
      );

    await writeFile(
      join(
        tempDirectory,
        '__elab_runner.js',
      ),
      runnerCode,
      'utf8',
    );

    /* =====================================================
       DOCKER ARGUMENTS
    ===================================================== */

    const dockerArgs = [
      'run',

      '--rm',

      /* -----------------------------------------------
         Disable external networking.

         Express and tests communicate through
         localhost inside the container.
      ----------------------------------------------- */

      '--network',
      'none',

      /* -----------------------------------------------
         Memory
      ----------------------------------------------- */

      '--memory',
      '256m',

      '--memory-swap',
      '256m',

      /* -----------------------------------------------
         CPU
      ----------------------------------------------- */

      '--cpus',
      '0.5',

      /* -----------------------------------------------
         Process limit
      ----------------------------------------------- */

      '--pids-limit',
      '64',

      /* -----------------------------------------------
         Remove Linux capabilities
      ----------------------------------------------- */

      '--cap-drop',
      'ALL',

      '--security-opt',
      'no-new-privileges',

      /* -----------------------------------------------
         Read-only container
      ----------------------------------------------- */

      '--read-only',

      /* -----------------------------------------------
         Writable temp
      ----------------------------------------------- */

      '--tmpfs',
      '/tmp:rw,nosuid,nodev,size=64m',

      /* -----------------------------------------------
         Workspace
      ----------------------------------------------- */

      '-v',

      `${tempDirectory}:/workspace:ro`,

      /* -----------------------------------------------
         Express runtime image
      ----------------------------------------------- */

      EXPRESS_IMAGE,

      /* -----------------------------------------------
         Execute trusted runner
      ----------------------------------------------- */

      'node',

      '/workspace/__elab_runner.js',
    ];

    try {
      const {
        stdout,
        stderr,
      } =
        await execFileAsync(
          'docker',
          dockerArgs,
          {
            timeout:
              8000,

            maxBuffer:
              1024 *
              1024,
          },
        );

      const judgeResult =
        parseFrameworkResult(
          stdout,
        );

      const output =
        cleanOutput(
          stdout,
        );

      /* ===================================================
         RESULT NOT FOUND
      =================================================== */

      if (
        !judgeResult
      ) {
        return {
          runtime:
            'express',

          status:
            'RUNTIME_ERROR',

          output,

          stderr:
            stderr.trim(),

          message:
            'Express Judge did not produce a valid test result.',

          testResults: [],
        };
      }

      /* ===================================================
         SUCCESS / FAILED
      =================================================== */

      return {
        runtime:
          'express',

        status:
          judgeResult.passed
            ? 'SUCCESS'
            : 'TEST_FAILED',

        output,

        stderr:
          stderr.trim(),

        passedTests:
          judgeResult.passedTests,

        totalTests:
          judgeResult.totalTests,

        testResults:
          Array.isArray(
            judgeResult.results,
          )
            ? judgeResult.results
            : [],
      };
    } catch (
      error
    ) {
      /* ===================================================
         PROCESS TIMED OUT
      =================================================== */

      if (
        error?.killed ||
        error?.signal ===
          'SIGTERM'
      ) {
        return {
          runtime:
            'express',

          status:
            'TIME_LIMIT_EXCEEDED',

          output:
            cleanOutput(
              error?.stdout ??
              '',
            ),

          stderr:
            String(
              error?.stderr ??
              '',
            ).trim(),

          message:
            'Express execution exceeded the time limit.',

          testResults: [],
        };
      }

      const exitCode =
        typeof error?.code ===
        'number'
          ? error.code
          : null;

      const stdout =
        String(
          error?.stdout ??
          '',
        );

      const stderr =
        String(
          error?.stderr ??
          '',
        ).trim();

      const judgeResult =
        parseFrameworkResult(
          stdout,
        );

      const output =
        cleanOutput(
          stdout,
        );

      /* ===================================================
         EXIT 10
         HTTP TEST FAILED
      =================================================== */

      if (
        exitCode ===
        10
      ) {
        return {
          runtime:
            'express',

          status:
            'TEST_FAILED',

          output,

          stderr,

          passedTests:
            judgeResult
              ?.passedTests ??
            0,

          totalTests:
            judgeResult
              ?.totalTests ??
            resolvedTests.length,

          testResults:
            Array.isArray(
              judgeResult?.results,
            )
              ? judgeResult.results
              : [],
        };
      }

      /* ===================================================
         EXIT 20
         APP FAILED TO LOAD / START
      =================================================== */

      if (
        exitCode ===
        20
      ) {
        return {
          runtime:
            'express',

          status:
            'SERVER_START_ERROR',

          output,

          stderr,

          message:
            'Unable to start the Express application.',

          testResults: [],
        };
      }

      /* ===================================================
         EXIT 30
         NO TESTS
      =================================================== */

      if (
        exitCode ===
        30
      ) {
        return {
          runtime:
            'express',

          status:
            'INVALID_REQUEST',

          output,

          stderr,

          message:
            `No Express tests configured for ${problemSlug}.`,

          testResults: [],
        };
      }

      /* ===================================================
         OTHER ERROR
      =================================================== */

      return {
        runtime:
          'express',

        status:
          'RUNTIME_ERROR',

        output,

        stderr,

        message:
          'Express application execution failed.',

        testResults: [],
      };
    }
  } finally {
    /* =====================================================
       ALWAYS CLEAN WORKSPACE
    ===================================================== */

    await rm(
      tempDirectory,
      {
        recursive:
          true,

        force:
          true,
      },
    );
  }
}