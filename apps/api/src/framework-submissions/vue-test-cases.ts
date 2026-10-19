/* =========================================================
   VUE HIDDEN TEST CASES

   Used only for SUBMIT.

   Path:
   apps/api/src/framework-submissions/vue-test-cases.ts

   These tests are sent from NestJS to the Vue Judge.
   They are NOT exposed to the learner frontend.
========================================================= */

/* =========================================================
   TYPES
========================================================= */

export type VueTextTestCase = {
  type: 'text';

  text: string;
};

export type VueClickTestCase = {
  type: 'click';

  selector: string;

  expectedText: string;
};

export type VueInputTestCase = {
  type: 'input';

  selector: string;

  value: string;

  expectedText?: string;

  absentText?: string;
};

export type VueHiddenTestCase =
  | VueTextTestCase
  | VueClickTestCase
  | VueInputTestCase;

/* =========================================================
   GET VUE HIDDEN TEST CASES
========================================================= */

export function getVueTestCases(
  problemSlug: string,
): VueHiddenTestCase[] {
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
     VUE HELLO WORLD

     Problem slug:

     vue-hello-world

     Requirements tested:

     1. Vue application builds successfully
     2. Application renders Hello, World!
     3. Expected text is present in the rendered output
  ======================================================= */

  if (
    slug ===
    'vue-hello-world'
  ) {
    return [
      {
        type:
          'text',

        text:
          'Hello, World!',
      },
    ];
  }

  /* =======================================================
     FUTURE PROBLEM
     VUE COUNTER
  ======================================================= */

  if (
    slug ===
    'vue-counter'
  ) {
    /*
     * Hidden tests will be added when
     * vue-counter Judge support is implemented.
     */

    return [];
  }

  /* =======================================================
     FUTURE PROBLEM
     VUE TODO
  ======================================================= */

  if (
    slug ===
    'vue-todo'
  ) {
    /*
     * Hidden tests will be added when
     * vue-todo Judge support is implemented.
     */

    return [];
  }

  /* =======================================================
     FUTURE PROBLEM
     VUE SEARCH PRODUCTS
  ======================================================= */

  if (
    slug ===
    'vue-search-products'
  ) {
    /*
     * Hidden tests will be added when
     * vue-search-products Judge support is implemented.
     */

    return [];
  }

  /* =======================================================
     FUTURE PROBLEM
     VUE USER DIRECTORY
  ======================================================= */

  if (
    slug ===
    'vue-user-directory'
  ) {
    /*
     * Hidden tests will be added when
     * vue-user-directory Judge support is implemented.
     */

    return [];
  }

  /* =======================================================
     UNKNOWN VUE PROBLEM
  ======================================================= */

  return [];
}