import http from 'node:http';

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

const PORT = 4100;

const C_IMAGE =
  'elab-judge-c:latest';

const CPP_IMAGE =
  'elab-judge-cpp:latest';

/* =========================================================
   LANGUAGE CONFIG
========================================================= */

const LANGUAGE_CONFIG = {
  c: {
    image:
      C_IMAGE,

    sourceFile:
      'main.c',

    compileCommand:
      'gcc /workspace/main.c -O2 -std=c17 -Wall -Wextra -o /tmp/main',
  },

  cpp: {
    image:
      CPP_IMAGE,

    sourceFile:
      'main.cpp',

    compileCommand:
      'g++ /workspace/main.cpp -O2 -std=c++20 -Wall -Wextra -o /tmp/main',
  },
};

/* =========================================================
   RESPONSE HELPER
========================================================= */

function sendJson(
  response,
  statusCode,
  data,
) {
  response.writeHead(
    statusCode,
    {
      'Content-Type':
        'application/json',

      'Access-Control-Allow-Origin':
        '*',

      'Cache-Control':
        'no-store',
    },
  );

  response.end(
    JSON.stringify(
      data,
    ),
  );
}

/* =========================================================
   NORMALIZE LANGUAGE
========================================================= */

function normalizeLanguage(
  language,
) {
  const normalized =
    String(
      language ?? '',
    )
      .trim()
      .toLowerCase();

  /*
   * Allow frontend/API aliases.
   */

  if (
    normalized === 'c++' ||
    normalized === 'cplusplus'
  ) {
    return 'cpp';
  }

  return normalized;
}

/* =========================================================
   READ BODY
========================================================= */

async function readJsonBody(
  request,
) {
  return await new Promise(
    (
      resolve,
      reject,
    ) => {
      let body = '';

      request.on(
        'data',
        (chunk) => {
          body +=
            chunk.toString();

          /*
           * Development protection
           * against very large requests.
           */

          if (
            body.length >
            1_000_000
          ) {
            reject(
              new Error(
                'Request too large.',
              ),
            );

            request.destroy();
          }
        },
      );

      request.on(
        'end',
        () => {
          try {
            resolve(
              body
                ? JSON.parse(
                    body,
                  )
                : {},
            );
          } catch {
            reject(
              new Error(
                'Invalid JSON.',
              ),
            );
          }
        },
      );

      request.on(
        'error',
        reject,
      );
    },
  );
}

/* =========================================================
   EXECUTE DOCKER
========================================================= */

function runDocker(
  args,
) {
  return new Promise(
    (
      resolve,
    ) => {
      execFile(
        'docker',
        args,
        {
          windowsHide:
            true,

          /*
           * Overall Docker
           * command timeout.
           */

          timeout:
            15_000,

          /*
           * Prevent unlimited output.
           */

          maxBuffer:
            1024 *
            1024,
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
   EXECUTE COMPILED LANGUAGE

   Used by:
   - C
   - C++

   Same execution flow.
========================================================= */

async function executeCompiledCode({
  language,
  code,
  input = '',
}) {
  const config =
    LANGUAGE_CONFIG[
      language
    ];

  if (!config) {
    return {
      status:
        'UNSUPPORTED_LANGUAGE',

      message:
        `Unsupported language: ${language}`,
    };
  }

  /* =======================================================
     CREATE UNIQUE EXECUTION DIRECTORY
  ======================================================= */

  const executionId =
    crypto.randomUUID();

  const workDirectory =
    path.join(
      os.tmpdir(),
      `elab-${executionId}`,
    );

  await mkdir(
    workDirectory,
    {
      recursive:
        true,
    },
  );

  /* =======================================================
     SOURCE FILE
  ======================================================= */

  const sourcePath =
    path.join(
      workDirectory,
      config.sourceFile,
    );

  /* =======================================================
     INPUT FILE
  ======================================================= */

  const inputPath =
    path.join(
      workDirectory,
      'input.txt',
    );

  try {
    /* =====================================================
       WRITE LEARNER CODE
    ===================================================== */

    await writeFile(
      sourcePath,
      code,
      'utf8',
    );

    /* =====================================================
       WRITE STDIN
    ===================================================== */

    await writeFile(
      inputPath,
      input,
      'utf8',
    );

    /*
     * Learner code is NOT inserted
     * into the shell command.
     *
     * It is only stored inside:
     *
     * main.c
     * OR
     * main.cpp
     */

    /* =====================================================
       COMPILE + RUN COMMAND
    ===================================================== */

    const shellCommand = `
${config.compileCommand} > /tmp/compile-output.txt 2>&1

COMPILE_STATUS=$?

if [ "$COMPILE_STATUS" -ne 0 ]; then
  cat /tmp/compile-output.txt
  exit 100
fi

chmod 700 /tmp/main

timeout 2s /tmp/main < /workspace/input.txt
    `.trim();

    /* =====================================================
       DOCKER ARGUMENTS
    ===================================================== */

    const dockerArgs = [
      'run',

      '--rm',

      /* -----------------------------------------------
         NO NETWORK
      ----------------------------------------------- */

      '--network',
      'none',

      /* -----------------------------------------------
         MEMORY
      ----------------------------------------------- */

      '--memory',
      '128m',

      '--memory-swap',
      '128m',

      /* -----------------------------------------------
         CPU
      ----------------------------------------------- */

      '--cpus',
      '0.5',

      /* -----------------------------------------------
         PROCESS LIMIT
      ----------------------------------------------- */

      '--pids-limit',
      '64',

      /* -----------------------------------------------
         DROP PRIVILEGES
      ----------------------------------------------- */

      '--cap-drop',
      'ALL',

      '--security-opt',
      'no-new-privileges',

      /* -----------------------------------------------
         READ-ONLY CONTAINER
      ----------------------------------------------- */

      '--read-only',

      /* -----------------------------------------------
         EXECUTABLE TEMP AREA
      ----------------------------------------------- */

      '--tmpfs',
      '/tmp:rw,exec,nosuid,nodev,size=64m',

      /* -----------------------------------------------
         READ-ONLY LEARNER FILES
      ----------------------------------------------- */

      '--mount',
      `type=bind,source=${workDirectory},target=/workspace,readonly`,

      /* -----------------------------------------------
         LANGUAGE IMAGE
      ----------------------------------------------- */

      config.image,

      /* -----------------------------------------------
         RUN COMMAND
      ----------------------------------------------- */

      'sh',

      '-lc',

      shellCommand,
    ];

    /* =====================================================
       RUN CONTAINER
    ===================================================== */

    const result =
      await runDocker(
        dockerArgs,
      );

    /* =====================================================
       SUCCESS
    ===================================================== */

    if (
      !result.error
    ) {
      return {
        status:
          'SUCCESS',

        output:
          result.stdout,

        stderr:
          result.stderr,

        exitCode:
          0,
      };
    }

    /* =====================================================
       EXIT CODE
    ===================================================== */

    const exitCode =
      typeof result.error
        .code ===
        'number'
        ? result.error.code
        : null;

    /* =====================================================
       COMPILATION ERROR

       We manually exit 100
       when gcc/g++ fails.
    ===================================================== */

    if (
      exitCode ===
      100
    ) {
      return {
        status:
          'COMPILATION_ERROR',

        output:
          result.stdout ||
          result.stderr,

        stderr:
          result.stderr,

        exitCode,
      };
    }

    /* =====================================================
       PROGRAM TIMEOUT

       GNU timeout returns 124.
    ===================================================== */

    if (
      exitCode ===
      124
    ) {
      return {
        status:
          'TIME_LIMIT_EXCEEDED',

        output:
          'Time Limit Exceeded',

        stderr:
          result.stderr,

        exitCode,
      };
    }

    /* =====================================================
       HOST-SIDE DOCKER TIMEOUT
    ===================================================== */

    if (
      result.error
        ?.killed
    ) {
      return {
        status:
          'TIME_LIMIT_EXCEEDED',

        output:
          'Time Limit Exceeded',

        stderr:
          result.stderr,

        exitCode,
      };
    }

    /* =====================================================
       RUNTIME ERROR
    ===================================================== */

    return {
      status:
        'RUNTIME_ERROR',

      output:
        result.stdout ||
        result.stderr ||
        'Program exited with an error.',

      stderr:
        result.stderr,

      exitCode,
    };
  } finally {
    /* =====================================================
       ALWAYS DELETE LEARNER FILES
    ===================================================== */

    await rm(
      workDirectory,
      {
        recursive:
          true,

        force:
          true,
      },
    );
  }
}

/* =========================================================
   HTTP SERVER
========================================================= */

const server =
  http.createServer(
    async (
      request,
      response,
    ) => {
      /* ===================================================
         CORS PREFLIGHT
      =================================================== */

      if (
        request.method ===
        'OPTIONS'
      ) {
        response.writeHead(
          204,
          {
            'Access-Control-Allow-Origin':
              '*',

            'Access-Control-Allow-Methods':
              'GET, POST, OPTIONS',

            'Access-Control-Allow-Headers':
              'Content-Type',
          },
        );

        response.end();

        return;
      }

      /* ===================================================
         HEALTH CHECK
      =================================================== */

      if (
        request.method ===
          'GET' &&
        request.url ===
          '/health'
      ) {
        sendJson(
          response,
          200,
          {
            status:
              'ok',

            service:
              'elab-judge',

            supportedLanguages: [
              'c',
              'cpp',
            ],
          },
        );

        return;
      }

      /* ===================================================
         EXECUTE CODE
      =================================================== */

      if (
        request.method ===
          'POST' &&
        request.url ===
          '/run'
      ) {
        try {
          const body =
            await readJsonBody(
              request,
            );

          /* ===============================================
             LANGUAGE
          =============================================== */

          const language =
            normalizeLanguage(
              body.language,
            );

          /* ===============================================
             CHECK LANGUAGE
          =============================================== */

          if (
            !LANGUAGE_CONFIG[
              language
            ]
          ) {
            sendJson(
              response,
              400,
              {
                status:
                  'UNSUPPORTED_LANGUAGE',

                message:
                  `Supported languages are C and C++. Received: ${language || 'none'}.`,
              },
            );

            return;
          }

          /* ===============================================
             CHECK CODE
          =============================================== */

          if (
            !body.code ||
            typeof body.code !==
              'string'
          ) {
            sendJson(
              response,
              400,
              {
                status:
                  'INVALID_REQUEST',

                message:
                  'Code is required.',
              },
            );

            return;
          }

          /* ===============================================
             RUN C OR C++
          =============================================== */

          const result =
            await executeCompiledCode({
              language,

              code:
                body.code,

              input:
                typeof body.input ===
                'string'
                  ? body.input
                  : '',
            });

          /* ===============================================
             RESPONSE
          =============================================== */

          sendJson(
            response,
            200,
            {
              language,

              ...result,
            },
          );
        } catch (
          error
        ) {
          console.error(
            'Judge error:',
            error,
          );

          sendJson(
            response,
            500,
            {
              status:
                'INTERNAL_ERROR',

              message:
                error instanceof
                Error
                  ? error.message
                  : 'Judge failed.',
            },
          );
        }

        return;
      }

      /* ===================================================
         NOT FOUND
      =================================================== */

      sendJson(
        response,
        404,
        {
          status:
            'NOT_FOUND',

          message:
            'Not found.',
        },
      );
    },
  );

/* =========================================================
   START
========================================================= */

server.listen(
  PORT,
  '127.0.0.1',
  () => {
    console.log(
      `eLab Judge running at http://127.0.0.1:${PORT}`,
    );

    console.log(
      'Supported languages: C, C++',
    );

    console.log(
      `C image: ${C_IMAGE}`,
    );

    console.log(
      `C++ image: ${CPP_IMAGE}`,
    );
  },
);