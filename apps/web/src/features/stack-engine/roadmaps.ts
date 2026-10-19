import type {

  StackRoadmap,

} from './types';



/* =========================================================

   STACK ROADMAPS

========================================================= */



export const stackRoadmaps: StackRoadmap[] = [

  /* =======================================================

     MERN STACK

     HTML → CSS → JavaScript → React → Node → Express

     → MongoDB → API → Security → Integration

     → Testing → Deployment → Projects

  ======================================================= */



  {

    stackSlug: 'mern',



    modules: [

      {

        slug: 'html',



        name: 'HTML Foundations',



        phase: 'Foundation',



        description:

          'Learn how to structure modern web pages using semantic HTML.',



        technologySlug: 'html-css',



        topics: [

          'HTML document structure',

          'Headings and paragraphs',

          'Links and navigation',

          'Images and media',

          'Lists',

          'Tables',

          'Forms',

          'Semantic HTML',

          'Accessibility basics',

        ],

      },



      {

        slug: 'css',



        name: 'CSS & Responsive Design',



        phase: 'Foundation',



        description:

          'Learn modern CSS and build responsive user interfaces.',



        technologySlug: 'html-css',



        topics: [

          'CSS selectors',

          'Colors and typography',

          'Box model',

          'Display properties',

          'Positioning',

          'Flexbox',

          'CSS Grid',

          'Responsive design',

          'Media queries',

          'Transitions and animations',

        ],

      },



      {

        slug: 'javascript',



        name: 'JavaScript',



        phase: 'Programming',



        description:

          'Master JavaScript fundamentals and modern asynchronous programming.',



        technologySlug: 'javascript',



        topics: [

          'Variables',

          'Data types',

          'Operators',

          'Conditions',

          'Loops',

          'Functions',

          'Arrays',

          'Objects',

          'Strings',

          'DOM',

          'Events',

          'ES6+ features',

          'Promises',

          'Async and Await',

          'Fetch API',

          'Error handling',

        ],

      },



      {

        slug: 'react',



        name: 'React',



        phase: 'Frontend',



        description:

          'Build modern component-based frontend applications using React.',



        technologySlug: 'react',



        topics: [

          'React fundamentals',

          'Components',

          'JSX',

          'Props',

          'State',

          'Events',

          'Conditional rendering',

          'Lists and keys',

          'Forms',

          'useState',

          'useEffect',

          'useContext',

          'Custom hooks',

          'React Router',

          'API integration',

          'Protected routes',

          'Reusable components',

        ],

      },



      {

        slug: 'nodejs',



        name: 'Node.js',



        phase: 'Backend',



        description:

          'Learn server-side JavaScript and backend application fundamentals.',



        technologySlug: 'nodejs',



        topics: [

          'Node.js runtime',

          'Node modules',

          'npm',

          'File system',

          'HTTP module',

          'Events',

          'Environment variables',

          'Asynchronous programming',

          'Error handling',

          'Project structure',

        ],

      },



      {

        slug: 'express',



        name: 'Express.js',



        phase: 'Backend',



        description:

          'Build backend services and REST APIs using Express.js.',



        technologySlug: 'expressjs',



        topics: [

          'Express setup',

          'Routing',

          'Controllers',

          'Middleware',

          'Request and response',

          'Validation',

          'Error middleware',

          'REST API structure',

          'Pagination',

          'Filtering',

          'File uploads',

        ],

      },



      {

        slug: 'mongodb',



        name: 'MongoDB',



        phase: 'Database',



        description:

          'Store and manage application data using MongoDB and Mongoose.',



        technologySlug: 'mongodb',



        topics: [

          'MongoDB fundamentals',

          'Documents',

          'Collections',

          'CRUD operations',

          'Queries',

          'Filtering',

          'Indexes',

          'Aggregation',

          'Relationships',

          'MongoDB Atlas',

          'Mongoose schemas',

          'Mongoose models',

          'Validation',

          'Populate',

        ],

      },



      {

        slug: 'rest-api',



        name: 'REST API Development',



        phase: 'Backend Integration',



        description:

          'Design structured production-style REST APIs for MERN applications.',



        topics: [

          'REST architecture',

          'HTTP methods',

          'Status codes',

          'Controllers',

          'Services',

          'CRUD APIs',

          'Validation',

          'Pagination',

          'Searching',

          'Filtering',

          'Sorting',

          'Error responses',

          'API documentation basics',

        ],

      },



      {

        slug: 'authentication',



        name: 'Authentication & Security',



        phase: 'Security',



        description:

          'Secure MERN applications using authentication and authorization patterns.',



        topics: [

          'Password hashing',

          'bcrypt',

          'JWT',

          'Access tokens',

          'Refresh tokens',

          'Registration',

          'Login',

          'Logout',

          'Authorization',

          'Role-based access',

          'Protected routes',

          'CORS',

          'Helmet',

          'Rate limiting',

          'Input validation',

        ],

      },



      {

        slug: 'integration',



        name: 'MERN Integration',



        phase: 'Integration',



        description:

          'Connect React, Node.js, Express.js and MongoDB into one complete application.',



        topics: [

          'Frontend to backend communication',

          'Fetch and Axios',

          'API service layer',

          'React registration flow',

          'React login flow',

          'JWT handling',

          'Protected routes',

          'CRUD integration',

          'Loading states',

          'Error states',

          'Environment configuration',

        ],

      },



      {

        slug: 'testing',



        name: 'Testing',



        phase: 'Quality',



        description:

          'Test frontend components, backend APIs and complete application flows.',



        topics: [

          'Testing fundamentals',

          'Unit testing',

          'Jest',

          'React component testing',

          'API testing',

          'Supertest',

          'Integration testing',

          'Postman testing',

        ],

      },



      {

        slug: 'git',



        name: 'Git & Collaboration',



        phase: 'Engineering Practice',



        description:

          'Use Git effectively for professional development and collaboration.',



        technologySlug: 'git',



        topics: [

          'Git initialization',

          'Staging',

          'Commits',

          'Branches',

          'Merge',

          'Pull',

          'Push',

          'Remote repositories',

          'Pull requests',

          'Conflict resolution',

        ],

      },



      {

        slug: 'deployment',



        name: 'Docker & Deployment',



        phase: 'Deployment',



        description:

          'Package and deploy production-ready MERN applications.',



        topics: [

          'Production builds',

          'Environment variables',

          'Docker fundamentals',

          'Dockerfile',

          'Docker Compose',

          'MongoDB Atlas',

          'Frontend deployment',

          'Backend deployment',

          'Reverse proxy basics',

          'CI/CD basics',

        ],

      },



      {

        slug: 'projects',



        name: 'Capstone Projects',



        phase: 'Projects',



        description:

          'Apply the complete MERN stack by building real-world applications.',



        topics: [

          'Task Management Application',

          'Student Management System',

          'Blog Platform',

          'E-commerce Platform',

          'Learning Management System',

          'Job Portal',

          'Real-Time Collaboration Application',

        ],

      },

    ],

  },



  /* =======================================================

     MEAN STACK

     HTML → CSS → JavaScript → TypeScript → Angular

     → Node → Express → MongoDB → Security → Integration

  ======================================================= */



  {

    stackSlug: 'mean',



    modules: [

      {

        slug: 'html',



        name: 'HTML Foundations',



        phase: 'Foundation',



        description:

          'Learn modern semantic HTML and web page structure.',



        technologySlug: 'html-css',



        topics: [

          'HTML document structure',

          'Headings and paragraphs',

          'Links',

          'Images',

          'Lists',

          'Tables',

          'Forms',

          'Semantic HTML',

          'Accessibility basics',

        ],

      },



      {

        slug: 'css',



        name: 'CSS & Responsive Design',



        phase: 'Foundation',



        description:

          'Build responsive application interfaces using modern CSS.',



        technologySlug: 'html-css',



        topics: [

          'CSS selectors',

          'Box model',

          'Typography',

          'Positioning',

          'Flexbox',

          'CSS Grid',

          'Responsive design',

          'Media queries',

        ],

      },



      {

        slug: 'javascript',



        name: 'JavaScript',



        phase: 'Programming',



        description:

          'Learn JavaScript fundamentals required for Angular and Node.js.',



        technologySlug: 'javascript',



        topics: [

          'Variables',

          'Data types',

          'Conditions',

          'Loops',

          'Functions',

          'Arrays',

          'Objects',

          'DOM',

          'Events',

          'Promises',

          'Async and Await',

        ],

      },



      {

        slug: 'typescript',



        name: 'TypeScript',



        phase: 'Programming',



        description:

          'Learn strongly typed JavaScript before beginning Angular development.',



        technologySlug: 'typescript',



        topics: [

          'TypeScript setup',

          'Primitive types',

          'Arrays',

          'Objects',

          'Functions',

          'Interfaces',

          'Type aliases',

          'Classes',

          'Access modifiers',

          'Generics',

          'Modules',

        ],

      },



      {

        slug: 'angular',



        name: 'Angular',



        phase: 'Frontend',



        description:

          'Build enterprise frontend applications using Angular.',



        technologySlug: 'angular',



        topics: [

          'Angular architecture',

          'Components',

          'Templates',

          'Data binding',

          'Directives',

          'Pipes',

          'Services',

          'Dependency injection',

          'Forms',

          'Reactive forms',

          'Routing',

          'Route guards',

          'HTTP Client',

          'RxJS',

          'API integration',

        ],

      },



      {

        slug: 'nodejs',



        name: 'Node.js',



        phase: 'Backend',



        description:

          'Build server-side JavaScript applications using Node.js.',



        technologySlug: 'nodejs',



        topics: [

          'Node runtime',

          'Modules',

          'npm',

          'File system',

          'HTTP',

          'Events',

          'Environment variables',

          'Async programming',

        ],

      },



      {

        slug: 'express',



        name: 'Express.js',



        phase: 'Backend',



        description:

          'Build backend services and APIs with Express.js.',



        technologySlug: 'expressjs',



        topics: [

          'Express setup',

          'Routing',

          'Controllers',

          'Middleware',

          'Validation',

          'Error handling',

          'REST APIs',

          'Pagination',

          'Filtering',

        ],

      },



      {

        slug: 'mongodb',



        name: 'MongoDB',



        phase: 'Database',



        description:

          'Build document-oriented data models for MEAN applications.',



        technologySlug: 'mongodb',



        topics: [

          'Documents',

          'Collections',

          'CRUD',

          'Queries',

          'Indexes',

          'Aggregation',

          'Mongoose schemas',

          'Models',

          'Validation',

        ],

      },



      {

        slug: 'rest-api',



        name: 'REST API Development',



        phase: 'Backend Integration',



        description:

          'Design APIs that connect Angular with the backend services.',



        topics: [

          'REST principles',

          'HTTP methods',

          'Controllers',

          'Services',

          'CRUD',

          'Validation',

          'Pagination',

          'Filtering',

          'Error handling',

        ],

      },



      {

        slug: 'authentication',



        name: 'Authentication & Security',



        phase: 'Security',



        description:

          'Secure MEAN applications using authentication and authorization.',



        topics: [

          'Password hashing',

          'JWT',

          'Access tokens',

          'Refresh tokens',

          'Angular route guards',

          'Authorization',

          'Role-based access',

          'CORS',

          'Input validation',

        ],

      },



      {

        slug: 'integration',



        name: 'MEAN Integration',



        phase: 'Integration',



        description:

          'Connect Angular with Node.js, Express.js and MongoDB.',



        topics: [

          'Angular HTTP services',

          'REST integration',

          'Registration flow',

          'Login flow',

          'JWT handling',

          'CRUD integration',

          'Loading states',

          'Error handling',

        ],

      },



      {

        slug: 'testing',



        name: 'Testing',



        phase: 'Quality',



        description:

          'Test Angular frontend and Node backend functionality.',



        topics: [

          'Unit testing',

          'Angular component testing',

          'Service testing',

          'API testing',

          'Integration testing',

        ],

      },



      {

        slug: 'git',



        name: 'Git & Collaboration',



        phase: 'Engineering Practice',



        description:

          'Use Git for professional application development.',



        technologySlug: 'git',



        topics: [

          'Repository setup',

          'Commits',

          'Branches',

          'Merge',

          'Remote repositories',

          'Pull requests',

          'Conflict resolution',

        ],

      },



      {

        slug: 'deployment',



        name: 'Docker & Deployment',



        phase: 'Deployment',



        description:

          'Package and deploy complete MEAN applications.',



        topics: [

          'Production build',

          'Environment variables',

          'Docker',

          'Dockerfile',

          'Docker Compose',

          'MongoDB Atlas',

          'Frontend deployment',

          'Backend deployment',

          'CI/CD basics',

        ],

      },



      {

        slug: 'projects',



        name: 'Capstone Projects',



        phase: 'Projects',



        description:

          'Build complete real-world MEAN applications.',



        topics: [

          'Task Management System',

          'Admin Dashboard',

          'Employee Management System',

          'E-commerce Application',

          'Learning Platform',

        ],

      },

    ],

  },



  /* =======================================================

     DJANGO FULL STACK

  ======================================================= */



  {

    stackSlug: 'django',



    modules: [

      {

        slug: 'html',



        name: 'HTML Foundations',



        phase: 'Foundation',



        description:

          'Learn semantic HTML and modern web page structure.',



        technologySlug: 'html-css',



        topics: [

          'HTML structure',

          'Headings',

          'Links',

          'Forms',

          'Tables',

          'Semantic HTML',

        ],

      },



      {

        slug: 'css',



        name: 'CSS & Responsive Design',



        phase: 'Foundation',



        description:

          'Create responsive web interfaces using CSS.',



        technologySlug: 'html-css',



        topics: [

          'CSS selectors',

          'Box model',

          'Flexbox',

          'Grid',

          'Responsive design',

          'Media queries',

        ],

      },



      {

        slug: 'javascript',



        name: 'JavaScript',



        phase: 'Frontend',



        description:

          'Add dynamic browser-side functionality to Django applications.',



        technologySlug: 'javascript',



        topics: [

          'JavaScript basics',

          'Functions',

          'Arrays',

          'Objects',

          'DOM',

          'Events',

          'Fetch API',

        ],

      },



      {

        slug: 'python',



        name: 'Python',



        phase: 'Programming',



        description:

          'Learn Python programming for backend web development.',



        technologySlug: 'python',



        topics: [

          'Python syntax',

          'Variables',

          'Conditions',

          'Loops',

          'Functions',

          'Lists',

          'Dictionaries',

          'Classes',

          'OOP',

          'Modules',

          'Exceptions',

        ],

      },



      {

        slug: 'django',



        name: 'Django',



        phase: 'Backend',



        description:

          'Build complete backend web applications using Django.',



        technologySlug: 'django',



        topics: [

          'Django installation',

          'Projects',

          'Apps',

          'URL routing',

          'Views',

          'Templates',

          'Models',

          'Django ORM',

          'Forms',

          'Admin panel',

          'Static files',

          'Authentication',

        ],

      },



      {

        slug: 'postgresql',



        name: 'PostgreSQL',



        phase: 'Database',



        description:

          'Design and manage relational data for Django applications.',



        technologySlug: 'postgresql',



        topics: [

          'Database fundamentals',

          'Tables',

          'CRUD',

          'Joins',

          'Relationships',

          'Indexes',

          'Constraints',

          'Django PostgreSQL configuration',

        ],

      },



      {

        slug: 'rest-api',



        name: 'REST API Development',



        phase: 'Backend Integration',



        description:

          'Create APIs for modern Django applications.',



        topics: [

          'REST fundamentals',

          'Django REST concepts',

          'Serializers',

          'Views',

          'CRUD APIs',

          'Validation',

          'Pagination',

          'Authentication',

        ],

      },



      {

        slug: 'authentication',



        name: 'Authentication & Security',



        phase: 'Security',



        description:

          'Secure Django applications and APIs.',



        topics: [

          'Django authentication',

          'User registration',

          'Login',

          'Permissions',

          'Sessions',

          'Tokens',

          'Authorization',

          'Security settings',

        ],

      },



      {

        slug: 'integration',



        name: 'Frontend & Django Integration',



        phase: 'Integration',



        description:

          'Connect frontend interfaces with Django backend functionality.',



        topics: [

          'Templates and views',

          'Form submission',

          'API communication',

          'Authentication flow',

          'CRUD integration',

          'Error handling',

        ],

      },



      {

        slug: 'testing',



        name: 'Testing',



        phase: 'Quality',



        description:

          'Test Django applications and APIs.',



        topics: [

          'Django test framework',

          'Unit tests',

          'Model tests',

          'View tests',

          'API tests',

          'Integration testing',

        ],

      },



      {

        slug: 'git',



        name: 'Git & Collaboration',



        phase: 'Engineering Practice',



        description:

          'Manage Django projects professionally with Git.',



        technologySlug: 'git',



        topics: [

          'Git initialization',

          'Commits',

          'Branches',

          'Merge',

          'Remote repositories',

          'Pull requests',

        ],

      },



      {

        slug: 'deployment',



        name: 'Docker & Deployment',



        phase: 'Deployment',



        description:

          'Deploy production-ready Django applications.',



        topics: [

          'Environment variables',

          'Production settings',

          'Static files',

          'Docker',

          'Docker Compose',

          'PostgreSQL deployment',

          'Application deployment',

          'CI/CD basics',

        ],

      },



      {

        slug: 'projects',



        name: 'Capstone Projects',



        phase: 'Projects',



        description:

          'Build complete production-style Django applications.',



        topics: [

          'Blog Platform',

          'Student Management System',

          'Inventory Management System',

          'E-commerce Platform',

          'Learning Management System',

        ],

      },

    ],

  },



  /* =======================================================

     NEXT.JS + NESTJS

  ======================================================= */



  {

    stackSlug: 'next-nest',



    modules: [

      {

        slug: 'html',



        name: 'HTML Foundations',



        phase: 'Foundation',



        description:

          'Learn semantic HTML for modern application development.',



        technologySlug: 'html-css',



        topics: [

          'Document structure',

          'Semantic HTML',

          'Forms',

          'Accessibility',

        ],

      },



      {

        slug: 'css',



        name: 'CSS & Responsive Design',



        phase: 'Foundation',



        description:

          'Build modern responsive interfaces.',



        technologySlug: 'html-css',



        topics: [

          'CSS fundamentals',

          'Flexbox',

          'Grid',

          'Responsive design',

        ],

      },



      {

        slug: 'javascript',



        name: 'JavaScript',



        phase: 'Programming',



        description:

          'Learn JavaScript before moving into TypeScript.',



        technologySlug: 'javascript',



        topics: [

          'Variables',

          'Functions',

          'Arrays',

          'Objects',

          'Promises',

          'Async/Await',

        ],

      },



      {

        slug: 'typescript',



        name: 'TypeScript',



        phase: 'Programming',



        description:

          'Build strongly typed frontend and backend applications.',



        technologySlug: 'typescript',



        topics: [

          'Types',

          'Interfaces',

          'Classes',

          'Generics',

          'Modules',

          'Utility types',

        ],

      },



      {

        slug: 'react',



        name: 'React',



        phase: 'Frontend',



        description:

          'Master the React fundamentals required by Next.js.',



        technologySlug: 'react',



        topics: [

          'Components',

          'Props',

          'State',

          'Hooks',

          'Forms',

          'API integration',

        ],

      },



      {

        slug: 'nextjs',



        name: 'Next.js',



        phase: 'Frontend',



        description:

          'Build production-ready React applications with Next.js.',



        technologySlug: 'nextjs',



        topics: [

          'App Router',

          'Layouts',

          'Server Components',

          'Client Components',

          'Routing',

          'Dynamic routes',

          'Data fetching',

          'Forms',

          'Authentication patterns',

        ],

      },



      {

        slug: 'nodejs',



        name: 'Node.js',



        phase: 'Backend',



        description:

          'Learn Node.js fundamentals for NestJS development.',



        technologySlug: 'nodejs',



        topics: [

          'Runtime',

          'Modules',

          'npm',

          'Async programming',

          'Environment variables',

        ],

      },



      {

        slug: 'nestjs',



        name: 'NestJS',



        phase: 'Backend',



        description:

          'Build structured enterprise APIs using NestJS.',



        technologySlug: 'nestjs',



        topics: [

          'Modules',

          'Controllers',

          'Providers',

          'Services',

          'Dependency injection',

          'DTOs',

          'Validation',

          'Guards',

          'Interceptors',

          'Exception filters',

          'Authentication',

        ],

      },



      {

        slug: 'postgresql',



        name: 'PostgreSQL',



        phase: 'Database',



        description:

          'Build reliable relational data models for full-stack applications.',



        technologySlug: 'postgresql',



        topics: [

          'SQL fundamentals',

          'Tables',

          'Relationships',

          'Joins',

          'Indexes',

          'Transactions',

        ],

      },



      {

        slug: 'integration',



        name: 'Next.js + NestJS Integration',



        phase: 'Integration',



        description:

          'Connect Next.js frontend applications with NestJS APIs.',



        topics: [

          'API client architecture',

          'Authentication flow',

          'DTO contracts',

          'CRUD integration',

          'Error handling',

          'Environment configuration',

        ],

      },



      {

        slug: 'testing',



        name: 'Testing',



        phase: 'Quality',



        description:

          'Test frontend and backend application functionality.',



        topics: [

          'Unit testing',

          'API testing',

          'Frontend testing',

          'Integration testing',

          'E2E testing',

        ],

      },



      {

        slug: 'deployment',



        name: 'Docker & Deployment',



        phase: 'Deployment',



        description:

          'Deploy Next.js, NestJS and PostgreSQL applications.',



        topics: [

          'Docker',

          'Docker Compose',

          'Environment variables',

          'Production builds',

          'Reverse proxy',

          'CI/CD',

        ],

      },



      {

        slug: 'projects',



        name: 'Capstone Projects',



        phase: 'Projects',



        description:

          'Build complete enterprise full-stack applications.',



        topics: [

          'Learning Platform',

          'Project Management System',

          'SaaS Dashboard',

          'Assessment Platform',

        ],

      },

    ],

  },



  /* =======================================================

     REACT + SPRING BOOT

  ======================================================= */



  {

    stackSlug: 'react-spring',



    modules: [

      {

        slug: 'html',



        name: 'HTML Foundations',



        phase: 'Foundation',



        description:

          'Learn semantic HTML for modern full-stack application development.',



        technologySlug: 'html-css',



        topics: [

          'Document structure',

          'Semantic HTML',

          'Forms',

          'Tables',

          'Accessibility basics',

        ],

      },



      {

        slug: 'css',



        name: 'CSS & Responsive Design',



        phase: 'Foundation',



        description:

          'Build responsive application interfaces using modern CSS.',



        technologySlug: 'html-css',



        topics: [

          'Selectors',

          'Box model',

          'Flexbox',

          'CSS Grid',

          'Responsive design',

          'Media queries',

        ],

      },



      {

        slug: 'javascript',



        name: 'JavaScript',



        phase: 'Programming',



        description:

          'Learn modern JavaScript for interactive frontend development.',



        technologySlug: 'javascript',



        topics: [

          'Variables',

          'Functions',

          'Arrays',

          'Objects',

          'DOM',

          'Events',

          'Promises',

          'Async/Await',

          'Fetch API',

        ],

      },



      {

        slug: 'react',



        name: 'React',



        phase: 'Frontend',



        description:

          'Build component-based frontend applications using React.',



        technologySlug: 'react',



        topics: [

          'Components',

          'JSX',

          'Props',

          'State',

          'Events',

          'Hooks',

          'Forms',

          'React Router',

          'API integration',

        ],

      },



      {

        slug: 'java',



        name: 'Java',



        phase: 'Programming',



        description:

          'Build a strong Java foundation for enterprise backend development.',



        technologySlug: 'java',



        topics: [

          'Java syntax',

          'Variables',

          'Conditions',

          'Loops',

          'Methods',

          'Arrays',

          'Strings',

          'Classes',

          'Objects',

          'OOP',

          'Exceptions',

          'Collections',

        ],

      },



      {

        slug: 'springboot',



        name: 'Spring Boot',



        phase: 'Backend',



        description:

          'Build structured Java REST APIs and backend services with Spring Boot.',



        technologySlug: 'java',



        topics: [

          'Spring Boot setup',

          'Controllers',

          'Dependency injection',

          'Services',

          'DTOs',

          'Validation',

          'REST APIs',

          'Exception handling',

          'Spring Data JPA',

          'Configuration',

        ],

      },



      {

        slug: 'postgresql',



        name: 'PostgreSQL',



        phase: 'Database',



        description:

          'Design and manage relational data for full-stack applications.',



        technologySlug: 'postgresql',



        topics: [

          'SQL fundamentals',

          'Tables',

          'CRUD',

          'Relationships',

          'Joins',

          'Indexes',

          'Constraints',

          'Transactions',

        ],

      },



      {

        slug: 'authentication',



        name: 'Authentication & Security',



        phase: 'Security',



        description:

          'Secure Spring Boot full-stack applications.',



        topics: [

          'Spring Security',

          'Password hashing',

          'JWT',

          'Authentication',

          'Authorization',

          'Role-based access',

          'CORS',

          'Input validation',

        ],

      },



      {

        slug: 'integration',



        name: 'React + Spring Boot Integration',



        phase: 'Integration',



        description:

          'Connect React applications with Spring Boot REST APIs.',



        topics: [

          'REST communication',

          'Fetch and Axios',

          'DTO contracts',

          'CRUD integration',

          'Authentication flow',

          'CORS',

          'Error handling',

          'Environment configuration',

        ],

      },



      {

        slug: 'testing',



        name: 'Testing',



        phase: 'Quality',



        description:

          'Test frontend, backend and integrated application functionality.',



        topics: [

          'Unit testing',

          'Frontend testing',

          'Backend testing',

          'API testing',

          'Integration testing',

          'End-to-end testing',

        ],

      },



      {

        slug: 'git',



        name: 'Git & Collaboration',



        phase: 'Engineering Practice',



        description:

          'Manage full-stack projects professionally with Git.',



        technologySlug: 'git',



        topics: [

          'Repository setup',

          'Commits',

          'Branches',

          'Merge',

          'Remote repositories',

          'Pull requests',

          'Conflict resolution',

        ],

      },



      {

        slug: 'deployment',



        name: 'Docker & Deployment',



        phase: 'Deployment',



        description:

          'Package and deploy production-ready full-stack applications.',



        topics: [

          'Environment variables',

          'Production builds',

          'Docker',

          'Docker Compose',

          'Database deployment',

          'Reverse proxy basics',

          'CI/CD basics',

        ],

      },



      {

        slug: 'projects',



        name: 'Capstone Projects',



        phase: 'Projects',



        description:

          'Build complete React and Spring Boot applications.',



        topics: [

          'Task Management System',

          'Student Management System',

          'E-commerce Application',

          'Learning Management System',

        ],

      }

    ],

  },



  /* =======================================================

     ANGULAR + SPRING BOOT

  ======================================================= */



  {

    stackSlug: 'angular-spring',



    modules: [

      {

        slug: 'html',



        name: 'HTML Foundations',



        phase: 'Foundation',



        description:

          'Learn semantic HTML for modern full-stack application development.',



        technologySlug: 'html-css',



        topics: [

          'Document structure',

          'Semantic HTML',

          'Forms',

          'Tables',

          'Accessibility basics',

        ],

      },



      {

        slug: 'css',



        name: 'CSS & Responsive Design',



        phase: 'Foundation',



        description:

          'Build responsive application interfaces using modern CSS.',



        technologySlug: 'html-css',



        topics: [

          'Selectors',

          'Box model',

          'Flexbox',

          'CSS Grid',

          'Responsive design',

          'Media queries',

        ],

      },



      {

        slug: 'javascript',



        name: 'JavaScript',



        phase: 'Programming',



        description:

          'Learn modern JavaScript for interactive frontend development.',



        technologySlug: 'javascript',



        topics: [

          'Variables',

          'Functions',

          'Arrays',

          'Objects',

          'DOM',

          'Events',

          'Promises',

          'Async/Await',

          'Fetch API',

        ],

      },



      {

        slug: 'typescript',



        name: 'TypeScript',



        phase: 'Programming',



        description:

          'Learn strongly typed JavaScript for Angular development.',



        technologySlug: 'typescript',



        topics: [

          'Types',

          'Interfaces',

          'Classes',

          'Generics',

          'Modules',

        ],

      },



      {

        slug: 'angular',



        name: 'Angular',



        phase: 'Frontend',



        description:

          'Build enterprise frontend applications using Angular.',



        technologySlug: 'angular',



        topics: [

          'Components',

          'Templates',

          'Data binding',

          'Directives',

          'Services',

          'Dependency injection',

          'Forms',

          'Routing',

          'HTTP Client',

          'RxJS',

        ],

      },



      {

        slug: 'java',



        name: 'Java',



        phase: 'Programming',



        description:

          'Build a strong Java foundation for enterprise backend development.',



        technologySlug: 'java',



        topics: [

          'Java syntax',

          'Variables',

          'Conditions',

          'Loops',

          'Methods',

          'Arrays',

          'Strings',

          'Classes',

          'Objects',

          'OOP',

          'Exceptions',

          'Collections',

        ],

      },



      {

        slug: 'springboot',



        name: 'Spring Boot',



        phase: 'Backend',



        description:

          'Build structured Java REST APIs and backend services with Spring Boot.',



        technologySlug: 'java',



        topics: [

          'Spring Boot setup',

          'Controllers',

          'Dependency injection',

          'Services',

          'DTOs',

          'Validation',

          'REST APIs',

          'Exception handling',

          'Spring Data JPA',

          'Configuration',

        ],

      },



      {

        slug: 'postgresql',



        name: 'PostgreSQL',



        phase: 'Database',



        description:

          'Design and manage relational data for full-stack applications.',



        technologySlug: 'postgresql',



        topics: [

          'SQL fundamentals',

          'Tables',

          'CRUD',

          'Relationships',

          'Joins',

          'Indexes',

          'Constraints',

          'Transactions',

        ],

      },



      {

        slug: 'authentication',



        name: 'Authentication & Security',



        phase: 'Security',



        description:

          'Secure Spring Boot full-stack applications.',



        topics: [

          'Spring Security',

          'Password hashing',

          'JWT',

          'Authentication',

          'Authorization',

          'Role-based access',

          'CORS',

          'Input validation',

        ],

      },



      {

        slug: 'integration',



        name: 'Angular + Spring Boot Integration',



        phase: 'Integration',



        description:

          'Connect Angular applications with Spring Boot REST APIs.',



        topics: [

          'Angular HTTP Client',

          'REST communication',

          'DTO contracts',

          'CRUD integration',

          'Authentication flow',

          'CORS',

          'Error handling',

          'Environment configuration',

        ],

      },



      {

        slug: 'testing',



        name: 'Testing',



        phase: 'Quality',



        description:

          'Test frontend, backend and integrated application functionality.',



        topics: [

          'Unit testing',

          'Frontend testing',

          'Backend testing',

          'API testing',

          'Integration testing',

          'End-to-end testing',

        ],

      },



      {

        slug: 'git',



        name: 'Git & Collaboration',



        phase: 'Engineering Practice',



        description:

          'Manage full-stack projects professionally with Git.',



        technologySlug: 'git',



        topics: [

          'Repository setup',

          'Commits',

          'Branches',

          'Merge',

          'Remote repositories',

          'Pull requests',

          'Conflict resolution',

        ],

      },



      {

        slug: 'deployment',



        name: 'Docker & Deployment',



        phase: 'Deployment',



        description:

          'Package and deploy production-ready full-stack applications.',



        topics: [

          'Environment variables',

          'Production builds',

          'Docker',

          'Docker Compose',

          'Database deployment',

          'Reverse proxy basics',

          'CI/CD basics',

        ],

      },



      {

        slug: 'projects',



        name: 'Capstone Projects',



        phase: 'Projects',



        description:

          'Build complete Angular and Spring Boot applications.',



        topics: [

          'Employee Management System',

          'Admin Dashboard',

          'E-commerce Application',

          'Learning Management System',

        ],

      }

    ],

  },



  /* =======================================================

     .NET FULL STACK

  ======================================================= */



  {

    stackSlug: 'dotnet',



    modules: [

      {

        slug: 'html',



        name: 'HTML Foundations',



        phase: 'Foundation',



        description:

          'Learn semantic HTML for modern full-stack application development.',



        technologySlug: 'html-css',



        topics: [

          'Document structure',

          'Semantic HTML',

          'Forms',

          'Tables',

          'Accessibility basics',

        ],

      },



      {

        slug: 'css',



        name: 'CSS & Responsive Design',



        phase: 'Foundation',



        description:

          'Build responsive application interfaces using modern CSS.',



        technologySlug: 'html-css',



        topics: [

          'Selectors',

          'Box model',

          'Flexbox',

          'CSS Grid',

          'Responsive design',

          'Media queries',

        ],

      },



      {

        slug: 'javascript',



        name: 'JavaScript',



        phase: 'Programming',



        description:

          'Learn modern JavaScript for interactive frontend development.',



        technologySlug: 'javascript',



        topics: [

          'Variables',

          'Functions',

          'Arrays',

          'Objects',

          'DOM',

          'Events',

          'Promises',

          'Async/Await',

          'Fetch API',

        ],

      },



      {

        slug: 'csharp',



        name: 'C#',



        phase: 'Programming',



        description:

          'Learn C# fundamentals for modern .NET application development.',



        topics: [

          'C# syntax',

          'Types',

          'Conditions',

          'Loops',

          'Methods',

          'Arrays',

          'Collections',

          'Classes',

          'Objects',

          'OOP',

          'Exceptions',

        ],

      },



      {

        slug: 'aspnet-core',



        name: 'ASP.NET Core',



        phase: 'Backend',



        description:

          'Build enterprise web APIs and services with ASP.NET Core.',



        topics: [

          'Project structure',

          'Controllers',

          'Routing',

          'Dependency injection',

          'Services',

          'DTOs',

          'Validation',

          'Middleware',

          'REST APIs',

          'Configuration',

        ],

      },



      {

        slug: 'entity-framework',



        name: 'Entity Framework Core',



        phase: 'Data Access',



        description:

          'Use Entity Framework Core for relational data access.',



        topics: [

          'DbContext',

          'Entities',

          'Migrations',

          'LINQ',

          'Relationships',

          'CRUD',

          'Transactions',

        ],

      },



      {

        slug: 'sqlserver',



        name: 'SQL Server',



        phase: 'Database',



        description:

          'Design and manage relational data for .NET applications using SQL Server.',



        technologySlug: 'sqlserver',



        topics: [

          'SQL fundamentals',

          'Tables',

          'CRUD',

          'Relationships',

          'Joins',

          'Indexes',

          'Constraints',

          'Transactions',

        ],

      },



      {

        slug: 'authentication',



        name: 'Authentication & Security',



        phase: 'Security',



        description:

          'Secure ASP.NET Core full-stack applications.',



        topics: [

          'ASP.NET Core Identity',

          'Password hashing',

          'JWT',

          'Authentication',

          'Authorization',

          'Roles and policies',

          'CORS',

          'Validation',

        ],

      },



      {

        slug: 'integration',



        name: '.NET Full Stack Integration',



        phase: 'Integration',



        description:

          'Connect the frontend with ASP.NET Core APIs and relational data.',



        topics: [

          'API communication',

          'DTO contracts',

          'CRUD integration',

          'Authentication flow',

          'Error handling',

          'Environment configuration',

        ],

      },



      {

        slug: 'testing',



        name: 'Testing',



        phase: 'Quality',



        description:

          'Test frontend, backend and integrated application functionality.',



        topics: [

          'Unit testing',

          'Frontend testing',

          'Backend testing',

          'API testing',

          'Integration testing',

          'End-to-end testing',

        ],

      },



      {

        slug: 'git',



        name: 'Git & Collaboration',



        phase: 'Engineering Practice',



        description:

          'Manage full-stack projects professionally with Git.',



        technologySlug: 'git',



        topics: [

          'Repository setup',

          'Commits',

          'Branches',

          'Merge',

          'Remote repositories',

          'Pull requests',

          'Conflict resolution',

        ],

      },



      {

        slug: 'deployment',



        name: 'Docker & Deployment',



        phase: 'Deployment',



        description:

          'Package and deploy production-ready full-stack applications.',



        topics: [

          'Environment variables',

          'Production builds',

          'Docker',

          'Docker Compose',

          'Database deployment',

          'Reverse proxy basics',

          'CI/CD basics',

        ],

      },



      {

        slug: 'projects',



        name: 'Capstone Projects',



        phase: 'Projects',



        description:

          'Build complete enterprise .NET full-stack applications.',



        topics: [

          'Employee Management System',

          'Inventory System',

          'E-commerce Application',

          'Learning Management System',

        ],

      }

    ],

  },



  /* =======================================================

     JAVA FULL STACK

  ======================================================= */



  {

    stackSlug: 'java-fullstack',



    modules: [

      {

        slug: 'html',



        name: 'HTML Foundations',



        phase: 'Foundation',



        description:

          'Learn semantic HTML for modern full-stack application development.',



        technologySlug: 'html-css',



        topics: [

          'Document structure',

          'Semantic HTML',

          'Forms',

          'Tables',

          'Accessibility basics',

        ],

      },



      {

        slug: 'css',



        name: 'CSS & Responsive Design',



        phase: 'Foundation',



        description:

          'Build responsive application interfaces using modern CSS.',



        technologySlug: 'html-css',



        topics: [

          'Selectors',

          'Box model',

          'Flexbox',

          'CSS Grid',

          'Responsive design',

          'Media queries',

        ],

      },



      {

        slug: 'javascript',



        name: 'JavaScript',



        phase: 'Programming',



        description:

          'Learn modern JavaScript for interactive frontend development.',



        technologySlug: 'javascript',



        topics: [

          'Variables',

          'Functions',

          'Arrays',

          'Objects',

          'DOM',

          'Events',

          'Promises',

          'Async/Await',

          'Fetch API',

        ],

      },



      {

        slug: 'java',



        name: 'Java',



        phase: 'Programming',



        description:

          'Build a strong Java foundation for enterprise backend development.',



        technologySlug: 'java',



        topics: [

          'Java syntax',

          'Variables',

          'Conditions',

          'Loops',

          'Methods',

          'Arrays',

          'Strings',

          'Classes',

          'Objects',

          'OOP',

          'Exceptions',

          'Collections',

        ],

      },



      {

        slug: 'springboot',



        name: 'Spring Boot',



        phase: 'Backend',



        description:

          'Build structured Java REST APIs and backend services with Spring Boot.',



        technologySlug: 'java',



        topics: [

          'Spring Boot setup',

          'Controllers',

          'Dependency injection',

          'Services',

          'DTOs',

          'Validation',

          'REST APIs',

          'Exception handling',

          'Spring Data JPA',

          'Configuration',

        ],

      },



      {

        slug: 'postgresql',



        name: 'PostgreSQL',



        phase: 'Database',



        description:

          'Design and manage relational data for full-stack applications.',



        technologySlug: 'postgresql',



        topics: [

          'SQL fundamentals',

          'Tables',

          'CRUD',

          'Relationships',

          'Joins',

          'Indexes',

          'Constraints',

          'Transactions',

        ],

      },



      {

        slug: 'authentication',



        name: 'Authentication & Security',



        phase: 'Security',



        description:

          'Secure Spring Boot full-stack applications.',



        topics: [

          'Spring Security',

          'Password hashing',

          'JWT',

          'Authentication',

          'Authorization',

          'Role-based access',

          'CORS',

          'Input validation',

        ],

      },



      {

        slug: 'integration',



        name: 'Java Full Stack Integration',



        phase: 'Integration',



        description:

          'Connect frontend interfaces with Spring Boot APIs and relational data.',



        topics: [

          'REST communication',

          'Frontend API calls',

          'DTO contracts',

          'CRUD integration',

          'Authentication flow',

          'CORS',

          'Error handling',

        ],

      },



      {

        slug: 'testing',



        name: 'Testing',



        phase: 'Quality',



        description:

          'Test frontend, backend and integrated application functionality.',



        topics: [

          'Unit testing',

          'Frontend testing',

          'Backend testing',

          'API testing',

          'Integration testing',

          'End-to-end testing',

        ],

      },



      {

        slug: 'git',



        name: 'Git & Collaboration',



        phase: 'Engineering Practice',



        description:

          'Manage full-stack projects professionally with Git.',



        technologySlug: 'git',



        topics: [

          'Repository setup',

          'Commits',

          'Branches',

          'Merge',

          'Remote repositories',

          'Pull requests',

          'Conflict resolution',

        ],

      },



      {

        slug: 'deployment',



        name: 'Docker & Deployment',



        phase: 'Deployment',



        description:

          'Package and deploy production-ready full-stack applications.',



        topics: [

          'Environment variables',

          'Production builds',

          'Docker',

          'Docker Compose',

          'Database deployment',

          'Reverse proxy basics',

          'CI/CD basics',

        ],

      },



      {

        slug: 'projects',



        name: 'Capstone Projects',



        phase: 'Projects',



        description:

          'Build complete Java full-stack applications.',



        topics: [

          'Student Management System',

          'Job Portal',

          'E-commerce Application',

          'Learning Management System',

        ],

      }

    ],

  },



  /* =======================================================

     PHP FULL STACK

  ======================================================= */



  {

    stackSlug: 'php-fullstack',



    modules: [

      {

        slug: 'html',



        name: 'HTML Foundations',



        phase: 'Foundation',



        description:

          'Learn semantic HTML for modern full-stack application development.',



        technologySlug: 'html-css',



        topics: [

          'Document structure',

          'Semantic HTML',

          'Forms',

          'Tables',

          'Accessibility basics',

        ],

      },



      {

        slug: 'css',



        name: 'CSS & Responsive Design',



        phase: 'Foundation',



        description:

          'Build responsive application interfaces using modern CSS.',



        technologySlug: 'html-css',



        topics: [

          'Selectors',

          'Box model',

          'Flexbox',

          'CSS Grid',

          'Responsive design',

          'Media queries',

        ],

      },



      {

        slug: 'javascript',



        name: 'JavaScript',



        phase: 'Programming',



        description:

          'Learn modern JavaScript for interactive frontend development.',



        technologySlug: 'javascript',



        topics: [

          'Variables',

          'Functions',

          'Arrays',

          'Objects',

          'DOM',

          'Events',

          'Promises',

          'Async/Await',

          'Fetch API',

        ],

      },



      {

        slug: 'php',



        name: 'PHP',



        phase: 'Programming',



        description:

          'Learn PHP fundamentals for server-side web development.',



        topics: [

          'PHP syntax',

          'Variables',

          'Operators',

          'Conditions',

          'Loops',

          'Functions',

          'Arrays',

          'Strings',

          'Forms',

          'Sessions',

          'Exceptions',

        ],

      },



      {

        slug: 'php-backend',



        name: 'PHP Backend Development',



        phase: 'Backend',



        description:

          'Build structured server-side applications and APIs with PHP.',



        topics: [

          'Request handling',

          'Forms',

          'Sessions',

          'Cookies',

          'File handling',

          'Database connectivity',

          'PDO',

          'REST APIs',

          'Validation',

          'Error handling',

        ],

      },



      {

        slug: 'mysql',



        name: 'MySQL',



        phase: 'Database',



        description:

          'Design and manage relational data for PHP full-stack applications.',



        topics: [

          'SQL fundamentals',

          'Tables',

          'CRUD',

          'Relationships',

          'Joins',

          'Indexes',

          'Constraints',

          'Transactions',

        ],

      },



      {

        slug: 'authentication',



        name: 'Authentication & Security',



        phase: 'Security',



        description:

          'Secure PHP applications using common authentication and authorization patterns.',



        topics: [

          'Password hashing',

          'Registration',

          'Login',

          'Sessions',

          'Authorization',

          'Role-based access',

          'CSRF protection',

          'Input validation',

        ],

      },



      {

        slug: 'integration',



        name: 'PHP Full Stack Integration',



        phase: 'Integration',



        description:

          'Connect browser interfaces, PHP backend logic and MySQL data.',



        topics: [

          'Form submission',

          'Fetch API',

          'REST integration',

          'CRUD integration',

          'Authentication flow',

          'Error handling',

          'Environment configuration',

        ],

      },



      {

        slug: 'testing',



        name: 'Testing',



        phase: 'Quality',



        description:

          'Test frontend, backend and integrated application functionality.',



        topics: [

          'Unit testing',

          'Frontend testing',

          'Backend testing',

          'API testing',

          'Integration testing',

          'End-to-end testing',

        ],

      },



      {

        slug: 'git',



        name: 'Git & Collaboration',



        phase: 'Engineering Practice',



        description:

          'Manage full-stack projects professionally with Git.',



        technologySlug: 'git',



        topics: [

          'Repository setup',

          'Commits',

          'Branches',

          'Merge',

          'Remote repositories',

          'Pull requests',

          'Conflict resolution',

        ],

      },



      {

        slug: 'deployment',



        name: 'Docker & Deployment',



        phase: 'Deployment',



        description:

          'Package and deploy production-ready full-stack applications.',



        topics: [

          'Environment variables',

          'Production builds',

          'Docker',

          'Docker Compose',

          'Database deployment',

          'Reverse proxy basics',

          'CI/CD basics',

        ],

      },



      {

        slug: 'projects',



        name: 'Capstone Projects',



        phase: 'Projects',



        description:

          'Build complete PHP full-stack applications.',



        topics: [

          'Blog Platform',

          'Student Management System',

          'Inventory System',

          'E-commerce Application',

        ],

      }

    ],

  },



  /* =======================================================
     PYTHON DATA ANALYTICS
     Python → NumPy → Pandas → Data Cleaning → Analysis
     → Aggregation → Visualization → Export
  ======================================================= */

  {
    stackSlug: 'python-analytics',

    modules: [
      {
        slug: 'python-data-analytics',

        name: 'Python Data Analytics',

        phase: 'Data Analytics',

        description:
          'Learn practical data analysis with Python by loading, cleaning, exploring, transforming, aggregating and exporting datasets.',

        technologySlug: 'python',

        topics: [
          'Python for data analysis',
          'NumPy fundamentals',
          'Pandas fundamentals',
          'Series and DataFrames',
          'Loading CSV data',
          'Inspecting datasets',
          'Selecting rows and columns',
          'Filtering data',
          'Handling missing values',
          'Cleaning data',
          'Data type conversion',
          'Descriptive statistics',
          'Sorting data',
          'Grouping data',
          'Aggregation',
          'Creating calculated columns',
          'Working with dates',
          'Combining datasets',
          'Basic data visualization',
          'Exporting processed data',
        ],
      },
    ],
  },

  /* =======================================================
     POWER BI DATA ANALYTICS
     Data Import → Power Query → Data Modeling → DAX
     → Analysis → Visualization → Dashboards → Reports
  ======================================================= */

  {
    stackSlug: 'power-bi',

    modules: [
      {
        slug: 'power-bi',

        name: 'Power BI Data Analytics',

        phase: 'Data Analytics',

        description:
          'Learn practical data analytics with Power BI by importing, cleaning, modeling, analyzing and visualizing business data.',

        technologySlug: 'power-bi',

        topics: [
          'Power BI fundamentals',
          'Importing sales data',
          'Power Query',
          'Data cleaning',
          'Data transformation',
          'Data types',
          'Data modeling',
          'Table relationships',
          'DAX fundamentals',
          'Calculated columns',
          'Measures',
          'Total revenue analysis',
          'Profit margin analysis',
          'Date and time analysis',
          'Monthly sales trends',
          'Regional sales analysis',
          'Top product analysis',
          'Charts and visualizations',
          'KPI dashboards',
          'Filters and slicers',
          'Interactive reports',
          'Executive dashboards',
        ],
      },
    ],
  },


  /* =======================================================
     PYTHON MACHINE LEARNING
     Python → NumPy → Pandas → Data Preparation
     → Supervised ML → Unsupervised ML → Evaluation
     → Feature Engineering → ML Projects
  ======================================================= */

  {
    stackSlug: 'python-ml',

    modules: [
      {
        slug: 'python-machine-learning',

        name: 'Python Machine Learning',

        phase: 'Machine Learning',

        description:
          'Learn practical machine learning with Python by preparing data, training models, evaluating performance and solving real-world prediction problems.',

        technologySlug: 'python',

        topics: [
          'Python for machine learning',
          'NumPy fundamentals',
          'Pandas fundamentals',
          'Loading datasets',
          'Exploring datasets',
          'Data cleaning',
          'Handling missing values',
          'Encoding categorical data',
          'Feature scaling',
          'Train and test split',
          'Machine learning fundamentals',
          'Supervised learning',
          'Linear regression',
          'Logistic regression',
          'Decision trees',
          'Random forests',
          'K-nearest neighbors',
          'Support vector machines',
          'Unsupervised learning',
          'K-means clustering',
          'Model evaluation',
          'Accuracy',
          'Precision and recall',
          'F1 score',
          'Confusion matrix',
          'Cross-validation',
          'Feature engineering',
          'Scikit-learn pipelines',
          'Model prediction',
          'Machine learning projects',
        ],
      },
    ],
  },



  /* =======================================================
     PYTHON + SPARK DATA ENGINEERING
     Python → SQL → Spark → DataFrames → ETL → Optimization
     → Streaming → Capstone Projects
  ======================================================= */

  {
    stackSlug: 'python-spark',
    modules: [
      {
        slug: 'python-data-engineering',
        name: 'Python for Data Engineering',
        phase: 'Foundation',
        description: 'Prepare datasets and write reliable Python data-processing scripts.',
        technologySlug: 'python',
        topics: ['Python data types', 'Lists and dictionaries', 'Functions and modules', 'File handling', 'CSV and JSON', 'Exceptions and logging', 'Data validation', 'Python ETL scripts'],
      },
      {
        slug: 'sql-data-engineering',
        name: 'SQL for Data Engineering',
        phase: 'Foundation',
        description: 'Query, join, aggregate and prepare relational datasets for pipelines.',
        technologySlug: 'sql',
        topics: ['SELECT and filtering', 'Joins', 'Aggregations', 'Common table expressions', 'Window functions', 'Data quality queries', 'Incremental loads'],
      },
      {
        slug: 'spark-fundamentals',
        name: 'Apache Spark Fundamentals',
        phase: 'Spark Foundations',
        description: 'Create Spark sessions and understand local Spark execution.',
        technologySlug: 'python-spark',
        topics: ['Spark architecture', 'SparkSession', 'Spark local mode', 'Creating DataFrames', 'Actions and transformations', 'Lazy evaluation', 'Spark execution errors'],
      },
      {
        slug: 'pyspark-dataframes',
        name: 'PySpark DataFrames',
        phase: 'Data Processing',
        description: 'Load, transform and validate structured data using PySpark.',
        technologySlug: 'python-spark',
        topics: ['CSV and JSON ingestion', 'Explicit schemas', 'Selecting columns', 'Filtering rows', 'Column expressions', 'Type casting', 'Null handling', 'Deduplication', 'Joins', 'GroupBy and aggregation'],
      },
      {
        slug: 'spark-sql',
        name: 'Spark SQL',
        phase: 'Data Processing',
        description: 'Use SQL queries and temporary views to analyze Spark datasets.',
        technologySlug: 'python-spark',
        topics: ['Temporary views', 'Spark SQL queries', 'Joins', 'Aggregations', 'Window functions', 'SQL functions', 'Query validation'],
      },
      {
        slug: 'spark-data-formats',
        name: 'Data Formats and Storage',
        phase: 'Data Storage',
        description: 'Read and write common analytics formats using Spark.',
        technologySlug: 'python-spark',
        topics: ['CSV', 'JSON', 'Parquet', 'Read and write modes', 'Partitioned datasets', 'Schema evolution basics', 'Output validation'],
      },
      {
        slug: 'pyspark-etl',
        name: 'ETL and Data Quality Pipelines',
        phase: 'Pipelines',
        description: 'Build reproducible batch data pipelines with validation.',
        technologySlug: 'python-spark',
        topics: ['Extract-transform-load', 'Data cleansing', 'Schema checks', 'Business rules', 'Incremental processing', 'Idempotency', 'Pipeline error handling', 'Writing curated datasets'],
      },
      {
        slug: 'spark-optimization',
        name: 'Spark Performance and Optimization',
        phase: 'Advanced',
        description: 'Understand execution plans and optimize Spark workloads.',
        technologySlug: 'python-spark',
        topics: ['Partitions', 'Shuffle operations', 'Caching', 'Explain plans', 'Broadcast joins', 'Skew basics', 'Resource management', 'Performance measurement'],
      },
      {
        slug: 'spark-streaming',
        name: 'Structured Streaming',
        phase: 'Advanced',
        description: 'Process event streams and micro-batches with Spark.',
        technologySlug: 'python-spark',
        topics: ['Streaming DataFrames', 'Micro-batches', 'Triggers', 'Watermarks', 'Window aggregations', 'Checkpoints', 'Streaming sinks', 'Recovery basics'],
      },
      {
        slug: 'data-engineering-projects',
        name: 'Data Engineering Capstone Projects',
        phase: 'Projects',
        description: 'Apply Python and PySpark in realistic end-to-end data pipelines.',
        technologySlug: 'python-spark',
        topics: ['Sales ETL pipeline', 'Customer analytics pipeline', 'Transaction data quality', 'Log processing', 'IoT batch analytics', 'Incremental data pipeline', 'End-to-end pipeline validation'],
      },
    ],
  },

  /* =======================================================
     DEVOPS ENGINEER
     Linux → Git → Docker → Kubernetes → CI/CD
  ======================================================= */

  {
    stackSlug: 'devops-engineer',

    modules: [
      /* =====================================================
         LINUX
      ===================================================== */

      {
        slug: 'linux',

        name: 'Linux',

        phase: 'Cloud & DevOps',

        description:
          'Learn practical Linux administration and command-line skills used in cloud and DevOps environments.',

        technologySlug: 'linux',

        topics: [
          'Linux fundamentals',
          'Linux terminal',
          'Filesystem navigation',
          'Working with files',
          'Working with directories',
          'Creating directories',
          'Copying and moving files',
          'Removing files and directories',
          'File permissions',
          'Users and groups',
          'Processes',
          'Package management',
          'Environment variables',
          'Pipes and redirection',
          'Searching files and text',
          'Networking commands',
          'Disk usage',
          'System information',
          'Shell commands',
          'Basic shell scripting',
        ],
      },

      /* =====================================================
         GIT
      ===================================================== */

      {
        slug: 'git',

        name: 'Git',

        phase: 'Cloud & DevOps',

        description:
          'Learn practical Git version-control skills used in modern DevOps workflows and collaborative software development.',

        technologySlug: 'git',

        topics: [
          'Git fundamentals',
          'Git installation and configuration',
          'Repository initialization',
          'Working directory',
          'Staging area',
          'Repository status',
          'Tracking files',
          'Staging changes',
          'Creating commits',
          'Commit history',
          'Viewing changes',
          'Restoring changes',
          'Git ignore',
          'Branches',
          'Creating branches',
          'Switching branches',
          'Merging branches',
          'Merge conflicts',
          'Tags',
          'Remote repositories',
          'Clone',
          'Fetch',
          'Pull',
          'Push',
          'Git collaboration workflow',
        ],
      },

      /* =====================================================
         DOCKER
      ===================================================== */

      {
        slug: 'docker',

        name: 'Docker',

        phase: 'Cloud & DevOps',

        description:
          'Learn practical Docker containerization skills used to build, run and manage containers in DevOps environments.',

        technologySlug: 'docker',

        topics: [
          'Docker fundamentals',
          'Docker architecture',
          'Docker CLI',
          'Docker version',
          'Docker images',
          'Docker containers',
          'Listing Docker images',
          'Listing Docker containers',
          'Pulling Docker images',
          'Running containers',
          'Starting containers',
          'Stopping containers',
          'Removing containers',
          'Removing images',
          'Container logs',
          'Executing commands in containers',
          'Port mapping',
          'Environment variables',
          'Docker volumes',
          'Bind mounts',
          'Docker networks',
          'Dockerfile fundamentals',
          'Building Docker images',
          'Image tags',
          'Containerizing applications',
          'Docker Compose fundamentals',
          'Multi-container applications',
          'Container troubleshooting',
          'Docker cleanup',
        ],
      },


      /* =====================================================
         KUBERNETES
      ===================================================== */

      {
        slug: 'kubernetes',

        name: 'Kubernetes',

        phase: 'Cloud & DevOps',

        description:
          'Learn practical Kubernetes container orchestration skills used to deploy, manage and scale containerized applications in DevOps environments.',

        technologySlug: 'kubernetes',

        topics: [
          'Kubernetes fundamentals',
          'Kubernetes architecture',
          'Kubernetes clusters',
          'Control plane',
          'Worker nodes',
          'kubectl CLI',
          'kubectl version',
          'Kubernetes contexts',
          'Kubernetes namespaces',
          'Cluster information',
          'Kubernetes nodes',
          'Listing nodes',
          'Describing nodes',
          'Pods',
          'Creating pods',
          'Listing pods',
          'Describing pods',
          'Pod logs',
          'Executing commands in pods',
          'Deleting pods',
          'ReplicaSets',
          'Deployments',
          'Creating deployments',
          'Listing deployments',
          'Describing deployments',
          'Scaling deployments',
          'Updating deployments',
          'Rolling updates',
          'Deployment rollout status',
          'Deployment rollback',
          'Kubernetes Services',
          'ClusterIP services',
          'NodePort services',
          'LoadBalancer services',
          'Exposing deployments',
          'Service discovery',
          'Labels',
          'Selectors',
          'Annotations',
          'ConfigMaps',
          'Creating ConfigMaps',
          'Using ConfigMaps in pods',
          'Secrets',
          'Creating Secrets',
          'Using Secrets in pods',
          'Kubernetes YAML',
          'Manifest files',
          'Applying manifests',
          'Deleting resources from manifests',
          'Kubernetes volumes',
          'Persistent Volumes',
          'Persistent Volume Claims',
          'Resource requests',
          'Resource limits',
          'Liveness probes',
          'Readiness probes',
          'Kubernetes networking',
          'DNS and service discovery',
          'Ingress fundamentals',
          'Viewing Kubernetes events',
          'Kubernetes troubleshooting',
          'Pod troubleshooting',
          'Deployment troubleshooting',
          'Service troubleshooting',
          'Kubernetes cleanup',
        ],
      },

      /* =====================================================
         CI/CD
      ===================================================== */

      {
        slug: 'ci-cd',

        name: 'CI/CD',

        phase: 'Cloud & DevOps',

        description:
          'Learn practical continuous integration and continuous delivery workflows used to automate software build, test and deployment processes.',

        technologySlug: 'ci-cd',

        topics: [
          'CI/CD fundamentals',
          'Continuous Integration',
          'Continuous Delivery',
          'Continuous Deployment',
          'CI/CD pipelines',
          'Pipeline stages',
          'Source control integration',
          'Build automation',
          'Automated testing',
          'Deployment automation',
          'GitHub Actions fundamentals',
          'GitHub Actions workflows',
          'Workflow YAML',
          'Workflow triggers',
          'Push and pull request triggers',
          'Jobs',
          'Steps',
          'GitHub Actions runners',
          'Using actions',
          'Environment variables',
          'Secrets',
          'Artifacts',
          'Build artifacts',
          'Caching dependencies',
          'Matrix builds',
          'Branch-based workflows',
          'Pull request validation',
          'Docker in CI/CD',
          'Building Docker images in pipelines',
          'Container registry basics',
          'Deployment environments',
          'Development environment',
          'Staging environment',
          'Production environment',
          'Manual approvals',
          'Pipeline failures',
          'Viewing workflow logs',
          'CI/CD troubleshooting',
          'Rollback concepts',
          'Pipeline security',
          'CI/CD best practices',
        ],
      },
    ],
  },

  /* =======================================================
     CYBERSECURITY - LINUX SECURITY
     Fundamentals → Permissions → Users → SSH → Firewall
     → Processes → Logs → Hardening → Auditing → Capstone
  ======================================================= */

  {
    stackSlug: 'linux-security',
    modules: [
      {
        slug: 'linux-security-fundamentals',
        name: 'Linux Security Fundamentals',
        phase: 'Foundation',
        description: 'Understand Linux security architecture, system identities, access controls and essential security inspection commands.',
        technologySlug: 'linux',
        topics: [
          'Linux security fundamentals',
          'Linux filesystem security',
          'Root and standard users',
          'User and group identities',
          'Security-sensitive directories',
          'System information',
          'Current user identification',
          'System configuration inspection',
          'Basic security commands',
          'Security best practices',
        ],
      },
      {
        slug: 'file-permissions-security',
        name: 'File Permissions and Ownership',
        phase: 'Access Control',
        description: 'Secure Linux files and directories using permissions, ownership and access control mechanisms.',
        technologySlug: 'linux',
        topics: [
          'Linux file permissions',
          'Read, write and execute permissions',
          'chmod',
          'chown',
          'chgrp',
          'Symbolic permissions',
          'Numeric permissions',
          'Directory permissions',
          'umask',
          'Special permissions',
          'SUID and SGID',
          'Sticky bit',
          'Access Control Lists',
          'Finding insecure permissions',
          'Securing confidential files',
        ],
      },
      {
        slug: 'user-group-security',
        name: 'User and Group Security',
        phase: 'Identity and Access',
        description: 'Manage Linux user accounts, groups, privileges and authentication-related security configurations.',
        technologySlug: 'linux',
        topics: [
          'Linux user management',
          'User account inspection',
          'Group management',
          'User and group IDs',
          '/etc/passwd',
          '/etc/shadow',
          '/etc/group',
          'Password policies',
          'Account locking',
          'Password expiration',
          'sudo privileges',
          'Least privilege',
          'Privileged account auditing',
          'Inactive account detection',
        ],
      },
      {
        slug: 'ssh-security',
        name: 'SSH Security',
        phase: 'Remote Access Security',
        description: 'Understand and secure Linux remote access through OpenSSH configuration, authentication and auditing.',
        technologySlug: 'linux',
        topics: [
          'SSH fundamentals',
          'OpenSSH configuration',
          'SSH client and server',
          'SSH key authentication',
          'SSH key permissions',
          'Password authentication policies',
          'Root login restrictions',
          'Authorized keys',
          'SSH configuration validation',
          'SSH login auditing',
          'SSH security best practices',
        ],
      },
      {
        slug: 'linux-firewall-security',
        name: 'Linux Firewall Security',
        phase: 'Network Security',
        description: 'Understand Linux network filtering and apply defensive firewall configuration principles.',
        technologySlug: 'linux',
        topics: [
          'Linux network security',
          'Firewall fundamentals',
          'Inbound and outbound traffic',
          'UFW fundamentals',
          'iptables fundamentals',
          'nftables fundamentals',
          'Firewall rules',
          'Default deny policies',
          'Allowed services',
          'Port filtering',
          'Firewall configuration auditing',
          'Firewall rule validation',
        ],
      },
      {
        slug: 'process-service-security',
        name: 'Process and Service Security',
        phase: 'System Security',
        description: 'Inspect Linux processes and services to identify unnecessary privileges and insecure configurations.',
        technologySlug: 'linux',
        topics: [
          'Linux process management',
          'Process ownership',
          'Process inspection',
          'ps and top',
          'Service management',
          'systemctl',
          'Running services',
          'Unnecessary services',
          'Service permissions',
          'Service configuration inspection',
          'Privileged processes',
          'System resource monitoring',
        ],
      },
      {
        slug: 'linux-log-analysis',
        name: 'Linux Log Analysis',
        phase: 'Security Monitoring',
        description: 'Analyze Linux logs to identify authentication failures, suspicious events and security-related system activity.',
        technologySlug: 'linux',
        topics: [
          'Linux logging fundamentals',
          'System logs',
          'Authentication logs',
          'journalctl',
          'Log filtering',
          'Failed login detection',
          'Successful login auditing',
          'sudo activity',
          'Security event identification',
          'Log timestamps',
          'Log correlation',
          'Basic incident investigation',
        ],
      },
      {
        slug: 'linux-system-hardening',
        name: 'Linux System Hardening',
        phase: 'Hardening',
        description: 'Apply defensive Linux configuration practices to reduce unnecessary exposure and strengthen system security.',
        technologySlug: 'linux',
        topics: [
          'System hardening fundamentals',
          'Least privilege',
          'Secure file permissions',
          'Account security',
          'SSH hardening',
          'Firewall policies',
          'Unnecessary service identification',
          'System update policies',
          'Kernel security settings',
          'Secure configuration baselines',
          'Hardening verification',
          'Security configuration reporting',
        ],
      },
      {
        slug: 'linux-security-auditing',
        name: 'Linux Security Auditing',
        phase: 'Security Auditing',
        description: 'Perform structured security checks to identify Linux misconfigurations and document remediation findings.',
        technologySlug: 'linux',
        topics: [
          'Security auditing fundamentals',
          'Linux audit framework',
          'auditd concepts',
          'Audit rules',
          'Audit log inspection',
          'Permission auditing',
          'User account auditing',
          'SSH configuration auditing',
          'Firewall auditing',
          'System configuration checks',
          'Security findings',
          'Remediation recommendations',
          'Audit reporting',
        ],
      },
      {
        slug: 'linux-security-capstone',
        name: 'Linux Security Capstone Projects',
        phase: 'Projects',
        description: 'Apply Linux security knowledge through practical auditing, configuration review and system-hardening exercises.',
        technologySlug: 'linux',
        topics: [
          'Linux security assessment',
          'File permission audit',
          'User privilege review',
          'SSH configuration assessment',
          'Firewall policy review',
          'Log investigation',
          'Service security review',
          'System hardening checklist',
          'Security findings report',
          'End-to-end Linux security audit',
        ],
      },
    ],
  },

  /* =======================================================
     CYBERSECURITY - PYTHON SECURITY
     10 modules / 50 coding problems
  ======================================================= */

  {
    stackSlug: 'python-security',
    modules: [
      {
        slug: 'python-security-fundamentals',
        name: 'Python Security Fundamentals',
        phase: 'Foundation',
        description: 'Learn secure Python coding practices and common security risks.',
        technologySlug: 'python',
        topics: [
          'Secure coding principles',
          'Python security basics',
          'Data handling',
          'Threat awareness',
          'Security-focused Python exercises',
        ],
      },
      {
        slug: 'python-input-validation',
        name: 'Input Validation and Sanitization',
        phase: 'Input Security',
        description: 'Validate and safely process untrusted input in Python applications.',
        technologySlug: 'python',
        topics: [
          'Input validation',
          'Type and range checks',
          'Regular expressions',
          'Canonicalization',
          'Safe input processing',
        ],
      },
      {
        slug: 'python-password-security',
        name: 'Authentication and Password Security',
        phase: 'Authentication',
        description: 'Implement secure password and authentication utilities in Python.',
        technologySlug: 'python',
        topics: [
          'Password strength',
          'Password hashing',
          'Salt generation',
          'Constant-time comparison',
          'Secure token generation',
        ],
      },
      {
        slug: 'python-cryptography',
        name: 'Cryptography and Data Protection',
        phase: 'Cryptography',
        description: 'Protect information with appropriate cryptographic techniques and safe key handling.',
        technologySlug: 'python',
        topics: [
          'Hash functions',
          'HMAC',
          'Symmetric encryption',
          'Randomness',
          'Key management basics',
        ],
      },
      {
        slug: 'python-file-security',
        name: 'File and OS Security',
        phase: 'System Security',
        description: 'Write Python programs that safely interact with files and operating system resources.',
        technologySlug: 'python',
        topics: [
          'Path traversal prevention',
          'File permissions',
          'Safe file operations',
          'Temporary files',
          'Subprocess safety',
        ],
      },
      {
        slug: 'python-web-security',
        name: 'Web Application Security',
        phase: 'Application Security',
        description: 'Build Python utilities to recognize and prevent common web application vulnerabilities.',
        technologySlug: 'python',
        topics: [
          'HTML escaping',
          'SQL parameterization',
          'URL validation',
          'Session security',
          'Web input security',
        ],
      },
      {
        slug: 'python-network-security',
        name: 'Network and API Security',
        phase: 'Network Security',
        description: 'Implement safe networking and API request validation techniques.',
        technologySlug: 'python',
        topics: [
          'IP address validation',
          'Network address handling',
          'API token validation',
          'HTTP security',
          'Rate limiting concepts',
        ],
      },
      {
        slug: 'python-security-logging',
        name: 'Security Logging and Monitoring',
        phase: 'Monitoring',
        description: 'Analyze application events and produce security-aware logs and alerts.',
        technologySlug: 'python',
        topics: [
          'Structured logging',
          'Sensitive data redaction',
          'Authentication event analysis',
          'Suspicious activity detection',
          'Security audit reports',
        ],
      },
      {
        slug: 'python-code-security',
        name: 'Dependency and Code Security',
        phase: 'Code Security',
        description: 'Identify insecure Python code patterns and dependency-related risks.',
        technologySlug: 'python',
        topics: [
          'Dependency hygiene',
          'Configuration validation',
          'Secret detection',
          'Static checks',
          'Secure code review',
        ],
      },
      {
        slug: 'python-security-capstone',
        name: 'Python Security Capstone',
        phase: 'Projects',
        description: 'Apply secure Python programming skills to integrated security coding challenges.',
        technologySlug: 'python',
        topics: [
          'Secure input processing',
          'Authentication utilities',
          'Cryptographic verification',
          'Audit log analysis',
          'End-to-end security programming',
        ],
      },
    ],
  },



  /* =======================================================
     NETWORK SECURITY - CYBERSECURITY
     Stack: network-security
     Module slug matches stack-problem-mappings.ts
  ======================================================= */
  {
    stackSlug: 'network-security',
    modules: [
      {
        slug: 'network-security-fundamentals',
        name: 'Network Security Fundamentals',
        phase: 'Foundation',
        description:
          'Practice IPv4 addressing, subnetting, DNS records, network ports, HTTP security, TLS certificate inspection and network log analysis.',
        technologySlug: 'linux',
        topics: [
          'IPv4 address validation and classification',
          'Network addresses and subnet ranges',
          'IP membership in CIDR subnets',
          'TCP port validation',
          'DNS record parsing',
          'HTTP security header auditing',
          'TLS certificate date inspection',
          'Detecting suspicious port scanning in logs',
        ],
      },
    ],
  },

  /* =======================================================
     WEB APPLICATION SECURITY - CYBERSECURITY
     Stack: web-security
  ======================================================= */
  {
    stackSlug: 'web-security',
    modules: [
      {
        slug: 'web-security-fundamentals',
        name: 'Web Security Fundamentals',
        phase: 'Foundation',
        description: 'Understand web architecture, HTTP security and common web vulnerabilities.',
        topics: [
          'HTTP and HTTPS',
          'Requests and responses',
          'Cookies and sessions',
          'Same-origin policy',
          'TLS fundamentals',
          'Security headers',
        ],
      },
      {
        slug: 'input-validation',
        name: 'Input Validation and Injection Prevention',
        phase: 'Application Security',
        description: 'Identify unsafe inputs and implement secure validation practices.',
        topics: [
          'Input validation',
          'SQL injection prevention',
          'Parameterized queries',
          'Command injection prevention',
          'Path traversal prevention',
          'Output encoding',
        ],
      },
      {
        slug: 'xss-csrf',
        name: 'XSS and CSRF Protection',
        phase: 'Application Security',
        description: 'Protect web applications against cross-site scripting and request forgery.',
        topics: [
          'Reflected XSS',
          'Stored XSS',
          'DOM-based XSS',
          'HTML escaping',
          'Content Security Policy',
          'CSRF tokens',
          'SameSite cookies',
        ],
      },
      {
        slug: 'authentication-security',
        name: 'Authentication and Session Security',
        phase: 'Security',
        description: 'Implement secure authentication, authorization and session management.',
        topics: [
          'Password hashing',
          'Secure login',
          'Session management',
          'JWT validation',
          'Access control',
          'Role-based authorization',
          'Rate limiting',
        ],
      },
      {
        slug: 'api-security',
        name: 'Web API Security',
        phase: 'Security',
        description: 'Secure REST APIs against common authentication and authorization vulnerabilities.',
        topics: [
          'OWASP API Security',
          'Broken object-level authorization',
          'API authentication',
          'Request validation',
          'CORS configuration',
          'Rate limiting',
          'Error handling',
        ],
      },
      {
        slug: 'security-testing',
        name: 'Web Security Testing',
        phase: 'Testing',
        description: 'Practice authorized security testing in isolated web application environments.',
        topics: [
          'OWASP Top 10',
          'OWASP ZAP',
          'Burp Suite fundamentals',
          'Security test cases',
          'Vulnerability verification',
          'Security reporting',
        ],
      },
      {
        slug: 'secure-development',
        name: 'Secure Web Application Development',
        phase: 'Secure Engineering',
        description: 'Apply secure coding and vulnerability remediation practices.',
        topics: [
          'Secure coding standards',
          'Dependency security',
          'Secret management',
          'Security headers',
          'Logging and monitoring',
          'Security regression testing',
        ],
      },
      {
        slug: 'web-security-projects',
        name: 'Web Application Security Projects',
        phase: 'Projects',
        description: 'Apply web application security concepts through practical defensive projects.',
        topics: [
          'Secure Login System',
          'Input Validation Utility',
          'Security Headers Analyzer',
          'Access Control Validator',
          'Web Security Audit Report',
        ],
      },
    ],
  },
  /* =======================================================
     PENETRATION TESTING
  ======================================================= */

  {
    stackSlug: 'penetration-testing',
    modules: [
      {
        slug: 'pentest-fundamentals',
        name: 'Penetration Testing Fundamentals',
        phase: 'Foundation',
        description: 'Understand authorized penetration testing, engagement rules and safe lab practices.',
        topics: [
          'Penetration testing lifecycle',
          'Written authorization and scope',
          'Rules of engagement',
          'Ethics and legal boundaries',
          'Lab isolation and safety',
          'Evidence handling',
        ],
      },
      {
        slug: 'pentest-reconnaissance',
        name: 'Reconnaissance',
        phase: 'Discovery',
        description: 'Collect and organize information from approved, offline lab datasets.',
        topics: [
          'Passive reconnaissance',
          'Asset inventory',
          'Domain and DNS record interpretation',
          'Metadata review',
          'Attack surface mapping',
          'Scope verification',
        ],
      },
      {
        slug: 'pentest-scanning',
        name: 'Scanning and Enumeration',
        phase: 'Discovery',
        description: 'Interpret synthetic scan results and identify exposed services in authorized environments.',
        topics: [
          'TCP and UDP fundamentals',
          'Common ports and protocols',
          'Service identification',
          'Nmap output interpretation',
          'Banner analysis',
          'Enumeration findings',
        ],
      },
      {
        slug: 'pentest-vulnerability-assessment',
        name: 'Vulnerability Assessment',
        phase: 'Assessment',
        description: 'Identify, validate and prioritize weaknesses using supplied evidence.',
        topics: [
          'Vulnerability identification',
          'CVE and CWE basics',
          'CVSS severity interpretation',
          'False positive review',
          'Risk prioritization',
          'Remediation mapping',
        ],
      },
      {
        slug: 'pentest-web-testing',
        name: 'Web Application Penetration Testing',
        phase: 'Assessment',
        description: 'Analyze offline web requests and security controls using safe examples.',
        topics: [
          'HTTP request and response analysis',
          'Authentication and session controls',
          'Input validation',
          'Security headers',
          'Access control checks',
          'OWASP testing methodology',
        ],
      },
      {
        slug: 'pentest-network-testing',
        name: 'Network Penetration Testing',
        phase: 'Assessment',
        description: 'Evaluate simulated network exposures and configuration weaknesses.',
        topics: [
          'Network segmentation',
          'Firewall rule analysis',
          'Service exposure',
          'TLS configuration review',
          'Network inventory analysis',
          'Safe validation of findings',
        ],
      },
      {
        slug: 'pentest-authentication',
        name: 'Authentication and Access Testing',
        phase: 'Assessment',
        description: 'Evaluate authentication and authorization controls in synthetic test cases.',
        topics: [
          'Password policy assessment',
          'Account lockout controls',
          'Multi-factor authentication concepts',
          'Role-based access control',
          'Session expiration',
          'Privilege boundary checks',
        ],
      },
      {
        slug: 'pentest-exploitation',
        name: 'Controlled Exploitation Fundamentals',
        phase: 'Validation',
        description: 'Understand vulnerability verification using contained simulations and non-deployable examples.',
        topics: [
          'Proof-of-concept planning',
          'Preconditions and impact',
          'Simulated vulnerability validation',
          'Evidence capture',
          'Safety and rollback',
          'Responsible disclosure',
        ],
      },
      {
        slug: 'pentest-reporting',
        name: 'Reporting and Remediation',
        phase: 'Reporting',
        description: 'Document reproducible findings and practical remediation recommendations.',
        topics: [
          'Executive summary',
          'Technical finding format',
          'Severity and business impact',
          'Reproduction evidence',
          'Remediation guidance',
          'Retest verification',
        ],
      },
      {
        slug: 'pentest-projects',
        name: 'Penetration Testing Capstone Projects',
        phase: 'Projects',
        description: 'Complete scoped, offline penetration testing assessments from evidence to report.',
        topics: [
          'Synthetic asset assessment',
          'Offline service inventory review',
          'Web security evidence analysis',
          'Vulnerability prioritization project',
          'Remediation verification',
          'Final penetration test report',
        ],
      },
    ],
  },

  /* =======================================================
     SOC & SIEM — OFFLINE PYTHON SECURITY
  ======================================================= */
  {
    stackSlug: 'soc-siem',
    modules: [
      {
        slug: 'soc-fundamentals',
        name: 'SOC Fundamentals',
        phase: 'Foundation',
        description: 'Understand SOC workflows and categorize simulated security alerts.',
        technologySlug: 'python',
        topics: [
          'SOC roles and responsibilities',
          'Security event classification',
          'Alert severity and prioritization',
        ],
      },
      {
        slug: 'security-log-analysis',
        name: 'Security Log Analysis',
        phase: 'Log Analysis',
        description: 'Parse and investigate offline authentication and activity logs.',
        technologySlug: 'python',
        topics: [
          'Log parsing and normalization',
          'Failed login counting',
          'Suspicious IP activity',
        ],
      },
      {
        slug: 'windows-event-monitoring',
        name: 'Windows Event Monitoring',
        phase: 'Endpoint Monitoring',
        description: 'Analyze synthetic Windows event records and security event IDs.',
        technologySlug: 'python',
        topics: [
          'Windows event IDs',
          'Failed authentication events',
          'Privilege change monitoring',
        ],
      },
      {
        slug: 'linux-security-monitoring',
        name: 'Linux Security Monitoring',
        phase: 'Endpoint Monitoring',
        description: 'Analyze offline Linux authentication and sudo logs.',
        technologySlug: 'python',
        topics: [
          'SSH authentication logs',
          'Brute-force detection',
          'Sudo activity analysis',
        ],
      },
      {
        slug: 'siem-fundamentals',
        name: 'SIEM Fundamentals',
        phase: 'SIEM Operations',
        description: 'Normalize, filter, and aggregate events from simulated log sources.',
        technologySlug: 'python',
        topics: [
          'Event normalization',
          'SIEM event filtering',
          'Log source aggregation',
        ],
      },
      {
        slug: 'threat-detection-rules',
        name: 'Threat Detection Rules',
        phase: 'Detection Engineering',
        description: 'Apply defensive detection logic to provided security events.',
        technologySlug: 'python',
        topics: [
          'Suspicious login patterns',
          'Indicator matching',
          'Detection rule evaluation',
        ],
      },
      {
        slug: 'incident-investigation',
        name: 'Incident Investigation',
        phase: 'Investigation',
        description: 'Reconstruct incident activity from synthetic evidence.',
        technologySlug: 'python',
        topics: [
          'Incident timelines',
          'Related event identification',
          'Incident risk scoring',
        ],
      },
      {
        slug: 'threat-intelligence',
        name: 'Threat Intelligence',
        phase: 'Intelligence',
        description: 'Validate and correlate offline threat indicator datasets.',
        technologySlug: 'python',
        topics: [
          'Indicator validation',
          'IP reputation datasets',
          'Threat pattern matching',
        ],
      },
      {
        slug: 'alert-correlation',
        name: 'Alert Correlation',
        phase: 'Advanced Detection',
        description: 'Correlate simulated alerts and reduce duplicates.',
        technologySlug: 'python',
        topics: [
          'Multi-event correlation',
          'Multi-stage activity detection',
          'Alert deduplication',
        ],
      },
      {
        slug: 'soc-incident-response',
        name: 'SOC Incident Response',
        phase: 'Response',
        description: 'Prioritize incidents and generate structured response summaries.',
        technologySlug: 'python',
        topics: [
          'Incident prioritization',
          'Incident summaries',
          'Response action evaluation',
        ],
      },
    ],
  },

  
  /* =======================================================
     DIGITAL FORENSICS — OFFLINE PYTHON SECURITY
  ======================================================= */
  {
    stackSlug: 'digital-forensics',
    modules: [
      {
        slug: 'digital-forensics-fundamentals',
        name: 'Digital Forensics Fundamentals',
        phase: 'Foundation',
        description: 'Understand forensic investigation principles, digital evidence, and investigative workflows.',
        technologySlug: 'python',
        topics: [
          'Digital evidence types',
          'Forensic investigation lifecycle',
          'Digital artifact classification',
        ],
      },
      {
        slug: 'evidence-collection-integrity',
        name: 'Evidence Collection and Integrity',
        phase: 'Evidence Handling',
        description: 'Practice evidence preservation, integrity verification, and chain-of-custody procedures.',
        technologySlug: 'python',
        topics: [
          'Evidence acquisition principles',
          'SHA-256 hash verification',
          'Chain-of-custody validation',
        ],
      },
      {
        slug: 'file-system-forensics',
        name: 'File System Forensics',
        phase: 'File Analysis',
        description: 'Analyze file metadata, directory records, and simulated file system artifacts.',
        technologySlug: 'python',
        topics: [
          'File metadata analysis',
          'File signature identification',
          'Deleted file record analysis',
        ],
      },
      {
        slug: 'disk-storage-forensics',
        name: 'Disk and Storage Forensics',
        phase: 'Storage Analysis',
        description: 'Investigate simulated disk structures, partitions, and storage evidence.',
        technologySlug: 'python',
        topics: [
          'Disk partition identification',
          'Disk image metadata',
          'Storage artifact examination',
        ],
      },
      {
        slug: 'windows-forensics',
        name: 'Windows Forensics',
        phase: 'Operating System Forensics',
        description: 'Examine synthetic Windows forensic artifacts and operating system activity.',
        technologySlug: 'python',
        topics: [
          'Windows event log analysis',
          'Registry artifact examination',
          'User activity reconstruction',
        ],
      },
      {
        slug: 'linux-forensics',
        name: 'Linux Forensics',
        phase: 'Operating System Forensics',
        description: 'Investigate Linux authentication, command history, and system activity artifacts.',
        technologySlug: 'python',
        topics: [
          'Linux authentication logs',
          'Shell history analysis',
          'Linux file permission evidence',
        ],
      },
      {
        slug: 'memory-forensics',
        name: 'Memory Forensics',
        phase: 'Memory Analysis',
        description: 'Analyze simulated memory evidence to identify processes and suspicious activity.',
        technologySlug: 'python',
        topics: [
          'Memory artifact identification',
          'Process list examination',
          'Suspicious process detection',
        ],
      },
      {
        slug: 'network-forensics',
        name: 'Network Forensics',
        phase: 'Network Analysis',
        description: 'Investigate offline network evidence, connection records, and communication patterns.',
        technologySlug: 'python',
        topics: [
          'Network connection analysis',
          'Packet metadata examination',
          'Suspicious communication identification',
        ],
      },
      {
        slug: 'forensic-timeline-analysis',
        name: 'Forensic Timeline Analysis',
        phase: 'Timeline Reconstruction',
        description: 'Correlate timestamps and digital artifacts to reconstruct sequences of activity.',
        technologySlug: 'python',
        topics: [
          'Timestamp normalization',
          'Chronological event sorting',
          'Multi-source timeline correlation',
        ],
      },
      {
        slug: 'incident-reconstruction-reporting',
        name: 'Incident Reconstruction and Reporting',
        phase: 'Investigation and Reporting',
        description: 'Combine digital evidence into structured incident reconstructions and forensic reports.',
        technologySlug: 'python',
        topics: [
          'Evidence correlation',
          'Incident reconstruction',
          'Forensic report generation',
        ],
      },
    ],
  },

  /* =======================================================
     CLOUD SECURITY — OFFLINE PYTHON SECURITY
  ======================================================= */
  {
    stackSlug: 'cloud-security',
    modules: [
      {
        slug: 'cloud-security-fundamentals',
        name: 'Cloud Security Fundamentals',
        phase: 'Foundation',
        description: 'Understand cloud models, shared responsibilities, and cloud security principles.',
        technologySlug: 'python',
        topics: [
          'Cloud service model identification',
          'Shared responsibility classification',
          'Cloud region validation',
        ],
      },
      {
        slug: 'cloud-identity-access-management',
        name: 'Cloud Identity and Access Management',
        phase: 'Identity and Access',
        description: 'Evaluate cloud identities, policies, and least-privilege permissions.',
        technologySlug: 'python',
        topics: [
          'IAM policy validation',
          'Excessive permission detection',
          'Privileged identity identification',
        ],
      },
      {
        slug: 'cloud-network-security',
        name: 'Cloud Network Security',
        phase: 'Network Protection',
        description: 'Assess simulated cloud network boundaries and firewall configurations.',
        technologySlug: 'python',
        topics: [
          'Security group rule validation',
          'Public port exposure detection',
          'Network ACL evaluation',
        ],
      },
      {
        slug: 'cloud-storage-security',
        name: 'Cloud Storage Security',
        phase: 'Storage Protection',
        description: 'Identify insecure cloud storage access and encryption settings.',
        technologySlug: 'python',
        topics: [
          'Public bucket exposure detection',
          'Storage encryption validation',
          'Object permission review',
        ],
      },
      {
        slug: 'cloud-data-protection',
        name: 'Cloud Data Protection',
        phase: 'Data Security',
        description: 'Protect sensitive cloud data and identify exposed secrets in supplied evidence.',
        technologySlug: 'python',
        topics: [
          'Sensitive data classification',
          'Encryption configuration validation',
          'Exposed secret detection',
        ],
      },
      {
        slug: 'cloud-logging-monitoring',
        name: 'Cloud Logging and Monitoring',
        phase: 'Detection and Monitoring',
        description: 'Analyze offline cloud audit events and suspicious access activity.',
        technologySlug: 'python',
        topics: [
          'Cloud audit log analysis',
          'Suspicious sign-in detection',
          'Unauthorized API activity identification',
        ],
      },
      {
        slug: 'cloud-configuration-security',
        name: 'Cloud Configuration Security',
        phase: 'Configuration Assessment',
        description: 'Evaluate simulated cloud configuration against security baselines.',
        technologySlug: 'python',
        topics: [
          'Cloud misconfiguration detection',
          'Security baseline validation',
          'Resource tagging checks',
        ],
      },
      {
        slug: 'cloud-threat-detection',
        name: 'Cloud Threat Detection',
        phase: 'Threat Analysis',
        description: 'Correlate simulated cloud security events and identify threats.',
        technologySlug: 'python',
        topics: [
          'Brute force pattern detection',
          'Suspicious IP activity identification',
          'Cloud threat event analysis',
        ],
      },
      {
        slug: 'cloud-container-kubernetes-security',
        name: 'Cloud Container and Kubernetes Security',
        phase: 'Workload Protection',
        description: 'Review container and Kubernetes security settings using offline manifests.',
        technologySlug: 'python',
        topics: [
          'Container configuration validation',
          'Privileged container detection',
          'Pod security configuration review',
        ],
      },
      {
        slug: 'cloud-compliance-incident-response',
        name: 'Cloud Compliance and Incident Response',
        phase: 'Compliance and Response',
        description: 'Assess security controls and generate incident reports from simulated cloud evidence.',
        technologySlug: 'python',
        topics: [
          'Cloud compliance control checks',
          'Security incident classification',
          'Incident summary generation',
        ],
      },
    ],
  },

  /* =======================================================
     DEVSECOPS
  ======================================================= */

  {
    stackSlug: 'devsecops',
    modules: [
      {
        slug: 'devsecops-fundamentals',
        name: 'DevSecOps Fundamentals',
        phase: 'Foundation',
        description: 'Understand secure software delivery and shift-left security practices.',
        technologySlug: 'python',
        topics: [
          'Security across the SDLC',
          'DevSecOps security controls',
          'Shift-left security principles',
        ],
      },
      {
        slug: 'devsecops-secure-coding',
        name: 'Secure Coding Practices',
        phase: 'Application Security',
        description: 'Identify common insecure coding patterns and apply defensive validation.',
        technologySlug: 'python',
        topics: [
          'Hardcoded credential detection',
          'Unsafe input handling',
          'Code vulnerability classification',
        ],
      },
      {
        slug: 'devsecops-dependency-supply-chain',
        name: 'Dependency and Supply Chain Security',
        phase: 'Software Supply Chain',
        description: 'Evaluate dependencies, package sources and software supply chain risks.',
        technologySlug: 'python',
        topics: [
          'Vulnerable dependency identification',
          'Package version policy validation',
          'Untrusted package source detection',
        ],
      },
      {
        slug: 'devsecops-secrets-management',
        name: 'Secrets Management',
        phase: 'Secrets Protection',
        description: 'Prevent exposure of credentials and sensitive configuration in software delivery.',
        technologySlug: 'python',
        topics: [
          'Exposed API key detection',
          'Secret storage policy validation',
          'Sensitive configuration classification',
        ],
      },
      {
        slug: 'devsecops-cicd-pipeline-security',
        name: 'CI/CD Pipeline Security',
        phase: 'Pipeline Security',
        description: 'Validate simulated CI/CD pipelines and enforce security gates.',
        technologySlug: 'python',
        topics: [
          'Secure pipeline stage validation',
          'Missing security scan detection',
          'Pipeline security gate evaluation',
        ],
      },
      {
        slug: 'devsecops-security-testing',
        name: 'Static and Dynamic Security Testing',
        phase: 'Security Testing',
        description: 'Interpret SAST and DAST findings and prioritize remediation.',
        technologySlug: 'python',
        topics: [
          'SAST and DAST classification',
          'Security scan finding analysis',
          'Vulnerability remediation prioritization',
        ],
      },
      {
        slug: 'devsecops-container-security',
        name: 'Container Security',
        phase: 'Container Protection',
        description: 'Review Dockerfile instructions and container security policies.',
        technologySlug: 'python',
        topics: [
          'Insecure Dockerfile instruction detection',
          'Container image policy validation',
          'Container misconfiguration identification',
        ],
      },
      {
        slug: 'devsecops-infrastructure-as-code-security',
        name: 'Infrastructure as Code Security',
        phase: 'Infrastructure Security',
        description: 'Assess Terraform and infrastructure definitions against security baselines.',
        technologySlug: 'python',
        topics: [
          'Insecure Terraform configuration detection',
          'IaC security baseline validation',
          'Public resource exposure identification',
        ],
      },
      {
        slug: 'devsecops-kubernetes-deployment-security',
        name: 'Kubernetes and Deployment Security',
        phase: 'Deployment Security',
        description: 'Inspect offline Kubernetes manifests and deployment security controls.',
        technologySlug: 'python',
        topics: [
          'Privileged pod configuration detection',
          'Deployment security policy validation',
          'Kubernetes security context checks',
        ],
      },
      {
        slug: 'devsecops-compliance-monitoring',
        name: 'DevSecOps Compliance and Monitoring',
        phase: 'Compliance and Monitoring',
        description: 'Assess security controls and summarize simulated incidents and security findings.',
        technologySlug: 'python',
        topics: [
          'Security compliance control evaluation',
          'Security incident severity classification',
          'DevSecOps security report generation',
        ],
      },
    ],
  },

  /* =======================================================
     INCIDENT RESPONSE
  ======================================================= */

  {
    stackSlug: 'incident-response',
    modules: [
      {
        slug: 'incident-response-fundamentals',
        name: 'Incident Response Fundamentals',
        phase: 'Foundation',
        description: 'Understand incident response lifecycles, event classification and severity assessment.',
        technologySlug: 'python',
        topics: [
          'Incident severity identification',
          'Security event classification',
          'Incident response phase identification',
        ],
      },
      {
        slug: 'incident-response-detection-triage',
        name: 'Incident Detection and Triage',
        phase: 'Detection and Triage',
        description: 'Triage simulated alerts, prioritize tickets and identify suspicious authentication activity.',
        technologySlug: 'python',
        topics: [
          'Security alert classification',
          'Incident ticket prioritization',
          'Suspicious login activity detection',
        ],
      },
      {
        slug: 'incident-response-analysis',
        name: 'Incident Analysis',
        phase: 'Investigation',
        description: 'Investigate offline authentication logs, indicators of compromise and event relationships.',
        technologySlug: 'python',
        topics: [
          'Authentication log analysis',
          'Indicator of compromise identification',
          'Security event correlation',
        ],
      },
      {
        slug: 'incident-response-containment',
        name: 'Incident Containment',
        phase: 'Containment',
        description: 'Select proportionate containment actions for simulated compromised assets.',
        technologySlug: 'python',
        topics: [
          'Containment strategy selection',
          'Compromised endpoint identification',
          'Network isolation decision validation',
        ],
      },
      {
        slug: 'incident-response-evidence-preservation',
        name: 'Evidence Collection and Preservation',
        phase: 'Digital Evidence',
        description: 'Handle simulated evidence while maintaining integrity and chain of custody.',
        technologySlug: 'python',
        topics: [
          'Digital evidence classification',
          'Evidence integrity validation',
          'Chain of custody verification',
        ],
      },
      {
        slug: 'incident-response-threat-intelligence',
        name: 'Threat Intelligence and IOC Analysis',
        phase: 'Threat Intelligence',
        description: 'Analyze offline indicators and evaluate threat intelligence confidence.',
        technologySlug: 'python',
        topics: [
          'IOC type classification',
          'Known threat indicator matching',
          'Threat intelligence confidence evaluation',
        ],
      },
      {
        slug: 'incident-response-malware-handling',
        name: 'Malware Incident Handling',
        phase: 'Malware Response',
        description: 'Classify simulated malware events and prioritize defensive response.',
        technologySlug: 'python',
        topics: [
          'Malware incident classification',
          'Suspicious file behavior identification',
          'Malware response prioritization',
        ],
      },
      {
        slug: 'incident-response-eradication-recovery',
        name: 'Eradication and Recovery',
        phase: 'Recovery',
        description: 'Plan eradication, validate recovery and monitor for recurrence.',
        technologySlug: 'python',
        topics: [
          'Eradication action selection',
          'System recovery status validation',
          'Post-incident monitoring checks',
        ],
      },
      {
        slug: 'incident-response-communication-escalation',
        name: 'Incident Communication and Escalation',
        phase: 'Communication',
        description: 'Determine escalation, notification and incident reporting requirements.',
        technologySlug: 'python',
        topics: [
          'Incident escalation level determination',
          'Notification priority classification',
          'Incident report field validation',
        ],
      },
      {
        slug: 'incident-response-post-incident-review',
        name: 'Post-Incident Review and Improvement',
        phase: 'Lessons Learned',
        description: 'Assess root causes and response performance using simulated incident data.',
        technologySlug: 'python',
        topics: [
          'Root cause category identification',
          'Response effectiveness evaluation',
          'Incident summary generation',
        ],
      },
    ],
  },

  /* =======================================================
     ETHEREUM SOLIDITY
  ======================================================= */

  {
    stackSlug: 'ethereum-solidity',
    modules: [
      {
        slug: 'evm-fundamentals',
        name: 'Ethereum and EVM Fundamentals',
        phase: 'Foundation',
        description: 'Model accounts, transactions, and deterministic local EVM execution.',
        topics: [
          'Accounts and balances in a local EVM',
          'Transaction value and gas estimation',
          'EVM transaction receipts and status',
        ],
      },
      {
        slug: 'solidity-basics',
        name: 'Solidity Syntax and Data Types',
        phase: 'Programming',
        description: 'Write type-safe Solidity contracts with state variables and functions.',
        topics: [
          'Value types and visibility',
          'Pure versus view functions',
          'Arithmetic and checked operations',
        ],
      },
      {
        slug: 'contract-state',
        name: 'Contract State and Storage',
        phase: 'Smart Contracts',
        description: 'Manage persistent state and distinguish storage from memory and calldata.',
        topics: [
          'State variable updates',
          'Storage mappings and structs',
          'Memory and calldata parameter behavior',
        ],
      },
      {
        slug: 'contract-control-flow',
        name: 'Functions, Modifiers and Errors',
        phase: 'Smart Contracts',
        description: 'Enforce contract behavior using access checks, modifiers and custom errors.',
        topics: [
          'Function inputs and return values',
          'Reusable access-control modifiers',
          'Require, revert and custom errors',
        ],
      },
      {
        slug: 'events-and-logs',
        name: 'Events and Transaction Logs',
        phase: 'EVM Interaction',
        description: 'Emit and decode on-chain events in an isolated EVM.',
        topics: [
          'Event definitions and indexed parameters',
          'Event emission for state transitions',
          'Receipt log decoding',
        ],
      },
      {
        slug: 'contract-composition',
        name: 'Interfaces and Contract Composition',
        phase: 'Architecture',
        description: 'Compose contracts through interfaces, inheritance and library calls.',
        topics: [
          'Contract interfaces and external calls',
          'Inheritance and method overrides',
          'Library functions and usage',
        ],
      },
      {
        slug: 'ether-and-payments',
        name: 'Ether Handling and Payments',
        phase: 'EVM Interaction',
        description: 'Implement controlled deposits, withdrawals and value transfers using simulated ether.',
        topics: [
          'Payable functions and msg.value',
          'Per-account deposit accounting',
          'Safe withdrawal and failed transfer handling',
        ],
      },
      {
        slug: 'contract-deployment',
        name: 'Compilation and Local Deployment',
        phase: 'Tooling',
        description: 'Compile, deploy and interact with contracts on an offline local development chain.',
        topics: [
          'Compiler versions and ABI output',
          'Constructor deployment arguments',
          'Deployment receipts and address validation',
        ],
      },
      {
        slug: 'solidity-testing',
        name: 'Solidity Unit and Integration Testing',
        phase: 'Testing',
        description: 'Verify contract behavior with repeatable local EVM tests.',
        topics: [
          'Happy-path contract assertions',
          'Revert conditions and event assertions',
          'State transitions across multiple accounts',
        ],
      },
      {
        slug: 'solidity-project',
        name: 'Ethereum Smart Contract Capstone',
        phase: 'Projects',
        description: 'Integrate contract design, deployment, tests and defensive coding in a practical local project.',
        topics: [
          'Role-based registry contract',
          'Escrow lifecycle simulation',
          'End-to-end local contract verification',
        ],
      },
    ],
  },

  /* =======================================================
     WEB3 DAPP DEVELOPMENT
  ======================================================= */

  {
    stackSlug: 'web3-dapp-development',
    modules: [
      {
        slug: 'web3-foundations',
        name: 'Web3 Application Foundations',
        phase: 'Foundation',
        description: 'Understand providers, signers, accounts and local-chain configuration.',
        topics: [
          'JSON-RPC methods and chain identity',
          'Read-only provider connections',
          'Account and network validation',
        ],
      },
      {
        slug: 'typescript-ethers',
        name: 'TypeScript and ethers.js',
        phase: 'Programming',
        description: 'Use typed scripts to communicate with locally deployed Ethereum contracts.',
        topics: [
          'BigInt and unit conversion',
          'Typed contract calls',
          'Async error handling for RPC calls',
        ],
      },
      {
        slug: 'wallet-integration',
        name: 'Simulated Wallet Integration',
        phase: 'Wallets',
        description: 'Build a development-only wallet workflow without requesting production credentials.',
        topics: [
          'Local test account selection',
          'Wallet connection state handling',
          'Chain mismatch and account change handling',
        ],
      },
      {
        slug: 'contract-abi',
        name: 'Contract ABIs and Interface Encoding',
        phase: 'Contract Integration',
        description: 'Encode and decode Solidity function calls, outputs and custom errors.',
        topics: [
          'Function selectors and ABI encoding',
          'Decoding contract responses',
          'Decoding revert data',
        ],
      },
      {
        slug: 'contract-reads',
        name: 'Reading Contract State',
        phase: 'Contract Integration',
        description: 'Query contract state efficiently through ethers.js.',
        topics: [
          'Read-only contract calls',
          'Batching reads where supported',
          'State formatting for UI display',
        ],
      },
      {
        slug: 'transactions',
        name: 'Building and Sending Transactions',
        phase: 'Transactions',
        description: 'Submit local testnet transactions and handle confirmations safely.',
        topics: [
          'Transaction request construction',
          'Waiting for transaction receipts',
          'Failed transactions and replacement handling',
        ],
      },
      {
        slug: 'event-indexing',
        name: 'Listening to Events and Logs',
        phase: 'Data Integration',
        description: 'Retrieve and normalize event data from deterministic local-chain fixtures.',
        topics: [
          'Historical event queries',
          'Indexed event filters',
          'Idempotent event processing',
        ],
      },
      {
        slug: 'dapp-frontend',
        name: 'React and Next.js DApp Frontends',
        phase: 'Frontend',
        description: 'Build client interfaces for local smart contract interaction.',
        topics: [
          'Client-side provider lifecycle',
          'Contract reads with loading states',
          'Transaction pending and error states',
        ],
      },
      {
        slug: 'web3-testing',
        name: 'Web3 Integration and UI Testing',
        phase: 'Testing',
        description: 'Test provider interactions, transaction flows and error recovery offline.',
        topics: [
          'Mock JSON-RPC request testing',
          'Local EVM contract integration tests',
          'Wallet disconnect and wrong-network handling',
        ],
      },
      {
        slug: 'dapp-project',
        name: 'Full DApp Capstone',
        phase: 'Projects',
        description: 'Integrate typed contracts, local wallets and a frontend in an offline decentralized application.',
        topics: [
          'Local voting DApp integration',
          'Transaction status and event-driven updates',
          'End-to-end DApp workflow tests',
        ],
      },
    ],
  },

  /* =======================================================
     SMART CONTRACT SECURITY
  ======================================================= */

  {
    stackSlug: 'smart-contract-security',
    modules: [
      {
        slug: 'threat-modeling',
        name: 'Smart Contract Threat Modeling',
        phase: 'Foundation',
        description: 'Recognize trust boundaries, privileged roles and valuable contract assets.',
        topics: [
          'Attack surface identification',
          'Trust and authorization assumptions',
          'Threat scenarios for contract assets',
        ],
      },
      {
        slug: 'access-control-auditing',
        name: 'Access Control Vulnerabilities',
        phase: 'Security Auditing',
        description: 'Find and remediate missing or incorrect authorization checks.',
        topics: [
          'Unprotected privileged functions',
          'Role escalation through incorrect modifiers',
          'Ownership transfer invariant tests',
        ],
      },
      {
        slug: 'reentrancy',
        name: 'Reentrancy Detection and Mitigation',
        phase: 'Security Auditing',
        description: 'Understand callback-driven reentrancy through isolated exploit reproductions.',
        topics: [
          'Reentrant call sequence analysis',
          'Checks-effects-interactions pattern',
          'Reentrancy regression tests',
        ],
      },
      {
        slug: 'external-calls',
        name: 'Unsafe External Calls',
        phase: 'Security Auditing',
        description: 'Assess error propagation and unexpected behavior at contract boundaries.',
        topics: [
          'Unchecked low-level call results',
          'External call failure handling',
          'Unexpected contract fallback behavior',
        ],
      },
      {
        slug: 'arithmetic-precision',
        name: 'Arithmetic, Rounding and Precision',
        phase: 'Security Auditing',
        description: 'Detect incorrect numerical assumptions in token and accounting logic.',
        topics: [
          'Integer rounding vulnerabilities',
          'Fixed-point precision loss',
          'Boundary and overflow behavior',
        ],
      },
      {
        slug: 'signature-security',
        name: 'Signatures and Replay Protection',
        phase: 'Cryptography',
        description: 'Validate signed intents safely in local Ethereum scenarios.',
        topics: [
          'Signature recovery and validation',
          'Nonce and domain separation',
          'Cross-contract replay resistance',
        ],
      },
      {
        slug: 'oracle-security',
        name: 'Price Oracles and Manipulation Risks',
        phase: 'DeFi Security',
        description: 'Evaluate oracle freshness and manipulation risks in simulated markets.',
        topics: [
          'Stale price detection',
          'Spot-price manipulation scenarios',
          'Price deviation circuit breakers',
        ],
      },
      {
        slug: 'security-tooling',
        name: 'Offline Static Analysis and Fuzzing',
        phase: 'Security Tooling',
        description: 'Use offline analysis and property tests to discover smart contract weaknesses.',
        topics: [
          'Static analyzer findings triage',
          'Invariant-based fuzz tests',
          'False-positive validation with unit tests',
        ],
      },
      {
        slug: 'upgradeability',
        name: 'Proxy and Upgrade Security',
        phase: 'Architecture Security',
        description: 'Test storage compatibility and administrative risks of upgradeable contracts.',
        topics: [
          'Proxy admin authorization',
          'Storage layout compatibility',
          'Upgrade initialization safeguards',
        ],
      },
      {
        slug: 'audit-project',
        name: 'Smart Contract Audit Capstone',
        phase: 'Projects',
        description: 'Document, reproduce and remediate vulnerabilities in a local audit target.',
        topics: [
          'Exploit proof-of-concept in a sandbox',
          'Patch validation and regression tests',
          'Severity and evidence-based audit reporting',
        ],
      },
    ],
  },

  /* =======================================================
     DEFI TOKENIZATION
  ======================================================= */

  {
    stackSlug: 'defi-tokenization',
    modules: [
      {
        slug: 'token-fundamentals',
        name: 'Tokenization and Token Economics',
        phase: 'Foundation',
        description: 'Model token units, balances, supply and deterministic local transfers.',
        topics: [
          'Token decimal conversions',
          'Supply allocation invariants',
          'Token balance accounting',
        ],
      },
      {
        slug: 'erc20',
        name: 'ERC-20 Fungible Tokens',
        phase: 'Token Standards',
        description: 'Implement fungible token interfaces, allowances and transfers.',
        topics: [
          'ERC-20 transfer validation',
          'Approval and transferFrom behavior',
          'Mint and burn supply invariants',
        ],
      },
      {
        slug: 'erc721',
        name: 'ERC-721 Non-Fungible Tokens',
        phase: 'Token Standards',
        description: 'Build NFT ownership, minting and approval flows on a local EVM.',
        topics: [
          'Token ownership lookup',
          'Safe mint and transfer checks',
          'NFT operator approvals',
        ],
      },
      {
        slug: 'erc1155',
        name: 'ERC-1155 Multi-Token Contracts',
        phase: 'Token Standards',
        description: 'Implement fungible and non-fungible asset IDs in one token contract.',
        topics: [
          'Per-ID balances',
          'Batch transfers and events',
          'Operator permissions',
        ],
      },
      {
        slug: 'token-access-control',
        name: 'Token Roles and Minting Policies',
        phase: 'Security',
        description: 'Enforce controlled issuance and constrained token administration.',
        topics: [
          'Role-limited minting',
          'Supply caps and pause controls',
          'Permissioned burning and recovery',
        ],
      },
      {
        slug: 'vault-accounting',
        name: 'Token Vaults and Share Accounting',
        phase: 'DeFi Accounting',
        description: 'Implement vault deposits and withdrawals using deterministic share math.',
        topics: [
          'Deposit-to-share conversion',
          'Withdrawal rounding rules',
          'Vault solvency invariants',
        ],
      },
      {
        slug: 'amm-mechanics',
        name: 'Automated Market Maker Mechanics',
        phase: 'DeFi Protocols',
        description: 'Simulate constant-product swaps and reserve tracking offline.',
        topics: [
          'Constant-product swap output',
          'Fee-adjusted reserves',
          'Liquidity pool invariant checks',
        ],
      },
      {
        slug: 'staking-rewards',
        name: 'Staking and Reward Distribution',
        phase: 'DeFi Protocols',
        description: 'Implement time-based staking and proportional reward accounting.',
        topics: [
          'Stake and unstake state transitions',
          'Accrued reward calculation',
          'Double-claim prevention',
        ],
      },
      {
        slug: 'lending-risk',
        name: 'Collateralization and Liquidation',
        phase: 'Risk Management',
        description: 'Model collateral ratios, interest and liquidation in simulated markets.',
        topics: [
          'Collateral ratio calculations',
          'Borrowing limit validation',
          'Liquidation eligibility and settlement',
        ],
      },
      {
        slug: 'defi-project',
        name: 'DeFi Protocol Capstone',
        phase: 'Projects',
        description: 'Test an integrated offline token protocol with accounting and security invariants.',
        topics: [
          'Token-plus-vault integration',
          'Multi-user local EVM scenarios',
          'Invariant and adversarial test suite',
        ],
      },
    ],
  },
];



/* =========================================================

   HELPERS

========================================================= */

export function getRoadmapByStackSlug(
  stackSlug: string,
): StackRoadmap | undefined {
  const normalizedStackSlug = String(stackSlug ?? '')
    .trim()
    .toLowerCase();

  return stackRoadmaps.find(
    (roadmap) =>
      String(roadmap.stackSlug ?? '')
        .trim()
        .toLowerCase() === normalizedStackSlug,
  );
}

export function getRoadmapModule(
  stackSlug: string,
  moduleSlug: string,
) {
  const roadmap = getRoadmapByStackSlug(stackSlug);

  if (!roadmap) {
    return undefined;
  }

  const normalizedModuleSlug = String(moduleSlug ?? '')
    .trim()
    .toLowerCase();

  return roadmap.modules.find(
    (module) =>
      String(module.slug ?? '')
        .trim()
        .toLowerCase() === normalizedModuleSlug,
  );
}






