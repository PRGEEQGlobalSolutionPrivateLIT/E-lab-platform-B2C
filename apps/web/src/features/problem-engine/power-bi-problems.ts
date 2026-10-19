import type {
  PowerBIDataset,
  PracticeProblem,
} from './types';

/* =========================================================
   POWER BI DATASETS

   Dataset files:

   apps/web/public/datasets/power-bi/
   ├── sales.csv
   ├── products.csv
   ├── customers.csv
   └── regions.csv
========================================================= */

/* =========================================================
   SALES DATASET
========================================================= */

const salesDataset: PowerBIDataset = {
  id: 'sales',

  name: 'Sales Dataset',

  fileName: 'sales.csv',

  path: '/datasets/power-bi/sales.csv',

  description:
    'Transaction-level sales data containing orders, products, customers, regions, quantities, pricing, revenue and profitability information.',

  suggestedTableName: 'Sales',
};

/* =========================================================
   PRODUCTS DATASET
========================================================= */

const productsDataset: PowerBIDataset = {
  id: 'products',

  name: 'Products Dataset',

  fileName: 'products.csv',

  path: '/datasets/power-bi/products.csv',

  description:
    'Product master data containing product, category, brand, supplier, pricing, inventory and product attributes.',

  suggestedTableName: 'Products',
};

/* =========================================================
   CUSTOMERS DATASET
========================================================= */

const customersDataset: PowerBIDataset = {
  id: 'customers',

  name: 'Customers Dataset',

  fileName: 'customers.csv',

  path: '/datasets/power-bi/customers.csv',

  description:
    'Customer master data containing profile, location, segmentation, purchasing, loyalty and engagement information.',

  suggestedTableName: 'Customers',
};

/* =========================================================
   REGIONS DATASET
========================================================= */

const regionsDataset: PowerBIDataset = {
  id: 'regions',

  name: 'Regions Dataset',

  fileName: 'regions.csv',

  path: '/datasets/power-bi/regions.csv',

  description:
    'Location and store data containing region, state, city, store, targets, performance and operational information.',

  suggestedTableName: 'Regions',
};

/* =========================================================
   ALL PROVIDED POWER BI DATASETS

   These datasets can be reused across future:

   - Data exercises
   - Transform exercises
   - Model exercises
   - DAX exercises
   - Report exercises
========================================================= */

export const powerBiDatasets: PowerBIDataset[] = [
  salesDataset,
  productsDataset,
  customersDataset,
  regionsDataset,
];

/* =========================================================
   POWER BI PRACTICE PROBLEMS
========================================================= */

export const powerBiProblems: PracticeProblem[] = [
  /* =======================================================
     01. IMPORT SALES DATA
  ======================================================= */

  {
    /*
     * IMPORTANT:
     *
     * This slug must exactly match:
     *
     * stack-problem-mappings.ts
     *
     * powerbi-import-sales-data
     */

    slug: 'powerbi-import-sales-data',

    title: 'Import Sales Data',

    technologySlug: 'power-bi',

    difficulty: 'Easy',

    workspaceType: 'powerbi',

    shortDescription:
      'Select and import the correct provided sales dataset into the Power BI workspace.',

    problemStatement: `
Import the provided sales dataset into Power BI.

Multiple datasets are available in the workspace. Select the dataset that contains sales transaction data.

The task must:

1. Select the correct sales dataset.
2. Import the dataset into the Power BI data model.
3. Name the imported table Sales.
4. Verify that the column headers are correctly detected.
5. Confirm that the sales records are loaded.
6. Ensure that the dataset is ready for analysis.
    `.trim(),

    inputFormat:
      'Select the appropriate CSV file from the provided datasets. No external file upload is required.',

    outputFormat:
      'A Power BI data model containing the imported sales dataset in a table named Sales.',

    constraints: [
      'Use one of the datasets provided in the Power BI workspace.',
      'Do not upload an external CSV file.',
      'Use sales.csv for the sales transaction dataset.',
      'The imported table must be named Sales.',
      'Do not manually recreate the dataset.',
    ],

    notes: [
      'Review the available datasets before importing.',
      'Verify the detected headers after importing the CSV.',
      'Use Check Solution to validate your work before submitting.',
    ],

    skills: [
      'Power BI',
      'Data Import',
      'CSV',
      'Data Loading',
      'Dataset Inspection',
      'Data Model',
    ],

    estimatedMinutes: 10,

    /* =====================================================
       POWER BI CONFIGURATION
    ===================================================== */

    powerBi: {
      /* ---------------------------------------------------
         DATASETS AVAILABLE TO LEARNER
      --------------------------------------------------- */

      availableDatasets: [
        salesDataset,
        productsDataset,
        customersDataset,
        regionsDataset,
      ],

      /* ---------------------------------------------------
         REQUIRED DATASET

         NOTE:
         This currently remains here because your existing
         frontend PowerBIWorkspace uses this configuration.

         Once backend validation is fully connected,
         validation metadata should be removed from the
         frontend and retained only in the NestJS API.
      --------------------------------------------------- */

      requiredDatasets: [
        'sales',
      ],

      /* ---------------------------------------------------
         ASSESSMENT SETTINGS
      --------------------------------------------------- */

      passingScore: 100,

      allowMultipleDatasets: false,

      allowCustomUpload: false,

      /* ---------------------------------------------------
         CURRENT FRONTEND VALIDATION RULES

         These keep the current workspace functional while
         the NestJS validation API is being connected.

         After backend validation is complete, these hidden
         rules should be removed from the frontend.
      --------------------------------------------------- */

      validationRules: [
        /* =================================================
           TEST 1
           CORRECT DATASET SELECTED
        ================================================= */

        {
          id: 'sales-dataset-selected',

          type: 'dataset-selected',

          datasetId: 'sales',

          label: 'Correct sales dataset selected',

          points: 10,

          required: true,

          hint:
            'Review the available datasets and choose the one containing transaction-level sales data.',
        },

        /* =================================================
           TEST 2
           SALES DATASET LOADED
        ================================================= */

        {
          id: 'sales-dataset-loaded',

          type: 'dataset-loaded',

          datasetId: 'sales',

          label: 'Sales dataset imported',

          points: 20,

          required: true,

          hint:
            'Import the selected sales dataset into the workspace.',
        },

        /* =================================================
           TEST 3
           TABLE NAME
        ================================================= */

        {
          id: 'sales-table-name',

          type: 'table-name',

          datasetId: 'sales',

          expected: 'Sales',

          label: 'Imported table is named Sales',

          points: 20,

          required: true,

          hint:
            'Rename the imported table to Sales.',
        },

        /* =================================================
           TEST 4
           REQUIRED COLUMN HEADERS
        ================================================= */

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
            'quantity',
            'unit_price',
            'unit_cost',
            'discount_percent',
            'tax_percent',
            'gross_sales',
            'net_sales',
            'total_cost',
            'profit',
            'profit_margin',
          ],

          label:
            'Sales column headers detected correctly',

          points: 30,

          required: true,

          hint:
            'Check that the CSV header row was detected correctly.',
        },

        /* =================================================
           TEST 5
           MINIMUM ROW COUNT
        ================================================= */

        {
          id: 'sales-minimum-rows',

          type: 'minimum-rows',

          datasetId: 'sales',

          minimum: 1000,

          label:
            'Sales records loaded successfully',

          points: 20,

          required: true,

          hint:
            'Verify that the complete sales dataset has been imported.',
        },
      ],
    },
  },
];