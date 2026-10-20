import { catalogProblems } from '@/features/catalog/store';

import type { PracticeProblem } from './types';

export const problems: PracticeProblem[] = catalogProblems;

export function getProblemBySlug(slug: string): PracticeProblem | undefined {
  return problems.find((problem) => problem.slug === slug);
}

export function getProblemsByTechnology(technologySlug: string): PracticeProblem[] {
  return problems.filter((problem) => problem.technologySlug === technologySlug);
}

export function getProblemsBySlugs(slugs: string[]): PracticeProblem[] {
  return slugs
    .map((slug) => getProblemBySlug(slug))
    .filter((problem): problem is PracticeProblem => Boolean(problem));
}
