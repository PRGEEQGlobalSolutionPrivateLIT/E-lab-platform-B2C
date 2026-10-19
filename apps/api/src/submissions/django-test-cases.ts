/* =========================================================
   DJANGO HIDDEN TEST CASES

   Path:

   C:\dev\elab-platform\apps\api\src\submissions\django-test-cases.ts

   IMPORTANT:

   - These tests remain server-side.
   - They are never sent to the learner browser.
   - Each Django problem has 3 hidden tests.
   - The Django Judge runner performs the Python syntax and
     Django system-check gate first.
   - SubmissionService evaluates these source checks only
     after successful Django validation.
========================================================= */

/* =========================================================
   TYPES
========================================================= */

export type DjangoSourceCheck = {
  filePath: string;
  pattern: string;
  flags?: string;
  message: string;
};

export type DjangoForbiddenSourceCheck = {
  filePath: string;
  pattern: string;
  flags?: string;
  message: string;
};

export type DjangoHiddenTestCase = {
  id: string;
  title: string;
  requiredFiles?: string[];
  requiredSourceChecks?: DjangoSourceCheck[];
  forbiddenSourceChecks?: DjangoForbiddenSourceCheck[];
};

/* =========================================================
   HELPERS
========================================================= */

function required(
  filePath: string,
  pattern: string,
  message: string,
  flags = 'm',
): DjangoSourceCheck {
  return {
    filePath,
    pattern,
    flags,
    message,
  };
}

function forbidden(
  filePath: string,
  pattern: string,
  message: string,
  flags = 'm',
): DjangoForbiddenSourceCheck {
  return {
    filePath,
    pattern,
    flags,
    message,
  };
}

/* =========================================================
   TEST BANK
========================================================= */

const DJANGO_TEST_CASES:
  Record<
    string,
    DjangoHiddenTestCase[]
  > = {

  /* =======================================================
     01 — BASIC VIEW
  ======================================================= */

  'django-basic-view': [
    {
      id:
        'django-basic-view-1',

      title:
        'Creates the home view',

      requiredFiles: [
        'app/views.py',
      ],

      requiredSourceChecks: [
        required(
          'app/views.py',
          String.raw`from\s+django\.http\s+import\s+HttpResponse`,
          'Import HttpResponse from django.http.',
        ),

        required(
          'app/views.py',
          String.raw`def\s+home\s*\(\s*request\s*\)\s*:`,
          'Define a function named home(request).',
        ),
      ],
    },

    {
      id:
        'django-basic-view-2',

      title:
        'Returns an HttpResponse',

      requiredSourceChecks: [
        required(
          'app/views.py',
          String.raw`return\s+HttpResponse\s*\(`,
          'Return an HttpResponse from home().',
        ),
      ],
    },

    {
      id:
        'django-basic-view-3',

      title:
        'Returns the required text',

      requiredSourceChecks: [
        required(
          'app/views.py',
          String.raw`HttpResponse\s*\(\s*["']Welcome\s+to\s+Django["']\s*\)`,
          'Return exactly "Welcome to Django".',
          'im',
        ),
      ],

      forbiddenSourceChecks: [
        forbidden(
          'app/views.py',
          String.raw`\bpass\b`,
          'Remove pass and implement the view.',
        ),
      ],
    },
  ],

  /* =======================================================
     02 — URL ROUTE
  ======================================================= */

  'django-url-route': [
    {
      id:
        'django-url-route-1',

      title:
        'Imports path and hello',

      requiredFiles: [
        'app/urls.py',
      ],

      requiredSourceChecks: [
        required(
          'app/urls.py',
          String.raw`from\s+django\.urls\s+import\s+path`,
          'Import path from django.urls.',
        ),

        required(
          'app/urls.py',
          String.raw`from\s+\.views\s+import\s+hello`,
          'Import hello from .views.',
        ),
      ],
    },

    {
      id:
        'django-url-route-2',

      title:
        'Creates the hello route',

      requiredSourceChecks: [
        required(
          'app/urls.py',
          String.raw`path\s*\(\s*["']hello\/["']\s*,\s*hello`,
          'Map "hello/" to the hello view.',
        ),
      ],
    },

    {
      id:
        'django-url-route-3',

      title:
        'Names the route hello',

      requiredSourceChecks: [
        required(
          'app/urls.py',
          String.raw`path\s*\([\s\S]*?name\s*=\s*["']hello["'][\s\S]*?\)`,
          'Set the route name to "hello".',
          'm',
        ),
      ],
    },
  ],

  /* =======================================================
     03 — TEMPLATE CONTEXT
  ======================================================= */

  'django-template-context': [
    {
      id:
        'django-template-context-1',

      title:
        'Creates the profile view',

      requiredFiles: [
        'app/views.py',
      ],

      requiredSourceChecks: [
        required(
          'app/views.py',
          String.raw`from\s+django\.shortcuts\s+import\s+render`,
          'Import render from django.shortcuts.',
        ),

        required(
          'app/views.py',
          String.raw`def\s+profile\s*\(\s*request\s*\)\s*:`,
          'Define profile(request).',
        ),
      ],
    },

    {
      id:
        'django-template-context-2',

      title:
        'Renders profile.html',

      requiredSourceChecks: [
        required(
          'app/views.py',
          String.raw`render\s*\(\s*request\s*,\s*["']profile\.html["']`,
          'Render profile.html.',
        ),
      ],
    },

    {
      id:
        'django-template-context-3',

      title:
        'Passes the required username',

      requiredSourceChecks: [
        required(
          'app/views.py',
          String.raw`["']username["']\s*:\s*["']Asha["']`,
          'Pass username with the value "Asha".',
          'm',
        ),
      ],
    },
  ],

  /* =======================================================
     04 — DYNAMIC ROUTE
  ======================================================= */

  'django-dynamic-route': [
    {
      id:
        'django-dynamic-route-1',

      title:
        'Imports the course_detail view',

      requiredFiles: [
        'app/urls.py',
      ],

      requiredSourceChecks: [
        required(
          'app/urls.py',
          String.raw`from\s+\.views\s+import\s+course_detail`,
          'Import course_detail from .views.',
        ),
      ],
    },

    {
      id:
        'django-dynamic-route-2',

      title:
        'Uses an integer path converter',

      requiredSourceChecks: [
        required(
          'app/urls.py',
          String.raw`["']courses\/<int:course_id>\/["']`,
          'Use the route courses/<int:course_id>/.',
        ),
      ],
    },

    {
      id:
        'django-dynamic-route-3',

      title:
        'Maps and names the route correctly',

      requiredSourceChecks: [
        required(
          'app/urls.py',
          String.raw`path\s*\(\s*["']courses\/<int:course_id>\/["']\s*,\s*course_detail\s*,\s*name\s*=\s*["']course-detail["']\s*\)`,
          'Map the dynamic course route to course_detail with name="course-detail".',
          'm',
        ),
      ],
    },
  ],

  /* =======================================================
     05 — POST REQUEST
  ======================================================= */

  'django-post-request': [
    {
      id:
        'django-post-request-1',

      title:
        'Creates submit_name',

      requiredFiles: [
        'app/views.py',
      ],

      requiredSourceChecks: [
        required(
          'app/views.py',
          String.raw`def\s+submit_name\s*\(\s*request\s*\)\s*:`,
          'Define submit_name(request).',
        ),

        required(
          'app/views.py',
          String.raw`request\.method\s*==\s*["']POST["']`,
          'Check whether request.method is POST.',
        ),
      ],
    },

    {
      id:
        'django-post-request-2',

      title:
        'Reads the name field',

      requiredSourceChecks: [
        required(
          'app/views.py',
          String.raw`request\.POST\.get\s*\(\s*["']name["']\s*\)`,
          'Read request.POST.get("name").',
        ),
      ],
    },

    {
      id:
        'django-post-request-3',

      title:
        'Returns both required responses',

      requiredSourceChecks: [
        required(
          'app/views.py',
          String.raw`HttpResponse\s*\(\s*f?["']Hello,\s*\{?name\}?["']\s*\)`,
          'Return the greeting using HttpResponse.',
          'm',
        ),

        required(
          'app/views.py',
          String.raw`HttpResponse\s*\(\s*["']POST\s+required["']\s*\)`,
          'Return "POST required" for non-POST requests.',
          'im',
        ),
      ],
    },
  ],

  /* =======================================================
     06 — COURSE MODEL
  ======================================================= */

  'django-course-model': [
    {
      id:
        'django-course-model-1',

      title:
        'Defines Course model',

      requiredFiles: [
        'app/models.py',
      ],

      requiredSourceChecks: [
        required(
          'app/models.py',
          String.raw`class\s+Course\s*\(\s*models\.Model\s*\)\s*:`,
          'Define Course as a Django model.',
        ),
      ],
    },

    {
      id:
        'django-course-model-2',

      title:
        'Defines title and duration fields',

      requiredSourceChecks: [
        required(
          'app/models.py',
          String.raw`title\s*=\s*models\.CharField\s*\(\s*max_length\s*=\s*120\s*\)`,
          'Define title as CharField(max_length=120).',
        ),

        required(
          'app/models.py',
          String.raw`duration\s*=\s*models\.PositiveIntegerField\s*\(\s*\)`,
          'Define duration as PositiveIntegerField().',
        ),
      ],
    },

    {
      id:
        'django-course-model-3',

      title:
        'Returns title from __str__',

      requiredSourceChecks: [
        required(
          'app/models.py',
          String.raw`def\s+__str__\s*\(\s*self\s*\)\s*:[\s\S]*?return\s+self\.title`,
          '__str__ must return self.title.',
          'm',
        ),
      ],

      forbiddenSourceChecks: [
        forbidden(
          'app/models.py',
          String.raw`\bpass\b`,
          'Remove pass and implement the model.',
        ),
      ],
    },
  ],

  /* =======================================================
     07 — QUERYSET FILTER
  ======================================================= */

  'django-queryset-filter': [
    {
      id:
        'django-queryset-filter-1',

      title:
        'Creates get_active_courses',

      requiredFiles: [
        'app/services.py',
      ],

      requiredSourceChecks: [
        required(
          'app/services.py',
          String.raw`from\s+\.models\s+import\s+Course`,
          'Import Course from .models.',
        ),

        required(
          'app/services.py',
          String.raw`def\s+get_active_courses\s*\(\s*\)\s*:`,
          'Define get_active_courses().',
        ),
      ],
    },

    {
      id:
        'django-queryset-filter-2',

      title:
        'Filters active courses',

      requiredSourceChecks: [
        required(
          'app/services.py',
          String.raw`Course\.objects\.filter\s*\(\s*active\s*=\s*True\s*\)`,
          'Filter Course objects with active=True.',
        ),
      ],
    },

    {
      id:
        'django-queryset-filter-3',

      title:
        'Orders by title and returns the QuerySet',

      requiredSourceChecks: [
        required(
          'app/services.py',
          String.raw`\.order_by\s*\(\s*["']title["']\s*\)`,
          'Order the active courses by title.',
        ),

        required(
          'app/services.py',
          String.raw`return\s+[\s\S]*Course\.objects\.filter|(?:courses|queryset|qs)\s*=\s*Course\.objects\.filter[\s\S]*?return\s+(?:courses|queryset|qs)`,
          'Return the filtered and ordered QuerySet.',
          'm',
        ),
      ],
    },
  ],

  /* =======================================================
     08 — CREATE RECORD
  ======================================================= */

  'django-create-record': [
    {
      id:
        'django-create-record-1',

      title:
        'Creates create_student',

      requiredFiles: [
        'app/services.py',
      ],

      requiredSourceChecks: [
        required(
          'app/services.py',
          String.raw`from\s+\.models\s+import\s+Student`,
          'Import Student from .models.',
        ),

        required(
          'app/services.py',
          String.raw`def\s+create_student\s*\(\s*name\s*,\s*score\s*\)\s*:`,
          'Define create_student(name, score).',
        ),
      ],
    },

    {
      id:
        'django-create-record-2',

      title:
        'Creates the Student record',

      requiredSourceChecks: [
        required(
          'app/services.py',
          String.raw`Student\.objects\.create\s*\([\s\S]*?name\s*=\s*name[\s\S]*?score\s*=\s*score[\s\S]*?\)`,
          'Create Student using name=name and score=score.',
          'm',
        ),
      ],
    },

    {
      id:
        'django-create-record-3',

      title:
        'Returns the created student',

      requiredSourceChecks: [
        required(
          'app/services.py',
          String.raw`(?:student|created_student)\s*=\s*Student\.objects\.create[\s\S]*?return\s+(?:student|created_student)`,
          'Return the created Student object.',
          'm',
        ),
      ],
    },
  ],

  /* =======================================================
     09 — JSON RESPONSE
  ======================================================= */

  'django-json-response': [
    {
      id:
        'django-json-response-1',

      title:
        'Creates health view',

      requiredFiles: [
        'app/views.py',
      ],

      requiredSourceChecks: [
        required(
          'app/views.py',
          String.raw`from\s+django\.http\s+import\s+JsonResponse`,
          'Import JsonResponse from django.http.',
        ),

        required(
          'app/views.py',
          String.raw`def\s+health\s*\(\s*request\s*\)\s*:`,
          'Define health(request).',
        ),
      ],
    },

    {
      id:
        'django-json-response-2',

      title:
        'Returns status ok',

      requiredSourceChecks: [
        required(
          'app/views.py',
          String.raw`["']status["']\s*:\s*["']ok["']`,
          'Return status="ok".',
        ),
      ],
    },

    {
      id:
        'django-json-response-3',

      title:
        'Returns service elab',

      requiredSourceChecks: [
        required(
          'app/views.py',
          String.raw`JsonResponse\s*\(\s*\{[\s\S]*?["']status["']\s*:\s*["']ok["'][\s\S]*?["']service["']\s*:\s*["']elab["'][\s\S]*?\}\s*\)`,
          'Return JsonResponse containing status=ok and service=elab.',
          'm',
        ),
      ],
    },
  ],

  /* =======================================================
     10 — CLASS-BASED VIEW
  ======================================================= */

  'django-class-based-view': [
    {
      id:
        'django-class-based-view-1',

      title:
        'Creates AboutView',

      requiredFiles: [
        'app/views.py',
      ],

      requiredSourceChecks: [
        required(
          'app/views.py',
          String.raw`from\s+django\.views\s+import\s+View`,
          'Import View from django.views.',
        ),

        required(
          'app/views.py',
          String.raw`class\s+AboutView\s*\(\s*View\s*\)\s*:`,
          'Define AboutView extending View.',
        ),
      ],
    },

    {
      id:
        'django-class-based-view-2',

      title:
        'Implements GET handler',

      requiredSourceChecks: [
        required(
          'app/views.py',
          String.raw`def\s+get\s*\(\s*self\s*,\s*request\s*\)\s*:`,
          'Implement get(self, request).',
        ),
      ],
    },

    {
      id:
        'django-class-based-view-3',

      title:
        'Returns About eLab',

      requiredSourceChecks: [
        required(
          'app/views.py',
          String.raw`return\s+HttpResponse\s*\(\s*["']About\s+eLab["']\s*\)`,
          'Return HttpResponse("About eLab").',
          'im',
        ),
      ],
    },
  ],

  /* =======================================================
     11 — COURSE LIST API
  ======================================================= */

  'django-course-list-api': [
    {
      id:
        'django-course-list-api-1',

      title:
        'Queries courses in id order',

      requiredFiles: [
        'app/views.py',
      ],

      requiredSourceChecks: [
        required(
          'app/views.py',
          String.raw`Course\.objects\.order_by\s*\(\s*["']id["']\s*\)`,
          'Query Course records ordered by id.',
        ),
      ],
    },

    {
      id:
        'django-course-list-api-2',

      title:
        'Selects required course fields',

      requiredSourceChecks: [
        required(
          'app/views.py',
          String.raw`\.values\s*\(\s*["']id["']\s*,\s*["']title["']\s*,\s*["']duration["']\s*\)`,
          'Select id, title, and duration with values().',
        ),

        required(
          'app/views.py',
          String.raw`list\s*\(`,
          'Convert the QuerySet to a list.',
        ),
      ],
    },

    {
      id:
        'django-course-list-api-3',

      title:
        'Returns courses as JSON',

      requiredSourceChecks: [
        required(
          'app/views.py',
          String.raw`JsonResponse\s*\(\s*\{\s*["']courses["']\s*:\s*[^}]+\}\s*(?:,\s*safe\s*=\s*True)?\s*\)`,
          'Return JsonResponse({"courses": courses}).',
          'm',
        ),
      ],
    },
  ],

  /* =======================================================
     12 — COURSE MANAGEMENT
  ======================================================= */

  'django-course-management': [
    {
      id:
        'django-course-management-1',

      title:
        'Rejects non-POST requests',

      requiredFiles: [
        'app/views.py',
      ],

      requiredSourceChecks: [
        required(
          'app/views.py',
          String.raw`request\.method\s*!=\s*["']POST["']`,
          'Reject requests whose method is not POST.',
        ),

        required(
          'app/views.py',
          String.raw`JsonResponse\s*\(\s*\{\s*["']error["']\s*:\s*["']POST\s+required["']\s*\}\s*,\s*status\s*=\s*405\s*\)`,
          'Return {"error": "POST required"} with status=405.',
          'im',
        ),
      ],
    },

    {
      id:
        'django-course-management-2',

      title:
        'Reads and creates the course',

      requiredSourceChecks: [
        required(
          'app/views.py',
          String.raw`request\.POST(?:\.get)?\s*\(\s*["']title["']\s*\)|request\.POST\s*\[\s*["']title["']\s*\]`,
          'Read title from request.POST.',
          'm',
        ),

        required(
          'app/views.py',
          String.raw`request\.POST(?:\.get)?\s*\(\s*["']duration["']\s*\)|request\.POST\s*\[\s*["']duration["']\s*\]`,
          'Read duration from request.POST.',
          'm',
        ),

        required(
          'app/views.py',
          String.raw`Course\.objects\.create\s*\([\s\S]*?title\s*=\s*title[\s\S]*?duration\s*=\s*duration[\s\S]*?\)`,
          'Create the Course with title and duration.',
          'm',
        ),
      ],
    },

    {
      id:
        'django-course-management-3',

      title:
        'Returns created course with status 201',

      requiredSourceChecks: [
        required(
          'app/views.py',
          String.raw`JsonResponse\s*\([\s\S]*?["']id["']\s*:\s*(?:course|created_course)\.id[\s\S]*?["']title["']\s*:\s*(?:course|created_course)\.title[\s\S]*?["']duration["']\s*:\s*(?:course|created_course)\.duration[\s\S]*?status\s*=\s*201[\s\S]*?\)`,
          'Return the created id, title, and duration with status=201.',
          'm',
        ),
      ],
    },
  ],
};

/* =========================================================
   GET TEST CASES
========================================================= */

export function getDjangoTestCases(
  problemSlug: string,
): DjangoHiddenTestCase[] {
  return (
    DJANGO_TEST_CASES[
      problemSlug
    ] ?? []
  );
}
