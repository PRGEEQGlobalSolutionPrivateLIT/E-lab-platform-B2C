import type {
  PracticeProblem,
} from './types';

export const javascriptProblems: PracticeProblem[] = [
  {
    slug:
      'javascript-hello-world',

    title:
      'Hello World',

    technologySlug:
      'javascript',

    difficulty:
      'Easy',

    workspaceType:
      'code',

    shortDescription:
      'Print Hello World using JavaScript.',

    problemStatement:
      'Write a JavaScript program that prints "Hello World" to the console.',

    outputFormat:
      'Print exactly: Hello World',

    skills: [
      'JavaScript',
      'console.log',
    ],

    estimatedMinutes:
      5,

    defaultLanguage:
      'javascript',

    allowedLanguages: [
      'javascript',
    ],

    starterCode:
`console.log("Hello World");`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Basic output',

        expectedOutput:
          'Hello World',
      },
    ],
  },

  {
    slug:
      'javascript-add-two-numbers',

    title:
      'Add Two Numbers',

    technologySlug:
      'javascript',

    difficulty:
      'Easy',

    workspaceType:
      'code',

    shortDescription:
      'Read two numbers and print their sum.',

    problemStatement:
      'Write a JavaScript program that reads two integers from standard input and prints their sum.',

    inputFormat:
      'Two space-separated integers.',

    outputFormat:
      'Print the sum of the two integers.',

    skills: [
      'JavaScript',
      'Input',
      'Arithmetic',
    ],

    estimatedMinutes:
      10,

    defaultLanguage:
      'javascript',

    allowedLanguages: [
      'javascript',
    ],

    starterCode:
`const fs = require('fs');

const input = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split(/\\s+/)
  .map(Number);

const [a, b] = input;

// Write your code here
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Positive numbers',

        input:
          '5 7',

        expectedOutput:
          '12',
      },
    ],
  },

  {
    slug:
      'javascript-even-odd',

    title:
      'Even or Odd',

    technologySlug:
      'javascript',

    difficulty:
      'Easy',

    workspaceType:
      'code',

    shortDescription:
      'Determine whether a number is even or odd.',

    problemStatement:
      'Read an integer and print "Even" if it is divisible by 2. Otherwise print "Odd".',

    inputFormat:
      'A single integer.',

    outputFormat:
      'Print Even or Odd.',

    skills: [
      'JavaScript',
      'Conditions',
      'Modulo',
    ],

    estimatedMinutes:
      10,

    defaultLanguage:
      'javascript',

    allowedLanguages: [
      'javascript',
    ],

    starterCode:
`const fs = require('fs');

const n = Number(
  fs.readFileSync(0, 'utf8').trim()
);

// Write your code here
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Even number',

        input:
          '8',

        expectedOutput:
          'Even',
      },
    ],
  },

  {
    slug:
      'javascript-largest-three',

    title:
      'Largest of Three Numbers',

    technologySlug:
      'javascript',

    difficulty:
      'Easy',

    workspaceType:
      'code',

    shortDescription:
      'Find the largest of three numbers.',

    problemStatement:
      'Read three integers and print the largest value.',

    inputFormat:
      'Three space-separated integers.',

    outputFormat:
      'Print the largest integer.',

    skills: [
      'JavaScript',
      'Conditions',
      'Math',
    ],

    estimatedMinutes:
      10,

    defaultLanguage:
      'javascript',

    allowedLanguages: [
      'javascript',
    ],

    starterCode:
`const fs = require('fs');

const numbers = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split(/\\s+/)
  .map(Number);

// Write your code here
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Three numbers',

        input:
          '10 25 17',

        expectedOutput:
          '25',
      },
    ],
  },

  {
    slug:
      'javascript-sum-first-n',

    title:
      'Sum of First N Numbers',

    technologySlug:
      'javascript',

    difficulty:
      'Easy',

    workspaceType:
      'code',

    shortDescription:
      'Calculate the sum from 1 to N.',

    problemStatement:
      'Read a positive integer N and calculate the sum of all integers from 1 through N.',

    inputFormat:
      'A positive integer N.',

    outputFormat:
      'Print the calculated sum.',

    skills: [
      'JavaScript',
      'Loops',
    ],

    estimatedMinutes:
      10,

    defaultLanguage:
      'javascript',

    allowedLanguages: [
      'javascript',
    ],

    starterCode:
`const fs = require('fs');

const n = Number(
  fs.readFileSync(0, 'utf8').trim()
);

let sum = 0;

// Write your code here
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'N equals 5',

        input:
          '5',

        expectedOutput:
          '15',
      },
    ],
  },

  {
    slug:
      'javascript-factorial',

    title:
      'Factorial',

    technologySlug:
      'javascript',

    difficulty:
      'Easy',

    workspaceType:
      'code',

    shortDescription:
      'Calculate the factorial of a number.',

    problemStatement:
      'Read a non-negative integer N and print N factorial.',

    inputFormat:
      'A non-negative integer N.',

    outputFormat:
      'Print N!.',

    skills: [
      'JavaScript',
      'Loops',
    ],

    estimatedMinutes:
      10,

    defaultLanguage:
      'javascript',

    allowedLanguages: [
      'javascript',
    ],

    starterCode:
`const fs = require('fs');

const n = Number(
  fs.readFileSync(0, 'utf8').trim()
);

// Write your code here
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Factorial of 5',

        input:
          '5',

        expectedOutput:
          '120',
      },
    ],
  },

  {
    slug:
      'javascript-array-sum',

    title:
      'Array Sum',

    technologySlug:
      'javascript',

    difficulty:
      'Easy',

    workspaceType:
      'code',

    shortDescription:
      'Calculate the sum of all array elements.',

    problemStatement:
      'Read a list of integers and print the sum of all values in the array.',

    inputFormat:
      'Space-separated integers.',

    outputFormat:
      'Print the sum.',

    skills: [
      'JavaScript',
      'Arrays',
      'Iteration',
    ],

    estimatedMinutes:
      10,

    defaultLanguage:
      'javascript',

    allowedLanguages: [
      'javascript',
    ],

    starterCode:
`const fs = require('fs');

const numbers = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split(/\\s+/)
  .map(Number);

// Write your code here
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Array values',

        input:
          '1 2 3 4 5',

        expectedOutput:
          '15',
      },
    ],
  },

  {
    slug:
      'javascript-array-maximum',

    title:
      'Maximum Array Element',

    technologySlug:
      'javascript',

    difficulty:
      'Medium',

    workspaceType:
      'code',

    shortDescription:
      'Find the maximum value in an array.',

    problemStatement:
      'Read an array of integers and print the largest element.',

    inputFormat:
      'Space-separated integers.',

    outputFormat:
      'Print the largest value.',

    skills: [
      'JavaScript',
      'Arrays',
    ],

    estimatedMinutes:
      15,

    defaultLanguage:
      'javascript',

    allowedLanguages: [
      'javascript',
    ],

    starterCode:
`const fs = require('fs');

const numbers = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split(/\\s+/)
  .map(Number);

// Write your code here
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Maximum value',

        input:
          '4 9 2 12 6',

        expectedOutput:
          '12',
      },
    ],
  },

  {
    slug:
      'javascript-string-reverse',

    title:
      'Reverse a String',

    technologySlug:
      'javascript',

    difficulty:
      'Medium',

    workspaceType:
      'code',

    shortDescription:
      'Reverse the supplied string.',

    problemStatement:
      'Read a string and print the characters in reverse order.',

    inputFormat:
      'A single line of text.',

    outputFormat:
      'Print the reversed string.',

    skills: [
      'JavaScript',
      'Strings',
    ],

    estimatedMinutes:
      15,

    defaultLanguage:
      'javascript',

    allowedLanguages: [
      'javascript',
    ],

    starterCode:
`const fs = require('fs');

const text = fs
  .readFileSync(0, 'utf8')
  .trim();

// Write your code here
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Reverse text',

        input:
          'hello',

        expectedOutput:
          'olleh',
      },
    ],
  },

  {
    slug:
      'javascript-palindrome',

    title:
      'Palindrome String',

    technologySlug:
      'javascript',

    difficulty:
      'Medium',

    workspaceType:
      'code',

    shortDescription:
      'Check whether a string is a palindrome.',

    problemStatement:
      'Read a string and print "Palindrome" if it reads the same forward and backward. Otherwise print "Not Palindrome".',

    inputFormat:
      'A single string.',

    outputFormat:
      'Print Palindrome or Not Palindrome.',

    skills: [
      'JavaScript',
      'Strings',
      'Conditions',
    ],

    estimatedMinutes:
      15,

    defaultLanguage:
      'javascript',

    allowedLanguages: [
      'javascript',
    ],

    starterCode:
`const fs = require('fs');

const text = fs
  .readFileSync(0, 'utf8')
  .trim();

// Write your code here
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Palindrome',

        input:
          'madam',

        expectedOutput:
          'Palindrome',
      },
    ],
  },

  {
    slug:
      'javascript-word-frequency',

    title:
      'Word Frequency',

    technologySlug:
      'javascript',

    difficulty:
      'Medium',

    workspaceType:
      'code',

    shortDescription:
      'Count how often each word occurs.',

    problemStatement:
      'Read a line of lowercase words separated by spaces. Count each unique word and print the words in alphabetical order using the format "word count".',

    inputFormat:
      'One line containing space-separated lowercase words.',

    outputFormat:
      'One word and its count per line, alphabetically sorted.',

    skills: [
      'JavaScript',
      'Objects',
      'Maps',
      'Sorting',
    ],

    estimatedMinutes:
      20,

    defaultLanguage:
      'javascript',

    allowedLanguages: [
      'javascript',
    ],

    starterCode:
`const fs = require('fs');

const words = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split(/\\s+/);

// Write your code here
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Repeated words',

        input:
          'apple banana apple orange banana apple',

        expectedOutput:
`apple 3
banana 2
orange 1`,
      },
    ],
  },

  {
    slug:
      'javascript-maximum-subarray',

    title:
      'Maximum Subarray',

    technologySlug:
      'javascript',

    difficulty:
      'Hard',

    workspaceType:
      'code',

    shortDescription:
      'Find the maximum sum of a contiguous subarray.',

    problemStatement:
      'Given an array of integers, determine the largest possible sum of any contiguous subarray.',

    inputFormat:
      'Space-separated integers.',

    outputFormat:
      'Print the maximum contiguous subarray sum.',

    skills: [
      'JavaScript',
      'Arrays',
      'Algorithms',
      'Kadane Algorithm',
    ],

    estimatedMinutes:
      30,

    defaultLanguage:
      'javascript',

    allowedLanguages: [
      'javascript',
    ],

    starterCode:
`const fs = require('fs');

const numbers = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split(/\\s+/)
  .map(Number);

// Write your code here
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Mixed values',

        input:
          '-2 1 -3 4 -1 2 1 -5 4',

        expectedOutput:
          '6',
      },
    ],
  },
];