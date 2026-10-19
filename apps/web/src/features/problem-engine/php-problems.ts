import type { PracticeProblem } from './types';

export const phpProblems: PracticeProblem[] = [
  {
    slug: 'php-hello-world',
    title: 'Hello World',
    technologySlug: 'php',
    difficulty: 'Easy',
    workspaceType: 'code',
    shortDescription:
      'Print Hello, World! using PHP.',
    problemStatement:
      'Write a PHP program that prints Hello, World! exactly as shown.',
    outputFormat:
      'Print the text: Hello, World!',
    skills: [
      'PHP Syntax',
      'echo',
    ],
    estimatedMinutes: 5,
    defaultLanguage: 'php',
    allowedLanguages: ['php'],
    starterCode: `<?php

// Write your code here
`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Print Hello World',
        expectedOutput: 'Hello, World!',
      },
    ],
  },

  {
    slug: 'php-variables',
    title: 'PHP Variables',
    technologySlug: 'php',
    difficulty: 'Easy',
    workspaceType: 'code',
    shortDescription:
      'Create and print a PHP variable.',
    problemStatement:
      'Create a variable containing the text Hello PHP and print it.',
    outputFormat:
      'Print exactly: Hello PHP',
    skills: [
      'PHP Variables',
      'echo',
    ],
    estimatedMinutes: 5,
    defaultLanguage: 'php',
    allowedLanguages: ['php'],
    starterCode: `<?php

// Create the variable and print it
`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Print Variable',
        expectedOutput: 'Hello PHP',
      },
    ],
  },

  {
    slug: 'php-user-input',
    title: 'Read User Input',
    technologySlug: 'php',
    difficulty: 'Easy',
    workspaceType: 'code',
    shortDescription:
      'Read and print input using PHP.',
    problemStatement:
      'Read a line from standard input and print it exactly as entered.',
    inputFormat:
      'A single line of text.',
    outputFormat:
      'Print the input text.',
    skills: [
      'STDIN',
      'fgets',
      'echo',
    ],
    estimatedMinutes: 10,
    defaultLanguage: 'php',
    allowedLanguages: ['php'],
    starterCode: `<?php

// Read input from STDIN
`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Read Text',
        input: 'PHP',
        expectedOutput: 'PHP',
      },
    ],
  },

  {
    slug: 'php-add-numbers',
    title: 'Add Two Numbers',
    technologySlug: 'php',
    difficulty: 'Easy',
    workspaceType: 'code',
    shortDescription:
      'Read two integers and print their sum.',
    problemStatement:
      'Write a PHP program that reads two integers and prints their sum.',
    inputFormat:
      'Two integers separated by spaces.',
    outputFormat:
      'Print the sum of the two integers.',
    skills: [
      'Input',
      'Variables',
      'Arithmetic',
    ],
    estimatedMinutes: 10,
    defaultLanguage: 'php',
    allowedLanguages: ['php'],
    starterCode: `<?php

// Read two integers and print their sum
`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Add Two Positive Numbers',
        input: '5 7',
        expectedOutput: '12',
      },
    ],
  },

  {
    slug: 'php-even-odd',
    title: 'Even or Odd',
    technologySlug: 'php',
    difficulty: 'Easy',
    workspaceType: 'code',
    shortDescription:
      'Determine whether an integer is even or odd.',
    problemStatement:
      'Read an integer and print Even if the number is even or Odd if the number is odd.',
    inputFormat:
      'A single integer.',
    outputFormat:
      'Print Even or Odd.',
    skills: [
      'Conditionals',
      'Modulo Operator',
      'Input',
    ],
    estimatedMinutes: 10,
    defaultLanguage: 'php',
    allowedLanguages: ['php'],
    starterCode: `<?php

// Determine whether the number is even or odd
`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Even Number',
        input: '10',
        expectedOutput: 'Even',
      },
      {
        id: 'sample-2',
        title: 'Odd Number',
        input: '7',
        expectedOutput: 'Odd',
      },
    ],
  },

  {
    slug: 'php-largest-number',
    title: 'Largest of Three Numbers',
    technologySlug: 'php',
    difficulty: 'Medium',
    workspaceType: 'code',
    shortDescription:
      'Find the largest of three integers.',
    problemStatement:
      'Read three integers and print the largest value.',
    inputFormat:
      'Three integers separated by spaces.',
    outputFormat:
      'Print the largest integer.',
    skills: [
      'Conditionals',
      'Comparison Operators',
      'Input',
    ],
    estimatedMinutes: 12,
    defaultLanguage: 'php',
    allowedLanguages: ['php'],
    starterCode: `<?php

// Find the largest number
`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Largest Value',
        input: '10 20 15',
        expectedOutput: '20',
      },
    ],
  },

  {
    slug: 'php-for-loop',
    title: 'Print Numbers Using a Loop',
    technologySlug: 'php',
    difficulty: 'Medium',
    workspaceType: 'code',
    shortDescription:
      'Print numbers from 1 through N using a loop.',
    problemStatement:
      'Read a positive integer N and print the numbers from 1 through N separated by spaces.',
    inputFormat:
      'A positive integer N.',
    outputFormat:
      'Print the numbers from 1 to N separated by spaces.',
    constraints: [
      'N >= 1',
    ],
    skills: [
      'Loops',
      'for Loop',
      'Input',
    ],
    estimatedMinutes: 12,
    defaultLanguage: 'php',
    allowedLanguages: ['php'],
    starterCode: `<?php

// Print numbers from 1 to N
`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Print First Five Numbers',
        input: '5',
        expectedOutput: '1 2 3 4 5',
      },
    ],
  },

  {
    slug: 'php-array-sum',
    title: 'Sum Array Elements',
    technologySlug: 'php',
    difficulty: 'Medium',
    workspaceType: 'code',
    shortDescription:
      'Calculate the sum of integer array elements.',
    problemStatement:
      'Read a line of space-separated integers and print the sum of all values.',
    inputFormat:
      'A line containing integers separated by spaces.',
    outputFormat:
      'Print the sum of all integers.',
    skills: [
      'Arrays',
      'Loops',
      'Arithmetic',
    ],
    estimatedMinutes: 15,
    defaultLanguage: 'php',
    allowedLanguages: ['php'],
    starterCode: `<?php

// Calculate the array sum
`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Array Sum',
        input: '1 2 3 4 5',
        expectedOutput: '15',
      },
    ],
  },

  {
    slug: 'php-reverse-string',
    title: 'Reverse a String',
    technologySlug: 'php',
    difficulty: 'Medium',
    workspaceType: 'code',
    shortDescription:
      'Reverse an input string.',
    problemStatement:
      'Read a string and print it in reverse order.',
    inputFormat:
      'A single line of text.',
    outputFormat:
      'Print the reversed string.',
    skills: [
      'Strings',
      'strrev',
      'Input',
    ],
    estimatedMinutes: 15,
    defaultLanguage: 'php',
    allowedLanguages: ['php'],
    starterCode: `<?php

// Reverse the input string
`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Reverse Word',
        input: 'hello',
        expectedOutput: 'olleh',
      },
    ],
  },

  {
    slug: 'php-function',
    title: 'Create a Function',
    technologySlug: 'php',
    difficulty: 'Medium',
    workspaceType: 'code',
    shortDescription:
      'Create and call a PHP function.',
    problemStatement:
      'Create a function named square that accepts an integer and returns its square. Read an integer, call the function, and print the result.',
    inputFormat:
      'A single integer.',
    outputFormat:
      'Print the square of the integer.',
    skills: [
      'Functions',
      'Parameters',
      'Return Values',
    ],
    estimatedMinutes: 15,
    defaultLanguage: 'php',
    allowedLanguages: ['php'],
    starterCode: `<?php

function square($number)
{
    // Complete the function
}

// Read input and print the result
`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Square Number',
        input: '5',
        expectedOutput: '25',
      },
    ],
  },

  {
    slug: 'php-class',
    title: 'Create a PHP Class',
    technologySlug: 'php',
    difficulty: 'Hard',
    workspaceType: 'code',
    shortDescription:
      'Create and use a PHP class.',
    problemStatement:
      'Create a Person class with a name property. Read a name, create a Person object, and print the person name.',
    inputFormat:
      'A single line containing a name.',
    outputFormat:
      'Print the person name.',
    skills: [
      'Classes',
      'Objects',
      'Properties',
      'OOP',
    ],
    estimatedMinutes: 25,
    defaultLanguage: 'php',
    allowedLanguages: ['php'],
    starterCode: `<?php

class Person
{
    // Add the property and constructor here
}

// Read input, create the object, and print the name
`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Person Name',
        input: 'John',
        expectedOutput: 'John',
      },
    ],
  },

  {
    slug: 'php-exception-handling',
    title: 'Exception Handling',
    technologySlug: 'php',
    difficulty: 'Hard',
    workspaceType: 'code',
    shortDescription:
      'Handle division by zero using PHP exceptions.',
    problemStatement:
      'Read two integers and divide the first number by the second. If the second number is zero, handle the error using exception handling and print Cannot divide by zero.',
    inputFormat:
      'Two integers separated by spaces.',
    outputFormat:
      'Print the division result or Cannot divide by zero.',
    skills: [
      'Exceptions',
      'try',
      'catch',
      'throw',
    ],
    estimatedMinutes: 25,
    defaultLanguage: 'php',
    allowedLanguages: ['php'],
    starterCode: `<?php

// Read the numbers and implement exception handling
`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Valid Division',
        input: '10 2',
        expectedOutput: '5',
      },
      {
        id: 'sample-2',
        title: 'Division By Zero',
        input: '10 0',
        expectedOutput: 'Cannot divide by zero',
      },
    ],
  },
];

export default phpProblems;