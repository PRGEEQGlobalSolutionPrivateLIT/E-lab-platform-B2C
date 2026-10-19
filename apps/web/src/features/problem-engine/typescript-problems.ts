import type {
  PracticeProblem,
} from './types';

/* =========================================================
   TYPESCRIPT PROBLEMS
========================================================= */

export const typescriptProblems:
  PracticeProblem[] = [
  {
    slug: 'typescript-basic-types',
    title: 'TypeScript Basic Types',
    technologySlug: 'typescript',
    difficulty: 'Easy',
    workspaceType: 'code',
    shortDescription:
      'Practice TypeScript primitive types and typed variables.',
    problemStatement:
      `Create typed variables for a user's name, age, and active status. Print them in the exact format shown.

Use:
- string for the name
- number for the age
- boolean for the active status`,
    inputFormat: 'No input is required.',
    outputFormat:
      `Print exactly:
Name: Alex
Age: 25
Active: true`,
    constraints: [
      'Use explicit TypeScript type annotations.',
      'Do not use any.',
    ],
    notes: [
      'Focus on string, number, and boolean types.',
    ],
    skills: [
      'TypeScript Syntax',
      'Primitive Types',
      'Type Annotations',
    ],
    estimatedMinutes: 15,
    defaultLanguage: 'typescript',
    allowedLanguages: [
      'typescript',
    ],
    starterCode:
      `const name: string = '';
const age: number = 0;
const isActive: boolean = false;

// Print the values in the required format.
`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Basic typed values',
        expectedOutput:
          `Name: Alex
Age: 25
Active: true`,
      },
    ],
  },

  {
    slug: 'typescript-function-types',
    title: 'Typed Functions',
    technologySlug: 'typescript',
    difficulty: 'Easy',
    workspaceType: 'code',
    shortDescription:
      'Create a TypeScript function with typed parameters and return value.',
    problemStatement:
      `Create a function named add that accepts two number parameters and returns their sum as a number.

Call the function with 12 and 8, then print the result.`,
    inputFormat: 'No input is required.',
    outputFormat: 'Print the sum as a single number.',
    constraints: [
      'The function parameters must be typed as number.',
      'The return type must be number.',
    ],
    notes: [
      'Use an explicit return type on the function.',
    ],
    skills: [
      'Functions',
      'Parameter Types',
      'Return Types',
    ],
    estimatedMinutes: 15,
    defaultLanguage: 'typescript',
    allowedLanguages: [
      'typescript',
    ],
    starterCode:
      `function add(
  a: number,
  b: number,
): number {
  return 0;
}

console.log(
  add(12, 8),
);
`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Add two numbers',
        expectedOutput: '20',
      },
    ],
  },

  {
    slug: 'typescript-arrays-objects',
    title: 'Typed Arrays and Objects',
    technologySlug: 'typescript',
    difficulty: 'Easy',
    workspaceType: 'code',
    shortDescription:
      'Work with typed arrays and object shapes in TypeScript.',
    problemStatement:
      `Create an array of three student objects.

Each student must contain:
- name: string
- score: number

Print the name of the student with the highest score.`,
    inputFormat: 'No input is required.',
    outputFormat: 'Print only the top student name.',
    constraints: [
      'Use a typed array.',
      'Each object must contain name and score.',
      'Do not use any.',
    ],
    skills: [
      'Arrays',
      'Objects',
      'Object Types',
      'Iteration',
    ],
    estimatedMinutes: 20,
    defaultLanguage: 'typescript',
    allowedLanguages: [
      'typescript',
    ],
    starterCode:
      `type Student = {
  name: string;
  score: number;
};

const students: Student[] = [
  { name: 'Asha', score: 82 },
  { name: 'Ravi', score: 91 },
  { name: 'Maya', score: 88 },
];

// Find and print the top student's name.
`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Highest score',
        expectedOutput: 'Ravi',
      },
    ],
  },

  {
    slug: 'typescript-interfaces',
    title: 'Create and Use an Interface',
    technologySlug: 'typescript',
    difficulty: 'Medium',
    workspaceType: 'code',
    shortDescription:
      'Model structured data using a TypeScript interface.',
    problemStatement:
      `Define an interface named Product with:
- id: number
- name: string
- price: number
- inStock: boolean

Create one product object and print:
<name> - ₹<price>

Example:
Laptop - ₹55000`,
    inputFormat: 'No input is required.',
    outputFormat:
      'Print the product name and price in the required format.',
    constraints: [
      'Use an interface named Product.',
      'The object must satisfy the Product interface.',
      'Do not use any.',
    ],
    skills: [
      'Interfaces',
      'Object Modeling',
      'Type Checking',
    ],
    estimatedMinutes: 20,
    defaultLanguage: 'typescript',
    allowedLanguages: [
      'typescript',
    ],
    starterCode:
      `interface Product {
  // Add the required properties.
}

const product: Product = {
  // Add product values.
};

// Print: <name> - ₹<price>
`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Product output',
        expectedOutput: 'Laptop - ₹55000',
      },
    ],
  },

  {
    slug: 'typescript-unions',
    title: 'Union Types',
    technologySlug: 'typescript',
    difficulty: 'Medium',
    workspaceType: 'code',
    shortDescription:
      'Use union types to restrict allowed values.',
    problemStatement:
      `Create a type alias named Status that only allows:
- "pending"
- "completed"
- "failed"

Create a function named printStatus that accepts a Status value and prints:
Status: <value>

Call it with "completed".`,
    inputFormat: 'No input is required.',
    outputFormat: 'Print exactly: Status: completed',
    constraints: [
      'Use a union type.',
      'Do not use string as the function parameter type.',
      'Do not use any.',
    ],
    skills: [
      'Type Aliases',
      'Union Types',
      'Literal Types',
    ],
    estimatedMinutes: 20,
    defaultLanguage: 'typescript',
    allowedLanguages: [
      'typescript',
    ],
    starterCode:
      `type Status =
  | 'pending'
  | 'completed'
  | 'failed';

function printStatus(
  status: Status,
): void {
  // Print the status.
}

printStatus(
  'completed',
);
`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Completed status',
        expectedOutput: 'Status: completed',
      },
    ],
  },

  {
    slug: 'typescript-generics',
    title: 'Generic Identity Function',
    technologySlug: 'typescript',
    difficulty: 'Medium',
    workspaceType: 'code',
    shortDescription:
      'Create a reusable generic function that preserves value types.',
    problemStatement:
      `Create a generic function named identity<T>.

The function must:
1. Accept a value of type T.
2. Return the same value as type T.

Call it once with the number 42 and once with the string TypeScript.
Print both returned values on separate lines.`,
    inputFormat: 'No input is required.',
    outputFormat:
      `Print:
42
TypeScript`,
    constraints: [
      'The function must use a generic type parameter.',
      'Do not use any.',
      'Return the same value received by the function.',
    ],
    skills: [
      'Generics',
      'Generic Functions',
      'Type Inference',
    ],
    estimatedMinutes: 25,
    defaultLanguage: 'typescript',
    allowedLanguages: [
      'typescript',
    ],
    starterCode:
      `function identity<T>(
  value: T,
): T {
  return value;
}

console.log(
  identity<number>(42),
);

console.log(
  identity<string>('TypeScript'),
);
`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Generic values',
        expectedOutput:
          `42
TypeScript`,
      },
    ],
  },

  {
    slug: 'typescript-classes',
    title: 'TypeScript Class',
    technologySlug: 'typescript',
    difficulty: 'Medium',
    workspaceType: 'code',
    shortDescription:
      'Create a typed class with constructor properties and a method.',
    problemStatement:
      `Create a class named Employee with:
- name: string
- role: string

Add a method named describe that returns:
<name> works as <role>

Create:
name = Priya
role = Developer

Print the result of describe().`,
    inputFormat: 'No input is required.',
    outputFormat:
      'Print exactly: Priya works as Developer',
    constraints: [
      'Use a class named Employee.',
      'Use typed class properties.',
      'Use a constructor.',
      'The describe method must return a string.',
    ],
    skills: [
      'Classes',
      'Constructors',
      'Methods',
      'Property Types',
    ],
    estimatedMinutes: 25,
    defaultLanguage: 'typescript',
    allowedLanguages: [
      'typescript',
    ],
    starterCode:
      `class Employee {
  constructor(
    public name: string,
    public role: string,
  ) {}

  describe(): string {
    return '';
  }
}

const employee =
  new Employee(
    'Priya',
    'Developer',
  );

console.log(
  employee.describe(),
);
`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Employee description',
        expectedOutput:
          'Priya works as Developer',
      },
    ],
  },

  {
    slug: 'typescript-user-directory',
    title: 'Typed User Directory',
    technologySlug: 'typescript',
    difficulty: 'Hard',
    workspaceType: 'code',
    shortDescription:
      'Combine interfaces, union types, arrays, and typed functions.',
    problemStatement:
      `Build a small typed user directory.

Create:
1. A Role union type with "admin" | "student" | "trainer".
2. A User interface containing:
   - id: number
   - name: string
   - role: Role
3. A function filterUsersByRole(users, role) that returns only users matching the requested role.

Use these users:
1, Anu, admin
2, Kiran, student
3, Maya, trainer
4, Rohan, student

Filter by student and print each matching user's name on a separate line.`,
    inputFormat: 'No input is required.',
    outputFormat:
      `Print:
Kiran
Rohan`,
    constraints: [
      'Use a Role union type.',
      'Use a User interface.',
      'The filtering function must have typed parameters and return User[].',
      'Do not use any.',
    ],
    notes: [
      'This problem combines several TypeScript fundamentals used later in React, Next.js, and NestJS.',
    ],
    skills: [
      'Interfaces',
      'Union Types',
      'Typed Arrays',
      'Typed Functions',
      'Array Filtering',
    ],
    estimatedMinutes: 35,
    defaultLanguage: 'typescript',
    allowedLanguages: [
      'typescript',
    ],
    starterCode:
      `type Role =
  | 'admin'
  | 'student'
  | 'trainer';

interface User {
  id: number;
  name: string;
  role: Role;
}

const users: User[] = [
  { id: 1, name: 'Anu', role: 'admin' },
  { id: 2, name: 'Kiran', role: 'student' },
  { id: 3, name: 'Maya', role: 'trainer' },
  { id: 4, name: 'Rohan', role: 'student' },
];

function filterUsersByRole(
  items: User[],
  role: Role,
): User[] {
  return [];
}

const students =
  filterUsersByRole(
    users,
    'student',
  );

// Print each student name on a separate line.
`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Filter students',
        expectedOutput:
          `Kiran
Rohan`,
      },
    ],
  },
];
