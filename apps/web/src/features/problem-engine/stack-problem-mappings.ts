import { catalogMappings } from '@/features/catalog/store';

import { getProblemsBySlugs } from './problems';

export function getProblemsForStackModule(stackSlug: string, moduleSlug: string) {
  return getProblemsBySlugs(catalogMappings[`${stackSlug}:${moduleSlug}`] ?? []);
}
