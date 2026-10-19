import type { PracticeProblem } from './types';

/* =========================================================

   PYTHON + APACHE SPARK PRACTICE PROBLEMS

   Domain: data-engineering

   Stack: python-spark

   Technology: pyspark

========================================================= */

export const pythonSparkProblems: PracticeProblem[] = [

  /* PROBLEM 1: CREATE A SPARKSESSION */

  {

    slug: 'pyspark-create-spark-session',

    title: 'Create a SparkSession',

    technologySlug: 'pyspark',

    difficulty: 'Easy',

    workspaceType: 'code',

    shortDescription: 'Create a local SparkSession named spark, print its application name, and stop the session.',

    problemStatement: `Create a local SparkSession named spark, print its application name, and stop the session.

Complete the starter code using PySpark DataFrame or Spark SQL APIs. Do not replace the computation with hard-coded output.`,

    inputFormat: 'No console input. The starter code provides all sample data in memory.',

    outputFormat: `ELabPySpark`,

    constraints: [

      'Use PySpark 3.5 APIs.',

      'Use the provided input records.',

      'Do not hard-code the computed output.',

      'Preserve the specified output order and format.',

    ],

    skills: ['Python', 'PySpark', 'SparkSession', 'Session Setup'],

    estimatedMinutes: 10,

    // defaultLanguage: 'pyspark',

    // allowedLanguages: ['pyspark'],

    starterCode: `from pyspark.sql import SparkSession

# Create a SparkSession with appName "ELabPySpark" and master "local[2]"

spark = None

print(spark.sparkContext.appName)

spark.stop()

`,

  },

  /* PROBLEM 2: CREATE A DATAFRAME */

  {

    slug: 'pyspark-create-dataframe',

    title: 'Create a DataFrame',

    technologySlug: 'pyspark',

    difficulty: 'Easy',

    workspaceType: 'code',

    shortDescription: 'Create a Spark DataFrame from a list of employee records and display its row count.',

    problemStatement: `Create a Spark DataFrame from a list of employee records and display its row count.

Complete the starter code using PySpark DataFrame or Spark SQL APIs. Do not replace the computation with hard-coded output.`,

    inputFormat: 'No console input. The starter code provides all sample data in memory.',

    outputFormat: `Rows: 3`,

    constraints: [

      'Use PySpark 3.5 APIs.',

      'Use the provided input records.',

      'Do not hard-code the computed output.',

      'Preserve the specified output order and format.',

    ],

    skills: ['Python', 'PySpark', 'DataFrame', 'Creation'],

    estimatedMinutes: 10,

    // defaultLanguage: 'pyspark',

    // allowedLanguages: ['pyspark'],

    starterCode: `from pyspark.sql import SparkSession

spark = SparkSession.builder.master("local[2]").appName("ELab").getOrCreate()

records = [(1, "Asha"), (2, "Ravi"), (3, "Meera")]

# Create a DataFrame with columns id and name

df = None

print("Rows:", df.count())

spark.stop()

`,

  },

  /* PROBLEM 3: SELECT DATAFRAME COLUMNS */

  {

    slug: 'pyspark-select-columns',

    title: 'Select DataFrame Columns',

    technologySlug: 'pyspark',

    difficulty: 'Easy',

    workspaceType: 'code',

    shortDescription: 'Select the name column from an employee DataFrame and print its values in ascending ID order.',

    problemStatement: `Select the name column from an employee DataFrame and print its values in ascending ID order.

Complete the starter code using PySpark DataFrame or Spark SQL APIs. Do not replace the computation with hard-coded output.`,

    inputFormat: 'No console input. The starter code provides all sample data in memory.',

    outputFormat: `Asha

Ravi`,

    constraints: [

      'Use PySpark 3.5 APIs.',

      'Use the provided input records.',

      'Do not hard-code the computed output.',

      'Preserve the specified output order and format.',

    ],

    skills: ['Python', 'PySpark', 'DataFrame', 'Select'],

    estimatedMinutes: 10,

    // defaultLanguage: 'pyspark',

    // allowedLanguages: ['pyspark'],

    starterCode: `from pyspark.sql import SparkSession

spark = SparkSession.builder.master("local[2]").appName("ELab").getOrCreate()

df = spark.createDataFrame([(1, "Asha", 25), (2, "Ravi", 30)], ["id", "name", "age"])

# Select name and order by id

result = None

for row in result.collect():

    print(row.name)

spark.stop()

`,

  },

  /* PROBLEM 4: FILTER EMPLOYEE RECORDS */

  {

    slug: 'pyspark-filter-rows',

    title: 'Filter Employee Records',

    technologySlug: 'pyspark',

    difficulty: 'Easy',

    workspaceType: 'code',

    shortDescription: 'Filter employees with salaries greater than 50000 and print their names alphabetically.',

    problemStatement: `Filter employees with salaries greater than 50000 and print their names alphabetically.

Complete the starter code using PySpark DataFrame or Spark SQL APIs. Do not replace the computation with hard-coded output.`,

    inputFormat: 'No console input. The starter code provides all sample data in memory.',

    outputFormat: `Asha

Meera`,

    constraints: [

      'Use PySpark 3.5 APIs.',

      'Use the provided input records.',

      'Do not hard-code the computed output.',

      'Preserve the specified output order and format.',

    ],

    skills: ['Python', 'PySpark', 'DataFrame', 'Filter'],

    estimatedMinutes: 15,

    // defaultLanguage: 'pyspark',

    // allowedLanguages: ['pyspark'],

    starterCode: `from pyspark.sql import SparkSession

spark = SparkSession.builder.master("local[2]").appName("ELab").getOrCreate()

df = spark.createDataFrame([("Asha", 60000), ("Ravi", 45000), ("Meera", 75000)], ["name", "salary"])

# Filter salary > 50000 and order by name

result = None

for row in result.collect():

    print(row.name)

spark.stop()

`,

  },

  /* PROBLEM 5: ADD A DERIVED COLUMN */

  {

    slug: 'pyspark-add-derived-column',

    title: 'Add a Derived Column',

    technologySlug: 'pyspark',

    difficulty: 'Easy',

    workspaceType: 'code',

    shortDescription: 'Create a total column by multiplying quantity and price, then print totals ordered by product.',

    problemStatement: `Create a total column by multiplying quantity and price, then print totals ordered by product.

Complete the starter code using PySpark DataFrame or Spark SQL APIs. Do not replace the computation with hard-coded output.`,

    inputFormat: 'No console input. The starter code provides all sample data in memory.',

    outputFormat: `Book 200

Pen 30`,

    constraints: [

      'Use PySpark 3.5 APIs.',

      'Use the provided input records.',

      'Do not hard-code the computed output.',

      'Preserve the specified output order and format.',

    ],

    skills: ['Python', 'PySpark', 'DataFrame', 'withColumn'],

    estimatedMinutes: 15,

    // defaultLanguage: 'pyspark',

    // allowedLanguages: ['pyspark'],

    starterCode: `from pyspark.sql import SparkSession

from pyspark.sql.functions import col

spark = SparkSession.builder.master("local[2]").appName("ELab").getOrCreate()

df = spark.createDataFrame([("Book", 2, 100), ("Pen", 3, 10)], ["product", "quantity", "price"])

# Add total = quantity * price and order by product

result = None

for row in result.collect():

    print(row.product, row.total)

spark.stop()

`,

  },

  /* PROBLEM 6: AGGREGATE SALES BY REGION */

  {

    slug: 'pyspark-groupby-aggregation',

    title: 'Aggregate Sales by Region',

    technologySlug: 'pyspark',

    difficulty: 'Medium',

    workspaceType: 'code',

    shortDescription: 'Group sales by region and calculate total amount per region. Print results alphabetically.',

    problemStatement: `Group sales by region and calculate total amount per region. Print results alphabetically.

Complete the starter code using PySpark DataFrame or Spark SQL APIs. Do not replace the computation with hard-coded output.`,

    inputFormat: 'No console input. The starter code provides all sample data in memory.',

    outputFormat: `East 250

West 200`,

    constraints: [

      'Use PySpark 3.5 APIs.',

      'Use the provided input records.',

      'Do not hard-code the computed output.',

      'Preserve the specified output order and format.',

    ],

    skills: ['Python', 'PySpark', 'GroupBy', 'Aggregation'],

    estimatedMinutes: 20,

    starterCode: `from pyspark.sql import SparkSession

from pyspark.sql.functions import sum as spark_sum

spark = SparkSession.builder.master("local[2]").appName("ELab").getOrCreate()

df = spark.createDataFrame([("East", 100), ("West", 200), ("East", 150)], ["region", "amount"])

# Group by region, sum amount as total, and sort by region

result = None

for row in result.collect():

    print(row.region, row.total)

spark.stop()

`,

  },

  /* PROBLEM 7: REPLACE MISSING VALUES */

  {

    slug: 'pyspark-handle-null-values',

    title: 'Replace Missing Values',

    technologySlug: 'pyspark',

    difficulty: 'Medium',

    workspaceType: 'code',

    shortDescription: 'Replace null scores with zero, then print the total score.',

    problemStatement: `Replace null scores with zero, then print the total score.

Complete the starter code using PySpark DataFrame or Spark SQL APIs. Do not replace the computation with hard-coded output.`,

    inputFormat: 'No console input. The starter code provides all sample data in memory.',

    outputFormat: `Total: 30`,

    constraints: [

      'Use PySpark 3.5 APIs.',

      'Use the provided input records.',

      'Do not hard-code the computed output.',

      'Preserve the specified output order and format.',

    ],

    skills: ['Python', 'PySpark', 'Nulls', 'Data Cleaning'],

    estimatedMinutes: 20,

    // defaultLanguage: 'pyspark',

    // allowedLanguages: ['pyspark'],

    starterCode: `from pyspark.sql import SparkSession

from pyspark.sql.functions import sum as spark_sum

spark = SparkSession.builder.master("local[2]").appName("ELab").getOrCreate()

df = spark.createDataFrame([(1, 10), (2, None), (3, 20)], "id INT, score INT")

# Replace null scores with zero

cleaned_df = None

print("Total:", cleaned_df.agg(spark_sum("score").alias("total")).first().total)

spark.stop()

`,

  },

  /* PROBLEM 8: QUERY A TEMPORARY VIEW */

  {

    slug: 'pyspark-spark-sql-query',

    title: 'Query a Temporary View',

    technologySlug: 'pyspark',

    difficulty: 'Medium',

    workspaceType: 'code',

    shortDescription: 'Register the orders DataFrame as a temporary view and query the sum of amounts using Spark SQL.',

    problemStatement: `Register the orders DataFrame as a temporary view and query the sum of amounts using Spark SQL.

Complete the starter code using PySpark DataFrame or Spark SQL APIs. Do not replace the computation with hard-coded output.`,

    inputFormat: 'No console input. The starter code provides all sample data in memory.',

    outputFormat: `Total: 400`,

    constraints: [

      'Use PySpark 3.5 APIs.',

      'Use the provided input records.',

      'Do not hard-code the computed output.',

      'Preserve the specified output order and format.',

    ],

    skills: ['Python', 'PySpark', 'Spark SQL', 'Temporary Views'],

    estimatedMinutes: 20,

    // defaultLanguage: 'pyspark',

    // allowedLanguages: ['pyspark'],

    starterCode: `from pyspark.sql import SparkSession

spark = SparkSession.builder.master("local[2]").appName("ELab").getOrCreate()

df = spark.createDataFrame([(1, 100), (2, 250), (3, 50)], ["order_id", "amount"])

# Register a temporary view named orders

# Use spark.sql to compute SUM(amount) AS total

result = None

print("Total:", result.first().total)

spark.stop()

`,

  },

  /* PROBLEM 9: JOIN CUSTOMERS AND ORDERS */

  {

    slug: 'pyspark-join-dataframes',

    title: 'Join Customers and Orders',

    technologySlug: 'pyspark',

    difficulty: 'Medium',

    workspaceType: 'code',

    shortDescription: 'Join customer and order DataFrames on customer_id, then print customer names and amounts ordered by order_id.',

    problemStatement: `Join customer and order DataFrames on customer_id, then print customer names and amounts ordered by order_id.

Complete the starter code using PySpark DataFrame or Spark SQL APIs. Do not replace the computation with hard-coded output.`,

    inputFormat: 'No console input. The starter code provides all sample data in memory.',

    outputFormat: `Ravi 300

Asha 150`,

    constraints: [

      'Use PySpark 3.5 APIs.',

      'Use the provided input records.',

      'Do not hard-code the computed output.',

      'Preserve the specified output order and format.',

    ],

    skills: ['Python', 'PySpark', 'Joins', 'DataFrames'],

    estimatedMinutes: 25,

    // defaultLanguage: 'pyspark',

    // allowedLanguages: ['pyspark'],

    starterCode: `from pyspark.sql import SparkSession

spark = SparkSession.builder.master("local[2]").appName("ELab").getOrCreate()

customers = spark.createDataFrame([(1, "Asha"), (2, "Ravi")], ["customer_id", "name"])

orders = spark.createDataFrame([(101, 2, 300), (102, 1, 150)], ["order_id", "customer_id", "amount"])

# Join on customer_id and sort by order_id

result = None

for row in result.collect():

    print(row.name, row.amount)

spark.stop()

`,

  },

  /* PROBLEM 10: BUILD A SALES ETL PIPELINE */

  {

    slug: 'pyspark-etl-sales-pipeline',

    title: 'Build a Sales ETL Pipeline',

    technologySlug: 'pyspark',

    difficulty: 'Hard',

    workspaceType: 'code',

    shortDescription: 'Filter invalid sales, calculate line totals, and aggregate revenue per region. Print regions alphabetically.',

    problemStatement: `Filter invalid sales, calculate line totals, and aggregate revenue per region. Print regions alphabetically.

Complete the starter code using PySpark DataFrame or Spark SQL APIs. Do not replace the computation with hard-coded output.`,

    inputFormat: 'No console input. The starter code provides all sample data in memory.',

    outputFormat: `East 280

West 150`,

    constraints: [

      'Use PySpark 3.5 APIs.',

      'Use the provided input records.',

      'Do not hard-code the computed output.',

      'Preserve the specified output order and format.',

    ],

    skills: ['Python', 'PySpark', 'ETL', 'Aggregation', 'Data Quality'],

    estimatedMinutes: 35,

    // defaultLanguage: 'pyspark',

    // allowedLanguages: ['pyspark'],

    starterCode: `from pyspark.sql import SparkSession

from pyspark.sql.functions import col, sum as spark_sum

spark = SparkSession.builder.master("local[2]").appName("ELab").getOrCreate()

df = spark.createDataFrame([("East", 2, 100), ("West", 3, 50), ("East", 1, 80), ("West", -1, 30)], ["region", "quantity", "unit_price"])

# Keep quantity > 0 and unit_price > 0

# Add revenue = quantity * unit_price

# Group by region and sum revenue as total_revenue

# Order by region

result = None

for row in result.collect():

    print(row.region, row.total_revenue)

spark.stop()

`,

  },

  /* PROBLEM 11: AGGREGATE DEPARTMENT SALARIES */

  {

    slug: 'pyspark-aggregate-department-salaries',

    title: 'Aggregate Department Salaries',

    technologySlug: 'pyspark',

    difficulty: 'Medium',

    workspaceType: 'code',

    shortDescription: 'Calculate total salaries by department and print departments alphabetically.',

    problemStatement: `Calculate the total salary for each department using PySpark DataFrame APIs. Print the department name and total salary in alphabetical department order.

Complete the starter code using PySpark 3.5 APIs. Do not hard-code the output.`,

    inputFormat: 'No console input. The starter code provides all sample data in memory.',

    outputFormat: `HR 50000

IT 110000`,

    constraints: [

      'Use PySpark 3.5 APIs.',

      'Use the provided employee records.',

      'Use DataFrame groupBy and aggregation operations.',

      'Do not hard-code the computed output.',

      'Preserve the specified output order and format.',

    ],

    skills: ['Python', 'PySpark', 'DataFrame', 'GroupBy', 'Aggregation'],

    estimatedMinutes: 20,

    starterCode: `from pyspark.sql import SparkSession

from pyspark.sql.functions import sum as spark_sum

spark = SparkSession.builder.master("local[2]").appName("ELab").getOrCreate()

employees = [("IT", 50000), ("HR", 30000), ("IT", 60000), ("HR", 20000)]

df = spark.createDataFrame(employees, ["department", "salary"])

# Group by department, sum salary as total, and order by department

result = None

for row in result.collect():

    print(row.department, row.total)

spark.stop()

`,

  },


  /* PROBLEM 12: PYTHON FOR DATA ENGINEERING */
  {
    slug: 'pyspark-python-de-clean-records',
    title: 'Clean Raw Event Records',
    technologySlug: 'pyspark',
    difficulty: 'Easy',
    workspaceType: 'code',
    shortDescription: 'Clean event records using Python transformations, remove invalid rows, and print valid IDs.',
    problemStatement: `Clean event records using Python transformations, remove invalid rows, and print valid IDs. Complete the starter code without hard-coding the output.`,
    inputFormat: 'No console input. The starter code provides the sample records.',
    outputFormat: `1
3`,
    constraints: ['Use the provided records.', 'Do not hard-code the computed output.', 'Preserve the expected output format.'],
    skills: ['Python', 'Data Cleaning', 'ETL'],
    estimatedMinutes: 15,
    starterCode: `records = [(1, "active"), (2, ""), (3, "active"), (4, None)]

# Keep records with a nonempty, non-null status and print IDs in ascending order.
valid_ids = None

for event_id in valid_ids:
    print(event_id)
`,
  },

  /* PROBLEM 13: SQL FOR DATA ENGINEERING */
  {
    slug: 'pyspark-sql-de-revenue',
    title: 'Summarize Revenue with Spark SQL',
    technologySlug: 'pyspark',
    difficulty: 'Medium',
    workspaceType: 'code',
    shortDescription: 'Use Spark SQL to aggregate valid order amounts by region.',
    problemStatement: `Use Spark SQL to aggregate valid order amounts by region. Complete the starter code without hard-coding the output.`,
    inputFormat: 'No console input. The starter code provides the sample records.',
    outputFormat: `East 250
West 80`,
    constraints: ['Use the provided records.', 'Do not hard-code the computed output.', 'Preserve the expected output format.'],
    skills: ['Spark SQL', 'Aggregation', 'Data Engineering'],
    estimatedMinutes: 25,
    starterCode: `from pyspark.sql import SparkSession

spark = SparkSession.builder.master("local[2]").appName("ELab").getOrCreate()
orders = spark.createDataFrame([("East", 100), ("West", 80), ("East", 150)], ["region", "amount"])
orders.createOrReplaceTempView("orders")

# Query total amount per region and order alphabetically by region.
result = None

for row in result.collect():
    print(row.region, row.total)

spark.stop()
`,
  },

  /* PROBLEM 14: DATA FORMATS AND STORAGE */
  {
    slug: 'pyspark-data-formats-parquet',
    title: 'Write and Read Parquet Data',
    technologySlug: 'pyspark',
    difficulty: 'Medium',
    workspaceType: 'code',
    shortDescription: 'Write a DataFrame to Parquet, read it back, and count its records.',
    problemStatement: `Write a DataFrame to Parquet, read it back, and count its records. Complete the starter code without hard-coding the output.`,
    inputFormat: 'No console input. The starter code provides the sample records.',
    outputFormat: `Rows: 3`,
    constraints: ['Use the provided records.', 'Do not hard-code the computed output.', 'Preserve the expected output format.'],
    skills: ['PySpark', 'Parquet', 'Storage'],
    estimatedMinutes: 25,
    starterCode: `from pyspark.sql import SparkSession
import tempfile

spark = SparkSession.builder.master("local[2]").appName("ELab").getOrCreate()
df = spark.createDataFrame([(1, "Asha"), (2, "Ravi"), (3, "Meera")], ["id", "name"])

with tempfile.TemporaryDirectory() as directory:
    path = directory + "/records.parquet"
    # Write df in Parquet format and load it back.
    loaded_df = None
    print("Rows:", loaded_df.count())

spark.stop()
`,
  },

  /* PROBLEM 15: SPARK PERFORMANCE AND OPTIMIZATION */
  {
    slug: 'pyspark-performance-broadcast-join',
    title: 'Optimize a Lookup Join',
    technologySlug: 'pyspark',
    difficulty: 'Hard',
    workspaceType: 'code',
    shortDescription: 'Use a broadcast join for a small department lookup and count matched employees.',
    problemStatement: `Use a broadcast join for a small department lookup and count matched employees. Complete the starter code without hard-coding the output.`,
    inputFormat: 'No console input. The starter code provides the sample records.',
    outputFormat: `Matched: 3`,
    constraints: ['Use the provided records.', 'Do not hard-code the computed output.', 'Preserve the expected output format.'],
    skills: ['PySpark', 'Broadcast Join', 'Optimization'],
    estimatedMinutes: 35,
    starterCode: `from pyspark.sql import SparkSession
from pyspark.sql.functions import broadcast

spark = SparkSession.builder.master("local[2]").appName("ELab").getOrCreate()
employees = spark.createDataFrame([(1, 10), (2, 20), (3, 10)], ["employee_id", "department_id"])
departments = spark.createDataFrame([(10, "IT"), (20, "HR")], ["department_id", "department"])

# Join employees with the broadcast departments DataFrame.
result = None

print("Matched:", result.count())
spark.stop()
`,
  },

  /* PROBLEM 16: STRUCTURED STREAMING */
  {
    slug: 'pyspark-structured-streaming-schema',
    title: 'Prepare a Streaming JSON Schema',
    technologySlug: 'pyspark',
    difficulty: 'Medium',
    workspaceType: 'code',
    shortDescription: 'Define a schema for streaming events and display its field names.',
    problemStatement: `Define a schema for streaming events and display its field names. Complete the starter code without hard-coding the output.`,
    inputFormat: 'No console input. The starter code provides the sample records.',
    outputFormat: `event_id
amount`,
    constraints: ['Use the provided records.', 'Do not hard-code the computed output.', 'Preserve the expected output format.'],
    skills: ['PySpark', 'Structured Streaming', 'Schema'],
    estimatedMinutes: 25,
    starterCode: `from pyspark.sql.types import StructType, StructField, IntegerType

# Define a StructType schema with event_id and amount as integer fields.
schema = None

for field in schema.fields:
    print(field.name)
`,
  },
];

export function getPythonSparkProblemBySlug(

  slug: string,

): PracticeProblem | undefined {

  return pythonSparkProblems.find((problem) => problem.slug === slug);

}

export default pythonSparkProblems;
