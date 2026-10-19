import {
  BadRequestException,
  Injectable,
  Logger,
} from '@nestjs/common';

import {
  MysqlSandboxService,
} from '../sandbox/mysql-sandbox.service.js';

import type {
  MysqlSandbox,
} from '../sandbox/mysql-sandbox.service.js';

export type MysqlValidationTestResult = {
  name: string;
  passed: boolean;
  message?: string;
};

export type MysqlValidationResult = {
  accepted: boolean;
  passedTests: number;
  totalTests: number;
  score: number;
  message: string;
  tests: MysqlValidationTestResult[];
};

type ValidationContext = {
  problemSlug: string;
  sandbox: MysqlSandbox;
};

type ProblemValidator = (
  context: ValidationContext,
) => Promise<MysqlValidationResult>;

type MysqlColumnInfo = {
  columnName: string;
  dataType: string;
  columnType: string;
  isNullable: string;
  columnKey: string;
  ordinalPosition: number;
};

@Injectable()
export class MysqlValidatorService {
  private readonly logger = new Logger(
    MysqlValidatorService.name,
  );

  constructor(
    private readonly mysqlSandboxService: MysqlSandboxService,
  ) {}

  async validateState(
    problemSlug: string,
    sandbox: MysqlSandbox,
  ): Promise<MysqlValidationResult> {
    const normalizedProblemSlug = problemSlug
      .trim()
      .toLowerCase();

    if (!normalizedProblemSlug) {
      throw new BadRequestException(
        'problemSlug is required for database validation.',
      );
    }

    this.logger.log(
      `Validating MySQL state for problem "${normalizedProblemSlug}".`,
    );

    const validator = this.getProblemValidator(
      normalizedProblemSlug,
    );

    if (!validator) {
      throw new BadRequestException(
        `MySQL validation is not configured for problem "${normalizedProblemSlug}".`,
      );
    }

    return validator({
      problemSlug: normalizedProblemSlug,
      sandbox,
    });
  }

  private getProblemValidator(
    problemSlug: string,
  ): ProblemValidator | null {
    switch (problemSlug) {
      case 'mysql-create-database':
        return this.validateCreateDatabase.bind(this);

      case 'mysql-create-table':
        return this.validateCreateTable.bind(this);

      default:
        return null;
    }
  }

  private async validateCreateDatabase(
    context: ValidationContext,
  ): Promise<MysqlValidationResult> {
    const expectedDatabase = 'employee_management';
    const tests: MysqlValidationTestResult[] = [];

    const databaseListResult =
      await this.mysqlSandboxService.executeSql(
        context.sandbox,
        `
SELECT schema_name
FROM information_schema.schemata
ORDER BY schema_name;
        `.trim(),
      );

    if (databaseListResult.exitCode !== 0) {
      const errorMessage = this.cleanError(
        databaseListResult.stderr ||
          databaseListResult.stdout ||
          'Unable to inspect MySQL database catalog.',
      );

      this.logger.error(
        `Unable to inspect MySQL databases for problem "${context.problemSlug}": ${errorMessage}`,
      );

      tests.push({
        name: 'MySQL database catalog is accessible',
        passed: false,
        message:
          'The validation service could not inspect the MySQL database catalog.',
      });

      return this.buildResult(
        tests,
        'Database validation could not be completed.',
      );
    }

    const databases = this.parseSingleColumnOutput(
      databaseListResult.stdout,
    );

    const expectedDatabaseExists =
      databases.includes(expectedDatabase);

    tests.push({
      name: `Database "${expectedDatabase}" exists`,
      passed: expectedDatabaseExists,
      message: expectedDatabaseExists
        ? `Database "${expectedDatabase}" exists.`
        : `Expected database "${expectedDatabase}" was not found.`,
    });

    const exactDatabaseNameExists = databases.some(
      (database) => database === expectedDatabase,
    );

    tests.push({
      name: 'Database name matches the requirement',
      passed: exactDatabaseNameExists,
      message: exactDatabaseNameExists
        ? `Database name is exactly "${expectedDatabase}".`
        : `The required database name is "${expectedDatabase}".`,
    });

    const infrastructureDatabases = new Set([
      'information_schema',
      'mysql',
      'performance_schema',
      'sys',
      'learner_db',
    ]);

    const learnerCreatedDatabases = databases.filter(
      (database) =>
        !infrastructureDatabases.has(database),
    );

    const additionalDatabases =
      learnerCreatedDatabases.filter(
        (database) =>
          database !== expectedDatabase,
      );

    const noAdditionalDatabases =
      additionalDatabases.length === 0;

    tests.push({
      name: 'No additional databases were created',
      passed: noAdditionalDatabases,
      message: noAdditionalDatabases
        ? 'No unexpected learner-created databases were found.'
        : `Unexpected database${
            additionalDatabases.length === 1 ? '' : 's'
          } found: ${additionalDatabases.join(', ')}.`,
    });

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

  private async validateCreateTable(
    context: ValidationContext,
  ): Promise<MysqlValidationResult> {
    const expectedTable = 'employees';
    const tests: MysqlValidationTestResult[] = [];

    const tableResult =
      await this.mysqlSandboxService.executeSql(
        context.sandbox,
        `
SELECT table_name
FROM information_schema.tables
WHERE table_schema = DATABASE()
  AND table_name = '${expectedTable}';
        `.trim(),
      );

    if (tableResult.exitCode !== 0) {
      const errorMessage = this.cleanError(
        tableResult.stderr ||
          tableResult.stdout ||
          'Unable to inspect the MySQL table catalog.',
      );

      this.logger.error(
        `Unable to inspect MySQL table "${expectedTable}" for problem "${context.problemSlug}": ${errorMessage}`,
      );

      tests.push({
        name: `Table "${expectedTable}" exists`,
        passed: false,
        message:
          'The validation service could not inspect the MySQL table catalog.',
      });

      return this.buildResult(
        tests,
        'Table validation could not be completed.',
      );
    }

    const tableNames = this.parseSingleColumnOutput(
      tableResult.stdout,
    );

    const tableExists =
      tableNames.includes(expectedTable);

    tests.push({
      name: `Table "${expectedTable}" exists`,
      passed: tableExists,
      message: tableExists
        ? `Table "${expectedTable}" exists.`
        : `Expected table "${expectedTable}" was not found.`,
    });

    if (!tableExists) {
      return this.buildResult(
        tests,
        `Table "${expectedTable}" was not created correctly.`,
      );
    }

    const columnResult =
      await this.mysqlSandboxService.executeSql(
        context.sandbox,
        `
SELECT
  column_name,
  data_type,
  column_type,
  is_nullable,
  column_key,
  ordinal_position
FROM information_schema.columns
WHERE table_schema = DATABASE()
  AND table_name = '${expectedTable}'
ORDER BY ordinal_position;
        `.trim(),
      );

    if (columnResult.exitCode !== 0) {
      const errorMessage = this.cleanError(
        columnResult.stderr ||
          columnResult.stdout ||
          'Unable to inspect MySQL table columns.',
      );

      this.logger.error(
        `Unable to inspect columns for "${expectedTable}": ${errorMessage}`,
      );

      tests.push({
        name: 'Table columns are accessible',
        passed: false,
        message:
          'The validation service could not inspect the table columns.',
      });

      return this.buildResult(
        tests,
        'Table validation could not be completed.',
      );
    }

    const columns = this.parseColumnOutput(
      columnResult.stdout,
    );

    const idColumn = columns.find(
      (column) => column.columnName === 'id',
    );

    const nameColumn = columns.find(
      (column) => column.columnName === 'name',
    );

    const departmentColumn = columns.find(
      (column) =>
        column.columnName === 'department',
    );

    const salaryColumn = columns.find(
      (column) => column.columnName === 'salary',
    );

    const hasExactlyRequiredColumns =
      columns.length === 4 &&
      Boolean(idColumn) &&
      Boolean(nameColumn) &&
      Boolean(departmentColumn) &&
      Boolean(salaryColumn);

    tests.push({
      name: 'Table contains exactly the four required columns',
      passed: hasExactlyRequiredColumns,
      message: hasExactlyRequiredColumns
        ? 'The employees table contains id, name, department and salary only.'
        : 'The employees table must contain exactly id, name, department and salary.',
    });

    const idIsCorrect =
      idColumn?.dataType === 'int' &&
      idColumn.columnKey === 'PRI';

    tests.push({
      name: 'id is INTEGER PRIMARY KEY',
      passed: idIsCorrect,
      message: idIsCorrect
        ? 'id is INTEGER and PRIMARY KEY.'
        : 'id must be INTEGER and PRIMARY KEY.',
    });

    const nameIsCorrect =
      nameColumn?.dataType === 'varchar' &&
      nameColumn.columnType.toLowerCase() ===
        'varchar(100)' &&
      nameColumn.isNullable === 'NO';

    tests.push({
      name: 'name is VARCHAR(100) NOT NULL',
      passed: nameIsCorrect,
      message: nameIsCorrect
        ? 'name is VARCHAR(100) and NOT NULL.'
        : 'name must be VARCHAR(100) and NOT NULL.',
    });

    const departmentIsCorrect =
      departmentColumn?.dataType === 'varchar' &&
      departmentColumn.columnType.toLowerCase() ===
        'varchar(100)';

    tests.push({
      name: 'department is VARCHAR(100)',
      passed: departmentIsCorrect,
      message: departmentIsCorrect
        ? 'department is VARCHAR(100).'
        : 'department must be VARCHAR(100).',
    });

    const salaryIsCorrect =
      salaryColumn?.dataType === 'decimal' &&
      salaryColumn.columnType.toLowerCase() ===
        'decimal(10,2)';

    tests.push({
      name: 'salary is DECIMAL(10,2)',
      passed: salaryIsCorrect,
      message: salaryIsCorrect
        ? 'salary is DECIMAL(10,2).'
        : 'salary must be DECIMAL(10,2).',
    });

    const allRequirementsPassed =
      tableExists &&
      hasExactlyRequiredColumns &&
      idIsCorrect &&
      nameIsCorrect &&
      departmentIsCorrect &&
      salaryIsCorrect;

    return this.buildResult(
      tests,
      allRequirementsPassed
        ? 'The employees table was created correctly.'
        : 'The submitted solution does not satisfy all table requirements.',
    );
  }

  private parseColumnOutput(
    stdout: string,
  ): MysqlColumnInfo[] {
    if (!stdout) {
      return [];
    }

    return stdout
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => line.split('\t'))
      .filter((parts) => parts.length >= 6)
      .map((parts) => ({
        columnName: parts[0]?.trim() ?? '',
        dataType:
          parts[1]?.trim().toLowerCase() ?? '',
        columnType:
          parts[2]?.trim().toLowerCase() ?? '',
        isNullable:
          parts[3]?.trim().toUpperCase() ?? '',
        columnKey:
          parts[4]?.trim().toUpperCase() ?? '',
        ordinalPosition: Number(
          parts[5]?.trim() ?? '0',
        ),
      }))
      .filter(
        (column) =>
          Boolean(column.columnName) &&
          Number.isFinite(
            column.ordinalPosition,
          ),
      );
  }

  private parseSingleColumnOutput(
    stdout: string,
  ): string[] {
    if (!stdout) {
      return [];
    }

    const values = stdout
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .filter(
        (line) => !/^[-+]+$/.test(line),
      )
      .filter(
        (line) =>
          !/^\(\d+\s+rows?\)$/i.test(line),
      )
      .filter(
        (line) =>
          ![
            'datname',
            'schema_name',
            'table_name',
          ].includes(line.toLowerCase()),
      )
      .map((line) => {
        if (line.includes('|')) {
          return (
            line.split('|')[0]?.trim() ?? ''
          );
        }

        return line;
      })
      .filter(Boolean);

    return Array.from(new Set(values));
  }

  private buildResult(
    tests: MysqlValidationTestResult[],
    message: string,
  ): MysqlValidationResult {
    const totalTests = tests.length;

    const passedTests = tests.filter(
      (test) => test.passed,
    ).length;

    const accepted =
      totalTests > 0 &&
      passedTests === totalTests;

    const score =
      totalTests === 0
        ? 0
        : Math.round(
            (passedTests / totalTests) * 100,
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

  private cleanError(
    message: string,
  ): string {
    const cleaned = message
      .trim()
      .replace(/\r\n/g, '\n');

    if (cleaned.length <= 500) {
      return cleaned;
    }

    return `${cleaned.slice(0, 500)}...`;
  }
}
