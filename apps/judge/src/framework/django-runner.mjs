import {
  execFile,
} from 'node:child_process';

import {
  mkdir,
  mkdtemp,
  rm,
  writeFile,
  access,
} from 'node:fs/promises';

import os from 'node:os';
import path from 'node:path';

/* =========================================================
   DJANGO FRAMEWORK RUNNER
========================================================= */

const DJANGO_IMAGE =
  'elab-judge-django:latest';

const EXECUTION_TIMEOUT_MS =
  30_000;

const MAX_OUTPUT_BYTES =
  1024 * 1024;

const MAX_FILES =
  30;

const MAX_FILE_BYTES =
  256 * 1024;

const ALLOWED_EXTENSIONS =
  new Set([
    '.py',
    '.html',
    '.txt',
    '.json',
  ]);

/* =========================================================
   PATH HELPERS
========================================================= */

function normalizeFilePath(
  filePath,
) {
  return String(
    filePath ?? '',
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

function isSafeRelativePath(
  filePath,
) {
  if (!filePath) {
    return false;
  }

  if (
    path.posix.isAbsolute(
      filePath,
    )
  ) {
    return false;
  }

  const parts =
    filePath.split('/');

  return !parts.some(
    (part) =>
      part === '..' ||
      part === '',
  );
}

function isAllowedFile(
  filePath,
) {
  const extension =
    path.posix.extname(
      filePath,
    ).toLowerCase();

  return ALLOWED_EXTENSIONS.has(
    extension,
  );
}

async function fileExists(
  filePath,
) {
  try {
    await access(
      filePath,
    );

    return true;
  } catch {
    return false;
  }
}

/* =========================================================
   DOCKER EXECUTION
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

          timeout:
            EXECUTION_TIMEOUT_MS,

          maxBuffer:
            MAX_OUTPUT_BYTES,
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
   DOCKER INFRASTRUCTURE ERROR

   Keep learner code errors separate from local Judge/Docker
   infrastructure errors so the API can report the real cause.
========================================================= */

function getDockerInfrastructureMessage(
  result,
) {
  const errorCode =
    result.error?.code;

  const stderr =
    String(
      result.stderr ?? '',
    );

  const combined =
    [
      String(
        result.error?.message ??
        '',
      ),
      stderr,
    ]
      .join('\n')
      .toLowerCase();

  if (
    errorCode === 'ENOENT' ||
    combined.includes(
      'spawn docker enoent',
    )
  ) {
    return 'Docker CLI is not available to the Django judge.';
  }

  if (
    combined.includes(
      'cannot connect to the docker daemon',
    ) ||
    combined.includes(
      'is the docker daemon running',
    ) ||
    combined.includes(
      'error during connect',
    )
  ) {
    return 'Docker Desktop / Docker daemon is not running for the Django judge.';
  }

  if (
    combined.includes(
      'unable to find image',
    ) ||
    combined.includes(
      'pull access denied',
    ) ||
    combined.includes(
      'repository does not exist',
    )
  ) {
    return `Django judge image ${DJANGO_IMAGE} is not available locally. Build it before running Django problems.`;
  }

  if (
    combined.includes(
      'invalid mount config',
    ) ||
    combined.includes(
      'mount denied',
    ) ||
    combined.includes(
      'drive is not shared',
    )
  ) {
    return 'Docker could not mount the temporary Django workspace.';
  }

  if (
    typeof errorCode ===
      'number' &&
    errorCode ===
      125
  ) {
    return (
      stderr.trim() ||
      'Unable to start the Django sandbox container.'
    );
  }

  return null;
}

/* =========================================================
   WRITE FILE IF MISSING
========================================================= */

async function writeFileIfMissing(
  rootDirectory,
  relativePath,
  content,
) {
  const normalizedPath =
    normalizeFilePath(
      relativePath,
    );

  const absolutePath =
    path.join(
      rootDirectory,
      ...normalizedPath.split('/'),
    );

  if (
    await fileExists(
      absolutePath,
    )
  ) {
    return;
  }

  await mkdir(
    path.dirname(
      absolutePath,
    ),
    {
      recursive:
        true,
    },
  );

  await writeFile(
    absolutePath,
    content,
    'utf8',
  );
}

/* =========================================================
   LEARNER FILES
========================================================= */

async function writeLearnerFiles(
  rootDirectory,
  files,
) {
  if (
    !Array.isArray(
      files,
    ) ||
    files.length === 0
  ) {
    throw new Error(
      'At least one Django learner file is required.',
    );
  }

  if (
    files.length >
    MAX_FILES
  ) {
    throw new Error(
      `Too many Django files. Maximum allowed is ${MAX_FILES}.`,
    );
  }

  for (
    let index = 0;
    index < files.length;
    index += 1
  ) {
    const file =
      files[index];

    if (
      !file ||
      typeof file !== 'object'
    ) {
      throw new Error(
        `Invalid Django file at index ${index}.`,
      );
    }

    const normalizedPath =
      normalizeFilePath(
        file.path,
      );

    if (
      !isSafeRelativePath(
        normalizedPath,
      )
    ) {
      throw new Error(
        `Unsafe Django file path: ${file.path}`,
      );
    }

    if (
      !isAllowedFile(
        normalizedPath,
      )
    ) {
      throw new Error(
        `Unsupported Django file type: ${normalizedPath}`,
      );
    }

    if (
      typeof file.content !==
      'string'
    ) {
      throw new Error(
        `Django file content must be a string: ${normalizedPath}`,
      );
    }

    if (
      Buffer.byteLength(
        file.content,
        'utf8',
      ) >
      MAX_FILE_BYTES
    ) {
      throw new Error(
        `Django file is too large: ${normalizedPath}`,
      );
    }

    const absolutePath =
      path.join(
        rootDirectory,
        ...normalizedPath.split('/'),
      );

    await mkdir(
      path.dirname(
        absolutePath,
      ),
      {
        recursive:
          true,
      },
    );

    await writeFile(
      absolutePath,
      file.content,
      'utf8',
    );
  }
}

/* =========================================================
   DJANGO SUPPORT PROJECT

   Missing project files are scaffolded automatically.
   Learner files are never overwritten.
========================================================= */

async function scaffoldDjangoProject(
  rootDirectory,
) {
  await writeFileIfMissing(
    rootDirectory,
    'manage.py',
    `#!/usr/bin/env python
import os
import sys


def main():
    os.environ.setdefault(
        "DJANGO_SETTINGS_MODULE",
        "project.settings",
    )

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
`,
  );

  await writeFileIfMissing(
    rootDirectory,
    'project/__init__.py',
    '',
  );

  await writeFileIfMissing(
    rootDirectory,
    'project/settings.py',
    `SECRET_KEY = "elab-django-sandbox"

DEBUG = False

ALLOWED_HOSTS = ["*"]

ROOT_URLCONF = "project.urls"

INSTALLED_APPS = [
    "django.contrib.contenttypes",
    "app",
]

MIDDLEWARE = []

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": "/tmp/elab-django.sqlite3",
    },
}

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {},
    },
]

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

USE_TZ = True
`,
  );

  await writeFileIfMissing(
    rootDirectory,
    'project/urls.py',
    `from django.urls import include, path


urlpatterns = [
    path("", include("app.urls")),
]
`,
  );

  await writeFileIfMissing(
    rootDirectory,
    'app/__init__.py',
    '',
  );

  await writeFileIfMissing(
    rootDirectory,
    'app/apps.py',
    `from django.apps import AppConfig


class AppConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "app"
`,
  );

  await writeFileIfMissing(
    rootDirectory,
    'app/models.py',
    `from django.db import models


class Course(models.Model):
    title = models.CharField(max_length=120)
    duration = models.PositiveIntegerField(default=0)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.title


class Student(models.Model):
    name = models.CharField(max_length=120)
    score = models.IntegerField(default=0)

    def __str__(self):
        return self.name
`,
  );

  await writeFileIfMissing(
    rootDirectory,
    'app/views.py',
    `from django.http import HttpResponse


def home(request):
    return HttpResponse("Home")


def hello(request):
    return HttpResponse("Hello")


def profile(request):
    return HttpResponse("Profile")


def course_detail(request, course_id):
    return HttpResponse(str(course_id))


def submit_name(request):
    return HttpResponse("Submit")


def health(request):
    return HttpResponse("OK")


def course_list(request):
    return HttpResponse("Courses")


def create_course(request):
    return HttpResponse("Create Course")
`,
  );

  await writeFileIfMissing(
    rootDirectory,
    'app/urls.py',
    `from django.urls import path


urlpatterns = []
`,
  );

  await writeFileIfMissing(
    rootDirectory,
    'app/services.py',
    '',
  );

  await writeFileIfMissing(
    rootDirectory,
    'app/migrations/__init__.py',
    '',
  );
}

/* =========================================================
   DJANGO TEST RUNNER SCRIPT

   Runs function-based Django view tests inside the same
   isolated Django container after compileall/manage.py check.
========================================================= */

function buildDjangoTestScript(
  tests,
) {
  const safeTests =
    Array.isArray(tests)
      ? tests
      : [];

  return `import importlib
import json
import sys

from django.test import RequestFactory

tests = json.loads(${JSON.stringify(JSON.stringify(safeTests))})
factory = RequestFactory()
results = []

for index, test in enumerate(tests):
    test_id = str(test.get("id") or f"test-{index + 1}")
    callable_path = str(test.get("callable") or "").strip()
    expected_status = int(test.get("expectedStatus", 200))
    expected_output = str(test.get("expectedOutput", ""))

    result = {
        "id": test_id,
        "passed": False,
        "status": "FAILED",
        "expectedStatus": expected_status,
        "actualStatus": None,
        "expectedOutput": expected_output,
        "actualOutput": "",
    }

    try:
        if not callable_path or "." not in callable_path:
            raise ValueError("Django test callable is required.")

        module_name, function_name = callable_path.rsplit(".", 1)
        module = importlib.import_module(module_name)
        view = getattr(module, function_name)

        request = factory.get("/")
        response = view(request)

        actual_status = int(getattr(response, "status_code", 200))
        content = getattr(response, "content", b"")

        if isinstance(content, bytes):
            actual_output = content.decode("utf-8")
        else:
            actual_output = str(content)

        passed = (
            actual_status == expected_status
            and actual_output == expected_output
        )

        result.update({
            "passed": passed,
            "status": "PASSED" if passed else "FAILED",
            "actualStatus": actual_status,
            "actualOutput": actual_output,
        })
    except Exception as error:
        result["actualOutput"] = f"{type(error).__name__}: {error}"

    results.append(result)

print("__ELAB_DJANGO_TEST_RESULTS__" + json.dumps(results))

if not all(item["passed"] for item in results):
    sys.exit(3)
`;
}

function parseDjangoTestResults(
  stdout,
) {
  const marker =
    '__ELAB_DJANGO_TEST_RESULTS__';

  const lines =
    String(stdout ?? '')
      .split(/\r?\n/);

  const resultLine =
    lines.find(
      (line) =>
        line.startsWith(marker),
    );

  if (!resultLine) {
    return null;
  }

  try {
    return JSON.parse(
      resultLine.slice(
        marker.length,
      ),
    );
  } catch {
    return null;
  }
}

/* =========================================================
   MAIN DJANGO FRAMEWORK RUNNER
========================================================= */

export async function runDjangoFramework({
  problemSlug,
  files,
  tests,
}) {
  const executionDirectory =
    await mkdtemp(
      path.join(
        os.tmpdir(),
        'elab-django-',
      ),
    );

  const testsReceived =
    Array.isArray(
      tests,
    )
      ? tests.length
      : 0;

  try {
    await writeLearnerFiles(
      executionDirectory,
      files,
    );

    await scaffoldDjangoProject(
      executionDirectory,
    );

    if (
      testsReceived > 0
    ) {
      await writeFile(
        path.join(
          executionDirectory,
          '__elab_django_tests.py',
        ),
        buildDjangoTestScript(
          tests,
        ),
        'utf8',
      );
    }

    const validationCommand = `
set -eu

export PYTHONPYCACHEPREFIX=/tmp/pycache
export DJANGO_SETTINGS_MODULE=project.settings
export PYTHONPATH=/workspace

cd /workspace

# Validate Python syntax for all submitted/scaffolded files.
python -m compileall -q .

# Validate Django imports, settings, URL configuration, apps, and models.
python manage.py check --verbosity 0

echo "Django validation passed."

if [ -f /workspace/__elab_django_tests.py ]; then
  python /workspace/__elab_django_tests.py
fi
    `.trim();

    const dockerArgs = [
      'run',
      '--rm',

      '--network',
      'none',

      '--memory',
      '256m',

      '--memory-swap',
      '256m',

      '--cpus',
      '0.5',

      '--pids-limit',
      '64',

      '--cap-drop',
      'ALL',

      '--security-opt',
      'no-new-privileges',

      '--read-only',

      '--tmpfs',
      '/tmp:rw,exec,nosuid,nodev,size=128m',

      '--mount',
      `type=bind,source=${executionDirectory},target=/workspace,readonly`,

      DJANGO_IMAGE,

      'sh',
      '-lc',
      validationCommand,
    ];

    const result =
      await runDocker(
        dockerArgs,
      );

    if (
      !result.error
    ) {
      const testResults =
        testsReceived > 0
          ? parseDjangoTestResults(
              result.stdout,
            )
          : [];

      if (
        testsReceived > 0 &&
        !Array.isArray(
          testResults,
        )
      ) {
        return {
          runtime:
            'django',

          problemSlug,

          status:
            'INTERNAL_ERROR',

          output:
            result.stdout,

          stderr:
            result.stderr,

          exitCode:
            0,

          message:
            'Django tests ran but their results could not be parsed.',

          testsReceived,

          testsExecuted:
            0,
        };
      }

      const executedTests =
        Array.isArray(testResults)
          ? testResults
          : [];

      const passedTests =
        executedTests.filter(
          (test) =>
            test.passed,
        ).length;

      const failedTests =
        executedTests.length -
        passedTests;

      const cleanOutput =
        String(
          result.stdout ?? '',
        )
          .split(/\r?\n/)
          .filter(
            (line) =>
              !line.startsWith(
                '__ELAB_DJANGO_TEST_RESULTS__',
              ),
          )
          .join('\n')
          .trim();

      return {
        runtime:
          'django',

        problemSlug,

        status:
          failedTests > 0
            ? 'RUNTIME_ERROR'
            : 'SUCCESS',

        output:
          cleanOutput,

        stderr:
          result.stderr,

        exitCode:
          0,

        message:
          testsReceived > 0
            ? failedTests > 0
              ? 'One or more Django tests failed.'
              : 'All Django tests passed.'
            : 'Django validation passed.',

        testsReceived,

        testsExecuted:
          executedTests.length,

        passedTests,

        failedTests,

        totalTests:
          executedTests.length,

        tests:
          executedTests,
      };
    }

    const exitCode =
      typeof result.error?.code ===
        'number'
        ? result.error.code
        : null;

    if (
      result.error?.killed
    ) {
      return {
        runtime:
          'django',

        problemSlug,

        status:
          'TIME_LIMIT_EXCEEDED',

        output:
          'Django validation exceeded the execution time limit.',

        stderr:
          result.stderr,

        exitCode,

        testsReceived,

        testsExecuted:
          0,
      };
    }

    if (
      exitCode === 3
    ) {
      const testResults =
        parseDjangoTestResults(
          result.stdout,
        );

      const executedTests =
        Array.isArray(testResults)
          ? testResults
          : [];

      const passedTests =
        executedTests.filter(
          (test) =>
            test.passed,
        ).length;

      const failedTests =
        executedTests.length -
        passedTests;

      const cleanOutput =
        String(
          result.stdout ?? '',
        )
          .split(/\r?\n/)
          .filter(
            (line) =>
              !line.startsWith(
                '__ELAB_DJANGO_TEST_RESULTS__',
              ),
          )
          .join('\n')
          .trim();

      return {
        runtime:
          'django',

        problemSlug,

        status:
          'RUNTIME_ERROR',

        output:
          cleanOutput,

        stderr:
          result.stderr,

        exitCode,

        message:
          'One or more Django tests failed.',

        testsReceived,

        testsExecuted:
          executedTests.length,

        passedTests,

        failedTests,

        totalTests:
          executedTests.length,

        tests:
          executedTests,
      };
    }

    const infrastructureMessage =
      getDockerInfrastructureMessage(
        result,
      );

    if (
      infrastructureMessage
    ) {
      return {
        runtime:
          'django',

        problemSlug,

        status:
          'INTERNAL_ERROR',

        output:
          result.stdout,

        stderr:
          result.stderr,

        exitCode,

        message:
          infrastructureMessage,

        testsReceived,

        testsExecuted:
          0,
      };
    }

    return {
      runtime:
        'django',

      problemSlug,

      status:
        'COMPILATION_ERROR',

      output:
        result.stdout ||
        result.stderr ||
        'Django validation failed.',

      stderr:
        result.stderr,

      exitCode,

      testsReceived,

      testsExecuted:
        0,
    };
  } catch (
    error
  ) {
    return {
      runtime:
        'django',

      problemSlug,

      status:
        'INVALID_REQUEST',

      output:
        '',

      stderr:
        '',

      exitCode:
        null,

      message:
        error instanceof Error
          ? error.message
          : 'Invalid Django execution request.',

      testsReceived,

      testsExecuted:
        0,
    };
  } finally {
    await rm(
      executionDirectory,
      {
        recursive:
          true,

        force:
          true,
      },
    );
  }
}
