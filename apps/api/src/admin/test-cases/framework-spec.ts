import { BadRequestException } from '@nestjs/common';

import { normalizeLabCheck } from '../../labs/lab-checks.js';

export type FrameworkRuntime =
  | 'express'
  | 'fastapi'
  | 'springboot'
  | 'aspnetcore'
  | 'react'
  | 'angular'
  | 'vue'
  | 'nextjs'
  | 'nestjs'
  | 'django'
  | 'database'
  | 'shell'
  | 'powerbi';

const LAB_RUNTIME_BY_WORKSPACE: Record<string, FrameworkRuntime> = {
  database: 'database',
  devops: 'shell',
  powerbi: 'powerbi',
};

const DEVOPS_LAB_PREFIXES = [
  'linux-',
  'git-',
  'docker-',
  'kubernetes-',
  'cicd-',
  'web-security-',
  'network-security-',
  'python-security-',
  'incident-response-',
  'devsecops-',
  'penetration-testing-',
  'cloud-security-',
  'digital-forensics-',
  'soc-siem-',
  'ethereum-solidity-',
  'web3-dapp-development-',
  'smart-contract-security-',
  'defi-tokenization-',
];

const POWER_BI_RULE_TYPES = [
  'dataset-selected',
  'dataset-loaded',
  'table-name',
  'required-columns',
  'minimum-rows',
  'transform',
  'relationship',
  'visual',
  'filter',
  'dax-measure',
  'table-exists',
  'column-exists',
  'column-removed',
  'column-renamed',
  'transform-applied',
  'relationship-exists',
  'measure-exists',
  'dax-expression',
  'visual-exists',
  'visual-field',
  'filter-exists',
];

const RUNTIME_BY_TECHNOLOGY: Record<string, FrameworkRuntime> = {
  expressjs: 'express',
  express: 'express',
  fastapi: 'fastapi',
  springboot: 'springboot',
  aspnetcore: 'aspnetcore',
  react: 'react',
  angular: 'angular',
  vue: 'vue',
  nextjs: 'nextjs',
  nestjs: 'nestjs',
  django: 'django',
};

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
const FLAGS = /^[dgimsuy]*$/;

type Spec = Record<string, unknown>;

export function frameworkRuntime(technologySlug: string, workspaceType?: string | null, problemSlug?: string | null): FrameworkRuntime | null {
  const lab = workspaceType ? LAB_RUNTIME_BY_WORKSPACE[workspaceType.trim().toLowerCase()] : undefined;
  if (lab) return lab;
  const slug = (problemSlug ?? '').trim().toLowerCase();
  if (slug && DEVOPS_LAB_PREFIXES.some((prefix) => slug.startsWith(prefix))) return 'shell';
  return RUNTIME_BY_TECHNOLOGY[technologySlug.trim().toLowerCase()] ?? null;
}

export function testKindFor(runtime: FrameworkRuntime): 'framework' | 'lab' {
  return runtime === 'database' || runtime === 'shell' || runtime === 'powerbi' ? 'lab' : 'framework';
}

function failRule(message: string): never {
  throw new BadRequestException(`Invalid Power BI rule: ${message}`);
}

function powerBiRule(spec: Spec) {
  const id = text(spec, 'id', true, 100)!;
  const type = text(spec, 'type', true, 40)!;
  if (!POWER_BI_RULE_TYPES.includes(type)) failRule(`"type" must be one of ${POWER_BI_RULE_TYPES.join(', ')}.`);
  const label = text(spec, 'label', true, 200)!;
  const points = spec.points;
  if (typeof points !== 'number' || !Number.isFinite(points) || points < 0 || points > 1000) failRule('"points" must be a number between 0 and 1000.');
  if (spec.required !== undefined && typeof spec.required !== 'boolean') failRule('"required" must be true or false.');
  for (const key of ['columns', 'requiredColumns']) {
    const list = spec[key];
    if (list !== undefined && (!Array.isArray(list) || list.some((item) => typeof item !== 'string'))) failRule(`"${key}" must be a list of text values.`);
  }
  for (const key of ['minimum', 'minimumRows']) {
    if (spec[key] !== undefined && typeof spec[key] !== 'number') failRule(`"${key}" must be a number.`);
  }
  for (const [key, value] of Object.entries(spec)) {
    if (['columns', 'requiredColumns', 'minimum', 'minimumRows', 'points', 'required', 'active'].includes(key)) continue;
    if (value !== undefined && value !== null && typeof value !== 'string') failRule(`"${key}" must be text.`);
  }
  return { ...spec, id, type, label, points };
}

function fail(message: string): never {
  throw new BadRequestException(`Invalid framework test: ${message}`);
}

function text(spec: Spec, key: string, required: boolean, max = 20000): string | undefined {
  const value = spec[key];
  if (value === undefined || value === null || value === '') {
    if (required) fail(`"${key}" is required.`);
    return undefined;
  }
  if (typeof value !== 'string') fail(`"${key}" must be text.`);
  if (value.length > max) fail(`"${key}" must be at most ${max} characters.`);
  return value;
}

function status(spec: Spec, required: boolean): number | undefined {
  const value = spec.expectedStatus;
  if (value === undefined || value === null) {
    if (required) fail('"expectedStatus" is required.');
    return undefined;
  }
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 100 || value > 599) fail('"expectedStatus" must be an HTTP status code between 100 and 599.');
  return value;
}

function request(spec: Spec) {
  const method = text(spec, 'method', true)!.toUpperCase();
  if (!METHODS.includes(method)) fail(`"method" must be one of ${METHODS.join(', ')}.`);
  const path = text(spec, 'path', true, 500)!;
  if (!path.startsWith('/')) fail('"path" must start with "/".');
  return { method, path };
}

function strings(spec: Spec, key: string): string[] | undefined {
  const value = spec[key];
  if (value === undefined || value === null) return undefined;
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string' || !item.trim())) fail(`"${key}" must be a list of file paths.`);
  return value as string[];
}

function sourceChecks(spec: Spec, key: string) {
  const value = spec[key];
  if (value === undefined || value === null) return undefined;
  if (!Array.isArray(value)) fail(`"${key}" must be a list.`);
  return value.map((item, index) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) fail(`${key}[${index}] must be an object.`);
    const check = item as Spec;
    const filePath = text(check, 'filePath', true, 200)!;
    const pattern = text(check, 'pattern', true, 500)!;
    const message = text(check, 'message', true, 300)!;
    const flags = text(check, 'flags', false, 10);
    if (flags && !FLAGS.test(flags)) fail(`${key}[${index}].flags may only contain d, g, i, m, s, u, y.`);
    try {
      new RegExp(pattern, flags);
    } catch {
      fail(`${key}[${index}].pattern is not a valid regular expression.`);
    }
    return { filePath, pattern, message, ...(flags ? { flags } : {}) };
  });
}

function domStep(spec: Spec) {
  const type = text(spec, 'type', true);
  if (type === 'text') return { type, text: text(spec, 'text', true)! };
  if (type === 'click') return { type, selector: text(spec, 'selector', true, 300)!, expectedText: text(spec, 'expectedText', true)! };
  if (type === 'input') {
    const expectedText = text(spec, 'expectedText', false);
    const absentText = text(spec, 'absentText', false);
    return {
      type,
      selector: text(spec, 'selector', true, 300)!,
      value: typeof spec.value === 'string' ? spec.value : fail('"value" must be text.'),
      ...(expectedText !== undefined ? { expectedText } : {}),
      ...(absentText !== undefined ? { absentText } : {}),
    };
  }
  return fail('"type" must be text, click or input.');
}

const defined = (spec: Spec) => Object.fromEntries(Object.entries(spec).filter(([, value]) => value !== undefined));

export function normalizeFrameworkSpec(runtime: FrameworkRuntime, input: unknown): Spec {
  if (!input || typeof input !== 'object' || Array.isArray(input)) fail('the test must be a JSON object.');
  const spec = input as Spec;

  switch (runtime) {
    case 'database':
    case 'shell':
      return normalizeLabCheck(spec) as Spec;
    case 'powerbi':
      return powerBiRule(spec);
    case 'express':
      return defined({ ...request(spec), expectedStatus: status(spec, true), body: spec.body, expectedBody: spec.expectedBody });
    case 'fastapi':
      return defined({
        type: 'http',
        name: text(spec, 'name', false, 200),
        ...request(spec),
        expectedStatus: status(spec, true),
        body: spec.body,
        expectedJson: spec.expectedJson,
      });
    case 'springboot':
      return defined({
        ...request(spec),
        body: text(spec, 'body', false),
        expectedStatus: status(spec, false),
        expectedOutput: text(spec, 'expectedOutput', false),
      });
    case 'aspnetcore': {
      const headers = spec.headers;
      if (headers !== undefined && (typeof headers !== 'object' || headers === null || Array.isArray(headers) || Object.values(headers).some((value) => typeof value !== 'string'))) {
        fail('"headers" must be an object of text values.');
      }
      return defined({
        id: text(spec, 'id', false, 100),
        ...request(spec),
        expectedStatus: status(spec, true),
        expectedOutput: text(spec, 'expectedOutput', false),
        body: text(spec, 'body', false),
        headers,
        requiredFiles: strings(spec, 'requiredFiles'),
      });
    }
    case 'react':
    case 'angular':
      return domStep(spec);
    case 'vue':
      return defined({ title: text(spec, 'title', false, 200), expectedOutput: text(spec, 'expectedOutput', true)! });
    case 'nextjs':
    case 'nestjs':
    case 'django': {
      const result = defined({
        id: text(spec, 'id', true, 100),
        title: text(spec, 'title', true, 200),
        requiredFiles: strings(spec, 'requiredFiles'),
        requiredSourceChecks: sourceChecks(spec, 'requiredSourceChecks'),
        forbiddenSourceChecks: sourceChecks(spec, 'forbiddenSourceChecks'),
      });
      if (!result.requiredFiles && !result.requiredSourceChecks && !result.forbiddenSourceChecks) {
        fail('add requiredFiles, requiredSourceChecks or forbiddenSourceChecks.');
      }
      return result;
    }
  }
}