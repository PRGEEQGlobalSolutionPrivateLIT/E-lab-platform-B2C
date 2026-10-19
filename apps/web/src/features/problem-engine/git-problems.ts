import type {
  PracticeProblem,
} from './types';

/* =========================================================
   GIT PRACTICE PROBLEMS

   Domain:
   cloud-devops

   Stack:
   devops-engineer

   Technology:
   git

   Workspace:
   devops
========================================================= */

export const gitProblems: PracticeProblem[] = [
  /* =====================================================
     PROBLEM 1
     INITIALIZE A GIT REPOSITORY
  ===================================================== */

  {
    slug: 'git-initialize-repository',

    title: 'Initialize a Git Repository',

    technologySlug: 'git',

    difficulty: 'Easy',

    workspaceType: 'devops',

    shortDescription:
      'Practice initializing a Git repository using Git commands in a DevOps terminal workspace.',

    problemStatement: `Initialize a Git repository inside the /workspace/project directory.

The final Git repository must be located at:

/workspace/project/.git

Use Linux and Git terminal commands to complete the task.`,

    inputFormat: `No console input is required.

Use the DevOps terminal to complete the task.`,

    outputFormat:
      'The Git repository /workspace/project/.git must exist.',

    constraints: [
      'Use Git command-line commands.',
      'Use the /workspace/project directory.',
      'Initialize the Git repository inside /workspace/project.',
      'Do not initialize the repository outside /workspace/project.',
    ],

    notes: [
      'The workspace root is /workspace.',
      'The Git repository must be created inside /workspace/project.',
    ],

    skills: [
      'Git',
      'Linux',
      'Command Line',
      'Repository Initialization',
      'git init',
    ],

    estimatedMinutes: 10,

    starterCode: '',
  },
];

/* =========================================================
   GET GIT PROBLEM BY SLUG
========================================================= */

export function getGitProblemBySlug(
  slug: string,
): PracticeProblem | undefined {
  return gitProblems.find(
    (problem) =>
      problem.slug === slug,
  );
}

/* =========================================================
   DEFAULT EXPORT
========================================================= */

export default gitProblems;