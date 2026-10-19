/* =========================================================
   AWS HIDDEN TEST CASES
========================================================= */

export type AwsTestCase = {
  input: string;

  expectedOutput: string;
};

/* =========================================================
   TEST CASE DATABASE

   Temporary in-code tests.

   Later these will move to PostgreSQL.
   Input is sent to the existing offline Python Docker judge.
========================================================= */

const awsTestCases: Record<string, AwsTestCase[]> = {
  /* =======================================================
     VALIDATE AWS REGION
  ======================================================= */
  'aws-validate-region': [
    { input: 'ap-south-1,us-east-1,eu-west-1\nap-south-1\n', expectedOutput: 'VALID' },
    { input: 'ap-south-1,us-east-1\neu-west-1\n', expectedOutput: 'INVALID' },
    { input: 'ap-south-1,us-east-1\nAP-SOUTH-1\n', expectedOutput: 'INVALID' },
    { input: 'ap-south-1, us-east-1 ,eu-west-1\nus-east-1\n', expectedOutput: 'VALID' },
    { input: 'ap-south-1,us-east-1\n\n', expectedOutput: 'INVALID' },
    { input: '\nap-south-1\n', expectedOutput: 'INVALID' },
    { input: 'us-east-1,eu-west-1,ap-south-1\nap-south-1\n', expectedOutput: 'VALID' },
    { input: 'ap-south-1,us-east-1\nap-south-10\n', expectedOutput: 'INVALID' },
  ],

  /* =======================================================
     CLASSIFY AWS SERVICE
  ======================================================= */
  'aws-classify-service': [
    { input: 'EC2\n', expectedOutput: 'COMPUTE' },
    { input: 'Lambda\n', expectedOutput: 'COMPUTE' },
    { input: 'S3\n', expectedOutput: 'STORAGE' },
    { input: 'EBS\n', expectedOutput: 'STORAGE' },
    { input: 'RDS\n', expectedOutput: 'DATABASE' },
    { input: 'DynamoDB\n', expectedOutput: 'DATABASE' },
    { input: 'VPC\n', expectedOutput: 'NETWORK' },
    { input: 'Route53\n', expectedOutput: 'NETWORK' },
    { input: 'ec2\n', expectedOutput: 'UNKNOWN' },
    { input: '  S3  \n', expectedOutput: 'STORAGE' },
    { input: 'CloudWatch\n', expectedOutput: 'UNKNOWN' },
  ],

  /* =======================================================
     PARSE AWS ARN
  ======================================================= */
  'aws-parse-arn': [
    { input: 'arn:aws:lambda:ap-south-1:123456789012:function:demo\n', expectedOutput: 'lambda\nap-south-1\n123456789012' },
    { input: 'arn:aws:s3:::my-bucket\n', expectedOutput: 's3\n\n' },
    { input: 'arn:aws:iam::123456789012:role/MyRole\n', expectedOutput: 'iam\n\n123456789012' },
    { input: 'arn:aws:ec2:us-east-1:123456789012:instance/i-123\n', expectedOutput: 'ec2\nus-east-1\n123456789012' },
    { input: 'invalid:aws:s3:::bucket\n', expectedOutput: 'INVALID' },
    { input: 'arn::s3:::bucket\n', expectedOutput: 'INVALID' },
    { input: 'arn:aws::us-east-1:123:resource\n', expectedOutput: 'INVALID' },
    { input: 'arn:aws:s3::: \n', expectedOutput: 'INVALID' },
    { input: 'arn:aws:logs:us-west-2:123456789012:log-group:my-group:stream\n', expectedOutput: 'logs\nus-west-2\n123456789012' },
  ],

  /* =======================================================
     CALCULATE EC2 INSTANCE COST
  ======================================================= */
  'aws-calculate-ec2-cost': [
    { input: '12 10 3\n', expectedOutput: '360' },
    { input: '0 999 5\n', expectedOutput: '0' },
    { input: '25 0 5\n', expectedOutput: '0' },
    { input: '7 24 1\n', expectedOutput: '168' },
    { input: '1000000000 1000000000 1000000000\n', expectedOutput: '1000000000000000000000000000' },
    { input: '19 3 4\n', expectedOutput: '228' },
  ],

  /* =======================================================
     VALIDATE S3 BUCKET NAME
  ======================================================= */
  'aws-validate-s3-bucket-name': [
    { input: 'my-training-bucket\n', expectedOutput: 'VALID' },
    { input: 'abc\n', expectedOutput: 'VALID' },
    { input: 'ab\n', expectedOutput: 'INVALID' },
    { input: 'MyBucket\n', expectedOutput: 'INVALID' },
    { input: '-bucket\n', expectedOutput: 'INVALID' },
    { input: 'bucket-\n', expectedOutput: 'INVALID' },
    { input: 'my..bucket\n', expectedOutput: 'INVALID' },
    { input: 'my.-bucket\n', expectedOutput: 'INVALID' },
    { input: 'my-.bucket\n', expectedOutput: 'INVALID' },
    { input: '192.168.1.1\n', expectedOutput: 'INVALID' },
    { input: 'my_bucket\n', expectedOutput: 'INVALID' },
    { input: 'a.b-c.123\n', expectedOutput: 'VALID' },
    { input: 'a'.repeat(63) + '\n', expectedOutput: 'VALID' },
    { input: 'a'.repeat(64) + '\n', expectedOutput: 'INVALID' },
  ],

  /* =======================================================
     SUM S3 OBJECT SIZES
  ======================================================= */
  'aws-sum-s3-object-sizes': [
    { input: '4\n100 250 50 600\n', expectedOutput: '1000' },
    { input: '0\n\n', expectedOutput: '0' },
    { input: '1\n42\n', expectedOutput: '42' },
    { input: '3\n0 0 0\n', expectedOutput: '0' },
    { input: '3\n1000000000000000 1000000000000000 1000000000000000\n', expectedOutput: '3000000000000000' },
    { input: '5\n1 2 3 4 5\n', expectedOutput: '15' },
  ],

  /* =======================================================
     EVALUATE IAM PERMISSION
  ======================================================= */
  'aws-evaluate-iam-permission': [
    { input: 's3:GetObject\n3\nAllow s3:GetObject\nAllow ec2:StartInstances\nDeny s3:DeleteObject\n', expectedOutput: 'ALLOWED' },
    { input: 's3:GetObject\n2\nAllow s3:GetObject\nDeny s3:GetObject\n', expectedOutput: 'DENIED' },
    { input: 'ec2:StartInstances\n1\nAllow *\n', expectedOutput: 'ALLOWED' },
    { input: 'ec2:StartInstances\n2\nAllow *\nDeny *\n', expectedOutput: 'DENIED' },
    { input: 's3:PutObject\n0\n', expectedOutput: 'DENIED' },
    { input: 's3:GetObject\n1\nAllow s3:PutObject\n', expectedOutput: 'DENIED' },
    { input: 's3:GetObject\n1\nAllow s3:getobject\n', expectedOutput: 'DENIED' },
  ],

  /* =======================================================
     DETECT OVERLAPPING VPC SUBNETS
  ======================================================= */
  'aws-detect-overlapping-subnets': [
    { input: '10.0.0.0/16\n10.0.1.0/24\n', expectedOutput: 'OVERLAP' },
    { input: '10.0.0.0/24\n10.0.1.0/24\n', expectedOutput: 'DISJOINT' },
    { input: '192.168.1.0/24\n192.168.1.0/24\n', expectedOutput: 'OVERLAP' },
    { input: '10.0.1.25/16\n10.0.200.2/24\n', expectedOutput: 'OVERLAP' },
    { input: '172.16.0.0/12\n192.168.0.0/16\n', expectedOutput: 'DISJOINT' },
    { input: '0.0.0.0/0\n203.0.113.0/24\n', expectedOutput: 'OVERLAP' },
  ],

  /* =======================================================
     CALCULATE AUTO SCALING TARGET
  ======================================================= */
  'aws-calculate-autoscaling-target': [
    { input: '2 8 12\n', expectedOutput: '8' },
    { input: '2 8 1\n', expectedOutput: '2' },
    { input: '2 8 6\n', expectedOutput: '6' },
    { input: '0 0 0\n', expectedOutput: '0' },
    { input: '5 5 2\n', expectedOutput: '5' },
    { input: '5 5 9\n', expectedOutput: '5' },
    { input: '0 1000000 1000000\n', expectedOutput: '1000000' },
  ],

  /* =======================================================
     SIMULATE SQS MESSAGE BATCHES
  ======================================================= */
  'aws-simulate-sqs-batches': [
    { input: '23 10\n', expectedOutput: '3' },
    { input: '0 10\n', expectedOutput: '0' },
    { input: '10 10\n', expectedOutput: '1' },
    { input: '11 10\n', expectedOutput: '2' },
    { input: '100 1\n', expectedOutput: '100' },
    { input: '1000000000000000000 1000000000\n', expectedOutput: '1000000000' },
    { input: '1 1000000000\n', expectedOutput: '1' },
  ],
};

/* =========================================================
   GET AWS TEST CASES
========================================================= */

export function getAwsTestCases(
  problemSlug: string,
): AwsTestCase[] {
  return awsTestCases[problemSlug] ?? [];
}
