import { catalogPaths } from '@/features/catalog/store';
import type {
  PracticeLevel,
  TechnologyPracticePath,
} from './types';

/* =========================================================
   PRACTICE PATHS
========================================================= */

export const practicePaths:
  TechnologyPracticePath[] = catalogPaths;

/* =========================================================
   GET PRACTICE PATH
========================================================= */
/* =========================================================
   NORMALIZE TECHNOLOGY SLUG
========================================================= */

function normalizeTechnologySlug(
  technologySlug: string,
): string {
  const normalizedSlug =
    technologySlug
      .trim()
      .toLowerCase();

  const aliases:
    Record<
      string,
      string
    > = {
      /* ===================================================
         SPRING BOOT
      =================================================== */

      'spring-boot':
        'springboot',

      springboot:
        'springboot',

      /* ===================================================
         EXPRESS.JS
      =================================================== */

      express:
        'expressjs',

      'express-js':
        'expressjs',

      expressjs:
        'expressjs',

      /* ===================================================
         NEXT.JS
      =================================================== */

      'next-js':
        'nextjs',

      nextjs:
        'nextjs',

      /* ===================================================
         NESTJS
      =================================================== */

      'nest-js':
        'nestjs',

      nestjs:
        'nestjs',

      /* ===================================================
         NODE.JS
      =================================================== */

      node:
        'nodejs',

      'node-js':
        'nodejs',

      nodejs:
        'nodejs',

      /* ===================================================
         REACT
      =================================================== */

      react:
        'react',

      reactjs:
        'react',

      'react-js':
        'react',

      /* ===================================================
         ANGULAR
      =================================================== */

      angular:
        'angular',

      angularjs:
        'angular',

      /* ===================================================
         HTML & CSS
      =================================================== */

      'html-css':
        'html-css',

      htmlcss:
        'html-css',

      /* ===================================================
         C
      =================================================== */

      c:
        'c',

      /* ===================================================
         C++
      =================================================== */

      cpp:
        'cpp',

      'c++':
        'cpp',

      /* ===================================================
         JAVASCRIPT
      =================================================== */

      javascript:
        'javascript',

      js:
        'javascript',

      /* ===================================================
         TYPESCRIPT
      =================================================== */

      typescript:
        'typescript',

      ts:
        'typescript',

      /* ===================================================
         PYTHON
      =================================================== */

      python:
        'python',

      py:
        'python',

      /* ===================================================
         JAVA
      =================================================== */

      java:
        'java',

      /* ===================================================
         C#
      =================================================== */

      csharp:
        'csharp',

      'c-sharp':
        'csharp',

      'c#':
        'csharp',

      cs:
        'csharp',

      /* ===================================================
         PHP
      =================================================== */

      php:
        'php',

      php8:
        'php',

      'php-8':
        'php',

      'php8.3':
        'php',

      /* ===================================================
         POSTGRESQL
      =================================================== */

      postgresql:
        'postgresql',

      postgres:
        'postgresql',

      'postgre-sql':
        'postgresql',

      'postgre-sql-db':
        'postgresql',

      'postgresql-db':
        'postgresql',

      pgsql:
        'postgresql',

      pg:
        'postgresql',

      /* ===================================================
         MYSQL
      =================================================== */

      mysql:
        'mysql',

      'my-sql':
        'mysql',

      'mysql-db':
        'mysql',

      mariadb:
        'mysql',

      /* ===================================================
         SQL SERVER
      =================================================== */

      sqlserver:
        'sqlserver',

      /* ===================================================
         MONGODB
      =================================================== */

      mongodb:
        'mongodb',

      mongo:
        'mongodb',

      'mongo-db':
        'mongodb',

      /* ===================================================
         REDIS
      =================================================== */

      redis:
        'redis',

      'redis-db':
        'redis',

      'redis-server':
        'redis',

      'sql-server':
        'sqlserver',

      mssql:
        'sqlserver',

      'mssql-server':
        'sqlserver',

      /* ===================================================
         ASP.NET CORE
      =================================================== */

      aspnetcore:
        'aspnetcore',

      'aspnet-core':
        'aspnetcore',

      'asp.net-core':
        'aspnetcore',

      'asp.netcore':
        'aspnetcore',

      'asp.net core':
        'aspnetcore',

      'dotnet:aspnet-core':
        'aspnetcore',

      'dotnet:aspnetcore':
        'aspnetcore',

      'dotnet/aspnet-core':
        'aspnetcore',

      'dotnet/aspnetcore':
        'aspnetcore',

      /* ===================================================
         DEVOPS / CI/CD
      =================================================== */

      cicd:
        'cicd',

      'ci-cd':
        'cicd',

      'ci/cd':
        'cicd',

      'continuous-integration':
        'cicd',

      devops:
        'cicd',

    };

  return (
    aliases[
      normalizedSlug
    ] ??
    normalizedSlug
  );
}

/* =========================================================
   GET PRACTICE PATH
========================================================= */

export function getPracticePathByTechnology(
  technologySlug: string,
) {
  const resolvedSlug =
    normalizeTechnologySlug(
      technologySlug,
    );

  return practicePaths.find(
    (
      path,
    ) =>
      path.technologySlug ===
      resolvedSlug,
  );
}

/* =========================================================
   GET ALL PRACTICE PATHS
========================================================= */

export function getPracticePaths() {
  return [
    ...practicePaths,
  ];
}

/* =========================================================
   FILTER STAGES BY LEVEL
========================================================= */

export function getPracticeStagesByLevel(
  technologySlug: string,

  level?:
    PracticeLevel,
) {
  const path =
    getPracticePathByTechnology(
      technologySlug,
    );

  if (
    !path
  ) {
    return [];
  }

  const orderedStages =
    [
      ...path.stages,
    ].sort(
      (
        a,
        b,
      ) =>
        a.order -
        b.order,
    );

  if (
    !level
  ) {
    return orderedStages;
  }

  return orderedStages.filter(
    (
      stage,
    ) =>
      stage.level ===
      level,
  );
}

/* =========================================================
   GET ALL PROBLEM SLUGS FOR TECHNOLOGY

   Example:

   PostgreSQL
        ↓
   stages
        ↓
   problemSlugs
        ↓
   [
     postgresql-create-database,
     postgresql-create-table,
     postgresql-insert-records,
     ...
   ]
========================================================= */

export function getPracticeProblemSlugs(
  technologySlug: string,
): string[] {
  const path =
    getPracticePathByTechnology(
      technologySlug,
    );

  if (
    !path
  ) {
    return [];
  }

  const stages =
    [
      ...path.stages,
    ].sort(
      (
        a,
        b,
      ) =>
        a.order -
        b.order,
    );

  return stages.flatMap(
    (
      stage,
    ) =>
      stage.problemSlugs,
  );
}

/* =========================================================
   GET PROBLEM SLUGS BY LEVEL
========================================================= */

export function getPracticeProblemSlugsByLevel(
  technologySlug: string,

  level?:
    PracticeLevel,
): string[] {
  const stages =
    getPracticeStagesByLevel(
      technologySlug,
      level,
    );

  return stages.flatMap(
    (
      stage,
    ) =>
      stage.problemSlugs,
  );
}

/* =========================================================
   TOTAL PROBLEMS
========================================================= */

export function getPracticeProblemCount(
  technologySlug: string,
) {
  return getPracticeProblemSlugs(
    technologySlug,
  ).length;
}

/* =========================================================
   HAS PRACTICE PATH
========================================================= */

export function hasPracticePath(
  technologySlug: string,
): boolean {
  return Boolean(
    getPracticePathByTechnology(
      technologySlug,
    ),
  );
}

/* =========================================================
   HAS PRACTICE PROBLEMS
========================================================= */

export function hasPracticeProblems(
  technologySlug: string,
): boolean {
  return (
    getPracticeProblemCount(
      technologySlug,
    ) > 0
  );
}