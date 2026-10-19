/* =========================================================
   MYSQL PRACTICE FIXTURES

   Internal SQL used to prepare each learner sandbox.

   These queries are executed before the learner starts
   solving the problem.

   They must never be displayed in the learner SQL editor.
========================================================= */

export type MysqlFixture = {
  problemSlug: string;

  setupSql: string;
};

/* =========================================================
   EMPLOYEES TABLE
========================================================= */

const createEmployeesTable = `
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  department VARCHAR(100),
  salary DECIMAL(10,2)
);
`;

/* =========================================================
   EMPLOYEES TABLE WITH SAMPLE DATA
========================================================= */

const createEmployeesWithData = `
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
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
  (
    1,
    'Ananya',
    'Engineering',
    65000.00
  ),
  (
    2,
    'Rahul',
    'Finance',
    58000.00
  ),
  (
    3,
    'Meera',
    'Engineering',
    72000.00
  ),
  (
    4,
    'Arjun',
    'HR',
    52000.00
  ),
  (
    5,
    'Kavya',
    'Engineering',
    80000.00
  );
`;

/* =========================================================
   JOIN TABLES

   Used by the JOIN practice problem.

   This version of employees uses department_id instead
   of the department VARCHAR field used by basic problems.
========================================================= */

const createJoinTables = `
CREATE TABLE departments (
  id INTEGER PRIMARY KEY,
  department_name VARCHAR(100) NOT NULL
);

CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  department_id INTEGER,
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
  (
    1,
    'Engineering'
  ),
  (
    2,
    'Finance'
  ),
  (
    3,
    'HR'
  );

INSERT INTO employees (
  id,
  name,
  department_id,
  salary
)
VALUES
  (
    1,
    'Ananya',
    1,
    65000.00
  ),
  (
    2,
    'Rahul',
    2,
    58000.00
  ),
  (
    3,
    'Meera',
    1,
    72000.00
  ),
  (
    4,
    'Arjun',
    3,
    52000.00
  );
`;

/* =========================================================
   TRANSACTION DATA
========================================================= */

const createDepartmentBudgetData = `
CREATE TABLE departments (
  id INTEGER PRIMARY KEY,
  department_name VARCHAR(100) NOT NULL,
  budget DECIMAL(12,2) NOT NULL
);

INSERT INTO departments (
  id,
  department_name,
  budget
)
VALUES
  (
    1,
    'Engineering',
    100000.00
  ),
  (
    2,
    'Finance',
    80000.00
  ),
  (
    3,
    'HR',
    60000.00
  );
`;

/* =========================================================
   MYSQL FIXTURES
========================================================= */

export const mysqlFixtures:
  MysqlFixture[] = [

    /* =====================================================
       CREATE DATABASE

       No fixture is required.

       The learner must create:

       employee_management
    ===================================================== */

    {
      problemSlug:
        'mysql-create-database',

      setupSql:
        '',
    },

    /* =====================================================
       CREATE TABLE

       No fixture is required.

       The learner creates the employees table.
    ===================================================== */

    {
      problemSlug:
        'mysql-create-table',

      setupSql:
        '',
    },

    /* =====================================================
       INSERT RECORDS

       employees exists but contains no rows.
    ===================================================== */

    {
      problemSlug:
        'mysql-insert-records',

      setupSql:
        createEmployeesTable,
    },

    /* =====================================================
       SELECT RECORDS
    ===================================================== */

    {
      problemSlug:
        'mysql-select-records',

      setupSql:
        createEmployeesWithData,
    },

    /* =====================================================
       WHERE FILTER
    ===================================================== */

    {
      problemSlug:
        'mysql-where-filter',

      setupSql:
        createEmployeesWithData,
    },

    /* =====================================================
       UPDATE RECORDS
    ===================================================== */

    {
      problemSlug:
        'mysql-update-records',

      setupSql:
        createEmployeesWithData,
    },

    /* =====================================================
       DELETE RECORDS
    ===================================================== */

    {
      problemSlug:
        'mysql-delete-records',

      setupSql:
        createEmployeesWithData,
    },

    /* =====================================================
       AGGREGATE FUNCTIONS
    ===================================================== */

    {
      problemSlug:
        'mysql-aggregate-functions',

      setupSql:
        createEmployeesWithData,
    },

    /* =====================================================
       GROUP BY
    ===================================================== */

    {
      problemSlug:
        'mysql-group-by',

      setupSql:
        createEmployeesWithData,
    },

    /* =====================================================
       JOIN TABLES
    ===================================================== */

    {
      problemSlug:
        'mysql-join-tables',

      setupSql:
        createJoinTables,
    },

    /* =====================================================
       SUBQUERIES
    ===================================================== */

    {
      problemSlug:
        'mysql-subqueries',

      setupSql:
        createEmployeesWithData,
    },

    /* =====================================================
       VIEWS

       employees must exist before the learner creates
       a view.
    ===================================================== */

    {
      problemSlug:
        'mysql-views',

      setupSql:
        createEmployeesWithData,
    },

    /* =====================================================
       INDEXES

       employees must exist before the learner creates
       an index.
    ===================================================== */

    {
      problemSlug:
        'mysql-indexes',

      setupSql:
        createEmployeesWithData,
    },

    /* =====================================================
       TRANSACTIONS
    ===================================================== */

    {
      problemSlug:
        'mysql-transactions',

      setupSql:
        createDepartmentBudgetData,
    },
  ];

/* =========================================================
   GET MYSQL FIXTURE
========================================================= */

export function getMysqlFixture(
  problemSlug: string,
): MysqlFixture | undefined {
  const normalizedProblemSlug =
    problemSlug
      .trim()
      .toLowerCase();

  return mysqlFixtures.find(
    (
      fixture,
    ) =>
      fixture.problemSlug ===
      normalizedProblemSlug,
  );
}

/* =========================================================
   GET MYSQL FIXTURE SQL

   Returns an empty string when the problem does not need
   any initial database objects.
========================================================= */

export function getMysqlFixtureSql(
  problemSlug: string,
): string {
  return (
    getMysqlFixture(
      problemSlug,
    )?.setupSql ??
    ''
  );
}

/* =========================================================
   CHECK WHETHER A FIXTURE HAS SETUP SQL
========================================================= */

export function hasMysqlFixture(
  problemSlug: string,
): boolean {
  return Boolean(
    getMysqlFixtureSql(
      problemSlug,
    ).trim(),
  );
}