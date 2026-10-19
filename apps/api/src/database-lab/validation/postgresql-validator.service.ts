import {
  BadRequestException,
  Injectable,
  Logger,
} from '@nestjs/common';

import {
  PostgreSqlSandboxService,
} from '../sandbox/postgresql-sandbox.service.js';

import type {
  PostgreSqlSandbox,
} from '../sandbox/postgresql-sandbox.service.js';

/* =========================================================
   VALIDATION TYPES
========================================================= */

export type PostgreSqlValidationTestResult = {
  name: string;

  passed: boolean;

  message?: string;
};

export type PostgreSqlValidationResult = {
  accepted: boolean;

  passedTests: number;

  totalTests: number;

  score: number;

  message: string;

  tests:
    PostgreSqlValidationTestResult[];
};

/* =========================================================
   INTERNAL VALIDATOR TYPES
========================================================= */

type ValidationContext = {
  problemSlug: string;

  sandbox: PostgreSqlSandbox;
};

type ProblemValidator = (
  context: ValidationContext,
) => Promise<
  PostgreSqlValidationResult
>;

/* =========================================================
   POSTGRESQL VALIDATOR SERVICE

   This service validates the CURRENT PostgreSQL state.

   It does not execute the learner SQL.

   Execution:
      DatabaseLabService
            ↓
      PostgreSqlSandboxService.executeSql()

   Validation:
      PostgreSqlValidatorService
            ↓
      inspect PostgreSQL state
            ↓
      hidden tests
            ↓
      accepted / incorrect

   This prevents SQL such as CREATE DATABASE from being
   executed twice when the learner first clicks Run Query
   and then clicks Submit.
========================================================= */

@Injectable()
export class PostgreSqlValidatorService {
  private readonly logger =
    new Logger(
      PostgreSqlValidatorService.name,
    );

  constructor(
    private readonly postgresqlSandboxService:
      PostgreSqlSandboxService,
  ) {}

  /* =======================================================
     VALIDATE CURRENT DATABASE STATE
  ======================================================= */

  async validateState(
    problemSlug: string,

    sandbox: PostgreSqlSandbox,
  ): Promise<PostgreSqlValidationResult> {
    const normalizedProblemSlug =
      problemSlug
        .trim()
        .toLowerCase();

    if (
      !normalizedProblemSlug
    ) {
      throw new BadRequestException(
        'problemSlug is required for database validation.',
      );
    }

    this.logger.log(
      `Validating PostgreSQL state for problem "${normalizedProblemSlug}".`,
    );

    const validator =
      this.getProblemValidator(
        normalizedProblemSlug,
      );

    if (
      !validator
    ) {
      throw new BadRequestException(
        `PostgreSQL validation is not configured for problem "${normalizedProblemSlug}".`,
      );
    }

    return validator({
      problemSlug:
        normalizedProblemSlug,

      sandbox,
    });
  }

  /* =======================================================
     PROBLEM VALIDATOR REGISTRY

     Add each PostgreSQL hidden validator here as the
     remaining practice problems are implemented.
  ======================================================= */

  private getProblemValidator(
    problemSlug: string,
  ): ProblemValidator | null {
    switch (
      problemSlug
    ) {
      case 'postgresql-create-database':
        return this.validateCreateDatabase.bind(
          this,
        );

      default:
        return null;
    }
  }

  /* =======================================================
     CREATE DATABASE VALIDATOR

     Required database:

       employee_management

     Hidden tests:

       1. employee_management exists
       2. exact required database name exists
       3. no additional learner-created database exists
  ======================================================= */

  private async validateCreateDatabase(
    context: ValidationContext,
  ): Promise<PostgreSqlValidationResult> {
    const expectedDatabase =
      'employee_management';

    const tests:
      PostgreSqlValidationTestResult[] =
      [];

    /* =====================================================
       READ POSTGRESQL DATABASE CATALOG

       pg_database contains the databases available in
       the PostgreSQL cluster.

       Template databases are excluded.
    ===================================================== */

    const databaseListResult =
      await this.postgresqlSandboxService.executeSql(
        context.sandbox,
        `
SELECT datname
FROM pg_database
WHERE datistemplate = false
ORDER BY datname;
        `.trim(),
      );

    /* =====================================================
       CATALOG INSPECTION FAILURE
    ===================================================== */

    if (
      databaseListResult.exitCode !==
      0
    ) {
      const errorMessage =
        this.cleanError(
          databaseListResult.stderr ||
            databaseListResult.stdout ||
            'Unable to inspect PostgreSQL database catalog.',
        );

      this.logger.error(
        `Unable to inspect PostgreSQL databases for problem "${context.problemSlug}": ${errorMessage}`,
      );

      tests.push({
        name:
          'PostgreSQL database catalog is accessible',

        passed:
          false,

        message:
          'The validation service could not inspect the PostgreSQL database catalog.',
      });

      return this.buildResult(
        tests,
        'Database validation could not be completed.',
      );
    }

    /* =====================================================
       PARSE DATABASE NAMES
    ===================================================== */

    const databases =
      this.parseSingleColumnOutput(
        databaseListResult.stdout,
      );

    this.logger.debug(
      `Databases found for ${context.problemSlug}: ${databases.join(
        ', ',
      )}`,
    );

    /* =====================================================
       TEST 1
       EXPECTED DATABASE EXISTS
    ===================================================== */

    const expectedDatabaseExists =
      databases.includes(
        expectedDatabase,
      );

    tests.push({
      name:
        `Database "${expectedDatabase}" exists`,

      passed:
        expectedDatabaseExists,

      message:
        expectedDatabaseExists
          ? `Database "${expectedDatabase}" exists.`
          : `Expected database "${expectedDatabase}" was not found.`,
    });

    /* =====================================================
       TEST 2
       EXACT DATABASE NAME
    ===================================================== */

    const exactDatabaseNameExists =
      databases.some(
        (
          database,
        ) =>
          database ===
          expectedDatabase,
      );

    tests.push({
      name:
        'Database name matches the requirement',

      passed:
        exactDatabaseNameExists,

      message:
        exactDatabaseNameExists
          ? `Database name is exactly "${expectedDatabase}".`
          : `The required database name is "${expectedDatabase}".`,
    });

    /* =====================================================
       TEST 3
       NO ADDITIONAL LEARNER DATABASES

       PostgreSQL infrastructure database:

         postgres

       E-Lab database:

         learner_db

       template0 and template1 have already been removed
       by:

         WHERE datistemplate = false
    ===================================================== */

    const infrastructureDatabases =
      new Set([
        'postgres',
        'learner_db',
      ]);

    const learnerCreatedDatabases =
      databases.filter(
        (
          database,
        ) =>
          !infrastructureDatabases.has(
            database,
          ),
      );

    const additionalDatabases =
      learnerCreatedDatabases.filter(
        (
          database,
        ) =>
          database !==
          expectedDatabase,
      );

    const noAdditionalDatabases =
      additionalDatabases.length ===
      0;

    tests.push({
      name:
        'No additional databases were created',

      passed:
        noAdditionalDatabases,

      message:
        noAdditionalDatabases
          ? 'No unexpected learner-created databases were found.'
          : `Unexpected database${
              additionalDatabases.length ===
              1
                ? ''
                : 's'
            } found: ${additionalDatabases.join(
              ', ',
            )}.`,
    });

    /* =====================================================
       RESULT
    ===================================================== */

    const allRequirementsPassed =
      expectedDatabaseExists &&
      exactDatabaseNameExists &&
      noAdditionalDatabases;

    return this.buildResult(
      tests,

      allRequirementsPassed
        ? `Database "${expectedDatabase}" was created correctly.`
        : 'The submitted solution does not satisfy all database requirements.',
    );
  }

  /* =======================================================
     PARSE SINGLE-COLUMN PSQL OUTPUT

     Supports output such as:

       employee_management
       learner_db
       postgres

     It also tolerates normal psql formatted output:

       datname
       ---------------------
       employee_management
       learner_db
       postgres
       (3 rows)
  ======================================================= */

  private parseSingleColumnOutput(
    stdout: string,
  ): string[] {
    if (
      !stdout
    ) {
      return [];
    }

    const values =
      stdout
        .split(
          /\r?\n/,
        )
        .map(
          (
            line,
          ) =>
            line.trim(),
        )
        .filter(
          (
            line,
          ) =>
            Boolean(
              line,
            ),
        )
        .filter(
          (
            line,
          ) =>
            !/^[-+]+$/.test(
              line,
            ),
        )
        .filter(
          (
            line,
          ) =>
            !/^\(\d+\s+rows?\)$/i.test(
              line,
            ),
        )
        .filter(
          (
            line,
          ) =>
            line.toLowerCase() !==
            'datname',
        )
        .map(
          (
            line,
          ) => {
            if (
              line.includes(
                '|',
              )
            ) {
              return (
                line
                  .split(
                    '|',
                  )[0]
                  ?.trim() ??
                ''
              );
            }

            return line;
          },
        )
        .filter(
          (
            line,
          ) =>
            Boolean(
              line,
            ),
        );

    return Array.from(
      new Set(
        values,
      ),
    );
  }

  /* =======================================================
     BUILD VALIDATION RESULT
  ======================================================= */

  private buildResult(
    tests:
      PostgreSqlValidationTestResult[],

    message:
      string,
  ): PostgreSqlValidationResult {
    const totalTests =
      tests.length;

    const passedTests =
      tests.filter(
        (
          test,
        ) =>
          test.passed,
      ).length;

    const accepted =
      totalTests >
        0 &&
      passedTests ===
        totalTests;

    const score =
      totalTests ===
      0
        ? 0
        : Math.round(
            (
              passedTests /
              totalTests
            ) *
              100,
          );

    return {
      accepted,

      passedTests,

      totalTests,

      score,

      message,

      tests,
    };
  }

  /* =======================================================
     CLEAN INTERNAL ERROR
  ======================================================= */

  private cleanError(
    message: string,
  ): string {
    const cleaned =
      message
        .trim()
        .replace(
          /\r\n/g,
          '\n',
        );

    if (
      cleaned.length <=
      500
    ) {
      return cleaned;
    }

    return `${cleaned.slice(
      0,
      500,
    )}...`;
  }
}