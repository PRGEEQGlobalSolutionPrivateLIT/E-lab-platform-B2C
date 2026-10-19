import type {
  PracticeProblem,
} from './types';

/* =========================================================
   NEXT.JS PROBLEMS

   Target:
   Next.js 16+ App Router

   IMPORTANT:
   - These problems use the shared framework workspace.
   - They do NOT create a separate Next.js editor.
   - Each problem currently uses one editable starter file so it
     works cleanly with the existing shared workspace model.
   - Next.js Judge/runtime support is added in the next stage.
========================================================= */

export const nextjsProblems:
  PracticeProblem[] = [
  /* =======================================================
     01 — PAGE COMPONENT
  ======================================================= */

  {
    slug:
      'nextjs-page-component',

    title:
      'Create an App Router Page',

    technologySlug:
      'nextjs',

    difficulty:
      'Easy',

    workspaceType:
      'framework',

    shortDescription:
      'Create a basic Next.js App Router page component.',

    problemStatement:
      `Create a Next.js App Router page component.

The page must:
1. Export a default React component named HomePage.
2. Render an <h1> with the text Welcome to Next.js.
3. Render a <p> with the text App Router Practice.

Use TypeScript and JSX.`,

    inputFormat:
      'No input is required.',

    outputFormat:
      'Render the required heading and paragraph.',

    constraints: [
      'Use a default export.',
      'Use a React component named HomePage.',
      'Use TypeScript/TSX.',
      'Do not use the Pages Router.',
    ],

    skills: [
      'Next.js App Router',
      'Page Components',
      'TSX',
      'Default Exports',
    ],

    estimatedMinutes:
      15,

    defaultLanguage:
      'typescript',

    allowedLanguages: [
      'typescript',
    ],

    starterFiles: [
      {
        path:
          'app/page.tsx',

        language:
          'typescript',

        content:
          `export default function HomePage() {
  return (
    <main>
      {/* Add the required heading and paragraph. */}
    </main>
  );
}
`,
      },
    ],

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Home page content',

        description:
          'The page should display "Welcome to Next.js" and "App Router Practice".',
      },
    ],
  },

  /* =======================================================
     02 — ROOT LAYOUT
  ======================================================= */

  {
    slug:
      'nextjs-root-layout',

    title:
      'Create a Root Layout',

    technologySlug:
      'nextjs',

    difficulty:
      'Easy',

    workspaceType:
      'framework',

    shortDescription:
      'Build the root layout used by the Next.js App Router.',

    problemStatement:
      `Create a Next.js root layout.

The layout must:
1. Export a default component named RootLayout.
2. Accept children as React.ReactNode.
3. Render <html lang="en">.
4. Render a <body>.
5. Display the children inside the body.`,

    inputFormat:
      'No input is required.',

    outputFormat:
      'Render the supplied children inside the root HTML and body elements.',

    constraints: [
      'Use app/layout.tsx.',
      'Type children as React.ReactNode.',
      'Set the html lang attribute to en.',
      'Render children inside body.',
    ],

    skills: [
      'Root Layout',
      'App Router',
      'ReactNode',
      'Layout Composition',
    ],

    estimatedMinutes:
      15,

    defaultLanguage:
      'typescript',

    allowedLanguages: [
      'typescript',
    ],

    starterFiles: [
      {
        path:
          'app/layout.tsx',

        language:
          'typescript',

        content:
          `import type {
  ReactNode,
} from 'react';

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        {/* Render children here. */}
      </body>
    </html>
  );
}
`,
      },
    ],

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Root layout structure',

        description:
          'The layout should contain html, body, and render its children.',
      },
    ],
  },

  /* =======================================================
     03 — NAVIGATION
  ======================================================= */

  {
    slug:
      'nextjs-navigation',

    title:
      'Navigation with Link',

    technologySlug:
      'nextjs',

    difficulty:
      'Easy',

    workspaceType:
      'framework',

    shortDescription:
      'Use next/link for client-side navigation between routes.',

    problemStatement:
      `Create a navigation component using Next.js Link.

Render three links:
- Home → /
- Courses → /courses
- Profile → /profile

Place the links inside a <nav> element.`,

    inputFormat:
      'No input is required.',

    outputFormat:
      'Render three Next.js navigation links.',

    constraints: [
      'Import Link from next/link.',
      'Use Link instead of plain anchor tags for the required navigation.',
      'Render all links inside nav.',
    ],

    skills: [
      'next/link',
      'Navigation',
      'App Router Routes',
    ],

    estimatedMinutes:
      15,

    defaultLanguage:
      'typescript',

    allowedLanguages: [
      'typescript',
    ],

    starterFiles: [
      {
        path:
          'app/page.tsx',

        language:
          'typescript',

        content:
          `import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <nav>
        {/* Add Home, Courses and Profile links. */}
      </nav>
    </main>
  );
}
`,
      },
    ],

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Navigation links',

        description:
          'Home, Courses, and Profile links should point to the required routes.',
      },
    ],
  },

  /* =======================================================
     04 — DYNAMIC ROUTE
  ======================================================= */

  {
    slug:
      'nextjs-dynamic-route',

    title:
      'Dynamic Course Route',

    technologySlug:
      'nextjs',

    difficulty:
      'Easy',

    workspaceType:
      'framework',

    shortDescription:
      'Read a dynamic route parameter in a Next.js App Router page.',

    problemStatement:
      `Create a dynamic course page for the route:

/courses/[courseId]

Read courseId from params and display:

Course: <courseId>

For example, /courses/nextjs should render:
Course: nextjs

In current Next.js App Router versions, params is asynchronous, so await it before reading courseId.`,

    inputFormat:
      'The courseId comes from the dynamic route.',

    outputFormat:
      'Render Course: <courseId>.',

    constraints: [
      'Use a [courseId] dynamic route.',
      'Type params using Promise<{ courseId: string }>.',
      'Await params before reading courseId.',
    ],

    skills: [
      'Dynamic Routes',
      'Route Parameters',
      'Async Params',
      'App Router',
    ],

    estimatedMinutes:
      20,

    defaultLanguage:
      'typescript',

    allowedLanguages: [
      'typescript',
    ],

    starterFiles: [
      {
        path:
          'app/courses/[courseId]/page.tsx',

        language:
          'typescript',

        content:
          `type CoursePageProps = {
  params: Promise<{
    courseId: string;
  }>;
};

export default async function CoursePage({
  params,
}: CoursePageProps) {
  const {
    courseId,
  } = await params;

  return (
    <main>
      {/* Display Course: <courseId> */}
    </main>
  );
}
`,
      },
    ],

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Dynamic course',

        description:
          'For courseId nextjs, the page should display "Course: nextjs".',
      },
    ],
  },

  /* =======================================================
     05 — SERVER COMPONENT
  ======================================================= */

  {
    slug:
      'nextjs-server-component',

    title:
      'Build a Server Component',

    technologySlug:
      'nextjs',

    difficulty:
      'Medium',

    workspaceType:
      'framework',

    shortDescription:
      'Use an async Server Component to prepare and render data.',

    problemStatement:
      `Create an async Next.js Server Component.

Create an async function named getCourseCount that returns 4.

Await the function inside the page component and render:

Available Courses: 4

Do not add "use client".`,

    inputFormat:
      'No input is required.',

    outputFormat:
      'Render exactly: Available Courses: 4',

    constraints: [
      'The page component must be async.',
      'Await getCourseCount.',
      'Do not use useEffect.',
      'Do not add use client.',
    ],

    skills: [
      'Server Components',
      'Async Components',
      'Server-side Data Preparation',
    ],

    estimatedMinutes:
      20,

    defaultLanguage:
      'typescript',

    allowedLanguages: [
      'typescript',
    ],

    starterFiles: [
      {
        path:
          'app/courses/page.tsx',

        language:
          'typescript',

        content:
          `async function getCourseCount(): Promise<number> {
  // Return the course count.
  return 0;
}

export default async function CoursesPage() {
  const courseCount =
    await getCourseCount();

  return (
    <main>
      {/* Display the course count. */}
    </main>
  );
}
`,
      },
    ],

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Server component output',

        description:
          'The page should display "Available Courses: 4".',
      },
    ],
  },

  /* =======================================================
     06 — CLIENT COMPONENT
  ======================================================= */

  {
    slug:
      'nextjs-client-component',

    title:
      'Interactive Client Component',

    technologySlug:
      'nextjs',

    difficulty:
      'Medium',

    workspaceType:
      'framework',

    shortDescription:
      'Create an interactive App Router Client Component using state.',

    problemStatement:
      `Create an interactive counter.

Requirements:
1. Add the "use client" directive.
2. Use useState<number>.
3. Initial count must be 0.
4. Render the count.
5. Add a button labeled Increment.
6. Clicking the button increments the count by 1.`,

    inputFormat:
      'The learner interacts with the Increment button.',

    outputFormat:
      'Display the current count and update it when Increment is clicked.',

    constraints: [
      'The file must begin with use client.',
      'Use React useState.',
      'Type the state as number.',
      'Do not reload the page to update the count.',
    ],

    skills: [
      'Client Components',
      'use client',
      'useState',
      'Interactivity',
    ],

    estimatedMinutes:
      20,

    defaultLanguage:
      'typescript',

    allowedLanguages: [
      'typescript',
    ],

    starterFiles: [
      {
        path:
          'app/counter/page.tsx',

        language:
          'typescript',

        content:
          `'use client';

import {
  useState,
} from 'react';

export default function CounterPage() {
  const [
    count,
    setCount,
  ] = useState<number>(0);

  return (
    <main>
      <p>Count: {count}</p>

      <button
        type="button"
        onClick={() => {
          // Increment count.
        }}
      >
        Increment
      </button>
    </main>
  );
}
`,
      },
    ],

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Counter interaction',

        description:
          'Count starts at 0 and becomes 1 after one Increment click.',
      },
    ],
  },

  /* =======================================================
     07 — SEARCH PARAMS
  ======================================================= */

  {
    slug:
      'nextjs-search-params',

    title:
      'Read Search Parameters',

    technologySlug:
      'nextjs',

    difficulty:
      'Medium',

    workspaceType:
      'framework',

    shortDescription:
      'Read query-string values from App Router searchParams.',

    problemStatement:
      `Create a search results page.

Read the q search parameter.

For:
/search?q=typescript

render:
Search: typescript

If q is missing, render:
Search: all

In current Next.js App Router versions, searchParams is asynchronous.`,

    inputFormat:
      'The q value comes from the URL query string.',

    outputFormat:
      'Render Search: <query>, or Search: all when q is missing.',

    constraints: [
      'Type searchParams as a Promise.',
      'Await searchParams before reading q.',
      'Handle q being undefined.',
    ],

    skills: [
      'searchParams',
      'Query Strings',
      'Async Search Params',
      'App Router',
    ],

    estimatedMinutes:
      20,

    defaultLanguage:
      'typescript',

    allowedLanguages: [
      'typescript',
    ],

    starterFiles: [
      {
        path:
          'app/search/page.tsx',

        language:
          'typescript',

        content:
          `type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const {
    q,
  } = await searchParams;

  const query =
    q ?? 'all';

  return (
    <main>
      {/* Display Search: <query> */}
    </main>
  );
}
`,
      },
    ],

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Search query',

        description:
          'For q=typescript, display "Search: typescript".',
      },
    ],
  },

  /* =======================================================
     08 — ROUTE HANDLER
  ======================================================= */

  {
    slug:
      'nextjs-route-handler',

    title:
      'Create a GET Route Handler',

    technologySlug:
      'nextjs',

    difficulty:
      'Medium',

    workspaceType:
      'framework',

    shortDescription:
      'Create an App Router API endpoint with a GET route handler.',

    problemStatement:
      `Create a GET Route Handler.

The endpoint should return JSON:

{
  "status": "ok",
  "service": "elab"
}

Use Response.json().`,

    inputFormat:
      'Send an HTTP GET request to the route.',

    outputFormat:
      'Return JSON containing status and service.',

    constraints: [
      'Export an async GET function.',
      'Use Response.json().',
      'Return status ok and service elab.',
    ],

    skills: [
      'Route Handlers',
      'GET Requests',
      'Response.json',
      'App Router API',
    ],

    estimatedMinutes:
      20,

    defaultLanguage:
      'typescript',

    allowedLanguages: [
      'typescript',
    ],

    starterFiles: [
      {
        path:
          'app/api/health/route.ts',

        language:
          'typescript',

        content:
          `export async function GET() {
  // Return the required JSON response.
}
`,
      },
    ],

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Health API response',

        description:
          'GET should return {"status":"ok","service":"elab"}.',
      },
    ],
  },

  /* =======================================================
     09 — SERVER DATA FETCHING
  ======================================================= */

  {
    slug:
      'nextjs-data-fetching',

    title:
      'Server-side Data Fetching',

    technologySlug:
      'nextjs',

    difficulty:
      'Medium',

    workspaceType:
      'framework',

    shortDescription:
      'Fetch asynchronous data inside a Server Component.',

    problemStatement:
      `Create a Server Component that loads course data asynchronously.

Create a function named getCourses that returns:
- TypeScript
- Next.js
- NestJS

Await getCourses inside the page component.

Render the course names as list items.`,

    inputFormat:
      'No input is required.',

    outputFormat:
      'Render TypeScript, Next.js, and NestJS in a list.',

    constraints: [
      'getCourses must be async.',
      'The page must await getCourses.',
      'Render every course using map.',
      'Do not add use client.',
    ],

    skills: [
      'Server-side Data Fetching',
      'Async Functions',
      'Server Components',
      'List Rendering',
    ],

    estimatedMinutes:
      25,

    defaultLanguage:
      'typescript',

    allowedLanguages: [
      'typescript',
    ],

    starterFiles: [
      {
        path:
          'app/courses/page.tsx',

        language:
          'typescript',

        content:
          `type Course = {
  id: number;
  name: string;
};

async function getCourses(): Promise<Course[]> {
  // Return the required course list.
  return [];
}

export default async function CoursesPage() {
  const courses =
    await getCourses();

  return (
    <main>
      <ul>
        {/* Render every course. */}
      </ul>
    </main>
  );
}
`,
      },
    ],

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Course list',

        description:
          'The rendered list should contain TypeScript, Next.js, and NestJS.',
      },
    ],
  },

  /* =======================================================
     10 — SERVER ACTION
  ======================================================= */

  {
    slug:
      'nextjs-form-action',

    title:
      'Form with a Server Action',

    technologySlug:
      'nextjs',

    difficulty:
      'Hard',

    workspaceType:
      'framework',

    shortDescription:
      'Connect an App Router form to a basic Server Action.',

    problemStatement:
      `Create a form that uses a Server Action.

Create an async function named createCourse.

Inside createCourse:
1. Add the "use server" directive.
2. Read a field named title from FormData.
3. Convert it to a string.
4. Log: Created: <title>

Render a form with:
- an input named title
- a submit button labeled Create Course
- action={createCourse}`,

    inputFormat:
      'The user enters a course title in the form.',

    outputFormat:
      'Submitting the form invokes the createCourse Server Action.',

    constraints: [
      'createCourse must be async.',
      'Use the use server directive inside the Server Action.',
      'The input name must be title.',
      'Connect the form action to createCourse.',
    ],

    skills: [
      'Server Actions',
      'FormData',
      'Forms',
      'App Router',
    ],

    estimatedMinutes:
      30,

    defaultLanguage:
      'typescript',

    allowedLanguages: [
      'typescript',
    ],

    starterFiles: [
      {
        path:
          'app/courses/new/page.tsx',

        language:
          'typescript',

        content:
          `export default function NewCoursePage() {
  async function createCourse(
    formData: FormData,
  ) {
    'use server';

    // Read title and log:
    // Created: <title>
  }

  return (
    <main>
      <form
        action={createCourse}
      >
        <input
          name="title"
          type="text"
        />

        <button
          type="submit"
        >
          Create Course
        </button>
      </form>
    </main>
  );
}
`,
      },
    ],

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Server Action form',

        description:
          'The form should post its title field to createCourse.',
      },
    ],
  },

  /* =======================================================
     11 — API INTEGRATION
  ======================================================= */

  {
    slug:
      'nextjs-api-integration',

    title:
      'Render Typed API Data',

    technologySlug:
      'nextjs',

    difficulty:
      'Hard',

    workspaceType:
      'framework',

    shortDescription:
      'Model API data with TypeScript and render it in a Server Component.',

    problemStatement:
      `Create a typed API-style data flow.

Define:
interface User {
  id: number;
  name: string;
  role: string;
}

Create an async function getUsers that returns:
1, Anu, admin
2, Kiran, student
3, Maya, trainer

Await getUsers in the page and render:

Anu - admin
Kiran - student
Maya - trainer`,

    inputFormat:
      'No input is required.',

    outputFormat:
      'Render each user name and role.',

    constraints: [
      'Use an interface named User.',
      'getUsers must return Promise<User[]>.',
      'Await getUsers inside the page.',
      'Render users with map.',
    ],

    skills: [
      'Typed Data',
      'API Integration Patterns',
      'Server Components',
      'Interfaces',
    ],

    estimatedMinutes:
      30,

    defaultLanguage:
      'typescript',

    allowedLanguages: [
      'typescript',
    ],

    starterFiles: [
      {
        path:
          'app/users/page.tsx',

        language:
          'typescript',

        content:
          `interface User {
  id: number;
  name: string;
  role: string;
}

async function getUsers(): Promise<User[]> {
  // Return the required users.
  return [];
}

export default async function UsersPage() {
  const users =
    await getUsers();

  return (
    <main>
      {/* Render each user as: name - role */}
    </main>
  );
}
`,
      },
    ],

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Typed users',

        description:
          'The page should render Anu, Kiran, and Maya with their roles.',
      },
    ],
  },

  /* =======================================================
     12 — DASHBOARD
  ======================================================= */

  {
    slug:
      'nextjs-dashboard',

    title:
      'Build a Learner Dashboard',

    technologySlug:
      'nextjs',

    difficulty:
      'Hard',

    workspaceType:
      'framework',

    shortDescription:
      'Combine typed data, Server Components, and navigation in a small dashboard.',

    problemStatement:
      `Build a learner dashboard page.

Use this data:
- Completed: 6
- In Progress: 2
- Total: 10

The page must:
1. Render a heading: Learner Dashboard
2. Render all three metrics.
3. Calculate remaining courses as total - completed.
4. Render: Remaining: 4
5. Add a Next.js Link labeled Continue Learning that points to /courses.`,

    inputFormat:
      'No input is required.',

    outputFormat:
      'Render the dashboard metrics, remaining count, and Continue Learning link.',

    constraints: [
      'Use typed dashboard data.',
      'Calculate remaining instead of hardcoding 4.',
      'Use Link from next/link.',
      'Keep the page as a Server Component.',
    ],

    skills: [
      'Next.js Server Components',
      'Typed Data',
      'Derived Values',
      'Navigation',
      'Dashboard UI',
    ],

    estimatedMinutes:
      35,

    defaultLanguage:
      'typescript',

    allowedLanguages: [
      'typescript',
    ],

    starterFiles: [
      {
        path:
          'app/dashboard/page.tsx',

        language:
          'typescript',

        content:
          `import Link from 'next/link';

type DashboardStats = {
  completed: number;
  inProgress: number;
  total: number;
};

const stats: DashboardStats = {
  completed: 6,
  inProgress: 2,
  total: 10,
};

export default function DashboardPage() {
  const remaining =
    0;

  return (
    <main>
      <h1>
        Learner Dashboard
      </h1>

      {/* Render all metrics. */}

      <p>
        Remaining: {remaining}
      </p>

      {/* Add Continue Learning link. */}
    </main>
  );
}
`,
      },
    ],

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Dashboard',

        description:
          'The page should display the three metrics, Remaining: 4, and a /courses link.',
      },
    ],
  },
];
