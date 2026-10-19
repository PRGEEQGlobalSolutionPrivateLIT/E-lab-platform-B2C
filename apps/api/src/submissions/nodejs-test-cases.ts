export type NodeJsTestCase = {
  input: string;
  expectedOutput: string;
};

/* =========================================================
   NODE.JS HIDDEN TEST CASES
========================================================= */

const nodeJsTestCases:
  Record<
    string,
    NodeJsTestCase[]
  > = {

  /* =======================================================
     1. STDIN TO UPPERCASE
  ======================================================= */

  'node-stdin-uppercase': [
    {
      input:
        'hello node',

      expectedOutput:
        'HELLO NODE',
    },

    {
      input:
        'Node Js',

      expectedOutput:
        'NODE JS',
    },

    {
      input:
        'openai',

      expectedOutput:
        'OPENAI',
    },

    {
      input:
        'node 22',

      expectedOutput:
        'NODE 22',
    },
  ],

  /* =======================================================
     2. WORD COUNT
  ======================================================= */

  'node-word-count': [
    {
      input:
        'Node makes JavaScript server side',

      expectedOutput:
        '5',
    },

    {
      input:
        'hello world',

      expectedOutput:
        '2',
    },

    {
      input:
        'Node',

      expectedOutput:
        '1',
    },

    {
      input:
        'one two three four five six',

      expectedOutput:
        '6',
    },
  ],

  /* =======================================================
     3. JSON ARRAY SUM
  ======================================================= */

  'node-json-array-sum': [
    {
      input:
        '[10,20,30,40]',

      expectedOutput:
        '100',
    },

    {
      input:
        '[1,2,3,4,5]',

      expectedOutput:
        '15',
    },

    {
      input:
        '[-10,5,20]',

      expectedOutput:
        '15',
    },

    {
      input:
        '[100]',

      expectedOutput:
        '100',
    },

    {
      input:
        '[0,0,0]',

      expectedOutput:
        '0',
    },
  ],

  /* =======================================================
     4. BUFFER BYTE LENGTH
  ======================================================= */

  'node-buffer-byte-length': [
    {
      input:
        'hello',

      expectedOutput:
        '5',
    },

    {
      input:
        'NodeJS',

      expectedOutput:
        '6',
    },

    {
      input:
        'é',

      expectedOutput:
        '2',
    },

    {
      input:
        '₹',

      expectedOutput:
        '3',
    },
  ],

  /* =======================================================
     5. PATH BASENAME
  ======================================================= */

  'node-path-basename': [
    {
      input:
        '/home/user/project/index.js',

      expectedOutput:
        'index.js',
    },

    {
      input:
        '/app/server.js',

      expectedOutput:
        'server.js',
    },

    {
      input:
        '/var/log/application.log',

      expectedOutput:
        'application.log',
    },

    {
      input:
        '/project/src/main.ts',

      expectedOutput:
        'main.ts',
    },
  ],

  /* =======================================================
     6. PATH EXTENSION
  ======================================================= */

  'node-path-extension': [
    {
      input:
        '/app/server/index.js',

      expectedOutput:
        '.js',
    },

    {
      input:
        '/app/package.json',

      expectedOutput:
        '.json',
    },

    {
      input:
        '/documents/readme.txt',

      expectedOutput:
        '.txt',
    },

    {
      input:
        '/src/styles.css',

      expectedOutput:
        '.css',
    },
  ],

  /* =======================================================
     7. URL HOSTNAME
  ======================================================= */

  'node-url-hostname': [
    {
      input:
        'https://example.com/products?id=10',

      expectedOutput:
        'example.com',
    },

    {
      input:
        'https://api.example.org/users',

      expectedOutput:
        'api.example.org',
    },

    {
      input:
        'http://localhost:3000/dashboard',

      expectedOutput:
        'localhost',
    },

    {
      input:
        'https://shop.example.com/cart',

      expectedOutput:
        'shop.example.com',
    },
  ],

  /* =======================================================
     8. URL QUERY PARAMETER
  ======================================================= */

  'node-url-query-param': [
    {
      input:
`https://example.com/products?id=25&category=books
id`,

      expectedOutput:
        '25',
    },

    {
      input:
`https://example.com/products?id=25&category=books
category`,

      expectedOutput:
        'books',
    },

    {
      input:
`https://example.com/search?q=nodejs&page=2
page`,

      expectedOutput:
        '2',
    },

    {
      input:
`https://example.com/products?id=25
name`,

      expectedOutput:
        'Not Found',
    },
  ],

  /* =======================================================
     9. EVENT EMITTER MESSAGE
  ======================================================= */

  'node-event-emitter-message': [
    {
      input:
        'Hello Node',

      expectedOutput:
        'Hello Node',
    },

    {
      input:
        'Event received',

      expectedOutput:
        'Event received',
    },

    {
      input:
        'Node.js EventEmitter',

      expectedOutput:
        'Node.js EventEmitter',
    },

    {
      input:
        'Welcome to eLab',

      expectedOutput:
        'Welcome to eLab',
    },
  ],

  /* =======================================================
     10. EVENT EMITTER SUM
  ======================================================= */

  'node-event-emitter-sum': [
    {
      input:
        '15 25',

      expectedOutput:
        '40',
    },

    {
      input:
        '5 7',

      expectedOutput:
        '12',
    },

    {
      input:
        '-10 20',

      expectedOutput:
        '10',
    },

    {
      input:
        '0 0',

      expectedOutput:
        '0',
    },

    {
      input:
        '100 250',

      expectedOutput:
        '350',
    },
  ],

  /* =======================================================
     11. SHA-256 HASH
  ======================================================= */

  'node-sha256-hash': [
    {
      input:
        'hello',

      expectedOutput:
        '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
    },

    {
      input:
        'nodejs',

      expectedOutput:
        '81df1af4ed72b1b82fed99c73be4831908af977f3bd52c7cb7dfc738e38571dd',
    },

    {
      input:
        'OpenAI',

      expectedOutput:
        '8b7d1a3187ab355dc31bc683aaa71ab5ed217940c12196a9cd5f4ca984babfa4',
    },

    {
      input:
        'eLab',

      expectedOutput:
        '816aa5acd6e2983e452ad6fd7e9aaeb4b7f8653294d9ff9069a7eb41e9c73eed',
    },
  ],

  /* =======================================================
     12. STREAM / LINE COUNT
  ======================================================= */

  'node-stream-line-count': [
    {
      input:
`Node
Express
MongoDB
React`,

      expectedOutput:
        '4',
    },

    {
      input:
`one
two
three`,

      expectedOutput:
        '3',
    },

    {
      input:
`Node

Express

React`,

      expectedOutput:
        '3',
    },

    {
      input:
        'Node',

      expectedOutput:
        '1',
    },
  ],
};

/* =========================================================
   GET NODE.JS TEST CASES
========================================================= */

export function getNodeJsTestCases(
  problemSlug: string,
) {
  return (
    nodeJsTestCases[
      problemSlug
    ] ?? []
  );
}