/* =========================================================
   SQL SERVER PRACTICE FIXTURES

   INTERNAL sandbox setup SQL.

   These queries are executed before the learner starts
   the corresponding SQL Server problem.

   They must never be displayed in the learner editor.
========================================================= */

export type SqlServerFixture = {
  problemSlug: string;
  setupSql: string;
};

/* =========================================================
   COMMON EMPLOYEE TABLE
========================================================= */

const createEmployeesTable = `
CREATE TABLE employees (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  department VARCHAR(100),
  salary DECIMAL(10,2)
);
`;

/* =========================================================
   COMMON EMPLOYEE DATA
========================================================= */

const createEmployeesWithData = `
CREATE TABLE employees (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  department VARCHAR(100),
  salary DECIMAL(10,2)
);

INSERT INTO employees (
  id,
  name,
  department,
  salary
)
VALUES
  (1, 'Ananya', 'Engineering', 65000.00),
  (2, 'Rahul', 'Finance', 58000.00),
  (3, 'Meera', 'Engineering', 72000.00),
  (4, 'Arjun', 'HR', 52000.00),
  (5, 'Kavya', 'Engineering', 80000.00);
`;

/* =========================================================
   JOIN DATA
========================================================= */

const createJoinTables = `
CREATE TABLE departments (
  id INT PRIMARY KEY,
  department_name VARCHAR(100) NOT NULL
);

CREATE TABLE employees (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  department_id INT,
  salary DECIMAL(10,2),

  CONSTRAINT fk_employee_department
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
);

INSERT INTO departments (
  id,
  department_name
)
VALUES
  (1, 'Engineering'),
  (2, 'Finance'),
  (3, 'HR');

INSERT INTO employees (
  id,
  name,
  department_id,
  salary
)
VALUES
  (1, 'Ananya', 1, 65000.00),
  (2, 'Rahul', 2, 58000.00),
  (3, 'Meera', 1, 72000.00),
  (4, 'Arjun', 3, 52000.00);
`;

/* =========================================================
   TRANSACTION DATA
========================================================= */

const createDepartmentBudgetData = `
CREATE TABLE departments (
  id INT PRIMARY KEY,
  department_name VARCHAR(100) NOT NULL,
  budget DECIMAL(12,2) NOT NULL
);

INSERT INTO departments (
  id,
  department_name,
  budget
)
VALUES
  (1, 'Engineering', 100000.00),
  (2, 'Finance', 80000.00),
  (3, 'HR', 60000.00);
`;

/* =========================================================
   FIXTURES
========================================================= */

export const sqlserverFixtures:
  SqlServerFixture[] = [

    /* -----------------------------------------------------
       CREATE DATABASE
    ----------------------------------------------------- */

    {
      problemSlug:
        'sqlserver-create-database',

      setupSql:
        '',
    },

    /* -----------------------------------------------------
       CREATE TABLE
    ----------------------------------------------------- */

    {
      problemSlug:
        'sqlserver-create-table',

      setupSql:
        '',
    },

    /* -----------------------------------------------------
       INSERT RECORDS
    ----------------------------------------------------- */

    {
      problemSlug:
        'sqlserver-insert-records',

      setupSql:
        createEmployeesTable,
    },

    /* -----------------------------------------------------
       SELECT RECORDS
    ----------------------------------------------------- */

    {
      problemSlug:
        'sqlserver-select-records',

      setupSql:
        createEmployeesWithData,
    },

    /* -----------------------------------------------------
       WHERE FILTER
    ----------------------------------------------------- */

    {
      problemSlug:
        'sqlserver-where-filter',

      setupSql:
        createEmployeesWithData,
    },

    /* -----------------------------------------------------
       UPDATE RECORDS
    ----------------------------------------------------- */

    {
      problemSlug:
        'sqlserver-update-records',

      setupSql:
        createEmployeesWithData,
    },

    /* -----------------------------------------------------
       DELETE RECORDS
    ----------------------------------------------------- */

    {
      problemSlug:
        'sqlserver-delete-records',

      setupSql:
        createEmployeesWithData,
    },

    /* -----------------------------------------------------
       AGGREGATE FUNCTIONS
    ----------------------------------------------------- */

    {
      problemSlug:
        'sqlserver-aggregate-functions',

      setupSql:
        createEmployeesWithData,
    },

    /* -----------------------------------------------------
       GROUP BY
    ----------------------------------------------------- */

    {
      problemSlug:
        'sqlserver-group-by',

      setupSql:
        createEmployeesWithData,
    },

    /* -----------------------------------------------------
       JOIN TABLES
    ----------------------------------------------------- */

    {
      problemSlug:
        'sqlserver-join-tables',

      setupSql:
        createJoinTables,
    },

    /* -----------------------------------------------------
       SUBQUERIES
    ----------------------------------------------------- */

    {
      problemSlug:
        'sqlserver-subqueries',

      setupSql:
        createEmployeesWithData,
    },

    /* -----------------------------------------------------
       VIEWS
    ----------------------------------------------------- */

    {
      problemSlug:
        'sqlserver-views',

      setupSql:
        createEmployeesWithData,
    },

    /* -----------------------------------------------------
       INDEXES
    ----------------------------------------------------- */

    {
      problemSlug:
        'sqlserver-indexes',

      setupSql:
        createEmployeesWithData,
    },

    /* -----------------------------------------------------
       TRANSACTIONS
    ----------------------------------------------------- */

    {
      problemSlug:
        'sqlserver-transactions',

      setupSql:
        createDepartmentBudgetData,
    },
  ];

/* =========================================================
   GET FIXTURE
========================================================= */

export function getSqlServerFixture(
  problemSlug: string,
): SqlServerFixture | undefined {

  return sqlserverFixtures.find(
    (
      fixture,
    ) =>
      fixture.problemSlug ===
      problemSlug,
  );
}

/* =========================================================
   GET FIXTURE SQL

   IMPORTANT:
   This function is EXPORTED from this file.

   sqlserver-sandbox.service.ts imports this function.
========================================================= */

export function getSqlServerFixtureSql(
  problemSlug: string,
): string {

  return (
    getSqlServerFixture(
      problemSlug,
    )?.setupSql ??
    ''
  );
}

/* =========================================================
   HAS FIXTURE
========================================================= */

export function hasSqlServerFixture(
  problemSlug: string,
): boolean {

  return Boolean(
    getSqlServerFixtureSql(
      problemSlug,
    ).trim(),
  );
}