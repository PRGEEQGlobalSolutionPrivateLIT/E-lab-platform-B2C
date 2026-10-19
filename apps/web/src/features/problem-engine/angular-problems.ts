import type {
  PracticeProblem,
} from './types';

/* =========================================================
   ANGULAR PRACTICE PROBLEMS

   Technology:
   angular

   Workspace:
   framework

   Runtime:
   Angular + TypeScript

   Entry file:
   app.component.ts
========================================================= */

export const angularProblems:
  PracticeProblem[] = [

  /* =======================================================
     1. ANGULAR COUNTER
  ======================================================= */

  {
    slug:
      'angular-counter',

    title:
      'Angular Counter',

    technologySlug:
      'angular',

    difficulty:
      'Easy',

    workspaceType:
      'framework',

    shortDescription:
      'Build a simple Angular counter that increments when the user clicks a button.',

    problemStatement: `
# Angular Counter

Create an Angular component that displays a counter and allows the user to increment it.

## Requirements

1. Display the current count.
2. The initial count must be 0.
3. Display an Increment button.
4. Clicking the button must increase the count by 1.
5. The displayed count must update immediately.
`,

    skills: [
      'Angular',
      'Components',
      'Templates',
      'Interpolation',
      'Event Binding',
      'Component State',
    ],

    estimatedMinutes:
      10,

    defaultLanguage:
      'typescript',

    allowedLanguages: [
      'typescript',
    ],

    starterFiles: [
      {
        path:
          'app.component.ts',

        language:
          'typescript',

        content: `import {
  Component,
} from '@angular/core';

@Component({
  selector: 'app-root',

  standalone: true,

  template: \`
    <div>
      <h1>Angular Counter</h1>

      <!-- Display the current count -->

      <!-- Add an Increment button -->
    </div>
  \`,
})
export class AppComponent {
  count = 0;
}
`,
      },
    ],
  },

  /* =======================================================
     2. SEARCH PRODUCTS
  ======================================================= */

  {
    slug:
      'angular-search-products',

    title:
      'Search Products',

    technologySlug:
      'angular',

    difficulty:
      'Medium',

    workspaceType:
      'framework',

    shortDescription:
      'Create an Angular component that filters a list of products as the user types.',

    problemStatement: `
# Search Products

Create an Angular component that displays and filters a list of products.

## Requirements

1. Display a search input.
2. Display the provided products.
3. Update the visible product list as the user types.
4. Product matching should be case-insensitive.

## Products

- Laptop
- Phone
- Tablet
- Headphones
- Keyboard
- Mouse
`,

    skills: [
      'Angular',
      'Components',
      'Forms',
      'Event Binding',
      'Filtering',
      'Lists',
      'Conditional Rendering',
    ],

    estimatedMinutes:
      20,

    defaultLanguage:
      'typescript',

    allowedLanguages: [
      'typescript',
    ],

    starterFiles: [
      {
        path:
          'app.component.ts',

        language:
          'typescript',

        content: `import {
  Component,
} from '@angular/core';

@Component({
  selector: 'app-root',

  standalone: true,

  template: \`
    <div>
      <h1>Search Products</h1>

      <!-- Add a search input -->

      <!-- Display the filtered products -->
    </div>
  \`,
})
export class AppComponent {
  products = [
    'Laptop',
    'Phone',
    'Tablet',
    'Headphones',
    'Keyboard',
    'Mouse',
  ];

  search = '';

  get filteredProducts() {
    return this.products;
  }
}
`,
      },
    ],
  },

  /* =======================================================
     3. ANGULAR TODO
  ======================================================= */

  {
    slug:
      'angular-todo',

    title:
      'Angular Todo List',

    technologySlug:
      'angular',

    difficulty:
      'Medium',

    workspaceType:
      'framework',

    shortDescription:
      'Build an Angular todo list where users can add and remove tasks.',

    problemStatement: `
# Angular Todo List

Create an Angular component that manages a simple todo list.

## Requirements

1. Display an input for entering a task.
2. Display an Add Task button.
3. Add a new task when the button is clicked.
4. Display all added tasks.
5. Do not add empty tasks.
6. Allow a task to be removed.
`,

    skills: [
      'Angular',
      'Components',
      'Forms',
      'Event Binding',
      'Lists',
      'State Management',
      'Conditional Rendering',
    ],

    estimatedMinutes:
      25,

    defaultLanguage:
      'typescript',

    allowedLanguages: [
      'typescript',
    ],

    starterFiles: [
      {
        path:
          'app.component.ts',

        language:
          'typescript',

        content: `import {
  Component,
} from '@angular/core';

@Component({
  selector: 'app-root',

  standalone: true,

  template: \`
    <div>
      <h1>Todo List</h1>

      <!-- Add task input -->

      <!-- Add Task button -->

      <!-- Display tasks -->
    </div>
  \`,
})
export class AppComponent {
  task = '';

  tasks: string[] = [];

  addTask() {
    // Add task logic
  }

  removeTask(
    index: number,
  ) {
    // Remove task logic
  }
}
`,
      },
    ],
  },

  /* =======================================================
     4. USER DIRECTORY
  ======================================================= */

  {
    slug:
      'angular-user-directory',

    title:
      'User Directory',

    technologySlug:
      'angular',

    difficulty:
      'Hard',

    workspaceType:
      'framework',

    shortDescription:
      'Build a searchable Angular user directory with dynamic filtering.',

    problemStatement: `
# User Directory

Create an Angular component that displays and filters a directory of users.

## Requirements

1. Display a search input.
2. Display all provided users initially.
3. Show each user's name and email address.
4. Filter users as the user types.
5. Search must be case-insensitive.
6. Search should match either the user's name or email.
7. Display a message when no users match.

## Users

1. Alice Johnson — alice@example.com
2. Bob Smith — bob@example.com
3. Charlie Brown — charlie@example.com
4. Diana Prince — diana@example.com
`,

    skills: [
      'Angular',
      'Components',
      'Templates',
      'Forms',
      'Filtering',
      'Objects',
      'Lists',
      'Conditional Rendering',
    ],

    estimatedMinutes:
      30,

    defaultLanguage:
      'typescript',

    allowedLanguages: [
      'typescript',
    ],

    starterFiles: [
      {
        path:
          'app.component.ts',

        language:
          'typescript',

        content: `import {
  Component,
} from '@angular/core';

type User = {
  name: string;
  email: string;
};

@Component({
  selector: 'app-root',

  standalone: true,

  template: \`
    <div>
      <h1>User Directory</h1>

      <!-- Add search input -->

      <!-- Display filtered users -->

      <!-- Display empty-state message -->
    </div>
  \`,
})
export class AppComponent {
  search = '';

  users: User[] = [
    {
      name: 'Alice Johnson',
      email: 'alice@example.com',
    },
    {
      name: 'Bob Smith',
      email: 'bob@example.com',
    },
    {
      name: 'Charlie Brown',
      email: 'charlie@example.com',
    },
    {
      name: 'Diana Prince',
      email: 'diana@example.com',
    },
  ];

  get filteredUsers() {
    return this.users;
  }
}
`,
      },
    ],
  },
];

/* =========================================================
   ANGULAR PROBLEM LOOKUP
========================================================= */

export function getAngularProblemBySlug(
  problemSlug: string,
) {
  return angularProblems.find(
    (problem) =>
      problem.slug ===
      problemSlug,
  );
}