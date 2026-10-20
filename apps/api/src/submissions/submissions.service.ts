import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import type { OnModuleInit } from '@nestjs/common';
import {
  JudgeGateway,
  type RunRecord,
} from '../judge/judge-gateway.service.js';
import {
  DB_JUDGED_LANGUAGES,
  LearnerCatalogService,
} from '../learner/learner-catalog.service.js';
import { getCTestCases } from './c-test-cases.js';
import { getCppTestCases } from './cpp-test-cases.js';
import { getJavaScriptTestCases } from './javascript-test-cases.js';
import { getNodeJsTestCases } from './nodejs-test-cases.js';
import { getTypeScriptTestCases } from './typescript-test-cases.js';
import { getPythonTestCases } from './python-test-cases.js';
/* AWS offline Python submission cases */
import { getAwsTestCases } from './aws-test-cases.js';
/* Microsoft Azure offline Python submission cases */
import { getAzureTestCases } from './azure-test-cases.js';
/* Google Cloud offline Python submission cases */
import { getGcpTestCases } from './gcp-test-cases.js';
import { getPythonSparkTestCases } from './python-spark-test-cases.js';
import { getPythonMachineLearningTestCases } from './python-machine-learning-test-cases.js';
import { getPythonMachineLearningDataset } from '../ai-ml/python-machine-learning-datasets.js';
import { getJavaTestCases } from './java-test-cases.js';
import {
  getCSharpTestCases,
  type CSharpHiddenTestCase,
} from './csharp-test-cases.js';
import { getPhpTestCases } from './php-test-cases.js';
import { getRubyTestCases } from './ruby-test-cases.js';
import { getSwiftTestCases } from './swift-test-cases.js';
import {
  getNextJsTestCases,
  type NextJsHiddenTestCase,
} from './nextjs-test-cases.js';
import {
  getNestJsTestCases,
  type NestJsHiddenTestCase,
} from './nestjs-test-cases.js';
import {
  getDjangoTestCases,
  type DjangoHiddenTestCase,
} from './django-test-cases.js';
import {
  getSpringBootTestCases,
  type SpringBootHiddenTestCase,
} from './springboot-test-cases.js';
import {
  getAspNetCoreTestCases,
  type AspNetCoreHiddenTestCase,
} from './aspnetcore-test-cases.js';
import { getFastApiTestCases } from './fastapi-test-cases.js';
import { getAiMlTestCases } from './ai-ml-test-cases.js';
/* Generative AI offline Python submission cases */
import { getGenerativeAiTestCases } from './generative-ai-test-cases.js';
/* =========================================================
   TYPES
========================================================= */

export type SubmissionRequest = {
  problemSlug: string;

  language: string;

  code: string;

  files?: Array<{
    path: string;

    language: string;

    content: string;
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

type SourceCheck = {
  pattern: RegExp;

  message: string;
};

type HiddenTestCase = {
  input: string;

  expectedOutput: string;

  requiredSourceChecks?: SourceCheck[];

  forbiddenSourceChecks?: SourceCheck[];
};

type JudgeResponse = {
  language?: string;

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
};

type FrameworkSubmissionFile = {
  path: string;

  language: string;

  content: string;
};

type NextJsValidationResult = {
  passed: boolean;

  message?: string;
};

type NestJsValidationResult = {
  passed: boolean;

  message?: string;
};

type DjangoValidationResult = {
  passed: boolean;

  message?: string;
};

type SpringBootJudgeTestResult = {
  testNumber?: number;
  passed: boolean;
  status?: string;
  output?: string;
  expectedOutput?: string;
  stderr?: string;
  message?: string;
};

type SpringBootJudgeResponse = JudgeResponse & {
  passedTests?: number;
  failedTests?: number;
  totalTests?: number;
  score?: number;
  results?: SpringBootJudgeTestResult[];
};

type AspNetCoreJudgeResponse = SpringBootJudgeResponse;

/* =========================================================
   SUPPORTED SUBMISSION LANGUAGES
========================================================= */

/*
 * Node.js problems still use:
 *
 * language = javascript
 *
 * Therefore "nodejs" is NOT added here.
 *
 * TypeScript problems use:
 *
 * language = typescript
 *
 * Python problems use:
 *
 * language = python
 *
 * Java problems use:
 *
 * language = java
 *
 * Swift problems use:
 *
 * language = swift
 */

const SUPPORTED_LANGUAGES = [
  'c',
  'cpp',
  'javascript',
  'typescript',
  'python',
  'python-machine-learning',
  'pyspark',
  'java',
  'csharp',
  'php',
  'ruby',
  'swift',
] as const;

/* =========================================================
   SERVICE
========================================================= */

@Injectable()
export class SubmissionsService implements OnModuleInit {
  private readonly judgeUrl = process.env.JUDGE_URL ?? 'http://127.0.0.1:4100';

  /* =======================================================
     NORMALIZE LANGUAGE
  ======================================================= */

  private normalizeLanguage(language: string) {
    const normalized = language.trim().toLowerCase();

    /*
     * C++
     */

    if (normalized === 'c++' || normalized === 'cplusplus') {
      return 'cpp';
    }

    /*
     * JavaScript / Node.js
     *
     * Node.js executes JavaScript,
     * so all of these normalize
     * to javascript.
     */

    if (
      normalized === 'js' ||
      normalized === 'node' ||
      normalized === 'nodejs' ||
      normalized === 'node.js'
    ) {
      return 'javascript';
    }

    /*
     * TypeScript
     */

    if (
      normalized === 'ts' ||
      normalized === 'typescript' ||
      normalized === 'type-script'
    ) {
      return 'typescript';
    }

    /*
     * AI & ML general practice uses standard Python.
     * Dataset-based Python Machine Learning remains separate.
     */

    if (
      normalized === 'ai-ml' ||
      normalized === 'ai-ml-python' ||
      normalized === 'ai-machine-learning' ||
      normalized === 'artificial-intelligence-machine-learning'
    ) {
      return 'python';
    }

    /*
     * Generative AI practice uses the existing Python judge.
     */

    if (
      normalized === 'generative-ai' ||
      normalized === 'genai' ||
      normalized === 'gen-ai' ||
      normalized === 'generative-ai-python' ||
      normalized === 'genai-python'
    ) {
      return 'python';
    }

    /*
     * Python Machine Learning
     */

    if (
      normalized === 'python-machine-learning' ||
      normalized === 'python machine learning' ||
      normalized === 'python_machine_learning' ||
      normalized === 'python-ml' ||
      normalized === 'python ml' ||
      normalized === 'python_ml' ||
      normalized === 'pythonml' ||
      normalized === 'pml' ||
      normalized === 'ml-python'
    ) {
      return 'python-machine-learning';
    }

    /*
     * Python Spark / PySpark
     */

    if (
      normalized === 'pyspark' ||
      normalized === 'python-spark' ||
      normalized === 'python spark' ||
      normalized === 'python_spark' ||
      normalized === 'python-pyspark' ||
      normalized === 'spark-python'
    ) {
      return 'pyspark';
    }

    /*
     * Python
     */

    if (
      normalized === 'py' ||
      normalized === 'python3' ||
      normalized === 'python-3'
    ) {
      return 'python';
    }

    /*
     * Java
     */

    if (normalized === 'java' || normalized === 'jdk') {
      return 'java';
    }

    /*
     * C#
     */

    if (
      normalized === 'csharp' ||
      normalized === 'c#' ||
      normalized === 'cs' ||
      normalized === 'c-sharp'
    ) {
      return 'csharp';
    }

    /*
     * PHP
     */

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

    /*
     * Swift
     */

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
     NORMALIZE OUTPUT

     Avoid failure only because of:
     \n
     \r\n
     trailing spaces/newlines
  ======================================================= */

  private normalizeOutput(value: string) {
    return value.replace(/\r\n/g, '\n').trim();
  }

  /* =======================================================
     TEST SOURCE PATTERN

     RegExp instances are reused from the server-side
     test-case definitions. Reset lastIndex before matching
     so global/sticky expressions cannot affect later tests.
  ======================================================= */

  private matchesSourcePattern(pattern: RegExp, code: string) {
    pattern.lastIndex = 0;

    return pattern.test(code);
  }

  /* =======================================================
     VALIDATE TYPESCRIPT SOURCE REQUIREMENTS

     TypeScript practice problems test both:
     1. Compiled/runtime behaviour.
     2. Required TypeScript language constructs.

     For C / C++ / JavaScript / Node.js the arrays below are
     undefined, so this returns null without changing their
     existing submission behaviour.
  ======================================================= */

  private validateSourceRequirements(
    code: string,
    testCase: HiddenTestCase,
  ): string | null {
    const requiredChecks = testCase.requiredSourceChecks ?? [];

    for (const check of requiredChecks) {
      if (!this.matchesSourcePattern(check.pattern, code)) {
        return check.message;
      }
    }

    const forbiddenChecks = testCase.forbiddenSourceChecks ?? [];

    for (const check of forbiddenChecks) {
      if (this.matchesSourcePattern(check.pattern, code)) {
        return check.message;
      }
    }

    return null;
  }

  /* =======================================================
     NORMALIZE FRAMEWORK FILE PATH
  ======================================================= */

  private normalizeFrameworkFilePath(filePath: string) {
    return filePath.replace(/\\/g, '/').replace(/^\/+/, '').trim();
  }

  /* =======================================================
     NEXT.JS PRIMARY FILE

     Current learner workspace submits one Monaco value through:

     body.code

     The Next.js problem bank uses one learner-editable file per
     problem. Hidden test metadata already contains that file path.

     body.files is also supported so this service is ready for
     future multi-file Next.js problems without changing the API
     contract again.
  ======================================================= */

  private getNextJsSubmissionFiles(
    body: SubmissionRequest,
    testCases: NextJsHiddenTestCase[],
  ): FrameworkSubmissionFile[] {
    if (Array.isArray(body.files) && body.files.length > 0) {
      return body.files.map((file) => ({
        path: this.normalizeFrameworkFilePath(file.path),

        language: file.language,

        content: file.content,
      }));
    }

    const primaryFilePath = testCases
      .flatMap((testCase) => testCase.requiredFiles ?? [])
      .map((filePath) => this.normalizeFrameworkFilePath(filePath))
      .find((filePath) => Boolean(filePath));

    if (!primaryFilePath) {
      throw new BadRequestException(
        `No Next.js learner file is configured for ${body.problemSlug}.`,
      );
    }

    return [
      {
        path: primaryFilePath,

        language: 'typescript',

        content: body.code,
      },
    ];
  }

  /* =======================================================
     GET NEXT.JS FILE CONTENT
  ======================================================= */

  private getNextJsFileContent(
    files: FrameworkSubmissionFile[],
    filePath: string,
  ): string | null {
    const normalizedPath = this.normalizeFrameworkFilePath(filePath);

    const file = files.find(
      (item) => this.normalizeFrameworkFilePath(item.path) === normalizedPath,
    );

    return file?.content ?? null;
  }

  /* =======================================================
     MATCH NEXT.JS SERIALIZED PATTERN

     Next.js hidden tests store regular expressions as:

     pattern: string
     flags: string

     This keeps hidden checks JSON-serializable if they later need
     to move fully into the Judge process.
  ======================================================= */

  private matchesNextJsPattern(
    pattern: string,
    flags: string | undefined,
    code: string,
  ) {
    const expression = new RegExp(pattern, flags ?? 'm');

    expression.lastIndex = 0;

    return expression.test(code);
  }

  /* =======================================================
     VALIDATE ONE NEXT.JS HIDDEN TEST
  ======================================================= */

  private validateNextJsHiddenTest(
    files: FrameworkSubmissionFile[],
    testCase: NextJsHiddenTestCase,
  ): NextJsValidationResult {
    const requiredFiles = testCase.requiredFiles ?? [];

    for (const filePath of requiredFiles) {
      const content = this.getNextJsFileContent(files, filePath);

      if (content === null) {
        return {
          passed: false,

          message: `Required file is missing: ${filePath}`,
        };
      }
    }

    const requiredChecks = testCase.requiredSourceChecks ?? [];

    for (const check of requiredChecks) {
      const content = this.getNextJsFileContent(files, check.filePath);

      if (content === null) {
        return {
          passed: false,

          message: `Required file is missing: ${check.filePath}`,
        };
      }

      if (!this.matchesNextJsPattern(check.pattern, check.flags, content)) {
        return {
          passed: false,

          message: check.message,
        };
      }
    }

    const forbiddenChecks = testCase.forbiddenSourceChecks ?? [];

    for (const check of forbiddenChecks) {
      const content = this.getNextJsFileContent(files, check.filePath);

      if (content === null) {
        return {
          passed: false,

          message: `Required file is missing: ${check.filePath}`,
        };
      }

      if (this.matchesNextJsPattern(check.pattern, check.flags, content)) {
        return {
          passed: false,

          message: check.message,
        };
      }
    }

    return {
      passed: true,
    };
  }

  /* =======================================================
     NEXT.JS SUBMIT

     Next.js is a framework problem, not a normal stdin/stdout
     TypeScript problem.

     Flow:

     1. Resolve server-side hidden tests.
     2. Resolve the learner framework file(s).
     3. Send the project to POST /run/framework.
     4. Require a successful Next.js production build.
     5. Evaluate all hidden source/structure checks server-side.
     6. Return the same submission result shape used by the
        existing language submission flow.

     Hidden test definitions never go to the learner browser.
  ======================================================= */

  private async submitNextJs(body: SubmissionRequest, language: string) {
    /* =====================================================
       NEXT.JS CURRENTLY USES TYPESCRIPT
    ===================================================== */

    if (language !== 'typescript') {
      throw new BadRequestException(
        'Next.js practice problems currently require TypeScript.',
      );
    }

    /* =====================================================
       HIDDEN TESTS
    ===================================================== */

    const testCases = getNextJsTestCases(body.problemSlug);

    if (testCases.length === 0) {
      throw new BadRequestException(
        `No hidden test cases configured for ${body.problemSlug}.`,
      );
    }

    /* =====================================================
       FRAMEWORK FILES
    ===================================================== */

    const files = this.getNextJsSubmissionFiles(body, testCases);

    if (files.length === 0) {
      throw new BadRequestException(
        'At least one Next.js framework file is required.',
      );
    }

    /* =====================================================
       BUILD THROUGH FRAMEWORK JUDGE
    ===================================================== */

    let response: Response;

    try {
      response = await fetch(`${this.judgeUrl}/run/framework`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          problemSlug: body.problemSlug,

          runtime: 'nextjs',

          files,
        }),
      });
    } catch (error) {
      console.error('Unable to connect to Next.js judge:', error);

      throw new BadGatewayException(
        'Unable to connect to the Next.js code judge.',
      );
    }

    /* =====================================================
       PARSE JUDGE RESPONSE
    ===================================================== */

    let judgeResult: JudgeResponse;

    try {
      judgeResult = (await response.json()) as JudgeResponse;
    } catch {
      throw new BadGatewayException(
        'Invalid response received from Next.js code judge.',
      );
    }

    /* =====================================================
       JUDGE HTTP ERROR
    ===================================================== */

    if (!response.ok) {
      throw new BadGatewayException(
        judgeResult.message ?? 'Next.js judge rejected the submission.',
      );
    }

    /* =====================================================
       UNSUPPORTED RUNTIME
    ===================================================== */

    if (judgeResult.status === 'UNSUPPORTED_RUNTIME') {
      throw new BadGatewayException(
        judgeResult.message ??
          'Judge does not support the Next.js framework runtime.',
      );
    }

    /* =====================================================
       INVALID REQUEST
    ===================================================== */

    if (judgeResult.status === 'INVALID_REQUEST') {
      throw new BadGatewayException(
        judgeResult.message ?? 'Next.js judge rejected the framework files.',
      );
    }

    /* =====================================================
       INTERNAL JUDGE ERROR
    ===================================================== */

    if (judgeResult.status === 'INTERNAL_ERROR') {
      throw new BadGatewayException(
        judgeResult.message ?? 'Internal Next.js judge error.',
      );
    }

    /* =====================================================
       COMPILATION / NEXT.JS BUILD ERROR
    ===================================================== */

    if (judgeResult.status === 'COMPILATION_ERROR') {
      return {
        problemSlug: body.problemSlug,

        language,

        runtime: 'nextjs',

        status: 'COMPILATION_ERROR',

        passedTests: 0,

        totalTests: testCases.length,

        score: 0,

        results: [
          {
            testNumber: 1,

            passed: false,

            status: 'COMPILATION_ERROR',

            output: judgeResult.output ?? '',

            expectedOutput: '',

            stderr: judgeResult.stderr ?? '',
          },
        ],

        context: body.context,
      };
    }

    /* =====================================================
       TIME LIMIT
    ===================================================== */

    if (judgeResult.status === 'TIME_LIMIT_EXCEEDED') {
      return {
        problemSlug: body.problemSlug,

        language,

        runtime: 'nextjs',

        status: 'TIME_LIMIT_EXCEEDED',

        passedTests: 0,

        totalTests: testCases.length,

        score: 0,

        results: [
          {
            testNumber: 1,

            passed: false,

            status: 'TIME_LIMIT_EXCEEDED',

            output: judgeResult.output ?? '',

            expectedOutput: '',

            stderr: judgeResult.stderr ?? '',
          },
        ],

        context: body.context,
      };
    }

    /* =====================================================
       RUNTIME ERROR
    ===================================================== */

    if (judgeResult.status === 'RUNTIME_ERROR') {
      return {
        problemSlug: body.problemSlug,

        language,

        runtime: 'nextjs',

        status: 'RUNTIME_ERROR',

        passedTests: 0,

        totalTests: testCases.length,

        score: 0,

        results: [
          {
            testNumber: 1,

            passed: false,

            status: 'RUNTIME_ERROR',

            output: judgeResult.output ?? '',

            expectedOutput: '',

            stderr: judgeResult.stderr ?? '',
          },
        ],

        context: body.context,
      };
    }

    /* =====================================================
       BUILD MUST SUCCEED BEFORE HIDDEN TEST VALIDATION
    ===================================================== */

    if (judgeResult.status !== 'SUCCESS') {
      throw new BadGatewayException(
        judgeResult.message ??
          `Unexpected Next.js judge status: ${judgeResult.status}`,
      );
    }

    /* =====================================================
       HIDDEN TEST RESULTS
    ===================================================== */

    const results: Array<{
      testNumber: number;

      passed: boolean;

      status: string;

      output: string;

      expectedOutput: string;

      stderr: string;

      message?: string;
    }> = [];

    let passedTests = 0;

    for (let index = 0; index < testCases.length; index += 1) {
      const testCase = testCases[index];

      const validation = this.validateNextJsHiddenTest(files, testCase);

      if (validation.passed) {
        passedTests += 1;
      }

      results.push({
        testNumber: index + 1,

        passed: validation.passed,

        status: validation.passed ? 'PASSED' : 'FAILED',

        output: '',

        expectedOutput: '',

        stderr: '',

        ...(validation.message
          ? {
              message: validation.message,
            }
          : {}),
      });
    }

    /* =====================================================
       FINAL RESULT
    ===================================================== */

    const totalTests = testCases.length;

    const allTestsPassed = totalTests > 0 && passedTests === totalTests;

    const score =
      totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;

    return {
      problemSlug: body.problemSlug,

      language,

      runtime: 'nextjs',

      status: allTestsPassed ? 'ACCEPTED' : 'WRONG_ANSWER',

      passedTests,

      totalTests,

      score,

      results,

      buildOutput: judgeResult.output ?? '',

      context: body.context,
    };
  }

  /* =======================================================
     NESTJS PRIMARY FILE

     Current learner workspace submits one Monaco value through:

     body.code

     NestJS problems may contain one or more TypeScript files.

     body.files is preferred because dependency-injection, module,
     and course-management exercises contain supporting files.

     If body.files is absent, body.code is mapped to the first
     required learner file as a safe single-file fallback.
  ======================================================= */

  private getNestJsSubmissionFiles(
    body: SubmissionRequest,
    testCases: NestJsHiddenTestCase[],
  ): FrameworkSubmissionFile[] {
    if (Array.isArray(body.files) && body.files.length > 0) {
      return body.files.map((file) => ({
        path: this.normalizeFrameworkFilePath(file.path),

        language: file.language,

        content: file.content,
      }));
    }

    const primaryFilePath = testCases
      .flatMap((testCase) => testCase.requiredFiles ?? [])
      .map((filePath) => this.normalizeFrameworkFilePath(filePath))
      .find((filePath) => Boolean(filePath));

    if (!primaryFilePath) {
      throw new BadRequestException(
        `No NestJS learner file is configured for ${body.problemSlug}.`,
      );
    }

    return [
      {
        path: primaryFilePath,

        language: 'typescript',

        content: body.code,
      },
    ];
  }

  /* =======================================================
     GET NESTJS FILE CONTENT
  ======================================================= */

  private getNestJsFileContent(
    files: FrameworkSubmissionFile[],
    filePath: string,
  ): string | null {
    const normalizedPath = this.normalizeFrameworkFilePath(filePath);

    const file = files.find(
      (item) => this.normalizeFrameworkFilePath(item.path) === normalizedPath,
    );

    return file?.content ?? null;
  }

  /* =======================================================
     MATCH NESTJS SERIALIZED PATTERN

     NestJS hidden tests store regular expressions as:

     pattern: string
     flags: string

     This keeps hidden checks JSON-serializable if they later need
     to move fully into the Judge process.
  ======================================================= */

  private matchesNestJsPattern(
    pattern: string,
    flags: string | undefined,
    code: string,
  ) {
    const expression = new RegExp(pattern, flags ?? 'm');

    expression.lastIndex = 0;

    return expression.test(code);
  }

  /* =======================================================
     VALIDATE ONE NESTJS HIDDEN TEST
  ======================================================= */

  private validateNestJsHiddenTest(
    files: FrameworkSubmissionFile[],
    testCase: NestJsHiddenTestCase,
  ): NestJsValidationResult {
    const requiredFiles = testCase.requiredFiles ?? [];

    for (const filePath of requiredFiles) {
      const content = this.getNestJsFileContent(files, filePath);

      if (content === null) {
        return {
          passed: false,

          message: `Required file is missing: ${filePath}`,
        };
      }
    }

    const requiredChecks = testCase.requiredSourceChecks ?? [];

    for (const check of requiredChecks) {
      const content = this.getNestJsFileContent(files, check.filePath);

      if (content === null) {
        return {
          passed: false,

          message: `Required file is missing: ${check.filePath}`,
        };
      }

      if (!this.matchesNestJsPattern(check.pattern, check.flags, content)) {
        return {
          passed: false,

          message: check.message,
        };
      }
    }

    const forbiddenChecks = testCase.forbiddenSourceChecks ?? [];

    for (const check of forbiddenChecks) {
      const content = this.getNestJsFileContent(files, check.filePath);

      if (content === null) {
        return {
          passed: false,

          message: `Required file is missing: ${check.filePath}`,
        };
      }

      if (this.matchesNestJsPattern(check.pattern, check.flags, content)) {
        return {
          passed: false,

          message: check.message,
        };
      }
    }

    return {
      passed: true,
    };
  }

  /* =======================================================
     NESTJS SUBMIT

     NestJS is a framework problem, not a normal stdin/stdout
     TypeScript problem.

     Flow:

     1. Resolve server-side hidden tests.
     2. Resolve the learner framework file(s).
     3. Send the project to POST /run/framework.
     4. Require successful NestJS TypeScript compilation.
     5. Evaluate all hidden source/structure checks server-side.
     6. Return the same submission result shape used by the
        existing language submission flow.

     Hidden test definitions never go to the learner browser.
  ======================================================= */

  private async submitNestJs(body: SubmissionRequest, language: string) {
    /* =====================================================
       NESTJS CURRENTLY USES TYPESCRIPT
    ===================================================== */

    if (language !== 'typescript') {
      throw new BadRequestException(
        'NestJS practice problems currently require TypeScript.',
      );
    }

    /* =====================================================
       HIDDEN TESTS
    ===================================================== */

    const testCases = getNestJsTestCases(body.problemSlug);

    if (testCases.length === 0) {
      throw new BadRequestException(
        `No hidden test cases configured for ${body.problemSlug}.`,
      );
    }

    /* =====================================================
       FRAMEWORK FILES
    ===================================================== */

    const files = this.getNestJsSubmissionFiles(body, testCases);

    if (files.length === 0) {
      throw new BadRequestException(
        'At least one NestJS framework file is required.',
      );
    }

    /* =====================================================
       BUILD THROUGH FRAMEWORK JUDGE
    ===================================================== */

    let response: Response;

    try {
      response = await fetch(`${this.judgeUrl}/run/framework`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          problemSlug: body.problemSlug,

          runtime: 'nestjs',

          files,
        }),
      });
    } catch (error) {
      console.error('Unable to connect to NestJS judge:', error);

      throw new BadGatewayException(
        'Unable to connect to the NestJS code judge.',
      );
    }

    /* =====================================================
       PARSE JUDGE RESPONSE
    ===================================================== */

    let judgeResult: JudgeResponse;

    try {
      judgeResult = (await response.json()) as JudgeResponse;
    } catch {
      throw new BadGatewayException(
        'Invalid response received from NestJS code judge.',
      );
    }

    /* =====================================================
       JUDGE HTTP ERROR
    ===================================================== */

    if (!response.ok) {
      throw new BadGatewayException(
        judgeResult.message ?? 'NestJS judge rejected the submission.',
      );
    }

    /* =====================================================
       UNSUPPORTED RUNTIME
    ===================================================== */

    if (judgeResult.status === 'UNSUPPORTED_RUNTIME') {
      throw new BadGatewayException(
        judgeResult.message ??
          'Judge does not support the NestJS framework runtime.',
      );
    }

    /* =====================================================
       INVALID REQUEST
    ===================================================== */

    if (judgeResult.status === 'INVALID_REQUEST') {
      throw new BadGatewayException(
        judgeResult.message ?? 'NestJS judge rejected the framework files.',
      );
    }

    /* =====================================================
       INTERNAL JUDGE ERROR
    ===================================================== */

    if (judgeResult.status === 'INTERNAL_ERROR') {
      throw new BadGatewayException(
        judgeResult.message ?? 'Internal NestJS judge error.',
      );
    }

    /* =====================================================
       COMPILATION / NESTJS TYPESCRIPT ERROR
    ===================================================== */

    if (judgeResult.status === 'COMPILATION_ERROR') {
      return {
        problemSlug: body.problemSlug,

        language,

        runtime: 'nestjs',

        status: 'COMPILATION_ERROR',

        passedTests: 0,

        totalTests: testCases.length,

        score: 0,

        results: [
          {
            testNumber: 1,

            passed: false,

            status: 'COMPILATION_ERROR',

            output: judgeResult.output ?? '',

            expectedOutput: '',

            stderr: judgeResult.stderr ?? '',
          },
        ],

        context: body.context,
      };
    }

    /* =====================================================
       TIME LIMIT
    ===================================================== */

    if (judgeResult.status === 'TIME_LIMIT_EXCEEDED') {
      return {
        problemSlug: body.problemSlug,

        language,

        runtime: 'nestjs',

        status: 'TIME_LIMIT_EXCEEDED',

        passedTests: 0,

        totalTests: testCases.length,

        score: 0,

        results: [
          {
            testNumber: 1,

            passed: false,

            status: 'TIME_LIMIT_EXCEEDED',

            output: judgeResult.output ?? '',

            expectedOutput: '',

            stderr: judgeResult.stderr ?? '',
          },
        ],

        context: body.context,
      };
    }

    /* =====================================================
       RUNTIME ERROR
    ===================================================== */

    if (judgeResult.status === 'RUNTIME_ERROR') {
      return {
        problemSlug: body.problemSlug,

        language,

        runtime: 'nestjs',

        status: 'RUNTIME_ERROR',

        passedTests: 0,

        totalTests: testCases.length,

        score: 0,

        results: [
          {
            testNumber: 1,

            passed: false,

            status: 'RUNTIME_ERROR',

            output: judgeResult.output ?? '',

            expectedOutput: '',

            stderr: judgeResult.stderr ?? '',
          },
        ],

        context: body.context,
      };
    }

    /* =====================================================
       COMPILATION MUST SUCCEED BEFORE HIDDEN TEST VALIDATION
    ===================================================== */

    if (judgeResult.status !== 'SUCCESS') {
      throw new BadGatewayException(
        judgeResult.message ??
          `Unexpected NestJS judge status: ${judgeResult.status}`,
      );
    }

    /* =====================================================
       HIDDEN TEST RESULTS
    ===================================================== */

    const results: Array<{
      testNumber: number;

      passed: boolean;

      status: string;

      output: string;

      expectedOutput: string;

      stderr: string;

      message?: string;
    }> = [];

    let passedTests = 0;

    for (let index = 0; index < testCases.length; index += 1) {
      const testCase = testCases[index];

      const validation = this.validateNestJsHiddenTest(files, testCase);

      if (validation.passed) {
        passedTests += 1;
      }

      results.push({
        testNumber: index + 1,

        passed: validation.passed,

        status: validation.passed ? 'PASSED' : 'FAILED',

        output: '',

        expectedOutput: '',

        stderr: '',

        ...(validation.message
          ? {
              message: validation.message,
            }
          : {}),
      });
    }

    /* =====================================================
       FINAL RESULT
    ===================================================== */

    const totalTests = testCases.length;

    const allTestsPassed = totalTests > 0 && passedTests === totalTests;

    const score =
      totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;

    return {
      problemSlug: body.problemSlug,

      language,

      runtime: 'nestjs',

      status: allTestsPassed ? 'ACCEPTED' : 'WRONG_ANSWER',

      passedTests,

      totalTests,

      score,

      results,

      buildOutput: judgeResult.output ?? '',

      context: body.context,
    };
  }

  /* =======================================================
     DJANGO PRIMARY FILE

     Current learner workspace submits one Monaco value through:

     body.code

     Django problems may contain one or more Python files.

     body.files is preferred for future multi-file Django
     exercises. The current bank uses one primary editable file.

     If body.files is absent, body.code is mapped to the first
     required learner file as a safe single-file fallback.
  ======================================================= */

  private getDjangoSubmissionFiles(
    body: SubmissionRequest,
    testCases: DjangoHiddenTestCase[],
  ): FrameworkSubmissionFile[] {
    if (Array.isArray(body.files) && body.files.length > 0) {
      return body.files.map((file) => ({
        path: this.normalizeFrameworkFilePath(file.path),

        language: file.language,

        content: file.content,
      }));
    }

    const primaryFilePath = testCases
      .flatMap((testCase) => testCase.requiredFiles ?? [])
      .map((filePath) => this.normalizeFrameworkFilePath(filePath))
      .find((filePath) => Boolean(filePath));

    if (!primaryFilePath) {
      throw new BadRequestException(
        `No Django learner file is configured for ${body.problemSlug}.`,
      );
    }

    return [
      {
        path: primaryFilePath,

        language: 'python',

        content: body.code,
      },
    ];
  }

  /* =======================================================
     GET DJANGO FILE CONTENT
  ======================================================= */

  private getDjangoFileContent(
    files: FrameworkSubmissionFile[],
    filePath: string,
  ): string | null {
    const normalizedPath = this.normalizeFrameworkFilePath(filePath);

    const file = files.find(
      (item) => this.normalizeFrameworkFilePath(item.path) === normalizedPath,
    );

    return file?.content ?? null;
  }

  /* =======================================================
     MATCH DJANGO SERIALIZED PATTERN

     Django hidden tests store regular expressions as:

     pattern: string
     flags: string

     This keeps hidden checks JSON-serializable if they later need
     to move fully into the Judge process.
  ======================================================= */

  private matchesDjangoPattern(
    pattern: string,
    flags: string | undefined,
    code: string,
  ) {
    const expression = new RegExp(pattern, flags ?? 'm');

    expression.lastIndex = 0;

    return expression.test(code);
  }

  /* =======================================================
     VALIDATE ONE DJANGO HIDDEN TEST
  ======================================================= */

  private validateDjangoHiddenTest(
    files: FrameworkSubmissionFile[],
    testCase: DjangoHiddenTestCase,
  ): DjangoValidationResult {
    const requiredFiles = testCase.requiredFiles ?? [];

    for (const filePath of requiredFiles) {
      const content = this.getDjangoFileContent(files, filePath);

      if (content === null) {
        return {
          passed: false,

          message: `Required file is missing: ${filePath}`,
        };
      }
    }

    const requiredChecks = testCase.requiredSourceChecks ?? [];

    for (const check of requiredChecks) {
      const content = this.getDjangoFileContent(files, check.filePath);

      if (content === null) {
        return {
          passed: false,

          message: `Required file is missing: ${check.filePath}`,
        };
      }

      if (!this.matchesDjangoPattern(check.pattern, check.flags, content)) {
        return {
          passed: false,

          message: check.message,
        };
      }
    }

    const forbiddenChecks = testCase.forbiddenSourceChecks ?? [];

    for (const check of forbiddenChecks) {
      const content = this.getDjangoFileContent(files, check.filePath);

      if (content === null) {
        return {
          passed: false,

          message: `Required file is missing: ${check.filePath}`,
        };
      }

      if (this.matchesDjangoPattern(check.pattern, check.flags, content)) {
        return {
          passed: false,

          message: check.message,
        };
      }
    }

    return {
      passed: true,
    };
  }

  /* =======================================================
     DJANGO SUBMIT

     Django is a framework problem, not a normal stdin/stdout
     Python problem.

     Flow:

     1. Resolve server-side hidden tests.
     2. Resolve the learner framework file(s).
     3. Send the project to POST /run/framework.
     4. Require successful Python syntax and Django system checks.
     5. Evaluate all hidden source/structure checks server-side.
     6. Return the same submission result shape used by the
        existing language submission flow.

     Hidden test definitions never go to the learner browser.
  ======================================================= */

  private async submitDjango(body: SubmissionRequest, language: string) {
    /* =====================================================
       DJANGO CURRENTLY USES PYTHON
    ===================================================== */

    if (language !== 'python') {
      throw new BadRequestException(
        'Django practice problems currently require Python.',
      );
    }

    /* =====================================================
       HIDDEN TESTS
    ===================================================== */

    const testCases = getDjangoTestCases(body.problemSlug);

    if (testCases.length === 0) {
      throw new BadRequestException(
        `No hidden test cases configured for ${body.problemSlug}.`,
      );
    }

    /* =====================================================
       FRAMEWORK FILES
    ===================================================== */

    const files = this.getDjangoSubmissionFiles(body, testCases);

    if (files.length === 0) {
      throw new BadRequestException(
        'At least one Django framework file is required.',
      );
    }

    /* =====================================================
       BUILD THROUGH FRAMEWORK JUDGE
    ===================================================== */

    let response: Response;

    try {
      response = await fetch(`${this.judgeUrl}/run/framework`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          problemSlug: body.problemSlug,

          runtime: 'django',

          files,
        }),
      });
    } catch (error) {
      console.error('Unable to connect to Django judge:', error);

      throw new BadGatewayException(
        'Unable to connect to the Django code judge.',
      );
    }

    /* =====================================================
       PARSE JUDGE RESPONSE
    ===================================================== */

    let judgeResult: JudgeResponse;

    try {
      judgeResult = (await response.json()) as JudgeResponse;
    } catch {
      throw new BadGatewayException(
        'Invalid response received from Django code judge.',
      );
    }

    /* =====================================================
       JUDGE HTTP ERROR
    ===================================================== */

    if (!response.ok) {
      throw new BadGatewayException(
        judgeResult.message ?? 'Django judge rejected the submission.',
      );
    }

    /* =====================================================
       UNSUPPORTED RUNTIME
    ===================================================== */

    if (judgeResult.status === 'UNSUPPORTED_RUNTIME') {
      throw new BadGatewayException(
        judgeResult.message ??
          'Judge does not support the Django framework runtime.',
      );
    }

    /* =====================================================
       INVALID REQUEST
    ===================================================== */

    if (judgeResult.status === 'INVALID_REQUEST') {
      throw new BadGatewayException(
        judgeResult.message ?? 'Django judge rejected the framework files.',
      );
    }

    /* =====================================================
       INTERNAL JUDGE ERROR
    ===================================================== */

    if (judgeResult.status === 'INTERNAL_ERROR') {
      throw new BadGatewayException(
        judgeResult.message ?? 'Internal Django judge error.',
      );
    }

    /* =====================================================
       PYTHON / DJANGO VALIDATION ERROR
    ===================================================== */

    if (judgeResult.status === 'COMPILATION_ERROR') {
      return {
        problemSlug: body.problemSlug,

        language,

        runtime: 'django',

        status: 'COMPILATION_ERROR',

        passedTests: 0,

        totalTests: testCases.length,

        score: 0,

        results: [
          {
            testNumber: 1,

            passed: false,

            status: 'COMPILATION_ERROR',

            output: judgeResult.output ?? '',

            expectedOutput: '',

            stderr: judgeResult.stderr ?? '',
          },
        ],

        context: body.context,
      };
    }

    /* =====================================================
       TIME LIMIT
    ===================================================== */

    if (judgeResult.status === 'TIME_LIMIT_EXCEEDED') {
      return {
        problemSlug: body.problemSlug,

        language,

        runtime: 'django',

        status: 'TIME_LIMIT_EXCEEDED',

        passedTests: 0,

        totalTests: testCases.length,

        score: 0,

        results: [
          {
            testNumber: 1,

            passed: false,

            status: 'TIME_LIMIT_EXCEEDED',

            output: judgeResult.output ?? '',

            expectedOutput: '',

            stderr: judgeResult.stderr ?? '',
          },
        ],

        context: body.context,
      };
    }

    /* =====================================================
       RUNTIME ERROR
    ===================================================== */

    if (judgeResult.status === 'RUNTIME_ERROR') {
      return {
        problemSlug: body.problemSlug,

        language,

        runtime: 'django',

        status: 'RUNTIME_ERROR',

        passedTests: 0,

        totalTests: testCases.length,

        score: 0,

        results: [
          {
            testNumber: 1,

            passed: false,

            status: 'RUNTIME_ERROR',

            output: judgeResult.output ?? '',

            expectedOutput: '',

            stderr: judgeResult.stderr ?? '',
          },
        ],

        context: body.context,
      };
    }

    /* =====================================================
       DJANGO VALIDATION MUST SUCCEED BEFORE HIDDEN TEST VALIDATION
    ===================================================== */

    if (judgeResult.status !== 'SUCCESS') {
      throw new BadGatewayException(
        judgeResult.message ??
          `Unexpected Django judge status: ${judgeResult.status}`,
      );
    }

    /* =====================================================
       HIDDEN TEST RESULTS
    ===================================================== */

    const results: Array<{
      testNumber: number;

      passed: boolean;

      status: string;

      output: string;

      expectedOutput: string;

      stderr: string;

      message?: string;
    }> = [];

    let passedTests = 0;

    for (let index = 0; index < testCases.length; index += 1) {
      const testCase = testCases[index];

      const validation = this.validateDjangoHiddenTest(files, testCase);

      if (validation.passed) {
        passedTests += 1;
      }

      results.push({
        testNumber: index + 1,

        passed: validation.passed,

        status: validation.passed ? 'PASSED' : 'FAILED',

        output: '',

        expectedOutput: '',

        stderr: '',

        ...(validation.message
          ? {
              message: validation.message,
            }
          : {}),
      });
    }

    /* =====================================================
       FINAL RESULT
    ===================================================== */

    const totalTests = testCases.length;

    const allTestsPassed = totalTests > 0 && passedTests === totalTests;

    const score =
      totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;

    return {
      problemSlug: body.problemSlug,

      language,

      runtime: 'django',

      status: allTestsPassed ? 'ACCEPTED' : 'WRONG_ANSWER',

      passedTests,

      totalTests,

      score,

      results,

      buildOutput: judgeResult.output ?? '',

      context: body.context,
    };
  }

  /* =======================================================
     SPRING BOOT PRIMARY FILES

     Spring Boot is handled as a framework runtime. body.files
     is preferred for multi-file projects. If it is absent,
     body.code is mapped to the first required learner file.
  ======================================================= */

  private getSpringBootSubmissionFiles(
    body: SubmissionRequest,
  ): FrameworkSubmissionFile[] {
    if (Array.isArray(body.files) && body.files.length > 0) {
      return body.files.map((file) => ({
        path: this.normalizeFrameworkFilePath(file.path),

        language: file.language || 'java',

        content: file.content,
      }));
    }

    throw new BadRequestException(
      'Spring Boot submissions require framework files.',
    );
  }

  /* =======================================================
     SPRING BOOT SUBMIT

     Flow:
     1. Resolve server-side Spring Boot hidden tests.
     2. Resolve learner framework file(s).
     3. Send the project to POST /run/framework.
     4. The Spring Boot judge compiles/starts the application.
     5. The judge executes the configured HTTP hidden tests.
     6. Return ACCEPTED / WRONG_ANSWER using judge test results.
  ======================================================= */

  private async submitSpringBoot(body: SubmissionRequest, language: string) {
    if (language !== 'java') {
      throw new BadRequestException(
        'Spring Boot practice problems currently require Java.',
      );
    }

    const testCases = getSpringBootTestCases(body.problemSlug);

    if (testCases.length === 0) {
      throw new BadRequestException(
        `No hidden test cases configured for ${body.problemSlug}.`,
      );
    }

    const files = this.getSpringBootSubmissionFiles(body);

    if (files.length === 0) {
      throw new BadRequestException(
        'At least one Spring Boot framework file is required.',
      );
    }

    let response: Response;

    try {
      response = await fetch(`${this.judgeUrl}/run/framework`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          problemSlug: body.problemSlug,

          runtime: 'springboot',

          files,

          testCases,
        }),
      });
    } catch (error) {
      console.error('Unable to connect to Spring Boot judge:', error);

      throw new BadGatewayException(
        'Unable to connect to the Spring Boot code judge.',
      );
    }

    let judgeResult: SpringBootJudgeResponse;

    try {
      judgeResult = (await response.json()) as SpringBootJudgeResponse;
    } catch {
      throw new BadGatewayException(
        'Invalid response received from Spring Boot code judge.',
      );
    }

    if (!response.ok) {
      throw new BadGatewayException(
        judgeResult.message ?? 'Spring Boot judge rejected the submission.',
      );
    }

    if (judgeResult.status === 'UNSUPPORTED_RUNTIME') {
      throw new BadGatewayException(
        judgeResult.message ??
          'Judge does not support the Spring Boot framework runtime.',
      );
    }

    if (judgeResult.status === 'INVALID_REQUEST') {
      throw new BadGatewayException(
        judgeResult.message ??
          'Spring Boot judge rejected the framework files.',
      );
    }

    if (judgeResult.status === 'INTERNAL_ERROR') {
      throw new BadGatewayException(
        judgeResult.message ?? 'Internal Spring Boot judge error.',
      );
    }

    if (judgeResult.status === 'COMPILATION_ERROR') {
      return {
        problemSlug: body.problemSlug,

        language,

        runtime: 'springboot',

        status: 'COMPILATION_ERROR',

        passedTests: 0,

        totalTests: judgeResult.totalTests ?? testCases.length,

        score: 0,

        results: judgeResult.results ?? [
          {
            testNumber: 1,

            passed: false,

            status: 'COMPILATION_ERROR',

            output: judgeResult.output ?? '',

            expectedOutput: '',

            stderr: judgeResult.stderr ?? '',
          },
        ],

        context: body.context,
      };
    }

    if (judgeResult.status === 'TIME_LIMIT_EXCEEDED') {
      return {
        problemSlug: body.problemSlug,

        language,

        runtime: 'springboot',

        status: 'TIME_LIMIT_EXCEEDED',

        passedTests: judgeResult.passedTests ?? 0,

        totalTests: judgeResult.totalTests ?? testCases.length,

        score: judgeResult.score ?? 0,

        results: judgeResult.results ?? [
          {
            testNumber: 1,

            passed: false,

            status: 'TIME_LIMIT_EXCEEDED',

            output: judgeResult.output ?? '',

            expectedOutput: '',

            stderr: judgeResult.stderr ?? '',
          },
        ],

        context: body.context,
      };
    }

    if (judgeResult.status === 'RUNTIME_ERROR') {
      return {
        problemSlug: body.problemSlug,

        language,

        runtime: 'springboot',

        status: 'RUNTIME_ERROR',

        passedTests: judgeResult.passedTests ?? 0,

        totalTests: judgeResult.totalTests ?? testCases.length,

        score: judgeResult.score ?? 0,

        results: judgeResult.results ?? [
          {
            testNumber: 1,

            passed: false,

            status: 'RUNTIME_ERROR',

            output: judgeResult.output ?? '',

            expectedOutput: '',

            stderr: judgeResult.stderr ?? '',
          },
        ],

        context: body.context,
      };
    }

    if (judgeResult.status !== 'SUCCESS') {
      throw new BadGatewayException(
        judgeResult.message ??
          `Unexpected Spring Boot judge status: ${judgeResult.status}`,
      );
    }

    const totalTests = judgeResult.totalTests ?? testCases.length;

    const normalizedResults = (judgeResult.results ?? []).map(
      (result, index) => ({
        testNumber: result.testNumber ?? index + 1,

        passed: result.passed,

        status: result.status ?? (result.passed ? 'PASSED' : 'FAILED'),

        output: result.output ?? '',

        expectedOutput: result.expectedOutput ?? '',

        stderr: result.stderr ?? '',

        ...(result.message
          ? {
              message: result.message,
            }
          : {}),
      }),
    );

    const passedTests =
      judgeResult.passedTests ??
      normalizedResults.filter((result) => result.passed).length;

    const allTestsPassed = totalTests > 0 && passedTests === totalTests;

    const score =
      judgeResult.score ??
      (totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0);

    return {
      problemSlug: body.problemSlug,

      language,

      runtime: 'springboot',

      status: allTestsPassed ? 'ACCEPTED' : 'WRONG_ANSWER',

      passedTests,

      totalTests,

      score,

      results: normalizedResults,

      buildOutput: judgeResult.output ?? '',

      context: body.context,
    };
  }

  /* =======================================================
     GET HIDDEN TESTS

     C
       → c-test-cases.ts

     C++
       → cpp-test-cases.ts

     JavaScript
       → javascript-test-cases.ts

     Node.js
       → nodejs-test-cases.ts

     TypeScript
       → typescript-test-cases.ts

     Python
       → python-test-cases.ts

     Java
       → java-test-cases.ts

     C#
       → csharp-test-cases.ts

     Django
       → django-test-cases.ts
       → handled by submitDjango() before this generic method

     NOTE:
     JavaScript and Node.js both arrive here as:

     language = javascript

     Therefore Node.js is identified by:

     problemSlug.startsWith('node-')
  ======================================================= */

  private getHiddenTests(
    language: string,
    problemSlug: string,
  ): HiddenTestCase[] {
    /* =====================================================
       C
    ===================================================== */

    if (language === 'c') {
      return getCTestCases(problemSlug);
    }

    /* =====================================================
       C++
    ===================================================== */

    if (language === 'cpp') {
      return getCppTestCases(problemSlug);
    }

    /* =====================================================
       JAVASCRIPT / NODE.JS
    ===================================================== */

    if (language === 'javascript') {
      /*
       * Node.js problems
       *
       * Examples:
       *
       * node-word-count
       * node-path-basename
       * node-url-hostname
       */

      if (problemSlug.startsWith('node-')) {
        return getNodeJsTestCases(problemSlug);
      }

      /*
       * Standard JavaScript problems
       *
       * Examples:
       *
       * javascript-add-two-numbers
       * javascript-string-reverse
       */

      return getJavaScriptTestCases(problemSlug);
    }

    /* =====================================================
       TYPESCRIPT
    ===================================================== */

    if (language === 'typescript') {
      return getTypeScriptTestCases(problemSlug);
    }

    /* =====================================================
       PYTHON MACHINE LEARNING
    ===================================================== */

    if (language === 'python-machine-learning') {
      return getPythonMachineLearningTestCases(problemSlug);
    }

    /* =====================================================
       PYTHON SPARK / PYSPARK
    ===================================================== */

    if (language === 'pyspark') {
      return getPythonSparkTestCases(problemSlug);
    }

    /* =====================================================
       AWS PRACTICE (PYTHON RUNTIME)

       Resolve AWS tests before generic Python tests.
       No separate AWS Docker image or judge endpoint needed.
    ===================================================== */

    if (language === 'python' && problemSlug.startsWith('aws-')) {
      return getAwsTestCases(problemSlug);
    }

    /* =====================================================
       MICROSOFT AZURE PRACTICE (PYTHON RUNTIME)

       Reuse the existing hidden-test grading loop and /run.
       Azure exercises are offline Python simulations.
       AWS and all other language lookups remain unchanged.
    ===================================================== */

    if (language === 'python' && problemSlug.startsWith('azure-')) {
      return getAzureTestCases(problemSlug);
    }

    /* =====================================================
       GOOGLE CLOUD PLATFORM PRACTICE (PYTHON RUNTIME)
       Use the existing /run judge and hidden-test grading.
       Existing AWS, Azure and Python routing is preserved.
    ===================================================== */

    if (language === 'python' && problemSlug.startsWith('gcp-')) {
      return getGcpTestCases(problemSlug);
    }

    /* =====================================================
       AI & MACHINE LEARNING PRACTICE (PYTHON RUNTIME)
       Keep separate from dataset-based Python ML exercises.
       Reuse the existing hidden-test grading loop and /run.
    ===================================================== */

    if (language === 'python' && problemSlug.startsWith('ai-ml-')) {
      return getAiMlTestCases(problemSlug);
    }

    /* =====================================================
       GENERATIVE AI PRACTICE (PYTHON RUNTIME)
       Reuse the existing hidden-test grading loop and /run.
       General GenAI practice does not require a model API.
    ===================================================== */

    if (
      language === 'python' &&
      (problemSlug.startsWith('genai-') ||
        problemSlug.startsWith('generative-ai-'))
    ) {
      return getGenerativeAiTestCases(problemSlug);
    }

    /* =====================================================
       PYTHON
    ===================================================== */

    if (language === 'python') {
      return getPythonTestCases(problemSlug);
    }

    /* =====================================================
       JAVA
    ===================================================== */

    if (language === 'java') {
      return getJavaTestCases(problemSlug);
    }

    /* =====================================================
       C#
    ===================================================== */

    if (language === 'csharp') {
      return getCSharpTestCases(problemSlug);
    }

    /* =====================================================
       PHP
    ===================================================== */

    if (language === 'php') {
      return getPhpTestCases(problemSlug);
    }

    /* =====================================================
       RUBY
    ===================================================== */

    if (language === 'ruby') {
      return getRubyTestCases(problemSlug);
    }

    /* =====================================================
       SWIFT
    ===================================================== */

    if (language === 'swift') {
      return getSwiftTestCases(problemSlug);
    }

    return [];
  }

  /* =======================================================
     ASP.NET CORE PRIMARY FILES

     ASP.NET Core is a framework runtime. body.files is
     preferred. If only body.code is supplied, Program.cs
     is created as the learner-editable file.
  ======================================================= */

  private getAspNetCoreSubmissionFiles(
    body: SubmissionRequest,
    testCases: AspNetCoreHiddenTestCase[],
  ): FrameworkSubmissionFile[] {
    if (Array.isArray(body.files) && body.files.length > 0) {
      return body.files.map((file) => ({
        path: this.normalizeFrameworkFilePath(file.path),

        language: file.language || 'csharp',

        content: file.content,
      }));
    }

    const requiredFile = testCases
      .flatMap((testCase) => testCase.requiredFiles ?? [])
      .map((filePath) => this.normalizeFrameworkFilePath(filePath))
      .find(Boolean);

    return [
      {
        path: requiredFile || 'Program.cs',

        language: 'csharp',

        content: body.code,
      },
    ];
  }

  /* =======================================================
     ASP.NET CORE SUBMIT

     Flow:
     1. Resolve hidden HTTP tests.
     2. Resolve learner framework files.
     3. POST project + hidden tests to /run/framework.
     4. ASP.NET Core runner builds and starts the app.
     5. Judge executes hidden HTTP tests.
     6. Return ACCEPTED / WRONG_ANSWER.
  ======================================================= */

  private async submitAspNetCore(body: SubmissionRequest, language: string) {
    if (language !== 'csharp') {
      throw new BadRequestException(
        'ASP.NET Core practice problems currently require C#.',
      );
    }

    const testCases = getAspNetCoreTestCases(body.problemSlug);

    if (testCases.length === 0) {
      throw new BadRequestException(
        `No hidden test cases configured for ${body.problemSlug}.`,
      );
    }

    const files = this.getAspNetCoreSubmissionFiles(body, testCases);

    if (files.length === 0) {
      throw new BadRequestException(
        'At least one ASP.NET Core framework file is required.',
      );
    }

    let response: Response;

    try {
      response = await fetch(`${this.judgeUrl}/run/framework`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          problemSlug: body.problemSlug,

          runtime: 'aspnetcore',

          files,

          tests: testCases,
        }),
      });
    } catch (error) {
      console.error('Unable to connect to ASP.NET Core judge:', error);

      throw new BadGatewayException(
        'Unable to connect to the ASP.NET Core code judge.',
      );
    }

    let judgeResult: AspNetCoreJudgeResponse;

    try {
      judgeResult = (await response.json()) as AspNetCoreJudgeResponse;
    } catch {
      throw new BadGatewayException(
        'Invalid response received from ASP.NET Core code judge.',
      );
    }

    if (!response.ok) {
      throw new BadGatewayException(
        judgeResult.message ?? 'ASP.NET Core judge rejected the submission.',
      );
    }

    if (judgeResult.status === 'UNSUPPORTED_RUNTIME') {
      throw new BadGatewayException(
        judgeResult.message ??
          'Judge does not support the ASP.NET Core framework runtime.',
      );
    }

    if (judgeResult.status === 'INVALID_REQUEST') {
      throw new BadGatewayException(
        judgeResult.message ??
          'ASP.NET Core judge rejected the framework files.',
      );
    }

    if (judgeResult.status === 'INTERNAL_ERROR') {
      throw new BadGatewayException(
        judgeResult.message ?? 'Internal ASP.NET Core judge error.',
      );
    }

    if (
      judgeResult.status === 'COMPILATION_ERROR' ||
      judgeResult.status === 'RUNTIME_ERROR' ||
      judgeResult.status === 'TIME_LIMIT_EXCEEDED'
    ) {
      return {
        problemSlug: body.problemSlug,

        language,

        runtime: 'aspnetcore',

        status: judgeResult.status,

        passedTests: 0,

        totalTests: testCases.length,

        score: 0,

        results: judgeResult.results ?? [
          {
            testNumber: 1,

            passed: false,

            status: judgeResult.status,

            output: judgeResult.output ?? '',

            expectedOutput: '',

            stderr: judgeResult.stderr ?? '',
          },
        ],

        context: body.context,
      };
    }

    if (judgeResult.status !== 'SUCCESS') {
      throw new BadGatewayException(
        judgeResult.message ??
          `Unexpected ASP.NET Core judge status: ${judgeResult.status}`,
      );
    }

    const results = judgeResult.results ?? [];

    const totalTests = judgeResult.totalTests ?? testCases.length;

    const passedTests =
      judgeResult.passedTests ??
      results.filter((result) => result.passed).length;

    const score =
      totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;

    return {
      problemSlug: body.problemSlug,

      language,

      runtime: 'aspnetcore',

      status:
        totalTests > 0 && passedTests === totalTests
          ? 'ACCEPTED'
          : 'WRONG_ANSWER',

      passedTests,

      totalTests,

      score,

      results,

      buildOutput: judgeResult.output ?? '',

      context: body.context,
    };
  }

  /* =======================================================
     FASTAPI PRIMARY FILES

     FastAPI is a Python framework runtime. Multi-file
     submissions are preserved when body.files is supplied.
     For the current single-file practice flow, body.code is
     mapped to main.py.
  ======================================================= */

  private getFastApiSubmissionFiles(
    body: SubmissionRequest,
  ): FrameworkSubmissionFile[] {
    if (Array.isArray(body.files) && body.files.length > 0) {
      return body.files.map((file) => ({
        path: this.normalizeFrameworkFilePath(file.path),

        language: file.language || 'python',

        content: file.content,
      }));
    }

    return [
      {
        path: 'main.py',

        language: 'python',

        content: body.code,
      },
    ];
  }

  /* =======================================================
     FASTAPI SUBMIT

     Flow:
     1. Resolve learner FastAPI file(s).
     2. Send the project to POST /run/framework.
     3. Use runtime = fastapi.
     4. The framework judge starts the FastAPI application.
     5. The judge executes the problem's HTTP tests.
     6. Return ACCEPTED / WRONG_ANSWER using judge results.

     The FastAPI HTTP test mapping remains in the Judge so
     hidden framework tests are not exposed to the browser.
  ======================================================= */

  private async submitFastApi(body: SubmissionRequest, language: string) {
    if (language !== 'python') {
      throw new BadRequestException(
        'FastAPI practice problems currently require Python.',
      );
    }

    const allTestCases = getFastApiTestCases(body.problemSlug);

    /*
     * The current FastAPI Judge runner executes HTTP tests.
     * Source checks remain server-side and are not sent to
     * the learner browser.
     */
    const httpTestCases = allTestCases.filter(
      (testCase) => testCase.type === 'http',
    );

    if (allTestCases.length === 0) {
      throw new BadRequestException(
        `No hidden test cases configured for ${body.problemSlug}.`,
      );
    }

    if (httpTestCases.length === 0) {
      throw new BadRequestException(
        `No FastAPI HTTP hidden test cases configured for ${body.problemSlug}.`,
      );
    }

    const files = this.getFastApiSubmissionFiles(body);

    if (files.length === 0) {
      throw new BadRequestException(
        'At least one FastAPI framework file is required.',
      );
    }

    let response: Response;

    try {
      response = await fetch(`${this.judgeUrl}/run/framework`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          problemSlug: body.problemSlug,

          runtime: 'fastapi',

          files,

          // FastAPI compatibility: send the same hidden HTTP tests
          // under both supported request keys. This prevents the
          // framework dispatcher/runner from dropping the tests if
          // one layer still reads `testCases` while another reads
          // `tests`. Other framework/language flows are unchanged.
          tests: httpTestCases,

          testCases: httpTestCases,
        }),
      });
    } catch (error) {
      console.error('Unable to connect to FastAPI judge:', error);

      throw new BadGatewayException(
        'Unable to connect to the FastAPI code judge.',
      );
    }

    let judgeResult: SpringBootJudgeResponse;

    try {
      judgeResult = (await response.json()) as SpringBootJudgeResponse;
    } catch {
      throw new BadGatewayException(
        'Invalid response received from FastAPI code judge.',
      );
    }

    if (!response.ok) {
      throw new BadGatewayException(
        judgeResult.message ?? 'FastAPI judge rejected the submission.',
      );
    }

    if (judgeResult.status === 'UNSUPPORTED_RUNTIME') {
      throw new BadGatewayException(
        judgeResult.message ??
          'Judge does not support the FastAPI framework runtime.',
      );
    }

    if (judgeResult.status === 'INVALID_REQUEST') {
      throw new BadGatewayException(
        judgeResult.message ?? 'FastAPI judge rejected the framework files.',
      );
    }

    if (judgeResult.status === 'INTERNAL_ERROR') {
      throw new BadGatewayException(
        judgeResult.message ?? 'Internal FastAPI judge error.',
      );
    }

    if (
      judgeResult.status === 'COMPILATION_ERROR' ||
      judgeResult.status === 'RUNTIME_ERROR' ||
      judgeResult.status === 'TIME_LIMIT_EXCEEDED'
    ) {
      return {
        problemSlug: body.problemSlug,

        language,

        runtime: 'fastapi',

        status: judgeResult.status,

        passedTests: 0,

        totalTests: httpTestCases.length,

        score: 0,

        results: judgeResult.results ?? [
          {
            testNumber: 1,

            passed: false,

            status: judgeResult.status,

            output: judgeResult.output ?? '',

            expectedOutput: '',

            stderr: judgeResult.stderr ?? '',

            message: judgeResult.message,
          },
        ],

        context: body.context,
      };
    }

    if (judgeResult.status !== 'SUCCESS') {
      throw new BadGatewayException(
        judgeResult.message ??
          `Unexpected FastAPI judge status: ${judgeResult.status}`,
      );
    }

    const judgeResults = judgeResult.results ?? [];

    const normalizedResults = judgeResults.map((result, index) => ({
      testNumber: result.testNumber ?? index + 1,

      passed: result.passed,

      status: result.status ?? (result.passed ? 'PASSED' : 'FAILED'),

      output: result.output ?? '',

      expectedOutput: result.expectedOutput ?? '',

      stderr: result.stderr ?? '',

      ...(result.message
        ? {
            message: result.message,
          }
        : {}),
    }));

    /*
     * A configured FastAPI submission must never be converted
     * into a fake stdout test. FastAPI is validated through
     * HTTP responses.
     */
    const totalTests = httpTestCases.length;

    const passedTests =
      judgeResult.passedTests ??
      normalizedResults.filter((result) => result.passed).length;

    /*
     * If the Judge reports SUCCESS but returns no HTTP test
     * results, fail safely instead of producing 0/0 or treating
     * framework startup as a passed submission.
     */
    if (normalizedResults.length === 0) {
      return {
        problemSlug: body.problemSlug,

        language,

        runtime: 'fastapi',

        status: 'WRONG_ANSWER',

        passedTests: 0,

        totalTests,

        score: 0,

        results: httpTestCases.map((testCase, index) => ({
          testNumber: index + 1,

          passed: false,

          status: 'FAILED',

          output: '',

          expectedOutput:
            testCase.expectedJson !== undefined
              ? JSON.stringify(testCase.expectedJson)
              : `HTTP ${testCase.expectedStatus}`,

          stderr: '',

          message: 'FastAPI hidden HTTP test was not executed by the Judge.',
        })),

        buildOutput: judgeResult.output ?? '',

        context: body.context,
      };
    }

    const allTestsPassed = totalTests > 0 && passedTests === totalTests;

    const score =
      totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;

    return {
      problemSlug: body.problemSlug,

      language,

      runtime: 'fastapi',

      status: allTestsPassed ? 'ACCEPTED' : 'WRONG_ANSWER',

      passedTests,

      totalTests,

      score,

      results: normalizedResults,

      buildOutput: judgeResult.output ?? '',

      context: body.context,
    };
  }

  /* =======================================================
     SUBMIT
  ======================================================= */

  private async evaluate(
    body: SubmissionRequest,
    userId: string | null = null,
  ) {
    /* =====================================================
       VALIDATE PROBLEM
    ===================================================== */

    if (!body.problemSlug || !body.problemSlug.trim()) {
      throw new BadRequestException('Problem slug is required.');
    }

    /* =====================================================
       VALIDATE LANGUAGE
    ===================================================== */

    if (!body.language || !body.language.trim()) {
      throw new BadRequestException('Language is required.');
    }

    /* =====================================================
       VALIDATE CODE
    ===================================================== */

    if (!body.code || !body.code.trim()) {
      throw new BadRequestException('Code is required.');
    }

    /* =====================================================
       NORMALIZE LANGUAGE
    ===================================================== */

    const language =
      body.problemSlug.trim().toLowerCase().startsWith('aws-') ||
      body.problemSlug.trim().toLowerCase().startsWith('azure-') ||
      body.problemSlug.trim().toLowerCase().startsWith('gcp-') ||
      body.problemSlug.trim().toLowerCase().startsWith('ai-ml-') ||
      body.problemSlug.trim().toLowerCase().startsWith('genai-') ||
      body.problemSlug.trim().toLowerCase().startsWith('generative-ai-')
        ? 'python'
        : this.normalizeLanguage(body.language);

    /* =====================================================
       NORMALIZE FRAMEWORK TECHNOLOGY
    ===================================================== */

    const normalizedTechnology = String(body.context?.technology ?? '')
      .trim()
      .toLowerCase();

    /* =====================================================
       FASTAPI FRAMEWORK SUBMISSION

       FastAPI problems are Python framework problems and
       must use POST /run/framework with runtime = fastapi.
    ===================================================== */

    const isFastApi =
      body.problemSlug.startsWith('fastapi-') ||
      normalizedTechnology === 'fastapi' ||
      normalizedTechnology === 'fast-api' ||
      normalizedTechnology === 'fast api';

    if (isFastApi) {
      return await this.submitFastApi(body, language);
    }

    /* =====================================================
       ASP.NET CORE FRAMEWORK SUBMISSION
    ===================================================== */

    const isAspNetCore =
      body.problemSlug.startsWith('aspnetcore-') ||
      body.problemSlug.startsWith('aspnet-core-') ||
      normalizedTechnology === 'aspnetcore' ||
      normalizedTechnology === 'asp.netcore' ||
      normalizedTechnology === 'asp.net-core' ||
      normalizedTechnology === 'aspnet-core';

    if (isAspNetCore) {
      return this.submitAspNetCore(body, language);
    }

    /* =====================================================
       VALIDATE SUPPORTED LANGUAGE
    ===================================================== */

    if (
      !SUPPORTED_LANGUAGES.includes(
        language as (typeof SUPPORTED_LANGUAGES)[number],
      )
    ) {
      throw new BadRequestException(
        `Unsupported submission language: ${body.language}`,
      );
    }

    /* =====================================================
       NEXT.JS FRAMEWORK SUBMISSION

       Next.js problem slugs are routed through the shared
       framework Judge instead of the normal /run endpoint.
    ===================================================== */

    if (body.problemSlug.startsWith('nextjs-')) {
      return await this.submitNextJs(body, language);
    }

    /* =====================================================
       NESTJS FRAMEWORK SUBMISSION

       NestJS problem slugs use the shared framework Judge
       instead of the normal stdin/stdout /run endpoint.
    ===================================================== */

    if (body.problemSlug.startsWith('nestjs-')) {
      return await this.submitNestJs(body, language);
    }

    /* =====================================================
       DJANGO FRAMEWORK SUBMISSION

       Django problem slugs use the shared framework Judge
       instead of the normal Python stdin/stdout /run endpoint.
    ===================================================== */

    if (body.problemSlug.startsWith('django-')) {
      return await this.submitDjango(body, language);
    }

    /* =====================================================
       SPRING BOOT FRAMEWORK SUBMISSION

       Spring Boot problem slugs use the shared framework Judge
       instead of the normal Java stdin/stdout /run endpoint.
    ===================================================== */

    if (
      body.problemSlug.startsWith('springboot-') ||
      body.problemSlug.startsWith('spring-boot-')
    ) {
      return await this.submitSpringBoot(body, language);
    }

    /* =====================================================
       GET HIDDEN TEST CASES
    ===================================================== */

    const testCases = await this.resolveTests(
      language,
      body.problemSlug,
      userId,
    );

    if (testCases.length === 0) {
      throw new BadRequestException(
        `No hidden test cases configured for ${body.problemSlug}.`,
      );
    }

    /* =====================================================
       PYTHON MACHINE LEARNING DATASET

       Python ML submissions use the same server-side dataset
       flow as Run. The learner never supplies the CSV.
    ===================================================== */

    const machineLearningDataset =
      language === 'python-machine-learning'
        ? getPythonMachineLearningDataset(body.problemSlug)
        : undefined;

    if (language === 'python-machine-learning' && !machineLearningDataset) {
      throw new BadRequestException(
        `No Python Machine Learning dataset configured for ${body.problemSlug}.`,
      );
    }

    /* =====================================================
       RESULTS
    ===================================================== */

    const results: Array<{
      testNumber: number;

      passed: boolean;

      status: string;

      output: string;

      expectedOutput: string;

      stderr: string;

      message?: string;
    }> = [];

    let passedTests = 0;

    /* =====================================================
       RUN EVERY HIDDEN TEST
    ===================================================== */

    for (let index = 0; index < testCases.length; index += 1) {
      const testCase = testCases[index];

      /* ===================================================
         TYPESCRIPT SOURCE REQUIREMENTS

         These checks happen before execution so a learner
         cannot pass a TypeScript-specific problem by simply
         printing the expected output with plain JavaScript-
         style code.

         Other normal-code languages, including Python,
         continue directly to the Judge.

         Django submissions are routed earlier through
         submitDjango() and do not enter this stdin/stdout loop.
      =================================================== */

      const sourceValidationMessage = this.validateSourceRequirements(
        body.code,
        testCase,
      );

      if (sourceValidationMessage) {
        results.push({
          testNumber: index + 1,

          passed: false,

          status: 'SOURCE_VALIDATION_FAILED',

          output: '',

          expectedOutput: '',

          stderr: '',

          message: sourceValidationMessage,
        });

        continue;
      }

      let response: Response;

      try {
        response = await fetch(`${this.judgeUrl}/run`, {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            language,

            code: body.code,

            input: testCase.input,

            problemSlug: body.problemSlug,

            ...(machineLearningDataset
              ? {
                  dataset: machineLearningDataset.content,

                  datasetFileName: machineLearningDataset.fileName,
                }
              : {}),
          }),
        });
      } catch (error) {
        console.error('Unable to connect to judge:', error);

        throw new BadGatewayException('Unable to connect to the code judge.');
      }

      /* ===================================================
         PARSE JUDGE RESPONSE
      =================================================== */

      let judgeResult: JudgeResponse;

      try {
        judgeResult = (await response.json()) as JudgeResponse;
      } catch {
        throw new BadGatewayException(
          'Invalid response received from code judge.',
        );
      }

      /* ===================================================
         JUDGE HTTP ERROR
      =================================================== */

      if (!response.ok) {
        throw new BadGatewayException(
          judgeResult.message ?? 'Judge rejected the submission.',
        );
      }

      /* ===================================================
         UNSUPPORTED LANGUAGE
      =================================================== */

      if (judgeResult.status === 'UNSUPPORTED_LANGUAGE') {
        throw new BadGatewayException(
          judgeResult.message ?? `Judge does not support ${language}.`,
        );
      }

      /* ===================================================
         INVALID REQUEST
      =================================================== */

      if (judgeResult.status === 'INVALID_REQUEST') {
        throw new BadGatewayException(
          judgeResult.message ?? 'Judge rejected the execution request.',
        );
      }

      /* ===================================================
         INTERNAL JUDGE ERROR
      =================================================== */

      if (judgeResult.status === 'INTERNAL_ERROR') {
        throw new BadGatewayException(
          judgeResult.message ?? 'Internal judge error.',
        );
      }

      /* ===================================================
         COMPILATION / SYNTAX ERROR

         C / C++
           → compiler failure

         JavaScript / Node.js
           → node --check syntax failure

         TypeScript
           → tsc compilation failure

         Python
           → py_compile syntax failure

         Swift
           → swiftc compilation failure
      =================================================== */

      if (judgeResult.status === 'COMPILATION_ERROR') {
        return {
          problemSlug: body.problemSlug,

          language,

          status: 'COMPILATION_ERROR',

          passedTests: 0,

          totalTests: testCases.length,

          score: 0,

          results: [
            {
              testNumber: 1,

              passed: false,

              status: 'COMPILATION_ERROR',

              output: judgeResult.output ?? '',

              expectedOutput: '',

              stderr: judgeResult.stderr ?? '',
            },
          ],

          context: body.context,
        };
      }

      /* ===================================================
         TIME LIMIT
      =================================================== */

      if (judgeResult.status === 'TIME_LIMIT_EXCEEDED') {
        return {
          problemSlug: body.problemSlug,

          language,

          status: 'TIME_LIMIT_EXCEEDED',

          passedTests,

          totalTests: testCases.length,

          score: Math.round((passedTests / testCases.length) * 100),

          results: [
            ...results,

            {
              testNumber: index + 1,

              passed: false,

              status: 'TIME_LIMIT_EXCEEDED',

              output: judgeResult.output ?? '',

              expectedOutput: testCase.expectedOutput,

              stderr: judgeResult.stderr ?? '',
            },
          ],

          context: body.context,
        };
      }

      /* ===================================================
         RUNTIME ERROR
      =================================================== */

      if (judgeResult.status === 'RUNTIME_ERROR') {
        return {
          problemSlug: body.problemSlug,

          language,

          status: 'RUNTIME_ERROR',

          passedTests,

          totalTests: testCases.length,

          score: Math.round((passedTests / testCases.length) * 100),

          results: [
            ...results,

            {
              testNumber: index + 1,

              passed: false,

              status: 'RUNTIME_ERROR',

              output: judgeResult.output ?? '',

              expectedOutput: testCase.expectedOutput,

              stderr: judgeResult.stderr ?? '',
            },
          ],

          context: body.context,
        };
      }

      /* ===================================================
         COMPARE OUTPUT
      =================================================== */

      const actualOutput = this.normalizeOutput(judgeResult.output ?? '');

      const expectedOutput = this.normalizeOutput(testCase.expectedOutput);

      const passed =
        judgeResult.status === 'SUCCESS' && actualOutput === expectedOutput;

      if (passed) {
        passedTests += 1;
      }

      results.push({
        testNumber: index + 1,

        passed,

        status: passed ? 'PASSED' : 'FAILED',

        output: actualOutput,

        expectedOutput,

        stderr: judgeResult.stderr ?? '',
      });
    }

    /* =====================================================
       FINAL SUBMISSION RESULT
    ===================================================== */

    const totalTests = testCases.length;

    const allTestsPassed = totalTests > 0 && passedTests === totalTests;

    const score =
      totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;

    return {
      problemSlug: body.problemSlug,
      language,
      status: allTestsPassed ? 'ACCEPTED' : 'WRONG_ANSWER',
      passedTests,
      totalTests,
      score,
      results,
      context: body.context,
    };
  }

  constructor(
    private readonly gateway: JudgeGateway,
    private readonly catalog: LearnerCatalogService,
  ) {}

  onModuleInit() {
    this.gateway.register('submit', async (job) => {
      const body = (job.payload as SubmissionRequest | undefined) ?? {
        problemSlug: job.problemSlug,
        language: job.language,
        code: job.code,
      };
      const result = await this.evaluate(body, job.userId ?? null);
      return { response: result, record: this.toRecord(result) };
    });
  }

  async submit(body: SubmissionRequest, userId: string | null = null) {
    const { response } = await this.gateway.execute({
      kind: 'submit',
      userId,
      problemSlug: String(body.problemSlug ?? '').trim(),
      language: String(body.language ?? '')
        .trim()
        .toLowerCase(),
      workspaceType: '',
      code: String(body.code ?? ''),
      payload: body,
    });
    return response;
  }

  async rejudge(
    run: {
      id: string;
      userId: string | null;
      problemSlug: string;
      language: string;
      code: string;
    },
    rejudgeJobId: string,
  ): Promise<RunRecord> {
    const { response } = await this.gateway.execute({
      kind: 'submit',
      userId: run.userId,
      problemSlug: run.problemSlug,
      language: run.language,
      workspaceType: '',
      code: run.code,
      rejudgeJobId,
      rejudgeOfId: run.id,
    });
    return this.toRecord(response);
  }

  private toRecord(value: unknown): RunRecord {
    const result = (value ?? {}) as {
      status?: string;
      passedTests?: number;
      totalTests?: number;
      results?: Array<{
        testNumber?: number;
        passed?: boolean;
        status?: string;
        output?: string;
        expectedOutput?: string;
        stderr?: string;
      }>;
    };
    const verdicts: Record<string, string> = {
      ACCEPTED: 'ac',
      WRONG_ANSWER: 'wa',
      TIME_LIMIT_EXCEEDED: 'tle',
      RUNTIME_ERROR: 're',
      COMPILATION_ERROR: 'ce',
    };
    const outcomes: Record<string, string> = {
      ac: 'ok',
      wa: 'wrong',
      tle: 'tle',
      re: 're',
      ce: 'ce',
    };
    const verdict = verdicts[result.status ?? ''] ?? 'wa';
    const items = result.results ?? [];
    return {
      outcome: outcomes[verdict] ?? 'wrong',
      verdict,
      testsPassed: result.passedTests ?? null,
      testsTotal: result.totalTests ?? null,
      stdout: items
        .map((item) => item.output)
        .filter(Boolean)
        .join('\n')
        .slice(0, 2000),
      stderr: items
        .map((item) => item.stderr)
        .filter(Boolean)
        .join('\n')
        .slice(0, 2000),
      results: items.map((item) => ({
        testNumber: item.testNumber,
        passed: item.passed,
        status: item.status,
        output: (item.output ?? '').slice(0, 500),
        expectedOutput: (item.expectedOutput ?? '').slice(0, 500),
      })),
    };
  }

  private async resolveTests(
    language: string,
    problemSlug: string,
    userId: string | null,
  ): Promise<HiddenTestCase[]> {
    const fixed = this.getHiddenTests(language, problemSlug);
    if (
      fixed.length > 0 ||
      !(DB_JUDGED_LANGUAGES as readonly string[]).includes(language)
    )
      return fixed;
    const rows = await this.catalog.hiddenTests(userId, problemSlug, language);
    return rows.map((row) => ({
      input: row.input ?? '',
      expectedOutput: row.expectedOutput,
    }));
  }
}
