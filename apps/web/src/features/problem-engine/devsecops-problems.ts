import type { PracticeProblem } from './types';

/**
 * Cybersecurity > DevSecOps
 * 30 offline Python 3 exercises aligned with the 10 DevSecOps roadmap modules.
 * Register verified hidden tests in the backend before enabling graded submissions.
 */
export const devsecopsProblems: PracticeProblem[] = [
  // Module 1: DevSecOps Fundamentals
  {
    "slug": "devsecops-identify-sdlc-security-phase",
    "title": "Identify SDLC Security Phase",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Given one SDLC activity (case-insensitive), classify requirements or design as PLAN, coding or implementation as BUILD, testing or qa as TEST, deployment or release as DEPLOY, and anything else as UNKNOWN.",
    "problemStatement": "Identify SDLC Security Phase\n\nGiven one SDLC activity (case-insensitive), classify requirements or design as PLAN, coding or implementation as BUILD, testing or qa as TEST, deployment or release as DEPLOY, and anything else as UNKNOWN.\n\nExample input:\ndesign\n\nExample output:\nPLAN\n\nWrite a Python 3 program that reads standard input and prints only the required output. Analyze only simulated, offline DevSecOps data.",
    "inputFormat": "One activity name.",
    "outputFormat": "PLAN, BUILD, TEST, DEPLOY, or UNKNOWN.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output; do not print prompts or debug information.",
      "Follow the exact matching, formatting, and invalid-input rules in the problem statement.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials, or networks."
    ],
    "skills": [
      "DevSecOps",
      "DevSecOps Fundamentals",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Implement the required DevSecOps analysis.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "devsecops-classify-security-control",
    "title": "Classify Security Control",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Classify a security control (case-insensitive): mfa or access-control => PREVENTIVE; logging or ids => DETECTIVE; backup or restore => CORRECTIVE; otherwise UNKNOWN.",
    "problemStatement": "Classify Security Control\n\nClassify a security control (case-insensitive): mfa or access-control => PREVENTIVE; logging or ids => DETECTIVE; backup or restore => CORRECTIVE; otherwise UNKNOWN.\n\nExample input:\nMFA\n\nExample output:\nPREVENTIVE\n\nWrite a Python 3 program that reads standard input and prints only the required output. Analyze only simulated, offline DevSecOps data.",
    "inputFormat": "One control name.",
    "outputFormat": "PREVENTIVE, DETECTIVE, CORRECTIVE, or UNKNOWN.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output; do not print prompts or debug information.",
      "Follow the exact matching, formatting, and invalid-input rules in the problem statement.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials, or networks."
    ],
    "skills": [
      "DevSecOps",
      "DevSecOps Fundamentals",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Implement the required DevSecOps analysis.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "devsecops-evaluate-shift-left-security",
    "title": "Evaluate Shift-Left Security",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Read two integers: security review stage and release stage (both 1 through 10). Print SHIFT_LEFT if review stage is less than release stage, LATE if greater than or equal, or INVALID for out-of-range/malformed input.",
    "problemStatement": "Evaluate Shift-Left Security\n\nRead two integers: security review stage and release stage (both 1 through 10). Print SHIFT_LEFT if review stage is less than release stage, LATE if greater than or equal, or INVALID for out-of-range/malformed input.\n\nExample input:\n2 8\n\nExample output:\nSHIFT_LEFT\n\nWrite a Python 3 program that reads standard input and prints only the required output. Analyze only simulated, offline DevSecOps data.",
    "inputFormat": "Two space-separated integers.",
    "outputFormat": "SHIFT_LEFT, LATE, or INVALID.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output; do not print prompts or debug information.",
      "Follow the exact matching, formatting, and invalid-input rules in the problem statement.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials, or networks."
    ],
    "skills": [
      "DevSecOps",
      "DevSecOps Fundamentals",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Implement the required DevSecOps analysis.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  // Module 2: Secure Coding Practices
  {
    "slug": "devsecops-detect-hardcoded-credentials",
    "title": "Detect Hardcoded Credentials",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Read one source-code line. Print EXPOSED if it contains a case-insensitive assignment to password, secret, or api_key with a quoted nonempty literal (spaces around '=' allowed). Print SAFE otherwise. Only the first assignment in the line matters.",
    "problemStatement": "Detect Hardcoded Credentials\n\nRead one source-code line. Print EXPOSED if it contains a case-insensitive assignment to password, secret, or api_key with a quoted nonempty literal (spaces around '=' allowed). Print SAFE otherwise. Only the first assignment in the line matters.\n\nExample input:\npassword = \"demo123\"\n\nExample output:\nEXPOSED\n\nWrite a Python 3 program that reads standard input and prints only the required output. Analyze only simulated, offline DevSecOps data.",
    "inputFormat": "One source-code line.",
    "outputFormat": "EXPOSED or SAFE.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output; do not print prompts or debug information.",
      "Follow the exact matching, formatting, and invalid-input rules in the problem statement.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials, or networks."
    ],
    "skills": [
      "DevSecOps",
      "Secure Coding Practices",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Implement the required DevSecOps analysis.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "devsecops-identify-unsafe-input-handling",
    "title": "Identify Unsafe Input Handling",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Read one source-code line. Print UNSAFE if it contains the case-sensitive function call eval( or exec( after optional spaces between the function name and opening parenthesis; otherwise SAFE.",
    "problemStatement": "Identify Unsafe Input Handling\n\nRead one source-code line. Print UNSAFE if it contains the case-sensitive function call eval( or exec( after optional spaces between the function name and opening parenthesis; otherwise SAFE.\n\nExample input:\neval(user_input)\n\nExample output:\nUNSAFE\n\nWrite a Python 3 program that reads standard input and prints only the required output. Analyze only simulated, offline DevSecOps data.",
    "inputFormat": "One source-code line.",
    "outputFormat": "UNSAFE or SAFE.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output; do not print prompts or debug information.",
      "Follow the exact matching, formatting, and invalid-input rules in the problem statement.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials, or networks."
    ],
    "skills": [
      "DevSecOps",
      "Secure Coding Practices",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Implement the required DevSecOps analysis.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "devsecops-classify-code-vulnerability",
    "title": "Classify Code Vulnerability",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Given a vulnerability label (case-insensitive), map sql-injection => INJECTION, xss => SCRIPTING, path-traversal => FILE_ACCESS, insecure-deserialization => DESERIALIZATION; otherwise OTHER.",
    "problemStatement": "Classify Code Vulnerability\n\nGiven a vulnerability label (case-insensitive), map sql-injection => INJECTION, xss => SCRIPTING, path-traversal => FILE_ACCESS, insecure-deserialization => DESERIALIZATION; otherwise OTHER.\n\nExample input:\nxss\n\nExample output:\nSCRIPTING\n\nWrite a Python 3 program that reads standard input and prints only the required output. Analyze only simulated, offline DevSecOps data.",
    "inputFormat": "One vulnerability label.",
    "outputFormat": "INJECTION, SCRIPTING, FILE_ACCESS, DESERIALIZATION, or OTHER.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output; do not print prompts or debug information.",
      "Follow the exact matching, formatting, and invalid-input rules in the problem statement.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials, or networks."
    ],
    "skills": [
      "DevSecOps",
      "Secure Coding Practices",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Implement the required DevSecOps analysis.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  // Module 3: Dependency and Supply Chain Security
  {
    "slug": "devsecops-identify-vulnerable-dependency",
    "title": "Identify Vulnerable Dependency",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Read a package name and a nonnegative integer version number separated by a space. For simulated policies, requests versions below 3 and flask versions below 2 are VULNERABLE; all other known versions are SAFE; unknown package names are UNKNOWN; malformed input is INVALID. Package names are case-insensitive.",
    "problemStatement": "Identify Vulnerable Dependency\n\nRead a package name and a nonnegative integer version number separated by a space. For simulated policies, requests versions below 3 and flask versions below 2 are VULNERABLE; all other known versions are SAFE; unknown package names are UNKNOWN; malformed input is INVALID. Package names are case-insensitive.\n\nExample input:\nrequests 2\n\nExample output:\nVULNERABLE\n\nWrite a Python 3 program that reads standard input and prints only the required output. Analyze only simulated, offline DevSecOps data.",
    "inputFormat": "Package name and integer major version.",
    "outputFormat": "VULNERABLE, SAFE, UNKNOWN, or INVALID.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output; do not print prompts or debug information.",
      "Follow the exact matching, formatting, and invalid-input rules in the problem statement.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials, or networks."
    ],
    "skills": [
      "DevSecOps",
      "Dependency and Supply Chain Security",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Implement the required DevSecOps analysis.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "devsecops-validate-package-version-policy",
    "title": "Validate Package Version Policy",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Read a semantic version MAJOR.MINOR.PATCH consisting of three nonnegative integers. Print APPROVED if major >= 2 and minor <= 20, REJECTED otherwise; print INVALID for malformed input.",
    "problemStatement": "Validate Package Version Policy\n\nRead a semantic version MAJOR.MINOR.PATCH consisting of three nonnegative integers. Print APPROVED if major >= 2 and minor <= 20, REJECTED otherwise; print INVALID for malformed input.\n\nExample input:\n2.4.1\n\nExample output:\nAPPROVED\n\nWrite a Python 3 program that reads standard input and prints only the required output. Analyze only simulated, offline DevSecOps data.",
    "inputFormat": "One semantic version.",
    "outputFormat": "APPROVED, REJECTED, or INVALID.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output; do not print prompts or debug information.",
      "Follow the exact matching, formatting, and invalid-input rules in the problem statement.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials, or networks."
    ],
    "skills": [
      "DevSecOps",
      "Dependency and Supply Chain Security",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Implement the required DevSecOps analysis.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "devsecops-detect-untrusted-package-source",
    "title": "Detect Untrusted Package Source",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Given a package registry URL, print TRUSTED only when its lowercase hostname is exactly pypi.org or registry.npmjs.org and its scheme is https; otherwise UNTRUSTED. Invalid URLs are UNTRUSTED. Do not treat subdomains as exact matches.",
    "problemStatement": "Detect Untrusted Package Source\n\nGiven a package registry URL, print TRUSTED only when its lowercase hostname is exactly pypi.org or registry.npmjs.org and its scheme is https; otherwise UNTRUSTED. Invalid URLs are UNTRUSTED. Do not treat subdomains as exact matches.\n\nExample input:\nhttps://pypi.org/simple\n\nExample output:\nTRUSTED\n\nWrite a Python 3 program that reads standard input and prints only the required output. Analyze only simulated, offline DevSecOps data.",
    "inputFormat": "One URL.",
    "outputFormat": "TRUSTED or UNTRUSTED.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output; do not print prompts or debug information.",
      "Follow the exact matching, formatting, and invalid-input rules in the problem statement.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials, or networks."
    ],
    "skills": [
      "DevSecOps",
      "Dependency and Supply Chain Security",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Implement the required DevSecOps analysis.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  // Module 4: Secrets Management
  {
    "slug": "devsecops-detect-exposed-api-key",
    "title": "Detect Exposed API Key",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Read one line. Print EXPOSED if it contains the literal marker API_KEY= followed immediately by at least eight ASCII letters or digits; otherwise SAFE. The marker is case-sensitive.",
    "problemStatement": "Detect Exposed API Key\n\nRead one line. Print EXPOSED if it contains the literal marker API_KEY= followed immediately by at least eight ASCII letters or digits; otherwise SAFE. The marker is case-sensitive.\n\nExample input:\nAPI_KEY=ABC12345\n\nExample output:\nEXPOSED\n\nWrite a Python 3 program that reads standard input and prints only the required output. Analyze only simulated, offline DevSecOps data.",
    "inputFormat": "One text line.",
    "outputFormat": "EXPOSED or SAFE.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output; do not print prompts or debug information.",
      "Follow the exact matching, formatting, and invalid-input rules in the problem statement.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials, or networks."
    ],
    "skills": [
      "DevSecOps",
      "Secrets Management",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Implement the required DevSecOps analysis.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "devsecops-validate-secret-storage-policy",
    "title": "Validate Secret Storage Policy",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Given a secret storage location (case-insensitive), print APPROVED for vault, secret-manager, or encrypted-store; REJECTED for source-code, plaintext, or git; UNKNOWN otherwise.",
    "problemStatement": "Validate Secret Storage Policy\n\nGiven a secret storage location (case-insensitive), print APPROVED for vault, secret-manager, or encrypted-store; REJECTED for source-code, plaintext, or git; UNKNOWN otherwise.\n\nExample input:\nvault\n\nExample output:\nAPPROVED\n\nWrite a Python 3 program that reads standard input and prints only the required output. Analyze only simulated, offline DevSecOps data.",
    "inputFormat": "One storage location.",
    "outputFormat": "APPROVED, REJECTED, or UNKNOWN.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output; do not print prompts or debug information.",
      "Follow the exact matching, formatting, and invalid-input rules in the problem statement.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials, or networks."
    ],
    "skills": [
      "DevSecOps",
      "Secrets Management",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Implement the required DevSecOps analysis.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "devsecops-classify-sensitive-configuration",
    "title": "Classify Sensitive Configuration",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Given a configuration key (case-insensitive), print SECRET if it contains password, token, api_key, or private_key anywhere; otherwise PUBLIC.",
    "problemStatement": "Classify Sensitive Configuration\n\nGiven a configuration key (case-insensitive), print SECRET if it contains password, token, api_key, or private_key anywhere; otherwise PUBLIC.\n\nExample input:\nDATABASE_PASSWORD\n\nExample output:\nSECRET\n\nWrite a Python 3 program that reads standard input and prints only the required output. Analyze only simulated, offline DevSecOps data.",
    "inputFormat": "One configuration key.",
    "outputFormat": "SECRET or PUBLIC.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output; do not print prompts or debug information.",
      "Follow the exact matching, formatting, and invalid-input rules in the problem statement.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials, or networks."
    ],
    "skills": [
      "DevSecOps",
      "Secrets Management",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Implement the required DevSecOps analysis.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  // Module 5: CI/CD Pipeline Security
  {
    "slug": "devsecops-validate-secure-pipeline-stages",
    "title": "Validate Secure Pipeline Stages",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read comma-separated pipeline stages (case-insensitive, whitespace trimmed). Print SECURE only if build, test, scan, and deploy each occur at least once in that order (other stages may appear); otherwise INSECURE.",
    "problemStatement": "Validate Secure Pipeline Stages\n\nRead comma-separated pipeline stages (case-insensitive, whitespace trimmed). Print SECURE only if build, test, scan, and deploy each occur at least once in that order (other stages may appear); otherwise INSECURE.\n\nExample input:\nbuild,test,scan,deploy\n\nExample output:\nSECURE\n\nWrite a Python 3 program that reads standard input and prints only the required output. Analyze only simulated, offline DevSecOps data.",
    "inputFormat": "Comma-separated stage names.",
    "outputFormat": "SECURE or INSECURE.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output; do not print prompts or debug information.",
      "Follow the exact matching, formatting, and invalid-input rules in the problem statement.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials, or networks."
    ],
    "skills": [
      "DevSecOps",
      "CI/CD Pipeline Security",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 20,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Implement the required DevSecOps analysis.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "devsecops-detect-missing-security-scan",
    "title": "Detect Missing Security Scan",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read comma-separated CI pipeline stages. Print MISSING if neither sast nor dependency-scan appears (case-insensitive); otherwise PRESENT.",
    "problemStatement": "Detect Missing Security Scan\n\nRead comma-separated CI pipeline stages. Print MISSING if neither sast nor dependency-scan appears (case-insensitive); otherwise PRESENT.\n\nExample input:\nbuild,test,deploy\n\nExample output:\nMISSING\n\nWrite a Python 3 program that reads standard input and prints only the required output. Analyze only simulated, offline DevSecOps data.",
    "inputFormat": "Comma-separated stage names.",
    "outputFormat": "MISSING or PRESENT.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output; do not print prompts or debug information.",
      "Follow the exact matching, formatting, and invalid-input rules in the problem statement.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials, or networks."
    ],
    "skills": [
      "DevSecOps",
      "CI/CD Pipeline Security",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 20,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Implement the required DevSecOps analysis.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "devsecops-evaluate-pipeline-security-gate",
    "title": "Evaluate Pipeline Security Gate",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read two nonnegative integers: critical findings and high findings. Print BLOCK if critical > 0 or high > 2, PASS otherwise; INVALID for malformed or negative inputs.",
    "problemStatement": "Evaluate Pipeline Security Gate\n\nRead two nonnegative integers: critical findings and high findings. Print BLOCK if critical > 0 or high > 2, PASS otherwise; INVALID for malformed or negative inputs.\n\nExample input:\n0 2\n\nExample output:\nPASS\n\nWrite a Python 3 program that reads standard input and prints only the required output. Analyze only simulated, offline DevSecOps data.",
    "inputFormat": "Two space-separated nonnegative integers.",
    "outputFormat": "BLOCK, PASS, or INVALID.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output; do not print prompts or debug information.",
      "Follow the exact matching, formatting, and invalid-input rules in the problem statement.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials, or networks."
    ],
    "skills": [
      "DevSecOps",
      "CI/CD Pipeline Security",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 20,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Implement the required DevSecOps analysis.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  // Module 6: Static and Dynamic Security Testing
  {
    "slug": "devsecops-classify-sast-vs-dast",
    "title": "Classify SAST vs DAST",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Given a testing method (case-insensitive), print SAST for source-scan or static-analysis, DAST for running-app-scan or dynamic-analysis, and OTHER otherwise.",
    "problemStatement": "Classify SAST vs DAST\n\nGiven a testing method (case-insensitive), print SAST for source-scan or static-analysis, DAST for running-app-scan or dynamic-analysis, and OTHER otherwise.\n\nExample input:\nstatic-analysis\n\nExample output:\nSAST\n\nWrite a Python 3 program that reads standard input and prints only the required output. Analyze only simulated, offline DevSecOps data.",
    "inputFormat": "One testing method.",
    "outputFormat": "SAST, DAST, or OTHER.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output; do not print prompts or debug information.",
      "Follow the exact matching, formatting, and invalid-input rules in the problem statement.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials, or networks."
    ],
    "skills": [
      "DevSecOps",
      "Static and Dynamic Security Testing",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 20,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Implement the required DevSecOps analysis.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "devsecops-analyze-security-scan-findings",
    "title": "Analyze Security Scan Findings",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read one or more comma-separated severities. Count HIGH and CRITICAL entries (case-insensitive, whitespace trimmed); print their combined count. Empty entries and other severity names are ignored.",
    "problemStatement": "Analyze Security Scan Findings\n\nRead one or more comma-separated severities. Count HIGH and CRITICAL entries (case-insensitive, whitespace trimmed); print their combined count. Empty entries and other severity names are ignored.\n\nExample input:\nlow,high,critical,high\n\nExample output:\n3\n\nWrite a Python 3 program that reads standard input and prints only the required output. Analyze only simulated, offline DevSecOps data.",
    "inputFormat": "Comma-separated severity labels.",
    "outputFormat": "A nonnegative integer.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output; do not print prompts or debug information.",
      "Follow the exact matching, formatting, and invalid-input rules in the problem statement.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials, or networks."
    ],
    "skills": [
      "DevSecOps",
      "Static and Dynamic Security Testing",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 20,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Implement the required DevSecOps analysis.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "devsecops-prioritize-vulnerability-remediation",
    "title": "Prioritize Vulnerability Remediation",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read a severity and an exposure label separated by a space. Severity is critical, high, medium, or low; exposure is public or private (case-insensitive). Print P0 for critical/public, P1 for critical/private or high/public, P2 for high/private or medium/public, P3 for medium/private or low/public, P4 for low/private; INVALID otherwise.",
    "problemStatement": "Prioritize Vulnerability Remediation\n\nRead a severity and an exposure label separated by a space. Severity is critical, high, medium, or low; exposure is public or private (case-insensitive). Print P0 for critical/public, P1 for critical/private or high/public, P2 for high/private or medium/public, P3 for medium/private or low/public, P4 for low/private; INVALID otherwise.\n\nExample input:\nhigh public\n\nExample output:\nP1\n\nWrite a Python 3 program that reads standard input and prints only the required output. Analyze only simulated, offline DevSecOps data.",
    "inputFormat": "Severity and exposure.",
    "outputFormat": "P0, P1, P2, P3, P4, or INVALID.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output; do not print prompts or debug information.",
      "Follow the exact matching, formatting, and invalid-input rules in the problem statement.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials, or networks."
    ],
    "skills": [
      "DevSecOps",
      "Static and Dynamic Security Testing",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 20,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Implement the required DevSecOps analysis.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  // Module 7: Container Security
  {
    "slug": "devsecops-detect-insecure-dockerfile-instruction",
    "title": "Detect Insecure Dockerfile Instruction",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read one Dockerfile instruction line. Print INSECURE if it begins with USER root (case-insensitive, whitespace separated) or contains the case-insensitive text --privileged; otherwise SECURE.",
    "problemStatement": "Detect Insecure Dockerfile Instruction\n\nRead one Dockerfile instruction line. Print INSECURE if it begins with USER root (case-insensitive, whitespace separated) or contains the case-insensitive text --privileged; otherwise SECURE.\n\nExample input:\nUSER root\n\nExample output:\nINSECURE\n\nWrite a Python 3 program that reads standard input and prints only the required output. Analyze only simulated, offline DevSecOps data.",
    "inputFormat": "One Dockerfile instruction.",
    "outputFormat": "INSECURE or SECURE.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output; do not print prompts or debug information.",
      "Follow the exact matching, formatting, and invalid-input rules in the problem statement.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials, or networks."
    ],
    "skills": [
      "DevSecOps",
      "Container Security",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 20,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Implement the required DevSecOps analysis.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "devsecops-validate-container-image-policy",
    "title": "Validate Container Image Policy",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read an image reference. Print REJECTED if its tag is exactly latest or it has no tag and no digest; otherwise APPROVED. A tag is the text after the last colon occurring after the last slash; digest references containing @sha256: are APPROVED.",
    "problemStatement": "Validate Container Image Policy\n\nRead an image reference. Print REJECTED if its tag is exactly latest or it has no tag and no digest; otherwise APPROVED. A tag is the text after the last colon occurring after the last slash; digest references containing @sha256: are APPROVED.\n\nExample input:\npython:latest\n\nExample output:\nREJECTED\n\nWrite a Python 3 program that reads standard input and prints only the required output. Analyze only simulated, offline DevSecOps data.",
    "inputFormat": "One image reference.",
    "outputFormat": "APPROVED or REJECTED.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output; do not print prompts or debug information.",
      "Follow the exact matching, formatting, and invalid-input rules in the problem statement.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials, or networks."
    ],
    "skills": [
      "DevSecOps",
      "Container Security",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 20,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Implement the required DevSecOps analysis.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "devsecops-identify-container-misconfiguration",
    "title": "Identify Container Misconfiguration",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read three integers: privileged (0/1), readOnlyRootFilesystem (0/1), runAsNonRoot (0/1). Print MISCONFIGURED if privileged=1 or either of the latter two is 0; SECURE otherwise; INVALID for malformed input.",
    "problemStatement": "Identify Container Misconfiguration\n\nRead three integers: privileged (0/1), readOnlyRootFilesystem (0/1), runAsNonRoot (0/1). Print MISCONFIGURED if privileged=1 or either of the latter two is 0; SECURE otherwise; INVALID for malformed input.\n\nExample input:\n0 1 1\n\nExample output:\nSECURE\n\nWrite a Python 3 program that reads standard input and prints only the required output. Analyze only simulated, offline DevSecOps data.",
    "inputFormat": "Three binary integers.",
    "outputFormat": "MISCONFIGURED, SECURE, or INVALID.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output; do not print prompts or debug information.",
      "Follow the exact matching, formatting, and invalid-input rules in the problem statement.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials, or networks."
    ],
    "skills": [
      "DevSecOps",
      "Container Security",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 20,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Implement the required DevSecOps analysis.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  // Module 8: Infrastructure as Code Security
  {
    "slug": "devsecops-detect-insecure-terraform-configuration",
    "title": "Detect Insecure Terraform Configuration",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read a Terraform-like configuration line. Print INSECURE if it contains the exact CIDR 0.0.0.0/0 or the case-insensitive assignment public = true (optional spaces around '='), otherwise SECURE.",
    "problemStatement": "Detect Insecure Terraform Configuration\n\nRead a Terraform-like configuration line. Print INSECURE if it contains the exact CIDR 0.0.0.0/0 or the case-insensitive assignment public = true (optional spaces around '='), otherwise SECURE.\n\nExample input:\ncidr_blocks = [\"0.0.0.0/0\"]\n\nExample output:\nINSECURE\n\nWrite a Python 3 program that reads standard input and prints only the required output. Analyze only simulated, offline DevSecOps data.",
    "inputFormat": "One configuration line.",
    "outputFormat": "INSECURE or SECURE.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output; do not print prompts or debug information.",
      "Follow the exact matching, formatting, and invalid-input rules in the problem statement.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials, or networks."
    ],
    "skills": [
      "DevSecOps",
      "Infrastructure as Code Security",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 20,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Implement the required DevSecOps analysis.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "devsecops-validate-iac-security-baseline",
    "title": "Validate IaC Security Baseline",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read three binary integers representing encryptionEnabled, loggingEnabled, and publicAccessDisabled. Print COMPLIANT if all are 1, NON_COMPLIANT otherwise; INVALID for malformed input.",
    "problemStatement": "Validate IaC Security Baseline\n\nRead three binary integers representing encryptionEnabled, loggingEnabled, and publicAccessDisabled. Print COMPLIANT if all are 1, NON_COMPLIANT otherwise; INVALID for malformed input.\n\nExample input:\n1 1 1\n\nExample output:\nCOMPLIANT\n\nWrite a Python 3 program that reads standard input and prints only the required output. Analyze only simulated, offline DevSecOps data.",
    "inputFormat": "Three binary integers.",
    "outputFormat": "COMPLIANT, NON_COMPLIANT, or INVALID.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output; do not print prompts or debug information.",
      "Follow the exact matching, formatting, and invalid-input rules in the problem statement.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials, or networks."
    ],
    "skills": [
      "DevSecOps",
      "Infrastructure as Code Security",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 20,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Implement the required DevSecOps analysis.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "devsecops-identify-public-resource-exposure",
    "title": "Identify Public Resource Exposure",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read a resource type and a visibility value (case-insensitive). Print EXPOSED if visibility is public and type is bucket, database, or vm; PRIVATE if visibility is private for one of those types; UNKNOWN otherwise.",
    "problemStatement": "Identify Public Resource Exposure\n\nRead a resource type and a visibility value (case-insensitive). Print EXPOSED if visibility is public and type is bucket, database, or vm; PRIVATE if visibility is private for one of those types; UNKNOWN otherwise.\n\nExample input:\nbucket public\n\nExample output:\nEXPOSED\n\nWrite a Python 3 program that reads standard input and prints only the required output. Analyze only simulated, offline DevSecOps data.",
    "inputFormat": "Resource type and visibility.",
    "outputFormat": "EXPOSED, PRIVATE, or UNKNOWN.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output; do not print prompts or debug information.",
      "Follow the exact matching, formatting, and invalid-input rules in the problem statement.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials, or networks."
    ],
    "skills": [
      "DevSecOps",
      "Infrastructure as Code Security",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 20,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Implement the required DevSecOps analysis.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  // Module 9: Kubernetes and Deployment Security
  {
    "slug": "devsecops-detect-privileged-pod-configuration",
    "title": "Detect Privileged Pod Configuration",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Read a Kubernetes-like configuration line. Print PRIVILEGED if it contains privileged: true (case-insensitive, optional spaces), otherwise RESTRICTED.",
    "problemStatement": "Detect Privileged Pod Configuration\n\nRead a Kubernetes-like configuration line. Print PRIVILEGED if it contains privileged: true (case-insensitive, optional spaces), otherwise RESTRICTED.\n\nExample input:\nprivileged: true\n\nExample output:\nPRIVILEGED\n\nWrite a Python 3 program that reads standard input and prints only the required output. Analyze only simulated, offline DevSecOps data.",
    "inputFormat": "One manifest line.",
    "outputFormat": "PRIVILEGED or RESTRICTED.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output; do not print prompts or debug information.",
      "Follow the exact matching, formatting, and invalid-input rules in the problem statement.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials, or networks."
    ],
    "skills": [
      "DevSecOps",
      "Kubernetes and Deployment Security",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 30,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Implement the required DevSecOps analysis.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "devsecops-validate-deployment-security-policy",
    "title": "Validate Deployment Security Policy",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Read three binary integers: signedImage, approvedRegistry, scanPassed. Print ALLOW if all are 1; DENY otherwise; INVALID if any is not 0 or 1 or input is malformed.",
    "problemStatement": "Validate Deployment Security Policy\n\nRead three binary integers: signedImage, approvedRegistry, scanPassed. Print ALLOW if all are 1; DENY otherwise; INVALID if any is not 0 or 1 or input is malformed.\n\nExample input:\n1 1 0\n\nExample output:\nDENY\n\nWrite a Python 3 program that reads standard input and prints only the required output. Analyze only simulated, offline DevSecOps data.",
    "inputFormat": "Three binary integers.",
    "outputFormat": "ALLOW, DENY, or INVALID.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output; do not print prompts or debug information.",
      "Follow the exact matching, formatting, and invalid-input rules in the problem statement.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials, or networks."
    ],
    "skills": [
      "DevSecOps",
      "Kubernetes and Deployment Security",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 30,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Implement the required DevSecOps analysis.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "devsecops-check-kubernetes-security-context",
    "title": "Check Kubernetes Security Context",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Read two binary integers: runAsNonRoot and allowPrivilegeEscalation. Print SECURE only for 1 0; INSECURE for other valid pairs; INVALID otherwise.",
    "problemStatement": "Check Kubernetes Security Context\n\nRead two binary integers: runAsNonRoot and allowPrivilegeEscalation. Print SECURE only for 1 0; INSECURE for other valid pairs; INVALID otherwise.\n\nExample input:\n1 0\n\nExample output:\nSECURE\n\nWrite a Python 3 program that reads standard input and prints only the required output. Analyze only simulated, offline DevSecOps data.",
    "inputFormat": "Two binary integers.",
    "outputFormat": "SECURE, INSECURE, or INVALID.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output; do not print prompts or debug information.",
      "Follow the exact matching, formatting, and invalid-input rules in the problem statement.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials, or networks."
    ],
    "skills": [
      "DevSecOps",
      "Kubernetes and Deployment Security",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 30,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Implement the required DevSecOps analysis.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  // Module 10: DevSecOps Compliance and Monitoring
  {
    "slug": "devsecops-evaluate-security-compliance-controls",
    "title": "Evaluate Security Compliance Controls",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Read four binary integers representing MFA, auditLogging, encryption, and vulnerabilityScanning. Print COMPLIANT if all are 1, PARTIAL if at least two are 1, NON_COMPLIANT otherwise; INVALID for malformed input.",
    "problemStatement": "Evaluate Security Compliance Controls\n\nRead four binary integers representing MFA, auditLogging, encryption, and vulnerabilityScanning. Print COMPLIANT if all are 1, PARTIAL if at least two are 1, NON_COMPLIANT otherwise; INVALID for malformed input.\n\nExample input:\n1 1 0 1\n\nExample output:\nPARTIAL\n\nWrite a Python 3 program that reads standard input and prints only the required output. Analyze only simulated, offline DevSecOps data.",
    "inputFormat": "Four binary integers.",
    "outputFormat": "COMPLIANT, PARTIAL, NON_COMPLIANT, or INVALID.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output; do not print prompts or debug information.",
      "Follow the exact matching, formatting, and invalid-input rules in the problem statement.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials, or networks."
    ],
    "skills": [
      "DevSecOps",
      "DevSecOps Compliance and Monitoring",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 30,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Implement the required DevSecOps analysis.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "devsecops-classify-security-incident-severity",
    "title": "Classify Security Incident Severity",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Read two nonnegative integers: affectedSystems and exposedRecords. Print CRITICAL if exposedRecords >= 1000 or affectedSystems >= 50; HIGH if exposedRecords >= 100 or affectedSystems >= 10; MEDIUM if either count is positive; LOW if both are zero; INVALID for malformed input.",
    "problemStatement": "Classify Security Incident Severity\n\nRead two nonnegative integers: affectedSystems and exposedRecords. Print CRITICAL if exposedRecords >= 1000 or affectedSystems >= 50; HIGH if exposedRecords >= 100 or affectedSystems >= 10; MEDIUM if either count is positive; LOW if both are zero; INVALID for malformed input.\n\nExample input:\n12 0\n\nExample output:\nHIGH\n\nWrite a Python 3 program that reads standard input and prints only the required output. Analyze only simulated, offline DevSecOps data.",
    "inputFormat": "Two nonnegative integers.",
    "outputFormat": "CRITICAL, HIGH, MEDIUM, LOW, or INVALID.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output; do not print prompts or debug information.",
      "Follow the exact matching, formatting, and invalid-input rules in the problem statement.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials, or networks."
    ],
    "skills": [
      "DevSecOps",
      "DevSecOps Compliance and Monitoring",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 30,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Implement the required DevSecOps analysis.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "devsecops-generate-devsecops-security-report",
    "title": "Generate DevSecOps Security Report",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Read three comma-separated values: pipeline ID, critical findings, high findings. Both counts must be nonnegative integers and ID must be nonempty. Print PIPELINE=<id>;CRITICAL=<n>;HIGH=<n>;STATUS=BLOCKED if critical > 0 or high > 2, otherwise STATUS=PASSED. Print INVALID for malformed input.",
    "problemStatement": "Generate DevSecOps Security Report\n\nRead three comma-separated values: pipeline ID, critical findings, high findings. Both counts must be nonnegative integers and ID must be nonempty. Print PIPELINE=<id>;CRITICAL=<n>;HIGH=<n>;STATUS=BLOCKED if critical > 0 or high > 2, otherwise STATUS=PASSED. Print INVALID for malformed input.\n\nExample input:\nbuild-17,0,2\n\nExample output:\nPIPELINE=build-17;CRITICAL=0;HIGH=2;STATUS=PASSED\n\nWrite a Python 3 program that reads standard input and prints only the required output. Analyze only simulated, offline DevSecOps data.",
    "inputFormat": "Comma-separated pipeline ID and two counts.",
    "outputFormat": "Formatted report or INVALID.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output; do not print prompts or debug information.",
      "Follow the exact matching, formatting, and invalid-input rules in the problem statement.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials, or networks."
    ],
    "skills": [
      "DevSecOps",
      "DevSecOps Compliance and Monitoring",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 30,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Implement the required DevSecOps analysis.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
];
