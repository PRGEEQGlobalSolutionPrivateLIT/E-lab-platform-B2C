import type { PracticeProblem } from './types';

export const javaProblems: PracticeProblem[] = [
  {
    slug: 'java-hello-world',
    title: 'Hello World',
    technologySlug: 'java',
    difficulty: 'Easy',
    workspaceType: 'code',
    shortDescription: 'Print Hello, World! using Java.',
    problemStatement:
      'Write a Java program that prints Hello, World! exactly as shown.',
    outputFormat: 'Print the text: Hello, World!',
    skills: ['Java Syntax', 'System.out.println'],
    estimatedMinutes: 5,
    defaultLanguage: 'java',
    allowedLanguages: ['java'],
    starterCode: `public class Main {
    public static void main(String[] args) {
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
    slug: 'java-add-two-numbers',
    title: 'Add Two Numbers',
    technologySlug: 'java',
    difficulty: 'Easy',
    workspaceType: 'code',
    shortDescription: 'Read two integers and print their sum.',
    problemStatement:
      'Write a Java program that reads two integers and prints their sum.',
    inputFormat: 'Two integers separated by a space.',
    outputFormat: 'Print the sum of the two integers.',
    skills: ['Scanner', 'Variables', 'Arithmetic'],
    estimatedMinutes: 10,
    defaultLanguage: 'java',
    allowedLanguages: ['java'],
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

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
    slug: 'java-even-odd',
    title: 'Even or Odd',
    technologySlug: 'java',
    difficulty: 'Easy',
    workspaceType: 'code',
    shortDescription: 'Determine whether an integer is even or odd.',
    problemStatement:
      'Write a Java program that reads an integer and prints Even if the number is even or Odd if the number is odd.',
    inputFormat: 'A single integer.',
    outputFormat: 'Print Even or Odd.',
    skills: ['Conditionals', 'Modulo Operator', 'Scanner'],
    estimatedMinutes: 10,
    defaultLanguage: 'java',
    allowedLanguages: ['java'],
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

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
    slug: 'java-largest-three',
    title: 'Largest of Three Numbers',
    technologySlug: 'java',
    difficulty: 'Easy',
    workspaceType: 'code',
    shortDescription: 'Find the largest of three integers.',
    problemStatement:
      'Write a Java program that reads three integers and prints the largest value.',
    inputFormat: 'Three integers separated by spaces.',
    outputFormat: 'Print the largest integer.',
    skills: ['Conditionals', 'Comparison Operators', 'Scanner'],
    estimatedMinutes: 12,
    defaultLanguage: 'java',
    allowedLanguages: ['java'],
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

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
    slug: 'java-sum-first-n',
    title: 'Sum of First N Numbers',
    technologySlug: 'java',
    difficulty: 'Easy',
    workspaceType: 'code',
    shortDescription: 'Calculate the sum of integers from 1 to N.',
    problemStatement:
      'Write a Java program that reads a positive integer N and prints the sum of all integers from 1 to N.',
    inputFormat: 'A positive integer N.',
    outputFormat: 'Print the sum from 1 to N.',
    constraints: ['N >= 1'],
    skills: ['Loops', 'Arithmetic', 'Scanner'],
    estimatedMinutes: 12,
    defaultLanguage: 'java',
    allowedLanguages: ['java'],
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

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
    slug: 'java-factorial',
    title: 'Factorial',
    technologySlug: 'java',
    difficulty: 'Easy',
    workspaceType: 'code',
    shortDescription: 'Calculate the factorial of a number.',
    problemStatement:
      'Write a Java program that reads a non-negative integer N and prints N factorial.',
    inputFormat: 'A non-negative integer N.',
    outputFormat: 'Print N factorial.',
    constraints: ['N >= 0'],
    skills: ['Loops', 'Arithmetic', 'Scanner'],
    estimatedMinutes: 12,
    defaultLanguage: 'java',
    allowedLanguages: ['java'],
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

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
    slug: 'java-array-sum',
    title: 'Array Sum',
    technologySlug: 'java',
    difficulty: 'Medium',
    workspaceType: 'code',
    shortDescription: 'Calculate the sum of elements in an integer array.',
    problemStatement:
      'Read N integers into an array and print the sum of all elements.',
    inputFormat:
      'The first line contains N. The second line contains N integers.',
    outputFormat: 'Print the sum of the array elements.',
    constraints: ['N >= 1'],
    skills: ['Arrays', 'Loops', 'Scanner'],
    estimatedMinutes: 15,
    defaultLanguage: 'java',
    allowedLanguages: ['java'],
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

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
    slug: 'java-array-maximum',
    title: 'Maximum Array Element',
    technologySlug: 'java',
    difficulty: 'Medium',
    workspaceType: 'code',
    shortDescription: 'Find the maximum value in an integer array.',
    problemStatement:
      'Read N integers into an array and print the largest element.',
    inputFormat:
      'The first line contains N. The second line contains N integers.',
    outputFormat: 'Print the largest array element.',
    constraints: ['N >= 1'],
    skills: ['Arrays', 'Loops', 'Comparison'],
    estimatedMinutes: 15,
    defaultLanguage: 'java',
    allowedLanguages: ['java'],
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

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
    slug: 'java-string-reverse',
    title: 'Reverse a String',
    technologySlug: 'java',
    difficulty: 'Medium',
    workspaceType: 'code',
    shortDescription: 'Reverse an input string.',
    problemStatement:
      'Write a Java program that reads a line of text and prints the reversed string.',
    inputFormat: 'A single line of text.',
    outputFormat: 'Print the reversed string.',
    skills: ['Strings', 'StringBuilder', 'Scanner'],
    estimatedMinutes: 15,
    defaultLanguage: 'java',
    allowedLanguages: ['java'],
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

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
    slug: 'java-word-frequency',
    title: 'Word Frequency',
    technologySlug: 'java',
    difficulty: 'Medium',
    workspaceType: 'code',
    shortDescription: 'Count how many times a word occurs in a sentence.',
    problemStatement:
      'Read a sentence followed by a target word. Print how many times the target word occurs in the sentence.',
    inputFormat:
      'The first line contains a sentence. The second line contains the target word.',
    outputFormat: 'Print the number of occurrences.',
    skills: ['Strings', 'Arrays', 'Loops'],
    estimatedMinutes: 20,
    defaultLanguage: 'java',
    allowedLanguages: ['java'],
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Write your code here
    }
}`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Count Word',
        input: `java is simple and java is powerful
java`,
        expectedOutput: '2',
      },
    ],
  },

  {
    slug: 'java-student-class',
    title: 'Student Class',
    technologySlug: 'java',
    difficulty: 'Hard',
    workspaceType: 'code',
    shortDescription: 'Create and use a Java class.',
    problemStatement:
      'Create a Student class with name and score fields. Read a student name and score, create a Student object, and print the student details in the format: Name: <name>, Score: <score>.',
    inputFormat:
      'The first line contains the student name. The second line contains the score.',
    outputFormat: 'Print: Name: <name>, Score: <score>',
    skills: ['Classes', 'Objects', 'Constructors', 'OOP'],
    estimatedMinutes: 25,
    defaultLanguage: 'java',
    allowedLanguages: ['java'],
    starterCode: `import java.util.Scanner;

class Student {
    // Add fields and constructor here
}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Write your code here
    }
}`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Student Details',
        input: `Asha
90`,
        expectedOutput: 'Name: Asha, Score: 90',
      },
    ],
  },

  {
    slug: 'java-student-records',
    title: 'Student Records',
    technologySlug: 'java',
    difficulty: 'Hard',
    workspaceType: 'code',
    shortDescription: 'Manage multiple student records using Java collections.',
    problemStatement:
      'Read N student records containing a name and score. Store the records and print the name of the student with the highest score.',
    inputFormat:
      'The first line contains N. Each of the next N lines contains a student name followed by an integer score.',
    outputFormat: 'Print the name of the student with the highest score.',
    constraints: ['N >= 1'],
    skills: ['Classes', 'ArrayList', 'Objects', 'Loops', 'Collections'],
    estimatedMinutes: 30,
    defaultLanguage: 'java',
    allowedLanguages: ['java'],
    starterCode: `import java.util.ArrayList;
import java.util.Scanner;

class Student {
    // Add fields and constructor here
}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

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

export default javaProblems;