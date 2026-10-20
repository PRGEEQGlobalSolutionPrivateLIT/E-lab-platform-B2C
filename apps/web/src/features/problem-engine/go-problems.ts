import type { PracticeProblem } from './types';

export const goProblems: PracticeProblem[] = [
  {
    slug: 'go-hello-world',
    title: 'Hello World',
    technologySlug: 'go',
    difficulty: 'Easy',
    workspaceType: 'code',
    shortDescription: 'Print Hello, World! using Go.',
    problemStatement:
      'Write a Go program that prints Hello, World! exactly as shown.',
    outputFormat: 'Print the text: Hello, World!',
    skills: ['Go Syntax', 'fmt.Println', 'package main'],
    estimatedMinutes: 5,
    defaultLanguage: 'go',
    allowedLanguages: ['go'],
    starterCode: `package main

import "fmt"

func main() {
	// Write your code here
	_ = fmt.Println
}`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Example',
        expectedOutput: 'Hello, World!',
      },
    ],
  },

  {
    slug: 'go-add-two-numbers',
    title: 'Add Two Numbers',
    technologySlug: 'go',
    difficulty: 'Easy',
    workspaceType: 'code',
    shortDescription: 'Read two integers and print their sum.',
    problemStatement:
      'Write a Go program that reads two integers and prints their sum.',
    inputFormat: 'Two integers separated by a space.',
    outputFormat: 'Print the sum of the two integers.',
    skills: ['fmt.Scan', 'Variables', 'Arithmetic'],
    estimatedMinutes: 10,
    defaultLanguage: 'go',
    allowedLanguages: ['go'],
    starterCode: `package main

import "fmt"

func main() {
	var a, b int
	fmt.Scan(&a, &b)

	// Print the sum
}`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Example',
        input: '5 3',
        expectedOutput: '8',
      },
    ],
  },

  {
    slug: 'go-even-odd',
    title: 'Even or Odd',
    technologySlug: 'go',
    difficulty: 'Easy',
    workspaceType: 'code',
    shortDescription: 'Check whether a number is even or odd.',
    problemStatement:
      'Write a Go program that reads an integer and prints Even if the number is even or Odd if the number is odd.',
    inputFormat: 'A single integer.',
    outputFormat: 'Print Even or Odd.',
    skills: ['if / else', 'Modulo Operator'],
    estimatedMinutes: 10,
    defaultLanguage: 'go',
    allowedLanguages: ['go'],
    starterCode: `package main

import "fmt"

func main() {
	var n int
	fmt.Scan(&n)

	// Write your condition
}`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Example',
        input: '8',
        expectedOutput: 'Even',
      },
    ],
  },

  {
    slug: 'go-largest-three',
    title: 'Largest of Three Numbers',
    technologySlug: 'go',
    difficulty: 'Easy',
    workspaceType: 'code',
    shortDescription: 'Find the largest of three integers.',
    problemStatement:
      'Write a Go program that reads three integers and prints the largest value.',
    inputFormat: 'Three integers separated by spaces.',
    outputFormat: 'Print the largest integer.',
    skills: ['Comparison', 'if / else'],
    estimatedMinutes: 10,
    defaultLanguage: 'go',
    allowedLanguages: ['go'],
    starterCode: `package main

import "fmt"

func main() {
	var a, b, c int
	fmt.Scan(&a, &b, &c)

	// Find the largest
}`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Example',
        input: '10 25 15',
        expectedOutput: '25',
      },
    ],
  },

  {
    slug: 'go-sum-first-n',
    title: 'Sum of First N Numbers',
    technologySlug: 'go',
    difficulty: 'Easy',
    workspaceType: 'code',
    shortDescription: 'Add all integers from 1 to N.',
    problemStatement:
      'Write a Go program that reads a positive integer N and prints the sum of all integers from 1 to N.',
    inputFormat: 'A positive integer N (1 ≤ N ≤ 100000).',
    outputFormat: 'Print the sum from 1 to N.',
    skills: ['for Loop', 'Accumulation'],
    estimatedMinutes: 10,
    defaultLanguage: 'go',
    allowedLanguages: ['go'],
    starterCode: `package main

import "fmt"

func main() {
	var n int
	fmt.Scan(&n)

	// Calculate the sum
}`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Example',
        input: '5',
        expectedOutput: '15',
      },
    ],
  },

  {
    slug: 'go-factorial',
    title: 'Factorial',
    technologySlug: 'go',
    difficulty: 'Easy',
    workspaceType: 'code',
    shortDescription: 'Calculate N factorial.',
    problemStatement:
      'Write a Go program that reads a non-negative integer N and prints N factorial.',
    inputFormat: 'A non-negative integer N (0 ≤ N ≤ 20).',
    outputFormat: 'Print N factorial.',
    skills: ['for Loop', 'int64'],
    estimatedMinutes: 10,
    defaultLanguage: 'go',
    allowedLanguages: ['go'],
    starterCode: `package main

import "fmt"

func main() {
	var n int
	fmt.Scan(&n)

	// Calculate the factorial
}`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Example',
        input: '5',
        expectedOutput: '120',
      },
    ],
  },

  {
    slug: 'go-array-sum',
    title: 'Array Sum',
    technologySlug: 'go',
    difficulty: 'Medium',
    workspaceType: 'code',
    shortDescription: 'Sum the elements of a slice.',
    problemStatement:
      'Read N integers into a slice and print the sum of all elements.',
    inputFormat: 'The first line contains N. The second line contains N integers separated by spaces.',
    outputFormat: 'Print the sum of the elements.',
    skills: ['Slices', 'for range'],
    estimatedMinutes: 15,
    defaultLanguage: 'go',
    allowedLanguages: ['go'],
    starterCode: `package main

import "fmt"

func main() {
	var n int
	fmt.Scan(&n)

	values := make([]int, n)

	// Read the values and print their sum
	_ = values
}`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Example',
        input: '5\n1 2 3 4 5',
        expectedOutput: '15',
      },
    ],
  },

  {
    slug: 'go-array-maximum',
    title: 'Maximum Slice Element',
    technologySlug: 'go',
    difficulty: 'Medium',
    workspaceType: 'code',
    shortDescription: 'Find the largest element in a slice.',
    problemStatement:
      'Read N integers into a slice and print the largest element.',
    inputFormat: 'The first line contains N. The second line contains N integers separated by spaces.',
    outputFormat: 'Print the largest element.',
    skills: ['Slices', 'Comparison'],
    estimatedMinutes: 15,
    defaultLanguage: 'go',
    allowedLanguages: ['go'],
    starterCode: `package main

import "fmt"

func main() {
	var n int
	fmt.Scan(&n)

	values := make([]int, n)

	// Read the values and print the maximum
	_ = values
}`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Example',
        input: '5\n4 9 2 15 7',
        expectedOutput: '15',
      },
    ],
  },

  {
    slug: 'go-string-reverse',
    title: 'Reverse a String',
    technologySlug: 'go',
    difficulty: 'Medium',
    workspaceType: 'code',
    shortDescription: 'Reverse a line of text.',
    problemStatement:
      'Read a line of text and print the characters in reverse order.',
    inputFormat: 'A single line of text.',
    outputFormat: 'Print the reversed text.',
    skills: ['Strings', 'Runes', 'bufio'],
    estimatedMinutes: 15,
    defaultLanguage: 'go',
    allowedLanguages: ['go'],
    starterCode: `package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	text, _ := reader.ReadString('\\n')
	text = strings.TrimRight(text, "\\r\\n")

	// Print the reversed text
	_ = fmt.Println
}`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Example',
        input: 'hello',
        expectedOutput: 'olleh',
      },
    ],
  },

  {
    slug: 'go-word-frequency',
    title: 'Word Frequency',
    technologySlug: 'go',
    difficulty: 'Medium',
    workspaceType: 'code',
    shortDescription: 'Count how often a word appears.',
    problemStatement:
      'Read a sentence followed by a target word. Print how many times the target word occurs in the sentence as a whole word.',
    inputFormat: 'The first line contains a sentence. The second line contains the target word.',
    outputFormat: 'Print the number of occurrences.',
    skills: ['strings.Fields', 'Loops', 'Maps'],
    estimatedMinutes: 20,
    defaultLanguage: 'go',
    allowedLanguages: ['go'],
    starterCode: `package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	sentence, _ := reader.ReadString('\\n')
	target, _ := reader.ReadString('\\n')
	sentence = strings.TrimSpace(sentence)
	target = strings.TrimSpace(target)

	// Count the occurrences of target
	_ = fmt.Println
}`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Example',
        input: 'go is simple and go is fast\ngo',
        expectedOutput: '2',
      },
    ],
  },

  {
    slug: 'go-student-struct',
    title: 'Student Struct',
    technologySlug: 'go',
    difficulty: 'Hard',
    workspaceType: 'code',
    shortDescription: 'Model a student with a struct.',
    problemStatement:
      'Define a Student struct with Name and Score fields. Read a student name and score, create a Student value, and print the details in the format: Name: <name>, Score: <score>.',
    inputFormat: 'The first line contains the student name. The second line contains the score.',
    outputFormat: 'Print: Name: <name>, Score: <score>',
    skills: ['Structs', 'Methods', 'fmt.Printf'],
    estimatedMinutes: 25,
    defaultLanguage: 'go',
    allowedLanguages: ['go'],
    starterCode: `package main

import "fmt"

type Student struct {
	// Add the Name and Score fields
}

func main() {
	var name string
	var score int
	fmt.Scan(&name, &score)

	// Create a Student and print its details
}`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Example',
        input: 'Asha\n90',
        expectedOutput: 'Name: Asha, Score: 90',
      },
    ],
  },

  {
    slug: 'go-student-records',
    title: 'Student Records',
    technologySlug: 'go',
    difficulty: 'Hard',
    workspaceType: 'code',
    shortDescription: 'Find the top-scoring student.',
    problemStatement:
      'Read N student records containing a name and a score. Store them in a slice of structs and print the name of the student with the highest score. If scores tie, print the student who appears first.',
    inputFormat: 'The first line contains N. Each of the next N lines contains a student name followed by an integer score.',
    outputFormat: 'Print the name of the student with the highest score.',
    skills: ['Slices of Structs', 'Loops', 'Comparison'],
    estimatedMinutes: 25,
    defaultLanguage: 'go',
    allowedLanguages: ['go'],
    starterCode: `package main

import "fmt"

type Student struct {
	Name  string
	Score int
}

func main() {
	var n int
	fmt.Scan(&n)

	students := make([]Student, n)

	// Read the records and print the top student
	_ = students
}`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Example',
        input: '3\nAsha 85\nRavi 92\nMeera 88',
        expectedOutput: 'Ravi',
      },
    ],
  },

];