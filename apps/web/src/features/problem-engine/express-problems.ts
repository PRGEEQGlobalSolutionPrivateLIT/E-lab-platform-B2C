import type {
  PracticeProblem,
} from './types';

/* =========================================================
   EXPRESS.JS PROBLEMS
========================================================= */

export const expressProblems:
  PracticeProblem[] = [
  {
    slug:
      'express-hello-route',

    title:
      'Create Hello Route',

    technologySlug:
      'expressjs',

    difficulty:
      'Easy',

    workspaceType:
      'framework',

    shortDescription:
      'Create your first Express.js GET endpoint.',

    problemStatement:
      `Create a GET endpoint at /hello.

The endpoint must return the following JSON response:

{
  "message": "Hello Express"
}`,

    skills: [
      'Express.js',
      'Routing',
      'HTTP GET',
      'JSON Response',
    ],

    estimatedMinutes:
      10,

    defaultLanguage:
      'javascript',

    allowedLanguages: [
      'javascript',
    ],

    starterFiles: [
      {
        path:
          'server.js',

        language:
          'javascript',

        content:
`const express = require('express');

const app = express();

app.use(express.json());

// Create GET /hello here

module.exports = app;
`,
      },
    ],
  },
];