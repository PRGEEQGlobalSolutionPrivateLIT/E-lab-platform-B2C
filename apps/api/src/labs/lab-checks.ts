import { BadRequestException } from '@nestjs/common';

export type LabCheckSource = 'state' | 'code' | 'history';
export type LabCheckRunner = 'shell' | 'python' | 'node';
export type LabCheckExit = 'zero' | 'nonzero' | 'any';
export type LabCheckExpect = 'succeeds' | 'equals' | 'contains' | 'notContains' | 'matches' | 'notMatches' | 'count' | 'minCount' | 'maxCount';

export type LabCheck = {
  name: string;
  source?: LabCheckSource;
  command?: string;
  runner?: LabCheckRunner;
  args?: string[];
  user?: string;
  stdin?: string;
  timeoutMs?: number;
  exit?: LabCheckExit;
  expect?: LabCheckExpect;
  value?: string | number;
  flags?: string;
  ignoreCase?: boolean;
  noStderr?: boolean;
  message?: string;
};

export type LabRunResult = { exitCode: number; stdout: string; stderr: string };

export type LabCheckContext = {
  run?: (check: LabCheck, command: string) => Promise<LabRunResult>;
  code?: string;
  history?: string[];
};

export type LabCheckResult = { name: string; passed: boolean; message: string };

export type LabEvaluation = {
  accepted: boolean;
  passedTests: number;
  totalTests: number;
  score: number;
  message: string;
  tests: LabCheckResult[];
};

const SOURCES: LabCheckSource[] = ['state', 'code', 'history'];
const RUNNERS: LabCheckRunner[] = ['shell', 'python', 'node'];
const EXITS: LabCheckExit[] = ['zero', 'nonzero', 'any'];
const EXPECTS: LabCheckExpect[] = ['succeeds', 'equals', 'contains', 'notContains', 'matches', 'notMatches', 'count', 'minCount', 'maxCount'];
const NUMERIC: LabCheckExpect[] = ['count', 'minCount', 'maxCount'];
const FLAGS = /^[gimsuy]*$/;

export function cleanLearnerCode(code: string): string {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('--') && !line.startsWith('#') && !line.startsWith('//'))
    .join('\n');
}

export function learnerExpression(code: string): string {
  return cleanLearnerCode(code).replace(/;+\s*$/, '').trim();
}

function fail(message: string): never {
  throw new BadRequestException(`Invalid lab check: ${message}`);
}

function pick<T extends string>(value: unknown, allowed: T[], key: string, fallback: T): T {
  if (value === undefined || value === null || value === '') return fallback;
  if (typeof value !== 'string' || !allowed.includes(value as T)) fail(`"${key}" must be one of ${allowed.join(', ')}.`);
  return value as T;
}

function optionalText(spec: Record<string, unknown>, key: string, max: number): string | undefined {
  const value = spec[key];
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value !== 'string') fail(`"${key}" must be text.`);
  if (value.length > max) fail(`"${key}" must be at most ${max} characters.`);
  return value;
}

export function normalizeLabCheck(input: unknown): LabCheck {
  if (!input || typeof input !== 'object' || Array.isArray(input)) fail('the check must be a JSON object.');
  const spec = input as Record<string, unknown>;
  const name = optionalText(spec, 'name', 200);
  if (!name) fail('"name" is required.');
  const source = pick(spec.source, SOURCES, 'source', 'state');
  const expect = pick(spec.expect, EXPECTS, 'expect', 'succeeds');
  const command = optionalText(spec, 'command', 20000);
  if (source === 'state' && !command) fail('"command" is required when source is "state".');
  if (source !== 'state' && expect === 'succeeds') fail(`"expect" must compare text when source is "${source}".`);
  const value = spec.value;
  if (expect !== 'succeeds') {
    if (value === undefined || value === null || value === '') fail('"value" is required for this expectation.');
    if (NUMERIC.includes(expect) ? !Number.isFinite(Number(value)) : typeof value !== 'string') {
      fail(NUMERIC.includes(expect) ? '"value" must be a number.' : '"value" must be text.');
    }
  }
  const flags = optionalText(spec, 'flags', 10);
  if (flags && !FLAGS.test(flags)) fail('"flags" may only contain g, i, m, s, u, y.');
  if (expect === 'matches' || expect === 'notMatches') {
    try {
      new RegExp(String(value), flags);
    } catch {
      fail('"value" is not a valid regular expression.');
    }
  }
  const args = spec.args;
  if (args !== undefined && (!Array.isArray(args) || args.some((arg) => typeof arg !== 'string'))) fail('"args" must be a list of text values.');
  const timeoutMs = spec.timeoutMs;
  if (timeoutMs !== undefined && (typeof timeoutMs !== 'number' || timeoutMs < 1000 || timeoutMs > 120000)) fail('"timeoutMs" must be between 1000 and 120000.');
  const user = optionalText(spec, 'user', 32);
  if (user && !/^[a-z_][a-z0-9_-]*$/.test(user)) fail('"user" must be a Linux user name.');
  const stdin = spec.stdin;
  if (stdin !== undefined && typeof stdin !== 'string') fail('"stdin" must be text.');

  const check: LabCheck = { name, source, expect };
  if (command) check.command = command;
  if (spec.runner !== undefined) check.runner = pick(spec.runner, RUNNERS, 'runner', 'shell');
  if (args) check.args = args as string[];
  if (user) check.user = user;
  if (typeof stdin === 'string') check.stdin = stdin;
  if (typeof timeoutMs === 'number') check.timeoutMs = timeoutMs;
  if (spec.exit !== undefined) check.exit = pick(spec.exit, EXITS, 'exit', 'zero');
  if (expect !== 'succeeds') check.value = NUMERIC.includes(expect) ? Number(value) : String(value);
  if (flags) check.flags = flags;
  if (spec.ignoreCase === true) check.ignoreCase = true;
  if (spec.noStderr === true) check.noStderr = true;
  const message = optionalText(spec, 'message', 500);
  if (message) check.message = message;
  return check;
}

function normalizeOutput(value: string, ignoreCase?: boolean) {
  const text = value
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')
    .trim();
  return ignoreCase ? text.toLowerCase() : text;
}

function firstNumber(text: string): number | null {
  const match = text.match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
}

function compare(check: LabCheck, text: string): boolean {
  const expect = check.expect ?? 'succeeds';
  if (expect === 'succeeds') return true;
  const actual = normalizeOutput(text, check.ignoreCase);
  const expected = typeof check.value === 'number' ? check.value : normalizeOutput(String(check.value ?? ''), check.ignoreCase);
  switch (expect) {
    case 'equals':
      return actual === expected;
    case 'contains':
      return actual.includes(String(expected));
    case 'notContains':
      return !actual.includes(String(expected));
    case 'matches':
      return new RegExp(String(check.value), check.flags).test(text.replace(/\r\n?/g, '\n').trim());
    case 'notMatches':
      return !new RegExp(String(check.value), check.flags).test(text.replace(/\r\n?/g, '\n').trim());
    case 'count':
    case 'minCount':
    case 'maxCount': {
      const number = firstNumber(actual);
      const target = Number(check.value);
      if (number === null) return false;
      return expect === 'count' ? Math.abs(number - target) < 1e-9 : expect === 'minCount' ? number >= target : number <= target;
    }
  }
}

function exitMatches(check: LabCheck, exitCode: number) {
  const exit = check.exit ?? 'zero';
  return exit === 'any' || (exit === 'zero' ? exitCode === 0 : exitCode !== 0);
}

export function substituteLearnerCode(command: string, code: string) {
  return command.replace(/\{\{\s*expr\s*\}\}/g, () => learnerExpression(code)).replace(/\{\{\s*code\s*\}\}/g, () => cleanLearnerCode(code));
}

async function evaluateOne(check: LabCheck, context: LabCheckContext): Promise<boolean> {
  const source = check.source ?? 'state';
  if (source === 'code') return compare(check, cleanLearnerCode(context.code ?? ''));
  if (source === 'history') {
    const history = (context.history ?? []).map((line) => line.trim().replace(/\s+/g, ' ')).join('\n');
    return compare(check, history);
  }
  if (!context.run || !check.command) return false;
  const result = await context.run(check, substituteLearnerCode(check.command, context.code ?? ''));
  if (!exitMatches(check, result.exitCode)) return false;
  if (check.noStderr && result.stderr.trim()) return false;
  return compare(check, result.stdout);
}

export async function evaluateLabChecks(checks: LabCheck[], context: LabCheckContext): Promise<LabEvaluation> {
  const tests: LabCheckResult[] = [];
  for (const check of checks) {
    let passed = false;
    try {
      passed = await evaluateOne(check, context);
    } catch {
      passed = false;
    }
    tests.push({ name: check.name, passed, message: passed ? 'Passed.' : (check.message ?? `${check.name} did not pass.`) });
  }
  const totalTests = tests.length;
  const passedTests = tests.filter((test) => test.passed).length;
  const accepted = totalTests > 0 && passedTests === totalTests;
  return {
    accepted,
    passedTests,
    totalTests,
    score: totalTests ? Math.round((passedTests / totalTests) * 100) : 0,
    message: !totalTests
      ? 'No hidden tests are configured for this problem yet.'
      : accepted
        ? 'All hidden tests passed.'
        : (tests.find((test) => !test.passed)?.message ?? `${passedTests}/${totalTests} hidden tests passed.`),
    tests,
  };
}