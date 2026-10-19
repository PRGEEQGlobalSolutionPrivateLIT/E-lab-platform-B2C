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