import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { LearnerCatalogService } from '../learner/learner-catalog.service.js';

/* =========================================================

   TYPES

\========================================================= */

export type FrameworkSubmissionFile = {
  path: string;

  language: string;

  content: string;
};

export type FrameworkSubmissionRequest = {
  problemSlug: string;

  runtime: string;

  files: FrameworkSubmissionFile[];

  context?: {
    source?: string | null;

    technology?: string | null;

    domain?: string | null;

    stack?: string | null;

    module?: string | null;

    challenge?: string | null;

    attempt?: string | null;
  };
};

/* =========================================================

   FRAMEWORK JUDGE TEST RESULT
   EXPRESS:
   - statusCode
   - expectedStatus
   - body
   - expectedBody

   REACT / VUE / ANGULAR:
   - type
   - selector
   - value
   - expected
   - actual
   - absentText

\========================================================= */

type FrameworkJudgeTestResult = {
  testNumber?: number;
  passed?: boolean;
  type?: string;

  /* =======================================================
     EXPRESS
  ======================================================= */

  statusCode?: number;
  expectedStatus?: number;
  body?: unknown;
  expectedBody?: unknown;

  /* =======================================================
     REACT
  ======================================================= */

  selector?: string;
  value?: string;
  expected?: unknown;
  actual?: unknown;
  absentText?: string;

  /* =======================================================
     COMMON
  ======================================================= */
  message?: string;
};

/* =========================================================
   FRAMEWORK JUDGE RESPONSE
\========================================================= */

type FrameworkJudgeResponse = {
  problemSlug?: string;
  runtime?: string;
  status?: string;
  output?: string;
  stderr?: string;
  message?: string;
  passedTests?: number;
  totalTests?: number;
  testResults?: FrameworkJudgeTestResult[];
  /*
   * React Judge may generate these while running
   * the submitted component.
   */
  previewHtml?: string | null;
  previewError?: string | null;
  previewUrl?: string | null;
};

/* =========================================================
   SUPPORTED FRAMEWORKS
   Current:
   - Express
   - React
   - Angular
\========================================================= */

const SUPPORTED_RUNTIMES = ['express', 'react', 'vue', 'angular'] as const;
type SupportedFrameworkRuntime = (typeof SUPPORTED_RUNTIMES)[number];
/* =========================================================
   SERVICE
\========================================================= */

@Injectable()
export class FrameworkSubmissionsService {
  private readonly judgeUrl = process.env.JUDGE_URL ?? 'http\://127.0.0.1:4100';
  constructor(private readonly catalog: LearnerCatalogService) {}

  /* =======================================================

     NORMALIZE RUNTIME

  ======================================================= */

  private normalizeRuntime(runtime: string) {
    return String(runtime ?? '')
      .trim()
      .toLowerCase();
  }
  /* =======================================================
     VALIDATE FILE PATH
  ======================================================= */
  private validateFilePath(filePath: string) {
    if (typeof filePath !== 'string') {
      throw new BadRequestException('Framework file path is required.');
    }
    const normalized = filePath
      .replace(
        /\\/g,
        '/',
      )
      .trim();
    if (
      !normalized ||
      normalized.startsWith('/') ||
      normalized === '..' ||
      normalized.includes('../')
    ) {
      throw new BadRequestException(`Invalid framework file path: ${filePath}`);
    }
    return normalized;
  }

  /* =======================================================

     GET HIDDEN TESTS



     Express

       ↓

     express-test-cases.ts



     React

       ↓

     react-test-cases.ts



     Angular

       ↓

     angular-test-cases.ts

  ======================================================= */
  private async getHiddenTests(
    runtime: SupportedFrameworkRuntime,
    problemSlug: string,
    userId: string | null,
  ) {
    if (!SUPPORTED_RUNTIMES.includes(runtime)) return [];
    return this.catalog.frameworkTests<Record<string, unknown>>(
      userId,
      problemSlug,
    );
  }
  /* =======================================================

     FORMAT TEST RESULT

  ======================================================= */

  private formatResult(
    result: FrameworkJudgeTestResult,

    index: number,
  ) {
    return {
      testNumber: result.testNumber ?? index + 1,

      status: result.passed === true ? 'PASSED' : 'FAILED',

      passed: result.passed === true,

      /* ===================================================

         TEST TYPE

      =================================================== */

      type: result.type,

      /* ===================================================

         REACT / ANGULAR

      =================================================== */

      selector: result.selector,

      value: result.value,

      expected: result.expected,

      actual: result.actual,

      absentText: result.absentText,

      /* ===================================================

         EXPRESS

      =================================================== */

      statusCode: result.statusCode,

      expectedStatus: result.expectedStatus,

      body: result.body,

      expectedBody: result.expectedBody,

      /* ===================================================

         COMMON

      =================================================== */

      message: result.message,
    };
  }

  /* =======================================================

     SUBMIT



     POST:

     /api/v1/framework-submissions



     Supports:



     Express

     React

     Angular

  ======================================================= */

  async submit(body: FrameworkSubmissionRequest, userId: string | null = null) {
    /* =====================================================

       REQUEST

    ===================================================== */

    if (!body || typeof body !== 'object') {
      throw new BadRequestException(
        'Framework submission request is required.',
      );
    }

    /* =====================================================

       PROBLEM SLUG

    ===================================================== */

    if (
      !body.problemSlug ||
      typeof body.problemSlug !== 'string' ||
      !body.problemSlug.trim()
    ) {
      throw new BadRequestException('Problem slug is required.');
    }

    const problemSlug = body.problemSlug.trim();

    /* =====================================================

       RUNTIME

    ===================================================== */

    if (
      !body.runtime ||
      typeof body.runtime !== 'string' ||
      !body.runtime.trim()
    ) {
      throw new BadRequestException('Framework runtime is required.');
    }

    const normalizedRuntime = this.normalizeRuntime(body.runtime);

    if (
      !SUPPORTED_RUNTIMES.includes(
        normalizedRuntime as SupportedFrameworkRuntime,
      )
    ) {
      throw new BadRequestException(
        [
          `Unsupported framework runtime: ${body.runtime}.`,

          `Supported runtimes: ${SUPPORTED_RUNTIMES.join(', ')}.`,
        ].join(' '),
      );
    }

    const runtime = normalizedRuntime as SupportedFrameworkRuntime;

    /* =====================================================

       FILES

    ===================================================== */

    if (!Array.isArray(body.files) || body.files.length === 0) {
      throw new BadRequestException('At least one framework file is required.');
    }

    const files = body.files.map(
      (
        file,

        index,
      ) => {
        /* -----------------------------------------------

             FILE OBJECT

          ----------------------------------------------- */

        if (!file || typeof file !== 'object') {
          throw new BadRequestException(`Invalid file at index ${index}.`);
        }

        /* -----------------------------------------------

             PATH

          ----------------------------------------------- */

        if (typeof file.path !== 'string') {
          throw new BadRequestException(
            `File path is required at index ${index}.`,
          );
        }

        const filePath = this.validateFilePath(file.path);

        /* -----------------------------------------------

             LANGUAGE

          ----------------------------------------------- */

        if (typeof file.language !== 'string' || !file.language.trim()) {
          throw new BadRequestException(
            `File language is required at index ${index}.`,
          );
        }

        const language = file.language

          .trim()

          .toLowerCase();

        /* -----------------------------------------------

             CONTENT

          ----------------------------------------------- */

        if (typeof file.content !== 'string') {
          throw new BadRequestException(
            `File content is required at index ${index}.`,
          );
        }

        return {
          path: filePath,

          language,

          content: file.content,
        };
      },
    );

    /* =====================================================

       GET HIDDEN TESTS

    ===================================================== */

          const tests = await this.getHiddenTests(
        runtime,
        problemSlug,
        userId,
      );

    if (tests.length === 0) {
      throw new BadRequestException(
        `No framework hidden test cases configured for ${problemSlug}.`,
      );
    }

    /* =====================================================

       CALL JUDGE



       Express, React, Vue and Angular use:



       POST /run/framework

    ===================================================== */

    let response: Response;

    try {
      response = await fetch(
        `${this.judgeUrl}/run/framework`,

        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            problemSlug,

            runtime,

            files,

            /*

                 * Hidden tests only originate

                 * from the backend.

                 */

            tests,

            /*

                 * Context is useful for future

                 * analytics and observability.

                 */

            context: body.context,
          }),
        },
      );
    } catch (error) {
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

    let judgeResult: FrameworkJudgeResponse;

    try {
      judgeResult = (await response.json()) as FrameworkJudgeResponse;
    } catch (error) {
      console.error(
        'Unable to parse framework judge response:',

        error,
      );

      throw new BadGatewayException(
        'Invalid response received from framework judge.',
      );
    }

    /* =====================================================

       HTTP ERROR FROM JUDGE

    ===================================================== */

    if (!response.ok) {
      console.error(
        'Framework judge rejected submission:',

        {
          httpStatus: response.status,

          problemSlug,

          runtime,

          judgeStatus: judgeResult.status,

          message: judgeResult.message,
        },
      );

      throw new BadGatewayException(
        judgeResult.message ?? 'Framework judge rejected the submission.',
      );
    }

    /* =====================================================

       INVALID REQUEST

    ===================================================== */

    if (judgeResult.status === 'INVALID_REQUEST') {
      throw new BadGatewayException(
        judgeResult.message ??
          'Framework judge rejected the submission request.',
      );
    }

    /* =====================================================

       UNSUPPORTED RUNTIME

    ===================================================== */

    if (judgeResult.status === 'UNSUPPORTED_RUNTIME') {
      throw new BadGatewayException(
        judgeResult.message ??
          `Framework judge does not support runtime: ${runtime}.`,
      );
    }

    /* =====================================================

       INTERNAL ERROR

    ===================================================== */

    if (judgeResult.status === 'INTERNAL_ERROR') {
      throw new BadGatewayException(
        judgeResult.message ?? 'Internal framework judge error.',
      );
    }

    /* =====================================================

       TEST RESULTS

    ===================================================== */

    const results = Array.isArray(judgeResult.testResults)
      ? judgeResult.testResults
      : [];

    /* =====================================================

       TEST COUNTS

    ===================================================== */

    const passedTests =
      typeof judgeResult.passedTests === 'number'
        ? judgeResult.passedTests
        : results.filter((result) => result.passed === true).length;

    const totalTests =
      typeof judgeResult.totalTests === 'number'
        ? judgeResult.totalTests
        : tests.length;

    /* =====================================================

       SCORE

    ===================================================== */

    const score =
      totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;

    /* =====================================================

       NORMALIZE RESULT DETAILS

    ===================================================== */

    const normalizedResults = results.map(
      (
        result,

        index,
      ) =>
        this.formatResult(
          result,

          index,
        ),
    );

    /* =====================================================

       FATAL EXECUTION RESULTS



       These are valid Judge outcomes,

       not transport errors.

    ===================================================== */

    if (
      judgeResult.status === 'SERVER_START_ERROR' ||
      judgeResult.status === 'RUNTIME_ERROR' ||
      judgeResult.status === 'BUILD_ERROR' ||
      judgeResult.status === 'TIME_LIMIT_EXCEEDED' ||
      judgeResult.status === 'DATABASE_ERROR'
    ) {
      return {
        problemSlug,

        runtime,

        status: judgeResult.status,

        passedTests,

        totalTests,

        score,

        results: normalizedResults,

        output: judgeResult.output ?? '',

        stderr: judgeResult.stderr ?? '',

        message: judgeResult.message,

        context: body.context ?? null,
      };
    }

    /* =====================================================

       ACCEPTED CONDITION



       Must satisfy:



       Judge status = SUCCESS

       totalTests > 0

       every hidden test passed

    ===================================================== */

    const allTestsPassed =
      judgeResult.status === 'SUCCESS' &&
      totalTests > 0 &&
      passedTests === totalTests;

    /* =====================================================

       ACCEPTED

    ===================================================== */

    if (allTestsPassed) {
      return {
        problemSlug,

        runtime,

        status: 'ACCEPTED',

        passedTests,

        totalTests,

        score: 100,

        results: normalizedResults,

        output: judgeResult.output ?? '',

        stderr: judgeResult.stderr ?? '',

        message: judgeResult.message,

        context: body.context ?? null,
      };
    }

    /* =====================================================

       TEST FAILED

    ===================================================== */

    if (
      judgeResult.status === 'TEST_FAILED' ||
      judgeResult.status === 'TEST_FAILURE'
    ) {
      return {
        problemSlug,

        runtime,

        status: 'WRONG_ANSWER',

        passedTests,

        totalTests,

        score,

        results: normalizedResults,

        output: judgeResult.output ?? '',

        stderr: judgeResult.stderr ?? '',

        message: judgeResult.message,

        context: body.context ?? null,
      };
    }

    /* =====================================================

       FALLBACK



       Never accidentally mark unknown Judge

       statuses as accepted.

    ===================================================== */

    return {
      problemSlug,

      runtime,

      status: 'WRONG_ANSWER',

      passedTests,

      totalTests,

      score,

      results: normalizedResults,

      output: judgeResult.output ?? '',

      stderr: judgeResult.stderr ?? '',

      message:
        judgeResult.message ??
        `Framework judge returned status: ${judgeResult.status ?? 'UNKNOWN'}.`,

      context: body.context ?? null,
    };
  }
}
