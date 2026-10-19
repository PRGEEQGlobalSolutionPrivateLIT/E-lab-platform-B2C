import {
  execFile,
} from 'node:child_process';

import {
  mkdir,
  rm,
  writeFile,
} from 'node:fs/promises';

import os from 'node:os';

import path from 'node:path';

import crypto from 'node:crypto';

/* =========================================================
   CONFIG
========================================================= */

const ASPNETCORE_IMAGE =
  'elab-judge-aspnetcore:latest';

const MEMORY =
  '768m';

const TMP_SIZE =
  '256m';

const BUILD_TIMEOUT =
  300_000;

const START_TIMEOUT =
  30_000;

const HTTP_TIMEOUT =
  10_000;

const APP_PORT =
  8080;

/* =========================================================
   DOCKER EXECUTION
========================================================= */

function runDocker(
  args,
  timeout = BUILD_TIMEOUT,
) {
  return new Promise(
    (resolve) => {
      execFile(
        'docker',

        args,

        {
          windowsHide: true,

          timeout,

          maxBuffer:
            4 * 1024 * 1024,
        },

        (
          error,
          stdout,
          stderr,
        ) => {
          resolve({
            error,

            stdout:
              stdout ?? '',

            stderr:
              stderr ?? '',
          });
        },
      );
    },
  );
}

/* =========================================================
   SAFE FILE PATH
========================================================= */

function getSafeFilePath(
  workspace,
  filePath,
) {
  const normalized =
    String(filePath ?? '')
      .replaceAll('\\', '/')
      .replace(/^\/+/, '');

  if (
    !normalized ||
    normalized.includes('\0')
  ) {
    throw new Error(
      'Invalid framework file path.',
    );
  }

  const target =
    path.resolve(
      workspace,
      normalized,
    );

  const root =
    path.resolve(
      workspace,
    );

  if (
    target !== root &&
    !target.startsWith(
      `${root}${path.sep}`,
    )
  ) {
    throw new Error(
      `Unsafe framework file path: ${filePath}`,
    );
  }

  return target;
}

/* =========================================================
   WRITE FRAMEWORK FILES
========================================================= */

async function writeFrameworkFiles(
  workspace,
  files,
) {
  for (
    const file of files
  ) {
    const target =
      getSafeFilePath(
        workspace,
        file.path,
      );

    await mkdir(
      path.dirname(
        target,
      ),
      {
        recursive: true,
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
   DEFAULT ASP.NET CORE PROJECT FILE

   Used when the problem workspace does not already provide
   its own .csproj file.
========================================================= */

function createDefaultProjectFile() {
  return `<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <InvariantGlobalization>true</InvariantGlobalization>
  </PropertyGroup>

</Project>
`;
}

/* =========================================================
   DEFAULT PROGRAM.CS

   Used only when a workspace does not provide Program.cs.
   Most ASP.NET Core practice problems already provide it.
========================================================= */

function createDefaultProgram() {
  return `var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.MapGet("/", () => "ASP.NET Core");

app.Run();
`;
}

/* =========================================================
   ENSURE PROJECT FILES
========================================================= */

async function ensureProjectFiles(
  workspace,
  files,
) {
  const hasProject =
    files.some(
      (file) =>
        file.path
          .replaceAll('\\', '/')
          .toLowerCase()
          .endsWith('.csproj'),
    );

  if (
    !hasProject
  ) {
    await writeFile(
      path.join(
        workspace,
        'ElabPractice.csproj',
      ),
      createDefaultProjectFile(),
      'utf8',
    );
  }

  const hasProgram =
    files.some(
      (file) =>
        file.path
          .replaceAll('\\', '/')
          .toLowerCase()
          .endsWith('program.cs'),
    );

  if (
    !hasProgram
  ) {
    await writeFile(
      path.join(
        workspace,
        'Program.cs',
      ),
      createDefaultProgram(),
      'utf8',
    );
  }
}

/* =========================================================
   FORMAT BUILD ERROR
========================================================= */

function getBuildError(
  result,
) {
  const output =
    [
      result.stdout,
      result.stderr,
    ]
      .filter(Boolean)
      .join('\n')
      .trim();

  return (
    output ||
    'ASP.NET Core project failed to compile.'
  );
}

/* =========================================================
   CONTAINER HELPERS
========================================================= */

async function removeContainer(
  containerName,
) {
  if (
    !containerName
  ) {
    return;
  }

  await runDocker(
    [
      'rm',
      '-f',
      containerName,
    ],
    10_000,
  );
}

/* =========================================================
   WAIT FOR ASP.NET CORE
========================================================= */

async function waitForAspNetCore(
  containerName,
) {
  const startedAt =
    Date.now();

  while (
    Date.now() -
      startedAt <
    START_TIMEOUT
  ) {
    const inspectResult =
      await runDocker(
        [
          'inspect',
          '-f',
          '{{.State.Running}}',
          containerName,
        ],
        5_000,
      );

    if (
      inspectResult.error ||
      inspectResult.stdout
        .trim() !==
        'true'
    ) {
      const logs =
        await runDocker(
          [
            'logs',
            containerName,
          ],
          5_000,
        );

      return {
        ready: false,

        message:
          'ASP.NET Core application stopped before becoming ready.',

        logs:
          [
            logs.stdout,
            logs.stderr,
          ]
            .filter(Boolean)
            .join('\n')
            .trim(),
      };
    }

    const probe =
      await runDocker(
        [
          'exec',
          containerName,
          'sh',
          '-lc',
          `curl -sS -o /dev/null -w "%{http_code}" http://127.0.0.1:${APP_PORT}/`,
        ],
        5_000,
      );

    const status =
      probe.stdout
        .trim();

    /*
     * Any HTTP response means the embedded web server is up.
     * A ASP.NET Core application can legitimately return 404
     * for "/", so we do not require HTTP 200 here.
     */
    if (
      !probe.error &&
      /^\d{3}$/.test(
        status,
      )
    ) {
      return {
        ready: true,
      };
    }

    await new Promise(
      (resolve) =>
        setTimeout(
          resolve,
          500,
        ),
    );
  }

  const logs =
    await runDocker(
      [
        'logs',
        containerName,
      ],
      5_000,
    );

  return {
    ready: false,

    message:
      'ASP.NET Core application did not become ready within the allowed time.',

    logs:
      [
        logs.stdout,
        logs.stderr,
      ]
        .filter(Boolean)
        .join('\n')
        .trim(),
  };
}

/* =========================================================
   EXECUTE ONE HTTP TEST
========================================================= */

async function executeHttpTest(
  containerName,
  test,
  index,
) {
  const method =
    String(
      test.method ??
        'GET',
    )
      .trim()
      .toUpperCase();

  const requestPath =
    String(
      test.path ??
        '/',
    ).trim();

  const expectedStatus =
    Number.isInteger(
      test.expectedStatus,
    )
      ? test.expectedStatus
      : 200;

  const expectedOutput =
    typeof test.expectedOutput ===
    'string'
      ? test.expectedOutput
      : undefined;

  const marker =
    `__ELAB_HTTP_STATUS_${crypto.randomUUID()}__`;

  const curlArgs = [
    'exec',
    containerName,
    'curl',
    '-sS',
    '--max-time',
    String(
      Math.max(
        1,
        Math.ceil(
          HTTP_TIMEOUT /
            1000,
        ),
      ),
    ),
    '-X',
    method,
  ];

  if (
    typeof test.body ===
    'string'
  ) {
    curlArgs.push(
      '-H',
      'Content-Type: application/json',
      '--data-binary',
      test.body,
    );
  }

  curlArgs.push(
    '-w',
    `\\n${marker}%{http_code}`,
    `http://127.0.0.1:${APP_PORT}${requestPath}`,
  );

  const result =
    await runDocker(
      curlArgs,
      HTTP_TIMEOUT +
        5_000,
    );

  if (
    result.error
  ) {
    return {
      id:
        test.id ??
        `test-${index + 1}`,

      method,

      path:
        requestPath,

      passed: false,

      status:
        'RUNTIME_ERROR',

      expectedStatus,

      expectedOutput,

      actualStatus:
        null,

      actualOutput:
        result.stdout
          .trim(),

      error:
        result.stderr
          .trim() ||
        result.error.message,
    };
  }

  const output =
    result.stdout ?? '';

  const markerIndex =
    output.lastIndexOf(
      `\n${marker}`,
    );

  if (
    markerIndex === -1
  ) {
    return {
      id:
        test.id ??
        `test-${index + 1}`,

      method,

      path:
        requestPath,

      passed: false,

      status:
        'RUNTIME_ERROR',

      expectedStatus,

      expectedOutput,

      actualStatus:
        null,

      actualOutput:
        output.trim(),

      error:
        'Unable to read HTTP status from ASP.NET Core test response.',
    };
  }

  const actualOutput =
    output
      .slice(
        0,
        markerIndex,
      )
      .trim();

  const actualStatus =
    Number(
      output
        .slice(
          markerIndex +
            marker.length +
            1,
        )
        .trim(),
    );

  const statusPassed =
    actualStatus ===
    expectedStatus;

  const outputPassed =
    expectedOutput ===
      undefined ||
    actualOutput ===
      expectedOutput.trim();

  const passed =
    statusPassed &&
    outputPassed;

  return {
    id:
      test.id ??
      `test-${index + 1}`,

    method,

    path:
      requestPath,

    passed,

    status:
      passed
        ? 'PASSED'
        : 'FAILED',

    expectedStatus,

    actualStatus,

    expectedOutput,

    actualOutput,
  };
}

/* =========================================================
   ASP.NET CORE RUNNER
========================================================= */

export async function runAspNetCoreFramework({
  problemSlug,
  files,
  tests,
}) {
  const executionId =
    crypto.randomUUID();

  const containerName =
    `elab-aspnetcore-${executionId}`;

  const workspace =
    path.join(
      os.tmpdir(),
      `elab-aspnetcore-${executionId}`,
    );

  await mkdir(
    workspace,
    {
      recursive: true,
    },
  );

  try {
    /* =====================================================
       VALIDATE FILES
    ===================================================== */

    if (
      !Array.isArray(files) ||
      files.length === 0
    ) {
      return {
        status:
          'INVALID_REQUEST',

        message:
          'ASP.NET Core files are required.',
      };
    }

    /* =====================================================
       WRITE LEARNER FILES
    ===================================================== */

    await writeFrameworkFiles(
      workspace,
      files,
    );

    /* =====================================================
       ADD REQUIRED ASP.NET CORE PROJECT FILES
    ===================================================== */

    await ensureProjectFiles(
      workspace,
      files,
    );

    /* =====================================================
       BUILD PROJECT

       NuGet dependencies are restored during this stage.
       The default ASP.NET Core project uses the shared
       Microsoft.NET.Sdk.Web framework from the .NET SDK image.
    ===================================================== */

    const buildCommand = `
dotnet restore &&
dotnet build \
  --configuration Release \
  --no-restore \
  --nologo
    `.trim();

    const buildArgs = [
      'run',

      '--rm',

      '--memory',
      MEMORY,

      '--memory-swap',
      MEMORY,

      '--cpus',
      '1',

      '--pids-limit',
      '256',

      '--cap-drop',
      'ALL',

      '--security-opt',
      'no-new-privileges',

      '--tmpfs',
      `/tmp:rw,exec,nosuid,nodev,size=${TMP_SIZE}`,

      '--mount',
      `type=bind,source=${workspace},target=/workspace`,

      ASPNETCORE_IMAGE,

      'sh',

      '-lc',

      buildCommand,
    ];

    const buildResult =
      await runDocker(
        buildArgs,
      );

    /* =====================================================
       HOST TIMEOUT
    ===================================================== */

    if (
      buildResult.error
        ?.killed
    ) {
      return {
        runtime:
          'aspnetcore',

        problemSlug,

        status:
          'TIME_LIMIT_EXCEEDED',

        message:
          'ASP.NET Core build exceeded the allowed time.',

        output:
          buildResult.stdout,

        stderr:
          buildResult.stderr,
      };
    }

    /* =====================================================
       COMPILATION ERROR
    ===================================================== */

    if (
      buildResult.error
    ) {
      return {
        runtime:
          'aspnetcore',

        problemSlug,

        status:
          'COMPILATION_ERROR',

        message:
          'ASP.NET Core project failed to compile.',

        output:
          getBuildError(
            buildResult,
          ),

        stderr:
          buildResult.stderr,
      };
    }

    /* =====================================================
       RUN MODE

       At this stage we have verified that the submitted
       ASP.NET Core project compiles successfully.

       HTTP test execution will be connected next.
    ===================================================== */

    if (
      !Array.isArray(tests) ||
      tests.length === 0
    ) {
      return {
        runtime:
          'aspnetcore',

        problemSlug,

        status:
          'SUCCESS',

        message:
          'ASP.NET Core project compiled successfully.',

        output:
          'Build successful.',

        stderr:
          buildResult.stderr,

        tests:
          [],
      };
    }

    /* =====================================================
       START ASP.NET CORE APPLICATION
    ===================================================== */

    const startCommand = `
DLL_FILE="$(find bin/Release/net8.0 -maxdepth 1 -type f -name '*.dll' ! -name '*.Views.dll' | head -n 1)"

if [ -z "$DLL_FILE" ]; then
  echo "ASP.NET Core application DLL was not found." >&2
  exit 1
fi

export ASPNETCORE_URLS=http://0.0.0.0:8080
export ASPNETCORE_ENVIRONMENT=Production

exec dotnet "$DLL_FILE"
    `.trim();

    const startArgs = [
      'run',

      '-d',

      '--name',
      containerName,

      '--memory',
      MEMORY,

      '--memory-swap',
      MEMORY,

      '--cpus',
      '1',

      '--pids-limit',
      '256',

      '--cap-drop',
      'ALL',

      '--security-opt',
      'no-new-privileges',

      '--network',
      'none',

      '--tmpfs',
      `/tmp:rw,exec,nosuid,nodev,size=${TMP_SIZE}`,

      '--mount',
      `type=bind,source=${workspace},target=/workspace,readonly`,

      ASPNETCORE_IMAGE,

      'sh',

      '-lc',

      startCommand,
    ];

    const startResult =
      await runDocker(
        startArgs,
        15_000,
      );

    if (
      startResult.error
    ) {
      return {
        runtime:
          'aspnetcore',

        problemSlug,

        status:
          'RUNTIME_ERROR',

        message:
          'Unable to start the ASP.NET Core application.',

        output:
          startResult.stdout,

        stderr:
          startResult.stderr,
      };
    }

    /* =====================================================
       WAIT FOR SERVER
    ===================================================== */

    const readiness =
      await waitForAspNetCore(
        containerName,
      );

    if (
      !readiness.ready
    ) {
      return {
        runtime:
          'aspnetcore',

        problemSlug,

        status:
          'RUNTIME_ERROR',

        message:
          readiness.message,

        output:
          readiness.logs ??
          '',

        stderr:
          buildResult.stderr,
      };
    }

    /* =====================================================
       EXECUTE HTTP TESTS
    ===================================================== */

    const testResults = [];

    for (
      let index = 0;
      index <
      tests.length;
      index += 1
    ) {
      const result =
        await executeHttpTest(
          containerName,
          tests[index],
          index,
        );

      testResults.push(
        result,
      );
    }

    const passedTests =
      testResults.filter(
        (test) =>
          test.passed,
      ).length;

    const failedTests =
      testResults.length -
      passedTests;

    const allPassed =
      failedTests === 0;

    return {
      runtime:
        'aspnetcore',

      problemSlug,

      status:
        allPassed
          ? 'SUCCESS'
          : 'WRONG_ANSWER',

      message:
        allPassed
          ? 'All ASP.NET Core HTTP tests passed.'
          : `${failedTests} ASP.NET Core HTTP test(s) failed.`,

      output:
        allPassed
          ? 'Build successful. ASP.NET Core application started successfully and all HTTP tests passed.'
          : 'Build successful, but one or more ASP.NET Core HTTP tests failed.',

      stderr:
        buildResult.stderr,

      passedTests,

      failedTests,

      totalTests:
        testResults.length,

      tests:
        testResults,
    };
  } catch (
    error
  ) {
    return {
      runtime:
        'aspnetcore',

      problemSlug,

      status:
        'RUNTIME_ERROR',

      message:
        error instanceof Error
          ? error.message
          : 'ASP.NET Core framework execution failed.',
    };
  } finally {
    /* =====================================================
       STOP / REMOVE APPLICATION CONTAINER
    ===================================================== */

    await removeContainer(
      containerName,
    );

    /* =====================================================
       CLEAN WORKSPACE
    ===================================================== */

    await rm(
      workspace,
      {
        recursive: true,
        force: true,
      },
    );
  }
}