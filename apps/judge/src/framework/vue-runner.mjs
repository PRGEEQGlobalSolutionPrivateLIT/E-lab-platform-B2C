import { execFile } from 'node:child_process';



import {



  mkdtemp,



  mkdir,



  readFile,



  rm,



  writeFile,



} from 'node:fs/promises';



import { tmpdir } from 'node:os';



import {



  join,



  dirname,



  normalize,



  relative,



  resolve,



  sep,



} from 'node:path';



import { promisify } from 'node:util';







const execFileAsync = promisify(execFile);







const VUE_IMAGE =



  process.env.VUE_IMAGE ||



  'elab-judge-vue:latest';







const EXECUTION_TIMEOUT_MS = Number(



  process.env.VUE_EXECUTION_TIMEOUT_MS ||



    30000,



);







const MEMORY_LIMIT =



  process.env.VUE_MEMORY_LIMIT ||



  '512m';







const CPU_LIMIT =



  process.env.VUE_CPU_LIMIT ||



  '1.0';







const PIDS_LIMIT =



  process.env.VUE_PIDS_LIMIT ||



  '128';







const MAX_BUFFER =



  10 * 1024 * 1024;







function normalizeOutput(value) {



  return String(value ?? '')



    .replace(/\r\n/g, '\n')



    .trim();



}







function safeRelativePath(filePath) {
  const normalized = normalize(
    String(filePath ?? ''),
  ).replace(
    /\\/g,
    '/',
  );

  if (
    !normalized ||
    normalized === '.' ||
    normalized.startsWith('/') ||
    normalized.includes('../') ||
    normalized === '..'
  ) {
    throw new Error(
      `Invalid Vue workspace file path: ${filePath}`,
    );
  }

  return normalized;
}

function isPathInside(



  parentPath,



  childPath,



) {



  const relativePath = relative(



    parentPath,



    childPath,



  );







  return (



    relativePath === '' ||



    (



      !relativePath.startsWith('..') &&



      !relativePath.startsWith(sep)



    )



  );



}







async function fileExists(filePath) {



  try {



    await readFile(



      filePath,



      'utf8',



    );







    return true;



  } catch {



    return false;



  }



}







async function writeWorkspaceFiles({



  workspacePath,



  files,



}) {



  for (const file of files) {



    const relativePath =



      safeRelativePath(



        file?.path,



      );







    const targetPath = resolve(



      workspacePath,



      relativePath,



    );







    if (



      !isPathInside(



        workspacePath,



        targetPath,



      )



    ) {



      throw new Error(



        `Invalid Vue workspace file path: ${relativePath}`,



      );



    }







    await mkdir(



      dirname(targetPath),



      {



        recursive: true,



      },



    );







    await writeFile(



      targetPath,



      String(



        file?.content ?? '',



      ),



      'utf8',



    );



  }



}







async function ensureVueProjectFiles(



  workspacePath,



) {



  const packageJsonPath = join(



    workspacePath,



    'package.json',



  );







  const viteConfigMjsPath = join(



    workspacePath,



    'vite.config.mjs',



  );







  const oldViteConfigJsPath = join(



    workspacePath,



    'vite.config.js',



  );







  const indexHtmlPath = join(



    workspacePath,



    'index.html',



  );







  const mainJsPath = join(



    workspacePath,



    'src',



    'main.js',



  );







  const appVuePath = join(



    workspacePath,



    'src',



    'App.vue',



  );







  await mkdir(



    join(



      workspacePath,



      'src',



    ),



    {



      recursive: true,



    },



  );







  if (



    !(await fileExists(



      packageJsonPath,



    ))



  ) {



    await writeFile(



      packageJsonPath,



      JSON.stringify(



        {



          name:



            'elab-vue-workspace',



          private: true,



          version:



            '1.0.0',



          type:



            'module',



          scripts: {



            build:



              'vite build',



          },



          dependencies: {



            '@vitejs/plugin-vue':



              '^6.0.0',



            vite:



              '^8.0.0',



            vue:



              '^3.5.0',



          },



        },



        null,



        2,



      ),



      'utf8',



    );



  }







  /*



   * Remove an old vite.config.js generated



   * by an earlier version of the runner.



   *



   * Using vite.config.mjs prevents the



   * CommonJS/ESM warning from Vite.



   */



  await rm(



    oldViteConfigJsPath,



    {



      force: true,



    },



  );







  if (



    !(await fileExists(



      viteConfigMjsPath,



    ))



  ) {



    await writeFile(



      viteConfigMjsPath,



      `import { defineConfig } from 'vite';



import vue from '@vitejs/plugin-vue';







export default defineConfig({



  plugins: [



    vue(),



  ],



});



`,



      'utf8',



    );



  }







  if (



    !(await fileExists(



      indexHtmlPath,



    ))



  ) {



    await writeFile(



      indexHtmlPath,



      `<!doctype html>



<html lang="en">



  <head>



    <meta charset="UTF-8" />



    <meta



      name="viewport"



      content="width=device-width, initial-scale=1.0"



    />



    <title>Vue E-Lab</title>



  </head>



  <body>



    <div id="app"></div>







    <script



      type="module"



      src="/src/main.js"



    ></script>



  </body>



</html>



`,



      'utf8',



    );



  }







  if (



    !(await fileExists(



      mainJsPath,



    ))



  ) {



    await writeFile(



      mainJsPath,



      `import { createApp } from 'vue';



import App from './App.vue';







createApp(App).mount('#app');



`,



      'utf8',



    );



  }







  if (



    !(await fileExists(



      appVuePath,



    ))



  ) {



    await writeFile(



      appVuePath,



      `<template>



  <h1>Hello, World!</h1>



</template>



`,



      'utf8',



    );



  }



}







const RENDER_MARKER = '__ELAB_VUE_RENDER__';

const RENDER_SCRIPT = [
  "import { readdirSync } from 'node:fs';",
  "import { createSSRApp } from 'vue';",
  "import { renderToString } from 'vue/server-renderer';",
  "const dir = '/workspace/.elab-ssr';",
  'const names = readdirSync(dir);',
  'const entry = names.find((name) => /^App\\.m?js$/.test(name)) ?? names.find((name) => /\\.m?js$/.test(name));',
  "const mod = await import(dir + '/' + entry);",
  'const html = await renderToString(createSSRApp(mod.default));',
  `process.stdout.write('\\n${RENDER_MARKER}' + JSON.stringify(html) + '\\n');`,
  '',
].join('\n');

const RENDER_STEPS = [
  'rm -rf /workspace/.elab-ssr',
  '/opt/vue/node_modules/.bin/vite build --ssr src/App.vue --outDir .elab-ssr --emptyOutDir --logLevel error',
  'printf \'{"type":"module"}\' > /workspace/.elab-ssr/package.json',
  'node /workspace/.elab-render.mjs',
];

function readRenderedHtml(stdout) {
  const line = String(stdout ?? '')
    .split(/\r?\n/)
    .find((entry) => entry.startsWith(RENDER_MARKER));
  if (!line) return null;
  try {
    return JSON.parse(line.slice(RENDER_MARKER.length));
  } catch {
    return null;
  }
}

function withoutRenderMarker(stdout) {
  return String(stdout ?? '')
    .split(/\r?\n/)
    .filter((entry) => !entry.startsWith(RENDER_MARKER))
    .join('\n');
}

const collapseWhitespace = (value) => String(value ?? '').replace(/\s+/g, ' ').trim();

function createDockerArgs(
  workspacePath,
  renderForTests = false,
) {
  const dockerWorkspace =
    workspacePath.replace(
      /\\/g,
      '/',
    );

  const buildCommand = [
    'set -e',
    'export HOME=/tmp',
    'export npm_config_cache=/tmp/npm-cache',
    'rm -rf /workspace/node_modules',
    'ln -s /opt/vue/node_modules /workspace/node_modules',
    '/opt/vue/node_modules/.bin/vite build',
  ...(renderForTests ? RENDER_STEPS : []),
  ].join(' && ');

  return [
    'run',
    '--rm',
    '--network',
    'none',
    '--memory',
    MEMORY_LIMIT,
    '--cpus',
    CPU_LIMIT,
    '--pids-limit',
    PIDS_LIMIT,
    '--cap-drop',
    'ALL',
    '--security-opt',
    'no-new-privileges',
    '--tmpfs',
    '/tmp:rw,nosuid,nodev,size=256m',
    '--mount',
    `type=bind,source=${dockerWorkspace},target=/workspace`,
    '--workdir',
    '/workspace',
    VUE_IMAGE,
    'sh',
    '-lc',
    buildCommand,
  ];
}

function getErrorText(error) {



  const stdout =



    normalizeOutput(



      error?.stdout,



    );







  const stderr =



    normalizeOutput(



      error?.stderr,



    );







  return [



    stdout,



    stderr,



  ]



    .filter(Boolean)



    .join('\n');



}







function stripHtmlTags(value) {
  return normalizeOutput(
    String(value ?? '')
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/&amp;/gi, '&')
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'")
      .replace(/\s+/g, ' '),
  );
}

function extractVueTemplate(source) {
  const match = String(source ?? '').match(
    /<template\b[^>]*>([\s\S]*?)<\/template>/i,
  );

  return match
    ? match[1]
    : '';
}

function extractRenderedText(files) {
  const workspaceFiles =
    Array.isArray(files)
      ? files
      : [];

  const appFile =
    workspaceFiles.find((file) =>
      String(file?.path ?? '')
        .replace(/\\/g, '/')
        .toLowerCase()
        .endsWith('src/app.vue'),
    ) ??
    workspaceFiles.find((file) =>
      String(file?.path ?? '')
        .toLowerCase()
        .endsWith('.vue'),
    );

  if (!appFile) {
    return '';
  }

  return stripHtmlTags(
    extractVueTemplate(
      appFile.content,
    ),
  );
}

function getExpectedOutput(test) {

  return normalizeOutput(

    test?.expectedOutput ??

    test?.expected ??

    test?.output ??

    '',

  );

}



function buildTestResults(

  tests,

  actualOutput,

) {

  const normalizedActual =

    normalizeOutput(

      actualOutput,

    );



  return (

    Array.isArray(tests)

      ? tests

      : []

  ).map((test, index) => {

    const expectedOutput =

      getExpectedOutput(test);



    const passed =
      actualOutput !== null &&
      Boolean(expectedOutput) &&
      collapseWhitespace(normalizedActual) === collapseWhitespace(expectedOutput);



    return {

      id:

        test?.id ??

        `test-${index + 1}`,

      testNumber:

        index + 1,

      name:

        test?.title ??

        test?.name ??

        `Test ${index + 1}`,

      type:

        test?.type ??

        'text',

      passed,

      expected:

        expectedOutput,

      actual:

        normalizedActual,

      expectedOutput,

      actualOutput:

        normalizedActual,

      message:

        passed

          ? 'Passed'

          : 'Rendered output does not match the expected output.',

    };

  });

}



export async function runVueFramework({



  problemSlug,



  files,



  tests = [],



}) {



  const workspaceFiles =



    Array.isArray(files)



      ? files



      : [];







  if (



    workspaceFiles.length ===



    0



  ) {



    return {



      runtime: 'vue',



      problemSlug,



      status:



        'INVALID_REQUEST',



      output: '',



      stderr:



        'Vue workspace does not contain any files.',



      message:



        'Vue workspace does not contain any files.',



      exitCode: 1,



      tests: [],



      testResults: [],



      passedTests: 0,



      totalTests: 0,



    };



  }







  const tempRoot =



    await mkdtemp(



      join(



        tmpdir(),



        'elab-vue-',



      ),



    );







  const workspacePath =



    join(



      tempRoot,



      'workspace',



    );







  try {



    await mkdir(



      workspacePath,



      {



        recursive: true,



      },



    );







    await writeWorkspaceFiles({



      workspacePath,



      files:



        workspaceFiles,



    });







    await ensureVueProjectFiles(



      workspacePath,



    );







    const renderForTests = Array.isArray(tests) && tests.length > 0;

    if (renderForTests) {
      await writeFile(join(workspacePath, '.elab-render.mjs'), RENDER_SCRIPT, 'utf8');
    }

    const dockerArgs = createDockerArgs(workspacePath, renderForTests);







    const {



      stdout,



      stderr,



    } = await execFileAsync(



      'docker',



      dockerArgs,



      {



        timeout:



          EXECUTION_TIMEOUT_MS,







        maxBuffer:



          MAX_BUFFER,







        windowsHide:



          true,



      },



    );







    const buildOutput = normalizeOutput(withoutRenderMarker(stdout));



    const errorOutput =

      normalizeOutput(

        stderr,

      );



    const renderedHtml = readRenderedHtml(stdout);

    const renderedOutput = renderedHtml === null ? null : stripHtmlTags(renderedHtml);



    const testResults =

      buildTestResults(

        tests,

        renderedOutput,

      );



    const passedTests =

      testResults.filter(

        (test) =>

          test.passed === true,

      ).length;



    const totalTests =

      testResults.length;



    const testsPassed =

      totalTests === 0 ||

      passedTests === totalTests;



    return {

      runtime: 'vue',

      problemSlug,

      status:

        testsPassed

          ? 'SUCCESS'

          : 'TEST_FAILURE',

      output:

        renderedOutput ||

        'Vue project built successfully.',

      stdout:

        buildOutput,

      stderr:

        errorOutput,

      message:

        testsPassed

          ? 'Vue.js execution successful.'

          : `${passedTests}/${totalTests} Vue test(s) passed.`,

      exitCode:

        testsPassed

          ? 0

          : 1,

      tests:

        testResults,

      testResults,

      passedTests,

      totalTests,

    };

  } catch (error) {



    const timedOut =



      error?.killed === true ||



      error?.code ===



        'ETIMEDOUT' ||



      error?.signal ===



        'SIGTERM';







    const errorText =



      getErrorText(



        error,



      );







    return {



      runtime: 'vue',



      problemSlug,







      status:



        timedOut



          ? 'TIME_LIMIT_EXCEEDED'



          : 'BUILD_ERROR',







      output: '',







      stderr:



        errorText ||



        error?.message ||



        'Vue execution failed.',







      message:



        timedOut



          ? 'The Vue application exceeded the execution time limit.'



          : (



              errorText ||



              error?.message ||



              'Vue build failed.'



            ),







      exitCode:



        typeof error?.code ===



        'number'



          ? error.code



          : 1,







      tests: [],



      testResults: [],



      passedTests: 0,



      totalTests: 0,



    };



  } finally {



    await rm(



      tempRoot,



      {



        recursive: true,



        force: true,



      },



    );



  }



}







export default runVueFramework;