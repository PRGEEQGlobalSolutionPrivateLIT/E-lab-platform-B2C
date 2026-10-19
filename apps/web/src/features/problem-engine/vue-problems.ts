import type {
  PracticeProblem,
} from './types';

export const vueProblems: PracticeProblem[] = [
  {
    slug: 'vue-hello-world',

    title: 'Hello World',

    technologySlug: 'vue',

    difficulty: 'Easy',

    workspaceType: 'framework',

    shortDescription:
      'Create a simple Vue application that displays Hello, World! in the browser.',

    problemStatement:
      'Create a Vue component that displays Hello, World! as the main heading.',

    outputFormat:
      'Render Hello, World! as a heading in the browser.',

    skills: [
      'Vue.js',
      'Vue Components',
      'Template Syntax',
      'HTML',
    ],

    estimatedMinutes: 10,

    defaultLanguage: 'html',

    allowedLanguages: [
      'html',
      'css',
      'javascript',
    ],

    starterFiles: [
      {
        path: 'src/App.vue',
        language: 'html',
        content: `<template>
  <h1>Hello, World!</h1>
</template>
`,
      },
      {
        path: 'src/main.js',
        language: 'javascript',
        content: `import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
`,
      },
      {
        path: 'src/style.css',
        language: 'css',
        content: `body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
}
`,
      },
      {
        path: 'index.html',
        language: 'html',
        content: `<div id="app"></div>
`,
      },
    ],

    sampleTests: [
      {
        id: 'sample-1',

        title: 'Expected Output',

        expectedOutput:
          'Hello, World!',
      },
    ],
  },

  {
    slug: 'vue-display-name',

    title: 'Display a Name',

    technologySlug: 'vue',

    difficulty: 'Easy',

    workspaceType: 'framework',

    shortDescription:
      'Display a value from Vue component state in the template.',

    problemStatement:
      'Create a Vue component that stores the name Ananya and displays Hello, Ananya! in the browser.',

    outputFormat:
      'Render Hello, Ananya! in the browser.',

    skills: [
      'Vue.js',
      'Template Interpolation',
      'Component State',
    ],

    estimatedMinutes: 10,

    defaultLanguage: 'html',

    allowedLanguages: [
      'html',
      'css',
      'javascript',
    ],

    starterFiles: [
      {
        path: 'src/App.vue',
        language: 'html',
        content: `<script setup>
const name = 'Ananya';
</script>

<template>
  <h1>Hello, {{ name }}!</h1>
</template>
`,
      },
      {
        path: 'src/main.js',
        language: 'javascript',
        content: `import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
`,
      },
      {
        path: 'index.html',
        language: 'html',
        content: `<div id="app"></div>
`,
      },
    ],

    sampleTests: [
      {
        id: 'sample-1',

        title: 'Expected Output',

        expectedOutput:
          'Hello, Ananya!',
      },
    ],
  },

  {
    slug: 'vue-counter',

    title: 'Create a Counter',

    technologySlug: 'vue',

    difficulty: 'Easy',

    workspaceType: 'framework',

    shortDescription:
      'Build an interactive counter using Vue reactive state.',

    problemStatement:
      'Create a Vue counter that starts at 0. Add a button that increases the counter by 1 whenever it is clicked.',

    outputFormat:
      'Display the current counter value and an Increment button.',

    skills: [
      'Vue.js',
      'ref',
      'Event Handling',
      'Reactive State',
    ],

    estimatedMinutes: 15,

    defaultLanguage: 'html',

    allowedLanguages: [
      'html',
      'css',
      'javascript',
    ],

    starterFiles: [
      {
        path: 'src/App.vue',
        language: 'html',
        content: `<script setup>
import { ref } from 'vue';

const count = ref(0);
</script>

<template>
  <main>
    <h1>Count: {{ count }}</h1>
    <button @click="count++">
      Increment
    </button>
  </main>
</template>
`,
      },
      {
        path: 'src/main.js',
        language: 'javascript',
        content: `import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
`,
      },
      {
        path: 'index.html',
        language: 'html',
        content: `<div id="app"></div>
`,
      },
    ],
  },

  {
    slug: 'vue-show-message',

    title: 'Show a Message',

    technologySlug: 'vue',

    difficulty: 'Easy',

    workspaceType: 'framework',

    shortDescription:
      'Use conditional rendering to show content in Vue.',

    problemStatement:
      'Create a Vue component that displays Welcome to Vue! when the showMessage value is true.',

    outputFormat:
      'Render Welcome to Vue! when the condition is true.',

    skills: [
      'Vue.js',
      'v-if',
      'Conditional Rendering',
    ],

    estimatedMinutes: 15,

    defaultLanguage: 'html',

    allowedLanguages: [
      'html',
      'css',
      'javascript',
    ],

    starterFiles: [
      {
        path: 'src/App.vue',
        language: 'html',
        content: `<script setup>
const showMessage = true;
</script>

<template>
  <h1 v-if="showMessage">
    Welcome to Vue!
  </h1>
</template>
`,
      },
      {
        path: 'src/main.js',
        language: 'javascript',
        content: `import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
`,
      },
      {
        path: 'index.html',
        language: 'html',
        content: `<div id="app"></div>
`,
      },
    ],
  },

  {
    slug: 'vue-render-list',

    title: 'Render a List',

    technologySlug: 'vue',

    difficulty: 'Easy',

    workspaceType: 'framework',

    shortDescription:
      'Render multiple items using the Vue v-for directive.',

    problemStatement:
      'Create a Vue component that displays HTML, CSS and JavaScript as a list using v-for.',

    outputFormat:
      'Render HTML, CSS and JavaScript as list items.',

    skills: [
      'Vue.js',
      'v-for',
      'Lists',
      'Template Syntax',
    ],

    estimatedMinutes: 15,

    defaultLanguage: 'html',

    allowedLanguages: [
      'html',
      'css',
      'javascript',
    ],

    starterFiles: [
      {
        path: 'src/App.vue',
        language: 'html',
        content: `<script setup>
const skills = [
  'HTML',
  'CSS',
  'JavaScript',
];
</script>

<template>
  <ul>
    <li
      v-for="skill in skills"
      :key="skill"
    >
      {{ skill }}
    </li>
  </ul>
</template>
`,
      },
      {
        path: 'src/main.js',
        language: 'javascript',
        content: `import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
`,
      },
      {
        path: 'index.html',
        language: 'html',
        content: `<div id="app"></div>
`,
      },
    ],
  },
];