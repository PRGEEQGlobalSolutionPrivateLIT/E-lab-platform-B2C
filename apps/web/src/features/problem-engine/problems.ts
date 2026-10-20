import type {
  PracticeProblem,
} from './types';

/* =========================================================
   PROGRAMMING LANGUAGES
========================================================= */

import {
  cProblems,
} from './c-problems';
import {
  cppProblems,
} from './cpp-problems';
import {
  javascriptProblems,
} from './javascript-problems';
import {
  typescriptProblems,
} from './typescript-problems';
import {
  pythonProblems,
} from './python-problems';
import {
  javaProblems,
} from './java-problems';
import {
  csharpProblems,
} from './csharp-problems';
import {
  phpProblems,
} from './php-problems';
import {
  rubyProblems,
} from './ruby-problems';
import {
  swiftProblems,
} from './swift-problems';
import { goProblems } from './go-problems';

/* =========================================================
   FRONTEND TECHNOLOGIES
========================================================= */

import {
  reactProblems,
} from './react-problems';

import {
  angularProblems,
} from './angular-problems';

import {
  htmlCssProblems,
} from './html-css-problems';

import {
  vueProblems,
} from './vue-problems';

/* =========================================================
   BACKEND TECHNOLOGIES
========================================================= */

import {
  nodejsProblems,
} from './nodejs-problems';

import {
  expressProblems,
} from './express-problems';

import {
  nextjsProblems,
} from './nextjs-problems';

import {
  nestjsProblems,
} from './nestjs-problems';

import {
  djangoProblems,
} from './django-problems';

import {
  fastapiProblems,
} from './fastapi-problems';

import {
  springBootProblems,
} from './springboot-problems';

import {
  aspnetcoreProblems,
} from './aspnetcore-problems';

/* =========================================================
   DATABASE TECHNOLOGIES
========================================================= */

import {
  postgresqlProblems,
} from './postgresql-problems';

import {
  mysqlProblems,
} from './mysql-problems';

import {
  sqlserverProblems,
} from './sqlserver-problems';

import {
  mongodbProblems,
} from './mongodb-problems';

import {
  redisProblems,
} from './redis-problems';


import {
  awsProblems,
  getAwsProblemBySlug,
} from './aws-problems';

import {
  azureProblems,
  getAzureProblemBySlug,
} from './azure-problems';

import {
  gcpProblems,
  getGcpProblemBySlug,
} from './gcp-problems';

/* =========================================================
   DATA ANALYTICS
========================================================= */

import {
  pythonDataAnalyticsProblems,
} from './python-data-analytics-problems';

import {
  powerBiProblems,
} from './power-bi-problems';

/* =========================================================
   AI & MACHINE LEARNING
========================================================= */

import {
  pythonMachineLearningProblems,
} from './python-machine-learning-problems';

/* =========================================================
   CLOUD & DEVOPS
========================================================= */

import {
  linuxProblems,
} from './linux-problems';

/* =========================================================
   GIT
========================================================= */

import {
  gitProblems,
} from './git-problems';

import {
  dockerProblems,
} from './docker-problems';

import {
  kubernetesProblems,
} from './kubernetes-problems';

import {
  cicdProblems,
} from './cicd-problems';
/* =========================================================
   DATA ENGINEERING
========================================================= */

import {
  pythonSparkProblems,
} from './python-spark-problems';

import { pythonSecurityProblems } from './python-security-problems';

import {
  networkSecurityProblems,
} from './network-security-problems';


/* =========================================================
   CYBERSECURITY
========================================================= */

import {
  linuxSecurityProblems,
} from './linux-security-problems';

import {
  webSecurityProblems,
} from './web-security-problems';

import { penetrationTestingProblems } from './penetration-testing-problems';

import { socSiemProblems } from './soc-siem-problems';

import { digitalForensicsProblems } from './digital-forensics-problems';

import { cloudSecurityProblems } from './cloud-security-problems';

import { devsecopsProblems } from './devsecops-problems'

import { incidentResponseProblems } from './incident-response-problems';


/* =========================================================
   BLOCKCHAIN & WEB3 — PRACTICE PROBLEMS
========================================================= */

import { ethereumSolidityProblems } from './ethereum-solidity-problems';

import { web3DappDevelopmentProblems } from './web3-dapp-development-problems';

import { smartContractSecurityProblems } from './smart-contract-security-problems';

import { defiTokenizationProblems } from './defi-tokenization-problems';

import {
  aiMlProblems,
  getAiMlProblemBySlug,
} from './ai-ml-problems';

import {
  generativeAiProblems,
  getGenerativeAiProblemBySlug,
} from './generative-ai-problems';

/* =========================================================
   ALL PROBLEMS

   CENTRAL PROBLEM REGISTRY

   Every practice problem must be registered here before
   it can be resolved by:

   - problem slug
   - technology
   - stack mappings
   - practice paths
   - database workspace
========================================================= */

export const problems:
  PracticeProblem[] = [

    /* =====================================================
       PROGRAMMING LANGUAGES
    ===================================================== */

    ...cProblems,

    ...cppProblems,

    ...javascriptProblems,

    ...typescriptProblems,

    ...pythonProblems,

    ...javaProblems,

    ...csharpProblems,

    ...phpProblems,

    ...rubyProblems,

    ...swiftProblems,
    ...goProblems,
    /* =====================================================
       FRONTEND TECHNOLOGIES
    ===================================================== */

    ...reactProblems,

    ...angularProblems,

    ...htmlCssProblems,

    ...vueProblems,

    /* =====================================================
       BACKEND TECHNOLOGIES
    ===================================================== */

    ...nodejsProblems,

    ...expressProblems,

    ...nextjsProblems,

    ...nestjsProblems,

    ...djangoProblems,

    ...fastapiProblems,

    ...springBootProblems,

    ...aspnetcoreProblems,

    /* =====================================================
       DATABASE TECHNOLOGIES
    ===================================================== */

    ...postgresqlProblems,

    ...mysqlProblems,

    ...sqlserverProblems,

    ...mongodbProblems,

    ...redisProblems,

      ...awsProblems,

      ...azureProblems,

      ...gcpProblems,

    /* =====================================================
       DATA ANALYTICS
    ===================================================== */

    ...pythonDataAnalyticsProblems,

    ...powerBiProblems,

    /* =====================================================
       AI & MACHINE LEARNING
    ===================================================== */

    ...pythonMachineLearningProblems,


     ...pythonSparkProblems,

    

    /* =====================================================
       CLOUD & DEVOPS
    ===================================================== */

    ...linuxProblems,

    ...gitProblems,

    ...dockerProblems,

    ...kubernetesProblems,

    ...cicdProblems,

    /* =====================================================
   CYBERSECURITY
===================================================== */

          ...linuxSecurityProblems,
          ...pythonSecurityProblems,
          ...networkSecurityProblems,
          ...webSecurityProblems,
          ...penetrationTestingProblems,
          ...socSiemProblems,
          ...digitalForensicsProblems,
          ...cloudSecurityProblems,
          ...devsecopsProblems,
          ...incidentResponseProblems,



            ...ethereumSolidityProblems,
  ...web3DappDevelopmentProblems,
  ...smartContractSecurityProblems,
  ...defiTokenizationProblems,
  ...aiMlProblems,
  ...generativeAiProblems
  ];

  
/* =========================================================
   GET PROBLEM BY SLUG
========================================================= */

export function getProblemBySlug(
  slug: string,
): PracticeProblem | undefined {
  return problems.find(
    (
      problem,
    ) =>
      problem.slug ===
      slug,
  );
}

/* =========================================================
   GET PROBLEMS BY TECHNOLOGY
========================================================= */

export function getProblemsByTechnology(
  technologySlug: string,
): PracticeProblem[] {
  return problems.filter(
    (
      problem,
    ) =>
      problem.technologySlug ===
      technologySlug,
  );
}

/* =========================================================
   GET PROBLEMS BY SLUGS

   Important for stack modules.

   Example:

   mern:react
        ↓
   [
     react-counter,
     react-search-products,
     react-todo,
     react-user-directory
   ]
        ↓
   getProblemsBySlugs()
        ↓
   resolves them from the central registry above
========================================================= */

export function getProblemsBySlugs(
  slugs: string[],
): PracticeProblem[] {
  return slugs
    .map(
      (
        slug,
      ) =>
        getProblemBySlug(
          slug,
        ),
    )
    .filter(
      (
        problem,
      ): problem is PracticeProblem =>
        Boolean(
          problem,
        ),
    );
}