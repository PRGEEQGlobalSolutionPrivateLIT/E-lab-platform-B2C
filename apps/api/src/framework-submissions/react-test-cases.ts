/* =========================================================
   REACT HIDDEN TEST CASES

   Used only for SUBMIT.

   Path:
   apps/api/src/framework-submissions/react-test-cases.ts

   These tests are sent from NestJS to the React Judge.
   They are NOT exposed to the learner frontend.
========================================================= */

/* =========================================================
   TYPES
========================================================= */

export type ReactTextTestCase = {
  type: 'text';

  text: string;
};

export type ReactClickTestCase = {
  type: 'click';

  selector: string;

  expectedText: string;
};

export type ReactInputTestCase = {
  type: 'input';

  selector: string;

  value: string;

  expectedText?: string;

  absentText?: string;
};

export type ReactHiddenTestCase =
  | ReactTextTestCase
  | ReactClickTestCase
  | ReactInputTestCase;

/* =========================================================
   GET REACT HIDDEN TEST CASES
========================================================= */

export function getReactTestCases(
  problemSlug: string,
): ReactHiddenTestCase[] {
  /* =======================================================
     NORMALIZE SLUG
  ======================================================= */

  const slug =
    String(
      problemSlug ??
        '',
    )
      .trim()
      .toLowerCase();

  /* =======================================================
     PROBLEM 1
     REACT COUNTER
  ======================================================= */

  if (
    slug ===
    'react-counter'
  ) {
    return [
      /* ---------------------------------------------------
         Initial state
      --------------------------------------------------- */

      {
        type:
          'text',

        text:
          'Count: 0',
      },

      /* ---------------------------------------------------
         First click
      --------------------------------------------------- */

      {
        type:
          'click',

        selector:
          'button',

        expectedText:
          'Count: 1',
      },

      /* ---------------------------------------------------
         Second click

         This also verifies that the state continues
         updating instead of being hard-coded.
      --------------------------------------------------- */

      {
        type:
          'click',

        selector:
          'button',

        expectedText:
          'Count: 2',
      },
    ];
  }

  /* =======================================================
     PROBLEM 2
     SEARCH PRODUCTS

     Problem slug:

     react-search-products

     Expected product data currently used by this problem:

     Laptop
     Phone
     Tablet
     Headphones
     Keyboard
     Mouse

     Requirements tested:

     1. Products render initially
     2. Search input exists and works
     3. Visible products update
     4. Non-matching products disappear
     5. Search is case-insensitive
  ======================================================= */

  if (
    slug ===
    'react-search-products'
  ) {
    return [
      /* ---------------------------------------------------
         INITIAL PRODUCTS
      --------------------------------------------------- */

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

      /* ---------------------------------------------------
         FILTER: phone

         Should show Phone.

         Laptop should no longer be visible.
      --------------------------------------------------- */

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

      /* ---------------------------------------------------
         CASE INSENSITIVE SEARCH

         HEAD must still find Headphones.
      --------------------------------------------------- */

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

      /* ---------------------------------------------------
         ANOTHER CASE INSENSITIVE SEARCH
      --------------------------------------------------- */

      {
        type:
          'input',

        selector:
          'input',

        value:
          'tab',

        expectedText:
          'Tablet',

        absentText:
          'Headphones',
      },

      /* ---------------------------------------------------
         PARTIAL SEARCH
      --------------------------------------------------- */

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
          'Tablet',
      },

      /* ---------------------------------------------------
         UPPERCASE SEARCH
      --------------------------------------------------- */

      {
        type:
          'input',

        selector:
          'input',

        value:
          'MOUSE',

        expectedText:
          'Mouse',

        absentText:
          'Keyboard',
      },
    ];
  }

  /* =======================================================
     FUTURE PROBLEM
     REACT TODO
  ======================================================= */

  if (
    slug ===
    'react-todo'
  ) {
    /*
     * Hidden tests will be added when
     * react-todo Judge support is implemented.
     */

    return [];
  }

  /* =======================================================
     FUTURE PROBLEM
     REACT USER DIRECTORY
  ======================================================= */

  if (
    slug ===
    'react-user-directory'
  ) {
    /*
     * Hidden tests will be added when
     * react-user-directory Judge support is implemented.
     */

    return [];
  }

  /* =======================================================
     UNKNOWN REACT PROBLEM
  ======================================================= */

  return [];
}