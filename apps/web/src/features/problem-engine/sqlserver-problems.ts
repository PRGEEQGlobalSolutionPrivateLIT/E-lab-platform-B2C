import type {
  PracticeProblem,
} from './types';

/* =========================================================
   SQL SERVER PRACTICE PROBLEMS

   PRACTICE RULES

   1. Every SQL Server practice problem uses:
      workspaceType: 'database'

   2. problemStatement contains learner instructions.

   3. starterCode must not reveal the solution.

   4. Run Query executes SQL in an isolated SQL Server
      sandbox.

   5. Submit will use hidden database validation.

   6. Learner SQL must never execute against the platform
      database.
========================================================= */

export const sqlserverProblems:
  PracticeProblem[] = [

    /* =====================================================
       BEGINNER
       DATABASE FUNDAMENTALS
    ===================================================== */

    {
      slug:
        'sqlserver-create-database',

      title:
        'Create a Database',

      technologySlug:
        'sqlserver',

      difficulty:
        'Easy',

      workspaceType:
        'database',

      shortDescription:
        'Practice creating a SQL Server database using CREATE DATABASE.',

      problemStatement: `# Create a Database

Create a SQL Server database named:

employee_management

## Requirements

- Use the SQL Server CREATE DATABASE statement.
- The database name must be employee_management.
- Do not create any additional databases.

## Expected Result

A SQL Server database named employee_management should be created successfully.

## Skills

**SQL Server, CREATE DATABASE, Database Fundamentals**`,

      outputFormat:
        'Create one SQL Server database named employee_management.',

      skills: [
        'SQL Server',
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
        `-- Write your SQL Server query here\n`,
    },

    /* =====================================================
       BEGINNER
       TABLE CREATION
    ===================================================== */

    {
      slug:
        'sqlserver-create-table',

      title:
        'Create an Employee Table',

      technologySlug:
        'sqlserver',

      difficulty:
        'Easy',

      workspaceType:
        'database',

      shortDescription:
        'Create an employees table with SQL Server data types and constraints.',

      problemStatement: `# Create an Employee Table

Create a table named employees.

## Required Columns

The table must contain:

- id — INT and PRIMARY KEY
- name — VARCHAR(100) and NOT NULL
- department — VARCHAR(100)
- salary — DECIMAL(10,2)

## Requirements

- The table name must be employees.
- id must uniquely identify each employee.
- name must not allow NULL values.
- Use the specified SQL Server data types.
- Do not add unnecessary columns.

## Expected Result

A table named employees should be created with all four required columns and constraints.

## Skills

**SQL Server, CREATE TABLE, Data Types, Constraints, Primary Key, NOT NULL**`,

      outputFormat:
        'Create the employees table with id, name, department and salary columns using the required constraints.',

      skills: [
        'SQL Server',
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
        'sqlserver-insert-records',

      title:
        'Insert Employee Records',

      technologySlug:
        'sqlserver',

      difficulty:
        'Easy',

      workspaceType:
        'database',

      shortDescription:
        'Insert an employee record into an existing SQL Server table.',

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

**SQL Server, INSERT INTO, VALUES, Relational Data**`,

      outputFormat:
        'Insert exactly one employee record with id 1, name Ananya, department Engineering and salary 65000.00.',

      skills: [
        'SQL Server',
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
        'sqlserver-select-records',

      title:
        'Select Employee Records',

      technologySlug:
        'sqlserver',

      difficulty:
        'Easy',

      workspaceType:
        'database',

      shortDescription:
        'Retrieve all employee records using SELECT.',

      problemStatement: `# Select Employee Records

The employees table is already populated with employee data.

Write a SQL Server query that returns every employee.

## Requirements

- Query the employees table.
- Return all columns.
- Return all records.
- Do not modify the existing data.

## Expected Result

All rows and all columns from the employees table should be returned.

## Skills

**SQL Server, SELECT, Querying Data**`,

      outputFormat:
        'Return all columns and all records from the employees table.',

      skills: [
        'SQL Server',
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
        'sqlserver-where-filter',

      title:
        'Filter Employees with WHERE',

      technologySlug:
        'sqlserver',

      difficulty:
        'Easy',

      workspaceType:
        'database',

      shortDescription:
        'Filter employee records using a SQL Server WHERE condition.',

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

**SQL Server, SELECT, WHERE, Filtering**`,

      outputFormat:
        'Return only employees whose department is Engineering.',

      skills: [
        'SQL Server',
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
        'sqlserver-update-records',

      title:
        'Update Employee Salary',

      technologySlug:
        'sqlserver',

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

**SQL Server, UPDATE, SET, WHERE**`,

      outputFormat:
        'Employee id 1 must have salary 75000.00 without changing other employees.',

      skills: [
        'SQL Server',
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
        'sqlserver-delete-records',

      title:
        'Delete an Employee',

      technologySlug:
        'sqlserver',

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

**SQL Server, DELETE, WHERE**`,

      outputFormat:
        'Remove only the employee whose id is 3.',

      skills: [
        'SQL Server',
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
        'sqlserver-aggregate-functions',

      title:
        'Calculate Average Salary',

      technologySlug:
        'sqlserver',

      difficulty:
        'Medium',

      workspaceType:
        'database',

      shortDescription:
        'Calculate the average salary using a SQL Server aggregate function.',

      problemStatement: `# Calculate Average Salary

The employees table contains multiple employee records.

Calculate the average salary of all employees.

## Requirements

- Use the employees table.
- Use AVG.
- Calculate the average of the salary column.
- Return the result with the alias average_salary.
- Do not modify any data.

## Expected Result

The query should return one calculated value in a column named:

average_salary

## Skills

**SQL Server, SELECT, AVG, Aggregate Functions, Aliases**`,

      outputFormat:
        'Return one column named average_salary containing the average employee salary.',

      skills: [
        'SQL Server',
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
        'sqlserver-group-by',

      title:
        'Employees by Department',

      technologySlug:
        'sqlserver',

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
- Count employees in each group.
- Name the count column employee_count.
- Sort by department in ascending order.
- Do not modify any data.

## Expected Result

One row should be returned for each department together with its employee count.

## Skills

**SQL Server, COUNT, GROUP BY, ORDER BY, Aliases**`,

      outputFormat:
        'Return department and employee_count ordered by department in ascending order.',

      skills: [
        'SQL Server',
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
        'sqlserver-join-tables',

      title:
        'Join Employees and Departments',

      technologySlug:
        'sqlserver',

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

**SQL Server, INNER JOIN, Table Relationships, Foreign Keys**`,

      outputFormat:
        'Return employee name and department name for matching employee and department records.',

      skills: [
        'SQL Server',
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
        'sqlserver-subqueries',

      title:
        'Employees Above Average Salary',

      technologySlug:
        'sqlserver',

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

**SQL Server, Subqueries, AVG, WHERE, Filtering**`,

      outputFormat:
        'Return id, name and salary for employees earning above the overall average salary.',

      skills: [
        'SQL Server',
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
        'sqlserver-views',

      title:
        'Create an Engineering View',

      technologySlug:
        'sqlserver',

      difficulty:
        'Hard',

      workspaceType:
        'database',

      shortDescription:
        'Create a reusable SQL Server view for Engineering employees.',

      problemStatement: `# Create an Engineering View

The employees table contains employees from multiple departments.

Create a SQL Server view named:

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

**SQL Server, CREATE VIEW, SELECT, WHERE**`,

      outputFormat:
        'Create a view named engineering_employees containing only Engineering employees.',

      skills: [
        'SQL Server',
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
        'sqlserver-indexes',

      title:
        'Create an Employee Name Index',

      technologySlug:
        'sqlserver',

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
- Do not modify existing table data.

## Expected Result

The employees table should have an index named idx_employees_name on its name column.

## Skills

**SQL Server, CREATE INDEX, Indexes, Database Performance**`,

      outputFormat:
        'Create an index named idx_employees_name on the employees name column.',

      skills: [
        'SQL Server',
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
        'sqlserver-transactions',

      title:
        'Transfer Budget with a Transaction',

      technologySlug:
        'sqlserver',

      difficulty:
        'Hard',

      workspaceType:
        'database',

      shortDescription:
        'Use a SQL Server transaction to safely transfer budget between departments.',

      problemStatement: `# Transfer Budget with a Transaction

A departments table is available with these columns:

- id
- department_name
- budget

Transfer 5000 from department id 1 to department id 2.

## Requirements

1. Start a SQL Server transaction.
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

**SQL Server, Transactions, BEGIN TRANSACTION, UPDATE, COMMIT, Data Integrity**`,

      outputFormat:
        'Transfer 5000 from department id 1 to department id 2 inside one committed SQL Server transaction.',

      skills: [
        'SQL Server',
        'Transactions',
        'BEGIN TRANSACTION',
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
   SQL SERVER PROBLEM HELPERS
========================================================= */

export function getSqlServerProblemBySlug(
  problemSlug: string,
): PracticeProblem | undefined {
  return sqlserverProblems.find(
    (
      problem,
    ) =>
      problem.slug ===
      problemSlug,
  );
}

export function isSqlServerProblem(
  problemSlug: string,
): boolean {
  return sqlserverProblems.some(
    (
      problem,
    ) =>
      problem.slug ===
      problemSlug,
  );
}