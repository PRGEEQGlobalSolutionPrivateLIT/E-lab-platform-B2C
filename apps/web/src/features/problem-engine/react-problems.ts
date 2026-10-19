import type {
  PracticeProblem,
} from './types';

/* =========================================================
   REACT PROBLEMS

   React uses the shared framework workspace.

   Runtime:
   React + esbuild + jsdom
========================================================= */

export const reactProblems:
  PracticeProblem[] = [
  /* =======================================================
     01 — COUNTER
  ======================================================= */

  {
    slug:
      'react-counter',

    title:
      'Build a Counter',

    technologySlug:
      'react',

    difficulty:
      'Easy',

    workspaceType:
      'framework',

    shortDescription:
      'Build an interactive counter using React state.',

    problemStatement:
      `Create a React counter component.

Requirements:

1. Display the current count starting at 0.
2. Display an Increment button.
3. Clicking Increment must increase the count by 1.
4. The updated count must be visible on the page.`,

    skills: [
      'React',
      'JSX',
      'useState',
      'Event Handling',
      'Component State',
    ],

    estimatedMinutes:
      15,

    defaultLanguage:
      'javascript',

    allowedLanguages: [
      'javascript',
    ],

    starterFiles: [
      {
        path:
          'App.jsx',

        language:
          'javascript',

        content:
          `import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* Display the current count */}

      {/* Add an Increment button */}
    </div>
  );
}
`,
      },
    ],
  },

  /* =======================================================
     02 — SEARCH PRODUCTS
  ======================================================= */

  {
    slug:
      'react-search-products',

    title:
      'Search Products',

    technologySlug:
      'react',

    difficulty:
      'Medium',

    workspaceType:
      'framework',

    shortDescription:
      'Build a searchable product list using React state.',

    problemStatement:
      `Create a React component that displays and filters a list of products.

Requirements:

1. Display a search input.
2. Display the provided products.
3. Update the visible product list as the user types.
4. Product matching should be case-insensitive.`,

    skills: [
      'React',
      'useState',
      'Forms',
      'Filtering',
      'Conditional Rendering',
    ],

    estimatedMinutes:
      25,

    defaultLanguage:
      'javascript',

    allowedLanguages: [
      'javascript',
    ],

    starterFiles: [
      {
        path:
          'App.jsx',

        language:
          'javascript',

        content:
          `import { useState } from 'react';

const products = [
  'Laptop',
  'Keyboard',
  'Mouse',
  'Monitor',
];

export default function App() {
  const [search, setSearch] = useState('');

  return (
    <div>
      {/* Build the product search interface here */}
    </div>
  );
}
`,
      },
    ],
  },

  /* =======================================================
     03 — TODO
  ======================================================= */

  {
    slug:
      'react-todo',

    title:
      'Todo List',

    technologySlug:
      'react',

    difficulty:
      'Medium',

    workspaceType:
      'framework',

    shortDescription:
      'Build an interactive todo list using React.',

    problemStatement:
      `Create a React todo list.

Requirements:

1. Provide an input for entering a todo.
2. Provide an Add button.
3. Clicking Add must add the entered todo to the list.
4. Display all added todos.
5. Do not add an empty todo.`,

    skills: [
      'React',
      'useState',
      'Forms',
      'Lists',
      'Event Handling',
    ],

    estimatedMinutes:
      30,

    defaultLanguage:
      'javascript',

    allowedLanguages: [
      'javascript',
    ],

    starterFiles: [
      {
        path:
          'App.jsx',

        language:
          'javascript',

        content:
          `import { useState } from 'react';

export default function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  return (
    <div>
      {/* Build the todo application here */}
    </div>
  );
}
`,
      },
    ],
  },

  /* =======================================================
     04 — USER DIRECTORY
  ======================================================= */

  {
    slug:
      'react-user-directory',

    title:
      'User Directory',

    technologySlug:
      'react',

    difficulty:
      'Hard',

    workspaceType:
      'framework',

    shortDescription:
      'Build a reusable user-directory interface.',

    problemStatement:
      `Create a React user directory.

Requirements:

1. Display the provided users.
2. Display each user's name and role.
3. Provide a search input.
4. Filter users by name as the user types.
5. Show a suitable message when no users match.`,

    skills: [
      'React',
      'Components',
      'useState',
      'Lists',
      'Filtering',
      'Conditional Rendering',
    ],

    estimatedMinutes:
      35,

    defaultLanguage:
      'javascript',

    allowedLanguages: [
      'javascript',
    ],

    starterFiles: [
      {
        path:
          'App.jsx',

        language:
          'javascript',

        content:
          `import { useState } from 'react';

const users = [
  {
    id: 1,
    name: 'Aarav',
    role: 'Developer',
  },
  {
    id: 2,
    name: 'Meera',
    role: 'Designer',
  },
  {
    id: 3,
    name: 'Rahul',
    role: 'Tester',
  },
];

export default function App() {
  const [search, setSearch] = useState('');

  return (
    <div>
      {/* Build the user directory here */}
    </div>
  );
}
`,
      },
    ],
  },
];