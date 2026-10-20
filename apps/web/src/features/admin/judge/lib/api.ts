
import { adminApi } from '../../lib/api';
import type { WorkerInput } from './types';

export interface LiveJudgeWorker {
  id: string;
  name: string;
  host: string;
  capacity: number;
  running: number;
  utilization: number;
  cpu: number | null;
  memory: number | null;
  version: string;
  status: 'online' | 'offline' | 'draining' | 'restarting';
  heartbeatAt: string;
  lastError: string | null;
  jobsLastHour: number;
  avgDurationMs: number;
}

export interface WorkerHealthResult {
  worker: LiveJudgeWorker | null;
  reachable: boolean;
  languages?: string[];
}

export const judgeApi = {
  workers: () =>
    adminApi<LiveJudgeWorker[]>('/admin/judge/workers'),

  addWorker: (input: WorkerInput) =>
    adminApi<WorkerHealthResult>('/admin/judge/workers', {
      method: 'POST',
      body: input,
    }),

  updateWorker: (id: string, input: WorkerInput) =>
    adminApi<LiveJudgeWorker>(
      `/admin/judge/workers/${encodeURIComponent(id)}`,
      { method: 'PATCH', body: input },
    ),

  removeWorker: (id: string) =>
    adminApi<{ deleted: boolean }>(
      `/admin/judge/workers/${encodeURIComponent(id)}`,
      { method: 'DELETE' },
    ),

  toggleDrain: (id: string) =>
    adminApi<LiveJudgeWorker>(
      `/admin/judge/workers/${encodeURIComponent(id)}/drain`,
      { method: 'POST' },
    ),

  reconnectWorker: (id: string) =>
    adminApi<WorkerHealthResult>(
      `/admin/judge/workers/${encodeURIComponent(id)}/restart`,
      { method: 'POST' },
    ),

  checkWorker: (id: string) =>
    adminApi<WorkerHealthResult>(
      `/admin/judge/workers/${encodeURIComponent(id)}/check`,
      { method: 'POST' },
    ),
};
