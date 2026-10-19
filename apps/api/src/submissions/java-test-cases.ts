export type JavaHiddenTestCase = {
  input: string;
  expectedOutput: string;
};

export const JAVA_TEST_CASES: Record<
  string,
  JavaHiddenTestCase[]
> = {
  'java-hello-world': [
    {
      input: '',
      expectedOutput: 'Hello, World!',
    },
    {
      input: '',
      expectedOutput: 'Hello, World!',
    },
    {
      input: '',
      expectedOutput: 'Hello, World!',
    },
  ],

  'java-add-two-numbers': [
    {
      input: '5 3',
      expectedOutput: '8',
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

  'java-even-odd': [
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
  ],

  'java-largest-three': [
    {
      input: '10 25 15',
      expectedOutput: '25',
    },
    {
      input: '50 20 30',
      expectedOutput: '50',
    },
    {
      input: '-10 -5 -20',
      expectedOutput: '-5',
    },
  ],

  'java-sum-first-n': [
    {
      input: '5',
      expectedOutput: '15',
    },
    {
      input: '10',
      expectedOutput: '55',
    },
    {
      input: '1',
      expectedOutput: '1',
    },
  ],

  'java-factorial': [
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

  'java-array-sum': [
    {
      input: `5
1 2 3 4 5`,
      expectedOutput: '15',
    },
    {
      input: `4
10 20 30 40`,
      expectedOutput: '100',
    },
    {
      input: `3
-5 10 -2`,
      expectedOutput: '3',
    },
  ],

  'java-array-maximum': [
    {
      input: `5
4 9 2 15 7`,
      expectedOutput: '15',
    },
    {
      input: `4
20 5 40 10`,
      expectedOutput: '40',
    },
    {
      input: `3
-10 -2 -30`,
      expectedOutput: '-2',
    },
  ],

  'java-string-reverse': [
    {
      input: 'hello',
      expectedOutput: 'olleh',
    },
    {
      input: 'Java',
      expectedOutput: 'avaJ',
    },
    {
      input: 'OpenAI',
      expectedOutput: 'IAnepO',
    },
  ],

  'java-word-frequency': [
    {
      input: `java is simple and java is powerful
java`,
      expectedOutput: '2',
    },
    {
      input: `code learn code practice code
code`,
      expectedOutput: '3',
    },
    {
      input: `hello world
java`,
      expectedOutput: '0',
    },
  ],

  'java-student-class': [
    {
      input: `Asha
90`,
      expectedOutput: 'Name: Asha, Score: 90',
    },
    {
      input: `Ravi
75`,
      expectedOutput: 'Name: Ravi, Score: 75',
    },
    {
      input: `Meera
100`,
      expectedOutput: 'Name: Meera, Score: 100',
    },
  ],

  'java-student-records': [
    {
      input: `3
Asha 85
Ravi 92
Meera 88`,
      expectedOutput: 'Ravi',
    },
    {
      input: `4
Arun 65
Priya 95
Kiran 80
John 70`,
      expectedOutput: 'Priya',
    },
    {
      input: `2
Asha 70
Meera 99`,
      expectedOutput: 'Meera',
    },
  ],
};

export function getJavaTestCases(
  problemSlug: string,
): JavaHiddenTestCase[] {
  return JAVA_TEST_CASES[problemSlug] ?? [];
}