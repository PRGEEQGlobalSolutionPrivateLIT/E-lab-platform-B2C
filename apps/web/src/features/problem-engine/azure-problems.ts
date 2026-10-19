import type { PracticeProblem } from './types';

/* =========================================================
   MICROSOFT AZURE PRACTICE PROBLEMS

   Technology: azure
   Workspace: code
   Language: python

   Offline stdin/stdout simulations. No Azure subscriptions,
   credentials, SDK, CLI, network access, or live pricing.
   Uses existing elab-judge-python:latest.
========================================================= */

export const azureProblems: PracticeProblem[] = [
  /* 1. VALIDATE AZURE REGION */
  {
    slug: 'azure-validate-region',
    title: 'Validate Azure Region',
    technologySlug: 'azure',
    difficulty: 'Easy',
    workspaceType: 'code',
    defaultLanguage: 'python',
    shortDescription: 'Check a requested Azure region against an input allowlist.',
    problemStatement: `Read a comma-separated allowlist of Azure region identifiers and a requested region. Print VALID if the requested region appears in the allowlist, otherwise print INVALID.\n\nStrip surrounding whitespace from each allowlist entry and the requested value. Comparison is case-sensitive. An empty requested region is INVALID. Use only the supplied allowlist, not a hard-coded cloud region catalog.`,
    inputFormat: `Line 1: Comma-separated Azure regions.\nLine 2: Requested region.\n\nExample:\ncentralindia,eastus,westeurope\ncentralindia`,
    outputFormat: `VALID or INVALID.\n\nExample output:\nVALID`,
    constraints: ['Read both lines from stdin.', 'Comparison is case-sensitive.', 'Trim surrounding whitespace.', 'No Azure API or network access.'],
    notes: ['Region strings are exercise inputs, not a live list of Azure regions.'],
    skills: ['Azure', 'Regions', 'Python', 'Strings', 'Validation'],
    estimatedMinutes: 10,
    sampleTests: [
      { id: 'azure-region-sample-1', title: 'Allowed region', input: 'centralindia,eastus,westeurope\ncentralindia\n', expectedOutput: 'VALID' },
      { id: 'azure-region-sample-2', title: 'Region not allowed', input: 'centralindia,eastus\nwesteurope\n', expectedOutput: 'INVALID' },
    ],
    starterCode: `allowed_regions = input().split(',')\nrequested_region = input()\n\n# Check the requested region and print VALID or INVALID\n`,
  },
  /* 2. CLASSIFY AZURE SERVICE */
  {
    slug: 'azure-classify-service',
    title: 'Classify Azure Service',
    technologySlug: 'azure',
    difficulty: 'Easy',
    workspaceType: 'code',
    defaultLanguage: 'python',
    shortDescription: 'Map an Azure service name to its exercise category.',
    problemStatement: `Read an Azure service name and print its category using only this predefined exercise mapping:\n\nVirtualMachines -> COMPUTE\nFunctions -> COMPUTE\nBlobStorage -> STORAGE\nManagedDisks -> STORAGE\nAzureSQL -> DATABASE\nCosmosDB -> DATABASE\nVirtualNetwork -> NETWORK\nLoadBalancer -> NETWORK\n\nFor any other name, print UNKNOWN. Matching is case-sensitive.`,
    inputFormat: `One service name.\n\nExample:\nBlobStorage`,
    outputFormat: `COMPUTE, STORAGE, DATABASE, NETWORK, or UNKNOWN.\n\nExample output:\nSTORAGE`,
    constraints: ['Use the exact mapping provided.', 'Read one line.', 'Case-sensitive matching.', 'No Azure API.'],
    notes: ['Names are simplified exercise labels, not resource type identifiers.'],
    skills: ['Azure', 'Services', 'Python', 'Dictionaries'],
    estimatedMinutes: 10,
    sampleTests: [
      { id: 'azure-service-sample-1', title: 'Known service', input: 'BlobStorage\n', expectedOutput: 'STORAGE' },
      { id: 'azure-service-sample-2', title: 'Unknown service', input: 'UnknownService\n', expectedOutput: 'UNKNOWN' },
    ],
    starterCode: `service = input().strip()\n\n# Print service category or UNKNOWN\n`,
  },
  /* 3. PARSE AZURE RESOURCE ID */
  {
    slug: 'azure-parse-resource-id',
    title: 'Parse Azure Resource ID',
    technologySlug: 'azure',
    difficulty: 'Easy',
    workspaceType: 'code',
    defaultLanguage: 'python',
    shortDescription: 'Extract subscription, resource group, provider, type, and name.',
    problemStatement: `Parse a simplified Azure resource identifier in this exact structure:\n\n/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/{namespace}/{resourceType}/{resourceName}\n\nTreat literal marker segments (subscriptions, resourceGroups, providers) case-sensitively. All five variable segments must be nonempty. Extra segments or a missing leading slash make the input invalid.\n\nFor valid input, print the subscription ID, resource group, provider namespace, resource type, and resource name on five separate lines. Otherwise print INVALID. This exercise handles only a single resource level.`,
    inputFormat: `One resource ID.\n\nExample:\n/subscriptions/sub-01/resourceGroups/rg-demo/providers/Microsoft.Compute/virtualMachines/vm01`,
    outputFormat: `Five lines for a valid resource ID or INVALID.\n\nExample output:\nsub-01\nrg-demo\nMicrosoft.Compute\nvirtualMachines\nvm01`,
    constraints: ['Use local string parsing.', 'No nested resource types in this exercise.', 'No Azure SDK/CLI/network access.'],
    notes: ['This is a simplified Resource Manager ID grammar.'],
    skills: ['Azure', 'ARM', 'Resource IDs', 'Python', 'Parsing'],
    estimatedMinutes: 14,
    sampleTests: [
      { id: 'azure-id-sample-1', title: 'Valid VM ID', input: '/subscriptions/sub-01/resourceGroups/rg-demo/providers/Microsoft.Compute/virtualMachines/vm01\n', expectedOutput: 'sub-01\nrg-demo\nMicrosoft.Compute\nvirtualMachines\nvm01' },
      { id: 'azure-id-sample-2', title: 'Invalid resource ID', input: '/subscriptions/sub-01/resourceGroups/rg-demo\n', expectedOutput: 'INVALID' },
    ],
    starterCode: `resource_id = input().strip()\n\n# Parse the simplified resource ID or print INVALID\n`,
  },
  /* 4. CALCULATE AZURE VM COST */
  {
    slug: 'azure-calculate-vm-cost',
    title: 'Calculate Azure VM Cost',
    technologySlug: 'azure',
    difficulty: 'Easy',
    workspaceType: 'code',
    defaultLanguage: 'python',
    shortDescription: 'Calculate simulated VM usage charges using integer cents.',
    problemStatement: `The input contains three nonnegative integers: hourly_rate_cents, running_hours, and vm_count.\n\nCalculate total_cost_cents = hourly_rate_cents * running_hours * vm_count.\n\nPrint the result as an integer. All rates are supplied by the exercise, not fetched from Azure.`,
    inputFormat: `One line: hourly_rate_cents running_hours vm_count.\n\nExample:\n25 8 3`,
    outputFormat: `One nonnegative integer.\n\nExample output:\n600`,
    constraints: ['0 <= each integer <= 10^9.', 'Use integer arithmetic.', 'No pricing API or live resources.'],
    notes: ['Ignore taxes, discounts, storage, and bandwidth for this exercise.'],
    skills: ['Azure', 'Virtual Machines', 'Costs', 'Python', 'Arithmetic'],
    estimatedMinutes: 10,
    sampleTests: [
      { id: 'azure-vm-cost-sample-1', title: 'Three VMs', input: '25 8 3\n', expectedOutput: '600' },
      { id: 'azure-vm-cost-sample-2', title: 'Zero hours', input: '25 0 3\n', expectedOutput: '0' },
    ],
    starterCode: `rate_cents, hours, vm_count = map(int, input().split())\n\n# Print total cost in cents\n`,
  },
  /* 5. VALIDATE STORAGE ACCOUNT NAME */
  {
    slug: 'azure-validate-storage-account',
    title: 'Validate Azure Storage Account Name',
    technologySlug: 'azure',
    difficulty: 'Easy',
    workspaceType: 'code',
    defaultLanguage: 'python',
    shortDescription: 'Validate the character and length rules for storage account names.',
    problemStatement: `Validate an Azure Storage Account name using these rules:\n1. Length must be between 3 and 24 characters inclusive.\n2. Every character must be a lowercase ASCII letter a-z or digit 0-9.\n\nPrint VALID if both rules hold; otherwise print INVALID. Uniqueness and other provisioning checks are out of scope.`,
    inputFormat: `One candidate name.\n\nExample:\nstorageacct2026`,
    outputFormat: `VALID or INVALID.\n\nExample output:\nVALID`,
    constraints: ['Validate 3 to 24 characters.', 'Allow only a-z and 0-9.', 'Reject uppercase, spaces, hyphens, underscores, and dots.', 'No Azure connectivity.'],
    notes: ['Name availability is not checked.'],
    skills: ['Azure', 'Storage Accounts', 'Python', 'Validation'],
    estimatedMinutes: 12,
    sampleTests: [
      { id: 'azure-storage-name-sample-1', title: 'Valid name', input: 'storageacct2026\n', expectedOutput: 'VALID' },
      { id: 'azure-storage-name-sample-2', title: 'Hyphen invalid', input: 'my-storage\n', expectedOutput: 'INVALID' },
    ],
    starterCode: `name = input().strip()\n\n# Validate length and allowed ASCII characters\n`,
  },
  /* 6. SUM BLOB STORAGE SIZES */
  {
    slug: 'azure-sum-blob-sizes',
    title: 'Sum Blob Storage Sizes',
    technologySlug: 'azure',
    difficulty: 'Easy',
    workspaceType: 'code',
    defaultLanguage: 'python',
    shortDescription: 'Total the sizes of locally simulated blobs.',
    problemStatement: `Read an integer N and then N nonnegative blob sizes measured in bytes. Print their sum. If N is zero, print 0. The values are provided through standard input; there is no storage account connection.`,
    inputFormat: `Line 1: N.\nLine 2: N space-separated integers (may be blank for N=0).\n\nExample:\n4\n100 250 50 600`,
    outputFormat: `One integer, the total number of bytes.\n\nExample output:\n1000`,
    constraints: ['0 <= N <= 100000.', '0 <= blob size <= 10^15.', 'Use integer arithmetic.', 'No Azure storage access.'],
    notes: ['The second input line can be empty when N=0.'],
    skills: ['Azure', 'Blob Storage', 'Python', 'Arrays', 'Summation'],
    estimatedMinutes: 10,
    sampleTests: [
      { id: 'azure-blob-sample-1', title: 'Several blobs', input: '4\n100 250 50 600\n', expectedOutput: '1000' },
      { id: 'azure-blob-sample-2', title: 'Empty container', input: '0\n\n', expectedOutput: '0' },
    ],
    starterCode: `n = int(input())\nblob_sizes = list(map(int, input().split())) if n else []\n\n# Print the total number of bytes\n`,
  },
  /* 7. EVALUATE AZURE RBAC PERMISSION */
  {
    slug: 'azure-evaluate-rbac',
    title: 'Evaluate Azure RBAC Permission',
    technologySlug: 'azure',
    difficulty: 'Medium',
    workspaceType: 'code',
    defaultLanguage: 'python',
    shortDescription: 'Evaluate simplified role grants and exclusions for a requested action.',
    problemStatement: `Implement a simplified offline role-permission evaluator.\n\nLine 1 contains the requested action. Line 2 contains N rules. Each of the next N lines contains either ALLOW ACTION or EXCLUDE ACTION, where ACTION is the requested action string or the wildcard *.\n\nDecision rules:\n1. If any EXCLUDE rule matches, print DENIED.\n2. Otherwise if any ALLOW rule matches, print ALLOWED.\n3. Otherwise print DENIED.\n\nMatching is case-sensitive. These are educational rules, NOT a full representation of Azure RBAC, deny assignments, or NotActions.`,
    inputFormat: `Line 1: Requested action.\nLine 2: N.\nNext N lines: ALLOW ACTION or EXCLUDE ACTION.\n\nExample:\nMicrosoft.Storage/storageAccounts/read\n2\nALLOW Microsoft.Storage/storageAccounts/read\nALLOW Microsoft.Compute/virtualMachines/read`,
    outputFormat: `ALLOWED or DENIED.\n\nExample output:\nALLOWED`,
    constraints: ['0 <= N <= 100000.', 'Effects are ALLOW or EXCLUDE.', 'An exact action or * matches.', 'EXCLUDE has precedence in this exercise.', 'No real Azure authorization.'],
    notes: ['This problem deliberately simplifies real Azure role assignments and denies.'],
    skills: ['Azure', 'RBAC', 'Python', 'Policy Simulation'],
    estimatedMinutes: 20,
    sampleTests: [
      { id: 'azure-rbac-sample-1', title: 'Granted', input: 'Microsoft.Storage/storageAccounts/read\n2\nALLOW Microsoft.Storage/storageAccounts/read\nALLOW Microsoft.Compute/virtualMachines/read\n', expectedOutput: 'ALLOWED' },
      { id: 'azure-rbac-sample-2', title: 'Excluded', input: 'read\n2\nALLOW read\nEXCLUDE read\n', expectedOutput: 'DENIED' },
    ],
    starterCode: `requested_action = input().strip()\nn = int(input())\n\n# Evaluate ALLOW and EXCLUDE rules; print ALLOWED or DENIED\n`,
  },
  /* 8. DETECT OVERLAPPING VNET SUBNETS */
  {
    slug: 'azure-detect-overlapping-subnets',
    title: 'Detect Overlapping VNet Subnets',
    technologySlug: 'azure',
    difficulty: 'Medium',
    workspaceType: 'code',
    defaultLanguage: 'python',
    shortDescription: 'Check whether two IPv4 subnet ranges overlap.',
    problemStatement: `Read two valid IPv4 CIDR strings. Use Python's standard-library ipaddress module to determine whether their address ranges overlap. Print OVERLAP when they share at least one IP address; otherwise print DISJOINT. Host bits may be set, so use strict=False. This is a local VNet planning simulation.`,
    inputFormat: `Line 1: First CIDR.\nLine 2: Second CIDR.\n\nExample:\n10.1.0.0/16\n10.1.2.0/24`,
    outputFormat: `OVERLAP or DISJOINT.\n\nExample output:\nOVERLAP`,
    constraints: ['Inputs are valid IPv4 CIDR strings.', 'Use ipaddress.ip_network(..., strict=False).', 'No Azure networking calls.'],
    notes: ['Overlapping ranges can complicate network planning.'],
    skills: ['Azure', 'Virtual Network', 'CIDR', 'Python', 'IP Addressing'],
    estimatedMinutes: 18,
    sampleTests: [
      { id: 'azure-vnet-sample-1', title: 'Overlapping', input: '10.1.0.0/16\n10.1.2.0/24\n', expectedOutput: 'OVERLAP' },
      { id: 'azure-vnet-sample-2', title: 'Separate networks', input: '10.1.0.0/16\n10.2.0.0/16\n', expectedOutput: 'DISJOINT' },
    ],
    starterCode: `import ipaddress\n\nfirst = input().strip()\nsecond = input().strip()\n\n# Compare the two networks\n`,
  },
  /* 9. CALCULATE VM SCALE SET TARGET */
  {
    slug: 'azure-calculate-scale-target',
    title: 'Calculate VM Scale Set Target',
    technologySlug: 'azure',
    difficulty: 'Medium',
    workspaceType: 'code',
    defaultLanguage: 'python',
    shortDescription: 'Clamp requested VM capacity to allowed minimum and maximum.',
    problemStatement: `Simulate VM Scale Set capacity limits. Read min_capacity, max_capacity, and desired_capacity as three integers. The result is desired_capacity clamped into the inclusive range [min_capacity, max_capacity]. Print the resulting capacity as an integer.`,
    inputFormat: `One line: min_capacity max_capacity desired_capacity.\n\nExample:\n2 10 14`,
    outputFormat: `One integer: final capacity.\n\nExample output:\n10`,
    constraints: ['0 <= min_capacity <= max_capacity <= 10^9.', '0 <= desired_capacity <= 10^9.', 'No actual VM provisioning.'],
    notes: ['This intentionally omits scale metrics and cooldown rules.'],
    skills: ['Azure', 'VM Scale Sets', 'Python', 'Bounds', 'Scaling'],
    estimatedMinutes: 15,
    sampleTests: [
      { id: 'azure-scale-sample-1', title: 'Above maximum', input: '2 10 14\n', expectedOutput: '10' },
      { id: 'azure-scale-sample-2', title: 'Within range', input: '2 10 6\n', expectedOutput: '6' },
    ],
    starterCode: `minimum, maximum, desired = map(int, input().split())\n\n# Print the clamped capacity\n`,
  },
  /* 10. SIMULATE AZURE QUEUE BATCHES */
  {
    slug: 'azure-simulate-queue-batches',
    title: 'Simulate Azure Queue Batches',
    technologySlug: 'azure',
    difficulty: 'Medium',
    workspaceType: 'code',
    defaultLanguage: 'python',
    shortDescription: 'Calculate batches needed to process queued messages.',
    problemStatement: `Given N queued messages and a positive worker batch capacity B, calculate how many batches are needed to process all messages. Each batch processes at most B messages. Print the smallest whole number of batches sufficient for N messages. When N is zero, print 0. This simulates local queue processing, not a storage queue or Service Bus API.`,
    inputFormat: `One line: N B.\n\nExample:\n23 10`,
    outputFormat: `One integer: number of batches.\n\nExample output:\n3`,
    constraints: ['0 <= N <= 10^18.', '1 <= B <= 10^18.', 'Use integer arithmetic.', 'No Azure queue API.'],
    notes: ['Use ceiling division (N + B - 1) // B.'],
    skills: ['Azure', 'Queues', 'Python', 'Ceiling Division', 'Simulation'],
    estimatedMinutes: 15,
    sampleTests: [
      { id: 'azure-queue-sample-1', title: 'Partial final batch', input: '23 10\n', expectedOutput: '3' },
      { id: 'azure-queue-sample-2', title: 'No messages', input: '0 10\n', expectedOutput: '0' },
    ],
    starterCode: `messages, batch_size = map(int, input().split())\n\n# Calculate the minimum batches needed\n`,
  },
];

export function getAzureProblemBySlug(slug: string): PracticeProblem | undefined {
  return azureProblems.find((problem) => problem.slug === slug);
}
