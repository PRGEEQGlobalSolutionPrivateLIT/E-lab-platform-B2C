'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { X } from 'lucide-react';
import { FRAMEWORK_GUIDES } from './frameworkTemplates';
import { cx } from './shared';
import type { FrameworkRuntime, FrameworkSpec, TestCaseItem } from './types';
import styles from './test-cases.module.css';

const MAX_LENGTH = 20000;

interface FrameworkTestModalProps {
  runtime: FrameworkRuntime;
  initial: TestCaseItem | null;
  needsReason?: boolean;
  onCancel: () => void;
  onSubmit: (spec: FrameworkSpec, reason?: string) => Promise<string | null>;
}

const pretty = (value: unknown) => JSON.stringify(value, null, 2);

export function FrameworkTestModal({ runtime, initial, needsReason = false, onCancel, onSubmit }: FrameworkTestModalProps) {
  const guide = FRAMEWORK_GUIDES[runtime];
  const [source, setSource] = useState(pretty(initial?.spec ?? guide.template));
  const [errors, setErrors] = useState<{ source?: string; reason?: string }>({});
  const [reason, setReason] = useState('');
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState('');
  const firstRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    firstRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onCancel]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const next: { source?: string; reason?: string } = {};
    let spec: unknown = null;

    if (source.length > MAX_LENGTH) next.source = `Keep the test under ${MAX_LENGTH} characters`;
    else {
      try {
        spec = JSON.parse(source);
        if (!spec || typeof spec !== 'object' || Array.isArray(spec)) next.source = 'The test must be a single JSON object';
      } catch (error) {
        next.source = `Not valid JSON: ${error instanceof Error ? error.message : 'parse error'}`;
      }
    }
    if (needsReason && reason.trim().length < 5) next.reason = 'This problem is live. Give a reason of at least 5 characters';

    setErrors(next);
    if (next.source || next.reason) return;

    setSaving(true);
    setServerError('');
    const failure = await onSubmit(spec as FrameworkSpec, needsReason ? reason.trim() : undefined);
    setSaving(false);
    if (failure) setServerError(failure);
  };

  return (
    <div
      className={styles.overlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="ft-modal-title">
        <div className={styles.modalHead}>
          <h2 id="ft-modal-title" className={styles.modalTitle}>
            {`${initial ? 'Edit' : 'Add'} ${guide.label} test`}
          </h2>
          <button type="button" className={styles.iconButton} aria-label="Close" onClick={onCancel}>
            <X width={20} height={20} aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={submit} noValidate className={styles.modalBody}>
          <div className={styles.field}>
            <label htmlFor="ft-spec" className={styles.label}>
              {`${guide.kind} (JSON)`}
              <span className={styles.requiredMark}> *</span>
            </label>
            <textarea
              id="ft-spec"
              ref={firstRef}
              rows={14}
              spellCheck={false}
              value={source}
              aria-invalid={errors.source ? true : undefined}
              aria-describedby={errors.source ? 'ft-spec-error' : 'ft-spec-hint'}
              className={cx(styles.control, errors.source && styles.controlError)}
              onChange={(event) => {
                setSource(event.target.value);
                if (errors.source) setErrors((prev) => ({ ...prev, source: undefined }));
              }}
            />
            {errors.source ? (
              <p id="ft-spec-error" className={styles.errorText}>
                {errors.source}
              </p>
            ) : (
              <p id="ft-spec-hint" className={styles.hint}>
                {guide.help}
              </p>
            )}
            <div>
              <button type="button" className={styles.linkButton} onClick={() => setSource(pretty(guide.template))}>
                Reset to template
              </button>
            </div>
          </div>

          {needsReason && (
            <div className={styles.field}>
              <label htmlFor="ft-reason" className={styles.label}>
                Reason for the change<span className={styles.requiredMark}> *</span>
              </label>
              <input
                id="ft-reason"
                value={reason}
                className={cx(styles.control, errors.reason && styles.controlError)}
                placeholder="e.g. Cover the empty-list case"
                onChange={(event) => {
                  setReason(event.target.value);
                  if (errors.reason) setErrors((prev) => ({ ...prev, reason: undefined }));
                }}
              />
              {errors.reason ? (
                <p className={styles.errorText}>{errors.reason}</p>
              ) : (
                <p className={styles.hint}>The problem is published, so this change creates a new version</p>
              )}
            </div>
          )}

          {serverError && (
            <p className={styles.errorText} role="alert">
              {serverError}
            </p>
          )}

          <div className={styles.modalFooter}>
            <button type="button" className={styles.secondaryButton} onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className={styles.primaryButton} disabled={saving}>
              {saving ? 'Saving…' : initial ? 'Save changes' : 'Add test'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}