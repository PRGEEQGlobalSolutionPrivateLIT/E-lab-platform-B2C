import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
/* =========================================================
   TYPES
\========================================================= */
export type FrameworkRuntime =
  | 'express'
  | 'react'
  | 'vue'
  | 'angular'
  | 'mongodb'
  | 'mern';
export type FrameworkExecutionFile = {
  path: string;
  language: string;
  content: string;
};
export type FrameworkExecutionContext = {
  source?: string | null;
  technology?: string | null;
  domain?: string | null;
  stack?: string | null;
  module?: string | null;
  challenge?: string | null;
  attempt?: string | null;
};
export type FrameworkExecutionRequest = {
  problemSlug: string;
  runtime:
    | FrameworkRuntime
    | string;
  files:
    FrameworkExecutionFile[];
  context?:
    FrameworkExecutionContext;
};
/* =========================================================
   JUDGE TEST RESULT
   Shared for:
   - Express
   - React
   - Vue
   - Angular
\========================================================= */
export type FrameworkJudgeTestResult = {
  testNumber?: number;
  type?: string;
  passed?: boolean;
  /* =======================================================
     REACT
  ======================================================= */
  selector?: string;
  expected?: unknown;
  actual?: unknown;
  /* =======================================================
     EXPRESS
  ======================================================= */
  statusCode?: number;
  expectedStatus?: number;
  body?: unknown;
  expectedBody?: unknown;
  /* =======================================================
     COMMON
  ======================================================= */
  message?: string;
};
/* =========================================================
   JUDGE RESPONSE
   React Judge can additionally return:
   previewHtml:
     Complete standalone HTML document containing the
     compiled browser version of the learner React app.
   previewError:
     Preview compilation error, if tests still ran but
     browser-preview generation failed.
   previewUrl:
     Kept for future compatibility. Currently the
     frontend creates its own local preview URL.
\========================================================= */
export type FrameworkJudgeResponse = {
  problemSlug?: string;
  runtime?: string;
  status:
    | 'SUCCESS'
    | 'BUILD_ERROR'
    | 'RUNTIME_ERROR'
    | 'SERVER_START_ERROR'
    | 'TIME_LIMIT_EXCEEDED'
    | 'TEST_FAILED'
    | 'DATABASE_ERROR'
    | 'UNSUPPORTED_RUNTIME'
    | 'INVALID_REQUEST'
    | 'INTERNAL_ERROR';
  output?: string;
  stderr?: string;
  message?: string;
  passedTests?: number;
  totalTests?: number;
  testResults?:
    FrameworkJudgeTestResult[];
  /* =======================================================
     REACT WEB PREVIEW
  ======================================================= */
  previewHtml?:
    string | null;
  previewError?:
    string | null;
  previewUrl?:
    string | null;
};
/* =========================================================
   CURRENTLY SUPPORTED FRAMEWORK RUNTIMES
   Enabled:
   - Express
   - React
   - Vue
   - Angular
   Later:
   - MongoDB
   - MERN
\========================================================= */
const SUPPORTED_RUNTIMES = [
  'express',
  'react',
  'vue',
  'angular',
] as const;
type SupportedFrameworkRuntime =
  (typeof SUPPORTED_RUNTIMES)[number];
/* =========================================================
   SERVICE
\========================================================= */
@Injectable()
export class FrameworkExecutionsService {
  private readonly judgeUrl =
    process.env.JUDGE_URL ??
    'http://127.0.0.1:4100';
  /* =======================================================
     NORMALIZE RUNTIME
  ======================================================= */
  private normalizeRuntime(
    runtime: string,
  ) {
    return String(
      runtime ??
        '',
    )
      .trim()
      .toLowerCase();
  }
  /* =======================================================
     VALIDATE FILE PATH
  ======================================================= */
  private validateFilePath(
    filePath: string,
  ) {
    if (
      typeof filePath !==
      'string'
    ) {
      throw new BadRequestException(
        'Framework file path is required.',
      );
    }
    const normalized =
      filePath
        .replace(
          /\\/g,
          '/',
        )
        .trim();
    if (
      !normalized
    ) {
      throw new BadRequestException(
        'Framework file path is required.',
      );
    }
    /*
     * Framework files must remain relative
     * to the isolated learner workspace.
     */
    if (
      normalized.startsWith(
        '/',
      ) ||
      normalized ===
        '..' ||
      normalized.includes(
        '../',
      )
    ) {
      throw new BadRequestException(
        `Invalid framework file path: ${filePath}`,
      );
    }
    return normalized;
  }
  /* =======================================================
     VALIDATE REQUEST
  ======================================================= */
  private validateRequest(
    body:
      FrameworkExecutionRequest,
  ) {
    /* =====================================================
       REQUEST OBJECT
    ===================================================== */
    if (
      !body ||
      typeof body !==
        'object'
    ) {
      throw new BadRequestException(
        'Framework execution request is required.',
      );
    }
    /* =====================================================
       PROBLEM SLUG
    ===================================================== */
    if (
      !body.problemSlug ||
      typeof body.problemSlug !==
        'string' ||
      !body.problemSlug.trim()
    ) {
      throw new BadRequestException(
        'Problem slug is required.',
      );
    }
    /* =====================================================
       RUNTIME
    ===================================================== */
    if (
      !body.runtime ||
      typeof body.runtime !==
        'string' ||
      !body.runtime.trim()
    ) {
      throw new BadRequestException(
        'Framework runtime is required.',
      );
    }
    const runtime =
      this.normalizeRuntime(
        body.runtime,
      );
    /* =====================================================
       SUPPORTED RUNTIME
       Current:
       - express
       - react
       - vue
       - angular
    ===================================================== */
    if (
      !SUPPORTED_RUNTIMES.includes(
        runtime as
          SupportedFrameworkRuntime,
      )
    ) {
      throw new BadRequestException(
        [
          `Unsupported framework runtime: ${body.runtime}.`,
          `Supported runtimes: ${SUPPORTED_RUNTIMES.join(', ')}.`,
        ].join(
          ' ',
        ),
      );
    }
    /* =====================================================
       FILES
    ===================================================== */
    if (
      !Array.isArray(
        body.files,
      ) ||
      body.files.length ===
        0
    ) {
      throw new BadRequestException(
        'At least one framework file is required.',
      );
    }
    /* =====================================================
       VALIDATE EVERY FILE
    ===================================================== */
    const files =
      body.files.map(
        (
          file,
          index,
        ) => {
          /* -----------------------------------------------
             FILE OBJECT
          ----------------------------------------------- */
          if (
            !file ||
            typeof file !==
              'object'
          ) {
            throw new BadRequestException(
              `Invalid file at index ${index}.`,
            );
          }
          /* -----------------------------------------------
             PATH
          ----------------------------------------------- */
          const filePath =
            this.validateFilePath(
              file.path,
            );
          /* -----------------------------------------------
             LANGUAGE
          ----------------------------------------------- */
          if (
            !file.language ||
            typeof file.language !==
              'string' ||
            !file.language.trim()
          ) {
            throw new BadRequestException(
              `Language is required for file at index ${index}.`,
            );
          }
          const language =
            file.language
              .trim()
              .toLowerCase();
          /* -----------------------------------------------
             CONTENT
          ----------------------------------------------- */
          if (
            typeof file.content !==
              'string'
          ) {
            throw new BadRequestException(
              `Content is required for file at index ${index}.`,
            );
          }
          return {
            path:
              filePath,
            language,
            content:
              file.content,
          };
        },
      );
    /* =====================================================
       NORMALIZED REQUEST
    ===================================================== */
    return {
      problemSlug:
        body.problemSlug
          .trim(),
      runtime:
        runtime as
          SupportedFrameworkRuntime,
      files,
      context:
        body.context ??
        undefined,
    };
  }
  /* =======================================================
     RUN FRAMEWORK
     Shared endpoint for:
     Express
     React
     Vue
     Angular
     POST Judge:
       /run/framework
  ======================================================= */
  async run(
    body:
      FrameworkExecutionRequest,
  ) {
    /* =====================================================
       VALIDATE + NORMALIZE
    ===================================================== */
    const request =
      this.validateRequest(
        body,
      );
    /* =====================================================
       CALL JUDGE
    ===================================================== */
    let response:
      Response;
    try {
      response =
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
                  request.problemSlug,
                runtime:
                  request.runtime,
                files:
                  request.files,
                /*
                 * Context is useful for observability
                 * and future stack-specific execution.
                 *
                 * The Judge can ignore it when unused.
                 */
                context:
                  request.context,
              }),
          },
        );
    } catch (
      error
    ) {
      console.error(
        'Unable to connect to framework judge:',
        error,
      );
      throw new BadGatewayException(
        'Unable to connect to the framework judge.',
      );
    }
    /* =====================================================
       PARSE JUDGE RESPONSE
    ===================================================== */
    let judgeResult:
      FrameworkJudgeResponse;
    try {
      judgeResult =
        (await response.json()) as
          FrameworkJudgeResponse;
    } catch (
      error
    ) {
      console.error(
        'Unable to parse framework judge response:',
        error,
      );
      throw new BadGatewayException(
        'Invalid response received from framework judge.',
      );
    }
    /* =====================================================
       HANDLE JUDGE HTTP ERROR
    ===================================================== */
    if (
      !response.ok
    ) {
      console.error(
        'Framework judge rejected request:',
        {
          httpStatus:
            response.status,
          problemSlug:
            request.problemSlug,
          runtime:
            request.runtime,
          judgeStatus:
            judgeResult.status,
          message:
            judgeResult.message,
        },
      );
      throw new BadGatewayException(
        judgeResult.message ??
          'Framework judge rejected the execution request.',
      );
    }
    /* =====================================================
       HANDLE UNSUPPORTED RUNTIME
    ===================================================== */
    if (
      judgeResult.status ===
      'UNSUPPORTED_RUNTIME'
    ) {
      throw new BadGatewayException(
        judgeResult.message ??
          `Judge does not support runtime: ${request.runtime}`,
      );
    }
    /* =====================================================
       HANDLE INVALID JUDGE REQUEST
    ===================================================== */
    if (
      judgeResult.status ===
      'INVALID_REQUEST'
    ) {
      throw new BadGatewayException(
        judgeResult.message ??
          'Framework judge rejected the request.',
      );
    }
    /* =====================================================
       HANDLE INTERNAL JUDGE ERROR
    ===================================================== */
    if (
      judgeResult.status ===
      'INTERNAL_ERROR'
    ) {
      throw new BadGatewayException(
        judgeResult.message ??
          'Internal framework judge error.',
      );
    }
    /* =====================================================
       NORMALIZE TEST RESULTS
    ===================================================== */
    const testResults =
      Array.isArray(
        judgeResult.testResults,
      )
        ? judgeResult.testResults
        : [];
    /* =====================================================
       NORMALIZE TEST COUNTS
       Express may omit these for some public tests.
       React, Vue and Angular return:
       passedTests
       totalTests
    ===================================================== */
    const passedTests =
      typeof judgeResult.passedTests ===
        'number'
        ? judgeResult.passedTests
        : testResults.filter(
            (
              result,
            ) =>
              result?.passed ===
              true,
          ).length;
    const totalTests =
      typeof judgeResult.totalTests ===
        'number'
        ? judgeResult.totalTests
        : testResults.length;
    /* =====================================================
       NORMALIZE PREVIEW
       React:
       Judge
          ↓
       previewHtml
          ↓
       Nest API
          ↓
       page.tsx
          ↓
       localStorage
          ↓
       /preview/react/[previewId]
       Express and Angular do not currently generate previewHtml.
    ===================================================== */
    const previewHtml =
      request.runtime ===
        'react' &&
      typeof judgeResult.previewHtml ===
        'string' &&
      judgeResult.previewHtml.trim()
        ? judgeResult.previewHtml
        : null;
    const previewError =
      request.runtime ===
        'react' &&
      typeof judgeResult.previewError ===
        'string' &&
      judgeResult.previewError.trim()
        ? judgeResult.previewError
        : null;
    /* =====================================================
       OPTIONAL PREVIEW DIAGNOSTICS
       Do not log previewHtml itself because it contains
       the learner's compiled application and can be large.
    ===================================================== */
    if (
      request.runtime ===
      'react'
    ) {
      console.log(
        'React framework execution:',
        {
          problemSlug:
            request.problemSlug,
          status:
            judgeResult.status,
          passedTests,
          totalTests,
          previewGenerated:
            Boolean(
              previewHtml,
            ),
          previewSize:
            previewHtml
              ? previewHtml.length
              : 0,
          previewError,
        },
      );
    }
    /* =====================================================
       RETURN RESULT
       Important:
       TEST_FAILED
       BUILD_ERROR
       RUNTIME_ERROR
       SERVER_START_ERROR
       TIME_LIMIT_EXCEEDED
       are execution results, not HTTP transport failures.
       They are therefore returned to the frontend so
       the learner can see the appropriate result.
       React additionally receives previewHtml.
    ===================================================== */
    return {
      problemSlug:
        request.problemSlug,
      runtime:
        request.runtime,
      status:
        judgeResult.status,
      output:
        judgeResult.output ??
        '',
      stderr:
        judgeResult.stderr ??
        '',
      message:
        judgeResult.message,
      passedTests,
      totalTests,
      testResults,
      /* ===================================================
         REACT WEB PREVIEW
         The frontend uses previewHtml to create its own URL:
         localhost:3000/preview/react/<previewId>
      =================================================== */
      previewHtml,
      previewError,
      /*
       * Keep this for compatibility if a later runtime
       * directly supplies a preview URL.
       */
      previewUrl:
        judgeResult.previewUrl ??
        null,
      context:
        request.context ??
        null,
    };
  }
}
