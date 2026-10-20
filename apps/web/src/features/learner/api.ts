'use client';

import { useCallback, useEffect, useState } from 'react';
import { apiFetch } from '@/features/auth/apiFetch';
import { setCatalog, setStacks, upsertProblem } from '@/features/catalog/store';
import type {
  PowerBIProblemConfig,
  PracticeProblem,
  ProblemDifficulty,
  ProblemLanguage,
  StarterFile,
  WorkspaceType,
} from '@/features/problem-engine';
import type { TechnologyPracticePath } from '@/features/practice-path-engine';
import { markProblemSolved } from '@/features/progress/local-progress';
import type { StackDefinition, StackDomain, StackRoadmap } from '@/features/stack-engine';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1';

export interface LearnerInstitution {
  id: string;
  name: string;
}

export interface LearnerProblemSummary {
  id: string;
  slug: string;
  title: string;
  technologySlug: string;
  technologyName: string;
  difficulty: ProblemDifficulty;
  workspaceType: WorkspaceType;
  shortDescription: string;
  skills: string[];
  estimatedMinutes: number;
  defaultLanguage: ProblemLanguage;
  allowedLanguages?: ProblemLanguage[];
  source: 'platform' | 'institution';
  institutionName: string | null;
}

export interface LearnerProblemDetail extends LearnerProblemSummary {
  problemStatement: string;
  inputFormat?: string;
  outputFormat?: string;
  constraints: string[];
  notes: string[];
  allowedLanguages: ProblemLanguage[];
  starterCode?: string;
  starterFiles?: StarterFile[];
  powerBi?: PowerBIProblemConfig;
  sampleTests: { id: string; title: string; description?: string; input?: string; expectedOutput?: string }[];
}

export interface LearnerBatchProblem {
  slug: string;
  title: string;
  difficulty: ProblemDifficulty;
  shortDescription: string;
  skills: string[];
  estimatedMinutes: number;
  technologySlug: string;
  technologyName: string;
  solved: boolean;
}

export interface LearnerBatch {
  id: string;
  name: string;
  description: string;
  type: 'regular_practice' | 'stack_section' | 'real_time_challenge';
  focus: string;
  assignedAt: string;
  problems: LearnerBatchProblem[];
  total: number;
  solvedCount: number;
}

interface CatalogResponse {
  institution: LearnerInstitution | null;
  problems: LearnerProblemSummary[];
  practicePaths: TechnologyPracticePath[];
}

interface StacksResponse {
  domains: StackDomain[];
  stacks: StackDefinition[];
  roadmaps: StackRoadmap[];
  mappings: Record<string, string[]>;
}

async function learnerGet<T>(path: string): Promise<T> {
  const response = await apiFetch(`${API_BASE}${path}`);
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return (await response.json()) as T;
}

export function toPracticeProblem(problem: LearnerProblemSummary | LearnerBatchProblem | LearnerProblemDetail): PracticeProblem {
  const detail = 'problemStatement' in problem ? problem : null;
  const language = 'defaultLanguage' in problem ? problem.defaultLanguage : (problem.technologySlug as ProblemLanguage);
  const allowed = 'allowedLanguages' in problem && problem.allowedLanguages?.length ? problem.allowedLanguages : [language];
  return {
    slug: problem.slug,
    title: problem.title,
    technologySlug: problem.technologySlug,
    difficulty: problem.difficulty,
    workspaceType: 'workspaceType' in problem ? problem.workspaceType : 'code',
    shortDescription: problem.shortDescription,
    problemStatement: detail?.problemStatement ?? '',
    inputFormat: detail?.inputFormat,
    outputFormat: detail?.outputFormat,
    constraints: detail?.constraints,
    notes: detail?.notes,
    skills: problem.skills,
    estimatedMinutes: problem.estimatedMinutes,
    defaultLanguage: language,
    allowedLanguages: allowed,
    starterCode: detail?.starterCode,
    starterFiles: detail?.starterFiles,
    sampleTests: detail?.sampleTests,
    powerBi: detail?.powerBi,
  };
}

let catalogRequest: Promise<LearnerInstitution | null> | null = null;
let stacksRequest: Promise<void> | null = null;

export function loadCatalog(): Promise<LearnerInstitution | null> {
  if (!catalogRequest) {
    catalogRequest = learnerGet<CatalogResponse>('/learner/catalog')
      .then((data) => {
        setCatalog(data.problems.map(toPracticeProblem), data.practicePaths);
        return data.institution;
      })
      .catch((error) => {
        catalogRequest = null;
        throw error;
      });
  }
  return catalogRequest;
}

export function loadStacks(): Promise<void> {
  if (!stacksRequest) {
    stacksRequest = learnerGet<StacksResponse>('/learner/stacks')
      .then((data) => setStacks(data.domains, data.stacks, data.roadmaps, data.mappings))
      .catch((error) => {
        stacksRequest = null;
        throw error;
      });
  }
  return stacksRequest;
}

export function useLearnerCatalog(_technologySlug: string) {
  return { institution: null as LearnerInstitution | null, items: [] as LearnerProblemSummary[] };
}

export function useRemoteProblem(slug: string | null) {
  const [problem, setProblem] = useState<PracticeProblem | null>(null);
  const [loading, setLoading] = useState(Boolean(slug));

  useEffect(() => {
    if (!slug) return;
    let alive = true;
    setLoading(true);
    learnerGet<LearnerProblemDetail>(`/learner/problems/${encodeURIComponent(slug)}`)
      .then((data) => {
        const full = toPracticeProblem(data);
        upsertProblem(full);
        if (alive) setProblem(full);
      })
      .catch(() => {
        if (alive) setProblem(null);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [slug]);

  return { problem, loading };
}

export function useLearnerBatches() {
  const [state, setState] = useState<{ loaded: boolean; error: string; institution: LearnerInstitution | null; items: LearnerBatch[] }>({ loaded: false, error: '', institution: null, items: [] });

  const refresh = useCallback(async () => {
    try {
      const data = await learnerGet<{ institution: LearnerInstitution | null; items: LearnerBatch[] }>('/learner/batches');
      setState({ loaded: true, error: '', institution: data.institution, items: data.items });
    } catch (error) {
      setState((current) => ({ ...current, loaded: true, error: error instanceof Error ? error.message : 'Could not load assignments.' }));
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { ...state, refresh };
}

export async function syncServerProgress(): Promise<boolean> {
  try {
    const data = await learnerGet<{ solved: string[] }>('/learner/progress');
    data.solved.forEach((slug) => markProblemSolved(slug));
    return data.solved.length > 0;
  } catch {
    return false;
  }
}
