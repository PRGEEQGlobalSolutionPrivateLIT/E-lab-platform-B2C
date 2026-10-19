import {

  BadGatewayException,

  BadRequestException,

  Injectable,

} from '@nestjs/common';

import getPythonAnalyticsDataset from '../data-analytics/python-analytics-datasets.js';

import getPythonMachineLearningDataset from '../ai-ml/python-machine-learning-datasets.js';

/* =========================================================

   EXECUTION REQUEST

========================================================= */

export type ExecutionRequest = {

  problemSlug: string;

  language: string;

  workspaceType: string;

  code: string;

  input?: string;

  /*

   * Optional multi-file payload.

   *

   * The current shared workspace normally sends one editable

   * `code` value. Framework files are derived automatically

   * when this array is not supplied.

   *

   * Keeping this optional makes the execution service ready

   * for future multi-file framework exercises without

   * creating separate editors.

   */

  files?: Array<{

    path: string;

    language: string;

    content: string;

  }>;

  tests?: Array<{

    id?: string;

    method?: string;

    path?: string;

    expectedStatus?: number;

    expectedOutput?: string;

    body?: string;

    callable?: string;

  }>;

  context?: {

    source?: string;

    technology?: string | null;

    domain?: string | null;

    stack?: string | null;

    module?: string | null;

    challenge?: string | null;

    attempt?: string | null;

  };

};

/* =========================================================

   JUDGE RESPONSE

========================================================= */

type JudgeResponse = {

  language?: string;

  runtime?: string;

  problemSlug?: string;

  status:

    | 'SUCCESS'

    | 'COMPILATION_ERROR'

    | 'RUNTIME_ERROR'

    | 'TIME_LIMIT_EXCEEDED'

    | 'UNSUPPORTED_LANGUAGE'

    | 'UNSUPPORTED_RUNTIME'

    | 'INVALID_REQUEST'

    | 'INTERNAL_ERROR';

  output?: string;

  stderr?: string;

  exitCode?: number | null;

  message?: string;

  testsReceived?: number;

  testsExecuted?: number;

  passedTests?: number;

  failedTests?: number;

  totalTests?: number;

  tests?: Array<{

    id?: string;

    method?: string;

    path?: string;

    passed?: boolean;

    status?: string;

    expectedStatus?: number;

    actualStatus?: number;

    expectedOutput?: string;

    actualOutput?: string;

  }>;

};

/* =========================================================

   SUPPORTED LANGUAGES

   Current normal-code runtime support:

   - C

   - C++

   - JavaScript / Node.js

   - TypeScript

   - Python

   - Java

   - C#

   - PHP

   - Ruby

========================================================= */

const SUPPORTED_LANGUAGES = [

  'c',

  'cpp',

  'javascript',

  'typescript',

  'python',

  'python-data-analytics',

  'python-machine-learning',
  'pyspark',

  'java',

  'csharp',

  'php',

  'ruby',

  'swift',

] as const;

/* =========================================================

   SUPPORTED LANGUAGE TYPE

========================================================= */

type SupportedLanguage =

  (typeof SUPPORTED_LANGUAGES)[number];

/* =========================================================

   SUPPORTED FRAMEWORK RUNTIMES

   These use:

   POST /run/framework

   instead of:

   POST /run

========================================================= */

const SUPPORTED_FRAMEWORK_RUNTIMES = [

  'express',

  'react',

  'vue',

  'angular',

  'nextjs',

  'nestjs',

  'django',

  'fastapi',

  'springboot',

  'aspnetcore',

] as const;

/* =========================================================

   SUPPORTED FRAMEWORK TYPE

========================================================= */

type SupportedFrameworkRuntime =

  (typeof SUPPORTED_FRAMEWORK_RUNTIMES)[number];

/* =========================================================

   NEXT.JS EDITABLE FILE PATHS

   The current Next.js problem bank intentionally exposes

   one editable file per problem. The shared Monaco editor

   therefore remains unchanged.

   Supporting project files are created by nextjs-runner.mjs.

========================================================= */

const NEXTJS_PROBLEM_FILE_PATHS:

  Record<string, string> = {

    'nextjs-page-component':

      'app/page.tsx',

    'nextjs-root-layout':

      'app/layout.tsx',

    'nextjs-navigation':

      'app/page.tsx',

    'nextjs-dynamic-route':

      'app/courses/[courseId]/page.tsx',

    'nextjs-server-component':

      'app/courses/page.tsx',

    'nextjs-client-component':

      'app/counter/page.tsx',

    'nextjs-search-params':

      'app/search/page.tsx',

    'nextjs-route-handler':

      'app/api/health/route.ts',

    'nextjs-data-fetching':

      'app/courses/page.tsx',

    'nextjs-form-action':

      'app/courses/new/page.tsx',

    'nextjs-api-integration':

      'app/users/page.tsx',

    'nextjs-dashboard':

      'app/dashboard/page.tsx',

  };

/* =========================================================

   NESTJS EDITABLE FILE PATHS

   These paths match the primary starter file for each

   NestJS problem.

   Multi-file NestJS exercises should send body.files.

   When body.files is absent, this map lets the shared

   single Monaco `code` value use the correct primary file.

========================================================= */

const NESTJS_PROBLEM_FILE_PATHS:

  Record<string, string> = {

    'nestjs-basic-controller':

      'src/app.controller.ts',

    'nestjs-get-route':

      'src/courses.controller.ts',

    'nestjs-post-route':

      'src/users.controller.ts',

    'nestjs-route-params':

      'src/courses.controller.ts',

    'nestjs-query-params':

      'src/search.controller.ts',

    'nestjs-service':

      'src/courses.service.ts',

    'nestjs-dependency-injection':

      'src/courses.controller.ts',

    'nestjs-create-dto':

      'src/courses.controller.ts',

    'nestjs-validation':

      'src/create-user.dto.ts',

    'nestjs-module':

      'src/courses.module.ts',

    'nestjs-users-api':

      'src/users.controller.ts',

    'nestjs-course-management-api':

      'src/courses.controller.ts',

  };

/* =========================================================

   DJANGO EDITABLE FILE PATHS

   These paths match the primary starter file for each

   Django problem.

   The shared Monaco editor remains unchanged. Supporting

   Django project files are created by django-runner.mjs.

========================================================= */

const DJANGO_PROBLEM_FILE_PATHS:

  Record<string, string> = {

    'django-basic-view':

      'app/views.py',

    'django-url-route':

      'app/urls.py',

    'django-template-context':

      'app/views.py',

    'django-dynamic-route':

      'app/urls.py',

    'django-post-request':

      'app/views.py',

    'django-course-model':

      'app/models.py',

    'django-queryset-filter':

      'app/services.py',

    'django-create-record':

      'app/services.py',

    'django-json-response':

      'app/views.py',

    'django-class-based-view':

      'app/views.py',

    'django-course-list-api':

      'app/views.py',

    'django-course-management':

      'app/views.py',

  };

/* =========================================================

   FASTAPI EDITABLE FILE PATHS

========================================================= */

const FASTAPI_PROBLEM_FILE_PATHS:

  Record<string, string> = {

    'fastapi-hello-world': 'main.py',

    'fastapi-path-parameter': 'main.py',

    'fastapi-query-parameter': 'main.py',

    'fastapi-post-endpoint': 'main.py',

    'fastapi-request-body': 'main.py',

    'fastapi-response-model': 'main.py',

    'fastapi-validation': 'main.py',

    'fastapi-dependency-injection': 'main.py',

    'fastapi-error-handling': 'main.py',

    'fastapi-crud-api': 'main.py',

    'fastapi-middleware': 'main.py',

    'fastapi-inventory-api': 'main.py',

  };

/* =========================================================

   FASTAPI RUN TESTS

========================================================= */

const FASTAPI_RUN_TESTS:

  Record<string, FrameworkHttpTest[]> = {

    'fastapi-hello-world': [

      {

        id: 'test-1',

        method: 'GET',

        path: '/',

        expectedStatus: 200,

        expectedOutput: 'Hello, World!',

      },

    ],

  };

/* =========================================================

   SPRING BOOT EDITABLE FILE PATHS

   These paths map the shared Monaco editor to the Java

   source file expected by the Spring Boot judge.

========================================================= */

const SPRINGBOOT_PROBLEM_FILE_PATHS:

  Record<string, string> = {

    'springboot-hello-controller':

      'src/main/java/com/elab/app/HelloController.java',

  };

/* =========================================================

   ASP.NET CORE EDITABLE FILE PATHS

   ASP.NET Core practice problems use Program.cs as the

   primary editable file in the shared Monaco editor.

========================================================= */

const ASPNETCORE_PROBLEM_FILE_PATHS:

  Record<string, string> = {

    'aspnetcore-hello-api': 'Program.cs',

    'aspnetcore-routing': 'Program.cs',

    'aspnetcore-route-parameter': 'Program.cs',

    'aspnetcore-query-parameter': 'Program.cs',

    'aspnetcore-post-endpoint': 'Program.cs',

    'aspnetcore-model-binding': 'Program.cs',

    'aspnetcore-service': 'Program.cs',

    'aspnetcore-dependency-injection': 'Program.cs',

    'aspnetcore-validation': 'Program.cs',

    'aspnetcore-crud-api': 'Program.cs',

    'aspnetcore-middleware': 'Program.cs',

    'aspnetcore-product-api': 'Program.cs',

  };

/* =========================================================

   SPRING BOOT RUN TESTS

   These are execution tests used by the Run button.

   Submission hidden tests can remain in the submissions

   module. Keeping Run tests here ensures the framework

   runner receives at least one HTTP test instead of stopping

   after Maven compilation.

========================================================= */

type FrameworkHttpTest = {

  id?: string;

  method?: string;

  path?: string;

  expectedStatus?: number;

  expectedOutput?: string;

  body?: string;

  callable?: string;

};

const DJANGO_RUN_TESTS:

  Record<string, FrameworkHttpTest[]> = {

    'django-basic-view': [

      {

        id: 'test-1',

        callable: 'app.views.home',

        expectedStatus: 200,

        expectedOutput:

          'Welcome to Django',

      },

    ],

  };

const SPRINGBOOT_RUN_TESTS:

  Record<string, FrameworkHttpTest[]> = {

    'springboot-hello-controller': [

      {

        id: 'test-1',

        method: 'GET',

        path: '/hello',

        expectedStatus: 200,

        expectedOutput:

          'Hello, World!',

      },

    ],

  };

const ASPNETCORE_RUN_TESTS:

  Record<string, FrameworkHttpTest[]> = {

    'aspnetcore-hello-api': [

      {

        id: 'test-1',

        method: 'GET',

        path: '/hello',

        expectedStatus: 200,

        expectedOutput: 'Hello, World!',

      },

    ],

    'aspnetcore-routing': [

      {

        id: 'test-1',

        method: 'GET',

        path: '/api/status',

        expectedStatus: 200,

        expectedOutput: 'OK',

      },

    ],

    'aspnetcore-route-parameter': [

      {

        id: 'test-1',

        method: 'GET',

        path: '/hello/Asha',

        expectedStatus: 200,

        expectedOutput: 'Hello, Asha!',

      },

    ],

    'aspnetcore-query-parameter': [

      {

        id: 'test-1',

        method: 'GET',

        path: '/greet?name=Ravi',

        expectedStatus: 200,

        expectedOutput: 'Welcome, Ravi!',

      },

    ],

    'aspnetcore-service': [

      {

        id: 'test-1',

        method: 'GET',

        path: '/service',

        expectedStatus: 200,

        expectedOutput: 'Hello from Service!',

      },

    ],

    'aspnetcore-dependency-injection': [

      {

        id: 'test-1',

        method: 'GET',

        path: '/di',

        expectedStatus: 200,

        expectedOutput: 'Dependency Injection Works!',

      },

    ],

    'aspnetcore-middleware': [

      {

        id: 'test-1',

        method: 'GET',

        path: '/check',

        expectedStatus: 200,

        expectedOutput: 'Middleware Works!',

      },

    ],

  };

/* =========================================================
   AWS PRACTICE - PUBLIC RUN INPUT
   This is used only when the browser sends no input for AWS-001.
   Other languages and problems keep their original input handling.
   Hidden grading cases remain inside the judge, not this file.
========================================================= */
const AWS_REGION_SAMPLE_INPUT =
  'ap-south-1,us-east-1,eu-west-1\nap-south-1\n';

/* =========================================================
   AZURE PRACTICE - PUBLIC RUN INPUT
   Only used when Azure Validate Region receives no stdin.
   This does not affect AWS or other technology inputs.
========================================================= */
const AZURE_REGION_SAMPLE_INPUT =
  'centralindia,eastus,westeurope\ncentralindia\n';

/* =========================================================
   GOOGLE CLOUD PRACTICE - PUBLIC RUN INPUT
   Only used when GCP Validate Region receives no stdin.
   The learner's custom input is always preserved.
   GCP exercises reuse the existing Python Docker judge.
========================================================= */
const GCP_REGION_SAMPLE_INPUT =
  'asia-south1,us-central1,europe-west1\nasia-south1\n';

export type AzurePracticeGrade = {
  problemSlug: string;
  passed?: boolean;
  status: string;
  score?: number;
  passedTests?: number;
  totalTests?: number;
  message?: string;
  tests?: Array<{
    testNumber: number;
    name?: string;
    passed: boolean;
  }>;
};

export type AwsPracticeGrade = {
  problemSlug: string;
  passed?: boolean;
  status: string;
  score?: number;
  passedTests?: number;
  totalTests?: number;
  message?: string;
  tests?: Array<{
    testNumber: number;
    name?: string;
    passed: boolean;
  }>;
};

/* =========================================================

   SERVICE

========================================================= */

@Injectable()

export class ExecutionsService {

  /* =======================================================

     JUDGE URL

     Local:

     http://127.0.0.1:4100

     Production:

     Set JUDGE_URL in environment.

  ======================================================= */

  private readonly judgeUrl =

    process.env.JUDGE_URL ??

    'http://127.0.0.1:4100';

  /* =======================================================

     NORMALIZE LANGUAGE

  ======================================================= */

  private normalizeLanguage(

    language: string,

  ): string {

    const normalized =

      language

        .trim()

        .toLowerCase();

    /* Azure offline practice uses the existing Python judge. */
    if (normalized === 'azure' || normalized === 'azure-python') {
      return 'python';
    }

    /* Google Cloud offline practice uses the existing Python judge. */
    if (
      normalized === 'gcp' ||
      normalized === 'google-cloud' ||
      normalized === 'google-cloud-python' ||
      normalized === 'gcp-python'
    ) {
      return 'python';
    }

    /* AI & Machine Learning offline practice uses standard Python. */
    if (
      normalized === 'ai-ml' ||
      normalized === 'ai-ml-python' ||
      normalized === 'ai-ml-practice' ||
      normalized === 'artificial-intelligence-machine-learning'
    ) {
      return 'python';
    }

    /* Generative AI practice uses the standard Python coding judge. */
    if (
      normalized === 'generative-ai' ||
      normalized === 'generative-ai-python' ||
      normalized === 'genai' ||
      normalized === 'genai-python'
    ) {
      return 'python';
    }

    /* =====================================================

       C++ ALIASES

    ===================================================== */

    if (

      normalized === 'c++' ||

      normalized ===

        'cplusplus'

    ) {

      return 'cpp';

    }

    /* =====================================================

       JAVASCRIPT / NODE ALIASES

       All these values are sent

       to the Judge as:

       javascript

    ===================================================== */

    if (

      normalized === 'js' ||

      normalized ===

        'node' ||

      normalized ===

        'nodejs' ||

      normalized ===

        'node.js'

    ) {

      return 'javascript';

    }

    /* =====================================================

       TYPESCRIPT ALIASES

       All these values are sent

       to the Judge as:

       typescript

    ===================================================== */

    if (

      normalized === 'ts' ||

      normalized ===

        'typescript' ||

      normalized ===

        'type-script'

    ) {

      return 'typescript';

    }

    /* =====================================================

       PYTHON ALIASES

       All these values are sent

       to the Judge as:

       python

    ===================================================== */

    if (

      normalized === 'py' ||

      normalized ===

        'python3' ||

      normalized ===

        'python-3'

    ) {

      return 'python';

    }

    /* =====================================================

       PYTHON DATA ANALYTICS ALIASES

       Keep this separate from normal Python because the

       analytics Judge runtime also receives a dataset.

    ===================================================== */

    if (

      normalized === 'python-data-analytics' ||

      normalized === 'python-analytics' ||

      normalized === 'data-analytics-python'

    ) {

      return 'python-data-analytics';

    }

    /* =====================================================

       PYTHON MACHINE LEARNING ALIASES

       Keep this separate from normal Python so the Judge can

       select the Python Machine Learning Docker runtime.

    ===================================================== */

    if (

      normalized === 'python-machine-learning' ||

      normalized === 'python-ml' ||

      normalized === 'machine-learning-python' ||

      normalized === 'python-machinelearning'

    ) {

      return 'python-machine-learning';

    }

    /* =====================================================
       PYTHON SPARK / PYSPARK ALIASES
    ===================================================== */
    if (
      normalized === 'pyspark' ||
      normalized === 'python-spark' ||
      normalized === 'python-pyspark' ||
      normalized === 'spark-python'
    ) {
      return 'pyspark';
    }

    /* =====================================================

       JAVA ALIASES

       All these values are sent

       to the Judge as:

       java

    ===================================================== */

    if (

      normalized === 'java' ||

      normalized ===

        'jdk'

    ) {

      return 'java';

    }

    /* =====================================================

       C# ALIASES

       All these values are sent

       to the Judge as:

       csharp

    ===================================================== */

    if (

      normalized === 'csharp' ||

      normalized === 'c#' ||

      normalized === 'cs' ||

      normalized === 'c-sharp'

    ) {

      return 'csharp';

    }

    /* =====================================================

       PHP ALIASES

       All these values are sent

       to the Judge as:

       php

    ===================================================== */

    if (

      normalized === 'php' ||

      normalized === 'php8' ||

      normalized === 'php-8' ||

      normalized === 'php8.3'

    ) {

      return 'php';

    }

    if (

      normalized === 'ruby' ||

      normalized === 'rb' ||

      normalized === 'ruby3' ||

      normalized === 'ruby-3'

    ) {

      return 'ruby';

    }

    /* =====================================================

       SWIFT ALIASES

       All these values are sent

       to the Judge as:

       swift

    ===================================================== */

    if (

      normalized === 'swift' ||

      normalized === 'swift5' ||

      normalized === 'swift-5' ||

      normalized === 'swift6' ||

      normalized === 'swift-6'

    ) {

      return 'swift';

    }

    return normalized;

  }

  /* =======================================================

     NORMALIZE FRAMEWORK NAME

  ======================================================= */

  private normalizeFrameworkName(

    value:

      | string

      | null

      | undefined,

  ): string {

    return (

      value ??

      ''

    )

      .trim()

      .toLowerCase()

      .replace(

        /\s+/g,

        '',

      );

  }

  /* =======================================================

     CHECK SUPPORTED LANGUAGE

  ======================================================= */

  private isSupportedLanguage(

    language: string,

  ): language is SupportedLanguage {

    return (

      SUPPORTED_LANGUAGES as readonly string[]

    ).includes(

      language,

    );

  }

  /* =======================================================

     CHECK SUPPORTED FRAMEWORK

  ======================================================= */

  private isSupportedFrameworkRuntime(

    runtime: string,

  ): runtime is SupportedFrameworkRuntime {

    return (

      SUPPORTED_FRAMEWORK_RUNTIMES as readonly string[]

    ).includes(

      runtime,

    );

  }

  /* =======================================================

     RESOLVE FRAMEWORK RUNTIME

     Resolution order:

     1. context.technology

     2. context.module

     3. problem slug prefix

     This lets the same workspace work for:

     - Start Practicing

     - Targeted Stack

     - Challenges

  ======================================================= */

  private resolveFrameworkRuntime(

    body: ExecutionRequest,

  ):

    | SupportedFrameworkRuntime

    | null {

    const technology =

      this.normalizeFrameworkName(

        body.context

          ?.technology,

      );

    const moduleName =

      this.normalizeFrameworkName(

        body.context

          ?.module,

      );

    const problemSlug =

      body.problemSlug

        .trim()

        .toLowerCase();

    const candidates = [

      technology,

      moduleName,

    ];

    for (

      const candidate of

      candidates

    ) {

      /* ===================================================

         EXPRESS

      =================================================== */

      if (

        candidate ===

          'express' ||

        candidate ===

          'expressjs' ||

        candidate ===

          'express.js'

      ) {

        return 'express';

      }

      /* ===================================================

         REACT

      =================================================== */

      if (

        candidate ===

          'react' ||

        candidate ===

          'reactjs' ||

        candidate ===

          'react.js'

      ) {

        return 'react';

      }

      if (

        candidate ===

          'vue' ||

        candidate ===

          'vuejs' ||

        candidate ===

          'vue.js'

      ) {

        return 'vue';

      }

      /* ===================================================

         ANGULAR

      =================================================== */

      if (

        candidate ===

          'angular' ||

        candidate ===

          'angularjs'

      ) {

        return 'angular';

      }

      /* ===================================================

         NEXT.JS

      =================================================== */

      if (

        candidate ===

          'nextjs' ||

        candidate ===

          'next.js' ||

        candidate ===

          'next'

      ) {

        return 'nextjs';

      }

      /* ===================================================

         NESTJS

      =================================================== */

      if (

        candidate ===

          'nestjs' ||

        candidate ===

          'nest.js' ||

        candidate ===

          'nest'

      ) {

        return 'nestjs';

      }

      /* ===================================================

         DJANGO

      =================================================== */

      if (

        candidate ===

          'django'

      ) {

        return 'django';

      }

      /* ===================================================

         FASTAPI

      =================================================== */

      if (

        candidate === 'fastapi' ||

        candidate === 'fast-api' ||

        candidate === 'fast.api' ||

        candidate === 'fastapiframework'

      ) {

        return 'fastapi';

      }

      /* ===================================================

         SPRING BOOT

      =================================================== */

      if (

        candidate ===

          'springboot' ||

        candidate ===

          'spring-boot' ||

        candidate ===

          'spring' ||

        candidate ===

          'springbootframework'

      ) {

        return 'springboot';

      }

      /* ===================================================

         ASP.NET CORE

      =================================================== */

      if (

        candidate === 'aspnetcore' ||

        candidate === 'asp.netcore' ||

        candidate === 'asp.net-core' ||

        candidate === 'aspnet-core' ||

        candidate === 'dotnetweb'

      ) {

        return 'aspnetcore';

      }

    }

    /* =====================================================

       FALL BACK TO PROBLEM SLUG

       This is especially important when the workspace was

       opened directly and context.technology is absent.

    ===================================================== */

    if (

      problemSlug.startsWith(

        'express-',

      )

    ) {

      return 'express';

    }

    if (

      problemSlug.startsWith(

        'react-',

      )

    ) {

      return 'react';

    }

    if (

      problemSlug.startsWith(

        'vue-',

      )

    ) {

      return 'vue';

    }

    if (

      problemSlug.startsWith(

        'angular-',

      )

    ) {

      return 'angular';

    }

    if (

      problemSlug.startsWith(

        'nextjs-',

      )

    ) {

      return 'nextjs';

    }

    if (

      problemSlug.startsWith(

        'nestjs-',

      )

    ) {

      return 'nestjs';

    }

    if (

      problemSlug.startsWith(

        'django-',

      )

    ) {

      return 'django';

    }

    if (

      problemSlug.startsWith(

        'fastapi-',

      ) ||

      problemSlug.startsWith(

        'fast-api-',

      )

    ) {

      return 'fastapi';

    }

    if (

      problemSlug.startsWith(

        'springboot-',

      ) ||

      problemSlug.startsWith(

        'spring-boot-',

      )

    ) {

      return 'springboot';

    }

    if (

      problemSlug.startsWith(

        'aspnetcore-',

      ) ||

      problemSlug.startsWith(

        'aspnet-core-',

      )

    ) {

      return 'aspnetcore';

    }

    return null;

  }

  /* =======================================================

     GET FRAMEWORK FILE PATH

     The shared editor still holds one `code` value.

     This method maps that value to the file path expected by

     the appropriate framework runtime.

  ======================================================= */

  private getFrameworkFilePath(

    runtime:

      SupportedFrameworkRuntime,

    problemSlug:

      string,

  ): string {

    /* =====================================================

       NEXT.JS

       Next.js App Router file paths depend on the problem.

    ===================================================== */

    if (

      runtime ===

      'nextjs'

    ) {

      const filePath =

        NEXTJS_PROBLEM_FILE_PATHS[

          problemSlug

        ];

      if (

        !filePath

      ) {

        throw new BadRequestException(

          `No Next.js workspace file mapping exists for problem: ${problemSlug}.`,

        );

      }

      return filePath;

    }

    /* =====================================================

       NESTJS

       Prefer body.files for multi-file NestJS exercises.

       This mapping is the primary-file fallback for the

       shared single-editor payload.

    ===================================================== */

    if (

      runtime ===

      'nestjs'

    ) {

      const filePath =

        NESTJS_PROBLEM_FILE_PATHS[

          problemSlug

        ];

      if (

        !filePath

      ) {

        throw new BadRequestException(

          `No NestJS workspace file mapping exists for problem: ${problemSlug}.`,

        );

      }

      return filePath;

    }

    /* =====================================================

       FASTAPI

    ===================================================== */

    if (

      runtime === 'fastapi'

    ) {

      return (

        FASTAPI_PROBLEM_FILE_PATHS[problemSlug] ??

        'main.py'

      );

    }

    /* =====================================================

       DJANGO

       Django starter files differ by problem.

    ===================================================== */

    if (

      runtime ===

      'django'

    ) {

      const filePath =

        DJANGO_PROBLEM_FILE_PATHS[

          problemSlug

        ];

      if (

        !filePath

      ) {

        throw new BadRequestException(

          `No Django workspace file mapping exists for problem: ${problemSlug}.`,

        );

      }

      return filePath;

    }

    /* =====================================================

       SPRING BOOT

       Prefer body.files for future multi-file exercises.

       This mapping is the primary-file fallback for the

       shared single-editor payload.

    ===================================================== */

    if (

      runtime ===

      'springboot'

    ) {

      const filePath =

        SPRINGBOOT_PROBLEM_FILE_PATHS[

          problemSlug

        ];

      if (

        !filePath

      ) {

        throw new BadRequestException(

          `No Spring Boot workspace file mapping exists for problem: ${problemSlug}.`,

        );

      }

      return filePath;

    }

    /* =====================================================

       ASP.NET CORE

    ===================================================== */

    if (

      runtime ===

      'aspnetcore'

    ) {

      const filePath =

        ASPNETCORE_PROBLEM_FILE_PATHS[

          problemSlug

        ];

      if (

        !filePath

      ) {

        throw new BadRequestException(

          `No ASP.NET Core workspace file mapping exists for problem: ${problemSlug}.`,

        );

      }

      return filePath;

    }

    /* =====================================================

       EXPRESS

    ===================================================== */

    if (

      runtime ===

      'express'

    ) {

      return 'server.js';

    }

    /* =====================================================

       REACT

    ===================================================== */

    if (

      runtime ===

      'react'

    ) {

      return 'App.jsx';

    }

    if (

      runtime ===

      'vue'

    ) {

      return 'src/App.vue';

    }

    /* =====================================================

       ANGULAR

    ===================================================== */

    return 'app.component.ts';

  }

  /* =======================================================

     GET FRAMEWORK FILE LANGUAGE

  ======================================================= */

  private getFrameworkFileLanguage(

    runtime:

      SupportedFrameworkRuntime,

    language:

      string,

  ): string {

    if (

      runtime ===

        'nextjs' ||

      runtime ===

        'angular' ||

      runtime ===

        'nestjs'

    ) {

      return 'typescript';

    }

    if (

      runtime ===

        'react' ||

      runtime ===

        'vue' ||

      runtime ===

        'express'

    ) {

      return 'javascript';

    }

    if (

      runtime === 'django' ||

      runtime === 'fastapi'

    ) {

      return 'python';

    }

    if (

      runtime ===

        'springboot'

    ) {

      return 'java';

    }

    if (

      runtime ===

        'aspnetcore'

    ) {

      return 'csharp';

    }

    return language;

  }

  /* =======================================================

     BUILD FRAMEWORK FILES

     Prefer body.files when supplied.

     Otherwise convert the single Monaco `code` value into the

     framework file expected by the Judge.

  ======================================================= */

  private buildFrameworkFiles(

    body:

      ExecutionRequest,

    runtime:

      SupportedFrameworkRuntime,

    language:

      string,

  ) {

    if (

      Array.isArray(

        body.files,

      ) &&

      body.files.length >

        0

    ) {

      return body.files;

    }

    return [

      {

        path:

          this.getFrameworkFilePath(

            runtime,

            body.problemSlug,

          ),

        language:

          this.getFrameworkFileLanguage(

            runtime,

            language,

          ),

        content:

          body.code,

      },

    ];

  }

  /* =======================================================

     GET FRAMEWORK RUN TESTS

  ======================================================= */

  private getFrameworkRunTests(

    body: ExecutionRequest,

    runtime:

      SupportedFrameworkRuntime,

  ): FrameworkHttpTest[] {

    /*

     * If the caller explicitly supplied tests, preserve them.

     * This also keeps the execution endpoint ready for future

     * framework exercises that provide their own visible tests.

     */

    if (

      Array.isArray(body.tests) &&

      body.tests.length > 0

    ) {

      return body.tests;

    }

    /*

     * Spring Boot requires HTTP tests during Run. Without these,

     * springboot-runner.mjs intentionally returns only:

     *

     *   Build successful.

     *

     * Map each Spring Boot problem to its Run tests here.

     */

    if (

      runtime === 'django'

    ) {

      return (

        DJANGO_RUN_TESTS[

          body.problemSlug

        ] ?? []

      );

    }

    if (

      runtime === 'fastapi'

    ) {

      return (

        FASTAPI_RUN_TESTS[

          body.problemSlug

        ] ?? []

      );

    }

    if (

      runtime === 'springboot'

    ) {

      return (

        SPRINGBOOT_RUN_TESTS[

          body.problemSlug

        ] ?? []

      );

    }

    if (

      runtime === 'aspnetcore'

    ) {

      return (

        ASPNETCORE_RUN_TESTS[

          body.problemSlug

        ] ?? []

      );

    }

    return [];

  }

  /* =======================================================

     PARSE JUDGE RESPONSE

  ======================================================= */

  private async parseJudgeResponse(

    response:

      Response,

  ): Promise<JudgeResponse> {

    try {

      return (

        await response.json()

      ) as JudgeResponse;

    } catch {

      throw new BadGatewayException(

        'Invalid response received from code judge.',

      );

    }

  }

  /* =======================================================

     RUN NORMAL CODE

     Endpoint:

     POST /run

  ======================================================= */

  private async runCode({

    body,

    language,

  }: {

    body: ExecutionRequest;

    language: SupportedLanguage;

  }) {

    /* =====================================================

       PYTHON DATA ANALYTICS DATASET

    ===================================================== */

    const analyticsDataset =

      language === 'python-data-analytics'

        ? getPythonAnalyticsDataset(body.problemSlug)

        : undefined;

    if (

      language === 'python-data-analytics' &&

      !analyticsDataset

    ) {

      throw new BadRequestException(

        `No Python Data Analytics dataset is configured for problem: ${body.problemSlug}.`,

      );

    }

    /* =====================================================

       PYTHON MACHINE LEARNING DATASET

    ===================================================== */

    const machineLearningDataset =

      language === 'python-machine-learning'

        ? getPythonMachineLearningDataset(body.problemSlug)

        : undefined;

    if (

      language === 'python-machine-learning' &&

      !machineLearningDataset

    ) {

      throw new BadRequestException(

        `No Python Machine Learning dataset is configured for problem: ${body.problemSlug}.`,

      );

    }

    /* =====================================================

       SELECT DATASET

    ===================================================== */

    const executionDataset =

      language === 'python-data-analytics'

        ? analyticsDataset

        : language === 'python-machine-learning'

          ? machineLearningDataset

          : undefined;

    /* =====================================================

       BUILD JUDGE PAYLOAD

    ===================================================== */

    const judgePayload = executionDataset

      ? {

          language,

          code: body.code,

          input: body.input ?? '',

          dataset: executionDataset.content,

          datasetFileName: executionDataset.fileName,

        }

      : {

          language,

          code: body.code,

          input:
            body.problemSlug === 'gcp-validate-region' &&
            (!body.input || !body.input.trim())
              ? GCP_REGION_SAMPLE_INPUT
              : body.problemSlug === 'azure-validate-region' &&
            (!body.input || !body.input.trim())
              ? AZURE_REGION_SAMPLE_INPUT
              : body.problemSlug === 'aws-validate-region' &&
                  (!body.input || !body.input.trim())
                ? AWS_REGION_SAMPLE_INPUT
                : body.input ?? '',

        };

    /* =====================================================

       SEND TO JUDGE

    ===================================================== */

    const response = await fetch(`${this.judgeUrl}/run`, {

      method: 'POST',

      headers: {

        'Content-Type': 'application/json',

      },

      body: JSON.stringify(judgePayload),

    });

    /* =====================================================

       PARSE RESULT

    ===================================================== */

    const result = await this.parseJudgeResponse(response);

    if (!response.ok) {

      throw new BadGatewayException(

        result.message ??

          'Judge rejected the execution request.',

      );

    }

    /* =====================================================

       RETURN RESULT

    ===================================================== */

    return {

      problemSlug: body.problemSlug,

      language,

      workspaceType: body.workspaceType,

      context: body.context,

      status: result.status,

      output: result.output ?? '',

      stderr: result.stderr ?? '',

      exitCode: result.exitCode ?? null,

      message: result.message,

    };

  }

  /* =======================================================

     RUN FRAMEWORK

     Endpoint:

     POST /run/framework

     Current runtimes:

     - Express

     - React

     - Vue

     - Angular

     - Next.js

     - NestJS

     - Django

  ======================================================= */

  private async runFramework({

    body,

    language,

    runtime,

  }: {

    body:

      ExecutionRequest;

    language:

      SupportedLanguage;

    runtime:

      SupportedFrameworkRuntime;

  }) {

    const files =

      this.buildFrameworkFiles(

        body,

        runtime,

        language,

      );

    const tests =

      this.getFrameworkRunTests(

        body,

        runtime,

      );

    const response =

      await fetch(

        `${this.judgeUrl}/run/framework`,

        {

          method:

            'POST',

          headers: {

            'Content-Type':

              'application/json',

          },

          body:

            JSON.stringify({

              problemSlug:

                body.problemSlug,

              runtime,

              files,

              tests,

            }),

        },

      );

    const result =

      await this.parseJudgeResponse(

        response,

      );

    if (

      !response.ok

    ) {

      throw new BadGatewayException(

        result.message ??

          'Framework judge rejected the execution request.',

      );

    }

    const frameworkTests =

      Array.isArray(result.tests)

        ? result.tests

        : [];

    const shouldFormatFrameworkTests =

      (

        runtime === 'springboot' ||

        runtime === 'fastapi' ||

        runtime === 'aspnetcore' ||

        runtime === 'django'

      ) &&

      frameworkTests.length > 0;

    const frameworkOutput =

      shouldFormatFrameworkTests

        ? [

            result.output ||

              (

                runtime === 'django'

                  ? 'Django validation passed.'

                  : 'Build successful.'

              ),

            '',

            ...frameworkTests.flatMap(

              (

                test,

                index,

              ) => {

                const lines = [

                  `Test ${index + 1}: ${

                    test.passed

                      ? 'PASSED'

                      : 'FAILED'

                  }`,

                ];

                /*

                 * Spring Boot tests are HTTP endpoint tests, so

                 * show the request method and path.

                 *

                 * Django basic-view tests execute the configured

                 * callable directly. Do not invent an HTTP route

                 * such as GET / when the test does not contain one.

                 */

                if (

                  runtime === 'springboot' ||

                  runtime === 'fastapi' ||

                  runtime === 'aspnetcore'

                ) {

                  lines.push(

                    `${test.method ?? 'GET'} ${

                      test.path ?? '/'

                    }`,

                  );

                } else if (

                  test.method ||

                  test.path

                ) {

                  lines.push(

                    `${test.method ?? 'GET'} ${

                      test.path ?? '/'

                    }`,

                  );

                }

                lines.push(

                  `Expected Status: ${

                    test.expectedStatus ??

                    ''

                  }`,

                  `Actual Status: ${

                    test.actualStatus ??

                    ''

                  }`,

                  `Expected: ${

                    test.expectedOutput ??

                    ''

                  }`,

                  `Actual: ${

                    test.actualOutput ??

                    ''

                  }`,

                  '',

                );

                return lines;

              },

            ),

          ]

            .join('\n')

            .trim()

        : result.output ?? '';

    return {

      problemSlug:

        body.problemSlug,

      language,

      runtime,

      workspaceType:

        body.workspaceType,

      context:

        body.context,

      status:

        result.status,

      output:

        frameworkOutput,

      stderr:

        result.stderr ??

        '',

      exitCode:

        result.exitCode ??

        null,

      message:

        result.message,

      testsReceived:

        result.testsReceived,

      testsExecuted:

        result.testsExecuted,

      passedTests:

        result.passedTests,

      failedTests:

        result.failedTests,

      totalTests:

        result.totalTests,

      tests:

        result.tests,

    };

  }

  /* =======================================================
     AWS PRACTICE GRADING - SERVER-SIDE JUDGE

     Call from SubmissionsService for AWS-001 instead of the
     generic hidden-test lookup. The judge owns the test cases.
     This does not alter the existing public Run handler.
  ======================================================= */
  async gradeAwsPractice(
    problemSlug: string,
    code: string,
    mode: 'check' | 'submit' = 'submit',
  ): Promise<AwsPracticeGrade> {
    if (problemSlug !== 'aws-validate-region') {
      throw new BadRequestException(
        `AWS grading is not configured for problem: ${problemSlug}.`,
      );
    }

    if (typeof code !== 'string' || !code.trim()) {
      throw new BadRequestException('Code is required.');
    }

    let response: Response;
    try {
      response = await fetch(
        `${this.judgeUrl}/run/aws/${mode}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ problemSlug, code }),
        },
      );
    } catch {
      throw new BadGatewayException(
        'Unable to connect to the AWS Python judge.',
      );
    }

    let result: AwsPracticeGrade;
    try {
      result = (await response.json()) as AwsPracticeGrade;
    } catch {
      throw new BadGatewayException(
        'Invalid AWS grading response from the judge.',
      );
    }

    if (!response.ok) {
      throw new BadGatewayException(
        result.message ?? 'AWS grading request was rejected.',
      );
    }

    return result;
  }

  /* =======================================================
     AZURE PRACTICE GRADING - SERVER-SIDE JUDGE
     Azure hidden tests are maintained by the judge.
     SubmissionService can use this helper for Azure checks.
     The existing Run endpoint and other technologies are unchanged.
  ======================================================= */
  async gradeAzurePractice(
    problemSlug: string,
    code: string,
    mode: 'check' | 'submit' = 'submit',
  ): Promise<AzurePracticeGrade> {
    if (!problemSlug.startsWith('azure-')) {
      throw new BadRequestException(
        `Azure grading is not configured for problem: ${problemSlug}.`,
      );
    }

    if (typeof code !== 'string' || !code.trim()) {
      throw new BadRequestException('Code is required.');
    }

    let response: Response;
    try {
      response = await fetch(
        `${this.judgeUrl}/run/azure/${mode}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ problemSlug, code }),
        },
      );
    } catch {
      throw new BadGatewayException(
        'Unable to connect to the Azure Python judge.',
      );
    }

    let result: AzurePracticeGrade;
    try {
      result = (await response.json()) as AzurePracticeGrade;
    } catch {
      throw new BadGatewayException(
        'Invalid Azure grading response from the judge.',
      );
    }

    if (!response.ok) {
      throw new BadGatewayException(
        result.message ?? 'Azure grading request was rejected.',
      );
    }

    return result;
  }

  /* =======================================================

     RUN

  ======================================================= */

  async run(

    body:

      ExecutionRequest,

  ) {

    /* =====================================================

       VALIDATE PROBLEM SLUG

    ===================================================== */

    if (

      !body.problemSlug ||

      !body.problemSlug.trim()

    ) {

      throw new BadRequestException(

        'Problem slug is required.',

      );

    }

    /* =====================================================

       NORMALIZE PROBLEM SLUG

    ===================================================== */

    body.problemSlug =

      body.problemSlug

        .trim();

    /* =====================================================

       VALIDATE LANGUAGE

    ===================================================== */

    if (

      !body.language ||

      !body.language.trim()

    ) {

      throw new BadRequestException(

        'Language is required.',

      );

    }

    /* =====================================================

       VALIDATE WORKSPACE TYPE

    ===================================================== */

    if (

      !body.workspaceType ||

      !body.workspaceType.trim()

    ) {

      throw new BadRequestException(

        'Workspace type is required.',

      );

    }

    /* =====================================================

       VALIDATE CODE

       Even framework problems currently use the one shared

       Monaco editor, so `code` remains required.

       Future multi-file problems can send body.files and this

       validation can then be relaxed if required.

    ===================================================== */

    if (

      !body.code ||

      !body.code.trim()

    ) {

      throw new BadRequestException(

        'Code is required.',

      );

    }

    /* =====================================================

       NORMALIZE LANGUAGE

    ===================================================== */

    /* Keep general AI & ML practice separate from dataset-based ML labs. */
    const normalizedProblemSlug = body.problemSlug.toLowerCase();
    const language =
      normalizedProblemSlug.startsWith('ai-ml-') ||
      normalizedProblemSlug.startsWith('genai-') ||
      normalizedProblemSlug.startsWith('generative-ai-')
        ? 'python'
        : this.normalizeLanguage(body.language);

    /* =====================================================

       CHECK SUPPORTED LANGUAGE

       Next.js, Angular, and NestJS use TypeScript as their

       editor language, while React/Express use JavaScript.

       Django uses Python through the framework execution path.

       Python practice problems use the normal shared code

       execution path.

       Java practice problems also use the normal shared code

       execution path.

       Therefore language validation remains shared.

    ===================================================== */

    if (

      !this.isSupportedLanguage(

        language,

      )

    ) {

      throw new BadRequestException(

        `Unsupported language: ${body.language}. Supported languages are C, C++, C#, Java, JavaScript, TypeScript, Python, Python Data Analytics, Python Machine Learning, Python Spark (PySpark), PHP, Ruby and Swift.`,

      );

    }

    /* =====================================================

       NORMALIZE WORKSPACE TYPE

    ===================================================== */

    const workspaceType =

      body.workspaceType

        .trim()

        .toLowerCase();

    /* =====================================================

       RESOLVE FRAMEWORK RUNTIME

       A framework problem can be detected by either:

       - workspaceType === framework

       - a recognized framework problem slug/context

       This protects direct workspace URLs where some context

       query parameters may be missing.

    ===================================================== */

    const frameworkRuntime =

      this.resolveFrameworkRuntime(

        body,

      );

    const shouldUseFrameworkJudge =

      workspaceType ===

        'framework' ||

      frameworkRuntime !==

        null;

    /* =====================================================

       FRAMEWORK WORKSPACE WITHOUT KNOWN RUNTIME

    ===================================================== */

    if (

      shouldUseFrameworkJudge &&

      !frameworkRuntime

    ) {

      throw new BadRequestException(

        'Framework runtime could not be resolved for this problem.',

      );

    }

    /* =====================================================

       VERIFY FRAMEWORK SUPPORT

    ===================================================== */

    if (

      frameworkRuntime &&

      !this.isSupportedFrameworkRuntime(

        frameworkRuntime,

      )

    ) {

      throw new BadRequestException(

        `Unsupported framework runtime: ${frameworkRuntime}.`,

      );

    }

    /* =====================================================

       EXECUTION ROUTING

       NORMAL CODE:

       C / C++ / C# / Java / JavaScript / TypeScript / Python / Python Data Analytics / Python Machine Learning / PHP / Ruby / Swift

                 ↓

              POST /run

       FRAMEWORKS:

       Express / React / Vue / Angular / Next.js / NestJS / Django / FastAPI / Spring Boot / ASP.NET Core

                 ↓

          POST /run/framework

       Next.js example:

       nextjs-page-component

                 ↓

       app/page.tsx

                 ↓

       runtime = nextjs

                 ↓

       elab-judge-nextjs

                 ↓

       next build --webpack

       NestJS example:

       nestjs-basic-controller

                 ↓

       src/app.controller.ts

                 ↓

       runtime = nestjs

                 ↓

       elab-judge-nestjs

                 ↓

       TypeScript compilation

       Django example:

       django-basic-view

                 ↓

       app/views.py

                 ↓

       runtime = django

                 ↓

       POST /run/framework

                 ↓

       elab-judge-django

                 ↓

       Django system check

       Python example:

       python-hello-world

                 ↓

       language = python

                 ↓

       POST /run

                 ↓

       elab-judge-python

                 ↓

       python /workspace/main.py

       Java example:

       java-hello-world

                 ↓

       language = java

                 ↓

       POST /run

                 ↓

       elab-judge-java

                 ↓

       javac Main.java

                 ↓

       java Main

       PHP example:

       php-hello-world

                 ↓

       language = php

                 ↓

       POST /run

                 ↓

       elab-judge-php

                 ↓

       php /workspace/main.php

       Swift example:

       swift-hello-world

                ↓

       language = swift

                ↓

       POST /run

                ↓

       elab-judge-swift

                ↓

       swiftc /workspace/main.swift -o /workspace/main

                ↓

       /workspace/main

    ===================================================== */

    try {

      /* ===================================================

         FRAMEWORK EXECUTION

      =================================================== */

      if (

        frameworkRuntime

      ) {

        return await this.runFramework({

          body,

          language,

          runtime:

            frameworkRuntime,

        });

      }

      /* ===================================================

         NORMAL CODE EXECUTION

      =================================================== */

      return await this.runCode({

        body,

        language,

      });

    } catch (

      error

    ) {

      /* ===================================================

         PRESERVE KNOWN BAD GATEWAY ERRORS

      =================================================== */

      if (

        error instanceof

        BadGatewayException

      ) {

        throw error;

      }

      /* ===================================================

         PRESERVE VALIDATION ERRORS

         Do not turn a clear 400 error into a misleading

         "Unable to connect" 502 response.

      =================================================== */

      if (

        error instanceof

        BadRequestException

      ) {

        throw error;

      }

      /* ===================================================

         LOG ACTUAL SERVER ERROR

      =================================================== */

      console.error(

        'Execution service error:',

        error,

      );

      /* ===================================================

         FRIENDLY API RESPONSE

      =================================================== */

      throw new BadGatewayException(

        'Unable to connect to the code judge.',

      );

    }

  }

}
