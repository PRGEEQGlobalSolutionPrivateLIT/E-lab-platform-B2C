/* =========================================================
   NESTJS HIDDEN TEST CASES

   Path:

   C:\dev\elab-platform\apps\api\src\submissions\nestjs-test-cases.ts

   IMPORTANT:

   - These tests remain server-side.
   - They are not sent to the learner browser.
   - Each NestJS problem has 3 hidden tests.
   - Tests are source-structure / implementation checks.
   - The NestJS Judge runner remains the TypeScript compile gate.
   - SubmissionService will evaluate these checks after a
     successful NestJS compilation in the next stage.
========================================================= */

/* =========================================================
   TYPES
========================================================= */

export type NestJsSourceCheck = {
  filePath: string;
  pattern: string;
  flags?: string;
  message: string;
};

export type NestJsForbiddenSourceCheck = {
  filePath: string;
  pattern: string;
  flags?: string;
  message: string;
};

export type NestJsHiddenTestCase = {
  id: string;
  title: string;
  requiredFiles?: string[];
  requiredSourceChecks?: NestJsSourceCheck[];
  forbiddenSourceChecks?: NestJsForbiddenSourceCheck[];
};

/* =========================================================
   HELPERS
========================================================= */

function required(
  filePath: string,
  pattern: string,
  message: string,
  flags = 'm',
): NestJsSourceCheck {
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
): NestJsForbiddenSourceCheck {
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

const NESTJS_TEST_CASES:
  Record<
    string,
    NestJsHiddenTestCase[]
  > = {

  /* =======================================================
     01 — BASIC CONTROLLER
  ======================================================= */

  'nestjs-basic-controller': [
    {
      id:
        'nestjs-basic-controller-1',

      title:
        'Creates AppController',

      requiredFiles: [
        'src/app.controller.ts',
      ],

      requiredSourceChecks: [
        required(
          'src/app.controller.ts',
          String.raw`@Controller\s*\(\s*\)`,
          'Use @Controller() on AppController.',
        ),

        required(
          'src/app.controller.ts',
          String.raw`export\s+class\s+AppController\b`,
          'Export a class named AppController.',
        ),
      ],
    },

    {
      id:
        'nestjs-basic-controller-2',

      title:
        'Defines the root GET endpoint',

      requiredSourceChecks: [
        required(
          'src/app.controller.ts',
          String.raw`@Get\s*\(\s*\)`,
          'Define the root endpoint with @Get().',
        ),

        required(
          'src/app.controller.ts',
          String.raw`getHome\s*\(\s*\)\s*:\s*string`,
          'Define getHome() as a string-returning method.',
        ),
      ],
    },

    {
      id:
        'nestjs-basic-controller-3',

      title:
        'Returns the required welcome text',

      requiredSourceChecks: [
        required(
          'src/app.controller.ts',
          String.raw`return\s+["']Welcome\s+to\s+NestJS["']\s*;?`,
          'Return exactly "Welcome to NestJS".',
          'im',
        ),
      ],
    },
  ],

  /* =======================================================
     02 — GET ROUTE
  ======================================================= */

  'nestjs-get-route': [
    {
      id:
        'nestjs-get-route-1',

      title:
        'Creates the courses controller',

      requiredFiles: [
        'src/courses.controller.ts',
      ],

      requiredSourceChecks: [
        required(
          'src/courses.controller.ts',
          String.raw`@Controller\s*\(\s*["']courses["']\s*\)`,
          'Use @Controller("courses").',
        ),

        required(
          'src/courses.controller.ts',
          String.raw`export\s+class\s+CoursesController\b`,
          'Export CoursesController.',
        ),
      ],
    },

    {
      id:
        'nestjs-get-route-2',

      title:
        'Defines GET courses',

      requiredSourceChecks: [
        required(
          'src/courses.controller.ts',
          String.raw`@Get\s*\(\s*\)`,
          'Define GET /courses with @Get().',
        ),

        required(
          'src/courses.controller.ts',
          String.raw`getCourses\s*\(\s*\)\s*:\s*string\s*\[\s*\]`,
          'Define getCourses() returning string[].',
        ),
      ],
    },

    {
      id:
        'nestjs-get-route-3',

      title:
        'Returns the required course list',

      requiredSourceChecks: [
        required(
          'src/courses.controller.ts',
          String.raw`["']Next\.js["']`,
          'Include Next.js in the returned list.',
        ),

        required(
          'src/courses.controller.ts',
          String.raw`["']NestJS["']`,
          'Include NestJS in the returned list.',
        ),

        required(
          'src/courses.controller.ts',
          String.raw`["']PostgreSQL["']`,
          'Include PostgreSQL in the returned list.',
        ),
      ],
    },
  ],

  /* =======================================================
     03 — POST ROUTE
  ======================================================= */

  'nestjs-post-route': [
    {
      id:
        'nestjs-post-route-1',

      title:
        'Creates POST users route',

      requiredFiles: [
        'src/users.controller.ts',
      ],

      requiredSourceChecks: [
        required(
          'src/users.controller.ts',
          String.raw`@Controller\s*\(\s*["']users["']\s*\)`,
          'Use @Controller("users").',
        ),

        required(
          'src/users.controller.ts',
          String.raw`@Post\s*\(\s*\)`,
          'Define POST /users with @Post().',
        ),
      ],
    },

    {
      id:
        'nestjs-post-route-2',

      title:
        'Reads the request body',

      requiredSourceChecks: [
        required(
          'src/users.controller.ts',
          String.raw`@Body\s*\(\s*\)\s*[\r\n\s]*body\s*:\s*\{[\s\S]*?name\s*:\s*string`,
          'Read a request body containing name: string.',
        ),
      ],
    },

    {
      id:
        'nestjs-post-route-3',

      title:
        'Returns the created-user response',

      requiredSourceChecks: [
        required(
          'src/users.controller.ts',
          String.raw`message\s*:\s*["']User\s+created["']`,
          'Return message: "User created".',
          'im',
        ),

        required(
          'src/users.controller.ts',
          String.raw`name\s*:\s*body\.name`,
          'Return the submitted body.name value.',
        ),
      ],
    },
  ],

  /* =======================================================
     04 — ROUTE PARAMETERS
  ======================================================= */

  'nestjs-route-params': [
    {
      id:
        'nestjs-route-params-1',

      title:
        'Creates dynamic courses route',

      requiredFiles: [
        'src/courses.controller.ts',
      ],

      requiredSourceChecks: [
        required(
          'src/courses.controller.ts',
          String.raw`@Controller\s*\(\s*["']courses["']\s*\)`,
          'Use @Controller("courses").',
        ),

        required(
          'src/courses.controller.ts',
          String.raw`@Get\s*\(\s*["']:id["']\s*\)`,
          'Use @Get(":id").',
        ),
      ],
    },

    {
      id:
        'nestjs-route-params-2',

      title:
        'Reads id with Param',

      requiredSourceChecks: [
        required(
          'src/courses.controller.ts',
          String.raw`@Param\s*\(\s*["']id["']\s*\)\s*[\r\n\s]*id\s*:\s*string`,
          'Read id with @Param("id") and keep it as a string.',
        ),
      ],
    },

    {
      id:
        'nestjs-route-params-3',

      title:
        'Builds the response from id',

      requiredSourceChecks: [
        required(
          'src/courses.controller.ts',
          String.raw`id\s*:\s*id\b`,
          'Return the route id in the response.',
        ),

        required(
          'src/courses.controller.ts',
          String.raw`title\s*:\s*(?:["']Course\s*["']\s*\+\s*id|` + '`Course\\s+\\$\\{\\s*id\\s*\\}`' + String.raw`)`,
          'Build title from the route id.',
        ),
      ],
    },
  ],

  /* =======================================================
     05 — QUERY PARAMETERS
  ======================================================= */

  'nestjs-query-params': [
    {
      id:
        'nestjs-query-params-1',

      title:
        'Creates the search endpoint',

      requiredFiles: [
        'src/search.controller.ts',
      ],

      requiredSourceChecks: [
        required(
          'src/search.controller.ts',
          String.raw`@Controller\s*\(\s*["']search["']\s*\)`,
          'Use @Controller("search").',
        ),

        required(
          'src/search.controller.ts',
          String.raw`@Get\s*\(\s*\)`,
          'Define GET /search with @Get().',
        ),
      ],
    },

    {
      id:
        'nestjs-query-params-2',

      title:
        'Reads q with Query',

      requiredSourceChecks: [
        required(
          'src/search.controller.ts',
          String.raw`@Query\s*\(\s*["']q["']\s*\)\s*[\r\n\s]*q\?\s*:\s*string`,
          'Read optional q with @Query("q").',
        ),
      ],
    },

    {
      id:
        'nestjs-query-params-3',

      title:
        'Defaults query to all',

      requiredSourceChecks: [
        required(
          'src/search.controller.ts',
          String.raw`query\s*:\s*(?:q\s*\?\?\s*["']all["']|q\s*\|\|\s*["']all["'])`,
          'Return query using q with "all" as the fallback.',
        ),
      ],
    },
  ],

  /* =======================================================
     06 — SERVICE
  ======================================================= */

  'nestjs-service': [
    {
      id:
        'nestjs-service-1',

      title:
        'Creates injectable CoursesService',

      requiredFiles: [
        'src/courses.service.ts',
      ],

      requiredSourceChecks: [
        required(
          'src/courses.service.ts',
          String.raw`@Injectable\s*\(\s*\)`,
          'Decorate CoursesService with @Injectable().',
        ),

        required(
          'src/courses.service.ts',
          String.raw`export\s+class\s+CoursesService\b`,
          'Export CoursesService.',
        ),
      ],
    },

    {
      id:
        'nestjs-service-2',

      title:
        'Defines getCourses',

      requiredSourceChecks: [
        required(
          'src/courses.service.ts',
          String.raw`getCourses\s*\(\s*\)\s*:\s*string\s*\[\s*\]`,
          'Define getCourses() returning string[].',
        ),
      ],
    },

    {
      id:
        'nestjs-service-3',

      title:
        'Returns the required technologies',

      requiredSourceChecks: [
        required(
          'src/courses.service.ts',
          String.raw`["']TypeScript["']`,
          'Include TypeScript.',
        ),

        required(
          'src/courses.service.ts',
          String.raw`["']Next\.js["']`,
          'Include Next.js.',
        ),

        required(
          'src/courses.service.ts',
          String.raw`["']NestJS["']`,
          'Include NestJS.',
        ),
      ],
    },
  ],

  /* =======================================================
     07 — DEPENDENCY INJECTION
  ======================================================= */

  'nestjs-dependency-injection': [
    {
      id:
        'nestjs-dependency-injection-1',

      title:
        'Keeps controller and service files',

      requiredFiles: [
        'src/courses.controller.ts',
        'src/courses.service.ts',
      ],

      requiredSourceChecks: [
        required(
          'src/courses.controller.ts',
          String.raw`@Controller\s*\(\s*["']courses["']\s*\)`,
          'Use @Controller("courses").',
        ),

        required(
          'src/courses.service.ts',
          String.raw`@Injectable\s*\(\s*\)`,
          'Keep CoursesService injectable.',
        ),
      ],
    },

    {
      id:
        'nestjs-dependency-injection-2',

      title:
        'Injects CoursesService',

      requiredSourceChecks: [
        required(
          'src/courses.controller.ts',
          String.raw`constructor\s*\([\s\S]*?(?:private|public|protected)\s+readonly\s+coursesService\s*:\s*CoursesService[\s\S]*?\)`,
          'Inject CoursesService through the constructor.',
          'm',
        ),
      ],

      forbiddenSourceChecks: [
        forbidden(
          'src/courses.controller.ts',
          String.raw`new\s+CoursesService\s*\(`,
          'Do not instantiate CoursesService manually.',
        ),
      ],
    },

    {
      id:
        'nestjs-dependency-injection-3',

      title:
        'Returns the service result',

      requiredSourceChecks: [
        required(
          'src/courses.controller.ts',
          String.raw`@Get\s*\(\s*\)`,
          'Define GET /courses.',
        ),

        required(
          'src/courses.controller.ts',
          String.raw`return\s+this\.coursesService\.getCourses\s*\(\s*\)\s*;?`,
          'Return this.coursesService.getCourses().',
        ),
      ],
    },
  ],

  /* =======================================================
     08 — DTO
  ======================================================= */

  'nestjs-create-dto': [
    {
      id:
        'nestjs-create-dto-1',

      title:
        'Defines CreateCourseDto',

      requiredFiles: [
        'src/courses.controller.ts',
      ],

      requiredSourceChecks: [
        required(
          'src/courses.controller.ts',
          String.raw`(?:export\s+)?class\s+CreateCourseDto\b`,
          'Define CreateCourseDto.',
        ),

        required(
          'src/courses.controller.ts',
          String.raw`title\s*!?\s*:\s*string`,
          'CreateCourseDto must contain title: string.',
        ),

        required(
          'src/courses.controller.ts',
          String.raw`duration\s*!?\s*:\s*number`,
          'CreateCourseDto must contain duration: number.',
        ),
      ],
    },

    {
      id:
        'nestjs-create-dto-2',

      title:
        'Uses DTO in POST courses',

      requiredSourceChecks: [
        required(
          'src/courses.controller.ts',
          String.raw`@Controller\s*\(\s*["']courses["']\s*\)`,
          'Use @Controller("courses").',
        ),

        required(
          'src/courses.controller.ts',
          String.raw`@Post\s*\(\s*\)`,
          'Define POST /courses.',
        ),

        required(
          'src/courses.controller.ts',
          String.raw`@Body\s*\(\s*\)\s*[\r\n\s]*body\s*:\s*CreateCourseDto`,
          'Type the request body as CreateCourseDto.',
        ),
      ],
    },

    {
      id:
        'nestjs-create-dto-3',

      title:
        'Returns the received DTO',

      requiredSourceChecks: [
        required(
          'src/courses.controller.ts',
          String.raw`return\s+body\s*;?`,
          'Return the received DTO unchanged.',
        ),
      ],
    },
  ],

  /* =======================================================
     09 — VALIDATION
  ======================================================= */

  'nestjs-validation': [
    {
      id:
        'nestjs-validation-1',

      title:
        'Creates exported validation DTO',

      requiredFiles: [
        'src/create-user.dto.ts',
      ],

      requiredSourceChecks: [
        required(
          'src/create-user.dto.ts',
          String.raw`from\s+["']class-validator["']`,
          'Import validators from class-validator.',
        ),

        required(
          'src/create-user.dto.ts',
          String.raw`export\s+class\s+CreateUserDto\b`,
          'Export CreateUserDto.',
        ),
      ],
    },

    {
      id:
        'nestjs-validation-2',

      title:
        'Validates name and email',

      requiredSourceChecks: [
        required(
          'src/create-user.dto.ts',
          String.raw`@IsString\s*\(\s*\)[\s\S]*?name\s*!?\s*:\s*string`,
          'Apply @IsString() to name.',
          'm',
        ),

        required(
          'src/create-user.dto.ts',
          String.raw`@IsEmail\s*\(\s*\)[\s\S]*?email\s*!?\s*:\s*string`,
          'Apply @IsEmail() to email.',
          'm',
        ),
      ],
    },

    {
      id:
        'nestjs-validation-3',

      title:
        'Validates age',

      requiredSourceChecks: [
        required(
          'src/create-user.dto.ts',
          String.raw`@IsInt\s*\(\s*\)[\s\S]*?@Min\s*\(\s*18\s*\)[\s\S]*?age\s*!?\s*:\s*number|@Min\s*\(\s*18\s*\)[\s\S]*?@IsInt\s*\(\s*\)[\s\S]*?age\s*!?\s*:\s*number`,
          'Apply @IsInt() and @Min(18) to age.',
          'm',
        ),
      ],
    },
  ],

  /* =======================================================
     10 — MODULE
  ======================================================= */

  'nestjs-module': [
    {
      id:
        'nestjs-module-1',

      title:
        'Keeps the module dependencies',

      requiredFiles: [
        'src/courses.module.ts',
        'src/courses.controller.ts',
        'src/courses.service.ts',
      ],

      requiredSourceChecks: [
        required(
          'src/courses.module.ts',
          String.raw`@Module\s*\(`,
          'Decorate CoursesModule with @Module().',
        ),

        required(
          'src/courses.module.ts',
          String.raw`export\s+class\s+CoursesModule\b`,
          'Export CoursesModule.',
        ),
      ],
    },

    {
      id:
        'nestjs-module-2',

      title:
        'Registers controller and provider',

      requiredSourceChecks: [
        required(
          'src/courses.module.ts',
          String.raw`controllers\s*:\s*\[[\s\S]*?CoursesController[\s\S]*?\]`,
          'Register CoursesController in controllers.',
          'm',
        ),

        required(
          'src/courses.module.ts',
          String.raw`providers\s*:\s*\[[\s\S]*?CoursesService[\s\S]*?\]`,
          'Register CoursesService in providers.',
          'm',
        ),
      ],
    },

    {
      id:
        'nestjs-module-3',

      title:
        'Exports CoursesService',

      requiredSourceChecks: [
        required(
          'src/courses.module.ts',
          String.raw`exports\s*:\s*\[[\s\S]*?CoursesService[\s\S]*?\]`,
          'Export CoursesService from CoursesModule.',
          'm',
        ),
      ],
    },
  ],

  /* =======================================================
     11 — USERS API
  ======================================================= */

  'nestjs-users-api': [
    {
      id:
        'nestjs-users-api-1',

      title:
        'Creates users API and initial data',

      requiredFiles: [
        'src/users.controller.ts',
      ],

      requiredSourceChecks: [
        required(
          'src/users.controller.ts',
          String.raw`@Controller\s*\(\s*["']users["']\s*\)`,
          'Use @Controller("users").',
        ),

        required(
          'src/users.controller.ts',
          String.raw`name\s*:\s*["']Anu["']`,
          'Initialize user Anu.',
        ),

        required(
          'src/users.controller.ts',
          String.raw`name\s*:\s*["']Kiran["']`,
          'Initialize user Kiran.',
        ),
      ],
    },

    {
      id:
        'nestjs-users-api-2',

      title:
        'Implements GET endpoints',

      requiredSourceChecks: [
        required(
          'src/users.controller.ts',
          String.raw`@Get\s*\(\s*\)[\s\S]*?return\s+this\.users\s*;?`,
          'GET /users must return all users.',
          'm',
        ),

        required(
          'src/users.controller.ts',
          String.raw`@Get\s*\(\s*["']:id["']\s*\)`,
          'Define GET /users/:id.',
        ),

        required(
          'src/users.controller.ts',
          String.raw`@Param\s*\(\s*["']id["']\s*\)`,
          'Read id with @Param("id").',
        ),

        required(
          'src/users.controller.ts',
          String.raw`this\.users\.find\s*\(`,
          'Find the matching user from this.users.',
        ),
      ],
    },

    {
      id:
        'nestjs-users-api-3',

      title:
        'Creates and stores the next user',

      requiredSourceChecks: [
        required(
          'src/users.controller.ts',
          String.raw`@Post\s*\(\s*\)`,
          'Define POST /users.',
        ),

        required(
          'src/users.controller.ts',
          String.raw`id\s*:\s*this\.users\.length\s*\+\s*1`,
          'Create the new id using users.length + 1.',
        ),

        required(
          'src/users.controller.ts',
          String.raw`name\s*:\s*body\.name`,
          'Use the submitted name.',
        ),

        required(
          'src/users.controller.ts',
          String.raw`this\.users\.push\s*\(`,
          'Push the new user into the users array.',
        ),

        required(
          'src/users.controller.ts',
          String.raw`return\s+\w+\s*;?`,
          'Return the newly created user.',
        ),
      ],
    },
  ],

  /* =======================================================
     12 — COURSE MANAGEMENT API
  ======================================================= */

  'nestjs-course-management-api': [
    {
      id:
        'nestjs-course-management-api-1',

      title:
        'Implements CoursesService data operations',

      requiredFiles: [
        'src/courses.controller.ts',
        'src/courses.service.ts',
      ],

      requiredSourceChecks: [
        required(
          'src/courses.service.ts',
          String.raw`@Injectable\s*\(\s*\)`,
          'Keep CoursesService injectable.',
        ),

        required(
          'src/courses.service.ts',
          String.raw`title\s*:\s*["']TypeScript["']`,
          'Initialize the TypeScript course.',
        ),

        required(
          'src/courses.service.ts',
          String.raw`title\s*:\s*["']NestJS["']`,
          'Initialize the NestJS course.',
        ),

        required(
          'src/courses.service.ts',
          String.raw`return\s+this\.courses\s*;?`,
          'getCourses() must return this.courses.',
        ),
      ],
    },

    {
      id:
        'nestjs-course-management-api-2',

      title:
        'Creates courses with the next id',

      requiredSourceChecks: [
        required(
          'src/courses.service.ts',
          String.raw`id\s*:\s*this\.courses\.length\s*\+\s*1`,
          'Create ids using courses.length + 1.',
        ),

        required(
          'src/courses.service.ts',
          String.raw`this\.courses\.push\s*\(`,
          'Push the new course into the courses array.',
        ),

        required(
          'src/courses.service.ts',
          String.raw`return\s+course\s*;?`,
          'Return the newly created course.',
        ),
      ],
    },

    {
      id:
        'nestjs-course-management-api-3',

      title:
        'Delegates controller routes to the service',

      requiredSourceChecks: [
        required(
          'src/courses.controller.ts',
          String.raw`constructor\s*\([\s\S]*?(?:private|public|protected)\s+readonly\s+coursesService\s*:\s*CoursesService[\s\S]*?\)`,
          'Inject CoursesService into CoursesController.',
          'm',
        ),

        required(
          'src/courses.controller.ts',
          String.raw`@Get\s*\(\s*\)[\s\S]*?return\s+this\.coursesService\.getCourses\s*\(\s*\)\s*;?`,
          'GET /courses must return coursesService.getCourses().',
          'm',
        ),

        required(
          'src/courses.controller.ts',
          String.raw`@Post\s*\(\s*\)[\s\S]*?@Body\s*\(\s*\)[\s\S]*?body\s*:\s*\{[\s\S]*?title\s*:\s*string[\s\S]*?\}[\s\S]*?return\s+this\.coursesService\.createCourse\s*\(\s*body\.title\s*\)\s*;?`,
          'POST /courses must call coursesService.createCourse(body.title).',
          'm',
        ),
      ],

      forbiddenSourceChecks: [
        forbidden(
          'src/courses.controller.ts',
          String.raw`new\s+CoursesService\s*\(`,
          'Do not instantiate CoursesService manually.',
        ),
      ],
    },
  ],
};

/* =========================================================
   GET TEST CASES
========================================================= */

export function getNestJsTestCases(
  problemSlug: string,
): NestJsHiddenTestCase[] {
  return (
    NESTJS_TEST_CASES[
      problemSlug
    ] ?? []
  );
}
