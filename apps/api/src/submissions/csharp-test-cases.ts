type SourceCheck = {
  pattern: RegExp;
  message: string;
};

export type CSharpHiddenTestCase = {
  input: string;
  expectedOutput: string;
  requiredSourceChecks?: SourceCheck[];
  forbiddenSourceChecks?: SourceCheck[];
};

const csharpTestCases: Record<string, CSharpHiddenTestCase[]> = {
  'csharp-hello-world': [
    { input: '', expectedOutput: 'Hello, World!' },
    { input: '', expectedOutput: 'Hello, World!' },
    { input: '', expectedOutput: 'Hello, World!' },
  ],

  'csharp-add-two-numbers': [
    { input: '12 8', expectedOutput: '20' },
    { input: '-5 9', expectedOutput: '4' },
    { input: '100 250', expectedOutput: '350' },
  ],

  'csharp-even-odd': [
    { input: '24', expectedOutput: 'Even' },
    { input: '17', expectedOutput: 'Odd' },
    { input: '-8', expectedOutput: 'Even' },
  ],

  'csharp-largest-three': [
    { input: '10 25 15', expectedOutput: '25' },
    { input: '-10 -3 -20', expectedOutput: '-3' },
    { input: '99 99 12', expectedOutput: '99' },
  ],

  'csharp-sum-first-n': [
    { input: '1', expectedOutput: '1' },
    { input: '10', expectedOutput: '55' },
    { input: '100', expectedOutput: '5050' },
  ],

  'csharp-factorial': [
    { input: '0', expectedOutput: '1' },
    { input: '6', expectedOutput: '720' },
    { input: '10', expectedOutput: '3628800' },
  ],

  'csharp-array-sum': [
    { input: '5\n1 2 3 4 5', expectedOutput: '15' },
    { input: '4\n-5 10 -2 7', expectedOutput: '10' },
    { input: '1\n42', expectedOutput: '42' },
  ],

  'csharp-array-maximum': [
    { input: '5\n4 9 2 15 7', expectedOutput: '15' },
    { input: '4\n-8 -2 -15 -3', expectedOutput: '-2' },
    { input: '1\n99', expectedOutput: '99' },
  ],

  'csharp-string-reverse': [
    { input: 'hello', expectedOutput: 'olleh' },
    { input: 'CSharp', expectedOutput: 'prahSC' },
    { input: '12345', expectedOutput: '54321' },
  ],

  'csharp-word-frequency': [
    {
      input: 'csharp is simple and csharp is powerful\ncsharp',
      expectedOutput: '2',
    },
    {
      input: 'red blue red green red\nred',
      expectedOutput: '3',
    },
    {
      input: 'java python csharp\nruby',
      expectedOutput: '0',
    },
  ],

  'csharp-student-class': [
    {
      input: 'Asha\n90',
      expectedOutput: 'Name: Asha, Score: 90',
      requiredSourceChecks: [
        {
          pattern: /\bclass\s+Student\b/,
          message: 'Create a Student class.',
        },
      ],
    },
    {
      input: 'Ravi\n76',
      expectedOutput: 'Name: Ravi, Score: 76',
      requiredSourceChecks: [
        {
          pattern: /\bclass\s+Student\b/,
          message: 'Create a Student class.',
        },
      ],
    },
    {
      input: 'Meera\n100',
      expectedOutput: 'Name: Meera, Score: 100',
      requiredSourceChecks: [
        {
          pattern: /\bclass\s+Student\b/,
          message: 'Create a Student class.',
        },
      ],
    },
  ],

  'csharp-student-records': [
    {
      input: '3\nAsha 85\nRavi 92\nMeera 88',
      expectedOutput: 'Ravi',
      requiredSourceChecks: [
        {
          pattern: /\bclass\s+Student\b/,
          message: 'Create a Student class.',
        },
        {
          pattern: /\bList\s*<\s*Student\s*>/,
          message: 'Store student records using List<Student>.',
        },
      ],
    },
    {
      input: '4\nArun 70\nBina 95\nCharan 82\nDivya 89',
      expectedOutput: 'Bina',
      requiredSourceChecks: [
        {
          pattern: /\bclass\s+Student\b/,
          message: 'Create a Student class.',
        },
        {
          pattern: /\bList\s*<\s*Student\s*>/,
          message: 'Store student records using List<Student>.',
        },
      ],
    },
    {
      input: '1\nKiran 100',
      expectedOutput: 'Kiran',
      requiredSourceChecks: [
        {
          pattern: /\bclass\s+Student\b/,
          message: 'Create a Student class.',
        },
        {
          pattern: /\bList\s*<\s*Student\s*>/,
          message: 'Store student records using List<Student>.',
        },
      ],
    },
  ],
};

export function getCSharpTestCases(
  problemSlug: string,
): CSharpHiddenTestCase[] {
  return csharpTestCases[problemSlug] ?? [];
}

export default csharpTestCases;
