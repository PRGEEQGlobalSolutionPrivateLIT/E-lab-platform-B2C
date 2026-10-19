import {

  getProblemsBySlugs,

} from './problems';

/* =========================================================

   STACK MODULE → PROBLEM MAPPING

\========================================================= */

/*

  * Mapping format:

  *

  * stackSlug:moduleSlug

  *

  * IMPORTANT:

  * moduleSlug must exactly match the slug used

  * in stack-engine/roadmaps.ts.

  *

  * A problem can be reused across multiple stacks.

 */

const stackProblemMappings:

  Record<

    string,

    string[]

  > = {

  /* =======================================================

     JAVA

  ======================================================= */

  'java:java': [

    'java-hello-world',

    'java-add-two-numbers',

    'java-even-odd',

    'java-largest-three',

    'java-sum-first-n',

    'java-factorial',

    'java-array-sum',

    'java-array-maximum',

    'java-string-reverse',

    'java-word-frequency',

    'java-student-class',

    'java-student-records',

  ],

  /* =======================================================

     MERN

  ======================================================= */

  'mern:html': [

    'html-profile-page',

    'html-registration-form',

    'html-semantic-blog',

  ],

  'mern:css': [

    'css-responsive-card',

    'css-flexbox-navbar',

    'css-grid-dashboard',

  ],

  /* =======================================================

     MERN - JAVASCRIPT

  ======================================================= */

  'mern:javascript': [

    'javascript-hello-world',

    'javascript-add-two-numbers',

    'javascript-even-odd',

    'javascript-largest-three',

    'javascript-sum-first-n',

    'javascript-factorial',

    'javascript-array-sum',

    'javascript-array-maximum',

    'javascript-string-reverse',

    'javascript-palindrome',

    'javascript-word-frequency',

    'javascript-maximum-subarray',

  ],

  /* =======================================================

     MERN - REACT

  ======================================================= */

  'mern:react': [

    'react-counter',

    'react-search-products',

    'react-todo',

    'react-user-directory',

  ],

  /* =======================================================

     MERN - NODE.JS

  ======================================================= */

  'mern:nodejs': [

    'node-stdin-uppercase',

    'node-word-count',

    'node-json-array-sum',

    'node-buffer-byte-length',

    'node-path-basename',

    'node-path-extension',

    'node-url-hostname',

    'node-url-query-param',

    'node-event-emitter-message',

    'node-event-emitter-sum',

    'node-sha256-hash',

    'node-stream-line-count',

  ],

  /* =======================================================

     MERN - EXPRESS.JS

  ======================================================= */

  'mern:express': [

    'express-hello-route',

  ],

  /* =======================================================

     MERN - MONGODB

  ======================================================= */

  'mern:mongodb': [

    'mongodb-create-database',

    'mongodb-create-collection',

    'mongodb-insert-one',

    'mongodb-insert-many',

    'mongodb-find-documents',

    'mongodb-filter-documents',

    'mongodb-comparison-operators',

    'mongodb-update-one',

    'mongodb-update-many',

    'mongodb-delete-one',

    'mongodb-projection',

    'mongodb-sort-limit',

    'mongodb-aggregation',

    'mongodb-indexes',

    'mongodb-lookup',

  ],

  /* =======================================================

     MERN - REST API

  ======================================================= */

  'mern:rest-api': [],

  /* =======================================================

     MERN - AUTHENTICATION

  ======================================================= */

  'mern:authentication': [],

  /* =======================================================

     MERN - INTEGRATION

  ======================================================= */

  'mern:integration': [],

  /* =======================================================

     MERN - TESTING

  ======================================================= */

  'mern:testing': [],

  /* =======================================================

     MERN - GIT

  ======================================================= */

  'mern:git': [],

  /* =======================================================

     MERN - DEPLOYMENT

  ======================================================= */

  'mern:deployment': [],

  /* =======================================================

     MERN - PROJECTS

  ======================================================= */

  'mern:projects': [],

  /* =======================================================

     MEAN

  ======================================================= */

  'mean:html': [

    'html-profile-page',

    'html-registration-form',

    'html-semantic-blog',

  ],

  'mean:css': [

    'css-responsive-card',

    'css-flexbox-navbar',

    'css-grid-dashboard',

  ],

  /* =======================================================

     MEAN - JAVASCRIPT

  ======================================================= */

  'mean:javascript': [

    'javascript-hello-world',

    'javascript-add-two-numbers',

    'javascript-even-odd',

    'javascript-largest-three',

    'javascript-sum-first-n',

    'javascript-factorial',

    'javascript-array-sum',

    'javascript-array-maximum',

    'javascript-string-reverse',

    'javascript-palindrome',

    'javascript-word-frequency',

    'javascript-maximum-subarray',

  ],

  /* =======================================================

     MEAN - TYPESCRIPT

  ======================================================= */

  'mean:typescript': [],

  /* =======================================================

     MEAN - ANGULAR

  ======================================================= */

  'mean:angular': [

    'angular-counter',

    'angular-search-products',

    'angular-todo',

    'angular-user-directory',

  ],

  /* =======================================================

     MEAN - NODE.JS

  ======================================================= */

  'mean:nodejs': [

    'node-stdin-uppercase',

    'node-word-count',

    'node-json-array-sum',

    'node-buffer-byte-length',

    'node-path-basename',

    'node-path-extension',

    'node-url-hostname',

    'node-url-query-param',

    'node-event-emitter-message',

    'node-event-emitter-sum',

    'node-sha256-hash',

    'node-stream-line-count',

  ],

  /* =======================================================

     MEAN - EXPRESS.JS

  ======================================================= */

  'mean:express': [

    'express-hello-route',

  ],

  /* =======================================================

     MEAN - MONGODB

  ======================================================= */

  'mean:mongodb': [

    'mongodb-create-database',

    'mongodb-create-collection',

    'mongodb-insert-one',

    'mongodb-insert-many',

    'mongodb-find-documents',

    'mongodb-filter-documents',

    'mongodb-comparison-operators',

    'mongodb-update-one',

    'mongodb-update-many',

    'mongodb-delete-one',

    'mongodb-projection',

    'mongodb-sort-limit',

    'mongodb-aggregation',

    'mongodb-indexes',

    'mongodb-lookup',

  ],

  /* =======================================================

     MEAN - REST API

  ======================================================= */

  'mean:rest-api': [],

  /* =======================================================

     MEAN - AUTHENTICATION

  ======================================================= */

  'mean:authentication': [],

  /* =======================================================

     MEAN - INTEGRATION

  ======================================================= */

  'mean:integration': [],

  /* =======================================================

     MEAN - TESTING

  ======================================================= */

  'mean:testing': [],

  /* =======================================================

     MEAN - GIT

  ======================================================= */

  'mean:git': [],

  /* =======================================================

     MEAN - DEPLOYMENT

  ======================================================= */

  'mean:deployment': [],

  /* =======================================================

     MEAN - PROJECTS

  ======================================================= */

  'mean:projects': [],

  /* =======================================================

     DJANGO FULL STACK

  ======================================================= */

  'django:html': [

    'html-profile-page',

    'html-registration-form',

    'html-semantic-blog',

  ],

  'django:css': [

    'css-responsive-card',

    'css-flexbox-navbar',

    'css-grid-dashboard',

  ],

  /* =======================================================

     DJANGO - JAVASCRIPT

  ======================================================= */

  'django:javascript': [

    'javascript-hello-world',

    'javascript-add-two-numbers',

    'javascript-even-odd',

    'javascript-largest-three',

    'javascript-sum-first-n',

    'javascript-array-sum',

    'javascript-string-reverse',

    'javascript-palindrome',

  ],

  /* =======================================================

     DJANGO - PYTHON

  ======================================================= */

  'django:python': [

    'python-hello-world',

    'python-add-two-numbers',

    'python-even-odd',

    'python-largest-three',

    'python-sum-first-n',

    'python-factorial',

    'python-list-sum',

    'python-list-maximum',

    'python-string-reverse',

    'python-word-frequency',

    'python-student-class',

    'python-user-records',

  ],

  /* =======================================================

     DJANGO FRAMEWORK

  ======================================================= */

  'django:django': [

    'django-basic-view',

    'django-url-route',

    'django-template-context',

    'django-dynamic-route',

    'django-post-request',

    'django-course-model',

    'django-queryset-filter',

    'django-create-record',

    'django-json-response',

    'django-class-based-view',

    'django-course-list-api',

    'django-course-management',

  ],

  /* =======================================================

     DJANGO - POSTGRESQL

  ======================================================= */

  'django:postgresql': [

    'postgresql-create-database',

    'postgresql-create-table',

    'postgresql-insert-records',

    'postgresql-select-records',

    'postgresql-where-filter',

    'postgresql-update-records',

    'postgresql-delete-records',

    'postgresql-aggregate-functions',

    'postgresql-group-by',

    'postgresql-join-tables',

    'postgresql-subqueries',

    'postgresql-views',

    'postgresql-indexes',

    'postgresql-transactions',

  ],

  /* =======================================================

     DJANGO - REST API

  ======================================================= */

  'django:rest-api': [],

  /* =======================================================

     DJANGO - AUTHENTICATION

  ======================================================= */

  'django:authentication': [],

  /* =======================================================

     DJANGO - INTEGRATION

  ======================================================= */

  'django:integration': [],

  /* =======================================================

     DJANGO - TESTING

  ======================================================= */

  'django:testing': [],

  /* =======================================================

     DJANGO - GIT

  ======================================================= */

  'django:git': [],

  /* =======================================================

     DJANGO - DEPLOYMENT

  ======================================================= */

  'django:deployment': [],

  /* =======================================================

     DJANGO - PROJECTS

  ======================================================= */

  'django:projects': [],

  /* =======================================================

     REACT + SPRING BOOT

     Must match roadmap stackSlug: react-spring

  ======================================================= */

  'react-spring:html': [

    'html-profile-page',

    'html-registration-form',

    'html-semantic-blog',

  ],

  'react-spring:css': [

    'css-responsive-card',

    'css-flexbox-navbar',

    'css-grid-dashboard',

  ],

  'react-spring:javascript': [

    'javascript-hello-world',

    'javascript-add-two-numbers',

    'javascript-even-odd',

    'javascript-largest-three',

    'javascript-sum-first-n',

    'javascript-factorial',

    'javascript-array-sum',

    'javascript-array-maximum',

    'javascript-string-reverse',

    'javascript-palindrome',

    'javascript-word-frequency',

    'javascript-maximum-subarray',

  ],

  'react-spring:react': [

    'react-counter',

    'react-search-products',

    'react-todo',

    'react-user-directory',

  ],

  'react-spring:java': [

    'java-hello-world',

    'java-add-two-numbers',

    'java-even-odd',

    'java-largest-three',

    'java-sum-first-n',

    'java-factorial',

    'java-array-sum',

    'java-array-maximum',

    'java-string-reverse',

    'java-word-frequency',

    'java-student-class',

    'java-student-records',

  ],

  'react-spring:springboot': [

    'springboot-hello-controller',

  ],

  'react-spring:postgresql': [

    'postgresql-create-database',

    'postgresql-create-table',

    'postgresql-insert-records',

    'postgresql-select-records',

    'postgresql-where-filter',

    'postgresql-update-records',

    'postgresql-delete-records',

    'postgresql-aggregate-functions',

    'postgresql-group-by',

    'postgresql-join-tables',

    'postgresql-subqueries',

    'postgresql-views',

    'postgresql-indexes',

    'postgresql-transactions',

  ],

  'react-spring:authentication': [],

  'react-spring:integration': [],

  'react-spring:testing': [],

  'react-spring:git': [],

  'react-spring:deployment': [],

  'react-spring:projects': [],

  /* =======================================================

     ANGULAR + SPRING BOOT

     Must match roadmap stackSlug: angular-spring

  ======================================================= */

  'angular-spring:html': [

    'html-profile-page',

    'html-registration-form',

    'html-semantic-blog',

  ],

  'angular-spring:css': [

    'css-responsive-card',

    'css-flexbox-navbar',

    'css-grid-dashboard',

  ],

  'angular-spring:javascript': [

    'javascript-hello-world',

    'javascript-add-two-numbers',

    'javascript-even-odd',

    'javascript-largest-three',

    'javascript-sum-first-n',

    'javascript-factorial',

    'javascript-array-sum',

    'javascript-array-maximum',

    'javascript-string-reverse',

    'javascript-palindrome',

    'javascript-word-frequency',

    'javascript-maximum-subarray',

  ],

  'angular-spring:typescript': [

    'typescript-basic-types',

    'typescript-function-types',

    'typescript-arrays-objects',

    'typescript-interfaces',

    'typescript-unions',

    'typescript-generics',

    'typescript-classes',

    'typescript-user-directory',

  ],

  'angular-spring:angular': [

    'angular-counter',

    'angular-search-products',

    'angular-todo',

    'angular-user-directory',

  ],

  'angular-spring:java': [

    'java-hello-world',

    'java-add-two-numbers',

    'java-even-odd',

    'java-largest-three',

    'java-sum-first-n',

    'java-factorial',

    'java-array-sum',

    'java-array-maximum',

    'java-string-reverse',

    'java-word-frequency',

    'java-student-class',

    'java-student-records',

  ],

  'angular-spring:springboot': [

    'springboot-hello-controller',

  ],

  'angular-spring:postgresql': [

    'postgresql-create-database',

    'postgresql-create-table',

    'postgresql-insert-records',

    'postgresql-select-records',

    'postgresql-where-filter',

    'postgresql-update-records',

    'postgresql-delete-records',

    'postgresql-aggregate-functions',

    'postgresql-group-by',

    'postgresql-join-tables',

    'postgresql-subqueries',

    'postgresql-views',

    'postgresql-indexes',

    'postgresql-transactions',

  ],

  'angular-spring:authentication': [],

  'angular-spring:integration': [],

  'angular-spring:testing': [],

  'angular-spring:git': [],

  'angular-spring:deployment': [],

  'angular-spring:projects': [],

  /* =======================================================

     .NET FULL STACK

     Must match roadmap stackSlug: dotnet

  ======================================================= */

  'dotnet:html': [

    'html-profile-page',

    'html-registration-form',

    'html-semantic-blog',

  ],

  'dotnet:css': [

    'css-responsive-card',

    'css-flexbox-navbar',

    'css-grid-dashboard',

  ],

  'dotnet:javascript': [

    'javascript-hello-world',

    'javascript-add-two-numbers',

    'javascript-even-odd',

    'javascript-largest-three',

    'javascript-sum-first-n',

    'javascript-factorial',

    'javascript-array-sum',

    'javascript-array-maximum',

    'javascript-string-reverse',

    'javascript-palindrome',

    'javascript-word-frequency',

    'javascript-maximum-subarray',

  ],

  'dotnet:csharp': [

    'csharp-hello-world',

    'csharp-add-two-numbers',

    'csharp-even-odd',

    'csharp-largest-three',

    'csharp-sum-first-n',

    'csharp-factorial',

    'csharp-array-sum',

    'csharp-array-maximum',

    'csharp-string-reverse',

    'csharp-word-frequency',

    'csharp-student-class',

    'csharp-student-records',

  ],

  'dotnet:aspnet-core': [

    'aspnetcore-hello-api',

    'aspnetcore-routing',

    'aspnetcore-route-parameter',

    'aspnetcore-query-parameter',

    'aspnetcore-post-endpoint',

    'aspnetcore-model-binding',

    'aspnetcore-service',

    'aspnetcore-dependency-injection',

    'aspnetcore-validation',

    'aspnetcore-crud-api',

    'aspnetcore-middleware',

    'aspnetcore-product-api',

  ],

  'dotnet:entity-framework': [],

  /* =======================================================

     .NET FULL STACK - SQL SERVER

  ======================================================= */

  'dotnet:sqlserver': [

    'sqlserver-create-database',

    'sqlserver-create-table',

    'sqlserver-insert-records',

    'sqlserver-select-records',

    'sqlserver-where-filter',

    'sqlserver-update-records',

    'sqlserver-delete-records',

    'sqlserver-aggregate-functions',

    'sqlserver-group-by',

    'sqlserver-join-tables',

    'sqlserver-subqueries',

    'sqlserver-views',

    'sqlserver-indexes',

    'sqlserver-transactions',

  ],

  'dotnet:authentication': [],

  'dotnet:integration': [],

  'dotnet:testing': [],

  'dotnet:git': [],

  'dotnet:deployment': [],

  'dotnet:projects': [],

  /* =======================================================

     JAVA FULL STACK

     Must match roadmap stackSlug: java-fullstack

  ======================================================= */

  'java-fullstack:html': [

    'html-profile-page',

    'html-registration-form',

    'html-semantic-blog',

  ],

  'java-fullstack:css': [

    'css-responsive-card',

    'css-flexbox-navbar',

    'css-grid-dashboard',

  ],

  'java-fullstack:javascript': [

    'javascript-hello-world',

    'javascript-add-two-numbers',

    'javascript-even-odd',

    'javascript-largest-three',

    'javascript-sum-first-n',

    'javascript-factorial',

    'javascript-array-sum',

    'javascript-array-maximum',

    'javascript-string-reverse',

    'javascript-palindrome',

    'javascript-word-frequency',

    'javascript-maximum-subarray',

  ],

  'java-fullstack:java': [

    'java-hello-world',

    'java-add-two-numbers',

    'java-even-odd',

    'java-largest-three',

    'java-sum-first-n',

    'java-factorial',

    'java-array-sum',

    'java-array-maximum',

    'java-string-reverse',

    'java-word-frequency',

    'java-student-class',

    'java-student-records',

  ],

  'java-fullstack:springboot': [

    'springboot-hello-controller',

  ],

  'java-fullstack:postgresql': [

    'postgresql-create-database',

    'postgresql-create-table',

    'postgresql-insert-records',

    'postgresql-select-records',

    'postgresql-where-filter',

    'postgresql-update-records',

    'postgresql-delete-records',

    'postgresql-aggregate-functions',

    'postgresql-group-by',

    'postgresql-join-tables',

    'postgresql-subqueries',

    'postgresql-views',

    'postgresql-indexes',

    'postgresql-transactions',

  ],

  'java-fullstack:authentication': [],

  'java-fullstack:integration': [],

  'java-fullstack:testing': [],

  'java-fullstack:git': [],

  'java-fullstack:deployment': [],

  'java-fullstack:projects': [],

  /* =======================================================

     PHP FULL STACK

     Must match roadmap stackSlug: php-fullstack

  ======================================================= */

  'php-fullstack:html': [

    'html-profile-page',

    'html-registration-form',

    'html-semantic-blog',

  ],

  'php-fullstack:css': [

    'css-responsive-card',

    'css-flexbox-navbar',

    'css-grid-dashboard',

  ],

  'php-fullstack:javascript': [

    'javascript-hello-world',

    'javascript-add-two-numbers',

    'javascript-even-odd',

    'javascript-largest-three',

    'javascript-sum-first-n',

    'javascript-factorial',

    'javascript-array-sum',

    'javascript-array-maximum',

    'javascript-string-reverse',

    'javascript-palindrome',

    'javascript-word-frequency',

    'javascript-maximum-subarray',

  ],

  'php-fullstack:php': [

    'php-hello-world',

    'php-variables',

    'php-user-input',

    'php-add-numbers',

    'php-even-odd',

    'php-largest-number',

    'php-for-loop',

    'php-array-sum',

    'php-reverse-string',

    'php-function',

    'php-class',

    'php-exception-handling',

  ],

  'php-fullstack:php-backend': [],

  /* =======================================================

     PHP FULL STACK - MYSQL

  ======================================================= */

  'php-fullstack:mysql': [

    'mysql-create-database',

    'mysql-create-table',

    'mysql-insert-records',

    'mysql-select-records',

    'mysql-where-filter',

    'mysql-update-records',

    'mysql-delete-records',

    'mysql-aggregate-functions',

    'mysql-group-by',

    'mysql-join-tables',

    'mysql-subqueries',

    'mysql-views',

    'mysql-indexes',

    'mysql-transactions',

  ],

  'php-fullstack:authentication': [],

  'php-fullstack:integration': [],

  'php-fullstack:testing': [],

  'php-fullstack:git': [],

  'php-fullstack:deployment': [],

  'php-fullstack:projects': [],

  /* =======================================================

     NEXT.JS + NESTJS

  ======================================================= */

  'next-nest:html': [

    'html-profile-page',

    'html-registration-form',

  ],

  'next-nest:css': [

    'css-responsive-card',

    'css-grid-dashboard',

  ],

  /* =======================================================

     NEXT + NEST - JAVASCRIPT

  ======================================================= */

  'next-nest:javascript': [

    'javascript-hello-world',

    'javascript-add-two-numbers',

    'javascript-even-odd',

    'javascript-largest-three',

    'javascript-sum-first-n',

    'javascript-factorial',

    'javascript-array-sum',

    'javascript-array-maximum',

    'javascript-string-reverse',

    'javascript-palindrome',

    'javascript-word-frequency',

    'javascript-maximum-subarray',

  ],

  /* =======================================================

     NEXT + NEST - TYPESCRIPT

  ======================================================= */

  'next-nest:typescript': [

    'typescript-basic-types',

    'typescript-function-types',

    'typescript-arrays-objects',

    'typescript-interfaces',

    'typescript-unions',

    'typescript-generics',

    'typescript-classes',

    'typescript-user-directory',

  ],

  /* =======================================================

     NEXT + NEST - REACT

  ======================================================= */

  'next-nest:react': [

    'react-counter',

    'react-search-products',

    'react-todo',

    'react-user-directory',

  ],

  /* =======================================================

     NEXT.JS

  ======================================================= */

  'next-nest:nextjs': [

    'nextjs-page-component',

    'nextjs-root-layout',

    'nextjs-navigation',

    'nextjs-dynamic-route',

    'nextjs-server-component',

    'nextjs-client-component',

    'nextjs-search-params',

    'nextjs-route-handler',

    'nextjs-data-fetching',

    'nextjs-form-action',

    'nextjs-api-integration',

    'nextjs-dashboard',

  ],

  /* =======================================================

     NEXT + NEST - NODE.JS

  ======================================================= */

  'next-nest:nodejs': [

    'node-stdin-uppercase',

    'node-word-count',

    'node-json-array-sum',

    'node-buffer-byte-length',

    'node-path-basename',

    'node-path-extension',

    'node-url-hostname',

    'node-url-query-param',

    'node-event-emitter-message',

    'node-event-emitter-sum',

    'node-sha256-hash',

    'node-stream-line-count',

  ],

  /* =======================================================

     NESTJS

  ======================================================= */

  'next-nest:nestjs': [

    'nestjs-basic-controller',

    'nestjs-get-route',

    'nestjs-post-route',

    'nestjs-route-params',

    'nestjs-query-params',

    'nestjs-service',

    'nestjs-dependency-injection',

    'nestjs-create-dto',

    'nestjs-validation',

    'nestjs-module',

    'nestjs-users-api',

    'nestjs-course-management-api',

  ],

  /* =======================================================

     POSTGRESQL

  ======================================================= */

  'next-nest:postgresql': [

    'postgresql-create-database',

    'postgresql-create-table',

    'postgresql-insert-records',

    'postgresql-select-records',

    'postgresql-where-filter',

    'postgresql-update-records',

    'postgresql-delete-records',

    'postgresql-aggregate-functions',

    'postgresql-group-by',

    'postgresql-join-tables',

    'postgresql-subqueries',

    'postgresql-views',

    'postgresql-indexes',

    'postgresql-transactions',

  ],

  /* =======================================================

     INTEGRATION

  ======================================================= */

  'next-nest:integration': [],

  /* =======================================================

     TESTING

  ======================================================= */

  'next-nest:testing': [],

  /* =======================================================

     DEPLOYMENT

  ======================================================= */

  'next-nest:deployment': [],

  /* =======================================================

     PROJECTS

  ======================================================= */

  'next-nest:projects': [],

  /* =======================================================

     PYTHON DATA ANALYTICS

     Stack: python-analytics

     Domain: data-analytics

  ======================================================= */

  'python-analytics:python-data-analytics': [

    'pda-load-sales-data',

    'pda-inspect-sales-data',

    'pda-handle-missing-values',

    'pda-remove-duplicates',

    'pda-filter-high-value-orders',

    'pda-sales-by-region',

    'pda-top-products',

    'pda-monthly-sales-trend',

    'pda-sales-summary',

    'pda-sales-chart',

  ],

  /* =======================================================

     POWER BI DATA ANALYTICS

     Stack: power-bi

     Domain: data-analytics

  ======================================================= */

  'power-bi:power-bi': [

    'powerbi-import-sales-data',

    'powerbi-clean-sales-data',

    'powerbi-sales-data-model',

    'powerbi-total-revenue',

    'powerbi-profit-margin',

    'powerbi-monthly-sales-trend',

    'powerbi-regional-sales-dashboard',

    'powerbi-top-products',

    'powerbi-sales-kpi-dashboard',

    'powerbi-executive-sales-report',

  ],

  /* =======================================================

     PYTHON MACHINE LEARNING

     Stack: python-ml

     Domain: ai-ml

  ======================================================= */

  'python-ml:python-machine-learning': [

    'pml-load-customer-data',

    'pml-prepare-features-target',

    'pml-handle-missing-data',

    'pml-encode-categorical-features',

    'pml-scale-numerical-features',

    'pml-train-test-split',

    'pml-linear-regression',

    'pml-logistic-regression',

    'pml-evaluate-classification-model',

    'pml-customer-prediction-pipeline',

  ],

  /* =======================================================

     LINUX

     Stack: linux

     Domain: cloud-devops

  ======================================================= */

  /* =======================================================

     LINUX SECURITY - CYBERSECURITY

     Stack: linux-security

     Domain: cybersecurity

     Slugs resolve once registered in problems.ts

  ======================================================= */

  'linux-security:linux-security-fundamentals': [

    'linux-security-identify-current-user',

    'linux-security-inspect-system-information',

    'linux-security-identify-privileged-accounts',

    'linux-security-inspect-sensitive-directories',

    'linux-security-generate-security-baseline',

  ],

  'linux-security:file-permissions-security': [

    'linux-security-inspect-file-permissions',

    'linux-security-secure-confidential-file',

    'linux-security-correct-file-ownership',

    'linux-security-detect-world-writable-files',

    'linux-security-secure-shared-directory',

  ],

  'linux-security:user-group-security': [

    'linux-security-inspect-user-account',

    'linux-security-list-group-memberships',

    'linux-security-audit-sudo-privileges',

    'linux-security-identify-inactive-accounts',

    'linux-security-apply-least-privilege',

  ],

  'linux-security:ssh-security': [

    'linux-security-inspect-ssh-configuration',

    'linux-security-verify-ssh-key-permissions',

    'linux-security-disable-ssh-root-login',

    'linux-security-audit-password-authentication',

    'linux-security-harden-ssh-configuration',

  ],

  'linux-security:linux-firewall-security': [

    'linux-security-inspect-firewall-rules',

    'linux-security-identify-allowed-ports',

    'linux-security-configure-default-deny',

    'linux-security-audit-open-ports',

    'linux-security-create-secure-firewall-ruleset',

  ],

  'linux-security:process-service-security': [

    'linux-security-list-running-processes',

    'linux-security-inspect-service-status',

    'linux-security-identify-privileged-processes',

    'linux-security-audit-unnecessary-services',

    'linux-security-harden-service-configuration',

  ],

  'linux-security:linux-log-analysis': [

    'linux-security-read-authentication-logs',

    'linux-security-filter-failed-logins',

    'linux-security-count-failed-logins',

    'linux-security-identify-suspicious-sudo',

    'linux-security-investigate-authentication-incident',

  ],

  'linux-security:linux-system-hardening': [

    'linux-security-inspect-password-policy',

    'linux-security-check-hardening-settings',

    'linux-security-correct-insecure-permissions',

    'linux-security-review-kernel-security',

    'linux-security-apply-hardening-baseline',

  ],

  'linux-security:linux-security-auditing': [

    'linux-security-inspect-audit-configuration',

    'linux-security-read-audit-events',

    'linux-security-identify-permission-violations',

    'linux-security-audit-user-ssh-configurations',

    'linux-security-generate-security-audit-report',

  ],

  'linux-security:linux-security-capstone': [

    'linux-security-file-user-access-audit',

    'linux-security-investigate-suspicious-logins',

    'linux-security-harden-simulated-server',

    'linux-security-end-to-end-security-assessment',

    'linux-security-incident-remediation-lab',

  ],

'devops-engineer:linux': [

  'linux-create-directory',

],

  /* =======================================================

     GIT

     Stack: devops-engineer

     Domain: cloud-devops

  ======================================================= */

  'devops-engineer:git': [

    'git-initialize-repository',

  ],

  /* =======================================================

     DOCKER

     Stack: devops-engineer

     Domain: cloud-devops

  ======================================================= */

  'devops-engineer:docker': [

    'docker-check-version',

  ],

  /* =======================================================

     KUBERNETES

     Stack: devops-engineer

     Domain: cloud-devops

  ======================================================= */

  'devops-engineer:kubernetes': [

    'kubernetes-check-kubectl-version',

  ],

  /* =======================================================

     CI/CD

     Stack: devops-engineer

     Domain: cloud-devops

  ======================================================= */

  'devops-engineer:ci-cd': [

    'cicd-create-github-actions-workflow',

  ],

  /* =======================================================

     PYTHON + APACHE SPARK DATA ENGINEERING

     Stack: python-spark

     Domain: data-engineering

  ======================================================= */

  'python-spark:spark-fundamentals': [

    'pyspark-create-spark-session',

    'pyspark-create-dataframe',

  ],

  'python-spark:pyspark-dataframes': [

    'pyspark-select-columns',

    'pyspark-filter-rows',

    'pyspark-add-derived-column',

    'pyspark-groupby-aggregation',

    'pyspark-handle-null-values',

    'pyspark-join-dataframes',

  ],

  'python-spark:spark-sql': [

    'pyspark-spark-sql-query',

  ],

  'python-spark:pyspark-etl': [

    'pyspark-etl-sales-pipeline',

  ],

  'python-spark:data-engineering-projects': [

    'pyspark-etl-sales-pipeline',

  ],

  /* =======================================================

     ADDITIONAL DATA ENGINEERING MODULES

  ======================================================= */

  'python-spark:python-data-engineering': [

    'pyspark-python-de-clean-records',

  ],

  'python-spark:sql-data-engineering': [

    'pyspark-sql-de-revenue',

  ],

  'python-spark:spark-data-formats': [

    'pyspark-data-formats-parquet',

  ],

  'python-spark:spark-optimization': [

    'pyspark-performance-broadcast-join',

  ],

  'python-spark:spark-streaming': [

    'pyspark-structured-streaming-schema',

  ],

  /* =======================================================

     PYTHON SECURITY - CYBERSECURITY

     Stack: python-security

     Domain: cybersecurity

  ======================================================= */

  // Python Security Fundamentals

  'python-security:python-security-fundamentals': [

    'python-security-inspect-python-runtime',

    'python-security-identify-current-process-user',

    'python-security-validate-safe-file-path',

    'python-security-sanitize-audit-event',

    'python-security-build-security-environment-report',

  ],

  // Input Validation and Sanitization

  'python-security:python-input-validation': [

    'python-security-validate-username',

    'python-security-validate-ipv4-address',

    'python-security-validate-email-input',

    'python-security-reject-malicious-filenames',

    'python-security-implement-structured-input-validator',

  ],

  // Authentication and Password Security

  'python-security:python-password-security': [

    'python-security-check-password-strength',

    'python-security-generate-secure-token',

    'python-security-hash-password-with-salt',

    'python-security-verify-stored-password-hash',

    'python-security-implement-login-attempt-lockout',

  ],

  // Cryptography and Data Protection

  'python-security:python-cryptography': [

    'python-security-calculate-sha-256-digest',

    'python-security-generate-secure-random-bytes',

    'python-security-verify-file-integrity',

    'python-security-encrypt-sensitive-data',

    'python-security-build-secure-secret-storage-utility',

  ],

  // File and OS Security

  'python-security:python-file-security': [

    'python-security-inspect-file-permissions',

    'python-security-create-private-file',

    'python-security-detect-symbolic-link',

    'python-security-secure-temporary-file',

    'python-security-prevent-toctou-file-replacement',

  ],

  // Web Application Security

  'python-security:python-web-security': [

    'python-security-escape-html-output',

    'python-security-validate-redirect-target',

    'python-security-check-csrf-token',

    'python-security-prevent-sql-injection',

    'python-security-build-secure-api-input-layer',

  ],

  // Network and API Security

  'python-security:python-network-security': [

    'python-security-validate-allowed-port',

    'python-security-parse-safe-url',

    'python-security-enforce-request-timeout',

    'python-security-implement-api-rate-limiter',

    'python-security-block-ssrf-destinations',

  ],

  // Security Logging and Monitoring

  'python-security:python-security-logging': [

    'python-security-record-audit-event',

    'python-security-redact-sensitive-values',

    'python-security-detect-repeated-login-failures',

    'python-security-identify-suspicious-access-pattern',

    'python-security-generate-security-incident-summary',

  ],

  // Dependency and Code Security

  'python-security:python-code-security': [

    'python-security-inspect-package-metadata',

    'python-security-detect-unsafe-eval-usage',

    'python-security-check-hardcoded-secrets',

    'python-security-analyze-dangerous-subprocess-calls',

    'python-security-create-static-security-scanner',

  ],

  // Python Security Capstone

  'python-security:python-security-capstone': [

    'python-security-secure-registration-validator',

    'python-security-secure-file-upload-handler',

    'python-security-authentication-audit-analyzer',

    'python-security-secure-configuration-auditor',

    'python-security-build-python-security-audit-toolkit',

  ],

  /* =======================================================

     NETWORK SECURITY - CYBERSECURITY

     Stack: network-security

     Module: network-security-fundamentals

     The module slug must also exist in stack-engine/roadmaps.ts.

  ======================================================= */

  'network-security:network-security-fundamentals': [

    'network-security-validate-ipv4-address',

    'network-security-classify-ipv4-address',

    'network-security-calculate-network-address',

    'network-security-calculate-subnet-range',

    'network-security-check-ip-in-subnet',

    'network-security-validate-tcp-port',

    'network-security-parse-dns-records',

    'network-security-audit-http-security-headers',

    'network-security-inspect-tls-certificate-dates',

    'network-security-detect-port-scan-in-logs',

  ],

  /* =======================================================

     WEB APPLICATION SECURITY - CYBERSECURITY

     Stack: web-security

     Domain: cybersecurity

     Module slugs match the web-security roadmap.

  ======================================================= */

  'web-security:web-security-fundamentals': [

    'web-security-validate-http-status-code',

    'web-security-detect-suspicious-url-parameters',

  ],

  'web-security:input-validation': [

    'web-security-detect-sql-injection-patterns',

    'web-security-detect-path-traversal-attempts',

  ],

  'web-security:xss-csrf': [

    'web-security-identify-unsafe-html-input',

    'web-security-implement-safe-html-escaping',

  ],

  'web-security:authentication-security': [

    'web-security-validate-secure-password',

    'web-security-validate-jwt-expiration',

  ],

  'web-security:api-security': [

    'web-security-identify-missing-security-headers',

  ],

  'web-security:security-testing': [

    'web-security-analyze-http-access-logs',

  ],

  'web-security:secure-development': [],

  'web-security:web-security-projects': [],

  /* =======================================================

     PENETRATION TESTING - CYBERSECURITY

     Stack: penetration-testing

     Domain: cybersecurity

  ======================================================= */

  'penetration-testing:pentest-fundamentals': [

    'penetration-testing-validate-target-scope',

    'penetration-testing-classify-testing-phase',

    'penetration-testing-rules-of-engagement',

  ],

  'penetration-testing:pentest-reconnaissance': [

    'penetration-testing-extract-domains',

    'penetration-testing-analyze-dns-records',

    'penetration-testing-passive-asset-inventory',

  ],

  'penetration-testing:pentest-scanning': [

    'penetration-testing-identify-services',

    'penetration-testing-parse-nmap-output',

    'penetration-testing-detect-unexpected-ports',

  ],

  'penetration-testing:pentest-vulnerability-assessment': [

    'penetration-testing-classify-cvss',

    'penetration-testing-prioritize-vulnerabilities',

    'penetration-testing-correlate-findings',

  ],

  'penetration-testing:pentest-web-testing': [

    'penetration-testing-inspect-http-headers',

    'penetration-testing-detect-unsafe-input',

    'penetration-testing-analyze-web-auth',

  ],

  'penetration-testing:pentest-network-testing': [

    'penetration-testing-validate-cidr',

    'penetration-testing-analyze-firewall-rules',

    'penetration-testing-audit-segmentation',

  ],

  'penetration-testing:pentest-authentication': [

    'penetration-testing-password-policy',

    'penetration-testing-detect-login-anomalies',

    'penetration-testing-audit-permissions',

  ],

  'penetration-testing:pentest-exploitation': [

    'penetration-testing-vulnerability-preconditions',

    'penetration-testing-verify-simulated-vulnerability',

    'penetration-testing-analyze-exploitation-evidence',

  ],

  'penetration-testing:pentest-reporting': [

    'penetration-testing-format-finding',

    'penetration-testing-vulnerability-summary',

    'penetration-testing-remediation-plan',

  ],

  'penetration-testing:pentest-projects': [

    'penetration-testing-asset-audit',

    'penetration-testing-simulated-assessment',

    'penetration-testing-complete-report',

  ],



  /* =======================================================
     SOC & SIEM - CYBERSECURITY
     Stack: soc-siem
     Domain: cybersecurity
     Python Security runtime (configured in workspace/backend)
  ======================================================= */

  // SOC Fundamentals
  'soc-siem:soc-fundamentals': [
    'soc-siem-classify-security-events',
    'soc-siem-identify-alert-severity',
    'soc-siem-validate-incident-priority',
  ],

  // Security Log Analysis
  'soc-siem:security-log-analysis': [
    'soc-siem-parse-authentication-logs',
    'soc-siem-count-failed-logins',
    'soc-siem-detect-suspicious-ip-activity',
  ],

  // Windows Event Monitoring
  'soc-siem:windows-event-monitoring': [
    'soc-siem-analyze-windows-event-ids',
    'soc-siem-detect-repeated-windows-login-failures',
    'soc-siem-identify-windows-privilege-changes',
  ],

  // Linux Security Monitoring
  'soc-siem:linux-security-monitoring': [
    'soc-siem-parse-ssh-authentication-logs',
    'soc-siem-detect-ssh-brute-force-attempts',
    'soc-siem-analyze-sudo-activity',
  ],

  // SIEM Fundamentals
  'soc-siem:siem-fundamentals': [
    'soc-siem-normalize-security-events',
    'soc-siem-filter-siem-events',
    'soc-siem-aggregate-log-sources',
  ],

  // Threat Detection Rules
  'soc-siem:threat-detection-rules': [
    'soc-siem-detect-suspicious-login-patterns',
    'soc-siem-match-ioc-indicators',
    'soc-siem-evaluate-detection-rules',
  ],

  // Incident Investigation
  'soc-siem:incident-investigation': [
    'soc-siem-build-incident-timeline',
    'soc-siem-identify-related-events',
    'soc-siem-calculate-incident-risk',
  ],

  // Threat Intelligence
  'soc-siem:threat-intelligence': [
    'soc-siem-validate-threat-indicators',
    'soc-siem-correlate-ip-reputation',
    'soc-siem-match-known-threat-patterns',
  ],

  // Alert Correlation
  'soc-siem:alert-correlation': [
    'soc-siem-correlate-multiple-alerts',
    'soc-siem-detect-multi-stage-attack-patterns',
    'soc-siem-reduce-duplicate-alerts',
  ],

  // SOC Incident Response
  'soc-siem:soc-incident-response': [
    'soc-siem-prioritize-security-incidents',
    'soc-siem-generate-incident-summary',
    'soc-siem-evaluate-response-actions',
  ],


  
  /* =======================================================
     DIGITAL FORENSICS - CYBERSECURITY
     Stack: digital-forensics
     Domain: cybersecurity
     Runtime: python-security
     Total: 10 modules / 30 problems
  ======================================================= */

  // Module 1: Digital Forensics Fundamentals
  'digital-forensics:digital-forensics-fundamentals': [
    'digital-forensics-identify-evidence-type',
    'digital-forensics-classify-digital-artifacts',
    'digital-forensics-validate-evidence-record',
  ],

  // Module 2: Evidence Collection and Integrity
  'digital-forensics:evidence-collection-integrity': [
    'digital-forensics-compare-evidence-hashes',
    'digital-forensics-check-custody-sequence',
    'digital-forensics-verify-evidence-size',
  ],

  // Module 3: File System Forensics
  'digital-forensics:file-system-forensics': [
    'digital-forensics-detect-file-signature',
    'digital-forensics-classify-file-timestamps',
    'digital-forensics-count-deleted-records',
  ],

  // Module 4: Disk and Storage Forensics
  'digital-forensics:disk-storage-forensics': [
    'digital-forensics-calculate-sector-offset',
    'digital-forensics-validate-partition-range',
    'digital-forensics-summarize-disk-image',
  ],

  // Module 5: Windows Forensics
  'digital-forensics:windows-forensics': [
    'digital-forensics-classify-windows-event',
    'digital-forensics-detect-repeated-logon-failures',
    'digital-forensics-identify-registry-hive',
  ],

  // Module 6: Linux Forensics
  'digital-forensics:linux-forensics': [
    'digital-forensics-classify-linux-auth-result',
    'digital-forensics-count-sudo-events',
    'digital-forensics-evaluate-file-permissions',
  ],

  // Module 7: Memory Forensics
  'digital-forensics:memory-forensics': [
    'digital-forensics-identify-suspicious-process',
    'digital-forensics-detect-orphan-process',
    'digital-forensics-summarize-memory-regions',
  ],

  // Module 8: Network Forensics
  'digital-forensics:network-forensics': [
    'digital-forensics-classify-network-port',
    'digital-forensics-count-external-connections',
    'digital-forensics-detect-port-scan-pattern',
  ],

  // Module 9: Forensic Timeline Analysis
  'digital-forensics:forensic-timeline-analysis': [
    'digital-forensics-sort-forensic-timestamps',
    'digital-forensics-calculate-event-gap',
    'digital-forensics-detect-timeline-order-anomaly',
  ],

  // Module 10: Incident Reconstruction and Reporting
  'digital-forensics:incident-reconstruction-reporting': [
    'digital-forensics-rank-forensic-findings',
    'digital-forensics-correlate-evidence-identifiers',
    'digital-forensics-generate-incident-summary',
  ],


  /* =======================================================
     CLOUD SECURITY - CYBERSECURITY
     Stack: cloud-security
     Domain: cybersecurity
     10 modules / 30 offline Python problems
  ======================================================= */

  'cloud-security:cloud-security-fundamentals': [
    'cloud-security-identify-cloud-service-model',
    'cloud-security-classify-shared-responsibility',
    'cloud-security-validate-cloud-region',
  ],

  'cloud-security:cloud-identity-access-management': [
    'cloud-security-validate-iam-policy-action',
    'cloud-security-detect-excessive-permissions',
    'cloud-security-identify-privileged-cloud-users',
  ],

  'cloud-security:cloud-network-security': [
    'cloud-security-validate-security-group-rule',
    'cloud-security-detect-public-port-exposure',
    'cloud-security-evaluate-network-acl',
  ],

  'cloud-security:cloud-storage-security': [
    'cloud-security-detect-public-storage-bucket',
    'cloud-security-validate-storage-encryption',
    'cloud-security-review-object-permissions',
  ],

  'cloud-security:cloud-data-protection': [
    'cloud-security-classify-sensitive-cloud-data',
    'cloud-security-validate-encryption-configuration',
    'cloud-security-detect-exposed-secret-marker',
  ],

  'cloud-security:cloud-logging-monitoring': [
    'cloud-security-analyze-cloud-audit-event',
    'cloud-security-detect-suspicious-cloud-sign-in',
    'cloud-security-identify-unauthorized-api-activity',
  ],

  'cloud-security:cloud-configuration-security': [
    'cloud-security-detect-cloud-misconfiguration',
    'cloud-security-validate-cloud-security-baseline',
    'cloud-security-check-cloud-resource-tags',
  ],

  'cloud-security:cloud-threat-detection': [
    'cloud-security-detect-brute-force-attempts',
    'cloud-security-identify-suspicious-ip-activity',
    'cloud-security-classify-cloud-threat-event',
  ],

  'cloud-security:cloud-container-kubernetes-security': [
    'cloud-security-validate-container-security-settings',
    'cloud-security-detect-privileged-containers',
    'cloud-security-review-pod-security-configuration',
  ],

  'cloud-security:cloud-compliance-incident-response': [
    'cloud-security-check-cloud-compliance-controls',
    'cloud-security-classify-cloud-security-incident',
    'cloud-security-generate-incident-summary',
  ],

  /* =======================================================
     DEVSECOPS - CYBERSECURITY
     Stack: devsecops
     Domain: cybersecurity
     10 modules / 30 offline Python problems
   ======================================================= */

  'devsecops:devsecops-fundamentals': [
    'devsecops-identify-sdlc-security-phase',
    'devsecops-classify-security-control',
    'devsecops-evaluate-shift-left-security',
  ],

  'devsecops:devsecops-secure-coding': [
    'devsecops-detect-hardcoded-credentials',
    'devsecops-identify-unsafe-input-handling',
    'devsecops-classify-code-vulnerability',
  ],

  'devsecops:devsecops-dependency-supply-chain': [
    'devsecops-identify-vulnerable-dependency',
    'devsecops-validate-package-version-policy',
    'devsecops-detect-untrusted-package-source',
  ],

  'devsecops:devsecops-secrets-management': [
    'devsecops-detect-exposed-api-key',
    'devsecops-validate-secret-storage-policy',
    'devsecops-classify-sensitive-configuration',
  ],

  'devsecops:devsecops-cicd-pipeline-security': [
    'devsecops-validate-secure-pipeline-stages',
    'devsecops-detect-missing-security-scan',
    'devsecops-evaluate-pipeline-security-gate',
  ],

  'devsecops:devsecops-security-testing': [
    'devsecops-classify-sast-vs-dast',
    'devsecops-analyze-security-scan-findings',
    'devsecops-prioritize-vulnerability-remediation',
  ],

  'devsecops:devsecops-container-security': [
    'devsecops-detect-insecure-dockerfile-instruction',
    'devsecops-validate-container-image-policy',
    'devsecops-identify-container-misconfiguration',
  ],

  'devsecops:devsecops-infrastructure-as-code-security': [
    'devsecops-detect-insecure-terraform-configuration',
    'devsecops-validate-iac-security-baseline',
    'devsecops-identify-public-resource-exposure',
  ],

  'devsecops:devsecops-kubernetes-deployment-security': [
    'devsecops-detect-privileged-pod-configuration',
    'devsecops-validate-deployment-security-policy',
    'devsecops-check-kubernetes-security-context',
  ],

  'devsecops:devsecops-compliance-monitoring': [
    'devsecops-evaluate-security-compliance-controls',
    'devsecops-classify-security-incident-severity',
    'devsecops-generate-devsecops-security-report',
  ],

  /* =======================================================
     INCIDENT RESPONSE - CYBERSECURITY
     Stack: incident-response
     Domain: cybersecurity
     10 modules / 30 offline Python problems
  ======================================================= */

  'incident-response:incident-response-fundamentals': [
    'incident-response-identify-incident-severity',
    'incident-response-classify-security-event',
    'incident-response-identify-incident-response-phase',
  ],

  'incident-response:incident-response-detection-triage': [
    'incident-response-classify-security-alert',
    'incident-response-prioritize-incident-ticket',
    'incident-response-detect-suspicious-login-activity',
  ],

  'incident-response:incident-response-analysis': [
    'incident-response-analyze-authentication-logs',
    'incident-response-identify-indicators-of-compromise',
    'incident-response-correlate-security-events',
  ],

  'incident-response:incident-response-containment': [
    'incident-response-select-containment-strategy',
    'incident-response-identify-compromised-endpoint',
    'incident-response-validate-network-isolation-decision',
  ],

  'incident-response:incident-response-evidence-preservation': [
    'incident-response-classify-digital-evidence',
    'incident-response-validate-evidence-integrity',
    'incident-response-verify-chain-of-custody',
  ],

  'incident-response:incident-response-threat-intelligence': [
    'incident-response-classify-ioc-type',
    'incident-response-match-known-threat-indicators',
    'incident-response-evaluate-threat-intelligence-confidence',
  ],

  'incident-response:incident-response-malware-handling': [
    'incident-response-classify-malware-incident',
    'incident-response-identify-suspicious-file-behavior',
    'incident-response-prioritize-malware-response',
  ],

  'incident-response:incident-response-eradication-recovery': [
    'incident-response-select-eradication-action',
    'incident-response-validate-system-recovery-status',
    'incident-response-check-post-incident-monitoring',
  ],

  'incident-response:incident-response-communication-escalation': [
    'incident-response-determine-escalation-level',
    'incident-response-classify-notification-priority',
    'incident-response-validate-incident-report-fields',
  ],

  'incident-response:incident-response-post-incident-review': [
    'incident-response-identify-root-cause-category',
    'incident-response-evaluate-response-effectiveness',
    'incident-response-generate-incident-summary',
  ],

  /* =======================================================
     BLOCKCHAIN & WEB3
     4 stacks / 40 modules / 120 practice problems
     Slugs match stackRoadmaps.ts and problem definition files.
  ======================================================= */

  // ethereum-solidity
  'ethereum-solidity:evm-fundamentals': [
    'ethereum-solidity-deploy-local-accounts',
    'ethereum-solidity-estimate-transfer-gas',
    'ethereum-solidity-inspect-a-transaction-receipt',
  ],

  'ethereum-solidity:solidity-basics': [
    'ethereum-solidity-implement-typed-storage',
    'ethereum-solidity-pure-versus-view',
    'ethereum-solidity-checked-ledger-arithmetic',
  ],

  'ethereum-solidity:contract-state': [
    'ethereum-solidity-increment-on-chain-state',
    'ethereum-solidity-struct-mapping-directory',
    'ethereum-solidity-calldata-array-totals',
  ],

  'ethereum-solidity:contract-control-flow': [
    'ethereum-solidity-parameterized-calculator',
    'ethereum-solidity-owner-only-maintenance',
    'ethereum-solidity-custom-error-semantics',
  ],

  'ethereum-solidity:events-and-logs': [
    'ethereum-solidity-indexed-ownership-event',
    'ethereum-solidity-audit-trail-events',
    'ethereum-solidity-decode-event-logs',
  ],

  'ethereum-solidity:contract-composition': [
    'ethereum-solidity-external-interface-call',
    'ethereum-solidity-inherited-permissions',
    'ethereum-solidity-safe-math-library',
  ],

  'ethereum-solidity:ether-and-payments': [
    'ethereum-solidity-accept-ether-with-receipt',
    'ethereum-solidity-account-deposit-accounting',
    'ethereum-solidity-handle-failing-payouts',
  ],

  'ethereum-solidity:contract-deployment': [
    'ethereum-solidity-compiler-abi-check',
    'ethereum-solidity-constructor-initialization',
    'ethereum-solidity-deployment-address-checks',
  ],

  'ethereum-solidity:solidity-testing': [
    'ethereum-solidity-test-deterministic-operations',
    'ethereum-solidity-assert-revert-and-event',
    'ethereum-solidity-multi-account-sequencing',
  ],

  'ethereum-solidity:solidity-project': [
    'ethereum-solidity-role-based-record-registry',
    'ethereum-solidity-offline-escrow-states',
    'ethereum-solidity-evm-end-to-end-verification',
  ],


  // web3-dapp-development
  'web3-dapp-development:web3-foundations': [
    'web3-dapp-development-read-local-chain-identity',
    'web3-dapp-development-connect-read-only-provider',
    'web3-dapp-development-validate-account-and-network',
  ],

  'web3-dapp-development:typescript-ethers': [
    'web3-dapp-development-use-bigint-token-units',
    'web3-dapp-development-type-contract-calls',
    'web3-dapp-development-normalize-rpc-errors',
  ],

  'web3-dapp-development:wallet-integration': [
    'web3-dapp-development-choose-a-local-test-signer',
    'web3-dapp-development-model-connection-states',
    'web3-dapp-development-react-to-network-switching',
  ],

  'web3-dapp-development:contract-abi': [
    'web3-dapp-development-abi-encode-function',
    'web3-dapp-development-decode-abi-result',
    'web3-dapp-development-decode-revert-error',
  ],

  'web3-dapp-development:contract-reads': [
    'web3-dapp-development-read-a-deployed-registry',
    'web3-dapp-development-batch-contract-read-requests',
    'web3-dapp-development-format-chain-state-in-ui',
  ],

  'web3-dapp-development:transactions': [
    'web3-dapp-development-build-transaction-request',
    'web3-dapp-development-wait-for-confirmation',
    'web3-dapp-development-handle-replaced-transaction',
  ],

  'web3-dapp-development:event-indexing': [
    'web3-dapp-development-query-past-events',
    'web3-dapp-development-filter-indexed-logs',
    'web3-dapp-development-deduplicate-event-updates',
  ],

  'web3-dapp-development:dapp-frontend': [
    'web3-dapp-development-manage-react-provider-lifecycle',
    'web3-dapp-development-display-contract-loading',
    'web3-dapp-development-pending-transaction-ui',
  ],

  'web3-dapp-development:web3-testing': [
    'web3-dapp-development-mock-json-rpc-failures',
    'web3-dapp-development-local-contract-integration',
    'web3-dapp-development-wallet-disconnect-tests',
  ],

  'web3-dapp-development:dapp-project': [
    'web3-dapp-development-connect-local-voting-ui',
    'web3-dapp-development-event-driven-vote-refresh',
    'web3-dapp-development-full-dapp-workflow-tests',
  ],


  // smart-contract-security
  'smart-contract-security:threat-modeling': [
    'smart-contract-security-map-token-attack-surface',
    'smart-contract-security-document-trust-boundaries',
    'smart-contract-security-threat-scenario-tests',
  ],

  'smart-contract-security:access-control-auditing': [
    'smart-contract-security-restrict-privileged-setter',
    'smart-contract-security-prevent-modifier-bypass',
    'smart-contract-security-test-ownership-handoff',
  ],

  'smart-contract-security:reentrancy': [
    'smart-contract-security-trace-reentrancy-flow',
    'smart-contract-security-patch-withdraw-ordering',
    'smart-contract-security-regression-against-callback',
  ],

  'smart-contract-security:external-calls': [
    'smart-contract-security-check-low-level-return',
    'smart-contract-security-handle-external-dependency-failure',
    'smart-contract-security-constrain-fallback-hooks',
  ],

  'smart-contract-security:arithmetic-precision': [
    'smart-contract-security-correct-share-rounding',
    'smart-contract-security-fixed-point-price-math',
    'smart-contract-security-overflow-boundary-tests',
  ],

  'smart-contract-security:signature-security': [
    'smart-contract-security-verify-signed-authorization',
    'smart-contract-security-nonce-gated-permit',
    'smart-contract-security-reject-cross-contract-replay',
  ],

  'smart-contract-security:oracle-security': [
    'smart-contract-security-detect-outdated-oracle-prices',
    'smart-contract-security-simulate-spot-manipulation',
    'smart-contract-security-circuit-breaker-price-guard',
  ],

  'smart-contract-security:security-tooling': [
    'smart-contract-security-review-analyzer-finding',
    'smart-contract-security-fuzz-accounting-invariant',
    'smart-contract-security-verify-reported-false-positive',
  ],

  'smart-contract-security:upgradeability': [
    'smart-contract-security-guard-proxy-upgrades',
    'smart-contract-security-maintain-storage-slots',
    'smart-contract-security-prevent-repeat-initialize',
  ],

  'smart-contract-security:audit-project': [
    'smart-contract-security-reproduce-sandbox-exploit',
    'smart-contract-security-verify-patched-contract',
    'smart-contract-security-write-auditable-evidence',
  ],


  // defi-tokenization
  'defi-tokenization:token-fundamentals': [
    'defi-tokenization-convert-token-units-exactly',
    'defi-tokenization-validate-initial-allocation',
    'defi-tokenization-model-token-transfers',
  ],

  'defi-tokenization:erc20': [
    'defi-tokenization-enforce-erc-20-transfer',
    'defi-tokenization-allowance-spend-tracking',
    'defi-tokenization-mint-burn-supply-invariant',
  ],

  'defi-tokenization:erc721': [
    'defi-tokenization-look-up-nft-owner',
    'defi-tokenization-safe-nft-recipient',
    'defi-tokenization-nft-delegated-operators',
  ],

  'defi-tokenization:erc1155': [
    'defi-tokenization-track-erc-1155-per-id-balances',
    'defi-tokenization-batch-token-operations',
    'defi-tokenization-authorize-collection-operators',
  ],

  'defi-tokenization:token-access-control': [
    'defi-tokenization-restrict-token-minters',
    'defi-tokenization-supply-cap-and-pause',
    'defi-tokenization-burn-and-recover-permissions',
  ],

  'defi-tokenization:vault-accounting': [
    'defi-tokenization-deposit-shares',
    'defi-tokenization-withdrawal-share-rounding',
    'defi-tokenization-vault-solvency-invariant',
  ],

  'defi-tokenization:amm-mechanics': [
    'defi-tokenization-constant-product-quote',
    'defi-tokenization-fee-accounted-reserves',
    'defi-tokenization-liquidity-invariant-checks',
  ],

  'defi-tokenization:staking-rewards': [
    'defi-tokenization-stake-and-unlock',
    'defi-tokenization-time-weighted-rewards',
    'defi-tokenization-block-duplicate-reward-claim',
  ],

  'defi-tokenization:lending-risk': [
    'defi-tokenization-compute-health-ratio',
    'defi-tokenization-borrowing-limit',
    'defi-tokenization-local-liquidation-rules',
  ],

  'defi-tokenization:defi-project': [
    'defi-tokenization-integrate-token-and-vault',
    'defi-tokenization-simulate-multiple-users',
    'defi-tokenization-adversarial-defi-regression',
  ],

};




/* =========================================================

   GET STACK MODULE PROBLEMS

\========================================================= */

export function getProblemsForStackModule(

  stackSlug: string,

  moduleSlug: string,

) {

  const key =

    `${stackSlug}:${moduleSlug}`;

  const problemSlugs =

    stackProblemMappings[

      key

    ] ?? [];

  return getProblemsBySlugs(

    problemSlugs,

  );

}
