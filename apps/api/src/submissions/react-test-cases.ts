/* =========================================================
   REACT HIDDEN TEST CASES

   Used by:

   POST /api/v1/framework-submissions

   These tests are NOT sent to the frontend.

   Current React problems:
   - react-counter
   - react-search-products
========================================================= */

export type ReactHiddenTestCase = {
  type:
    | 'text'
    | 'click'
    | 'input';

  /* =======================================================
     TEXT TEST
  ======================================================= */

  text?: string;

  /* =======================================================
     CLICK / INPUT TEST
  ======================================================= */

  selector?: string;

  /* =======================================================
     INPUT TEST
  ======================================================= */

  value?: string;

  /* =======================================================
     ASSERTIONS
  ======================================================= */

  expectedText?: string;

  absentText?: string;
};

/* =========================================================
   GET REACT HIDDEN TESTS
========================================================= */

export function getReactTestCases(
  problemSlug: string,
): ReactHiddenTestCase[] {
  /* =======================================================
     REACT COUNTER
  ======================================================= */

  if (
    problemSlug ===
    'react-counter'
  ) {
    return [
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
    ];
  }

  /* =======================================================
     SEARCH PRODUCTS

     Requirements verified:

     1. Products are initially displayed
     2. Search input filters products
     3. Non-matching products disappear
     4. Search is case-insensitive
  ======================================================= */

  if (
    problemSlug ===
    'react-search-products'
  ) {
    return [
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
          'Mouse',
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
          'TAB',

        expectedText:
          'Tablet',

        absentText:
          'Keyboard',
      },
    ];
  }

  /* =======================================================
     UNKNOWN REACT PROBLEM
  ======================================================= */

  return [];
}