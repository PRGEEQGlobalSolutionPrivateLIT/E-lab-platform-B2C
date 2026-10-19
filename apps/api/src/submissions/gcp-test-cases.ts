/* =========================================================
   GOOGLE CLOUD PLATFORM - HIDDEN TEST CASES
   Matches gcp-problems.ts exactly.
   Server-side offline Python stdin/stdout grading.
   No GCP API, credentials, SDK, or cloud connectivity.
========================================================= */

export type GcpTestCase = {
  input: string;
  expectedOutput: string;
};

/* =========================================================
   TEMPORARY IN-CODE TEST CASE DATABASE
   Preserve the lookup interface when migrating to PostgreSQL.
========================================================= */

const gcpTestCases: Record<string, GcpTestCase[]> = {
  /* GCP-VALIDATE-REGION - 10 TESTS */
  "gcp-validate-region": [
    { input: "asia-south1,us-central1,europe-west1\nasia-south1\n", expectedOutput: "VALID" },
    { input: "asia-south1,us-central1\neurope-west1\n", expectedOutput: "INVALID" },
    { input: "asia-south1, us-central1 ,europe-west1\n  us-central1  \n", expectedOutput: "VALID" },
    { input: "asia-south1,us-central1\nASIA-SOUTH1\n", expectedOutput: "INVALID" },
    { input: "asia-south1,us-central1\n\n", expectedOutput: "INVALID" },
    { input: "\nasia-south1\n", expectedOutput: "INVALID" },
    { input: " asia-south1 ,  us-central1  \nasia-south1\n", expectedOutput: "VALID" },
    { input: "asia-south1,us-central1\nasia\n", expectedOutput: "INVALID" },
    { input: "a,b,c\nc\n", expectedOutput: "VALID" },
    { input: "a,b,c\n d \n", expectedOutput: "INVALID" },
  ],

  /* GCP-CLASSIFY-SERVICE - 12 TESTS */
  "gcp-classify-service": [
    { input: "ComputeEngine\n", expectedOutput: "COMPUTE" },
    { input: "CloudRun\n", expectedOutput: "COMPUTE" },
    { input: "CloudStorage\n", expectedOutput: "STORAGE" },
    { input: "PersistentDisk\n", expectedOutput: "STORAGE" },
    { input: "CloudSQL\n", expectedOutput: "DATABASE" },
    { input: "Firestore\n", expectedOutput: "DATABASE" },
    { input: "VPC\n", expectedOutput: "NETWORK" },
    { input: "CloudLoadBalancing\n", expectedOutput: "NETWORK" },
    { input: "UnknownService\n", expectedOutput: "UNKNOWN" },
    { input: "cloudrun\n", expectedOutput: "UNKNOWN" },
    { input: "CloudStorage2\n", expectedOutput: "UNKNOWN" },
    { input: " CloudSQL \n", expectedOutput: "DATABASE" },
  ],

  /* GCP-PARSE-RESOURCE-NAME - 12 TESTS */
  "gcp-parse-resource-name": [
    { input: "projects/demo-project/zones/asia-south1-a/instances/web-1\n", expectedOutput: "demo-project\nasia-south1-a\nweb-1" },
    { input: "projects/p/zones/z/instances/i\n", expectedOutput: "p\nz\ni" },
    { input: "projects/alpha-12/zones/us-central1-f/instances/worker_1\n", expectedOutput: "alpha-12\nus-central1-f\nworker_1" },
    { input: "projects/demo-project/regions/asia-south1/instances/web-1\n", expectedOutput: "INVALID" },
    { input: "/projects/demo/zones/zone/instances/inst\n", expectedOutput: "INVALID" },
    { input: "projects/demo/zones/zone/instances/inst/\n", expectedOutput: "INVALID" },
    { input: "projects/demo/zones/zone/instances/inst/extra\n", expectedOutput: "INVALID" },
    { input: "projects//zones/zone/instances/inst\n", expectedOutput: "INVALID" },
    { input: "projects/demo/zones//instances/inst\n", expectedOutput: "INVALID" },
    { input: "projects/demo/zones/zone/instances/\n", expectedOutput: "INVALID" },
    { input: "Projects/demo/zones/zone/instances/inst\n", expectedOutput: "INVALID" },
    { input: "projects/demo/zones/zone/Instances/inst\n", expectedOutput: "INVALID" },
  ],

  /* GCP-CALCULATE-COMPUTE-COST - 9 TESTS */
  "gcp-calculate-compute-cost": [
    { input: "30 8 2\n", expectedOutput: "480" },
    { input: "30 0 2\n", expectedOutput: "0" },
    { input: "0 10 3\n", expectedOutput: "0" },
    { input: "100 1 1\n", expectedOutput: "100" },
    { input: "1 100 100\n", expectedOutput: "10000" },
    { input: "99 24 7\n", expectedOutput: "16632" },
    { input: "1000000000 1000000000 1000000000\n", expectedOutput: "1000000000000000000000000000" },
    { input: "17 31 19\n", expectedOutput: "10013" },
    { input: "5 12 0\n", expectedOutput: "0" },
  ],

  /* GCP-VALIDATE-BUCKET-NAME - 22 TESTS */
  "gcp-validate-bucket-name": [
    { input: "abc\n", expectedOutput: "VALID" },
    { input: "training-data-123\n", expectedOutput: "VALID" },
    { input: "a_b\n", expectedOutput: "VALID" },
    { input: "abc-123\n", expectedOutput: "VALID" },
    { input: "0ab\n", expectedOutput: "VALID" },
    { input: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n", expectedOutput: "VALID" },
    { input: "a-bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb9\n", expectedOutput: "VALID" },
    { input: "data_2026_archive\n", expectedOutput: "VALID" },
    { input: "x9z\n", expectedOutput: "VALID" },
    { input: "ab\n", expectedOutput: "INVALID" },
    { input: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n", expectedOutput: "INVALID" },
    { input: "Training-Data\n", expectedOutput: "INVALID" },
    { input: "-abc\n", expectedOutput: "INVALID" },
    { input: "abc-\n", expectedOutput: "INVALID" },
    { input: "_abc\n", expectedOutput: "INVALID" },
    { input: "abc_\n", expectedOutput: "INVALID" },
    { input: "a.b.c\n", expectedOutput: "INVALID" },
    { input: "192.168.1.1\n", expectedOutput: "INVALID" },
    { input: "a b\n", expectedOutput: "INVALID" },
    { input: "ábc\n", expectedOutput: "INVALID" },
    { input: "abc/def\n", expectedOutput: "INVALID" },
    { input: "\n", expectedOutput: "INVALID" },
  ],

  /* GCP-SUM-STORAGE-OBJECT-SIZES - 9 TESTS */
  "gcp-sum-storage-object-sizes": [
    { input: "4\n100 200 50 25\n", expectedOutput: "375" },
    { input: "0\n", expectedOutput: "0" },
    { input: "1\n0\n", expectedOutput: "0" },
    { input: "1\n999999999999\n", expectedOutput: "999999999999" },
    { input: "3\n1\n2\n3\n", expectedOutput: "6" },
    { input: "5\n0 0 0 0 0\n", expectedOutput: "0" },
    { input: "4\n10 20\n30 40\n", expectedOutput: "100" },
    { input: "3\n1000000000000 1000000000000 1000000000000\n", expectedOutput: "3000000000000" },
    { input: "6\n1 2 3 4 5 6\n", expectedOutput: "21" },
  ],

  /* GCP-EVALUATE-IAM-PERMISSION - 12 TESTS */
  "gcp-evaluate-iam-permission": [
    { input: "2\nviewer:storage.objects.get,storage.objects.list\neditor:storage.objects.get,storage.objects.create\nviewer\nstorage.objects.get\n", expectedOutput: "ALLOWED" },
    { input: "1\nviewer:storage.objects.get,storage.objects.list\nviewer\nstorage.objects.delete\n", expectedOutput: "DENIED" },
    { input: "0\nviewer\nstorage.objects.get\n", expectedOutput: "DENIED" },
    { input: "1\nviewer:storage.objects.get\nmissing\nstorage.objects.get\n", expectedOutput: "DENIED" },
    { input: "1\nviewer:storage.objects.get\nviewer\nStorage.Objects.Get\n", expectedOutput: "DENIED" },
    { input: "1\nviewer: storage.objects.get , storage.objects.list \nviewer\nstorage.objects.list\n", expectedOutput: "ALLOWED" },
    { input: "1\nviewer:storage.objects.get\n viewer \n storage.objects.get \n", expectedOutput: "ALLOWED" },
    { input: "1\nviewer:\nviewer\nstorage.objects.get\n", expectedOutput: "DENIED" },
    { input: "2\nreader:a,b\nwriter:c,d\nwriter\nd\n", expectedOutput: "ALLOWED" },
    { input: "2\nreader:a,b\nwriter:c,d\nreader\nd\n", expectedOutput: "DENIED" },
    { input: "1\nviewer:storage.objects.get\nViewer\nstorage.objects.get\n", expectedOutput: "DENIED" },
    { input: "1\neditor:compute.instances.start,compute.instances.stop\neditor\ncompute.instances.start\n", expectedOutput: "ALLOWED" },
  ],

  /* GCP-DETECT-OVERLAPPING-SUBNETS - 11 TESTS */
  "gcp-detect-overlapping-subnets": [
    { input: "10.0.0.0/24\n10.0.0.128/25\n", expectedOutput: "OVERLAP" },
    { input: "10.0.0.0/24\n10.0.1.0/24\n", expectedOutput: "NO_OVERLAP" },
    { input: "192.168.1.7/24\n192.168.1.128/25\n", expectedOutput: "OVERLAP" },
    { input: "0.0.0.0/0\n192.168.1.1/32\n", expectedOutput: "OVERLAP" },
    { input: "10.0.0.1/32\n10.0.0.2/32\n", expectedOutput: "NO_OVERLAP" },
    { input: "10.0.0.1/32\n10.0.0.1/32\n", expectedOutput: "OVERLAP" },
    { input: "172.16.0.0/12\n172.31.255.255/32\n", expectedOutput: "OVERLAP" },
    { input: "172.16.0.0/16\n172.17.0.0/16\n", expectedOutput: "NO_OVERLAP" },
    { input: "192.168.0.0/23\n192.168.1.0/24\n", expectedOutput: "OVERLAP" },
    { input: "192.168.0.0/24\n192.168.1.0/24\n", expectedOutput: "NO_OVERLAP" },
    { input: "255.255.255.255/32\n255.255.255.254/31\n", expectedOutput: "OVERLAP" },
  ],

  /* GCP-CALCULATE-MIG-TARGET - 10 TESTS */
  "gcp-calculate-mig-target": [
    { input: "2 12 15\n", expectedOutput: "12" },
    { input: "2 12 6\n", expectedOutput: "6" },
    { input: "2 12 1\n", expectedOutput: "2" },
    { input: "0 0 0\n", expectedOutput: "0" },
    { input: "5 5 100\n", expectedOutput: "5" },
    { input: "0 20 0\n", expectedOutput: "0" },
    { input: "0 20 21\n", expectedOutput: "20" },
    { input: "1000000000 1000000000 0\n", expectedOutput: "1000000000" },
    { input: "3 10 3\n", expectedOutput: "3" },
    { input: "3 10 10\n", expectedOutput: "10" },
  ],

  /* GCP-SIMULATE-PUBSUB-BATCHES - 10 TESTS */
  "gcp-simulate-pubsub-batches": [
    { input: "23 10\n", expectedOutput: "3" },
    { input: "0 10\n", expectedOutput: "0" },
    { input: "10 10\n", expectedOutput: "1" },
    { input: "11 10\n", expectedOutput: "2" },
    { input: "1 100\n", expectedOutput: "1" },
    { input: "100 1\n", expectedOutput: "100" },
    { input: "1000000000000000000 1\n", expectedOutput: "1000000000000000000" },
    { input: "1000000000000000000 999999999999999999\n", expectedOutput: "2" },
    { input: "1000000000000000000 1000000000000000000\n", expectedOutput: "1" },
    { input: "999999999999999999 1000000000000000000\n", expectedOutput: "1" },
  ],

};

/* =========================================================
   PUBLIC SERVER-SIDE TEST CASE LOOKUP
========================================================= */

export function getGcpTestCases(problemSlug: string): GcpTestCase[] {
  return gcpTestCases[problemSlug] ?? [];
}
