import type {
  PracticeProblem,
} from './types';

/* =========================================================
   MONGODB PRACTICE PROBLEMS

   IMPORTANT

   - MongoDB uses workspaceType: 'database'
   - technologySlug must be 'mongodb'
   - Learners write mongosh commands
   - starterCode must not reveal the answer
   - Backend fixtures should prepare required collections
     and documents before Run / Submit
========================================================= */

export const mongodbProblems:
  PracticeProblem[] = [

    /* =====================================================
       1. CREATE / SELECT DATABASE
    ===================================================== */

    {
      slug:
        'mongodb-create-database',

      title:
        'Create a Database',

      technologySlug:
        'mongodb',

      difficulty:
        'Easy',

      workspaceType:
        'database',

      shortDescription:
        'Select a MongoDB database using the use command.',

      problemStatement: `# Create a Database

Create or select a MongoDB database named:

employee_management

## Requirements

- Use the MongoDB use command.
- The database name must be employee_management.
- Do not select any additional databases.

## Expected Result

The active MongoDB database should be employee_management.

## Skills

**MongoDB, mongosh, use, Database Fundamentals**`,

      outputFormat:
        'Select one MongoDB database named employee_management.',

      skills: [
        'MongoDB',
        'mongosh',
        'use',
        'Database Fundamentals',
      ],

      estimatedMinutes:
        10,

      defaultLanguage:
        'javascript',

      allowedLanguages: [
        'javascript',
      ],

      starterCode:
        `// Select the employee_management database\n`,
    },

    /* =====================================================
       2. CREATE COLLECTION
    ===================================================== */

    {
      slug:
        'mongodb-create-collection',

      title:
        'Create an Employee Collection',

      technologySlug:
        'mongodb',

      difficulty:
        'Easy',

      workspaceType:
        'database',

      shortDescription:
        'Create a collection using db.createCollection().',

      problemStatement: `# Create an Employee Collection

The employee_management database is already selected.

Create a collection named:

employees

## Requirements

- Use db.createCollection().
- The collection name must be employees.
- Do not create additional collections.

## Expected Result

A collection named employees should exist.

## Skills

**MongoDB, createCollection, Collections**`,

      outputFormat:
        'Create one MongoDB collection named employees.',

      skills: [
        'MongoDB',
        'createCollection',
        'Collections',
      ],

      estimatedMinutes:
        10,

      defaultLanguage:
        'javascript',

      allowedLanguages: [
        'javascript',
      ],

      starterCode:
        `// Create the employees collection\n`,
    },

    /* =====================================================
       3. INSERT ONE
    ===================================================== */

    {
      slug:
        'mongodb-insert-one',

      title:
        'Insert an Employee Document',

      technologySlug:
        'mongodb',

      difficulty:
        'Easy',

      workspaceType:
        'database',

      shortDescription:
        'Insert one document using insertOne().',

      problemStatement: `# Insert an Employee Document

The employees collection already exists.

Insert exactly one employee document with:

- employeeId: 1
- name: Ananya
- department: Engineering
- salary: 65000

## Requirements

- Use insertOne().
- Insert exactly one document.
- Use the values exactly as provided.
- Do not add unnecessary fields.

## Expected Result

The employees collection should contain the employee Ananya.

## Skills

**MongoDB, insertOne, Documents, BSON**`,

      outputFormat:
        'Insert exactly one employee document.',

      skills: [
        'MongoDB',
        'insertOne',
        'Documents',
        'BSON',
      ],

      estimatedMinutes:
        10,

      defaultLanguage:
        'javascript',

      allowedLanguages: [
        'javascript',
      ],

      starterCode:
        `// Insert the employee document\n`,
    },

    /* =====================================================
       4. INSERT MANY
    ===================================================== */

    {
      slug:
        'mongodb-insert-many',

      title:
        'Insert Multiple Employees',

      technologySlug:
        'mongodb',

      difficulty:
        'Easy',

      workspaceType:
        'database',

      shortDescription:
        'Insert multiple documents using insertMany().',

      problemStatement: `# Insert Multiple Employees

The employees collection already exists.

Insert these three employee documents:

1. employeeId: 1
   name: Ananya
   department: Engineering
   salary: 65000

2. employeeId: 2
   name: Rahul
   department: Finance
   salary: 58000

3. employeeId: 3
   name: Meera
   department: Engineering
   salary: 72000

## Requirements

- Use insertMany().
- Insert exactly three documents.
- Use the values provided above.

## Expected Result

The employees collection should contain all three employees.

## Skills

**MongoDB, insertMany, Documents, Arrays**`,

      outputFormat:
        'Insert exactly three employee documents.',

      skills: [
        'MongoDB',
        'insertMany',
        'Documents',
        'Arrays',
      ],

      estimatedMinutes:
        10,

      defaultLanguage:
        'javascript',

      allowedLanguages: [
        'javascript',
      ],

      starterCode:
        `// Insert the employee documents\n`,
    },

    /* =====================================================
       5. FIND DOCUMENTS
    ===================================================== */

    {
      slug:
        'mongodb-find-documents',

      title:
        'Find Employee Documents',

      technologySlug:
        'mongodb',

      difficulty:
        'Easy',

      workspaceType:
        'database',

      shortDescription:
        'Retrieve documents from a MongoDB collection.',

      problemStatement: `# Find Employee Documents

The employees collection is already populated.

Return all employee documents.

## Requirements

- Use find().
- Query the employees collection.
- Do not apply a filter.
- Do not modify any data.

## Expected Result

All employee documents should be returned.

## Skills

**MongoDB, find, Querying Documents**`,

      outputFormat:
        'Return all documents from the employees collection.',

      skills: [
        'MongoDB',
        'find',
        'Querying Documents',
      ],

      estimatedMinutes:
        5,

      defaultLanguage:
        'javascript',

      allowedLanguages: [
        'javascript',
      ],

      starterCode:
        `// Return all employee documents\n`,
    },

    /* =====================================================
       6. FILTER DOCUMENTS
    ===================================================== */

    {
      slug:
        'mongodb-filter-documents',

      title:
        'Filter Engineering Employees',

      technologySlug:
        'mongodb',

      difficulty:
        'Easy',

      workspaceType:
        'database',

      shortDescription:
        'Filter documents using MongoDB query conditions.',

      problemStatement: `# Filter Engineering Employees

Return only employees whose department is:

Engineering

## Requirements

- Use find().
- Filter using the department field.
- Match the exact value Engineering.
- Do not modify any documents.

## Expected Result

Only Engineering employees should be returned.

## Skills

**MongoDB, find, Query Filters**`,

      outputFormat:
        'Return only Engineering employee documents.',

      skills: [
        'MongoDB',
        'find',
        'Query Filters',
      ],

      estimatedMinutes:
        10,

      defaultLanguage:
        'javascript',

      allowedLanguages: [
        'javascript',
      ],

      starterCode:
        `// Find Engineering employees\n`,
    },

    /* =====================================================
       7. COMPARISON OPERATORS
    ===================================================== */

    {
      slug:
        'mongodb-comparison-operators',

      title:
        'Find High Salary Employees',

      technologySlug:
        'mongodb',

      difficulty:
        'Medium',

      workspaceType:
        'database',

      shortDescription:
        'Filter documents using MongoDB comparison operators.',

      problemStatement: `# Find High Salary Employees

Return employees whose salary is greater than:

60000

## Requirements

- Use find().
- Use the $gt comparison operator.
- Filter using the salary field.
- Do not modify any documents.

## Expected Result

Only employees with salary greater than 60000 should be returned.

## Skills

**MongoDB, find, $gt, Comparison Operators**`,

      outputFormat:
        'Return employees whose salary is greater than 60000.',

      skills: [
        'MongoDB',
        'find',
        '$gt',
        'Comparison Operators',
      ],

      estimatedMinutes:
        10,

      defaultLanguage:
        'javascript',

      allowedLanguages: [
        'javascript',
      ],

      starterCode:
        `// Find employees with salary greater than 60000\n`,
    },

    /* =====================================================
       8. UPDATE ONE
    ===================================================== */

    {
      slug:
        'mongodb-update-one',

      title:
        'Update Employee Salary',

      technologySlug:
        'mongodb',

      difficulty:
        'Medium',

      workspaceType:
        'database',

      shortDescription:
        'Update one document using updateOne() and $set.',

      problemStatement: `# Update Employee Salary

The employees collection contains an employee with:

employeeId: 1

Update this employee's salary to:

75000

## Requirements

- Use updateOne().
- Match employeeId 1.
- Use the $set operator.
- Change only the salary field.
- Do not modify other employees.

## Expected Result

Employee 1 should have salary 75000.

## Skills

**MongoDB, updateOne, $set, Update Operators**`,

      outputFormat:
        'Employee with employeeId 1 must have salary 75000.',

      skills: [
        'MongoDB',
        'updateOne',
        '$set',
        'Update Operators',
      ],

      estimatedMinutes:
        10,

      defaultLanguage:
        'javascript',

      allowedLanguages: [
        'javascript',
      ],

      starterCode:
        `// Update employee 1 salary\n`,
    },

    /* =====================================================
       9. UPDATE MANY
    ===================================================== */

    {
      slug:
        'mongodb-update-many',

      title:
        'Update Engineering Employees',

      technologySlug:
        'mongodb',

      difficulty:
        'Medium',

      workspaceType:
        'database',

      shortDescription:
        'Update multiple documents using updateMany().',

      problemStatement: `# Update Engineering Employees

Add the following field to every Engineering employee:

active: true

## Requirements

- Use updateMany().
- Match only Engineering employees.
- Use $set.
- Set active to true.
- Do not update employees from other departments.

## Expected Result

Every Engineering employee should contain active: true.

## Skills

**MongoDB, updateMany, $set, Query Filters**`,

      outputFormat:
        'Set active to true for all Engineering employees.',

      skills: [
        'MongoDB',
        'updateMany',
        '$set',
        'Query Filters',
      ],

      estimatedMinutes:
        15,

      defaultLanguage:
        'javascript',

      allowedLanguages: [
        'javascript',
      ],

      starterCode:
        `// Update all Engineering employees\n`,
    },

    /* =====================================================
       10. DELETE ONE
    ===================================================== */

    {
      slug:
        'mongodb-delete-one',

      title:
        'Delete an Employee Document',

      technologySlug:
        'mongodb',

      difficulty:
        'Medium',

      workspaceType:
        'database',

      shortDescription:
        'Delete one document using deleteOne().',

      problemStatement: `# Delete an Employee Document

Delete the employee whose employeeId is:

3

## Requirements

- Use deleteOne().
- Match employeeId 3.
- Delete only that employee.
- Do not delete other documents.

## Expected Result

Employee 3 should no longer exist.

## Skills

**MongoDB, deleteOne, Delete Operations**`,

      outputFormat:
        'Delete only the employee whose employeeId is 3.',

      skills: [
        'MongoDB',
        'deleteOne',
        'Delete Operations',
      ],

      estimatedMinutes:
        10,

      defaultLanguage:
        'javascript',

      allowedLanguages: [
        'javascript',
      ],

      starterCode:
        `// Delete employee 3\n`,
    },

    /* =====================================================
       11. PROJECTION
    ===================================================== */

    {
      slug:
        'mongodb-projection',

      title:
        'Project Employee Fields',

      technologySlug:
        'mongodb',

      difficulty:
        'Medium',

      workspaceType:
        'database',

      shortDescription:
        'Return selected document fields using projection.',

      problemStatement: `# Project Employee Fields

Return all employees but display only:

- name
- department

Do not display the MongoDB _id field.

## Requirements

- Use find().
- Use projection.
- Include name.
- Include department.
- Exclude _id.
- Do not modify data.

## Expected Result

Each result should contain only name and department.

## Skills

**MongoDB, find, Projection**`,

      outputFormat:
        'Return only name and department, excluding _id.',

      skills: [
        'MongoDB',
        'find',
        'Projection',
      ],

      estimatedMinutes:
        10,

      defaultLanguage:
        'javascript',

      allowedLanguages: [
        'javascript',
      ],

      starterCode:
        `// Return only name and department\n`,
    },

    /* =====================================================
       12. SORT AND LIMIT
    ===================================================== */

    {
      slug:
        'mongodb-sort-limit',

      title:
        'Find Highest Paid Employees',

      technologySlug:
        'mongodb',

      difficulty:
        'Medium',

      workspaceType:
        'database',

      shortDescription:
        'Sort MongoDB documents and limit query results.',

      problemStatement: `# Find Highest Paid Employees

Return the two employees with the highest salaries.

## Requirements

- Query the employees collection.
- Sort salary in descending order.
- Limit the result to 2 documents.
- Do not modify any documents.

## Expected Result

Exactly two employees should be returned from highest to lower salary.

## Skills

**MongoDB, find, sort, limit**`,

      outputFormat:
        'Return the two highest-paid employees.',

      skills: [
        'MongoDB',
        'find',
        'sort',
        'limit',
      ],

      estimatedMinutes:
        10,

      defaultLanguage:
        'javascript',

      allowedLanguages: [
        'javascript',
      ],

      starterCode:
        `// Return the two highest-paid employees\n`,
    },

    /* =====================================================
       13. AGGREGATION
    ===================================================== */

    {
      slug:
        'mongodb-aggregation',

      title:
        'Average Salary by Department',

      technologySlug:
        'mongodb',

      difficulty:
        'Hard',

      workspaceType:
        'database',

      shortDescription:
        'Calculate department averages using an aggregation pipeline.',

      problemStatement: `# Average Salary by Department

Calculate the average salary for each department.

## Required Output

Return:

- department
- average_salary

## Requirements

- Use aggregate().
- Group documents by department.
- Use $avg on salary.
- Return the department name as department.
- Return the calculated average as average_salary.
- Do not modify any documents.

## Expected Result

One result should be returned for each department.

## Skills

**MongoDB, Aggregation Pipeline, $group, $avg, $project**`,

      outputFormat:
        'Return department and average_salary for each department.',

      skills: [
        'MongoDB',
        'Aggregation Pipeline',
        '$group',
        '$avg',
        '$project',
      ],

      estimatedMinutes:
        20,

      defaultLanguage:
        'javascript',

      allowedLanguages: [
        'javascript',
      ],

      starterCode:
        `// Calculate average salary by department\n`,
    },

    /* =====================================================
       14. INDEX
    ===================================================== */

    {
      slug:
        'mongodb-indexes',

      title:
        'Create an Employee Name Index',

      technologySlug:
        'mongodb',

      difficulty:
        'Hard',

      workspaceType:
        'database',

      shortDescription:
        'Create an index using createIndex().',

      problemStatement: `# Create an Employee Name Index

Create an ascending index on:

name

The index must be named:

idx_employees_name

## Requirements

- Use createIndex().
- Index only the name field.
- Use ascending order.
- Name the index idx_employees_name.
- Do not modify employee documents.

## Expected Result

The employees collection should contain the named index.

## Skills

**MongoDB, createIndex, Indexes, Database Performance**`,

      outputFormat:
        'Create an ascending index named idx_employees_name on name.',

      skills: [
        'MongoDB',
        'createIndex',
        'Indexes',
        'Database Performance',
      ],

      estimatedMinutes:
        15,

      defaultLanguage:
        'javascript',

      allowedLanguages: [
        'javascript',
      ],

      starterCode:
        `// Create the employee name index\n`,
    },

    /* =====================================================
       15. LOOKUP
    ===================================================== */

    {
      slug:
        'mongodb-lookup',

      title:
        'Join Employees and Departments',

      technologySlug:
        'mongodb',

      difficulty:
        'Hard',

      workspaceType:
        'database',

      shortDescription:
        'Combine collections using the $lookup aggregation stage.',

      problemStatement: `# Join Employees and Departments

Two collections already exist:

## employees

Fields:

- employeeId
- name
- departmentId
- salary

## departments

Fields:

- departmentId
- departmentName

Combine employees with their matching department.

## Requirements

- Use aggregate().
- Use $lookup.
- Join employees.departmentId with departments.departmentId.
- Store matching department documents in departmentInfo.
- Do not modify either collection.

## Expected Result

Each employee should include matching department information.

## Skills

**MongoDB, Aggregation Pipeline, $lookup, Collection Relationships**`,

      outputFormat:
        'Return employees with matching department information in departmentInfo.',

      skills: [
        'MongoDB',
        'Aggregation Pipeline',
        '$lookup',
        'Collection Relationships',
      ],

      estimatedMinutes:
        25,

      defaultLanguage:
        'javascript',

      allowedLanguages: [
        'javascript',
      ],

      starterCode:
        `// Join employees with departments\n`,
    },
  ];

/* =========================================================
   MONGODB PROBLEM HELPERS
========================================================= */

export function getMongodbProblemBySlug(
  problemSlug: string,
): PracticeProblem | undefined {
  return mongodbProblems.find(
    (
      problem,
    ) =>
      problem.slug ===
      problemSlug,
  );
}

export function isMongodbProblem(
  problemSlug: string,
): boolean {
  return mongodbProblems.some(
    (
      problem,
    ) =>
      problem.slug ===
      problemSlug,
  );
}