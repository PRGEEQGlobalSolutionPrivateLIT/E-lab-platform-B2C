'use client';

import { useEffect, useMemo, useState } from 'react';
import { Eye, EyeOff, Pencil, Plus, Power, Trash2 } from 'lucide-react';
import { recalledProblem, rememberProblem, useCoverage, useProblemTests } from './api';
import { FRAMEWORK_GUIDES, summarizeSpec } from './frameworkTemplates';
import { FrameworkTestModal } from './FrameworkTestModal';
import { capitalize, cx, DIFFICULTY_CLASS, MASK } from './shared';
import type { FrameworkSpec, TestCaseItem } from './types';
import { useTestCaseScope } from './scope';
import { TestCaseTabs } from './TestCaseTabs/TestCaseTabs';
import styles from './test-cases.module.css';

type Pending = { id: string; action: 'delete' | 'toggle' };

export function FrameworkTestsPage() {
  const scope = useTestCaseScope();
  const { problems, ready, loadError, refresh: refreshCoverage } = useCoverage();
  const frameworkProblems = useMemo(() => problems.filter((problem) => problem.frameworkRuntime), [problems]);
  const [technology, setTechnology] = useState('All');
  const [problemId, setProblemId] = useState('');
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [modal, setModal] = useState<{ test: TestCaseItem | null } | null>(null);
  const [pending, setPending] = useState<Pending | null>(null);
  const [reason, setReason] = useState('');
  const [notice, setNotice] = useState<{ tone: 'error' | 'ok'; text: string } | null>(null);

  useEffect(() => {
    setProblemId(recalledProblem());
  }, []);

  const technologies = useMemo(() => ['All', ...Array.from(new Set(frameworkProblems.map((problem) => problem.technology)))], [frameworkProblems]);
  const filtered = useMemo(
    () => frameworkProblems.filter((problem) => technology === 'All' || problem.technology === technology),
    [frameworkProblems, technology],
  );
  const selected = filtered.find((problem) => problem.id === problemId) ?? filtered[0] ?? null;
  const runtime = selected?.frameworkRuntime ?? null;
  const { tests: allTests, loading, loadError: testsError, needsReason, addTest, updateTest, removeTest } = useProblemTests(selected?.id ?? null);
  const tests = allTests.filter((test) => test.kind === 'framework' || test.kind === 'lab');
  const allRevealed = tests.length > 0 && tests.every((test) => revealed.has(test.id));

  const selectProblem = (id: string) => {
    setProblemId(id);
    rememberProblem(id);
    setPending(null);
    setNotice(null);
  };

  const toggleReveal = (id: string) =>
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleAll = () =>
    setRevealed((prev) => {
      const next = new Set(prev);
      tests.forEach((test) => (allRevealed ? next.delete(test.id) : next.add(test.id)));
      return next;
    });

  const submitModal = async (spec: FrameworkSpec, changeReason?: string) => {
    if (!selected || !modal) return 'Choose a problem first.';
    const result = modal.test
      ? await updateTest(modal.test.id, { spec }, changeReason)
      : await addTest({ kind: selected.testKind === 'lab' ? 'lab' : 'framework', spec, hidden: true }, changeReason);
    if (!result.ok) return result.error;
    setModal(null);
    setNotice({ tone: 'ok', text: modal.test ? 'Test saved.' : selected.testKind === 'lab' ? 'Added a lab check.' : 'Added a framework test.' });
    void refreshCoverage();
    return null;
  };

  const confirmPending = async (test: TestCaseItem) => {
    if (!pending) return;
    if (needsReason && reason.trim().length < 5) {
      setNotice({ tone: 'error', text: 'This problem is live. Give a reason of at least 5 characters.' });
      return;
    }
    const why = needsReason ? reason.trim() : undefined;
    const result = pending.action === 'delete' ? await removeTest(test.id, why) : await updateTest(test.id, { enabled: !test.enabled }, why);
    setPending(null);
    setReason('');
    const done = pending.action === 'delete' ? 'Test deleted.' : test.enabled ? 'Test turned off.' : 'Test turned on.';
    setNotice(result.ok ? { tone: 'ok', text: done } : { tone: 'error', text: result.error });
    if (result.ok) void refreshCoverage();
  };

  const startAction = (test: TestCaseItem, action: Pending['action']) => {
    if (action === 'toggle' && !needsReason) {
      setPending({ id: test.id, action });
      void (async () => {
        const result = await updateTest(test.id, { enabled: !test.enabled });
        setPending(null);
        setNotice(result.ok ? { tone: 'ok', text: test.enabled ? 'Test turned off.' : 'Test turned on.' } : { tone: 'error', text: result.error });
        if (result.ok) void refreshCoverage();
      })();
      return;
    }
    setPending({ id: test.id, action });
  };

  const specText = (test: TestCaseItem) => (test.redacted || !test.spec ? MASK : revealed.has(test.id) ? JSON.stringify(test.spec, null, 2) : MASK);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>Framework &amp; Lab Tests</h1>
          <p className={styles.subtitle}>Framework tests and database, DevOps and Power BI lab checks that judge submissions. Never shown to learners.</p>
        </div>
      </header>

      <TestCaseTabs />

      <section className={styles.filters} aria-label="Choose a problem">
        <label className={styles.field}>
          <span className={styles.label}>Technology</span>
          <select
            className={styles.control}
            value={technology}
            onChange={(event) => {
              setTechnology(event.target.value);
              setProblemId('');
            }}
          >
            {technologies.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Problem</span>
          <select className={styles.control} value={selected?.id ?? ''} disabled={filtered.length === 0} onChange={(event) => selectProblem(event.target.value)}>
            {filtered.map((problem) => (
              <option key={problem.id} value={problem.id}>
                {problem.title}
              </option>
            ))}
          </select>
        </label>
      </section>

      {notice && (
        <p className={notice.tone === 'error' ? styles.errorNotice : styles.okNotice} role={notice.tone === 'error' ? 'alert' : 'status'}>
          {notice.text}
        </p>
      )}

      {!ready ? (
        <p className={styles.empty}>Loading&hellip;</p>
      ) : loadError ? (
        <section className={styles.card}>
          <p className={styles.empty}>{loadError}</p>
        </section>
      ) : !selected || !runtime ? (
        <section className={styles.card}>
          <p className={styles.empty}>{frameworkProblems.length === 0 ? (problems.length === 0 ? scope.empty : 'No framework or lab problems yet.') : 'No problems found for this technology.'}</p>
        </section>
      ) : (
        <section className={styles.card} aria-labelledby="ft-card-title">
          <div className={styles.cardHead}>
            <div>
              <h2 id="ft-card-title" className={styles.cardTitle}>
                {selected.title}
              </h2>
              <p className={styles.cardSub}>
                <span className={cx(styles.badge, DIFFICULTY_CLASS[selected.difficulty])}>{capitalize(selected.difficulty)}</span>
                <span>{FRAMEWORK_GUIDES[runtime].label}</span>
                <span>{`${tests.length} test${tests.length === 1 ? '' : 's'}`}</span>
                {needsReason && <span className={cx(styles.badge, styles.badgeWarn)}>Live: changes need a reason</span>}
              </p>
            </div>
            <div className={styles.cardActions}>
              {tests.length > 0 && (
                <button type="button" className={styles.secondaryButton} onClick={toggleAll}>
                  {allRevealed ? <EyeOff width={16} height={16} aria-hidden="true" /> : <Eye width={16} height={16} aria-hidden="true" />}
                  {allRevealed ? 'Hide all' : 'Reveal all'}
                </button>
              )}
              <button type="button" className={styles.primaryButton} onClick={() => setModal({ test: null })}>
                <Plus width={16} height={16} aria-hidden="true" />
                Add test
              </button>
            </div>
          </div>

          {loading && allTests.length === 0 ? (
            <p className={styles.empty}>Loading&hellip;</p>
          ) : testsError ? (
            <p className={styles.empty}>{testsError}</p>
          ) : tests.length === 0 ? (
            <p className={styles.empty}>No tests yet. Submissions for this problem cannot be judged without them.</p>
          ) : (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col" className={styles.numCell}>
                      #
                    </th>
                    <th scope="col">{FRAMEWORK_GUIDES[runtime].kind}</th>
                    <th scope="col">Definition</th>
                    <th scope="col" className={styles.actionsCell}>
                      <span className={styles.srOnly}>Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tests.map((test, index) => (
                    <tr key={test.id}>
                      <td className={styles.numCell}>
                        {index + 1}
                        {!test.enabled && <div className={styles.hint}>off</div>}
                      </td>
                      <td>{test.spec && !test.redacted ? summarizeSpec(runtime, test.spec) : MASK}</td>
                      <td>
                        <pre className={styles.code}>{specText(test)}</pre>
                      </td>
                      <td className={styles.actionsCell}>
                        {pending?.id === test.id && (pending.action === 'delete' || needsReason) ? (
                          <span className={styles.rowActions}>
                            {needsReason && (
                              <input
                                className={styles.control}
                                style={{ width: 200 }}
                                placeholder="Reason (required)"
                                aria-label="Reason for the change"
                                value={reason}
                                onChange={(event) => setReason(event.target.value)}
                              />
                            )}
                            <button type="button" className={pending.action === 'delete' ? styles.dangerButton : styles.primaryButton} onClick={() => confirmPending(test)}>
                              {pending.action === 'delete' ? 'Delete' : test.enabled ? 'Turn off' : 'Turn on'}
                            </button>
                            <button
                              type="button"
                              className={styles.secondaryButton}
                              onClick={() => {
                                setPending(null);
                                setReason('');
                              }}
                            >
                              Cancel
                            </button>
                          </span>
                        ) : (
                          <span className={styles.rowActions}>
                            <button
                              type="button"
                              className={styles.iconButton}
                              disabled={test.redacted}
                              aria-label={revealed.has(test.id) ? `Hide test ${index + 1}` : `Reveal test ${index + 1}`}
                              onClick={() => toggleReveal(test.id)}
                            >
                              {revealed.has(test.id) ? <EyeOff width={20} height={20} aria-hidden="true" /> : <Eye width={20} height={20} aria-hidden="true" />}
                            </button>
                            <button
                              type="button"
                              className={styles.iconButton}
                              aria-label={test.enabled ? `Turn off test ${index + 1}` : `Turn on test ${index + 1}`}
                              title={test.enabled ? 'Turn off' : 'Turn on'}
                              disabled={pending?.id === test.id}
                              onClick={() => startAction(test, 'toggle')}
                            >
                              <Power width={20} height={20} aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              className={styles.iconButton}
                              disabled={test.redacted}
                              aria-label={`Edit test ${index + 1}`}
                              onClick={() => setModal({ test })}
                            >
                              <Pencil width={20} height={20} aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              className={cx(styles.iconButton, styles.iconButtonDanger)}
                              aria-label={`Delete test ${index + 1}`}
                              onClick={() => startAction(test, 'delete')}
                            >
                              <Trash2 width={20} height={20} aria-hidden="true" />
                            </button>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {modal && runtime && (
        <FrameworkTestModal
          key={modal.test?.id ?? 'new'}
          runtime={runtime}
          initial={modal.test}
          needsReason={needsReason}
          onCancel={() => setModal(null)}
          onSubmit={submitModal}
        />
      )}
    </div>
  );
}