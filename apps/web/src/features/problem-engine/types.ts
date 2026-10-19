/* =========================================================

   PROBLEM ENGINE TYPES

========================================================= */

export type ProblemDifficulty =

  | 'Easy'

  | 'Medium'

  | 'Hard';

/* =========================================================

   WORKSPACE TYPE

========================================================= */

export type WorkspaceType =

  | 'code'

  | 'web'

  | 'framework'

  | 'database'

  | 'devops'

  | 'powerbi'

  | 'coding';

/* =========================================================

   PROBLEM SOURCE

========================================================= */

export type ProblemSource =

  | 'practice'

  | 'stack'

  | 'challenge';

/* =========================================================

   SUPPORTED LANGUAGE SLUG

   These are editor/compiler languages.

   Power BI is intentionally NOT included here because

   Power BI uses its own workspace rather than a compiler

   language.

========================================================= */

export type ProblemLanguage =

  | 'c'

  | 'cpp'

  | 'java'

  | 'python'
  | 'pyspark'

  | 'javascript'

  | 'typescript'

  | 'solidity'

  | 'csharp'

  | 'go'

  | 'php'

  | 'ruby'

  | 'swift'

  | 'html'

  | 'css'

  | 'sql';

/* =========================================================

   STARTER FILE

========================================================= */

export type StarterFile = {

  path: string;

  language: string;

  content: string;

};

/* =========================================================

   SAMPLE TEST CASE

========================================================= */

export type SampleTestCase = {

  id: string;

  title: string;

  input?: string;

  expectedOutput?: string;

  description?: string;

};

/* =========================================================

   POWER BI DATASET

========================================================= */

export type PowerBIDataset = {

  /*

   \* Unique internal identifier.

   \*

   \* Examples:

   \* sales

   \* products

   \* customers

   \* regions

   */

  id: string;

  /*

   \* Learner-facing dataset name.

   \*

   \* Example:

   \* Sales Dataset

   */

  name: string;

  /*

   \* Actual CSV filename.

   \*

   \* Example:

   \* sales.csv

   */

  fileName: string;

  /*

   \* Public Next.js dataset path.

   \*

   \* Example:

   \* /datasets/power-bi/sales.csv

   */

  path: string;

  /*

   \* Optional description shown in the

   \* Provided Datasets section.

   */

  description?: string;

  /*

   \* Optional suggested Power BI table name.

   \*

   \* Do not automatically apply this if

   \* table naming is part of the problem.

   */

  suggestedTableName?: string;

};

/* =========================================================

   POWER BI VALIDATION RULE TYPE

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

  | 'dax-measure';

/* =========================================================

   POWER BI BASE VALIDATION RULE

========================================================= */

export type PowerBIBaseValidationRule = {

  /*

   \* Unique test case identifier.

   */

  id: string;

  /*

   \* Validation operation.

   */

  type: PowerBIValidationRuleType;

  /*

   \* Learner-facing validation label.

   */

  label: string;

  /*

   \* Points awarded when this rule passes.

   */

  points: number;

  /*

   \* Whether this test must pass.

   \*

   \* Defaults to true in the validator.

   */

  required?: boolean;

  /*

   \* Optional hint shown after a failed check.

   */

  hint?: string;

};

/* =========================================================

   DATASET SELECTED VALIDATION

========================================================= */

export type PowerBIDatasetSelectedRule =

  PowerBIBaseValidationRule & {

    type: 'dataset-selected';

    datasetId: string;

  };

/* =========================================================

   DATASET LOADED VALIDATION

========================================================= */

export type PowerBIDatasetLoadedRule =

  PowerBIBaseValidationRule & {

    type: 'dataset-loaded';

    datasetId: string;

  };

/* =========================================================

   TABLE NAME VALIDATION

========================================================= */

export type PowerBITableNameRule =

  PowerBIBaseValidationRule & {

    type: 'table-name';

    datasetId?: string;

    expected: string;

  };

/* =========================================================

   REQUIRED COLUMNS VALIDATION

========================================================= */

export type PowerBIRequiredColumnsRule =

  PowerBIBaseValidationRule & {

    type: 'required-columns';

    datasetId?: string;

    columns: string[];

  };

/* =========================================================

   MINIMUM ROWS VALIDATION

========================================================= */

export type PowerBIMinimumRowsRule =

  PowerBIBaseValidationRule & {

    type: 'minimum-rows';

    datasetId?: string;

    minimum: number;

  };

/* =========================================================

   TRANSFORM VALIDATION

========================================================= */

export type PowerBITransformRule =

  PowerBIBaseValidationRule & {

    type: 'transform';

    datasetId?: string;

    operation: string;

    column?: string;

    expectedValue?: string;

  };

/* =========================================================

   RELATIONSHIP VALIDATION

========================================================= */

export type PowerBIRelationshipRule =

  PowerBIBaseValidationRule & {

    type: 'relationship';

    fromTable: string;

    fromColumn: string;

    toTable: string;

    toColumn: string;

    cardinality?:

      | 'one-to-one'

      | 'one-to-many'

      | 'many-to-one'

      | 'many-to-many';

  };

/* =========================================================

   VISUAL VALIDATION

========================================================= */

export type PowerBIVisualRule =

  PowerBIBaseValidationRule & {

    type: 'visual';

    visualType?: string;

    xAxis?: string;

    yAxis?: string;

    legend?: string;

    aggregation?: string;

  };

/* =========================================================

   FILTER VALIDATION

========================================================= */

export type PowerBIFilterRule =

  PowerBIBaseValidationRule & {

    type: 'filter';

    field: string;

    value?: string;

  };

/* =========================================================

   DAX MEASURE VALIDATION

========================================================= */

export type PowerBIDaxMeasureRule =

  PowerBIBaseValidationRule & {

    type: 'dax-measure';

    measureName: string;

    expression?: string;

  };

/* =========================================================

   POWER BI VALIDATION RULE

========================================================= */

export type PowerBIValidationRule =

  | PowerBIDatasetSelectedRule

  | PowerBIDatasetLoadedRule

  | PowerBITableNameRule

  | PowerBIRequiredColumnsRule

  | PowerBIMinimumRowsRule

  | PowerBITransformRule

  | PowerBIRelationshipRule

  | PowerBIVisualRule

  | PowerBIFilterRule

  | PowerBIDaxMeasureRule;

/* =========================================================

   POWER BI PROBLEM CONFIGURATION

========================================================= */

export type PowerBIProblemConfig = {

  /*

   \* All datasets available to the learner

   \* for this problem.

   \*

   \* Example:

   \* sales.csv

   \* products.csv

   \* customers.csv

   \* regions.csv

   */

  availableDatasets: PowerBIDataset[];

  /*

   \* Dataset IDs required to solve the problem.

   \*

   \* IMPORTANT:

   \* This is validation metadata.

   \* Do not display requiredDatasets directly

   \* in the learner UI.

   */

  requiredDatasets: string[];

  /*

   \* Problem-specific test cases.

   \*

   \* Check Solution and Submit will use these.

   */

  validationRules: PowerBIValidationRule[];

  /*

   \* Minimum score required to pass.

   \*

   \* Example:

   \* 100

   */

  passingScore: number;

  /*

   \* Whether more than one provided dataset

   \* can be imported into the workspace.

   */

  allowMultipleDatasets?: boolean;

  /*

   \* Whether learner-created CSV uploads

   \* are allowed.

   \*

   \* Keep false for controlled assessments.

   */

  allowCustomUpload?: boolean;

};

/* =========================================================

   PRACTICE PROBLEM

========================================================= */

export type PracticeProblem = {

  slug: string;

  title: string;

  technologySlug: string;

  difficulty: ProblemDifficulty;

  workspaceType: WorkspaceType;

  shortDescription: string;

  problemStatement: string;

  /* =======================================================

     STRUCTURED PROBLEM DESCRIPTION

  ======================================================= */

  inputFormat?: string;

  outputFormat?: string;

  constraints?: string[];

  notes?: string[];

  /* =======================================================

     SKILLS

  ======================================================= */

  skills: string[];

  estimatedMinutes: number;

  /* =======================================================

     LANGUAGE

     Required for normal coding problems.

     Optional for specialized non-code workspaces such as:

     - Power BI

     - future visual analytics tools

  ======================================================= */

  defaultLanguage?: ProblemLanguage;

  allowedLanguages?: ProblemLanguage[];

  /* =======================================================

     SINGLE-FILE CODING PROBLEM

  ======================================================= */

  starterCode?: string;

  /* =======================================================

     MULTI-FILE WORKSPACE

  ======================================================= */

  starterFiles?: StarterFile[];

  /* =======================================================

     PUBLIC SAMPLE TESTS

  ======================================================= */

  sampleTests?: SampleTestCase[];

  /* =======================================================

     POWER BI CONFIGURATION

     Used only when:

     workspaceType === 'powerbi'

  ======================================================= */

  powerBi?: PowerBIProblemConfig;

};

/* =========================================================

   PROBLEM CONTEXT

========================================================= */

export type ProblemContext = {

  source: ProblemSource;

  technologySlug?: string;

  domainSlug?: string;

  stackSlug?: string;

  moduleSlug?: string;

  challengeSlug?: string;

  attemptId?: string;

};

