import { catalogStacks } from '@/features/catalog/store';
import type {
  StackDefinition,
} from './types';

export const stacks: StackDefinition[] = catalogStacks;

/* =========================================================
   HELPERS
========================================================= */

export function getStacksByDomain(
  domainSlug: string,
) {
  return stacks.filter(
    (stack) =>
      stack.domainSlug === domainSlug,
  );
}

export function getStackBySlug(
  domainSlug: string,
  stackSlug: string,
) {
  return stacks.find(
    (stack) =>
      stack.domainSlug === domainSlug &&
      stack.slug === stackSlug,
  );
}
