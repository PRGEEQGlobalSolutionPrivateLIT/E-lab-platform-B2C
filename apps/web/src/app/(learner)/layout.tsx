'use client';

import { useEffect, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { CatalogGate } from '@/components/catalog/CatalogGate';
import { LearnerShell } from '@/components/learner/LearnerShell';
import { useSession } from '@/features/auth/useSession';
import { loadCatalog } from '@/features/learner/api';

const LEARNER_ONLY = ['learner'] as const;

function SignedIn({ children }: { children: ReactNode }) {
  const session = useSession();
  useEffect(() => {
    if (session?.role === 'learner') void loadCatalog().catch(() => undefined);
  }, [session?.role]);
  if (!session) return null;
  if (session.role !== 'learner') return <>{children}</>;
  return <LearnerShell email={session.email}>{children}</LearnerShell>;
}

function LearnerOnly({ fullScreen, children }: { fullScreen: boolean; children: ReactNode }) {
  const session = useSession(LEARNER_ONLY);
  if (!session) return null;
  const gated = (
    <CatalogGate load={loadCatalog} label="practice catalog">
      {children}
    </CatalogGate>
  );
  return fullScreen ? gated : <LearnerShell email={session.email}>{gated}</LearnerShell>;
}

export default function LearnerLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === '/dashboard') return <SignedIn>{children}</SignedIn>;
  return <LearnerOnly fullScreen={pathname.startsWith('/workspace/')}>{children}</LearnerOnly>;
}
