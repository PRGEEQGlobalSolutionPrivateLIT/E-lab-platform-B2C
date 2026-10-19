/* =========================================================
   ANGULAR HIDDEN TEST CASES

   These tests are sent only by the NestJS API during Submit.
   They are never exposed to the learner frontend.

   Supported Angular Judge test types:
   - text
   - click
   - input
========================================================= */

export type AngularHiddenTestCase = {
  type:
    | 'text'
    | 'click'
    | 'input';

  selector?: string;

  text?: string;

  value?: string;

  expectedText?: string;

  absentText?: string;
};

/* =========================================================
   ANGULAR COUNTER
========================================================= */

const angularCounterTests:
  AngularHiddenTestCase[] = [
    {
      type:
        'text',

      text:
        'Count: 0',
    },

    {
      type:
        'click',

      selector:
        'button',

      expectedText:
        'Count: 1',
    },

    {
      type:
        'click',

      selector:
        'button',

      expectedText:
        'Count: 2',
    },

    {
      type:
        'click',

      selector:
        'button',

      expectedText:
        'Count: 3',
    },
  ];

/* =========================================================
   ANGULAR SEARCH PRODUCTS
========================================================= */

const angularSearchProductsTests:
  AngularHiddenTestCase[] = [
    {
      type:
        'text',

      text:
        'Laptop',
    },

    {
      type:
        'text',

      text:
        'Phone',
    },

    {
      type:
        'text',

      text:
        'Headphones',
    },

    {
      type:
        'input',

      selector:
        'input',

      value:
        'phone',

      expectedText:
        'Phone',

      absentText:
        'Laptop',
    },

    {
      type:
        'input',

      selector:
        'input',

      value:
        'HEAD',

      expectedText:
        'Headphones',

      absentText:
        'Phone',
    },

    {
      type:
        'input',

      selector:
        'input',

      value:
        'key',

      expectedText:
        'Keyboard',

      absentText:
        'Laptop',
    },
  ];

/* =========================================================
   ANGULAR TODO
========================================================= */

const angularTodoTests:
  AngularHiddenTestCase[] = [
    {
      type:
        'text',

      text:
        'Todo',
    },

    {
      type:
        'input',

      selector:
        'input',

      value:
        'Buy milk',
    },

    {
      type:
        'click',

      selector:
        'button',

      expectedText:
        'Buy milk',
    },
  ];

/* =========================================================
   ANGULAR USER DIRECTORY
========================================================= */

const angularUserDirectoryTests:
  AngularHiddenTestCase[] = [
    {
      type:
        'text',

      text:
        'Alice Johnson',
    },

    {
      type:
        'text',

      text:
        'bob@example.com',
    },

    {
      type:
        'input',

      selector:
        'input',

      value:
        'DIANA',

      expectedText:
        'Diana Prince',

      absentText:
        'Alice Johnson',
    },

    {
      type:
        'input',

      selector:
        'input',

      value:
        'bob',

      expectedText:
        'bob@example.com',

      absentText:
        'Alice Johnson',
    },
  ];

/* =========================================================
   GET ANGULAR TEST CASES
========================================================= */

export function getAngularTestCases(
  problemSlug: string,
): AngularHiddenTestCase[] {
  if (
    problemSlug ===
    'angular-counter'
  ) {
    return angularCounterTests;
  }

  if (
    problemSlug ===
    'angular-search-products'
  ) {
    return angularSearchProductsTests;
  }

  if (
    problemSlug ===
    'angular-todo'
  ) {
    return angularTodoTests;
  }

  if (
    problemSlug ===
    'angular-user-directory'
  ) {
    return angularUserDirectoryTests;
  }

  return [];
}
