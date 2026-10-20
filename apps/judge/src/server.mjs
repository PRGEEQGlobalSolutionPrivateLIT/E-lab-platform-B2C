import http from 'node:http';
import {
  execFile,
} from 'node:child_process';
import {
  mkdir,
  rm,
  writeFile,
} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {
  runExpressFramework,
} from './framework/express-runner.mjs';
import {
  runReactFramework,
} from './framework/react-runner.mjs';
import {
  runVueFramework,
} from './framework/vue-runner.mjs';
import {
  runAngularFramework,
} from './framework/angular-runner.mjs';
import {
  runNextJsFramework,
} from './framework/nextjs-runner.mjs';
import {
  runNestJsFramework,
} from './framework/nestjs-runner.mjs';
import {
  runDjangoFramework,
} from './framework/django-runner.mjs';
import {
  runFastApiFramework,
} from './framework/fastapi-runner.mjs';
import {
  runSpringBootFramework,
} from './framework/springboot-runner.mjs';
import {
  runAspNetCoreFramework,
} from './framework/aspnetcore-runner.mjs';
/* =========================================================
   CONFIG
\========================================================= */
const PORT =
  Number(
    process.env.JUDGE_PORT ??
      4100,
  );
const C_IMAGE =
  'elab-judge-c:latest';
const CPP_IMAGE =
  'elab-judge-cpp:latest';
const NODE_IMAGE =
  'elab-judge-node:latest';
const TYPESCRIPT_IMAGE =
  'elab-judge-typescript:latest';
const PYTHON_IMAGE =
  'elab-judge-python:latest';
const PYTHON_ANALYTICS_IMAGE =
  'elab-judge-python-analytics:latest';
const PYTHON_ML_IMAGE =
  'elab-judge-python-ml:latest';
const PYSPARK_IMAGE =
  'elab-judge-pyspark:1.0';
const JAVA_IMAGE =
  'elab-judge-java:latest';
const CSHARP_IMAGE =
  'elab-judge-csharp:latest';
const PHP_IMAGE =
  'elab-judge-php:latest';
const RUBY_IMAGE =
  'elab-judge-ruby:latest';
const SWIFT_IMAGE =
  'elab-judge-swift:latest';
const GO_IMAGE =
  'elab-judge-go:latest';
/* =========================================================
   FRAMEWORK CONFIG
\========================================================= */
const SUPPORTED_FRAMEWORK_RUNTIMES = [
  'express',
  'react',
  'vue',
  'angular',
  'nextjs',
  'nestjs',
  'django',
  'fastapi',
  'springboot',
  'aspnetcore',
];
/* =========================================================
   LANGUAGE CONFIG
   One shared execution engine.
   C:
   gcc → executable
   C++:
   g++ → executable
   JavaScript / Node.js:
   node --check → node
   TypeScript:
   tsc → JavaScript → node
   Python:
   syntax check → python
\========================================================= */
const LANGUAGE_CONFIG = {
  /* =======================================================
     C
  ======================================================= */
  c: {
    image:
      C_IMAGE,
    sourceFile:
      'main.c',
    compileCommand:
      'gcc /workspace/main.c -O2 -std=c17 -Wall -Wextra -o /tmp/main',
    prepareCommand:
      'chmod 700 /tmp/main',
    runCommand:
      '/tmp/main',
    memory:
      '128m',
    tmpSize:
      '64m',
  },
  /* =======================================================
     C++
  ======================================================= */
  cpp: {
    image:
      CPP_IMAGE,
    sourceFile:
      'main.cpp',
    compileCommand:
      'g++ /workspace/main.cpp -O2 -std=c++20 -Wall -Wextra -o /tmp/main',
    prepareCommand:
      'chmod 700 /tmp/main',
    runCommand:
      '/tmp/main',
    memory:
      '128m',
    tmpSize:
      '64m',
  },
  /* =======================================================
     JAVASCRIPT / NODE.JS
  ======================================================= */
  javascript: {
    image:
      NODE_IMAGE,
    sourceFile:
      'main.js',
    compileCommand:
      'node --check /workspace/main.js',
    prepareCommand:
      '',
    runCommand:
      'node /workspace/main.js',
    memory:
      '128m',
    tmpSize:
      '64m',
  },
  /* =======================================================
     TYPESCRIPT
  ======================================================= */
  typescript: {
    image:
      TYPESCRIPT_IMAGE,
    sourceFile:
      'main.ts',
    /*
     * Compile learner TypeScript inside the sandbox.
     *
     * The TypeScript runtime image must contain:
     * - node
     * - typescript / tsc
     * - @types/node
     *
     * Output is written only to /tmp because the learner
     * workspace is mounted read-only.
     */
    compileCommand:
      'tsc /workspace/main.ts --target ES2022 --module commonjs --moduleResolution node --strict --skipLibCheck --esModuleInterop --types node --typeRoots /usr/local/lib/node_modules/@types --lib ES2022 --outDir /tmp/ts-build --pretty false',
    prepareCommand:
      '',
    runCommand:
      'node /tmp/ts-build/main.js',
    memory:
      '256m',
    tmpSize:
      '96m',
  },
  /* =======================================================
     PYTHON
  ======================================================= */
  python: {
    image:
      PYTHON_IMAGE,
    sourceFile:
      'main.py',
    /*
     * Validate learner Python syntax inside the sandbox.
     * PYTHONPYCACHEPREFIX sends generated bytecode to /tmp
     * because the learner workspace is mounted read-only.
     */
    compileCommand:
      'PYTHONPYCACHEPREFIX=/tmp/pycache python -m py_compile /workspace/main.py',
    prepareCommand:
      '',
    runCommand:
      'python /workspace/main.py',
    memory:
      '128m',
    tmpSize:
      '64m',
  },
  /* =======================================================
     PYTHON DATA ANALYTICS
  ======================================================= */
  'python-data-analytics': {
    image:
      PYTHON_ANALYTICS_IMAGE,
    sourceFile:
      'main.py',
    compileCommand:
      'PYTHONPYCACHEPREFIX=/tmp/pycache python -m py_compile /workspace/main.py',
    prepareCommand:
      '',
    runCommand:
      'python /workspace/main.py',
    memory:
      '512m',
    tmpSize:
      '256m',
  },
  /* =======================================================
     PYTHON MACHINE LEARNING
  ======================================================= */
  'python-machine-learning': {
    image:
      PYTHON_ML_IMAGE,
    sourceFile:
      'main.py',
    compileCommand:
      'PYTHONPYCACHEPREFIX=/tmp/pycache python -m py_compile /workspace/main.py',
    prepareCommand:
      '',
    runCommand:
      'python /workspace/main.py',
    memory:
      '768m',
    tmpSize:
      '256m',
  },
  /* =======================================================
     JAVA
  ======================================================= */
  /* =======================================================
     PYTHON SPARK / PYSPARK 3.5
  ======================================================= */
  pyspark: {
    image: PYSPARK_IMAGE,
    sourceFile: 'main.py',
    compileCommand:
      'PYTHONPYCACHEPREFIX=/tmp/pycache python -m py_compile /workspace/main.py',
    prepareCommand: '',
    runCommand:
      'env SPARK_LOCAL_IP=127.0.0.1 SPARK_LOCAL_HOSTNAME=localhost SPARK_LOCAL_DIRS=/tmp/spark-local PYSPARK_PYTHON=python python /workspace/main.py',
    memory: '2g',
    tmpSize: '512m',
  },
  java: {
    image:
      JAVA_IMAGE,
    sourceFile:
      'Main.java',
    /*
     * Compile learner Java source inside the sandbox.
     *
     * Class files are written to /tmp because the learner
     * workspace is mounted read-only.
     */
    compileCommand:
      'mkdir -p /tmp/java-build && javac -encoding UTF-8 -d /tmp/java-build /workspace/Main.java',
    prepareCommand:
      '',
    runCommand:
      'java -cp /tmp/java-build Main',
    memory:
      '256m',
    tmpSize:
      '64m',
  },
  /* =======================================================
     C#
  ======================================================= */
  csharp: {
    image:
      CSHARP_IMAGE,
    sourceFile:
      'Program.cs',
    /*
     * Compile learner C# source inside the sandbox.
     *
     * Roslyn writes the executable assembly and supporting
     * files to /tmp because /workspace is mounted read-only.
     *
     * csc.dll is resolved from the installed .NET SDK so the
     * learner does not need a project file or NuGet restore.
     */
    compileCommand:
      'CSC_DLL=$(find /usr/share/dotnet/sdk -path "*/Roslyn/bincore/csc.dll" | sort -V | tail -n 1) && test -n "$CSC_DLL" && dotnet "$CSC_DLL" -nologo -target:exe -out:/tmp/Program.dll -r:/usr/share/dotnet/shared/Microsoft.NETCore.App/$(ls /usr/share/dotnet/shared/Microsoft.NETCore.App | sort -V | tail -n 1)/System.Private.CoreLib.dll -r:/usr/share/dotnet/shared/Microsoft.NETCore.App/$(ls /usr/share/dotnet/shared/Microsoft.NETCore.App | sort -V | tail -n 1)/System.Runtime.dll -r:/usr/share/dotnet/shared/Microsoft.NETCore.App/$(ls /usr/share/dotnet/shared/Microsoft.NETCore.App | sort -V | tail -n 1)/System.Console.dll /workspace/Program.cs',
    prepareCommand:
      `RUNTIME_VERSION=$(ls /usr/share/dotnet/shared/Microsoft.NETCore.App | sort -V | tail -n 1) && printf '%s' '{"runtimeOptions":{"tfm":"net8.0","framework":{"name":"Microsoft.NETCore.App","version":"'"$RUNTIME_VERSION"'"}}}' > /tmp/Program.runtimeconfig.json`,
    runCommand:
      'dotnet /tmp/Program.dll',
    memory:
      '256m',
    tmpSize:
      '96m',
  },
  /* =======================================================
     PHP
  ======================================================= */
  php: {
    image:
      PHP_IMAGE,
    sourceFile:
      'main.php',
    compileCommand:
      'php -l /workspace/main.php',
    prepareCommand:
      '',
    runCommand:
      'php /workspace/main.php',
    memory:
      '128m',
    tmpSize:
      '64m',
  },
  /* =======================================================
     RUBY
  ======================================================= */
  ruby: {
    image:
      RUBY_IMAGE,
    sourceFile:
      'main.rb',
    compileCommand:
      'ruby -c /workspace/main.rb',
    prepareCommand:
      '',
    runCommand:
      'ruby /workspace/main.rb',
    memory:
      '128m',
    tmpSize:
      '64m',
  },
  /* =======================================================
     SWIFT
  ======================================================= */
  go: {
    image: GO_IMAGE,
    sourceFile: 'main.go',
    compileCommand:
      'cp -r /opt/go-cache /tmp/go-cache && cd /tmp && GOCACHE=/tmp/go-cache HOME=/tmp go build -p 1 -o /tmp/main /workspace/main.go',
    prepareCommand: 'chmod 700 /tmp/main',
    runCommand: '/tmp/main',
    memory: '512m',
    tmpSize: '256m',
  },
  swift: {
    image:
      SWIFT_IMAGE,
    sourceFile:
      'main.swift',
    compileCommand:
      'mkdir -p /tmp/swift-cache /tmp/clang-module-cache && HOME=/tmp SWIFT_MODULECACHE_PATH=/tmp/swift-cache CLANG_MODULE_CACHE_PATH=/tmp/clang-module-cache swiftc /workspace/main.swift -O -module-cache-path /tmp/clang-module-cache -o /tmp/main',
    prepareCommand:
      'chmod 700 /tmp/main',
    runCommand:
      '/tmp/main',
    memory:
      '256m',
    tmpSize:
      '128m',
  },
};
/* =========================================================
   AWS PRACTICE — SERVER-OWNED HIDDEN TESTS
   Offline Python grading; no AWS credentials or network.
   The learner source remains /workspace/main.py.
========================================================= */
const AWS_PRACTICE_TEST_CASES = Object.freeze({
  'aws-validate-region': [
    { name: 'Supported region', input: 'ap-south-1,us-east-1,eu-west-1\nap-south-1\n', expectedOutput: 'VALID' },
    { name: 'Unsupported region', input: 'ap-south-1,us-east-1\neu-west-1\n', expectedOutput: 'INVALID' },
    { name: 'Case-sensitive region', input: 'ap-south-1,us-east-1\nAP-SOUTH-1\n', expectedOutput: 'INVALID' },
    { name: 'Whitespace in allowlist', input: 'ap-south-1, us-east-1 , eu-west-1\nus-east-1\n', expectedOutput: 'VALID' },
    { name: 'Blank requested region', input: 'ap-south-1,us-east-1\n\n', expectedOutput: 'INVALID' },
    { name: 'Empty allowlist', input: '\nap-south-1\n', expectedOutput: 'INVALID' },
    { name: 'Region at end of list', input: 'us-east-1,eu-west-1,ap-south-1\nap-south-1\n', expectedOutput: 'VALID' },
    { name: 'Partial region is not exact', input: 'ap-south-1,ap-south-2\nap-south\n', expectedOutput: 'INVALID' },
  ],
});

async function gradeAwsPracticeCode({ problemSlug, code }) {
  const cases = AWS_PRACTICE_TEST_CASES[problemSlug];
  if (!cases) {
    return {
      status: 'UNSUPPORTED_PROBLEM',
      message: `AWS grading is not configured for ${problemSlug}.`,
    };
  }

  const tests = [];
  for (const [index, test] of cases.entries()) {
    // Reuse the same disposable, network-isolated Python Docker executor.
    // Test inputs and expected outputs are defined on the judge, not supplied by the learner.
    const result = await executeCode({
      language: 'python',
      code,
      input: test.input,
    });
    const actualOutput = typeof result.output === 'string'
      ? result.output.trim()
      : '';
    tests.push({
      testNumber: index + 1,
      name: test.name,
      passed: result.status === 'SUCCESS' && actualOutput === test.expectedOutput,
    });
  }

  const passedTests = tests.filter((test) => test.passed).length;
  const totalTests = tests.length;
  const passed = passedTests === totalTests && totalTests > 0;
  return {
    problemSlug,
    passed,
    status: passed ? 'Accepted' : 'Wrong Answer',
    score: Math.round((passedTests / totalTests) * 100),
    passedTests,
    totalTests,
    message: passed
      ? 'All AWS practice test cases passed.'
      : `${passedTests}/${totalTests} AWS practice test cases passed.`,
    tests,
  };
}

/* =========================================================
   MICROSOFT AZURE PRACTICE — SERVER-OWNED HIDDEN TESTS
   Same offline Python judge as AWS. No Azure credentials.
   Keep tests on the judge; learner code remains main.py.
========================================================= */
const AZURE_PRACTICE_TEST_CASES = Object.freeze({
  "azure-validate-region": [
    { name: "Allowed", input: "centralindia,eastus,westeurope\ncentralindia\n", expectedOutput: "VALID" },
    { name: "Missing", input: "centralindia,eastus\nwesteurope\n", expectedOutput: "INVALID" },
    { name: "Case sensitive", input: "centralindia,eastus\nCentralIndia\n", expectedOutput: "INVALID" },
    { name: "Whitespace", input: "centralindia, eastus ,westeurope\neastus\n", expectedOutput: "VALID" },
    { name: "Empty requested", input: "centralindia,eastus\n\n", expectedOutput: "INVALID" },
    { name: "Empty list", input: "\ncentralindia\n", expectedOutput: "INVALID" }
  ],
  "azure-classify-service": [
    { name: "Storage", input: "BlobStorage\n", expectedOutput: "STORAGE" },
    { name: "Compute", input: "VirtualMachines\n", expectedOutput: "COMPUTE" },
    { name: "Functions", input: "Functions\n", expectedOutput: "COMPUTE" },
    { name: "ManagedDisks", input: "ManagedDisks\n", expectedOutput: "STORAGE" },
    { name: "Database", input: "AzureSQL\n", expectedOutput: "DATABASE" },
    { name: "CosmosDB", input: "CosmosDB\n", expectedOutput: "DATABASE" },
    { name: "Network", input: "VirtualNetwork\n", expectedOutput: "NETWORK" },
    { name: "LoadBalancer", input: "LoadBalancer\n", expectedOutput: "NETWORK" },
    { name: "Unknown", input: "Blobstorage\n", expectedOutput: "UNKNOWN" }
  ],
  "azure-parse-resource-id": [
    { name: "Valid", input: "/subscriptions/sub-01/resourceGroups/rg-demo/providers/Microsoft.Compute/virtualMachines/vm01\n", expectedOutput: "sub-01\nrg-demo\nMicrosoft.Compute\nvirtualMachines\nvm01" },
    { name: "Different resource", input: "/subscriptions/123/resourceGroups/rg1/providers/Microsoft.Storage/storageAccounts/store1\n", expectedOutput: "123\nrg1\nMicrosoft.Storage\nstorageAccounts\nstore1" },
    { name: "Too short", input: "/subscriptions/sub-01/resourceGroups/rg-demo\n", expectedOutput: "INVALID" },
    { name: "Extra segment", input: "/subscriptions/a/resourceGroups/b/providers/Microsoft.Compute/virtualMachines/c/extra\n", expectedOutput: "INVALID" },
    { name: "Missing marker", input: "/subscription/a/resourceGroups/b/providers/N/type/name\n", expectedOutput: "INVALID" },
    { name: "Empty variable", input: "/subscriptions//resourceGroups/b/providers/N/type/name\n", expectedOutput: "INVALID" },
    { name: "No leading slash", input: "subscriptions/a/resourceGroups/b/providers/N/type/name\n", expectedOutput: "INVALID" }
  ],
  "azure-calculate-vm-cost": [
    { name: "Normal", input: "25 8 3\n", expectedOutput: "600" },
    { name: "Zero hours", input: "25 0 3\n", expectedOutput: "0" },
    { name: "Zero machines", input: "20 10 0\n", expectedOutput: "0" },
    { name: "One", input: "99 1 1\n", expectedOutput: "99" },
    { name: "Big integer", input: "1000000000 1000000000 1000000000\n", expectedOutput: "1000000000000000000000000000" }
  ],
  "azure-validate-storage-account": [
    { name: "Valid", input: "storageacct2026\n", expectedOutput: "VALID" },
    { name: "Exactly 3", input: "abc\n", expectedOutput: "VALID" },
    { name: "Exactly 24", input: "aaaaaaaaaaaaaaaaaaaaaaaa\n", expectedOutput: "VALID" },
    { name: "Too short", input: "ab\n", expectedOutput: "INVALID" },
    { name: "Too long", input: "aaaaaaaaaaaaaaaaaaaaaaaaa\n", expectedOutput: "INVALID" },
    { name: "Uppercase", input: "Storage1\n", expectedOutput: "INVALID" },
    { name: "Hyphen", input: "my-storage\n", expectedOutput: "INVALID" },
    { name: "Underscore", input: "my_storage\n", expectedOutput: "INVALID" },
    { name: "Dot", input: "my.storage\n", expectedOutput: "INVALID" },
    { name: "Digits", input: "123456\n", expectedOutput: "VALID" },
    { name: "Nonascii", input: "störage\n", expectedOutput: "INVALID" }
  ],
  "azure-sum-blob-sizes": [
    { name: "Several", input: "4\n100 250 50 600\n", expectedOutput: "1000" },
    { name: "Empty", input: "0\n\n", expectedOutput: "0" },
    { name: "One", input: "1\n999\n", expectedOutput: "999" },
    { name: "Zero sizes", input: "3\n0 0 0\n", expectedOutput: "0" },
    { name: "Large", input: "3\n1000000000000000 200000000000000 30\n", expectedOutput: "1200000000000030" }
  ],
  "azure-evaluate-rbac": [
    { name: "Allowed", input: "read\n2\nALLOW read\nALLOW write\n", expectedOutput: "ALLOWED" },
    { name: "Excluded", input: "read\n2\nALLOW read\nEXCLUDE read\n", expectedOutput: "DENIED" },
    { name: "Wildcard allow", input: "read\n1\nALLOW *\n", expectedOutput: "ALLOWED" },
    { name: "Wildcard exclude", input: "read\n2\nALLOW read\nEXCLUDE *\n", expectedOutput: "DENIED" },
    { name: "No rules", input: "read\n0\n", expectedOutput: "DENIED" },
    { name: "Unrelated", input: "read\n1\nALLOW write\n", expectedOutput: "DENIED" },
    { name: "Case-sensitive", input: "read\n1\nALLOW READ\n", expectedOutput: "DENIED" }
  ],
  "azure-detect-overlapping-subnets": [
    { name: "Nested", input: "10.1.0.0/16\n10.1.2.0/24\n", expectedOutput: "OVERLAP" },
    { name: "Disjoint", input: "10.1.0.0/16\n10.2.0.0/16\n", expectedOutput: "DISJOINT" },
    { name: "Same", input: "192.168.0.0/24\n192.168.0.0/24\n", expectedOutput: "OVERLAP" },
    { name: "Adjacent", input: "10.0.0.0/25\n10.0.0.128/25\n", expectedOutput: "DISJOINT" },
    { name: "Host bits", input: "10.0.1.5/16\n10.0.0.2/24\n", expectedOutput: "OVERLAP" },
    { name: "Single address", input: "192.168.1.5/32\n192.168.1.6/32\n", expectedOutput: "DISJOINT" }
  ],
  "azure-calculate-scale-target": [
    { name: "Above max", input: "2 10 14\n", expectedOutput: "10" },
    { name: "Within range", input: "2 10 6\n", expectedOutput: "6" },
    { name: "Below min", input: "3 12 1\n", expectedOutput: "3" },
    { name: "At min", input: "2 10 2\n", expectedOutput: "2" },
    { name: "At max", input: "2 10 10\n", expectedOutput: "10" },
    { name: "Zero", input: "0 0 0\n", expectedOutput: "0" }
  ],
  "azure-simulate-queue-batches": [
    { name: "Partial", input: "23 10\n", expectedOutput: "3" },
    { name: "Empty", input: "0 10\n", expectedOutput: "0" },
    { name: "Exact", input: "20 10\n", expectedOutput: "2" },
    { name: "One", input: "1 10\n", expectedOutput: "1" },
    { name: "Small batch", input: "9 1\n", expectedOutput: "9" },
    { name: "Large", input: "1000000000000000000 3\n", expectedOutput: "333333333333333334" }
  ]
});

async function gradeAzurePracticeCode({ problemSlug, code }) {
  const cases = AZURE_PRACTICE_TEST_CASES[problemSlug];
  if (!cases) {
    return {
      status: 'UNSUPPORTED_PROBLEM',
      message: `Azure grading is not configured for ${problemSlug}.`,
    };
  }
  const tests = [];
  for (const [index, test] of cases.entries()) {
    const result = await executeCode({
      language: 'python',
      code,
      input: test.input,
    });
    const actualOutput = typeof result.output === 'string'
      ? result.output.replace(/\r\n/g, '\n').trim()
      : '';
    const expectedOutput = test.expectedOutput.replace(/\r\n/g, '\n').trim();
    tests.push({
      testNumber: index + 1,
      name: test.name,
      passed: result.status === 'SUCCESS' && actualOutput === expectedOutput,
    });
  }
  const passedTests = tests.filter((test) => test.passed).length;
  const totalTests = tests.length;
  const passed = totalTests > 0 && passedTests === totalTests;
  return {
    problemSlug,
    passed,
    status: passed ? 'Accepted' : 'Wrong Answer',
    score: totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0,
    passedTests,
    totalTests,
    message: passed
      ? 'All Azure practice test cases passed.'
      : `${passedTests}/${totalTests} Azure practice test cases passed.`,
    tests,
  };
}

/* =========================================================
   RESPONSE HELPER
\========================================================= */
function sendJson(
  response,
  statusCode,
  data,
) {
  response.writeHead(
    statusCode,
    {
      'Content-Type':
        'application/json',
      'Access-Control-Allow-Origin':
        '*',
      'Access-Control-Allow-Methods':
        'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers':
        'Content-Type',
      'Cache-Control':
        'no-store',
    },
  );
  response.end(
    JSON.stringify(
      data,
    ),
  );
}
/* =========================================================
   NORMALIZE LANGUAGE
\========================================================= */
function normalizeLanguage(
  language,
) {
  const normalized =
    String(
      language ??
        '',
    )
      .trim()
      .toLowerCase();
  /* Azure Practice reuses the same Python image and executor. */
  if (normalized === 'azure' || normalized === 'azure-python' || normalized === 'microsoft-azure') {
    return 'python';
  }
  /* AWS Practice runs ordinary Python inside the existing isolated judge. */
  if (normalized === 'aws' || normalized === 'aws-python') {
    return 'python';
  }
  /* =======================================================
     C++ ALIASES
  ======================================================= */
  if (
    normalized ===
      'c++' ||
    normalized ===
      'cplusplus'
  ) {
    return 'cpp';
  }
  /* =======================================================
     JAVASCRIPT / NODE.JS ALIASES
  ======================================================= */
  if (
    normalized ===
      'js' ||
    normalized ===
      'node' ||
    normalized ===
      'nodejs' ||
    normalized ===
      'node.js'
  ) {
    return 'javascript';
  }
  /* =======================================================
     TYPESCRIPT ALIASES
  ======================================================= */
  if (
    normalized ===
      'ts' ||
    normalized ===
      'typescript' ||
    normalized ===
      'type-script'
  ) {
    return 'typescript';
  }
  /* =======================================================
     PYTHON ALIASES
  ======================================================= */
  if (
    normalized ===
      'py' ||
    normalized ===
      'python3' ||
    normalized ===
      'python-3'
  ) {
    return 'python';
  }
  /* =======================================================
     PYTHON DATA ANALYTICS ALIASES
  ======================================================= */
  if (
    normalized === 'python-data-analytics' ||
    normalized === 'python-analytics' ||
    normalized === 'data-analytics-python'
  ) {
    return 'python-data-analytics';
  }
  /* =======================================================
     PYTHON MACHINE LEARNING ALIASES
  ======================================================= */
  if (
    normalized === 'python-machine-learning' ||
    normalized === 'python-ml' ||
    normalized === 'machine-learning-python'
  ) {
    return 'python-machine-learning';
  }
  /* =======================================================
     JAVA ALIASES
  ======================================================= */
  /* PYSPARK ALIASES */
  if (
    normalized === 'pyspark' ||
    normalized === 'python-spark' ||
    normalized === 'python-pyspark' ||
    normalized === 'spark-python'
  ) {
    return 'pyspark';
  }
  if (
    normalized ===
      'java' ||
    normalized ===
      'jdk'
  ) {
    return 'java';
  }
  /* =======================================================
     C# ALIASES
  ======================================================= */
  if (
    normalized ===
      'csharp' ||
    normalized ===
      'c#' ||
    normalized ===
      'cs' ||
    normalized ===
      'c-sharp'
  ) {
    return 'csharp';
  }
  /* =======================================================
     PHP ALIASES
  ======================================================= */
  if (
    normalized === 'php' ||
    normalized === 'php8' ||
    normalized === 'php-8' ||
    normalized === 'php8.3'
  ) {
    return 'php';
  }
  /* =======================================================
     RUBY ALIASES
  ======================================================= */
  if (
    normalized === 'ruby' ||
    normalized === 'rb' ||
    normalized === 'ruby3' ||
    normalized === 'ruby-3'
  ) {
    return 'ruby';
  }
  /* =======================================================
     SWIFT ALIASES
  ======================================================= */
  if (
    normalized === 'swift' ||
    normalized === 'swift5' ||
    normalized === 'swift-5' ||
    normalized === 'swift6' ||
    normalized === 'swift-6'
  ) {
    return 'swift';
  }
  if (normalized === 'go' || normalized === 'golang') {
    return 'go';
  }
  return normalized;
}
/* =========================================================
   NORMALIZE FRAMEWORK RUNTIME
\========================================================= */
function normalizeFrameworkRuntime(
  runtime,
) {
  const normalized =
    String(
      runtime ??
        '',
    )
      .trim()
      .toLowerCase();
  if (
    normalized ===
      'asp.net-core' ||
    normalized ===
      'asp.net core' ||
    normalized ===
      'aspnet-core' ||
    normalized ===
      'dotnet-web' ||
    normalized ===
      'dotnetweb'
  ) {
    return 'aspnetcore';
  }
  if (
    normalized === 'fast-api' ||
    normalized === 'fast api' ||
    normalized === 'fast_api'
  ) {
    return 'fastapi';
  }
  return normalized;
}
/* =========================================================
   READ JSON BODY
\========================================================= */
async function readJsonBody(
  request,
) {
  return await new Promise(
    (
      resolve,
      reject,
    ) => {
      let body = '';
      let rejected =
        false;
      request.on(
        'data',
        (
          chunk,
        ) => {
          if (
            rejected
          ) {
            return;
          }
          body +=
            chunk.toString();
          /*
           * Development safety limit.
           */
          if (
            body.length >
            1_000_000
          ) {
            rejected =
              true;
            reject(
              new Error(
                'Request too large.',
              ),
            );
            request.destroy();
          }
        },
      );
      request.on(
        'end',
        () => {
          if (
            rejected
          ) {
            return;
          }
          try {
            resolve(
              body
                ? JSON.parse(
                    body,
                  )
                : {},
            );
          } catch {
            reject(
              new Error(
                'Invalid JSON.',
              ),
            );
          }
        },
      );
      request.on(
        'error',
        reject,
      );
    },
  );
}
/* =========================================================
   EXECUTE DOCKER
\========================================================= */
function runDocker(
  args,
  timeoutMs = 15_000,
) {
  return new Promise(
    (
      resolve,
    ) => {
      execFile(
        'docker',
        args,
        {
          windowsHide:
            true,
          /*
           * Host-side execution timeout.
           */
          timeout:
            timeoutMs,
          /*
           * Prevent excessive output.
           */
          maxBuffer:
            1024 *
            1024,
        },
        (
          error,
          stdout,
          stderr,
        ) => {
          resolve({
            error,
            stdout:
              stdout ??
              '',
            stderr:
              stderr ??
              '',
          });
        },
      );
    },
  );
}
/* =========================================================
   EXECUTE NORMAL CODE
   Used by:
   C
   C++
   JavaScript
   Node.js console problems
   TypeScript
   Python
\========================================================= */
async function executeCode({
  language,
  code,
  input = '',
  dataset = '',
}) {
  const config =
    LANGUAGE_CONFIG[
      language
    ];
  /* =======================================================
     CHECK LANGUAGE RUNTIME
  ======================================================= */
  if (
    !config
  ) {
    return {
      status:
        'UNSUPPORTED_LANGUAGE',
      message:
        `Unsupported language: ${language}`,
    };
  }
  /* =======================================================
     CREATE EXECUTION DIRECTORY
  ======================================================= */
  const executionId =
    crypto.randomUUID();
  const workDirectory =
    path.join(
      os.tmpdir(),
      `elab-${executionId}`,
    );
  await mkdir(
    workDirectory,
    {
      recursive:
        true,
    },
  );
  /* =======================================================
     SOURCE FILE
  ======================================================= */
  const sourcePath =
    path.join(
      workDirectory,
      config.sourceFile,
    );
  /* =======================================================
     INPUT FILE
  ======================================================= */
  const inputPath =
    path.join(
      workDirectory,
      'input.txt',
    );
  const datasetFileName =
    language === 'python-machine-learning'
      ? 'customer_data.csv'
      : 'sales.csv';
  const datasetPath =
    path.join(
      workDirectory,
      datasetFileName,
    );
  try {
    /* =====================================================
       WRITE LEARNER CODE
    ===================================================== */
    await writeFile(
      sourcePath,
      code,
      'utf8',
    );
    /* =====================================================
       WRITE INPUT
    ===================================================== */
    await writeFile(
      inputPath,
      input,
      'utf8',
    );
    /* =====================================================
       WRITE PYTHON DATA ANALYTICS DATASET
    ===================================================== */
    if (
      (
        language === 'python-data-analytics' ||
        language === 'python-machine-learning'
      ) &&
      typeof dataset === 'string' &&
      dataset.length > 0
    ) {
      await writeFile(
        datasetPath,
        dataset,
        'utf8',
      );
    }
    /* =====================================================
       COMPILE / CHECK + RUN
    ===================================================== */
    const shellCommand = `
${config.compileCommand} > /tmp/compile-output.txt 2>&1
COMPILE_STATUS=$?
if [ "$COMPILE_STATUS" -ne 0 ]; then
  cat /tmp/compile-output.txt
  exit 100
fi
${config.prepareCommand}
timeout ${language === 'pyspark' ? 40 : language === 'python-machine-learning' ? 12 : language === 'python-data-analytics' ? 10 : 2}s ${config.runCommand} < /workspace/input.txt
    `.trim();
    /* =====================================================
       DOCKER OPTIONS
    ===================================================== */
    const dockerArgs = [
      'run',
      '--rm',
      /* -----------------------------------------------
         NO INTERNET
      ----------------------------------------------- */
      '--network',
      'none',
        ...(language === 'pyspark' ? ['--hostname', 'localhost'] : []),
      /* -----------------------------------------------
         MEMORY
      ----------------------------------------------- */
      '--memory',
      config.memory,
      '--memory-swap',
      config.memory,
      /* -----------------------------------------------
         CPU
      ----------------------------------------------- */
      '--cpus',
        language === 'pyspark' ? '2' : '0.5',
      /* -----------------------------------------------
         PROCESS LIMIT
      ----------------------------------------------- */
      '--pids-limit',
        language === 'pyspark' ? '256' : '64',
      /* -----------------------------------------------
         DROP CAPABILITIES
      ----------------------------------------------- */
      '--cap-drop',
      'ALL',
      '--security-opt',
      'no-new-privileges',
      /* -----------------------------------------------
         READ ONLY FILESYSTEM
      ----------------------------------------------- */
      '--read-only',
      /* -----------------------------------------------
         TEMP DIRECTORY
      ----------------------------------------------- */
      '--tmpfs',
      `/tmp:rw,exec,nosuid,nodev,size=${config.tmpSize}`,
      /* -----------------------------------------------
         LEARNER WORKSPACE
      ----------------------------------------------- */
      '--mount',
      `type=bind,source=${workDirectory},target=/workspace,readonly`,
      /* -----------------------------------------------
         LANGUAGE IMAGE
      ----------------------------------------------- */
      config.image,
      /* -----------------------------------------------
         EXECUTE
      ----------------------------------------------- */
      'sh',
      '-lc',
      shellCommand,
    ];
    /* =====================================================
       START DOCKER
    ===================================================== */
    const result =
      await runDocker(
        dockerArgs,
        language === 'pyspark' ? 60_000 : 15_000,
      );
    /* =====================================================
       SUCCESS
    ===================================================== */
    if (
      !result.error
    ) {
      return {
        status:
          'SUCCESS',
        output:
          result.stdout,
        stderr:
          result.stderr,
        exitCode:
          0,
      };
    }
    /* =====================================================
       EXIT CODE
    ===================================================== */
    const exitCode =
      typeof result.error
        ?.code ===
        'number'
        ? result.error.code
        : null;
    /* =====================================================
       COMPILATION / SYNTAX ERROR
       Exit 100
       C:
       gcc failure
       C++:
       g++ failure
       JavaScript:
       node --check failure
       TypeScript:
       tsc failure
       Python:
       syntax validation failure
    ===================================================== */
    if (
      exitCode ===
      100
    ) {
      return {
        status:
          'COMPILATION_ERROR',
        output:
          result.stdout ||
          result.stderr,
        stderr:
          result.stderr,
        exitCode,
      };
    }
    /* =====================================================
       TIME LIMIT
       GNU timeout:
       exit 124
    ===================================================== */
    if (
      exitCode ===
      124
    ) {
      return {
        status:
          'TIME_LIMIT_EXCEEDED',
        output:
          'Time Limit Exceeded',
        stderr:
          result.stderr,
        exitCode,
      };
    }
    /* =====================================================
       HOST TIMEOUT
    ===================================================== */
    if (
      result.error
        ?.killed
    ) {
      return {
        status:
          'TIME_LIMIT_EXCEEDED',
        output:
          'Time Limit Exceeded',
        stderr:
          result.stderr,
        exitCode,
      };
    }
    /* =====================================================
       RUNTIME ERROR
    ===================================================== */
    return {
      status:
        'RUNTIME_ERROR',
      output:
        result.stdout ||
        result.stderr ||
        'Program exited with an error.',
      stderr:
        result.stderr,
      exitCode,
    };
  } finally {
    /* =====================================================
       ALWAYS REMOVE TEMP FILES
    ===================================================== */
    await rm(
      workDirectory,
      {
        recursive:
          true,
        force:
          true,
      },
    );
  }
}
/* =========================================================
   EXECUTE FRAMEWORK
   Current:
   - Express
   - React
   - Angular
   - Next.js
   - NestJS
   - Django
   - Spring Boot
   - ASP.NET Core
   Later:
   - MongoDB
   - MERN
\========================================================= */
async function executeFramework({
  problemSlug,
  runtime,
  files,
  tests,
}) {
  /* =======================================================
     EXPRESS
  ======================================================= */
  if (
    runtime ===
    'express'
  ) {
    return await runExpressFramework({
      problemSlug,
      files,
      tests,
    });
  }
  /* =======================================================
     REACT
  ======================================================= */
  if (
    runtime ===
    'react'
  ) {
    return await runReactFramework({
      problemSlug,
      files,
      tests,
    });
  }
  if (
    runtime ===
    'vue'
  ) {
    return await runVueFramework({
      problemSlug,
      files,
      tests,
    });
  }
  /* =======================================================
     ANGULAR
  ======================================================= */
  if (
    runtime ===
    'angular'
  ) {
    return await runAngularFramework({
      problemSlug,
      files,
      tests,
    });
  }
  /* =======================================================
     NEXT.JS
  ======================================================= */
  if (
    runtime ===
    'nextjs'
  ) {
    return await runNextJsFramework({
      problemSlug,
      files,
      tests,
    });
  }
  /* =======================================================
     NESTJS
  ======================================================= */
  if (
    runtime ===
    'nestjs'
  ) {
    return await runNestJsFramework({
      problemSlug,
      files,
      tests,
    });
  }
  /* =======================================================
     DJANGO
  ======================================================= */
  if (
    runtime ===
    'django'
  ) {
    return await runDjangoFramework({
      problemSlug,
      files,
      tests,
    });
  }
  /* =======================================================
     FASTAPI
  ======================================================= */
  if (runtime === 'fastapi') {
    return await runFastApiFramework({
      problemSlug,
      files,
      tests,
    });
  }
  /* =======================================================
     SPRING BOOT
  ======================================================= */
  if (
    runtime ===
    'springboot'
  ) {
    return await runSpringBootFramework({
      problemSlug,
      files,
      tests,
    });
  }
  /* =======================================================
     ASP.NET CORE
  ======================================================= */
  if (
    runtime ===
    'aspnetcore'
  ) {
    return await runAspNetCoreFramework({
      problemSlug,
      files,
      tests,
    });
  }
  /* =======================================================
     UNSUPPORTED FRAMEWORK
  ======================================================= */
  return {
    runtime,
    status:
      'UNSUPPORTED_RUNTIME',
    message:
      `Unsupported framework runtime: ${runtime}`,
  };
}
/* =========================================================
   HTTP SERVER
\========================================================= */
const server =
  http.createServer(
    async (
      request,
      response,
    ) => {
      /* ===================================================
         CORS PREFLIGHT
      =================================================== */
      if (
        request.method ===
        'OPTIONS'
      ) {
        response.writeHead(
          204,
          {
            'Access-Control-Allow-Origin':
              '*',
            'Access-Control-Allow-Methods':
              'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers':
              'Content-Type',
          },
        );
        response.end();
        return;
      }
      /* ===================================================
         HEALTH CHECK
         GET /health
      =================================================== */
      if (
        request.method ===
          'GET' &&
        request.url ===
          '/health'
      ) {
        sendJson(
          response,
          200,
          {
            status:
              'ok',
            service:
              'elab-judge',
            supportedLanguages:
              Object.keys(
                LANGUAGE_CONFIG,
              ),
            supportedFrameworkRuntimes:
              SUPPORTED_FRAMEWORK_RUNTIMES,
          },
        );
        return;
      }
      /* ===================================================
         NORMAL CODE EXECUTION
         POST /run
      =================================================== */
      if (
        request.method ===
          'POST' &&
        request.url ===
          '/run'
      ) {
        try {
          const body =
            await readJsonBody(
              request,
            );
          /* ===============================================
             LANGUAGE
          =============================================== */
          const language =
            normalizeLanguage(
              body.language,
            );
          /* ===============================================
             CHECK LANGUAGE
          =============================================== */
          if (
            !LANGUAGE_CONFIG[
              language
            ]
          ) {
            sendJson(
              response,
              400,
              {
                status:
                  'UNSUPPORTED_LANGUAGE',
                message:
                  `Supported languages are C, C++, C#, Java, JavaScript, TypeScript, Python, Python Data Analytics, Python Machine Learning, Python Spark (PySpark), PHP, Ruby and Swift. Received: ${language || 'none'}.`,
              },
            );
            return;
          }
          /* ===============================================
             CHECK CODE
          =============================================== */
          if (
            !body.code ||
            typeof body.code !==
              'string'
          ) {
            sendJson(
              response,
              400,
              {
                status:
                  'INVALID_REQUEST',
                message:
                  'Code is required.',
              },
            );
            return;
          }
          /* ===============================================
             EXECUTE
          =============================================== */
          const result =
            await executeCode({
              language,
              code:
                body.code,
              input:
                typeof body.input ===
                  'string'
                  ? body.input
                  : '',
              dataset:
                typeof body.dataset ===
                  'string'
                  ? body.dataset
                  : '',
            });
          /* ===============================================
             RESPONSE
          =============================================== */
          sendJson(
            response,
            200,
            {
              language,
              ...result,
            },
          );
        } catch (
          error
        ) {
          console.error(
            'Judge error:',
            error,
          );
          sendJson(
            response,
            500,
            {
              status:
                'INTERNAL_ERROR',
              message:
                error instanceof
                  Error
                  ? error.message
                  : 'Judge failed.',
            },
          );
        }
        return;
      }
      /* ===================================================
         AWS PRACTICE GRADING
         POST /run/aws/check
         POST /run/aws/submit
         Both use hidden tests kept exclusively in this judge.
         The NestJS API must forward Check/Submit here.
      =================================================== */
      if (
        request.method === 'POST' &&
        (request.url === '/run/aws/check' ||
          request.url === '/run/aws/submit')
      ) {
        try {
          const body = await readJsonBody(request);
          if (
            typeof body.problemSlug !== 'string' ||
            typeof body.code !== 'string' ||
            !body.code.trim() ||
            body.code.length > 100_000
          ) {
            sendJson(response, 400, {
              status: 'INVALID_REQUEST',
              message: 'Valid problemSlug and Python code are required.',
            });
            return;
          }
          if (!Object.hasOwn(AWS_PRACTICE_TEST_CASES, body.problemSlug)) {
            sendJson(response, 400, {
              status: 'UNSUPPORTED_PROBLEM',
              message: `AWS grading is not configured for ${body.problemSlug}.`,
            });
            return;
          }
          const result = await gradeAwsPracticeCode({
            problemSlug: body.problemSlug,
            code: body.code,
          });
          sendJson(response, 200, result);
        } catch (error) {
          console.error('AWS practice grading error:', error);
          sendJson(response, 500, {
            status: 'INTERNAL_ERROR',
            message: 'Unable to grade AWS practice solution.',
          });
        }
        return;
      }

      /* ===================================================
          MICROSOFT AZURE PRACTICE GRADING
          POST /run/azure/check
          POST /run/azure/submit
          Server-owned hidden tests, Python Docker executor.
      =================================================== */
      if (
        request.method === 'POST' &&
        (request.url === '/run/azure/check' ||
          request.url === '/run/azure/submit')
      ) {
        try {
          const body = await readJsonBody(request);
          if (
            typeof body.problemSlug !== 'string' ||
            typeof body.code !== 'string' ||
            !body.code.trim() ||
            body.code.length > 100_000
          ) {
            sendJson(response, 400, {
              status: 'INVALID_REQUEST',
              message: 'Valid problemSlug and Python code are required.',
            });
            return;
          }
          if (!Object.hasOwn(AZURE_PRACTICE_TEST_CASES, body.problemSlug)) {
            sendJson(response, 400, {
              status: 'UNSUPPORTED_PROBLEM',
              message: `Azure grading is not configured for ${body.problemSlug}.`,
            });
            return;
          }
          const result = await gradeAzurePracticeCode({
            problemSlug: body.problemSlug,
            code: body.code,
          });
          sendJson(response, 200, result);
        } catch (error) {
          console.error('Azure practice grading error:', error);
          sendJson(response, 500, {
            status: 'INTERNAL_ERROR',
            message: 'Unable to grade Azure practice solution.',
          });
        }
        return;
      }

      /* ===================================================
         FRAMEWORK EXECUTION
         POST /run/framework
         Used by:
         Express Run
         Express Submit
         React Run
         React Submit
         Angular Run
         Angular Submit
         Next.js Run
         NestJS Run
         Django Run
         FastAPI Run
         FastAPI Submit
      =================================================== */
      if (
        request.method ===
          'POST' &&
        request.url ===
          '/run/framework'
      ) {
        try {
          const body =
            await readJsonBody(
              request,
            );
          /* ===============================================
             PROBLEM SLUG
          =============================================== */
          if (
            !body.problemSlug ||
            typeof body.problemSlug !==
              'string' ||
            !body.problemSlug.trim()
          ) {
            sendJson(
              response,
              400,
              {
                status:
                  'INVALID_REQUEST',
                message:
                  'problemSlug is required.',
              },
            );
            return;
          }
          const problemSlug =
            body.problemSlug
              .trim();
          /* ===============================================
             RUNTIME
          =============================================== */
          const runtime =
            normalizeFrameworkRuntime(
              body.runtime,
            );
          if (
            !runtime
          ) {
            sendJson(
              response,
              400,
              {
                status:
                  'INVALID_REQUEST',
                message:
                  'runtime is required.',
              },
            );
            return;
          }
          /* ===============================================
             CHECK SUPPORTED FRAMEWORK
          =============================================== */
          if (
            !SUPPORTED_FRAMEWORK_RUNTIMES
              .includes(
                runtime,
              )
          ) {
            sendJson(
              response,
              400,
              {
                runtime,
                status:
                  'UNSUPPORTED_RUNTIME',
                message:
                  `Supported framework runtimes are Express, React, Vue, Angular, Next.js, NestJS, Django, FastAPI, Spring Boot and ASP.NET Core. Received: ${runtime}.`,
              },
            );
            return;
          }
          /* ===============================================
             FILES
          =============================================== */
          if (
            !Array.isArray(
              body.files,
            ) ||
            body.files.length ===
              0
          ) {
            sendJson(
              response,
              400,
              {
                runtime,
                status:
                  'INVALID_REQUEST',
                message:
                  'At least one framework file is required.',
              },
            );
            return;
          }
          /* ===============================================
             VALIDATE FILES
          =============================================== */
          for (
            let index = 0;
            index <
            body.files.length;
            index += 1
          ) {
            const file =
              body.files[
                index
              ];
            /* -----------------------------------------------
               FILE OBJECT
            ----------------------------------------------- */
            if (
              !file ||
              typeof file !==
                'object'
            ) {
              sendJson(
                response,
                400,
                {
                  runtime,
                  status:
                    'INVALID_REQUEST',
                  message:
                    `Invalid file at index ${index}.`,
                },
              );
              return;
            }
            /* -----------------------------------------------
               FILE PATH
            ----------------------------------------------- */
            if (
              typeof file.path !==
                'string' ||
              !file.path.trim()
            ) {
              sendJson(
                response,
                400,
                {
                  runtime,
                  status:
                    'INVALID_REQUEST',
                  message:
                    `File path is required at index ${index}.`,
                },
              );
              return;
            }
            /* -----------------------------------------------
               FILE CONTENT
            ----------------------------------------------- */
            if (
              typeof file.content !==
                'string'
            ) {
              sendJson(
                response,
                400,
                {
                  runtime,
                  status:
                    'INVALID_REQUEST',
                  message:
                    `File content is required at index ${index}.`,
                },
              );
              return;
            }
            /* -----------------------------------------------
               FILE LANGUAGE
            ----------------------------------------------- */
            if (
              typeof file.language !==
                'string' ||
              !file.language.trim()
            ) {
              sendJson(
                response,
                400,
                {
                  runtime,
                  status:
                    'INVALID_REQUEST',
                  message:
                    `File language is required at index ${index}.`,
                },
              );
              return;
            }
          }
          /* ===============================================
             OPTIONAL HIDDEN TESTS
             Run:
             body.tests is normally undefined.
             Submit:
             Framework submissions may send hidden tests.
             Works for:
             - Express
             - React
             - Angular
             Next.js, NestJS and Django hidden test execution
             are connected in their submission-service stages.
          =============================================== */
          const tests =
            Array.isArray(
              body.tests,
            )
              ? body.tests
              : undefined;
          /* ===============================================
             SERVER FRAMEWORK HTTP TEST VALIDATION
          =============================================== */
          const frameworkLabel =
            runtime === 'fastapi'
              ? 'FastAPI'
              : runtime === 'springboot'
                ? 'Spring Boot'
                : runtime === 'aspnetcore'
                  ? 'ASP.NET Core'
                  : runtime;
          if (
            ['fastapi', 'springboot', 'aspnetcore'].includes(runtime) &&
            Array.isArray(
              tests,
            )
          ) {
            for (
              let index = 0;
              index <
              tests.length;
              index += 1
            ) {
              const test =
                tests[index];
              if (
                !test ||
                typeof test !==
                  'object'
              ) {
                sendJson(
                  response,
                  400,
                  {
                    runtime,
                    status:
                      'INVALID_REQUEST',
                    message:
                      `Invalid ${frameworkLabel} test at index ${index}.`,
                  },
                );
                return;
              }
              if (
                typeof test.method !==
                  'string' ||
                !test.method.trim()
              ) {
                sendJson(
                  response,
                  400,
                  {
                    runtime,
                    status:
                      'INVALID_REQUEST',
                    message:
                      `Test method is required at index ${index} for ${frameworkLabel}.`,
                  },
                );
                return;
              }
              const method =
                test.method
                  .trim()
                  .toUpperCase();
              if (
                ![
                  'GET',
                  'POST',
                  'PUT',
                  'PATCH',
                  'DELETE',
                ].includes(
                  method,
                )
              ) {
                sendJson(
                  response,
                  400,
                  {
                    runtime,
                    status:
                      'INVALID_REQUEST',
                    message:
                      `Unsupported ${frameworkLabel} HTTP method at index ${index}: ${method}.`,
                  },
                );
                return;
              }
              test.method =
                method;
              if (
                typeof test.path !==
                  'string' ||
                !test.path.trim() ||
                !test.path
                  .trim()
                  .startsWith(
                    '/',
                  )
              ) {
                sendJson(
                  response,
                  400,
                  {
                    runtime,
                    status:
                      'INVALID_REQUEST',
                    message:
                      `${frameworkLabel} test path must start with / at index ${index}.`,
                  },
                );
                return;
              }
              test.path =
                test.path.trim();
              if (
                test.expectedStatus !==
                  undefined &&
                (
                  !Number.isInteger(
                    test.expectedStatus,
                  ) ||
                  test.expectedStatus <
                    100 ||
                  test.expectedStatus >
                    599
                )
              ) {
                sendJson(
                  response,
                  400,
                  {
                    runtime,
                    status:
                      'INVALID_REQUEST',
                    message:
                      `${frameworkLabel} expectedStatus must be an HTTP status code at index ${index}.`,
                  },
                );
                return;
              }
              if (
                test.expectedOutput !==
                  undefined &&
                typeof test.expectedOutput !==
                  'string'
              ) {
                sendJson(
                  response,
                  400,
                  {
                    runtime,
                    status:
                      'INVALID_REQUEST',
                    message:
                      `${frameworkLabel} expectedOutput must be a string at index ${index}.`,
                  },
                );
                return;
              }
              if (
                test.body !==
                  undefined &&
                typeof test.body !==
                  'string'
              ) {
                sendJson(
                  response,
                  400,
                  {
                    runtime,
                    status:
                      'INVALID_REQUEST',
                    message:
                      `${frameworkLabel} test body must be a string at index ${index}.`,
                  },
                );
                return;
              }
            }
          }
          /* ===============================================
             EXECUTE FRAMEWORK
          =============================================== */
          const result =
            await executeFramework({
              problemSlug,
              runtime,
              files:
                body.files,
              tests,
            });
          /* ===============================================
             RESPONSE
          =============================================== */
          sendJson(
            response,
            200,
            {
              problemSlug,
              runtime,
              ...result,
            },
          );
        } catch (
          error
        ) {
          console.error(
            'Framework judge error:',
            error,
          );
          sendJson(
            response,
            500,
            {
              status:
                'INTERNAL_ERROR',
              message:
                error instanceof
                  Error
                  ? error.message
                  : 'Framework execution failed.',
            },
          );
        }
        return;
      }
      /* ===================================================
         NOT FOUND
      =================================================== */
      sendJson(
        response,
        404,
        {
          status:
            'NOT_FOUND',
          message:
            'Not found.',
        },
      );
    },
  );
/* =========================================================
   SERVER ERROR
\========================================================= */
server.on(
  'error',
  (
    error,
  ) => {
    console.error(
      'Judge server error:',
      error,
    );
  },
);
/* =========================================================
   SERVER CLOSED
\========================================================= */
server.on(
  'close',
  () => {
    console.log(
      'Judge server closed.',
    );
  },
);
/* =========================================================
   START
\========================================================= */
server.listen(
  PORT,
  '127.0.0.1',
  () => {
    console.log(
      `eLab Judge running at http\\\\\\\\://127.0.0.1:${PORT}`,
    );
    console.log(
      'Supported languages: C, C++, C#, Java, JavaScript, TypeScript, Python, Python Data Analytics, PHP, Ruby, Swift',
    );
    console.log(
      'Supported framework runtimes: Express, React, Vue, Angular, Next.js, NestJS, Django, FastAPI, Spring Boot, ASP.NET Core',
    );
    console.log(
      `C image: ${C_IMAGE}`,
    );
    console.log(
      `C++ image: ${CPP_IMAGE}`,
    );
    console.log(
      `Node.js image: ${NODE_IMAGE}`,
    );
    console.log(
      `TypeScript image: ${TYPESCRIPT_IMAGE}`,
    );
    console.log(
      `Python image: ${PYTHON_IMAGE}`,
    );
    console.log(
      `Python Data Analytics image: ${PYTHON_ANALYTICS_IMAGE}`,
    );
    console.log(
      `Java image: ${JAVA_IMAGE}`,
    );
    console.log(
      `C# image: ${CSHARP_IMAGE}`,
    );
    console.log(
      `PHP image: ${PHP_IMAGE}`,
    );
    console.log(
      `Ruby image: ${RUBY_IMAGE}`,
    );
    console.log(
      `Swift image: ${SWIFT_IMAGE}`,
    );
  },
);
