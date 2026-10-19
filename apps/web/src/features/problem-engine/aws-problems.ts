import type {
  PracticeProblem,
} from './types';

/* =========================================================
   AWS PRACTICE PROBLEMS

   Domain:
   cloud-devops

   Stack:
   aws

   Technology:
   aws

   Workspace:
   coding (Python, offline simulation)

   Notes:
   - Problems use local input/output only.
   - No AWS credentials, SDK calls, public RPC, or live cloud resources.
   - Register the `aws` runtime with the existing Python judge before enabling Run/Submit.
========================================================= */

export const awsProblems: PracticeProblem[] = [
  /* =====================================================
     PROBLEM 1
     VALIDATE AWS REGION
  ===================================================== */
  {
    slug: 'aws-validate-region',
    title: 'Validate AWS Region',
    technologySlug: 'aws',
    difficulty: 'Easy',
    workspaceType: 'coding',
    shortDescription:
      'Determine whether a region is included in a supplied list of allowed AWS regions.',
    problemStatement: `Write a Python program to validate an AWS region against a supplied allowlist.

Read the comma-separated list of allowed regions from the first line and the requested region from the second line.

Print VALID if the region appears exactly in the allowlist; otherwise print INVALID.

Region matching is case-sensitive. Do not connect to AWS.`,
    inputFormat: `Line 1: Comma-separated allowed region names.
Line 2: Requested region name.

Example:
ap-south-1,us-east-1,eu-west-1
ap-south-1`,
    outputFormat: `Print VALID or INVALID.

Example output:
VALID`,
    constraints: [
      'Use Python and standard input/output.',
      'Match region names exactly and case-sensitively.',
      'Do not use network access or AWS credentials.',
      'The allowlist is supplied as input; do not hard-code it.',
    ],
    notes: [
      'An empty requested region is invalid.',
      'Trim surrounding whitespace from each comma-separated entry.',
    ],
    skills: ['AWS', 'Regions', 'Python', 'Strings', 'Validation'],
    estimatedMinutes: 10,
    starterCode: `allowed = input().split(",")\nregion = input().strip()\n\n# Print VALID or INVALID\n`,
  },

  /* =====================================================
     PROBLEM 2
     CLASSIFY AN AWS SERVICE
  ===================================================== */
  {
    slug: 'aws-classify-service',
    title: 'Classify an AWS Service',
    technologySlug: 'aws',
    difficulty: 'Easy',
    workspaceType: 'coding',
    shortDescription:
      'Classify an AWS service name into a supplied service category.',
    problemStatement: `Write a Python program that classifies a service name using this fixed local mapping:

EC2 -> COMPUTE
Lambda -> COMPUTE
S3 -> STORAGE
EBS -> STORAGE
RDS -> DATABASE
DynamoDB -> DATABASE
VPC -> NETWORK
Route53 -> NETWORK

Read a service name and print the category. Print UNKNOWN for names not in the mapping.

Matching is case-sensitive. No AWS API is required.`,
    inputFormat: `One line containing a service name.

Example:
S3`,
    outputFormat: `Print COMPUTE, STORAGE, DATABASE, NETWORK, or UNKNOWN.

Example output:
STORAGE`,
    constraints: [
      'Use the exact mapping in the problem statement.',
      'Do not call AWS services or external APIs.',
      'Input is one string, at most 100 characters.',
    ],
    notes: [
      'The mapping is an exercise fixture, not a complete AWS service catalog.',
      'Trim surrounding whitespace from the input.',
    ],
    skills: ['AWS', 'Services', 'Python', 'Dictionaries'],
    estimatedMinutes: 10,
    starterCode: `service = input().strip()\n\n# Print the service category or UNKNOWN\n`,
  },

  /* =====================================================
     PROBLEM 3
     PARSE AN AWS ARN
  ===================================================== */
  {
    slug: 'aws-parse-arn',
    title: 'Parse an AWS ARN',
    technologySlug: 'aws',
    difficulty: 'Easy',
    workspaceType: 'coding',
    shortDescription:
      'Extract service, region and account from a locally supplied AWS ARN.',
    problemStatement: `Parse a simplified AWS ARN in the format:

arn:partition:service:region:account-id:resource

The resource portion may contain additional colons. A valid ARN must begin with arn:, have a nonempty partition and service, and contain a nonempty resource.

Print the service, region and account-id on separate lines. Empty region or account-id values are allowed.

For an invalid ARN, print INVALID.`,
    inputFormat: `One ARN string.

Example:
arn:aws:lambda:ap-south-1:123456789012:function:demo`,
    outputFormat: `For valid ARNs, print three lines: service, region, account-id.
For invalid ARNs, print INVALID.

Example output:
lambda
ap-south-1
123456789012`,
    constraints: [
      'Use at most six splits to preserve colons in the resource portion.',
      'Do not request cloud credentials or call AWS APIs.',
      'Input length does not exceed 2048 characters.',
    ],
    notes: [
      'Use split(":", 5) to separate six ARN fields.',
      'This is a simplified local validation exercise.',
    ],
    skills: ['AWS', 'ARN', 'Python', 'String Parsing'],
    estimatedMinutes: 12,
    starterCode: `arn = input().strip()\n\n# Parse the ARN and print service, region, account ID\n`,
  },

  /* =====================================================
     PROBLEM 4
     CALCULATE EC2 INSTANCE COST
  ===================================================== */
  {
    slug: 'aws-calculate-ec2-cost',
    title: 'Calculate EC2 Instance Cost',
    technologySlug: 'aws',
    difficulty: 'Easy',
    workspaceType: 'coding',
    shortDescription:
      'Calculate a simulated EC2 cost from the supplied hourly rate and hours.',
    problemStatement: `Calculate the cost of running a simulated EC2 instance.

The input supplies an hourly price in cents, a running duration in whole hours, and the number of identical instances.

Total cents = hourly price in cents × hours × instances.

Print the total as a nonnegative integer number of cents. All rates are exercise fixtures, not live AWS pricing.`,
    inputFormat: `Three nonnegative integers separated by spaces:
rate_cents hours instances

Example:
12 10 3`,
    outputFormat: `One integer: total cost in cents.

Example output:
360`,
    constraints: [
      '0 <= rate_cents, hours, instances <= 1000000000.',
      'Use integer arithmetic only.',
      'No live billing API or external pricing data.',
    ],
    notes: ['Python integers support large products without floating-point rounding.'],
    skills: ['AWS', 'EC2', 'Cost Estimation', 'Python', 'Integer Arithmetic'],
    estimatedMinutes: 10,
    starterCode: `rate_cents, hours, instances = map(int, input().split())\n\n# Calculate and print total cents\n`,
  },

  /* =====================================================
     PROBLEM 5
     VALIDATE S3 BUCKET NAME
  ===================================================== */
  {
    slug: 'aws-validate-s3-bucket-name',
    title: 'Validate an S3 Bucket Name',
    technologySlug: 'aws',
    difficulty: 'Easy',
    workspaceType: 'coding',
    shortDescription:
      'Validate a candidate bucket name using explicitly defined exercise rules.',
    problemStatement: `Validate a candidate S3 bucket name using these local exercise rules:

1. Length is between 3 and 63 characters, inclusive.
2. Only lowercase letters a-z, digits 0-9, dots and hyphens are allowed.
3. The first and last characters must be a lowercase letter or digit.
4. The name must not contain two consecutive dots (..).
5. The name must not contain .- or -.
6. The name must not look like a dotted IPv4 address with exactly four numeric components.

Print VALID if all rules pass; otherwise print INVALID.

This exercise does not implement every S3 naming restriction.`,
    inputFormat: `One line containing a candidate bucket name.

Example:
my-training-bucket`,
    outputFormat: `Print VALID or INVALID.

Example output:
VALID`,
    constraints: [
      'Apply only the six documented validation rules.',
      'Treat uppercase characters as invalid.',
      'No AWS network access or SDK calls.',
    ],
    notes: ['Additional real-world AWS naming restrictions are outside this exercise.'],
    skills: ['AWS', 'S3', 'Python', 'Regex', 'Validation'],
    estimatedMinutes: 15,
    starterCode: `name = input().strip()\n\n# Apply the six validation rules\n`,
  },

  /* =====================================================
     PROBLEM 6
     SUM S3 OBJECT SIZES
  ===================================================== */
  {
    slug: 'aws-sum-s3-object-sizes',
    title: 'Sum S3 Object Sizes',
    technologySlug: 'aws',
    difficulty: 'Easy',
    workspaceType: 'coding',
    shortDescription:
      'Calculate total storage bytes for simulated S3 objects.',
    problemStatement: `A local fixture contains object sizes measured in bytes.

Read the number of objects and their nonnegative integer sizes. Print the total number of bytes across all objects.

Do not access an actual S3 bucket.`,
    inputFormat: `Line 1: Integer N.
Line 2: N space-separated nonnegative object sizes (empty if N is zero).

Example:
4
100 250 50 600`,
    outputFormat: `One integer: total size in bytes.

Example output:
1000`,
    constraints: [
      '0 <= N <= 100000.',
      'Each size is between 0 and 10^15 bytes.',
      'Use integer arithmetic.',
    ],
    notes: ['For N = 0, print 0.'],
    skills: ['AWS', 'S3', 'Python', 'Arrays', 'Summation'],
    estimatedMinutes: 10,
    starterCode: `n = int(input())\nsizes = list(map(int, input().split())) if n else []\n\n# Print the sum of N object sizes\n`,
  },

  /* =====================================================
     PROBLEM 7
     EVALUATE IAM PERMISSION
  ===================================================== */
  {
    slug: 'aws-evaluate-iam-permission',
    title: 'Evaluate an IAM Permission',
    technologySlug: 'aws',
    difficulty: 'Medium',
    workspaceType: 'coding',
    shortDescription:
      'Decide access using simplified allow/deny statements and explicit deny precedence.',
    problemStatement: `Implement a simplified local IAM permission evaluator.

The first line contains the requested action. The second line contains N, the number of policy statements. Each of the next N lines contains EFFECT ACTION, where EFFECT is Allow or Deny.

A statement matches if its ACTION is equal to the requested action or is the wildcard *.

Decision rules:
1. Any matching Deny statement produces DENIED.
2. Otherwise, at least one matching Allow produces ALLOWED.
3. Otherwise the result is DENIED (implicit deny).

Print the final decision. Conditions, resources and other IAM features are out of scope.`,
    inputFormat: `Line 1: Requested action.
Line 2: N.
Next N lines: EFFECT ACTION.

Example:
s3:GetObject
3
Allow s3:GetObject
Allow ec2:StartInstances
Deny s3:DeleteObject`,
    outputFormat: `Print ALLOWED or DENIED.

Example output:
ALLOWED`,
    constraints: [
      '0 <= N <= 100000.',
      'Effects are exactly Allow or Deny.',
      'Actions match case-sensitively; * matches all actions.',
      'Explicit Deny always overrides Allow.',
      'No actual IAM requests are made.',
    ],
    notes: ['This is a deliberately simplified authorization model.'],
    skills: ['AWS', 'IAM', 'Python', 'Policy Evaluation', 'Authorization'],
    estimatedMinutes: 20,
    starterCode: `action = input().strip()\nn = int(input())\n\n# Read policies and print ALLOWED or DENIED\n`,
  },

  /* =====================================================
     PROBLEM 8
     FIND OVERLAPPING VPC SUBNETS
  ===================================================== */
  {
    slug: 'aws-detect-overlapping-subnets',
    title: 'Detect Overlapping VPC Subnets',
    technologySlug: 'aws',
    difficulty: 'Medium',
    workspaceType: 'coding',
    shortDescription:
      'Determine whether two provided IPv4 CIDR subnets overlap.',
    problemStatement: `Read two valid IPv4 CIDR network strings and decide whether their address ranges overlap.

Use Python's built-in ipaddress module.

Print OVERLAP if the ranges share at least one IP address, otherwise print DISJOINT.

The inputs represent local VPC planning fixtures only.`,
    inputFormat: `Line 1: First IPv4 CIDR.
Line 2: Second IPv4 CIDR.

Example:
10.0.0.0/16
10.0.1.0/24`,
    outputFormat: `Print OVERLAP or DISJOINT.

Example output:
OVERLAP`,
    constraints: [
      'Both inputs are valid IPv4 CIDR networks.',
      'Host bits may be set; use strict=False.',
      'Do not connect to a real VPC.',
    ],
    notes: ['ipaddress.ip_network(..., strict=False) normalizes host addresses.'],
    skills: ['AWS', 'VPC', 'CIDR', 'Python', 'IP Addressing'],
    estimatedMinutes: 18,
    starterCode: `import ipaddress\n\nfirst = input().strip()\nsecond = input().strip()\n\n# Print OVERLAP or DISJOINT\n`,
  },

  /* =====================================================
     PROBLEM 9
     COMPUTE AUTO SCALING TARGET
  ===================================================== */
  {
    slug: 'aws-calculate-autoscaling-target',
    title: 'Calculate Auto Scaling Target',
    technologySlug: 'aws',
    difficulty: 'Medium',
    workspaceType: 'coding',
    shortDescription:
      'Clamp a requested compute capacity between minimum and maximum limits.',
    problemStatement: `Simulate a simple Auto Scaling capacity rule.

Read minimum capacity, maximum capacity, and desired capacity.

The final capacity is the desired value clamped into the inclusive range [minimum, maximum].

Print the final instance count. This is a simplified offline scaling exercise.`,
    inputFormat: `One line: min_capacity max_capacity desired_capacity.

Example:
2 8 12`,
    outputFormat: `One integer: the clamped capacity.

Example output:
8`,
    constraints: [
      '0 <= min_capacity <= max_capacity <= 1000000.',
      '0 <= desired_capacity <= 1000000.',
      'Use integer arithmetic.',
      'No AWS Auto Scaling API access.',
    ],
    notes: ['The clamp formula is min(max(desired, minimum), maximum).'],
    skills: ['AWS', 'EC2 Auto Scaling', 'Python', 'Boundary Conditions'],
    estimatedMinutes: 12,
    starterCode: `minimum, maximum, desired = map(int, input().split())\n\n# Print the final capacity\n`,
  },

  /* =====================================================
     PROBLEM 10
     SIMULATE SQS PROCESSING
  ===================================================== */
  {
    slug: 'aws-simulate-sqs-batches',
    title: 'Simulate SQS Message Batches',
    technologySlug: 'aws',
    difficulty: 'Medium',
    workspaceType: 'coding',
    shortDescription:
      'Calculate the number of batches needed to process a local queue of messages.',
    problemStatement: `Simulate processing N messages from a local queue in batches of at most B messages.

Each batch consumes up to B messages. Print the number of batches needed to process all messages.

If N = 0, the answer is 0.

No live SQS service is used.`,
    inputFormat: `One line containing two integers:
N B

Example:
23 10`,
    outputFormat: `One integer: number of batches.

Example output:
3`,
    constraints: [
      '0 <= N <= 10^18.',
      '1 <= B <= 10^9.',
      'Use integer arithmetic without floating point.',
      'Do not call AWS APIs.',
    ],
    notes: ['The result is ceiling(N / B), computed using integers.'],
    skills: ['AWS', 'SQS', 'Python', 'Queues', 'Ceiling Division'],
    estimatedMinutes: 15,
    starterCode: `messages, batch_size = map(int, input().split())\n\n# Print the number of batches\n`,
  },
];

/* =========================================================
   GET AWS PROBLEM BY SLUG
========================================================= */

export function getAwsProblemBySlug(
  slug: string,
): PracticeProblem | undefined {
  return awsProblems.find(
    (problem) =>
      problem.slug === slug,
  );
}

/* =========================================================
   DEFAULT EXPORT
========================================================= */

export default awsProblems;
