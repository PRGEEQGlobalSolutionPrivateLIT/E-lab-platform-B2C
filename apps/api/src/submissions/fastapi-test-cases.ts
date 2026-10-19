/* =========================================================
   FASTAPI HIDDEN TEST CASES

   Used only for SUBMIT.

   Path:
   apps/api/src/framework-submissions/fastapi-test-cases.ts

   These tests stay on the API/Judge side.
   They must NOT be exposed to the learner frontend.

   FastAPI framework submissions are validated through
   HTTP requests against the running FastAPI application.
========================================================= */

/* =========================================================
   TYPES
========================================================= */

export type FastApiHttpTestCase = {
  type: 'http';

  method:
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'PATCH'
    | 'DELETE';

  path: string;

  expectedStatus: number;

  expectedJson?: unknown;

  body?: unknown;

  name?: string;
};

export type FastApiHiddenTestCase =
  FastApiHttpTestCase;

/* =========================================================
   GET FASTAPI HIDDEN TEST CASES
========================================================= */

export function getFastApiTestCases(
  problemSlug: string,
): FastApiHiddenTestCase[] {
  const slug =
    String(
      problemSlug ??
        '',
    )
      .trim()
      .toLowerCase();

  /* =======================================================
     PROBLEM 1
     HELLO WORLD API
  ======================================================= */

  if (
    slug ===
    'fastapi-hello-world'
  ) {
    return [
      {
        type:
          'http',

        name:
          'Root endpoint response',

        method:
          'GET',

        path:
          '/',

        expectedStatus:
          200,

        expectedJson: {
          message:
            'Hello, World!',
        },
      },
    ];
  }

  /* =======================================================
     PROBLEM 2
     JSON RESPONSE
  ======================================================= */

  if (
    slug ===
    'fastapi-json-response'
  ) {
    return [
      {
        type:
          'http',

        name:
          'JSON response',

        method:
          'GET',

        path:
          '/',

        expectedStatus:
          200,
      },
    ];
  }

  /* =======================================================
     PROBLEM 3
     PATH PARAMETER
  ======================================================= */

  if (
    slug ===
    'fastapi-path-parameter'
  ) {
    return [
      {
        type:
          'http',

        name:
          'Path parameter request',

        method:
          'GET',

        path:
          '/users/42',

        expectedStatus:
          200,
      },
    ];
  }

  /* =======================================================
     PROBLEM 4
     QUERY PARAMETER
  ======================================================= */

  if (
    slug ===
    'fastapi-query-parameter'
  ) {
    return [
      {
        type:
          'http',

        name:
          'Query parameter request',

        method:
          'GET',

        path:
          '/search?q=fastapi',

        expectedStatus:
          200,
      },
    ];
  }

  /* =======================================================
     PROBLEM 5
     POST REQUEST
  ======================================================= */

  if (
    slug ===
    'fastapi-post-request'
  ) {
    return [
      {
        type:
          'http',

        name:
          'Create resource',

        method:
          'POST',

        path:
          '/items',

        expectedStatus:
          200,

        body: {
          name:
            'Laptop',

          price:
            1000,
        },
      },
    ];
  }

  /* =======================================================
     PROBLEM 6
     PYDANTIC VALIDATION
  ======================================================= */

  if (
    slug ===
    'fastapi-pydantic-validation'
  ) {
    return [
      {
        type:
          'http',

        name:
          'Pydantic validation',

        method:
          'POST',

        path:
          '/items',

        expectedStatus:
          200,

        body: {
          name:
            'Laptop',

          price:
            1000,
        },
      },
    ];
  }

  /* =======================================================
     PROBLEM 7
     UPDATE USER
  ======================================================= */

  if (
    slug ===
    'fastapi-update-user'
  ) {
    return [
      {
        type:
          'http',

        name:
          'Update user',

        method:
          'PUT',

        path:
          '/users/1',

        expectedStatus:
          200,

        body: {
          name:
            'Updated User',
        },
      },
    ];
  }

  /* =======================================================
     PROBLEM 8
     DELETE USER
  ======================================================= */

  if (
    slug ===
    'fastapi-delete-user'
  ) {
    return [
      {
        type:
          'http',

        name:
          'Delete user',

        method:
          'DELETE',

        path:
          '/users/1',

        expectedStatus:
          200,
      },
    ];
  }

  /* =======================================================
     PROBLEM 9
     TASK CRUD
  ======================================================= */

  if (
    slug ===
    'fastapi-task-crud'
  ) {
    return [
      {
        type:
          'http',

        name:
          'List tasks',

        method:
          'GET',

        path:
          '/tasks',

        expectedStatus:
          200,
      },

      {
        type:
          'http',

        name:
          'Create task',

        method:
          'POST',

        path:
          '/tasks',

        expectedStatus:
          200,

        body: {
          title:
            'Learn FastAPI',
        },
      },
    ];
  }

  /* =======================================================
     PROBLEM 10
     INVENTORY API
  ======================================================= */

  if (
    slug ===
    'fastapi-inventory-api'
  ) {
    return [
      {
        type:
          'http',

        name:
          'List inventory',

        method:
          'GET',

        path:
          '/items',

        expectedStatus:
          200,
      },

      {
        type:
          'http',

        name:
          'Create inventory item',

        method:
          'POST',

        path:
          '/items',

        expectedStatus:
          200,

        body: {
          name:
            'Keyboard',

          quantity:
            10,
        },
      },
    ];
  }

  /* =======================================================
     UNKNOWN FASTAPI PROBLEM
  ======================================================= */

  return [];
}

export default getFastApiTestCases;