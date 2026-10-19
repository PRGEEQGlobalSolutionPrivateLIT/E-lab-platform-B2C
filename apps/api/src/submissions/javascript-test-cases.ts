export type JavaScriptTestCase = {
  input: string;
  expectedOutput: string;
};

const javascriptTestCases:
  Record<
    string,
    JavaScriptTestCase[]
  > = {

  /* =======================================================
     HELLO WORLD
  ======================================================= */

  'javascript-hello-world': [
    {
      input: '',
      expectedOutput: 'Hello World',
    },
  ],

  /* =======================================================
     ADD TWO NUMBERS
  ======================================================= */

  'javascript-add-two-numbers': [
    {
      input: '5 7',
      expectedOutput: '12',
    },
    {
      input: '10 20',
      expectedOutput: '30',
    },
    {
      input: '-5 8',
      expectedOutput: '3',
    },
    {
      input: '-10 -20',
      expectedOutput: '-30',
    },
    {
      input: '0 0',
      expectedOutput: '0',
    },
  ],

  /* =======================================================
     EVEN OR ODD
  ======================================================= */

  'javascript-even-odd': [
    {
      input: '8',
      expectedOutput: 'Even',
    },
    {
      input: '7',
      expectedOutput: 'Odd',
    },
    {
      input: '0',
      expectedOutput: 'Even',
    },
    {
      input: '-4',
      expectedOutput: 'Even',
    },
    {
      input: '-9',
      expectedOutput: 'Odd',
    },
  ],

  /* =======================================================
     LARGEST OF THREE
  ======================================================= */

  'javascript-largest-three': [
    {
      input: '10 25 17',
      expectedOutput: '25',
    },
    {
      input: '5 2 1',
      expectedOutput: '5',
    },
    {
      input: '-10 -5 -20',
      expectedOutput: '-5',
    },
    {
      input: '7 7 3',
      expectedOutput: '7',
    },
  ],

  /* =======================================================
     SUM FIRST N
  ======================================================= */

  'javascript-sum-first-n': [
    {
      input: '5',
      expectedOutput: '15',
    },
    {
      input: '1',
      expectedOutput: '1',
    },
    {
      input: '10',
      expectedOutput: '55',
    },
    {
      input: '100',
      expectedOutput: '5050',
    },
  ],

  /* =======================================================
     FACTORIAL
  ======================================================= */

  'javascript-factorial': [
    {
      input: '5',
      expectedOutput: '120',
    },
    {
      input: '0',
      expectedOutput: '1',
    },
    {
      input: '1',
      expectedOutput: '1',
    },
    {
      input: '6',
      expectedOutput: '720',
    },
  ],

  /* =======================================================
     ARRAY SUM
  ======================================================= */

  'javascript-array-sum': [
    {
      input: '1 2 3 4 5',
      expectedOutput: '15',
    },
    {
      input: '10 20 30',
      expectedOutput: '60',
    },
    {
      input: '-5 5 10',
      expectedOutput: '10',
    },
    {
      input: '100',
      expectedOutput: '100',
    },
  ],

  /* =======================================================
     ARRAY MAXIMUM
  ======================================================= */

  'javascript-array-maximum': [
    {
      input: '4 9 2 12 6',
      expectedOutput: '12',
    },
    {
      input: '1 2 3',
      expectedOutput: '3',
    },
    {
      input: '-10 -2 -30',
      expectedOutput: '-2',
    },
    {
      input: '7',
      expectedOutput: '7',
    },
  ],

  /* =======================================================
     REVERSE STRING
  ======================================================= */

  'javascript-string-reverse': [
    {
      input: 'hello',
      expectedOutput: 'olleh',
    },
    {
      input: 'JavaScript',
      expectedOutput: 'tpircSavaJ',
    },
    {
      input: 'abcd',
      expectedOutput: 'dcba',
    },
    {
      input: 'a',
      expectedOutput: 'a',
    },
    {
      input: '12345',
      expectedOutput: '54321',
    },
  ],

  /* =======================================================
     PALINDROME
  ======================================================= */

  'javascript-palindrome': [
    {
      input: 'madam',
      expectedOutput: 'Palindrome',
    },
    {
      input: 'level',
      expectedOutput: 'Palindrome',
    },
    {
      input: 'hello',
      expectedOutput: 'Not Palindrome',
    },
    {
      input: 'a',
      expectedOutput: 'Palindrome',
    },
  ],

  /* =======================================================
     WORD FREQUENCY
  ======================================================= */

  'javascript-word-frequency': [
    {
      input:
        'apple banana apple orange banana apple',

      expectedOutput:
`apple 3
banana 2
orange 1`,
    },

    {
      input:
        'cat dog cat',

      expectedOutput:
`cat 2
dog 1`,
    },

    {
      input:
        'a b c',

      expectedOutput:
`a 1
b 1
c 1`,
    },
  ],

  /* =======================================================
     MAXIMUM SUBARRAY
  ======================================================= */

  'javascript-maximum-subarray': [
    {
      input:
        '-2 1 -3 4 -1 2 1 -5 4',

      expectedOutput:
        '6',
    },

    {
      input:
        '1 2 3 4',

      expectedOutput:
        '10',
    },

    {
      input:
        '-5 -2 -8',

      expectedOutput:
        '-2',
    },

    {
      input:
        '5 -2 3 4',

      expectedOutput:
        '10',
    },
  ],
};

/* =========================================================
   GET JAVASCRIPT TEST CASES
========================================================= */

export function getJavaScriptTestCases(
  problemSlug: string,
) {
  return (
    javascriptTestCases[
      problemSlug
    ] ?? []
  );
}