'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';

const shell: React.CSSProperties = {
  minHeight: '60vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12,
  color: '#475569',
  fontSize: 14,
};

const button: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '8px 16px',
  borderRadius: 10,
  border: '1px solid #cbd5e1',
  background: '#ffffff',
  color: '#1e293b',
  cursor: 'pointer',
  fontSize: 14,
};

export function CatalogGate({ load, label, children }: { load: () => Promise<unknown>; label: string; children: ReactNode }) {
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');

  const run = useCallback(() => {
    setState('loading');
    load()
      .then(() => setState('ready'))
      .catch(() => setState('error'));
  }, [load]);

  useEffect(() => {
    run();
  }, [run]);

  if (state === 'ready') return <>{children}</>;

  return (
    <div style={shell} role="status">
      {state === 'loading' ? (
        <>
          <Loader2 size={22} style={{ animation: 'spin 1s linear infinite' }} />
          <span>{`Loading ${label}…`}</span>
          <style>{'@keyframes spin{to{transform:rotate(360deg)}}'}</style>
        </>
      ) : (
        <>
          <span>{`Could not load ${label}. Check your connection and try again.`}</span>
          <button type="button" style={button} onClick={run}>
            <RefreshCw size={16} />
            Retry
          </button>
        </>
      )}
    </div>
  );
}
