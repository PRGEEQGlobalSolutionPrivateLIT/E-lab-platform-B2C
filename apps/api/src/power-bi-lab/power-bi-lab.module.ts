import {
  Module,
} from '@nestjs/common';

import {
  PowerBILabController,
} from './power-bi-lab.controller.js';

import {
  PowerBILabService,
} from './power-bi-lab.service.js';

import {
  PowerBIValidatorService,
} from './validation/power-bi-validator.service.js';

/* =========================================================
   POWER BI LAB MODULE

   Responsible for the Power BI practice workspace API.

   Includes:

   - Attempt creation
   - Attempt retrieval
   - Check Solution
   - Save Progress
   - Reset
   - Submit
   - Hidden backend validation
========================================================= */

@Module({
  /* =======================================================
     IMPORTS

     No external NestJS modules are currently required.

     Later, database modules such as PrismaModule can be
     added here when attempt persistence is moved from the
     in-memory Map to PostgreSQL.
  ======================================================= */

  imports: [],

  /* =======================================================
     CONTROLLERS
  ======================================================= */

  controllers: [
    PowerBILabController,
  ],

  /* =======================================================
     PROVIDERS

     PowerBILabService:
     Handles attempt lifecycle and workspace state.

     PowerBIValidatorService:
     Runs hidden backend validation rules.
  ======================================================= */

  providers: [
    PowerBILabService,
    PowerBIValidatorService,
  ],

  /* =======================================================
     EXPORTS

     Export the services so other API modules can use them
     later if required.
  ======================================================= */

  exports: [
    PowerBILabService,
    PowerBIValidatorService,
  ],
})
export class PowerBILabModule {}