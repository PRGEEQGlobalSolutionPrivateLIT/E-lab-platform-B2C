/* =========================================================
   AI & MACHINE LEARNING - HIDDEN TEST CASES
   Matches ai-ml-problems.ts exactly (all 10 problems).
   Python stdin/stdout judge; deterministic expected outputs.
   Use only inside the NestJS submission service.
   Keep hidden tests server-side (never send to learner UI).
========================================================= */

export type AiMlTestCase = {
  input: string;
  expectedOutput: string;
};

const aiMlTestCases: Record<string, AiMlTestCase[]> = {
  /* ai-ml-calculate-mean - 13 hidden tests */
  "ai-ml-calculate-mean": [
    { input: "4\n2 4 6 8\n", expectedOutput: "5.00" },
    { input: "3\n-8 -4 0\n", expectedOutput: "-4.00" },
    { input: "1\n5\n", expectedOutput: "5.00" },
    { input: "1\n0\n", expectedOutput: "0.00" },
    { input: "2\n-1 0\n", expectedOutput: "-0.50" },
    { input: "3\n1 2 2\n", expectedOutput: "1.67" },
    { input: "2\n1000000 -1000000\n", expectedOutput: "0.00" },
    { input: "5\n1 -2 3 -4 5\n", expectedOutput: "0.60" },
    { input: "2\n-9 -1\n", expectedOutput: "-5.00" },
    { input: "100\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100\n", expectedOutput: "50.50" },
    { input: "3\n0 0 0\n", expectedOutput: "0.00" },
    { input: "4\n-1 -2 -3 -4\n", expectedOutput: "-2.50" },
    { input: "3\n-11 1 1\n", expectedOutput: "-3.00" },
  ],

  /* ai-ml-normalize-features - 13 hidden tests */
  "ai-ml-normalize-features": [
    { input: "3\n10 20 30\n", expectedOutput: "0 500 1000" },
    { input: "4\n7 7 7 7\n", expectedOutput: "0 0 0 0" },
    { input: "1\n0\n", expectedOutput: "0" },
    { input: "3\n-10 0 10\n", expectedOutput: "0 500 1000" },
    { input: "3\n2 3 5\n", expectedOutput: "0 333 1000" },
    { input: "4\n0 1 2 3\n", expectedOutput: "0 333 666 1000" },
    { input: "3\n-1000000000 0 1000000000\n", expectedOutput: "0 500 1000" },
    { input: "3\n-3 -2 -1\n", expectedOutput: "0 500 1000" },
    { input: "3\n10 10 20\n", expectedOutput: "0 0 1000" },
    { input: "3\n3 2 1\n", expectedOutput: "1000 500 0" },
    { input: "4\n0 0 0 1\n", expectedOutput: "0 0 0 1000" },
    { input: "4\n5 -5 5 -5\n", expectedOutput: "1000 0 1000 0" },
    { input: "6\n1 1 1 2 3 4\n", expectedOutput: "0 0 0 333 666 1000" },
  ],

  /* ai-ml-encode-labels - 12 hidden tests */
  "ai-ml-encode-labels": [
    { input: "5\ncat\ndog\ncat\nbird\ndog\n", expectedOutput: "1 2 1 0 2" },
    { input: "3\nz\nA\na\n", expectedOutput: "2 0 1" },
    { input: "1\nalone\n", expectedOutput: "0" },
    { input: "3\nred\nred\nred\n", expectedOutput: "0 0 0" },
    { input: "4\nA\na\nAA\naA\n", expectedOutput: "0 2 1 3" },
    { input: "3\nhello world\nhello\nhello world\n", expectedOutput: "1 0 1" },
    { input: "3\n a\na \na\n", expectedOutput: "0 2 1" },
    { input: "5\nx\ny\nz\ny\nx\n", expectedOutput: "0 1 2 1 0" },
    { input: "3\n99\n10\n2\n", expectedOutput: "2 0 1" },
    { input: "3\napple\nApple\nAPPLE\n", expectedOutput: "2 1 0" },
    { input: "3\né\nz\né\n", expectedOutput: "1 0 1" },
    { input: "7\na\nb\na\nc\nd\nb\nd\n", expectedOutput: "0 1 0 2 3 1 3" },
  ],

  /* ai-ml-handle-missing-values - 13 hidden tests */
  "ai-ml-handle-missing-values": [
    { input: "5\n2 NA 4 NA 9\n", expectedOutput: "2 5 4 5 9" },
    { input: "3\nNA NA NA\n", expectedOutput: "0 0 0" },
    { input: "3\n0 NA 0\n", expectedOutput: "0 0 0" },
    { input: "3\nNA -5 -6\n", expectedOutput: "-5 -5 -6" },
    { input: "3\n-1 NA 0\n", expectedOutput: "-1 0 0" },
    { input: "3\n1 2 3\n", expectedOutput: "1 2 3" },
    { input: "2\nNA 5\n", expectedOutput: "5 5" },
    { input: "4\nNA -1 -2 NA\n", expectedOutput: "-1 -1 -2 -1" },
    { input: "3\n1000000 NA -1000000\n", expectedOutput: "1000000 0 -1000000" },
    { input: "1\nNA\n", expectedOutput: "0" },
    { input: "3\n-7 -2 NA\n", expectedOutput: "-7 -2 -4" },
    { input: "4\n2 NA -3 NA\n", expectedOutput: "2 0 -3 0" },
    { input: "4\n11 22 33 NA\n", expectedOutput: "11 22 33 22" },
  ],

  /* ai-ml-split-dataset - 12 hidden tests */
  "ai-ml-split-dataset": [
    { input: "5 3\n10 20 30 40 50\n", expectedOutput: "TRAIN: 10 20 30\nTEST: 40 50" },
    { input: "3 0\n2 3 4\n", expectedOutput: "TRAIN:\nTEST: 2 3 4" },
    { input: "3 3\n9 8 7\n", expectedOutput: "TRAIN: 9 8 7\nTEST:" },
    { input: "0 0\n\n", expectedOutput: "TRAIN:\nTEST:" },
    { input: "1 0\n1\n", expectedOutput: "TRAIN:\nTEST: 1" },
    { input: "1 1\n1\n", expectedOutput: "TRAIN: 1\nTEST:" },
    { input: "4 2\n5 5 5 5\n", expectedOutput: "TRAIN: 5 5\nTEST: 5 5" },
    { input: "4 1\n-1 0 1 2\n", expectedOutput: "TRAIN: -1\nTEST: 0 1 2" },
    { input: "6 4\n100 -20 300 4 5 6\n", expectedOutput: "TRAIN: 100 -20 300 4\nTEST: 5 6" },
    { input: "2 1\n7 8\n", expectedOutput: "TRAIN: 7\nTEST: 8" },
    { input: "5 4\n1 2 3 4 5\n", expectedOutput: "TRAIN: 1 2 3 4\nTEST: 5" },
    { input: "3 2\n0 0 0\n", expectedOutput: "TRAIN: 0 0\nTEST: 0" },
  ],

  /* ai-ml-calculate-euclidean-distance - 12 hidden tests */
  "ai-ml-calculate-euclidean-distance": [
    { input: "2\n1 2\n4 6\n", expectedOutput: "25" },
    { input: "3\n-2 5 8\n-2 5 8\n", expectedOutput: "0" },
    { input: "1\n0\n100\n", expectedOutput: "10000" },
    { input: "1\n-10\n10\n", expectedOutput: "400" },
    { input: "3\n1 1 1\n0 0 0\n", expectedOutput: "3" },
    { input: "1\n1000000\n-1000000\n", expectedOutput: "4000000000000" },
    { input: "3\n0 0 0\n3 4 12\n", expectedOutput: "169" },
    { input: "2\n-3 8\n7 -2\n", expectedOutput: "200" },
    { input: "4\n1 2 3 4\n4 3 2 1\n", expectedOutput: "20" },
    { input: "3\n-1 -2 -3\n1 2 3\n", expectedOutput: "56" },
    { input: "1\n99\n99\n", expectedOutput: "0" },
    { input: "3\n1 100 1000\n2 200 2000\n", expectedOutput: "1010001" },
  ],

  /* ai-ml-knn-classification - 12 hidden tests */
  "ai-ml-knn-classification": [
    { input: "4 3 5\n1 red\n4 blue\n6 blue\n10 red\n", expectedOutput: "blue" },
    { input: "2 2 0\n-1 zebra\n1 alpha\n", expectedOutput: "alpha" },
    { input: "1 1 0\n12 single\n", expectedOutput: "single" },
    { input: "3 2 5\n4 A\n6 B\n15 B\n", expectedOutput: "A" },
    { input: "4 3 0\n1 x\n1 y\n1 y\n2 z\n", expectedOutput: "y" },
    { input: "2 1 -5\n-10 neg\n0 zero\n", expectedOutput: "neg" },
    { input: "4 4 0\n0 Z\n0 a\n0 a\n0 Z\n", expectedOutput: "Z" },
    { input: "3 2 9\n8 b\n10 a\n9 b\n", expectedOutput: "b" },
    { input: "4 3 100\n1 A\n50 B\n70 C\n80 B\n", expectedOutput: "B" },
    { input: "4 3 0\n-2 cat\n-1 dog\n1 cat\n2 dog\n", expectedOutput: "cat" },
    { input: "3 2 0\n0 red\n0 red\n0 blue\n", expectedOutput: "red" },
    { input: "2 2 0\n0 b\n0 a\n", expectedOutput: "a" },
  ],

  /* ai-ml-linear-regression-prediction - 12 hidden tests */
  "ai-ml-linear-regression-prediction": [
    { input: "2 3\n3\n0 1 5\n", expectedOutput: "3 5 13" },
    { input: "-3 2\n3\n-2 0 4\n", expectedOutput: "8 2 -10" },
    { input: "0 7\n3\n1 2 3\n", expectedOutput: "7 7 7" },
    { input: "1 0\n3\n-1 0 1\n", expectedOutput: "-1 0 1" },
    { input: "-1 -1\n1\n10\n", expectedOutput: "-11" },
    { input: "1000000000 1000000000\n2\n1000000000 -1000000000\n", expectedOutput: "1000000001000000000 -999999999000000000" },
    { input: "3 -2\n3\n2 4 8\n", expectedOutput: "4 10 22" },
    { input: "-2 -3\n3\n0 3 -3\n", expectedOutput: "-3 -9 3" },
    { input: "0 0\n2\n0 0\n", expectedOutput: "0 0" },
    { input: "50 100\n4\n10 20 30 40\n", expectedOutput: "600 1100 1600 2100" },
    { input: "-100 99\n2\n-5 5\n", expectedOutput: "599 -401" },
    { input: "7 7\n1\n7\n", expectedOutput: "56" },
  ],

  /* ai-ml-confusion-matrix - 12 hidden tests */
  "ai-ml-confusion-matrix": [
    { input: "6\n1 0 1 0 1 0\n1 0 0 1 1 0\n", expectedOutput: "2 2 1 1" },
    { input: "4\n1 1 0 0\n1 1 0 0\n", expectedOutput: "2 2 0 0" },
    { input: "3\n0 0 0\n0 0 0\n", expectedOutput: "0 3 0 0" },
    { input: "3\n1 1 1\n1 1 1\n", expectedOutput: "3 0 0 0" },
    { input: "2\n0 0\n1 1\n", expectedOutput: "0 0 2 0" },
    { input: "2\n1 1\n0 0\n", expectedOutput: "0 0 0 2" },
    { input: "2\n1 0\n0 1\n", expectedOutput: "0 0 1 1" },
    { input: "1\n1\n1\n", expectedOutput: "1 0 0 0" },
    { input: "1\n0\n0\n", expectedOutput: "0 1 0 0" },
    { input: "5\n1 1 0 0 1\n0 1 1 0 1\n", expectedOutput: "2 1 1 1" },
    { input: "6\n0 1 0 1 0 1\n1 1 1 1 1 1\n", expectedOutput: "3 0 3 0" },
    { input: "4\n0 1 1 0\n0 1 1 0\n", expectedOutput: "2 2 0 0" },
  ],

  /* ai-ml-calculate-accuracy-precision-recall - 14 hidden tests */
  "ai-ml-calculate-accuracy-precision-recall": [
    { input: "2 2 1 1\n", expectedOutput: "66 66 66" },
    { input: "0 0 0 0\n", expectedOutput: "0 0 0" },
    { input: "1 0 0 0\n", expectedOutput: "100 100 100" },
    { input: "0 1 0 0\n", expectedOutput: "100 0 0" },
    { input: "0 0 1 0\n", expectedOutput: "0 0 0" },
    { input: "0 0 0 1\n", expectedOutput: "0 0 0" },
    { input: "100 100 0 0\n", expectedOutput: "100 100 100" },
    { input: "1 2 3 4\n", expectedOutput: "30 25 20" },
    { input: "0 99 0 1\n", expectedOutput: "99 0 0" },
    { input: "1000000000 1000000000 1000000000 1000000000\n", expectedOutput: "50 50 50" },
    { input: "2 0 1 0\n", expectedOutput: "66 66 100" },
    { input: "1 1 0 2\n", expectedOutput: "50 100 33" },
    { input: "5 0 0 5\n", expectedOutput: "50 100 50" },
    { input: "0 5 5 0\n", expectedOutput: "50 0 0" },
  ],

};

/** Returns server-side hidden test cases for an AI & ML problem. */
export function getAiMlTestCases(problemSlug: string): AiMlTestCase[] {
  return aiMlTestCases[problemSlug] ?? [];
}
