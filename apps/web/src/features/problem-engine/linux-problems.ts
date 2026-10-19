import type {
  PracticeProblem,
} from './types';

/* =========================================================
   LINUX PRACTICE PROBLEMS

   Domain:
   cloud-devops

   Stack:
   linux

   Technology:
   linux

   Workspace:
   devops
========================================================= */

export const linuxProblems: PracticeProblem[] = [
  /* =====================================================
     PROBLEM 1
     CREATE A DIRECTORY
  ===================================================== */

  {
    slug: 'linux-create-directory',

    title: 'Create a Directory',

    technologySlug: 'linux',

    difficulty: 'Easy',

    workspaceType: 'devops',

    shortDescription:
      'Practice creating a directory using Linux terminal commands.',

    problemStatement: `Create a directory named reports inside the /workspace directory.

The final directory must be:

/workspace/reports

Use Linux terminal commands to complete the task.`,

    inputFormat: `No console input is required.

Use the Linux terminal to complete the task.`,

    outputFormat:
      'The directory /workspace/reports must exist.',

    constraints: [
      'Use Linux terminal commands.',
      'Create a directory named reports.',
      'The directory must be created inside /workspace.',
      'Do not create the directory outside /workspace.',
    ],

    skills: [
      'Linux',
      'Command Line',
      'Filesystem',
      'Directories',
      'mkdir',
    ],

    estimatedMinutes: 10,
  },
];

/* =========================================================
   GET LINUX PROBLEM BY SLUG
========================================================= */

export function getLinuxProblemBySlug(
  slug: string,
): PracticeProblem | undefined {
  const normalizedSlug = String(
    slug ?? '',
  )
    .trim()
    .toLowerCase();

  return linuxProblems.find(
    (problem) =>
      problem.slug ===
      normalizedSlug,
  );
}

/* =========================================================
   DEFAULT EXPORT
========================================================= */

export default linuxProblems;