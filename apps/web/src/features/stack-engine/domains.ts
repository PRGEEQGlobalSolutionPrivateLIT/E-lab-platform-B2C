import { catalogDomains } from '@/features/catalog/store';
import type {
  StackDomain,
} from './types';

export const stackDomains: StackDomain[] = catalogDomains;

export function getDomainBySlug(
  slug: string,
) {
  return stackDomains.find(
    (domain) =>
      domain.slug === slug,
  );
}
