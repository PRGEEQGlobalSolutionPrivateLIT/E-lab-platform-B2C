import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  CheckPowerBIDto,
} from './dto/check-power-bi.dto.js';

import {
  SavePowerBIProgressDto,
} from './dto/save-power-bi-progress.dto.js';

import {
  SubmitPowerBIDto,
} from './dto/submit-power-bi.dto.js';

import {
  PowerBILabService,
} from './power-bi-lab.service.js';

/* =========================================================
   CREATE ATTEMPT DTO

   Used when the frontend opens a Power BI practice
   problem and needs a new attempt.
========================================================= */

export class CreatePowerBIAttemptDto {
  @IsString()
  @IsNotEmpty()
  problemSlug!: string;

  @IsOptional()
  @IsString()
  userId?: string;
}

/* =========================================================
   POWER BI LAB CONTROLLER

   Base route:

   /api/v1/power-bi-lab

   IMPORTANT:

   If main.ts already contains:

   app.setGlobalPrefix('api/v1');

   do NOT add api/v1 here.
========================================================= */

@Controller('power-bi-lab')
export class PowerBILabController {
  constructor(
    private readonly powerBILabService:
      PowerBILabService,
  ) {}

  /* =======================================================
     CREATE ATTEMPT

     POST
     /api/v1/power-bi-lab/attempts

     Body:

     {
       "problemSlug": "power-bi-import-sales-data"
     }

     Response contains:

     - attempt ID
     - problem slug
     - IN_PROGRESS status
     - empty workspace
  ======================================================= */

  @Post('attempts')
  @HttpCode(HttpStatus.CREATED)
  createAttempt(
    @Body()
    dto: CreatePowerBIAttemptDto,
  ) {
    return this.powerBILabService
      .createAttempt({
        problemSlug:
          dto.problemSlug,

        userId:
          dto.userId,
      });
  }

  /* =======================================================
     GET ATTEMPT

     GET
     /api/v1/power-bi-lab/attempts/:attemptId

     Used when:

     - reopening workspace
     - restoring saved progress
     - refreshing the page
  ======================================================= */

  @Get('attempts/:attemptId')
  getAttempt(
    @Param('attemptId')
    attemptId: string,
  ) {
    return this.powerBILabService
      .getAttempt(
        attemptId,
      );
  }

  /* =======================================================
     CHECK SOLUTION

     POST
     /api/v1/power-bi-lab/attempts/:attemptId/check

     This endpoint:

     - receives current workspace
     - runs hidden backend rules
     - calculates current score
     - returns individual test results

     It does NOT:

     - complete the attempt
     - change status to PASSED/FAILED
     - create final submission

     Example body:

     {
       "problemSlug": "power-bi-import-sales-data",
       "workspace": {
         "selectedDatasetId": "sales",
         "loadedDatasetId": "sales",
         "fileName": "sales.csv",
         "tableName": "Sales",
         "headers": [],
         "rowCount": 1500,
         "hasData": true,
         "datasets": [],
         "tables": [],
         "transforms": [],
         "relationships": [],
         "measures": [],
         "visuals": [],
         "filters": []
       }
     }
  ======================================================= */

  @Post(
    'attempts/:attemptId/check',
  )
  @HttpCode(HttpStatus.OK)
  checkSolution(
    @Param('attemptId')
    attemptId: string,

    @Body()
    dto: CheckPowerBIDto,
  ) {
    return this.powerBILabService
      .checkSolution(
        attemptId,
        dto,
      );
  }

  /* =======================================================
     SAVE PROGRESS

     POST
     /api/v1/power-bi-lab/attempts/:attemptId/save

     This endpoint saves:

     - selected dataset
     - loaded dataset
     - table information
     - headers
     - row count
     - transformations
     - relationships
     - DAX measures
     - visuals
     - filters
     - active workspace tab

     It does NOT create a final submission.
  ======================================================= */

  @Post(
    'attempts/:attemptId/save',
  )
  @HttpCode(HttpStatus.OK)
  saveProgress(
    @Param('attemptId')
    attemptId: string,

    @Body()
    dto: SavePowerBIProgressDto,
  ) {
    return this.powerBILabService
      .saveProgress(
        attemptId,
        dto,
      );
  }

  /* =======================================================
     RESET ATTEMPT

     POST
     /api/v1/power-bi-lab/attempts/:attemptId/reset

     Clears learner workspace state.

     After reset:

     selectedDatasetId = undefined
     loadedDatasetId = undefined
     tableName = undefined
     headers = []
     rowCount = 0
     hasData = false

     transforms = []
     relationships = []
     measures = []
     visuals = []
     filters = []

     The same attempt ID is retained.
  ======================================================= */

  @Post(
    'attempts/:attemptId/reset',
  )
  @HttpCode(HttpStatus.OK)
  resetAttempt(
    @Param('attemptId')
    attemptId: string,
  ) {
    return this.powerBILabService
      .resetAttempt(
        attemptId,
      );
  }

  /* =======================================================
     SUBMIT

     POST
     /api/v1/power-bi-lab/attempts/:attemptId/submit

     Final submission flow:

     1. Receive current learner workspace.
     2. Run hidden backend validation again.
     3. Calculate score.
     4. Determine PASS / FAIL.
     5. Store final workspace.
     6. Mark attempt PASSED or FAILED.
     7. Return final validation result.

     IMPORTANT:

     Submit never trusts a previous Check Solution result.
     It always validates the current workspace again.
  ======================================================= */

  @Post(
    'attempts/:attemptId/submit',
  )
  @HttpCode(HttpStatus.OK)
  submit(
    @Param('attemptId')
    attemptId: string,

    @Body()
    dto: SubmitPowerBIDto,
  ) {
    return this.powerBILabService
      .submit(
        attemptId,
        dto,
      );
  }
}