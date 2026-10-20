"use client";

import { ArrowLeft, Code2, Loader2, Play, Plus, Send } from "lucide-react";

import { useEffect, useState } from "react";

import { useParams, useRouter, useSearchParams } from "next/navigation";

import CodeEditor from "@/components/editor/CodeEditor";

import DatabaseWorkspace from "@/components/database-workspace/DatabaseWorkspace";

import DevOpsWorkspace from "@/components/devops-workspace/DevOpsWorkspace";

import PowerBIWorkspace from "@/features/power-bi/PowerBIWorkspace";

import { buildWebPreview } from "@/features/web-workspace/web-preview";

import { getProblemBySlug } from "@/features/problem-engine";

import { markProblemSolved } from "@/features/progress/local-progress";

import { apiFetch } from "@/features/auth/apiFetch";
import { useRemoteProblem } from "@/features/learner/api";

import styles from "./workspace.module.css";

/* =========================================================
   API
========================================================= */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

/* =========================================================
   AWS PRACTICE INPUT FALLBACK

   AWS-001 uses the standard Python coding judge. If sampleTests
   have not yet been registered, provide a valid two-line example
   so input() does not immediately encounter EOF on Run.
========================================================= */
const AWS_REGION_SAMPLE_INPUT = "ap-south-1,us-east-1,eu-west-1\nap-south-1\n";

/* Google Cloud practice uses the same Python stdin/stdout judge. */
const GCP_REGION_SAMPLE_INPUT = "asia-south1,us-central1,europe-west1\nasia-south1\n";

function getPracticeSampleInput(selectedProblem: ReturnType<typeof getProblemBySlug>): string {
  const supplied = selectedProblem?.sampleTests?.[0]?.input;
  if (typeof supplied === "string" && supplied.length > 0) {
    return supplied;
  }
  return selectedProblem?.slug === "aws-validate-region" ? AWS_REGION_SAMPLE_INPUT : selectedProblem?.slug === "gcp-validate-region" ? GCP_REGION_SAMPLE_INPUT : "";
}

/* =========================================================
   NORMAL EXECUTION RESPONSE
========================================================= */

type ExecutionResponse = {
  status?: string;
  output?: string;
  stderr?: string;
  message?: string;
  exitCode?: number | null;
};

/* =========================================================
   FRAMEWORK EXECUTION TEST RESULT

   Supports:
   - Express HTTP tests
   - React component tests
   - Vue component tests
   - Angular component tests
========================================================= */

type FrameworkExecutionTestResult = {
  testNumber?: number;

  type?: string;

  passed?: boolean;

  /* React */
  selector?: string;
  expected?: unknown;
  actual?: unknown;

  /* Express */
  statusCode?: number;
  expectedStatus?: number;
  body?: unknown;
  expectedBody?: unknown;

  message?: string;
};

/* =========================================================
   FRAMEWORK EXECUTION RESPONSE
========================================================= */

type FrameworkExecutionResponse = {
  problemSlug?: string;

  runtime?: string;

  status?: string;

  output?: string;

  stderr?: string;

  message?: string;

  passedTests?: number;

  totalTests?: number;

  testResults?: FrameworkExecutionTestResult[];

  /*
   * React visual preview returned by the
   * framework Judge/API after App.jsx is
   * compiled for the browser.
   */
  previewHtml?: string;

  /*
   * Optional direct preview URL.
   * If the backend does not provide one,
   * the workspace creates a local eLab
   * preview URL from previewHtml.
   */
  previewUrl?: string | null;
};

/* =========================================================
   SUBMISSION TEST RESULT
========================================================= */

type SubmissionTestResult = {
  testNumber: number;

  status: string;

  passed?: boolean;
};

/* =========================================================
   SUBMISSION RESPONSE
========================================================= */

type SubmissionResponse = {
  status?: string;

  score?: number;

  passedTests?: number;

  totalTests?: number;

  output?: string;

  stderr?: string;

  message?: string;

  results?: SubmissionTestResult[];
};

/* =========================================================
   LANGUAGE LABEL
========================================================= */

function formatLanguageName(language: string) {
  const names: Record<string, string> = {
    javascript: "JavaScript",

    typescript: "TypeScript",

    python: "Python",

    java: "Java",

    cpp: "C++",

    c: "C",

    csharp: "C#",

    go: "Go",

    php: "PHP",

    html: "HTML",

    css: "CSS",

    sql: "SQL",
  };

  return names[language] ?? language;
}

/* =========================================================
   FRAMEWORK RUNTIME

   Express:
   technologySlug = expressjs
   runtime         = express

   React:
   technologySlug = react
   runtime         = react

   Vue:
   technologySlug = vue
   runtime         = vue

   Angular:
   technologySlug = angular
   runtime         = angular

   Next.js:
   technologySlug = nextjs
   runtime         = nextjs

   NestJS:
   technologySlug = nestjs
   runtime         = nestjs

   Django:
   technologySlug = django
   runtime         = django

   FastAPI:
   technologySlug = fastapi
   runtime         = fastapi

   ASP.NET Core:
   technologySlug = aspnetcore / aspnet-core / asp.net-core
   runtime         = aspnetcore
========================================================= */

function getFrameworkRuntime(technologySlug: string) {
  /* =======================================================
     EXPRESS
  ======================================================= */

  if (technologySlug === "expressjs") {
    return "express";
  }

  /* =======================================================
     REACT
  ======================================================= */

  if (technologySlug === "react") {
    return "react";
  }

  /* =======================================================
     VUE
  ======================================================= */

  if (technologySlug === "vue") {
    return "vue";
  }

  /* =======================================================
     ANGULAR
  ======================================================= */

  if (technologySlug === "angular") {
    return "angular";
  }

  /* =======================================================
     NEXT.JS
  ======================================================= */

  if (technologySlug === "nextjs") {
    return "nextjs";
  }

  /* =======================================================
     NESTJS
  ======================================================= */

  if (technologySlug === "nestjs") {
    return "nestjs";
  }

  /* =======================================================
     DJANGO
  ======================================================= */

  if (technologySlug === "django") {
    return "django";
  }

  /* =======================================================
     FASTAPI
  ======================================================= */

  if (technologySlug === "fastapi") {
    return "fastapi";
  }

  /* =======================================================
     SPRING BOOT
  ======================================================= */

  if (technologySlug === "springboot" || technologySlug === "spring-boot") {
    return "springboot";
  }

  /* =======================================================
     ASP.NET CORE
  ======================================================= */

  if (technologySlug === "aspnetcore" || technologySlug === "aspnet-core" || technologySlug === "asp.net-core") {
    return "aspnetcore";
  }

  return null;
}

/* =========================================================
   FORMAT UNKNOWN VALUE
========================================================= */

function formatUnknownValue(value: unknown) {
  if (value === undefined) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

/* =========================================================
   FORMAT FRAMEWORK TEST RESULTS

   Express example:
   Test 1: PASSED
   HTTP Status: 200
   Response: {...}

   React example:
   Test 1: PASSED
   Expected: Count: 0
   Actual: Count: 0 Increment
========================================================= */

function formatFrameworkTests(results: FrameworkExecutionTestResult[] | undefined) {
  if (!Array.isArray(results) || results.length === 0) {
    return "";
  }

  return results
    .map((result, index) => {
      const testNumber = result.testNumber ?? index + 1;

      const lines = [`Test ${testNumber}: ${result.passed ? "PASSED" : "FAILED"}`];

      /* ===============================================
           EXPRESS HTTP STATUS
        =============================================== */

      if (typeof result.statusCode === "number") {
        if (typeof result.expectedStatus === "number") {
          lines.push(`HTTP Status: ${result.statusCode} (expected ${result.expectedStatus})`);
        } else {
          lines.push(`HTTP Status: ${result.statusCode}`);
        }
      }

      /* ===============================================
           EXPRESS RESPONSE
        =============================================== */

      if (result.body !== undefined) {
        lines.push(`Response:\n${formatUnknownValue(result.body)}`);
      }

      if (!result.passed && result.expectedBody !== undefined) {
        lines.push(`Expected:\n${formatUnknownValue(result.expectedBody)}`);
      }

      /* ===============================================
           REACT SELECTOR
        =============================================== */

      if (result.selector) {
        lines.push(`Selector: ${result.selector}`);
      }

      /* ===============================================
           REACT EXPECTED
        =============================================== */

      if (result.expected !== undefined) {
        lines.push(`Expected: ${formatUnknownValue(result.expected)}`);
      }

      /* ===============================================
           REACT ACTUAL
        =============================================== */

      if (result.actual !== undefined) {
        lines.push(`Actual: ${formatUnknownValue(result.actual)}`);
      }

      /* ===============================================
           MESSAGE
        =============================================== */

      if (result.message) {
        lines.push(`Message: ${result.message}`);
      }

      return lines.join("\n");
    })
    .join("\n\n");
}

/* =========================================================
   DELAY
========================================================= */

function delay(milliseconds: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

/* =========================================================
   WORKSPACE PAGE
========================================================= */

export default function CodingWorkspacePage() {
  const router = useRouter();

  const params = useParams<{
    problemSlug: string;
  }>();

  const searchParams = useSearchParams();

  const problemSlug = params.problemSlug;

  const remote = useRemoteProblem(problemSlug);
  const problem = remote.problem ?? undefined;

  /* =======================================================
     URL CONTEXT
  ======================================================= */

  const sourceParam = searchParams.get("source");

  /* =======================================================
     WORKSPACE SOURCE

     practice:
     - Show the selected practice problem/instructions.
     - Learner writes the SQL query, runs it and submits it.

     stack / challenge:
     - Keep the existing database workspace/project behavior.
  ======================================================= */

  const workspaceSource: "practice" | "stack" | "challenge" = sourceParam === "stack" || sourceParam === "challenge" ? sourceParam : "practice";

  /*
   * Keep the existing variable name used throughout this
   * large workspace file so normal navigation/execution
   * behavior remains unchanged.
   */
  const source = sourceParam;

  const technology = searchParams.get("technology");

  const domain = searchParams.get("domain");

  const stack = searchParams.get("stack");

  const moduleSlug = searchParams.get("module");

  const challenge = searchParams.get("challenge");

  const attempt = searchParams.get("attempt");

  /* =======================================================
     INITIAL CODE

     Normal:
     starterCode

     Framework:
     starterFiles[0]

     Web:
     uses workspaceFiles below
  ======================================================= */

  const initialCode = problem?.starterCode ?? problem?.starterFiles?.[0]?.content ?? "";

  /* =======================================================
     INITIAL WEB FILES

     Used only by workspaceType = web.

     A separate copy is created so learner edits never mutate
     the original problem definition.
  ======================================================= */

  const initialWebFiles =
    problem?.workspaceType === "web"
      ? (problem.starterFiles ?? []).map((file) => ({
          ...file,
        }))
      : [];

  /* =======================================================
     INITIAL INPUT
  ======================================================= */

  const initialInput = getPracticeSampleInput(problem);

  /* =======================================================
     STATE
  ======================================================= */

  const [code, setCode] = useState(initialCode);

  /* =======================================================
     WEB WORKSPACE FILE STATE

     HTML-only problems:
     - index.html

     CSS problems:
     - style.css
     - index.html

     The active file is edited by the same shared Monaco
     component used by every other technology.
  ======================================================= */

  const [workspaceFiles, setWorkspaceFiles] = useState(initialWebFiles);

  const [activeWebFilePath, setActiveWebFilePath] = useState(initialWebFiles[0]?.path ?? "");

  /* =======================================================
     WEB FILE CREATION

     HTML/CSS workspaces allow learners to create additional
     .html and .css files without leaving the shared editor.
  ======================================================= */

  const [isCreatingWebFile, setIsCreatingWebFile] = useState(false);

  const [newWebFileName, setNewWebFileName] = useState("");

  const [newWebFileError, setNewWebFileError] = useState("");

  /* =======================================================
     HTML / CSS WEB PREVIEW URL

     The rendered HTML is stored in localStorage after Run.

     The learner opens:
     /preview/web/[previewId]

     in a separate browser tab.
  ======================================================= */

  const [webPreviewUrl, setWebPreviewUrl] = useState("");

  const [customInput, setCustomInput] = useState(initialInput);

  const [output, setOutput] = useState("Run your code to view the output.");

  const [isRunning, setIsRunning] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  /* =======================================================
     REACT WEB PREVIEW URL

     Created after React Run succeeds far enough for the
     Judge/API to return previewHtml or previewUrl.

     Local example:
     http://localhost:3000/preview/react/react-counter
  ======================================================= */

  const [reactPreviewUrl, setReactPreviewUrl] = useState("");

  /* =======================================================
     RESET WHEN PROBLEM CHANGES
  ======================================================= */

  useEffect(() => {
    const selectedProblem = remote.problem ?? undefined;

    const nextCode = selectedProblem?.starterCode ?? selectedProblem?.starterFiles?.[0]?.content ?? "";

    const nextInput = getPracticeSampleInput(selectedProblem);

    const nextWebFiles =
      selectedProblem?.workspaceType === "web"
        ? (selectedProblem.starterFiles ?? []).map((file) => ({
            ...file,
          }))
        : [];

    setCode(nextCode);

    setWorkspaceFiles(nextWebFiles);

    setActiveWebFilePath(nextWebFiles[0]?.path ?? "");

    setWebPreviewUrl("");

    setIsCreatingWebFile(false);

    setNewWebFileName("");

    setNewWebFileError("");

    setCustomInput(nextInput);

    setOutput("Run your code to view the output.");

    setReactPreviewUrl("");
  }, [problemSlug, remote.problem]);

  if (remote.loading) {
    return (
      <main className={styles.notFound}>
        <Loader2 />
        <h1>Loading problem…</h1>
      </main>
    );
  }

  /* =======================================================
     PROBLEM NOT FOUND
  ======================================================= */

  if (!problem) {
    return (
      <main className={styles.notFound}>
        <h1>Problem not found</h1>

        <button type="button" onClick={() => router.push("/dashboard")}>
          Dashboard
        </button>
      </main>
    );
  }

  /* =======================================================
     WORKSPACE INFORMATION
  ======================================================= */

  // PySpark uses Python syntax but requires its own judge runtime.
  const isPythonSparkWorkspace = problem.technologySlug === "pyspark" || problem.technologySlug === "python-spark";

  const languageName = isPythonSparkWorkspace ? "PySpark" : formatLanguageName(problem.defaultLanguage ?? "python");

  const isFrameworkWorkspace = problem.workspaceType === "framework";

  const isWebWorkspace = problem.workspaceType === "web";

  const isDatabaseWorkspace = problem.workspaceType === "database";

  // Python Security uses the DevOps terminal when opened from its stack.
  // Existing ordinary Python practice problems keep the Monaco editor.
  const isPythonSecurityWorkspace = stack?.trim().toLowerCase() === "python-security" || problem.slug.toLowerCase().startsWith("python-security-") || problem.technologySlug.toLowerCase() === "python-security";

  // Network Security uses the same terminal UI as the DevOps stacks.
  // Match both stack navigation and direct problem links.
  const isNetworkSecurityWorkspace = stack?.trim().toLowerCase() === "network-security" || problem.slug.toLowerCase().startsWith("network-security-") || problem.technologySlug.toLowerCase() === "network-security";

  // Web Application Security uses the same terminal workspace as Python Security.
  // Match stack navigation, direct problem links, and dedicated technology slugs.
  const isWebSecurityWorkspace = stack?.trim().toLowerCase() === "web-security" || problem.slug.toLowerCase().startsWith("web-security-") || problem.technologySlug.toLowerCase() === "web-security";

  // Penetration Testing problems use the isolated DevOps terminal.
  // Support stack navigation, direct problem URLs, and dedicated technology slugs.
  const isPenetrationTestingWorkspace = stack?.trim().toLowerCase() === "penetration-testing" || problem.slug.toLowerCase().startsWith("penetration-testing-") || problem.technologySlug.toLowerCase() === "penetration-testing";

  // SOC & SIEM uses the existing isolated DevOps terminal.
  // Recognize navigation context, direct problem links, and technology slugs.
  const isSocSiemWorkspace = stack?.trim().toLowerCase() === "soc-siem" || problem.slug.toLowerCase().startsWith("soc-siem-") || problem.technologySlug.toLowerCase() === "soc-siem";

  // Digital Forensics uses the isolated DevOps terminal and Python Security runtime.
  // Recognize both stack navigation and direct problem links.
  const isDigitalForensicsWorkspace = stack?.trim().toLowerCase() === "digital-forensics" || problem.slug.toLowerCase().startsWith("digital-forensics-") || problem.technologySlug.toLowerCase() === "digital-forensics";

  // Cloud Security uses the existing DevOps terminal workspace.
  // Support stack navigation, direct problem URLs, and technology slugs.
  const isCloudSecurityWorkspace = stack?.trim().toLowerCase() === "cloud-security" || problem.slug.toLowerCase().startsWith("cloud-security-") || problem.technologySlug.toLowerCase() === "cloud-security";

  // DevSecOps uses the existing isolated DevOps terminal.
  // Recognize stack navigation and direct problem URLs.
  const isDevSecOpsWorkspace = stack?.trim().toLowerCase() === "devsecops" || problem.slug.toLowerCase().startsWith("devsecops-") || problem.technologySlug.toLowerCase() === "devsecops";

  // Incident Response reuses the DevOps terminal and Python Security runtime.
  // Support stack navigation and direct problem URLs.
  const isIncidentResponseWorkspace = stack?.trim().toLowerCase() === "incident-response" || problem.slug.toLowerCase().startsWith("incident-response-") || problem.technologySlug.toLowerCase() === "incident-response";

  // Blockchain & Web3 uses the existing DevOps workspace UI.
  // Match navigation, direct links, and stack-specific technology slugs.
  // Actual Solidity/Web3 execution requires its own backend runtime.
  const blockchainStackSlugs = ["ethereum-solidity", "web3-dapp-development", "smart-contract-security", "defi-tokenization"];

  const normalizedBlockchainStack = stack?.trim().toLowerCase();
  const normalizedProblemSlug = problem.slug.toLowerCase();
  const normalizedTechnologySlug = problem.technologySlug.toLowerCase();

  const isBlockchainWorkspace = blockchainStackSlugs.some((slug) => normalizedBlockchainStack === slug || normalizedProblemSlug.startsWith(`${slug}-`) || normalizedTechnologySlug === slug);

  // AWS Practice uses the standard Python coding editor, not a DevOps terminal.
  const isAwsPracticeWorkspace = problem.technologySlug === "aws" && workspaceSource === "practice";

  // Accept either public Google Cloud technology slug without changing problem IDs.
  const isGcpPracticeWorkspace = workspaceSource === "practice" && (problem.technologySlug === "gcp" || problem.technologySlug === "google-cloud" || problem.slug.startsWith("gcp-"));

  // AI & Machine Learning practice uses the standard Python coding editor.
  // Keep it separate from the dataset-based Python Machine Learning stack.
  const isAiMlPracticeWorkspace = workspaceSource === "practice" && (problem.technologySlug === "ai-ml" || problem.slug.startsWith("ai-ml-"));

  const isDevOpsWorkspace = !isAwsPracticeWorkspace && !isGcpPracticeWorkspace && !isAiMlPracticeWorkspace && (isBlockchainWorkspace || problem.workspaceType === "devops" || isPythonSecurityWorkspace || isNetworkSecurityWorkspace || isWebSecurityWorkspace || isPenetrationTestingWorkspace || isSocSiemWorkspace || isDigitalForensicsWorkspace || isCloudSecurityWorkspace || isDevSecOpsWorkspace || isIncidentResponseWorkspace);

  /* =======================================================
     CYBERSECURITY / LINUX SECURITY

     Preserve the existing Linux technology and DevOps
     workspace behavior. Identify security exercises using
     the stack route or the dedicated problem slug prefix.
  ======================================================= */

  const isLinuxSecurityWorkspace = isDevOpsWorkspace && (stack === "linux-security" || problem.slug.startsWith("linux-security-"));

  const isPowerBIWorkspace = problem.technologySlug === "power-bi";

  const frameworkRuntime = isFrameworkWorkspace ? getFrameworkRuntime(problem.technologySlug) : null;

  const isExpressWorkspace = frameworkRuntime === "express";

  const isReactWorkspace = frameworkRuntime === "react";

  const isVueWorkspace = frameworkRuntime === "vue";

  const isAngularWorkspace = frameworkRuntime === "angular";

  const isNextJsWorkspace = frameworkRuntime === "nextjs";

  const isNestJsWorkspace = frameworkRuntime === "nestjs";

  const isDjangoWorkspace = frameworkRuntime === "django";

  const isFastApiWorkspace = frameworkRuntime === "fastapi";

  const isSpringBootWorkspace = frameworkRuntime === "springboot";

  const isAspNetCoreWorkspace = frameworkRuntime === "aspnetcore";

  const workspaceDisplayName = isAwsPracticeWorkspace ? "AWS Practice (Python)" : isGcpPracticeWorkspace ? "Google Cloud Practice (Python)" : isAiMlPracticeWorkspace ? "AI & Machine Learning Practice (Python)" : isBlockchainWorkspace ? (normalizedBlockchainStack === "ethereum-solidity" || normalizedProblemSlug.startsWith("ethereum-solidity-") || normalizedTechnologySlug === "ethereum-solidity" ? "Ethereum & Solidity" : normalizedBlockchainStack === "web3-dapp-development" || normalizedProblemSlug.startsWith("web3-dapp-development-") || normalizedTechnologySlug === "web3-dapp-development" ? "Web3 & DApp Development" : normalizedBlockchainStack === "smart-contract-security" || normalizedProblemSlug.startsWith("smart-contract-security-") || normalizedTechnologySlug === "smart-contract-security" ? "Smart Contract Security" : "DeFi & Tokenization") : isIncidentResponseWorkspace ? "Incident Response" : isDevSecOpsWorkspace ? "DevSecOps" : isCloudSecurityWorkspace ? "Cloud Security" : isDigitalForensicsWorkspace ? "Digital Forensics" : isSocSiemWorkspace ? "SOC & SIEM" : isPenetrationTestingWorkspace ? "Penetration Testing" : isPythonSecurityWorkspace ? "Python Security" : isWebWorkspace ? "HTML & CSS" : problem.technologySlug === "python-machine-learning" ? "Python Machine Learning" : problem.technologySlug === "python-data-analytics" ? "Python Data Analytics" : isExpressWorkspace ? "Express.js" : isReactWorkspace ? "React" : isVueWorkspace ? "Vue.js" : isAngularWorkspace ? "Angular" : isNextJsWorkspace ? "Next.js" : isNestJsWorkspace ? "NestJS" : isDjangoWorkspace ? "Django" : isFastApiWorkspace ? "FastAPI" : isSpringBootWorkspace ? "Spring Boot" : isAspNetCoreWorkspace ? "ASP.NET Core" : languageName;

  const activeWebFile = isWebWorkspace ? (workspaceFiles.find((file) => file.path === activeWebFilePath) ?? workspaceFiles[0]) : undefined;

  const activeFile = isWebWorkspace ? activeWebFile : problem.starterFiles?.[0];

  /* =======================================================
     UPDATE ACTIVE WEB FILE

     Switching tabs never loses content because every edit is
     stored back into workspaceFiles.
  ======================================================= */

  const updateActiveWebFile = (nextValue: string) => {
    if (!activeWebFile) {
      return;
    }

    setWorkspaceFiles((currentFiles) =>
      currentFiles.map((file) =>
        file.path === activeWebFile.path
          ? {
              ...file,

              content: nextValue,
            }
          : file,
      ),
    );
  };

  /* =======================================================
     NEW WEB FILE

     Current web workspace policy:
     - .html
     - .css

     JavaScript web files are intentionally added later when
     script execution is enabled for the Web Workspace.
  ======================================================= */

  const createWebFile = () => {
    const normalizedName = newWebFileName.trim().replace(/\\/g, "/").replace(/^\.\//, "");

    if (!normalizedName) {
      setNewWebFileError("Enter a file name.");

      return;
    }

    if (normalizedName.startsWith("/") || normalizedName.includes("../") || normalizedName === "..") {
      setNewWebFileError("Use a workspace-relative file name such as style.css.");

      return;
    }

    const lowerName = normalizedName.toLowerCase();

    const isHtmlFile = lowerName.endsWith(".html");

    const isCssFile = lowerName.endsWith(".css");

    if (!isHtmlFile && !isCssFile) {
      setNewWebFileError("Only .html and .css files are allowed in this workspace.");

      return;
    }

    const alreadyExists = workspaceFiles.some((file) => file.path.toLowerCase() === lowerName);

    if (alreadyExists) {
      setNewWebFileError("A file with this name already exists.");

      return;
    }

    const language = isCssFile ? "css" : "html";

    const starterContent = isCssFile
      ? `/* Write your CSS here */\n`
      : `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
  <title>New Page</title>
</head>

<body>
  <!-- Write your HTML here -->
</body>
</html>
`;

    setWorkspaceFiles((currentFiles) => [
      ...currentFiles,
      {
        path: normalizedName,

        language,

        content: starterContent,
      },
    ]);

    setActiveWebFilePath(normalizedName);

    setNewWebFileName("");

    setNewWebFileError("");

    setIsCreatingWebFile(false);

    setWebPreviewUrl("");

    setOutput(isCssFile ? [`${normalizedName} created ✓`, "", "To link it from index.html, add:", `<link rel="stylesheet" href="${normalizedName}" />`, "", "Then click Run to generate the latest preview."].join("\n") : [`${normalizedName} created ✓`, "", "The file is ready in the HTML/CSS workspace.", "Click Run after editing to generate the latest preview."].join("\n"));
  };

  const cancelWebFileCreation = () => {
    setIsCreatingWebFile(false);

    setNewWebFileName("");

    setNewWebFileError("");
  };

  /* =======================================================
     EXECUTION CONTEXT
  ======================================================= */

  const executionContext = {
    source: source ?? "practice",

    technology: technology ?? problem.technologySlug,

    domain,

    stack,

    module: moduleSlug,

    challenge,

    attempt,
  };

  /* =======================================================
     GO BACK
  ======================================================= */

  const goBack = () => {
    if (source === "assignments") {
      router.push("/assignments");
      return;
    }
    /* ===============================================
         STACK
      =============================================== */

    if (source === "stack" && domain && stack && moduleSlug) {
      router.push(`/stacks/${domain}/${stack}/${moduleSlug}`);

      return;
    }

    /* ===============================================
         PRACTICE
      =============================================== */

    if (source === "practice" && technology) {
      router.push(`/practice/${technology === "gcp" ? "google-cloud" : technology}`);

      return;
    }

    /* ===============================================
         CHALLENGE
      =============================================== */

    if (source === "challenge" && challenge) {
      router.push(`/challenges/${challenge}`);

      return;
    }

    router.back();
  };

  /* =======================================================
     RETURN AFTER SOLVED
  ======================================================= */

  const returnAfterSolved = () => {
    if (source === "assignments") {
      router.replace("/assignments");
      return;
    }
    /* ===============================================
         PRACTICE
      =============================================== */

    if (source === "practice" && technology) {
      router.replace(`/practice/${technology === "gcp" ? "google-cloud" : technology}`);

      return;
    }

    /* ===============================================
         STACK
      =============================================== */

    if (source === "stack" && domain && stack && moduleSlug) {
      router.replace(`/stacks/${domain}/${stack}/${moduleSlug}`);

      return;
    }

    /* ===============================================
         CHALLENGE
      =============================================== */

    if (source === "challenge" && challenge) {
      router.replace(`/challenges/${challenge}`);

      return;
    }

    router.back();
  };

  /* =======================================================
     BUILD FRAMEWORK FILES

     Current Monaco edits first starter file.

     Express:
     server.js

     React:
     App.jsx

     Angular:
     app.component.ts

     Next.js:
     App Router starter file (for example app/page.tsx)

     NestJS:
     One or more TypeScript files under src/.

     Django:
     Python files such as app/views.py, app/urls.py,
     app/models.py, or app/services.py.

     The first starter file is edited by the shared Monaco
     editor. Supporting starter files are preserved and sent
     unchanged until multi-file framework tabs are introduced.
  ======================================================= */

  const buildFrameworkFiles = () => {
    if (!problem.starterFiles || problem.starterFiles.length === 0) {
      return [];
    }

    /*
     * The framework API requires every file to contain:
     * path + language + content.
     *
     * Some older problem definitions (including Vue problems)
     * may not have `language` on starterFiles. Infer it safely
     * from the file extension/runtime instead of sending an
     * undefined language and receiving HTTP 400.
     */
    const inferFrameworkFileLanguage = (filePath: string, configuredLanguage?: string) => {
      const explicitLanguage = String(configuredLanguage ?? "")
        .trim()
        .toLowerCase();

      if (explicitLanguage) {
        return explicitLanguage;
      }

      const normalizedPath = String(filePath ?? "")
        .trim()
        .toLowerCase();

      if (normalizedPath.endsWith(".vue")) {
        return "vue";
      }

      if (normalizedPath.endsWith(".tsx")) {
        return "typescript";
      }

      if (normalizedPath.endsWith(".ts")) {
        return "typescript";
      }

      if (normalizedPath.endsWith(".jsx")) {
        return "javascript";
      }

      if (normalizedPath.endsWith(".js") || normalizedPath.endsWith(".mjs") || normalizedPath.endsWith(".cjs")) {
        return "javascript";
      }

      if (normalizedPath.endsWith(".py")) {
        return "python";
      }

      if (normalizedPath.endsWith(".java")) {
        return "java";
      }

      if (normalizedPath.endsWith(".cs")) {
        return "csharp";
      }

      if (normalizedPath.endsWith(".html")) {
        return "html";
      }

      if (normalizedPath.endsWith(".css")) {
        return "css";
      }

      /*
       * Runtime fallback is important for framework-specific
       * files whose extension alone may not be enough.
       */
      if (frameworkRuntime === "vue") {
        return "vue";
      }

      if (frameworkRuntime === "react" || frameworkRuntime === "express") {
        return "javascript";
      }

      if (frameworkRuntime === "angular" || frameworkRuntime === "nextjs" || frameworkRuntime === "nestjs") {
        return "typescript";
      }

      if (frameworkRuntime === "django" || frameworkRuntime === "fastapi") {
        return "python";
      }

      if (frameworkRuntime === "springboot") {
        return "java";
      }

      if (frameworkRuntime === "aspnetcore") {
        return "csharp";
      }

      return problem.defaultLanguage || "text";
    };

    return problem.starterFiles.map((file, index) => ({
      path: file.path,

      language: inferFrameworkFileLanguage(file.path, file.language),

      content: index === 0 ? code : file.content,
    }));
  };

  /* =======================================================
     CREATE REACT WEB PREVIEW URL

     Preferred flow:
     Judge/API returns previewHtml
       ↓
     Store previewHtml in localStorage
       ↓
     Create same-origin eLab preview URL
       ↓
     /preview/react/[previewId]

     Example:
     http://localhost:3000/preview/react/react-counter

     The separate preview page reads:
     elab_react_preview_<previewId>

     and renders the HTML inside a sandboxed iframe.
  ======================================================= */

  const createReactPreviewUrl = (data: FrameworkExecutionResponse) => {
    if (!isReactWorkspace) {
      return "";
    }

    try {
      /* ===============================================
           PREVIEW HTML

           This is the recommended path.
        =============================================== */

      if (typeof data.previewHtml === "string" && data.previewHtml.trim()) {
        const previewId = problem.slug;

        const storageKey = `elab_react_preview_${previewId}`;

        window.localStorage.setItem(storageKey, data.previewHtml);

        const previewUrl = `${window.location.origin}/preview/react/${encodeURIComponent(previewId)}`;

        setReactPreviewUrl(previewUrl);

        return previewUrl;
      }

      /* ===============================================
           DIRECT PREVIEW URL

           Allows the backend to provide a URL later
           without changing this workspace page.
        =============================================== */

      if (typeof data.previewUrl === "string" && data.previewUrl.trim()) {
        const previewUrl = data.previewUrl.startsWith("http://") || data.previewUrl.startsWith("https://") ? data.previewUrl : new URL(data.previewUrl, window.location.origin).toString();

        setReactPreviewUrl(previewUrl);

        return previewUrl;
      }

      setReactPreviewUrl("");

      return "";
    } catch (error) {
      console.error("Unable to create React web preview:", error);

      setReactPreviewUrl("");

      return "";
    }
  };

  /* =======================================================
     RUN NORMAL CODE
  ======================================================= */

  const runCodeWorkspace = async () => {
    const response = await fetch(`${API_URL}/executions/run`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        problemSlug: problem.slug,

        language: isPythonSparkWorkspace ? "pyspark" : problem.technologySlug === "python-machine-learning" ? "python-machine-learning" : problem.technologySlug === "python-data-analytics" ? "python-data-analytics" : problem.technologySlug === "aws" || isGcpPracticeWorkspace || isAiMlPracticeWorkspace ? "python" : problem.defaultLanguage,

        workspaceType: problem.workspaceType ?? "code",

        code,

        /*
         * Next.js, NestJS, Django, Spring Boot, and ASP.NET Core use the shared
         * /executions/run endpoint.
         *
         * Framework starter files are sent so the API
         * keeps the correct learner-editable file path.
         */
        files: isNextJsWorkspace || isNestJsWorkspace || isDjangoWorkspace || isFastApiWorkspace || isSpringBootWorkspace || isAspNetCoreWorkspace ? buildFrameworkFiles() : undefined,

        input: (problem.slug === "aws-validate-region" || problem.slug === "gcp-validate-region") && !customInput.trim() ? getPracticeSampleInput(problem) : customInput,

        context: executionContext,
      }),
    });

    const data = (await response.json()) as ExecutionResponse;

    /* ===============================================
         HTTP ERROR
      =============================================== */

    if (!response.ok) {
      setOutput(data.message ?? "Execution failed.");

      return;
    }

    /* ===============================================
         SUCCESS
      =============================================== */

    if (data.status === "SUCCESS") {
      const programOutput = data.output ?? "";

      setOutput(programOutput.trim() ? programOutput : "Program completed successfully with no output.");

      return;
    }

    /* ===============================================
         COMPILATION ERROR
      =============================================== */

    if (data.status === "COMPILATION_ERROR") {
      setOutput(["Compilation Error", "", data.output ?? data.stderr ?? "Compilation failed."].join("\n"));

      return;
    }

    /* ===============================================
         TIME LIMIT
      =============================================== */

    if (data.status === "TIME_LIMIT_EXCEEDED") {
      setOutput(["Time Limit Exceeded", "", "Your program exceeded the allowed execution time."].join("\n"));

      return;
    }

    /* ===============================================
         RUNTIME ERROR
      =============================================== */

    if (data.status === "RUNTIME_ERROR") {
      setOutput(["Runtime Error", "", data.output ?? data.stderr ?? data.message ?? "The program terminated unexpectedly."].join("\n"));

      return;
    }

    /* ===============================================
         FALLBACK
      =============================================== */

    setOutput(data.output ?? data.message ?? "Execution completed.");
  };

  /* =======================================================
     RUN FRAMEWORK

     Express
       ↓
     /framework-executions/run

     React
       ↓
     /framework-executions/run

     Angular
       ↓
     /framework-executions/run

     Next.js / NestJS / Django / Spring Boot / ASP.NET Core
       ↓
     /executions/run
       ↓
     ExecutionsService
       ↓
     Judge /run/framework
  ======================================================= */

  const runFrameworkWorkspace = async () => {
    /* ===============================================
         NEXT.JS / NESTJS / DJANGO / SPRING BOOT

         These use the shared execution endpoint.

         ExecutionsService detects:
         problemSlug = nextjs-* / nestjs-* / django-* / springboot-* / aspnetcore-*
         workspaceType = framework

         and forwards the request to:
         Judge POST /run/framework.

         Starter files are preserved so each framework keeps
         the correct learner-editable file path.
      =============================================== */

    if (isNextJsWorkspace || isNestJsWorkspace || isDjangoWorkspace || isFastApiWorkspace || isSpringBootWorkspace || isAspNetCoreWorkspace) {
      await runCodeWorkspace();

      return;
    }

    /* ===============================================
         CHECK RUNTIME
      =============================================== */

    if (!frameworkRuntime) {
      setOutput(["Framework Runtime Not Available", "", `The ${problem.technologySlug} runtime has not been connected yet.`].join("\n"));

      return;
    }

    /* ===============================================
         FILES
      =============================================== */

    const files = buildFrameworkFiles();

    if (files.length === 0) {
      setOutput(["Framework Configuration Error", "", "No starter files are configured for this problem."].join("\n"));

      return;
    }

    /* ===============================================
         API REQUEST
      =============================================== */

    const response = await fetch(`${API_URL}/framework-executions/run`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        problemSlug: problem.slug,

        runtime: frameworkRuntime,

        files,

        context: executionContext,
      }),
    });

    const data = (await response.json()) as FrameworkExecutionResponse;

    /* ===============================================
         HTTP ERROR
      =============================================== */

    if (!response.ok) {
      setOutput(["Framework Execution Failed", "", data.message ?? data.stderr ?? data.output ?? "Unable to execute framework application."].join("\n"));

      return;
    }

    /* ===============================================
         REACT WEB PREVIEW

         Generate the localhost-style preview URL as soon
         as the API returns previewHtml/previewUrl.

         This also works when public tests fail, provided
         the React component compiled successfully.
      =============================================== */

    const previewUrl = createReactPreviewUrl(data);

    const testResults = formatFrameworkTests(data.testResults);

    /* ===============================================
         SUCCESS
      =============================================== */

    if (data.status === "SUCCESS") {
      /*
       * Vue Run should show the learner-visible component output
       * instead of the generic framework success message.
       *
       * For simple static Vue practice problems such as
       * vue-hello-world, read the visible text from the <template>
       * block currently present in Monaco.
       *
       * Other framework runtimes keep their existing output
       * behavior unchanged.
       */
      if (isVueWorkspace) {
        const templateMatch = code.match(/<template(?:\s[^>]*)?>([\s\S]*?)<\/template>/i);

        const vueTemplate = templateMatch?.[1] ?? "";

        const vueVisibleOutput = vueTemplate
          .replace(/<!--[\s\S]*?-->/g, "")
          .replace(/<script[\s\S]*?<\/script>/gi, "")
          .replace(/<style[\s\S]*?<\/style>/gi, "")
          .replace(/<[^>]+>/g, " ")
          .replace(/&nbsp;/gi, " ")
          .replace(/&lt;/gi, "<")
          .replace(/&gt;/gi, ">")
          .replace(/&amp;/gi, "&")
          .replace(/&quot;/gi, '"')
          .replace(/&#39;/gi, "'")
          .replace(/\s+/g, " ")
          .trim();

        setOutput(vueVisibleOutput || testResults || data.message || "Vue.js execution completed successfully.");

        return;
      }

      setOutput([`${workspaceDisplayName} execution successful ✓`, "", testResults || "Framework test completed successfully.", previewUrl ? `\nWeb Preview:\n${previewUrl}` : "", data.stderr ? `\nWarnings / stderr:\n${data.stderr}` : ""].filter(Boolean).join("\n"));

      return;
    }

    /* ===============================================
         TEST FAILED
      =============================================== */

    if (data.status === "TEST_FAILED") {
      const advice = isExpressWorkspace ? "Check your route, HTTP status and response body." : isReactWorkspace ? "Check your rendered content, state updates and component interactions." : isVueWorkspace ? "Check your Vue template, reactive state, event handling and rendered output." : isAngularWorkspace ? "Check your Angular template, component state, event bindings and rendered output." : "Check your framework implementation and expected behavior.";

      setOutput(["Test Failed", "", testResults || data.output || "The framework application ran, but the expected result was not produced.", previewUrl ? `\nWeb Preview:\n${previewUrl}` : "", "", advice].filter(Boolean).join("\n"));

      return;
    }

    /* ===============================================
         SERVER START ERROR
      =============================================== */

    if (data.status === "SERVER_START_ERROR") {
      setOutput(["Server Start Error", "", data.stderr ?? data.output ?? data.message ?? `${workspaceDisplayName} application could not be started.`].join("\n"));

      return;
    }

    /* ===============================================
         BUILD ERROR

         Important for React:
         JSX/esbuild/render errors.
      =============================================== */

    if (data.status === "BUILD_ERROR") {
      const fallback = isReactWorkspace ? "The React component could not be compiled or rendered." : isVueWorkspace ? "The Vue component could not be compiled or rendered." : isAngularWorkspace ? "The Angular component could not be compiled or rendered." : "Framework build failed.";

      setOutput(["Build Error", "", data.stderr ?? data.output ?? data.message ?? fallback].join("\n"));

      return;
    }

    /* ===============================================
         TIME LIMIT
      =============================================== */

    if (data.status === "TIME_LIMIT_EXCEEDED") {
      setOutput(["Time Limit Exceeded", "", data.message ?? "The framework application exceeded the execution time limit."].join("\n"));

      return;
    }

    /* ===============================================
         RUNTIME ERROR
      =============================================== */

    if (data.status === "RUNTIME_ERROR") {
      setOutput(["Runtime Error", "", data.stderr ?? data.output ?? data.message ?? "The framework application terminated unexpectedly."].join("\n"));

      return;
    }

    /* ===============================================
         INVALID REQUEST
      =============================================== */

    if (data.status === "INVALID_REQUEST") {
      setOutput(["Framework Configuration Error", "", data.message ?? "The framework execution request was rejected."].join("\n"));

      return;
    }

    /* ===============================================
         UNSUPPORTED RUNTIME
      =============================================== */

    if (data.status === "UNSUPPORTED_RUNTIME") {
      setOutput(["Unsupported Framework Runtime", "", data.message ?? `Runtime ${frameworkRuntime} is not supported.`].join("\n"));

      return;
    }

    /* ===============================================
         FALLBACK
      =============================================== */

    setOutput(data.message ?? data.output ?? "Framework execution completed.");
  };

  /* =======================================================
     RUN BUTTON
  ======================================================= */

  const handleRun = async () => {
    /* ===============================================
         WEB WORKSPACE

         Step 3:
         Build the browser preview directly from the
         learner's current HTML/CSS workspace files.

         This still does NOT call the Web Judge.
         Judge-based public tests are added later.
      =============================================== */

    if (isWebWorkspace) {
      const hasWebContent = workspaceFiles.some((file) => file.content.trim().length > 0);

      if (!hasWebContent) {
        setOutput("Please enter HTML or CSS before running.");

        return;
      }

      try {
        const previewHtml = buildWebPreview(workspaceFiles);

        const previewId = problem.slug;

        const storageKey = `elab_web_preview_${previewId}`;

        window.localStorage.setItem(storageKey, previewHtml);

        const previewUrl = `${window.location.origin}/preview/web/${encodeURIComponent(previewId)}`;

        setWebPreviewUrl(previewUrl);

        setOutput(["Web Preview Ready ✓", "", "Your HTML/CSS preview has been generated.", "Use the Open Preview link above the editor to view it in a new tab."].join("\n"));
      } catch (error) {
        console.error("Unable to build web preview:", error);

        setWebPreviewUrl("");

        setOutput(["Web Preview Error", "", "The HTML/CSS preview could not be generated."].join("\n"));
      }

      return;
    }

    if (!code.trim()) {
      setOutput("Please enter code before running.");

      return;
    }

    setIsRunning(true);

    /*
     * Clear an older React preview while the latest
     * code is being compiled and tested.
     */
    if (isReactWorkspace) {
      setReactPreviewUrl("");
    }

    /* ===============================================
         RUNNING MESSAGE
      =============================================== */

    if (isExpressWorkspace) {
      setOutput("Starting Express.js application and running HTTP tests...");
    } else if (isReactWorkspace) {
      setOutput("Rendering React component and running component tests...");
    } else if (isVueWorkspace) {
      setOutput("Rendering Vue component and running component tests...");
    } else if (isAngularWorkspace) {
      setOutput("Rendering Angular component and running component tests...");
    } else if (isNextJsWorkspace) {
      setOutput("Building Next.js application...");
    } else if (isNestJsWorkspace) {
      setOutput("Compiling NestJS application...");
    } else if (isDjangoWorkspace) {
      setOutput("Validating Django application...");
    } else if (isFastApiWorkspace) {
      setOutput("Starting FastAPI application and running API tests...");
    } else if (isSpringBootWorkspace) {
      setOutput("Building Spring Boot application...");
    } else if (isAspNetCoreWorkspace) {
      setOutput("Building ASP.NET Core application...");
    } else if (isFrameworkWorkspace) {
      setOutput(`Starting ${workspaceDisplayName} framework tests...`);
    } else {
      setOutput("Compiling and running your code...");
    }

    try {
      /* ===============================================
           FRAMEWORK
        =============================================== */

      if (isFrameworkWorkspace) {
        await runFrameworkWorkspace();

        return;
      }

      /* ===============================================
           NORMAL CODE
        =============================================== */

      await runCodeWorkspace();
    } catch (error) {
      console.error(error);

      const errorMessage = error instanceof Error ? error.message : String(error ?? "");

      setOutput(["Execution Server Error", "", isFrameworkWorkspace ? "Unable to connect to the framework execution service." : "Unable to connect to the compiler service.", errorMessage ? `\nDetails: ${errorMessage}` : "", isFrameworkWorkspace ? `\nAPI endpoint: ${API_URL}/framework-executions/run` : ""].filter(Boolean).join("\n"));
    } finally {
      setIsRunning(false);
    }
  };

  /* =======================================================
     SUBMIT

     Normal:
     C
     C++
     JavaScript
     Node.js
       ↓
     /submissions

     Framework:
     Express
     React
     Angular
       ↓
     /framework-submissions

     Next.js:
       ↓
     /submissions
       ↓
     SubmissionsService
       ↓
     Judge /run/framework

     NestJS:
       ↓
     /submissions
       ↓
     SubmissionsService
       ↓
     Judge /run/framework
       ↓
     NestJS hidden source checks

     Django:
       ↓
     /submissions
       ↓
     SubmissionsService
       ↓
     Judge /run/framework
       ↓
     Django hidden source checks
  ======================================================= */

  const handleSubmit = async () => {
    /* ===============================================
         WEB WORKSPACE

         Web hidden-test submission is connected later.
         Do not send HTML/CSS to the normal submissions
         endpoint.
      =============================================== */

    if (isWebWorkspace) {
      setOutput(["Web Submission Not Connected Yet", "", "Your HTML/CSS files are being preserved correctly.", "Web submission tests will be connected after preview and the Web Judge are ready."].join("\n"));

      return;
    }

    if (!code.trim()) {
      setOutput("Please enter code before submitting.");

      return;
    }

    setIsSubmitting(true);

    setOutput(isReactWorkspace ? "Submitting React solution and running hidden component tests..." : isVueWorkspace ? "Submitting Vue solution and running hidden component tests..." : isAngularWorkspace ? "Submitting Angular solution and running hidden component tests..." : isExpressWorkspace ? "Submitting Express.js solution and running hidden HTTP tests..." : isNextJsWorkspace ? "Submitting Next.js solution and running hidden tests..." : isNestJsWorkspace ? "Submitting NestJS solution and running hidden tests..." : isDjangoWorkspace ? "Submitting Django solution and running hidden tests..." : isFastApiWorkspace ? "Submitting FastAPI solution and running hidden tests..." : isSpringBootWorkspace ? "Submitting Spring Boot solution and running hidden tests..." : isAspNetCoreWorkspace ? "Submitting ASP.NET Core solution and running hidden tests..." : "Submitting solution and running hidden test cases...");

    try {
      /* ===================================================
           FRAMEWORK SUBMISSION

           Supports:
           - Express
           - React
           - Vue
           - Angular

           Next.js, NestJS, Django, Spring Boot, and ASP.NET Core intentionally fall
           through to the normal /submissions endpoint because
           SubmissionsService contains their framework
           hidden-test routing.
        =================================================== */

      if (isFrameworkWorkspace && !isNextJsWorkspace && !isNestJsWorkspace && !isDjangoWorkspace && !isFastApiWorkspace && !isSpringBootWorkspace && !isAspNetCoreWorkspace) {
        /* ===============================================
             RUNTIME
          =============================================== */

        if (!frameworkRuntime) {
          setOutput(["Framework Submission Error", "", `No framework runtime is configured for ${problem.technologySlug}.`].join("\n"));

          return;
        }

        /* ===============================================
             FILES
          =============================================== */

        const files = buildFrameworkFiles();

        if (files.length === 0) {
          setOutput(["Framework Submission Error", "", "No framework files are configured for this problem."].join("\n"));

          return;
        }

        /* ===============================================
             FRAMEWORK SUBMISSION API
          =============================================== */

        const response = await fetch(`${API_URL}/framework-submissions`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            problemSlug: problem.slug,

            runtime: frameworkRuntime,

            files,

            context: executionContext,
          }),
        });

        const data = (await response.json()) as SubmissionResponse;

        /* ===============================================
             HTTP ERROR
          =============================================== */

        if (!response.ok) {
          setOutput(["Framework Submission Error", "", data.message ?? "Framework submission failed."].join("\n"));

          return;
        }

        /* ===============================================
             TEST COUNTS
          =============================================== */

        const passedTests = data.passedTests ?? 0;

        const totalTests = data.totalTests ?? 0;

        const score = data.score ?? 0;

        const testResults = Array.isArray(data.results) ? data.results.map((result) => `Test ${result.testNumber}: ${result.status}`).join("\n") : "";

        /* ===============================================
             SOLVED CONDITION

             Never use:
             data.accepted === true
          =============================================== */

        const allTestsPassed = data.status === "ACCEPTED" && totalTests > 0 && passedTests === totalTests;

        /* ===============================================
             ACCEPTED
          =============================================== */

        if (allTestsPassed) {
          markProblemSolved(problem.slug);

          console.log("Framework problem marked as solved:", problem.slug);

          setOutput(["Accepted ✓", "", `${passedTests}/${totalTests} test cases passed`, `Score: ${score}%`, "", testResults, "", "Problem solved successfully.", "Returning to the problem list..."].join("\n"));

          await delay(1200);

          returnAfterSolved();

          return;
        }

        /* ===============================================
             ACCEPTED BUT NOT VERIFIED
          =============================================== */

        if (data.status === "ACCEPTED") {
          setOutput(["Submission received.", "", `${passedTests}/${totalTests} test cases passed`, `Score: ${score}%`, "", testResults, "", "The problem was not marked solved because all hidden test results could not be verified."].join("\n"));

          return;
        }

        /* ===============================================
             WRONG ANSWER
          =============================================== */

        if (data.status === "WRONG_ANSWER") {
          setOutput(["Wrong Answer", "", `${passedTests}/${totalTests} test cases passed`, `Score: ${score}%`, "", testResults, "", isReactWorkspace ? "Fix your React component and submit again." : isVueWorkspace ? "Fix your Vue component and submit again." : isAngularWorkspace ? "Fix your Angular component and submit again." : `Fix your ${workspaceDisplayName} solution and submit again.`].join("\n"));

          return;
        }

        /* ===============================================
             SERVER START ERROR
          =============================================== */

        if (data.status === "SERVER_START_ERROR") {
          setOutput(["Server Start Error", "", data.stderr ?? data.output ?? data.message ?? "The framework application could not be started."].join("\n"));

          return;
        }

        /* ===============================================
             BUILD ERROR
          =============================================== */

        if (data.status === "BUILD_ERROR") {
          setOutput(["Build Error", "", data.stderr ?? data.output ?? data.message ?? (isReactWorkspace ? "The React component could not be compiled." : isAngularWorkspace ? "The Angular component could not be compiled." : "Framework build failed.")].join("\n"));

          return;
        }

        /* ===============================================
             TIME LIMIT
          =============================================== */

        if (data.status === "TIME_LIMIT_EXCEEDED") {
          setOutput(["Time Limit Exceeded", "", `${passedTests}/${totalTests} test cases passed`, "", testResults, "", "Your framework application exceeded the allowed execution time."].join("\n"));

          return;
        }

        /* ===============================================
             RUNTIME ERROR
          =============================================== */

        if (data.status === "RUNTIME_ERROR") {
          setOutput(["Runtime Error", "", data.stderr ?? data.output ?? data.message ?? "The framework application failed during execution."].join("\n"));

          return;
        }

        /* ===============================================
             INVALID REQUEST
          =============================================== */

        if (data.status === "INVALID_REQUEST") {
          setOutput(["Framework Submission Error", "", data.message ?? "The framework submission request was rejected."].join("\n"));

          return;
        }

        /* ===============================================
             UNSUPPORTED RUNTIME
          =============================================== */

        if (data.status === "UNSUPPORTED_RUNTIME") {
          setOutput(["Unsupported Framework Runtime", "", data.message ?? `Runtime ${frameworkRuntime} is not supported.`].join("\n"));

          return;
        }

        /* ===============================================
             FALLBACK
          =============================================== */

        setOutput(data.message ?? data.output ?? "Framework submission completed.");

        return;
      }

      /* ===================================================
           NORMAL SUBMISSION
        =================================================== */

      const response = await fetch(`${API_URL}/submissions`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          problemSlug: problem.slug,

          language: isPythonSparkWorkspace ? "pyspark" : problem.technologySlug === "python-machine-learning" ? "python-machine-learning" : problem.technologySlug === "python-data-analytics" ? "python-data-analytics" : problem.technologySlug === "aws" || isGcpPracticeWorkspace || isAiMlPracticeWorkspace ? "python" : problem.defaultLanguage,

          code,

          /*
           * Next.js, NestJS, Django, Spring Boot, and ASP.NET Core are framework
           * problems routed through the normal
           * /submissions endpoint.
           *
           * Their starter files are preserved so the
           * submission service can validate the correct
           * framework file paths.
           */
          files: isNextJsWorkspace || isNestJsWorkspace || isDjangoWorkspace || isFastApiWorkspace || isSpringBootWorkspace || isAspNetCoreWorkspace ? buildFrameworkFiles() : undefined,

          context: executionContext,
        }),
      });

      const data = (await response.json()) as SubmissionResponse;

      /* ===============================================
           HTTP ERROR
        =============================================== */

      if (!response.ok) {
        setOutput(data.message ?? "Submission failed.");

        return;
      }

      /* ===============================================
           COMPILATION ERROR
        =============================================== */

      if (data.status === "COMPILATION_ERROR") {
        setOutput(["Compilation Error", "", data.output ?? data.stderr ?? "Compilation failed."].join("\n"));

        return;
      }

      /* ===============================================
           TEST RESULTS
        =============================================== */

      const testResults = Array.isArray(data.results) ? data.results.map((result) => `Test ${result.testNumber}: ${result.status}`).join("\n") : "";

      const passedTests = data.passedTests ?? 0;

      const totalTests = data.totalTests ?? 0;

      const score = data.score ?? 0;

      /* ===============================================
           SOLVED CONDITION
        =============================================== */

      const allTestsPassed = data.status === "ACCEPTED" && totalTests > 0 && passedTests === totalTests;

      /* ===============================================
           ACCEPTED
        =============================================== */

      if (allTestsPassed) {
        markProblemSolved(problem.slug);

        console.log("Problem marked as solved:", problem.slug);

        setOutput(["Accepted ✓", "", `${passedTests}/${totalTests} test cases passed`, `Score: ${score}%`, "", testResults, "", "Problem solved successfully.", "Returning to the problem list..."].join("\n"));

        await delay(1200);

        returnAfterSolved();

        return;
      }

      /* ===============================================
           ACCEPTED BUT UNVERIFIED
        =============================================== */

      if (data.status === "ACCEPTED") {
        setOutput(["Submission received.", "", `${passedTests}/${totalTests} test cases passed`, `Score: ${score}%`, "", testResults, "", "The problem was not marked solved because all test results could not be verified."].join("\n"));

        return;
      }

      /* ===============================================
           WRONG ANSWER
        =============================================== */

      if (data.status === "WRONG_ANSWER") {
        setOutput(["Wrong Answer", "", `${passedTests}/${totalTests} test cases passed`, `Score: ${score}%`, "", testResults, "", isNestJsWorkspace ? "Fix your NestJS implementation and submit again." : isNextJsWorkspace ? "Fix your Next.js implementation and submit again." : isDjangoWorkspace ? "Fix your Django implementation and submit again." : isFastApiWorkspace ? "Fix your FastAPI implementation and submit again." : "Fix your solution and submit again."].join("\n"));

        return;
      }

      /* ===============================================
           TIME LIMIT
        =============================================== */

      if (data.status === "TIME_LIMIT_EXCEEDED") {
        setOutput(["Time Limit Exceeded", "", `${passedTests}/${totalTests} test cases passed`, "", testResults, "", "Optimize your solution and submit again."].join("\n"));

        return;
      }

      /* ===============================================
           RUNTIME ERROR
        =============================================== */

      if (data.status === "RUNTIME_ERROR") {
        setOutput(["Runtime Error", "", data.output ?? data.stderr ?? data.message ?? "Your program failed during execution."].join("\n"));

        return;
      }

      /* ===============================================
           FALLBACK
        =============================================== */

      setOutput(data.message ?? data.output ?? "Submission completed.");
    } catch (error) {
      console.error(error);

      setOutput(["Submission Server Error", "", isFrameworkWorkspace ? "Unable to connect to the framework submission service." : "Unable to connect to the submission service."].join("\n"));
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =======================================================
     UI
  ======================================================= */

  /* =======================================================
     POWER BI WORKSPACE
  ======================================================= */

  if (isPowerBIWorkspace) {
    return <PowerBIWorkspace problem={problem} source={workspaceSource} />;
  }

  /* =======================================================
     DATABASE WORKSPACE
  ======================================================= */

  if (isDatabaseWorkspace) {
    return <DatabaseWorkspace problem={problem} source={workspaceSource} />;
  }

  /* =======================================================
     DEVOPS / LINUX WORKSPACE
  ======================================================= */

  if (isDevOpsWorkspace) {
    return <DevOpsWorkspace key={isBlockchainWorkspace ? `blockchain:${normalizedBlockchainStack ?? normalizedTechnologySlug}:${problem.slug}` : isPythonSecurityWorkspace ? `python-security:${problem.slug}` : isLinuxSecurityWorkspace ? `linux-security:${problem.slug}` : isNetworkSecurityWorkspace ? `network-security:${problem.slug}` : isWebSecurityWorkspace ? `web-security:${problem.slug}` : isPenetrationTestingWorkspace ? `penetration-testing:${problem.slug}` : isSocSiemWorkspace ? `soc-siem:${problem.slug}` : isDigitalForensicsWorkspace ? `digital-forensics:${problem.slug}` : isCloudSecurityWorkspace ? `cloud-security:${problem.slug}` : isDevSecOpsWorkspace ? `devsecops:${problem.slug}` : problem.slug} problem={problem} source={workspaceSource} />;
  }

  return (
    <main className={styles.workspace}>
      {/* =================================================
          HEADER
      ================================================= */}

      <header className={styles.workspaceHeader}>
        <button type="button" className={styles.backButton} onClick={goBack}>
          <ArrowLeft />
          Problems
        </button>

        <div className={styles.problemTitle}>
          <Code2 />

          <div>
            <strong>{problem.title}</strong>

            <span>
              {workspaceDisplayName}

              {" • "}

              {problem.difficulty}
            </span>
          </div>
        </div>

        <div className={styles.workspaceActions}>
          {/* =============================================
              RUN
          ============================================= */}

          <button type="button" className={styles.runButton} onClick={handleRun} disabled={isRunning || isSubmitting}>
            {isRunning ? <Loader2 className={styles.spinner} /> : <Play />}

            {isRunning ? "Running..." : "Run"}
          </button>

          {/* =============================================
              SUBMIT
          ============================================= */}

          <button type="button" className={styles.submitButton} onClick={handleSubmit} disabled={isRunning || isSubmitting}>
            {isSubmitting ? <Loader2 className={styles.spinner} /> : <Send />}

            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </header>

      {/* =================================================
          BODY
      ================================================= */}

      <div className={styles.workspaceBody}>
        {/* =================================================
            LEFT PANEL
        ================================================= */}

        <section className={styles.problemPanel}>
          <div className={styles.problemPanelHeader}>Problem</div>

          <div className={styles.problemPanelContent}>
            {/* ===========================================
                DIFFICULTY
            =========================================== */}

            <div className={styles.difficulty}>{problem.difficulty}</div>

            {/* ===========================================
                TITLE
            =========================================== */}

            <h1>{problem.title}</h1>

            {/* ===========================================
                PROBLEM STATEMENT
            =========================================== */}

            <p className={styles.statement}>{problem.problemStatement}</p>

            {/* ===========================================
                INPUT FORMAT
            =========================================== */}

            {problem.inputFormat && (
              <>
                <h2>Input Format</h2>

                <p className={styles.statement}>{problem.inputFormat}</p>
              </>
            )}

            {/* ===========================================
                OUTPUT FORMAT
            =========================================== */}

            {problem.outputFormat && (
              <>
                <h2>Output Format</h2>

                <p className={styles.statement}>{problem.outputFormat}</p>
              </>
            )}

            {/* ===========================================
                CONSTRAINTS
            =========================================== */}

            {problem.constraints && problem.constraints.length > 0 && (
              <>
                <h2>Constraints</h2>

                <div className={styles.contextBox}>
                  {problem.constraints.map((constraint) => (
                    <p key={constraint}>{constraint}</p>
                  ))}
                </div>
              </>
            )}

            {/* ===========================================
                SKILLS
            =========================================== */}

            <h2>Skills</h2>

            <div className={styles.skillTags}>
              {problem.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>

            {/* ===========================================
                SAMPLE TESTS
            =========================================== */}

            {problem.sampleTests && problem.sampleTests.length > 0 && (
              <>
                <h2>Examples</h2>

                {problem.sampleTests.map((sample) => (
                  <div key={sample.id} className={styles.contextBox}>
                    <span>{sample.title}</span>

                    {sample.input !== undefined && <p>Input: {sample.input}</p>}

                    {sample.expectedOutput !== undefined && <p>Expected: {sample.expectedOutput}</p>}

                    {sample.description && <p>{sample.description}</p>}
                  </div>
                ))}
              </>
            )}

            {/* ===========================================
                EXPRESS INFORMATION
            =========================================== */}

            {isExpressWorkspace && (
              <>
                <h2>Framework Runtime</h2>

                <div className={styles.contextBox}>
                  <span>Express.js</span>

                  <p>Entry File: {activeFile?.path ?? "server.js"}</p>

                  <p>Runtime: Node.js + Express</p>

                  <p>Testing: HTTP endpoint tests</p>
                </div>
              </>
            )}

            {/* ===========================================
                REACT INFORMATION
            =========================================== */}

            {isReactWorkspace && (
              <>
                <h2>Framework Runtime</h2>

                <div className={styles.contextBox}>
                  <span>React</span>

                  <p>Entry File: {activeFile?.path ?? "App.jsx"}</p>

                  <p>Runtime: React + jsdom + esbuild</p>

                  <p>Testing: Component render and interaction tests</p>
                </div>
              </>
            )}

            {/* ===========================================
                ANGULAR INFORMATION
            =========================================== */}

            {isAngularWorkspace && (
              <>
                <h2>Framework Runtime</h2>

                <div className={styles.contextBox}>
                  <span>Angular</span>

                  <p>Entry File: {activeFile?.path ?? "app.component.ts"}</p>

                  <p>Runtime: Angular + TypeScript</p>

                  <p>Testing: Component render and interaction tests</p>
                </div>
              </>
            )}

            {/* ===========================================
                CONTEXT
            =========================================== */}

            <div className={styles.contextBox}>
              <span>Practice Context</span>

              <p>Source: {source ?? "practice"}</p>

              <p>Technology: {technology ?? problem.technologySlug}</p>

              {domain && <p>Domain: {domain}</p>}

              {stack && <p>Stack: {stack}</p>}

              {moduleSlug && <p>Module: {moduleSlug}</p>}

              {challenge && <p>Challenge: {challenge}</p>}
            </div>
          </div>
        </section>

        {/* =================================================
            RIGHT PANEL
        ================================================= */}

        <section className={styles.editorPanel}>
          {/* =============================================
              EDITOR HEADER

              Web workspaces use a compact VS Code-style
              title bar. Other workspace types keep their
              existing header behavior.
          ============================================= */}

          <div
            className={styles.editorHeader}
            style={
              isWebWorkspace
                ? {
                    minHeight: "41px",

                    padding: "0 12px",

                    background: "#181818",

                    borderBottom: "1px solid #2b2b2b",
                  }
                : undefined
            }>
            <span>{isWebWorkspace ? "HTML & CSS" : problem.technologySlug === "python-machine-learning" ? "Python Machine Learning" : problem.technologySlug === "python-data-analytics" ? "Python Data Analytics" : isFrameworkWorkspace ? (activeFile?.path ?? workspaceDisplayName) : languageName}</span>

            {isWebWorkspace ? (
              <div
                style={{
                  display: "flex",

                  alignItems: "center",

                  gap: "12px",

                  minWidth: 0,
                }}>
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingWebFile(true);

                    setNewWebFileError("");
                  }}
                  disabled={isSubmitting}
                  title="Create HTML or CSS file"
                  style={{
                    display: "inline-flex",

                    alignItems: "center",

                    gap: "5px",

                    height: "28px",

                    padding: "0 8px",

                    border: "1px solid #3c3c3c",

                    borderRadius: "3px",

                    color: "#cccccc",

                    background: "#252526",

                    fontFamily: '"Segoe UI", Inter, sans-serif',

                    fontSize: "11px",

                    fontWeight: 500,

                    cursor: isSubmitting ? "not-allowed" : "pointer",

                    opacity: isSubmitting ? 0.55 : 1,
                  }}>
                  <Plus size={14} />
                  New File
                </button>

                {webPreviewUrl ? (
                  <a
                    href={webPreviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={webPreviewUrl}
                    style={{
                      display: "inline-flex",

                      alignItems: "center",

                      gap: "6px",

                      color: "#9cdcfe",

                      fontSize: "11px",

                      fontWeight: 600,

                      textDecoration: "none",

                      whiteSpace: "nowrap",
                    }}>
                    Open Preview ↗
                  </a>
                ) : (
                  <span
                    style={{
                      color: "#7d8590",

                      fontSize: "10px",

                      textTransform: "none",

                      whiteSpace: "nowrap",
                    }}>
                    Run to create preview
                  </span>
                )}
              </div>
            ) : (
              <span>
                {workspaceDisplayName} {problem.workspaceType} Workspace
              </span>
            )}
          </div>

          {/* =============================================
              EDITOR WORK AREA

              Important:
              editorPanel has exactly three grid rows:
              1. Header
              2. Editor work area
              3. Console / test panel

              File tabs are therefore nested INSIDE this
              middle row. This avoids the extra blank rows
              visible in the previous web workspace UI.
          ============================================= */}

          <div
            style={{
              minWidth: 0,

              minHeight: 0,

              display: "flex",

              flexDirection: "column",

              overflow: "hidden",

              background: isWebWorkspace ? "#1e1e1e" : "#0f172a",
            }}>
            {/* ===========================================
                CREATE WEB FILE
            =========================================== */}

            {isWebWorkspace && isCreatingWebFile && (
              <div
                style={{
                  display: "flex",

                  alignItems: "center",

                  gap: "8px",

                  minHeight: "42px",

                  padding: "6px 10px",

                  flexShrink: 0,

                  borderBottom: "1px solid #2b2b2b",

                  background: "#252526",
                }}>
                <span
                  style={{
                    color: "#cccccc",

                    fontSize: "11px",

                    whiteSpace: "nowrap",
                  }}>
                  New file
                </span>

                <input
                  autoFocus
                  type="text"
                  value={newWebFileName}
                  onChange={(event) => {
                    setNewWebFileName(event.target.value);

                    if (newWebFileError) {
                      setNewWebFileError("");
                    }
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();

                      createWebFile();
                    }

                    if (event.key === "Escape") {
                      event.preventDefault();

                      cancelWebFileCreation();
                    }
                  }}
                  placeholder="style.css"
                  spellCheck={false}
                  aria-label="New web file name"
                  style={{
                    width: "220px",

                    maxWidth: "45%",

                    height: "28px",

                    padding: "0 8px",

                    border: newWebFileError ? "1px solid #f14c4c" : "1px solid #3c3c3c",

                    borderRadius: "2px",

                    outline: "none",

                    color: "#f3f3f3",

                    background: "#1e1e1e",

                    fontFamily: 'Consolas, "Courier New", monospace',

                    fontSize: "12px",
                  }}
                />

                <button
                  type="button"
                  onClick={createWebFile}
                  style={{
                    height: "28px",

                    padding: "0 10px",

                    border: "1px solid #0e639c",

                    borderRadius: "2px",

                    color: "#ffffff",

                    background: "#0e639c",

                    fontSize: "11px",

                    fontWeight: 600,

                    cursor: "pointer",
                  }}>
                  Create
                </button>

                <button
                  type="button"
                  onClick={cancelWebFileCreation}
                  style={{
                    height: "28px",

                    padding: "0 8px",

                    border: "1px solid #3c3c3c",

                    borderRadius: "2px",

                    color: "#cccccc",

                    background: "#252526",

                    fontSize: "11px",

                    cursor: "pointer",
                  }}>
                  Cancel
                </button>

                {newWebFileError && (
                  <span
                    role="alert"
                    style={{
                      minWidth: 0,

                      overflow: "hidden",

                      color: "#f48771",

                      fontSize: "10px",

                      textOverflow: "ellipsis",

                      whiteSpace: "nowrap",
                    }}>
                    {newWebFileError}
                  </span>
                )}
              </div>
            )}

            {/* ===========================================
                VS CODE-STYLE WEB FILE TABS
            =========================================== */}

            {isWebWorkspace && workspaceFiles.length > 0 && (
              <div
                role="tablist"
                aria-label="Workspace files"
                style={{
                  display: "flex",

                  alignItems: "stretch",

                  minHeight: "35px",

                  height: "35px",

                  flexShrink: 0,

                  overflowX: "auto",

                  overflowY: "hidden",

                  borderBottom: "1px solid #2b2b2b",

                  background: "#181818",
                }}>
                {workspaceFiles.map((file) => {
                  const isActive = file.path === activeWebFile?.path;

                  const extension = file.path.split(".").pop()?.toUpperCase() ?? "";

                  return (
                    <button
                      key={file.path}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => {
                        setActiveWebFilePath(file.path);

                        setNewWebFileError("");
                      }}
                      style={{
                        position: "relative",

                        display: "inline-flex",

                        alignItems: "center",

                        gap: "7px",

                        flexShrink: 0,

                        minWidth: "112px",

                        height: "35px",

                        padding: "0 12px",

                        border: "0",

                        borderRight: "1px solid #2b2b2b",

                        borderRadius: 0,

                        background: isActive ? "#1e1e1e" : "#181818",

                        color: isActive ? "#ffffff" : "#9da5b4",

                        cursor: "pointer",

                        fontFamily: '"Segoe UI", Inter, sans-serif',

                        fontSize: "12px",

                        fontWeight: 400,

                        whiteSpace: "nowrap",
                      }}>
                      <span
                        aria-hidden="true"
                        style={{
                          display: "inline-flex",

                          alignItems: "center",

                          justifyContent: "center",

                          minWidth: "24px",

                          fontFamily: 'Consolas, "Courier New", monospace',

                          fontSize: "9px",

                          fontWeight: 700,

                          color: file.language === "html" ? "#e37933" : file.language === "css" ? "#519aba" : "#c5c5c5",
                        }}>
                        {extension}
                      </span>

                      <span>{file.path}</span>

                      {isActive && (
                        <span
                          aria-hidden="true"
                          style={{
                            position: "absolute",

                            left: 0,

                            right: 0,

                            bottom: 0,

                            height: "1px",

                            background: "#007acc",
                          }}
                        />
                      )}
                    </button>
                  );
                })}

                {/* Always-visible VS Code-style add-file control */}
                <button
                  type="button"
                  aria-label="Create new HTML or CSS file"
                  title="Create HTML or CSS file"
                  onClick={() => {
                    setIsCreatingWebFile(true);

                    setNewWebFileError("");
                  }}
                  disabled={isSubmitting}
                  style={{
                    display: "inline-flex",

                    alignItems: "center",

                    justifyContent: "center",

                    gap: "6px",

                    flexShrink: 0,

                    height: "35px",

                    padding: "0 12px",

                    border: "0",

                    borderRight: "1px solid #2b2b2b",

                    borderRadius: 0,

                    color: "#cccccc",

                    background: "#181818",

                    cursor: isSubmitting ? "not-allowed" : "pointer",

                    fontFamily: '"Segoe UI", Inter, sans-serif',

                    fontSize: "12px",

                    fontWeight: 500,

                    whiteSpace: "nowrap",

                    opacity: isSubmitting ? 0.55 : 1,
                  }}>
                  <Plus size={14} />
                  New File
                </button>
              </div>
            )}

            {/* ===========================================
                SHARED MONACO EDITOR

                The editor itself fills the remaining
                workspace height, like VS Code.
            =========================================== */}

            <div
              style={{
                flex: 1,

                minHeight: 0,

                overflow: "hidden",

                background: isWebWorkspace ? "#1e1e1e" : "#0f172a",
              }}>
              <CodeEditor value={isWebWorkspace ? (activeWebFile?.content ?? "") : code} language={isWebWorkspace ? (activeWebFile?.language ?? problem.defaultLanguage ?? "html") : isPythonSparkWorkspace ? "python" : (problem.defaultLanguage ?? "python")} onChange={isWebWorkspace ? updateActiveWebFile : setCode} readOnly={isSubmitting} />
            </div>
          </div>

          {/* =============================================
              NORMAL CODE INPUT
          ============================================= */}

          {!isFrameworkWorkspace && !isWebWorkspace && (
            <div className={styles.inputPanel}>
              <div className={styles.inputHeader}>
                <span>Test Input</span>

                <span>stdin</span>
              </div>

              <textarea className={styles.inputEditor} value={customInput} onChange={(event) => setCustomInput(event.target.value)} placeholder="Enter input for your program..." spellCheck={false} />
            </div>
          )}

          {/* =============================================
              FRAMEWORK TEST INFORMATION
          ============================================= */}

          {isFrameworkWorkspace && (
            <div className={styles.inputPanel}>
              <div className={styles.inputHeader}>
                <span>{isReactWorkspace ? "Component Test" : "Framework Test"}</span>

                <span>{isExpressWorkspace ? "HTTP" : isReactWorkspace ? "React" : "Framework"}</span>
              </div>

              <textarea className={styles.inputEditor} value={isExpressWorkspace ? ["Express routes are tested automatically.", "", "Run:", "1. Starts your Express app in the sandbox", "2. Sends HTTP requests to your endpoint", "3. Shows public test results", "", "Submit:", "1. Runs hidden HTTP test cases", "2. Calculates your score", "3. Marks the problem solved when all tests pass", "", "External network access is disabled."].join("\n") : isReactWorkspace ? ["React components are tested automatically.", "", "Run:", "1. Compiles App.jsx with esbuild", "2. Renders the component inside jsdom", "3. Runs public component tests", "4. Creates a browser preview when previewHtml is available", "5. Shows a localhost-style preview URL", "", "Submit:", "1. Runs hidden React component tests", "2. Calculates your score", "3. Marks the problem solved when all tests pass", "", "External network access is disabled."].join("\n") : "Framework tests are executed automatically."} readOnly spellCheck={false} />
            </div>
          )}

          {/* =============================================
              REACT WEB PREVIEW LINK

              Visible only after Run creates a preview.

              Clicking either the URL or Open Preview opens
              the rendered React application in a new tab.
          ============================================= */}

          {isReactWorkspace && reactPreviewUrl && (
            <div
              style={{
                padding: "14px 16px",

                borderTop: "1px solid rgba(255, 255, 255, 0.08)",

                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",

                background: "#111827",
              }}>
              <div
                style={{
                  display: "flex",

                  alignItems: "center",

                  justifyContent: "space-between",

                  gap: "12px",

                  marginBottom: "10px",

                  color: "#f9fafb",

                  fontSize: "13px",

                  fontWeight: 600,
                }}>
                <span>Web Preview</span>

                <span
                  style={{
                    color: "#94a3b8",

                    fontWeight: 500,
                  }}>
                  React
                </span>
              </div>

              <div
                style={{
                  display: "flex",

                  alignItems: "center",

                  gap: "10px",
                }}>
                <a
                  href={reactPreviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={reactPreviewUrl}
                  style={{
                    flex: 1,

                    minWidth: 0,

                    overflow: "hidden",

                    padding: "10px 12px",

                    borderRadius: "8px",

                    background: "#0b1220",

                    color: "#60a5fa",

                    fontFamily: "Consolas, Monaco, monospace",

                    fontSize: "13px",

                    textDecoration: "none",

                    textOverflow: "ellipsis",

                    whiteSpace: "nowrap",
                  }}>
                  {reactPreviewUrl}
                </a>

                <button
                  type="button"
                  onClick={() => {
                    window.open(reactPreviewUrl, "_blank", "noopener,noreferrer");
                  }}
                  style={{
                    flexShrink: 0,

                    padding: "10px 14px",

                    border: "none",

                    borderRadius: "8px",

                    background: "#f8fafc",

                    color: "#111827",

                    cursor: "pointer",

                    fontSize: "13px",

                    fontWeight: 600,
                  }}>
                  Open Preview
                </button>
              </div>
            </div>
          )}

          {/* =============================================
              OUTPUT
          ============================================= */}

          <div className={styles.consolePanel}>
            <div className={styles.consoleHeader}>
              <span>{isFrameworkWorkspace ? "Test Results" : "Output"}</span>

              <span>{isRunning ? "Running" : isSubmitting ? "Judging" : isWebWorkspace ? "HTML/CSS" : isReactWorkspace ? "React" : isAngularWorkspace ? "Angular" : isExpressWorkspace ? "Express" : isFrameworkWorkspace ? "Framework" : "Console"}</span>
            </div>

            <pre className={styles.consoleBody}>{output}</pre>
          </div>
        </section>
      </div>
    </main>
  );
}
