import type {
  PracticeProblem,
} from './types';

/* =========================================================
   NESTJS PROBLEMS

   Target:
   NestJS + TypeScript

   IMPORTANT:
   - These problems use the shared framework workspace.
   - They do NOT create a separate NestJS editor.
   - The first starter file is the learner-editable file.
   - Additional starter files can provide supporting NestJS code.
   - Judge/runtime support is connected in a later stage.
========================================================= */

export const nestjsProblems:
  PracticeProblem[] = [
  /* =======================================================
     01 — BASIC CONTROLLER
  ======================================================= */

  {
    slug:
      'nestjs-basic-controller',

    title:
      'Create a Basic Controller',

    technologySlug:
      'nestjs',

    difficulty:
      'Easy',

    workspaceType:
      'framework',

    shortDescription:
      'Create a NestJS controller with a basic GET endpoint.',

    problemStatement:
      `Create a NestJS controller named AppController.

The controller must:
1. Use the @Controller() decorator.
2. Define a GET endpoint for "/".
3. Return the text "Welcome to NestJS".

Use TypeScript and NestJS decorators.`,

    inputFormat:
      'No input is required.',

    outputFormat:
      'The GET / endpoint must return: Welcome to NestJS',

    constraints: [
      'Use @Controller().',
      'Use @Get().',
      'Export a class named AppController.',
      'Return exactly "Welcome to NestJS".',
    ],

    skills: [
      'NestJS Controllers',
      'Decorators',
      'GET Routes',
      'TypeScript',
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
          'src/app.controller.ts',

        language:
          'typescript',

        content:
          `import {
  Controller,
  Get,
} from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHome(): string {
    return '';
  }
}
`,
      },
    ],

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Root endpoint',

        description:
          'GET / should return "Welcome to NestJS".',
      },
    ],
  },

  /* =======================================================
     02 — GET ROUTE
  ======================================================= */

  {
    slug:
      'nestjs-get-route',

    title:
      'Create a GET Route',

    technologySlug:
      'nestjs',

    difficulty:
      'Easy',

    workspaceType:
      'framework',

    shortDescription:
      'Create a controller route that returns a course list.',

    problemStatement:
      `Create a CoursesController.

The controller must:
1. Use @Controller('courses').
2. Define a GET endpoint for /courses.
3. Return an array containing:
   - Next.js
   - NestJS
   - PostgreSQL

Return the array directly from the controller method.`,

    inputFormat:
      'No input is required.',

    outputFormat:
      'GET /courses must return ["Next.js", "NestJS", "PostgreSQL"].',

    constraints: [
      'Use @Controller("courses").',
      'Use @Get().',
      'Export CoursesController.',
      'Return exactly three course names.',
    ],

    skills: [
      'Controllers',
      'GET Endpoints',
      'Arrays',
      'Route Prefixes',
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
          'src/courses.controller.ts',

        language:
          'typescript',

        content:
          `import {
  Controller,
  Get,
} from '@nestjs/common';

@Controller('courses')
export class CoursesController {
  @Get()
  getCourses(): string[] {
    return [];
  }
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
          'GET /courses should return the three required course names.',
      },
    ],
  },

  /* =======================================================
     03 — POST ROUTE
  ======================================================= */

  {
    slug:
      'nestjs-post-route',

    title:
      'Create a POST Route',

    technologySlug:
      'nestjs',

    difficulty:
      'Easy',

    workspaceType:
      'framework',

    shortDescription:
      'Create a POST endpoint that accepts a request body.',

    problemStatement:
      `Create a UsersController with a POST endpoint.

The controller must:
1. Use @Controller('users').
2. Define POST /users.
3. Read the request body with @Body().
4. Accept an object containing a name field.
5. Return:
   {
     message: "User created",
     name: <submitted name>
   }`,

    inputFormat:
      'Request body example: { "name": "Anu" }',

    outputFormat:
      `Return:
{
  "message": "User created",
  "name": "Anu"
}`,

    constraints: [
      'Use @Post().',
      'Use @Body().',
      'Do not hard-code the submitted name.',
      'Return an object with message and name.',
    ],

    skills: [
      'POST Endpoints',
      'Request Body',
      '@Body Decorator',
      'Response Objects',
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
          'src/users.controller.ts',

        language:
          'typescript',

        content:
          `import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Post()
  createUser(
    @Body()
    body: {
      name: string;
    },
  ) {
    return {};
  }
}
`,
      },
    ],

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Create user',

        description:
          'Submitting name "Anu" should return the required response object.',
      },
    ],
  },

  /* =======================================================
     04 — ROUTE PARAMETERS
  ======================================================= */

  {
    slug:
      'nestjs-route-params',

    title:
      'Use Route Parameters',

    technologySlug:
      'nestjs',

    difficulty:
      'Easy',

    workspaceType:
      'framework',

    shortDescription:
      'Read a dynamic route parameter with @Param().',

    problemStatement:
      `Create a controller endpoint for GET /courses/:id.

The controller must:
1. Use @Controller('courses').
2. Use @Get(':id').
3. Read id using @Param('id').
4. Return:
   {
     id: <id>,
     title: "Course " + <id>
   }

For /courses/42, title must be "Course 42".`,

    inputFormat:
      'Route parameter example: /courses/42',

    outputFormat:
      `Return:
{
  "id": "42",
  "title": "Course 42"
}`,

    constraints: [
      'Use @Param("id").',
      'Keep id as a string.',
      'Build title from the route parameter.',
    ],

    skills: [
      'Route Parameters',
      '@Param Decorator',
      'Dynamic Routes',
      'Controller Methods',
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
          'src/courses.controller.ts',

        language:
          'typescript',

        content:
          `import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';

@Controller('courses')
export class CoursesController {
  @Get(':id')
  getCourse(
    @Param('id')
    id: string,
  ) {
    return {};
  }
}
`,
      },
    ],

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Course by id',

        description:
          'GET /courses/42 should return id "42" and title "Course 42".',
      },
    ],
  },

  /* =======================================================
     05 — QUERY PARAMETERS
  ======================================================= */

  {
    slug:
      'nestjs-query-params',

    title:
      'Use Query Parameters',

    technologySlug:
      'nestjs',

    difficulty:
      'Medium',

    workspaceType:
      'framework',

    shortDescription:
      'Read and use query parameters in a NestJS endpoint.',

    problemStatement:
      `Create GET /search?q=<term>.

The controller must:
1. Use @Controller('search').
2. Read q using @Query('q').
3. If q is provided, return:
   { query: q }
4. If q is missing, return:
   { query: "all" }`,

    inputFormat:
      'Query example: /search?q=nestjs',

    outputFormat:
      'Return { "query": "nestjs" } or { "query": "all" } when q is missing.',

    constraints: [
      'Use @Query("q").',
      'Default to "all".',
      'Return an object with a query property.',
    ],

    skills: [
      'Query Parameters',
      '@Query Decorator',
      'Default Values',
      'HTTP GET',
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
          'src/search.controller.ts',

        language:
          'typescript',

        content:
          `import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';

@Controller('search')
export class SearchController {
  @Get()
  search(
    @Query('q')
    q?: string,
  ) {
    return {};
  }
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
          'GET /search?q=nestjs should return { query: "nestjs" }.',
      },
    ],
  },

  /* =======================================================
     06 — SERVICE
  ======================================================= */

  {
    slug:
      'nestjs-service',

    title:
      'Create a Service',

    technologySlug:
      'nestjs',

    difficulty:
      'Medium',

    workspaceType:
      'framework',

    shortDescription:
      'Create an injectable NestJS service.',

    problemStatement:
      `Create a CoursesService.

The service must:
1. Use @Injectable().
2. Export a class named CoursesService.
3. Define getCourses().
4. Return:
   ["TypeScript", "Next.js", "NestJS"]`,

    inputFormat:
      'No input is required.',

    outputFormat:
      'getCourses() must return ["TypeScript", "Next.js", "NestJS"].',

    constraints: [
      'Use @Injectable().',
      'Export CoursesService.',
      'Return the required array from getCourses().',
    ],

    skills: [
      'Services',
      '@Injectable',
      'Business Logic',
      'Dependency Providers',
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
          'src/courses.service.ts',

        language:
          'typescript',

        content:
          `import {
  Injectable,
} from '@nestjs/common';

@Injectable()
export class CoursesService {
  getCourses(): string[] {
    return [];
  }
}
`,
      },
    ],

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Service result',

        description:
          'getCourses() should return the three required technologies.',
      },
    ],
  },

  /* =======================================================
     07 — DEPENDENCY INJECTION
  ======================================================= */

  {
    slug:
      'nestjs-dependency-injection',

    title:
      'Inject a Service into a Controller',

    technologySlug:
      'nestjs',

    difficulty:
      'Medium',

    workspaceType:
      'framework',

    shortDescription:
      'Use constructor injection to consume a NestJS service.',

    problemStatement:
      `Connect CoursesController to CoursesService.

The controller must:
1. Use @Controller('courses').
2. Inject CoursesService through the constructor.
3. Define GET /courses.
4. Return this.coursesService.getCourses().

The provided CoursesService already returns the course list.`,

    inputFormat:
      'No input is required.',

    outputFormat:
      'GET /courses must return the result from CoursesService.getCourses().',

    constraints: [
      'Use constructor injection.',
      'Do not create CoursesService with new.',
      'Call this.coursesService.getCourses().',
    ],

    skills: [
      'Dependency Injection',
      'Constructor Injection',
      'Controllers',
      'Services',
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
          'src/courses.controller.ts',

        language:
          'typescript',

        content:
          `import {
  Controller,
  Get,
} from '@nestjs/common';

import {
  CoursesService,
} from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesService:
      CoursesService,
  ) {}

  @Get()
  getCourses() {
    // Return the service result.
  }
}
`,
      },
      {
        path:
          'src/courses.service.ts',

        language:
          'typescript',

        content:
          `import {
  Injectable,
} from '@nestjs/common';

@Injectable()
export class CoursesService {
  getCourses(): string[] {
    return [
      'TypeScript',
      'Next.js',
      'NestJS',
    ];
  }
}
`,
      },
    ],

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Injected service',

        description:
          'The controller should return the value produced by CoursesService.',
      },
    ],
  },

  /* =======================================================
     08 — DTO
  ======================================================= */

  {
    slug:
      'nestjs-create-dto',

    title:
      'Create a DTO',

    technologySlug:
      'nestjs',

    difficulty:
      'Medium',

    workspaceType:
      'framework',

    shortDescription:
      'Create and use a typed Data Transfer Object.',

    problemStatement:
      `Create a DTO for creating a course.

Create CreateCourseDto with:
1. title: string
2. duration: number

Then create POST /courses that:
1. Accepts @Body() body: CreateCourseDto.
2. Returns the received DTO unchanged.`,

    inputFormat:
      `Request body example:
{
  "title": "NestJS Fundamentals",
  "duration": 120
}`,

    outputFormat:
      'Return the submitted course object.',

    constraints: [
      'Define class CreateCourseDto.',
      'Use string for title.',
      'Use number for duration.',
      'Type the @Body() parameter as CreateCourseDto.',
    ],

    skills: [
      'DTOs',
      'TypeScript Classes',
      'Request Bodies',
      'API Contracts',
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
          'src/courses.controller.ts',

        language:
          'typescript',

        content:
          `import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

export class CreateCourseDto {
  title!: string;
  duration!: number;
}

@Controller('courses')
export class CoursesController {
  @Post()
  createCourse(
    @Body()
    body: CreateCourseDto,
  ) {
    return {};
  }
}
`,
      },
    ],

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Create course DTO',

        description:
          'POST /courses should return the submitted title and duration.',
      },
    ],
  },

  /* =======================================================
     09 — VALIDATION
  ======================================================= */

  {
    slug:
      'nestjs-validation',

    title:
      'Validate Request Data',

    technologySlug:
      'nestjs',

    difficulty:
      'Hard',

    workspaceType:
      'framework',

    shortDescription:
      'Add class-validator decorators to a NestJS DTO.',

    problemStatement:
      `Add validation to CreateUserDto.

Requirements:
1. name must use @IsString().
2. email must use @IsEmail().
3. age must use @IsInt().
4. age must use @Min(18).

Export CreateUserDto.`,

    inputFormat:
      `Example valid body:
{
  "name": "Anu",
  "email": "anu@example.com",
  "age": 22
}`,

    outputFormat:
      'The DTO must contain the required validation decorators.',

    constraints: [
      'Use class-validator.',
      'Use @IsString() for name.',
      'Use @IsEmail() for email.',
      'Use @IsInt() and @Min(18) for age.',
    ],

    skills: [
      'Validation',
      'class-validator',
      'DTO Validation',
      'Decorators',
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
          'src/create-user.dto.ts',

        language:
          'typescript',

        content:
          `import {
  IsEmail,
  IsInt,
  IsString,
  Min,
} from 'class-validator';

export class CreateUserDto {
  name!: string;

  email!: string;

  age!: number;
}
`,
      },
    ],

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'DTO validation',

        description:
          'The DTO should enforce string name, valid email, integer age, and minimum age 18.',
      },
    ],
  },

  /* =======================================================
     10 — MODULE
  ======================================================= */

  {
    slug:
      'nestjs-module',

    title:
      'Create a NestJS Module',

    technologySlug:
      'nestjs',

    difficulty:
      'Medium',

    workspaceType:
      'framework',

    shortDescription:
      'Register a controller and service in a NestJS module.',

    problemStatement:
      `Create CoursesModule.

The module must:
1. Use @Module().
2. Register CoursesController in controllers.
3. Register CoursesService in providers.
4. Export CoursesService.`,

    inputFormat:
      'No input is required.',

    outputFormat:
      'Export a correctly configured CoursesModule.',

    constraints: [
      'Use @Module().',
      'Include CoursesController in controllers.',
      'Include CoursesService in providers.',
      'Include CoursesService in exports.',
    ],

    skills: [
      'Modules',
      '@Module Decorator',
      'Providers',
      'Exports',
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
          'src/courses.module.ts',

        language:
          'typescript',

        content:
          `import {
  Module,
} from '@nestjs/common';

import {
  CoursesController,
} from './courses.controller';

import {
  CoursesService,
} from './courses.service';

@Module({
  controllers: [],
  providers: [],
  exports: [],
})
export class CoursesModule {}
`,
      },
      {
        path:
          'src/courses.controller.ts',

        language:
          'typescript',

        content:
          `import {
  Controller,
} from '@nestjs/common';

@Controller('courses')
export class CoursesController {}
`,
      },
      {
        path:
          'src/courses.service.ts',

        language:
          'typescript',

        content:
          `import {
  Injectable,
} from '@nestjs/common';

@Injectable()
export class CoursesService {}
`,
      },
    ],

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Module configuration',

        description:
          'CoursesModule should register the controller and service and export the service.',
      },
    ],
  },

  /* =======================================================
     11 — USERS API
  ======================================================= */

  {
    slug:
      'nestjs-users-api',

    title:
      'Build a Users API',

    technologySlug:
      'nestjs',

    difficulty:
      'Hard',

    workspaceType:
      'framework',

    shortDescription:
      'Build GET and POST endpoints for a simple users API.',

    problemStatement:
      `Build a small UsersController.

Requirements:
1. Use @Controller('users').
2. Maintain this users array:
   [
     { id: 1, name: "Anu" },
     { id: 2, name: "Kiran" }
   ]
3. GET /users returns all users.
4. GET /users/:id returns the matching user.
5. POST /users accepts { name: string }.
6. A new user id must be users.length + 1.
7. Add the new user to the array and return it.`,

    inputFormat:
      'POST body example: { "name": "Maya" }',

    outputFormat:
      'GET endpoints return user data; POST returns the newly created user.',

    constraints: [
      'Use @Get(), @Post(), @Param(), and @Body().',
      'Do not hard-code the new id.',
      'Push new users into the array.',
    ],

    skills: [
      'REST APIs',
      'CRUD Basics',
      'Route Parameters',
      'POST Requests',
      'In-memory Data',
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
          'src/users.controller.ts',

        language:
          'typescript',

        content:
          `import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

type User = {
  id: number;
  name: string;
};

@Controller('users')
export class UsersController {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'Anu',
    },
    {
      id: 2,
      name: 'Kiran',
    },
  ];

  @Get()
  getUsers(): User[] {
    return [];
  }

  @Get(':id')
  getUser(
    @Param('id')
    id: string,
  ): User | undefined {
    return undefined;
  }

  @Post()
  createUser(
    @Body()
    body: {
      name: string;
    },
  ): User {
    throw new Error(
      'Not implemented',
    );
  }
}
`,
      },
    ],

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Users API',

        description:
          'GET /users should return Anu and Kiran; POST should create the next user.',
      },
    ],
  },

  /* =======================================================
     12 — COURSE MANAGEMENT API
  ======================================================= */

  {
    slug:
      'nestjs-course-management-api',

    title:
      'Build a Course Management API',

    technologySlug:
      'nestjs',

    difficulty:
      'Hard',

    workspaceType:
      'framework',

    shortDescription:
      'Combine controllers, services, dependency injection, and REST operations.',

    problemStatement:
      `Build a small course management feature.

CoursesService must:
1. Store:
   [
     { id: 1, title: "TypeScript" },
     { id: 2, title: "NestJS" }
   ]
2. getCourses() returns all courses.
3. createCourse(title) creates a new course using courses.length + 1.

CoursesController must:
1. Use @Controller('courses').
2. Inject CoursesService.
3. GET /courses returns service.getCourses().
4. POST /courses accepts { title: string }.
5. POST returns service.createCourse(body.title).`,

    inputFormat:
      'POST body example: { "title": "PostgreSQL" }',

    outputFormat:
      'GET returns all courses. POST returns the newly created course.',

    constraints: [
      'Use dependency injection.',
      'Keep data logic in CoursesService.',
      'Use @Get(), @Post(), and @Body().',
      'Do not instantiate CoursesService manually.',
    ],

    skills: [
      'Controllers',
      'Services',
      'Dependency Injection',
      'REST API Design',
      'Separation of Concerns',
    ],

    estimatedMinutes:
      40,

    defaultLanguage:
      'typescript',

    allowedLanguages: [
      'typescript',
    ],

    starterFiles: [
      {
        path:
          'src/courses.controller.ts',

        language:
          'typescript',

        content:
          `import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import {
  CoursesService,
} from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesService:
      CoursesService,
  ) {}

  @Get()
  getCourses() {
    // Return all courses.
  }

  @Post()
  createCourse(
    @Body()
    body: {
      title: string;
    },
  ) {
    // Create a course through the service.
  }
}
`,
      },
      {
        path:
          'src/courses.service.ts',

        language:
          'typescript',

        content:
          `import {
  Injectable,
} from '@nestjs/common';

type Course = {
  id: number;
  title: string;
};

@Injectable()
export class CoursesService {
  private readonly courses:
    Course[] = [
      {
        id: 1,
        title: 'TypeScript',
      },
      {
        id: 2,
        title: 'NestJS',
      },
    ];

  getCourses(): Course[] {
    return this.courses;
  }

  createCourse(
    title: string,
  ): Course {
    const course: Course = {
      id:
        this.courses.length +
        1,
      title,
    };

    this.courses.push(
      course,
    );

    return course;
  }
}
`,
      },
    ],

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Course management',

        description:
          'GET should return initial courses and POST should create the next course.',
      },
    ],
  },
];
