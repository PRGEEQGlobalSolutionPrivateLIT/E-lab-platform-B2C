import {

  Injectable,

} from '@nestjs/common';

import {

  MongoDbSandboxService,

  type MongoDbSandbox,

} from '../sandbox/mongodb-sandbox.service.js';

/* =========================================================

   MONGODB VALIDATION TYPES

========================================================= */

export type MongoDbValidationTestResult = {

  name: string;

  passed: boolean;

  message: string;

};

export type MongoDbValidationResult = {

  passed: boolean;

  message: string;

  tests: MongoDbValidationTestResult[];

};

/* =========================================================

   INTERNAL QUERY RESULT

========================================================= */

type MongoDbJsonResult = {

  success: boolean;

  value?: unknown;

  error?: string;

};

/* =========================================================

   MONGODB VALIDATOR SERVICE

   Supported problems:

   1. mongodb-create-database

   2. mongodb-create-collection

   3. mongodb-insert-one

   4. mongodb-insert-many

   5. mongodb-find-documents

   6. mongodb-filter-documents

   7. mongodb-comparison-operators

   8. mongodb-update-one

   9. mongodb-update-many

   10. mongodb-delete-one

   11. mongodb-projection

   12. mongodb-sort-limit

   13. mongodb-aggregation

   14. mongodb-indexes

   15. mongodb-lookup

========================================================= */

@Injectable()

export class MongoDbValidatorService {

  constructor(

    private readonly mongodbSandboxService:

      MongoDbSandboxService,

  ) {}

  /* =======================================================

     VALIDATE

  ======================================================= */

  async validate(

    sandbox: MongoDbSandbox,

    problemSlug: string,

    learnerCode = '',

  ): Promise<MongoDbValidationResult> {

    switch (

      problemSlug

    ) {

      case 'mongodb-create-database':

        return this.validateCreateDatabase(

          sandbox,

          learnerCode,

        );

      case 'mongodb-create-collection':

        return this.validateCreateCollection(

          sandbox,

        );

      case 'mongodb-insert-one':

        return this.validateInsertOne(

          sandbox,

        );

      case 'mongodb-insert-many':

        return this.validateInsertMany(

          sandbox,

        );

      case 'mongodb-find-documents':

        return this.validateFindDocuments(

          sandbox,

          learnerCode,

        );

      case 'mongodb-filter-documents':

        return this.validateFilterDocuments(

          sandbox,

          learnerCode,

        );

      case 'mongodb-comparison-operators':

        return this.validateComparisonOperators(

          sandbox,

          learnerCode,

        );

      case 'mongodb-update-one':

        return this.validateUpdateOne(

          sandbox,

        );

      case 'mongodb-update-many':

        return this.validateUpdateMany(

          sandbox,

        );

      case 'mongodb-delete-one':

        return this.validateDeleteOne(

          sandbox,

        );

      case 'mongodb-projection':

        return this.validateProjection(

          sandbox,

          learnerCode,

        );

      case 'mongodb-sort-limit':

        return this.validateSortLimit(

          sandbox,

          learnerCode,

        );

      case 'mongodb-aggregation':

        return this.validateAggregation(

          sandbox,

          learnerCode,

        );

      case 'mongodb-indexes':

        return this.validateIndexes(

          sandbox,

        );

      case 'mongodb-lookup':

        return this.validateLookup(

          sandbox,

          learnerCode,

        );

      default:

        return {

          passed:

            false,

          message:

            `No MongoDB validator is configured for "${problemSlug}".`,

          tests: [

            {

              name:

                'MongoDB validator',

              passed:

                false,

              message:

                `Unknown MongoDB problem slug: ${problemSlug}`,

            },

          ],

        };

    }

  }

  /* =======================================================

     1. CREATE DATABASE

     Important:

     MongoDB does not permanently create an empty database

     simply because "use database_name" was executed.

     Therefore this exercise validates the learner command.

  ======================================================= */

  private async validateCreateDatabase(
    _sandbox: MongoDbSandbox,
    learnerCode: string,
  ): Promise<MongoDbValidationResult> {
    /*
     * The editor may still contain starter-code comments such as:
     *
     *   // Write your MongoDB command here
     *   use employee_management
     *
     * Those comments must not make a correct learner answer fail.
     *
     * MongoDB also does not persist an empty database merely because
     * `use <database>` was executed, so this problem is validated from
     * the submitted command rather than final database state.
     */

    const normalized = learnerCode
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => {
        if (!line) {
          return false;
        }

        if (
          line.startsWith('//') ||
          line.startsWith('--') ||
          line.startsWith('#')
        ) {
          return false;
        }

        return true;
      })
      .join('\n')
      .trim()
      .replace(/;+\s*$/, '')
      .trim();

    const commands = normalized
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    const command =
      commands.length === 1
        ? commands[0]
        : '';

    const usesUseCommand =
      /^use\s+[A-Za-z0-9_-]+$/i.test(
        command,
      );

    const selectsEmployeeManagement =
      /^use\s+employee_management$/i.test(
        command,
      );

    const tests: MongoDbValidationTestResult[] = [
      {
        name:
          'Uses MongoDB use command',

        passed:
          usesUseCommand,

        message:
          usesUseCommand
            ? 'MongoDB use command detected.'
            : 'Use the MongoDB use command.',
      },

      {
        name:
          'Selects employee_management',

        passed:
          selectsEmployeeManagement,

        message:
          selectsEmployeeManagement
            ? 'employee_management is selected.'
            : 'The database must be named employee_management.',
      },
    ];

    return this.buildResult(
      tests,
      'MongoDB database selection is correct.',
      'MongoDB database selection is not correct.',
    );
  }

  /* =======================================================

     2. CREATE COLLECTION

  ======================================================= */

  private async validateCreateCollection(

    sandbox: MongoDbSandbox,

  ): Promise<MongoDbValidationResult> {

    const collections =

      await this.mongodbSandboxService

        .getCollections(

          sandbox,

        );

    const hasEmployees =

      collections.includes(

        'employees',

      );

    const userCollections =

      collections.filter(

        (

          collection,

        ) =>

          !collection.startsWith(

            'system.',

          ),

      );

    const onlyEmployees =

      userCollections.length ===

        1 &&

      userCollections[0] ===

        'employees';

    const tests:

      MongoDbValidationTestResult[] = [

        {

          name:

            'employees collection exists',

          passed:

            hasEmployees,

          message:

            hasEmployees

              ? 'employees collection exists.'

              : 'employees collection was not found.',

        },

        {

          name:

            'No additional collection created',

          passed:

            onlyEmployees,

          message:

            onlyEmployees

              ? 'Only the required collection exists.'

              : `Expected only employees. Found: ${

                  userCollections.join(

                    ', ',

                  ) ||

                  'none'

                }.`,

        },

      ];

    return this.buildResult(

      tests,

      'employees collection was created correctly.',

      'The required MongoDB collection was not created correctly.',

    );

  }

  /* =======================================================

     3. INSERT ONE

  ======================================================= */

  private async validateInsertOne(

    sandbox: MongoDbSandbox,

  ): Promise<MongoDbValidationResult> {

    const documents =

      await this.getJsonArray(

        sandbox,

        `

print(

  JSON.stringify(

    db.employees.find(

      {},

      {

        _id: 0

      }

    ).toArray()

  )

);

        `.trim(),

      );

    if (

      !documents.success

    ) {

      return this.executionFailure(

        'Insert one validation',

        documents.error,

      );

    }

    const rows =

      this.asObjectArray(

        documents.value,

      );

    const exactDocument =

      rows.some(

        (

          document,

        ) =>

          document.employeeId ===

            1 &&

          document.name ===

            'Ananya' &&

          document.department ===

            'Engineering' &&

          document.salary ===

            65000,

      );

    const tests:

      MongoDbValidationTestResult[] = [

        {

          name:

            'Exactly one document inserted',

          passed:

            rows.length ===

            1,

          message:

            rows.length ===

            1

              ? 'Exactly one employee document exists.'

              : `Expected 1 document but found ${rows.length}.`,

        },

        {

          name:

            'Employee data is correct',

          passed:

            exactDocument,

          message:

            exactDocument

              ? 'The Ananya employee document is correct.'

              : 'Expected employeeId 1, Ananya, Engineering, salary 65000.',

        },

      ];

    return this.buildResult(

      tests,

      'Employee document inserted correctly.',

      'Employee document does not match the requirements.',

    );

  }

  /* =======================================================

     4. INSERT MANY

  ======================================================= */

  private async validateInsertMany(

    sandbox: MongoDbSandbox,

  ): Promise<MongoDbValidationResult> {

    const documents =

      await this.getEmployees(

        sandbox,

      );

    if (

      !documents.success

    ) {

      return this.executionFailure(

        'Insert many validation',

        documents.error,

      );

    }

    const rows =

      this.asObjectArray(

        documents.value,

      );

    const expected = [

      {

        employeeId: 1,

        name: 'Ananya',

        department: 'Engineering',

        salary: 65000,

      },

      {

        employeeId: 2,

        name: 'Rahul',

        department: 'Finance',

        salary: 58000,

      },

      {

        employeeId: 3,

        name: 'Meera',

        department: 'Engineering',

        salary: 72000,

      },

    ];

    const allExpected =

      expected.every(

        (

          expectedEmployee,

        ) =>

          rows.some(

            (

              employee,

            ) =>

              employee.employeeId ===

                expectedEmployee.employeeId &&

              employee.name ===

                expectedEmployee.name &&

              employee.department ===

                expectedEmployee.department &&

              employee.salary ===

                expectedEmployee.salary,

          ),

      );

    const tests:

      MongoDbValidationTestResult[] = [

        {

          name:

            'Exactly three documents inserted',

          passed:

            rows.length ===

            3,

          message:

            rows.length ===

            3

              ? 'Exactly three employee documents exist.'

              : `Expected 3 documents but found ${rows.length}.`,

        },

        {

          name:

            'Required employees exist',

          passed:

            allExpected,

          message:

            allExpected

              ? 'All required employee documents are correct.'

              : 'One or more required employee documents are missing or incorrect.',

        },

      ];

    return this.buildResult(

      tests,

      'All employee documents were inserted correctly.',

      'The inserted employee documents do not match the requirements.',

    );

  }

  /* =======================================================

     5. FIND DOCUMENTS

  ======================================================= */

  private async validateFindDocuments(

    sandbox: MongoDbSandbox,

    learnerCode: string,

  ): Promise<MongoDbValidationResult> {

    const usesFind =

      /\.employees\s*\.\s*find\s*\(/i.test(

        learnerCode,

      );

    const result =

      await this.executeLearnerQueryAsJson(

        sandbox,

        learnerCode,

      );

    const rows =

      result.success

        ? this.asObjectArray(

            result.value,

          )

        : [];

    const tests:

      MongoDbValidationTestResult[] = [

        {

          name:

            'Uses find()',

          passed:

            usesFind,

          message:

            usesFind

              ? 'find() is used.'

              : 'Query the employees collection using find().',

        },

        {

          name:

            'Returns all employees',

          passed:

            result.success &&

            rows.length ===

              5,

          message:

            result.success &&

            rows.length ===

              5

              ? 'All five employees were returned.'

              : 'The query must return all five employees.',

        },

      ];

    return this.buildResult(

      tests,

      'All employee documents were returned correctly.',

      'The query does not return all required employee documents.',

    );

  }

  /* =======================================================

     6. FILTER DOCUMENTS

  ======================================================= */

  private async validateFilterDocuments(

    sandbox: MongoDbSandbox,

    learnerCode: string,

  ): Promise<MongoDbValidationResult> {

    const result =

      await this.executeLearnerQueryAsJson(

        sandbox,

        learnerCode,

      );

    const rows =

      result.success

        ? this.asObjectArray(

            result.value,

          )

        : [];

    const engineeringOnly =

      rows.length ===

        3 &&

      rows.every(

        (

          row,

        ) =>

          row.department ===

          'Engineering',

      );

    const tests:

      MongoDbValidationTestResult[] = [

        {

          name:

            'Filters Engineering department',

          passed:

            /department\s*:\s*['\"]Engineering['\"]/i.test(

              learnerCode,

            ),

          message:

            'Filter using department: "Engineering".',

        },

        {

          name:

            'Returns only Engineering employees',

          passed:

            result.success &&

            engineeringOnly,

          message:

            engineeringOnly

              ? 'Only Engineering employees were returned.'

              : 'Expected exactly the three Engineering employees.',

        },

      ];

    return this.buildResult(

      tests,

      'Engineering employees were filtered correctly.',

      'The Engineering employee filter is incorrect.',

    );

  }

  /* =======================================================

     7. COMPARISON OPERATORS

  ======================================================= */

  private async validateComparisonOperators(

    sandbox: MongoDbSandbox,

    learnerCode: string,

  ): Promise<MongoDbValidationResult> {

    const result =

      await this.executeLearnerQueryAsJson(

        sandbox,

        learnerCode,

      );

    const rows =

      result.success

        ? this.asObjectArray(

            result.value,

          )

        : [];

    const correctRows =

      rows.length ===

        3 &&

      rows.every(

        (

          row,

        ) =>

          typeof row.salary ===

            'number' &&

          row.salary >

            60000,

      );

    const tests:

      MongoDbValidationTestResult[] = [

        {

          name:

            'Uses $gt operator',

          passed:

            /\$gt\s*:\s*60000/i.test(

              learnerCode,

            ),

          message:

            'Use $gt with salary 60000.',

        },

        {

          name:

            'Returns salaries greater than 60000',

          passed:

            result.success &&

            correctRows,

          message:

            correctRows

              ? 'Only employees earning more than 60000 were returned.'

              : 'Expected Ananya, Meera and Kavya.',

        },

      ];

    return this.buildResult(

      tests,

      'Salary comparison query is correct.',

      'Salary comparison query is incorrect.',

    );

  }

  /* =======================================================

     8. UPDATE ONE

  ======================================================= */

  private async validateUpdateOne(

    sandbox: MongoDbSandbox,

  ): Promise<MongoDbValidationResult> {

    const result =

      await this.getEmployees(

        sandbox,

      );

    if (

      !result.success

    ) {

      return this.executionFailure(

        'Update one validation',

        result.error,

      );

    }

    const rows =

      this.asObjectArray(

        result.value,

      );

    const employeeOne =

      rows.find(

        (

          row,

        ) =>

          row.employeeId ===

          1,

      );

    const othersCorrect =

      rows

        .filter(

          (

            row,

          ) =>

            row.employeeId !==

            1,

        )

        .every(

          (

            row,

          ) => {

            const expectedSalary:

              Record<number, number> = {

                2: 58000,

                3: 72000,

                4: 52000,

                5: 80000,

              };

            return (

              typeof row.employeeId ===

                'number' &&

              row.salary ===

                expectedSalary[

                  row.employeeId

                ]

            );

          },

        );

    const tests:

      MongoDbValidationTestResult[] = [

        {

          name:

            'Employee 1 salary updated',

          passed:

            employeeOne?.salary ===

            75000,

          message:

            employeeOne?.salary ===

            75000

              ? 'Employee 1 salary is 75000.'

              : 'Employee 1 salary must be 75000.',

        },

        {

          name:

            'Other employees unchanged',

          passed:

            rows.length ===

              5 &&

            othersCorrect,

          message:

            rows.length ===

              5 &&

            othersCorrect

              ? 'Other employees remain unchanged.'

              : 'Other employee records must not be changed.',

        },

      ];

    return this.buildResult(

      tests,

      'Employee salary updated correctly.',

      'Employee salary update is incorrect.',

    );

  }

  /* =======================================================

     9. UPDATE MANY

  ======================================================= */

  private async validateUpdateMany(

    sandbox: MongoDbSandbox,

  ): Promise<MongoDbValidationResult> {

    const result =

      await this.getEmployees(

        sandbox,

      );

    if (

      !result.success

    ) {

      return this.executionFailure(

        'Update many validation',

        result.error,

      );

    }

    const rows =

      this.asObjectArray(

        result.value,

      );

    const engineering =

      rows.filter(

        (

          row,

        ) =>

          row.department ===

          'Engineering',

      );

    const nonEngineering =

      rows.filter(

        (

          row,

        ) =>

          row.department !==

          'Engineering',

      );

    const engineeringCorrect =

      engineering.length ===

        3 &&

      engineering.every(

        (

          row,

        ) =>

          row.active ===

          true,

      );

    const othersUntouched =

      nonEngineering.every(

        (

          row,

        ) =>

          !Object.prototype.hasOwnProperty.call(

            row,

            'active',

          ),

      );

    const tests:

      MongoDbValidationTestResult[] = [

        {

          name:

            'Engineering employees activated',

          passed:

            engineeringCorrect,

          message:

            engineeringCorrect

              ? 'All Engineering employees contain active: true.'

              : 'Every Engineering employee must contain active: true.',

        },

        {

          name:

            'Other departments unchanged',

          passed:

            othersUntouched,

          message:

            othersUntouched

              ? 'Non-Engineering employees were not changed.'

              : 'Employees outside Engineering must not receive the active field.',

        },

      ];

    return this.buildResult(

      tests,

      'Engineering employees updated correctly.',

      'The multi-document update is incorrect.',

    );

  }

  /* =======================================================

     10. DELETE ONE

  ======================================================= */

  private async validateDeleteOne(

    sandbox: MongoDbSandbox,

  ): Promise<MongoDbValidationResult> {

    const result =

      await this.getEmployees(

        sandbox,

      );

    if (

      !result.success

    ) {

      return this.executionFailure(

        'Delete validation',

        result.error,

      );

    }

    const rows =

      this.asObjectArray(

        result.value,

      );

    const employeeThreeExists =

      rows.some(

        (

          row,

        ) =>

          row.employeeId ===

          3,

      );

    const tests:

      MongoDbValidationTestResult[] = [

        {

          name:

            'Employee 3 deleted',

          passed:

            !employeeThreeExists,

          message:

            !employeeThreeExists

              ? 'Employee 3 no longer exists.'

              : 'Employee 3 still exists.',

        },

        {

          name:

            'Only one employee deleted',

          passed:

            rows.length ===

            4,

          message:

            rows.length ===

            4

              ? 'Exactly one employee was deleted.'

              : `Expected 4 remaining employees but found ${rows.length}.`,

        },

      ];

    return this.buildResult(

      tests,

      'Employee 3 was deleted correctly.',

      'The delete operation is incorrect.',

    );

  }

  /* =======================================================

     11. PROJECTION

  ======================================================= */

  private async validateProjection(

    sandbox: MongoDbSandbox,

    learnerCode: string,

  ): Promise<MongoDbValidationResult> {

    const result =

      await this.executeLearnerQueryAsJson(

        sandbox,

        learnerCode,

      );

    const rows =

      result.success

        ? this.asObjectArray(

            result.value,

          )

        : [];

    const exactFields =

      rows.length ===

        5 &&

      rows.every(

        (

          row,

        ) => {

          const keys =

            Object.keys(

              row,

            ).sort();

          return (

            keys.length ===

              2 &&

            keys[0] ===

              'department' &&

            keys[1] ===

              'name'

          );

        },

      );

    const tests:

      MongoDbValidationTestResult[] = [

        {

          name:

            'Returns all employees',

          passed:

            rows.length ===

            5,

          message:

            'Projection must return all five employees.',

        },

        {

          name:

            'Returns only name and department',

          passed:

            result.success &&

            exactFields,

          message:

            exactFields

              ? 'Only name and department are returned.'

              : 'Return only name and department and exclude _id.',

        },

      ];

    return this.buildResult(

      tests,

      'Projection is correct.',

      'Projection does not match the required fields.',

    );

  }

  /* =======================================================

     12. SORT + LIMIT

  ======================================================= */

  private async validateSortLimit(

    sandbox: MongoDbSandbox,

    learnerCode: string,

  ): Promise<MongoDbValidationResult> {

    const result =

      await this.executeLearnerQueryAsJson(

        sandbox,

        learnerCode,

      );

    const rows =

      result.success

        ? this.asObjectArray(

            result.value,

          )

        : [];

    const correct =

      rows.length ===

        2 &&

      rows[0]?.employeeId ===

        5 &&

      rows[0]?.salary ===

        80000 &&

      rows[1]?.employeeId ===

        3 &&

      rows[1]?.salary ===

        72000;

    const tests:

      MongoDbValidationTestResult[] = [

        {

          name:

            'Uses descending salary sort',

          passed:

            /\.sort\s*\(\s*\{\s*salary\s*:\s*-1\s*\}\s*\)/i.test(

              learnerCode,

            ),

          message:

            'Sort salary in descending order.',

        },

        {

          name:

            'Limits result to two employees',

          passed:

            /\.limit\s*\(\s*2\s*\)/i.test(

              learnerCode,

            ),

          message:

            'Limit the result to 2 documents.',

        },

        {

          name:

            'Returns correct employees',

          passed:

            result.success &&

            correct,

          message:

            correct

              ? 'Kavya and Meera are returned in the correct order.'

              : 'Expected Kavya first and Meera second.',

        },

      ];

    return this.buildResult(

      tests,

      'Sort and limit query is correct.',

      'Sort and limit query is incorrect.',

    );

  }

  /* =======================================================

     13. AGGREGATION

  ======================================================= */

  private async validateAggregation(

    sandbox: MongoDbSandbox,

    learnerCode: string,

  ): Promise<MongoDbValidationResult> {

    const result =

      await this.executeLearnerQueryAsJson(

        sandbox,

        learnerCode,

      );

    const rows =

      result.success

        ? this.asObjectArray(

            result.value,

          )

        : [];

    const engineering =

      rows.find(

        (

          row,

        ) =>

          row.department ===

          'Engineering',

      );

    const finance =

      rows.find(

        (

          row,

        ) =>

          row.department ===

          'Finance',

      );

    const hr =

      rows.find(

        (

          row,

        ) =>

          row.department ===

          'HR',

      );

    const correct =

      rows.length ===

        3 &&

      this.numberClose(

        engineering?.average_salary,

        72333.33333333333,

      ) &&

      this.numberClose(

        finance?.average_salary,

        58000,

      ) &&

      this.numberClose(

        hr?.average_salary,

        52000,

      );

    const tests:

      MongoDbValidationTestResult[] = [

        {

          name:

            'Uses aggregation pipeline',

          passed:

            /\.aggregate\s*\(/i.test(

              learnerCode,

            ),

          message:

            'Use aggregate() for this problem.',

        },

        {

          name:

            'Uses $group and $avg',

          passed:

            learnerCode.includes(

              '$group',

            ) &&

            learnerCode.includes(

              '$avg',

            ),

          message:

            'Group by department and calculate the average using $avg.',

        },

        {

          name:

            'Average salaries are correct',

          passed:

            result.success &&

            correct,

          message:

            correct

              ? 'Department averages are correct.'

              : 'Expected correct averages for Engineering, Finance and HR.',

        },

      ];

    return this.buildResult(

      tests,

      'Aggregation result is correct.',

      'Aggregation result is incorrect.',

    );

  }

  /* =======================================================

     14. INDEXES

  ======================================================= */

  private async validateIndexes(

    sandbox: MongoDbSandbox,

  ): Promise<MongoDbValidationResult> {

    const result =

      await this.getJsonArray(

        sandbox,

        `

print(

  JSON.stringify(

    db.employees.getIndexes()

  )

);

        `.trim(),

      );

    if (

      !result.success

    ) {

      return this.executionFailure(

        'Index validation',

        result.error,

      );

    }

    const indexes =

      this.asObjectArray(

        result.value,

      );

    const targetIndex =

      indexes.find(

        (

          index,

        ) =>

          index.name ===

          'idx_employees_name',

      );

    const key =

      this.asRecord(

        targetIndex?.key,

      );

    const correctIndex =

      Boolean(

        targetIndex,

      ) &&

      key?.name ===

        1 &&

      Object.keys(

        key ?? {},

      ).length ===

        1;

    const nonDefaultIndexes =

      indexes.filter(

        (

          index,

        ) =>

          index.name !==

          '_id_',

      );

    const tests:

      MongoDbValidationTestResult[] = [

        {

          name:

            'Named index exists',

          passed:

            Boolean(

              targetIndex,

            ),

          message:

            targetIndex

              ? 'idx_employees_name exists.'

              : 'idx_employees_name was not found.',

        },

        {

          name:

            'Index definition is correct',

          passed:

            correctIndex,

          message:

            correctIndex

              ? 'name is indexed in ascending order.'

              : 'Index only name in ascending order.',

        },

        {

          name:

            'No additional custom indexes',

          passed:

            nonDefaultIndexes.length ===

              1,

          message:

            nonDefaultIndexes.length ===

              1

              ? 'Only the required custom index exists.'

              : 'Do not create additional custom indexes.',

        },

      ];

    return this.buildResult(

      tests,

      'MongoDB index was created correctly.',

      'MongoDB index does not match the requirements.',

    );

  }

  /* =======================================================

     15. LOOKUP

  ======================================================= */

  private async validateLookup(

    sandbox: MongoDbSandbox,

    learnerCode: string,

  ): Promise<MongoDbValidationResult> {

    const result =

      await this.executeLearnerQueryAsJson(

        sandbox,

        learnerCode,

      );

    const rows =

      result.success

        ? this.asObjectArray(

            result.value,

          )

        : [];

    const expectedDepartments:

      Record<number, string> = {

        1: 'Engineering',

        2: 'Finance',

        3: 'Engineering',

        4: 'HR',

      };

    const correct =

      rows.length ===

        4 &&

      rows.every(

        (

          employee,

        ) => {

          if (

            typeof employee.employeeId !==

            'number'

          ) {

            return false;

          }

          const departmentInfo =

            Array.isArray(

              employee.departmentInfo,

            )

              ? employee.departmentInfo

              : [];

          if (

            departmentInfo.length !==

            1

          ) {

            return false;

          }

          const department =

            this.asRecord(

              departmentInfo[0],

            );

          return (

            department?.departmentName ===

            expectedDepartments[

              employee.employeeId

            ]

          );

        },

      );

    const tests:

      MongoDbValidationTestResult[] = [

        {

          name:

            'Uses $lookup',

          passed:

            learnerCode.includes(

              '$lookup',

            ),

          message:

            'Use the $lookup aggregation stage.',

        },

        {

          name:

            'Uses departmentInfo output field',

          passed:

            /as\s*:\s*['\"]departmentInfo['\"]/i.test(

              learnerCode,

            ),

          message:

            'Store matching department documents in departmentInfo.',

        },

        {

          name:

            'Employees contain correct departments',

          passed:

            result.success &&

            correct,

          message:

            correct

              ? 'Every employee contains the correct department information.'

              : 'Each employee must contain exactly one matching department in departmentInfo.',

        },

      ];

    return this.buildResult(

      tests,

      '$lookup result is correct.',

      '$lookup result does not match the requirements.',

    );

  }

  /* =======================================================

     GET EMPLOYEES

  ======================================================= */

  private async getEmployees(

    sandbox: MongoDbSandbox,

  ): Promise<MongoDbJsonResult> {

    return this.getJsonArray(

      sandbox,

      `

print(

  JSON.stringify(

    db.employees.find(

      {},

      {

        _id: 0

      }

    )

    .sort({

      employeeId: 1

    })

    .toArray()

  )

);

      `.trim(),

    );

  }

  /* =======================================================

     GET JSON ARRAY

     Executes an internal validation script.

     The script must print one JSON value.

  ======================================================= */

  private async getJsonArray(

    sandbox: MongoDbSandbox,

    script: string,

  ): Promise<MongoDbJsonResult> {

    const result =

      await this.mongodbSandboxService

        .executeScript(

          sandbox,

          script,

        );

    if (

      result.exitCode !==

      0

    ) {

      return {

        success:

          false,

        error:

          result.stderr ||

          result.stdout ||

          'MongoDB validation query failed.',

      };

    }

    try {

      return {

        success:

          true,

        value:

          JSON.parse(

            result.stdout,

          ),

      };

    } catch {

      return {

        success:

          false,

        error:

          `MongoDB validator expected JSON output but received: ${result.stdout}`,

      };

    }

  }

  /* =======================================================

     EXECUTE LEARNER QUERY AS JSON

     find() and aggregate() return cursors in mongosh.

     For result-based validation we transform the final

     learner expression into JSON-printable output.

     This helper intentionally supports the query exercises

     in this MongoDB problem set. State-changing exercises

     are validated from final database state instead.

  ======================================================= */

  private async executeLearnerQueryAsJson(

    sandbox: MongoDbSandbox,

    learnerCode: string,

  ): Promise<MongoDbJsonResult> {

    const expression =

      learnerCode

        .trim()

        .replace(

          /;+\s*$/,

          '',

        );

    if (

      !expression

    ) {

      return {

        success:

          false,

        error:

          'MongoDB command is empty.',

      };

    }

    /*

     \* These result-based exercises are expected to contain

     \* one MongoDB query expression.

     \*

     \* Wrapping that expression allows the validator to

     \* materialize a cursor with toArray().

     */

    const script = `

try {

  const result = (

${expression}

  );

  let value = result;

  if (

    result &&

    typeof result.toArray === 'function'

  ) {

    value =

      result.toArray();

  }

  print(

    JSON.stringify(

      value

    )

  );

} catch (error) {

  print(

    JSON.stringify({

      __elabValidationError:

        error instanceof Error

          ? error.message

          : String(error)

    })

  );

  quit(1);

}

    `.trim();

    const result =

      await this.mongodbSandboxService

        .executeScript(

          sandbox,

          script,

        );

    if (

      result.exitCode !==

      0

    ) {

      return {

        success:

          false,

        error:

          result.stderr ||

          result.stdout ||

          'MongoDB learner query failed.',

      };

    }

    try {

      const value =

        JSON.parse(

          result.stdout,

        );

      return {

        success:

          true,

        value,

      };

    } catch {

      return {

        success:

          false,

        error:

          `Unable to parse MongoDB query output: ${result.stdout}`,

      };

    }

  }

  /* =======================================================

     BUILD RESULT

  ======================================================= */

  private buildResult(

    tests: MongoDbValidationTestResult[],

    successMessage: string,

    failureMessage: string,

  ): MongoDbValidationResult {

    const passed =

      tests.every(

        (

          test,

        ) =>

          test.passed,

      );

    return {

      passed,

      message:

        passed

          ? successMessage

          : failureMessage,

      tests,

    };

  }

  /* =======================================================

     EXECUTION FAILURE

  ======================================================= */

  private executionFailure(

    name: string,

    error?: string,

  ): MongoDbValidationResult {

    return {

      passed:

        false,

      message:

        error ||

        'MongoDB validation failed.',

      tests: [

        {

          name,

          passed:

            false,

          message:

            error ||

            'Unable to validate MongoDB result.',

        },

      ],

    };

  }

  /* =======================================================

     OBJECT HELPERS

  ======================================================= */

  private asObjectArray(

    value: unknown,

  ): Record<string, unknown>[] {

    if (

      !Array.isArray(

        value,

      )

    ) {

      return [];

    }

    return value

      .map(

        (

          item,

        ) =>

          this.asRecord(

            item,

          ),

      )

      .filter(

        (

          item,

        ): item is Record<string, unknown> =>

          Boolean(

            item,

          ),

      );

  }

  private asRecord(

    value: unknown,

  ): Record<string, unknown> | undefined {

    if (

      typeof value !==

        'object' ||

      value ===

        null ||

      Array.isArray(

        value,

      )

    ) {

      return undefined;

    }

    return value as

      Record<string, unknown>;

  }

  /* =======================================================

     NUMBER COMPARISON

  ======================================================= */

  private numberClose(

    value: unknown,

    expected: number,

  ): boolean {

    return (

      typeof value ===

        'number' &&

      Math.abs(

        value -

        expected,

      ) <

        0.01

    );

  }

}
