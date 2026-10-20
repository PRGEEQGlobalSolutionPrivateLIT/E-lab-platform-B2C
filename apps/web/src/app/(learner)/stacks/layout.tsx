'use client';

import type { ReactNode } from 'react';
import { CatalogGate } from '@/components/catalog/CatalogGate';
import { loadStacks } from '@/features/learner/api';

export default function StacksLayout({ children }: { children: ReactNode }) {
  return (
    <CatalogGate load={loadStacks} label="stacks">
      {children}
    </CatalogGate>
  );
}
