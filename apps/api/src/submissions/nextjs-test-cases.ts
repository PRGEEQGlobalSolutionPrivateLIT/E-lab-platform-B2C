/* =========================================================
   NEXT.JS HIDDEN TEST CASES

   Path:

   C:\dev\elab-platform\apps\api\src\submissions\nextjs-test-cases.ts

   IMPORTANT:

   - These tests remain server-side.
   - They are not sent to the learner browser.
   - Each Next.js problem has 3 hidden tests.
   - Tests are source-structure checks.
   - `next build` remains the compile/build gate in the Judge.
   - The Next.js Judge runner will evaluate these checks during
     Submit in the next stage.
========================================================= */

/* =========================================================
   TYPES
========================================================= */

export type NextJsSourceCheck = {
  filePath: string;

  pattern: string;

  flags?: string;

  message: string;
};

export type NextJsForbiddenSourceCheck = {
  filePath: string;

  pattern: string;

  flags?: string;

  message: string;
};

export type NextJsHiddenTestCase = {
  id: string;

  title: string;

  requiredFiles?: string[];

  requiredSourceChecks?: NextJsSourceCheck[];

  forbiddenSourceChecks?: NextJsForbiddenSourceCheck[];
};

/* =========================================================
   HELPERS
========================================================= */

function required(
  filePath: string,
  pattern: string,
  message: string,
  flags = 'm',
): NextJsSourceCheck {
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
): NextJsForbiddenSourceCheck {
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

const NEXTJS_TEST_CASES:
  Record<
    string,
    NextJsHiddenTestCase[]
  > = {

  /* =======================================================
     01 — PAGE COMPONENT
  ======================================================= */

  'nextjs-page-component': [
    {
      id:
        'nextjs-page-component-1',

      title:
        'Exports a page component',

      requiredFiles: [
        'app/page.tsx',
      ],

      requiredSourceChecks: [
        required(
          'app/page.tsx',
          String.raw`export\s+default\s+function\s+\w+`,
          'Export a default page component.',
        ),
      ],
    },

    {
      id:
        'nextjs-page-component-2',

      title:
        'Renders the required heading',

      requiredSourceChecks: [
        required(
          'app/page.tsx',
          String.raw`<h1[^>]*>\s*Welcome\s+to\s+Next\.js\s*<\/h1>`,
          'Render the heading "Welcome to Next.js".',
          'im',
        ),
      ],
    },

    {
      id:
        'nextjs-page-component-3',

      title:
        'Renders the practice text',

      requiredSourceChecks: [
        required(
          'app/page.tsx',
          String.raw`App\s+Router\s+Practice`,
          'Render the text "App Router Practice".',
          'im',
        ),
      ],
    },
  ],

  /* =======================================================
     02 — ROOT LAYOUT
  ======================================================= */

  'nextjs-root-layout': [
    {
      id:
        'nextjs-root-layout-1',

      title:
        'Creates the root layout file',

      requiredFiles: [
        'app/layout.tsx',
      ],

      requiredSourceChecks: [
        required(
          'app/layout.tsx',
          String.raw`export\s+default\s+function\s+RootLayout`,
          'Export a default RootLayout component.',
        ),
      ],
    },

    {
      id:
        'nextjs-root-layout-2',

      title:
        'Uses the required HTML shell',

      requiredSourceChecks: [
        required(
          'app/layout.tsx',
          String.raw`<html[^>]*lang\s*=\s*["']en["'][^>]*>`,
          'Set the root html language to "en".',
          'im',
        ),

        required(
          'app/layout.tsx',
          String.raw`<body[^>]*>`,
          'Render a body element.',
          'im',
        ),
      ],
    },

    {
      id:
        'nextjs-root-layout-3',

      title:
        'Renders children',

      requiredSourceChecks: [
        required(
          'app/layout.tsx',
          String.raw`\{\s*children\s*\}`,
          'Render the children inside the root layout.',
          'm',
        ),

        required(
          'app/layout.tsx',
          String.raw`ReactNode`,
          'Type the children using ReactNode.',
          'm',
        ),
      ],
    },
  ],

  /* =======================================================
     03 — NAVIGATION
  ======================================================= */

  'nextjs-navigation': [
    {
      id:
        'nextjs-navigation-1',

      title:
        'Uses Next.js Link',

      requiredFiles: [
        'app/page.tsx',
      ],

      requiredSourceChecks: [
        required(
          'app/page.tsx',
          String.raw`from\s+["']next\/link["']`,
          'Import Link from next/link.',
        ),
      ],
    },

    {
      id:
        'nextjs-navigation-2',

      title:
        'Links to Home and Courses',

      requiredSourceChecks: [
        required(
          'app/page.tsx',
          String.raw`href\s*=\s*["']\/["']`,
          'Add a Home link to "/".',
        ),

        required(
          'app/page.tsx',
          String.raw`href\s*=\s*["']\/courses["']`,
          'Add a Courses link to "/courses".',
        ),
      ],
    },

    {
      id:
        'nextjs-navigation-3',

      title:
        'Links to Profile',

      requiredSourceChecks: [
        required(
          'app/page.tsx',
          String.raw`href\s*=\s*["']\/profile["']`,
          'Add a Profile link to "/profile".',
        ),

        forbidden(
          'app/page.tsx',
          String.raw`window\.location`,
          'Use Next.js Link instead of window.location navigation.',
        ),
      ],
    },
  ],

  /* =======================================================
     04 — DYNAMIC ROUTE
  ======================================================= */

  'nextjs-dynamic-route': [
    {
      id:
        'nextjs-dynamic-route-1',

      title:
        'Uses the dynamic route file',

      requiredFiles: [
        'app/courses/[courseId]/page.tsx',
      ],
    },

    {
      id:
        'nextjs-dynamic-route-2',

      title:
        'Uses async App Router params',

      requiredSourceChecks: [
        required(
          'app/courses/[courseId]/page.tsx',
          String.raw`params\s*:\s*Promise\s*<\s*\{\s*courseId\s*:\s*string\s*;?\s*\}\s*>`,
          'Type params as Promise<{ courseId: string }> for Next.js 16.',
        ),

        required(
          'app/courses/[courseId]/page.tsx',
          String.raw`await\s+params`,
          'Await params before reading courseId.',
        ),
      ],
    },

    {
      id:
        'nextjs-dynamic-route-3',

      title:
        'Displays the course id',

      requiredSourceChecks: [
        required(
          'app/courses/[courseId]/page.tsx',
          String.raw`Course\s*:\s*\{\s*courseId\s*\}`,
          'Display the dynamic courseId after "Course:".',
          'im',
        ),
      ],
    },
  ],

  /* =======================================================
     05 — SERVER COMPONENT
  ======================================================= */

  'nextjs-server-component': [
    {
      id:
        'nextjs-server-component-1',

      title:
        'Keeps the page as a Server Component',

      requiredFiles: [
        'app/courses/page.tsx',
      ],

      forbiddenSourceChecks: [
        forbidden(
          'app/courses/page.tsx',
          String.raw`["']use client["']`,
          'Do not add "use client" to this Server Component.',
        ),
      ],
    },

    {
      id:
        'nextjs-server-component-2',

      title:
        'Loads the course count asynchronously',

      requiredSourceChecks: [
        required(
          'app/courses/page.tsx',
          String.raw`async\s+function\s+getCourseCount`,
          'Create the async getCourseCount function.',
        ),

        required(
          'app/courses/page.tsx',
          String.raw`return\s+4\s*;?`,
          'getCourseCount must return 4.',
        ),
      ],
    },

    {
      id:
        'nextjs-server-component-3',

      title:
        'Awaits and displays the result',

      requiredSourceChecks: [
        required(
          'app/courses/page.tsx',
          String.raw`await\s+getCourseCount\s*\(\s*\)`,
          'Await getCourseCount().',
        ),

        required(
          'app/courses/page.tsx',
          String.raw`Available\s+Courses\s*:\s*\{\s*courseCount\s*\}`,
          'Display "Available Courses:" with courseCount.',
          'im',
        ),
      ],
    },
  ],

  /* =======================================================
     06 — CLIENT COMPONENT
  ======================================================= */

  'nextjs-client-component': [
    {
      id:
        'nextjs-client-component-1',

      title:
        'Declares a Client Component',

      requiredFiles: [
        'app/counter/page.tsx',
      ],

      requiredSourceChecks: [
        required(
          'app/counter/page.tsx',
          String.raw`^\s*["']use client["']\s*;?`,
          'The file must begin with "use client".',
        ),
      ],
    },

    {
      id:
        'nextjs-client-component-2',

      title:
        'Uses typed React state',

      requiredSourceChecks: [
        required(
          'app/counter/page.tsx',
          String.raw`useState\s*<\s*number\s*>\s*\(\s*0\s*\)`,
          'Initialize the count with useState<number>(0).',
        ),
      ],
    },

    {
      id:
        'nextjs-client-component-3',

      title:
        'Increments the count',

      requiredSourceChecks: [
        required(
          'app/counter/page.tsx',
          String.raw`setCount\s*\(\s*(?:count\s*\+\s*1|\(\s*\w+\s*\)\s*=>\s*\w+\s*\+\s*1|\w+\s*=>\s*\w+\s*\+\s*1)\s*\)`,
          'Increment count by 1 when the button is clicked.',
        ),

        required(
          'app/counter/page.tsx',
          String.raw`Increment`,
          'Render a button labeled Increment.',
          'i',
        ),
      ],
    },
  ],

  /* =======================================================
     07 — SEARCH PARAMS
  ======================================================= */

  'nextjs-search-params': [
    {
      id:
        'nextjs-search-params-1',

      title:
        'Uses the search page',

      requiredFiles: [
        'app/search/page.tsx',
      ],
    },

    {
      id:
        'nextjs-search-params-2',

      title:
        'Uses async searchParams',

      requiredSourceChecks: [
        required(
          'app/search/page.tsx',
          String.raw`searchParams\s*:\s*Promise\s*<\s*\{\s*q\?\s*:\s*string\s*;?\s*\}\s*>`,
          'Type searchParams as Promise<{ q?: string }>.',
        ),

        required(
          'app/search/page.tsx',
          String.raw`await\s+searchParams`,
          'Await searchParams.',
        ),
      ],
    },

    {
      id:
        'nextjs-search-params-3',

      title:
        'Uses q with an all fallback',

      requiredSourceChecks: [
        required(
          'app/search/page.tsx',
          String.raw`\.q`,
          'Read the q search parameter.',
        ),

        required(
          'app/search/page.tsx',
          String.raw`["']all["']`,
          'Use "all" as the fallback query.',
          'i',
        ),
      ],
    },
  ],

  /* =======================================================
     08 — ROUTE HANDLER
  ======================================================= */

  'nextjs-route-handler': [
    {
      id:
        'nextjs-route-handler-1',

      title:
        'Creates the health route handler',

      requiredFiles: [
        'app/api/health/route.ts',
      ],

      requiredSourceChecks: [
        required(
          'app/api/health/route.ts',
          String.raw`export\s+async\s+function\s+GET`,
          'Export an async GET route handler.',
        ),
      ],
    },

    {
      id:
        'nextjs-route-handler-2',

      title:
        'Returns JSON',

      requiredSourceChecks: [
        required(
          'app/api/health/route.ts',
          String.raw`Response\.json\s*\(`,
          'Return the response with Response.json().',
        ),
      ],
    },

    {
      id:
        'nextjs-route-handler-3',

      title:
        'Returns the required payload',

      requiredSourceChecks: [
        required(
          'app/api/health/route.ts',
          String.raw`status\s*:\s*["']ok["']`,
          'Return status: "ok".',
        ),

        required(
          'app/api/health/route.ts',
          String.raw`service\s*:\s*["']elab["']`,
          'Return service: "elab".',
        ),
      ],
    },
  ],

  /* =======================================================
     09 — DATA FETCHING
  ======================================================= */

  'nextjs-data-fetching': [
    {
      id:
        'nextjs-data-fetching-1',

      title:
        'Defines typed course data',

      requiredFiles: [
        'app/courses/page.tsx',
      ],

      requiredSourceChecks: [
        required(
          'app/courses/page.tsx',
          String.raw`(?:type|interface)\s+Course\b`,
          'Define a Course type or interface.',
        ),
      ],
    },

    {
      id:
        'nextjs-data-fetching-2',

      title:
        'Loads the required courses asynchronously',

      requiredSourceChecks: [
        required(
          'app/courses/page.tsx',
          String.raw`async\s+function\s+getCourses`,
          'Create an async getCourses function.',
        ),

        required(
          'app/courses/page.tsx',
          String.raw`TypeScript`,
          'Include TypeScript in the course data.',
        ),

        required(
          'app/courses/page.tsx',
          String.raw`Next\.js`,
          'Include Next.js in the course data.',
        ),

        required(
          'app/courses/page.tsx',
          String.raw`NestJS`,
          'Include NestJS in the course data.',
        ),
      ],
    },

    {
      id:
        'nextjs-data-fetching-3',

      title:
        'Awaits and renders the course list',

      requiredSourceChecks: [
        required(
          'app/courses/page.tsx',
          String.raw`await\s+getCourses\s*\(\s*\)`,
          'Await getCourses().',
        ),

        required(
          'app/courses/page.tsx',
          String.raw`\.map\s*\(`,
          'Render the courses using map().',
        ),
      ],
    },
  ],

  /* =======================================================
     10 — SERVER ACTION
  ======================================================= */

  'nextjs-form-action': [
    {
      id:
        'nextjs-form-action-1',

      title:
        'Creates the new-course page',

      requiredFiles: [
        'app/courses/new/page.tsx',
      ],
    },

    {
      id:
        'nextjs-form-action-2',

      title:
        'Defines a Server Action',

      requiredSourceChecks: [
        required(
          'app/courses/new/page.tsx',
          String.raw`async\s+function\s+createCourse\s*\(\s*formData\s*:\s*FormData\s*\)`,
          'Create async createCourse(formData: FormData).',
        ),

        required(
          'app/courses/new/page.tsx',
          String.raw`["']use server["']`,
          'Add "use server" inside the Server Action.',
        ),
      ],
    },

    {
      id:
        'nextjs-form-action-3',

      title:
        'Reads title and attaches the action',

      requiredSourceChecks: [
        required(
          'app/courses/new/page.tsx',
          String.raw`formData\.get\s*\(\s*["']title["']\s*\)`,
          'Read the title from FormData.',
        ),

        required(
          'app/courses/new/page.tsx',
          String.raw`action\s*=\s*\{\s*createCourse\s*\}`,
          'Attach createCourse to the form action.',
        ),
      ],
    },
  ],

  /* =======================================================
     11 — API INTEGRATION
  ======================================================= */

  'nextjs-api-integration': [
    {
      id:
        'nextjs-api-integration-1',

      title:
        'Defines typed user data',

      requiredFiles: [
        'app/users/page.tsx',
      ],

      requiredSourceChecks: [
        required(
          'app/users/page.tsx',
          String.raw`interface\s+User\b`,
          'Define the User interface.',
        ),
      ],
    },

    {
      id:
        'nextjs-api-integration-2',

      title:
        'Loads the required users',

      requiredSourceChecks: [
        required(
          'app/users/page.tsx',
          String.raw`async\s+function\s+getUsers`,
          'Create an async getUsers function.',
        ),

        required(
          'app/users/page.tsx',
          String.raw`Anu`,
          'Include Anu in the returned users.',
        ),

        required(
          'app/users/page.tsx',
          String.raw`Kiran`,
          'Include Kiran in the returned users.',
        ),

        required(
          'app/users/page.tsx',
          String.raw`Maya`,
          'Include Maya in the returned users.',
        ),
      ],
    },

    {
      id:
        'nextjs-api-integration-3',

      title:
        'Renders users and roles',

      requiredSourceChecks: [
        required(
          'app/users/page.tsx',
          String.raw`await\s+getUsers\s*\(\s*\)`,
          'Await getUsers().',
        ),

        required(
          'app/users/page.tsx',
          String.raw`\.map\s*\(`,
          'Render users using map().',
        ),

        required(
          'app/users/page.tsx',
          String.raw`admin|student|trainer`,
          'Render the required user roles.',
          'i',
        ),
      ],
    },
  ],

  /* =======================================================
     12 — DASHBOARD
  ======================================================= */

  'nextjs-dashboard': [
    {
      id:
        'nextjs-dashboard-1',

      title:
        'Creates the dashboard page',

      requiredFiles: [
        'app/dashboard/page.tsx',
      ],

      requiredSourceChecks: [
        required(
          'app/dashboard/page.tsx',
          String.raw`from\s+["']next\/link["']`,
          'Import Link from next/link.',
        ),
      ],
    },

    {
      id:
        'nextjs-dashboard-2',

      title:
        'Uses the required dashboard values',

      requiredSourceChecks: [
        required(
          'app/dashboard/page.tsx',
          String.raw`completed\s*:\s*6`,
          'Set completed to 6.',
        ),

        required(
          'app/dashboard/page.tsx',
          String.raw`inProgress\s*:\s*2`,
          'Set inProgress to 2.',
        ),

        required(
          'app/dashboard/page.tsx',
          String.raw`total\s*:\s*10`,
          'Set total to 10.',
        ),
      ],
    },

    {
      id:
        'nextjs-dashboard-3',

      title:
        'Calculates remaining and links to courses',

      requiredSourceChecks: [
        required(
          'app/dashboard/page.tsx',
          String.raw`remaining\s*=\s*(?:stats\.)?total\s*-\s*(?:stats\.)?completed`,
          'Calculate remaining as total - completed.',
        ),

        required(
          'app/dashboard/page.tsx',
          String.raw`href\s*=\s*["']\/courses["']`,
          'Link Continue Learning to /courses.',
        ),

        required(
          'app/dashboard/page.tsx',
          String.raw`Continue\s+Learning`,
          'Render the Continue Learning link.',
          'i',
        ),
      ],
    },
  ],
};

/* =========================================================
   GET TEST CASES
========================================================= */

export function getNextJsTestCases(
  problemSlug: string,
): NextJsHiddenTestCase[] {
  return (
    NEXTJS_TEST_CASES[
      problemSlug
    ] ?? []
  );
}
