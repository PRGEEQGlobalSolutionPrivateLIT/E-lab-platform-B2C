/* =========================================================
   POWER BI VALIDATION TYPES

   Compatibility model for the current Power BI lab.

   Supports:
   - Single-dataset workspace
   - Multi-dataset workspace
   - Existing validation rules
   - New validation rule names
========================================================= */

/* =========================================================
   COMMON DATA TYPES
========================================================= */

export type PowerBICellValue =
  | string
  | number
  | boolean
  | null;

export type PowerBIDataRow =
  Record<string, PowerBICellValue>;

/* =========================================================
   TABLE STATE
========================================================= */

export interface PowerBITableState {
  id?: string;

  datasetId?: string;

  fileName?: string;

  tableName?: string;

  headers?: string[];

  rows?: PowerBIDataRow[];

  /*
   * Compatibility fields used by the existing
   * Power BI validation rules.
   */
  name?: string;

  columns?: string[];

  rowCount?: number;

  loaded?: boolean;
}

/* =========================================================
   DATASET STATE
========================================================= */

export interface PowerBIDatasetState {
  id?: string;

  fileName?: string;

  loaded?: boolean;

  tableName?: string;

  columns?: string[];

  rowCount?: number;
}

/* =========================================================
   TRANSFORM STATE
========================================================= */

export interface PowerBITransformState {
  id?: string;

  datasetId?: string;

  tableName?: string;

  /*
   * New state name.
   */
  operation?: string;

  /*
   * Existing validation-rule compatibility name.
   */
  type?: string;

  column?: string;

  columns?: string[];

  value?: string;

  replacementValue?: string;

  applied?: boolean;
}

/* =========================================================
   RELATIONSHIP STATE
========================================================= */

export type PowerBICardinality =
  | 'one-to-one'
  | 'one-to-many'
  | 'many-to-one'
  | 'many-to-many';

export interface PowerBIRelationshipState {
  id?: string;

  fromTable: string;

  fromColumn: string;

  toTable: string;

  toColumn: string;

  cardinality?:
    | PowerBICardinality
    | string;

  crossFilterDirection?: string;

  active?: boolean;
}

/* =========================================================
   VISUAL STATE
========================================================= */

export interface PowerBIVisualState {
  id?: string;

  /*
   * New state name.
   */
  visualType?: string;

  /*
   * Existing validation-rule compatibility name.
   */
  type?: string;

  title?: string;

  tableName?: string;

  xAxis?: string;

  yAxis?: string;

  legend?: string;

  aggregation?: string;

  value?: string;

  values?: string[];

  fields?: string[];

  measures?: string[];
}

/* =========================================================
   FILTER STATE
========================================================= */

export interface PowerBIFilterState {
  id?: string;

  tableName?: string;

  field: string;

  value?: string;

  values?: string[];

  operator?: string;
}

/* =========================================================
   DAX MEASURE STATE
========================================================= */

export interface PowerBIDaxMeasureState {
  id?: string;

  tableName?: string;

  /*
   * New state name.
   */
  measureName?: string;

  /*
   * Existing validation-rule compatibility name.
   */
  name?: string;

  expression: string;
}

/* =========================================================
   COMPATIBILITY TYPE ALIASES

   These names are used by power-bi-rules.ts.
========================================================= */

export type PowerBITable =
  PowerBITableState;

export type PowerBITransform =
  PowerBITransformState;

export type PowerBIRelationship =
  PowerBIRelationshipState;

export type PowerBIVisual =
  PowerBIVisualState;

export type PowerBIFilter =
  PowerBIFilterState;

export type PowerBIMeasure =
  PowerBIDaxMeasureState;

/* =========================================================
   ACTION STATE
========================================================= */

export type PowerBIActionType =
  | 'dataset-selected'
  | 'dataset-imported'
  | 'table-renamed'
  | 'transform-applied'
  | 'relationship-created'
  | 'measure-created'
  | 'visual-created'
  | 'filter-applied';

export interface PowerBIActionState {
  type: PowerBIActionType;

  timestamp: string;

  datasetId?: string;

  tableName?: string;

  column?: string;

  operation?: string;

  value?: string;
}

/* =========================================================
   WORKSPACE STATE
========================================================= */

export interface PowerBIWorkspaceState {
  /*
   * Existing single-dataset workspace fields.
   */
  selectedDatasetId?: string;

  loadedDatasetId?: string;

  fileName?: string;

  tableName?: string;

  headers?: string[];

  rowCount?: number;

  hasData?: boolean;

  /*
   * Multi-dataset workspace fields.
   */
  selectedDatasetIds?: string[];

  loadedDatasetIds?: string[];

  datasets?: PowerBIDatasetState[];

  tables?: PowerBITableState[];

  transforms?: PowerBITransformState[];

  relationships?: PowerBIRelationshipState[];

  visuals?: PowerBIVisualState[];

  filters?: PowerBIFilterState[];

  /*
   * Existing rule engine uses measures.
   * Newer workspace model may use daxMeasures.
   */
  measures?: PowerBIDaxMeasureState[];

  daxMeasures?: PowerBIDaxMeasureState[];

  actions?: PowerBIActionState[];
}

/* =========================================================
   VALIDATION RULE TYPES
========================================================= */

export type PowerBIValidationRuleType =
  | 'dataset-selected'
  | 'dataset-loaded'
  | 'table-name'
  | 'required-columns'
  | 'minimum-rows'
  | 'transform'
  | 'relationship'
  | 'visual'
  | 'filter'
  | 'dax-measure'
  | 'table-exists'
  | 'column-exists'
  | 'column-removed'
  | 'column-renamed'
  | 'transform-applied'
  | 'relationship-exists'
  | 'measure-exists'
  | 'dax-expression'
  | 'visual-exists'
  | 'visual-field'
  | 'filter-exists';

/* =========================================================
   BASE VALIDATION RULE
========================================================= */

export interface PowerBIBaseValidationRule {
  id: string;

  type: PowerBIValidationRuleType;

  label: string;

  points: number;

  required?: boolean;

  hint?: string;
}

/* =========================================================
   VALIDATION RULE

   Compatibility interface supporting both the existing
   hidden-rule configuration and the newer rule format.
========================================================= */

export interface PowerBIValidationRule
  extends PowerBIBaseValidationRule {
  datasetId?: string;

  tableName?: string;

  expectedTableName?: string;

  expected?: string;

  expectedValue?: string;

  expectedColumn?: string;

  expectedExpression?: string;

  columns?: string[];

  requiredColumns?: string[];

  column?: string;

  minimum?: number;

  minimumRows?: number;

  operation?: string;

  transformType?: string;

  fromTable?: string;

  fromColumn?: string;

  toTable?: string;

  toColumn?: string;

  cardinality?:
    | PowerBICardinality
    | string;

  active?: boolean;

  visualType?: string;

  visualTitle?: string;

  xAxis?: string;

  yAxis?: string;

  legend?: string;

  aggregation?: string;

  field?: string;

  value?: string;

  operator?: string;

  filterField?: string;

  filterValue?: string;

  measureName?: string;

  expression?: string;
}

/* =========================================================
   NAMED VALIDATION RULES
========================================================= */

export interface PowerBIDatasetSelectedRule
  extends PowerBIValidationRule {
  type: 'dataset-selected';

  datasetId: string;
}

export interface PowerBIDatasetLoadedRule
  extends PowerBIValidationRule {
  type: 'dataset-loaded';

  datasetId: string;
}

export interface PowerBITableNameRule
  extends PowerBIValidationRule {
  type: 'table-name';

  expected: string;
}

export interface PowerBIRequiredColumnsRule
  extends PowerBIValidationRule {
  type: 'required-columns';

  columns: string[];
}

export interface PowerBIMinimumRowsRule
  extends PowerBIValidationRule {
  type: 'minimum-rows';

  minimum: number;
}

export interface PowerBITransformRule
  extends PowerBIValidationRule {
  type: 'transform';

  operation: string;
}

export interface PowerBIRelationshipRule
  extends PowerBIValidationRule {
  type: 'relationship';

  fromTable: string;

  fromColumn: string;

  toTable: string;

  toColumn: string;
}

export interface PowerBIVisualRule
  extends PowerBIValidationRule {
  type: 'visual';
}

export interface PowerBIFilterRule
  extends PowerBIValidationRule {
  type: 'filter';

  field: string;
}

export interface PowerBIDaxMeasureRule
  extends PowerBIValidationRule {
  type: 'dax-measure';

  measureName: string;
}

/* =========================================================
   PROBLEM VALIDATION CONFIG
========================================================= */

export interface PowerBIProblemValidationConfig {
  problemSlug: string;

  rules: PowerBIValidationRule[];

  passingScore: number;
}

/* =========================================================
   VALIDATION RESULT
========================================================= */

export interface PowerBIValidationResult {
  ruleId: string;

  type: PowerBIValidationRuleType;

  label: string;

  passed: boolean;

  required: boolean;

  pointsEarned: number;

  maxPoints: number;

  message: string;

  hint?: string;
}

/* =========================================================
   VALIDATION SUMMARY
========================================================= */

export interface PowerBIValidationSummary {
  passed: boolean;

  score: number;

  maxScore: number;

  percentage: number;

  passedRules: number;

  failedRules: number;

  totalRules: number;

  results: PowerBIValidationResult[];
}

/* =========================================================
   ATTEMPT STATUS
========================================================= */

export type PowerBIAttemptStatus =
  | 'IN_PROGRESS'
  | 'PASSED'
  | 'FAILED';

/* =========================================================
   POWER BI ATTEMPT
========================================================= */

export interface PowerBIAttempt {
  id: string;

  problemSlug: string;

  userId?: string;

  status: PowerBIAttemptStatus;

  workspace: PowerBIWorkspaceState;

  score?: number;

  maxScore?: number;

  percentage?: number;

  createdAt: string;

  updatedAt: string;

  submittedAt?: string;
}