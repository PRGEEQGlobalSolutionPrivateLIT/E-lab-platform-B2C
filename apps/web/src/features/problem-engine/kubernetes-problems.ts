import type {
  PracticeProblem,
} from './types';

/* =========================================================
   KUBERNETES PRACTICE PROBLEMS

   Domain:
   cloud-devops

   Stack:
   kubernetes

   Technology:
   kubernetes

   Workspace:
   devops
========================================================= */

export const kubernetesProblems: PracticeProblem[] = [
  /* =====================================================
     PROBLEM 1
     CHECK KUBECTL VERSION
  ===================================================== */

  {
    slug: 'kubernetes-check-kubectl-version',

    title: 'Check Kubernetes CLI Version',

    technologySlug: 'kubernetes',

    difficulty: 'Easy',

    workspaceType: 'devops',

    shortDescription:
      'Practice using the Kubernetes command-line interface in a DevOps terminal workspace.',

    problemStatement: `Use the Kubernetes CLI to display the installed kubectl client version.

Run the kubectl version command inside the provided DevOps terminal workspace.

The kubectl CLI must execute successfully.`,

    inputFormat: `No console input is required.

Use the DevOps terminal to complete the task.`,

    outputFormat:
      'Display the installed kubectl client version.',

    constraints: [
      'Use Kubernetes command-line commands.',
      'Use the provided DevOps terminal workspace.',
      'Use kubectl to check the client version.',
      'Do not modify the Kubernetes environment.',
    ],

    skills: [
      'Kubernetes',
      'kubectl',
      'Kubernetes CLI',
      'kubectl version',
    ],

    estimatedMinutes: 10,
  },
];

/* =========================================================
   GET KUBERNETES PROBLEM BY SLUG
========================================================= */

export function getKubernetesProblemBySlug(
  slug: string,
): PracticeProblem | undefined {
  const normalizedSlug = String(
    slug ?? '',
  )
    .trim()
    .toLowerCase();

  return kubernetesProblems.find(
    (problem) =>
      problem.slug ===
      normalizedSlug,
  );
}

/* =========================================================
   DEFAULT EXPORT
========================================================= */

export default kubernetesProblems;