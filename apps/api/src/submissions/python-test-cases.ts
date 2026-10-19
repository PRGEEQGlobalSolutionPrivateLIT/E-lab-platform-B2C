/* =========================================================
   PYTHON HIDDEN TEST CASES

   12 problems
   3 hidden tests per problem
   Total: 36 hidden tests

   These tests are executed server-side during submission.
========================================================= */

export type PythonHiddenTestCase = {
  id: string;
  title: string;
  input: string;
  expectedOutput: string;
};

const PYTHON_TEST_CASES:
  Record<
    string,
    PythonHiddenTestCase[]
  > = {

  /* =======================================================
     01 — HELLO WORLD
  ======================================================= */

  'python-hello-world': [
    {
      id: 'python-hello-world-1',
      title: 'Exact output 1',
      input: '',
      expectedOutput: 'Hello, World!',
    },
    {
      id: 'python-hello-world-2',
      title: 'Exact output 2',
      input: '',
      expectedOutput: 'Hello, World!',
    },
    {
      id: 'python-hello-world-3',
      title: 'Exact output 3',
      input: '',
      expectedOutput: 'Hello, World!',
    },
  ],

  /* =======================================================
     02 — ADD TWO NUMBERS
  ======================================================= */

  'python-add-two-numbers': [
    {
      id: 'python-add-two-numbers-1',
      title: 'Positive values',
      input: '125 375',
      expectedOutput: '500',
    },
    {
      id: 'python-add-two-numbers-2',
      title: 'Negative values',
      input: '-50 -25',
      expectedOutput: '-75',
    },
    {
      id: 'python-add-two-numbers-3',
      title: 'Mixed values',
      input: '-999 1000',
      expectedOutput: '1',
    },
  ],

  /* =======================================================
     03 — EVEN OR ODD
  ======================================================= */

  'python-even-odd': [
    {
      id: 'python-even-odd-1',
      title: 'Zero',
      input: '0',
      expectedOutput: 'Even',
    },
    {
      id: 'python-even-odd-2',
      title: 'Negative odd',
      input: '-17',
      expectedOutput: 'Odd',
    },
    {
      id: 'python-even-odd-3',
      title: 'Large even',
      input: '1000000000',
      expectedOutput: 'Even',
    },
  ],

  /* =======================================================
     04 — LARGEST OF THREE
  ======================================================= */

  'python-largest-three': [
    {
      id: 'python-largest-three-1',
      title: 'First value largest',
      input: '99 10 15',
      expectedOutput: '99',
    },
    {
      id: 'python-largest-three-2',
      title: 'Equal largest values',
      input: '50 50 12',
      expectedOutput: '50',
    },
    {
      id: 'python-largest-three-3',
      title: 'All negative',
      input: '-100 -5 -20',
      expectedOutput: '-5',
    },
  ],

  /* =======================================================
     05 — SUM FIRST N
  ======================================================= */

  'python-sum-first-n': [
    {
      id: 'python-sum-first-n-1',
      title: 'Small value',
      input: '10',
      expectedOutput: '55',
    },
    {
      id: 'python-sum-first-n-2',
      title: 'One',
      input: '1',
      expectedOutput: '1',
    },
    {
      id: 'python-sum-first-n-3',
      title: 'Hundred',
      input: '100',
      expectedOutput: '5050',
    },
  ],

  /* =======================================================
     06 — FACTORIAL
  ======================================================= */

  'python-factorial': [
    {
      id: 'python-factorial-1',
      title: 'Zero factorial',
      input: '0',
      expectedOutput: '1',
    },
    {
      id: 'python-factorial-2',
      title: 'Six factorial',
      input: '6',
      expectedOutput: '720',
    },
    {
      id: 'python-factorial-3',
      title: 'Ten factorial',
      input: '10',
      expectedOutput: '3628800',
    },
  ],

  /* =======================================================
     07 — LIST SUM
  ======================================================= */

  'python-list-sum': [
    {
      id: 'python-list-sum-1',
      title: 'Single value',
      input: `1
42`,
      expectedOutput: '42',
    },
    {
      id: 'python-list-sum-2',
      title: 'Mixed values',
      input: `6
10 -5 8 -3 1 9`,
      expectedOutput: '20',
    },
    {
      id: 'python-list-sum-3',
      title: 'All negative',
      input: `4
-10 -20 -30 -40`,
      expectedOutput: '-100',
    },
  ],

  /* =======================================================
     08 — LIST MAXIMUM
  ======================================================= */

  'python-list-maximum': [
    {
      id: 'python-list-maximum-1',
      title: 'First is maximum',
      input: `5
100 20 30 40 50`,
      expectedOutput: '100',
    },
    {
      id: 'python-list-maximum-2',
      title: 'All negative',
      input: `5
-50 -3 -99 -12 -8`,
      expectedOutput: '-3',
    },
    {
      id: 'python-list-maximum-3',
      title: 'Repeated maximum',
      input: `6
1 9 3 9 2 5`,
      expectedOutput: '9',
    },
  ],

  /* =======================================================
     09 — STRING REVERSE
  ======================================================= */

  'python-string-reverse': [
    {
      id: 'python-string-reverse-1',
      title: 'Palindrome',
      input: 'level',
      expectedOutput: 'level',
    },
    {
      id: 'python-string-reverse-2',
      title: 'Text with spaces',
      input: 'Open AI Lab',
      expectedOutput: 'baL IA nepO',
    },
    {
      id: 'python-string-reverse-3',
      title: 'Digits and letters',
      input: 'abc123',
      expectedOutput: '321cba',
    },
  ],

  /* =======================================================
     10 — WORD FREQUENCY
  ======================================================= */

  'python-word-frequency': [
    {
      id: 'python-word-frequency-1',
      title: 'Single repeated word',
      input: 'api api api',
      expectedOutput: 'api 3',
    },
    {
      id: 'python-word-frequency-2',
      title: 'Several words',
      input: 'django python django api python django',
      expectedOutput: `django 3
python 2
api 1`,
    },
    {
      id: 'python-word-frequency-3',
      title: 'Case sensitive',
      input: 'Python python Python',
      expectedOutput: `Python 2
python 1`,
    },
  ],

  /* =======================================================
     11 — STUDENT CLASS
  ======================================================= */

  'python-student-class': [
    {
      id: 'python-student-class-1',
      title: 'Boundary pass',
      input: `Asha
50`,
      expectedOutput: 'Asha Pass',
    },
    {
      id: 'python-student-class-2',
      title: 'Below pass boundary',
      input: `Vijay
49`,
      expectedOutput: 'Vijay Fail',
    },
    {
      id: 'python-student-class-3',
      title: 'Perfect score',
      input: `Meera
100`,
      expectedOutput: 'Meera Pass',
    },
  ],

  /* =======================================================
     12 — USER RECORDS
  ======================================================= */

  'python-user-records': [
    {
      id: 'python-user-records-1',
      title: 'Single adult',
      input: `1
Anu 18`,
      expectedOutput: 'Anu',
    },
    {
      id: 'python-user-records-2',
      title: 'Mixed ages',
      input: `5
Asha 17
Bala 18
Charan 21
Divya 16
Esha 45`,
      expectedOutput: `Bala
Charan
Esha`,
    },
    {
      id: 'python-user-records-3',
      title: 'All adults',
      input: `3
Arun 22
Bina 19
Chetan 30`,
      expectedOutput: `Arun
Bina
Chetan`,
    },
  ],
};

/* =========================================================
   GET PYTHON HIDDEN TEST CASES
========================================================= */

export function getPythonTestCases(
  problemSlug: string,
): PythonHiddenTestCase[] {
  return (
    PYTHON_TEST_CASES[
      problemSlug
    ] ?? []
  );
}
