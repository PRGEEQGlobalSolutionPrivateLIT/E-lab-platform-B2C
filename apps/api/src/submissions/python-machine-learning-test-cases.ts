/* =========================================================
   PYTHON MACHINE LEARNING HIDDEN TEST CASES
========================================================= */

export type PythonMachineLearningTestCase = {
  input: string;
  expectedOutput: string;
};

/* =========================================================
   LOAD CUSTOMER DATA EXPECTED OUTPUT
========================================================= */

const loadCustomerDataExpectedOutput = `customer_id  name  age gender      city  annual_income  spending_score
       C001 Aarav   25   Male   Chennai         450000              62
       C002  Diya   31 Female Bengaluru         720000              78
       C003 Arjun   28   Male Hyderabad         580000              55
       C004 Meera   35 Female    Mumbai         850000              81
       C005 Rohan   42   Male     Delhi         920000              48
10
7`;

/* =========================================================
   PROBLEM -> HIDDEN TEST CASES
========================================================= */

const pythonMachineLearningTestCases: Record<
  string,
  PythonMachineLearningTestCase[]
> = {
  'pml-load-customer-data': [
    {
      input: '',
      expectedOutput:
        loadCustomerDataExpectedOutput,
    },
    {
      input: '',
      expectedOutput:
        loadCustomerDataExpectedOutput,
    },
    {
      input: '',
      expectedOutput:
        loadCustomerDataExpectedOutput,
    },
  ],
};

/* =========================================================
   GET TEST CASES
========================================================= */

export function getPythonMachineLearningTestCases(
  problemSlug: string,
): PythonMachineLearningTestCase[] {
  const slug = String(
    problemSlug ?? '',
  )
    .trim()
    .toLowerCase();

  return (
    pythonMachineLearningTestCases[
      slug
    ] ?? []
  );
}

/* =========================================================
   CHECK TEST CASES
========================================================= */

export function hasPythonMachineLearningTestCases(
  problemSlug: string,
): boolean {
  return (
    getPythonMachineLearningTestCases(
      problemSlug,
    ).length > 0
  );
}

/* =========================================================
   EXPORTS
========================================================= */

export {
  pythonMachineLearningTestCases,
};

export default getPythonMachineLearningTestCases;