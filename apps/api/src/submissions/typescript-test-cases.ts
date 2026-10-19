/* =========================================================
   TYPESCRIPT SUBMISSION TEST CASES

   Server-side only.

   These tests are used by:
   C:\dev\elab-platform\apps\api\src\submissions\submissions.service.ts

   IMPORTANT:
   - Do not send hidden test definitions to the browser.
   - Runtime output checks alone are not enough for these problems,
     because they are designed to teach TypeScript language features.
   - requiredSourceChecks validate that the learner actually used
     the TypeScript construct required by the problem.
========================================================= */

/* =========================================================
   SOURCE CHECK
========================================================= */

export type TypeScriptSourceCheck = {
  pattern: RegExp;

  message: string;
};

/* =========================================================
   TYPESCRIPT TEST CASE
========================================================= */

export type TypeScriptTestCase = {
  id: string;

  input: string;

  expectedOutput: string;

  requiredSourceChecks?: TypeScriptSourceCheck[];

  forbiddenSourceChecks?: TypeScriptSourceCheck[];
};

/* =========================================================
   TEST CASE MAP
========================================================= */

const typescriptTestCases:
  Record<
    string,
    TypeScriptTestCase[]
  > = {
  /* =======================================================
     01 — BASIC TYPES
  ======================================================= */

  'typescript-basic-types': [
    {
      id:
        'typescript-basic-types-hidden-1',

      input:
        '',

      expectedOutput:
        `Name: Alex
Age: 25
Active: true`,

      requiredSourceChecks: [
        {
          pattern:
            /\b(?:const|let)\s+name\s*:\s*string\b/,

          message:
            'Declare name with an explicit string type.',
        },
      ],
    },

    {
      id:
        'typescript-basic-types-hidden-2',

      input:
        '',

      expectedOutput:
        `Name: Alex
Age: 25
Active: true`,

      requiredSourceChecks: [
        {
          pattern:
            /\b(?:const|let)\s+age\s*:\s*number\b/,

          message:
            'Declare age with an explicit number type.',
        },

        {
          pattern:
            /\b(?:const|let)\s+isActive\s*:\s*boolean\b/,

          message:
            'Declare isActive with an explicit boolean type.',
        },
      ],
    },

    {
      id:
        'typescript-basic-types-hidden-3',

      input:
        '',

      expectedOutput:
        `Name: Alex
Age: 25
Active: true`,

      forbiddenSourceChecks: [
        {
          pattern:
            /\bany\b/,

          message:
            'Do not use any.',
        },
      ],
    },
  ],

  /* =======================================================
     02 — TYPED FUNCTIONS
  ======================================================= */

  'typescript-function-types': [
    {
      id:
        'typescript-function-types-hidden-1',

      input:
        '',

      expectedOutput:
        '20',

      requiredSourceChecks: [
        {
          pattern:
            /function\s+add\s*\(\s*a\s*:\s*number\s*,\s*b\s*:\s*number\s*\)/,

          message:
            'The add function must accept two number parameters.',
        },
      ],
    },

    {
      id:
        'typescript-function-types-hidden-2',

      input:
        '',

      expectedOutput:
        '20',

      requiredSourceChecks: [
        {
          pattern:
            /function\s+add[\s\S]*?\)\s*:\s*number\s*\{/,

          message:
            'The add function must explicitly return number.',
        },

        {
          pattern:
            /\breturn\s+a\s*\+\s*b\s*;/,

          message:
            'Return the sum of a and b.',
        },
      ],
    },

    {
      id:
        'typescript-function-types-hidden-3',

      input:
        '',

      expectedOutput:
        '20',

      requiredSourceChecks: [
        {
          pattern:
            /add\s*\(\s*12\s*,\s*8\s*\)/,

          message:
            'Call add with 12 and 8.',
        },
      ],

      forbiddenSourceChecks: [
        {
          pattern:
            /\bany\b/,

          message:
            'Do not use any.',
        },
      ],
    },
  ],

  /* =======================================================
     03 — TYPED ARRAYS AND OBJECTS
  ======================================================= */

  'typescript-arrays-objects': [
    {
      id:
        'typescript-arrays-objects-hidden-1',

      input:
        '',

      expectedOutput:
        'Ravi',

      requiredSourceChecks: [
        {
          pattern:
            /\b(?:type|interface)\s+Student\b/,

          message:
            'Define a typed Student object shape.',
        },

        {
          pattern:
            /\bname\s*:\s*string\b/,

          message:
            'Student name must be typed as string.',
        },

        {
          pattern:
            /\bscore\s*:\s*number\b/,

          message:
            'Student score must be typed as number.',
        },
      ],
    },

    {
      id:
        'typescript-arrays-objects-hidden-2',

      input:
        '',

      expectedOutput:
        'Ravi',

      requiredSourceChecks: [
        {
          pattern:
            /\bstudents\s*:\s*Student\s*\[\s*\]/,

          message:
            'Use a typed Student array.',
        },
      ],
    },

    {
      id:
        'typescript-arrays-objects-hidden-3',

      input:
        '',

      expectedOutput:
        'Ravi',

      forbiddenSourceChecks: [
        {
          pattern:
            /\bany\b/,

          message:
            'Do not use any.',
        },
      ],
    },
  ],

  /* =======================================================
     04 — INTERFACES
  ======================================================= */

  'typescript-interfaces': [
    {
      id:
        'typescript-interfaces-hidden-1',

      input:
        '',

      expectedOutput:
        'Laptop - ₹55000',

      requiredSourceChecks: [
        {
          pattern:
            /\binterface\s+Product\s*\{/,

          message:
            'Define an interface named Product.',
        },
      ],
    },

    {
      id:
        'typescript-interfaces-hidden-2',

      input:
        '',

      expectedOutput:
        'Laptop - ₹55000',

      requiredSourceChecks: [
        {
          pattern:
            /\bid\s*:\s*number\b/,

          message:
            'Product.id must be typed as number.',
        },

        {
          pattern:
            /\bname\s*:\s*string\b/,

          message:
            'Product.name must be typed as string.',
        },

        {
          pattern:
            /\bprice\s*:\s*number\b/,

          message:
            'Product.price must be typed as number.',
        },

        {
          pattern:
            /\binStock\s*:\s*boolean\b/,

          message:
            'Product.inStock must be typed as boolean.',
        },
      ],
    },

    {
      id:
        'typescript-interfaces-hidden-3',

      input:
        '',

      expectedOutput:
        'Laptop - ₹55000',

      requiredSourceChecks: [
        {
          pattern:
            /\bproduct\s*:\s*Product\b/,

          message:
            'Create a product object typed as Product.',
        },
      ],

      forbiddenSourceChecks: [
        {
          pattern:
            /\bany\b/,

          message:
            'Do not use any.',
        },
      ],
    },
  ],

  /* =======================================================
     05 — UNION TYPES
  ======================================================= */

  'typescript-unions': [
    {
      id:
        'typescript-unions-hidden-1',

      input:
        '',

      expectedOutput:
        'Status: completed',

      requiredSourceChecks: [
        {
          pattern:
            /\btype\s+Status\s*=\s*[\s\S]*?['"]pending['"]\s*\|\s*['"]completed['"]\s*\|\s*['"]failed['"]/,

          message:
            'Define Status as the required literal union type.',
        },
      ],
    },

    {
      id:
        'typescript-unions-hidden-2',

      input:
        '',

      expectedOutput:
        'Status: completed',

      requiredSourceChecks: [
        {
          pattern:
            /function\s+printStatus\s*\(\s*status\s*:\s*Status\s*\)\s*:\s*void/,

          message:
            'printStatus must accept Status and return void.',
        },
      ],
    },

    {
      id:
        'typescript-unions-hidden-3',

      input:
        '',

      expectedOutput:
        'Status: completed',

      requiredSourceChecks: [
        {
          pattern:
            /printStatus\s*\(\s*['"]completed['"]\s*\)/,

          message:
            'Call printStatus with completed.',
        },
      ],

      forbiddenSourceChecks: [
        {
          pattern:
            /function\s+printStatus\s*\(\s*status\s*:\s*string\b/,

          message:
            'Do not type the printStatus parameter as string.',
        },

        {
          pattern:
            /\bany\b/,

          message:
            'Do not use any.',
        },
      ],
    },
  ],

  /* =======================================================
     06 — GENERICS
  ======================================================= */

  'typescript-generics': [
    {
      id:
        'typescript-generics-hidden-1',

      input:
        '',

      expectedOutput:
        `42
TypeScript`,

      requiredSourceChecks: [
        {
          pattern:
            /function\s+identity\s*<\s*T\s*>\s*\(/,

          message:
            'Create identity as a generic function using <T>.',
        },
      ],
    },

    {
      id:
        'typescript-generics-hidden-2',

      input:
        '',

      expectedOutput:
        `42
TypeScript`,

      requiredSourceChecks: [
        {
          pattern:
            /identity\s*<\s*T\s*>\s*\(\s*value\s*:\s*T\s*\)\s*:\s*T/,

          message:
            'identity must accept T and return T.',
        },

        {
          pattern:
            /\breturn\s+value\s*;/,

          message:
            'identity must return the value it receives.',
        },
      ],
    },

    {
      id:
        'typescript-generics-hidden-3',

      input:
        '',

      expectedOutput:
        `42
TypeScript`,

      requiredSourceChecks: [
        {
          pattern:
            /identity\s*<\s*number\s*>\s*\(\s*42\s*\)/,

          message:
            'Call identity<number> with 42.',
        },

        {
          pattern:
            /identity\s*<\s*string\s*>\s*\(\s*['"]TypeScript['"]\s*\)/,

          message:
            'Call identity<string> with TypeScript.',
        },
      ],

      forbiddenSourceChecks: [
        {
          pattern:
            /\bany\b/,

          message:
            'Do not use any.',
        },
      ],
    },
  ],

  /* =======================================================
     07 — CLASSES
  ======================================================= */

  'typescript-classes': [
    {
      id:
        'typescript-classes-hidden-1',

      input:
        '',

      expectedOutput:
        'Priya works as Developer',

      requiredSourceChecks: [
        {
          pattern:
            /\bclass\s+Employee\s*\{/,

          message:
            'Create a class named Employee.',
        },
      ],
    },

    {
      id:
        'typescript-classes-hidden-2',

      input:
        '',

      expectedOutput:
        'Priya works as Developer',

      requiredSourceChecks: [
        {
          pattern:
            /\bname\s*:\s*string\b/,

          message:
            'Employee name must be typed as string.',
        },

        {
          pattern:
            /\brole\s*:\s*string\b/,

          message:
            'Employee role must be typed as string.',
        },

        {
          pattern:
            /\bconstructor\s*\(/,

          message:
            'Employee must use a constructor.',
        },
      ],
    },

    {
      id:
        'typescript-classes-hidden-3',

      input:
        '',

      expectedOutput:
        'Priya works as Developer',

      requiredSourceChecks: [
        {
          pattern:
            /\bdescribe\s*\(\s*\)\s*:\s*string\b/,

          message:
            'describe must explicitly return string.',
        },

        {
          pattern:
            /new\s+Employee\s*\(\s*['"]Priya['"]\s*,\s*['"]Developer['"]\s*\)/,

          message:
            'Create the required Priya Developer employee.',
        },
      ],
    },
  ],

  /* =======================================================
     08 — TYPED USER DIRECTORY
  ======================================================= */

  'typescript-user-directory': [
    {
      id:
        'typescript-user-directory-hidden-1',

      input:
        '',

      expectedOutput:
        `Kiran
Rohan`,

      requiredSourceChecks: [
        {
          pattern:
            /\btype\s+Role\s*=\s*[\s\S]*?['"]admin['"]\s*\|\s*['"]student['"]\s*\|\s*['"]trainer['"]/,

          message:
            'Define Role as the required literal union type.',
        },

        {
          pattern:
            /\binterface\s+User\s*\{/,

          message:
            'Define an interface named User.',
        },
      ],
    },

    {
      id:
        'typescript-user-directory-hidden-2',

      input:
        '',

      expectedOutput:
        `Kiran
Rohan`,

      requiredSourceChecks: [
        {
          pattern:
            /\bid\s*:\s*number\b/,

          message:
            'User.id must be typed as number.',
        },

        {
          pattern:
            /\bname\s*:\s*string\b/,

          message:
            'User.name must be typed as string.',
        },

        {
          pattern:
            /\brole\s*:\s*Role\b/,

          message:
            'User.role must use the Role type.',
        },

        {
          pattern:
            /\busers\s*:\s*User\s*\[\s*\]/,

          message:
            'Use a typed User array.',
        },
      ],
    },

    {
      id:
        'typescript-user-directory-hidden-3',

      input:
        '',

      expectedOutput:
        `Kiran
Rohan`,

      requiredSourceChecks: [
        {
          pattern:
            /function\s+filterUsersByRole\s*\([\s\S]*?items\s*:\s*User\s*\[\s*\][\s\S]*?role\s*:\s*Role[\s\S]*?\)\s*:\s*User\s*\[\s*\]/,

          message:
            'filterUsersByRole must accept User[] and Role and return User[].',
        },

        {
          pattern:
            /\.filter\s*\(/,

          message:
            'Filter users by role.',
        },

        {
          pattern:
            /filterUsersByRole\s*\(\s*users\s*,\s*['"]student['"]\s*\)/,

          message:
            'Filter the directory by student.',
        },
      ],

      forbiddenSourceChecks: [
        {
          pattern:
            /\bany\b/,

          message:
            'Do not use any.',
        },
      ],
    },
  ],
};

/* =========================================================
   GET TYPESCRIPT TEST CASES
========================================================= */

export function getTypeScriptTestCases(
  problemSlug: string,
): TypeScriptTestCase[] {
  return (
    typescriptTestCases[
      problemSlug
    ] ?? []
  );
}
