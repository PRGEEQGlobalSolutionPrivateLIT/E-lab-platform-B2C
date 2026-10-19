import type {
  PracticeProblem,
} from './types';

/* =========================================================
   DOCKER PRACTICE PROBLEMS

   Domain:
   cloud-devops

   Stack:
   docker

   Technology:
   docker

   Workspace:
   devops
========================================================= */

export const dockerProblems: PracticeProblem[] = [
  /* =====================================================
     PROBLEM 1
     CHECK DOCKER VERSION
  ===================================================== */

  {
    slug: 'docker-check-version',

    title: 'Check Docker Version',

    technologySlug: 'docker',

    difficulty: 'Easy',

    workspaceType: 'devops',

    shortDescription:
      'Practice using the Docker command-line interface in a DevOps terminal workspace.',

    problemStatement: `Use the Docker CLI to display the installed Docker version.

Run the Docker version command inside the provided DevOps terminal workspace.

The Docker CLI must execute successfully.`,

    inputFormat: `No console input is required.

Use the DevOps terminal to complete the task.`,

    outputFormat:
      'Display the installed Docker version.',

    constraints: [
      'Use Docker command-line commands.',
      'Use the provided DevOps terminal workspace.',
      'Run the Docker version command.',
      'Do not modify the Docker environment.',
    ],

    skills: [
      'Docker',
      'Docker CLI',
      'Containers',
      'docker --version',
    ],

    estimatedMinutes: 10,
  },
];

/* =========================================================
   GET DOCKER PROBLEM BY SLUG
========================================================= */

export function getDockerProblemBySlug(
  slug: string,
): PracticeProblem | undefined {
  const normalizedSlug = String(
    slug ?? '',
  )
    .trim()
    .toLowerCase();

  return dockerProblems.find(
    (problem) =>
      problem.slug ===
      normalizedSlug,
  );
}

/* =========================================================
   DEFAULT EXPORT
========================================================= */

export default dockerProblems;