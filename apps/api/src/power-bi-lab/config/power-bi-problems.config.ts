import type {
  PowerBIProblemValidationConfig,
} from '../validation/power-bi-validation.types.js';

/* =========================================================
   POWER BI PROBLEM SLUGS

   IMPORTANT:

   These slugs must exactly match the slugs registered in
   the frontend problem engine.
========================================================= */

export const POWER_BI_PROBLEM_SLUGS = {
  IMPORT_SALES_DATA: 'power-bi-import-sales-data',
} as const;

/* =========================================================
   IMPORT SALES DATA
   HIDDEN BACKEND VALIDATION

   Problem requirements:

   1. Select the correct Sales dataset.
   2. Import/load the Sales dataset.
   3. Name the imported table Sales.
   4. Detect the required Sales columns.
   5. Load the complete dataset.

   These rules remain on the API.

   The frontend sends only the learner workspace state.
========================================================= */

const importSalesDataConfig: PowerBIProblemValidationConfig = {
  problemSlug:
    POWER_BI_PROBLEM_SLUGS.IMPORT_SALES_DATA,

  /* -------------------------------------------------------
     PASSING SCORE

     This introductory exercise requires every rule to pass.
  ------------------------------------------------------- */

  passingScore: 100,

  rules: [
    /* =====================================================
       TEST 1
       CORRECT DATASET SELECTED
    ===================================================== */

    {
      id: 'sales-dataset-selected',

      type: 'dataset-selected',

      datasetId: 'sales',

      label: 'Correct sales dataset selected',

      points: 10,

      required: true,

      hint:
        'Review the available datasets and select the dataset containing sales transaction data.',
    },

    /* =====================================================
       TEST 2
       SALES DATASET LOADED
    ===================================================== */

    {
      id: 'sales-dataset-loaded',

      type: 'dataset-loaded',

      datasetId: 'sales',

      label: 'Sales dataset imported',

      points: 20,

      required: true,

      hint:
        'Load the selected sales dataset into the Power BI workspace.',
    },

    /* =====================================================
       TEST 3
       TABLE NAME
    ===================================================== */

    {
      id: 'sales-table-name',

      type: 'table-name',

      datasetId: 'sales',

      expected: 'Sales',

      label: 'Imported table is named Sales',

      points: 20,

      required: true,

      hint:
        'Rename the imported table according to the problem statement.',
    },

    /* =====================================================
       TEST 4
       REQUIRED SALES COLUMNS

       These columns must exist in the loaded sales.csv.

       The rule engine normalizes header formatting, so:

       order_id
       Order ID
       ORDER_ID
       Order-ID

       are treated equivalently.
    ===================================================== */

    {
      id: 'sales-required-columns',

      type: 'required-columns',

      datasetId: 'sales',

      columns: [
        'sales_id',
        'order_id',
        'order_date',
        'ship_date',
        'customer_id',
        'product_id',
        'location_id',
        'region_id',
        'store_id',
        'salesperson_id',
        'channel',
        'order_status',
        'payment_method',
        'currency',
        'quantity',
        'unit_price',
        'unit_cost',
        'discount_percent',
        'discount_amount',
        'tax_percent',
        'tax_amount',
        'shipping_cost',
        'gross_sales',
        'net_sales',
        'total_cost',
        'profit',
        'profit_margin',
        'year',
        'quarter',
        'month',
        'month_name',
        'week_number',
        'day_name',
        'promotion_code',
        'return_status',
      ],

      label: 'Required sales columns detected',

      points: 30,

      required: true,

      hint:
        'Verify that the CSV header row has been detected correctly.',
    },

    /* =====================================================
       TEST 5
       COMPLETE DATASET

       Current sales.csv is expected to contain at least
       1,500 data rows.

       If your generated sales.csv contains a different
       number of rows, update this value to match the
       actual dataset requirement.
    ===================================================== */

    {
      id: 'sales-complete-row-count',

      type: 'minimum-rows',

      datasetId: 'sales',

      minimum: 1500,

      label: 'Complete sales dataset loaded',

      points: 20,

      required: true,

      hint:
        'Verify that the complete sales dataset has been imported.',
    },
  ],
};

/* =========================================================
   POWER BI PROBLEM CONFIGURATION REGISTRY

   Register every backend-validated Power BI exercise here.

   Future examples:

   - Transform Sales Data
   - Build Sales Data Model
   - Create DAX Measures
   - Build Sales Report
========================================================= */

export const POWER_BI_PROBLEM_CONFIGS:
  PowerBIProblemValidationConfig[] = [
    importSalesDataConfig,
  ];

/* =========================================================
   GET PROBLEM CONFIGURATION

   Used by:

   - Check Solution
   - Submit
   - PowerBIValidatorService
========================================================= */

export function getPowerBIProblemConfig(
  problemSlug: string,
): PowerBIProblemValidationConfig | undefined {
  const normalizedProblemSlug =
    problemSlug.trim();

  return POWER_BI_PROBLEM_CONFIGS.find(
    (config) =>
      config.problemSlug ===
      normalizedProblemSlug,
  );
}