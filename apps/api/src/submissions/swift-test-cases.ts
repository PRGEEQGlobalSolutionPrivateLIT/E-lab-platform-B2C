export type SwiftHiddenTestCase = {
  input: string;
  expectedOutput: string;
};

const SWIFT_TEST_CASES: Record<string, SwiftHiddenTestCase[]> = {
  'swift-hello-world': [
    {
      input: '',
      expectedOutput: 'Hello, World!',
    },
  ],

  'swift-add-two-numbers': [
    {
      input: '10 20',
      expectedOutput: '30',
    },
    {
      input: '-5 8',
      expectedOutput: '3',
    },
    {
      input: '100 200',
      expectedOutput: '300',
    },
  ],

  'swift-even-odd': [
    {
      input: '14',
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

  'swift-positive-negative-zero': [
    {
      input: '25',
      expectedOutput: 'Positive',
    },
    {
      input: '-12',
      expectedOutput: 'Negative',
    },
    {
      input: '0',
      expectedOutput: 'Zero',
    },
  ],

  'swift-factorial': [
    {
      input: '5',
      expectedOutput: '120',
    },
    {
      input: '0',
      expectedOutput: '1',
    },
    {
      input: '7',
      expectedOutput: '5040',
    },
  ],
};

export function getSwiftTestCases(
  problemSlug: string,
): SwiftHiddenTestCase[] {
  return SWIFT_TEST_CASES[problemSlug] ?? [];
}