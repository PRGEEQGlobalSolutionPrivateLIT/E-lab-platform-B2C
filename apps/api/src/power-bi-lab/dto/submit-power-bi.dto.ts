import {
  IsIn,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsISO8601,
  ValidateNested,
} from 'class-validator';

import {
  Type,
} from 'class-transformer';

import {
  PowerBIWorkspaceDto,
} from './check-power-bi.dto.js';

/* =========================================================
   POWER BI WORKSPACE TAB
========================================================= */

export type PowerBIWorkspaceTab =
  | 'data'
  | 'transform'
  | 'model'
  | 'dax'
  | 'report';

/* =========================================================
   SUBMIT POWER BI DTO

   Used when the learner clicks:

   Submit

   Submission flow:

   1. Receive the learner's current workspace.
   2. Load hidden validation rules using problemSlug.
   3. Validate the workspace on the backend.
   4. Calculate the score.
   5. Determine PASS / FAIL.
   6. Save the final attempt result.

   IMPORTANT:

   The frontend must never send expected answers or hidden
   validation rules.
========================================================= */

export class SubmitPowerBIDto {
  /* =======================================================
     PROBLEM SLUG

     Must match the Power BI problem being solved.

     Current example:

     powerbi-import-sales-data
  ======================================================= */

  @IsString()
  @IsNotEmpty()
  problemSlug!: string;

  /* =======================================================
     WORKSPACE STATE

     Complete learner workspace state.

     Current fields may include:

     - selectedDatasetId
     - loadedDatasetId
     - fileName
     - tableName
     - headers
     - rowCount
     - hasData
     - datasets
     - tables
     - transforms
     - relationships
     - measures
     - visuals
     - filters

     The backend validates this state against hidden rules.
  ======================================================= */

  @IsObject()
  @ValidateNested()
  @Type(
    () => PowerBIWorkspaceDto,
  )
  workspace!: PowerBIWorkspaceDto;

  /* =======================================================
     ACTIVE TAB

     Optional workspace tab active when the learner
     submitted the solution.
  ======================================================= */

  @IsOptional()
  @IsString()
  @IsIn([
    'data',
    'transform',
    'model',
    'dax',
    'report',
  ])
  activeTab?: PowerBIWorkspaceTab;

  /* =======================================================
     CLIENT SUBMISSION TIMESTAMP

     Optional client timestamp.

     This is informational only.

     The API/server must generate the authoritative
     submittedAt timestamp.
  ======================================================= */

  @IsOptional()
  @IsString()
  @IsISO8601()
  clientSubmittedAt?: string;
}