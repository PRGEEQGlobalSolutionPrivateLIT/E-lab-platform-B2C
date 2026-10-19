import type {
  PracticeProblem,
} from './types';

/* =========================================================
   PYTHON MACHINE LEARNING PROBLEMS

   Domain:
   ai-ml

   Stack:
   python-ml

   Technology:
   python-machine-learning
========================================================= */

export const pythonMachineLearningProblems: PracticeProblem[] = [
  /* =====================================================
     PROBLEM 1
     LOAD MACHINE LEARNING DATASET
  ===================================================== */

  {
    slug: 'pml-load-customer-data',

    title: 'Load Customer Dataset',

    technologySlug: 'python-machine-learning',

    difficulty: 'Easy',

    workspaceType: 'code',

    shortDescription:
      'Load a customer dataset into a Pandas DataFrame for machine learning.',

    problemStatement: `Load the provided customer_data.csv dataset using Pandas.

The program must:

1. Import Pandas.
2. Load customer_data.csv into a DataFrame named df.
3. Store the number of rows in row_count.
4. Store the number of columns in column_count.
5. Display the first five rows of the dataset.`,

    inputFormat: `The dataset is provided as customer_data.csv.

No console input is required.`,

    outputFormat:
      'Display the first five rows and the number of rows and columns in the dataset.',

    constraints: [
      'Import pandas as pd.',
      'Use pd.read_csv().',
      'Store the dataset in a DataFrame named df.',
      'Store the row count in row_count.',
      'Store the column count in column_count.',
      'Do not hard-code the dataset values.',
    ],

    skills: [
      'Python',
      'Pandas',
      'Machine Learning',
      'Data Loading',
      'DataFrame',
    ],

    estimatedMinutes: 10,

    defaultLanguage: 'python',

    allowedLanguages: [
      'python',
    ],

    starterCode: `import pandas as pd

# Load the customer dataset
df = pd.read_csv("customer_data.csv")

# Determine dataset dimensions
row_count = 0
column_count = 0

print(df.head())
print("Rows:", row_count)
print("Columns:", column_count)
`,
  },

  /* =====================================================
     PROBLEM 2
     PREPARE FEATURES AND TARGET
  ===================================================== */

  {
    slug: 'pml-prepare-features-target',

    title: 'Prepare Features and Target',

    technologySlug: 'python-machine-learning',

    difficulty: 'Easy',

    workspaceType: 'code',

    shortDescription:
      'Separate machine learning input features from the prediction target.',

    problemStatement: `Prepare the customer dataset for machine learning.

The dataset contains a target column named purchased.

The program must:

1. Load customer_data.csv.
2. Separate the purchased column from the input features.
3. Store all input features in X.
4. Store the purchased column in y.
5. Store the number of features in feature_count.
6. Store the number of target values in target_count.`,

    inputFormat: `The dataset is provided as customer_data.csv.

The dataset contains a target column named purchased.

No console input is required.`,

    outputFormat:
      'Display the number of input features and target values.',

    constraints: [
      'Use Pandas.',
      'Store input features in X.',
      'Store the target values in y.',
      'The purchased column must not be included in X.',
      'Do not hard-code feature_count or target_count.',
    ],

    skills: [
      'Python',
      'Pandas',
      'Features',
      'Target Variable',
      'Machine Learning Preparation',
    ],

    estimatedMinutes: 10,

    defaultLanguage: 'python',

    allowedLanguages: [
      'python',
    ],

    starterCode: `import pandas as pd

df = pd.read_csv("customer_data.csv")

# Separate features and target
X = None
y = None

feature_count = 0
target_count = 0

print("Features:", feature_count)
print("Target values:", target_count)
`,
  },

  /* =====================================================
     PROBLEM 3
     HANDLE MISSING ML DATA
  ===================================================== */

  {
    slug: 'pml-handle-missing-data',

    title: 'Handle Missing Machine Learning Data',

    technologySlug: 'python-machine-learning',

    difficulty: 'Easy',

    workspaceType: 'code',

    shortDescription:
      'Prepare machine learning data by handling missing numerical values.',

    problemStatement: `Prepare customer_data.csv by handling missing values.

The dataset contains numerical columns age and income.

The program must:

1. Load customer_data.csv.
2. Calculate the median of the age column.
3. Calculate the median of the income column.
4. Replace missing age values with the age median.
5. Replace missing income values with the income median.
6. Store the cleaned DataFrame in cleaned_df.
7. Store the total remaining number of missing values in missing_count.`,

    inputFormat: `The dataset is provided as customer_data.csv.

The age and income columns may contain missing values.`,

    outputFormat:
      'Display the cleaned dataset and the number of remaining missing values.',

    constraints: [
      'Use Pandas.',
      'Use the median to replace missing numerical values.',
      'Store the result in cleaned_df.',
      'Do not remove rows containing missing age or income values.',
      'Store the remaining missing-value count in missing_count.',
    ],

    skills: [
      'Python',
      'Pandas',
      'Data Preprocessing',
      'Missing Values',
      'Median Imputation',
    ],

    estimatedMinutes: 15,

    defaultLanguage: 'python',

    allowedLanguages: [
      'python',
    ],

    starterCode: `import pandas as pd

df = pd.read_csv("customer_data.csv")

# Create a copy for preprocessing
cleaned_df = df.copy()

# Calculate median values
age_median = None
income_median = None

# Replace missing values
# Write your code here

missing_count = 0

print(cleaned_df)
print("Remaining missing values:", missing_count)
`,
  },

  /* =====================================================
     PROBLEM 4
     ENCODE CATEGORICAL FEATURES
  ===================================================== */

  {
    slug: 'pml-encode-categorical-features',

    title: 'Encode Categorical Features',

    technologySlug: 'python-machine-learning',

    difficulty: 'Easy',

    workspaceType: 'code',

    shortDescription:
      'Convert categorical customer data into numerical machine learning features.',

    problemStatement: `Prepare categorical customer data for machine learning.

The customer_data.csv dataset contains a categorical column named city.

The program must:

1. Load customer_data.csv.
2. Apply one-hot encoding to the city column.
3. Store the transformed DataFrame in encoded_df.
4. Remove the original city column during encoding.
5. Store the number of columns after encoding in encoded_column_count.`,

    inputFormat: `The dataset is provided as customer_data.csv.

The dataset contains a categorical column named city.`,

    outputFormat:
      'Display the encoded DataFrame and the number of columns after encoding.',

    constraints: [
      'Use Pandas.',
      'Use one-hot encoding.',
      'Encode the city column.',
      'Store the transformed dataset in encoded_df.',
      'Do not manually create encoded city columns.',
      'Store the final column count in encoded_column_count.',
    ],

    skills: [
      'Python',
      'Pandas',
      'Categorical Data',
      'One-Hot Encoding',
      'Feature Engineering',
    ],

    estimatedMinutes: 15,

    defaultLanguage: 'python',

    allowedLanguages: [
      'python',
    ],

    starterCode: `import pandas as pd

df = pd.read_csv("customer_data.csv")

# Encode the city column
encoded_df = None

# Determine the number of columns after encoding
encoded_column_count = 0

print(encoded_df)
print("Encoded columns:", encoded_column_count)
`,
  },

  /* =====================================================
     PROBLEM 5
     SCALE NUMERICAL FEATURES
  ===================================================== */

  {
    slug: 'pml-scale-numerical-features',

    title: 'Scale Numerical Features',

    technologySlug: 'python-machine-learning',

    difficulty: 'Easy',

    workspaceType: 'code',

    shortDescription:
      'Standardize numerical machine learning features using Scikit-learn.',

    problemStatement: `Standardize numerical customer features before model training.

The customer_data.csv dataset contains age and income columns.

The program must:

1. Load customer_data.csv.
2. Select age and income as numerical features.
3. Create a StandardScaler.
4. Fit the scaler using the numerical features.
5. Transform the numerical features.
6. Store the scaled values in scaled_features.
7. Store the shape of the transformed data in scaled_shape.`,

    inputFormat: `The dataset is provided as customer_data.csv.

The dataset contains numerical age and income columns.`,

    outputFormat:
      'Display the scaled numerical features and their shape.',

    constraints: [
      'Use StandardScaler from sklearn.preprocessing.',
      'Scale both age and income.',
      'Store the transformed values in scaled_features.',
      'Do not manually calculate standardized values.',
      'Store the resulting shape in scaled_shape.',
    ],

    skills: [
      'Python',
      'Scikit-learn',
      'StandardScaler',
      'Feature Scaling',
      'Data Preprocessing',
    ],

    estimatedMinutes: 15,

    defaultLanguage: 'python',

    allowedLanguages: [
      'python',
    ],

    starterCode: `import pandas as pd
from sklearn.preprocessing import StandardScaler

df = pd.read_csv("customer_data.csv")

# Select numerical features
numerical_features = df[["age", "income"]]

# Create the scaler
scaler = StandardScaler()

# Scale the numerical features
scaled_features = None

scaled_shape = None

print(scaled_features)
print("Scaled shape:", scaled_shape)
`,
  },

  /* =====================================================
     PROBLEM 6
     TRAIN TEST SPLIT
  ===================================================== */

  {
    slug: 'pml-train-test-split',

    title: 'Split Training and Test Data',

    technologySlug: 'python-machine-learning',

    difficulty: 'Medium',

    workspaceType: 'code',

    shortDescription:
      'Split machine learning features and targets into training and testing datasets.',

    problemStatement: `Prepare a dataset for model training and evaluation.

The customer_data.csv dataset contains numerical features age and income and a target column named purchased.

The program must:

1. Load customer_data.csv.
2. Store age and income in X.
3. Store purchased in y.
4. Split X and y into training and testing datasets.
5. Use 20% of the dataset for testing.
6. Use random_state=42.
7. Store the resulting datasets in X_train, X_test, y_train and y_test.
8. Store the number of training records in train_count.
9. Store the number of testing records in test_count.`,

    inputFormat: `The dataset is provided as customer_data.csv.

The dataset contains age, income and purchased columns.`,

    outputFormat:
      'Display the number of training and testing records.',

    constraints: [
      'Use train_test_split from sklearn.model_selection.',
      'Use test_size=0.2.',
      'Use random_state=42.',
      'Use age and income as features.',
      'Use purchased as the target.',
      'Do not manually split the dataset.',
    ],

    skills: [
      'Python',
      'Scikit-learn',
      'Train Test Split',
      'Model Preparation',
      'Dataset Partitioning',
    ],

    estimatedMinutes: 20,

    defaultLanguage: 'python',

    allowedLanguages: [
      'python',
    ],

    starterCode: `import pandas as pd
from sklearn.model_selection import train_test_split

df = pd.read_csv("customer_data.csv")

X = df[["age", "income"]]
y = df["purchased"]

# Split the dataset
X_train = None
X_test = None
y_train = None
y_test = None

train_count = 0
test_count = 0

print("Training records:", train_count)
print("Testing records:", test_count)
`,
  },

  /* =====================================================
     PROBLEM 7
     LINEAR REGRESSION
  ===================================================== */

  {
    slug: 'pml-linear-regression',

    title: 'Predict Customer Spending',

    technologySlug: 'python-machine-learning',

    difficulty: 'Medium',

    workspaceType: 'code',

    shortDescription:
      'Train a Linear Regression model to predict customer spending.',

    problemStatement: `Build a regression model to predict customer spending.

The customer_data.csv dataset contains age and income as input features and spending as the prediction target.

The program must:

1. Load customer_data.csv.
2. Use age and income as X.
3. Use spending as y.
4. Split the data using test_size=0.2 and random_state=42.
5. Create a LinearRegression model.
6. Train the model using the training dataset.
7. Generate predictions for X_test.
8. Store the predictions in predictions.
9. Store the model coefficient of determination on the test data in r2_score_value.`,

    inputFormat: `The dataset is provided as customer_data.csv.

The dataset contains age, income and spending columns.`,

    outputFormat:
      'Display the predicted spending values and the model R-squared score.',

    constraints: [
      'Use LinearRegression from sklearn.linear_model.',
      'Use train_test_split.',
      'Use test_size=0.2.',
      'Use random_state=42.',
      'Train the model only using the training data.',
      'Store predictions in predictions.',
      'Store the test R-squared score in r2_score_value.',
    ],

    skills: [
      'Python',
      'Scikit-learn',
      'Linear Regression',
      'Regression',
      'Model Training',
      'Prediction',
    ],

    estimatedMinutes: 25,

    defaultLanguage: 'python',

    allowedLanguages: [
      'python',
    ],

    starterCode: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

df = pd.read_csv("customer_data.csv")

X = df[["age", "income"]]
y = df["spending"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Create and train the regression model
model = None

# Generate predictions
predictions = None

# Calculate the test R-squared score
r2_score_value = 0

print("Predictions:", predictions)
print("R2 Score:", r2_score_value)
`,
  },

  /* =====================================================
     PROBLEM 8
     LOGISTIC REGRESSION
  ===================================================== */

  {
    slug: 'pml-logistic-regression',

    title: 'Predict Customer Purchase',

    technologySlug: 'python-machine-learning',

    difficulty: 'Medium',

    workspaceType: 'code',

    shortDescription:
      'Train a Logistic Regression model to predict customer purchase behavior.',

    problemStatement: `Build a classification model to predict whether a customer will make a purchase.

The customer_data.csv dataset contains age and income as features and purchased as the target.

The program must:

1. Load customer_data.csv.
2. Use age and income as X.
3. Use purchased as y.
4. Split the dataset using test_size=0.2 and random_state=42.
5. Create a LogisticRegression model.
6. Train the model using X_train and y_train.
7. Predict the target values for X_test.
8. Store the predictions in predictions.
9. Store the number of generated predictions in prediction_count.`,

    inputFormat: `The dataset is provided as customer_data.csv.

The purchased target contains classification values representing whether a customer purchased.`,

    outputFormat:
      'Display the predicted classes and the number of predictions.',

    constraints: [
      'Use LogisticRegression from sklearn.linear_model.',
      'Use train_test_split.',
      'Use test_size=0.2.',
      'Use random_state=42.',
      'Use age and income as features.',
      'Store predictions in predictions.',
      'Store the prediction count in prediction_count.',
    ],

    skills: [
      'Python',
      'Scikit-learn',
      'Logistic Regression',
      'Classification',
      'Model Training',
      'Prediction',
    ],

    estimatedMinutes: 25,

    defaultLanguage: 'python',

    allowedLanguages: [
      'python',
    ],

    starterCode: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

df = pd.read_csv("customer_data.csv")

X = df[["age", "income"]]
y = df["purchased"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Create the classification model
model = None

# Train the model
# Write your code here

# Generate predictions
predictions = None

prediction_count = 0

print("Predictions:", predictions)
print("Prediction count:", prediction_count)
`,
  },

  /* =====================================================
     PROBLEM 9
     CLASSIFICATION EVALUATION
  ===================================================== */

  {
    slug: 'pml-evaluate-classification-model',

    title: 'Evaluate Classification Model',

    technologySlug: 'python-machine-learning',

    difficulty: 'Medium',

    workspaceType: 'code',

    shortDescription:
      'Evaluate a classification model using common machine learning metrics.',

    problemStatement: `Evaluate the performance of a customer purchase classification model.

Use customer_data.csv to train a Logistic Regression model.

The program must:

1. Load customer_data.csv.
2. Use age and income as features.
3. Use purchased as the target.
4. Split the data using test_size=0.2 and random_state=42.
5. Train a LogisticRegression model.
6. Generate predictions for the test dataset.
7. Calculate accuracy.
8. Calculate precision.
9. Calculate recall.
10. Calculate F1 score.

Store the results in:

accuracy
precision
recall
f1`,

    inputFormat: `The dataset is provided as customer_data.csv.

The purchased column is the classification target.`,

    outputFormat:
      'Display accuracy, precision, recall and F1 score for the classification model.',

    constraints: [
      'Use LogisticRegression.',
      'Use train_test_split with test_size=0.2.',
      'Use random_state=42.',
      'Use sklearn.metrics for model evaluation.',
      'Do not hard-code evaluation results.',
      'Use the required variable names.',
    ],

    skills: [
      'Python',
      'Scikit-learn',
      'Classification',
      'Accuracy',
      'Precision',
      'Recall',
      'F1 Score',
      'Model Evaluation',
    ],

    estimatedMinutes: 25,

    defaultLanguage: 'python',

    allowedLanguages: [
      'python',
    ],

    starterCode: `import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
)

df = pd.read_csv("customer_data.csv")

X = df[["age", "income"]]
y = df["purchased"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

model = LogisticRegression()

# Train the model
# Write your code here

# Generate predictions
predictions = None

accuracy = 0
precision = 0
recall = 0
f1 = 0

print("Accuracy:", accuracy)
print("Precision:", precision)
print("Recall:", recall)
print("F1 Score:", f1)
`,
  },

  /* =====================================================
     PROBLEM 10
     COMPLETE MACHINE LEARNING PIPELINE
  ===================================================== */

  {
    slug: 'pml-customer-prediction-pipeline',

    title: 'Build Customer Prediction Pipeline',

    technologySlug: 'python-machine-learning',

    difficulty: 'Hard',

    workspaceType: 'code',

    shortDescription:
      'Build a complete Scikit-learn pipeline for preprocessing, training and evaluating a classification model.',

    problemStatement: `Build an end-to-end machine learning pipeline for customer purchase prediction.

The customer_data.csv dataset contains:

age
income
city
purchased

The program must:

1. Load customer_data.csv.
2. Use age, income and city as input features.
3. Use purchased as the target.
4. Split the data using test_size=0.2 and random_state=42.
5. Standardize age and income using StandardScaler.
6. One-hot encode city using OneHotEncoder.
7. Use ColumnTransformer to combine numerical and categorical preprocessing.
8. Create a Pipeline containing preprocessing and LogisticRegression.
9. Train the complete pipeline.
10. Generate predictions for X_test.
11. Calculate classification accuracy.
12. Store the predictions in predictions.
13. Store the final accuracy in accuracy.`,

    inputFormat: `The dataset is provided as customer_data.csv.

Required columns:

age
income
city
purchased`,

    outputFormat:
      'Display the predicted classes and final classification accuracy.',

    constraints: [
      'Use StandardScaler for numerical preprocessing.',
      'Use OneHotEncoder for the city feature.',
      'Use ColumnTransformer.',
      'Use sklearn.pipeline.Pipeline.',
      'Use LogisticRegression.',
      'Use test_size=0.2.',
      'Use random_state=42.',
      'The preprocessing and model must be part of the same pipeline.',
      'Do not preprocess the test dataset separately before prediction.',
      'Do not hard-code the accuracy value.',
    ],

    skills: [
      'Python',
      'Scikit-learn',
      'Machine Learning Pipeline',
      'ColumnTransformer',
      'StandardScaler',
      'OneHotEncoder',
      'Logistic Regression',
      'Model Evaluation',
    ],

    estimatedMinutes: 35,

    defaultLanguage: 'python',

    allowedLanguages: [
      'python',
    ],

    starterCode: `import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import (
    StandardScaler,
    OneHotEncoder,
)
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

df = pd.read_csv("customer_data.csv")

X = df[["age", "income", "city"]]
y = df["purchased"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

numerical_features = ["age", "income"]
categorical_features = ["city"]

# Create numerical preprocessing
numerical_transformer = None

# Create categorical preprocessing
categorical_transformer = None

# Combine preprocessing
preprocessor = None

# Create the complete machine learning pipeline
model = None

# Train the pipeline
# Write your code here

# Generate predictions
predictions = None

# Calculate accuracy
accuracy = 0

print("Predictions:", predictions)
print("Accuracy:", accuracy)
`,
  },
];

/* =========================================================
   GET PYTHON MACHINE LEARNING PROBLEM BY SLUG
========================================================= */

export function getPythonMachineLearningProblemBySlug(
  slug: string,
): PracticeProblem | undefined {
  return pythonMachineLearningProblems.find(
    (problem) => problem.slug === slug,
  );
}

/* =========================================================
   DEFAULT EXPORT
========================================================= */

export default pythonMachineLearningProblems;