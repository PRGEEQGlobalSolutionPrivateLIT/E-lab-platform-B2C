import {

  BadRequestException,

  Injectable,

  NotFoundException,

} from '@nestjs/common';

import {

  randomUUID,

} from 'crypto';

import {

  CheckPowerBIDto,

  PowerBIWorkspaceDto,

} from './dto/check-power-bi.dto.js';

import {

  SavePowerBIProgressDto,

} from './dto/save-power-bi-progress.dto.js';

import {

  SubmitPowerBIDto,

} from './dto/submit-power-bi.dto.js';

import {

  PowerBIValidatorService,

} from './validation/power-bi-validator.service.js';

import type {

  PowerBIValidationSummary,

  PowerBIWorkspaceState,

} from './validation/power-bi-validation.types.js';

/* =========================================================

   ATTEMPT STATUS

========================================================= */

export type PowerBIAttemptStatus =

  | 'IN_PROGRESS'

  | 'PASSED'

  | 'FAILED';

/* =========================================================

   STORED ATTEMPT

========================================================= */

export interface StoredPowerBIAttempt {

  id: string;

  problemSlug: string;

  userId?: string;

  status: PowerBIAttemptStatus;

  workspace: PowerBIWorkspaceState;

  activeTab?: string;

  score?: number;

  maxScore?: number;

  percentage?: number;

  createdAt: string;

  updatedAt: string;

  submittedAt?: string;

}

/* =========================================================

   CREATE ATTEMPT INPUT

========================================================= */

export interface CreatePowerBIAttemptInput {

  problemSlug: string;

  userId?: string;

}

/* =========================================================

   SAVE PROGRESS RESULT

========================================================= */

export interface SavePowerBIProgressResult {

  success: true;

  attemptId: string;

  problemSlug: string;

  status: PowerBIAttemptStatus;

  activeTab?: string;

  updatedAt: string;

}

/* =========================================================

   RESET RESULT

========================================================= */

export interface ResetPowerBIAttemptResult {

  success: true;

  attemptId: string;

  problemSlug: string;

  status: 'IN_PROGRESS';

  workspace: PowerBIWorkspaceState;

  activeTab: string;

  updatedAt: string;

}

/* =========================================================

   SUBMISSION RESULT

========================================================= */

export interface SubmitPowerBIResult {

  success: true;

  attemptId: string;

  problemSlug: string;

  status:

    | 'PASSED'

    | 'FAILED';

  score: number;

  maxScore: number;

  percentage: number;

  submittedAt: string;

  validation: PowerBIValidationSummary;

}

/* =========================================================

   POWER BI LAB SERVICE

========================================================= */

@Injectable()

export class PowerBILabService {

  private readonly attempts =

    new Map<

      string,

      StoredPowerBIAttempt

    >();

  constructor(

    private readonly validator:

      PowerBIValidatorService,

  ) {}

  /* =======================================================

     CREATE EMPTY WORKSPACE

  ======================================================= */

  private createEmptyWorkspace():

    PowerBIWorkspaceState {

    return {

      selectedDatasetId:

        undefined,

      loadedDatasetId:

        undefined,

      fileName:

        undefined,

      tableName:

        undefined,

      headers: [],

      rowCount: 0,

      hasData: false,

      datasets: [],

      tables: [],

      transforms: [],

      relationships: [],

      measures: [],

      visuals: [],

      filters: [],

    };

  }

  /* =======================================================

     NORMALIZE FILTER VALUE

     Workspace validation currently expects filter.value

     as string | undefined.

     DTO can contain:

     string | number | boolean | null.

     Convert all valid primitive values into strings.

  ======================================================= */

  private normalizeFilterValue(

    value:

      | string

      | number

      | boolean

      | null

      | undefined,

  ): string | undefined {

    if (

      value === undefined ||

      value === null

    ) {

      return undefined;

    }

    return String(value);

  }

  /* =======================================================

     NORMALIZE FILTER VALUES

  ======================================================= */

  private normalizeFilterValues(

    values:

      | (

          | string

          | number

          | boolean

          | null

        )[]

      | undefined,

  ): string[] {

    if (!values) {

      return [];

    }

    return values

      .filter(

        (

          value,

        ): value is

          | string

          | number

          | boolean =>

          value !== null &&

          value !== undefined,

      )

      .map(

        (value) =>

          String(value),

      );

  }

  /* =======================================================

     NORMALIZE WORKSPACE

  ======================================================= */

  private normalizeWorkspace(

    workspace: PowerBIWorkspaceDto,

  ): PowerBIWorkspaceState {

    const datasets =

      (workspace.datasets ?? []).map(

        (dataset) => ({

          id:

            dataset.id,

          fileName:

            dataset.fileName,

          loaded:

            dataset.loaded,

          tableName:

            dataset.tableName,

          columns: [

            ...(dataset.columns ?? []),

          ],

          rowCount:

            dataset.rowCount ?? 0,

        }),

      );

    /* =====================================================

       TABLES

       PowerBIWorkspaceState expects the older table state

       shape:

       tableName

       headers

       rows

       The DTO currently supplies:

       name

       columns

       rowCount

       Map both models here.

    ===================================================== */

    const tables =

      (workspace.tables ?? []).map(

        (table) => ({

          id:

            table.id,

          datasetId:

            table.datasetId,

          fileName:

            table.fileName,

          tableName:

            table.name,

          headers: [

            ...(table.columns ?? []),

          ],

          /*

           \\\\\* The DTO currently stores rowCount instead of

           \\\\\* complete table rows.

           \\\\\*

           \\\\\* Do NOT fabricate actual row values here.

           */

          rows: [],

          rowCount:

            table.rowCount,

          loaded:

            table.loaded,

        }),

      );

    /* =====================================================

       TRANSFORMS

    ===================================================== */

    const transforms =

      (workspace.transforms ?? []).map(

        (transform) => ({

          id:

            transform.id,

          type:

            transform.type,

          tableName:

            transform.tableName,

          column:

            transform.column,

          columns: [

            ...(transform.columns ?? []),

          ],

          value:

            transform.value,

          operation:

            transform.operation,

          applied:

            transform.applied,

        }),

      );

    /* =====================================================

       RELATIONSHIPS

    ===================================================== */

    const relationships =

      (

        workspace.relationships ??

        []

      ).map(

        (relationship) => ({

          id:

            relationship.id,

          fromTable:

            relationship.fromTable,

          fromColumn:

            relationship.fromColumn,

          toTable:

            relationship.toTable,

          toColumn:

            relationship.toColumn,

          cardinality:

            relationship.cardinality,

          crossFilterDirection:

            relationship.crossFilterDirection,

          active:

            relationship.active,

        }),

      );

    /* =====================================================

       MEASURES

    ===================================================== */

    const measures =

      (workspace.measures ?? []).map(

        (measure) => ({

          id:

            measure.id,

          name:

            measure.name,

          expression:

            measure.expression,

          tableName:

            measure.tableName,

        }),

      );

    /* =====================================================

       VISUALS

    ===================================================== */

    const visuals =

      (workspace.visuals ?? []).map(

        (visual) => ({

          id:

            visual.id,

          type:

            visual.type,

          title:

            visual.title,

          tableName:

            visual.tableName,

          xAxis:

            visual.xAxis,

          yAxis:

            visual.yAxis,

          legend:

            visual.legend,

          value:

            visual.value,

          values: [

            ...(visual.values ?? []),

          ],

          fields: [

            ...(visual.fields ?? []),

          ],

          measures: [

            ...(visual.measures ?? []),

          ],

        }),

      );

    /* =====================================================

       FILTERS

    ===================================================== */

    const filters =

      (workspace.filters ?? []).map(

        (filter) => ({

          id:

            filter.id,

          tableName:

            filter.tableName,

          field:

            filter.field,

          operator:

            filter.operator,

          value:

            this.normalizeFilterValue(

              filter.value,

            ),

          values:

            this.normalizeFilterValues(

              filter.values,

            ),

        }),

      );

    /* =====================================================

       RETURN NORMALIZED WORKSPACE

    ===================================================== */

    return {

      selectedDatasetId:

        workspace.selectedDatasetId,

      loadedDatasetId:

        workspace.loadedDatasetId,

      fileName:

        workspace.fileName,

      tableName:

        workspace.tableName,

      headers: [

        ...(workspace.headers ?? []),

      ],

      rowCount:

        workspace.rowCount ?? 0,

      hasData:

        workspace.hasData ?? false,

      datasets,

      tables,

      transforms,

      relationships,

      measures,

      visuals,

      filters,

    };

  }

  /* =======================================================

     CREATE ATTEMPT

  ======================================================= */

  createAttempt(

    input: CreatePowerBIAttemptInput,

  ): StoredPowerBIAttempt {

    const problemSlug =

      input.problemSlug?.trim();

    if (!problemSlug) {

      throw new BadRequestException(

        'problemSlug is required.',

      );

    }

    const now =

      new Date().toISOString();

    const attempt:

      StoredPowerBIAttempt = {

        id:

          randomUUID(),

        problemSlug,

        userId:

          input.userId,

        status:

          'IN_PROGRESS',

        workspace:

          this.createEmptyWorkspace(),

        activeTab:

          'data',

        createdAt:

          now,

        updatedAt:

          now,

      };

    this.attempts.set(

      attempt.id,

      attempt,

    );

    return attempt;

  }

  /* =======================================================

     GET ATTEMPT

  ======================================================= */

  getAttempt(

    attemptId: string,

  ): StoredPowerBIAttempt {

    const normalizedAttemptId =

      attemptId.trim();

    if (!normalizedAttemptId) {

      throw new BadRequestException(

        'attemptId is required.',

      );

    }

    const attempt =

      this.attempts.get(

        normalizedAttemptId,

      );

    if (!attempt) {

      throw new NotFoundException(

        `Power BI attempt was not found: ${normalizedAttemptId}`,

      );

    }

    return attempt;

  }

  /* =======================================================

     ASSERT EDITABLE

  ======================================================= */

  private assertEditable(

    attempt: StoredPowerBIAttempt,

  ): void {

    if (

      attempt.status !==

      'IN_PROGRESS'

    ) {

      throw new BadRequestException(

        'This Power BI attempt has already been submitted.',

      );

    }

  }

  /* =======================================================

     ASSERT PROBLEM MATCH

  ======================================================= */

  private assertProblemMatches(

    attempt: StoredPowerBIAttempt,

    problemSlug: string,

  ): void {

    const normalizedProblemSlug =

      problemSlug.trim();

    if (

      attempt.problemSlug !==

      normalizedProblemSlug

    ) {

      throw new BadRequestException(

        'The supplied problem does not match this attempt.',

      );

    }

  }

  /* =======================================================

     CHECK SOLUTION

  ======================================================= */

  async checkSolution(

    attemptId: string,

    dto: CheckPowerBIDto,

  ): Promise<PowerBIValidationSummary> {

    const attempt =

      this.getAttempt(

        attemptId,

      );

    this.assertEditable(

      attempt,

    );

    this.assertProblemMatches(

      attempt,

      dto.problemSlug,

    );

    const workspace =

      this.normalizeWorkspace(

        dto.workspace,

      );

    return this.validator

      .validateWorkspace(

        attempt.problemSlug,

        workspace,

      );

  }

  /* =======================================================

     SAVE PROGRESS

  ======================================================= */

  saveProgress(

    attemptId: string,

    dto: SavePowerBIProgressDto,

  ): SavePowerBIProgressResult {

    const attempt =

      this.getAttempt(

        attemptId,

      );

    this.assertEditable(

      attempt,

    );

    this.assertProblemMatches(

      attempt,

      dto.problemSlug,

    );

    const workspace =

      this.normalizeWorkspace(

        dto.workspace,

      );

    const now =

      new Date().toISOString();

    attempt.workspace =

      workspace;

    attempt.activeTab =

      dto.activeTab ??

      attempt.activeTab ??

      'data';

    attempt.updatedAt =

      now;

    this.attempts.set(

      attempt.id,

      attempt,

    );

    return {

      success:

        true,

      attemptId:

        attempt.id,

      problemSlug:

        attempt.problemSlug,

      status:

        attempt.status,

      activeTab:

        attempt.activeTab,

      updatedAt:

        attempt.updatedAt,

    };

  }

  /* =======================================================

     RESET ATTEMPT

  ======================================================= */

  resetAttempt(

    attemptId: string,

  ): ResetPowerBIAttemptResult {

    const attempt =

      this.getAttempt(

        attemptId,

      );

    this.assertEditable(

      attempt,

    );

    const now =

      new Date().toISOString();

    attempt.workspace =

      this.createEmptyWorkspace();

    attempt.activeTab =

      'data';

    attempt.score =

      undefined;

    attempt.maxScore =

      undefined;

    attempt.percentage =

      undefined;

    attempt.updatedAt =

      now;

    this.attempts.set(

      attempt.id,

      attempt,

    );

    return {

      success:

        true,

      attemptId:

        attempt.id,

      problemSlug:

        attempt.problemSlug,

      status:

        'IN_PROGRESS',

      workspace:

        attempt.workspace,

      activeTab:

        'data',

      updatedAt:

        attempt.updatedAt,

    };

  }

  /* =======================================================

     SUBMIT

  ======================================================= */

  async submit(

    attemptId: string,

    dto: SubmitPowerBIDto,

  ): Promise<SubmitPowerBIResult> {

    const attempt =

      this.getAttempt(

        attemptId,

      );

    this.assertEditable(

      attempt,

    );

    this.assertProblemMatches(

      attempt,

      dto.problemSlug,

    );

    const workspace =

      this.normalizeWorkspace(

        dto.workspace,

      );

    /* -----------------------------------------------------

       ALWAYS REVALIDATE CURRENT WORKSPACE

    ----------------------------------------------------- */

    const validation =

      await this.validator

        .validateWorkspace(

          attempt.problemSlug,

          workspace,

        );

    const now =

      new Date().toISOString();

    /* -----------------------------------------------------

       SAVE FINAL WORKSPACE

    ----------------------------------------------------- */

    attempt.workspace =

      workspace;

    attempt.activeTab =

      dto.activeTab ??

      attempt.activeTab ??

      'data';

    /* -----------------------------------------------------

       SAVE SCORE

    ----------------------------------------------------- */

    attempt.score =

      validation.score;

    attempt.maxScore =

      validation.maxScore;

    attempt.percentage =

      validation.percentage;

    /* -----------------------------------------------------

       FINAL STATUS

    ----------------------------------------------------- */

    attempt.status =

      validation.passed

        ? 'PASSED'

        : 'FAILED';

    attempt.submittedAt =

      now;

    attempt.updatedAt =

      now;

    this.attempts.set(

      attempt.id,

      attempt,

    );

    return {

      success:

        true,

      attemptId:

        attempt.id,

      problemSlug:

        attempt.problemSlug,

      status:

        validation.passed

          ? 'PASSED'

          : 'FAILED',

      score:

        validation.score,

      maxScore:

        validation.maxScore,

      percentage:

        validation.percentage,

      submittedAt:

        now,

      validation,

    };

  }

}
