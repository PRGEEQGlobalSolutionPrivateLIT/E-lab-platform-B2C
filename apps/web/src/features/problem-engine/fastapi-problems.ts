import type {
  PracticeProblem,
} from './types';

/* =========================================================
   FASTAPI PROBLEMS

   Target:
   FastAPI + Python

   IMPORTANT:
   - These problems use the shared framework workspace.
   - The learner writes Python/FastAPI code.
   - The main application file is main.py.
   - Runtime execution is handled by the FastAPI Judge.
========================================================= */

export const fastapiProblems:
  PracticeProblem[] = [

    /* =====================================================
       01 — HELLO WORLD API
    ===================================================== */

    {
      slug:
        'fastapi-hello-world',

      title:
        'Hello World API',

      technologySlug:
        'fastapi',

      difficulty:
        'Easy',

      workspaceType:
        'framework',

      shortDescription:
        'Create a basic FastAPI application with a GET endpoint.',

      problemStatement:
        `Create a FastAPI application.

The application must:

1. Create a FastAPI instance named app.
2. Define a GET endpoint for "/".
3. Return a JSON object containing:

{
  "message": "Hello, World!"
}

Use FastAPI and Python.`,

      inputFormat:
        'No input is required.',

      outputFormat:
        `GET / must return:

{
  "message": "Hello, World!"
}`,

      constraints: [
        'Import FastAPI from fastapi.',
        'Create a FastAPI instance named app.',
        'Use @app.get("/").',
        'Return exactly "Hello, World!" as the message.',
      ],

      skills: [
        'FastAPI',
        'GET Routes',
        'JSON Responses',
        'Python',
      ],

      estimatedMinutes:
        15,

      defaultLanguage:
        'python',

      allowedLanguages: [
        'python',
      ],

      starterFiles: [
        {
          path:
            'main.py',

          language:
            'python',

          content:
            `from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    # Return the required JSON response.
    pass
`,
        },
      ],

      sampleTests: [
        {
          id:
            'sample-1',

          title:
            'Root endpoint',

          description:
            'GET / should return {"message": "Hello, World!"}.',
        },
      ],
    },

    /* =====================================================
       02 — PATH PARAMETER
    ===================================================== */

    {
      slug:
        'fastapi-path-parameter',

      title:
        'User by ID',

      technologySlug:
        'fastapi',

      difficulty:
        'Easy',

      workspaceType:
        'framework',

      shortDescription:
        'Read a dynamic user ID using a FastAPI path parameter.',

      problemStatement:
        `Create a FastAPI endpoint for retrieving a user by ID.

The application must:

1. Define GET /users/{user_id}.
2. Accept user_id as an integer.
3. Return the supplied user ID.

For GET /users/10, return:

{
  "user_id": 10
}`,

      inputFormat:
        'Path parameter example: /users/10',

      outputFormat:
        `Return:

{
  "user_id": 10
}`,

      constraints: [
        'Use @app.get("/users/{user_id}").',
        'Define user_id as an integer.',
        'Do not hard-code the user ID.',
        'Return a JSON-compatible dictionary.',
      ],

      skills: [
        'FastAPI',
        'Path Parameters',
        'Type Hints',
        'GET Routes',
      ],

      estimatedMinutes:
        15,

      defaultLanguage:
        'python',

      allowedLanguages: [
        'python',
      ],

      starterFiles: [
        {
          path:
            'main.py',

          language:
            'python',

          content:
            `from fastapi import FastAPI

app = FastAPI()

@app.get("/users/{user_id}")
def get_user(user_id: int):
    # Return the supplied user ID.
    pass
`,
        },
      ],

      sampleTests: [
        {
          id:
            'sample-1',

          title:
            'User path parameter',

          description:
            'GET /users/10 should return {"user_id": 10}.',
        },
      ],
    },

    /* =====================================================
       03 — QUERY PARAMETER
    ===================================================== */

    {
      slug:
        'fastapi-query-parameter',

      title:
        'Product Search',

      technologySlug:
        'fastapi',

      difficulty:
        'Easy',

      workspaceType:
        'framework',

      shortDescription:
        'Read a product search term using a query parameter.',

      problemStatement:
        `Create a product search endpoint.

The application must:

1. Define GET /products.
2. Accept a query parameter named search.
3. Return the supplied search value.

For:

/products?search=laptop

return:

{
  "search": "laptop"
}`,

      inputFormat:
        'Query example: /products?search=laptop',

      outputFormat:
        `Return:

{
  "search": "laptop"
}`,

      constraints: [
        'Use @app.get("/products").',
        'Accept search as a string.',
        'Do not hard-code the search value.',
        'Return the supplied search term.',
      ],

      skills: [
        'FastAPI',
        'Query Parameters',
        'GET Routes',
        'Python Type Hints',
      ],

      estimatedMinutes:
        15,

      defaultLanguage:
        'python',

      allowedLanguages: [
        'python',
      ],

      starterFiles: [
        {
          path:
            'main.py',

          language:
            'python',

          content:
            `from fastapi import FastAPI

app = FastAPI()

@app.get("/products")
def search_products(search: str):
    # Return the search query.
    pass
`,
        },
      ],

      sampleTests: [
        {
          id:
            'sample-1',

          title:
            'Product search',

          description:
            'GET /products?search=laptop should return {"search": "laptop"}.',
        },
      ],
    },

    /* =====================================================
       04 — JSON RESPONSE
    ===================================================== */

    {
      slug:
        'fastapi-json-response',

      title:
        'Product Details API',

      technologySlug:
        'fastapi',

      difficulty:
        'Easy',

      workspaceType:
        'framework',

      shortDescription:
        'Return structured product information as JSON.',

      problemStatement:
        `Create a product details endpoint.

The application must:

1. Define GET /products/1.
2. Return a product object.
3. The object must contain:

{
  "id": 1,
  "name": "Laptop",
  "price": 50000
}`,

      inputFormat:
        'No request body is required.',

      outputFormat:
        `GET /products/1 must return:

{
  "id": 1,
  "name": "Laptop",
  "price": 50000
}`,

      constraints: [
        'Use a GET endpoint.',
        'Return a dictionary.',
        'Include id, name, and price.',
        'Use the required values exactly.',
      ],

      skills: [
        'FastAPI',
        'JSON Responses',
        'Python Dictionaries',
        'GET Routes',
      ],

      estimatedMinutes:
        15,

      defaultLanguage:
        'python',

      allowedLanguages: [
        'python',
      ],

      starterFiles: [
        {
          path:
            'main.py',

          language:
            'python',

          content:
            `from fastapi import FastAPI

app = FastAPI()

@app.get("/products/1")
def get_product():
    # Return the required product.
    pass
`,
        },
      ],

      sampleTests: [
        {
          id:
            'sample-1',

          title:
            'Product details',

          description:
            'GET /products/1 should return the required product object.',
        },
      ],
    },

    /* =====================================================
       05 — POST REQUEST
    ===================================================== */

    {
      slug:
        'fastapi-post-request',

      title:
        'Create User API',

      technologySlug:
        'fastapi',

      difficulty:
        'Medium',

      workspaceType:
        'framework',

      shortDescription:
        'Accept user information through a POST request.',

      problemStatement:
        `Create a user creation endpoint.

Requirements:

1. Create a User Pydantic model.
2. User must contain name and email.
3. Define POST /users.
4. Accept User as the request body.
5. Return the submitted user information.`,

      inputFormat:
        `Request body example:

{
  "name": "John",
  "email": "john@example.com"
}`,

      outputFormat:
        `Return:

{
  "name": "John",
  "email": "john@example.com"
}`,

      constraints: [
        'Use BaseModel from pydantic.',
        'Define name as str.',
        'Define email as str.',
        'Use @app.post("/users").',
        'Do not hard-code the submitted values.',
      ],

      skills: [
        'FastAPI',
        'POST Requests',
        'Pydantic',
        'Request Bodies',
      ],

      estimatedMinutes:
        20,

      defaultLanguage:
        'python',

      allowedLanguages: [
        'python',
      ],

      starterFiles: [
        {
          path:
            'main.py',

          language:
            'python',

          content:
            `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    name: str
    email: str

@app.post("/users")
def create_user(user: User):
    # Return the submitted user.
    pass
`,
        },
      ],

      sampleTests: [
        {
          id:
            'sample-1',

          title:
            'Create user',

          description:
            'POST /users should return the submitted name and email.',
        },
      ],
    },

    /* =====================================================
       06 — PYDANTIC VALIDATION
    ===================================================== */

    {
      slug:
        'fastapi-pydantic-validation',

      title:
        'Validate Product Data',

      technologySlug:
        'fastapi',

      difficulty:
        'Medium',

      workspaceType:
        'framework',

      shortDescription:
        'Validate product data using a Pydantic model.',

      problemStatement:
        `Create a product API using Pydantic validation.

Create Product with:

1. name: str
2. price: float
3. quantity: int

Then:

1. Define POST /products.
2. Accept Product as the request body.
3. Return the validated product.`,

      inputFormat:
        `Request body example:

{
  "name": "Laptop",
  "price": 50000,
  "quantity": 2
}`,

      outputFormat:
        `Return the validated product data.`,

      constraints: [
        'Product must inherit from BaseModel.',
        'name must be str.',
        'price must be float.',
        'quantity must be int.',
        'Use POST /products.',
      ],

      skills: [
        'Pydantic',
        'Data Validation',
        'FastAPI',
        'Request Models',
      ],

      estimatedMinutes:
        20,

      defaultLanguage:
        'python',

      allowedLanguages: [
        'python',
      ],

      starterFiles: [
        {
          path:
            'main.py',

          language:
            'python',

          content:
            `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Product(BaseModel):
    name: str
    price: float
    quantity: int

@app.post("/products")
def create_product(product: Product):
    # Return the validated product.
    pass
`,
        },
      ],

      sampleTests: [
        {
          id:
            'sample-1',

          title:
            'Product validation',

          description:
            'POST /products should accept and return valid product data.',
        },
      ],
    },

    /* =====================================================
       07 — UPDATE USER
    ===================================================== */

    {
      slug:
        'fastapi-update-user',

      title:
        'Update User API',

      technologySlug:
        'fastapi',

      difficulty:
        'Medium',

      workspaceType:
        'framework',

      shortDescription:
        'Update user information using a PUT endpoint.',

      problemStatement:
        `Create a user update endpoint.

Requirements:

1. Create UserUpdate with name and email.
2. Define PUT /users/{user_id}.
3. Accept user_id as an integer.
4. Accept UserUpdate as the request body.
5. Return the user ID, name, and email.`,

      inputFormat:
        `Example request:

PUT /users/1

{
  "name": "John",
  "email": "john@example.com"
}`,

      outputFormat:
        `Return:

{
  "user_id": 1,
  "name": "John",
  "email": "john@example.com"
}`,

      constraints: [
        'Use @app.put().',
        'Use a path parameter.',
        'Use a Pydantic request model.',
        'Do not hard-code user_id.',
      ],

      skills: [
        'FastAPI',
        'PUT Requests',
        'Path Parameters',
        'Pydantic',
      ],

      estimatedMinutes:
        25,

      defaultLanguage:
        'python',

      allowedLanguages: [
        'python',
      ],

      starterFiles: [
        {
          path:
            'main.py',

          language:
            'python',

          content:
            `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class UserUpdate(BaseModel):
    name: str
    email: str

@app.put("/users/{user_id}")
def update_user(
    user_id: int,
    user: UserUpdate,
):
    # Return the updated user.
    pass
`,
        },
      ],

      sampleTests: [
        {
          id:
            'sample-1',

          title:
            'Update user',

          description:
            'PUT /users/1 should return the user ID and updated user information.',
        },
      ],
    },

    /* =====================================================
       08 — DELETE USER
    ===================================================== */

    {
      slug:
        'fastapi-delete-user',

      title:
        'Delete User API',

      technologySlug:
        'fastapi',

      difficulty:
        'Medium',

      workspaceType:
        'framework',

      shortDescription:
        'Create a DELETE endpoint for removing a user.',

      problemStatement:
        `Create a user deletion endpoint.

Requirements:

1. Define DELETE /users/{user_id}.
2. Accept user_id as an integer.
3. Return:

{
  "message": "User deleted successfully"
}`,

      inputFormat:
        'Path example: /users/1',

      outputFormat:
        `Return:

{
  "message": "User deleted successfully"
}`,

      constraints: [
        'Use @app.delete().',
        'Accept user_id as an integer.',
        'Return the required message.',
      ],

      skills: [
        'FastAPI',
        'DELETE Requests',
        'Path Parameters',
        'REST APIs',
      ],

      estimatedMinutes:
        20,

      defaultLanguage:
        'python',

      allowedLanguages: [
        'python',
      ],

      starterFiles: [
        {
          path:
            'main.py',

          language:
            'python',

          content:
            `from fastapi import FastAPI

app = FastAPI()

@app.delete("/users/{user_id}")
def delete_user(user_id: int):
    # Return the required success response.
    pass
`,
        },
      ],

      sampleTests: [
        {
          id:
            'sample-1',

          title:
            'Delete user',

          description:
            'DELETE /users/1 should return the required success message.',
        },
      ],
    },

    /* =====================================================
       09 — TASK MANAGEMENT CRUD API
    ===================================================== */

    {
      slug:
        'fastapi-task-crud',

      title:
        'Build a Task Management API',

      technologySlug:
        'fastapi',

      difficulty:
        'Hard',

      workspaceType:
        'framework',

      shortDescription:
        'Build an in-memory task management REST API.',

      problemStatement:
        `Build a task management API.

Create Task with:

1. title: str
2. completed: bool

The application must support:

1. GET /tasks
2. GET /tasks/{task_id}
3. POST /tasks
4. PUT /tasks/{task_id}
5. DELETE /tasks/{task_id}

Store task data in memory.`,

      inputFormat:
        `Example POST body:

{
  "title": "Learn FastAPI",
  "completed": false
}`,

      outputFormat:
        'The endpoints must return the appropriate task data as JSON.',

      constraints: [
        'Use a Pydantic Task model.',
        'Store tasks in memory.',
        'Implement GET, POST, PUT, and DELETE.',
        'Use task IDs for individual task operations.',
      ],

      skills: [
        'FastAPI',
        'CRUD',
        'REST APIs',
        'Pydantic',
        'In-memory Data',
      ],

      estimatedMinutes:
        40,

      defaultLanguage:
        'python',

      allowedLanguages: [
        'python',
      ],

      starterFiles: [
        {
          path:
            'main.py',

          language:
            'python',

          content:
            `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Task(BaseModel):
    title: str
    completed: bool = False

tasks = []

# Implement the required task endpoints below.
`,
        },
      ],

      sampleTests: [
        {
          id:
            'sample-1',

          title:
            'Task management',

          description:
            'The API should create, retrieve, update, and delete tasks.',
        },
      ],
    },

    /* =====================================================
       10 — INVENTORY MANAGEMENT API
    ===================================================== */

    {
      slug:
        'fastapi-inventory-api',

      title:
        'Build an Inventory Management API',

      technologySlug:
        'fastapi',

      difficulty:
        'Hard',

      workspaceType:
        'framework',

      shortDescription:
        'Build an inventory management REST API with FastAPI.',

      problemStatement:
        `Build an inventory management API.

Create InventoryItem with:

1. name: str
2. price: float
3. quantity: int

The API must support:

1. GET /inventory
2. GET /inventory/{item_id}
3. POST /inventory
4. PUT /inventory/{item_id}

Store inventory items in memory and return JSON responses.`,

      inputFormat:
        `Example request body:

{
  "name": "Laptop",
  "price": 50000,
  "quantity": 5
}`,

      outputFormat:
        'Return inventory data as JSON from each endpoint.',

      constraints: [
        'Use FastAPI.',
        'Use a Pydantic InventoryItem model.',
        'Store inventory items in memory.',
        'Implement GET, POST, and PUT operations.',
        'Use item IDs for individual inventory operations.',
      ],

      skills: [
        'FastAPI',
        'REST APIs',
        'Pydantic',
        'CRUD',
        'Inventory Management',
      ],

      estimatedMinutes:
        40,

      defaultLanguage:
        'python',

      allowedLanguages: [
        'python',
      ],

      starterFiles: [
        {
          path:
            'main.py',

          language:
            'python',

          content:
            `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class InventoryItem(BaseModel):
    name: str
    price: float
    quantity: int

inventory = []

# Implement the required inventory endpoints below.
`,
        },
      ],

      sampleTests: [
        {
          id:
            'sample-1',

          title:
            'Inventory management',

          description:
            'The API should list, retrieve, create, and update inventory items.',
        },
      ],
    },
  ];