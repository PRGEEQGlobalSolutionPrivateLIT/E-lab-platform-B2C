/* =========================================================
   MONGODB PRACTICE FIXTURES

   INTERNAL sandbox setup JavaScript.

   These commands prepare the MongoDB sandbox before the
   learner runs/submits a MongoDB problem.

   They must never be displayed in the learner editor.
========================================================= */

export type MongoDbFixture = {
  problemSlug: string;
  setupScript: string;
};

/* =========================================================
   COMMON EMPLOYEE DATA
========================================================= */

const createEmployeesCollection = `
db.createCollection('employees');
`;

const createEmployeesWithData = `
db.createCollection('employees');

db.employees.insertMany([
  {
    employeeId: 1,
    name: 'Ananya',
    department: 'Engineering',
    salary: 65000
  },
  {
    employeeId: 2,
    name: 'Rahul',
    department: 'Finance',
    salary: 58000
  },
  {
    employeeId: 3,
    name: 'Meera',
    department: 'Engineering',
    salary: 72000
  },
  {
    employeeId: 4,
    name: 'Arjun',
    department: 'HR',
    salary: 52000
  },
  {
    employeeId: 5,
    name: 'Kavya',
    department: 'Engineering',
    salary: 80000
  }
]);
`;

/* =========================================================
   LOOKUP DATA
========================================================= */

const createLookupData = `
db.createCollection('departments');

db.departments.insertMany([
  {
    departmentId: 1,
    departmentName: 'Engineering'
  },
  {
    departmentId: 2,
    departmentName: 'Finance'
  },
  {
    departmentId: 3,
    departmentName: 'HR'
  }
]);

db.createCollection('employees');

db.employees.insertMany([
  {
    employeeId: 1,
    name: 'Ananya',
    departmentId: 1,
    salary: 65000
  },
  {
    employeeId: 2,
    name: 'Rahul',
    departmentId: 2,
    salary: 58000
  },
  {
    employeeId: 3,
    name: 'Meera',
    departmentId: 1,
    salary: 72000
  },
  {
    employeeId: 4,
    name: 'Arjun',
    departmentId: 3,
    salary: 52000
  }
]);
`;

/* =========================================================
   FIXTURES
========================================================= */

export const mongodbFixtures:
  MongoDbFixture[] = [

    /* -----------------------------------------------------
       CREATE DATABASE

       No fixture is required.

       MongoDB creates a database when data is first written.
       The learner selects employee_management.
    ----------------------------------------------------- */

    {
      problemSlug:
        'mongodb-create-database',

      setupScript:
        '',
    },

    /* -----------------------------------------------------
       CREATE COLLECTION

       Database exists logically, but employees should not.
    ----------------------------------------------------- */

    {
      problemSlug:
        'mongodb-create-collection',

      setupScript:
        '',
    },

    /* -----------------------------------------------------
       INSERT ONE
    ----------------------------------------------------- */

    {
      problemSlug:
        'mongodb-insert-one',

      setupScript:
        createEmployeesCollection,
    },

    /* -----------------------------------------------------
       INSERT MANY
    ----------------------------------------------------- */

    {
      problemSlug:
        'mongodb-insert-many',

      setupScript:
        createEmployeesCollection,
    },

    /* -----------------------------------------------------
       FIND
    ----------------------------------------------------- */

    {
      problemSlug:
        'mongodb-find-documents',

      setupScript:
        createEmployeesWithData,
    },

    /* -----------------------------------------------------
       FILTER
    ----------------------------------------------------- */

    {
      problemSlug:
        'mongodb-filter-documents',

      setupScript:
        createEmployeesWithData,
    },

    /* -----------------------------------------------------
       COMPARISON OPERATORS
    ----------------------------------------------------- */

    {
      problemSlug:
        'mongodb-comparison-operators',

      setupScript:
        createEmployeesWithData,
    },

    /* -----------------------------------------------------
       UPDATE ONE
    ----------------------------------------------------- */

    {
      problemSlug:
        'mongodb-update-one',

      setupScript:
        createEmployeesWithData,
    },

    /* -----------------------------------------------------
       UPDATE MANY
    ----------------------------------------------------- */

    {
      problemSlug:
        'mongodb-update-many',

      setupScript:
        createEmployeesWithData,
    },

    /* -----------------------------------------------------
       DELETE ONE
    ----------------------------------------------------- */

    {
      problemSlug:
        'mongodb-delete-one',

      setupScript:
        createEmployeesWithData,
    },

    /* -----------------------------------------------------
       PROJECTION
    ----------------------------------------------------- */

    {
      problemSlug:
        'mongodb-projection',

      setupScript:
        createEmployeesWithData,
    },

    /* -----------------------------------------------------
       SORT + LIMIT
    ----------------------------------------------------- */

    {
      problemSlug:
        'mongodb-sort-limit',

      setupScript:
        createEmployeesWithData,
    },

    /* -----------------------------------------------------
       AGGREGATION
    ----------------------------------------------------- */

    {
      problemSlug:
        'mongodb-aggregation',

      setupScript:
        createEmployeesWithData,
    },

    /* -----------------------------------------------------
       INDEX
    ----------------------------------------------------- */

    {
      problemSlug:
        'mongodb-indexes',

      setupScript:
        createEmployeesWithData,
    },

    /* -----------------------------------------------------
       LOOKUP
    ----------------------------------------------------- */

    {
      problemSlug:
        'mongodb-lookup',

      setupScript:
        createLookupData,
    },
  ];

/* =========================================================
   GET FIXTURE
========================================================= */

export function getMongoDbFixture(
  problemSlug: string,
): MongoDbFixture | undefined {
  return mongodbFixtures.find(
    (
      fixture,
    ) =>
      fixture.problemSlug ===
      problemSlug,
  );
}

/* =========================================================
   GET FIXTURE SCRIPT
========================================================= */

export function getMongoDbFixtureScript(
  problemSlug: string,
): string {
  return (
    getMongoDbFixture(
      problemSlug,
    )?.setupScript ??
    ''
  );
}

/* =========================================================
   HAS FIXTURE
========================================================= */

export function hasMongoDbFixture(
  problemSlug: string,
): boolean {
  return Boolean(
    getMongoDbFixtureScript(
      problemSlug,
    ).trim(),
  );
}