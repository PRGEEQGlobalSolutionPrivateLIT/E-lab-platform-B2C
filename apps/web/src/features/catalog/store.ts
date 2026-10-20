import type { PracticeProblem } from '@/features/problem-engine/types';
import type { TechnologyPracticePath } from '@/features/practice-path-engine/types';
import type { StackDefinition, StackDomain, StackRoadmap } from '@/features/stack-engine/types';

export const catalogProblems: PracticeProblem[] = [];
export const catalogPaths: TechnologyPracticePath[] = [];
export const catalogDomains: StackDomain[] = [];
export const catalogStacks: StackDefinition[] = [];
export const catalogRoadmaps: StackRoadmap[] = [];
export const catalogMappings: Record<string, string[]> = {};

const replace = <T>(target: T[], items: T[]) => {
  target.splice(0, target.length, ...items);
};

export function setCatalog(problems: PracticeProblem[], paths: TechnologyPracticePath[]) {
  replace(catalogProblems, problems);
  replace(catalogPaths, paths);
}

export function setStacks(domains: StackDomain[], stacks: StackDefinition[], roadmaps: StackRoadmap[], mappings: Record<string, string[]>) {
  replace(catalogDomains, domains);
  replace(catalogStacks, stacks);
  replace(catalogRoadmaps, roadmaps);
  for (const key of Object.keys(catalogMappings)) delete catalogMappings[key];
  Object.assign(catalogMappings, mappings);
}

export function upsertProblem(problem: PracticeProblem) {
  const index = catalogProblems.findIndex((item) => item.slug === problem.slug);
  if (index === -1) catalogProblems.push(problem);
  else catalogProblems[index] = { ...catalogProblems[index], ...problem };
}
