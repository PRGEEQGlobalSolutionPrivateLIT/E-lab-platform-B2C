import type {
  PracticeProblem,
} from './types';

/* =========================================================
   PYTHON DATA ANALYTICS PROBLEMS

   Domain:
   data-analytics

   Stack:
   python-analytics

   Technology:
   python-data-analytics
========================================================= */

export const pythonDataAnalyticsProblems: PracticeProblem[] = [
  /* =====================================================
     PROBLEM 1
     LOAD SALES DATA
  ===================================================== */

  {
    slug: 'pda-load-sales-data',
    title: 'Load Sales Data',
    technologySlug: 'python-data-analytics',
    difficulty: 'Easy',
    workspaceType: 'code',

    shortDescription:
      'Load a CSV sales dataset into a Pandas DataFrame.',

    problemStatement: `Load the provided sales.csv dataset using Pandas.

The program must:

1. Import Pandas.
2. Load sales.csv into a DataFrame named df.
3. Display the first five rows of the dataset.

Use pandas.read_csv() to load the dataset.`,

    inputFormat: `The dataset is provided as sales.csv.

No console input is required.`,

    outputFormat:
      'Display the first five rows of the sales DataFrame.',

    constraints: [
      'Import pandas as pd.',
      'Use pd.read_csv().',
      'Store the dataset in a DataFrame named df.',
      'Do not hard-code the dataset values.',
    ],

    skills: [
      'Python',
      'Pandas',
      'CSV',
      'DataFrame',
      'Data Loading',
    ],

    estimatedMinutes: 10,

    defaultLanguage: 'python',

    allowedLanguages: [
      'python',
    ],

    starterCode: `import pandas as pd

# Load the sales dataset
df = pd.read_csv("sales.csv")

# Display the first five rows
print(df.head())
`,
  },

  /* =====================================================
     PROBLEM 2
     INSPECT SALES DATA
  ===================================================== */

  {
    slug: 'pda-inspect-sales-data',
    title: 'Inspect Sales Data',
    technologySlug: 'python-data-analytics',
    difficulty: 'Easy',
    workspaceType: 'code',

    shortDescription:
      'Inspect the number of rows and columns in a sales dataset.',

    problemStatement: `Analyze the structure of the provided sales.csv dataset.

The program must:

1. Load sales.csv into a DataFrame named df.
2. Determine the number of rows.
3. Determine the number of columns.
4. Store the number of rows in row_count.
5. Store the number of columns in column_count.`,

    inputFormat: `The dataset is provided as sales.csv.

No console input is required.`,

    outputFormat:
      'Display the number of rows and columns in the dataset.',

    constraints: [
      'Use Pandas.',
      'Store the dataset in df.',
      'Use the DataFrame shape property.',
      'Store the results in row_count and column_count.',
    ],

    skills: [
      'Python',
      'Pandas',
      'DataFrame',
      'Data Inspection',
      'Shape',
    ],

    estimatedMinutes: 10,

    defaultLanguage: 'python',

    allowedLanguages: [
      'python',
    ],

    starterCode: `import pandas as pd

df = pd.read_csv("sales.csv")

# Determine the dataset dimensions
row_count = 0
column_count = 0

print("Rows:", row_count)
print("Columns:", column_count)
`,
  },

  /* =====================================================
     PROBLEM 3
     HANDLE MISSING VALUES
  ===================================================== */

  {
    slug: 'pda-handle-missing-values',
    title: 'Handle Missing Sales Data',
    technologySlug: 'python-data-analytics',
    difficulty: 'Easy',
    workspaceType: 'code',

    shortDescription:
      'Clean missing values from a sales dataset using Pandas.',

    problemStatement: `Clean missing values in the provided sales.csv dataset.

The program must:

1. Load sales.csv.
2. Identify rows containing missing values.
3. Remove rows containing missing values.
4. Store the cleaned DataFrame in cleaned_df.
5. Store the number of remaining rows in cleaned_row_count.`,

    inputFormat: `The dataset is provided as sales.csv.

Some records may contain missing values.`,

    outputFormat:
      'Display the cleaned DataFrame and the number of remaining rows.',

    constraints: [
      'Use Pandas.',
      'Do not modify the source dataset.',
      'Store the cleaned DataFrame in cleaned_df.',
      'Store the final row count in cleaned_row_count.',
    ],

    skills: [
      'Python',
      'Pandas',
      'Data Cleaning',
      'Missing Values',
      'dropna',
    ],

    estimatedMinutes: 15,

    defaultLanguage: 'python',

    allowedLanguages: [
      'python',
    ],

    starterCode: `import pandas as pd

df = pd.read_csv("sales.csv")

# Remove rows containing missing values
cleaned_df = df.copy()

# Store the number of remaining rows
cleaned_row_count = len(cleaned_df)

print(cleaned_df)
print("Remaining rows:", cleaned_row_count)
`,
  },

  /* =====================================================
     PROBLEM 4
     REMOVE DUPLICATES
  ===================================================== */

  {
    slug: 'pda-remove-duplicates',
    title: 'Remove Duplicate Orders',
    technologySlug: 'python-data-analytics',
    difficulty: 'Easy',
    workspaceType: 'code',

    shortDescription:
      'Identify and remove duplicate sales records using Pandas.',

    problemStatement: `Remove duplicate records from sales.csv.

The program must:

1. Load sales.csv.
2. Identify duplicate records.
3. Remove duplicate rows.
4. Store the cleaned DataFrame in cleaned_df.
5. Store the number of removed duplicates in duplicates_removed.`,

    inputFormat: `The dataset is provided as sales.csv.

No console input is required.`,

    outputFormat:
      'Display the cleaned dataset and the number of duplicate records removed.',

    constraints: [
      'Use Pandas.',
      'Use DataFrame duplicate handling.',
      'Store the result in cleaned_df.',
      'Store the duplicate count in duplicates_removed.',
      'Do not hard-code duplicates_removed.',
    ],

    skills: [
      'Python',
      'Pandas',
      'Data Cleaning',
      'Duplicates',
      'drop_duplicates',
    ],

    estimatedMinutes: 15,

    defaultLanguage: 'python',

    allowedLanguages: [
      'python',
    ],

    starterCode: `import pandas as pd

df = pd.read_csv("sales.csv")

# Remove duplicate records
cleaned_df = df.copy()

# Calculate the number of duplicates removed
duplicates_removed = 0

print(cleaned_df)
print("Duplicates removed:", duplicates_removed)
`,
  },

  /* =====================================================
     PROBLEM 5
     FILTER HIGH-VALUE ORDERS
  ===================================================== */

  {
    slug: 'pda-filter-high-value-orders',
    title: 'Find High-Value Orders',
    technologySlug: 'python-data-analytics',
    difficulty: 'Easy',
    workspaceType: 'code',

    shortDescription:
      'Filter high-value orders from a sales dataset using Pandas.',

    problemStatement: `Analyze sales.csv and identify high-value orders.

A high-value order is an order where revenue is greater than 50000.

The program must:

1. Load sales.csv.
2. Filter records where revenue > 50000.
3. Store the filtered DataFrame in high_value_orders.
4. Store the number of high-value orders in high_value_count.`,

    inputFormat: `The dataset is provided as sales.csv.

No console input is required.`,

    outputFormat:
      'Display all orders with revenue greater than 50000 and their count.',

    constraints: [
      'Use Pandas filtering.',
      'Use the revenue column.',
      'Revenue must be greater than 50000.',
      'Store the result in high_value_orders.',
      'Store the count in high_value_count.',
    ],

    skills: [
      'Python',
      'Pandas',
      'Filtering',
      'Boolean Indexing',
      'Business Analytics',
    ],

    estimatedMinutes: 15,

    defaultLanguage: 'python',

    allowedLanguages: [
      'python',
    ],

    starterCode: `import pandas as pd

df = pd.read_csv("sales.csv")

# Filter orders where revenue is greater than 50000
high_value_orders = df.copy()

# Store the number of matching orders
high_value_count = len(high_value_orders)

print(high_value_orders)
print("High-value orders:", high_value_count)
`,
  },

  /* =====================================================
     PROBLEM 6
     SALES BY REGION
  ===================================================== */

  {
    slug: 'pda-sales-by-region',
    title: 'Calculate Sales by Region',
    technologySlug: 'python-data-analytics',
    difficulty: 'Medium',
    workspaceType: 'code',

    shortDescription:
      'Calculate total sales revenue for each region using Pandas.',

    problemStatement: `Management wants to understand revenue performance by region.

Using sales.csv:

1. Load the dataset.
2. Group records by region.
3. Calculate total revenue for each region.
4. Store the resulting DataFrame in regional_sales.
5. The result must contain region and revenue columns.`,

    inputFormat: `The dataset is provided as sales.csv.

No console input is required.`,

    outputFormat:
      'Display total revenue grouped by region.',

    constraints: [
      'Use Pandas.',
      'Use groupby().',
      'Aggregate the revenue column.',
      'Store the final DataFrame in regional_sales.',
    ],

    skills: [
      'Python',
      'Pandas',
      'GroupBy',
      'Aggregation',
      'Revenue Analysis',
    ],

    estimatedMinutes: 20,

    defaultLanguage: 'python',

    allowedLanguages: [
      'python',
    ],

    starterCode: `import pandas as pd

df = pd.read_csv("sales.csv")

# Calculate revenue by region
regional_sales = None

print(regional_sales)
`,
  },

  /* =====================================================
     PROBLEM 7
     TOP PRODUCTS
  ===================================================== */

  {
    slug: 'pda-top-products',
    title: 'Find Top-Selling Products',
    technologySlug: 'python-data-analytics',
    difficulty: 'Medium',
    workspaceType: 'code',

    shortDescription:
      'Find the five products generating the highest total revenue.',

    problemStatement: `Identify the top-selling products using sales.csv.

The program must:

1. Load sales.csv.
2. Group the dataset by product.
3. Calculate total revenue for every product.
4. Sort products by revenue in descending order.
5. Select the top 5 products.
6. Store the result in top_products.`,

    inputFormat: `The dataset is provided as sales.csv.

No console input is required.`,

    outputFormat:
      'Display the five products generating the highest total revenue.',

    constraints: [
      'Use Pandas.',
      'Aggregate revenue by product.',
      'Sort revenue in descending order.',
      'Return only the top five products.',
      'Store the result in top_products.',
    ],

    skills: [
      'Python',
      'Pandas',
      'GroupBy',
      'Sorting',
      'Top-N Analysis',
    ],

    estimatedMinutes: 20,

    defaultLanguage: 'python',

    allowedLanguages: [
      'python',
    ],

    starterCode: `import pandas as pd

df = pd.read_csv("sales.csv")

# Calculate the top five products
top_products = None

print(top_products)
`,
  },

  /* =====================================================
     PROBLEM 8
     MONTHLY SALES TREND
  ===================================================== */

  {
    slug: 'pda-monthly-sales-trend',
    title: 'Analyze Monthly Sales Trend',
    technologySlug: 'python-data-analytics',
    difficulty: 'Medium',
    workspaceType: 'code',

    shortDescription:
      'Analyze monthly revenue trends using Pandas datetime operations.',

    problemStatement: `Analyze monthly revenue using sales.csv.

The program must:

1. Load sales.csv.
2. Convert the date column to datetime.
3. Group revenue by month.
4. Calculate total monthly revenue.
5. Store the result in monthly_sales.`,

    inputFormat: `The dataset is provided as sales.csv.

The dataset contains a date column and a revenue column.`,

    outputFormat:
      'Display total revenue for each month.',

    constraints: [
      'Use Pandas.',
      'Convert date to datetime.',
      'Aggregate revenue by month.',
      'Store the result in monthly_sales.',
    ],

    skills: [
      'Python',
      'Pandas',
      'Datetime',
      'Time Series',
      'Trend Analysis',
    ],

    estimatedMinutes: 20,

    defaultLanguage: 'python',

    allowedLanguages: [
      'python',
    ],

    starterCode: `import pandas as pd

df = pd.read_csv("sales.csv")

# Convert the date column to datetime
df["date"] = pd.to_datetime(df["date"])

# Calculate monthly sales
monthly_sales = None

print(monthly_sales)
`,
  },

  /* =====================================================
     PROBLEM 9
     SALES SUMMARY
  ===================================================== */

  {
    slug: 'pda-sales-summary',
    title: 'Generate Sales Statistics',
    technologySlug: 'python-data-analytics',
    difficulty: 'Medium',
    workspaceType: 'code',

    shortDescription:
      'Calculate key revenue statistics and order metrics from sales data.',

    problemStatement: `Generate summary statistics from sales.csv.

Calculate:

1. Total revenue.
2. Average order revenue.
3. Maximum order revenue.
4. Minimum order revenue.
5. Total number of orders.

Store the results in:

total_revenue
average_revenue
maximum_revenue
minimum_revenue
order_count`,

    inputFormat: `The dataset is provided as sales.csv.

No console input is required.`,

    outputFormat:
      'Display the required sales summary statistics.',

    constraints: [
      'Use Pandas.',
      'Use the revenue column.',
      'Do not hard-code any result.',
      'Use the required variable names.',
    ],

    skills: [
      'Python',
      'Pandas',
      'Statistics',
      'Aggregation',
      'Business Metrics',
    ],

    estimatedMinutes: 20,

    defaultLanguage: 'python',

    allowedLanguages: [
      'python',
    ],

    starterCode: `import pandas as pd

df = pd.read_csv("sales.csv")

total_revenue = 0
average_revenue = 0
maximum_revenue = 0
minimum_revenue = 0
order_count = 0

print("Total Revenue:", total_revenue)
print("Average Revenue:", average_revenue)
print("Maximum Revenue:", maximum_revenue)
print("Minimum Revenue:", minimum_revenue)
print("Order Count:", order_count)
`,
  },

  /* =====================================================
     PROBLEM 10
     REGIONAL SALES VISUALIZATION
  ===================================================== */

  {
    slug: 'pda-sales-chart',
    title: 'Visualize Regional Sales',
    technologySlug: 'python-data-analytics',
    difficulty: 'Medium',
    workspaceType: 'code',

    shortDescription:
      'Create a Matplotlib bar chart showing total revenue by region.',

    problemStatement: `Create a bar chart showing total revenue by region.

Using sales.csv:

1. Load the dataset using Pandas.
2. Calculate total revenue by region.
3. Create a bar chart using Matplotlib.
4. Set the chart title to "Revenue by Region".
5. Set the x-axis label to "Region".
6. Set the y-axis label to "Revenue".`,

    inputFormat: `The dataset is provided as sales.csv.

No console input is required.`,

    outputFormat:
      'Generate a bar chart displaying total revenue by region.',

    constraints: [
      'Use Pandas.',
      'Use Matplotlib.',
      'Aggregate revenue by region.',
      'Use a bar chart.',
      'Use the required title and axis labels.',
    ],

    skills: [
      'Python',
      'Pandas',
      'Matplotlib',
      'Data Visualization',
      'Business Analytics',
    ],

    estimatedMinutes: 25,

    defaultLanguage: 'python',

    allowedLanguages: [
      'python',
    ],

    starterCode: `import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("sales.csv")

# Calculate revenue by region
regional_sales = None

# Create the visualization
# Write your code here
`,
  },
];

/* =========================================================
   GET PYTHON DATA ANALYTICS PROBLEM BY SLUG
========================================================= */

export function getPythonDataAnalyticsProblemBySlug(
  slug: string,
): PracticeProblem | undefined {
  return pythonDataAnalyticsProblems.find(
    (problem) => problem.slug === slug,
  );
}

/* =========================================================
   DEFAULT EXPORT
========================================================= */

export default pythonDataAnalyticsProblems;