import type {
  PracticeProblem,
} from './types';

export const nodeProblems: PracticeProblem[] = [
  {
    slug:
      'node-read-stdin',

    title:
      'Read Standard Input',

    technologySlug:
      'node',

    difficulty:
      'Easy',

    workspaceType:
      'code',

    shortDescription:
      'Read and print input using Node.js.',

    problemStatement:
      'Write a Node.js program that reads text from standard input and prints the same text.',

    inputFormat:
      'One line of text.',

    outputFormat:
      'Print the supplied text.',

    skills: [
      'Node.js',
      'process',
      'stdin',
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
  .trim();

// Write your code here
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Echo input',

        input:
          'Hello Node',

        expectedOutput:
          'Hello Node',
      },
    ],
  },

  {
    slug:
      'node-count-lines',

    title:
      'Count Input Lines',

    technologySlug:
      'node',

    difficulty:
      'Easy',

    workspaceType:
      'code',

    shortDescription:
      'Count lines supplied through standard input.',

    problemStatement:
      'Read text from standard input and print the number of non-empty lines.',

    inputFormat:
      'Multiple lines of text.',

    outputFormat:
      'Print the number of non-empty lines.',

    skills: [
      'Node.js',
      'stdin',
      'Strings',
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

const input = fs.readFileSync(
  0,
  'utf8'
);

// Write your code here
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Three lines',

        input:
`apple
banana
orange`,

        expectedOutput:
          '3',
      },
    ],
  },

  {
    slug:
      'node-json-parser',

    title:
      'Parse JSON Input',

    technologySlug:
      'node',

    difficulty:
      'Easy',

    workspaceType:
      'code',

    shortDescription:
      'Read and process JSON using Node.js.',

    problemStatement:
      'Read a JSON object containing name and age fields. Print the values using the format "name age".',

    inputFormat:
      'A valid JSON object containing name and age.',

    outputFormat:
      'Print the name followed by the age.',

    skills: [
      'Node.js',
      'JSON',
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
  .trim();

const data = JSON.parse(input);

// Write your code here
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'User JSON',

        input:
          '{"name":"Asha","age":24}',

        expectedOutput:
          'Asha 24',
      },
    ],
  },

  {
    slug:
      'node-path-basename',

    title:
      'Extract File Name',

    technologySlug:
      'node',

    difficulty:
      'Easy',

    workspaceType:
      'code',

    shortDescription:
      'Use the Node.js path module.',

    problemStatement:
      'Read a file path and print only the final file name using the Node.js path module.',

    inputFormat:
      'A file path.',

    outputFormat:
      'Print the file name.',

    skills: [
      'Node.js',
      'path module',
      'Core Modules',
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
const path = require('path');

const input = fs
  .readFileSync(0, 'utf8')
  .trim();

// Write your code here
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'File path',

        input:
          '/home/user/report.pdf',

        expectedOutput:
          'report.pdf',
      },
    ],
  },

  {
    slug:
      'node-json-array-total',

    title:
      'Calculate JSON Array Total',

    technologySlug:
      'node',

    difficulty:
      'Medium',

    workspaceType:
      'code',

    shortDescription:
      'Process a JSON array using Node.js.',

    problemStatement:
      'Read a JSON array of numbers from standard input and print the total of all numbers.',

    inputFormat:
      'A JSON array of numeric values.',

    outputFormat:
      'Print the total.',

    skills: [
      'Node.js',
      'JSON',
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

const numbers = JSON.parse(
  fs.readFileSync(0, 'utf8')
);

// Write your code here
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Number array',

        input:
          '[10,20,30,40]',

        expectedOutput:
          '100',
      },
    ],
  },

  {
    slug:
      'node-user-summary',

    title:
      'Process User Records',

    technologySlug:
      'node',

    difficulty:
      'Medium',

    workspaceType:
      'code',

    shortDescription:
      'Process structured JSON records.',

    problemStatement:
      'Read a JSON array of users. Print the names of users whose active property is true, sorted alphabetically.',

    inputFormat:
      'A JSON array containing objects with name and active fields.',

    outputFormat:
      'Print each active user name on a separate line in alphabetical order.',

    skills: [
      'Node.js',
      'JSON',
      'Array Filter',
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

const users = JSON.parse(
  fs.readFileSync(0, 'utf8')
);

// Write your code here
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Active users',

        input:
          '[{"name":"Ravi","active":true},{"name":"Anu","active":true},{"name":"Sam","active":false}]',

        expectedOutput:
`Anu
Ravi`,
      },
    ],
  },

  {
    slug:
      'node-order-total',

    title:
      'Calculate Order Total',

    technologySlug:
      'node',

    difficulty:
      'Medium',

    workspaceType:
      'code',

    shortDescription:
      'Aggregate structured order data.',

    problemStatement:
      'Read a JSON array of order items. Each item contains price and quantity. Calculate and print the total order value.',

    inputFormat:
      'A JSON array containing price and quantity.',

    outputFormat:
      'Print the total order value.',

    skills: [
      'Node.js',
      'JSON',
      'Array Reduce',
      'Data Processing',
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

const items = JSON.parse(
  fs.readFileSync(0, 'utf8')
);

// Write your code here
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Order items',

        input:
          '[{"price":100,"quantity":2},{"price":50,"quantity":3}]',

        expectedOutput:
          '350',
      },
    ],
  },

  {
    slug:
      'node-group-data',

    title:
      'Group Records by Category',

    technologySlug:
      'node',

    difficulty:
      'Hard',

    workspaceType:
      'code',

    shortDescription:
      'Transform and group structured data.',

    problemStatement:
      'Read a JSON array of products containing category fields. Count the number of products in each category and print each category and count alphabetically.',

    inputFormat:
      'A JSON array of product objects.',

    outputFormat:
      'Print "category count" on separate lines sorted alphabetically.',

    skills: [
      'Node.js',
      'JSON',
      'Aggregation',
      'Objects',
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

const products = JSON.parse(
  fs.readFileSync(0, 'utf8')
);

// Write your code here
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Product categories',

        input:
          '[{"category":"Book"},{"category":"Tech"},{"category":"Book"}]',

        expectedOutput:
`Book 2
Tech 1`,
      },
    ],
  },
];