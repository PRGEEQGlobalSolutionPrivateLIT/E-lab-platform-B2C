/* =========================================================
   PYTHON DATA ANALYTICS DATASETS

   Server-side datasets used by Python Data Analytics
   practice problems.

   These datasets must NOT be supplied by the learner.
========================================================= */

export type PythonAnalyticsDataset = {
  fileName: string;
  content: string;
};

/* =========================================================
   SALES DATASET
========================================================= */

const salesDataset = `order_id,date,product,category,region,quantity,price,revenue
1001,2026-01-05,Laptop,Electronics,South,2,50000,100000
1002,2026-01-08,Keyboard,Accessories,North,5,1500,7500
1003,2026-01-15,Monitor,Electronics,West,3,15000,45000
1004,2026-02-02,Mouse,Accessories,East,10,800,8000
1005,2026-02-10,Laptop,Electronics,North,1,50000,50000
1006,2026-02-18,Monitor,Electronics,South,4,15000,60000
1007,2026-03-03,Keyboard,Accessories,West,8,1500,12000
1008,2026-03-12,Laptop,Electronics,East,2,50000,100000
1009,2026-03-20,Mouse,Accessories,South,12,800,9600
1010,2026-04-04,Monitor,Electronics,North,5,15000,75000
1011,2026-04-11,Laptop,Electronics,West,1,50000,50000
1012,2026-04-19,Keyboard,Accessories,East,6,1500,9000
1013,2026-05-03,Mouse,Accessories,North,15,800,12000
1014,2026-05-14,Laptop,Electronics,South,3,50000,150000
1015,2026-05-25,Monitor,Electronics,East,2,15000,30000
`;

/* =========================================================
   PROBLEM -> DATASET MAPPING
========================================================= */

const datasetByProblemSlug: Record<
  string,
  PythonAnalyticsDataset
> = {
  'pda-load-sales-data': {
    fileName: 'sales.csv',
    content: salesDataset,
  },

  'pda-inspect-sales-data': {
    fileName: 'sales.csv',
    content: salesDataset,
  },

  'pda-handle-missing-values': {
    fileName: 'sales.csv',
    content: salesDataset,
  },

  'pda-remove-duplicates': {
    fileName: 'sales.csv',
    content: salesDataset,
  },

  'pda-filter-high-value-orders': {
    fileName: 'sales.csv',
    content: salesDataset,
  },

  'pda-sales-by-region': {
    fileName: 'sales.csv',
    content: salesDataset,
  },

  'pda-top-products': {
    fileName: 'sales.csv',
    content: salesDataset,
  },

  'pda-monthly-sales-trend': {
    fileName: 'sales.csv',
    content: salesDataset,
  },

  'pda-sales-summary': {
    fileName: 'sales.csv',
    content: salesDataset,
  },

  'pda-sales-chart': {
    fileName: 'sales.csv',
    content: salesDataset,
  },
};

/* =========================================================
   GET DATASET FOR PROBLEM
========================================================= */

export function getPythonAnalyticsDataset(
  problemSlug: string,
): PythonAnalyticsDataset | undefined {
  const slug = String(
    problemSlug ?? '',
  )
    .trim()
    .toLowerCase();

  return datasetByProblemSlug[
    slug
  ];
}

/* =========================================================
   CHECK DATASET
========================================================= */

export function hasPythonAnalyticsDataset(
  problemSlug: string,
): boolean {
  return Boolean(
    getPythonAnalyticsDataset(
      problemSlug,
    ),
  );
}

/* =========================================================
   EXPORTS
========================================================= */

export {
  salesDataset,
  datasetByProblemSlug,
};

export default getPythonAnalyticsDataset;