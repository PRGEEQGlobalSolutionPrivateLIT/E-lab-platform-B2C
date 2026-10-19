import type { PracticeProblem } from './types';

/**
 * Cybersecurity > Incident Response
 * 30 offline Python 3 exercises aligned with the 10 Incident Response roadmap modules.
 * Graded submissions require matching verified hidden test cases in the backend.
 */
export const incidentResponseProblems: PracticeProblem[] = [
  // Module 1: Incident Response Fundamentals
  {
    "slug": "incident-response-identify-incident-severity",
    "title": "Identify Incident Severity",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Read one severity label, case-insensitive: critical or sev1 => P1; high or sev2 => P2; medium or sev3 => P3; low or sev4 => P4; otherwise UNKNOWN.",
    "problemStatement": "Identify Incident Severity\n\nRead one severity label, case-insensitive: critical or sev1 => P1; high or sev2 => P2; medium or sev3 => P3; low or sev4 => P4; otherwise UNKNOWN.\n\nExample input:\ncritical\n\nExample output:\nP1\n\nWrite a Python 3 program that reads standard input and prints only the required output. Use only simulated offline incident-response data.",
    "inputFormat": "One severity label.",
    "outputFormat": "P1, P2, P3, P4, or UNKNOWN.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output without prompts or debugging text.",
      "Apply the specified matching, validation and formatting rules.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials or networks."
    ],
    "skills": [
      "Incident Response",
      "Incident Response Fundamentals",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the simulated incident-response input.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "incident-response-classify-security-event",
    "title": "Classify Security Event",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Read one event, case-insensitive: malware or ransomware => INCIDENT; phishing or suspicious-login => ALERT; patch or backup => ROUTINE; otherwise UNKNOWN.",
    "problemStatement": "Classify Security Event\n\nRead one event, case-insensitive: malware or ransomware => INCIDENT; phishing or suspicious-login => ALERT; patch or backup => ROUTINE; otherwise UNKNOWN.\n\nExample input:\nphishing\n\nExample output:\nALERT\n\nWrite a Python 3 program that reads standard input and prints only the required output. Use only simulated offline incident-response data.",
    "inputFormat": "One event name.",
    "outputFormat": "INCIDENT, ALERT, ROUTINE, or UNKNOWN.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output without prompts or debugging text.",
      "Apply the specified matching, validation and formatting rules.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials or networks."
    ],
    "skills": [
      "Incident Response",
      "Incident Response Fundamentals",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the simulated incident-response input.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "incident-response-identify-incident-response-phase",
    "title": "Identify Incident Response Phase",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Read one response activity, case-insensitive: prepare => PREPARATION; detect or analyze => ANALYSIS; contain => CONTAINMENT; eradicate => ERADICATION; recover => RECOVERY; review => LESSONS_LEARNED; otherwise UNKNOWN.",
    "problemStatement": "Identify Incident Response Phase\n\nRead one response activity, case-insensitive: prepare => PREPARATION; detect or analyze => ANALYSIS; contain => CONTAINMENT; eradicate => ERADICATION; recover => RECOVERY; review => LESSONS_LEARNED; otherwise UNKNOWN.\n\nExample input:\ncontain\n\nExample output:\nCONTAINMENT\n\nWrite a Python 3 program that reads standard input and prints only the required output. Use only simulated offline incident-response data.",
    "inputFormat": "One activity name.",
    "outputFormat": "A response phase or UNKNOWN.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output without prompts or debugging text.",
      "Apply the specified matching, validation and formatting rules.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials or networks."
    ],
    "skills": [
      "Incident Response",
      "Incident Response Fundamentals",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the simulated incident-response input.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  // Module 2: Incident Detection and Triage
  {
    "slug": "incident-response-classify-security-alert",
    "title": "Classify Security Alert",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Read a simulated alert type, case-insensitive: brute-force or credential-stuffing => AUTH; malware or trojan => MALWARE; port-scan or traffic-spike => NETWORK; otherwise OTHER.",
    "problemStatement": "Classify Security Alert\n\nRead a simulated alert type, case-insensitive: brute-force or credential-stuffing => AUTH; malware or trojan => MALWARE; port-scan or traffic-spike => NETWORK; otherwise OTHER.\n\nExample input:\nbrute-force\n\nExample output:\nAUTH\n\nWrite a Python 3 program that reads standard input and prints only the required output. Use only simulated offline incident-response data.",
    "inputFormat": "One alert type.",
    "outputFormat": "AUTH, MALWARE, NETWORK, or OTHER.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output without prompts or debugging text.",
      "Apply the specified matching, validation and formatting rules.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials or networks."
    ],
    "skills": [
      "Incident Response",
      "Incident Detection and Triage",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the simulated incident-response input.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "incident-response-prioritize-incident-ticket",
    "title": "Prioritize Incident Ticket",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read a comma-separated severity and affected user count. Severity is critical, high, medium or low (case-insensitive); user count is a nonnegative integer. Print URGENT if severity is critical or count >= 100; HIGH if severity is high or count >= 20; otherwise NORMAL. Print INVALID for malformed input.",
    "problemStatement": "Prioritize Incident Ticket\n\nRead a comma-separated severity and affected user count. Severity is critical, high, medium or low (case-insensitive); user count is a nonnegative integer. Print URGENT if severity is critical or count >= 100; HIGH if severity is high or count >= 20; otherwise NORMAL. Print INVALID for malformed input.\n\nExample input:\nmedium,25\n\nExample output:\nHIGH\n\nWrite a Python 3 program that reads standard input and prints only the required output. Use only simulated offline incident-response data.",
    "inputFormat": "severity,user_count",
    "outputFormat": "URGENT, HIGH, NORMAL, or INVALID.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output without prompts or debugging text.",
      "Apply the specified matching, validation and formatting rules.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials or networks."
    ],
    "skills": [
      "Incident Response",
      "Incident Detection and Triage",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 20,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the simulated incident-response input.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "incident-response-detect-suspicious-login-activity",
    "title": "Detect Suspicious Login Activity",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read a nonnegative integer failed-login count and a boolean new-country flag (yes/no), comma-separated. Print SUSPICIOUS if failures >= 5 or new-country is yes; otherwise NORMAL. Print INVALID for malformed input.",
    "problemStatement": "Detect Suspicious Login Activity\n\nRead a nonnegative integer failed-login count and a boolean new-country flag (yes/no), comma-separated. Print SUSPICIOUS if failures >= 5 or new-country is yes; otherwise NORMAL. Print INVALID for malformed input.\n\nExample input:\n6,no\n\nExample output:\nSUSPICIOUS\n\nWrite a Python 3 program that reads standard input and prints only the required output. Use only simulated offline incident-response data.",
    "inputFormat": "failed_logins,new_country",
    "outputFormat": "SUSPICIOUS, NORMAL, or INVALID.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output without prompts or debugging text.",
      "Apply the specified matching, validation and formatting rules.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials or networks."
    ],
    "skills": [
      "Incident Response",
      "Incident Detection and Triage",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 20,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the simulated incident-response input.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  // Module 3: Incident Analysis
  {
    "slug": "incident-response-analyze-authentication-logs",
    "title": "Analyze Authentication Logs",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read newline-separated authentication records formatted user,status, where status is SUCCESS or FAIL (case-insensitive). Ignore blank lines. Print FAILED=<count>;SUCCESS=<count>. Print INVALID if any nonblank record is malformed or there are no records.",
    "problemStatement": "Analyze Authentication Logs\n\nRead newline-separated authentication records formatted user,status, where status is SUCCESS or FAIL (case-insensitive). Ignore blank lines. Print FAILED=<count>;SUCCESS=<count>. Print INVALID if any nonblank record is malformed or there are no records.\n\nExample input:\nalice,FAIL\nbob,SUCCESS\nalice,FAIL\n\nExample output:\nFAILED=2;SUCCESS=1\n\nWrite a Python 3 program that reads standard input and prints only the required output. Use only simulated offline incident-response data.",
    "inputFormat": "One or more user,status records.",
    "outputFormat": "FAILED=<n>;SUCCESS=<n> or INVALID.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output without prompts or debugging text.",
      "Apply the specified matching, validation and formatting rules.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials or networks."
    ],
    "skills": [
      "Incident Response",
      "Incident Analysis",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 20,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the simulated incident-response input.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "incident-response-identify-indicators-of-compromise",
    "title": "Identify Indicators of Compromise",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read one indicator string. If it is an IPv4 address with four decimal octets in range 0..255, print IPV4; if it is a 64-character hexadecimal SHA-256 digest, print SHA256; if it begins with http:// or https:// and has a nonempty hostname, print URL; otherwise UNKNOWN.",
    "problemStatement": "Identify Indicators of Compromise\n\nRead one indicator string. If it is an IPv4 address with four decimal octets in range 0..255, print IPV4; if it is a 64-character hexadecimal SHA-256 digest, print SHA256; if it begins with http:// or https:// and has a nonempty hostname, print URL; otherwise UNKNOWN.\n\nExample input:\n192.0.2.15\n\nExample output:\nIPV4\n\nWrite a Python 3 program that reads standard input and prints only the required output. Use only simulated offline incident-response data.",
    "inputFormat": "One indicator string.",
    "outputFormat": "IPV4, SHA256, URL, or UNKNOWN.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output without prompts or debugging text.",
      "Apply the specified matching, validation and formatting rules.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials or networks."
    ],
    "skills": [
      "Incident Response",
      "Incident Analysis",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 20,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the simulated incident-response input.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "incident-response-correlate-security-events",
    "title": "Correlate Security Events",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Read newline-separated records formatted timestamp,user,event. Timestamp is an integer, event is FAIL or SUCCESS, and user is nonempty. Print CORRELATED if any user has at least three FAIL events within any inclusive 60-second window; otherwise NOT_CORRELATED. Print INVALID if there are no records or any record is malformed.",
    "problemStatement": "Correlate Security Events\n\nRead newline-separated records formatted timestamp,user,event. Timestamp is an integer, event is FAIL or SUCCESS, and user is nonempty. Print CORRELATED if any user has at least three FAIL events within any inclusive 60-second window; otherwise NOT_CORRELATED. Print INVALID if there are no records or any record is malformed.\n\nExample input:\n10,alice,FAIL\n30,alice,FAIL\n70,alice,FAIL\n\nExample output:\nCORRELATED\n\nWrite a Python 3 program that reads standard input and prints only the required output. Use only simulated offline incident-response data.",
    "inputFormat": "One or more timestamp,user,event records.",
    "outputFormat": "CORRELATED, NOT_CORRELATED, or INVALID.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output without prompts or debugging text.",
      "Apply the specified matching, validation and formatting rules.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials or networks."
    ],
    "skills": [
      "Incident Response",
      "Incident Analysis",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 30,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the simulated incident-response input.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  // Module 4: Incident Containment
  {
    "slug": "incident-response-select-containment-strategy",
    "title": "Select Containment Strategy",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Read one incident type, case-insensitive: ransomware => ISOLATE_HOST; compromised-account => DISABLE_ACCOUNT; malicious-domain => BLOCK_DOMAIN; otherwise INVESTIGATE.",
    "problemStatement": "Select Containment Strategy\n\nRead one incident type, case-insensitive: ransomware => ISOLATE_HOST; compromised-account => DISABLE_ACCOUNT; malicious-domain => BLOCK_DOMAIN; otherwise INVESTIGATE.\n\nExample input:\nransomware\n\nExample output:\nISOLATE_HOST\n\nWrite a Python 3 program that reads standard input and prints only the required output. Use only simulated offline incident-response data.",
    "inputFormat": "One incident type.",
    "outputFormat": "A containment action.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output without prompts or debugging text.",
      "Apply the specified matching, validation and formatting rules.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials or networks."
    ],
    "skills": [
      "Incident Response",
      "Incident Containment",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the simulated incident-response input.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "incident-response-identify-compromised-endpoint",
    "title": "Identify Compromised Endpoint",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read newline-separated endpoint records formatted host,infected, where infected is yes or no (case-insensitive). Print comma-separated infected host names sorted lexicographically, or NONE if none are infected. Print INVALID if there are no records, host names are empty, or flags are invalid.",
    "problemStatement": "Identify Compromised Endpoint\n\nRead newline-separated endpoint records formatted host,infected, where infected is yes or no (case-insensitive). Print comma-separated infected host names sorted lexicographically, or NONE if none are infected. Print INVALID if there are no records, host names are empty, or flags are invalid.\n\nExample input:\nhost-b,no\nhost-a,yes\n\nExample output:\nhost-a\n\nWrite a Python 3 program that reads standard input and prints only the required output. Use only simulated offline incident-response data.",
    "inputFormat": "One or more host,yes/no records.",
    "outputFormat": "Sorted comma-separated host names, NONE, or INVALID.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output without prompts or debugging text.",
      "Apply the specified matching, validation and formatting rules.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials or networks."
    ],
    "skills": [
      "Incident Response",
      "Incident Containment",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 20,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the simulated incident-response input.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "incident-response-validate-network-isolation-decision",
    "title": "Validate Network Isolation Decision",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read comma-separated incident severity and isolation decision. Severity is critical, high, medium, or low; decision is yes or no (case-insensitive). Isolation is required for critical or high. Print COMPLIANT when the decision matches the requirement, otherwise NON_COMPLIANT. Print INVALID for malformed input.",
    "problemStatement": "Validate Network Isolation Decision\n\nRead comma-separated incident severity and isolation decision. Severity is critical, high, medium, or low; decision is yes or no (case-insensitive). Isolation is required for critical or high. Print COMPLIANT when the decision matches the requirement, otherwise NON_COMPLIANT. Print INVALID for malformed input.\n\nExample input:\ncritical,yes\n\nExample output:\nCOMPLIANT\n\nWrite a Python 3 program that reads standard input and prints only the required output. Use only simulated offline incident-response data.",
    "inputFormat": "severity,yes/no",
    "outputFormat": "COMPLIANT, NON_COMPLIANT, or INVALID.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output without prompts or debugging text.",
      "Apply the specified matching, validation and formatting rules.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials or networks."
    ],
    "skills": [
      "Incident Response",
      "Incident Containment",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 20,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the simulated incident-response input.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  // Module 5: Evidence Collection and Preservation
  {
    "slug": "incident-response-classify-digital-evidence",
    "title": "Classify Digital Evidence",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Read one evidence type, case-insensitive: memory or ram => VOLATILE; disk or image => NON_VOLATILE; log or audit-trail => LOG; otherwise UNKNOWN.",
    "problemStatement": "Classify Digital Evidence\n\nRead one evidence type, case-insensitive: memory or ram => VOLATILE; disk or image => NON_VOLATILE; log or audit-trail => LOG; otherwise UNKNOWN.\n\nExample input:\nRAM\n\nExample output:\nVOLATILE\n\nWrite a Python 3 program that reads standard input and prints only the required output. Use only simulated offline incident-response data.",
    "inputFormat": "One evidence type.",
    "outputFormat": "VOLATILE, NON_VOLATILE, LOG, or UNKNOWN.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output without prompts or debugging text.",
      "Apply the specified matching, validation and formatting rules.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials or networks."
    ],
    "skills": [
      "Incident Response",
      "Evidence Collection and Preservation",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the simulated incident-response input.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "incident-response-validate-evidence-integrity",
    "title": "Validate Evidence Integrity",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read two comma-separated SHA-256 digests, each exactly 64 hexadecimal characters. Print MATCH if identical ignoring hexadecimal letter case; otherwise MISMATCH. Print INVALID if either digest is malformed.",
    "problemStatement": "Validate Evidence Integrity\n\nRead two comma-separated SHA-256 digests, each exactly 64 hexadecimal characters. Print MATCH if identical ignoring hexadecimal letter case; otherwise MISMATCH. Print INVALID if either digest is malformed.\n\nExample input:\naaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa,aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n\nExample output:\nMATCH\n\nWrite a Python 3 program that reads standard input and prints only the required output. Use only simulated offline incident-response data.",
    "inputFormat": "original_sha256,collected_sha256",
    "outputFormat": "MATCH, MISMATCH, or INVALID.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output without prompts or debugging text.",
      "Apply the specified matching, validation and formatting rules.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials or networks."
    ],
    "skills": [
      "Incident Response",
      "Evidence Collection and Preservation",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 20,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the simulated incident-response input.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "incident-response-verify-chain-of-custody",
    "title": "Verify Chain of Custody",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Read newline-separated custody records formatted timestamp,handler,action. Timestamp must be a nonnegative integer, handler and action must be nonempty. Print VALID if timestamps are nondecreasing; otherwise INVALID. Print INVALID if no records or any record is malformed.",
    "problemStatement": "Verify Chain of Custody\n\nRead newline-separated custody records formatted timestamp,handler,action. Timestamp must be a nonnegative integer, handler and action must be nonempty. Print VALID if timestamps are nondecreasing; otherwise INVALID. Print INVALID if no records or any record is malformed.\n\nExample input:\n10,analyst,COLLECT\n20,officer,TRANSFER\n\nExample output:\nVALID\n\nWrite a Python 3 program that reads standard input and prints only the required output. Use only simulated offline incident-response data.",
    "inputFormat": "One or more timestamp,handler,action records.",
    "outputFormat": "VALID or INVALID.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output without prompts or debugging text.",
      "Apply the specified matching, validation and formatting rules.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials or networks."
    ],
    "skills": [
      "Incident Response",
      "Evidence Collection and Preservation",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 30,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the simulated incident-response input.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  // Module 6: Threat Intelligence and IOC Analysis
  {
    "slug": "incident-response-classify-ioc-type",
    "title": "Classify IOC Type",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read one indicator, trim whitespace. Print IPV4 for valid dotted-decimal IPv4 addresses, SHA256 for exactly 64 hexadecimal characters, DOMAIN for domain names with at least one dot and only letters, digits and hyphens in labels (labels cannot start or end with hyphen), or UNKNOWN otherwise.",
    "problemStatement": "Classify IOC Type\n\nRead one indicator, trim whitespace. Print IPV4 for valid dotted-decimal IPv4 addresses, SHA256 for exactly 64 hexadecimal characters, DOMAIN for domain names with at least one dot and only letters, digits and hyphens in labels (labels cannot start or end with hyphen), or UNKNOWN otherwise.\n\nExample input:\nexample.org\n\nExample output:\nDOMAIN\n\nWrite a Python 3 program that reads standard input and prints only the required output. Use only simulated offline incident-response data.",
    "inputFormat": "One indicator string.",
    "outputFormat": "IPV4, SHA256, DOMAIN, or UNKNOWN.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output without prompts or debugging text.",
      "Apply the specified matching, validation and formatting rules.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials or networks."
    ],
    "skills": [
      "Incident Response",
      "Threat Intelligence and IOC Analysis",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 20,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the simulated incident-response input.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "incident-response-match-known-threat-indicators",
    "title": "Match Known Threat Indicators",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read a comma-separated candidate indicator followed by a pipe-separated list of known indicators. Compare case-insensitively after trimming whitespace. Print MATCH if candidate equals any nonempty list item; otherwise NO_MATCH. Print INVALID if candidate or list is empty.",
    "problemStatement": "Match Known Threat Indicators\n\nRead a comma-separated candidate indicator followed by a pipe-separated list of known indicators. Compare case-insensitively after trimming whitespace. Print MATCH if candidate equals any nonempty list item; otherwise NO_MATCH. Print INVALID if candidate or list is empty.\n\nExample input:\nbad.example,good.example|bad.example\n\nExample output:\nMATCH\n\nWrite a Python 3 program that reads standard input and prints only the required output. Use only simulated offline incident-response data.",
    "inputFormat": "candidate,known1|known2|...",
    "outputFormat": "MATCH, NO_MATCH, or INVALID.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output without prompts or debugging text.",
      "Apply the specified matching, validation and formatting rules.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials or networks."
    ],
    "skills": [
      "Incident Response",
      "Threat Intelligence and IOC Analysis",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 20,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the simulated incident-response input.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "incident-response-evaluate-threat-intelligence-confidence",
    "title": "Evaluate Threat Intelligence Confidence",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Read an integer confidence score from 0 to 100 inclusive. Print HIGH for scores >= 80, MEDIUM for >= 50, and LOW otherwise. Print INVALID for missing, noninteger or out-of-range input.",
    "problemStatement": "Evaluate Threat Intelligence Confidence\n\nRead an integer confidence score from 0 to 100 inclusive. Print HIGH for scores >= 80, MEDIUM for >= 50, and LOW otherwise. Print INVALID for missing, noninteger or out-of-range input.\n\nExample input:\n82\n\nExample output:\nHIGH\n\nWrite a Python 3 program that reads standard input and prints only the required output. Use only simulated offline incident-response data.",
    "inputFormat": "One confidence score.",
    "outputFormat": "HIGH, MEDIUM, LOW, or INVALID.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output without prompts or debugging text.",
      "Apply the specified matching, validation and formatting rules.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials or networks."
    ],
    "skills": [
      "Incident Response",
      "Threat Intelligence and IOC Analysis",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the simulated incident-response input.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  // Module 7: Malware Incident Handling
  {
    "slug": "incident-response-classify-malware-incident",
    "title": "Classify Malware Incident",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Read one malware type, case-insensitive: ransomware => ENCRYPTION; worm => PROPAGATION; trojan => DECEPTION; spyware => SURVEILLANCE; otherwise UNKNOWN.",
    "problemStatement": "Classify Malware Incident\n\nRead one malware type, case-insensitive: ransomware => ENCRYPTION; worm => PROPAGATION; trojan => DECEPTION; spyware => SURVEILLANCE; otherwise UNKNOWN.\n\nExample input:\nworm\n\nExample output:\nPROPAGATION\n\nWrite a Python 3 program that reads standard input and prints only the required output. Use only simulated offline incident-response data.",
    "inputFormat": "One malware type.",
    "outputFormat": "ENCRYPTION, PROPAGATION, DECEPTION, SURVEILLANCE, or UNKNOWN.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output without prompts or debugging text.",
      "Apply the specified matching, validation and formatting rules.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials or networks."
    ],
    "skills": [
      "Incident Response",
      "Malware Incident Handling",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the simulated incident-response input.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "incident-response-identify-suspicious-file-behavior",
    "title": "Identify Suspicious File Behavior",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read pipe-separated simulated file behaviors. If any token equals encrypt-files, print RANSOMWARE; else if any equals credential-theft, print STEALER; else if any equals persistence, print PERSISTENCE; otherwise UNKNOWN. Match tokens case-insensitively and trim whitespace.",
    "problemStatement": "Identify Suspicious File Behavior\n\nRead pipe-separated simulated file behaviors. If any token equals encrypt-files, print RANSOMWARE; else if any equals credential-theft, print STEALER; else if any equals persistence, print PERSISTENCE; otherwise UNKNOWN. Match tokens case-insensitively and trim whitespace.\n\nExample input:\npersistence|encrypt-files\n\nExample output:\nRANSOMWARE\n\nWrite a Python 3 program that reads standard input and prints only the required output. Use only simulated offline incident-response data.",
    "inputFormat": "Pipe-separated behavior tokens.",
    "outputFormat": "RANSOMWARE, STEALER, PERSISTENCE, or UNKNOWN.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output without prompts or debugging text.",
      "Apply the specified matching, validation and formatting rules.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials or networks."
    ],
    "skills": [
      "Incident Response",
      "Malware Incident Handling",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 20,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the simulated incident-response input.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "incident-response-prioritize-malware-response",
    "title": "Prioritize Malware Response",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read comma-separated malware spread count and data-encryption flag (yes/no). Spread count must be nonnegative. Print CRITICAL if encryption is yes or spread >= 10; HIGH if spread >= 3; otherwise LOW. Print INVALID for malformed input.",
    "problemStatement": "Prioritize Malware Response\n\nRead comma-separated malware spread count and data-encryption flag (yes/no). Spread count must be nonnegative. Print CRITICAL if encryption is yes or spread >= 10; HIGH if spread >= 3; otherwise LOW. Print INVALID for malformed input.\n\nExample input:\n4,no\n\nExample output:\nHIGH\n\nWrite a Python 3 program that reads standard input and prints only the required output. Use only simulated offline incident-response data.",
    "inputFormat": "infected_hosts,encrypted_yes_no",
    "outputFormat": "CRITICAL, HIGH, LOW, or INVALID.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output without prompts or debugging text.",
      "Apply the specified matching, validation and formatting rules.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials or networks."
    ],
    "skills": [
      "Incident Response",
      "Malware Incident Handling",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 20,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the simulated incident-response input.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  // Module 8: Eradication and Recovery
  {
    "slug": "incident-response-select-eradication-action",
    "title": "Select Eradication Action",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Read one root cause, case-insensitive: malicious-file => REMOVE_MALWARE; stolen-credential => RESET_CREDENTIALS; vulnerable-software => PATCH_SOFTWARE; otherwise INVESTIGATE.",
    "problemStatement": "Select Eradication Action\n\nRead one root cause, case-insensitive: malicious-file => REMOVE_MALWARE; stolen-credential => RESET_CREDENTIALS; vulnerable-software => PATCH_SOFTWARE; otherwise INVESTIGATE.\n\nExample input:\nvulnerable-software\n\nExample output:\nPATCH_SOFTWARE\n\nWrite a Python 3 program that reads standard input and prints only the required output. Use only simulated offline incident-response data.",
    "inputFormat": "One root cause.",
    "outputFormat": "An eradication action.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output without prompts or debugging text.",
      "Apply the specified matching, validation and formatting rules.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials or networks."
    ],
    "skills": [
      "Incident Response",
      "Eradication and Recovery",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the simulated incident-response input.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "incident-response-validate-system-recovery-status",
    "title": "Validate System Recovery Status",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read three comma-separated yes/no flags: clean_scan,patched,backup_verified. Print READY only when all three are yes; otherwise NOT_READY. Print INVALID if any flag is missing or invalid.",
    "problemStatement": "Validate System Recovery Status\n\nRead three comma-separated yes/no flags: clean_scan,patched,backup_verified. Print READY only when all three are yes; otherwise NOT_READY. Print INVALID if any flag is missing or invalid.\n\nExample input:\nyes,yes,yes\n\nExample output:\nREADY\n\nWrite a Python 3 program that reads standard input and prints only the required output. Use only simulated offline incident-response data.",
    "inputFormat": "clean_scan,patched,backup_verified",
    "outputFormat": "READY, NOT_READY, or INVALID.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output without prompts or debugging text.",
      "Apply the specified matching, validation and formatting rules.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials or networks."
    ],
    "skills": [
      "Incident Response",
      "Eradication and Recovery",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 20,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the simulated incident-response input.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "incident-response-check-post-incident-monitoring",
    "title": "Check Post-Incident Monitoring",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read newline-separated monitoring results, each PASS or FAIL (case-insensitive). Print STABLE if there are at least three results and all are PASS; otherwise MONITOR. Print INVALID if there are no results or any result is invalid.",
    "problemStatement": "Check Post-Incident Monitoring\n\nRead newline-separated monitoring results, each PASS or FAIL (case-insensitive). Print STABLE if there are at least three results and all are PASS; otherwise MONITOR. Print INVALID if there are no results or any result is invalid.\n\nExample input:\nPASS\nPASS\nPASS\n\nExample output:\nSTABLE\n\nWrite a Python 3 program that reads standard input and prints only the required output. Use only simulated offline incident-response data.",
    "inputFormat": "One result per line.",
    "outputFormat": "STABLE, MONITOR, or INVALID.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output without prompts or debugging text.",
      "Apply the specified matching, validation and formatting rules.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials or networks."
    ],
    "skills": [
      "Incident Response",
      "Eradication and Recovery",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 20,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the simulated incident-response input.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  // Module 9: Incident Communication and Escalation
  {
    "slug": "incident-response-determine-escalation-level",
    "title": "Determine Escalation Level",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read comma-separated severity and affected organizations count. Severity is critical, high, medium or low; count must be a nonnegative integer. Print EXECUTIVE if severity is critical or organizations >= 3; SECURITY_TEAM if severity is high or medium; otherwise LOCAL_TEAM. Print INVALID for malformed input.",
    "problemStatement": "Determine Escalation Level\n\nRead comma-separated severity and affected organizations count. Severity is critical, high, medium or low; count must be a nonnegative integer. Print EXECUTIVE if severity is critical or organizations >= 3; SECURITY_TEAM if severity is high or medium; otherwise LOCAL_TEAM. Print INVALID for malformed input.\n\nExample input:\ncritical,1\n\nExample output:\nEXECUTIVE\n\nWrite a Python 3 program that reads standard input and prints only the required output. Use only simulated offline incident-response data.",
    "inputFormat": "severity,organization_count",
    "outputFormat": "EXECUTIVE, SECURITY_TEAM, LOCAL_TEAM, or INVALID.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output without prompts or debugging text.",
      "Apply the specified matching, validation and formatting rules.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials or networks."
    ],
    "skills": [
      "Incident Response",
      "Incident Communication and Escalation",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 20,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the simulated incident-response input.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "incident-response-classify-notification-priority",
    "title": "Classify Notification Priority",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Read a nonnegative integer number of minutes until a required notification deadline. Print IMMEDIATE if <= 30, SOON if <= 120, otherwise SCHEDULED. Print INVALID for malformed input.",
    "problemStatement": "Classify Notification Priority\n\nRead a nonnegative integer number of minutes until a required notification deadline. Print IMMEDIATE if <= 30, SOON if <= 120, otherwise SCHEDULED. Print INVALID for malformed input.\n\nExample input:\n25\n\nExample output:\nIMMEDIATE\n\nWrite a Python 3 program that reads standard input and prints only the required output. Use only simulated offline incident-response data.",
    "inputFormat": "Minutes until deadline.",
    "outputFormat": "IMMEDIATE, SOON, SCHEDULED, or INVALID.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output without prompts or debugging text.",
      "Apply the specified matching, validation and formatting rules.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials or networks."
    ],
    "skills": [
      "Incident Response",
      "Incident Communication and Escalation",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the simulated incident-response input.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "incident-response-validate-incident-report-fields",
    "title": "Validate Incident Report Fields",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Read pipe-separated key=value report fields. Required keys are id, severity, summary and owner (case-insensitive). Values must be nonempty after trimming. Print COMPLETE if every required key is present with a nonempty value; otherwise INCOMPLETE. Print INVALID if any nonblank field lacks exactly one equals sign.",
    "problemStatement": "Validate Incident Report Fields\n\nRead pipe-separated key=value report fields. Required keys are id, severity, summary and owner (case-insensitive). Values must be nonempty after trimming. Print COMPLETE if every required key is present with a nonempty value; otherwise INCOMPLETE. Print INVALID if any nonblank field lacks exactly one equals sign.\n\nExample input:\nid=IR-1|severity=high|summary=phishing|owner=analyst\n\nExample output:\nCOMPLETE\n\nWrite a Python 3 program that reads standard input and prints only the required output. Use only simulated offline incident-response data.",
    "inputFormat": "Pipe-separated key=value fields.",
    "outputFormat": "COMPLETE, INCOMPLETE, or INVALID.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output without prompts or debugging text.",
      "Apply the specified matching, validation and formatting rules.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials or networks."
    ],
    "skills": [
      "Incident Response",
      "Incident Communication and Escalation",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 30,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the simulated incident-response input.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  // Module 10: Post-Incident Review and Improvement
  {
    "slug": "incident-response-identify-root-cause-category",
    "title": "Identify Root Cause Category",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Read one simulated root cause, case-insensitive: missing-patch => PATCH_MANAGEMENT; weak-password => IDENTITY; misconfiguration => CONFIGURATION; human-error => PROCESS; otherwise UNKNOWN.",
    "problemStatement": "Identify Root Cause Category\n\nRead one simulated root cause, case-insensitive: missing-patch => PATCH_MANAGEMENT; weak-password => IDENTITY; misconfiguration => CONFIGURATION; human-error => PROCESS; otherwise UNKNOWN.\n\nExample input:\nmissing-patch\n\nExample output:\nPATCH_MANAGEMENT\n\nWrite a Python 3 program that reads standard input and prints only the required output. Use only simulated offline incident-response data.",
    "inputFormat": "One root cause.",
    "outputFormat": "PATCH_MANAGEMENT, IDENTITY, CONFIGURATION, PROCESS, or UNKNOWN.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output without prompts or debugging text.",
      "Apply the specified matching, validation and formatting rules.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials or networks."
    ],
    "skills": [
      "Incident Response",
      "Post-Incident Review and Improvement",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the simulated incident-response input.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "incident-response-evaluate-response-effectiveness",
    "title": "Evaluate Response Effectiveness",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Read comma-separated nonnegative integers detection_minutes and containment_minutes. Print EXCELLENT if their sum <= 30, ACCEPTABLE if <= 120, otherwise NEEDS_IMPROVEMENT. Print INVALID for malformed input.",
    "problemStatement": "Evaluate Response Effectiveness\n\nRead comma-separated nonnegative integers detection_minutes and containment_minutes. Print EXCELLENT if their sum <= 30, ACCEPTABLE if <= 120, otherwise NEEDS_IMPROVEMENT. Print INVALID for malformed input.\n\nExample input:\n10,15\n\nExample output:\nEXCELLENT\n\nWrite a Python 3 program that reads standard input and prints only the required output. Use only simulated offline incident-response data.",
    "inputFormat": "detection_minutes,containment_minutes",
    "outputFormat": "EXCELLENT, ACCEPTABLE, NEEDS_IMPROVEMENT, or INVALID.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output without prompts or debugging text.",
      "Apply the specified matching, validation and formatting rules.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials or networks."
    ],
    "skills": [
      "Incident Response",
      "Post-Incident Review and Improvement",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 20,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the simulated incident-response input.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "incident-response-generate-incident-summary",
    "title": "Generate Incident Summary",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Read four comma-separated values: incident ID, severity, affected host count and status. ID must be nonempty, severity must be critical/high/medium/low, host count must be a nonnegative integer, and status must be open/contained/resolved (case-insensitive). Print ID=<id>;SEVERITY=<uppercase severity>;HOSTS=<count>;STATUS=<uppercase status>. Print INVALID for malformed input.",
    "problemStatement": "Generate Incident Summary\n\nRead four comma-separated values: incident ID, severity, affected host count and status. ID must be nonempty, severity must be critical/high/medium/low, host count must be a nonnegative integer, and status must be open/contained/resolved (case-insensitive). Print ID=<id>;SEVERITY=<uppercase severity>;HOSTS=<count>;STATUS=<uppercase status>. Print INVALID for malformed input.\n\nExample input:\nIR-17,high,3,contained\n\nExample output:\nID=IR-17;SEVERITY=HIGH;HOSTS=3;STATUS=CONTAINED\n\nWrite a Python 3 program that reads standard input and prints only the required output. Use only simulated offline incident-response data.",
    "inputFormat": "id,severity,host_count,status",
    "outputFormat": "Formatted incident summary or INVALID.",
    "constraints": [
      "Use Python 3 and read from standard input.",
      "Print only the required output without prompts or debugging text.",
      "Apply the specified matching, validation and formatting rules.",
      "Do not hard-code sample results.",
      "Use simulated offline data only; do not access live services, credentials or networks."
    ],
    "skills": [
      "Incident Response",
      "Post-Incident Review and Improvement",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 30,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\n\ndef solve():\n    data = sys.stdin.read().strip()\n    # TODO: Analyze the simulated incident-response input.\n    pass\n\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
];
