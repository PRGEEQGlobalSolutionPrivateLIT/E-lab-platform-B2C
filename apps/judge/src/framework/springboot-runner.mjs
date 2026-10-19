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

const SPRINGBOOT_IMAGE =
  'elab-judge-springboot:latest';

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
   DEFAULT POM.XML

   Used when the problem workspace does not already provide
   its own pom.xml.
========================================================= */

function createDefaultPom() {
  return `<?xml version="1.0" encoding="UTF-8"?>

<project
    xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="
      http://maven.apache.org/POM/4.0.0
      https://maven.apache.org/xsd/maven-4.0.0.xsd">

    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.5.6</version>
        <relativePath/>
    </parent>

    <groupId>com.elab</groupId>
    <artifactId>springboot-practice</artifactId>
    <version>1.0.0</version>

    <name>springboot-practice</name>

    <properties>
        <java.version>21</java.version>
    </properties>

    <dependencies>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>
                spring-boot-starter-web
            </artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>
                spring-boot-starter-validation
            </artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>
                spring-boot-starter-test
            </artifactId>
            <scope>test</scope>
        </dependency>

    </dependencies>

    <build>
        <plugins>

            <plugin>
                <groupId>
                    org.springframework.boot
                </groupId>

                <artifactId>
                    spring-boot-maven-plugin
                </artifactId>
            </plugin>

        </plugins>
    </build>

</project>
`;
}

/* =========================================================
   APPLICATION CLASS

   Automatically supplied when the problem only contains
   learner classes/controllers/services.
========================================================= */

function createApplicationClass() {
  return `package com.elab.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ElabApplication {

    public static void main(String[] args) {
        SpringApplication.run(
            ElabApplication.class,
            args
        );
    }
}
`;
}

/* =========================================================
   ENSURE PROJECT FILES
========================================================= */

async function ensureProjectFiles(
  workspace,
  files,
) {
  const hasPom =
    files.some(
      (file) =>
        file.path
          .replaceAll('\\', '/')
          .toLowerCase() ===
        'pom.xml',
    );

  if (
    !hasPom
  ) {
    await writeFile(
      path.join(
        workspace,
        'pom.xml',
      ),
      createDefaultPom(),
      'utf8',
    );
  }

  const hasApplication =
    files.some(
      (file) => {
        const normalized =
          file.path
            .replaceAll('\\', '/')
            .toLowerCase();

        return (
          normalized.endsWith(
            'elabapplication.java',
          ) ||
          normalized.endsWith(
            'application.java',
          )
        );
      },
    );

  if (
    !hasApplication
  ) {
    const applicationPath =
      path.join(
        workspace,
        'src',
        'main',
        'java',
        'com',
        'elab',
        'app',
        'ElabApplication.java',
      );

    await mkdir(
      path.dirname(
        applicationPath,
      ),
      {
        recursive: true,
      },
    );

    await writeFile(
      applicationPath,
      createApplicationClass(),
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
    'Spring Boot project failed to compile.'
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
   WAIT FOR SPRING BOOT
========================================================= */

async function waitForSpringBoot(
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
          'Spring Boot application stopped before becoming ready.',

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
     * A Spring Boot application can legitimately return 404
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
      'Spring Boot application did not become ready within the allowed time.',

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
        'Unable to read HTTP status from Spring Boot test response.',
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
   SPRING BOOT RUNNER
========================================================= */

export async function runSpringBootFramework({
  problemSlug,
  files,
  tests,
}) {
  const executionId =
    crypto.randomUUID();

  const containerName =
    `elab-springboot-${executionId}`;

  const workspace =
    path.join(
      os.tmpdir(),
      `elab-springboot-${executionId}`,
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
          'Spring Boot files are required.',
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
       ADD REQUIRED SPRING BOOT PROJECT FILES
    ===================================================== */

    await ensureProjectFiles(
      workspace,
      files,
    );

    /* =====================================================
       BUILD PROJECT

       Maven dependencies are downloaded during this stage.
       Later we can move dependencies into the Docker image
       and run the learner build with network disabled.
    ===================================================== */

    const buildCommand = `
mvn \
  -q \
  -DskipTests \
  package
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

      SPRINGBOOT_IMAGE,

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
          'springboot',

        problemSlug,

        status:
          'TIME_LIMIT_EXCEEDED',

        message:
          'Spring Boot build exceeded the allowed time.',

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
          'springboot',

        problemSlug,

        status:
          'COMPILATION_ERROR',

        message:
          'Spring Boot project failed to compile.',

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
       Spring Boot project compiles successfully.

       HTTP test execution will be connected next.
    ===================================================== */

    if (
      !Array.isArray(tests) ||
      tests.length === 0
    ) {
      return {
        runtime:
          'springboot',

        problemSlug,

        status:
          'SUCCESS',

        message:
          'Spring Boot project compiled successfully.',

        output:
          'Build successful.',

        stderr:
          buildResult.stderr,

        tests:
          [],
      };
    }

    /* =====================================================
       START SPRING BOOT APPLICATION
    ===================================================== */

    const startCommand = `
JAR_FILE="$(find target -maxdepth 1 -type f -name '*.jar' ! -name '*.original' | head -n 1)"

if [ -z "$JAR_FILE" ]; then
  echo "Spring Boot executable JAR was not found." >&2
  exit 1
fi

exec java \
  -XX:MaxRAMPercentage=70 \
  -jar "$JAR_FILE" \
  --server.address=0.0.0.0 \
  --server.port=8080
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

      SPRINGBOOT_IMAGE,

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
          'springboot',

        problemSlug,

        status:
          'RUNTIME_ERROR',

        message:
          'Unable to start the Spring Boot application.',

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
      await waitForSpringBoot(
        containerName,
      );

    if (
      !readiness.ready
    ) {
      return {
        runtime:
          'springboot',

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
        'springboot',

      problemSlug,

      status:
        allPassed
          ? 'SUCCESS'
          : 'WRONG_ANSWER',

      message:
        allPassed
          ? 'All Spring Boot HTTP tests passed.'
          : `${failedTests} Spring Boot HTTP test(s) failed.`,

      output:
        allPassed
          ? 'Build successful. Spring Boot application started successfully and all HTTP tests passed.'
          : 'Build successful, but one or more Spring Boot HTTP tests failed.',

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
        'springboot',

      problemSlug,

      status:
        'RUNTIME_ERROR',

      message:
        error instanceof Error
          ? error.message
          : 'Spring Boot framework execution failed.',
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