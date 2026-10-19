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
   NEXT.JS FRAMEWORK RUNNER

   Used by:

   C:\dev\elab-platform\apps\judge\src\server.mjs

   Runtime image:

   elab-judge-nextjs:latest

   Current responsibility:

   - validate learner framework files
   - create an isolated temporary workspace
   - mount learner files read-only into Docker
   - create a minimal Next.js App Router project in /tmp
   - reuse dependencies already installed in the runtime image
   - run `next build`
   - return SUCCESS / COMPILATION_ERROR /
     TIME_LIMIT_EXCEEDED / RUNTIME_ERROR

   IMPORTANT:

   This stage enables Next.js Run / compilation validation.

   Next.js hidden submission tests are intentionally handled
   in the next stage. The `tests` argument is accepted now so
   the runner already matches the common framework-runner
   interface used by server.mjs.
========================================================= */

/* =========================================================
   CONFIG
========================================================= */

const NEXTJS_IMAGE =
  'elab-judge-nextjs:latest';

const RUNTIME =
  'nextjs';

const BUILD_TIMEOUT_MS =
  90_000;

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
    '.jsx',
    '.ts',
    '.tsx',
    '.json',
    '.css',
    '.scss',
    '.sass',
    '.mjs',
    '.cjs',
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
        'At least one Next.js file is required.',
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
          `Invalid Next.js file at index ${index}.`,
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
          `Next.js file path is required at index ${index}.`,
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
          `Unsafe or unsupported Next.js file path at index ${index}: ${file.path}`,
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
          `Next.js file content is required at index ${index}.`,
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
          `Next.js file language is required at index ${index}.`,
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

   The learner workspace is mounted read-only at:

   /workspace

   The runtime image already contains the complete Next.js
   project dependency root at:

   /runtime

   including:

   /runtime/package.json
   /runtime/node_modules

   Learner files are copied into /runtime inside the ephemeral
   container and Next.js builds from /runtime.

   This is intentional.

   Do NOT symlink /runtime/node_modules into another project
   directory. Next.js 16 Turbopack rejects a node_modules
   symlink that points outside the detected project filesystem
   root.

   Because every `docker run --rm` starts a fresh container,
   copying learner files into /runtime does not modify the
   reusable Docker image.

   IMPORTANT:
   Alpine's `sh -lc` can reset PATH through /etc/profile.
   Therefore the Next.js CLI is invoked with its absolute path:
   /runtime/node_modules/.bin/next

   Next.js 16 uses Turbopack by default for `next build`.
   For this isolated judge runtime we explicitly use Webpack:
   `next build --webpack`.

   This reduces the chance of the build being killed under the
   sandbox memory limit and avoids Turbopack-specific filesystem
   behavior that is unnecessary for these small training problems.
========================================================= */

function createBuildCommand() {
  return `
set -eu

APP_DIR="/runtime"

cd "$APP_DIR"

rm -rf "$APP_DIR/.next"

cp -R /workspace/. "$APP_DIR"/

if [ ! -f package.json ]; then
  cat > package.json <<'ELAB_PACKAGE'
{
  "name": "elab-nextjs-submission",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "next build"
  },
  "dependencies": {
    "next": "16.3.5",
    "react": "19.2.8",
    "react-dom": "19.2.8"
  },
  "devDependencies": {
    "@types/node": "20.19.43",
    "@types/react": "19.3.0",
    "@types/react-dom": "19.3.0",
    "typescript": "5.9.3"
  }
}
ELAB_PACKAGE
fi

if [ ! -f tsconfig.json ]; then
  cat > tsconfig.json <<'ELAB_TSCONFIG'
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": false,
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
ELAB_TSCONFIG
fi

if [ ! -f next-env.d.ts ]; then
  cat > next-env.d.ts <<'ELAB_NEXT_ENV'
/// <reference types="next" />
/// <reference types="next/image-types/global" />
ELAB_NEXT_ENV
fi

if [ ! -d app ] && [ ! -d src/app ]; then
  mkdir -p app

  cat > app/page.tsx <<'ELAB_DEFAULT_PAGE'
export default function HomePage() {
  return (
    <main>
      Next.js eLab
    </main>
  );
}
ELAB_DEFAULT_PAGE
fi

if [ -d app ]; then
  if [ ! -f app/layout.tsx ] && [ ! -f app/layout.jsx ] && [ ! -f app/layout.js ]; then
    cat > app/layout.tsx <<'ELAB_DEFAULT_LAYOUT'
import type {
  ReactNode,
} from 'react';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
ELAB_DEFAULT_LAYOUT
  fi
fi

if [ -d src/app ]; then
  if [ ! -f src/app/layout.tsx ] && [ ! -f src/app/layout.jsx ] && [ ! -f src/app/layout.js ]; then
    cat > src/app/layout.tsx <<'ELAB_DEFAULT_SRC_LAYOUT'
import type {
  ReactNode,
} from 'react';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
ELAB_DEFAULT_SRC_LAYOUT
  fi
fi

NEXT_TELEMETRY_DISABLED=1 \
NODE_ENV=production \
/runtime/node_modules/.bin/next build --webpack
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

       The Next.js runtime image already contains every
       required dependency.
    ----------------------------------------------------- */

    '--network',
    'none',

    /* -----------------------------------------------------
       RESOURCE LIMITS
    ----------------------------------------------------- */

    '--memory',
    '1536m',

    '--memory-swap',
    '1536m',

    '--cpus',
    '1.5',

    '--pids-limit',
    '256',

    /* -----------------------------------------------------
       SECURITY
    ----------------------------------------------------- */

    '--cap-drop',
    'ALL',

    '--security-opt',
    'no-new-privileges',

    /* -----------------------------------------------------
       READ-ONLY LEARNER SOURCE
    ----------------------------------------------------- */

    '--mount',
    `type=bind,source=${workDirectory},target=/workspace,readonly`,

    /* -----------------------------------------------------
       WRITABLE TEMP STORAGE

       /tmp remains available for Next.js temporary files.
       The actual project and .next output live in /runtime,
       which is writable inside this ephemeral container.
    ----------------------------------------------------- */

    '--tmpfs',
    '/tmp:rw,noexec,nosuid,size=512m',

    /* -----------------------------------------------------
       ENVIRONMENT
    ----------------------------------------------------- */

    '--env',
    'NEXT_TELEMETRY_DISABLED=1',

    '--env',
    'NODE_ENV=production',

    NEXTJS_IMAGE,

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
   RUN NEXT.JS FRAMEWORK
========================================================= */

export async function runNextJsFramework({
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
      `elab-nextjs-${executionId}`,
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
          'Next.js application compiled successfully.',

        stderr:
          '',

        exitCode:
          0,

        /*
         * Hidden Next.js submission tests are added in the
         * next stage. Keep this information explicit rather
         * than pretending that tests were executed.
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
          'Next.js build exceeded the allowed execution time.',

        stderr:
          result.stderr,

        exitCode,
      };
    }

    /* =====================================================
       BUILD / TYPESCRIPT / NEXT.JS COMPILATION ERROR

       next build returns a non-zero exit code for:
       - TS errors
       - invalid JSX/TSX
       - Next.js build errors
       - invalid route/module code
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
          'Next.js compilation failed.',

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
        'Unable to execute the Next.js runtime.',

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
          : 'Unable to execute the Next.js runtime.',

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
