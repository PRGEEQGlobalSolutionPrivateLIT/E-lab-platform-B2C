
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Pause,
  Pencil,
  Play,
  Plus,
  RotateCw,
  Search,
  Trash2,
} from 'lucide-react';

import { judgeApi, type LiveJudgeWorker } from '../lib/api';
import { errorText } from '../../lib/api';
import { WORKER_STATUS, ago, cx, useNow } from '../lib/shared';
import type { JudgeWorker, WorkerInput } from '../lib/types';
import { JudgeHeader } from '../ui/JudgeHeader';
import { Meter } from '../ui/Meter';
import { WorkerModal } from '../WorkerModal/WorkerModal';

import styles from '../ui/judge.module.css';

const REFRESH_INTERVAL = 10000;

export default function WorkersPage() {
  const now = useNow();

  const [workers, setWorkers] = useState<LiveJudgeWorker[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [busyWorkerId, setBusyWorkerId] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');

  const [modal, setModal] =
    useState<{ item: JudgeWorker | null } | null>(null);

  const [confirmId, setConfirmId] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const data = await judgeApi.workers();
      setWorkers(data);
      setError(null);
    } catch (err) {
      setError(errorText(err));
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    void refresh();

    const interval = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        void refresh();
      }
    }, REFRESH_INTERVAL);

    return () => window.clearInterval(interval);
  }, [refresh]);

  const runAction = useCallback(
    async (
      action: () => Promise<unknown>,
      successMessage: string,
      workerId?: string,
    ): Promise<boolean> => {
      if (busy) return false;

      setBusy(true);
      setBusyWorkerId(workerId ?? null);
      setError(null);
      setNotice(null);

      try {
        await action();
        await refresh();

        setNotice(successMessage);
        return true;
      } catch (err) {
        setError(errorText(err));
        return false;
      } finally {
        setBusy(false);
        setBusyWorkerId(null);
      }
    },
    [busy, refresh],
  );

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();

    return workers.filter((worker) => {
      if (status && worker.status !== status) return false;

      if (
        q &&
        !`${worker.name} ${worker.host} ${worker.version}`
          .toLowerCase()
          .includes(q)
      ) {
        return false;
      }

      return true;
    });
  }, [workers, query, status]);

  const stats = useMemo(() => {
    const online = workers.filter(
      (worker) => worker.status === 'online',
    );

    const active = workers.filter(
      (worker) =>
        worker.status === 'online' ||
        worker.status === 'draining',
    );

    const capacity = online.reduce(
      (sum, worker) => sum + worker.capacity,
      0,
    );

    const running = workers.reduce(
      (sum, worker) => sum + worker.running,
      0,
    );

    const cpuSamples = active
      .map((worker) => worker.cpu)
      .filter((value): value is number => value !== null);

    const avgCpu = cpuSamples.length
      ? `${Math.round(
          cpuSamples.reduce((sum, value) => sum + value, 0) /
            cpuSamples.length,
        )}%`
      : 'N/A';

    return [
      {
        label: 'Workers online',
        value: `${online.length} / ${workers.length}`,
      },
      {
        label: 'Slots in use',
        value: `${running} / ${capacity}`,
      },
      {
        label: 'Running jobs',
        value: String(running),
      },
      {
        label: 'Average CPU',
        value: avgCpu,
      },
    ];
  }, [workers]);

  const submit = async (input: WorkerInput) => {
    const editing = modal?.item;

    const success = await runAction(
      () =>
        editing
          ? judgeApi.updateWorker(editing.id, input)
          : judgeApi.addWorker(input),
      editing
        ? 'Worker updated successfully.'
        : 'Worker registered successfully.',
      editing?.id,
    );

    if (success) setModal(null);
  };

  const handleRemove = async (worker: LiveJudgeWorker) => {
    if (worker.running > 0) {
      setError(
        'This worker is running jobs. Drain it and wait for the jobs to finish before deleting.',
      );
      return;
    }

    const success = await runAction(
      () => judgeApi.removeWorker(worker.id),
      `Worker "${worker.name}" removed successfully.`,
      worker.id,
    );

    if (success) setConfirmId(null);
  };

  const handleDrain = async (worker: LiveJudgeWorker) => {
    await runAction(
      () => judgeApi.toggleDrain(worker.id),
      worker.status === 'draining'
        ? `Worker "${worker.name}" returned to service.`
        : `Worker "${worker.name}" is draining.`,
      worker.id,
    );
  };

  const handleReconnect = async (worker: LiveJudgeWorker) => {
    if (busy) return;

    setBusy(true);
    setBusyWorkerId(worker.id);
    setError(null);
    setNotice(null);

    try {
      const result = await judgeApi.reconnectWorker(worker.id);
      await refresh();

      if (result.reachable) {
        setNotice(`Worker "${worker.name}" is reachable.`);
      } else {
        setError(
          `Worker "${worker.name}" could not be reached. Check the worker service and its URL.`,
        );
      }
    } catch (err) {
      setError(errorText(err));
    } finally {
      setBusy(false);
      setBusyWorkerId(null);
    }
  };

  return (
    <div className={styles.page}>
      <JudgeHeader
        subtitle="Judge nodes that compile and run learner submissions"
        onReset={() => void refresh()}
      >
        <button
          type="button"
          className={styles.primaryButton}
          onClick={() => setModal({ item: null })}
          disabled={busy || !loaded}
        >
          <Plus width={16} height={16} aria-hidden="true" />
          Add worker
        </button>
      </JudgeHeader>

      {error && (
        <div className={styles.banner} role="alert">
          {error}
        </div>
      )}

      {notice && (
        <div className={styles.banner} role="status">
          {notice}
        </div>
      )}

      <section
        className={cx(styles.stats, styles.stats4)}
        aria-label="Summary"
      >
        {stats.map((stat) => (
          <div key={stat.label} className={styles.statCard}>
            <span className={styles.statValue}>
              {loaded ? stat.value : '—'}
            </span>
            <span className={styles.statLabel}>
              {stat.label}
            </span>
          </div>
        ))}
      </section>

      <div className={styles.card}>
        <div className={styles.toolbar} data-filters={0}>
          <div className={styles.searchField}>
            <Search
              className={styles.searchIcon}
              width={16}
              height={16}
              aria-hidden="true"
            />

            <input
              className={styles.input}
              placeholder="Search by name, host or version"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search workers"
            />
          </div>

          <select
            className={styles.select}
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            aria-label="Filter by status"
          >
            <option value="">All statuses</option>

            {Object.entries(WORKER_STATUS).map(([value, item]) => (
              <option key={value} value={value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {loaded && rows.length > 0 && (
          <p className={styles.count}>
            {`${rows.length} worker${rows.length === 1 ? '' : 's'}`}
          </p>
        )}

        {!loaded ? (
          <div className={styles.empty}>Loading workers…</div>
        ) : rows.length === 0 ? (
          <div className={styles.empty}>
            {workers.length === 0
              ? 'No workers registered. Add a worker to start judging.'
              : 'No workers match the current filters.'}
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Worker</th>
                  <th>Status</th>
                  <th>Load</th>
                  <th>CPU</th>
                  <th>Memory</th>
                  <th>Heartbeat</th>
                  <th className={styles.actionsHead}>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {rows.map((worker) => {
                  const meta = WORKER_STATUS[worker.status];

                  const down =
                    worker.status === 'offline' ||
                    worker.status === 'restarting';

                  const draining =
                    worker.status === 'draining';

                  const workerBusy =
                    busy &&
                    (busyWorkerId === worker.id ||
                      busyWorkerId === null);

                  const canDelete =
                    worker.running === 0 && !busy;

                  return (
                    <tr key={worker.id}>
                      <td>
                        <span
                          className={cx(
                            styles.primaryText,
                            styles.monoText,
                          )}
                        >
                          {worker.name}
                        </span>

                        <span className={styles.slug}>
                          {worker.host}
                          {worker.version
                            ? ` · v${worker.version}`
                            : ''}
                        </span>
                      </td>

                      <td>
                        <span
                          className={cx(
                            styles.badge,
                            styles[`tone_${meta.tone}`],
                          )}
                        >
                          {meta.label}
                        </span>

                        {worker.lastError && (
                          <span className={styles.errorLine}>
                            {worker.lastError}
                          </span>
                        )}
                      </td>

                      <td className={styles.cell}>
                        <span>
                          {`${worker.running} / ${worker.capacity}`}
                        </span>

                        <div
                          className={styles.slots}
                          aria-hidden="true"
                        >
                          {Array.from(
                            {
                              length: Math.min(
                                worker.capacity,
                                16,
                              ),
                            },
                            (_, index) => (
                              <span
                                key={index}
                                className={cx(
                                  styles.slot,
                                  index < worker.running &&
                                    styles.slotOn,
                                )}
                              />
                            ),
                          )}
                        </div>
                      </td>

                      <td>
                        {worker.cpu === null ? (
                          <span className={styles.muted}>
                            N/A
                          </span>
                        ) : (
                          <Meter
                            value={worker.cpu}
                            label={`${worker.name} CPU`}
                            off={down}
                          />
                        )}
                      </td>

                      <td>
                        {worker.memory === null ? (
                          <span className={styles.muted}>
                            N/A
                          </span>
                        ) : (
                          <Meter
                            value={worker.memory}
                            label={`${worker.name} memory`}
                            off={down}
                          />
                        )}
                      </td>

                      <td
                        className={cx(
                          styles.date,
                          worker.status === 'offline' &&
                            styles.actionDanger,
                        )}
                      >
                        {worker.heartbeatAt
                          ? `${ago(worker.heartbeatAt, now)} ago`
                          : 'Never'}
                      </td>

                      <td>
                        {confirmId === worker.id ? (
                          <div className={styles.actions}>
                            <button
                              type="button"
                              className={cx(
                                styles.actionButton,
                                styles.actionDanger,
                              )}
                              disabled={!canDelete}
                              onClick={() =>
                                void handleRemove(worker)
                              }
                            >
                              {worker.running > 0
                                ? 'Worker is busy'
                                : workerBusy
                                  ? 'Deleting…'
                                  : 'Delete'}
                            </button>

                            <button
                              type="button"
                              className={cx(
                                styles.actionButton,
                                styles.actionBack,
                              )}
                              onClick={() =>
                                setConfirmId(null)
                              }
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className={styles.actions}>
                            <button
                              type="button"
                              className={cx(
                                styles.iconButton,
                                draining
                                  ? styles.iconSuccess
                                  : styles.iconWarn,
                              )}
                              aria-label={`${
                                draining ? 'Resume' : 'Drain'
                              } ${worker.name}`}
                              title={
                                draining
                                  ? 'Resume accepting jobs'
                                  : 'Drain worker after current jobs finish'
                              }
                              disabled={
                                busy ||
                                worker.status === 'offline' ||
                                worker.status === 'restarting'
                              }
                              onClick={() =>
                                void handleDrain(worker)
                              }
                            >
                              {draining ? (
                                <Play
                                  width={15}
                                  height={15}
                                  aria-hidden="true"
                                />
                              ) : (
                                <Pause
                                  width={15}
                                  height={15}
                                  aria-hidden="true"
                                />
                              )}
                            </button>

                            <button
                              type="button"
                              className={cx(
                                styles.iconButton,
                                styles.iconPrimary,
                              )}
                              aria-label={`Reconnect ${worker.name}`}
                              title="Reconnect and check worker health"
                              disabled={
                                busy ||
                                worker.status === 'restarting'
                              }
                              onClick={() =>
                                void handleReconnect(worker)
                              }
                            >
                              <RotateCw
                                className={
                                  workerBusy
                                    ? styles.spin
                                    : undefined
                                }
                                width={15}
                                height={15}
                                aria-hidden="true"
                              />
                            </button>

                            <button
                              type="button"
                              className={styles.iconButton}
                              aria-label={`Edit ${worker.name}`}
                              title="Edit worker"
                              disabled={busy}
                              onClick={() =>
                                setModal({
                                  item: worker as JudgeWorker,
                                })
                              }
                            >
                              <Pencil
                                width={15}
                                height={15}
                                aria-hidden="true"
                              />
                            </button>

                            <button
                              type="button"
                              className={cx(
                                styles.iconButton,
                                styles.iconDanger,
                              )}
                              aria-label={`Delete ${worker.name}`}
                              title={
                                worker.running > 0
                                  ? 'Drain this worker and wait for running jobs before deleting'
                                  : 'Delete worker'
                              }
                              disabled={busy}
                              onClick={() =>
                                setConfirmId(worker.id)
                              }
                            >
                              <Trash2
                                width={15}
                                height={15}
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal && (
        <WorkerModal
          key={modal.item?.id ?? 'new'}
          initial={modal.item}
          workers={workers as JudgeWorker[]}
          onCancel={() => {
            if (!busy) setModal(null);
          }}
          onSubmit={(input) => {
            void submit(input);
          }}
        />
      )}
    </div>
  );
}
