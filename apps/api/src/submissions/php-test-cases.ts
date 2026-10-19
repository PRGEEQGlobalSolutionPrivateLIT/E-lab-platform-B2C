export type PhpHiddenTestCase = {
  input: string;
  expectedOutput: string;
};

const phpTestCases: Record<string, PhpHiddenTestCase[]> = {
  'php-hello-world': [
    {
      input: '',
      expectedOutput: 'Hello, World!',
    },
  ],

  'php-variables': [
    {
      input: '',
      expectedOutput: 'Hello PHP',
    },
  ],

  'php-user-input': [
    {
      input: 'PHP',
      expectedOutput: 'PHP',
    },
    {
      input: 'Hello World',
      expectedOutput: 'Hello World',
    },
    {
      input: 'E-Lab',
      expectedOutput: 'E-Lab',
    },
  ],

  'php-add-numbers': [
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
  ],

  'php-even-odd': [
    {
      input: '10',
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
  ],

  'php-largest-number': [
    {
      input: '10 20 15',
      expectedOutput: '20',
    },
    {
      input: '50 25 30',
      expectedOutput: '50',
    },
    {
      input: '-5 -2 -10',
      expectedOutput: '-2',
    },
  ],

  'php-for-loop': [
    {
      input: '5',
      expectedOutput: '1 2 3 4 5',
    },
    {
      input: '3',
      expectedOutput: '1 2 3',
    },
    {
      input: '1',
      expectedOutput: '1',
    },
  ],

  'php-array-sum': [
    {
      input: '1 2 3 4 5',
      expectedOutput: '15',
    },
    {
      input: '10 20 30',
      expectedOutput: '60',
    },
    {
      input: '-5 10 5',
      expectedOutput: '10',
    },
  ],

  'php-reverse-string': [
    {
      input: 'hello',
      expectedOutput: 'olleh',
    },
    {
      input: 'PHP',
      expectedOutput: 'PHP',
    },
    {
      input: 'elab',
      expectedOutput: 'bale',
    },
  ],

  'php-function': [
    {
      input: '5',
      expectedOutput: '25',
    },
    {
      input: '10',
      expectedOutput: '100',
    },
    {
      input: '-4',
      expectedOutput: '16',
    },
  ],

  'php-class': [
    {
      input: 'John',
      expectedOutput: 'John',
    },
    {
      input: 'Alice',
      expectedOutput: 'Alice',
    },
    {
      input: 'David',
      expectedOutput: 'David',
    },
  ],

  'php-exception-handling': [
    {
      input: '10 2',
      expectedOutput: '5',
    },
    {
      input: '20 4',
      expectedOutput: '5',
    },
    {
      input: '10 0',
      expectedOutput: 'Cannot divide by zero',
    },
  ],
};

export function getPhpTestCases(
  problemSlug: string,
): PhpHiddenTestCase[] {
  return phpTestCases[problemSlug] ?? [];
}