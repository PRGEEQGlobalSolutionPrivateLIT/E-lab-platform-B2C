import type {
  PracticeProblem,
} from './types';

/* =========================================================
   PYTHON PROBLEMS

   Target:
   Python 3.12+

   IMPORTANT:
   - These problems use the shared code workspace.
   - They do NOT create a separate Python editor.
   - All problems use standard input/output unless stated.
   - This initial set prepares learners for Django.
========================================================= */

export const pythonProblems:
  PracticeProblem[] = [

  /* =======================================================
     01 — HELLO WORLD
  ======================================================= */

  {
    slug:
      'python-hello-world',

    title:
      'Hello World',

    technologySlug:
      'python',

    difficulty:
      'Easy',

    workspaceType:
      'code',

    shortDescription:
      'Write a basic Python program that prints Hello, World!.',

    problemStatement:
      `Write a Python program that prints:

Hello, World!

Print the text exactly as shown.`,

    inputFormat:
      'No input is required.',

    outputFormat:
      'Print exactly: Hello, World!',

    constraints: [
      'Use Python 3 syntax.',
      'Print the text exactly as shown.',
      'Do not print additional text.',
    ],

    skills: [
      'Python Syntax',
      'print()',
      'Output',
    ],

    estimatedMinutes:
      5,

    defaultLanguage:
      'python',

    allowedLanguages: [
      'python',
    ],

    starterCode:
      `print()
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Basic output',

        expectedOutput:
          'Hello, World!',
      },
    ],
  },

  /* =======================================================
     02 — ADD TWO NUMBERS
  ======================================================= */

  {
    slug:
      'python-add-two-numbers',

    title:
      'Add Two Numbers',

    technologySlug:
      'python',

    difficulty:
      'Easy',

    workspaceType:
      'code',

    shortDescription:
      'Read two integers and print their sum.',

    problemStatement:
      `Read two integers from standard input and print their sum.

The two values are provided on one line separated by a space.`,

    inputFormat:
      'Two integers a and b separated by a space.',

    outputFormat:
      'Print a single integer equal to a + b.',

    constraints: [
      '-1,000,000 <= a, b <= 1,000,000',
      'Use standard input.',
      'Print only the sum.',
    ],

    skills: [
      'input()',
      'int()',
      'Variables',
      'Arithmetic',
    ],

    estimatedMinutes:
      10,

    defaultLanguage:
      'python',

    allowedLanguages: [
      'python',
    ],

    starterCode:
      `a, b = map(int, input().split())

# Print the sum
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Positive numbers',

        input:
          '10 20',

        expectedOutput:
          '30',
      },
      {
        id:
          'sample-2',

        title:
          'Mixed values',

        input:
          '-5 8',

        expectedOutput:
          '3',
      },
    ],
  },

  /* =======================================================
     03 — EVEN OR ODD
  ======================================================= */

  {
    slug:
      'python-even-odd',

    title:
      'Even or Odd',

    technologySlug:
      'python',

    difficulty:
      'Easy',

    workspaceType:
      'code',

    shortDescription:
      'Determine whether an integer is even or odd.',

    problemStatement:
      `Read an integer n.

Print:
- Even if n is divisible by 2.
- Odd otherwise.`,

    inputFormat:
      'A single integer n.',

    outputFormat:
      'Print either Even or Odd.',

    constraints: [
      '-1,000,000,000 <= n <= 1,000,000,000',
      'Use the modulo operator.',
      'Match the output capitalization exactly.',
    ],

    skills: [
      'Conditions',
      'Modulo',
      'if/else',
    ],

    estimatedMinutes:
      10,

    defaultLanguage:
      'python',

    allowedLanguages: [
      'python',
    ],

    starterCode:
      `n = int(input())

# Determine whether n is even or odd
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Even number',

        input:
          '24',

        expectedOutput:
          'Even',
      },
      {
        id:
          'sample-2',

        title:
          'Odd number',

        input:
          '17',

        expectedOutput:
          'Odd',
      },
    ],
  },

  /* =======================================================
     04 — LARGEST OF THREE
  ======================================================= */

  {
    slug:
      'python-largest-three',

    title:
      'Largest of Three Numbers',

    technologySlug:
      'python',

    difficulty:
      'Easy',

    workspaceType:
      'code',

    shortDescription:
      'Find the largest value among three integers.',

    problemStatement:
      `Read three integers a, b and c.

Print the largest of the three values.`,

    inputFormat:
      'Three integers a, b and c separated by spaces.',

    outputFormat:
      'Print the largest integer.',

    constraints: [
      '-1,000,000 <= a, b, c <= 1,000,000',
      'The values may be equal.',
      'Print only the largest value.',
    ],

    skills: [
      'Conditions',
      'Comparison Operators',
      'Variables',
    ],

    estimatedMinutes:
      15,

    defaultLanguage:
      'python',

    allowedLanguages: [
      'python',
    ],

    starterCode:
      `a, b, c = map(int, input().split())

# Find and print the largest value
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Third number is largest',

        input:
          '10 25 40',

        expectedOutput:
          '40',
      },
      {
        id:
          'sample-2',

        title:
          'Negative values',

        input:
          '-8 -2 -15',

        expectedOutput:
          '-2',
      },
    ],
  },

  /* =======================================================
     05 — SUM FIRST N NUMBERS
  ======================================================= */

  {
    slug:
      'python-sum-first-n',

    title:
      'Sum First N Numbers',

    technologySlug:
      'python',

    difficulty:
      'Easy',

    workspaceType:
      'code',

    shortDescription:
      'Calculate the sum of integers from 1 through N.',

    problemStatement:
      `Read a positive integer n.

Calculate and print:

1 + 2 + 3 + ... + n`,

    inputFormat:
      'A single positive integer n.',

    outputFormat:
      'Print the sum of the integers from 1 to n.',

    constraints: [
      '1 <= n <= 100,000',
      'Use Python integer arithmetic.',
      'Print only the result.',
    ],

    skills: [
      'Loops',
      'range()',
      'Accumulation',
      'Arithmetic',
    ],

    estimatedMinutes:
      15,

    defaultLanguage:
      'python',

    allowedLanguages: [
      'python',
    ],

    starterCode:
      `n = int(input())

total = 0

# Calculate the sum from 1 to n

print(total)
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'First five numbers',

        input:
          '5',

        expectedOutput:
          '15',
      },
      {
        id:
          'sample-2',

        title:
          'Single number',

        input:
          '1',

        expectedOutput:
          '1',
      },
    ],
  },

  /* =======================================================
     06 — FACTORIAL
  ======================================================= */

  {
    slug:
      'python-factorial',

    title:
      'Factorial',

    technologySlug:
      'python',

    difficulty:
      'Easy',

    workspaceType:
      'code',

    shortDescription:
      'Calculate the factorial of a non-negative integer.',

    problemStatement:
      `Read a non-negative integer n.

Calculate n factorial:

n! = n × (n - 1) × ... × 1

By definition:

0! = 1`,

    inputFormat:
      'A single non-negative integer n.',

    outputFormat:
      'Print n!.',

    constraints: [
      '0 <= n <= 100',
      '0! must produce 1.',
      'Do not print additional text.',
    ],

    skills: [
      'Loops',
      'Factorial',
      'Multiplication',
      'Edge Cases',
    ],

    estimatedMinutes:
      15,

    defaultLanguage:
      'python',

    allowedLanguages: [
      'python',
    ],

    starterCode:
      `n = int(input())

result = 1

# Calculate n factorial

print(result)
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Factorial of five',

        input:
          '5',

        expectedOutput:
          '120',
      },
      {
        id:
          'sample-2',

        title:
          'Factorial of zero',

        input:
          '0',

        expectedOutput:
          '1',
      },
    ],
  },

  /* =======================================================
     07 — LIST SUM
  ======================================================= */

  {
    slug:
      'python-list-sum',

    title:
      'Sum a List',

    technologySlug:
      'python',

    difficulty:
      'Medium',

    workspaceType:
      'code',

    shortDescription:
      'Read a list of integers and calculate its sum.',

    problemStatement:
      `Read an integer n followed by n integers.

Print the sum of all values in the list.`,

    inputFormat:
      `First line: integer n.
Second line: n space-separated integers.`,

    outputFormat:
      'Print the sum of all list elements.',

    constraints: [
      '1 <= n <= 100,000',
      '-1,000,000 <= each value <= 1,000,000',
      'The second line contains exactly n integers.',
    ],

    skills: [
      'Lists',
      'map()',
      'Iteration',
      'Aggregation',
    ],

    estimatedMinutes:
      20,

    defaultLanguage:
      'python',

    allowedLanguages: [
      'python',
    ],

    starterCode:
      `n = int(input())
numbers = list(map(int, input().split()))

# Calculate and print the list sum
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Positive list',

        input:
          `5
1 2 3 4 5`,

        expectedOutput:
          '15',
      },
      {
        id:
          'sample-2',

        title:
          'Mixed list',

        input:
          `4
-5 10 -2 7`,

        expectedOutput:
          '10',
      },
    ],
  },

  /* =======================================================
     08 — LIST MAXIMUM
  ======================================================= */

  {
    slug:
      'python-list-maximum',

    title:
      'Find the Maximum in a List',

    technologySlug:
      'python',

    difficulty:
      'Medium',

    workspaceType:
      'code',

    shortDescription:
      'Find the largest number in a list of integers.',

    problemStatement:
      `Read an integer n followed by n integers.

Print the largest value in the list.`,

    inputFormat:
      `First line: integer n.
Second line: n space-separated integers.`,

    outputFormat:
      'Print the maximum list value.',

    constraints: [
      '1 <= n <= 100,000',
      '-1,000,000,000 <= each value <= 1,000,000,000',
      'The list contains at least one value.',
    ],

    skills: [
      'Lists',
      'Iteration',
      'Comparison',
      'Maximum Value',
    ],

    estimatedMinutes:
      20,

    defaultLanguage:
      'python',

    allowedLanguages: [
      'python',
    ],

    starterCode:
      `n = int(input())
numbers = list(map(int, input().split()))

# Find and print the maximum value
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Mixed numbers',

        input:
          `5
8 3 12 4 7`,

        expectedOutput:
          '12',
      },
      {
        id:
          'sample-2',

        title:
          'All negative',

        input:
          `4
-8 -3 -20 -5`,

        expectedOutput:
          '-3',
      },
    ],
  },

  /* =======================================================
     09 — STRING REVERSE
  ======================================================= */

  {
    slug:
      'python-string-reverse',

    title:
      'Reverse a String',

    technologySlug:
      'python',

    difficulty:
      'Medium',

    workspaceType:
      'code',

    shortDescription:
      'Reverse the characters in a string.',

    problemStatement:
      `Read one line of text.

Print the characters in reverse order.`,

    inputFormat:
      'A single line containing a string.',

    outputFormat:
      'Print the reversed string.',

    constraints: [
      '1 <= string length <= 10,000',
      'The input may contain spaces.',
      'Preserve all characters while reversing.',
    ],

    skills: [
      'Strings',
      'Slicing',
      'Input Processing',
    ],

    estimatedMinutes:
      15,

    defaultLanguage:
      'python',

    allowedLanguages: [
      'python',
    ],

    starterCode:
      `text = input()

# Reverse and print the string
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Simple word',

        input:
          'python',

        expectedOutput:
          'nohtyp',
      },
      {
        id:
          'sample-2',

        title:
          'Text with space',

        input:
          'hello world',

        expectedOutput:
          'dlrow olleh',
      },
    ],
  },

  /* =======================================================
     10 — WORD FREQUENCY
  ======================================================= */

  {
    slug:
      'python-word-frequency',

    title:
      'Count Word Frequency',

    technologySlug:
      'python',

    difficulty:
      'Medium',

    workspaceType:
      'code',

    shortDescription:
      'Count how many times each word occurs in a line.',

    problemStatement:
      `Read one line containing space-separated words.

Count how many times each distinct word appears.

Print the words in the order of their first appearance using:

word count

Print one result per line.`,

    inputFormat:
      'A single line containing one or more space-separated words.',

    outputFormat:
      `For each distinct word, print:
word count

Use the order in which each word first appeared.`,

    constraints: [
      '1 <= number of words <= 10,000',
      'Words are case-sensitive.',
      'Use a dictionary to store frequencies.',
    ],

    skills: [
      'Dictionaries',
      'Strings',
      'Loops',
      'Frequency Counting',
    ],

    estimatedMinutes:
      25,

    defaultLanguage:
      'python',

    allowedLanguages: [
      'python',
    ],

    starterCode:
      `words = input().split()

frequency = {}

# Count each word and print frequencies
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Repeated words',

        input:
          'python django python api django python',

        expectedOutput:
          `python 3
django 2
api 1`,
      },
    ],
  },

  /* =======================================================
     11 — STUDENT CLASS
  ======================================================= */

  {
    slug:
      'python-student-class',

    title:
      'Create a Student Class',

    technologySlug:
      'python',

    difficulty:
      'Hard',

    workspaceType:
      'code',

    shortDescription:
      'Create a Python class and use methods to represent student data.',

    problemStatement:
      `Create a class named Student.

The class must:
1. Have an __init__ method accepting name and score.
2. Store name and score as instance attributes.
3. Define a get_result() method.
4. Return "Pass" when score is at least 50.
5. Return "Fail" otherwise.

Input contains a student name followed by an integer score.

Create a Student object and print:

<name> <result>`,

    inputFormat:
      `First line: student name.
Second line: integer score.`,

    outputFormat:
      'Print the student name followed by Pass or Fail.',

    constraints: [
      '0 <= score <= 100',
      'Use a class named Student.',
      'Use __init__.',
      'Use an instance method named get_result.',
    ],

    skills: [
      'Classes',
      'Objects',
      '__init__',
      'Instance Methods',
      'OOP',
    ],

    estimatedMinutes:
      30,

    defaultLanguage:
      'python',

    allowedLanguages: [
      'python',
    ],

    starterCode:
      `class Student:
    def __init__(self, name: str, score: int):
        # Store instance data
        pass

    def get_result(self) -> str:
        # Return Pass or Fail
        pass


name = input()
score = int(input())

# Create the Student object and print the result
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Passing student',

        input:
          `Anu
78`,

        expectedOutput:
          'Anu Pass',
      },
      {
        id:
          'sample-2',

        title:
          'Failing student',

        input:
          `Kiran
42`,

        expectedOutput:
          'Kiran Fail',
      },
    ],
  },

  /* =======================================================
     12 — USER RECORDS
  ======================================================= */

  {
    slug:
      'python-user-records',

    title:
      'Process User Records',

    technologySlug:
      'python',

    difficulty:
      'Hard',

    workspaceType:
      'code',

    shortDescription:
      'Process application-style records using lists and dictionaries.',

    problemStatement:
      `Read n user records.

Each record contains:

name age

Store each record as a dictionary with:
- name
- age

After reading all records, print the names of users whose age is at least 18.

Print eligible names in the same order they were entered, one per line.`,

    inputFormat:
      `First line: integer n.
Next n lines: a name followed by an integer age.`,

    outputFormat:
      'Print one eligible user name per line for users aged 18 or older.',

    constraints: [
      '1 <= n <= 10,000',
      '0 <= age <= 120',
      'Names contain no spaces.',
      'Use dictionaries to represent user records.',
      'Preserve input order.',
    ],

    skills: [
      'Lists',
      'Dictionaries',
      'Loops',
      'Filtering',
      'Application Data',
    ],

    estimatedMinutes:
      30,

    defaultLanguage:
      'python',

    allowedLanguages: [
      'python',
    ],

    starterCode:
      `n = int(input())

users = []

for _ in range(n):
    name, age_text = input().split()
    age = int(age_text)

    # Add a dictionary for this user

# Print users who are at least 18
`,

    sampleTests: [
      {
        id:
          'sample-1',

        title:
          'Filter adult users',

        input:
          `4
Anu 22
Kiran 16
Meera 18
Rahul 14`,

        expectedOutput:
          `Anu
Meera`,
      },
    ],
  },
];
