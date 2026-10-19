import type {
  PracticeLevel,
  TechnologyPracticePath,
} from './types';

/* =========================================================
   PRACTICE PATHS
========================================================= */

export const practicePaths:
  TechnologyPracticePath[] = [

  /* =======================================================
     C PROGRAMMING
  ======================================================= */

  {
    technologySlug: 'c',

    name: 'C Programming',

    shortName: 'C',

    description:
      'Master C programming from basic input and output through arrays, pointers, data structures and advanced problem solving.',

    stages: [

      /* ===================================================
         BEGINNER
      =================================================== */

      {
        slug: 'fundamentals',

        title: 'C Fundamentals',

        description:
          'Start with variables, input/output, data types and basic operators.',

        level: 'Beginner',

        order: 1,

        problemSlugs: [
          'c-hello-world',
          'c-add-two-numbers',
          'c-basic-arithmetic',
          'c-celsius-fahrenheit',
        ],
      },

      {
        slug: 'conditions',

        title: 'Conditions',

        description:
          'Practice decision making using if, else and switch statements.',

        level: 'Beginner',

        order: 2,

        problemSlugs: [
          'c-even-odd',
          'c-positive-negative-zero',
          'c-largest-two',
          'c-largest-three',
        ],
      },

      {
        slug: 'loops',

        title: 'Loops',

        description:
          'Solve repetitive problems using for, while and do-while loops.',

        level: 'Beginner',

        order: 3,

        problemSlugs: [
          'c-sum-first-n',
          'c-multiplication-table',
          'c-factorial',
          'c-prime-number',
        ],
      },

      /* ===================================================
         INTERMEDIATE
      =================================================== */

      {
        slug: 'functions',

        title: 'Functions',

        description:
          'Break programs into reusable functions and understand parameter passing.',

        level: 'Intermediate',

        order: 4,

        problemSlugs: [
          'c-max-using-function',
          'c-prime-using-function',
          'c-gcd-using-function',
        ],
      },

      {
        slug: 'arrays',

        title: 'Arrays',

        description:
          'Process collections of values using one-dimensional arrays.',

        level: 'Intermediate',

        order: 5,

        problemSlugs: [
          'c-array-sum',
          'c-array-maximum',
          'c-array-reverse',
          'c-second-largest',
        ],
      },

      {
        slug: 'search-sort',

        title: 'Searching & Sorting',

        description:
          'Implement foundational searching and sorting algorithms.',

        level: 'Intermediate',

        order: 6,

        problemSlugs: [
          'c-linear-search',
          'c-bubble-sort',
          'c-binary-search',
        ],
      },

      {
        slug: 'strings',

        title: 'Strings',

        description:
          'Manipulate character arrays and solve common string problems.',

        level: 'Intermediate',

        order: 7,

        problemSlugs: [
          'c-string-length',
          'c-string-reverse',
          'c-palindrome-string',
        ],
      },

      /* ===================================================
         ADVANCED
      =================================================== */

      {
        slug: 'pointers',

        title: 'Pointers',

        description:
          'Understand addresses, pointer operations and pointer-based functions.',

        level: 'Advanced',

        order: 8,

        problemSlugs: [
          'c-swap-pointers',
          'c-array-using-pointer',
        ],
      },

      {
        slug:
          'advanced-problem-solving',

        title:
          'Advanced Problem Solving',

        description:
          'Apply C fundamentals to algorithmic programming challenges.',

        level: 'Advanced',

        order: 9,

        problemSlugs: [
          'c-missing-number',
          'c-maximum-subarray',
        ],
      },
    ],
  },

  /* =======================================================
     C++ PROGRAMMING
  ======================================================= */

  {
    technologySlug: 'cpp',

    name: 'C++ Programming',

    shortName: 'C++',

    description:
      'Master C++ programming from basic syntax and input/output through arrays, strings, pointers, references, algorithms and advanced problem solving.',

    stages: [

      /* ===================================================
         BEGINNER
      =================================================== */

      {
        slug:
          'cpp-fundamentals',

        title:
          'C++ Fundamentals',

        description:
          'Start with C++ syntax, variables, input/output, data types and basic operators.',

        level: 'Beginner',

        order: 1,

        problemSlugs: [
          'cpp-hello-world',
          'cpp-add-two-numbers',
          'cpp-basic-arithmetic',
          'cpp-celsius-fahrenheit',
        ],
      },

      {
        slug:
          'cpp-conditions',

        title:
          'Conditions',

        description:
          'Practice decision making using if, else and comparison operators in C++.',

        level: 'Beginner',

        order: 2,

        problemSlugs: [
          'cpp-even-odd',
          'cpp-positive-negative-zero',
          'cpp-largest-two',
          'cpp-largest-three',
        ],
      },

      {
        slug:
          'cpp-loops',

        title:
          'Loops',

        description:
          'Solve repetitive problems using for, while and do-while loops.',

        level: 'Beginner',

        order: 3,

        problemSlugs: [
          'cpp-sum-first-n',
          'cpp-multiplication-table',
          'cpp-factorial',
          'cpp-prime-number',
        ],
      },

      /* ===================================================
         INTERMEDIATE
      =================================================== */

      {
        slug:
          'cpp-functions',

        title:
          'Functions',

        description:
          'Create reusable C++ functions and practice parameters and return values.',

        level:
          'Intermediate',

        order: 4,

        problemSlugs: [
          'cpp-max-using-function',
          'cpp-prime-using-function',
          'cpp-gcd-using-function',
        ],
      },

      {
        slug:
          'cpp-arrays',

        title:
          'Arrays',

        description:
          'Store and process collections of values using arrays and vectors.',

        level:
          'Intermediate',

        order: 5,

        problemSlugs: [
          'cpp-array-sum',
          'cpp-array-maximum',
          'cpp-array-reverse',
          'cpp-second-largest',
        ],
      },

      {
        slug:
          'cpp-search-sort',

        title:
          'Searching & Sorting',

        description:
          'Implement common searching and sorting algorithms in C++.',

        level:
          'Intermediate',

        order: 6,

        problemSlugs: [
          'cpp-linear-search',
          'cpp-bubble-sort',
          'cpp-binary-search',
        ],
      },

      {
        slug:
          'cpp-strings',

        title:
          'Strings',

        description:
          'Practice C++ string processing and common string problems.',

        level:
          'Intermediate',

        order: 7,

        problemSlugs: [
          'cpp-string-length',
          'cpp-string-reverse',
          'cpp-palindrome-string',
        ],
      },

      /* ===================================================
         ADVANCED
      =================================================== */

      {
        slug:
          'cpp-pointers',

        title:
          'Pointers & References',

        description:
          'Understand pointers, memory access, references and pointer-based operations.',

        level: 'Advanced',

        order: 8,

        problemSlugs: [
          'cpp-swap-pointers',
          'cpp-array-using-pointer',
        ],
      },

      {
        slug:
          'cpp-advanced-problem-solving',

        title:
          'Advanced Problem Solving',

        description:
          'Apply C++ fundamentals and algorithms to advanced programming challenges.',

        level: 'Advanced',

        order: 9,

        problemSlugs: [
          'cpp-missing-number',
          'cpp-maximum-subarray',
        ],
      },
    ],
  },

  /* =======================================================
     JAVASCRIPT PROGRAMMING
  ======================================================= */

  {
    technologySlug:
      'javascript',

    name:
      'JavaScript Programming',

    shortName:
      'JavaScript',

    description:
      'Master JavaScript from basic syntax and control flow through arrays, strings, objects and advanced algorithmic problem solving.',

    stages: [

      /* ===================================================
         BEGINNER
      =================================================== */

      {
        slug:
          'javascript-fundamentals',

        title:
          'JavaScript Fundamentals',

        description:
          'Start with JavaScript syntax, output, input and basic arithmetic.',

        level:
          'Beginner',

        order:
          1,

        problemSlugs: [
          'javascript-hello-world',
          'javascript-add-two-numbers',
        ],
      },

      {
        slug:
          'javascript-conditions',

        title:
          'Conditions',

        description:
          'Practice decision making using conditions, comparisons and logical operators.',

        level:
          'Beginner',

        order:
          2,

        problemSlugs: [
          'javascript-even-odd',
          'javascript-largest-three',
        ],
      },

      {
        slug:
          'javascript-loops',

        title:
          'Loops',

        description:
          'Solve repetitive calculations using JavaScript loops.',

        level:
          'Beginner',

        order:
          3,

        problemSlugs: [
          'javascript-sum-first-n',
          'javascript-factorial',
        ],
      },

      /* ===================================================
         INTERMEDIATE
      =================================================== */

      {
        slug:
          'javascript-arrays',

        title:
          'Arrays',

        description:
          'Store, traverse and process collections of values using JavaScript arrays.',

        level:
          'Intermediate',

        order:
          4,

        problemSlugs: [
          'javascript-array-sum',
          'javascript-array-maximum',
        ],
      },

      {
        slug:
          'javascript-strings',

        title:
          'Strings',

        description:
          'Process and manipulate text using JavaScript string operations.',

        level:
          'Intermediate',

        order:
          5,

        problemSlugs: [
          'javascript-string-reverse',
          'javascript-palindrome',
        ],
      },

      {
        slug:
          'javascript-objects-maps',

        title:
          'Objects & Maps',

        description:
          'Use objects, maps and sorting to process structured data.',

        level:
          'Intermediate',

        order:
          6,

        problemSlugs: [
          'javascript-word-frequency',
        ],
      },

      /* ===================================================
         ADVANCED
      =================================================== */

      {
        slug:
          'javascript-advanced-problem-solving',

        title:
          'Advanced Problem Solving',

        description:
          'Apply JavaScript data structures and algorithms to advanced programming challenges.',

        level:
          'Advanced',

        order:
          7,

        problemSlugs: [
          'javascript-maximum-subarray',
        ],
      },
    ],
  },

  /* =======================================================
     PYTHON PROGRAMMING
  ======================================================= */

  {
    technologySlug:
      'python',

    name:
      'Python Programming',

    shortName:
      'Python',

    description:
      'Build a strong Python foundation for backend development and Django using syntax, conditions, loops, lists, strings, dictionaries, classes and application-style data processing.',

    stages: [

      /* ===================================================
         BEGINNER
      =================================================== */

      {
        slug:
          'python-fundamentals',

        title:
          'Python Fundamentals',

        description:
          'Start with Python syntax, output, input, variables and basic arithmetic.',

        level:
          'Beginner',

        order:
          1,

        problemSlugs: [
          'python-hello-world',
          'python-add-two-numbers',
        ],
      },

      {
        slug:
          'python-conditions',

        title:
          'Conditions',

        description:
          'Practice decision making using comparisons, modulo operations and conditional statements.',

        level:
          'Beginner',

        order:
          2,

        problemSlugs: [
          'python-even-odd',
          'python-largest-three',
        ],
      },

      {
        slug:
          'python-loops',

        title:
          'Loops & Number Processing',

        description:
          'Use loops and accumulation patterns to solve common number-processing problems.',

        level:
          'Beginner',

        order:
          3,

        problemSlugs: [
          'python-sum-first-n',
          'python-factorial',
        ],
      },

      /* ===================================================
         INTERMEDIATE
      =================================================== */

      {
        slug:
          'python-lists',

        title:
          'Lists',

        description:
          'Store, traverse and process collections of values using Python lists.',

        level:
          'Intermediate',

        order:
          4,

        problemSlugs: [
          'python-list-sum',
          'python-list-maximum',
        ],
      },

      {
        slug:
          'python-strings-dictionaries',

        title:
          'Strings & Dictionaries',

        description:
          'Manipulate text and use dictionaries to count and organize application data.',

        level:
          'Intermediate',

        order:
          5,

        problemSlugs: [
          'python-string-reverse',
          'python-word-frequency',
        ],
      },

      /* ===================================================
         ADVANCED
      =================================================== */

      {
        slug:
          'python-oop',

        title:
          'Object-Oriented Python',

        description:
          'Create classes, objects, constructors and instance methods for reusable application logic.',

        level:
          'Advanced',

        order:
          6,

        problemSlugs: [
          'python-student-class',
        ],
      },

      {
        slug:
          'python-application-patterns',

        title:
          'Python Application Patterns',

        description:
          'Combine lists, dictionaries, loops and filtering to process structured application data.',

        level:
          'Advanced',

        order:
          7,

        problemSlugs: [
          'python-user-records',
        ],
      },
    ],
  },


  /* =======================================================
     JAVA PROGRAMMING
  ======================================================= */

  {
    technologySlug:
      'java',

    name:
      'Java Programming',

    shortName:
      'Java',

    description:
      'Build a strong Java foundation using syntax, conditions, loops, arrays, strings, classes, objects and application-style data processing.',

    stages: [

      /* ===================================================
         BEGINNER
      =================================================== */

      {
        slug:
          'java-fundamentals',

        title:
          'Java Fundamentals',

        description:
          'Start with Java syntax, output, input, variables and basic arithmetic.',

        level:
          'Beginner',

        order:
          1,

        problemSlugs: [
          'java-hello-world',
          'java-add-two-numbers',
        ],
      },

      {
        slug:
          'java-conditions',

        title:
          'Conditions',

        description:
          'Practice decision making using comparisons, modulo operations and conditional statements.',

        level:
          'Beginner',

        order:
          2,

        problemSlugs: [
          'java-even-odd',
          'java-largest-three',
        ],
      },

      {
        slug:
          'java-loops',

        title:
          'Loops & Number Processing',

        description:
          'Use loops and accumulation patterns to solve common number-processing problems.',

        level:
          'Beginner',

        order:
          3,

        problemSlugs: [
          'java-sum-first-n',
          'java-factorial',
        ],
      },

      /* ===================================================
         INTERMEDIATE
      =================================================== */

      {
        slug:
          'java-arrays',

        title:
          'Arrays',

        description:
          'Store, traverse and process collections of values using Java arrays.',

        level:
          'Intermediate',

        order:
          4,

        problemSlugs: [
          'java-array-sum',
          'java-array-maximum',
        ],
      },

      {
        slug:
          'java-strings-collections',

        title:
          'Strings & Data Processing',

        description:
          'Manipulate text and process repeated values using Java string and collection patterns.',

        level:
          'Intermediate',

        order:
          5,

        problemSlugs: [
          'java-string-reverse',
          'java-word-frequency',
        ],
      },

      /* ===================================================
         ADVANCED
      =================================================== */

      {
        slug:
          'java-oop',

        title:
          'Object-Oriented Java',

        description:
          'Create classes, objects, constructors and methods for reusable application logic.',

        level:
          'Advanced',

        order:
          6,

        problemSlugs: [
          'java-student-class',
        ],
      },

      {
        slug:
          'java-application-patterns',

        title:
          'Java Application Patterns',

        description:
          'Combine classes, arrays, loops and structured records to solve application-style Java problems.',

        level:
          'Advanced',

        order:
          7,

        problemSlugs: [
          'java-student-records',
        ],
      },
    ],
  },

  /* =======================================================
     C# PROGRAMMING
  ======================================================= */

  {
    technologySlug: 'csharp',

    name: 'C# Programming',

    shortName: 'C#',

    description:
      'Build a strong C# foundation for .NET development using syntax, conditions, loops, arrays, strings, classes, objects, collections and application-style data processing.',

    stages: [
      {
        slug: 'csharp-fundamentals',
        title: 'C# Fundamentals',
        description:
          'Start with C# syntax, console output, input, variables and basic arithmetic.',
        level: 'Beginner',
        order: 1,
        problemSlugs: [
          'csharp-hello-world',
          'csharp-add-two-numbers',
        ],
      },

      {
        slug: 'csharp-conditions',
        title: 'Conditions',
        description:
          'Practice decision making using comparisons, modulo operations and conditional statements.',
        level: 'Beginner',
        order: 2,
        problemSlugs: [
          'csharp-even-odd',
          'csharp-largest-three',
        ],
      },

      {
        slug: 'csharp-loops',
        title: 'Loops & Number Processing',
        description:
          'Use loops and accumulation patterns to solve common number-processing problems.',
        level: 'Beginner',
        order: 3,
        problemSlugs: [
          'csharp-sum-first-n',
          'csharp-factorial',
        ],
      },

      {
        slug: 'csharp-arrays',
        title: 'Arrays',
        description:
          'Store, traverse and process collections of values using C# arrays.',
        level: 'Intermediate',
        order: 4,
        problemSlugs: [
          'csharp-array-sum',
          'csharp-array-maximum',
        ],
      },

      {
        slug: 'csharp-strings-collections',
        title: 'Strings & Data Processing',
        description:
          'Manipulate text and process repeated values using C# string and collection patterns.',
        level: 'Intermediate',
        order: 5,
        problemSlugs: [
          'csharp-string-reverse',
          'csharp-word-frequency',
        ],
      },

      {
        slug: 'csharp-oop',
        title: 'Object-Oriented C#',
        description:
          'Create classes, objects, constructors and methods for reusable application logic.',
        level: 'Advanced',
        order: 6,
        problemSlugs: [
          'csharp-student-class',
        ],
      },

      {
        slug: 'csharp-application-patterns',
        title: 'C# Application Patterns',
        description:
          'Combine classes, collections, loops and structured records to solve application-style C# problems.',
        level: 'Advanced',
        order: 7,
        problemSlugs: [
          'csharp-student-records',
        ],
      },
    ],
  },


  /* =======================================================
     ASP.NET CORE
  ======================================================= */

  {
    technologySlug: 'aspnetcore',

    name: 'ASP.NET Core',

    shortName: 'ASP.NET Core',

    description:
      'Practice ASP.NET Core backend development using minimal APIs, routing, route and query parameters, request bodies, model binding, services, dependency injection, validation, CRUD APIs and middleware.',

    stages: [
      {
        slug: 'aspnetcore-fundamentals',

        title: 'API Fundamentals',

        description:
          'Learn ASP.NET Core fundamentals by creating basic HTTP endpoints and routes.',

        level: 'Beginner',

        order: 1,

        problemSlugs: [
          'aspnetcore-hello-api',
          'aspnetcore-routing',
        ],
      },

      {
        slug: 'aspnetcore-request-data',

        title: 'Route, Query & Request Data',

        description:
          'Work with route parameters, query parameters, POST endpoints and request model binding.',

        level: 'Beginner',

        order: 2,

        problemSlugs: [
          'aspnetcore-route-parameter',
          'aspnetcore-query-parameter',
          'aspnetcore-post-endpoint',
          'aspnetcore-model-binding',
        ],
      },

      {
        slug: 'aspnetcore-services-di',

        title: 'Services & Dependency Injection',

        description:
          'Create application services and use ASP.NET Core dependency injection to connect reusable business logic.',

        level: 'Intermediate',

        order: 3,

        problemSlugs: [
          'aspnetcore-service',
          'aspnetcore-dependency-injection',
        ],
      },

      {
        slug: 'aspnetcore-validation-crud',

        title: 'Validation & CRUD APIs',

        description:
          'Validate incoming data and build CRUD-style ASP.NET Core API endpoints.',

        level: 'Intermediate',

        order: 4,

        problemSlugs: [
          'aspnetcore-validation',
          'aspnetcore-crud-api',
        ],
      },

      {
        slug: 'aspnetcore-application-patterns',

        title: 'Middleware & Application APIs',

        description:
          'Apply middleware and API patterns to build more complete ASP.NET Core backend applications.',

        level: 'Advanced',

        order: 5,

        problemSlugs: [
          'aspnetcore-middleware',
          'aspnetcore-product-api',
        ],
      },
    ],
  },


  /* =======================================================
     PHP PROGRAMMING
  ======================================================= */

  {
    technologySlug: 'php',

    name: 'PHP Programming',

    shortName: 'PHP',

    description:
      'Learn PHP programming from basic syntax and input handling through conditions, loops, arrays, strings, functions, object-oriented programming and exception handling.',

    stages: [
      {
        slug: 'php-fundamentals',

        title: 'PHP Fundamentals',

        description:
          'Learn PHP syntax, variables, input handling and basic operations.',

        level: 'Beginner',

        order: 1,

        problemSlugs: [
          'php-hello-world',
          'php-variables',
          'php-user-input',
          'php-add-numbers',
          'php-even-odd',
        ],
      },

      {
        slug: 'php-control-flow',

        title: 'Control Flow',

        description:
          'Practice conditions and loops using PHP.',

        level: 'Beginner',

        order: 2,

        problemSlugs: [
          'php-largest-number',
          'php-for-loop',
        ],
      },

      {
        slug: 'php-arrays-strings',

        title: 'Arrays & Strings',

        description:
          'Work with PHP arrays and string manipulation.',

        level: 'Intermediate',

        order: 3,

        problemSlugs: [
          'php-array-sum',
          'php-reverse-string',
        ],
      },

      {
        slug: 'php-functions',

        title: 'Functions',

        description:
          'Create reusable PHP functions with parameters and return values.',

        level: 'Intermediate',

        order: 4,

        problemSlugs: [
          'php-function',
        ],
      },

      {
        slug: 'php-oop-exceptions',

        title: 'OOP & Exception Handling',

        description:
          'Practice PHP classes, objects and exception handling.',

        level: 'Advanced',

        order: 5,

        problemSlugs: [
          'php-class',
          'php-exception-handling',
        ],
      },
    ],
  },


  /* =======================================================
     RUBY PROGRAMMING
  ======================================================= */

  {
    technologySlug: 'ruby',

    name: 'Ruby Programming',

    shortName: 'Ruby',

    description:
      'Learn Ruby programming from basic syntax and input/output through conditions, loops and number processing.',

    stages: [
      {
        slug: 'ruby-fundamentals',
        title: 'Ruby Fundamentals',
        description:
          'Start with Ruby syntax, console output, input, variables and basic arithmetic.',
        level: 'Beginner',
        order: 1,
        problemSlugs: [
          'ruby-hello-world',
          'ruby-add-two-numbers',
        ],
      },

      {
        slug: 'ruby-conditions',
        title: 'Conditions',
        description:
          'Practice decision making using comparisons, modulo operations and Ruby conditional statements.',
        level: 'Beginner',
        order: 2,
        problemSlugs: [
          'ruby-even-odd',
          'ruby-positive-negative-zero',
        ],
      },

      {
        slug: 'ruby-loops',
        title: 'Loops & Number Processing',
        description:
          'Use Ruby loops and ranges to solve common number-processing problems.',
        level: 'Beginner',
        order: 3,
        problemSlugs: [
          'ruby-factorial',
        ],
      },
    ],
  },



  /* =======================================================
     SWIFT PROGRAMMING
  ======================================================= */

  {
    technologySlug: 'swift',

    name: 'Swift Programming',

    shortName: 'Swift',

    description:
      'Learn Swift programming from basic syntax and input/output through conditions, loops and number processing.',

    stages: [
      {
        slug: 'swift-fundamentals',
        title: 'Swift Fundamentals',
        description:
          'Start with Swift syntax, console output, input, variables and basic arithmetic.',
        level: 'Beginner',
        order: 1,
        problemSlugs: [
          'swift-hello-world',
          'swift-add-two-numbers',
        ],
      },

      {
        slug: 'swift-conditions',
        title: 'Conditions',
        description:
          'Practice decision making using comparisons, modulo operations and Swift conditional statements.',
        level: 'Beginner',
        order: 2,
        problemSlugs: [
          'swift-even-odd',
          'swift-positive-negative-zero',
        ],
      },

      {
        slug: 'swift-loops',
        title: 'Loops & Number Processing',
        description:
          'Use Swift loops and ranges to solve common number-processing problems.',
        level: 'Beginner',
        order: 3,
        problemSlugs: [
          'swift-factorial',
        ],
      },
    ],
  },

  /* =======================================================
     POSTGRESQL
  ======================================================= */

  {
    technologySlug: 'postgresql',

    name: 'PostgreSQL',

    shortName: 'PostgreSQL',

    description:
      'Learn PostgreSQL and relational database fundamentals through schema creation, data operations, filtering, aggregation, joins, views, indexes and transactions.',

    stages: [
      {
        slug: 'postgresql-foundations',
        title: 'Database & Table Foundations',
        description:
          'Start with PostgreSQL database concepts, table creation, data types, constraints and basic schema design.',
        level: 'Beginner',
        order: 1,
        problemSlugs: [
          'postgresql-create-database',
          'postgresql-create-table',
        ],
      },
      {
        slug: 'postgresql-data-operations',
        title: 'Insert & Query Data',
        description:
          'Insert records and retrieve relational data using SELECT and WHERE clauses.',
        level: 'Beginner',
        order: 2,
        problemSlugs: [
          'postgresql-insert-records',
          'postgresql-select-records',
          'postgresql-where-filter',
        ],
      },
      {
        slug: 'postgresql-data-modification',
        title: 'Update & Delete Data',
        description:
          'Modify and remove database records safely using UPDATE and DELETE statements.',
        level: 'Intermediate',
        order: 3,
        problemSlugs: [
          'postgresql-update-records',
          'postgresql-delete-records',
        ],
      },
      {
        slug: 'postgresql-aggregation',
        title: 'Aggregation & Grouping',
        description:
          'Analyze relational data using aggregate functions and GROUP BY.',
        level: 'Intermediate',
        order: 4,
        problemSlugs: [
          'postgresql-aggregate-functions',
          'postgresql-group-by',
        ],
      },
      {
        slug: 'postgresql-joins',
        title: 'Table Relationships & Joins',
        description:
          'Combine related tables using PostgreSQL JOIN operations and relational keys.',
        level: 'Intermediate',
        order: 5,
        problemSlugs: [
          'postgresql-join-tables',
        ],
      },
      {
        slug: 'postgresql-advanced-queries',
        title: 'Advanced Queries',
        description:
          'Solve advanced PostgreSQL problems using subqueries and reusable database views.',
        level: 'Advanced',
        order: 6,
        problemSlugs: [
          'postgresql-subqueries',
          'postgresql-views',
        ],
      },
      {
        slug: 'postgresql-performance-transactions',
        title: 'Indexes & Transactions',
        description:
          'Practice PostgreSQL indexing and transactional operations for reliable database applications.',
        level: 'Advanced',
        order: 7,
        problemSlugs: [
          'postgresql-indexes',
          'postgresql-transactions',
        ],
      },
    ],
  },


  /* =======================================================
     MYSQL
  ======================================================= */

  {
    technologySlug: 'mysql',

    name: 'MySQL',

    shortName: 'MySQL',

    description:
      'Learn MySQL and relational database fundamentals through database and table creation, data operations, filtering, aggregation, joins, subqueries, views, indexes and transactions.',

    stages: [
      {
        slug: 'mysql-foundations',
        title: 'Database & Table Foundations',
        description:
          'Start with MySQL database concepts, table creation, data types, constraints and basic schema design.',
        level: 'Beginner',
        order: 1,
        problemSlugs: [
          'mysql-create-database',
          'mysql-create-table',
        ],
      },
      {
        slug: 'mysql-data-operations',
        title: 'Insert & Query Data',
        description:
          'Insert records and retrieve relational data using SELECT and WHERE clauses.',
        level: 'Beginner',
        order: 2,
        problemSlugs: [
          'mysql-insert-records',
          'mysql-select-records',
          'mysql-where-filter',
        ],
      },
      {
        slug: 'mysql-data-modification',
        title: 'Update & Delete Data',
        description:
          'Modify and remove database records safely using UPDATE and DELETE statements.',
        level: 'Intermediate',
        order: 3,
        problemSlugs: [
          'mysql-update-records',
          'mysql-delete-records',
        ],
      },
      {
        slug: 'mysql-aggregation',
        title: 'Aggregation & Grouping',
        description:
          'Analyze relational data using aggregate functions and GROUP BY.',
        level: 'Intermediate',
        order: 4,
        problemSlugs: [
          'mysql-aggregate-functions',
          'mysql-group-by',
        ],
      },
      {
        slug: 'mysql-joins',
        title: 'Table Relationships & Joins',
        description:
          'Combine related tables using MySQL JOIN operations and relational keys.',
        level: 'Intermediate',
        order: 5,
        problemSlugs: [
          'mysql-join-tables',
        ],
      },
      {
        slug: 'mysql-advanced-queries',
        title: 'Advanced Queries',
        description:
          'Solve advanced MySQL problems using subqueries and reusable database views.',
        level: 'Advanced',
        order: 6,
        problemSlugs: [
          'mysql-subqueries',
          'mysql-views',
        ],
      },
      {
        slug: 'mysql-performance-transactions',
        title: 'Indexes & Transactions',
        description:
          'Practice MySQL indexing and transactional operations for reliable database applications.',
        level: 'Advanced',
        order: 7,
        problemSlugs: [
          'mysql-indexes',
          'mysql-transactions',
        ],
      },
    ],
  },


  /* =======================================================
     SQL SERVER
  ======================================================= */

  {
    technologySlug: 'sqlserver',

    name: 'SQL Server',

    shortName: 'SQL Server',

    description:
      'Learn Microsoft SQL Server and relational database fundamentals through database and table creation, data operations, filtering, aggregation, joins, subqueries, views, indexes and transactions.',

    stages: [
      {
        slug: 'sqlserver-foundations',
        title: 'Database & Table Foundations',
        description:
          'Start with SQL Server database concepts, table creation, data types, constraints and basic schema design.',
        level: 'Beginner',
        order: 1,
        problemSlugs: [
          'sqlserver-create-database',
          'sqlserver-create-table',
        ],
      },
      {
        slug: 'sqlserver-data-operations',
        title: 'Insert & Query Data',
        description:
          'Insert records and retrieve relational data using SELECT and WHERE clauses.',
        level: 'Beginner',
        order: 2,
        problemSlugs: [
          'sqlserver-insert-records',
          'sqlserver-select-records',
          'sqlserver-where-filter',
        ],
      },
      {
        slug: 'sqlserver-data-modification',
        title: 'Update & Delete Data',
        description:
          'Modify and remove database records safely using UPDATE and DELETE statements.',
        level: 'Intermediate',
        order: 3,
        problemSlugs: [
          'sqlserver-update-records',
          'sqlserver-delete-records',
        ],
      },
      {
        slug: 'sqlserver-aggregation',
        title: 'Aggregation & Grouping',
        description:
          'Analyze relational data using aggregate functions and GROUP BY.',
        level: 'Intermediate',
        order: 4,
        problemSlugs: [
          'sqlserver-aggregate-functions',
          'sqlserver-group-by',
        ],
      },
      {
        slug: 'sqlserver-joins',
        title: 'Table Relationships & Joins',
        description:
          'Combine related tables using SQL Server JOIN operations and relational keys.',
        level: 'Intermediate',
        order: 5,
        problemSlugs: [
          'sqlserver-join-tables',
        ],
      },
      {
        slug: 'sqlserver-advanced-queries',
        title: 'Advanced Queries',
        description:
          'Solve advanced SQL Server problems using subqueries and reusable database views.',
        level: 'Advanced',
        order: 6,
        problemSlugs: [
          'sqlserver-subqueries',
          'sqlserver-views',
        ],
      },
      {
        slug: 'sqlserver-performance-transactions',
        title: 'Indexes & Transactions',
        description:
          'Practice SQL Server indexing and transactional operations for reliable database applications.',
        level: 'Advanced',
        order: 7,
        problemSlugs: [
          'sqlserver-indexes',
          'sqlserver-transactions',
        ],
      },
    ],
  },

  /* =======================================================
     MONGODB
  ======================================================= */

  {
    technologySlug: 'mongodb',

    name: 'MongoDB',

    shortName: 'MongoDB',

    description:
      'Learn MongoDB document database fundamentals through databases, collections, document operations, filtering, updates, deletes, projection, sorting, aggregation, indexes and collection relationships.',

    stages: [
      {
        slug: 'mongodb-foundations',
        title: 'Database & Collection Foundations',
        description:
          'Start with MongoDB database concepts, database selection and collection creation.',
        level: 'Beginner',
        order: 1,
        problemSlugs: [
          'mongodb-create-database',
          'mongodb-create-collection',
        ],
      },
      {
        slug: 'mongodb-document-operations',
        title: 'Insert & Query Documents',
        description:
          'Insert documents and retrieve MongoDB data using find and query filters.',
        level: 'Beginner',
        order: 2,
        problemSlugs: [
          'mongodb-insert-one',
          'mongodb-insert-many',
          'mongodb-find-documents',
          'mongodb-filter-documents',
        ],
      },
      {
        slug: 'mongodb-query-operators',
        title: 'Query Operators & Projection',
        description:
          'Filter and shape MongoDB query results using comparison operators and projection.',
        level: 'Intermediate',
        order: 3,
        problemSlugs: [
          'mongodb-comparison-operators',
          'mongodb-projection',
        ],
      },
      {
        slug: 'mongodb-data-modification',
        title: 'Update & Delete Documents',
        description:
          'Modify and remove MongoDB documents safely using update and delete operations.',
        level: 'Intermediate',
        order: 4,
        problemSlugs: [
          'mongodb-update-one',
          'mongodb-update-many',
          'mongodb-delete-one',
        ],
      },
      {
        slug: 'mongodb-sorting-results',
        title: 'Sorting & Limiting Results',
        description:
          'Control MongoDB query results using sorting and limiting operations.',
        level: 'Intermediate',
        order: 5,
        problemSlugs: [
          'mongodb-sort-limit',
        ],
      },
      {
        slug: 'mongodb-aggregation',
        title: 'Aggregation Pipelines',
        description:
          'Analyze MongoDB documents using aggregation pipelines, grouping and calculated values.',
        level: 'Advanced',
        order: 6,
        problemSlugs: [
          'mongodb-aggregation',
        ],
      },
      {
        slug: 'mongodb-indexes-relationships',
        title: 'Indexes & Collection Relationships',
        description:
          'Practice MongoDB indexing and combine related collections using aggregation lookup operations.',
        level: 'Advanced',
        order: 7,
        problemSlugs: [
          'mongodb-indexes',
          'mongodb-lookup',
        ],
      },
    ],
  },


  /* =======================================================
     REDIS
  ======================================================= */

  {
    technologySlug: 'redis',

    name: 'Redis',

    shortName: 'Redis',

    description:
      'Learn Redis fundamentals through strings, keys, counters, expiration, hashes, lists, sets, sorted sets and transactions.',

    stages: [
      {
        slug: 'redis-string-foundations',
        title: 'Strings & Key Foundations',
        description:
          'Start with Redis key-value fundamentals using SET, GET, EXISTS and DEL.',
        level: 'Beginner',
        order: 1,
        problemSlugs: [
          'redis-set-value',
          'redis-get-value',
          'redis-key-exists',
          'redis-delete-key',
        ],
      },
      {
        slug: 'redis-counters',
        title: 'Counters',
        description:
          'Practice atomic numeric operations using Redis counters.',
        level: 'Beginner',
        order: 2,
        problemSlugs: [
          'redis-increment-counter',
        ],
      },
      {
        slug: 'redis-expiration',
        title: 'Expiration & TTL',
        description:
          'Manage temporary Redis data by applying expiration times to keys.',
        level: 'Intermediate',
        order: 3,
        problemSlugs: [
          'redis-key-expiration',
        ],
      },
      {
        slug: 'redis-hashes',
        title: 'Hashes',
        description:
          'Store and retrieve structured records using Redis hashes.',
        level: 'Intermediate',
        order: 4,
        problemSlugs: [
          'redis-hash',
          'redis-hgetall',
        ],
      },
      {
        slug: 'redis-lists',
        title: 'Lists',
        description:
          'Store ordered values and retrieve list ranges using Redis lists.',
        level: 'Intermediate',
        order: 5,
        problemSlugs: [
          'redis-list',
          'redis-list-range',
        ],
      },
      {
        slug: 'redis-sets-sorted-sets',
        title: 'Sets & Sorted Sets',
        description:
          'Practice unique collections, scored data and leaderboard ranking with Redis sets and sorted sets.',
        level: 'Advanced',
        order: 6,
        problemSlugs: [
          'redis-set-members',
          'redis-sorted-set',
          'redis-leaderboard-ranking',
        ],
      },
      {
        slug: 'redis-transactions',
        title: 'Transactions',
        description:
          'Execute related Redis operations atomically using MULTI and EXEC.',
        level: 'Advanced',
        order: 7,
        problemSlugs: [
          'redis-transactions',
        ],
      },
    ],
  },


  /* =======================================================
     TYPESCRIPT PROGRAMMING
  ======================================================= */

  {
    technologySlug:
      'typescript',

    name:
      'TypeScript Programming',

    shortName:
      'TypeScript',

    description:
      'Build a strong TypeScript foundation for React, Next.js, Node.js and NestJS using typed variables, functions, interfaces, unions, generics, classes and application-style patterns.',

    stages: [

      /* ===================================================
         BEGINNER
      =================================================== */

      {
        slug:
          'typescript-fundamentals',

        title:
          'TypeScript Fundamentals',

        description:
          'Learn primitive types, typed variables, functions, arrays and object typing.',

        level:
          'Beginner',

        order:
          1,

        problemSlugs: [
          'typescript-basic-types',
          'typescript-function-types',
          'typescript-arrays-objects',
        ],
      },

      /* ===================================================
         INTERMEDIATE
      =================================================== */

      {
        slug:
          'typescript-type-modeling',

        title:
          'Interfaces & Type Modeling',

        description:
          'Model application data using interfaces, type aliases and union types.',

        level:
          'Intermediate',

        order:
          2,

        problemSlugs: [
          'typescript-interfaces',
          'typescript-unions',
        ],
      },

      {
        slug:
          'typescript-generics-classes',

        title:
          'Generics & Classes',

        description:
          'Create reusable generic functions and typed object-oriented structures.',

        level:
          'Intermediate',

        order:
          3,

        problemSlugs: [
          'typescript-generics',
          'typescript-classes',
        ],
      },

      /* ===================================================
         ADVANCED
      =================================================== */

      {
        slug:
          'typescript-application-patterns',

        title:
          'Typed Application Patterns',

        description:
          'Combine interfaces, unions, typed arrays and functions in application-style TypeScript problems.',

        level:
          'Advanced',

        order:
          4,

        problemSlugs: [
          'typescript-user-directory',
        ],
      },
    ],
  },

  /* =======================================================
     NODE.JS PROGRAMMING
  ======================================================= */

  {
    technologySlug:
      'nodejs',

    name:
      'Node.js',

    shortName:
      'Node.js',

    description:
      'Learn server-side JavaScript using Node.js core APIs, input processing, JSON, buffers, paths, URLs, events, crypto and advanced runtime concepts.',

    stages: [

      /* ===================================================
         BEGINNER
      =================================================== */

      {
        slug:
          'nodejs-input-data',

        title:
          'Input & Data Processing',

        description:
          'Learn Node.js standard input handling, string processing and JSON data manipulation.',

        level:
          'Beginner',

        order:
          1,

        problemSlugs: [
          'node-stdin-uppercase',
          'node-word-count',
          'node-json-array-sum',
        ],
      },

      {
        slug:
          'nodejs-core-modules',

        title:
          'Core Modules',

        description:
          'Practice commonly used Node.js core APIs including Buffer and Path.',

        level:
          'Beginner',

        order:
          2,

        problemSlugs: [
          'node-buffer-byte-length',
          'node-path-basename',
          'node-path-extension',
        ],
      },

      /* ===================================================
         INTERMEDIATE
      =================================================== */

      {
        slug:
          'nodejs-url-processing',

        title:
          'URL Processing',

        description:
          'Parse URLs, extract host information and work with query parameters.',

        level:
          'Intermediate',

        order:
          3,

        problemSlugs: [
          'node-url-hostname',
          'node-url-query-param',
        ],
      },

      {
        slug:
          'nodejs-events',

        title:
          'Events & EventEmitter',

        description:
          'Build event-driven Node.js programs using EventEmitter.',

        level:
          'Intermediate',

        order:
          4,

        problemSlugs: [
          'node-event-emitter-message',
          'node-event-emitter-sum',
        ],
      },

      {
        slug:
          'nodejs-utilities',

        title:
          'Security & Core Utilities',

        description:
          'Use built-in Node.js utility modules such as crypto for backend operations.',

        level:
          'Intermediate',

        order:
          5,

        problemSlugs: [
          'node-sha256-hash',
        ],
      },

      /* ===================================================
         ADVANCED
      =================================================== */

      {
        slug:
          'nodejs-streams',

        title:
          'Streams & Advanced Input',

        description:
          'Practice processing larger and multi-line inputs using Node.js stream-oriented concepts.',

        level:
          'Advanced',

        order:
          6,

        problemSlugs: [
          'node-stream-line-count',
        ],
      },
    ],
  },

  /* =======================================================
     HTML & CSS
  ======================================================= */

  {
    technologySlug:
      'html-css',

    name:
      'HTML & CSS',

    shortName:
      'HTML & CSS',

    description:
      'Learn semantic HTML, forms, page structure, responsive CSS, Flexbox and CSS Grid through browser-based practice.',

    stages: [

      /* ===================================================
         BEGINNER
      =================================================== */

      {
        slug:
          'html-foundations',

        title:
          'HTML Foundations',

        description:
          'Build structured web pages using semantic HTML elements, forms and meaningful page sections.',

        level:
          'Beginner',

        order:
          1,

        problemSlugs: [
          'html-profile-page',
          'html-registration-form',
          'html-semantic-blog',
        ],
      },

      /* ===================================================
         INTERMEDIATE
      =================================================== */

      {
        slug:
          'css-responsive-design',

        title:
          'CSS & Responsive Design',

        description:
          'Style web pages using responsive CSS, Flexbox and CSS Grid layouts.',

        level:
          'Intermediate',

        order:
          2,

        problemSlugs: [
          'css-responsive-card',
          'css-flexbox-navbar',
          'css-grid-dashboard',
        ],
      },
    ],
  },

  /* =======================================================
     REACT
  ======================================================= */

  {
    technologySlug:
      'react',

    name:
      'React',

    shortName:
      'React',

    description:
      'Practice React fundamentals, state management, forms, filtering, lists and component interactions.',

    stages: [

      /* ===================================================
         BEGINNER
      =================================================== */

      {
        slug:
          'react-fundamentals',

        title:
          'React Fundamentals',

        description:
          'Learn React components, state, rendering and basic user interactions.',

        level:
          'Beginner',

        order:
          1,

        problemSlugs: [
          'react-counter',
        ],
      },

      /* ===================================================
         INTERMEDIATE
      =================================================== */

      {
        slug:
          'react-state-forms',

        title:
          'State, Forms & Filtering',

        description:
          'Practice useState, form input handling, filtering and state-driven interfaces.',

        level:
          'Intermediate',

        order:
          2,

        problemSlugs: [
          'react-search-products',
          'react-todo',
        ],
      },

      /* ===================================================
         ADVANCED
      =================================================== */

      {
        slug:
          'react-application-patterns',

        title:
          'Interactive Application Patterns',

        description:
          'Build richer React components using lists, filtering, state and user interactions.',

        level:
          'Advanced',

        order:
          3,

        problemSlugs: [
          'react-user-directory',
        ],
      },
    ],
  },

  /* =======================================================
     VUE.JS
  ======================================================= */

  {
    technologySlug: 'vue',
    name: 'Vue.js',
    shortName: 'Vue',
    description:
      'Practice Vue.js fundamentals including components, template interpolation, reactive state, event handling, conditional rendering and list rendering.',
    stages: [
      {
        slug: 'vue-fundamentals',
        title: 'Vue Fundamentals',
        description:
          'Learn Vue components, templates, interpolation and basic rendering.',
        level: 'Beginner',
        order: 1,
        problemSlugs: [
          'vue-hello-world',
          'vue-display-name',
        ],
      },
      {
        slug: 'vue-state-events',
        title: 'State & Event Handling',
        description:
          'Practice reactive state and user interactions using Vue.',
        level: 'Intermediate',
        order: 2,
        problemSlugs: [
          'vue-counter',
          'vue-show-message',
        ],
      },
      {
        slug: 'vue-list-rendering',
        title: 'List Rendering',
        description:
          'Render collections of data using Vue directives and template syntax.',
        level: 'Intermediate',
        order: 3,
        problemSlugs: [
          'vue-render-list',
        ],
      },
    ],
  },

  /* =======================================================
     NEXT.JS
  ======================================================= */

  {
    technologySlug:
      'nextjs',

    name:
      'Next.js',

    shortName:
      'Next.js',

    description:
      'Learn modern Next.js App Router development using typed page components, layouts, navigation, dynamic routes, Server and Client Components, route handlers, data fetching, Server Actions and application-style patterns.',

    stages: [

      /* ===================================================
         BEGINNER
      =================================================== */

      {
        slug:
          'nextjs-app-router-foundations',

        title:
          'App Router Foundations',

        description:
          'Learn Next.js App Router fundamentals by creating pages, layouts, navigation and dynamic routes.',

        level:
          'Beginner',

        order:
          1,

        problemSlugs: [
          'nextjs-page-component',
          'nextjs-root-layout',
          'nextjs-navigation',
          'nextjs-dynamic-route',
        ],
      },

      /* ===================================================
         INTERMEDIATE
      =================================================== */

      {
        slug:
          'nextjs-rendering-components',

        title:
          'Server & Client Components',

        description:
          'Practice server-side rendering patterns, interactive Client Components and URL-driven data using search parameters.',

        level:
          'Intermediate',

        order:
          2,

        problemSlugs: [
          'nextjs-server-component',
          'nextjs-client-component',
          'nextjs-search-params',
        ],
      },

      {
        slug:
          'nextjs-routes-data',

        title:
          'Route Handlers & Data',

        description:
          'Build route handlers and load typed asynchronous data using modern Next.js server-side patterns.',

        level:
          'Intermediate',

        order:
          3,

        problemSlugs: [
          'nextjs-route-handler',
          'nextjs-data-fetching',
        ],
      },

      /* ===================================================
         ADVANCED
      =================================================== */

      {
        slug:
          'nextjs-server-actions-integration',

        title:
          'Server Actions & API Integration',

        description:
          'Use Server Actions, typed application data and server-side integration patterns to build production-style Next.js features.',

        level:
          'Advanced',

        order:
          4,

        problemSlugs: [
          'nextjs-form-action',
          'nextjs-api-integration',
        ],
      },

      {
        slug:
          'nextjs-application-patterns',

        title:
          'Next.js Application Patterns',

        description:
          'Combine App Router, typed data, Server Components, derived values and navigation in a complete dashboard-style experience.',

        level:
          'Advanced',

        order:
          5,

        problemSlugs: [
          'nextjs-dashboard',
        ],
      },
    ],
  },

  /* =======================================================
     NESTJS
  ======================================================= */

  {
    technologySlug:
      'nestjs',

    name:
      'NestJS',

    shortName:
      'NestJS',

    description:
      'Learn backend application development with NestJS using controllers, routes, services, dependency injection, DTOs, validation, modules and application-style APIs.',

    stages: [

      /* ===================================================
         BEGINNER
      =================================================== */

      {
        slug:
          'nestjs-controller-foundations',

        title:
          'Controllers & HTTP Routes',

        description:
          'Learn NestJS controller fundamentals and create basic GET and POST endpoints.',

        level:
          'Beginner',

        order:
          1,

        problemSlugs: [
          'nestjs-basic-controller',
          'nestjs-get-route',
          'nestjs-post-route',
        ],
      },

      /* ===================================================
         INTERMEDIATE
      =================================================== */

      {
        slug:
          'nestjs-route-data',

        title:
          'Route & Query Parameters',

        description:
          'Read dynamic route parameters and query-string values using NestJS decorators.',

        level:
          'Intermediate',

        order:
          2,

        problemSlugs: [
          'nestjs-route-params',
          'nestjs-query-params',
        ],
      },

      {
        slug:
          'nestjs-services-dependency-injection',

        title:
          'Services & Dependency Injection',

        description:
          'Create injectable services and connect controllers to application logic using constructor injection.',

        level:
          'Intermediate',

        order:
          3,

        problemSlugs: [
          'nestjs-service',
          'nestjs-dependency-injection',
        ],
      },

      /* ===================================================
         ADVANCED
      =================================================== */

      {
        slug:
          'nestjs-dto-validation',

        title:
          'DTOs & Validation',

        description:
          'Model request data with DTOs and apply class-validator decorators for robust API validation.',

        level:
          'Advanced',

        order:
          4,

        problemSlugs: [
          'nestjs-create-dto',
          'nestjs-validation',
        ],
      },

      {
        slug:
          'nestjs-modules-application-apis',

        title:
          'Modules & Application APIs',

        description:
          'Combine modules, controllers, services and dependency injection to build application-style NestJS APIs.',

        level:
          'Advanced',

        order:
          5,

        problemSlugs: [
          'nestjs-module',
          'nestjs-users-api',
          'nestjs-course-management-api',
        ],
      },
    ],
  },


  /* =======================================================
     FASTAPI
  ======================================================= */

  {
    technologySlug: 'fastapi',

    name: 'FastAPI',

    shortName: 'FastAPI',

    description:
      'Learn backend API development with FastAPI using routes, path and query parameters, request bodies, Pydantic validation, CRUD operations and application-style REST APIs.',

    stages: [
      {
        slug: 'fastapi-foundations',
        title: 'FastAPI Fundamentals',
        description:
          'Learn FastAPI fundamentals by creating applications, GET endpoints and JSON responses.',
        level: 'Beginner',
        order: 1,
        problemSlugs: [
          'fastapi-hello-world',
          'fastapi-json-response',
        ],
      },

      {
        slug: 'fastapi-request-data',
        title: 'Path & Query Parameters',
        description:
          'Read dynamic path values and query-string parameters using FastAPI.',
        level: 'Beginner',
        order: 2,
        problemSlugs: [
          'fastapi-path-parameter',
          'fastapi-query-parameter',
        ],
      },

      {
        slug: 'fastapi-request-models',
        title: 'Request Bodies & Pydantic',
        description:
          'Create request models and process validated request bodies using FastAPI and Pydantic.',
        level: 'Intermediate',
        order: 3,
        problemSlugs: [
          'fastapi-post-request',
          'fastapi-pydantic-validation',
        ],
      },

      {
        slug: 'fastapi-update-delete',
        title: 'Update & Delete Operations',
        description:
          'Build REST endpoints for updating and deleting application resources.',
        level: 'Intermediate',
        order: 4,
        problemSlugs: [
          'fastapi-update-user',
          'fastapi-delete-user',
        ],
      },

      {
        slug: 'fastapi-crud-applications',
        title: 'CRUD Application APIs',
        description:
          'Combine FastAPI routes, Pydantic models and in-memory data management to build complete CRUD-style APIs.',
        level: 'Advanced',
        order: 5,
        problemSlugs: [
          'fastapi-task-crud',
          'fastapi-inventory-api',
        ],
      },
    ],
  },


  /* =======================================================
     ANGULAR
  ======================================================= */

  {
    technologySlug:
      'angular',

    name:
      'Angular',

    shortName:
      'Angular',

    description:
      'Practice Angular fundamentals, components, templates, data binding, forms, filtering, lists and interactive application development.',

    stages: [

      /* ===================================================
         BEGINNER
      =================================================== */

      {
        slug:
          'angular-fundamentals',

        title:
          'Angular Fundamentals',

        description:
          'Learn Angular components, templates, interpolation, event binding and basic component state.',

        level:
          'Beginner',

        order:
          1,

        problemSlugs: [
          'angular-counter',
        ],
      },

      /* ===================================================
         INTERMEDIATE
      =================================================== */

      {
        slug:
          'angular-forms-filtering',

        title:
          'Forms, Lists & Filtering',

        description:
          'Practice Angular input handling, filtering, templates and dynamic list rendering.',

        level:
          'Intermediate',

        order:
          2,

        problemSlugs: [
          'angular-search-products',
          'angular-todo',
        ],
      },

      /* ===================================================
         ADVANCED
      =================================================== */

      {
        slug:
          'angular-application-patterns',

        title:
          'Interactive Application Patterns',

        description:
          'Build richer Angular components using state, lists, filtering and user interactions.',

        level:
          'Advanced',

        order:
          3,

        problemSlugs: [
          'angular-user-directory',
        ],
      },
    ],
  },

  /* =======================================================
     SPRING BOOT
  ======================================================= */

  {
    technologySlug: 'springboot',

    name: 'Spring Boot',

    shortName: 'Spring Boot',

    description:
      'Practice Spring Boot backend development using REST controllers, HTTP endpoints and application-style Java APIs.',

    stages: [
      {
        slug: 'springboot-rest-controller',

        title: 'REST Controllers',

        description:
          'Learn Spring Boot REST controller fundamentals by creating HTTP endpoints and returning responses.',

        level: 'Beginner',

        order: 1,

        problemSlugs: [
          'springboot-hello-controller',
        ],
      },
    ],
  },

  /* =======================================================
     EXPRESS.JS
  ======================================================= */

  {
    technologySlug:
      'expressjs',

    name:
      'Express.js',

    shortName:
      'Express',

    description:
      'Learn backend API development with Express.js, starting with routing and progressing toward middleware, validation, REST APIs and production-style server development.',

    stages: [

      /* ===================================================
         BEGINNER
      =================================================== */

      {
        slug:
          'express-routing',

        title:
          'Express Routing',

        description:
          'Learn how to create HTTP routes and return JSON responses using Express.js.',

        level:
          'Beginner',

        order:
          1,

        problemSlugs: [
          'express-hello-route',
        ],
      },

      /*
       * Additional Express stages will be enabled
       * as the corresponding problem definitions are added.
       *
       * Planned:
       *
       * Beginner
       * - Basic Routes
       * - Route Parameters
       * - Query Parameters
       *
       * Intermediate
       * - Request Body
       * - Validation
       * - Middleware
       * - Error Handling
       *
       * Advanced
       * - REST APIs
       * - Pagination
       * - CRUD
       */
    ],
  },

  /* =======================================================
     GIT
  ======================================================= */

  {
    technologySlug: 'git',

    name: 'Git',

    shortName: 'Git',

    description:
      'Build practical Git version-control skills through repository initialization, status inspection, staging, commits, branches and everyday source-control workflows.',

    stages: [
      {
        slug: 'git-repository-foundations',

        title: 'Repository Foundations',

        description:
          'Learn Git repository fundamentals using practical terminal commands in an isolated DevOps workspace.',

        level: 'Beginner',

        order: 1,

        problemSlugs: [
          'git-initialize-repository',
        ],
      },
    ],
  },

  /* =======================================================
     DOCKER
  ======================================================= */

  {
    technologySlug: 'docker',

    name: 'Docker',

    shortName: 'Docker',

    description:
      'Build practical Docker command-line skills for DevOps through Docker CLI usage, images, containers and container-management workflows.',

    stages: [
      {
        slug: 'docker-cli-foundations',

        title: 'Docker CLI Foundations',

        description:
          'Learn Docker CLI fundamentals using practical commands in an isolated DevOps workspace.',

        level: 'Beginner',

        order: 1,

        problemSlugs: [
          'docker-check-version',
        ],
      },
    ],
  },

  /* =======================================================
     KUBERNETES
  ======================================================= */

  {
    technologySlug: 'kubernetes',

    name: 'Kubernetes',

    shortName: 'Kubernetes',

    description:
      'Build practical Kubernetes command-line skills using kubectl for client inspection, cluster interaction and Kubernetes resource-management workflows.',

    stages: [
      {
        slug: 'kubernetes-cli-foundations',

        title: 'Kubernetes CLI Foundations',

        description:
          'Learn kubectl fundamentals using practical commands in an isolated DevOps workspace.',

        level: 'Beginner',

        order: 1,

        problemSlugs: [
          'kubernetes-check-kubectl-version',
        ],
      },
    ],
  },

  /* =======================================================
     LINUX
  ======================================================= */

  {
    technologySlug: 'linux',

    name: 'Linux',

    shortName: 'Linux',

    description:
      'Build practical Linux command-line skills for DevOps through filesystem navigation, directory and file management, permissions, text processing, processes, networking and shell operations.',

    stages: [
      {
        slug: 'linux-filesystem-foundations',

        title: 'Filesystem Foundations',

        description:
          'Learn Linux workspace navigation and filesystem operations using practical terminal commands.',

        level: 'Beginner',

        order: 1,

        problemSlugs: [
          'linux-create-directory',
        ],
      },
    ],
  },

  /* =======================================================
     CI/CD
  ======================================================= */

  {
    technologySlug: 'cicd',

    name: 'CI/CD',

    shortName: 'CI/CD',

    description:
      'Build practical CI/CD skills through continuous integration workflows, GitHub Actions, workflow YAML, automated jobs and DevOps pipeline practices.',

    stages: [
      {
        slug: 'cicd-workflow-foundations',

        title: 'CI Workflow Foundations',

        description:
          'Learn CI/CD workflow fundamentals by creating GitHub Actions workflow files in an isolated DevOps workspace.',

        level: 'Beginner',

        order: 1,

        problemSlugs: [
          'cicd-create-github-actions-workflow',
        ],
      },
    ],
  },


  /* =======================================================
     AWS CLOUD PRACTICE
  ======================================================= */

  {
    technologySlug: 'aws',
    name: 'AWS Cloud Practice',
    shortName: 'AWS',
    description:
      'Practice AWS cloud fundamentals, EC2, S3, IAM, VPC, Auto Scaling and SQS with deterministic offline Python coding exercises.',
    stages: [
      {
        slug: 'aws-cloud-fundamentals',
        title: 'AWS Fundamentals',
        description:
          'Learn AWS regions, service categories and resource ARN structures.',
        level: 'Beginner',
        order: 1,
        problemSlugs: [
          'aws-validate-region',
          'aws-classify-service',
          'aws-parse-arn',
        ],
      },

      {
        slug: 'aws-compute-storage',
        title: 'EC2 & S3 Foundations',
        description:
          'Practice EC2 cost calculations and offline S3 resource validations.',
        level: 'Beginner',
        order: 2,
        problemSlugs: [
          'aws-calculate-ec2-cost',
          'aws-validate-s3-bucket-name',
          'aws-sum-s3-object-sizes',
        ],
      },

      {
        slug: 'aws-security-networking',
        title: 'IAM & VPC',
        description:
          'Evaluate simulated IAM permissions and detect overlapping VPC networks.',
        level: 'Intermediate',
        order: 3,
        problemSlugs: [
          'aws-evaluate-iam-permission',
          'aws-detect-overlapping-subnets',
        ],
      },

      {
        slug: 'aws-scaling-messaging',
        title: 'Auto Scaling & SQS',
        description:
          'Implement offline capacity planning and SQS batching logic.',
        level: 'Intermediate',
        order: 4,
        problemSlugs: [
          'aws-calculate-autoscaling-target',
          'aws-simulate-sqs-batches',
        ],
      },
    ],
  },


  /* =======================================================
     MICROSOFT AZURE CLOUD PRACTICE
  ======================================================= */

  {
    technologySlug: 'azure',
    name: 'Microsoft Azure Cloud Practice',
    shortName: 'Azure',
    description:
      'Practice Microsoft Azure regions, services, resource IDs, Virtual Machines, Blob Storage, RBAC, VNets, VM Scale Sets and queues through offline Python coding exercises.',
    stages: [
      {
        slug: 'azure-cloud-fundamentals',
        title: 'Azure Fundamentals',
        description:
          'Validate Azure regions, classify cloud services and parse Azure resource IDs.',
        level: 'Beginner',
        order: 1,
        problemSlugs: [
          'azure-validate-region',
          'azure-classify-service',
          'azure-parse-resource-id',
        ],
      },

      {
        slug: 'azure-compute-storage',
        title: 'Virtual Machines & Storage',
        description:
          'Calculate offline VM costs, validate storage account names and total blob sizes.',
        level: 'Beginner',
        order: 2,
        problemSlugs: [
          'azure-calculate-vm-cost',
          'azure-validate-storage-account',
          'azure-sum-blob-sizes',
        ],
      },

      {
        slug: 'azure-security-networking',
        title: 'Azure RBAC & Virtual Networks',
        description:
          'Evaluate simulated role-based access and detect overlapping VNet subnets.',
        level: 'Intermediate',
        order: 3,
        problemSlugs: [
          'azure-evaluate-rbac',
          'azure-detect-overlapping-subnets',
        ],
      },

      {
        slug: 'azure-scaling-messaging',
        title: 'VM Scale Sets & Queues',
        description:
          'Practice scale target calculations and queue message batching.',
        level: 'Intermediate',
        order: 4,
        problemSlugs: [
          'azure-calculate-scale-target',
          'azure-simulate-queue-batches',
        ],
      },
    ],
  },

  /* =======================================================
     GOOGLE CLOUD PLATFORM PRACTICE
  ======================================================= */

  {
    technologySlug: 'google-cloud',
    name: 'Google Cloud Platform Practice',
    shortName: 'Google Cloud',
    description:
      'Practice Google Cloud regions, services, resource names, Compute Engine, Cloud Storage, IAM, VPC, Managed Instance Groups and Pub/Sub through offline Python coding exercises.',
    stages: [
      {
        slug: 'gcp-cloud-fundamentals',
        title: 'Google Cloud Fundamentals',
        description:
          'Validate Google Cloud regions, classify services and parse resource names.',
        level: 'Beginner',
        order: 1,
        problemSlugs: [
          'gcp-validate-region',
          'gcp-classify-service',
          'gcp-parse-resource-name',
        ],
      },

      {
        slug: 'gcp-compute-storage',
        title: 'Compute Engine & Cloud Storage',
        description:
          'Calculate Compute Engine costs, validate bucket names and sum storage object sizes.',
        level: 'Beginner',
        order: 2,
        problemSlugs: [
          'gcp-calculate-compute-cost',
          'gcp-validate-bucket-name',
          'gcp-sum-storage-object-sizes',
        ],
      },

      {
        slug: 'gcp-security-networking',
        title: 'IAM & VPC Networking',
        description:
          'Evaluate simulated IAM permissions and detect overlapping VPC subnets.',
        level: 'Intermediate',
        order: 3,
        problemSlugs: [
          'gcp-evaluate-iam-permission',
          'gcp-detect-overlapping-subnets',
        ],
      },

      {
        slug: 'gcp-scaling-messaging',
        title: 'Managed Instance Groups & Pub/Sub',
        description:
          'Calculate managed instance group targets and simulate Pub/Sub message batches.',
        level: 'Intermediate',
        order: 4,
        problemSlugs: [
          'gcp-calculate-mig-target',
          'gcp-simulate-pubsub-batches',
        ],
      },
    ],
  },

  /* =======================================================
     AI & MACHINE LEARNING PRACTICE
  ======================================================= */

  {
    technologySlug: 'ai-ml',
    name: 'AI & Machine Learning Practice',
    shortName: 'AI & ML',
    description:
      'Practice essential AI and machine learning concepts using Python, including statistics, data preprocessing, feature engineering, basic algorithms, and evaluation metrics.',
    stages: [
      {
        slug: 'ai-ml-fundamentals',
        title: 'AI & ML Fundamentals',
        description:
          'Calculate dataset statistics, normalize features and encode categorical labels.',
        level: 'Beginner',
        order: 1,
        problemSlugs: [
          'ai-ml-calculate-mean',
          'ai-ml-normalize-features',
          'ai-ml-encode-labels',
        ],
      },
      {
        slug: 'ai-ml-data-preparation',
        title: 'Data Preparation & Feature Engineering',
        description:
          'Handle missing data, create deterministic dataset splits and calculate feature distances.',
        level: 'Beginner',
        order: 2,
        problemSlugs: [
          'ai-ml-handle-missing-values',
          'ai-ml-split-dataset',
          'ai-ml-calculate-euclidean-distance',
        ],
      },
      {
        slug: 'ai-ml-algorithms',
        title: 'Machine Learning Algorithms',
        description:
          'Apply K-nearest neighbors classification and linear regression prediction.',
        level: 'Intermediate',
        order: 3,
        problemSlugs: [
          'ai-ml-knn-classification',
          'ai-ml-linear-regression-prediction',
        ],
      },
      {
        slug: 'ai-ml-model-evaluation',
        title: 'Model Evaluation & Predictions',
        description:
          'Build binary confusion matrices and calculate accuracy, precision and recall.',
        level: 'Intermediate',
        order: 4,
        problemSlugs: [
          'ai-ml-confusion-matrix',
          'ai-ml-calculate-accuracy-precision-recall',
        ],
      },
    ],
  },

  /* =======================================================
     GENERATIVE AI PRACTICE
  ======================================================= */

  {
    technologySlug: 'generative-ai',
    name: 'Generative AI Practice',
    shortName: 'Generative AI',
    description:
      'Explore prompting, model parameters, token usage, embeddings, semantic retrieval, RAG context construction and response evaluation with offline Python coding exercises.',
    stages: [
      {
        slug: 'genai-fundamentals',
        title: 'Generative AI Fundamentals',
        description:
          'Count prompt tokens, fill prompt templates and validate model generation parameters.',
        level: 'Beginner',
        order: 1,
        problemSlugs: [
          'genai-token-count',
          'genai-prompt-template',
          'genai-validate-model-parameters',
        ],
      },
      {
        slug: 'genai-prompt-token-processing',
        title: 'Prompt Engineering & Token Processing',
        description:
          'Estimate token usage costs, split text into chunks and format chat history.',
        level: 'Beginner',
        order: 2,
        problemSlugs: [
          'genai-estimate-token-cost',
          'genai-split-text-chunks',
          'genai-build-chat-history',
        ],
      },
      {
        slug: 'genai-embeddings-search',
        title: 'Embeddings & Semantic Search',
        description:
          'Compute cosine similarity and retrieve top-ranked documents.',
        level: 'Intermediate',
        order: 3,
        problemSlugs: [
          'genai-cosine-similarity',
          'genai-retrieve-top-k-documents',
        ],
      },
      {
        slug: 'genai-rag-evaluation',
        title: 'RAG & Response Evaluation',
        description:
          'Construct RAG context windows and evaluate generated responses.',
        level: 'Intermediate',
        order: 4,
        problemSlugs: [
          'genai-build-rag-context',
          'genai-evaluate-generated-response',
        ],
      },
    ],
  },
];

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