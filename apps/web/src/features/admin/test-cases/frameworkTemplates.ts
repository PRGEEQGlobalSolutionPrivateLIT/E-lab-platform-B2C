import type { FrameworkRuntime, FrameworkSpec } from './types';

interface RuntimeGuide {
  label: string;
  kind: string;
  help: string;
  template: FrameworkSpec;
}

const SOURCE_GROUP_HELP =
  'id and title are required. Add requiredFiles, requiredSourceChecks or forbiddenSourceChecks. Each check needs filePath, pattern (a regular expression), message and optional flags.';

const sourceGroup = (file: string, pattern: string, message: string): FrameworkSpec => ({
  id: 'check-1',
  title: 'Describe what this test verifies',
  requiredFiles: [file],
  requiredSourceChecks: [{ filePath: file, pattern, flags: 'm', message }],
  forbiddenSourceChecks: [],
});

export const FRAMEWORK_GUIDES: Record<FrameworkRuntime, RuntimeGuide> = {
  express: {
    label: 'Express',
    kind: 'HTTP request',
    help: 'method, path and expectedStatus are required. body is sent as JSON. expectedBody must match the JSON response exactly.',
    template: { method: 'GET', path: '/hello', expectedStatus: 200, expectedBody: { message: 'Hello Express' } },
  },
  fastapi: {
    label: 'FastAPI',
    kind: 'HTTP request',
    help: 'method, path and expectedStatus are required. body is sent as JSON. expectedJson must match the JSON response exactly.',
    template: { name: 'Root endpoint response', method: 'GET', path: '/', expectedStatus: 200, expectedJson: { message: 'Hello, World!' } },
  },
  springboot: {
    label: 'Spring Boot',
    kind: 'HTTP request',
    help: 'method and path are required. body is sent as text. expectedStatus defaults to 200. expectedOutput must match the trimmed response body exactly.',
    template: { method: 'GET', path: '/hello', expectedStatus: 200, expectedOutput: 'Hello, World!' },
  },
  aspnetcore: {
    label: 'ASP.NET Core',
    kind: 'HTTP request',
    help: 'method, path and expectedStatus are required. body is sent as text. expectedOutput must match the response body. requiredFiles lists files that must exist.',
    template: { method: 'GET', path: '/hello', expectedStatus: 200, expectedOutput: 'Hello, World!', requiredFiles: ['Program.cs'] },
  },
  react: {
    label: 'React',
    kind: 'UI step',
    help: 'Steps run in order on one rendered page. type is text (text must appear), click (click selector, then expectedText must appear) or input (type value into selector, then expectedText must appear and absentText must not).',
    template: { type: 'click', selector: 'button', expectedText: 'Count: 1' },
  },
  angular: {
    label: 'Angular',
    kind: 'UI step',
    help: 'Steps run in order on one rendered page. type is text (text must appear), click (click selector, then expectedText must appear) or input (type value into selector, then expectedText must appear and absentText must not).',
    template: { type: 'text', text: 'Hello, World!' },
  },
  vue: {
    label: 'Vue',
    kind: 'Rendered output',
    help: 'expectedOutput must equal the rendered template text. title is optional.',
    template: { title: 'Renders the greeting', expectedOutput: 'Hello, World!' },
  },
  nextjs: {
    label: 'Next.js',
    kind: 'Source check group',
    help: SOURCE_GROUP_HELP,
    template: sourceGroup('app/page.tsx', String.raw`export\s+default\s+function\s+\w+`, 'Export a default page component.'),
  },
  nestjs: {
    label: 'NestJS',
    kind: 'Source check group',
    help: SOURCE_GROUP_HELP,
    template: sourceGroup('src/app.controller.ts', String.raw`@Controller\(`, 'Decorate the class with @Controller().'),
  },
  django: {
    label: 'Django',
    kind: 'Source check group',
    help: SOURCE_GROUP_HELP,
    template: sourceGroup('app/views.py', String.raw`def\s+\w+\s*\(\s*request`, 'Define a function-based view that takes request.'),
  },
};

const str = (value: unknown) => (typeof value === 'string' ? value : '');

export function summarizeSpec(runtime: FrameworkRuntime, spec: FrameworkSpec): string {
  const kind = FRAMEWORK_GUIDES[runtime].kind;
  if (kind === 'HTTP request') {
    const status = typeof spec.expectedStatus === 'number' ? spec.expectedStatus : 200;
    return `${str(spec.method) || 'GET'} ${str(spec.path)} \u2192 ${status}`;
  }
  if (kind === 'UI step') {
    if (spec.type === 'click') return `Click ${str(spec.selector)} \u2192 "${str(spec.expectedText)}"`;
    if (spec.type === 'input') return `Type "${str(spec.value)}" in ${str(spec.selector)}`;
    return `Shows "${str(spec.text)}"`;
  }
  if (kind === 'Rendered output') return str(spec.title) || `Renders "${str(spec.expectedOutput)}"`;
  return str(spec.title) || str(spec.id);
}