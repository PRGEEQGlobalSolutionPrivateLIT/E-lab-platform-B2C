import type {
  PracticeProblem,
} from './types';

/* =========================================================
   NODE.JS PROBLEMS
========================================================= */

export const nodejsProblems:
  PracticeProblem[] = [

  /* =======================================================
     1. STDIN TO UPPERCASE
  ======================================================= */

  {
    slug:
      'node-stdin-uppercase',

    title:
      'Convert Input to Uppercase',

    technologySlug:
      'nodejs',

    difficulty:
      'Easy',

    workspaceType:
      'code',

    shortDescription:
      'Read text from standard input and convert it to uppercase.',

    problemStatement:
      'Write a Node.js program that reads a line from standard input and prints the text in uppercase.',

    inputFormat:
      'A single line of text.',

    outputFormat:
      'Print the uppercase version of the input.',

    skills: [
      'Node.js',
      'process.stdin',
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
          'Basic text',

        input:
          'hello node',

        expectedOutput:
          'HELLO NODE',
      },
    ],
  },

  /* =======================================================
     2. WORD COUNT
  ======================================================= */

  {
    slug:
      'node-word-count',

    title:
      'Count Words',

    technologySlug:
      'nodejs',

    difficulty:
      'Easy',

    workspaceType:
      'code',

    shortDescription:
      'Count the number of words in standard input.',

    problemStatement:
      'Read a line of text using Node.js and print the number of words it contains.',

    inputFormat:
      'A single line containing words separated by spaces.',

    outputFormat:
      'Print the number of words.',

    skills: [
      'Node.js',
      'Input Handling',
      'Strings',
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
          'Count words',

        input:
          'Node makes JavaScript server side',

        expectedOutput:
          '5',
      },
    ],
  },

  /* =======================================================
     3. SUM JSON ARRAY
  ======================================================= */

  {
    slug:
      'node-json-array-sum',

    title:
      'Sum JSON Array',

    technologySlug:
      'nodejs',

    difficulty:
      'Easy',

    workspaceType:
      'code',

    shortDescription:
      'Parse a JSON array and calculate the sum of its values.',

    problemStatement:
      'Read a JSON array of numbers from standard input, parse it using JSON.parse(), and print the sum of all values.',

    inputFormat:
      'A valid JSON array containing numbers.',

    outputFormat:
      'Print the sum of all numbers.',

    skills: [
      'Node.js',
      'JSON',
      'Arrays',
      'Reduce',
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

const numbers = JSON.parse(input);

// Write your code here
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'JSON numbers',

        input:
          '[10,20,30,40]',

        expectedOutput:
          '100',
      },
    ],
  },

  /* =======================================================
     4. BUFFER BYTE LENGTH
  ======================================================= */

  {
    slug:
      'node-buffer-byte-length',

    title:
      'Buffer Byte Length',

    technologySlug:
      'nodejs',

    difficulty:
      'Easy',

    workspaceType:
      'code',

    shortDescription:
      'Calculate the number of bytes required to store text.',

    problemStatement:
      'Read a string and use the Node.js Buffer API to print its UTF-8 byte length.',

    inputFormat:
      'A single line of text.',

    outputFormat:
      'Print the UTF-8 byte length.',

    skills: [
      'Node.js',
      'Buffer',
      'UTF-8',
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

const text = fs
  .readFileSync(0, 'utf8')
  .trim();

// Use Buffer here
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'ASCII text',

        input:
          'hello',

        expectedOutput:
          '5',
      },
    ],
  },

  /* =======================================================
     5. PATH BASENAME
  ======================================================= */

  {
    slug:
      'node-path-basename',

    title:
      'Get File Name from Path',

    technologySlug:
      'nodejs',

    difficulty:
      'Easy',

    workspaceType:
      'code',

    shortDescription:
      'Extract a file name using the Node.js path module.',

    problemStatement:
      'Read a file path and use the Node.js path module to print only the file name.',

    inputFormat:
      'A file path.',

    outputFormat:
      'Print the file name.',

    skills: [
      'Node.js',
      'Path Module',
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
          '/home/user/project/index.js',

        expectedOutput:
          'index.js',
      },
    ],
  },

  /* =======================================================
     6. FILE EXTENSION
  ======================================================= */

  {
    slug:
      'node-path-extension',

    title:
      'Get File Extension',

    technologySlug:
      'nodejs',

    difficulty:
      'Easy',

    workspaceType:
      'code',

    shortDescription:
      'Extract a file extension using the Node.js path module.',

    problemStatement:
      'Read a file path and print its extension using path.extname().',

    inputFormat:
      'A file path.',

    outputFormat:
      'Print the file extension including the period.',

    skills: [
      'Node.js',
      'Path Module',
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
          'JavaScript file',

        input:
          '/app/server/index.js',

        expectedOutput:
          '.js',
      },
    ],
  },

  /* =======================================================
     7. URL HOSTNAME
  ======================================================= */

  {
    slug:
      'node-url-hostname',

    title:
      'Extract URL Hostname',

    technologySlug:
      'nodejs',

    difficulty:
      'Medium',

    workspaceType:
      'code',

    shortDescription:
      'Extract the hostname from a URL.',

    problemStatement:
      'Read a valid URL, create a URL object, and print its hostname.',

    inputFormat:
      'A complete URL.',

    outputFormat:
      'Print the hostname.',

    skills: [
      'Node.js',
      'URL API',
      'Web Fundamentals',
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

const input = fs
  .readFileSync(0, 'utf8')
  .trim();

// Use the URL class here
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'HTTPS URL',

        input:
          'https://example.com/products?id=10',

        expectedOutput:
          'example.com',
      },
    ],
  },

  /* =======================================================
     8. URL QUERY PARAMETER
  ======================================================= */

  {
    slug:
      'node-url-query-param',

    title:
      'Read URL Query Parameter',

    technologySlug:
      'nodejs',

    difficulty:
      'Medium',

    workspaceType:
      'code',

    shortDescription:
      'Read a query parameter from a URL.',

    problemStatement:
      `The first input line contains a URL.

The second input line contains the name of a query parameter.

Print the value of that parameter.

If the parameter does not exist, print "Not Found".`,

    inputFormat:
      `Line 1: Complete URL.

Line 2: Query parameter name.`,

    outputFormat:
      'Print the parameter value or Not Found.',

    skills: [
      'Node.js',
      'URL API',
      'Search Params',
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

const lines = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split('\\n');

const urlText = lines[0];
const parameter = lines[1];

// Write your code here
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Find product id',

        input:
`https://example.com/products?id=25&category=books
id`,

        expectedOutput:
          '25',
      },
    ],
  },

  /* =======================================================
     9. EVENT EMITTER MESSAGE
  ======================================================= */

  {
    slug:
      'node-event-emitter-message',

    title:
      'EventEmitter Message',

    technologySlug:
      'nodejs',

    difficulty:
      'Medium',

    workspaceType:
      'code',

    shortDescription:
      'Handle an event using Node.js EventEmitter.',

    problemStatement:
      `Read a text message.

Create an EventEmitter.

Register a listener for an event named "message".

When the event is emitted, print the received message.`,

    inputFormat:
      'A single line containing a message.',

    outputFormat:
      'Print the emitted message.',

    skills: [
      'Node.js',
      'EventEmitter',
      'Events',
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
const EventEmitter = require('events');

const message = fs
  .readFileSync(0, 'utf8')
  .trim();

const emitter = new EventEmitter();

// Register and emit the event
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Message event',

        input:
          'Hello Node',

        expectedOutput:
          'Hello Node',
      },
    ],
  },

  /* =======================================================
     10. EVENT EMITTER SUM
  ======================================================= */

  {
    slug:
      'node-event-emitter-sum',

    title:
      'EventEmitter Sum',

    technologySlug:
      'nodejs',

    difficulty:
      'Medium',

    workspaceType:
      'code',

    shortDescription:
      'Pass values through an EventEmitter event.',

    problemStatement:
      `Read two integers.

Create an EventEmitter and register a listener named "calculate".

Emit the event with the two values.

The listener must print their sum.`,

    inputFormat:
      'Two space-separated integers.',

    outputFormat:
      'Print the sum.',

    skills: [
      'Node.js',
      'EventEmitter',
      'Functions',
      'Events',
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
const EventEmitter = require('events');

const numbers = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split(/\\s+/)
  .map(Number);

const [a, b] = numbers;

const emitter = new EventEmitter();

// Register and emit the calculate event
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Add values',

        input:
          '15 25',

        expectedOutput:
          '40',
      },
    ],
  },

  /* =======================================================
     11. SHA-256 HASH
  ======================================================= */

  {
    slug:
      'node-sha256-hash',

    title:
      'Generate SHA-256 Hash',

    technologySlug:
      'nodejs',

    difficulty:
      'Medium',

    workspaceType:
      'code',

    shortDescription:
      'Generate a SHA-256 hash using the Node.js crypto module.',

    problemStatement:
      'Read a string and print its SHA-256 hexadecimal hash using the Node.js crypto module.',

    inputFormat:
      'A single line of text.',

    outputFormat:
      'Print the SHA-256 hexadecimal hash.',

    skills: [
      'Node.js',
      'Crypto',
      'Hashing',
      'Core Modules',
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
const crypto = require('crypto');

const input = fs
  .readFileSync(0, 'utf8')
  .trim();

// Generate SHA-256 hash
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Hash hello',

        input:
          'hello',

        expectedOutput:
          '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
      },
    ],
  },

  /* =======================================================
     12. LINE COUNT
  ======================================================= */

  {
    slug:
      'node-stream-line-count',

    title:
      'Count Input Lines',

    technologySlug:
      'nodejs',

    difficulty:
      'Hard',

    workspaceType:
      'code',

    shortDescription:
      'Process multi-line input and count the number of lines.',

    problemStatement:
      'Read multi-line standard input and print the number of non-empty lines.',

    inputFormat:
      'Multiple lines of text.',

    outputFormat:
      'Print the number of non-empty lines.',

    skills: [
      'Node.js',
      'Streams',
      'Input Processing',
      'Arrays',
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

const input = fs
  .readFileSync(0, 'utf8');

// Count non-empty lines
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Multiple lines',

        input:
`Node
Express
MongoDB
React`,

        expectedOutput:
          '4',
      },
    ],
  },
];