import { catalogRoadmaps } from '@/features/catalog/store';
import type {

  StackRoadmap,

} from './types';

/* =========================================================

   STACK ROADMAPS

========================================================= */

export const stackRoadmaps: StackRoadmap[] = catalogRoadmaps;

/* =========================================================

   HELPERS

========================================================= */

export function getRoadmapByStackSlug(
  stackSlug: string,
): StackRoadmap | undefined {
  const normalizedStackSlug = String(stackSlug ?? '')
    .trim()
    .toLowerCase();

  return stackRoadmaps.find(
    (roadmap) =>
      String(roadmap.stackSlug ?? '')
        .trim()
        .toLowerCase() === normalizedStackSlug,
  );
}

export function getRoadmapModule(
  stackSlug: string,
  moduleSlug: string,
) {
  const roadmap = getRoadmapByStackSlug(stackSlug);

  if (!roadmap) {
    return undefined;
  }

  const normalizedModuleSlug = String(moduleSlug ?? '')
    .trim()
    .toLowerCase();

  return roadmap.modules.find(
    (module) =>
      String(module.slug ?? '')
        .trim()
        .toLowerCase() === normalizedModuleSlug,
  );
}

