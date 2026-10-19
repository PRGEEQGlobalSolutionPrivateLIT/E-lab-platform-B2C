/* =========================================================
   SUBMIT DATABASE SOLUTION DTO

   Used by:

   POST
   /api/v1/database-lab/sessions/:sessionId/submit

   Example PostgreSQL body:

   {
     "sql": "CREATE DATABASE employee_management;",
     "problemSlug": "postgresql-create-database"
   }

   Example MySQL body:

   {
     "sql": "CREATE DATABASE employee_management;",
     "problemSlug": "mysql-create-database"
   }
========================================================= */

export class SubmitDatabaseSolutionDto {
  /* =======================================================
     LEARNER SQL

     SQL entered by the learner in the database workspace.
  ======================================================= */

  sql!: string;

  /* =======================================================
     PROBLEM SLUG

     Examples:

     postgresql-create-database
     mysql-create-database

     The active backend session remains the source of truth.

     DatabaseLabService can compare this value with the
     problemSlug stored in the active session before
     performing hidden validation.
  ======================================================= */

  problemSlug!: string;
}