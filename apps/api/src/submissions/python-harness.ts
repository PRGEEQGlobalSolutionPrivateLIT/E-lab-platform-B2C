export const PYTHON_HARNESS_MARKER = '#elab:harness';

const SENTINEL = '__ELAB_HARNESS_RESULT__';

const PRELUDE = "import sys as _elab_sys; _elab_buf = []; _elab_out = _elab_sys.stdout; _elab_sys.stdout = type('_ElabTee', (), {'write': lambda self, s: (_elab_buf.append(s), _elab_out.write(s))[1], 'flush': lambda self: _elab_out.flush(), '__getattr__': lambda self, name: getattr(_elab_out, name)})()";

export function pythonHarness(input: string | null | undefined): string | null {
  const text = (input ?? '').replace(/\r\n/g, '\n');
  if (!text.startsWith(`${PYTHON_HARNESS_MARKER}\n`)) return null;
  return text.slice(PYTHON_HARNESS_MARKER.length + 1);
}

export function withPythonHarness(code: string, harness: string): string {
  return `${PRELUDE}\n${code}\n\nprint()\nprint('${SENTINEL}')\n${harness}\n`;
}

export function pythonHarnessOutput(output: string): string {
  const text = output.replace(/\r\n/g, '\n');
  const index = text.lastIndexOf(`${SENTINEL}\n`);
  if (index >= 0) return text.slice(index + SENTINEL.length + 1);
  const bare = text.lastIndexOf(SENTINEL);
  return bare >= 0 ? text.slice(bare + SENTINEL.length) : '';
}
