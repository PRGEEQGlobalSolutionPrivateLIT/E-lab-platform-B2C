/**
 * Server-only PySpark hidden tests.
 * Never expose expected outputs or source checks to learners.
 *
 * Starters embed fixed data and read no stdin, so each problem currently
 * has one output fixture. Independent input variations require judge support.
 */

type SourceCheck = {
  pattern: RegExp;
  message: string;
};

export type PythonSparkHiddenTestCase = {
  input: string;
  expectedOutput: string;
  requiredSourceChecks?: SourceCheck[];
  forbiddenSourceChecks?: SourceCheck[];
};

const check = (pattern: RegExp, message: string): SourceCheck => ({
  pattern,
  message,
});

const sparkSessionChecks: SourceCheck[] = [
  check(/SparkSession\s*\.\s*builder/s, 'Create the SparkSession using SparkSession.builder.'),
  check(/\.\s*appName\s*\(/s, 'Set the Spark application name using appName().'),
  check(/\.\s*getOrCreate\s*\(/s, 'Initialize the SparkSession with getOrCreate().'),
  check(/spark\s*\.\s*stop\s*\(/s, 'Stop the SparkSession after use.'),
  check(/spark\s*\.\s*sparkContext\s*\.\s*appName/s, 'Read the actual Spark application name.'),
];

const tests: Record<string, PythonSparkHiddenTestCase[]> = {
  'pyspark-create-spark-session': [{
    input: '',
    expectedOutput: 'ELabPySpark',
    requiredSourceChecks: sparkSessionChecks,
  }],
  'pyspark-create-dataframe': [{
    input: '',
    expectedOutput: 'Rows: 3',
    requiredSourceChecks: [
      check(/createDataFrame\s*\(/s, 'Create a DataFrame from the provided records.'),
      check(/\.\s*count\s*\(/s, 'Count the DataFrame rows.'),
    ],
  }],
  'pyspark-select-columns': [{
    input: '',
    expectedOutput: 'Asha\nRavi',
    requiredSourceChecks: [
      check(/\.\s*select\s*\(/s, 'Select the name column using a DataFrame API.'),
      check(/\.\s*(?:orderBy|sort)\s*\(/s, 'Sort the DataFrame by ID.'),
    ],
  }],
  'pyspark-filter-rows': [{
    input: '',
    expectedOutput: 'Asha\nMeera',
    requiredSourceChecks: [
      check(/\.\s*(?:filter|where)\s*\(/s, 'Filter the employees by salary.'),
      check(/\.\s*(?:orderBy|sort)\s*\(/s, 'Sort employee names alphabetically.'),
    ],
  }],
  'pyspark-add-derived-column': [{
    input: '',
    expectedOutput: 'Book 200\nPen 30',
    requiredSourceChecks: [
      check(/\.\s*withColumn\s*\(/s, 'Create a derived total column with withColumn().'),
      check(/\.\s*(?:orderBy|sort)\s*\(/s, 'Sort products alphabetically.'),
    ],
  }],
  'pyspark-groupby-aggregation': [{
    input: '',
    expectedOutput: 'East 250\nWest 200',
    requiredSourceChecks: [
      check(/\.\s*groupBy\s*\(/s, 'Group the sales records by region.'),
      check(/\.\s*agg\s*\(/s, 'Aggregate sales amounts per region.'),
      check(/\.\s*(?:orderBy|sort)\s*\(/s, 'Order the regions alphabetically.'),
    ],
  }],
  'pyspark-handle-null-values': [{
    input: '',
    expectedOutput: 'Total: 30',
    requiredSourceChecks: [
      check(/(?:\.\s*fillna\s*\(|\.\s*na\s*\.\s*fill\s*\()/s, 'Replace missing scores using fillna() or na.fill().'),
    ],
  }],
  'pyspark-spark-sql-query': [{
    input: '',
    expectedOutput: 'Total: 400',
    requiredSourceChecks: [
      check(/\.\s*createOrReplaceTempView\s*\(/s, 'Register the orders temporary view.'),
      check(/spark\s*\.\s*sql\s*\(/s, 'Run the aggregation using Spark SQL.'),
    ],
  }],
  'pyspark-join-dataframes': [{
    input: '',
    expectedOutput: 'Ravi 300\nAsha 150',
    requiredSourceChecks: [
      check(/\.\s*join\s*\(/s, 'Join the customer and order DataFrames.'),
      check(/\.\s*(?:orderBy|sort)\s*\(/s, 'Sort joined records by order ID.'),
    ],
  }],
  'pyspark-etl-sales-pipeline': [{
    input: '',
    expectedOutput: 'East 280\nWest 150',
    requiredSourceChecks: [
      check(/\.\s*(?:filter|where)\s*\(/s, 'Filter invalid sales records.'),
      check(/\.\s*withColumn\s*\(/s, 'Calculate revenue as a derived column.'),
      check(/\.\s*groupBy\s*\(/s, 'Aggregate revenue by region.'),
      check(/\.\s*(?:orderBy|sort)\s*\(/s, 'Order regions alphabetically.'),
    ],
  }],
  'pyspark-aggregate-department-salaries': [{
    input: '',
    expectedOutput: 'HR 50000\nIT 110000',
    requiredSourceChecks: [
      check(/\.\s*groupBy\s*\(/s, 'Group employees by department.'),
      check(/\.\s*agg\s*\(/s, 'Aggregate salaries for each department.'),
      check(/\.\s*(?:orderBy|sort)\s*\(/s, 'Order departments alphabetically.'),
    ],
  }],

  // Python for Data Engineering
  'pyspark-python-de-clean-records': [{
    input: '',
    expectedOutput: '1\n3',
    requiredSourceChecks: [
      check(/(?:\bfor\b|\bfilter\s*\(|\[[^\]]*\bfor\b)/s, 'Filter the provided event records using Python.'),
    ],
  }],

  // SQL for Data Engineering
  'pyspark-sql-de-revenue': [{
    input: '',
    expectedOutput: 'East 250\nWest 80',
    requiredSourceChecks: [
      check(/spark\s*\.\s*sql\s*\(/s, 'Use Spark SQL to calculate revenue.'),
      check(/GROUP\s+BY/i, 'Group sales by region.'),
      check(/ORDER\s+BY/i, 'Order regions alphabetically.'),
    ],
  }],

  // Data Formats and Storage
  'pyspark-data-formats-parquet': [{
    input: '',
    expectedOutput: 'Rows: 3',
    requiredSourceChecks: [
      check(/\.\s*write\b/s, 'Write the DataFrame to storage.'),
      check(/\.\s*(?:parquet|format)\s*\(/s, 'Use Parquet format.'),
      check(/\.\s*read\b/s, 'Read the stored DataFrame.'),
    ],
  }],

  // Spark Performance and Optimization
  'pyspark-performance-broadcast-join': [{
    input: '',
    expectedOutput: 'Matched: 3',
    requiredSourceChecks: [
      check(/broadcast\s*\(/s, 'Broadcast the small lookup DataFrame.'),
      check(/\.\s*join\s*\(/s, 'Join the employees and departments DataFrames.'),
    ],
  }],

  // Structured Streaming (schema preparation)
  'pyspark-structured-streaming-schema': [{
    input: '',
    expectedOutput: 'event_id\namount',
    requiredSourceChecks: [
      check(/StructType\s*\(/s, 'Define a StructType schema.'),
      check(/StructField\s*\(/s, 'Define schema fields using StructField.'),
      check(/IntegerType\s*\(/s, 'Use integer field types.'),
    ],
  }],
};

export function getPythonSparkTestCases(
  problemSlug: string,
): PythonSparkHiddenTestCase[] {
  return tests[problemSlug] ?? [];
}
