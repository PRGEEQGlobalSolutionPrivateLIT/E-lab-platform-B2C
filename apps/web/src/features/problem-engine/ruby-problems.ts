import type { PracticeProblem } from './types';

export const rubyProblems: PracticeProblem[] = [
  {
    slug: 'ruby-hello-world',
    title: 'Hello World',
    technologySlug: 'ruby',
    difficulty: 'Easy',
    workspaceType: 'code',

    shortDescription:
      'Write your first Ruby program and print text to the console.',

    problemStatement:
      'Write a Ruby program that prints Hello, World! exactly as shown.',

    outputFormat:
      'Print the text: Hello, World!',

    skills: [
      'Ruby Syntax',
      'puts',
      'Output',
    ],

    estimatedMinutes: 5,

    defaultLanguage: 'ruby',

    allowedLanguages: [
      'ruby',
    ],

    starterCode: `# Write your code here
`,

    sampleTests: [
      {
        id: 'sample-1',
        title: 'Expected Output',
        expectedOutput: 'Hello, World!',
      },
    ],
  },

  {
    slug: 'ruby-add-two-numbers',
    title: 'Add Two Numbers',
    technologySlug: 'ruby',
    difficulty: 'Easy',
    workspaceType: 'code',

    shortDescription:
      'Read two integers and print their sum.',

    problemStatement:
      'Read two integers A and B from standard input and print their sum.',

    inputFormat:
      'Two integers A and B separated by a space.',

    outputFormat:
      'Print one integer representing A + B.',

    constraints: [
      '-100000 ≤ A ≤ 100000',
      '-100000 ≤ B ≤ 100000',
    ],

    skills: [
      'gets',
      'split',
      'map',
      'Arithmetic',
    ],

    estimatedMinutes: 10,

    defaultLanguage: 'ruby',

    allowedLanguages: [
      'ruby',
    ],

    starterCode: `a, b = gets.split.map(&:to_i)

# Print the sum
`,

    sampleTests: [
      {
        id: 'sample-1',
        title: 'Basic Addition',
        input: '5 7',
        expectedOutput: '12',
      },
    ],
  },

  {
    slug: 'ruby-even-odd',
    title: 'Check Even or Odd',
    technologySlug: 'ruby',
    difficulty: 'Easy',
    workspaceType: 'code',

    shortDescription:
      'Determine whether an integer is even or odd.',

    problemStatement:
      'Read an integer N. Print Even if N is divisible by 2. Otherwise print Odd.',

    inputFormat:
      'A single integer N.',

    outputFormat:
      'Print Even or Odd.',

    constraints: [
      '-1000000 ≤ N ≤ 1000000',
    ],

    skills: [
      'if/else',
      'Modulo Operator',
      'gets',
    ],

    estimatedMinutes: 10,

    defaultLanguage: 'ruby',

    allowedLanguages: [
      'ruby',
    ],

    starterCode: `n = gets.to_i

# Check even or odd
`,

    sampleTests: [
      {
        id: 'sample-1',
        title: 'Even Input',
        input: '8',
        expectedOutput: 'Even',
      },
      {
        id: 'sample-2',
        title: 'Odd Input',
        input: '5',
        expectedOutput: 'Odd',
      },
    ],
  },

  {
    slug: 'ruby-positive-negative-zero',
    title: 'Positive, Negative or Zero',
    technologySlug: 'ruby',
    difficulty: 'Easy',
    workspaceType: 'code',

    shortDescription:
      'Classify an integer by its sign.',

    problemStatement:
      'Read an integer N. Print Positive when N is greater than zero, Negative when it is less than zero, otherwise print Zero.',

    inputFormat:
      'A single integer N.',

    outputFormat:
      'Print Positive, Negative or Zero.',

    skills: [
      'if',
      'elsif',
      'else',
      'Comparison Operators',
    ],

    estimatedMinutes: 10,

    defaultLanguage: 'ruby',

    allowedLanguages: [
      'ruby',
    ],

    starterCode: `n = gets.to_i

# Write your condition
`,

    sampleTests: [
      {
        id: 'sample-1',
        title: 'Positive Number',
        input: '10',
        expectedOutput: 'Positive',
      },
      {
        id: 'sample-2',
        title: 'Negative Number',
        input: '-5',
        expectedOutput: 'Negative',
      },
      {
        id: 'sample-3',
        title: 'Zero',
        input: '0',
        expectedOutput: 'Zero',
      },
    ],
  },

  {
    slug: 'ruby-factorial',
    title: 'Factorial of a Number',
    technologySlug: 'ruby',
    difficulty: 'Easy',
    workspaceType: 'code',

    shortDescription:
      'Calculate factorial using iteration.',

    problemStatement:
      'Read a non-negative integer N and calculate N factorial.',

    inputFormat:
      'A non-negative integer N.',

    outputFormat:
      'Print N!.',

    constraints: [
      '0 ≤ N ≤ 20',
    ],

    skills: [
      'Loops',
      'Ranges',
      'Multiplication',
    ],

    estimatedMinutes: 15,

    defaultLanguage: 'ruby',

    allowedLanguages: [
      'ruby',
    ],

    starterCode: `n = gets.to_i

# Calculate factorial
`,

    sampleTests: [
      {
        id: 'sample-1',
        title: 'Factorial',
        input: '5',
        expectedOutput: '120',
      },
      {
        id: 'sample-2',
        title: 'Zero Factorial',
        input: '0',
        expectedOutput: '1',
      },
    ],
  },
];