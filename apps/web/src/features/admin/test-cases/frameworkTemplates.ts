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

const LAB_CHECK_HELP =
  'name is required. source is state (run command in the learner sandbox), code (inspect the learner code) or history (DevOps commands typed in the terminal). expect is succeeds, equals, contains, notContains, matches, notMatches, count, minCount or maxCount, compared against value. In commands, {{expr}} and {{code}} insert the learner code. message is shown when the check fails.';

export const FRAMEWORK_GUIDES: Record<FrameworkRuntime, RuntimeGuide> = {
  database: {
    label: 'Database',
    kind: 'Lab check',
    help: `${LAB_CHECK_HELP} State commands use the problem's database language and the first number in the output is used for count checks.`,
    template: {
      name: 'Employee record was inserted',
      source: 'state',
      command: "SELECT COUNT(*) AS result FROM employees WHERE id = 1 AND name = 'Ananya';",
      expect: 'count',
      value: 1,
      message: 'Insert the Ananya employee with id 1.',
    },
  },
  shell: {
    label: 'DevOps',
    kind: 'Lab check',
    help: `${LAB_CHECK_HELP} Commands run in the learner container. runner is shell, python or node; user, stdin, args, exit (zero, nonzero or any), noStderr and timeoutMs are optional.`,
    template: {
      name: 'Reports directory exists',
      command: 'test -d /workspace/reports',
      expect: 'succeeds',
      message: 'Create the /workspace/reports directory.',
    },
  },
  powerbi: {
    label: 'Power BI',
    kind: 'Power BI rule',
    help: 'id, type, label and points are required. required marks rules that must pass. Other fields depend on type, for example datasetId, expected, columns, minimum, measureName or visualType. hint is shown when the rule fails.',
    template: {
      id: 'sales-table-name',
      type: 'table-name',
      datasetId: 'sales',
      expected: 'Sales',
      label: 'Imported table is named Sales',
      points: 20,
      required: true,
      hint: 'Rename the imported table according to the problem statement.',
    },
  },
  web: {
    label: 'HTML & CSS',
    kind: 'Page check',
    help: 'name and type are required. element counts nodes matching selector (min, max). text needs selector and a pattern regex matched against the text. labels requires every form control to have a label. headings requires one h1 and no skipped levels. css needs selector and property (regex) with optional value (regex), media (true = only inside @media, false = only outside) and absent (pass when no rule matches). media requires an @media rule (feature regex, default (max|min)-width). any and all combine nested checks.',
    template: { name: 'Card has rounded corners', type: 'css', selector: '.card', property: 'border-radius', value: '[1-9]' },
  },
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
    help: 'method and path are required. body is sent as text. expectedStatus defaults to 200. expectedOutput must match the trimmed response body exactly. supportFiles is an optional list of { path, content } files (for example a probe controller) added to the learner project before it is built.',
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
  if (kind === 'Lab check' || kind === 'Page check') return str(spec.name);
  if (kind === 'Power BI rule') return str(spec.label) || str(spec.id);
  return str(spec.title) || str(spec.id);
}