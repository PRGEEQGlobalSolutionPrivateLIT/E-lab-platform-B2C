import type {
  PracticeProblem,
} from './types';

/* =========================================================
   DJANGO PROBLEMS

   Shared framework workspace.
   Python is the learner language.
   Django project scaffolding will be created by the Judge
   runtime, so learners edit only the problem's primary file.
========================================================= */

export const djangoProblems:
  PracticeProblem[] = [

  /* =======================================================
     01 — BASIC DJANGO VIEW
  ======================================================= */

  {
    slug:
      'django-basic-view',

    title:
      'Create a Basic Django View',

    technologySlug:
      'django',

    difficulty:
      'Easy',

    workspaceType:
      'framework',

    shortDescription:
      'Create a Django view that returns a plain-text HTTP response.',

    problemStatement:
      `Create a Django function-based view named home that returns the exact text "Welcome to Django" using HttpResponse.`,

    outputFormat:
      'The home view must return: Welcome to Django',

    constraints: [
      'Use django.http.HttpResponse.',
      'Define a function named home.',
      'Return exactly "Welcome to Django".',
    ],

    skills: [
      'Django Views',
      'HttpResponse',
      'Function-Based Views',
    ],

    estimatedMinutes:
      10,

    defaultLanguage:
      'python',

    allowedLanguages: [
      'python',
    ],

    starterCode:
      `from django.http import HttpResponse


def home(request):
    # Return the required response.
    pass
`,

    starterFiles: [
      {
        path:
          'app/views.py',

        language:
          'python',

        content:
          `from django.http import HttpResponse


def home(request):
    # Return the required response.
    pass
`,
      },
    ],
  },

  /* =======================================================
     02 — URL ROUTING
  ======================================================= */

  {
    slug:
      'django-url-route',

    title:
      'Configure a Django URL Route',

    technologySlug:
      'django',

    difficulty:
      'Easy',

    workspaceType:
      'framework',

    shortDescription:
      'Connect a URL path to a Django view.',

    problemStatement:
      `Configure urlpatterns so the path "hello/" calls the imported hello view. The route name must be "hello".`,

    outputFormat:
      'GET /hello/ must resolve to the hello view.',

    constraints: [
      'Use django.urls.path.',
      'The route must be hello/.',
      'The route name must be hello.',
    ],

    skills: [
      'Django URLs',
      'URLconf',
      'path()',
    ],

    estimatedMinutes:
      10,

    defaultLanguage:
      'python',

    allowedLanguages: [
      'python',
    ],

    starterCode:
      `from django.urls import path
from .views import hello


urlpatterns = [
    # Add the hello route here.
]
`,

    starterFiles: [
      {
        path:
          'app/urls.py',

        language:
          'python',

        content:
          `from django.urls import path
from .views import hello


urlpatterns = [
    # Add the hello route here.
]
`,
      },
    ],
  },

  /* =======================================================
     03 — TEMPLATE CONTEXT
  ======================================================= */

  {
    slug:
      'django-template-context',

    title:
      'Render a Template with Context',

    technologySlug:
      'django',

    difficulty:
      'Easy',

    workspaceType:
      'framework',

    shortDescription:
      'Pass data from a Django view to a template.',

    problemStatement:
      `Create a function-based view named profile that renders "profile.html" and passes a context value where username is "Asha".`,

    outputFormat:
      'The template context must contain username = Asha.',

    constraints: [
      'Use django.shortcuts.render.',
      'Render profile.html.',
      'Pass username with the value Asha.',
    ],

    skills: [
      'Django Templates',
      'Context',
      'render()',
    ],

    estimatedMinutes:
      12,

    defaultLanguage:
      'python',

    allowedLanguages: [
      'python',
    ],

    starterCode:
      `from django.shortcuts import render


def profile(request):
    # Render profile.html with the required context.
    pass
`,

    starterFiles: [
      {
        path:
          'app/views.py',

        language:
          'python',

        content:
          `from django.shortcuts import render


def profile(request):
    # Render profile.html with the required context.
    pass
`,
      },
    ],
  },

  /* =======================================================
     04 — DYNAMIC URL PARAMETER
  ======================================================= */

  {
    slug:
      'django-dynamic-route',

    title:
      'Handle a Dynamic URL Parameter',

    technologySlug:
      'django',

    difficulty:
      'Easy',

    workspaceType:
      'framework',

    shortDescription:
      'Read a dynamic integer value from a Django URL.',

    problemStatement:
      `Create a route for "courses/<int:course_id>/" that calls course_detail. The route name must be "course-detail".`,

    outputFormat:
      'The route must pass course_id to course_detail.',

    constraints: [
      'Use an int path converter.',
      'Use the variable name course_id.',
      'Use the route name course-detail.',
    ],

    skills: [
      'Django URL Parameters',
      'Path Converters',
      'Dynamic Routes',
    ],

    estimatedMinutes:
      12,

    defaultLanguage:
      'python',

    allowedLanguages: [
      'python',
    ],

    starterCode:
      `from django.urls import path
from .views import course_detail


urlpatterns = [
    # Add the dynamic course route here.
]
`,

    starterFiles: [
      {
        path:
          'app/urls.py',

        language:
          'python',

        content:
          `from django.urls import path
from .views import course_detail


urlpatterns = [
    # Add the dynamic course route here.
]
`,
      },
    ],
  },

  /* =======================================================
     05 — POST REQUEST
  ======================================================= */

  {
    slug:
      'django-post-request',

    title:
      'Read POST Form Data',

    technologySlug:
      'django',

    difficulty:
      'Medium',

    workspaceType:
      'framework',

    shortDescription:
      'Read submitted form data in a Django view.',

    problemStatement:
      `Create a view named submit_name that reads the POST field "name". For POST requests, return "Hello, <name>" using HttpResponse. For all other request methods, return "POST required".`,

    outputFormat:
      'A POST with name=Asha must return: Hello, Asha',

    constraints: [
      'Read request.method.',
      'Read request.POST.get("name").',
      'Use HttpResponse.',
    ],

    skills: [
      'Django Requests',
      'POST Data',
      'Form Processing',
    ],

    estimatedMinutes:
      15,

    defaultLanguage:
      'python',

    allowedLanguages: [
      'python',
    ],

    starterCode:
      `from django.http import HttpResponse


def submit_name(request):
    # Handle POST requests and return the required response.
    pass
`,

    starterFiles: [
      {
        path:
          'app/views.py',

        language:
          'python',

        content:
          `from django.http import HttpResponse


def submit_name(request):
    # Handle POST requests and return the required response.
    pass
`,
      },
    ],
  },

  /* =======================================================
     06 — BASIC MODEL
  ======================================================= */

  {
    slug:
      'django-course-model',

    title:
      'Create a Django Model',

    technologySlug:
      'django',

    difficulty:
      'Medium',

    workspaceType:
      'framework',

    shortDescription:
      'Define a basic Django model with typed fields.',

    problemStatement:
      `Create a Course model with title as CharField(max_length=120) and duration as PositiveIntegerField. Implement __str__ so it returns the course title.`,

    outputFormat:
      'Course instances must expose title and duration fields.',

    constraints: [
      'The model class must be named Course.',
      'title must use CharField(max_length=120).',
      'duration must use PositiveIntegerField.',
      '__str__ must return self.title.',
    ],

    skills: [
      'Django Models',
      'Model Fields',
      'ORM Fundamentals',
    ],

    estimatedMinutes:
      18,

    defaultLanguage:
      'python',

    allowedLanguages: [
      'python',
    ],

    starterCode:
      `from django.db import models


class Course(models.Model):
    # Add the required fields and __str__ method.
    pass
`,

    starterFiles: [
      {
        path:
          'app/models.py',

        language:
          'python',

        content:
          `from django.db import models


class Course(models.Model):
    # Add the required fields and __str__ method.
    pass
`,
      },
    ],
  },

  /* =======================================================
     07 — QUERYSET FILTERING
  ======================================================= */

  {
    slug:
      'django-queryset-filter',

    title:
      'Filter a Django QuerySet',

    technologySlug:
      'django',

    difficulty:
      'Medium',

    workspaceType:
      'framework',

    shortDescription:
      'Use the Django ORM to filter records.',

    problemStatement:
      `Create a function named get_active_courses that returns only Course objects where active=True, ordered by title.`,

    outputFormat:
      'Return a QuerySet containing active courses ordered by title.',

    constraints: [
      'Use Course.objects.filter(active=True).',
      'Order the result by title.',
      'Return the QuerySet.',
    ],

    skills: [
      'Django ORM',
      'QuerySets',
      'Filtering',
      'Ordering',
    ],

    estimatedMinutes:
      15,

    defaultLanguage:
      'python',

    allowedLanguages: [
      'python',
    ],

    starterCode:
      `from .models import Course


def get_active_courses():
    # Return active courses ordered by title.
    pass
`,

    starterFiles: [
      {
        path:
          'app/services.py',

        language:
          'python',

        content:
          `from .models import Course


def get_active_courses():
    # Return active courses ordered by title.
    pass
`,
      },
    ],
  },

  /* =======================================================
     08 — CREATE MODEL RECORD
  ======================================================= */

  {
    slug:
      'django-create-record',

    title:
      'Create a Model Record',

    technologySlug:
      'django',

    difficulty:
      'Medium',

    workspaceType:
      'framework',

    shortDescription:
      'Create and return a database record using the Django ORM.',

    problemStatement:
      `Create a function named create_student that accepts name and score and creates a Student record using Student.objects.create. Return the created Student object.`,

    outputFormat:
      'Return the newly created Student instance.',

    constraints: [
      'Use Student.objects.create.',
      'Pass name and score.',
      'Return the created object.',
    ],

    skills: [
      'Django ORM',
      'Creating Records',
      'Model Manager',
    ],

    estimatedMinutes:
      15,

    defaultLanguage:
      'python',

    allowedLanguages: [
      'python',
    ],

    starterCode:
      `from .models import Student


def create_student(name, score):
    # Create and return a Student record.
    pass
`,

    starterFiles: [
      {
        path:
          'app/services.py',

        language:
          'python',

        content:
          `from .models import Student


def create_student(name, score):
    # Create and return a Student record.
    pass
`,
      },
    ],
  },

  /* =======================================================
     09 — JSON RESPONSE
  ======================================================= */

  {
    slug:
      'django-json-response',

    title:
      'Return a JSON Response',

    technologySlug:
      'django',

    difficulty:
      'Medium',

    workspaceType:
      'framework',

    shortDescription:
      'Return structured JSON data from a Django view.',

    problemStatement:
      `Create a view named health that returns JsonResponse({"status": "ok", "service": "elab"}).`,

    outputFormat:
      'The JSON response must contain status=ok and service=elab.',

    constraints: [
      'Use django.http.JsonResponse.',
      'The function must be named health.',
      'Return exactly the required keys and values.',
    ],

    skills: [
      'Django JsonResponse',
      'JSON APIs',
      'HTTP Responses',
    ],

    estimatedMinutes:
      12,

    defaultLanguage:
      'python',

    allowedLanguages: [
      'python',
    ],

    starterCode:
      `from django.http import JsonResponse


def health(request):
    # Return the required JSON response.
    pass
`,

    starterFiles: [
      {
        path:
          'app/views.py',

        language:
          'python',

        content:
          `from django.http import JsonResponse


def health(request):
    # Return the required JSON response.
    pass
`,
      },
    ],
  },

  /* =======================================================
     10 — CLASS-BASED VIEW
  ======================================================= */

  {
    slug:
      'django-class-based-view',

    title:
      'Create a Class-Based View',

    technologySlug:
      'django',

    difficulty:
      'Hard',

    workspaceType:
      'framework',

    shortDescription:
      'Implement a simple Django class-based view.',

    problemStatement:
      `Create a class named AboutView that extends django.views.View. Implement get(self, request) and return HttpResponse("About eLab").`,

    outputFormat:
      'GET requests handled by AboutView must return: About eLab',

    constraints: [
      'Extend django.views.View.',
      'Implement a get method.',
      'Return HttpResponse("About eLab").',
    ],

    skills: [
      'Django Class-Based Views',
      'View',
      'GET Handlers',
    ],

    estimatedMinutes:
      18,

    defaultLanguage:
      'python',

    allowedLanguages: [
      'python',
    ],

    starterCode:
      `from django.http import HttpResponse
from django.views import View


class AboutView(View):
    # Implement the GET handler.
    pass
`,

    starterFiles: [
      {
        path:
          'app/views.py',

        language:
          'python',

        content:
          `from django.http import HttpResponse
from django.views import View


class AboutView(View):
    # Implement the GET handler.
    pass
`,
      },
    ],
  },

  /* =======================================================
     11 — COURSE LIST API
  ======================================================= */

  {
    slug:
      'django-course-list-api',

    title:
      'Build a Course List API',

    technologySlug:
      'django',

    difficulty:
      'Hard',

    workspaceType:
      'framework',

    shortDescription:
      'Return model data as JSON using Django ORM values().',

    problemStatement:
      `Create a view named course_list that reads all Course records ordered by id and returns a JsonResponse with the shape {"courses": [...]}. Each item must include id, title, and duration. Use safe=True because the top-level value is a dictionary.`,

    outputFormat:
      'Return {"courses": [...]} as JSON.',

    constraints: [
      'Query Course.objects.order_by("id").',
      'Use values("id", "title", "duration").',
      'Convert the QuerySet to a list.',
      'Return JsonResponse({"courses": courses}).',
    ],

    skills: [
      'Django ORM',
      'JsonResponse',
      'API Development',
      'QuerySet values()',
    ],

    estimatedMinutes:
      22,

    defaultLanguage:
      'python',

    allowedLanguages: [
      'python',
    ],

    starterCode:
      `from django.http import JsonResponse

from .models import Course


def course_list(request):
    # Return all courses as JSON.
    pass
`,

    starterFiles: [
      {
        path:
          'app/views.py',

        language:
          'python',

        content:
          `from django.http import JsonResponse

from .models import Course


def course_list(request):
    # Return all courses as JSON.
    pass
`,
      },
    ],
  },

  /* =======================================================
     12 — COURSE MANAGEMENT
  ======================================================= */

  {
    slug:
      'django-course-management',

    title:
      'Build Course Management Logic',

    technologySlug:
      'django',

    difficulty:
      'Hard',

    workspaceType:
      'framework',

    shortDescription:
      'Combine request validation, ORM creation, and JSON responses.',

    problemStatement:
      `Create a view named create_course. If the request method is not POST, return JsonResponse({"error": "POST required"}, status=405). For POST requests, read title and duration from request.POST, create a Course record, and return JsonResponse containing the created course id, title, and duration with status=201.`,

    outputFormat:
      'Successful POST requests must return the created course data with HTTP status 201.',

    constraints: [
      'Reject non-POST requests with status 405.',
      'Read title and duration from request.POST.',
      'Create the Course using Course.objects.create.',
      'Return id, title, and duration.',
      'Use HTTP status 201 for successful creation.',
    ],

    skills: [
      'Django Views',
      'Django ORM',
      'Request Validation',
      'JsonResponse',
      'Application APIs',
    ],

    estimatedMinutes:
      25,

    defaultLanguage:
      'python',

    allowedLanguages: [
      'python',
    ],

    starterCode:
      `from django.http import JsonResponse

from .models import Course


def create_course(request):
    # Implement course creation.
    pass
`,

    starterFiles: [
      {
        path:
          'app/views.py',

        language:
          'python',

        content:
          `from django.http import JsonResponse

from .models import Course


def create_course(request):
    # Implement course creation.
    pass
`,
      },
    ],
  },
];
