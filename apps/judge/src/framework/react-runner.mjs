import {
  execFile,
} from 'node:child_process';

import {
  mkdtemp,
  mkdir,
  rm,
  writeFile,
} from 'node:fs/promises';

import {
  tmpdir,
} from 'node:os';

import {
  dirname,
  join,
  resolve,
} from 'node:path';

import {
  promisify,
} from 'node:util';

const execFileAsync =
  promisify(execFile);

const REACT_IMAGE =
  'elab-judge-react:latest';

const RESULT_MARKER =
  '__ELAB_REACT_RESULT__';

/* =========================================================
   FILE PATH VALIDATION
========================================================= */

function normalizeFilePath(
  filePath,
) {
  if (
    typeof filePath !==
    'string'
  ) {
    throw new Error(
      'React file path must be a string.',
    );
  }

  const normalized =
    filePath
      .replace(
        /\\/g,
        '/',
      )
      .trim();

  if (
    !normalized ||
    normalized.startsWith('/') ||
    normalized === '..' ||
    normalized.includes('../')
  ) {
    throw new Error(
      `Invalid React file path: ${filePath}`,
    );
  }

  return normalized;
}

/* =========================================================
   WRITE LEARNER FILES
========================================================= */

async function writeReactFiles(
  workspaceDirectory,
  files,
) {
  const root =
    resolve(
      workspaceDirectory,
    );

  for (
    const file of files
  ) {
    const safePath =
      normalizeFilePath(
        file.path,
      );

    const target =
      resolve(
        workspaceDirectory,
        safePath,
      );

    if (
      target !== root &&
      !target.startsWith(
        `${root}\\`,
      ) &&
      !target.startsWith(
        `${root}/`,
      )
    ) {
      throw new Error(
        `Invalid React file path: ${file.path}`,
      );
    }

    await mkdir(
      dirname(
        target,
      ),
      {
        recursive:
          true,
      },
    );

    await writeFile(
      target,
      file.content,
      'utf8',
    );
  }
}

/* =========================================================
   DEFAULT PUBLIC TESTS

   These are used by Run.

   Submit can send hidden tests from NestJS.
========================================================= */

function getDefaultReactTests(
  problemSlug,
) {
  /* =======================================================
     REACT COUNTER
  ======================================================= */

  if (
    problemSlug ===
    'react-counter'
  ) {
    return [
      {
        type:
          'text',

        text:
          'Count: 0',
      },

      {
        type:
          'click',

        selector:
          'button',

        expectedText:
          'Count: 1',
      },
    ];
  }

  /* =======================================================
     SEARCH PRODUCTS

     Verifies:
     1. Products are rendered.
     2. Typing filters the product list.
     3. Filtering is case-insensitive.
  ======================================================= */

  if (
    problemSlug ===
    'react-search-products'
  ) {
    return [
      {
        type:
          'text',

        text:
          'Laptop',
      },

      {
        type:
          'input',

        selector:
          'input',

        value:
          'phone',

        expectedText:
          'Phone',

        absentText:
          'Laptop',
      },

      {
        type:
          'input',

        selector:
          'input',

        value:
          'HEAD',

        expectedText:
          'Headphones',

        absentText:
          'Phone',
      },
    ];
  }

  return [];
}

/* =========================================================
   RESOLVE TESTS
========================================================= */

function resolveReactTests(
  problemSlug,
  tests,
) {
  if (
    Array.isArray(
      tests,
    ) &&
    tests.length > 0
  ) {
    return tests;
  }

  return getDefaultReactTests(
    problemSlug,
  );
}

/* =========================================================
   CREATE TRUSTED TEST RUNNER

   This code executes INSIDE Docker.
========================================================= */

function createReactTestRunner(
  tests,
) {
  const serializedTests =
    JSON.stringify(
      tests,
    );

  const serializedMarker =
    JSON.stringify(
      RESULT_MARKER,
    );

  return `
const {
  writeFileSync
} =
  require('node:fs');

const esbuild =
  require('/runtime/node_modules/esbuild');

const {
  JSDOM
} =
  require('/runtime/node_modules/jsdom');

const React =
  require('/runtime/node_modules/react');

const ReactDOMClient =
  require('/runtime/node_modules/react-dom/client');

const tests =
  ${serializedTests};

const RESULT_MARKER =
  ${serializedMarker};

/* =========================================================
   CREATE BROWSER-LIKE TEST ENVIRONMENT
========================================================= */

const dom =
  new JSDOM(
    '<!doctype html><html><body><div id="root"></div></body></html>',
    {
      url:
        'http://localhost/'
    }
  );

globalThis.window =
  dom.window;

globalThis.document =
  dom.window.document;

Object.defineProperty(
  globalThis,
  'navigator',
  {
    value:
      dom.window.navigator,

    configurable:
      true
  }
);

globalThis.HTMLElement =
  dom.window.HTMLElement;

globalThis.Event =
  dom.window.Event;

globalThis.MouseEvent =
  dom.window.MouseEvent;

globalThis.IS_REACT_ACT_ENVIRONMENT =
  true;

/* =========================================================
   COMPILE APP.JSX FOR JSDOM TESTING
========================================================= */

function compileApp() {
  esbuild.buildSync({
    entryPoints: [
      '/workspace/App.jsx'
    ],

    bundle:
      true,

    platform:
      'node',

    format:
      'cjs',

    outfile:
      '/tmp/elab-react-app.cjs',

    jsx:
      'automatic',

    nodePaths: [
      '/runtime/node_modules'
    ],

    external: [
      'react',
      'react-dom',
      'react-dom/client'
    ],

    logLevel:
      'silent'
  });
}

/* =========================================================
   CREATE PREVIEW ENTRY

   This entry creates the actual browser version of
   the learner's React application.
========================================================= */

function createPreviewEntry() {
  const previewEntry = [
    "import React from 'react';",
    "import { createRoot } from 'react-dom/client';",
    "import App from '/workspace/App.jsx';",
    "",
    "const rootElement = document.getElementById('root');",
    "",
    "if (!rootElement) {",
    "  throw new Error('React preview root element was not found.');",
    "}",
    "",
    "const root = createRoot(rootElement);",
    "",
    "root.render(",
    "  React.createElement(App)",
    ");"
  ].join(
    '\\n'
  );

  writeFileSync(
    '/tmp/elab-react-preview-entry.jsx',
    previewEntry,
    'utf8'
  );
}

/* =========================================================
   BUILD INTERACTIVE BROWSER PREVIEW

   Output:
   complete HTML document

   This HTML will later be passed to Next.js and displayed
   inside a sandboxed iframe on the preview page.
========================================================= */

function buildPreviewHtml() {
  createPreviewEntry();

  const buildResult =
    esbuild.buildSync({
      entryPoints: [
        '/tmp/elab-react-preview-entry.jsx'
      ],

      bundle:
        true,

      write:
        false,

      platform:
        'browser',

      format:
        'iife',

      target: [
        'es2020'
      ],

      jsx:
        'automatic',

      nodePaths: [
        '/runtime/node_modules'
      ],

      define: {
        'process.env.NODE_ENV':
          '"production"'
      },

      loader: {
        '.png':
          'dataurl',

        '.jpg':
          'dataurl',

        '.jpeg':
          'dataurl',

        '.gif':
          'dataurl',

        '.svg':
          'dataurl',

        '.webp':
          'dataurl',

        '.woff':
          'dataurl',

        '.woff2':
          'dataurl'
      },

      outdir:
        '/tmp/elab-react-preview-dist',

      entryNames:
        'app',

      assetNames:
        'asset-[hash]',

      minify:
        true,

      sourcemap:
        false,

      logLevel:
        'silent'
    });

  const outputFiles =
    Array.isArray(
      buildResult.outputFiles
    )
      ? buildResult.outputFiles
      : [];

  const javascriptFile =
    outputFiles.find(
      (
        file
      ) =>
        file.path.endsWith(
          '.js'
        )
    );

  const cssFile =
    outputFiles.find(
      (
        file
      ) =>
        file.path.endsWith(
          '.css'
        )
    );

  if (
    !javascriptFile
  ) {
    throw new Error(
      'React preview bundle was not produced.'
    );
  }

  const javascriptBase64 =
    Buffer.from(
      javascriptFile.text,
      'utf8'
    ).toString(
      'base64'
    );

  const cssBase64 =
    cssFile
      ? Buffer.from(
          cssFile.text,
          'utf8'
        ).toString(
          'base64'
        )
      : '';

  const html = [
    '<!doctype html>',
    '<html>',
    '<head>',
    '  <meta charset="utf-8" />',
    '  <meta name="viewport" content="width=device-width, initial-scale=1" />',

    '  <meta',
    '    http-equiv="Content-Security-Policy"',
    '    content="default-src \\'none\\'; script-src data:; style-src data: \\'unsafe-inline\\'; img-src data: blob:; font-src data:; media-src data: blob:; connect-src \\'none\\'; object-src \\'none\\'; frame-src \\'none\\'; base-uri \\'none\\'; form-action \\'none\\';"',
    '  />',

    '  <style>',
    '    html, body, #root {',
    '      min-height: 100%;',
    '      margin: 0;',
    '    }',
    '',
    '    body {',
    '      background: #ffffff;',
    '      color: #111827;',
    '      font-family: Arial, Helvetica, sans-serif;',
    '    }',
    '  </style>',

    cssBase64
      ? '  <link rel="stylesheet" href="data:text/css;base64,' +
        cssBase64 +
        '" />'
      : '',

    '</head>',

    '<body>',

    '  <div id="root"></div>',

    '  <script src="data:text/javascript;base64,' +
      javascriptBase64 +
      '"></script>',

    '</body>',

    '</html>'
  ]
    .filter(
      Boolean
    )
    .join(
      '\\n'
    );

  return html;
}

/* =========================================================
   LOAD LEARNER COMPONENT FOR JSDOM TESTING
========================================================= */

function loadApp() {
  const learnerModule =
    require(
      '/tmp/elab-react-app.cjs'
    );

  const App =
    learnerModule.default ??
    learnerModule.App ??
    learnerModule;

  if (
    typeof App !==
    'function'
  ) {
    throw new Error(
      'App.jsx must export a React component as the default export.'
    );
  }

  return App;
}

/* =========================================================
   PAGE TEXT
========================================================= */

function getPageText() {
  return (
    document.body
      .textContent ??
    ''
  )
    .replace(
      /\\s+/g,
      ' '
    )
    .trim();
}

/* =========================================================
   TEXT TEST
========================================================= */

function runTextTest(
  test,
  index
) {
  const actual =
    getPageText();

  const expected =
    String(
      test.text ??
      ''
    );

  const passed =
    actual.includes(
      expected
    );

  return {
    testNumber:
      index + 1,

    type:
      'text',

    passed,

    expected,

    actual,

    message:
      passed
        ? 'Expected text was rendered.'
        : 'Expected text was not found.'
  };
}

/* =========================================================
   CLICK TEST
========================================================= */

async function runClickTest(
  test,
  index
) {
  const selector =
    String(
      test.selector ??
      ''
    );

  const element =
    document.querySelector(
      selector
    );

  if (
    !element
  ) {
    return {
      testNumber:
        index + 1,

      type:
        'click',

      passed:
        false,

      selector,

      message:
        'Target element was not found.'
    };
  }

  await React.act(
    async () => {
      element.dispatchEvent(
        new MouseEvent(
          'click',
          {
            bubbles:
              true,

            cancelable:
              true
          }
        )
      );

      await Promise.resolve();
    }
  );

  const actual =
    getPageText();

  const expected =
    String(
      test.expectedText ??
      ''
    );

  const passed =
    actual.includes(
      expected
    );

  return {
    testNumber:
      index + 1,

    type:
      'click',

    passed,

    selector,

    expected,

    actual,

    message:
      passed
        ? 'Click produced the expected UI.'
        : 'Expected UI was not found after the click.'
  };
}

/* =========================================================
   INPUT TEST

   Used for controlled React inputs such as:
   - search boxes
   - filters
   - text fields
========================================================= */

async function runInputTest(
  test,
  index
) {
  const selector =
    String(
      test.selector ??
      'input'
    );

  const element =
    document.querySelector(
      selector
    );

  if (
    !element
  ) {
    return {
      testNumber:
        index + 1,

      type:
        'input',

      passed:
        false,

      selector,

      message:
        'Input element was not found.'
    };
  }

  const value =
    String(
      test.value ??
      ''
    );

  await React.act(
    async () => {
      /*
       * React tracks controlled input values internally.
       * Using the native HTMLInputElement value setter makes
       * the subsequent input event behave like real typing.
       */

      const valueDescriptor =
        Object.getOwnPropertyDescriptor(
          dom.window.HTMLInputElement.prototype,
          'value'
        );

      if (
        valueDescriptor?.set
      ) {
        valueDescriptor.set.call(
          element,
          value
        );
      } else {
        element.value =
          value;
      }

      element.dispatchEvent(
        new Event(
          'input',
          {
            bubbles:
              true,

            cancelable:
              true
          }
        )
      );

      element.dispatchEvent(
        new Event(
          'change',
          {
            bubbles:
              true,

            cancelable:
              true
          }
        )
      );

      await Promise.resolve();
    }
  );

  const actual =
    getPageText();

  const expected =
    String(
      test.expectedText ??
      ''
    );

  const absentText =
    typeof test.absentText ===
      'string'
      ? test.absentText
      : '';

  const expectedFound =
    !expected ||
    actual.includes(
      expected
    );

  const absentTextRemoved =
    !absentText ||
    !actual.includes(
      absentText
    );

  const passed =
    expectedFound &&
    absentTextRemoved;

  return {
    testNumber:
      index + 1,

    type:
      'input',

    passed,

    selector,

    value,

    expected,

    absentText,

    actual,

    message:
      passed
        ? 'Filtering produced the expected product list.'
        : 'Product filtering did not produce the expected result.'
  };
}

/* =========================================================
   EXECUTE TEST
========================================================= */

async function executeTest(
  test,
  index
) {
  if (
    test.type ===
    'text'
  ) {
    return runTextTest(
      test,
      index
    );
  }

  if (
    test.type ===
    'click'
  ) {
    return await runClickTest(
      test,
      index
    );
  }

  if (
    test.type ===
    'input'
  ) {
    return await runInputTest(
      test,
      index
    );
  }

  return {
    testNumber:
      index + 1,

    passed:
      false,

    type:
      String(
        test.type ??
        'unknown'
      ),

    message:
      'Unsupported React test type.'
  };
}

/* =========================================================
   MAIN
========================================================= */

async function main() {
  let root = null;

  /*
   * Preview generation must NOT affect Judge correctness.
   *
   * If preview generation fails, React tests must still run.
   */

  let previewHtml =
    null;

  let previewError =
    null;

  try {
    if (
      !Array.isArray(
        tests
      ) ||
      tests.length ===
        0
    ) {
      console.error(
        'No React tests were provided.'
      );

      process.exitCode =
        30;

      return;
    }

    /* =====================================================
       COMPILE JSX FOR TESTING
    ===================================================== */

    compileApp();

    /* =====================================================
       BUILD WEB PAGE PREVIEW
    ===================================================== */

    try {
      previewHtml =
        buildPreviewHtml();
    } catch (
      error
    ) {
      previewError =
        error instanceof Error
          ? error.message
          : String(
              error
            );
    }

    /* =====================================================
       LOAD COMPONENT
    ===================================================== */

    const App =
      loadApp();

    const container =
      document.getElementById(
        'root'
      );

    /* =====================================================
       RENDER
    ===================================================== */

    root =
      ReactDOMClient.createRoot(
        container
      );

    await React.act(
      async () => {
        root.render(
          React.createElement(
            App
          )
        );

        await Promise.resolve();
      }
    );

    /* =====================================================
       RUN TESTS
    ===================================================== */

    const results = [];

    for (
      let index = 0;
      index < tests.length;
      index += 1
    ) {
      const result =
        await executeTest(
          tests[index],
          index
        );

      results.push(
        result
      );
    }

    /* =====================================================
       CALCULATE RESULT
    ===================================================== */

    const passedTests =
      results.filter(
        (
          result
        ) =>
          result.passed ===
          true
      ).length;

    const totalTests =
      results.length;

    const allPassed =
      totalTests > 0 &&
      passedTests ===
        totalTests;

    /* =====================================================
       RETURN RESULT TO HOST JUDGE
    ===================================================== */

    console.log(
      RESULT_MARKER +
      JSON.stringify({
        passed:
          allPassed,

        passedTests,

        totalTests,

        results,

        previewHtml,

        previewError
      })
    );

    if (
      !allPassed
    ) {
      process.exitCode =
        10;
    }
  } catch (
    error
  ) {
    console.error(
      error instanceof Error
        ? error.stack
        : String(error)
    );

    process.exitCode =
      20;
  } finally {
    if (
      root
    ) {
      try {
        await React.act(
          async () => {
            root.unmount();

            await Promise.resolve();
          }
        );
      } catch {
        // Ignore cleanup errors.
      }
    }

    dom.window.close();
  }
}

main();
`;
}

/* =========================================================
   PARSE RESULT
========================================================= */

function parseReactResult(
  stdout,
) {
  const text =
    String(
      stdout ??
      '',
    );

  const lines =
    text.split(
      /\r?\n/,
    );

  for (
    let index =
      lines.length - 1;
    index >= 0;
    index -= 1
  ) {
    const line =
      lines[
        index
      ];

    if (
      !line.startsWith(
        RESULT_MARKER,
      )
    ) {
      continue;
    }

    const payload =
      line.slice(
        RESULT_MARKER.length,
      );

    try {
      return JSON.parse(
        payload,
      );
    } catch {
      return null;
    }
  }

  return null;
}

/* =========================================================
   CLEAN STDOUT
========================================================= */

function cleanOutput(
  stdout,
) {
  return String(
    stdout ??
    '',
  )
    .split(
      /\r?\n/,
    )
    .filter(
      (
        line,
      ) =>
        !line.startsWith(
          RESULT_MARKER,
        ),
    )
    .join(
      '\n',
    )
    .trim();
}

/* =========================================================
   RUN REACT FRAMEWORK
========================================================= */

export async function runReactFramework({
  problemSlug,
  files,
  tests,
}) {
  /* =======================================================
     VALIDATE FILES
  ======================================================= */

  if (
    !Array.isArray(
      files,
    ) ||
    files.length ===
      0
  ) {
    return {
      runtime:
        'react',

      status:
        'INVALID_REQUEST',

      message:
        'At least one React source file is required.',

      testResults: [],
    };
  }

  /* =======================================================
     RESOLVE TESTS
  ======================================================= */

  const resolvedTests =
    resolveReactTests(
      problemSlug,
      tests,
    );

  if (
    resolvedTests.length ===
    0
  ) {
    return {
      runtime:
        'react',

      status:
        'INVALID_REQUEST',

      message:
        `No React tests configured for ${problemSlug}.`,

      testResults: [],
    };
  }

  /* =======================================================
     TEMP WORKSPACE
  ======================================================= */

  const tempDirectory =
    await mkdtemp(
      join(
        tmpdir(),
        'elab-react-',
      ),
    );

  try {
    /* =====================================================
       WRITE LEARNER FILES
    ===================================================== */

    await writeReactFiles(
      tempDirectory,
      files,
    );

    /* =====================================================
       WRITE TRUSTED RUNNER
    ===================================================== */

    const runnerCode =
      createReactTestRunner(
        resolvedTests,
      );

    await writeFile(
      join(
        tempDirectory,
        '__elab_react_runner.cjs',
      ),
      runnerCode,
      'utf8',
    );

    /* =====================================================
       DOCKER
    ===================================================== */

    const dockerArgs = [
      'run',

      '--rm',

      '--network',
      'none',

      '--memory',
      '384m',

      '--memory-swap',
      '384m',

      '--cpus',
      '0.5',

      '--pids-limit',
      '64',

      '--cap-drop',
      'ALL',

      '--security-opt',
      'no-new-privileges',

      '--read-only',

      '--tmpfs',
      '/tmp:rw,exec,nosuid,nodev,size=128m',

      '--mount',

      `type=bind,source=${tempDirectory},target=/workspace,readonly`,

      REACT_IMAGE,

      'node',

      '/workspace/__elab_react_runner.cjs',
    ];

    try {
      const {
        stdout,
        stderr,
      } =
        await execFileAsync(
          'docker',
          dockerArgs,
          {
            timeout:
              15_000,

            /*
             * previewHtml contains bundled React code.
             * Therefore stdout can be much larger than
             * ordinary Judge output.
             */
            maxBuffer:
              5 *
              1024 *
              1024,
          },
        );

      const result =
        parseReactResult(
          stdout,
        );

      const output =
        cleanOutput(
          stdout,
        );

      if (
        !result
      ) {
        return {
          runtime:
            'react',

          status:
            'RUNTIME_ERROR',

          output,

          stderr:
            stderr.trim(),

          message:
            'React Judge did not produce a valid test result.',

          testResults: [],
        };
      }

      /* ===================================================
         SUCCESS
      =================================================== */

      return {
        runtime:
          'react',

        status:
          result.passed
            ? 'SUCCESS'
            : 'TEST_FAILED',

        output,

        stderr:
          stderr.trim(),

        passedTests:
          result.passedTests,

        totalTests:
          result.totalTests,

        testResults:
          Array.isArray(
            result.results,
          )
            ? result.results
            : [],

        previewHtml:
          typeof result.previewHtml ===
          'string'
            ? result.previewHtml
            : null,

        previewError:
          typeof result.previewError ===
          'string'
            ? result.previewError
            : null,
      };
    } catch (
      error
    ) {
      /* ===================================================
         TIMEOUT
      =================================================== */

      if (
        error?.killed ||
        error?.signal ===
          'SIGTERM'
      ) {
        return {
          runtime:
            'react',

          status:
            'TIME_LIMIT_EXCEEDED',

          output:
            cleanOutput(
              error?.stdout ??
              '',
            ),

          stderr:
            String(
              error?.stderr ??
              '',
            ).trim(),

          message:
            'React execution exceeded the time limit.',

          testResults: [],
        };
      }

      const exitCode =
        typeof error?.code ===
        'number'
          ? error.code
          : null;

      const stdout =
        String(
          error?.stdout ??
          '',
        );

      const stderr =
        String(
          error?.stderr ??
          '',
        ).trim();

      const result =
        parseReactResult(
          stdout,
        );

      const output =
        cleanOutput(
          stdout,
        );

      /* ===================================================
         TEST FAILURE
      =================================================== */

      if (
        exitCode ===
        10
      ) {
        return {
          runtime:
            'react',

          status:
            'TEST_FAILED',

          output,

          stderr,

          passedTests:
            result
              ?.passedTests ??
            0,

          totalTests:
            result
              ?.totalTests ??
            resolvedTests.length,

          testResults:
            Array.isArray(
              result?.results,
            )
              ? result.results
              : [],

          previewHtml:
            typeof result?.previewHtml ===
            'string'
              ? result.previewHtml
              : null,

          previewError:
            typeof result?.previewError ===
            'string'
              ? result.previewError
              : null,
        };
      }

      /* ===================================================
         BUILD / RENDER ERROR
      =================================================== */

      if (
        exitCode ===
        20
      ) {
        return {
          runtime:
            'react',

          status:
            'BUILD_ERROR',

          output,

          stderr,

          message:
            'React component could not be compiled or rendered.',

          testResults: [],
        };
      }

      /* ===================================================
         NO TESTS
      =================================================== */

      if (
        exitCode ===
        30
      ) {
        return {
          runtime:
            'react',

          status:
            'INVALID_REQUEST',

          output,

          stderr,

          message:
            `No React tests configured for ${problemSlug}.`,

          testResults: [],
        };
      }

      /* ===================================================
         OTHER ERROR
      =================================================== */

      return {
        runtime:
          'react',

        status:
          'RUNTIME_ERROR',

        output,

        stderr,

        message:
          'React application execution failed.',

        testResults: [],
      };
    }
  } finally {
    await rm(
      tempDirectory,
      {
        recursive:
          true,

        force:
          true,
      },
    );
  }
}