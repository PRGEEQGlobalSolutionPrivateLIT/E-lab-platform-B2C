export type SpringBootHiddenTestCase = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  body?: string;
  expectedStatus?: number;
  expectedOutput?: string;
};

export const SPRINGBOOT_TEST_CASES: Record<
  string,
  SpringBootHiddenTestCase[]
> = {
  'springboot-hello-controller': [
    {
      method: 'GET',
      path: '/hello',
      expectedStatus: 200,
      expectedOutput: 'Hello, World!',
    },
  ],

  'springboot-get-endpoint': [
    {
      method: 'GET',
      path: '/api/status',
      expectedStatus: 200,
      expectedOutput: 'API is running',
    },
  ],

  'springboot-path-variable': [
    {
      method: 'GET',
      path: '/users/Asha',
      expectedStatus: 200,
      expectedOutput: 'Hello, Asha',
    },
    {
      method: 'GET',
      path: '/users/Ravi',
      expectedStatus: 200,
      expectedOutput: 'Hello, Ravi',
    },
    {
      method: 'GET',
      path: '/users/Meera',
      expectedStatus: 200,
      expectedOutput: 'Hello, Meera',
    },
  ],

  'springboot-query-parameter': [
    {
      method: 'GET',
      path: '/search?keyword=Java',
      expectedStatus: 200,
      expectedOutput: 'Searching for: Java',
    },
    {
      method: 'GET',
      path: '/search?keyword=Spring',
      expectedStatus: 200,
      expectedOutput: 'Searching for: Spring',
    },
    {
      method: 'GET',
      path: '/search?keyword=API',
      expectedStatus: 200,
      expectedOutput: 'Searching for: API',
    },
  ],

  'springboot-post-endpoint': [
    {
      method: 'POST',
      path: '/api/message',
      body: 'Hello',
      expectedStatus: 200,
      expectedOutput: 'Received: Hello',
    },
    {
      method: 'POST',
      path: '/api/message',
      body: 'Spring Boot',
      expectedStatus: 200,
      expectedOutput: 'Received: Spring Boot',
    },
    {
      method: 'POST',
      path: '/api/message',
      body: 'E-Lab',
      expectedStatus: 200,
      expectedOutput: 'Received: E-Lab',
    },
  ],

  'springboot-service-layer': [
    {
      method: 'GET',
      path: '/greeting',
      expectedStatus: 200,
      expectedOutput: 'Welcome to Spring Boot',
    },
  ],

  'springboot-dependency-injection': [
    {
      method: 'GET',
      path: '/course',
      expectedStatus: 200,
      expectedOutput: 'Java Full Stack',
    },
  ],

  /*
   * DTO, validation, exception handling and larger API
   * exercises will be evaluated by the Spring Boot
   * framework runner after the application is compiled
   * and started.
   */

  'springboot-create-dto': [],

  'springboot-validation': [],

  'springboot-exception-handler': [],

  'springboot-course-api': [],

  'springboot-student-management-api': [],
};

export function getSpringBootTestCases(
  problemSlug: string,
): SpringBootHiddenTestCase[] {
  return SPRINGBOOT_TEST_CASES[problemSlug] ?? [];
}