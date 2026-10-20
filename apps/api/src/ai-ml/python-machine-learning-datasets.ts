/* =========================================================
   PYTHON MACHINE LEARNING DATASETS

   Server-side datasets used by Python Machine Learning
   practice problems.

   These datasets are supplied automatically by E-Lab.
   The learner does NOT need to create or upload them.
========================================================= */

export type PythonMachineLearningDataset = {
  fileName: string;
  content: string;
};

/* =========================================================
   CUSTOMER DATASET

   Used by:
   pml-load-customer-data
========================================================= */

const customerDataset = `customer_id,name,age,gender,city,annual_income,spending_score
C001,Aarav,25,Male,Chennai,450000,62
C002,Diya,31,Female,Bengaluru,720000,78
C003,Arjun,28,Male,Hyderabad,580000,55
C004,Meera,35,Female,Mumbai,850000,81
C005,Rohan,42,Male,Delhi,920000,48
C006,Ananya,24,Female,Pune,480000,73
C007,Vikram,39,Male,Chennai,760000,51
C008,Ishita,29,Female,Bengaluru,640000,69
C009,Karan,33,Male,Hyderabad,700000,57
C010,Nisha,27,Female,Mumbai,610000,76
`;

/* =========================================================
   PROBLEM -> DATASET MAPPING

   IMPORTANT:

   The key must exactly match the problem slug used by the
   frontend.

   Current workspace URL:

   /workspace/pml-load-customer-data

   Therefore the exact slug is:

   pml-load-customer-data
========================================================= */

const customerModelDataset = `age,income,city,spending,purchased
41,490000,Bengaluru,31134,0
25,1350000,Chennai,61889,1
58,370000,Hyderabad,35652,0
23,410000,Mumbai,22852,0
36,410000,Pune,27714,0
57,450000,Bengaluru,38861,0
58,370000,Chennai,32927,0
24,580000,Hyderabad,26781,0
29,670000,Mumbai,34933,0
28,1030000,Pune,48127,1
32,430000,Bengaluru,27564,0
33,770000,Chennai,37498,0
25,1020000,Hyderabad,44788,1
52,1170000,Mumbai,62755,1
41,890000,Pune,48696,1
44,680000,Bengaluru,38435,0
36,400000,Chennai,27505,0
52,1420000,Hyderabad,71213,1
39,1070000,Mumbai,51099,0
47,510000,Pune,36702,0
52,830000,Bengaluru,45121,1
25,1270000,Chennai,58871,1
41,730000,Hyderabad,43195,0
52,1040000,Mumbai,59728,1
26,1500000,Pune,66011,1
25,370000,Bengaluru,24289,0
57,1170000,Chennai,66633,1
45,1430000,Hyderabad,72177,1
50,750000,Mumbai,42376,1
52,370000,Pune,28187,0
29,1240000,Bengaluru,56328,1
52,400000,Chennai,28962,0
56,650000,Hyderabad,46036,0
48,1400000,Mumbai,70907,1
47,750000,Pune,45692,1
35,490000,Bengaluru,26779,0
35,1140000,Chennai,54011,0
58,530000,Hyderabad,36752,0
30,830000,Mumbai,42579,0
57,700000,Pune,48907,0
`;

const customerMissingDataset = `age,income,city,spending,purchased
41,490000,Bengaluru,31134,0
25,1350000,Chennai,61889,1
,370000,Hyderabad,35652,0
23,410000,Mumbai,22852,0
36,,Pune,27714,0
57,450000,Bengaluru,38861,0
58,370000,Chennai,32927,0
,,Hyderabad,26781,0
29,670000,Mumbai,34933,0
28,1030000,Pune,48127,1
32,430000,Bengaluru,27564,0
33,770000,Chennai,37498,0
25,1020000,Hyderabad,44788,1
,1170000,Mumbai,62755,1
41,890000,Pune,48696,1
44,680000,Bengaluru,38435,0
36,,Chennai,27505,0
52,1420000,Hyderabad,71213,1
39,,Mumbai,51099,0
47,510000,Pune,36702,0
`;

const machineLearningDatasetByProblemSlug: Record<
  string,
  PythonMachineLearningDataset
> = {
  'pml-load-customer-data': {
    fileName:
      'customer_data.csv',

    content:
      customerDataset,
  },

  'pml-prepare-features-target': {
    fileName: 'customer_data.csv',
    content: customerModelDataset,
  },

  'pml-encode-categorical-features': {
    fileName: 'customer_data.csv',
    content: customerModelDataset,
  },

  'pml-scale-numerical-features': {
    fileName: 'customer_data.csv',
    content: customerModelDataset,
  },

  'pml-train-test-split': {
    fileName: 'customer_data.csv',
    content: customerModelDataset,
  },

  'pml-linear-regression': {
    fileName: 'customer_data.csv',
    content: customerModelDataset,
  },

  'pml-logistic-regression': {
    fileName: 'customer_data.csv',
    content: customerModelDataset,
  },

  'pml-evaluate-classification-model': {
    fileName: 'customer_data.csv',
    content: customerModelDataset,
  },

  'pml-customer-prediction-pipeline': {
    fileName: 'customer_data.csv',
    content: customerModelDataset,
  },

  'pml-handle-missing-data': {
    fileName: 'customer_data.csv',
    content: customerMissingDataset,
  },
};

/* =========================================================
   GET DATASET FOR PROBLEM
========================================================= */

export function getPythonMachineLearningDataset(
  problemSlug: string,
): PythonMachineLearningDataset | undefined {
  const slug =
    String(
      problemSlug ?? '',
    )
      .trim()
      .toLowerCase();

  return machineLearningDatasetByProblemSlug[
    slug
  ];
}

/* =========================================================
   CHECK WHETHER PROBLEM HAS DATASET
========================================================= */

export function hasPythonMachineLearningDataset(
  problemSlug: string,
): boolean {
  return Boolean(
    getPythonMachineLearningDataset(
      problemSlug,
    ),
  );
}

/* =========================================================
   EXPORTS
========================================================= */

export {
  customerDataset,
  machineLearningDatasetByProblemSlug,
};

export default getPythonMachineLearningDataset;