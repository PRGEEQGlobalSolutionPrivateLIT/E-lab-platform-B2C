/* =========================================================
   MICROSOFT AZURE HIDDEN TEST CASES
   For SubmissionsService, same interface as cpp-test-cases.ts.
   Exercise input/output matches azure-problems.ts.
   Offline Python; no Azure SDK, credentials, or network.
   Keep this module server-side only.
========================================================= */

export type AzureTestCase = {
  input: string;
  expectedOutput: string;
};

/* =========================================================
   TEMPORARY IN-CODE TEST CASE DATABASE
   Migrate to PostgreSQL later without changing the lookup API.
========================================================= */

const azureTestCases: Record<string, AzureTestCase[]> = {

  /* AZURE-VALIDATE-REGION */
  "azure-validate-region": [
    {
      input: "centralindia,eastus,westeurope\ncentralindia\n",
      expectedOutput: "VALID",
    },
    {
      input: "centralindia,eastus\nwesteurope\n",
      expectedOutput: "INVALID",
    },
    {
      input: "centralindia,eastus\nCentralIndia\n",
      expectedOutput: "INVALID",
    },
    {
      input: "centralindia, eastus , westeurope\neastus\n",
      expectedOutput: "VALID",
    },
    {
      input: "centralindia,eastus\n\n",
      expectedOutput: "INVALID",
    },
    {
      input: "\ncentralindia\n",
      expectedOutput: "INVALID",
    },
    {
      input: "eastus,westeurope,centralindia\ncentralindia\n",
      expectedOutput: "VALID",
    },
    {
      input: "centralindia,eastus\ncentral\n",
      expectedOutput: "INVALID",
    },
  ],

  /* AZURE-CLASSIFY-SERVICE */
  "azure-classify-service": [
    {
      input: "VirtualMachines",
      expectedOutput: "COMPUTE",
    },
    {
      input: "Functions",
      expectedOutput: "COMPUTE",
    },
    {
      input: "BlobStorage",
      expectedOutput: "STORAGE",
    },
    {
      input: "ManagedDisks",
      expectedOutput: "STORAGE",
    },
    {
      input: "AzureSQL",
      expectedOutput: "DATABASE",
    },
    {
      input: "CosmosDB",
      expectedOutput: "DATABASE",
    },
    {
      input: "VirtualNetwork",
      expectedOutput: "NETWORK",
    },
    {
      input: "LoadBalancer",
      expectedOutput: "NETWORK",
    },
    {
      input: "UnknownService",
      expectedOutput: "UNKNOWN",
    },
    {
      input: "virtualmachines",
      expectedOutput: "UNKNOWN",
    },
    {
      input: "BlobStorageExtra",
      expectedOutput: "UNKNOWN",
    },
  ],

  /* AZURE-PARSE-RESOURCE-ID */
  "azure-parse-resource-id": [
    {
      input: "/subscriptions/s1/resourceGroups/rg1/providers/Microsoft.Compute/virtualMachines/vm1\n",
      expectedOutput: "s1\nrg1\nMicrosoft.Compute\nvirtualMachines\nvm1",
    },
    {
      input: "/subscriptions/sub-123/resourceGroups/team/providers/Microsoft.Storage/storageAccounts/store1\n",
      expectedOutput: "sub-123\nteam\nMicrosoft.Storage\nstorageAccounts\nstore1",
    },
    {
      input: "/subscriptions/s1/resourceGroups/rg1\n",
      expectedOutput: "INVALID",
    },
    {
      input: "subscriptions/s1/resourceGroups/rg1/providers/Microsoft.Compute/virtualMachines/vm1\n",
      expectedOutput: "INVALID",
    },
    {
      input: "/subscriptions//resourceGroups/rg1/providers/Microsoft.Compute/virtualMachines/vm1\n",
      expectedOutput: "INVALID",
    },
    {
      input: "/Subscriptions/s1/resourceGroups/rg1/providers/Microsoft.Compute/virtualMachines/vm1\n",
      expectedOutput: "INVALID",
    },
    {
      input: "/subscriptions/s1/resourceGroups/rg1/providers/Microsoft.Compute/virtualMachines/vm1/child\n",
      expectedOutput: "INVALID",
    },
    {
      input: "/subscriptions/s1/resourceGroups/rg1/providers/Microsoft.Compute/virtualMachines/\n",
      expectedOutput: "INVALID",
    },
    {
      input: "/subscriptions/s1/resourcegroups/rg1/providers/Microsoft.Compute/virtualMachines/vm1\n",
      expectedOutput: "INVALID",
    },
  ],

  /* AZURE-CALCULATE-VM-COST */
  "azure-calculate-vm-cost": [
    {
      input: "25 8 3\n",
      expectedOutput: "600",
    },
    {
      input: "25 0 3\n",
      expectedOutput: "0",
    },
    {
      input: "0 100 5\n",
      expectedOutput: "0",
    },
    {
      input: "1 1 1\n",
      expectedOutput: "1",
    },
    {
      input: "123 24 2\n",
      expectedOutput: "5904",
    },
    {
      input: "1000000000 1000000000 1000000000\n",
      expectedOutput: "1000000000000000000000000000",
    },
    {
      input: "57 7 0\n",
      expectedOutput: "0",
    },
    {
      input: "999 2 3\n",
      expectedOutput: "5994",
    },
  ],

  /* AZURE-VALIDATE-STORAGE-ACCOUNT */
  "azure-validate-storage-account": [
    {
      input: "storageacct2026\n",
      expectedOutput: "VALID",
    },
    {
      input: "my-storage\n",
      expectedOutput: "INVALID",
    },
    {
      input: "ab\n",
      expectedOutput: "INVALID",
    },
    {
      input: "abc\n",
      expectedOutput: "VALID",
    },
    {
      input: "aaaaaaaaaaaaaaaaaaaaaaaa\n",
      expectedOutput: "VALID",
    },
    {
      input: "aaaaaaaaaaaaaaaaaaaaaaaaa\n",
      expectedOutput: "INVALID",
    },
    {
      input: "Myaccount\n",
      expectedOutput: "INVALID",
    },
    {
      input: "storage_acc\n",
      expectedOutput: "INVALID",
    },
    {
      input: "storage.acc\n",
      expectedOutput: "INVALID",
    },
    {
      input: "abc123\n",
      expectedOutput: "VALID",
    },
    {
      input: "123\n",
      expectedOutput: "VALID",
    },
    {
      input: "abc def\n",
      expectedOutput: "INVALID",
    },
    {
      input: "ábc\n",
      expectedOutput: "INVALID",
    },
    {
      input: "ABC\n",
      expectedOutput: "INVALID",
    },
  ],

  /* AZURE-SUM-BLOB-SIZES */
  "azure-sum-blob-sizes": [
    {
      input: "4\n100 250 50 600\n",
      expectedOutput: "1000",
    },
    {
      input: "0\n\n",
      expectedOutput: "0",
    },
    {
      input: "1\n999\n",
      expectedOutput: "999",
    },
    {
      input: "3\n0 0 0\n",
      expectedOutput: "0",
    },
    {
      input: "4\n1000000000000000 1000000000000000 1000000000000000 1000000000000000\n",
      expectedOutput: "4000000000000000",
    },
    {
      input: "5\n1 2 3 4 5\n",
      expectedOutput: "15",
    },
    {
      input: "2\n10 1\n",
      expectedOutput: "11",
    },
    {
      input: "1\n0\n",
      expectedOutput: "0",
    },
  ],

  /* AZURE-EVALUATE-RBAC */
  "azure-evaluate-rbac": [
    {
      input: "Microsoft.Storage/storageAccounts/read\n2\nALLOW Microsoft.Storage/storageAccounts/read\nALLOW Microsoft.Compute/virtualMachines/read\n",
      expectedOutput: "ALLOWED",
    },
    {
      input: "read\n2\nALLOW read\nEXCLUDE read\n",
      expectedOutput: "DENIED",
    },
    {
      input: "read\n0\n",
      expectedOutput: "DENIED",
    },
    {
      input: "read\n1\nALLOW *\n",
      expectedOutput: "ALLOWED",
    },
    {
      input: "read\n2\nALLOW *\nEXCLUDE *\n",
      expectedOutput: "DENIED",
    },
    {
      input: "read\n1\nALLOW write\n",
      expectedOutput: "DENIED",
    },
    {
      input: "read\n2\nEXCLUDE write\nALLOW read\n",
      expectedOutput: "ALLOWED",
    },
    {
      input: "read\n1\nALLOW READ\n",
      expectedOutput: "DENIED",
    },
    {
      input: "delete\n3\nALLOW delete\nALLOW *\nEXCLUDE delete\n",
      expectedOutput: "DENIED",
    },
    {
      input: "read\n1\nEXCLUDE read\n",
      expectedOutput: "DENIED",
    },
  ],

  /* AZURE-DETECT-OVERLAPPING-SUBNETS */
  "azure-detect-overlapping-subnets": [
    {
      input: "10.1.0.0/16\n10.1.2.0/24\n",
      expectedOutput: "OVERLAP",
    },
    {
      input: "10.1.0.0/16\n10.2.0.0/16\n",
      expectedOutput: "DISJOINT",
    },
    {
      input: "192.168.1.10/24\n192.168.1.200/25\n",
      expectedOutput: "OVERLAP",
    },
    {
      input: "0.0.0.0/0\n203.0.113.0/24\n",
      expectedOutput: "OVERLAP",
    },
    {
      input: "10.0.0.0/25\n10.0.0.128/25\n",
      expectedOutput: "DISJOINT",
    },
    {
      input: "10.0.0.1/32\n10.0.0.1/32\n",
      expectedOutput: "OVERLAP",
    },
    {
      input: "10.0.0.1/32\n10.0.0.2/32\n",
      expectedOutput: "DISJOINT",
    },
    {
      input: "172.16.0.0/12\n172.31.255.255/32\n",
      expectedOutput: "OVERLAP",
    },
  ],

  /* AZURE-CALCULATE-SCALE-TARGET */
  "azure-calculate-scale-target": [
    {
      input: "2 10 14\n",
      expectedOutput: "10",
    },
    {
      input: "2 10 6\n",
      expectedOutput: "6",
    },
    {
      input: "2 10 1\n",
      expectedOutput: "2",
    },
    {
      input: "0 0 0\n",
      expectedOutput: "0",
    },
    {
      input: "5 5 5\n",
      expectedOutput: "5",
    },
    {
      input: "0 100 100\n",
      expectedOutput: "100",
    },
    {
      input: "1 1000000000 1000000000\n",
      expectedOutput: "1000000000",
    },
    {
      input: "5 6 0\n",
      expectedOutput: "5",
    },
  ],

  /* AZURE-SIMULATE-QUEUE-BATCHES */
  "azure-simulate-queue-batches": [
    {
      input: "23 10\n",
      expectedOutput: "3",
    },
    {
      input: "0 10\n",
      expectedOutput: "0",
    },
    {
      input: "10 10\n",
      expectedOutput: "1",
    },
    {
      input: "11 10\n",
      expectedOutput: "2",
    },
    {
      input: "1 100\n",
      expectedOutput: "1",
    },
    {
      input: "1000000000000000000 1\n",
      expectedOutput: "1000000000000000000",
    },
    {
      input: "1000000000000000000 999999999999999999\n",
      expectedOutput: "2",
    },
    {
      input: "99 1\n",
      expectedOutput: "99",
    },
  ],
};

/* =========================================================
   GET AZURE HIDDEN TEST CASES
========================================================= */

export function getAzureTestCases(problemSlug: string): AzureTestCase[] {
  return azureTestCases[problemSlug] ?? [];
}
