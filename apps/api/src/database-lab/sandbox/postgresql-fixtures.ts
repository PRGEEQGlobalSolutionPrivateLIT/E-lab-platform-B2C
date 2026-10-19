/* =========================================================
   POSTGRESQL PRACTICE FIXTURES

   These are INTERNAL sandbox setup queries.

   They are executed before the learner starts the problem.

   They must never be shown in the learner SQL editor.
========================================================= */

export type PostgreSqlFixture = {
  problemSlug: string;
  setupSql: string;
};

/* =========================================================
   COMMON EMPLOYEE DATA
========================================================= */

const createEmployeesTable = `
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  department VARCHAR(100),
  salary DECIMAL(10,2)
);
`;

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
   JOIN DATA

   JOIN problem uses department_id rather than the
   department VARCHAR column used by the basic exercises.
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
   FIXTURES
========================================================= */

export const postgresqlFixtures:
  PostgreSqlFixture[] = [

    /* -----------------------------------------------------
       CREATE DATABASE

       No fixture required.
    ----------------------------------------------------- */

    {
      problemSlug:
        'postgresql-create-database',

      setupSql:
        '',
    },

    /* -----------------------------------------------------
       CREATE TABLE

       Learner must create employees themselves.
    ----------------------------------------------------- */

    {
      problemSlug:
        'postgresql-create-table',

      setupSql:
        '',
    },

    /* -----------------------------------------------------
       INSERT

       Table exists but contains no records.
    ----------------------------------------------------- */

    {
      problemSlug:
        'postgresql-insert-records',

      setupSql:
        createEmployeesTable,
    },

    /* -----------------------------------------------------
       SELECT
    ----------------------------------------------------- */

    {
      problemSlug:
        'postgresql-select-records',

      setupSql:
        createEmployeesWithData,
    },

    /* -----------------------------------------------------
       WHERE
    ----------------------------------------------------- */

    {
      problemSlug:
        'postgresql-where-filter',

      setupSql:
        createEmployeesWithData,
    },

    /* -----------------------------------------------------
       UPDATE
    ----------------------------------------------------- */

    {
      problemSlug:
        'postgresql-update-records',

      setupSql:
        createEmployeesWithData,
    },

    /* -----------------------------------------------------
       DELETE
    ----------------------------------------------------- */

    {
      problemSlug:
        'postgresql-delete-records',

      setupSql:
        createEmployeesWithData,
    },

    /* -----------------------------------------------------
       AGGREGATE
    ----------------------------------------------------- */

    {
      problemSlug:
        'postgresql-aggregate-functions',

      setupSql:
        createEmployeesWithData,
    },

    /* -----------------------------------------------------
       GROUP BY
    ----------------------------------------------------- */

    {
      problemSlug:
        'postgresql-group-by',

      setupSql:
        createEmployeesWithData,
    },

    /* -----------------------------------------------------
       JOIN
    ----------------------------------------------------- */

    {
      problemSlug:
        'postgresql-join-tables',

      setupSql:
        createJoinTables,
    },

    /* -----------------------------------------------------
       SUBQUERY
    ----------------------------------------------------- */

    {
      problemSlug:
        'postgresql-subqueries',

      setupSql:
        createEmployeesWithData,
    },

    /* -----------------------------------------------------
       VIEW

       employees must exist before learner creates view.
    ----------------------------------------------------- */

    {
      problemSlug:
        'postgresql-views',

      setupSql:
        createEmployeesWithData,
    },

    /* -----------------------------------------------------
       INDEX

       employees must exist before learner creates index.
    ----------------------------------------------------- */

    {
      problemSlug:
        'postgresql-indexes',

      setupSql:
        createEmployeesWithData,
    },

    /* -----------------------------------------------------
       TRANSACTION
    ----------------------------------------------------- */

    {
      problemSlug:
        'postgresql-transactions',

      setupSql:
        createDepartmentBudgetData,
    },
  ];

/* =========================================================
   GET FIXTURE
========================================================= */

export function getPostgresqlFixture(
  problemSlug: string,
): PostgreSqlFixture | undefined {
  return postgresqlFixtures.find(
    (
      fixture,
    ) =>
      fixture.problemSlug ===
      problemSlug,
  );
}

/* =========================================================
   GET SETUP SQL

   Returns an empty string when the problem does not require
   initial database objects.
========================================================= */

export function getPostgresqlFixtureSql(
  problemSlug: string,
): string {
  return (
    getPostgresqlFixture(
      problemSlug,
    )?.setupSql ??
    ''
  );
}

/* =========================================================
   CHECK WHETHER FIXTURE EXISTS
========================================================= */

export function hasPostgresqlFixture(
  problemSlug: string,
): boolean {
  return Boolean(
    getPostgresqlFixtureSql(
      problemSlug,
    ).trim(),
  );
}