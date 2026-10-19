export type ExpressHttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE';

export type ExpressTestCase = {
  method: ExpressHttpMethod;

  path: string;

  body?: unknown;

  expectedStatus: number;

  expectedBody?: unknown;
};

/* =========================================================
   EXPRESS HIDDEN TEST CASES
========================================================= */

const expressTestCases:
  Record<
    string,
    ExpressTestCase[]
  > = {
  /* =======================================================
     CREATE HELLO ROUTE
  ======================================================= */

  'express-hello-route': [
    {
      method:
        'GET',

      path:
        '/hello',

      expectedStatus:
        200,

      expectedBody: {
        message:
          'Hello Express',
      },
    },
  ],
};

/* =========================================================
   GET EXPRESS TEST CASES
========================================================= */

export function getExpressTestCases(
  problemSlug: string,
): ExpressTestCase[] {
  return (
    expressTestCases[
      problemSlug
    ] ?? []
  );
}