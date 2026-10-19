import {

  getProblemsBySlugs,

} from './problems';



/* =========================================================

   STACK MODULE → PROBLEM MAPPING

========================================================= */



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



  'mern:mongodb': [],



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



  'mean:mongodb': [],



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



  'django:django': [],



  /* =======================================================

     DJANGO - POSTGRESQL

  ======================================================= */



  'django:postgresql': [],



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



  'next-nest:postgresql': [],



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
     PYTHON + APACHE SPARK DATA ENGINEERING
     Stack: python-spark
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

};



/* =========================================================

   GET STACK MODULE PROBLEMS

========================================================= */



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