import type { PracticeProblem } from './types';

/**
 * Cybersecurity > Penetration Testing
 * 30 offline Python 3 exercises across 10 roadmap modules.
 * Backend hidden test cases/validators are implemented separately.
 */
export const penetrationTestingProblems: PracticeProblem[] = [
  {
    "slug": "penetration-testing-validate-target-scope",
    "title": "Validate Authorized Target Scope",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Use ipaddress; malformed networks or addresses must produce OUT_OF_SCOPE.",
    "problemStatement": "Validate Authorized Target Scope\n\nUse ipaddress; malformed networks or addresses must produce OUT_OF_SCOPE.\n\nExample input:\n192.168.1.0/24,10.0.0.0/8\n192.168.1.12\n\nExample output:\nIN_SCOPE\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only provided offline or simulated data; do not make external network requests.",
    "inputFormat": "Line 1: comma-separated allowed IPv4 CIDR networks. Line 2: candidate IPv4 address.",
    "outputFormat": "IN_SCOPE or OUT_OF_SCOPE.",
    "constraints": [
      "Use Python 3 and standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Do not make external network requests or execute attacks.",
      "Handle the specified invalid inputs and boundary cases.",
      "Do not hard-code the example output."
    ],
    "skills": [
      "Penetration Testing",
      "Fundamentals",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "penetration-testing-classify-testing-phase",
    "title": "Classify Penetration Testing Phases",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Compare the trimmed keyword case-insensitively.",
    "problemStatement": "Classify Penetration Testing Phases\n\nCompare the trimmed keyword case-insensitively.\n\nExample input:\nscan\n\nExample output:\nDISCOVERY\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only provided offline or simulated data; do not make external network requests.",
    "inputFormat": "One phase keyword: scope, recon, scan, assess, verify, report, or another word.",
    "outputFormat": "Print PLANNING for scope; DISCOVERY for recon or scan; ASSESSMENT for assess or verify; REPORTING for report; otherwise UNKNOWN.",
    "constraints": [
      "Use Python 3 and standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Do not make external network requests or execute attacks.",
      "Handle the specified invalid inputs and boundary cases.",
      "Do not hard-code the example output."
    ],
    "skills": [
      "Penetration Testing",
      "Fundamentals",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "penetration-testing-rules-of-engagement",
    "title": "Build a Rules of Engagement Checklist",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Malformed JSON must produce INCOMPLETE. Do not perform any scanning.",
    "problemStatement": "Build a Rules of Engagement Checklist\n\nMalformed JSON must produce INCOMPLETE. Do not perform any scanning.\n\nExample input:\n{\"authorization\":true,\"scope\":[\"10.0.0.0/24\"],\"window\":\"09:00-17:00\",\"contacts\":[\"owner\"],\"exclusions\":[]}\n\nExample output:\nREADY\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only provided offline or simulated data; do not make external network requests.",
    "inputFormat": "One JSON object with keys authorization (boolean), scope (nonempty list), window (nonempty string), contacts (nonempty list), and exclusions (list).",
    "outputFormat": "READY if all keys have the stated types and authorization is true; otherwise INCOMPLETE.",
    "constraints": [
      "Use Python 3 and standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Do not make external network requests or execute attacks.",
      "Handle the specified invalid inputs and boundary cases.",
      "Do not hard-code the example output."
    ],
    "skills": [
      "Penetration Testing",
      "Fundamentals",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "penetration-testing-extract-domains",
    "title": "Extract Domains from Reconnaissance Data",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Valid names have at least two dot-separated labels, each 1–63 ASCII letters/digits/hyphens, no leading/trailing hyphen.",
    "problemStatement": "Extract Domains from Reconnaissance Data\n\nValid names have at least two dot-separated labels, each 1–63 ASCII letters/digits/hyphens, no leading/trailing hyphen.\n\nExample input:\nExample.COM,invalid_domain,api.example.com,example.com\n\nExample output:\napi.example.com\nexample.com\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only provided offline or simulated data; do not make external network requests.",
    "inputFormat": "One line of comma-separated candidate domain names.",
    "outputFormat": "Print valid lowercased domain names, sorted and unique, one per line; print NONE if none.",
    "constraints": [
      "Use Python 3 and standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Do not make external network requests or execute attacks.",
      "Handle the specified invalid inputs and boundary cases.",
      "Do not hard-code the example output."
    ],
    "skills": [
      "Penetration Testing",
      "Reconnaissance",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "penetration-testing-analyze-dns-records",
    "title": "Analyze DNS Records from a File",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Count recognized types case-insensitively; ignore unknown types. Data is synthetic.",
    "problemStatement": "Analyze DNS Records from a File\n\nCount recognized types case-insensitively; ignore unknown types. Data is synthetic.\n\nExample input:\n4\nA 192.0.2.1\nMX mail.example\nA 192.0.2.2\nTXT sample\n\nExample output:\nA=2 AAAA=0 CNAME=0 MX=1\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only provided offline or simulated data; do not make external network requests.",
    "inputFormat": "First line N; next N lines each contain TYPE VALUE (A, AAAA, CNAME, MX, or other).",
    "outputFormat": "Print counts as A=x AAAA=y CNAME=z MX=w.",
    "constraints": [
      "Use Python 3 and standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Do not make external network requests or execute attacks.",
      "Handle the specified invalid inputs and boundary cases.",
      "Do not hard-code the example output."
    ],
    "skills": [
      "Penetration Testing",
      "Reconnaissance",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "penetration-testing-passive-asset-inventory",
    "title": "Generate a Passive Asset Inventory",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Ignore rows without exactly three fields or a valid IPv4 address. Do not query hosts.",
    "problemStatement": "Generate a Passive Asset Inventory\n\nIgnore rows without exactly three fields or a valid IPv4 address. Do not query hosts.\n\nExample input:\n3\nweb.example.com,192.0.2.1,IT\napi.example.com,192.0.2.2,IT\nweb.example.com,192.0.2.1,IT\n\nExample output:\napi.example.com\nweb.example.com\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only provided offline or simulated data; do not make external network requests.",
    "inputFormat": "First line N; next N lines HOST,IP,OWNER in CSV format.",
    "outputFormat": "Print distinct valid HOST values lowercased in sorted order, one per line; NONE if empty.",
    "constraints": [
      "Use Python 3 and standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Do not make external network requests or execute attacks.",
      "Handle the specified invalid inputs and boundary cases.",
      "Do not hard-code the example output."
    ],
    "skills": [
      "Penetration Testing",
      "Reconnaissance",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "penetration-testing-identify-services",
    "title": "Identify Common Network Services",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Do not connect to any service.",
    "problemStatement": "Identify Common Network Services\n\nDo not connect to any service.\n\nExample input:\n443\n\nExample output:\nHTTPS\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only provided offline or simulated data; do not make external network requests.",
    "inputFormat": "One integer TCP port.",
    "outputFormat": "Print SSH for 22, HTTP for 80, HTTPS for 443, DNS for 53, SMTP for 25; otherwise UNKNOWN.",
    "constraints": [
      "Use Python 3 and standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Do not make external network requests or execute attacks.",
      "Handle the specified invalid inputs and boundary cases.",
      "Do not hard-code the example output."
    ],
    "skills": [
      "Penetration Testing",
      "Scanning",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "penetration-testing-parse-nmap-output",
    "title": "Parse Nmap Scan Output",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Only include rows with exact state open and protocol tcp; input is saved mock scan text.",
    "problemStatement": "Parse Nmap Scan Output\n\nOnly include rows with exact state open and protocol tcp; input is saved mock scan text.\n\nExample input:\n4\n22/tcp open ssh\n80/tcp closed http\n443/tcp open https\n22/tcp open ssh\n\nExample output:\n22 443\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only provided offline or simulated data; do not make external network requests.",
    "inputFormat": "First line N; next N lines formatted PORT/PROTOCOL STATE SERVICE (example 22/tcp open ssh).",
    "outputFormat": "Print sorted unique open TCP port numbers separated by spaces, or NONE.",
    "constraints": [
      "Use Python 3 and standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Do not make external network requests or execute attacks.",
      "Handle the specified invalid inputs and boundary cases.",
      "Do not hard-code the example output."
    ],
    "skills": [
      "Penetration Testing",
      "Scanning",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "penetration-testing-detect-unexpected-ports",
    "title": "Detect Unexpected Open Ports",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Ignore malformed or out-of-range port values (valid: 1–65535).",
    "problemStatement": "Detect Unexpected Open Ports\n\nIgnore malformed or out-of-range port values (valid: 1–65535).\n\nExample input:\n22,80,443\n22,443,8080,9000\n\nExample output:\n8080 9000\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only provided offline or simulated data; do not make external network requests.",
    "inputFormat": "Line 1: comma-separated allowed ports. Line 2: comma-separated observed open ports.",
    "outputFormat": "Print sorted unexpected ports separated by spaces, or NONE.",
    "constraints": [
      "Use Python 3 and standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Do not make external network requests or execute attacks.",
      "Handle the specified invalid inputs and boundary cases.",
      "Do not hard-code the example output."
    ],
    "skills": [
      "Penetration Testing",
      "Scanning",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 40,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "penetration-testing-classify-cvss",
    "title": "Classify CVSS Severity",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Use numeric comparisons; reject NaN and infinity.",
    "problemStatement": "Classify CVSS Severity\n\nUse numeric comparisons; reject NaN and infinity.\n\nExample input:\n9.8\n\nExample output:\nCRITICAL\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only provided offline or simulated data; do not make external network requests.",
    "inputFormat": "One decimal CVSS score from 0 to 10.",
    "outputFormat": "NONE for 0; LOW for 0.1–3.9; MEDIUM for 4.0–6.9; HIGH for 7.0–8.9; CRITICAL for 9.0–10.0; INVALID otherwise.",
    "constraints": [
      "Use Python 3 and standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Do not make external network requests or execute attacks.",
      "Handle the specified invalid inputs and boundary cases.",
      "Do not hard-code the example output."
    ],
    "skills": [
      "Penetration Testing",
      "Vulnerability Assessment",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "penetration-testing-prioritize-vulnerabilities",
    "title": "Prioritize Vulnerability Findings",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Skip invalid scores and empty IDs.",
    "problemStatement": "Prioritize Vulnerability Findings\n\nSkip invalid scores and empty IDs.\n\nExample input:\n3\nV-3,5.0\nV-1,9.8\nV-2,9.8\n\nExample output:\nV-1\nV-2\nV-3\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only provided offline or simulated data; do not make external network requests.",
    "inputFormat": "First line N; next N lines ID,SCORE where SCORE is CVSS 0–10.",
    "outputFormat": "Print IDs sorted by descending score, then ascending ID; one per line; NONE if no valid rows.",
    "constraints": [
      "Use Python 3 and standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Do not make external network requests or execute attacks.",
      "Handle the specified invalid inputs and boundary cases.",
      "Do not hard-code the example output."
    ],
    "skills": [
      "Penetration Testing",
      "Vulnerability Assessment",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "penetration-testing-correlate-findings",
    "title": "Correlate Vulnerability Scan Results",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Only accept scores from 0 through 10; ignore malformed records.",
    "problemStatement": "Correlate Vulnerability Scan Results\n\nOnly accept scores from 0 through 10; ignore malformed records.\n\nExample input:\n3\nweb,CVE-2026-0001,5.0\nweb,CVE-2026-0001,7.2\napi,CVE-2026-0002,4.0\n\nExample output:\napi,CVE-2026-0002,4.0\nweb,CVE-2026-0001,7.2\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only provided offline or simulated data; do not make external network requests.",
    "inputFormat": "First line N; next N lines HOST,CVE,SCORE.",
    "outputFormat": "Print unique HOST,CVE pairs with their maximum valid score, sorted by HOST then CVE; use one decimal place.",
    "constraints": [
      "Use Python 3 and standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Do not make external network requests or execute attacks.",
      "Handle the specified invalid inputs and boundary cases.",
      "Do not hard-code the example output."
    ],
    "skills": [
      "Penetration Testing",
      "Vulnerability Assessment",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 40,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "penetration-testing-inspect-http-headers",
    "title": "Inspect HTTP Security Headers",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Header matching is case-insensitive; inspect provided text only.",
    "problemStatement": "Inspect HTTP Security Headers\n\nHeader matching is case-insensitive; inspect provided text only.\n\nExample input:\n2\nContent-Security-Policy: default-src self\nX-Frame-Options: DENY\n\nExample output:\nstrict-transport-security\nx-content-type-options\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only provided offline or simulated data; do not make external network requests.",
    "inputFormat": "First line N; next N lines HEADER: VALUE.",
    "outputFormat": "Print sorted missing names from content-security-policy, strict-transport-security, x-content-type-options, x-frame-options, one per line; ALL_PRESENT if none.",
    "constraints": [
      "Use Python 3 and standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Do not make external network requests or execute attacks.",
      "Handle the specified invalid inputs and boundary cases.",
      "Do not hard-code the example output."
    ],
    "skills": [
      "Penetration Testing",
      "Web Testing",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "penetration-testing-detect-unsafe-input",
    "title": "Identify Unsafe Input Handling",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Use exact case-insensitive labels; this is a classification exercise, not an exploit.",
    "problemStatement": "Identify Unsafe Input Handling\n\nUse exact case-insensitive labels; this is a classification exercise, not an exploit.\n\nExample input:\nconcat-sql\n\nExample output:\nUNSAFE\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only provided offline or simulated data; do not make external network requests.",
    "inputFormat": "One line containing a simulated input-processing rule: concat-sql, raw-html, shell-string, parameterized-sql, escaped-html, or other.",
    "outputFormat": "UNSAFE for concat-sql, raw-html, shell-string; SAFE for parameterized-sql, escaped-html; UNKNOWN otherwise.",
    "constraints": [
      "Use Python 3 and standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Do not make external network requests or execute attacks.",
      "Handle the specified invalid inputs and boundary cases.",
      "Do not hard-code the example output."
    ],
    "skills": [
      "Penetration Testing",
      "Web Testing",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "penetration-testing-analyze-web-auth",
    "title": "Analyze Web Authentication Weaknesses",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Missing keys count as false; invalid JSON prints INVALID.",
    "problemStatement": "Analyze Web Authentication Weaknesses\n\nMissing keys count as false; invalid JSON prints INVALID.\n\nExample input:\n{\"mfa\":false,\"rate_limit\":true,\"secure_cookie\":false,\"http_only_cookie\":true}\n\nExample output:\nMFA,SECURE_COOKIE\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only provided offline or simulated data; do not make external network requests.",
    "inputFormat": "One JSON object with booleans mfa, rate_limit, secure_cookie, http_only_cookie.",
    "outputFormat": "Print missing protections in this fixed order: MFA, RATE_LIMIT, SECURE_COOKIE, HTTP_ONLY; separated by commas; SECURE if none.",
    "constraints": [
      "Use Python 3 and standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Do not make external network requests or execute attacks.",
      "Handle the specified invalid inputs and boundary cases.",
      "Do not hard-code the example output."
    ],
    "skills": [
      "Penetration Testing",
      "Web Testing",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 40,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "penetration-testing-validate-cidr",
    "title": "Validate IPv4 and CIDR Targets",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "IPv6 is invalid for this exercise.",
    "problemStatement": "Validate IPv4 and CIDR Targets\n\nIPv6 is invalid for this exercise.\n\nExample input:\n192.168.1.25/24\n\nExample output:\nVALID\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only provided offline or simulated data; do not make external network requests.",
    "inputFormat": "One IPv4 address or IPv4 CIDR network.",
    "outputFormat": "Print VALID if ipaddress.ip_network(value, strict=False) accepts IPv4; INVALID otherwise.",
    "constraints": [
      "Use Python 3 and standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Do not make external network requests or execute attacks.",
      "Handle the specified invalid inputs and boundary cases.",
      "Do not hard-code the example output."
    ],
    "skills": [
      "Penetration Testing",
      "Network Testing",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "penetration-testing-analyze-firewall-rules",
    "title": "Analyze Firewall Rule Exposure",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Ignore malformed records; count each matching rule.",
    "problemStatement": "Analyze Firewall Rule Exposure\n\nIgnore malformed records; count each matching rule.\n\nExample input:\n3\nANY,22,ALLOW\n10.0.0.0/8,443,ALLOW\nANY,80,DENY\n\nExample output:\n1\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only provided offline or simulated data; do not make external network requests.",
    "inputFormat": "First line N; next N lines SOURCE,PORT,ACTION where SOURCE is CIDR or ANY, PORT is integer, ACTION is ALLOW or DENY.",
    "outputFormat": "Print the number of ALLOW rules permitting ANY on ports 1–65535.",
    "constraints": [
      "Use Python 3 and standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Do not make external network requests or execute attacks.",
      "Handle the specified invalid inputs and boundary cases.",
      "Do not hard-code the example output."
    ],
    "skills": [
      "Penetration Testing",
      "Network Testing",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "penetration-testing-audit-segmentation",
    "title": "Audit Network Segmentation Policies",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Zone and action comparisons are case-insensitive; ignore malformed rows.",
    "problemStatement": "Audit Network Segmentation Policies\n\nZone and action comparisons are case-insensitive; ignore malformed rows.\n\nExample input:\n4\nGUEST,INTERNAL,ALLOW\nGUEST,INTERNET,ALLOW\nSTAFF,ADMIN,ALLOW\nGUEST,ADMIN,ALLOW\n\nExample output:\n2\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only provided offline or simulated data; do not make external network requests.",
    "inputFormat": "First line N; next N lines SOURCE_ZONE,DEST_ZONE,ACTION.",
    "outputFormat": "Print number of ALLOW rules from GUEST to INTERNAL or ADMIN.",
    "constraints": [
      "Use Python 3 and standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Do not make external network requests or execute attacks.",
      "Handle the specified invalid inputs and boundary cases.",
      "Do not hard-code the example output."
    ],
    "skills": [
      "Penetration Testing",
      "Network Testing",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 40,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "penetration-testing-password-policy",
    "title": "Validate Password Policy Compliance",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Spaces count toward length but not as special characters.",
    "problemStatement": "Validate Password Policy Compliance\n\nSpaces count toward length but not as special characters.\n\nExample input:\nExamplePass9!\n\nExample output:\nCOMPLIANT\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only provided offline or simulated data; do not make external network requests.",
    "inputFormat": "One password line.",
    "outputFormat": "COMPLIANT if at least 12 characters and contains uppercase, lowercase, digit, and one of !@#$%^&*; NON_COMPLIANT otherwise.",
    "constraints": [
      "Use Python 3 and standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Do not make external network requests or execute attacks.",
      "Handle the specified invalid inputs and boundary cases.",
      "Do not hard-code the example output."
    ],
    "skills": [
      "Penetration Testing",
      "Authentication",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "penetration-testing-detect-login-anomalies",
    "title": "Detect Suspicious Login Attempts",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Count provided synthetic logs only; do not attempt authentication.",
    "problemStatement": "Detect Suspicious Login Attempts\n\nCount provided synthetic logs only; do not attempt authentication.\n\nExample input:\n5\nalice,FAIL,192.0.2.1\nalice,FAIL,192.0.2.1\nbob,SUCCESS,192.0.2.2\nalice,FAIL,192.0.2.1\nbob,FAIL,192.0.2.2\n\nExample output:\nalice\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only provided offline or simulated data; do not make external network requests.",
    "inputFormat": "First line N; next N lines USER,STATUS,IP; STATUS is FAIL or SUCCESS.",
    "outputFormat": "Print sorted users with at least 3 FAIL events, one per line; NONE if no users qualify.",
    "constraints": [
      "Use Python 3 and standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Do not make external network requests or execute attacks.",
      "Handle the specified invalid inputs and boundary cases.",
      "Do not hard-code the example output."
    ],
    "skills": [
      "Penetration Testing",
      "Authentication",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "penetration-testing-audit-permissions",
    "title": "Identify Excessive User Permissions",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Compare role and permission case-insensitively.",
    "problemStatement": "Identify Excessive User Permissions\n\nCompare role and permission case-insensitively.\n\nExample input:\n3\nalice,viewer,read\nbob,viewer,write\ncarol,editor,write\n\nExample output:\nbob\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only provided offline or simulated data; do not make external network requests.",
    "inputFormat": "First line N; next N lines USER,ROLE,PERMISSION.",
    "outputFormat": "Print sorted unique USER values where ROLE is viewer and PERMISSION is write or admin; NONE if none.",
    "constraints": [
      "Use Python 3 and standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Do not make external network requests or execute attacks.",
      "Handle the specified invalid inputs and boundary cases.",
      "Do not hard-code the example output."
    ],
    "skills": [
      "Penetration Testing",
      "Authentication",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 40,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "penetration-testing-vulnerability-preconditions",
    "title": "Identify Vulnerability Preconditions",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Malformed JSON prints NOT_READY. This checks controlled lab prerequisites.",
    "problemStatement": "Identify Vulnerability Preconditions\n\nMalformed JSON prints NOT_READY. This checks controlled lab prerequisites.\n\nExample input:\n{\"authorized\":true,\"isolated\":true,\"patched_snapshot\":true,\"rollback_ready\":true}\n\nExample output:\nREADY\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only provided offline or simulated data; do not make external network requests.",
    "inputFormat": "One JSON object with booleans authorized, isolated, patched_snapshot, and rollback_ready.",
    "outputFormat": "READY only when all four are true; otherwise NOT_READY.",
    "constraints": [
      "Use Python 3 and standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Do not make external network requests or execute attacks.",
      "Handle the specified invalid inputs and boundary cases.",
      "Do not hard-code the example output."
    ],
    "skills": [
      "Penetration Testing",
      "Exploitation",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "penetration-testing-verify-simulated-vulnerability",
    "title": "Verify a Simulated Vulnerability",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Use only simulated evidence; malformed JSON prints NOT_VERIFIED.",
    "problemStatement": "Verify a Simulated Vulnerability\n\nUse only simulated evidence; malformed JSON prints NOT_VERIFIED.\n\nExample input:\n{\"expected\":\"ACCESS_DENIED\",\"observed\":\"ACCESS_DENIED\"}\n\nExample output:\nVERIFIED\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only provided offline or simulated data; do not make external network requests.",
    "inputFormat": "One JSON object with expected (string) and observed (string).",
    "outputFormat": "VERIFIED if both nonempty strings match exactly; NOT_VERIFIED otherwise.",
    "constraints": [
      "Use Python 3 and standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Do not make external network requests or execute attacks.",
      "Handle the specified invalid inputs and boundary cases.",
      "Do not hard-code the example output."
    ],
    "skills": [
      "Penetration Testing",
      "Exploitation",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "penetration-testing-analyze-exploitation-evidence",
    "title": "Analyze Controlled Exploitation Evidence",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Only classify supplied offline evidence; do not execute payloads.",
    "problemStatement": "Analyze Controlled Exploitation Evidence\n\nOnly classify supplied offline evidence; do not execute payloads.\n\nExample input:\n3\nT1,DENIED,ALLOWED,true\nT2,DENIED,DENIED,true\nT3,DENIED,ALLOWED,false\n\nExample output:\nT1\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only provided offline or simulated data; do not make external network requests.",
    "inputFormat": "First line N; next N lines TEST_ID,EXPECTED,OBSERVED,AUTHORIZED (true or false).",
    "outputFormat": "Print sorted unique TEST_ID values where AUTHORIZED is true and EXPECTED differs from OBSERVED; NONE if none.",
    "constraints": [
      "Use Python 3 and standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Do not make external network requests or execute attacks.",
      "Handle the specified invalid inputs and boundary cases.",
      "Do not hard-code the example output."
    ],
    "skills": [
      "Penetration Testing",
      "Exploitation",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 40,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "penetration-testing-format-finding",
    "title": "Format a Security Finding",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Trim surrounding whitespace from fields.",
    "problemStatement": "Format a Security Finding\n\nTrim surrounding whitespace from fields.\n\nExample input:\nF-1|high|Missing security header\n\nExample output:\n[HIGH] F-1: Missing security header\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only provided offline or simulated data; do not make external network requests.",
    "inputFormat": "One line ID|SEVERITY|TITLE.",
    "outputFormat": "Print [SEVERITY] ID: TITLE with severity uppercased; INVALID if any field is empty.",
    "constraints": [
      "Use Python 3 and standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Do not make external network requests or execute attacks.",
      "Handle the specified invalid inputs and boundary cases.",
      "Do not hard-code the example output."
    ],
    "skills": [
      "Penetration Testing",
      "Reporting",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "penetration-testing-vulnerability-summary",
    "title": "Generate a Vulnerability Summary",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Ignore unknown severities.",
    "problemStatement": "Generate a Vulnerability Summary\n\nIgnore unknown severities.\n\nExample input:\n5\nHIGH\nLOW\nHIGH\nCRITICAL\nUNKNOWN\n\nExample output:\nLOW=1 MEDIUM=0 HIGH=2 CRITICAL=1\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only provided offline or simulated data; do not make external network requests.",
    "inputFormat": "First line N; next N lines one of LOW, MEDIUM, HIGH, CRITICAL (case-insensitive).",
    "outputFormat": "Print LOW=x MEDIUM=y HIGH=z CRITICAL=w.",
    "constraints": [
      "Use Python 3 and standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Do not make external network requests or execute attacks.",
      "Handle the specified invalid inputs and boundary cases.",
      "Do not hard-code the example output."
    ],
    "skills": [
      "Penetration Testing",
      "Reporting",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "penetration-testing-remediation-plan",
    "title": "Create a Risk-Based Remediation Plan",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Accept scores 0–10; invalid rows ignored.",
    "problemStatement": "Create a Risk-Based Remediation Plan\n\nAccept scores 0–10; invalid rows ignored.\n\nExample input:\n3\nF1,6.0,no\nF2,5.0,yes\nF3,9.0,no\n\nExample output:\nF3\nF2\nF1\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only provided offline or simulated data; do not make external network requests.",
    "inputFormat": "First line N; next N lines ID,SCORE,EXPOSED where EXPOSED is yes or no.",
    "outputFormat": "Print IDs ordered by descending priority (score + 2 if exposed), then ID ascending; one per line; NONE if no valid findings.",
    "constraints": [
      "Use Python 3 and standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Do not make external network requests or execute attacks.",
      "Handle the specified invalid inputs and boundary cases.",
      "Do not hard-code the example output."
    ],
    "skills": [
      "Penetration Testing",
      "Reporting",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 40,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "penetration-testing-asset-audit",
    "title": "Build an Offline Asset Audit",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Count valid records and distinct nonempty hosts.",
    "problemStatement": "Build an Offline Asset Audit\n\nCount valid records and distinct nonempty hosts.\n\nExample input:\n3\nweb,IT,HIGH\napi,IT,MEDIUM\nweb,IT,HIGH\n\nExample output:\nHIGH=2 MEDIUM=1 LOW=0 UNIQUE_HOSTS=2\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only provided offline or simulated data; do not make external network requests.",
    "inputFormat": "First line N; next N lines HOST,OWNER,CRITICALITY where criticality is LOW, MEDIUM, or HIGH.",
    "outputFormat": "Print HIGH=x MEDIUM=y LOW=z UNIQUE_HOSTS=w.",
    "constraints": [
      "Use Python 3 and standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Do not make external network requests or execute attacks.",
      "Handle the specified invalid inputs and boundary cases.",
      "Do not hard-code the example output."
    ],
    "skills": [
      "Penetration Testing",
      "Projects",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "penetration-testing-simulated-assessment",
    "title": "Perform a Simulated Security Assessment",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "CRITICAL_OPEN counts OPEN findings with score >=9.0; ignore invalid scores.",
    "problemStatement": "Perform a Simulated Security Assessment\n\nCRITICAL_OPEN counts OPEN findings with score >=9.0; ignore invalid scores.\n\nExample input:\n3\nF1,9.8,OPEN\nF2,5.0,FIXED\nF3,7.2,OPEN\n\nExample output:\nOPEN=2 FIXED=1 CRITICAL_OPEN=1\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only provided offline or simulated data; do not make external network requests.",
    "inputFormat": "First line N; next N lines FINDING_ID,SCORE,STATUS where STATUS is OPEN or FIXED.",
    "outputFormat": "Print OPEN=x FIXED=y CRITICAL_OPEN=z.",
    "constraints": [
      "Use Python 3 and standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Do not make external network requests or execute attacks.",
      "Handle the specified invalid inputs and boundary cases.",
      "Do not hard-code the example output."
    ],
    "skills": [
      "Penetration Testing",
      "Projects",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 40,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "penetration-testing-complete-report",
    "title": "Generate a Complete Penetration Test Report",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Use supplied synthetic JSON only; no network operations.",
    "problemStatement": "Generate a Complete Penetration Test Report\n\nUse supplied synthetic JSON only; no network operations.\n\nExample input:\n{\"project\":\"Lab-A\",\"authorized\":true,\"findings\":[{\"severity\":\"HIGH\"},{\"severity\":\"LOW\"}]}\n\nExample output:\nPROJECT=Lab-A FINDINGS=2 HIGH_RISK=1\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only provided offline or simulated data; do not make external network requests.",
    "inputFormat": "One JSON object with project (string), authorized (boolean), findings (list of objects containing severity).",
    "outputFormat": "Print PROJECT=<name> FINDINGS=<n> HIGH_RISK=<k> where HIGH_RISK counts HIGH or CRITICAL; INVALID for missing/invalid fields or unauthorized project.",
    "constraints": [
      "Use Python 3 and standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Do not make external network requests or execute attacks.",
      "Handle the specified invalid inputs and boundary cases.",
      "Do not hard-code the example output."
    ],
    "skills": [
      "Penetration Testing",
      "Projects",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 40,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  }
];
