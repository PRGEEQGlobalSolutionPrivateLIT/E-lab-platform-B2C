import type {
  PracticeProblem,
} from './types';

/* =========================================================
   MYSQL PRACTICE PROBLEMS

   PRACTICE RULES

   1. Every MySQL practice problem uses:
      workspaceType: 'database'

   2. problemStatement contains the learner instructions.

   3. starterCode must NOT reveal the solution.

   4. The learner writes the SQL query.

   5. Run Query executes SQL inside the isolated database
      sandbox.

   6. Submit will later execute hidden database validation.

   7. Learner SQL must NEVER execute against the platform
      MySQL database.

   IMPORTANT FOR BACKEND

   Some problems require initial tables/data.

   Example:
   - INSERT requires employees table.
   - SELECT requires employees table + records.
   - JOIN requires employees + departments.
   - Transactions require departments + budgets.

   These fixtures must later be created automatically by
   the sandbox based on problemSlug.
========================================================= */

export const mysqlProblems:
  PracticeProblem[] = [

    /* =====================================================
       BEGINNER
       DATABASE FUNDAMENTALS
    ===================================================== */

    {
      slug:
        'mysql-create-database',

      title:
        'Create a Database',

      technologySlug:
        'mysql',

      difficulty:
        'Easy',

      workspaceType:
        'database',

      shortDescription:
        'Practice creating a MySQL database using CREATE DATABASE.',

      problemStatement: `# Create a Database

Create a MySQL database named:

employee_management

## Requirements

- Use the MySQL CREATE DATABASE statement.
- The database name must be employee_management.
- Do not create any additional databases.

## Expected Result

A MySQL database named employee_management should be created successfully.

## Skills

**MySQL, CREATE DATABASE, Database Fundamentals**`,

      outputFormat:
        'Create one MySQL database named employee_management.',

      skills: [
        'MySQL',
        'CREATE DATABASE',
        'Database Fundamentals',
      ],

      estimatedMinutes:
        10,

      defaultLanguage:
        'sql',

      allowedLanguages: [
        'sql',
      ],

      starterCode:
        `-- Write your MySQL query here\n`,
    },

    /* =====================================================
       BEGINNER
       TABLE CREATION
    ===================================================== */

    {
      slug:
        'mysql-create-table',

      title:
        'Create an Employee Table',

      technologySlug:
        'mysql',

      difficulty:
        'Easy',

      workspaceType:
        'database',

      shortDescription:
        'Create an employees table with MySQL data types and constraints.',

      problemStatement: `# Create an Employee Table

Create a table named employees.

## Required Columns

The table must contain the following columns:

- id — INTEGER and PRIMARY KEY
- name — VARCHAR(100) and NOT NULL
- department — VARCHAR(100)
- salary — DECIMAL(10,2)

## Requirements

- The table name must be employees.
- id must uniquely identify each employee.
- name must not allow NULL values.
- Use the specified MySQL data types.
- Do not add unnecessary columns.

## Expected Result

A table named employees should be created with all four required columns and constraints.

## Skills

**MySQL, CREATE TABLE, Data Types, Constraints, Primary Key, NOT NULL**`,

      outputFormat:
        'Create the employees table with id, name, department and salary columns using the required constraints.',

      skills: [
        'MySQL',
        'CREATE TABLE',
        'Data Types',
        'Constraints',
        'Primary Key',
        'NOT NULL',
      ],

      estimatedMinutes:
        15,

      defaultLanguage:
        'sql',

      allowedLanguages: [
        'sql',
      ],

      starterCode:
        `-- Create the employees table here\n`,
    },

    /* =====================================================
       BEGINNER
       INSERT DATA
    ===================================================== */

    {
      slug:
        'mysql-insert-records',

      title:
        'Insert Employee Records',

      technologySlug:
        'mysql',

      difficulty:
        'Easy',

      workspaceType:
        'database',

      shortDescription:
        'Insert an employee record into an existing MySQL table.',

      problemStatement: `# Insert an Employee Record

The employees table is already available in the practice database.

Its columns are:

- id
- name
- department
- salary

Insert exactly one employee with the following values:

- id: 1
- name: Ananya
- department: Engineering
- salary: 65000.00

## Requirements

- Use INSERT INTO.
- Insert exactly one record.
- Use the values provided above.
- Do not modify the table structure.

## Expected Result

The employees table should contain the new Ananya employee record.

## Skills

**MySQL, INSERT INTO, VALUES, Relational Data**`,

      outputFormat:
        'Insert exactly one employee record with id 1, name Ananya, department Engineering and salary 65000.00.',

      skills: [
        'MySQL',
        'INSERT INTO',
        'VALUES',
        'Relational Data',
      ],

      estimatedMinutes:
        10,

      defaultLanguage:
        'sql',

      allowedLanguages: [
        'sql',
      ],

      starterCode:
        `-- Insert the required employee record here\n`,
    },

    /* =====================================================
       BEGINNER
       SELECT DATA
    ===================================================== */

    {
      slug:
        'mysql-select-records',

      title:
        'Select Employee Records',

      technologySlug:
        'mysql',

      difficulty:
        'Easy',

      workspaceType:
        'database',

      shortDescription:
        'Retrieve all employee records using SELECT.',

      problemStatement: `# Select Employee Records

The employees table is already populated with employee data.

Write a MySQL query that returns every employee.

## Requirements

- Query the employees table.
- Return all columns.
- Return all records.
- Do not modify the existing data.

## Expected Result

All rows and all columns from the employees table should be returned.

## Skills

**MySQL, SELECT, Querying Data**`,

      outputFormat:
        'Return all columns and all records from the employees table.',

      skills: [
        'MySQL',
        'SELECT',
        'Querying Data',
      ],

      estimatedMinutes:
        5,

      defaultLanguage:
        'sql',

      allowedLanguages: [
        'sql',
      ],

      starterCode:
        `-- Write your SELECT query here\n`,
    },

    /* =====================================================
       BEGINNER
       FILTER DATA
    ===================================================== */

    {
      slug:
        'mysql-where-filter',

      title:
        'Filter Employees with WHERE',

      technologySlug:
        'mysql',

      difficulty:
        'Easy',

      workspaceType:
        'database',

      shortDescription:
        'Filter employee records using a MySQL WHERE condition.',

      problemStatement: `# Filter Employees with WHERE

The employees table contains employees from multiple departments.

Return only employees who belong to the Engineering department.

## Requirements

- Query the employees table.
- Use a WHERE condition.
- Match the department value Engineering.
- Return all columns for matching employees.
- Do not modify any records.

## Expected Result

Only Engineering employees should be returned.

## Skills

**MySQL, SELECT, WHERE, Filtering**`,

      outputFormat:
        'Return only employees whose department is Engineering.',

      skills: [
        'MySQL',
        'SELECT',
        'WHERE',
        'Filtering',
      ],

      estimatedMinutes:
        10,

      defaultLanguage:
        'sql',

      allowedLanguages: [
        'sql',
      ],

      starterCode:
        `-- Return only Engineering employees\n`,
    },

    /* =====================================================
       INTERMEDIATE
       UPDATE DATA
    ===================================================== */

    {
      slug:
        'mysql-update-records',

      title:
        'Update Employee Salary',

      technologySlug:
        'mysql',

      difficulty:
        'Medium',

      workspaceType:
        'database',

      shortDescription:
        'Update a specific employee salary without changing other records.',

      problemStatement: `# Update Employee Salary

The employees table contains an employee with id 1.

Update that employee's salary to:

75000.00

## Requirements

- Use UPDATE.
- Update the salary column.
- Update only employee id 1.
- Do not modify any other employee.

## Expected Result

Employee id 1 should have a salary of 75000.00.

All other employee records must remain unchanged.

## Skills

**MySQL, UPDATE, SET, WHERE**`,

      outputFormat:
        'Employee id 1 must have salary 75000.00 without changing other employees.',

      skills: [
        'MySQL',
        'UPDATE',
        'SET',
        'WHERE',
      ],

      estimatedMinutes:
        10,

      defaultLanguage:
        'sql',

      allowedLanguages: [
        'sql',
      ],

      starterCode:
        `-- Update the salary of employee id 1 here\n`,
    },

    /* =====================================================
       INTERMEDIATE
       DELETE DATA
    ===================================================== */

    {
      slug:
        'mysql-delete-records',

      title:
        'Delete an Employee',

      technologySlug:
        'mysql',

      difficulty:
        'Medium',

      workspaceType:
        'database',

      shortDescription:
        'Delete one employee without affecting other records.',

      problemStatement: `# Delete an Employee

The employees table contains multiple employee records.

Delete the employee whose id is:

3

## Requirements

- Use DELETE.
- Delete from the employees table.
- Delete only employee id 3.
- Do not delete any other employee.

## Expected Result

The employee with id 3 should no longer exist.

All other employees must remain unchanged.

## Skills

**MySQL, DELETE, WHERE**`,

      outputFormat:
        'Remove only the employee whose id is 3.',

      skills: [
        'MySQL',
        'DELETE',
        'WHERE',
      ],

      estimatedMinutes:
        10,

      defaultLanguage:
        'sql',

      allowedLanguages: [
        'sql',
      ],

      starterCode:
        `-- Delete employee id 3 here\n`,
    },

    /* =====================================================
       INTERMEDIATE
       AGGREGATE FUNCTIONS
    ===================================================== */

    {
      slug:
        'mysql-aggregate-functions',

      title:
        'Calculate Average Salary',

      technologySlug:
        'mysql',

      difficulty:
        'Medium',

      workspaceType:
        'database',

      shortDescription:
        'Calculate the average salary using a MySQL aggregate function.',

      problemStatement: `# Calculate Average Salary

The employees table contains multiple employee records.

Calculate the average salary of all employees.

## Requirements

- Use the employees table.
- Use the MySQL AVG aggregate function.
- Calculate the average of the salary column.
- Return the result with the alias average_salary.
- Do not modify any data.

## Expected Result

The query should return one calculated value in a column named:

average_salary

## Skills

**MySQL, SELECT, AVG, Aggregate Functions, Aliases**`,

      outputFormat:
        'Return one column named average_salary containing the average employee salary.',

      skills: [
        'MySQL',
        'SELECT',
        'AVG',
        'Aggregate Functions',
        'Aliases',
      ],

      estimatedMinutes:
        10,

      defaultLanguage:
        'sql',

      allowedLanguages: [
        'sql',
      ],

      starterCode:
        `-- Calculate the average employee salary here\n`,
    },

    /* =====================================================
       INTERMEDIATE
       GROUPING
    ===================================================== */

    {
      slug:
        'mysql-group-by',

      title:
        'Employees by Department',

      technologySlug:
        'mysql',

      difficulty:
        'Medium',

      workspaceType:
        'database',

      shortDescription:
        'Count employees in each department using GROUP BY.',

      problemStatement: `# Employees by Department

The employees table contains employees from several departments.

Count how many employees belong to each department.

## Required Output Columns

Return:

- department
- employee_count

## Requirements

- Group records by department.
- Count the employees in each group.
- Name the count column employee_count.
- Sort the final result by department in ascending order.
- Do not modify any data.

## Expected Result

One row should be returned for each department together with its employee count.

## Skills

**MySQL, COUNT, GROUP BY, ORDER BY, Aliases**`,

      outputFormat:
        'Return department and employee_count ordered by department in ascending order.',

      skills: [
        'MySQL',
        'COUNT',
        'GROUP BY',
        'ORDER BY',
        'Aliases',
      ],

      estimatedMinutes:
        15,

      defaultLanguage:
        'sql',

      allowedLanguages: [
        'sql',
      ],

      starterCode:
        `-- Count employees in each department here\n`,
    },

    /* =====================================================
       INTERMEDIATE
       JOINS
    ===================================================== */

    {
      slug:
        'mysql-join-tables',

      title:
        'Join Employees and Departments',

      technologySlug:
        'mysql',

      difficulty:
        'Medium',

      workspaceType:
        'database',

      shortDescription:
        'Combine employee and department information using an INNER JOIN.',

      problemStatement: `# Join Employees and Departments

Two tables are available in the practice database.

## employees

Columns:

- id
- name
- department_id
- salary

## departments

Columns:

- id
- department_name

Write a query that combines the two tables.

## Required Output

Return:

- employee name
- department name

## Requirements

- Use an INNER JOIN.
- Join employees.department_id with departments.id.
- Return only matching records.
- Do not modify either table.

## Expected Result

Each matching employee should be displayed together with the employee's department name.

## Skills

**MySQL, INNER JOIN, Table Relationships, Foreign Keys**`,

      outputFormat:
        'Return employee name and department name for matching employee and department records.',

      skills: [
        'MySQL',
        'INNER JOIN',
        'Table Relationships',
        'Foreign Keys',
      ],

      estimatedMinutes:
        20,

      defaultLanguage:
        'sql',

      allowedLanguages: [
        'sql',
      ],

      starterCode:
        `-- Join employees and departments here\n`,
    },

    /* =====================================================
       ADVANCED
       SUBQUERIES
    ===================================================== */

    {
      slug:
        'mysql-subqueries',

      title:
        'Employees Above Average Salary',

      technologySlug:
        'mysql',

      difficulty:
        'Hard',

      workspaceType:
        'database',

      shortDescription:
        'Use a subquery to find employees earning above the average salary.',

      problemStatement: `# Employees Above Average Salary

The employees table contains employee salary information.

Find employees whose salary is greater than the overall average employee salary.

## Required Output Columns

Return:

- id
- name
- salary

## Requirements

- Calculate the overall average salary.
- Use a subquery.
- Compare each employee salary against the calculated average.
- Return only employees earning above the average.
- Do not modify any data.

## Expected Result

Only employees whose salary is greater than the overall average salary should be returned.

## Skills

**MySQL, Subqueries, AVG, WHERE, Filtering**`,

      outputFormat:
        'Return id, name and salary for employees earning above the overall average salary.',

      skills: [
        'MySQL',
        'Subqueries',
        'AVG',
        'WHERE',
        'Filtering',
      ],

      estimatedMinutes:
        20,

      defaultLanguage:
        'sql',

      allowedLanguages: [
        'sql',
      ],

      starterCode:
        `-- Find employees earning above the average salary\n`,
    },

    /* =====================================================
       ADVANCED
       VIEWS
    ===================================================== */

    {
      slug:
        'mysql-views',

      title:
        'Create an Engineering View',

      technologySlug:
        'mysql',

      difficulty:
        'Hard',

      workspaceType:
        'database',

      shortDescription:
        'Create a reusable MySQL view for Engineering employees.',

      problemStatement: `# Create an Engineering View

The employees table contains employees from multiple departments.

Create a MySQL view named:

engineering_employees

The view must contain only employees whose department is Engineering.

## Requirements

- Use CREATE VIEW.
- Name the view engineering_employees.
- Query the employees table.
- Include all employee columns.
- Include only Engineering employees.

## Expected Result

A view named engineering_employees should be created.

Querying the view should return only Engineering employees.

## Skills

**MySQL, CREATE VIEW, SELECT, WHERE**`,

      outputFormat:
        'Create a view named engineering_employees containing only Engineering employees.',

      skills: [
        'MySQL',
        'CREATE VIEW',
        'SELECT',
        'WHERE',
      ],

      estimatedMinutes:
        20,

      defaultLanguage:
        'sql',

      allowedLanguages: [
        'sql',
      ],

      starterCode:
        `-- Create the engineering_employees view here\n`,
    },

    /* =====================================================
       ADVANCED
       INDEXES
    ===================================================== */

    {
      slug:
        'mysql-indexes',

      title:
        'Create an Employee Name Index',

      technologySlug:
        'mysql',

      difficulty:
        'Hard',

      workspaceType:
        'database',

      shortDescription:
        'Create an index that supports employee name lookups.',

      problemStatement: `# Create an Employee Name Index

The employees table contains a name column.

Create an index named:

idx_employees_name

The index must be created on the name column of the employees table.

## Requirements

- Use CREATE INDEX.
- The index name must be idx_employees_name.
- Create the index on employees.
- Index only the name column.
- Do not modify the existing table data.

## Expected Result

The employees table should have an index named idx_employees_name on its name column.

## Skills

**MySQL, CREATE INDEX, Indexes, Database Performance**`,

      outputFormat:
        'Create an index named idx_employees_name on the employees name column.',

      skills: [
        'MySQL',
        'CREATE INDEX',
        'Indexes',
        'Database Performance',
      ],

      estimatedMinutes:
        15,

      defaultLanguage:
        'sql',

      allowedLanguages: [
        'sql',
      ],

      starterCode:
        `-- Create the employee name index here\n`,
    },

    /* =====================================================
       ADVANCED
       TRANSACTIONS
    ===================================================== */

    {
      slug:
        'mysql-transactions',

      title:
        'Transfer Budget with a Transaction',

      technologySlug:
        'mysql',

      difficulty:
        'Hard',

      workspaceType:
        'database',

      shortDescription:
        'Use a MySQL transaction to safely transfer budget between departments.',

      problemStatement: `# Transfer Budget with a Transaction

A departments table is available with these columns:

- id
- department_name
- budget

Transfer 5000 from department id 1 to department id 2.

## Requirements

1. Start a MySQL transaction.
2. Subtract 5000 from the budget of department id 1.
3. Add 5000 to the budget of department id 2.
4. Commit the transaction.
5. Both UPDATE statements must execute inside the same transaction.
6. Do not modify any other department.

## Expected Result

Department id 1 should have 5000 less budget.

Department id 2 should have 5000 more budget.

Both changes must be committed as one transaction.

## Skills

**MySQL, Transactions, START TRANSACTION, UPDATE, COMMIT, Data Integrity**`,

      outputFormat:
        'Transfer 5000 from department id 1 to department id 2 inside one committed MySQL transaction.',

      skills: [
        'MySQL',
        'Transactions',
        'START TRANSACTION',
        'UPDATE',
        'COMMIT',
        'Data Integrity',
      ],

      estimatedMinutes:
        25,

      defaultLanguage:
        'sql',

      allowedLanguages: [
        'sql',
      ],

      starterCode:
        `-- Write the complete transaction here\n`,
    },
];

/* =========================================================
   MYSQL PROBLEM HELPERS
========================================================= */

export function getMysqlProblemBySlug(
  problemSlug: string,
): PracticeProblem | undefined {
  return mysqlProblems.find(
    (
      problem,
    ) =>
      problem.slug ===
      problemSlug,
  );
}

export function isMysqlProblem(
  problemSlug: string,
): boolean {
  return mysqlProblems.some(
    (
      problem,
    ) =>
      problem.slug ===
      problemSlug,
  );
}