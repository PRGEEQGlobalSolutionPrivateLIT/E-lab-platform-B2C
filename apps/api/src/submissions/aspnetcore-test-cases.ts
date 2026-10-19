export type AspNetCoreHiddenTestCase = {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  expectedStatus: number;
  expectedOutput?: string;
  body?: string;
  headers?: Record<string, string>;
  requiredFiles?: string[];
};

const PROGRAM_CS = ['Program.cs'];

const ASPNETCORE_TEST_CASES:
  Record<string, AspNetCoreHiddenTestCase[]> = {
    'aspnetcore-hello-api': [
      {
        id: 'hidden-1',
        method: 'GET',
        path: '/hello',
        expectedStatus: 200,
        expectedOutput: 'Hello, World!',
        requiredFiles: PROGRAM_CS,
      },
    ],

    'aspnetcore-routing': [
      {
        id: 'hidden-1',
        method: 'GET',
        path: '/api/status',
        expectedStatus: 200,
        expectedOutput: 'OK',
        requiredFiles: PROGRAM_CS,
      },
    ],

    'aspnetcore-route-parameter': [
      {
        id: 'hidden-1',
        method: 'GET',
        path: '/hello/Meera',
        expectedStatus: 200,
        expectedOutput: 'Hello, Meera!',
        requiredFiles: PROGRAM_CS,
      },
      {
        id: 'hidden-2',
        method: 'GET',
        path: '/hello/Arun',
        expectedStatus: 200,
        expectedOutput: 'Hello, Arun!',
        requiredFiles: PROGRAM_CS,
      },
    ],

    'aspnetcore-query-parameter': [
      {
        id: 'hidden-1',
        method: 'GET',
        path: '/greet?name=Meera',
        expectedStatus: 200,
        expectedOutput: 'Welcome, Meera!',
        requiredFiles: PROGRAM_CS,
      },
    ],

    'aspnetcore-post-endpoint': [
      {
        id: 'hidden-1',
        method: 'POST',
        path: '/echo',
        expectedStatus: 200,
        expectedOutput: 'ASP.NET Core',
        body: 'ASP.NET Core',
        headers: {
          'Content-Type': 'text/plain',
        },
        requiredFiles: PROGRAM_CS,
      },
    ],

    'aspnetcore-model-binding': [
      {
        id: 'hidden-1',
        method: 'POST',
        path: '/students',
        expectedStatus: 200,
        expectedOutput: 'Name: Meera, Score: 95',
        body: '{"name":"Meera","score":95}',
        headers: {
          'Content-Type': 'application/json',
        },
        requiredFiles: PROGRAM_CS,
      },
    ],

    'aspnetcore-service': [
      {
        id: 'hidden-1',
        method: 'GET',
        path: '/service',
        expectedStatus: 200,
        expectedOutput: 'Hello from Service!',
        requiredFiles: PROGRAM_CS,
      },
    ],

    'aspnetcore-dependency-injection': [
      {
        id: 'hidden-1',
        method: 'GET',
        path: '/di',
        expectedStatus: 200,
        expectedOutput: 'Dependency Injection Works!',
        requiredFiles: PROGRAM_CS,
      },
    ],

    'aspnetcore-validation': [
      {
        id: 'hidden-1',
        method: 'POST',
        path: '/validate-age',
        expectedStatus: 200,
        expectedOutput: 'Valid',
        body: '{"age":25}',
        headers: {
          'Content-Type': 'application/json',
        },
        requiredFiles: PROGRAM_CS,
      },
      {
        id: 'hidden-2',
        method: 'POST',
        path: '/validate-age',
        expectedStatus: 200,
        expectedOutput: 'Invalid',
        body: '{"age":15}',
        headers: {
          'Content-Type': 'application/json',
        },
        requiredFiles: PROGRAM_CS,
      },
    ],

    'aspnetcore-crud-api': [
      {
        id: 'hidden-1',
        method: 'GET',
        path: '/products',
        expectedStatus: 200,
        requiredFiles: PROGRAM_CS,
      },
    ],

    'aspnetcore-middleware': [
      {
        id: 'hidden-1',
        method: 'GET',
        path: '/check',
        expectedStatus: 200,
        expectedOutput: 'Middleware Works!',
        requiredFiles: PROGRAM_CS,
      },
    ],

    'aspnetcore-product-api': [
      {
        id: 'hidden-1',
        method: 'GET',
        path: '/products',
        expectedStatus: 200,
        requiredFiles: PROGRAM_CS,
      },
    ],
  };

export function getAspNetCoreTestCases(
  problemSlug: string,
): AspNetCoreHiddenTestCase[] {
  return (
    ASPNETCORE_TEST_CASES[
      problemSlug
    ] ??
    []
  );
}
