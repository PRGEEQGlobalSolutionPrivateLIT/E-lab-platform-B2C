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
   NESTJS FRAMEWORK RUNNER

   Used by:

   C:\dev\elab-platform\apps\judge\src\server.mjs

   Runtime image:

   elab-judge-nestjs:latest

   Current responsibility:

   - validate learner NestJS files
   - create an isolated temporary workspace
   - mount learner files read-only into Docker
   - copy learner source into writable /tmp storage
   - reuse dependencies already installed in the runtime image
   - create a minimal TypeScript configuration
   - run TypeScript compilation validation
   - return SUCCESS / COMPILATION_ERROR /
     TIME_LIMIT_EXCEEDED / RUNTIME_ERROR

   IMPORTANT:

   This stage enables NestJS Run / compilation validation.

   Hidden NestJS submission tests are intentionally handled
   in a later stage. The `tests` argument is accepted now so
   the runner matches the shared framework-runner interface.
========================================================= */

/* =========================================================
   CONFIG
========================================================= */

const NESTJS_IMAGE =
  'elab-judge-nestjs:latest';

const RUNTIME =
  'nestjs';

const BUILD_TIMEOUT_MS =
  30_000;

const MAX_BUFFER_BYTES =
  4 *
  1024 *
  1024;

/* =========================================================
   ALLOWED LEARNER FILE EXTENSIONS
========================================================= */

const ALLOWED_EXTENSIONS =
  new Set([
    '.js',
    '.mjs',
    '.cjs',
    '.ts',
    '.json',
  ]);

/* =========================================================
   NORMALIZE FILE PATH
========================================================= */

function normalizeFilePath(
  filePath,
) {
  return String(
    filePath ??
      '',
  )
    .replace(
      /\\/g,
      '/',
    )
    .replace(
      /^\/+/,
      '',
    )
    .trim();
}

/* =========================================================
   SAFE FILE PATH
========================================================= */

function isSafeFilePath(
  filePath,
) {
  if (
    !filePath
  ) {
    return false;
  }

  if (
    filePath.includes(
      '\0',
    )
  ) {
    return false;
  }

  const normalized =
    normalizeFilePath(
      filePath,
    );

  if (
    !normalized
  ) {
    return false;
  }

  if (
    normalized ===
      '..' ||
    normalized.startsWith(
      '../',
    ) ||
    normalized.includes(
      '/../',
    )
  ) {
    return false;
  }

  if (
    /^[A-Za-z]:\//.test(
      normalized,
    )
  ) {
    return false;
  }

  const extension =
    path.posix
      .extname(
        normalized,
      )
      .toLowerCase();

  return (
    ALLOWED_EXTENSIONS.has(
      extension,
    )
  );
}

/* =========================================================
   RUN PROCESS
========================================================= */

function runProcess(
  command,
  args,
  options = {},
) {
  return new Promise(
    (
      resolve,
    ) => {
      execFile(
        command,
        args,
        {
          windowsHide:
            true,

          timeout:
            options.timeout ??
            BUILD_TIMEOUT_MS,

          maxBuffer:
            options.maxBuffer ??
            MAX_BUFFER_BYTES,
        },
        (
          error,
          stdout,
          stderr,
        ) => {
          resolve({
            error,

            stdout:
              stdout ??
              '',

            stderr:
              stderr ??
              '',
          });
        },
      );
    },
  );
}

/* =========================================================
   WRITE LEARNER FILES
========================================================= */

async function writeLearnerFiles({
  workDirectory,
  files,
}) {
  for (
    let index = 0;
    index <
    files.length;
    index += 1
  ) {
    const file =
      files[
        index
      ];

    const normalizedPath =
      normalizeFilePath(
        file.path,
      );

    const targetPath =
      path.join(
        workDirectory,
        ...normalizedPath.split(
          '/',
        ),
      );

    const targetDirectory =
      path.dirname(
        targetPath,
      );

    await mkdir(
      targetDirectory,
      {
        recursive:
          true,
      },
    );

    await writeFile(
      targetPath,
      file.content,
      'utf8',
    );
  }
}

/* =========================================================
   VALIDATE FILES
========================================================= */

function validateFiles(
  files,
) {
  if (
    !Array.isArray(
      files,
    ) ||
    files.length ===
      0
  ) {
    return {
      valid:
        false,

      message:
        'At least one NestJS file is required.',
    };
  }

  for (
    let index = 0;
    index <
    files.length;
    index += 1
  ) {
    const file =
      files[
        index
      ];

    if (
      !file ||
      typeof file !==
        'object'
    ) {
      return {
        valid:
          false,

        message:
          `Invalid NestJS file at index ${index}.`,
      };
    }

    if (
      typeof file.path !==
        'string' ||
      !file.path.trim()
    ) {
      return {
        valid:
          false,

        message:
          `NestJS file path is required at index ${index}.`,
      };
    }

    if (
      !isSafeFilePath(
        file.path,
      )
    ) {
      return {
        valid:
          false,

        message:
          `Unsafe or unsupported NestJS file path at index ${index}: ${file.path}`,
      };
    }

    if (
      typeof file.content !==
        'string'
    ) {
      return {
        valid:
          false,

        message:
          `NestJS file content is required at index ${index}.`,
      };
    }

    if (
      typeof file.language !==
        'string' ||
      !file.language.trim()
    ) {
      return {
        valid:
          false,

        message:
          `NestJS file language is required at index ${index}.`,
      };
    }
  }

  return {
    valid:
      true,
  };
}

/* =========================================================
   BUILD SHELL COMMAND

   Learner source is mounted read-only at:

   /workspace

   Compilation needs a writable project directory because
   TypeScript and supporting tools may create temporary files.

   Therefore learner files are copied to:

   /tmp/nest-app

   Runtime dependencies are already installed at:

   /runtime/node_modules

   We symlink those dependencies into the temporary project.

   No npm install is performed while learner code executes.
========================================================= */

function createBuildCommand() {
  return `
set -eu

APP_DIR="/tmp/nest-app"

rm -rf "$APP_DIR"
mkdir -p "$APP_DIR"

cp -R /workspace/. "$APP_DIR"/

cd "$APP_DIR"

ln -s /runtime/node_modules "$APP_DIR/node_modules"

if [ ! -f package.json ]; then
  cat > package.json <<'ELAB_PACKAGE'
{
  "name": "elab-nestjs-submission",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "@nestjs/common": "11.1.6",
    "@nestjs/core": "11.1.6",
    "@nestjs/platform-express": "11.1.6",
    "class-transformer": "0.5.1",
    "class-validator": "0.14.2",
    "reflect-metadata": "0.2.2",
    "rxjs": "7.8.2"
  },
  "devDependencies": {
    "@types/node": "20.19.43",
    "typescript": "5.9.3"
  }
}
ELAB_PACKAGE
fi

if [ ! -f tsconfig.json ]; then
  cat > tsconfig.json <<'ELAB_TSCONFIG'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "moduleResolution": "node",
    "lib": [
      "ES2022"
    ],
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "useDefineForClassFields": false,
    "resolveJsonModule": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "types": [
      "node"
    ]
  },
  "include": [
    "src/**/*.ts",
    "*.ts"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}
ELAB_TSCONFIG
fi

/runtime/node_modules/.bin/tsc \
  -p tsconfig.json \
  --pretty false
`.trim();
}

/* =========================================================
   DOCKER ARGUMENTS
========================================================= */

function createDockerArgs({
  workDirectory,
}) {
  const shellCommand =
    createBuildCommand();

  return [
    'run',

    '--rm',

    /* -----------------------------------------------------
       NO NETWORK

       The NestJS runtime image already contains every
       required dependency.
    ----------------------------------------------------- */

    '--network',
    'none',

    /* -----------------------------------------------------
       RESOURCE LIMITS
    ----------------------------------------------------- */

    '--memory',
    '512m',

    '--memory-swap',
    '512m',

    '--cpus',
    '1.0',

    '--pids-limit',
    '128',

    /* -----------------------------------------------------
       SECURITY
    ----------------------------------------------------- */

    '--cap-drop',
    'ALL',

    '--security-opt',
    'no-new-privileges',

    '--read-only',

    /* -----------------------------------------------------
       READ-ONLY LEARNER SOURCE
    ----------------------------------------------------- */

    '--mount',
    `type=bind,source=${workDirectory},target=/workspace,readonly`,

    /* -----------------------------------------------------
       WRITABLE TEMP STORAGE
    ----------------------------------------------------- */

    '--tmpfs',
    '/tmp:rw,noexec,nosuid,size=256m',

    /* -----------------------------------------------------
       ENVIRONMENT
    ----------------------------------------------------- */

    '--env',
    'NODE_ENV=production',

    NESTJS_IMAGE,

    'sh',

    '-lc',

    shellCommand,
  ];
}

/* =========================================================
   NORMALIZE BUILD OUTPUT
========================================================= */

function normalizeBuildOutput({
  stdout,
  stderr,
}) {
  const combined =
    [
      stdout,
      stderr,
    ]
      .filter(
        Boolean,
      )
      .join(
        '\n',
      )
      .trim();

  if (
    combined.length <=
    12_000
  ) {
    return combined;
  }

  return (
    combined.slice(
      -12_000,
    )
  );
}

/* =========================================================
   RUN NESTJS FRAMEWORK
========================================================= */

export async function runNestJsFramework({
  problemSlug,
  files,
  tests,
}) {
  const validation =
    validateFiles(
      files,
    );

  if (
    !validation.valid
  ) {
    return {
      runtime:
        RUNTIME,

      status:
        'INVALID_REQUEST',

      message:
        validation.message,
    };
  }

  const executionId =
    crypto.randomUUID();

  const workDirectory =
    path.join(
      os.tmpdir(),
      `elab-nestjs-${executionId}`,
    );

  await mkdir(
    workDirectory,
    {
      recursive:
        true,
    },
  );

  try {
    await writeLearnerFiles({
      workDirectory,
      files,
    });

    const dockerArgs =
      createDockerArgs({
        workDirectory,
      });

    const result =
      await runProcess(
        'docker',
        dockerArgs,
        {
          timeout:
            BUILD_TIMEOUT_MS,
        },
      );

    const output =
      normalizeBuildOutput({
        stdout:
          result.stdout,

        stderr:
          result.stderr,
      });

    /* =====================================================
       SUCCESS
    ===================================================== */

    if (
      !result.error
    ) {
      return {
        runtime:
          RUNTIME,

        problemSlug,

        status:
          'SUCCESS',

        output:
          output ||
          'NestJS TypeScript compilation completed successfully.',

        stderr:
          '',

        exitCode:
          0,

        /*
         * Hidden NestJS tests are added later.
         * Keep this explicit instead of pretending that
         * tests were executed by this runner.
         */
        testsReceived:
          Array.isArray(
            tests,
          )
            ? tests.length
            : 0,

        testsExecuted:
          0,
      };
    }

    /* =====================================================
       EXIT CODE
    ===================================================== */

    const exitCode =
      typeof result.error
        ?.code ===
        'number'
        ? result.error.code
        : null;

    /* =====================================================
       HOST TIMEOUT
    ===================================================== */

    if (
      result.error
        ?.killed
    ) {
      return {
        runtime:
          RUNTIME,

        problemSlug,

        status:
          'TIME_LIMIT_EXCEEDED',

        output:
          'NestJS compilation exceeded the allowed execution time.',

        stderr:
          result.stderr,

        exitCode,
      };
    }

    /* =====================================================
       TYPESCRIPT / NESTJS COMPILATION ERROR

       tsc returns a non-zero exit code for:
       - TypeScript syntax errors
       - invalid decorator usage
       - unresolved NestJS imports
       - incompatible local imports
       - invalid DTO/service/controller TypeScript
    ===================================================== */

    if (
      typeof exitCode ===
      'number'
    ) {
      return {
        runtime:
          RUNTIME,

        problemSlug,

        status:
          'COMPILATION_ERROR',

        output:
          output ||
          'NestJS TypeScript compilation failed.',

        stderr:
          result.stderr,

        exitCode,
      };
    }

    /* =====================================================
       DOCKER / HOST RUNTIME ERROR
    ===================================================== */

    return {
      runtime:
        RUNTIME,

      problemSlug,

      status:
        'RUNTIME_ERROR',

      output:
        output ||
        'Unable to execute the NestJS runtime.',

      stderr:
        result.stderr,

      exitCode,
    };
  } catch (
    error
  ) {
    return {
      runtime:
        RUNTIME,

      problemSlug,

      status:
        'RUNTIME_ERROR',

      output:
        error instanceof
          Error
          ? error.message
          : 'Unable to execute the NestJS runtime.',

      stderr:
        '',

      exitCode:
        null,
    };
  } finally {
    /* =====================================================
       ALWAYS REMOVE TEMP FILES
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
