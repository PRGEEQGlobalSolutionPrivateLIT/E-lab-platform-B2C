export type Difficulty = 'easy' | 'medium' | 'hard';
export type Visibility = 'sample' | 'hidden';
export type CheckStatus = 'pass' | 'fail';

export type TestKind = 'io' | 'framework';

export type FrameworkRuntime = 'express' | 'fastapi' | 'springboot' | 'aspnetcore' | 'react' | 'angular' | 'vue' | 'nextjs' | 'nestjs' | 'django';

export type FrameworkSpec = Record<string, unknown>;

export interface TestCaseItem {
  id: string;
  kind: TestKind;
  spec: FrameworkSpec | null;
  input: string;
  expectedOutput: string;
  hidden: boolean;
  enabled: boolean;
  position: number;
  redacted?: boolean;
}

export interface TestCaseInput {
  input: string;
  expectedOutput: string;
  hidden: boolean;
}

export interface FrameworkTestInput {
  kind: 'framework';
  spec: FrameworkSpec;
  hidden: true;
}

export interface FrameworkTestPatch {
  spec?: FrameworkSpec;
  enabled?: boolean;
}

export interface CoverageRow {
  id: string;
  slug: string;
  title: string;
  status: string;
  technology: string;
  technologySlug: string;
  frameworkRuntime: FrameworkRuntime | null;
  difficulty: Difficulty;
  sampleTests: number;
  hiddenTests: number;
  frameworkTests: number;
}

export interface ProblemTestsInfo {
  id: string;
  slug: string;
  title: string;
  status: string;
  version: number;
  difficulty: Difficulty;
  technology: { id: string; name: string; slug: string };
  frameworkRuntime: FrameworkRuntime | null;
  hasReferenceSolution: boolean;
}

export interface CheckResult {
  testId: string;
  status: CheckStatus;
  durationMs: number;
}

export interface CheckRun {
  problemId: string;
  checkedAt: string;
  results: CheckResult[];
}