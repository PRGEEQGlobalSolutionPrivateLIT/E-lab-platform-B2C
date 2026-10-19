import type { PracticeProblem } from './types';

export const csharpProblems: PracticeProblem[] = [
  {
    slug: 'csharp-hello-world',
    title: 'Hello World',
    technologySlug: 'csharp',
    difficulty: 'Easy',
    workspaceType: 'code',
    shortDescription:
      'Print Hello, World! using C#.',
    problemStatement:
      'Write a C# program that prints Hello, World! exactly as shown.',
    outputFormat:
      'Print the text: Hello, World!',
    skills: [
      'C# Syntax',
      'Console.WriteLine',
    ],
    estimatedMinutes: 5,
    defaultLanguage: 'csharp',
    allowedLanguages: ['csharp'],
    starterCode: `using System;

class Program
{
    static void Main()
    {
        // Write your code here
    }
}`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Print Hello World',
        expectedOutput: 'Hello, World!',
      },
    ],
  },

  {
    slug: 'csharp-add-two-numbers',
    title: 'Add Two Numbers',
    technologySlug: 'csharp',
    difficulty: 'Easy',
    workspaceType: 'code',
    shortDescription:
      'Read two integers and print their sum.',
    problemStatement:
      'Write a C# program that reads two integers and prints their sum.',
    inputFormat:
      'Two integers separated by a space.',
    outputFormat:
      'Print the sum of the two integers.',
    skills: [
      'Console.ReadLine',
      'Variables',
      'Arithmetic',
    ],
    estimatedMinutes: 10,
    defaultLanguage: 'csharp',
    allowedLanguages: ['csharp'],
    starterCode: `using System;

class Program
{
    static void Main()
    {
        // Write your code here
    }
}`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Add Two Positive Numbers',
        input: '5 3',
        expectedOutput: '8',
      },
    ],
  },

  {
    slug: 'csharp-even-odd',
    title: 'Even or Odd',
    technologySlug: 'csharp',
    difficulty: 'Easy',
    workspaceType: 'code',
    shortDescription:
      'Determine whether an integer is even or odd.',
    problemStatement:
      'Write a C# program that reads an integer and prints Even if the number is even or Odd if the number is odd.',
    inputFormat:
      'A single integer.',
    outputFormat:
      'Print Even or Odd.',
    skills: [
      'Conditionals',
      'Modulo Operator',
      'Console.ReadLine',
    ],
    estimatedMinutes: 10,
    defaultLanguage: 'csharp',
    allowedLanguages: ['csharp'],
    starterCode: `using System;

class Program
{
    static void Main()
    {
        // Write your code here
    }
}`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Even Number',
        input: '8',
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
    slug: 'csharp-largest-three',
    title: 'Largest of Three Numbers',
    technologySlug: 'csharp',
    difficulty: 'Easy',
    workspaceType: 'code',
    shortDescription:
      'Find the largest of three integers.',
    problemStatement:
      'Write a C# program that reads three integers and prints the largest value.',
    inputFormat:
      'Three integers separated by spaces.',
    outputFormat:
      'Print the largest integer.',
    skills: [
      'Conditionals',
      'Comparison Operators',
      'Console.ReadLine',
    ],
    estimatedMinutes: 12,
    defaultLanguage: 'csharp',
    allowedLanguages: ['csharp'],
    starterCode: `using System;

class Program
{
    static void Main()
    {
        // Write your code here
    }
}`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Largest Value',
        input: '10 25 15',
        expectedOutput: '25',
      },
    ],
  },

  {
    slug: 'csharp-sum-first-n',
    title: 'Sum of First N Numbers',
    technologySlug: 'csharp',
    difficulty: 'Easy',
    workspaceType: 'code',
    shortDescription:
      'Calculate the sum of integers from 1 to N.',
    problemStatement:
      'Write a C# program that reads a positive integer N and prints the sum of all integers from 1 to N.',
    inputFormat:
      'A positive integer N.',
    outputFormat:
      'Print the sum from 1 to N.',
    constraints: ['N >= 1'],
    skills: [
      'Loops',
      'Arithmetic',
      'Console.ReadLine',
    ],
    estimatedMinutes: 12,
    defaultLanguage: 'csharp',
    allowedLanguages: ['csharp'],
    starterCode: `using System;

class Program
{
    static void Main()
    {
        // Write your code here
    }
}`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Sum First Five',
        input: '5',
        expectedOutput: '15',
      },
    ],
  },

  {
    slug: 'csharp-factorial',
    title: 'Factorial',
    technologySlug: 'csharp',
    difficulty: 'Easy',
    workspaceType: 'code',
    shortDescription:
      'Calculate the factorial of a number.',
    problemStatement:
      'Write a C# program that reads a non-negative integer N and prints N factorial.',
    inputFormat:
      'A non-negative integer N.',
    outputFormat:
      'Print N factorial.',
    constraints: ['N >= 0'],
    skills: [
      'Loops',
      'Arithmetic',
      'Console.ReadLine',
    ],
    estimatedMinutes: 12,
    defaultLanguage: 'csharp',
    allowedLanguages: ['csharp'],
    starterCode: `using System;

class Program
{
    static void Main()
    {
        // Write your code here
    }
}`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Factorial of Five',
        input: '5',
        expectedOutput: '120',
      },
    ],
  },

  {
    slug: 'csharp-array-sum',
    title: 'Array Sum',
    technologySlug: 'csharp',
    difficulty: 'Medium',
    workspaceType: 'code',
    shortDescription:
      'Calculate the sum of elements in an integer array.',
    problemStatement:
      'Read N integers into an array and print the sum of all elements.',
    inputFormat:
      'The first line contains N. The second line contains N integers.',
    outputFormat:
      'Print the sum of the array elements.',
    constraints: ['N >= 1'],
    skills: [
      'Arrays',
      'Loops',
      'Console.ReadLine',
    ],
    estimatedMinutes: 15,
    defaultLanguage: 'csharp',
    allowedLanguages: ['csharp'],
    starterCode: `using System;

class Program
{
    static void Main()
    {
        // Write your code here
    }
}`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Array Sum',
        input: `5
1 2 3 4 5`,
        expectedOutput: '15',
      },
    ],
  },

  {
    slug: 'csharp-array-maximum',
    title: 'Maximum Array Element',
    technologySlug: 'csharp',
    difficulty: 'Medium',
    workspaceType: 'code',
    shortDescription:
      'Find the maximum value in an integer array.',
    problemStatement:
      'Read N integers into an array and print the largest element.',
    inputFormat:
      'The first line contains N. The second line contains N integers.',
    outputFormat:
      'Print the largest array element.',
    constraints: ['N >= 1'],
    skills: [
      'Arrays',
      'Loops',
      'Comparison',
    ],
    estimatedMinutes: 15,
    defaultLanguage: 'csharp',
    allowedLanguages: ['csharp'],
    starterCode: `using System;

class Program
{
    static void Main()
    {
        // Write your code here
    }
}`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Maximum Value',
        input: `5
4 9 2 15 7`,
        expectedOutput: '15',
      },
    ],
  },

  {
    slug: 'csharp-string-reverse',
    title: 'Reverse a String',
    technologySlug: 'csharp',
    difficulty: 'Medium',
    workspaceType: 'code',
    shortDescription:
      'Reverse an input string.',
    problemStatement:
      'Write a C# program that reads a line of text and prints the reversed string.',
    inputFormat:
      'A single line of text.',
    outputFormat:
      'Print the reversed string.',
    skills: [
      'Strings',
      'Arrays',
      'Console.ReadLine',
    ],
    estimatedMinutes: 15,
    defaultLanguage: 'csharp',
    allowedLanguages: ['csharp'],
    starterCode: `using System;

class Program
{
    static void Main()
    {
        // Write your code here
    }
}`,
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
    slug: 'csharp-word-frequency',
    title: 'Word Frequency',
    technologySlug: 'csharp',
    difficulty: 'Medium',
    workspaceType: 'code',
    shortDescription:
      'Count how many times a word occurs in a sentence.',
    problemStatement:
      'Read a sentence followed by a target word. Print how many times the target word occurs in the sentence.',
    inputFormat:
      'The first line contains a sentence. The second line contains the target word.',
    outputFormat:
      'Print the number of occurrences.',
    skills: [
      'Strings',
      'Arrays',
      'Loops',
    ],
    estimatedMinutes: 20,
    defaultLanguage: 'csharp',
    allowedLanguages: ['csharp'],
    starterCode: `using System;

class Program
{
    static void Main()
    {
        // Write your code here
    }
}`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Count Word',
        input: `csharp is simple and csharp is powerful
csharp`,
        expectedOutput: '2',
      },
    ],
  },

  {
    slug: 'csharp-student-class',
    title: 'Student Class',
    technologySlug: 'csharp',
    difficulty: 'Hard',
    workspaceType: 'code',
    shortDescription:
      'Create and use a C# class.',
    problemStatement:
      'Create a Student class with name and score fields. Read a student name and score, create a Student object, and print the student details in the format: Name: <name>, Score: <score>.',
    inputFormat:
      'The first line contains the student name. The second line contains the score.',
    outputFormat:
      'Print: Name: <name>, Score: <score>',
    skills: [
      'Classes',
      'Objects',
      'Constructors',
      'OOP',
    ],
    estimatedMinutes: 25,
    defaultLanguage: 'csharp',
    allowedLanguages: ['csharp'],
    starterCode: `using System;

class Student
{
    // Add fields and constructor here
}

class Program
{
    static void Main()
    {
        // Write your code here
    }
}`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Student Details',
        input: `Asha
90`,
        expectedOutput:
          'Name: Asha, Score: 90',
      },
    ],
  },

  {
    slug: 'csharp-student-records',
    title: 'Student Records',
    technologySlug: 'csharp',
    difficulty: 'Hard',
    workspaceType: 'code',
    shortDescription:
      'Manage multiple student records using C# collections.',
    problemStatement:
      'Read N student records containing a name and score. Store the records and print the name of the student with the highest score.',
    inputFormat:
      'The first line contains N. Each of the next N lines contains a student name followed by an integer score.',
    outputFormat:
      'Print the name of the student with the highest score.',
    constraints: ['N >= 1'],
    skills: [
      'Classes',
      'List<T>',
      'Objects',
      'Loops',
      'Collections',
    ],
    estimatedMinutes: 30,
    defaultLanguage: 'csharp',
    allowedLanguages: ['csharp'],
    starterCode: `using System;
using System.Collections.Generic;

class Student
{
    // Add fields and constructor here
}

class Program
{
    static void Main()
    {
        // Write your code here
    }
}`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Highest Scoring Student',
        input: `3
Asha 85
Ravi 92
Meera 88`,
        expectedOutput: 'Ravi',
      },
    ],
  },
];

export default csharpProblems;