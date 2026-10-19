import type { PracticeProblem } from './types';

/**
 * Cybersecurity > Cloud Security
 * 30 Python 3 offline/simulated exercises across 10 roadmap modules.
 * Hidden test cases and server-side grading must be registered separately.
 */
export const cloudSecurityProblems: PracticeProblem[] = [
  {
    "slug": "cloud-security-identify-cloud-service-model",
    "title": "Identify Cloud Service Model",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Given a service name, classify ec2 or virtual-machine as IAAS, lambda or functions as PAAS, and office365 or gmail as SAAS; otherwise OTHER. Ignore case.",
    "problemStatement": "Identify Cloud Service Model\n\nGiven a service name, classify ec2 or virtual-machine as IAAS, lambda or functions as PAAS, and office365 or gmail as SAAS; otherwise OTHER. Ignore case.\n\nExample input:\nEC2\n\nExample output:\nIAAS\n\nWrite a Python 3 program that reads standard input and prints only the required output. Work exclusively with simulated, offline cloud security data.",
    "inputFormat": "One service name.",
    "outputFormat": "IAAS, PAAS, SAAS, or OTHER.",
    "constraints": [
      "Use Python 3 and read input from standard input.",
      "Print only the specified result; no prompts or debug messages.",
      "Handle invalid input as specified in the problem statement.",
      "Do not hard-code example answers.",
      "Use simulated offline cloud security data only; do not access live cloud resources or external networks."
    ],
    "skills": [
      "Cloud Security",
      "Cloud Security Fundamentals",
      "Python",
      "Offline cloud configuration analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the supplied simulated cloud security data.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "cloud-security-classify-shared-responsibility",
    "title": "Classify Shared Responsibility",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Given a responsibility, print PROVIDER for physical-security or datacenter, CUSTOMER for iam or data-encryption, or SHARED for patch-management; otherwise UNKNOWN. Ignore case.",
    "problemStatement": "Classify Shared Responsibility\n\nGiven a responsibility, print PROVIDER for physical-security or datacenter, CUSTOMER for iam or data-encryption, or SHARED for patch-management; otherwise UNKNOWN. Ignore case.\n\nExample input:\niam\n\nExample output:\nCUSTOMER\n\nWrite a Python 3 program that reads standard input and prints only the required output. Work exclusively with simulated, offline cloud security data.",
    "inputFormat": "One responsibility identifier.",
    "outputFormat": "PROVIDER, CUSTOMER, SHARED, or UNKNOWN.",
    "constraints": [
      "Use Python 3 and read input from standard input.",
      "Print only the specified result; no prompts or debug messages.",
      "Handle invalid input as specified in the problem statement.",
      "Do not hard-code example answers.",
      "Use simulated offline cloud security data only; do not access live cloud resources or external networks."
    ],
    "skills": [
      "Cloud Security",
      "Cloud Security Fundamentals",
      "Python",
      "Offline cloud configuration analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the supplied simulated cloud security data.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "cloud-security-validate-cloud-region",
    "title": "Validate Cloud Region",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "A simulated cloud region is valid only if it matches exactly the pattern two lowercase letters, a hyphen, one or more lowercase letters, a hyphen, and one digit (for example us-east-1). Print VALID or INVALID.",
    "problemStatement": "Validate Cloud Region\n\nA simulated cloud region is valid only if it matches exactly the pattern two lowercase letters, a hyphen, one or more lowercase letters, a hyphen, and one digit (for example us-east-1). Print VALID or INVALID.\n\nExample input:\nus-east-1\n\nExample output:\nVALID\n\nWrite a Python 3 program that reads standard input and prints only the required output. Work exclusively with simulated, offline cloud security data.",
    "inputFormat": "One region identifier.",
    "outputFormat": "VALID or INVALID.",
    "constraints": [
      "Use Python 3 and read input from standard input.",
      "Print only the specified result; no prompts or debug messages.",
      "Handle invalid input as specified in the problem statement.",
      "Do not hard-code example answers.",
      "Use simulated offline cloud security data only; do not access live cloud resources or external networks."
    ],
    "skills": [
      "Cloud Security",
      "Cloud Security Fundamentals",
      "Python",
      "Offline cloud configuration analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the supplied simulated cloud security data.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "cloud-security-validate-iam-policy-action",
    "title": "Validate IAM Policy Action",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Classify a simulated IAM action string. Print DENY for the exact wildcard *, ALLOW for s3:GetObject, ec2:DescribeInstances, or logs:GetLogEvents (case-sensitive), and UNKNOWN otherwise.",
    "problemStatement": "Validate IAM Policy Action\n\nClassify a simulated IAM action string. Print DENY for the exact wildcard *, ALLOW for s3:GetObject, ec2:DescribeInstances, or logs:GetLogEvents (case-sensitive), and UNKNOWN otherwise.\n\nExample input:\n*\n\nExample output:\nDENY\n\nWrite a Python 3 program that reads standard input and prints only the required output. Work exclusively with simulated, offline cloud security data.",
    "inputFormat": "One IAM action string.",
    "outputFormat": "DENY, ALLOW, or UNKNOWN.",
    "constraints": [
      "Use Python 3 and read input from standard input.",
      "Print only the specified result; no prompts or debug messages.",
      "Handle invalid input as specified in the problem statement.",
      "Do not hard-code example answers.",
      "Use simulated offline cloud security data only; do not access live cloud resources or external networks."
    ],
    "skills": [
      "Cloud Security",
      "Cloud Identity and Access Management",
      "Python",
      "Offline cloud configuration analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the supplied simulated cloud security data.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "cloud-security-detect-excessive-permissions",
    "title": "Detect Excessive Permissions",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Read one comma-separated list of simulated IAM actions. Print EXCESSIVE if any trimmed action is * or ends with :*; otherwise LIMITED. An empty list is LIMITED.",
    "problemStatement": "Detect Excessive Permissions\n\nRead one comma-separated list of simulated IAM actions. Print EXCESSIVE if any trimmed action is * or ends with :*; otherwise LIMITED. An empty list is LIMITED.\n\nExample input:\ns3:GetObject,ec2:*\n\nExample output:\nEXCESSIVE\n\nWrite a Python 3 program that reads standard input and prints only the required output. Work exclusively with simulated, offline cloud security data.",
    "inputFormat": "One comma-separated list of IAM actions.",
    "outputFormat": "EXCESSIVE or LIMITED.",
    "constraints": [
      "Use Python 3 and read input from standard input.",
      "Print only the specified result; no prompts or debug messages.",
      "Handle invalid input as specified in the problem statement.",
      "Do not hard-code example answers.",
      "Use simulated offline cloud security data only; do not access live cloud resources or external networks."
    ],
    "skills": [
      "Cloud Security",
      "Cloud Identity and Access Management",
      "Python",
      "Offline cloud configuration analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the supplied simulated cloud security data.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "cloud-security-identify-privileged-cloud-users",
    "title": "Identify Privileged Cloud Users",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Given a comma-separated role list, print PRIVILEGED if any role equals admin, owner, or root (case-insensitive, ignore surrounding spaces); otherwise STANDARD.",
    "problemStatement": "Identify Privileged Cloud Users\n\nGiven a comma-separated role list, print PRIVILEGED if any role equals admin, owner, or root (case-insensitive, ignore surrounding spaces); otherwise STANDARD.\n\nExample input:\nviewer, Admin\n\nExample output:\nPRIVILEGED\n\nWrite a Python 3 program that reads standard input and prints only the required output. Work exclusively with simulated, offline cloud security data.",
    "inputFormat": "One comma-separated list of roles.",
    "outputFormat": "PRIVILEGED or STANDARD.",
    "constraints": [
      "Use Python 3 and read input from standard input.",
      "Print only the specified result; no prompts or debug messages.",
      "Handle invalid input as specified in the problem statement.",
      "Do not hard-code example answers.",
      "Use simulated offline cloud security data only; do not access live cloud resources or external networks."
    ],
    "skills": [
      "Cloud Security",
      "Cloud Identity and Access Management",
      "Python",
      "Offline cloud configuration analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the supplied simulated cloud security data.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "cloud-security-validate-security-group-rule",
    "title": "Validate Security Group Rule",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Read a protocol and port separated by one space. A rule is VALID if protocol is tcp or udp (case-insensitive) and port is an integer from 1 to 65535 inclusive; otherwise INVALID.",
    "problemStatement": "Validate Security Group Rule\n\nRead a protocol and port separated by one space. A rule is VALID if protocol is tcp or udp (case-insensitive) and port is an integer from 1 to 65535 inclusive; otherwise INVALID.\n\nExample input:\ntcp 443\n\nExample output:\nVALID\n\nWrite a Python 3 program that reads standard input and prints only the required output. Work exclusively with simulated, offline cloud security data.",
    "inputFormat": "Protocol and port separated by whitespace.",
    "outputFormat": "VALID or INVALID.",
    "constraints": [
      "Use Python 3 and read input from standard input.",
      "Print only the specified result; no prompts or debug messages.",
      "Handle invalid input as specified in the problem statement.",
      "Do not hard-code example answers.",
      "Use simulated offline cloud security data only; do not access live cloud resources or external networks."
    ],
    "skills": [
      "Cloud Security",
      "Cloud Network Security",
      "Python",
      "Offline cloud configuration analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the supplied simulated cloud security data.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "cloud-security-detect-public-port-exposure",
    "title": "Detect Public Port Exposure",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Read a CIDR and port separated by whitespace. Print EXPOSED if CIDR is exactly 0.0.0.0/0 or ::/0 and the port is 22 or 3389; otherwise RESTRICTED. If the port is not an integer, print INVALID.",
    "problemStatement": "Detect Public Port Exposure\n\nRead a CIDR and port separated by whitespace. Print EXPOSED if CIDR is exactly 0.0.0.0/0 or ::/0 and the port is 22 or 3389; otherwise RESTRICTED. If the port is not an integer, print INVALID.\n\nExample input:\n0.0.0.0/0 22\n\nExample output:\nEXPOSED\n\nWrite a Python 3 program that reads standard input and prints only the required output. Work exclusively with simulated, offline cloud security data.",
    "inputFormat": "CIDR and port separated by whitespace.",
    "outputFormat": "EXPOSED, RESTRICTED, or INVALID.",
    "constraints": [
      "Use Python 3 and read input from standard input.",
      "Print only the specified result; no prompts or debug messages.",
      "Handle invalid input as specified in the problem statement.",
      "Do not hard-code example answers.",
      "Use simulated offline cloud security data only; do not access live cloud resources or external networks."
    ],
    "skills": [
      "Cloud Security",
      "Cloud Network Security",
      "Python",
      "Offline cloud configuration analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the supplied simulated cloud security data.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "cloud-security-evaluate-network-acl",
    "title": "Evaluate Network ACL",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read an action and a port separated by whitespace. Print BLOCKED when action is deny (case-insensitive), ALLOWED when action is allow and port is an integer from 1 to 65535, and INVALID otherwise.",
    "problemStatement": "Evaluate Network ACL\n\nRead an action and a port separated by whitespace. Print BLOCKED when action is deny (case-insensitive), ALLOWED when action is allow and port is an integer from 1 to 65535, and INVALID otherwise.\n\nExample input:\nallow 443\n\nExample output:\nALLOWED\n\nWrite a Python 3 program that reads standard input and prints only the required output. Work exclusively with simulated, offline cloud security data.",
    "inputFormat": "Action and port separated by whitespace.",
    "outputFormat": "BLOCKED, ALLOWED, or INVALID.",
    "constraints": [
      "Use Python 3 and read input from standard input.",
      "Print only the specified result; no prompts or debug messages.",
      "Handle invalid input as specified in the problem statement.",
      "Do not hard-code example answers.",
      "Use simulated offline cloud security data only; do not access live cloud resources or external networks."
    ],
    "skills": [
      "Cloud Security",
      "Cloud Network Security",
      "Python",
      "Offline cloud configuration analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the supplied simulated cloud security data.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "cloud-security-detect-public-storage-bucket",
    "title": "Detect Public Storage Bucket",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Read a simulated bucket access setting. Print PUBLIC for public or allusers, PRIVATE for private or authenticated, and UNKNOWN otherwise. Ignore case.",
    "problemStatement": "Detect Public Storage Bucket\n\nRead a simulated bucket access setting. Print PUBLIC for public or allusers, PRIVATE for private or authenticated, and UNKNOWN otherwise. Ignore case.\n\nExample input:\nallUsers\n\nExample output:\nPUBLIC\n\nWrite a Python 3 program that reads standard input and prints only the required output. Work exclusively with simulated, offline cloud security data.",
    "inputFormat": "One bucket access setting.",
    "outputFormat": "PUBLIC, PRIVATE, or UNKNOWN.",
    "constraints": [
      "Use Python 3 and read input from standard input.",
      "Print only the specified result; no prompts or debug messages.",
      "Handle invalid input as specified in the problem statement.",
      "Do not hard-code example answers.",
      "Use simulated offline cloud security data only; do not access live cloud resources or external networks."
    ],
    "skills": [
      "Cloud Security",
      "Cloud Storage Security",
      "Python",
      "Offline cloud configuration analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the supplied simulated cloud security data.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "cloud-security-validate-storage-encryption",
    "title": "Validate Storage Encryption",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Read an encryption algorithm name. Print ENCRYPTED for AES256 or aws:kms, UNENCRYPTED for none or disabled, and UNKNOWN otherwise. Matching is case-insensitive.",
    "problemStatement": "Validate Storage Encryption\n\nRead an encryption algorithm name. Print ENCRYPTED for AES256 or aws:kms, UNENCRYPTED for none or disabled, and UNKNOWN otherwise. Matching is case-insensitive.\n\nExample input:\nAES256\n\nExample output:\nENCRYPTED\n\nWrite a Python 3 program that reads standard input and prints only the required output. Work exclusively with simulated, offline cloud security data.",
    "inputFormat": "One encryption setting.",
    "outputFormat": "ENCRYPTED, UNENCRYPTED, or UNKNOWN.",
    "constraints": [
      "Use Python 3 and read input from standard input.",
      "Print only the specified result; no prompts or debug messages.",
      "Handle invalid input as specified in the problem statement.",
      "Do not hard-code example answers.",
      "Use simulated offline cloud security data only; do not access live cloud resources or external networks."
    ],
    "skills": [
      "Cloud Security",
      "Cloud Storage Security",
      "Python",
      "Offline cloud configuration analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the supplied simulated cloud security data.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "cloud-security-review-object-permissions",
    "title": "Review Object Permissions",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read a comma-separated list of object permissions. Print RISK if any entry is public-read, public-read-write, or everyone (case-insensitive); otherwise SAFE.",
    "problemStatement": "Review Object Permissions\n\nRead a comma-separated list of object permissions. Print RISK if any entry is public-read, public-read-write, or everyone (case-insensitive); otherwise SAFE.\n\nExample input:\nowner-read,public-read\n\nExample output:\nRISK\n\nWrite a Python 3 program that reads standard input and prints only the required output. Work exclusively with simulated, offline cloud security data.",
    "inputFormat": "Comma-separated permissions.",
    "outputFormat": "RISK or SAFE.",
    "constraints": [
      "Use Python 3 and read input from standard input.",
      "Print only the specified result; no prompts or debug messages.",
      "Handle invalid input as specified in the problem statement.",
      "Do not hard-code example answers.",
      "Use simulated offline cloud security data only; do not access live cloud resources or external networks."
    ],
    "skills": [
      "Cloud Security",
      "Cloud Storage Security",
      "Python",
      "Offline cloud configuration analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the supplied simulated cloud security data.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "cloud-security-classify-sensitive-cloud-data",
    "title": "Classify Sensitive Cloud Data",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Classify one data label. Print SENSITIVE for pii, credentials, or financial; PUBLIC for public or marketing; otherwise UNKNOWN. Ignore case.",
    "problemStatement": "Classify Sensitive Cloud Data\n\nClassify one data label. Print SENSITIVE for pii, credentials, or financial; PUBLIC for public or marketing; otherwise UNKNOWN. Ignore case.\n\nExample input:\nPII\n\nExample output:\nSENSITIVE\n\nWrite a Python 3 program that reads standard input and prints only the required output. Work exclusively with simulated, offline cloud security data.",
    "inputFormat": "One data classification label.",
    "outputFormat": "SENSITIVE, PUBLIC, or UNKNOWN.",
    "constraints": [
      "Use Python 3 and read input from standard input.",
      "Print only the specified result; no prompts or debug messages.",
      "Handle invalid input as specified in the problem statement.",
      "Do not hard-code example answers.",
      "Use simulated offline cloud security data only; do not access live cloud resources or external networks."
    ],
    "skills": [
      "Cloud Security",
      "Cloud Data Protection",
      "Python",
      "Offline cloud configuration analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the supplied simulated cloud security data.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "cloud-security-validate-encryption-configuration",
    "title": "Validate Encryption Configuration",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read two whitespace-separated values: encryption status and key length. Print SECURE if status is enabled (case-insensitive) and key length is 128, 192, or 256; otherwise INSECURE. Invalid numbers are INSECURE.",
    "problemStatement": "Validate Encryption Configuration\n\nRead two whitespace-separated values: encryption status and key length. Print SECURE if status is enabled (case-insensitive) and key length is 128, 192, or 256; otherwise INSECURE. Invalid numbers are INSECURE.\n\nExample input:\nenabled 256\n\nExample output:\nSECURE\n\nWrite a Python 3 program that reads standard input and prints only the required output. Work exclusively with simulated, offline cloud security data.",
    "inputFormat": "Status and key length.",
    "outputFormat": "SECURE or INSECURE.",
    "constraints": [
      "Use Python 3 and read input from standard input.",
      "Print only the specified result; no prompts or debug messages.",
      "Handle invalid input as specified in the problem statement.",
      "Do not hard-code example answers.",
      "Use simulated offline cloud security data only; do not access live cloud resources or external networks."
    ],
    "skills": [
      "Cloud Security",
      "Cloud Data Protection",
      "Python",
      "Offline cloud configuration analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the supplied simulated cloud security data.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "cloud-security-detect-exposed-secret-marker",
    "title": "Detect Exposed Secret Marker",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read a simulated configuration line. Print EXPOSED if it contains any case-insensitive marker password=, api_key=, or secret_key=; otherwise CLEAR. Do not access real secrets.",
    "problemStatement": "Detect Exposed Secret Marker\n\nRead a simulated configuration line. Print EXPOSED if it contains any case-insensitive marker password=, api_key=, or secret_key=; otherwise CLEAR. Do not access real secrets.\n\nExample input:\nAPI_KEY=example\n\nExample output:\nEXPOSED\n\nWrite a Python 3 program that reads standard input and prints only the required output. Work exclusively with simulated, offline cloud security data.",
    "inputFormat": "One configuration line.",
    "outputFormat": "EXPOSED or CLEAR.",
    "constraints": [
      "Use Python 3 and read input from standard input.",
      "Print only the specified result; no prompts or debug messages.",
      "Handle invalid input as specified in the problem statement.",
      "Do not hard-code example answers.",
      "Use simulated offline cloud security data only; do not access live cloud resources or external networks."
    ],
    "skills": [
      "Cloud Security",
      "Cloud Data Protection",
      "Python",
      "Offline cloud configuration analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the supplied simulated cloud security data.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "cloud-security-analyze-cloud-audit-event",
    "title": "Analyze Cloud Audit Event",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Read one simulated audit event status. Print FAILURE for failed or denied, SUCCESS for success or allowed, and UNKNOWN otherwise. Ignore case.",
    "problemStatement": "Analyze Cloud Audit Event\n\nRead one simulated audit event status. Print FAILURE for failed or denied, SUCCESS for success or allowed, and UNKNOWN otherwise. Ignore case.\n\nExample input:\nDenied\n\nExample output:\nFAILURE\n\nWrite a Python 3 program that reads standard input and prints only the required output. Work exclusively with simulated, offline cloud security data.",
    "inputFormat": "One event status.",
    "outputFormat": "FAILURE, SUCCESS, or UNKNOWN.",
    "constraints": [
      "Use Python 3 and read input from standard input.",
      "Print only the specified result; no prompts or debug messages.",
      "Handle invalid input as specified in the problem statement.",
      "Do not hard-code example answers.",
      "Use simulated offline cloud security data only; do not access live cloud resources or external networks."
    ],
    "skills": [
      "Cloud Security",
      "Cloud Logging and Monitoring",
      "Python",
      "Offline cloud configuration analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the supplied simulated cloud security data.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "cloud-security-detect-suspicious-cloud-sign-in",
    "title": "Detect Suspicious Cloud Sign-In",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read two whitespace-separated integers: failed sign-in count and success flag (0 or 1). Print SUSPICIOUS if failures are at least 5 and success flag is 1; otherwise NORMAL. For invalid or negative values print INVALID.",
    "problemStatement": "Detect Suspicious Cloud Sign-In\n\nRead two whitespace-separated integers: failed sign-in count and success flag (0 or 1). Print SUSPICIOUS if failures are at least 5 and success flag is 1; otherwise NORMAL. For invalid or negative values print INVALID.\n\nExample input:\n7 1\n\nExample output:\nSUSPICIOUS\n\nWrite a Python 3 program that reads standard input and prints only the required output. Work exclusively with simulated, offline cloud security data.",
    "inputFormat": "Failure count and success flag.",
    "outputFormat": "SUSPICIOUS, NORMAL, or INVALID.",
    "constraints": [
      "Use Python 3 and read input from standard input.",
      "Print only the specified result; no prompts or debug messages.",
      "Handle invalid input as specified in the problem statement.",
      "Do not hard-code example answers.",
      "Use simulated offline cloud security data only; do not access live cloud resources or external networks."
    ],
    "skills": [
      "Cloud Security",
      "Cloud Logging and Monitoring",
      "Python",
      "Offline cloud configuration analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the supplied simulated cloud security data.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "cloud-security-identify-unauthorized-api-activity",
    "title": "Identify Unauthorized API Activity",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read an API response status code. Print UNAUTHORIZED for 401 or 403, AUTHORIZED for integer codes 200 through 299, and OTHER for all other integers. For non-integers print INVALID.",
    "problemStatement": "Identify Unauthorized API Activity\n\nRead an API response status code. Print UNAUTHORIZED for 401 or 403, AUTHORIZED for integer codes 200 through 299, and OTHER for all other integers. For non-integers print INVALID.\n\nExample input:\n403\n\nExample output:\nUNAUTHORIZED\n\nWrite a Python 3 program that reads standard input and prints only the required output. Work exclusively with simulated, offline cloud security data.",
    "inputFormat": "One HTTP status code.",
    "outputFormat": "UNAUTHORIZED, AUTHORIZED, OTHER, or INVALID.",
    "constraints": [
      "Use Python 3 and read input from standard input.",
      "Print only the specified result; no prompts or debug messages.",
      "Handle invalid input as specified in the problem statement.",
      "Do not hard-code example answers.",
      "Use simulated offline cloud security data only; do not access live cloud resources or external networks."
    ],
    "skills": [
      "Cloud Security",
      "Cloud Logging and Monitoring",
      "Python",
      "Offline cloud configuration analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the supplied simulated cloud security data.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "cloud-security-detect-cloud-misconfiguration",
    "title": "Detect Cloud Misconfiguration",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Read a comma-separated list of simulated settings. Print MISCONFIGURED if any trimmed setting is public-access=true or logging=false (case-insensitive); otherwise COMPLIANT.",
    "problemStatement": "Detect Cloud Misconfiguration\n\nRead a comma-separated list of simulated settings. Print MISCONFIGURED if any trimmed setting is public-access=true or logging=false (case-insensitive); otherwise COMPLIANT.\n\nExample input:\nlogging=false,encryption=true\n\nExample output:\nMISCONFIGURED\n\nWrite a Python 3 program that reads standard input and prints only the required output. Work exclusively with simulated, offline cloud security data.",
    "inputFormat": "Comma-separated key=value settings.",
    "outputFormat": "MISCONFIGURED or COMPLIANT.",
    "constraints": [
      "Use Python 3 and read input from standard input.",
      "Print only the specified result; no prompts or debug messages.",
      "Handle invalid input as specified in the problem statement.",
      "Do not hard-code example answers.",
      "Use simulated offline cloud security data only; do not access live cloud resources or external networks."
    ],
    "skills": [
      "Cloud Security",
      "Cloud Configuration Security",
      "Python",
      "Offline cloud configuration analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the supplied simulated cloud security data.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "cloud-security-validate-cloud-security-baseline",
    "title": "Validate Cloud Security Baseline",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read three whitespace-separated flags (0 or 1) representing encryption, logging, and MFA. Print PASS if all three are 1; FAIL if all flags are valid but any is 0; otherwise INVALID.",
    "problemStatement": "Validate Cloud Security Baseline\n\nRead three whitespace-separated flags (0 or 1) representing encryption, logging, and MFA. Print PASS if all three are 1; FAIL if all flags are valid but any is 0; otherwise INVALID.\n\nExample input:\n1 1 1\n\nExample output:\nPASS\n\nWrite a Python 3 program that reads standard input and prints only the required output. Work exclusively with simulated, offline cloud security data.",
    "inputFormat": "Three binary flags.",
    "outputFormat": "PASS, FAIL, or INVALID.",
    "constraints": [
      "Use Python 3 and read input from standard input.",
      "Print only the specified result; no prompts or debug messages.",
      "Handle invalid input as specified in the problem statement.",
      "Do not hard-code example answers.",
      "Use simulated offline cloud security data only; do not access live cloud resources or external networks."
    ],
    "skills": [
      "Cloud Security",
      "Cloud Configuration Security",
      "Python",
      "Offline cloud configuration analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the supplied simulated cloud security data.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "cloud-security-check-cloud-resource-tags",
    "title": "Check Cloud Resource Tags",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Read comma-separated resource tag keys. Print COMPLETE if environment, owner, and cost-center are all present (case-insensitive, trim spaces); otherwise INCOMPLETE.",
    "problemStatement": "Check Cloud Resource Tags\n\nRead comma-separated resource tag keys. Print COMPLETE if environment, owner, and cost-center are all present (case-insensitive, trim spaces); otherwise INCOMPLETE.\n\nExample input:\nOwner,Environment,cost-center\n\nExample output:\nCOMPLETE\n\nWrite a Python 3 program that reads standard input and prints only the required output. Work exclusively with simulated, offline cloud security data.",
    "inputFormat": "Comma-separated tag keys.",
    "outputFormat": "COMPLETE or INCOMPLETE.",
    "constraints": [
      "Use Python 3 and read input from standard input.",
      "Print only the specified result; no prompts or debug messages.",
      "Handle invalid input as specified in the problem statement.",
      "Do not hard-code example answers.",
      "Use simulated offline cloud security data only; do not access live cloud resources or external networks."
    ],
    "skills": [
      "Cloud Security",
      "Cloud Configuration Security",
      "Python",
      "Offline cloud configuration analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the supplied simulated cloud security data.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "cloud-security-detect-brute-force-attempts",
    "title": "Detect Brute Force Attempts",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Read the number of failed authentication attempts as an integer. Print ALERT if at least 10, NORMAL if between 0 and 9, or INVALID for negative or non-integer input.",
    "problemStatement": "Detect Brute Force Attempts\n\nRead the number of failed authentication attempts as an integer. Print ALERT if at least 10, NORMAL if between 0 and 9, or INVALID for negative or non-integer input.\n\nExample input:\n12\n\nExample output:\nALERT\n\nWrite a Python 3 program that reads standard input and prints only the required output. Work exclusively with simulated, offline cloud security data.",
    "inputFormat": "One integer count.",
    "outputFormat": "ALERT, NORMAL, or INVALID.",
    "constraints": [
      "Use Python 3 and read input from standard input.",
      "Print only the specified result; no prompts or debug messages.",
      "Handle invalid input as specified in the problem statement.",
      "Do not hard-code example answers.",
      "Use simulated offline cloud security data only; do not access live cloud resources or external networks."
    ],
    "skills": [
      "Cloud Security",
      "Cloud Threat Detection",
      "Python",
      "Offline cloud configuration analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the supplied simulated cloud security data.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "cloud-security-identify-suspicious-ip-activity",
    "title": "Identify Suspicious IP Activity",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read one IPv4 address. Print SUSPICIOUS if it is in the documentation-only 203.0.113.0/24 range; NORMAL for any other valid IPv4 address; INVALID for malformed input.",
    "problemStatement": "Identify Suspicious IP Activity\n\nRead one IPv4 address. Print SUSPICIOUS if it is in the documentation-only 203.0.113.0/24 range; NORMAL for any other valid IPv4 address; INVALID for malformed input.\n\nExample input:\n203.0.113.10\n\nExample output:\nSUSPICIOUS\n\nWrite a Python 3 program that reads standard input and prints only the required output. Work exclusively with simulated, offline cloud security data.",
    "inputFormat": "One IPv4 address.",
    "outputFormat": "SUSPICIOUS, NORMAL, or INVALID.",
    "constraints": [
      "Use Python 3 and read input from standard input.",
      "Print only the specified result; no prompts or debug messages.",
      "Handle invalid input as specified in the problem statement.",
      "Do not hard-code example answers.",
      "Use simulated offline cloud security data only; do not access live cloud resources or external networks."
    ],
    "skills": [
      "Cloud Security",
      "Cloud Threat Detection",
      "Python",
      "Offline cloud configuration analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the supplied simulated cloud security data.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "cloud-security-classify-cloud-threat-event",
    "title": "Classify Cloud Threat Event",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read an event name. Print CRITICAL for root-login or key-exposure, HIGH for privilege-escalation or policy-change, LOW for read-only, and UNKNOWN otherwise. Ignore case.",
    "problemStatement": "Classify Cloud Threat Event\n\nRead an event name. Print CRITICAL for root-login or key-exposure, HIGH for privilege-escalation or policy-change, LOW for read-only, and UNKNOWN otherwise. Ignore case.\n\nExample input:\nroot-login\n\nExample output:\nCRITICAL\n\nWrite a Python 3 program that reads standard input and prints only the required output. Work exclusively with simulated, offline cloud security data.",
    "inputFormat": "One event identifier.",
    "outputFormat": "CRITICAL, HIGH, LOW, or UNKNOWN.",
    "constraints": [
      "Use Python 3 and read input from standard input.",
      "Print only the specified result; no prompts or debug messages.",
      "Handle invalid input as specified in the problem statement.",
      "Do not hard-code example answers.",
      "Use simulated offline cloud security data only; do not access live cloud resources or external networks."
    ],
    "skills": [
      "Cloud Security",
      "Cloud Threat Detection",
      "Python",
      "Offline cloud configuration analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the supplied simulated cloud security data.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "cloud-security-validate-container-security-settings",
    "title": "Validate Container Security Settings",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Read two whitespace-separated values: runAsNonRoot and readOnlyRootFilesystem (true or false, case-insensitive). Print SECURE if both are true, INSECURE if both are valid but at least one false, or INVALID otherwise.",
    "problemStatement": "Validate Container Security Settings\n\nRead two whitespace-separated values: runAsNonRoot and readOnlyRootFilesystem (true or false, case-insensitive). Print SECURE if both are true, INSECURE if both are valid but at least one false, or INVALID otherwise.\n\nExample input:\ntrue true\n\nExample output:\nSECURE\n\nWrite a Python 3 program that reads standard input and prints only the required output. Work exclusively with simulated, offline cloud security data.",
    "inputFormat": "Two boolean strings.",
    "outputFormat": "SECURE, INSECURE, or INVALID.",
    "constraints": [
      "Use Python 3 and read input from standard input.",
      "Print only the specified result; no prompts or debug messages.",
      "Handle invalid input as specified in the problem statement.",
      "Do not hard-code example answers.",
      "Use simulated offline cloud security data only; do not access live cloud resources or external networks."
    ],
    "skills": [
      "Cloud Security",
      "Cloud Container and Kubernetes Security",
      "Python",
      "Offline cloud configuration analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the supplied simulated cloud security data.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "cloud-security-detect-privileged-containers",
    "title": "Detect Privileged Containers",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Read the value of a simulated privileged flag. Print RISK for true, SAFE for false, and INVALID otherwise. Ignore case.",
    "problemStatement": "Detect Privileged Containers\n\nRead the value of a simulated privileged flag. Print RISK for true, SAFE for false, and INVALID otherwise. Ignore case.\n\nExample input:\ntrue\n\nExample output:\nRISK\n\nWrite a Python 3 program that reads standard input and prints only the required output. Work exclusively with simulated, offline cloud security data.",
    "inputFormat": "One boolean string.",
    "outputFormat": "RISK, SAFE, or INVALID.",
    "constraints": [
      "Use Python 3 and read input from standard input.",
      "Print only the specified result; no prompts or debug messages.",
      "Handle invalid input as specified in the problem statement.",
      "Do not hard-code example answers.",
      "Use simulated offline cloud security data only; do not access live cloud resources or external networks."
    ],
    "skills": [
      "Cloud Security",
      "Cloud Container and Kubernetes Security",
      "Python",
      "Offline cloud configuration analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the supplied simulated cloud security data.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "cloud-security-review-pod-security-configuration",
    "title": "Review Pod Security Configuration",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read a Kubernetes pod security level. Print STRICT for restricted, MODERATE for baseline, PERMISSIVE for privileged, and UNKNOWN otherwise. Ignore case.",
    "problemStatement": "Review Pod Security Configuration\n\nRead a Kubernetes pod security level. Print STRICT for restricted, MODERATE for baseline, PERMISSIVE for privileged, and UNKNOWN otherwise. Ignore case.\n\nExample input:\nrestricted\n\nExample output:\nSTRICT\n\nWrite a Python 3 program that reads standard input and prints only the required output. Work exclusively with simulated, offline cloud security data.",
    "inputFormat": "One security level.",
    "outputFormat": "STRICT, MODERATE, PERMISSIVE, or UNKNOWN.",
    "constraints": [
      "Use Python 3 and read input from standard input.",
      "Print only the specified result; no prompts or debug messages.",
      "Handle invalid input as specified in the problem statement.",
      "Do not hard-code example answers.",
      "Use simulated offline cloud security data only; do not access live cloud resources or external networks."
    ],
    "skills": [
      "Cloud Security",
      "Cloud Container and Kubernetes Security",
      "Python",
      "Offline cloud configuration analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the supplied simulated cloud security data.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "cloud-security-check-cloud-compliance-controls",
    "title": "Check Cloud Compliance Controls",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read a comma-separated list of enabled compliance controls. Print COMPLIANT if encryption, logging, and access-review all appear (case-insensitive); otherwise NON_COMPLIANT.",
    "problemStatement": "Check Cloud Compliance Controls\n\nRead a comma-separated list of enabled compliance controls. Print COMPLIANT if encryption, logging, and access-review all appear (case-insensitive); otherwise NON_COMPLIANT.\n\nExample input:\nlogging,encryption,access-review\n\nExample output:\nCOMPLIANT\n\nWrite a Python 3 program that reads standard input and prints only the required output. Work exclusively with simulated, offline cloud security data.",
    "inputFormat": "Comma-separated enabled control names.",
    "outputFormat": "COMPLIANT or NON_COMPLIANT.",
    "constraints": [
      "Use Python 3 and read input from standard input.",
      "Print only the specified result; no prompts or debug messages.",
      "Handle invalid input as specified in the problem statement.",
      "Do not hard-code example answers.",
      "Use simulated offline cloud security data only; do not access live cloud resources or external networks."
    ],
    "skills": [
      "Cloud Security",
      "Cloud Compliance and Incident Response",
      "Python",
      "Offline cloud configuration analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the supplied simulated cloud security data.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "cloud-security-classify-cloud-security-incident",
    "title": "Classify Cloud Security Incident",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Read a simulated incident category. Print IDENTITY for compromised-account or credential-theft, DATA for data-leak or exposed-bucket, NETWORK for ddos or port-scan, and OTHER otherwise. Ignore case.",
    "problemStatement": "Classify Cloud Security Incident\n\nRead a simulated incident category. Print IDENTITY for compromised-account or credential-theft, DATA for data-leak or exposed-bucket, NETWORK for ddos or port-scan, and OTHER otherwise. Ignore case.\n\nExample input:\ndata-leak\n\nExample output:\nDATA\n\nWrite a Python 3 program that reads standard input and prints only the required output. Work exclusively with simulated, offline cloud security data.",
    "inputFormat": "One incident category.",
    "outputFormat": "IDENTITY, DATA, NETWORK, or OTHER.",
    "constraints": [
      "Use Python 3 and read input from standard input.",
      "Print only the specified result; no prompts or debug messages.",
      "Handle invalid input as specified in the problem statement.",
      "Do not hard-code example answers.",
      "Use simulated offline cloud security data only; do not access live cloud resources or external networks."
    ],
    "skills": [
      "Cloud Security",
      "Cloud Compliance and Incident Response",
      "Python",
      "Offline cloud configuration analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the supplied simulated cloud security data.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "cloud-security-generate-incident-summary",
    "title": "Generate Incident Summary",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read one line containing an incident ID, severity, and status separated by commas. Trim spaces and uppercase severity and status. If any field is empty or there are not exactly three fields, print INVALID; otherwise print ID=<id>;SEVERITY=<severity>;STATUS=<status> with no extra spaces.",
    "problemStatement": "Generate Incident Summary\n\nRead one line containing an incident ID, severity, and status separated by commas. Trim spaces and uppercase severity and status. If any field is empty or there are not exactly three fields, print INVALID; otherwise print ID=<id>;SEVERITY=<severity>;STATUS=<status> with no extra spaces.\n\nExample input:\nINC-7, high, open\n\nExample output:\nID=INC-7;SEVERITY=HIGH;STATUS=OPEN\n\nWrite a Python 3 program that reads standard input and prints only the required output. Work exclusively with simulated, offline cloud security data.",
    "inputFormat": "Comma-separated incident ID, severity, status.",
    "outputFormat": "Formatted incident summary or INVALID.",
    "constraints": [
      "Use Python 3 and read input from standard input.",
      "Print only the specified result; no prompts or debug messages.",
      "Handle invalid input as specified in the problem statement.",
      "Do not hard-code example answers.",
      "Use simulated offline cloud security data only; do not access live cloud resources or external networks."
    ],
    "skills": [
      "Cloud Security",
      "Cloud Compliance and Incident Response",
      "Python",
      "Offline cloud configuration analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the supplied simulated cloud security data.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  }
];
