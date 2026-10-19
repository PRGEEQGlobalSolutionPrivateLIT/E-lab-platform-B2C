import type {
  PracticeProblem,
} from './types';

/* =========================================================
   SPRING BOOT PRACTICE PROBLEMS
========================================================= */

export const springBootProblems: PracticeProblem[] = [
  /* =======================================================
     1. HELLO CONTROLLER
  ======================================================= */

  {
    slug: 'springboot-hello-controller',

    title: 'Hello Controller',

    technologySlug: 'springboot',

    difficulty: 'Easy',

    workspaceType: 'framework',

    shortDescription:
      'Create a Spring Boot REST controller that returns Hello, World! from a GET endpoint.',

    problemStatement:
      'Create a Spring Boot REST controller with a GET endpoint at /hello. The endpoint must return Hello, World! exactly.',

    outputFormat:
      'Return the text: Hello, World!',

    skills: [
      'Spring Boot',
      'REST Controller',
      '@RestController',
      '@GetMapping',
    ],

    estimatedMinutes: 15,

    defaultLanguage: 'java',

    allowedLanguages: ['java'],

    starterCode: `package com.elab.app;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        // Write your code here
        return "";
    }
}
`,

    starterFiles: [
      {
        path: 'src/main/java/com/elab/app/HelloController.java',
        language: 'java',
        content: `package com.elab.app;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        // Write your code here
        return "";
    }
}
`,
      },
    ],

    sampleTests: [
      {
        id: 'sample-1',
        title: 'Hello World Response',
        expectedOutput: 'Hello, World!',
      },
    ],
  },

  /* =======================================================
     2. GET ENDPOINT
  ======================================================= */

  {
    slug: 'springboot-get-endpoint',

    title: 'Create a GET Endpoint',

    technologySlug: 'springboot',

    difficulty: 'Easy',

    workspaceType: 'framework',

    shortDescription:
      'Create a Spring Boot GET endpoint that returns a simple API response.',

    problemStatement:
      'Create a REST controller with a GET endpoint at /api/status. The endpoint must return API is running exactly.',

    outputFormat:
      'Return the text: API is running',

    skills: [
      'Spring Boot',
      'REST API',
      '@RestController',
      '@GetMapping',
    ],

    estimatedMinutes: 15,

    defaultLanguage: 'java',

    allowedLanguages: ['java'],

    starterCode: `package com.elab.app;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StatusController {

    @GetMapping("/api/status")
    public String status() {
        // Write your code here
        return "";
    }
}
`,

    starterFiles: [
      {
        path: 'src/main/java/com/elab/app/StatusController.java',
        language: 'java',
        content: `package com.elab.app;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StatusController {

    @GetMapping("/api/status")
    public String status() {
        // Write your code here
        return "";
    }
}
`,
      },
    ],

    sampleTests: [
      {
        id: 'sample-1',
        title: 'API Status Response',
        expectedOutput: 'API is running',
      },
    ],
  },

  /* =======================================================
     3. PATH VARIABLE
  ======================================================= */

  {
    slug: 'springboot-path-variable',

    title: 'Use a Path Variable',

    technologySlug: 'springboot',

    difficulty: 'Easy',

    workspaceType: 'framework',

    shortDescription:
      'Read a value from the URL using a Spring Boot path variable.',

    problemStatement:
      'Create a GET endpoint at /users/{name}. Read name using @PathVariable and return Hello, followed by the supplied name.',

    outputFormat:
      'For name Asha, return: Hello, Asha',

    skills: [
      'Spring Boot',
      '@PathVariable',
      '@GetMapping',
      'REST API',
    ],

    estimatedMinutes: 20,

    defaultLanguage: 'java',

    allowedLanguages: ['java'],

    starterCode: `package com.elab.app;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/users/{name}")
    public String getUser(
        @PathVariable String name
    ) {
        // Write your code here
        return "";
    }
}
`,

    starterFiles: [
      {
        path: 'src/main/java/com/elab/app/UserController.java',
        language: 'java',
        content: `package com.elab.app;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/users/{name}")
    public String getUser(
        @PathVariable String name
    ) {
        // Write your code here
        return "";
    }
}
`,
      },
    ],

    sampleTests: [
      {
        id: 'sample-1',
        title: 'Path Variable Response',
        input: 'Asha',
        expectedOutput: 'Hello, Asha',
      },
    ],
  },

  /* =======================================================
     4. QUERY PARAMETER
  ======================================================= */

  {
    slug: 'springboot-query-parameter',

    title: 'Handle a Query Parameter',

    technologySlug: 'springboot',

    difficulty: 'Easy',

    workspaceType: 'framework',

    shortDescription:
      'Read query parameters using Spring Boot request parameter handling.',

    problemStatement:
      'Create a GET endpoint at /search. Accept a query parameter named keyword and return Searching for: followed by the supplied keyword.',

    outputFormat:
      'For keyword Java, return: Searching for: Java',

    skills: [
      'Spring Boot',
      '@RequestParam',
      'Query Parameters',
      'REST API',
    ],

    estimatedMinutes: 20,

    defaultLanguage: 'java',

    allowedLanguages: ['java'],

    starterCode: `package com.elab.app;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SearchController {

    @GetMapping("/search")
    public String search(
        @RequestParam String keyword
    ) {
        // Write your code here
        return "";
    }
}
`,

    starterFiles: [
      {
        path: 'src/main/java/com/elab/app/SearchController.java',
        language: 'java',
        content: `package com.elab.app;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SearchController {

    @GetMapping("/search")
    public String search(
        @RequestParam String keyword
    ) {
        // Write your code here
        return "";
    }
}
`,
      },
    ],

    sampleTests: [
      {
        id: 'sample-1',
        title: 'Query Parameter Response',
        input: 'Java',
        expectedOutput: 'Searching for: Java',
      },
    ],
  },

  /* =======================================================
     5. POST ENDPOINT
  ======================================================= */

  {
    slug: 'springboot-post-endpoint',

    title: 'Create a POST Endpoint',

    technologySlug: 'springboot',

    difficulty: 'Easy',

    workspaceType: 'framework',

    shortDescription:
      'Create a Spring Boot POST endpoint that accepts request data.',

    problemStatement:
      'Create a POST endpoint at /api/message. Read the request body using @RequestBody and return Received: followed by the supplied message.',

    outputFormat:
      'For body Hello, return: Received: Hello',

    skills: [
      'Spring Boot',
      '@PostMapping',
      '@RequestBody',
      'REST API',
    ],

    estimatedMinutes: 20,

    defaultLanguage: 'java',

    allowedLanguages: ['java'],

    starterCode: `package com.elab.app;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {

    @PostMapping("/api/message")
    public String createMessage(
        @RequestBody String message
    ) {
        // Write your code here
        return "";
    }
}
`,

    starterFiles: [
      {
        path: 'src/main/java/com/elab/app/MessageController.java',
        language: 'java',
        content: `package com.elab.app;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {

    @PostMapping("/api/message")
    public String createMessage(
        @RequestBody String message
    ) {
        // Write your code here
        return "";
    }
}
`,
      },
    ],

    sampleTests: [
      {
        id: 'sample-1',
        title: 'POST Response',
        input: 'Hello',
        expectedOutput: 'Received: Hello',
      },
    ],
  },

  /* =======================================================
     6. SERVICE LAYER
  ======================================================= */

  {
    slug: 'springboot-service-layer',

    title: 'Create a Service Layer',

    technologySlug: 'springboot',

    difficulty: 'Medium',

    workspaceType: 'framework',

    shortDescription:
      'Separate business logic from the controller using a Spring service.',

    problemStatement:
      'Create GreetingService using @Service. Implement getGreeting so it returns Welcome to Spring Boot.',

    outputFormat:
      'Return the text: Welcome to Spring Boot',

    skills: [
      'Spring Boot',
      '@Service',
      'Service Layer',
      'Business Logic',
    ],

    estimatedMinutes: 25,

    defaultLanguage: 'java',

    allowedLanguages: ['java'],

    starterCode: `package com.elab.app;

import org.springframework.stereotype.Service;

@Service
public class GreetingService {

    public String getGreeting() {
        // Write your code here
        return "";
    }
}
`,

    starterFiles: [
      {
        path: 'src/main/java/com/elab/app/GreetingService.java',
        language: 'java',
        content: `package com.elab.app;

import org.springframework.stereotype.Service;

@Service
public class GreetingService {

    public String getGreeting() {
        // Write your code here
        return "";
    }
}
`,
      },
    ],

    sampleTests: [
      {
        id: 'sample-1',
        title: 'Greeting Service Response',
        expectedOutput: 'Welcome to Spring Boot',
      },
    ],
  },

  /* =======================================================
     7. DEPENDENCY INJECTION
  ======================================================= */

  {
    slug: 'springboot-dependency-injection',

    title: 'Dependency Injection',

    technologySlug: 'springboot',

    difficulty: 'Medium',

    workspaceType: 'framework',

    shortDescription:
      'Use constructor-based dependency injection in a Spring Boot application.',

    problemStatement:
      'Inject CourseService into CourseController using constructor injection. Create a GET endpoint at /course that returns the value from CourseService.',

    outputFormat:
      'Return the text: Java Full Stack',

    skills: [
      'Spring Boot',
      'Dependency Injection',
      'Constructor Injection',
      '@Service',
      '@RestController',
    ],

    estimatedMinutes: 30,

    defaultLanguage: 'java',

    allowedLanguages: ['java'],

    starterFiles: [
      {
        path: 'src/main/java/com/elab/app/CourseService.java',
        language: 'java',
        content: `package com.elab.app;

import org.springframework.stereotype.Service;

@Service
public class CourseService {

    public String getCourse() {
        return "Java Full Stack";
    }
}
`,
      },
      {
        path: 'src/main/java/com/elab/app/CourseController.java',
        language: 'java',
        content: `package com.elab.app;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CourseController {

    private final CourseService courseService;

    // Add constructor injection here

    @GetMapping("/course")
    public String getCourse() {
        // Use courseService here
        return "";
    }
}
`,
      },
    ],

    sampleTests: [
      {
        id: 'sample-1',
        title: 'Injected Service Response',
        expectedOutput: 'Java Full Stack',
      },
    ],
  },

  /* =======================================================
     8. CREATE DTO
  ======================================================= */

  {
    slug: 'springboot-create-dto',

    title: 'Create a DTO',

    technologySlug: 'springboot',

    difficulty: 'Medium',

    workspaceType: 'framework',

    shortDescription:
      'Create a Data Transfer Object for transferring student data through an API.',

    problemStatement:
      'Complete StudentDto with name and score fields. Add constructors, getters and setters.',

    outputFormat:
      'Create a valid StudentDto containing name and score.',

    skills: [
      'Spring Boot',
      'DTO',
      'Java Classes',
      'API Design',
    ],

    estimatedMinutes: 25,

    defaultLanguage: 'java',

    allowedLanguages: ['java'],

    starterCode: `package com.elab.app;

public class StudentDto {

    private String name;
    private int score;

    // Add constructors, getters and setters
}
`,

    starterFiles: [
      {
        path: 'src/main/java/com/elab/app/StudentDto.java',
        language: 'java',
        content: `package com.elab.app;

public class StudentDto {

    private String name;
    private int score;

    // Add constructors, getters and setters
}
`,
      },
    ],

    sampleTests: [
      {
        id: 'sample-1',
        title: 'Student DTO',
        description:
          'StudentDto should expose name and score through constructors, getters and setters.',
      },
    ],
  },

  /* =======================================================
     9. REQUEST VALIDATION
  ======================================================= */

  {
    slug: 'springboot-validation',

    title: 'Validate Request Data',

    technologySlug: 'springboot',

    difficulty: 'Medium',

    workspaceType: 'framework',

    shortDescription:
      'Apply Jakarta validation rules to incoming Spring Boot request data.',

    problemStatement:
      'Complete StudentRequest so name is mandatory and score must be between 0 and 100 using Jakarta validation annotations.',

    outputFormat:
      'Apply @NotBlank to name and @Min(0) and @Max(100) to score.',

    skills: [
      'Spring Boot',
      'Validation',
      '@NotBlank',
      '@Min',
      '@Max',
    ],

    estimatedMinutes: 30,

    defaultLanguage: 'java',

    allowedLanguages: ['java'],

    starterCode: `package com.elab.app;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class StudentRequest {

    // Add validation annotations
    private String name;

    private int score;
}
`,

    starterFiles: [
      {
        path: 'src/main/java/com/elab/app/StudentRequest.java',
        language: 'java',
        content: `package com.elab.app;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class StudentRequest {

    // Add validation annotations
    private String name;

    private int score;
}
`,
      },
    ],

    sampleTests: [
      {
        id: 'sample-1',
        title: 'Validation Rules',
        description:
          'Name must not be blank and score must be between 0 and 100.',
      },
    ],
  },

  /* =======================================================
     10. EXCEPTION HANDLER
  ======================================================= */

  {
    slug: 'springboot-exception-handler',

    title: 'Global Exception Handler',

    technologySlug: 'springboot',

    difficulty: 'Medium',

    workspaceType: 'framework',

    shortDescription:
      'Handle application exceptions centrally using Spring Boot exception handling.',

    problemStatement:
      'Complete GlobalExceptionHandler using @RestControllerAdvice and @ExceptionHandler. Handle IllegalArgumentException and return its message.',

    outputFormat:
      'Return the exception message as the response body.',

    skills: [
      'Spring Boot',
      '@RestControllerAdvice',
      '@ExceptionHandler',
      'Error Handling',
    ],

    estimatedMinutes: 30,

    defaultLanguage: 'java',

    allowedLanguages: ['java'],

    starterCode: `package com.elab.app;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Add an exception handler for IllegalArgumentException
}
`,

    starterFiles: [
      {
        path: 'src/main/java/com/elab/app/GlobalExceptionHandler.java',
        language: 'java',
        content: `package com.elab.app;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Add an exception handler for IllegalArgumentException
}
`,
      },
    ],

    sampleTests: [
      {
        id: 'sample-1',
        title: 'Exception Response',
        expectedOutput: 'Invalid request',
      },
    ],
  },

  /* =======================================================
     11. COURSE REST API
  ======================================================= */

  {
    slug: 'springboot-course-api',

    title: 'Build a Course REST API',

    technologySlug: 'springboot',

    difficulty: 'Hard',

    workspaceType: 'framework',

    shortDescription:
      'Build a structured Spring Boot REST API for managing courses.',

    problemStatement:
      'Create a Course model, CourseService and CourseController. Support creating a course using POST /courses and retrieving courses using GET /courses.',

    outputFormat:
      'Expose working GET /courses and POST /courses REST endpoints.',

    skills: [
      'Spring Boot',
      'REST API',
      'Controller',
      'Service Layer',
      'DTO',
    ],

    estimatedMinutes: 45,

    defaultLanguage: 'java',

    allowedLanguages: ['java'],

    starterFiles: [
      {
        path: 'src/main/java/com/elab/app/Course.java',
        language: 'java',
        content: `package com.elab.app;

public class Course {

    private Long id;
    private String title;
    private int duration;

    // Add constructors, getters and setters
}
`,
      },
      {
        path: 'src/main/java/com/elab/app/CourseService.java',
        language: 'java',
        content: `package com.elab.app;

import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class CourseService {

    private final List<Course> courses =
        new ArrayList<>();

    // Add create and find-all methods
}
`,
      },
      {
        path: 'src/main/java/com/elab/app/CourseController.java',
        language: 'java',
        content: `package com.elab.app;

import org.springframework.web.bind.annotation.RestController;

@RestController
public class CourseController {

    // Inject CourseService

    // Add GET /courses

    // Add POST /courses
}
`,
      },
    ],

    sampleTests: [
      {
        id: 'sample-1',
        title: 'Course API',
        description:
          'The API should support creating and retrieving courses.',
      },
    ],
  },

  /* =======================================================
     12. STUDENT MANAGEMENT API
  ======================================================= */

  {
    slug: 'springboot-student-management-api',

    title: 'Student Management API',

    technologySlug: 'springboot',

    difficulty: 'Hard',

    workspaceType: 'framework',

    shortDescription:
      'Build a Spring Boot student management API using controllers, services, DTOs and validation.',

    problemStatement:
      'Create Student, StudentDto, StudentService and StudentController. Support creating and retrieving students and validate incoming student data.',

    outputFormat:
      'Expose working student creation and retrieval REST endpoints.',

    skills: [
      'Spring Boot',
      'REST API',
      'Service Layer',
      'DTO',
      'Validation',
      'Application Architecture',
    ],

    estimatedMinutes: 60,

    defaultLanguage: 'java',

    allowedLanguages: ['java'],

    starterFiles: [
      {
        path: 'src/main/java/com/elab/app/Student.java',
        language: 'java',
        content: `package com.elab.app;

public class Student {

    private Long id;
    private String name;
    private int score;

    // Add constructors, getters and setters
}
`,
      },
      {
        path: 'src/main/java/com/elab/app/StudentDto.java',
        language: 'java',
        content: `package com.elab.app;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class StudentDto {

    @NotBlank
    private String name;

    @Min(0)
    @Max(100)
    private int score;

    // Add constructors, getters and setters
}
`,
      },
      {
        path: 'src/main/java/com/elab/app/StudentService.java',
        language: 'java',
        content: `package com.elab.app;

import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class StudentService {

    private final List<Student> students =
        new ArrayList<>();

    // Add create and find-all methods
}
`,
      },
      {
        path: 'src/main/java/com/elab/app/StudentController.java',
        language: 'java',
        content: `package com.elab.app;

import org.springframework.web.bind.annotation.RestController;

@RestController
public class StudentController {

    // Inject StudentService

    // Add student creation endpoint

    // Add student retrieval endpoint
}
`,
      },
    ],

    sampleTests: [
      {
        id: 'sample-1',
        title: 'Student Management API',
        description:
          'The API should support validated student creation and student retrieval.',
      },
    ],
  },
];