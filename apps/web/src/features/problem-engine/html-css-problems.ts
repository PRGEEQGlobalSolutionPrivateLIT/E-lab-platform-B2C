import type {
  PracticeProblem,
} from './types';

/* =========================================================
   HTML / CSS WEB PROBLEMS

   workspaceType = web

   These problems do NOT use the normal console Judge.

   HTML:
   - index.html

   CSS:
   - style.css
   - index.html

   Multi-file editing and browser preview will be added
   in Step 2 and Step 3.
========================================================= */

/* =========================================================
   HTML — 01
   PROFILE PAGE
========================================================= */

const htmlProfilePage:
  PracticeProblem = {
  slug:
    'html-profile-page',

  title:
    'Build a Profile Page',

  technologySlug:
    'html-css',

  difficulty:
    'Easy',

  workspaceType:
    'web',

  shortDescription:
    'Build a semantic personal profile page using HTML.',

  problemStatement:
    `Create a personal profile page using semantic HTML.

Your page should contain:

- A main page heading
- A short introduction
- A profile section
- A skills list
- A contact section
- Semantic HTML elements where appropriate`,

  outputFormat:
    'Render the completed profile page in the browser.',

  skills: [
    'HTML',
    'Semantic HTML',
    'Headings',
    'Paragraphs',
    'Lists',
    'Sections',
    'Accessibility',
  ],

  estimatedMinutes:
    20,

  defaultLanguage:
    'html',

  allowedLanguages: [
    'html',
  ],

  starterFiles: [
    {
      path:
        'index.html',

      language:
        'html',

      content:
        `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    />

    <title>My Profile</title>
</head>

<body>
    <main>
        <!-- Add your profile content here -->
    </main>
</body>
</html>
`,
    },
  ],
};

/* =========================================================
   HTML — 02
   REGISTRATION FORM
========================================================= */

const htmlRegistrationForm:
  PracticeProblem = {
  slug:
    'html-registration-form',

  title:
    'Build a Registration Form',

  technologySlug:
    'html-css',

  difficulty:
    'Easy',

  workspaceType:
    'web',

  shortDescription:
    'Create an accessible registration form using HTML.',

  problemStatement:
    `Create a registration form.

The form should contain:

- Full name
- Email address
- Password
- Confirm password
- A role selection
- Terms and conditions checkbox
- Submit button

Use labels correctly for every form control.`,

  outputFormat:
    'Render the completed registration form in the browser.',

  skills: [
    'HTML Forms',
    'Input Elements',
    'Labels',
    'Select',
    'Checkbox',
    'Buttons',
    'Accessibility',
  ],

  estimatedMinutes:
    25,

  defaultLanguage:
    'html',

  allowedLanguages: [
    'html',
  ],

  starterFiles: [
    {
      path:
        'index.html',

      language:
        'html',

      content:
        `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    />

    <title>Registration Form</title>
</head>

<body>
    <main>
        <h1>Create Account</h1>

        <form>
            <!-- Add registration fields here -->
        </form>
    </main>
</body>
</html>
`,
    },
  ],
};

/* =========================================================
   HTML — 03
   SEMANTIC BLOG
========================================================= */

const htmlSemanticBlog:
  PracticeProblem = {
  slug:
    'html-semantic-blog',

  title:
    'Build a Semantic Blog Page',

  technologySlug:
    'html-css',

  difficulty:
    'Medium',

  workspaceType:
    'web',

  shortDescription:
    'Structure a blog page using semantic HTML elements.',

  problemStatement:
    `Build a semantic blog page.

Use appropriate HTML elements for:

- Header
- Navigation
- Main content
- Blog article
- Article sections
- Author information
- Footer

The document should have a logical heading structure.`,

  outputFormat:
    'Render the semantic blog page in the browser.',

  skills: [
    'Semantic HTML',
    'Header',
    'Navigation',
    'Main',
    'Article',
    'Section',
    'Footer',
    'Accessibility',
  ],

  estimatedMinutes:
    30,

  defaultLanguage:
    'html',

  allowedLanguages: [
    'html',
  ],

  starterFiles: [
    {
      path:
        'index.html',

      language:
        'html',

      content:
        `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    />

    <title>Semantic Blog</title>
</head>

<body>
    <!-- Build the semantic blog structure here -->
</body>
</html>
`,
    },
  ],
};

/* =========================================================
   CSS — 01
   RESPONSIVE CARD

   IMPORTANT:
   style.css is intentionally first.

   Until Step 2 adds file tabs, your current Workspace reads
   starterFiles[0]. For a CSS problem we therefore want
   Monaco to initially display CSS, matching defaultLanguage.
========================================================= */

const cssResponsiveCard:
  PracticeProblem = {
  slug:
    'css-responsive-card',

  title:
    'Build a Responsive Card',

  technologySlug:
    'html-css',

  difficulty:
    'Easy',

  workspaceType:
    'web',

  shortDescription:
    'Style a responsive content card using CSS.',

  problemStatement:
    `Style the provided card using CSS.

Your card should:

- Have a readable maximum width
- Be centered on the page
- Include internal spacing
- Use rounded corners
- Adapt to smaller screen widths
- Maintain readable typography`,

  outputFormat:
    'Render the styled responsive card in the browser.',

  skills: [
    'CSS',
    'Box Model',
    'Spacing',
    'Responsive Design',
    'Border Radius',
    'Typography',
  ],

  estimatedMinutes:
    20,

  defaultLanguage:
    'css',

  allowedLanguages: [
    'html',
    'css',
  ],

  starterFiles: [
    {
      path:
        'style.css',

      language:
        'css',

      content:
        `/* Style the card here */

body {
    margin: 0;
    font-family: Arial, sans-serif;
}

.card {

}
`,
    },

    {
      path:
        'index.html',

      language:
        'html',

      content:
        `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    />

    <title>Responsive Card</title>

    <link
        rel="stylesheet"
        href="style.css"
    />
</head>

<body>
    <main>
        <article class="card">
            <h1>Responsive Card</h1>

            <p>
                Create a clean responsive card using CSS.
            </p>
        </article>
    </main>
</body>
</html>
`,
    },
  ],
};

/* =========================================================
   CSS — 02
   FLEXBOX NAVBAR
========================================================= */

const cssFlexboxNavbar:
  PracticeProblem = {
  slug:
    'css-flexbox-navbar',

  title:
    'Build a Flexbox Navbar',

  technologySlug:
    'html-css',

  difficulty:
    'Medium',

  workspaceType:
    'web',

  shortDescription:
    'Create a responsive navigation bar using CSS Flexbox.',

  problemStatement:
    `Style the provided navigation bar using Flexbox.

Requirements:

- Brand and navigation links should share one row
- Use Flexbox for layout
- Navigation links should have consistent spacing
- Navbar should remain usable on smaller screens
- Avoid absolute positioning for the main layout`,

  outputFormat:
    'Render the completed Flexbox navigation bar in the browser.',

  skills: [
    'CSS',
    'Flexbox',
    'Navigation',
    'Alignment',
    'Gap',
    'Responsive Design',
  ],

  estimatedMinutes:
    25,

  defaultLanguage:
    'css',

  allowedLanguages: [
    'html',
    'css',
  ],

  starterFiles: [
    {
      path:
        'style.css',

      language:
        'css',

      content:
        `/* Build the Flexbox navigation here */

body {
    margin: 0;
    font-family: Arial, sans-serif;
}

.navbar {

}

.nav-links {

}
`,
    },

    {
      path:
        'index.html',

      language:
        'html',

      content:
        `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    />

    <title>Flexbox Navbar</title>

    <link
        rel="stylesheet"
        href="style.css"
    />
</head>

<body>
    <nav class="navbar">
        <a
            class="brand"
            href="#"
        >
            eLab
        </a>

        <div class="nav-links">
            <a href="#home">
                Home
            </a>

            <a href="#courses">
                Courses
            </a>

            <a href="#about">
                About
            </a>

            <a href="#contact">
                Contact
            </a>
        </div>
    </nav>
</body>
</html>
`,
    },
  ],
};

/* =========================================================
   CSS — 03
   GRID DASHBOARD
========================================================= */

const cssGridDashboard:
  PracticeProblem = {
  slug:
    'css-grid-dashboard',

  title:
    'Build a CSS Grid Dashboard',

  technologySlug:
    'html-css',

  difficulty:
    'Medium',

  workspaceType:
    'web',

  shortDescription:
    'Create a responsive dashboard layout using CSS Grid.',

  problemStatement:
    `Build the dashboard layout using CSS Grid.

Requirements:

- Use CSS Grid for the dashboard cards
- Display multiple columns on wider screens
- Maintain consistent gaps
- Change to fewer columns on smaller screens
- Keep all cards readable and responsive`,

  outputFormat:
    'Render the responsive dashboard in the browser.',

  skills: [
    'CSS',
    'CSS Grid',
    'Responsive Design',
    'Grid Template Columns',
    'Gap',
    'Media Queries',
  ],

  estimatedMinutes:
    30,

  defaultLanguage:
    'css',

  allowedLanguages: [
    'html',
    'css',
  ],

  starterFiles: [
    {
      path:
        'style.css',

      language:
        'css',

      content:
        `/* Build the dashboard grid here */

body {
    margin: 0;
    font-family: Arial, sans-serif;
}

.dashboard {

}

.dashboard-card {

}
`,
    },

    {
      path:
        'index.html',

      language:
        'html',

      content:
        `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    />

    <title>Grid Dashboard</title>

    <link
        rel="stylesheet"
        href="style.css"
    />
</head>

<body>
    <main class="dashboard">
        <section class="dashboard-card">
            <h2>Users</h2>
            <p>1,240</p>
        </section>

        <section class="dashboard-card">
            <h2>Courses</h2>
            <p>84</p>
        </section>

        <section class="dashboard-card">
            <h2>Completed</h2>
            <p>732</p>
        </section>

        <section class="dashboard-card">
            <h2>Progress</h2>
            <p>76%</p>
        </section>
    </main>
</body>
</html>
`,
    },
  ],
};

/* =========================================================
   EXPORT
========================================================= */

export const htmlCssProblems:
  PracticeProblem[] = [
    htmlProfilePage,
    htmlRegistrationForm,
    htmlSemanticBlog,

    cssResponsiveCard,
    cssFlexboxNavbar,
    cssGridDashboard,
  ];