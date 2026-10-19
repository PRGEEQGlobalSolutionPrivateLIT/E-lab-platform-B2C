import type {
  PowerBIDatasetState,
  PowerBIFilter,
  PowerBIMeasure,
  PowerBIRelationship,
  PowerBITable,
  PowerBITransform,
  PowerBIValidationRule,
  PowerBIVisual,
  PowerBIWorkspaceState,
} from './power-bi-validation.types.js';

/* =========================================================
   NORMALIZATION HELPERS
========================================================= */

function normalizeText(
  value: unknown,
): string {
  return String(value ?? '')
    .trim()
    .toLowerCase();
}

/*
 * Makes these equivalent:
 *
 * order_id
 * Order ID
 * order-id
 * ORDER_ID
 */
function normalizeColumn(
  value: unknown,
): string {
  return normalizeText(value)
    .replace(/[\s_-]+/g, '');
}

/*
 * Basic DAX normalization.
 *
 * SUM ( Sales[net_sales] )
 *
 * becomes:
 *
 * sum(sales[net_sales])
 */
function normalizeDax(
  value: unknown,
): string {
  return String(value ?? '')
    .replace(/\s+/g, '')
    .toLowerCase();
}

/* =========================================================
   WORKSPACE HELPERS
========================================================= */

function getTables(
  workspace: PowerBIWorkspaceState,
): PowerBITable[] {
  return workspace.tables ?? [];
}

function getDatasets(
  workspace: PowerBIWorkspaceState,
): PowerBIDatasetState[] {
  return workspace.datasets ?? [];
}

function getTransforms(
  workspace: PowerBIWorkspaceState,
): PowerBITransform[] {
  return workspace.transforms ?? [];
}

function getRelationships(
  workspace: PowerBIWorkspaceState,
): PowerBIRelationship[] {
  return workspace.relationships ?? [];
}

function getVisuals(
  workspace: PowerBIWorkspaceState,
): PowerBIVisual[] {
  return workspace.visuals ?? [];
}

function getFilters(
  workspace: PowerBIWorkspaceState,
): PowerBIFilter[] {
  return workspace.filters ?? [];
}

function getMeasures(
  workspace: PowerBIWorkspaceState,
): PowerBIMeasure[] {
  return (
    workspace.measures ??
    workspace.daxMeasures ??
    []
  );
}

/* =========================================================
   FIND TABLE
========================================================= */

function findTable(
  workspace: PowerBIWorkspaceState,
  rule: PowerBIValidationRule,
): PowerBITable | undefined {
  const tables = getTables(workspace);

  if (rule.datasetId) {
    const byDataset = tables.find(
      (table: PowerBITable) =>
        normalizeText(
          table.datasetId,
        ) ===
        normalizeText(
          rule.datasetId,
        ),
    );

    if (byDataset) {
      return byDataset;
    }
  }

  if (rule.tableName) {
    const byName = tables.find(
      (table: PowerBITable) =>
        normalizeText(
          table.name ??
          table.tableName,
        ) ===
        normalizeText(
          rule.tableName,
        ),
    );

    if (byName) {
      return byName;
    }
  }

  /*
   * Support the simpler single-table workspace state used
   * by the current frontend.
   */
  if (
    workspace.tableName ||
    workspace.headers?.length ||
    workspace.rowCount
  ) {
    return {
      name:
        workspace.tableName ??
        '',

      tableName:
        workspace.tableName ??
        '',

      datasetId:
        workspace.loadedDatasetId,

      fileName:
        workspace.fileName,

      columns:
        workspace.headers ?? [],

      headers:
        workspace.headers ?? [],

      rowCount:
        workspace.rowCount ?? 0,

      loaded:
        Boolean(
          workspace.hasData,
        ),
    };
  }

  return tables[0];
}

/* =========================================================
   DATASET SELECTED
========================================================= */

function validateDatasetSelected(
  rule: PowerBIValidationRule,
  workspace: PowerBIWorkspaceState,
): boolean {
  if (!rule.datasetId) {
    return false;
  }

  const selectedDatasetIds = [
    ...(workspace.selectedDatasetIds ?? []),

    ...(workspace.selectedDatasetId
      ? [workspace.selectedDatasetId]
      : []),
  ];

  return selectedDatasetIds.some(
    (datasetId: string) =>
      normalizeText(
        datasetId,
      ) ===
      normalizeText(
        rule.datasetId,
      ),
  );
}

/* =========================================================
   DATASET LOADED
========================================================= */

function validateDatasetLoaded(
  rule: PowerBIValidationRule,
  workspace: PowerBIWorkspaceState,
): boolean {
  if (!rule.datasetId) {
    return false;
  }

  /*
   * Selected dataset and loaded dataset are different
   * concepts.
   *
   * Merely selecting Sales must not pass this rule.
   */
  const loadedDatasetIds = [
    ...(workspace.loadedDatasetIds ?? []),

    ...(workspace.loadedDatasetId
      ? [workspace.loadedDatasetId]
      : []),
  ];

  const correctDatasetLoaded =
    loadedDatasetIds.some(
      (datasetId: string) =>
        normalizeText(
          datasetId,
        ) ===
        normalizeText(
          rule.datasetId,
        ),
    );

  if (!correctDatasetLoaded) {
    return false;
  }

  const table = findTable(
    workspace,
    rule,
  );

  if (!table) {
    return false;
  }

  const columns =
    table.columns ??
    table.headers ??
    [];

  const rowCount =
    table.rowCount ?? 0;

  return (
    columns.length > 0 &&
    rowCount > 0
  );
}

/* =========================================================
   TABLE NAME
========================================================= */

function validateTableName(
  rule: PowerBIValidationRule,
  workspace: PowerBIWorkspaceState,
): boolean {
  const table = findTable(
    workspace,
    rule,
  );

  if (!table) {
    return false;
  }

  const expected =
    rule.expected ??
    rule.expectedTableName ??
    rule.tableName;

  if (!expected) {
    return false;
  }

  /*
   * When the rule belongs to a specific dataset, make sure
   * that dataset is actually loaded.
   */
  if (rule.datasetId) {
    const loadedDatasetIds = [
      ...(workspace.loadedDatasetIds ?? []),

      ...(workspace.loadedDatasetId
        ? [workspace.loadedDatasetId]
        : []),
    ];

    const datasetLoaded =
      loadedDatasetIds.some(
        (datasetId: string) =>
          normalizeText(
            datasetId,
          ) ===
          normalizeText(
            rule.datasetId,
          ),
      );

    if (!datasetLoaded) {
      return false;
    }
  }

  return (
    normalizeText(
      table.name ??
      table.tableName,
    ) ===
    normalizeText(
      expected,
    )
  );
}

/* =========================================================
   REQUIRED COLUMNS
========================================================= */

function validateRequiredColumns(
  rule: PowerBIValidationRule,
  workspace: PowerBIWorkspaceState,
): boolean {
  if (rule.datasetId) {
    const loadedDatasetIds = [
      ...(workspace.loadedDatasetIds ?? []),

      ...(workspace.loadedDatasetId
        ? [workspace.loadedDatasetId]
        : []),
    ];

    const datasetLoaded =
      loadedDatasetIds.some(
        (datasetId: string) =>
          normalizeText(
            datasetId,
          ) ===
          normalizeText(
            rule.datasetId,
          ),
      );

    if (!datasetLoaded) {
      return false;
    }
  }

  const table = findTable(
    workspace,
    rule,
  );

  if (!table) {
    return false;
  }

  const expectedColumns =
    rule.columns ??
    rule.requiredColumns ??
    [];

  if (expectedColumns.length === 0) {
    return false;
  }

  const tableColumns =
    table.columns ??
    table.headers ??
    [];

  if (tableColumns.length === 0) {
    return false;
  }

  const actualColumns =
    tableColumns.map(
      (header: string) =>
        normalizeColumn(
          header,
        ),
    );

  return expectedColumns.every(
    (requiredColumn: string) =>
      actualColumns.includes(
        normalizeColumn(
          requiredColumn,
        ),
      ),
  );
}

/* =========================================================
   MINIMUM ROWS
========================================================= */

function validateMinimumRows(
  rule: PowerBIValidationRule,
  workspace: PowerBIWorkspaceState,
): boolean {
  if (rule.datasetId) {
    const loadedDatasetIds = [
      ...(workspace.loadedDatasetIds ?? []),

      ...(workspace.loadedDatasetId
        ? [workspace.loadedDatasetId]
        : []),
    ];

    const datasetLoaded =
      loadedDatasetIds.some(
        (datasetId: string) =>
          normalizeText(
            datasetId,
          ) ===
          normalizeText(
            rule.datasetId,
          ),
      );

    if (!datasetLoaded) {
      return false;
    }
  }

  const table = findTable(
    workspace,
    rule,
  );

  if (!table) {
    return false;
  }

  const minimum =
    rule.minimum ??
    rule.minimumRows;

  if (
    minimum === undefined
  ) {
    return false;
  }

  return (
    (table.rowCount ?? 0) >=
    minimum
  );
}

/* =========================================================
   COLUMN EXISTS
========================================================= */

function validateColumnExists(
  rule: PowerBIValidationRule,
  workspace: PowerBIWorkspaceState,
): boolean {
  const expectedColumn =
    rule.column ??
    rule.expectedColumn;

  if (!expectedColumn) {
    return false;
  }

  const table = findTable(
    workspace,
    rule,
  );

  if (!table) {
    return false;
  }

  const columns =
    table.columns ??
    table.headers ??
    [];

  return columns.some(
    (column: string) =>
      normalizeColumn(
        column,
      ) ===
      normalizeColumn(
        expectedColumn,
      ),
  );
}

/* =========================================================
   COLUMN REMOVED
========================================================= */

function validateColumnRemoved(
  rule: PowerBIValidationRule,
  workspace: PowerBIWorkspaceState,
): boolean {
  const expectedColumn =
    rule.column ??
    rule.expectedColumn;

  if (!expectedColumn) {
    return false;
  }

  const table = findTable(
    workspace,
    rule,
  );

  if (!table) {
    return false;
  }

  const columns =
    table.columns ??
    table.headers ??
    [];

  return !columns.some(
    (column: string) =>
      normalizeColumn(
        column,
      ) ===
      normalizeColumn(
        expectedColumn,
      ),
  );
}

/* =========================================================
   TRANSFORM
========================================================= */

function validateTransform(
  rule: PowerBIValidationRule,
  workspace: PowerBIWorkspaceState,
): boolean {
  const transforms =
    getTransforms(
      workspace,
    );

  const expectedOperation =
    rule.transformType ??
    rule.operation;

  return transforms.some(
    (
      transform:
        PowerBITransform,
    ) => {
      const tableMatches =
        !rule.tableName ||
        normalizeText(
          transform.tableName,
        ) ===
          normalizeText(
            rule.tableName,
          );

      const operationMatches =
        !expectedOperation ||
        normalizeText(
          transform.type,
        ) ===
          normalizeText(
            expectedOperation,
          ) ||
        normalizeText(
          transform.operation,
        ) ===
          normalizeText(
            expectedOperation,
          );

      const columnMatches =
        !rule.column ||
        normalizeColumn(
          transform.column,
        ) ===
          normalizeColumn(
            rule.column,
          );

      return (
        tableMatches &&
        operationMatches &&
        columnMatches
      );
    },
  );
}

/* =========================================================
   RELATIONSHIP HELPERS
========================================================= */

function relationshipDirectionMatches(
  relationship: PowerBIRelationship,
  fromTable: string,
  fromColumn: string,
  toTable: string,
  toColumn: string,
): boolean {
  return (
    normalizeText(
      relationship.fromTable,
    ) ===
      normalizeText(
        fromTable,
      ) &&
    normalizeColumn(
      relationship.fromColumn,
    ) ===
      normalizeColumn(
        fromColumn,
      ) &&
    normalizeText(
      relationship.toTable,
    ) ===
      normalizeText(
        toTable,
      ) &&
    normalizeColumn(
      relationship.toColumn,
    ) ===
      normalizeColumn(
        toColumn,
      )
  );
}

/* =========================================================
   RELATIONSHIP
========================================================= */

function validateRelationship(
  rule: PowerBIValidationRule,
  workspace: PowerBIWorkspaceState,
): boolean {
  if (
    !rule.fromTable ||
    !rule.fromColumn ||
    !rule.toTable ||
    !rule.toColumn
  ) {
    return false;
  }

  const relationships =
    getRelationships(
      workspace,
    );

  return relationships.some(
    (
      relationship:
        PowerBIRelationship,
    ) => {
      const directMatch =
        relationshipDirectionMatches(
          relationship,
          rule.fromTable!,
          rule.fromColumn!,
          rule.toTable!,
          rule.toColumn!,
        );

      const reverseMatch =
        relationshipDirectionMatches(
          relationship,
          rule.toTable!,
          rule.toColumn!,
          rule.fromTable!,
          rule.fromColumn!,
        );

      if (
        !directMatch &&
        !reverseMatch
      ) {
        return false;
      }

      if (
        rule.cardinality &&
        normalizeText(
          relationship.cardinality,
        ) !==
          normalizeText(
            rule.cardinality,
          )
      ) {
        return false;
      }

      if (
        rule.active !== undefined &&
        relationship.active !==
          rule.active
      ) {
        return false;
      }

      return true;
    },
  );
}

/* =========================================================
   DAX MEASURE
========================================================= */

function validateMeasure(
  rule: PowerBIValidationRule,
  workspace: PowerBIWorkspaceState,
): boolean {
  if (!rule.measureName) {
    return false;
  }

  const measures =
    getMeasures(
      workspace,
    );

  return measures.some(
    (
      measure:
        PowerBIMeasure,
    ) => {
      const tableMatches =
        !rule.tableName ||
        normalizeText(
          measure.tableName,
        ) ===
          normalizeText(
            rule.tableName,
          );

      const nameMatches =
        normalizeText(
          measure.name ??
          measure.measureName,
        ) ===
        normalizeText(
          rule.measureName,
        );

      if (
        !tableMatches ||
        !nameMatches
      ) {
        return false;
      }

      const expectedExpression =
        rule.expression ??
        rule.expectedExpression;

      if (!expectedExpression) {
        return true;
      }

      return (
        normalizeDax(
          measure.expression,
        ) ===
        normalizeDax(
          expectedExpression,
        )
      );
    },
  );
}

/* =========================================================
   VISUAL
========================================================= */

function validateVisual(
  rule: PowerBIValidationRule,
  workspace: PowerBIWorkspaceState,
): boolean {
  const visuals =
    getVisuals(
      workspace,
    );

  return visuals.some(
    (
      visual:
        PowerBIVisual,
    ) => {
      const typeMatches =
        !rule.visualType ||
        normalizeText(
          visual.type ??
          visual.visualType,
        ) ===
          normalizeText(
            rule.visualType,
          );

      const titleMatches =
        !rule.visualTitle ||
        normalizeText(
          visual.title,
        ) ===
          normalizeText(
            rule.visualTitle,
          );

      const xAxisMatches =
        !rule.xAxis ||
        normalizeColumn(
          visual.xAxis,
        ) ===
          normalizeColumn(
            rule.xAxis,
          );

      const yAxisMatches =
        !rule.yAxis ||
        normalizeColumn(
          visual.yAxis,
        ) ===
          normalizeColumn(
            rule.yAxis,
          );

      const legendMatches =
        !rule.legend ||
        normalizeColumn(
          visual.legend,
        ) ===
          normalizeColumn(
            rule.legend,
          );

      const aggregationMatches =
        !rule.aggregation ||
        normalizeText(
          visual.aggregation,
        ) ===
          normalizeText(
            rule.aggregation,
          );

      return (
        typeMatches &&
        titleMatches &&
        xAxisMatches &&
        yAxisMatches &&
        legendMatches &&
        aggregationMatches
      );
    },
  );
}

/* =========================================================
   FILTER
========================================================= */

function validateFilter(
  rule: PowerBIValidationRule,
  workspace: PowerBIWorkspaceState,
): boolean {
  const expectedField =
    rule.filterField ??
    rule.field;

  const expectedValue =
    rule.filterValue ??
    rule.value;

  if (!expectedField) {
    return false;
  }

  const filters =
    getFilters(
      workspace,
    );

  return filters.some(
    (
      filter:
        PowerBIFilter,
    ) => {
      const fieldMatches =
        normalizeColumn(
          filter.field,
        ) ===
        normalizeColumn(
          expectedField,
        );

      const valueMatches =
        expectedValue ===
          undefined ||
        normalizeText(
          filter.value,
        ) ===
          normalizeText(
            expectedValue,
          );

      const operatorMatches =
        !rule.operator ||
        normalizeText(
          filter.operator,
        ) ===
          normalizeText(
            rule.operator,
          );

      return (
        fieldMatches &&
        valueMatches &&
        operatorMatches
      );
    },
  );
}

/* =========================================================
   DATASET STATE FALLBACK

   Useful when the frontend sends a datasets array.
========================================================= */

function validateDatasetState(
  rule: PowerBIValidationRule,
  workspace: PowerBIWorkspaceState,
): boolean {
  if (!rule.datasetId) {
    return false;
  }

  const datasets =
    getDatasets(
      workspace,
    );

  return datasets.some(
    (
      dataset:
        PowerBIDatasetState,
    ) =>
      normalizeText(
        dataset.id,
      ) ===
        normalizeText(
          rule.datasetId,
        ) &&
      dataset.loaded === true,
  );
}

/* =========================================================
   PUBLIC RULE VALIDATOR
========================================================= */

export function evaluatePowerBIRule(
  rule: PowerBIValidationRule,
  workspace: PowerBIWorkspaceState,
): boolean {
  switch (rule.type) {
    case 'dataset-selected':
      return validateDatasetSelected(
        rule,
        workspace,
      );

    case 'dataset-loaded':
      return (
        validateDatasetLoaded(
          rule,
          workspace,
        ) ||
        validateDatasetState(
          rule,
          workspace,
        )
      );

    case 'table-name':
      return validateTableName(
        rule,
        workspace,
      );

    case 'required-columns':
      return validateRequiredColumns(
        rule,
        workspace,
      );

    case 'minimum-rows':
      return validateMinimumRows(
        rule,
        workspace,
      );

    case 'column-exists':
      return validateColumnExists(
        rule,
        workspace,
      );

    case 'column-removed':
      return validateColumnRemoved(
        rule,
        workspace,
      );

    case 'column-renamed':
    case 'transform-applied':
    case 'transform':
      return validateTransform(
        rule,
        workspace,
      );

    case 'table-exists':
      return Boolean(
        findTable(
          workspace,
          rule,
        ),
      );

    case 'relationship-exists':
    case 'relationship':
      return validateRelationship(
        rule,
        workspace,
      );

    case 'measure-exists':
    case 'dax-expression':
    case 'dax-measure':
      return validateMeasure(
        rule,
        workspace,
      );

    case 'visual-exists':
    case 'visual-field':
    case 'visual':
      return validateVisual(
        rule,
        workspace,
      );

    case 'filter-exists':
    case 'filter':
      return validateFilter(
        rule,
        workspace,
      );

    default:
      return false;
  }
}

/* =========================================================
   SAFE VALIDATION MESSAGE

   Never expose hidden expected answers through validation
   responses.
========================================================= */

export function getPowerBIRuleMessage(
  rule: PowerBIValidationRule,
  passed: boolean,
): string {
  if (passed) {
    return 'Passed';
  }

  switch (rule.type) {
    case 'dataset-selected':
      return 'The required dataset selection is not correct.';

    case 'dataset-loaded':
      return 'The required dataset has not been loaded correctly.';

    case 'table-name':
      return 'The table name does not match the problem requirement.';

    case 'required-columns':
      return 'One or more required columns are missing or incorrectly detected.';

    case 'minimum-rows':
      return 'The expected dataset records have not been fully loaded.';

    case 'column-exists':
      return 'The required column is not available.';

    case 'column-removed':
      return 'The specified column has not been removed.';

    case 'column-renamed':
    case 'transform-applied':
    case 'transform':
      return 'The required transformation has not been completed correctly.';

    case 'table-exists':
      return 'The required table is not available in the model.';

    case 'relationship-exists':
    case 'relationship':
      return 'The required model relationship has not been configured correctly.';

    case 'measure-exists':
    case 'dax-expression':
    case 'dax-measure':
      return 'The required DAX measure has not been created correctly.';

    case 'visual-exists':
    case 'visual-field':
    case 'visual':
      return 'The required report visual has not been configured correctly.';

    case 'filter-exists':
    case 'filter':
      return 'The required filter has not been configured correctly.';

    default:
      return 'Validation failed.';
  }
}