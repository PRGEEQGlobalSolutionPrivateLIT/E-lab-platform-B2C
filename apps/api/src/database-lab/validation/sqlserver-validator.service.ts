import {
  Injectable,
} from '@nestjs/common';

import {
  SqlServerSandboxService,
} from '../sandbox/sqlserver-sandbox.service.js';

import type {
  SqlServerSandbox,
} from '../sandbox/sqlserver-sandbox.service.js';

/* =========================================================
   SQL SERVER VALIDATION RESULT
========================================================= */

export type SqlServerValidationResult = {
  accepted: boolean;
  message: string;
};

/* =========================================================
   SQL SERVER VALIDATOR SERVICE
========================================================= */

@Injectable()
export class SqlServerValidatorService {

  constructor(
    private readonly sandboxService:
      SqlServerSandboxService,
  ) {}

  /* =======================================================
     VALIDATE
  ======================================================= */

  async validate(
    sandbox: SqlServerSandbox,
    problemSlug: string,
  ): Promise<SqlServerValidationResult> {

    switch (problemSlug) {

      case 'sqlserver-create-database':
        return this.validateCreateDatabase(
          sandbox,
        );

      case 'sqlserver-create-table':
        return this.validateCreateTable(
          sandbox,
        );

      case 'sqlserver-insert-records':
        return this.validateInsertRecords(
          sandbox,
        );

      case 'sqlserver-select-records':
        return this.validateSelectRecords(
          sandbox,
        );

      case 'sqlserver-where-filter':
        return this.validateWhereFilter(
          sandbox,
        );

      case 'sqlserver-update-records':
        return this.validateUpdateRecords(
          sandbox,
        );

      case 'sqlserver-delete-records':
        return this.validateDeleteRecords(
          sandbox,
        );

      case 'sqlserver-aggregate-functions':
        return this.validateAggregateFunctions(
          sandbox,
        );

      case 'sqlserver-group-by':
        return this.validateGroupBy(
          sandbox,
        );

      case 'sqlserver-join-tables':
        return this.validateJoinTables(
          sandbox,
        );

      case 'sqlserver-subqueries':
        return this.validateSubqueries(
          sandbox,
        );

      case 'sqlserver-views':
        return this.validateViews(
          sandbox,
        );

      case 'sqlserver-indexes':
        return this.validateIndexes(
          sandbox,
        );

      case 'sqlserver-transactions':
        return this.validateTransactions(
          sandbox,
        );

      default:
        return {
          accepted: false,

          message:
            `SQL Server validation is not configured for problem "${problemSlug}".`,
        };
    }
  }

  /* =======================================================
     CREATE DATABASE
  ======================================================= */

  private async validateCreateDatabase(
    sandbox: SqlServerSandbox,
  ): Promise<SqlServerValidationResult> {

    const exists =
      await this.sandboxService.databaseExists(
        sandbox,
        'employee_management',
      );

    if (!exists) {
      return this.failed(
        'Database employee_management was not found.',
      );
    }

    return this.passed(
      'Database employee_management was created successfully.',
    );
  }

  /* =======================================================
     CREATE TABLE
  ======================================================= */

  private async validateCreateTable(
    sandbox: SqlServerSandbox,
  ): Promise<SqlServerValidationResult> {

    const tables =
      await this.sandboxService.getTables(
        sandbox,
      );

    const exists =
      tables.some(
        (table) =>
          table.toLowerCase() ===
          'employees',
      );

    if (!exists) {
      return this.failed(
        'The employees table was not found.',
      );
    }

    return this.passed(
      'The employees table was created successfully.',
    );
  }

  /* =======================================================
     INSERT RECORDS
  ======================================================= */

  private async validateInsertRecords(
    sandbox: SqlServerSandbox,
  ): Promise<SqlServerValidationResult> {

    const result =
      await this.query(
        sandbox,
        `
SELECT COUNT(*)
FROM employees
WHERE id = 1
  AND name = 'Ananya'
  AND department = 'Engineering'
  AND salary = 65000.00;
        `,
      );

    if (
      !this.hasCount(
        result,
        1,
      )
    ) {
      return this.failed(
        'Expected employee record was not found.',
      );
    }

    return this.passed(
      'Employee record was inserted successfully.',
    );
  }

  /* =======================================================
     SELECT RECORDS
  ======================================================= */

  private async validateSelectRecords(
    sandbox: SqlServerSandbox,
  ): Promise<SqlServerValidationResult> {

    const result =
      await this.query(
        sandbox,
        `
SELECT COUNT(*)
FROM employees;
        `,
      );

    if (!result.ok) {
      return this.failed(
        'Unable to read the employees table.',
      );
    }

    const count =
      this.firstNumber(
        result.output,
      );

    if (
      count === null ||
      count < 1
    ) {
      return this.failed(
        'The employees table does not contain the expected records.',
      );
    }

    return this.passed(
      'Employees table is available for SELECT validation.',
    );
  }

  /* =======================================================
     WHERE FILTER
  ======================================================= */

  private async validateWhereFilter(
    sandbox: SqlServerSandbox,
  ): Promise<SqlServerValidationResult> {

    const result =
      await this.query(
        sandbox,
        `
SELECT COUNT(*)
FROM employees
WHERE department = 'Engineering';
        `,
      );

    if (!result.ok) {
      return this.failed(
        'Unable to validate Engineering employees.',
      );
    }

    const count =
      this.firstNumber(
        result.output,
      );

    if (
      count === null ||
      count < 1
    ) {
      return this.failed(
        'Engineering employees were not found.',
      );
    }

    return this.passed(
      'Engineering employees were found successfully.',
    );
  }

  /* =======================================================
     UPDATE RECORDS
  ======================================================= */

  private async validateUpdateRecords(
    sandbox: SqlServerSandbox,
  ): Promise<SqlServerValidationResult> {

    const result =
      await this.query(
        sandbox,
        `
SELECT COUNT(*)
FROM employees
WHERE id = 1
  AND salary = 75000.00;
        `,
      );

    if (
      !this.hasCount(
        result,
        1,
      )
    ) {
      return this.failed(
        'Employee id 1 does not have salary 75000.00.',
      );
    }

    return this.passed(
      'Employee salary was updated successfully.',
    );
  }

  /* =======================================================
     DELETE RECORDS
  ======================================================= */

  private async validateDeleteRecords(
    sandbox: SqlServerSandbox,
  ): Promise<SqlServerValidationResult> {

    const deleted =
      await this.query(
        sandbox,
        `
SELECT COUNT(*)
FROM employees
WHERE id = 3;
        `,
      );

    if (
      !this.hasCount(
        deleted,
        0,
      )
    ) {
      return this.failed(
        'Employee id 3 still exists.',
      );
    }

    const remaining =
      await this.query(
        sandbox,
        `
SELECT COUNT(*)
FROM employees;
        `,
      );

    if (
      !this.hasCount(
        remaining,
        4,
      )
    ) {
      return this.failed(
        'Unexpected employee records were deleted.',
      );
    }

    return this.passed(
      'Employee id 3 was deleted successfully.',
    );
  }

  /* =======================================================
     AGGREGATE FUNCTIONS
  ======================================================= */

  private async validateAggregateFunctions(
    sandbox: SqlServerSandbox,
  ): Promise<SqlServerValidationResult> {

    const result =
      await this.query(
        sandbox,
        `
SELECT AVG(salary)
FROM employees;
        `,
      );

    if (!result.ok) {
      return this.failed(
        'Unable to calculate average salary.',
      );
    }

    const average =
      this.firstNumber(
        result.output,
      );

    if (average === null) {
      return this.failed(
        'Average salary could not be calculated.',
      );
    }

    return this.passed(
      'Aggregate calculation succeeded.',
    );
  }

  /* =======================================================
     GROUP BY
  ======================================================= */

  private async validateGroupBy(
    sandbox: SqlServerSandbox,
  ): Promise<SqlServerValidationResult> {

    const result =
      await this.query(
        sandbox,
        `
SELECT
  department,
  COUNT(*) AS employee_count
FROM employees
GROUP BY department
ORDER BY department;
        `,
      );

    if (!result.ok) {
      return this.failed(
        'Unable to group employees by department.',
      );
    }

    const output =
      result.output.toLowerCase();

    if (
      !output.includes(
        'engineering',
      ) ||
      !output.includes(
        'finance',
      ) ||
      !output.includes(
        'hr',
      )
    ) {
      return this.failed(
        'Expected department groups were not found.',
      );
    }

    return this.passed(
      'Employees were grouped successfully.',
    );
  }

  /* =======================================================
     JOIN TABLES
  ======================================================= */

  private async validateJoinTables(
    sandbox: SqlServerSandbox,
  ): Promise<SqlServerValidationResult> {

    const result =
      await this.query(
        sandbox,
        `
SELECT COUNT(*)
FROM employees AS e
INNER JOIN departments AS d
  ON e.department_id = d.id;
        `,
      );

    if (
      !this.hasCount(
        result,
        4,
      )
    ) {
      return this.failed(
        'Employees and departments join validation failed.',
      );
    }

    return this.passed(
      'Employees and departments join correctly.',
    );
  }

  /* =======================================================
     SUBQUERIES
  ======================================================= */

  private async validateSubqueries(
    sandbox: SqlServerSandbox,
  ): Promise<SqlServerValidationResult> {

    const result =
      await this.query(
        sandbox,
        `
SELECT COUNT(*)
FROM employees
WHERE salary > (
  SELECT AVG(salary)
  FROM employees
);
        `,
      );

    if (!result.ok) {
      return this.failed(
        'Unable to validate the subquery.',
      );
    }

    const count =
      this.firstNumber(
        result.output,
      );

    if (
      count === null ||
      count < 1
    ) {
      return this.failed(
        'No employees were found above the average salary.',
      );
    }

    return this.passed(
      'Subquery validation succeeded.',
    );
  }

  /* =======================================================
     VIEWS
  ======================================================= */

  private async validateViews(
    sandbox: SqlServerSandbox,
  ): Promise<SqlServerValidationResult> {

    const views =
      await this.sandboxService.getViews(
        sandbox,
      );

    const exists =
      views.some(
        (view) =>
          view.toLowerCase() ===
          'engineering_employees',
      );

    if (!exists) {
      return this.failed(
        'View engineering_employees was not found.',
      );
    }

    const result =
      await this.query(
        sandbox,
        `
SELECT COUNT(*)
FROM engineering_employees
WHERE department <> 'Engineering'
   OR department IS NULL;
        `,
      );

    if (
      !this.hasCount(
        result,
        0,
      )
    ) {
      return this.failed(
        'engineering_employees contains invalid records.',
      );
    }

    return this.passed(
      'engineering_employees view was created correctly.',
    );
  }

  /* =======================================================
     INDEXES
  ======================================================= */

  private async validateIndexes(
    sandbox: SqlServerSandbox,
  ): Promise<SqlServerValidationResult> {

    const indexes =
      await this.sandboxService.getIndexes(
        sandbox,
      );

    const exists =
      indexes.some(
        (index) =>
          index.toLowerCase() ===
          'idx_employees_name',
      );

    if (!exists) {
      return this.failed(
        'Index idx_employees_name was not found.',
      );
    }

    const result =
      await this.query(
        sandbox,
        `
SELECT COUNT(*)
FROM sys.indexes AS i
INNER JOIN sys.index_columns AS ic
  ON i.object_id = ic.object_id
  AND i.index_id = ic.index_id
INNER JOIN sys.columns AS c
  ON ic.object_id = c.object_id
  AND ic.column_id = c.column_id
INNER JOIN sys.tables AS t
  ON i.object_id = t.object_id
WHERE i.name = 'idx_employees_name'
  AND t.name = 'employees'
  AND c.name = 'name';
        `,
      );

    if (
      !this.hasCount(
        result,
        1,
      )
    ) {
      return this.failed(
        'idx_employees_name is not configured on employees.name.',
      );
    }

    return this.passed(
      'idx_employees_name was created correctly.',
    );
  }

  /* =======================================================
     TRANSACTIONS
  ======================================================= */

  private async validateTransactions(
    sandbox: SqlServerSandbox,
  ): Promise<SqlServerValidationResult> {

    const first =
      await this.query(
        sandbox,
        `
SELECT COUNT(*)
FROM departments
WHERE id = 1
  AND budget = 95000.00;
        `,
      );

    if (
      !this.hasCount(
        first,
        1,
      )
    ) {
      return this.failed(
        'Department id 1 does not have the expected budget.',
      );
    }

    const second =
      await this.query(
        sandbox,
        `
SELECT COUNT(*)
FROM departments
WHERE id = 2
  AND budget = 85000.00;
        `,
      );

    if (
      !this.hasCount(
        second,
        1,
      )
    ) {
      return this.failed(
        'Department id 2 does not have the expected budget.',
      );
    }

    return this.passed(
      'Transaction completed successfully.',
    );
  }

  /* =======================================================
     QUERY HELPER
  ======================================================= */

  private async query(
    sandbox: SqlServerSandbox,
    sql: string,
  ): Promise<{
    ok: boolean;
    output: string;
  }> {

    const result =
      await this.sandboxService.executeSql(
        sandbox,
        sql.trim(),
      );

    return {
      ok:
        result.exitCode === 0,

      output:
        result.stdout,
    };
  }

  /* =======================================================
     COUNT HELPER
  ======================================================= */

  private hasCount(
    result: {
      ok: boolean;
      output: string;
    },
    expected: number,
  ): boolean {

    if (!result.ok) {
      return false;
    }

    return (
      this.firstNumber(
        result.output,
      ) === expected
    );
  }

  /* =======================================================
     NUMBER PARSER
  ======================================================= */

  private firstNumber(
    output: string,
  ): number | null {

    const match =
      output.match(
        /-?\d+(?:\.\d+)?/,
      );

    if (!match) {
      return null;
    }

    const value =
      Number(
        match[0],
      );

    return Number.isFinite(
      value,
    )
      ? value
      : null;
  }

  /* =======================================================
     RESULT HELPERS
  ======================================================= */

  private passed(
    message: string,
  ): SqlServerValidationResult {

    return {
      accepted: true,
      message,
    };
  }

  private failed(
    message: string,
  ): SqlServerValidationResult {

    return {
      accepted: false,
      message,
    };
  }
}