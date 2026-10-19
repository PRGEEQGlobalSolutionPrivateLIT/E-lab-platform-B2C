import type { PracticeProblem } from './types';

export const aspnetcoreProblems: PracticeProblem[] = [
  {
    slug: 'aspnetcore-hello-api',
    title: 'Hello API',
    technologySlug: 'aspnetcore',
    difficulty: 'Easy',
    workspaceType: 'framework',
    shortDescription: 'Create a basic ASP.NET Core GET endpoint.',
    problemStatement: 'Create an ASP.NET Core endpoint that handles GET /hello and returns Hello, World! exactly.',
    outputFormat: 'GET /hello must return: Hello, World!',
    skills: [
      'ASP.NET Core',
      'Minimal APIs',
      'HTTP GET',
      'Routing',
    ],
    estimatedMinutes: 10,
    defaultLanguage: 'csharp',
    allowedLanguages: ['csharp'],
    starterCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Map GET /hello here

app.Run();
`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Hello Endpoint',
        input: 'GET /hello',
        expectedOutput: 'Hello, World!',
      },
    ],
  },

  {
    slug: 'aspnetcore-routing',
    title: 'Configure API Routing',
    technologySlug: 'aspnetcore',
    difficulty: 'Easy',
    workspaceType: 'framework',
    shortDescription: 'Create an ASP.NET Core route that returns a fixed response.',
    problemStatement: 'Configure a GET endpoint at /api/status that returns OK exactly.',
    outputFormat: 'GET /api/status must return: OK',
    skills: [
      'ASP.NET Core',
      'Routing',
      'MapGet',
    ],
    estimatedMinutes: 10,
    defaultLanguage: 'csharp',
    allowedLanguages: ['csharp'],
    starterCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Configure the /api/status route here

app.Run();
`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Status Route',
        input: 'GET /api/status',
        expectedOutput: 'OK',
      },
    ],
  },

  {
    slug: 'aspnetcore-route-parameter',
    title: 'Route Parameter',
    technologySlug: 'aspnetcore',
    difficulty: 'Easy',
    workspaceType: 'framework',
    shortDescription: 'Read a value from an ASP.NET Core route parameter.',
    problemStatement: 'Create a GET endpoint at /hello/{name}. Return Hello, <name>! using the name supplied in the URL.',
    inputFormat: 'The name is provided as a route parameter.',
    outputFormat: 'GET /hello/Asha must return: Hello, Asha!',
    skills: [
      'ASP.NET Core',
      'Route Parameters',
      'Routing',
    ],
    estimatedMinutes: 12,
    defaultLanguage: 'csharp',
    allowedLanguages: ['csharp'],
    starterCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Create GET /hello/{name}

app.Run();
`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Name Route Parameter',
        input: 'GET /hello/Asha',
        expectedOutput: 'Hello, Asha!',
      },
    ],
  },

  {
    slug: 'aspnetcore-query-parameter',
    title: 'Query Parameter',
    technologySlug: 'aspnetcore',
    difficulty: 'Easy',
    workspaceType: 'framework',
    shortDescription: 'Read a query-string value in an ASP.NET Core endpoint.',
    problemStatement: 'Create a GET endpoint at /greet that accepts a name query parameter and returns Welcome, <name>! exactly.',
    inputFormat: 'Pass name as a query parameter, for example /greet?name=Ravi.',
    outputFormat: 'GET /greet?name=Ravi must return: Welcome, Ravi!',
    skills: [
      'ASP.NET Core',
      'Query Parameters',
      'HTTP GET',
    ],
    estimatedMinutes: 12,
    defaultLanguage: 'csharp',
    allowedLanguages: ['csharp'],
    starterCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Create GET /greet with a name query parameter

app.Run();
`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Greeting Query',
        input: 'GET /greet?name=Ravi',
        expectedOutput: 'Welcome, Ravi!',
      },
    ],
  },

  {
    slug: 'aspnetcore-post-endpoint',
    title: 'Create a POST Endpoint',
    technologySlug: 'aspnetcore',
    difficulty: 'Easy',
    workspaceType: 'framework',
    shortDescription: 'Handle an HTTP POST request with ASP.NET Core.',
    problemStatement: 'Create a POST endpoint at /echo that accepts a text value in the request body and returns the same text.',
    inputFormat: 'POST plain text in the request body.',
    outputFormat: 'Return the submitted text exactly.',
    skills: [
      'ASP.NET Core',
      'HTTP POST',
      'Request Body',
    ],
    estimatedMinutes: 15,
    defaultLanguage: 'csharp',
    allowedLanguages: ['csharp'],
    starterCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Create POST /echo

app.Run();
`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Echo Text',
        input: 'Hello ASP.NET Core',
        expectedOutput: 'Hello ASP.NET Core',
      },
    ],
  },

  {
    slug: 'aspnetcore-model-binding',
    title: 'Model Binding',
    technologySlug: 'aspnetcore',
    difficulty: 'Medium',
    workspaceType: 'framework',
    shortDescription: 'Bind a JSON request body to a C# model.',
    problemStatement: 'Create a POST endpoint at /students that accepts a student containing name and score and returns the text Name: <name>, Score: <score>.',
    inputFormat: 'JSON body with name and score fields.',
    outputFormat: 'Return: Name: <name>, Score: <score>',
    skills: [
      'ASP.NET Core',
      'Model Binding',
      'JSON',
      'C# Models',
    ],
    estimatedMinutes: 20,
    defaultLanguage: 'csharp',
    allowedLanguages: ['csharp'],
    starterCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Create the student model and POST /students endpoint

app.Run();
`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Bind Student',
        input: '{"name":"Asha","score":90}',
        expectedOutput: 'Name: Asha, Score: 90',
      },
    ],
  },

  {
    slug: 'aspnetcore-service',
    title: 'Create a Service',
    technologySlug: 'aspnetcore',
    difficulty: 'Medium',
    workspaceType: 'framework',
    shortDescription: 'Create and use a service in an ASP.NET Core application.',
    problemStatement: 'Create a GreetingService with a method that returns Hello from Service! and expose it through GET /service.',
    outputFormat: 'GET /service must return: Hello from Service!',
    skills: [
      'ASP.NET Core',
      'Services',
      'Classes',
      'Application Architecture',
    ],
    estimatedMinutes: 20,
    defaultLanguage: 'csharp',
    allowedLanguages: ['csharp'],
    starterCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Create and use GreetingService

app.Run();
`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Service Response',
        input: 'GET /service',
        expectedOutput: 'Hello from Service!',
      },
    ],
  },

  {
    slug: 'aspnetcore-dependency-injection',
    title: 'Dependency Injection',
    technologySlug: 'aspnetcore',
    difficulty: 'Medium',
    workspaceType: 'framework',
    shortDescription: 'Register and inject a service using ASP.NET Core dependency injection.',
    problemStatement: 'Register a GreetingService with the ASP.NET Core dependency injection container and use it in GET /di to return Dependency Injection Works! exactly.',
    outputFormat: 'GET /di must return: Dependency Injection Works!',
    skills: [
      'ASP.NET Core',
      'Dependency Injection',
      'Services',
      'Service Registration',
    ],
    estimatedMinutes: 25,
    defaultLanguage: 'csharp',
    allowedLanguages: ['csharp'],
    starterCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Register GreetingService and create GET /di

app.Run();
`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Injected Service',
        input: 'GET /di',
        expectedOutput: 'Dependency Injection Works!',
      },
    ],
  },

  {
    slug: 'aspnetcore-validation',
    title: 'Validate Request Data',
    technologySlug: 'aspnetcore',
    difficulty: 'Medium',
    workspaceType: 'framework',
    shortDescription: 'Validate request data in an ASP.NET Core endpoint.',
    problemStatement: 'Create POST /validate-age. If age is 18 or greater return Valid; otherwise return Invalid.',
    inputFormat: 'JSON body containing an integer age field.',
    outputFormat: 'Return Valid when age >= 18; otherwise return Invalid.',
    skills: [
      'ASP.NET Core',
      'Validation',
      'Model Binding',
      'Conditionals',
    ],
    estimatedMinutes: 20,
    defaultLanguage: 'csharp',
    allowedLanguages: ['csharp'],
    starterCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Create POST /validate-age

app.Run();
`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Valid Age',
        input: '{"age":21}',
        expectedOutput: 'Valid',
      },
      {
        id: 'sample-2',
        title: 'Invalid Age',
        input: '{"age":16}',
        expectedOutput: 'Invalid',
      },
    ],
  },

  {
    slug: 'aspnetcore-crud-api',
    title: 'Build a CRUD API',
    technologySlug: 'aspnetcore',
    difficulty: 'Hard',
    workspaceType: 'framework',
    shortDescription: 'Build basic CRUD endpoints for products.',
    problemStatement: 'Create an in-memory product API with endpoints to create, read, update, and delete products.',
    inputFormat: 'Use JSON request bodies for create and update operations.',
    outputFormat: 'Return appropriate product data or status responses for each CRUD operation.',
    skills: [
      'ASP.NET Core',
      'CRUD',
      'REST API',
      'Collections',
      'HTTP Methods',
    ],
    estimatedMinutes: 35,
    defaultLanguage: 'csharp',
    allowedLanguages: ['csharp'],
    starterCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Implement POST, GET, PUT and DELETE product endpoints

app.Run();
`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Create Product',
        input: 'POST /products',
        expectedOutput: '201',
      },
    ],
  },

  {
    slug: 'aspnetcore-middleware',
    title: 'Custom Middleware',
    technologySlug: 'aspnetcore',
    difficulty: 'Hard',
    workspaceType: 'framework',
    shortDescription: 'Create custom middleware in an ASP.NET Core application.',
    problemStatement: 'Create middleware that adds the response header X-Elab-Middleware with the value Active. GET /check must return Middleware Works! exactly.',
    outputFormat: 'GET /check must return Middleware Works! and include X-Elab-Middleware: Active.',
    skills: [
      'ASP.NET Core',
      'Middleware',
      'HTTP Headers',
      'Request Pipeline',
    ],
    estimatedMinutes: 30,
    defaultLanguage: 'csharp',
    allowedLanguages: ['csharp'],
    starterCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Add custom middleware here

app.MapGet("/check", () => "Middleware Works!");

app.Run();
`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Middleware Endpoint',
        input: 'GET /check',
        expectedOutput: 'Middleware Works!',
      },
    ],
  },

  {
    slug: 'aspnetcore-product-api',
    title: 'Product API',
    technologySlug: 'aspnetcore',
    difficulty: 'Hard',
    workspaceType: 'framework',
    shortDescription: 'Build an application-style ASP.NET Core product API.',
    problemStatement: 'Create an ASP.NET Core product API. GET /products/{id} must return the matching product, and GET /products must return all products.',
    outputFormat: 'Return product data as JSON.',
    skills: [
      'ASP.NET Core',
      'REST API',
      'JSON',
      'Routing',
      'Collections',
    ],
    estimatedMinutes: 35,
    defaultLanguage: 'csharp',
    allowedLanguages: ['csharp'],
    starterCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Define products and implement GET /products and GET /products/{id}

app.Run();
`,
    sampleTests: [
      {
        id: 'sample-1',
        title: 'Get Products',
        input: 'GET /products',
        expectedOutput: '200',
      },
    ],
  },

];

export default aspnetcoreProblems;
