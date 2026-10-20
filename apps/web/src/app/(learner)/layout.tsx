'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from '@/features/auth/useSession';

const LEARNER_ONLY = ['learner'] as const;

function SignedIn({ children }: { children: ReactNode }) {
  const session = useSession();
  return session ? <>{children}</> : null;
}

function LearnerOnly({ children }: { children: ReactNode }) {
  const session = useSession(LEARNER_ONLY);
  return session ? <>{children}</> : null;
}

export default function LearnerLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return pathname === '/dashboard' ? <SignedIn>{children}</SignedIn> : <LearnerOnly>{children}</LearnerOnly>;
}