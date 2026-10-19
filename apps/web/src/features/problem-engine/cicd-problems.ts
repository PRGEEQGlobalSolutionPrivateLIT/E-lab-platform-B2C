import type {
  PracticeProblem,
} from './types';

/* =========================================================
   CI/CD PRACTICE PROBLEMS

   Domain:
   cloud-devops

   Stack:
   ci-cd

   Technology:
   ci-cd

   Workspace:
   devops
========================================================= */

export const cicdProblems: PracticeProblem[] = [
  /* =====================================================
     PROBLEM 1
     CREATE A CI WORKFLOW
  ===================================================== */

  {
    slug: 'cicd-create-github-actions-workflow',

    title: 'Create a CI Workflow',

    technologySlug: 'ci-cd',

    difficulty: 'Easy',

    workspaceType: 'devops',

    shortDescription:
      'Practice creating a basic GitHub Actions CI workflow in a DevOps terminal workspace.',

    problemStatement: `Create a GitHub Actions workflow file inside the /workspace directory.

The final workflow file must be located at:

/workspace/.github/workflows/ci.yml

The workflow must contain a valid workflow name and at least one job.

Use Linux terminal commands to create the required directories and workflow file.`,

    inputFormat: `No console input is required.

Use the DevOps terminal to complete the task.`,

    outputFormat:
      'The workflow file /workspace/.github/workflows/ci.yml must exist and contain a workflow definition.',

    constraints: [
      'Use the provided DevOps terminal workspace.',
      'Create the .github/workflows directories inside /workspace.',
      'Create the workflow file as /workspace/.github/workflows/ci.yml.',
      'The workflow must contain a workflow name.',
      'The workflow must contain at least one job.',
      'Do not create the workflow outside /workspace.',
    ],

    skills: [
      'CI/CD',
      'GitHub Actions',
      'Continuous Integration',
      'Workflow',
      'YAML',
    ],

    estimatedMinutes: 15,
  },
];

/* =========================================================
   GET CI/CD PROBLEM BY SLUG
========================================================= */

export function getCicdProblemBySlug(
  slug: string,
): PracticeProblem | undefined {
  const normalizedSlug = String(
    slug ?? '',
  )
    .trim()
    .toLowerCase();

  return cicdProblems.find(
    (problem) =>
      problem.slug ===
      normalizedSlug,
  );
}

/* =========================================================
   DEFAULT EXPORT
========================================================= */

export default cicdProblems;