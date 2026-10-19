import type { PracticeProblem } from './types';

/**
 * Cybersecurity > SOC & SIEM
 * 30 offline Python 3 exercises across 10 roadmap modules.
 * Backend hidden test cases/validators must be implemented separately.
 */
export const socSiemProblems: PracticeProblem[] = [
  {
    "slug": "soc-siem-classify-security-events",
    "title": "Classify Security Events",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Print AUTHENTICATION, MALWARE, CONFIGURATION, or OTHER respectively.",
    "problemStatement": "Classify Security Events\n\nPrint AUTHENTICATION, MALWARE, CONFIGURATION, or OTHER respectively.\n\nExample input:\nlogin_failed\n\nExample output:\nAUTHENTICATION\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only offline or simulated security data.",
    "inputFormat": "One event type: login_failed, malware_detected, policy_change, or other.",
    "outputFormat": "Print AUTHENTICATION, MALWARE, CONFIGURATION, or OTHER respectively.",
    "constraints": [
      "Use Python 3 and read standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Analyze only supplied offline or simulated data; do not access networks or live systems.",
      "Follow the specified parsing, ordering, and invalid-input rules.",
      "Do not hard-code example results."
    ],
    "skills": [
      "SOC & SIEM",
      "SOC Fundamentals",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline SOC/SIEM analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "soc-siem-identify-alert-severity",
    "title": "Identify Alert Severity",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Print LOW for 0–29, MEDIUM for 30–59, HIGH for 60–84, CRITICAL for 85–100; INVALID otherwise.",
    "problemStatement": "Identify Alert Severity\n\nPrint LOW for 0–29, MEDIUM for 30–59, HIGH for 60–84, CRITICAL for 85–100; INVALID otherwise.\n\nExample input:\n87\n\nExample output:\nCRITICAL\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only offline or simulated security data.",
    "inputFormat": "One integer risk score from 0 through 100.",
    "outputFormat": "Print LOW for 0–29, MEDIUM for 30–59, HIGH for 60–84, CRITICAL for 85–100; INVALID otherwise.",
    "constraints": [
      "Use Python 3 and read standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Analyze only supplied offline or simulated data; do not access networks or live systems.",
      "Follow the specified parsing, ordering, and invalid-input rules.",
      "Do not hard-code example results."
    ],
    "skills": [
      "SOC & SIEM",
      "SOC Fundamentals",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline SOC/SIEM analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "soc-siem-validate-incident-priority",
    "title": "Validate Incident Priority",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Print P1 if severity is CRITICAL or severity is HIGH and criticality is 3; P2 if severity is HIGH or severity is MEDIUM and criticality is 3; otherwise P3. Print INVALID for malformed input.",
    "problemStatement": "Validate Incident Priority\n\nPrint P1 if severity is CRITICAL or severity is HIGH and criticality is 3; P2 if severity is HIGH or severity is MEDIUM and criticality is 3; otherwise P3. Print INVALID for malformed input.\n\nExample input:\nHIGH,3\n\nExample output:\nP1\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only offline or simulated security data.",
    "inputFormat": "One line: severity,asset_criticality where severity is LOW, MEDIUM, HIGH, or CRITICAL and criticality is 1, 2, or 3.",
    "outputFormat": "Print P1 if severity is CRITICAL or severity is HIGH and criticality is 3; P2 if severity is HIGH or severity is MEDIUM and criticality is 3; otherwise P3. Print INVALID for malformed input.",
    "constraints": [
      "Use Python 3 and read standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Analyze only supplied offline or simulated data; do not access networks or live systems.",
      "Follow the specified parsing, ordering, and invalid-input rules.",
      "Do not hard-code example results."
    ],
    "skills": [
      "SOC & SIEM",
      "SOC Fundamentals",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline SOC/SIEM analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "soc-siem-parse-authentication-logs",
    "title": "Parse Authentication Logs",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Print ACTION followed by a space and the IP address; print INVALID for malformed timestamp, IPv4, or action.",
    "problemStatement": "Parse Authentication Logs\n\nPrint ACTION followed by a space and the IP address; print INVALID for malformed timestamp, IPv4, or action.\n\nExample input:\n2026-10-14T10:30:00|10.0.0.8|FAILURE\n\nExample output:\nFAILURE 10.0.0.8\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only offline or simulated security data.",
    "inputFormat": "One log record: ISO_TIMESTAMP|IPV4|ACTION, where ACTION is SUCCESS or FAILURE.",
    "outputFormat": "Print ACTION followed by a space and the IP address; print INVALID for malformed timestamp, IPv4, or action.",
    "constraints": [
      "Use Python 3 and read standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Analyze only supplied offline or simulated data; do not access networks or live systems.",
      "Follow the specified parsing, ordering, and invalid-input rules.",
      "Do not hard-code example results."
    ],
    "skills": [
      "SOC & SIEM",
      "Security Log Analysis",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline SOC/SIEM analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "soc-siem-count-failed-logins",
    "title": "Count Failed Logins",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Print each user with at least one FAILURE as USER COUNT, sorted lexicographically; print NONE if no failures.",
    "problemStatement": "Count Failed Logins\n\nPrint each user with at least one FAILURE as USER COUNT, sorted lexicographically; print NONE if no failures.\n\nExample input:\n4\nalice,FAILURE\nbob,SUCCESS\nalice,FAILURE\nbob,FAILURE\n\nExample output:\nalice 2\nbob 1\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only offline or simulated security data.",
    "inputFormat": "First line: integer N. Next N lines: USER,ACTION with ACTION SUCCESS or FAILURE.",
    "outputFormat": "Print each user with at least one FAILURE as USER COUNT, sorted lexicographically; print NONE if no failures.",
    "constraints": [
      "Use Python 3 and read standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Analyze only supplied offline or simulated data; do not access networks or live systems.",
      "Follow the specified parsing, ordering, and invalid-input rules.",
      "Do not hard-code example results."
    ],
    "skills": [
      "SOC & SIEM",
      "Security Log Analysis",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline SOC/SIEM analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "soc-siem-detect-suspicious-ip-activity",
    "title": "Detect Suspicious IP Activity",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Print unique IPv4 addresses with at least T failures, sorted ascending by numeric address; print NONE if none. Malformed records are ignored.",
    "problemStatement": "Detect Suspicious IP Activity\n\nPrint unique IPv4 addresses with at least T failures, sorted ascending by numeric address; print NONE if none. Malformed records are ignored.\n\nExample input:\n2\n10.0.0.2,FAILURE\n10.0.0.1,FAILURE\n10.0.0.2,FAILURE\n\nExample output:\n10.0.0.2\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only offline or simulated security data.",
    "inputFormat": "First line: integer threshold T. Remaining lines: IPv4,ACTION with ACTION SUCCESS or FAILURE.",
    "outputFormat": "Print unique IPv4 addresses with at least T failures, sorted ascending by numeric address; print NONE if none. Malformed records are ignored.",
    "constraints": [
      "Use Python 3 and read standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Analyze only supplied offline or simulated data; do not access networks or live systems.",
      "Follow the specified parsing, ordering, and invalid-input rules.",
      "Do not hard-code example results."
    ],
    "skills": [
      "SOC & SIEM",
      "Security Log Analysis",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline SOC/SIEM analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "soc-siem-analyze-windows-event-ids",
    "title": "Analyze Windows Event IDs",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Print LOGON_SUCCESS for 4624, LOGON_FAILURE for 4625, PRIVILEGED_LOGON for 4672, ACCOUNT_CREATED for 4720; otherwise OTHER.",
    "problemStatement": "Analyze Windows Event IDs\n\nPrint LOGON_SUCCESS for 4624, LOGON_FAILURE for 4625, PRIVILEGED_LOGON for 4672, ACCOUNT_CREATED for 4720; otherwise OTHER.\n\nExample input:\n4625\n\nExample output:\nLOGON_FAILURE\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only offline or simulated security data.",
    "inputFormat": "One integer Windows Security Event ID.",
    "outputFormat": "Print LOGON_SUCCESS for 4624, LOGON_FAILURE for 4625, PRIVILEGED_LOGON for 4672, ACCOUNT_CREATED for 4720; otherwise OTHER.",
    "constraints": [
      "Use Python 3 and read standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Analyze only supplied offline or simulated data; do not access networks or live systems.",
      "Follow the specified parsing, ordering, and invalid-input rules.",
      "Do not hard-code example results."
    ],
    "skills": [
      "SOC & SIEM",
      "Windows Event Monitoring",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline SOC/SIEM analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "soc-siem-detect-repeated-windows-login-failures",
    "title": "Detect Repeated Windows Login Failures",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Print sorted users with at least T occurrences of event ID 4625, one per line; print NONE if none. Ignore malformed records.",
    "problemStatement": "Detect Repeated Windows Login Failures\n\nPrint sorted users with at least T occurrences of event ID 4625, one per line; print NONE if none. Ignore malformed records.\n\nExample input:\n2\nalice,4625\nbob,4624\nalice,4625\n\nExample output:\nalice\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only offline or simulated security data.",
    "inputFormat": "First line: integer threshold T. Remaining lines: USER,EVENT_ID with integer event IDs.",
    "outputFormat": "Print sorted users with at least T occurrences of event ID 4625, one per line; print NONE if none. Ignore malformed records.",
    "constraints": [
      "Use Python 3 and read standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Analyze only supplied offline or simulated data; do not access networks or live systems.",
      "Follow the specified parsing, ordering, and invalid-input rules.",
      "Do not hard-code example results."
    ],
    "skills": [
      "SOC & SIEM",
      "Windows Event Monitoring",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline SOC/SIEM analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "soc-siem-identify-windows-privilege-changes",
    "title": "Identify Windows Privilege Changes",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Print USER EVENT_ID for events 4672, 4728, or 4732, in input order; print NONE if none. Ignore malformed records.",
    "problemStatement": "Identify Windows Privilege Changes\n\nPrint USER EVENT_ID for events 4672, 4728, or 4732, in input order; print NONE if none. Ignore malformed records.\n\nExample input:\n3\nalice,4624\nbob,4672\ncarol,4732\n\nExample output:\nbob 4672\ncarol 4732\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only offline or simulated security data.",
    "inputFormat": "First line: integer N. Next N lines: USER,EVENT_ID.",
    "outputFormat": "Print USER EVENT_ID for events 4672, 4728, or 4732, in input order; print NONE if none. Ignore malformed records.",
    "constraints": [
      "Use Python 3 and read standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Analyze only supplied offline or simulated data; do not access networks or live systems.",
      "Follow the specified parsing, ordering, and invalid-input rules.",
      "Do not hard-code example results."
    ],
    "skills": [
      "SOC & SIEM",
      "Windows Event Monitoring",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline SOC/SIEM analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "soc-siem-parse-ssh-authentication-logs",
    "title": "Parse SSH Authentication Logs",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Print ACCEPTED_COUNT FAILED_COUNT for valid records; ignore malformed lines.",
    "problemStatement": "Parse SSH Authentication Logs\n\nPrint ACCEPTED_COUNT FAILED_COUNT for valid records; ignore malformed lines.\n\nExample input:\n3\nalice|10.0.0.1|FAILED\nbob|10.0.0.2|ACCEPTED\nalice|10.0.0.1|FAILED\n\nExample output:\n1 2\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only offline or simulated security data.",
    "inputFormat": "First line: integer N. Next N lines: USER|IPV4|RESULT where RESULT is ACCEPTED or FAILED.",
    "outputFormat": "Print ACCEPTED_COUNT FAILED_COUNT for valid records; ignore malformed lines.",
    "constraints": [
      "Use Python 3 and read standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Analyze only supplied offline or simulated data; do not access networks or live systems.",
      "Follow the specified parsing, ordering, and invalid-input rules.",
      "Do not hard-code example results."
    ],
    "skills": [
      "SOC & SIEM",
      "Linux Security Monitoring",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline SOC/SIEM analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "soc-siem-detect-ssh-brute-force-attempts",
    "title": "Detect SSH Brute Force Attempts",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Print sorted IPv4 addresses with at least T FAILED events; print NONE if none. Ignore malformed records.",
    "problemStatement": "Detect SSH Brute Force Attempts\n\nPrint sorted IPv4 addresses with at least T FAILED events; print NONE if none. Ignore malformed records.\n\nExample input:\n3\n192.0.2.4,FAILED\n192.0.2.4,FAILED\n192.0.2.4,FAILED\n\nExample output:\n192.0.2.4\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only offline or simulated security data.",
    "inputFormat": "First line: integer threshold T. Remaining lines: IPV4,RESULT where RESULT is FAILED or ACCEPTED.",
    "outputFormat": "Print sorted IPv4 addresses with at least T FAILED events; print NONE if none. Ignore malformed records.",
    "constraints": [
      "Use Python 3 and read standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Analyze only supplied offline or simulated data; do not access networks or live systems.",
      "Follow the specified parsing, ordering, and invalid-input rules.",
      "Do not hard-code example results."
    ],
    "skills": [
      "SOC & SIEM",
      "Linux Security Monitoring",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline SOC/SIEM analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "soc-siem-analyze-sudo-activity",
    "title": "Analyze Sudo Activity",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Print sorted unique users with at least one DENIED event, one per line; print NONE if none.",
    "problemStatement": "Analyze Sudo Activity\n\nPrint sorted unique users with at least one DENIED event, one per line; print NONE if none.\n\nExample input:\n3\nalice|systemctl|ALLOWED\nbob|cat|DENIED\nbob|ls|DENIED\n\nExample output:\nbob\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only offline or simulated security data.",
    "inputFormat": "First line: integer N. Next N lines: USER|COMMAND|RESULT where RESULT is ALLOWED or DENIED.",
    "outputFormat": "Print sorted unique users with at least one DENIED event, one per line; print NONE if none.",
    "constraints": [
      "Use Python 3 and read standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Analyze only supplied offline or simulated data; do not access networks or live systems.",
      "Follow the specified parsing, ordering, and invalid-input rules.",
      "Do not hard-code example results."
    ],
    "skills": [
      "SOC & SIEM",
      "Linux Security Monitoring",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline SOC/SIEM analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "soc-siem-normalize-security-events",
    "title": "Normalize Security Events",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Print source|ACTION|SEVERITY where action and severity are uppercased and whitespace trimmed; print INVALID for missing or non-string fields, empty values, or malformed JSON.",
    "problemStatement": "Normalize Security Events\n\nPrint source|ACTION|SEVERITY where action and severity are uppercased and whitespace trimmed; print INVALID for missing or non-string fields, empty values, or malformed JSON.\n\nExample input:\n{\"timestamp\":\"2026-10-14T10:30:00\",\"source\":\"firewall\",\"action\":\"blocked\",\"severity\":\"high\"}\n\nExample output:\nfirewall|BLOCKED|HIGH\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only offline or simulated security data.",
    "inputFormat": "One JSON object with keys timestamp (ISO 8601 string), source (string), action (string), and severity (string).",
    "outputFormat": "Print source|ACTION|SEVERITY where action and severity are uppercased and whitespace trimmed; print INVALID for missing or non-string fields, empty values, or malformed JSON.",
    "constraints": [
      "Use Python 3 and read standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Analyze only supplied offline or simulated data; do not access networks or live systems.",
      "Follow the specified parsing, ordering, and invalid-input rules.",
      "Do not hard-code example results."
    ],
    "skills": [
      "SOC & SIEM",
      "SIEM Fundamentals",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline SOC/SIEM analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "soc-siem-filter-siem-events",
    "title": "Filter SIEM Events",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Print matching EVENT_IDs in input order, one per line; print NONE if no matches. Ignore malformed records.",
    "problemStatement": "Filter SIEM Events\n\nPrint matching EVENT_IDs in input order, one per line; print NONE if no matches. Ignore malformed records.\n\nExample input:\nHIGH\ne1|LOW\ne2|HIGH\ne3|HIGH\n\nExample output:\ne2\ne3\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only offline or simulated security data.",
    "inputFormat": "First line: severity LOW, MEDIUM, HIGH, or CRITICAL. Remaining lines: EVENT_ID|SEVERITY.",
    "outputFormat": "Print matching EVENT_IDs in input order, one per line; print NONE if no matches. Ignore malformed records.",
    "constraints": [
      "Use Python 3 and read standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Analyze only supplied offline or simulated data; do not access networks or live systems.",
      "Follow the specified parsing, ordering, and invalid-input rules.",
      "Do not hard-code example results."
    ],
    "skills": [
      "SOC & SIEM",
      "SIEM Fundamentals",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline SOC/SIEM analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "soc-siem-aggregate-log-sources",
    "title": "Aggregate Log Sources",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Print SOURCE COUNT sorted by SOURCE; print NONE for no valid records. Ignore malformed records.",
    "problemStatement": "Aggregate Log Sources\n\nPrint SOURCE COUNT sorted by SOURCE; print NONE for no valid records. Ignore malformed records.\n\nExample input:\n4\nfirewall|e1\nendpoint|e2\nfirewall|e3\nfirewall|e4\n\nExample output:\nendpoint 1\nfirewall 3\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only offline or simulated security data.",
    "inputFormat": "First line: integer N. Next N lines: SOURCE|EVENT_ID.",
    "outputFormat": "Print SOURCE COUNT sorted by SOURCE; print NONE for no valid records. Ignore malformed records.",
    "constraints": [
      "Use Python 3 and read standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Analyze only supplied offline or simulated data; do not access networks or live systems.",
      "Follow the specified parsing, ordering, and invalid-input rules.",
      "Do not hard-code example results."
    ],
    "skills": [
      "SOC & SIEM",
      "SIEM Fundamentals",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline SOC/SIEM analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "soc-siem-detect-suspicious-login-patterns",
    "title": "Detect Suspicious Login Patterns",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Print sorted users with at least T FAILURE events followed by a SUCCESS event from the same IP; print NONE if none. Ignore malformed records.",
    "problemStatement": "Detect Suspicious Login Patterns\n\nPrint sorted users with at least T FAILURE events followed by a SUCCESS event from the same IP; print NONE if none. Ignore malformed records.\n\nExample input:\n2\nalice|10.0.0.1|FAILURE\nalice|10.0.0.1|FAILURE\nalice|10.0.0.1|SUCCESS\n\nExample output:\nalice\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only offline or simulated security data.",
    "inputFormat": "First line: integer threshold T. Remaining lines: USER|IPV4|RESULT where RESULT is SUCCESS or FAILURE.",
    "outputFormat": "Print sorted users with at least T FAILURE events followed by a SUCCESS event from the same IP; print NONE if none. Ignore malformed records.",
    "constraints": [
      "Use Python 3 and read standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Analyze only supplied offline or simulated data; do not access networks or live systems.",
      "Follow the specified parsing, ordering, and invalid-input rules.",
      "Do not hard-code example results."
    ],
    "skills": [
      "SOC & SIEM",
      "Threat Detection Rules",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline SOC/SIEM analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "soc-siem-match-ioc-indicators",
    "title": "Match IOC Indicators",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Print matching EVENT_IDs in input order; print NONE if none. Ignore invalid IOC values and malformed event lines.",
    "problemStatement": "Match IOC Indicators\n\nPrint matching EVENT_IDs in input order; print NONE if none. Ignore invalid IOC values and malformed event lines.\n\nExample input:\n192.0.2.8,203.0.113.4\ne1|10.0.0.1\ne2|192.0.2.8\n\nExample output:\ne2\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only offline or simulated security data.",
    "inputFormat": "First line: comma-separated IPv4 IOC addresses. Remaining lines: EVENT_ID|IPV4.",
    "outputFormat": "Print matching EVENT_IDs in input order; print NONE if none. Ignore invalid IOC values and malformed event lines.",
    "constraints": [
      "Use Python 3 and read standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Analyze only supplied offline or simulated data; do not access networks or live systems.",
      "Follow the specified parsing, ordering, and invalid-input rules.",
      "Do not hard-code example results."
    ],
    "skills": [
      "SOC & SIEM",
      "Threat Detection Rules",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline SOC/SIEM analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "soc-siem-evaluate-detection-rules",
    "title": "Evaluate Detection Rules",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Print MATCH if event[field] is a string and equals value (eq) or contains value (contains), both case-insensitive; otherwise NO_MATCH. Print INVALID for malformed rule or JSON.",
    "problemStatement": "Evaluate Detection Rules\n\nPrint MATCH if event[field] is a string and equals value (eq) or contains value (contains), both case-insensitive; otherwise NO_MATCH. Print INVALID for malformed rule or JSON.\n\nExample input:\n{\"field\":\"process\",\"operator\":\"contains\",\"value\":\"powershell\"}\n{\"process\":\"Windows PowerShell.exe\"}\n\nExample output:\nMATCH\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only offline or simulated security data.",
    "inputFormat": "First line: JSON object with keys field, operator, value, where operator is eq or contains. Second line: JSON event object.",
    "outputFormat": "Print MATCH if event[field] is a string and equals value (eq) or contains value (contains), both case-insensitive; otherwise NO_MATCH. Print INVALID for malformed rule or JSON.",
    "constraints": [
      "Use Python 3 and read standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Analyze only supplied offline or simulated data; do not access networks or live systems.",
      "Follow the specified parsing, ordering, and invalid-input rules.",
      "Do not hard-code example results."
    ],
    "skills": [
      "SOC & SIEM",
      "Threat Detection Rules",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline SOC/SIEM analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "soc-siem-build-incident-timeline",
    "title": "Build Incident Timeline",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Print EVENT_IDs sorted by timestamp ascending, breaking ties by input order; print INVALID if any record or timestamp is malformed.",
    "problemStatement": "Build Incident Timeline\n\nPrint EVENT_IDs sorted by timestamp ascending, breaking ties by input order; print INVALID if any record or timestamp is malformed.\n\nExample input:\n3\n2026-10-14T11:00:00|e2\n2026-10-14T10:00:00|e1\n2026-10-14T12:00:00|e3\n\nExample output:\ne1\ne2\ne3\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only offline or simulated security data.",
    "inputFormat": "First line: integer N. Next N lines: ISO_TIMESTAMP|EVENT_ID.",
    "outputFormat": "Print EVENT_IDs sorted by timestamp ascending, breaking ties by input order; print INVALID if any record or timestamp is malformed.",
    "constraints": [
      "Use Python 3 and read standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Analyze only supplied offline or simulated data; do not access networks or live systems.",
      "Follow the specified parsing, ordering, and invalid-input rules.",
      "Do not hard-code example results."
    ],
    "skills": [
      "SOC & SIEM",
      "Incident Investigation",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline SOC/SIEM analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "soc-siem-identify-related-events",
    "title": "Identify Related Events",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Print matching EVENT_IDs in input order, one per line; print NONE if none. Ignore malformed lines.",
    "problemStatement": "Identify Related Events\n\nPrint matching EVENT_IDs in input order, one per line; print NONE if none. Ignore malformed lines.\n\nExample input:\nINC-7\ne1|INC-3\ne2|INC-7\ne3|INC-7\n\nExample output:\ne2\ne3\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only offline or simulated security data.",
    "inputFormat": "First line: target INCIDENT_ID. Remaining lines: EVENT_ID|INCIDENT_ID.",
    "outputFormat": "Print matching EVENT_IDs in input order, one per line; print NONE if none. Ignore malformed lines.",
    "constraints": [
      "Use Python 3 and read standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Analyze only supplied offline or simulated data; do not access networks or live systems.",
      "Follow the specified parsing, ordering, and invalid-input rules.",
      "Do not hard-code example results."
    ],
    "skills": [
      "SOC & SIEM",
      "Incident Investigation",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline SOC/SIEM analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "soc-siem-calculate-incident-risk",
    "title": "Calculate Incident Risk",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Print integer product of the three values followed by a space and LOW (1–20), MEDIUM (21–50), or HIGH (51–125). Print INVALID for malformed values.",
    "problemStatement": "Calculate Incident Risk\n\nPrint integer product of the three values followed by a space and LOW (1–20), MEDIUM (21–50), or HIGH (51–125). Print INVALID for malformed values.\n\nExample input:\n4,4,3\n\nExample output:\n48 MEDIUM\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only offline or simulated security data.",
    "inputFormat": "One line: impact,likelihood,exposure as three integers in range 1 through 5.",
    "outputFormat": "Print integer product of the three values followed by a space and LOW (1–20), MEDIUM (21–50), or HIGH (51–125). Print INVALID for malformed values.",
    "constraints": [
      "Use Python 3 and read standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Analyze only supplied offline or simulated data; do not access networks or live systems.",
      "Follow the specified parsing, ordering, and invalid-input rules.",
      "Do not hard-code example results."
    ],
    "skills": [
      "SOC & SIEM",
      "Incident Investigation",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline SOC/SIEM analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "soc-siem-validate-threat-indicators",
    "title": "Validate Threat Indicators",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Print VALID if VALUE is a valid IPv4 address, valid ASCII domain with at least two labels, or 64 hexadecimal characters respectively; otherwise INVALID.",
    "problemStatement": "Validate Threat Indicators\n\nPrint VALID if VALUE is a valid IPv4 address, valid ASCII domain with at least two labels, or 64 hexadecimal characters respectively; otherwise INVALID.\n\nExample input:\nIPV4|203.0.113.5\n\nExample output:\nVALID\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only offline or simulated security data.",
    "inputFormat": "One line: TYPE|VALUE where TYPE is IPV4, DOMAIN, or SHA256.",
    "outputFormat": "Print VALID if VALUE is a valid IPv4 address, valid ASCII domain with at least two labels, or 64 hexadecimal characters respectively; otherwise INVALID.",
    "constraints": [
      "Use Python 3 and read standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Analyze only supplied offline or simulated data; do not access networks or live systems.",
      "Follow the specified parsing, ordering, and invalid-input rules.",
      "Do not hard-code example results."
    ],
    "skills": [
      "SOC & SIEM",
      "Threat Intelligence",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline SOC/SIEM analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "soc-siem-correlate-ip-reputation",
    "title": "Correlate IP Reputation",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Print matching EVENT_IDs in input order; print NONE if none. Ignore invalid IP addresses and malformed lines.",
    "problemStatement": "Correlate IP Reputation\n\nPrint matching EVENT_IDs in input order; print NONE if none. Ignore invalid IP addresses and malformed lines.\n\nExample input:\n198.51.100.7\ne1,192.0.2.1\ne2,198.51.100.7\n\nExample output:\ne2\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only offline or simulated security data.",
    "inputFormat": "First line: comma-separated IPv4 addresses on a watchlist. Remaining lines: EVENT_ID,IPV4.",
    "outputFormat": "Print matching EVENT_IDs in input order; print NONE if none. Ignore invalid IP addresses and malformed lines.",
    "constraints": [
      "Use Python 3 and read standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Analyze only supplied offline or simulated data; do not access networks or live systems.",
      "Follow the specified parsing, ordering, and invalid-input rules.",
      "Do not hard-code example results."
    ],
    "skills": [
      "SOC & SIEM",
      "Threat Intelligence",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline SOC/SIEM analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "soc-siem-match-known-threat-patterns",
    "title": "Match Known Threat Patterns",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Print EVENT_IDs whose message contains any nonempty keyword, in input order; print NONE if none.",
    "problemStatement": "Match Known Threat Patterns\n\nPrint EVENT_IDs whose message contains any nonempty keyword, in input order; print NONE if none.\n\nExample input:\ncredential dump,malicious macro\ne1|Normal login\ne2|Possible credential dump observed\n\nExample output:\ne2\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only offline or simulated security data.",
    "inputFormat": "First line: comma-separated case-insensitive keywords. Remaining lines: EVENT_ID|MESSAGE.",
    "outputFormat": "Print EVENT_IDs whose message contains any nonempty keyword, in input order; print NONE if none.",
    "constraints": [
      "Use Python 3 and read standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Analyze only supplied offline or simulated data; do not access networks or live systems.",
      "Follow the specified parsing, ordering, and invalid-input rules.",
      "Do not hard-code example results."
    ],
    "skills": [
      "SOC & SIEM",
      "Threat Intelligence",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline SOC/SIEM analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "soc-siem-correlate-multiple-alerts",
    "title": "Correlate Multiple Alerts",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Print sorted IPs with at least two distinct alert types within any inclusive W-second window; print NONE if none. Ignore malformed records.",
    "problemStatement": "Correlate Multiple Alerts\n\nPrint sorted IPs with at least two distinct alert types within any inclusive W-second window; print NONE if none. Ignore malformed records.\n\nExample input:\n60\n100|192.0.2.5|SCAN\n130|192.0.2.5|LOGIN_FAILURE\n200|10.0.0.1|SCAN\n\nExample output:\n192.0.2.5\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only offline or simulated security data.",
    "inputFormat": "First line: integer window in seconds W. Remaining lines: UNIX_TIMESTAMP|IPV4|ALERT_TYPE.",
    "outputFormat": "Print sorted IPs with at least two distinct alert types within any inclusive W-second window; print NONE if none. Ignore malformed records.",
    "constraints": [
      "Use Python 3 and read standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Analyze only supplied offline or simulated data; do not access networks or live systems.",
      "Follow the specified parsing, ordering, and invalid-input rules.",
      "Do not hard-code example results."
    ],
    "skills": [
      "SOC & SIEM",
      "Alert Correlation",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 40,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline SOC/SIEM analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "soc-siem-detect-multi-stage-attack-patterns",
    "title": "Detect Multi-Stage Attack Patterns",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Print sorted IPs for which RECON, then ACCESS, then EXFIL occur in chronological order within W seconds (equal timestamps permitted); print NONE if none. Ignore malformed records.",
    "problemStatement": "Detect Multi-Stage Attack Patterns\n\nPrint sorted IPs for which RECON, then ACCESS, then EXFIL occur in chronological order within W seconds (equal timestamps permitted); print NONE if none. Ignore malformed records.\n\nExample input:\n300\n100|192.0.2.5|RECON\n200|192.0.2.5|ACCESS\n250|192.0.2.5|EXFIL\n\nExample output:\n192.0.2.5\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only offline or simulated security data.",
    "inputFormat": "First line: integer window in seconds W. Remaining lines: UNIX_TIMESTAMP|IPV4|STAGE with STAGE RECON, ACCESS, or EXFIL.",
    "outputFormat": "Print sorted IPs for which RECON, then ACCESS, then EXFIL occur in chronological order within W seconds (equal timestamps permitted); print NONE if none. Ignore malformed records.",
    "constraints": [
      "Use Python 3 and read standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Analyze only supplied offline or simulated data; do not access networks or live systems.",
      "Follow the specified parsing, ordering, and invalid-input rules.",
      "Do not hard-code example results."
    ],
    "skills": [
      "SOC & SIEM",
      "Alert Correlation",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 40,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline SOC/SIEM analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "soc-siem-reduce-duplicate-alerts",
    "title": "Reduce Duplicate Alerts",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Process alerts in timestamp order, breaking ties by input order. Print the count of retained alerts, keeping an alert only when there is no previously retained alert with the same IP and rule within the previous inclusive W seconds. Print INVALID for malformed input.",
    "problemStatement": "Reduce Duplicate Alerts\n\nProcess alerts in timestamp order, breaking ties by input order. Print the count of retained alerts, keeping an alert only when there is no previously retained alert with the same IP and rule within the previous inclusive W seconds. Print INVALID for malformed input.\n\nExample input:\n60\n100|10.0.0.1|r1\n120|10.0.0.1|r1\n170|10.0.0.1|r1\n\nExample output:\n2\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only offline or simulated security data.",
    "inputFormat": "First line: integer deduplication window W seconds. Remaining lines: UNIX_TIMESTAMP|IPV4|RULE_ID.",
    "outputFormat": "Process alerts in timestamp order, breaking ties by input order. Print the count of retained alerts, keeping an alert only when there is no previously retained alert with the same IP and rule within the previous inclusive W seconds. Print INVALID for malformed input.",
    "constraints": [
      "Use Python 3 and read standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Analyze only supplied offline or simulated data; do not access networks or live systems.",
      "Follow the specified parsing, ordering, and invalid-input rules.",
      "Do not hard-code example results."
    ],
    "skills": [
      "SOC & SIEM",
      "Alert Correlation",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 40,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline SOC/SIEM analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "soc-siem-prioritize-security-incidents",
    "title": "Prioritize Security Incidents",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Sort by severity descending (CRITICAL, HIGH, MEDIUM, LOW), then asset score descending, then INCIDENT_ID ascending; print IDs one per line. Print INVALID if any record is malformed.",
    "problemStatement": "Prioritize Security Incidents\n\nSort by severity descending (CRITICAL, HIGH, MEDIUM, LOW), then asset score descending, then INCIDENT_ID ascending; print IDs one per line. Print INVALID if any record is malformed.\n\nExample input:\n3\ninc1|HIGH|3\ninc2|CRITICAL|2\ninc3|HIGH|5\n\nExample output:\ninc2\ninc3\ninc1\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only offline or simulated security data.",
    "inputFormat": "First line: integer N. Next N lines: INCIDENT_ID|SEVERITY|ASSET_SCORE where severity is LOW, MEDIUM, HIGH, CRITICAL and asset score is 1–5.",
    "outputFormat": "Sort by severity descending (CRITICAL, HIGH, MEDIUM, LOW), then asset score descending, then INCIDENT_ID ascending; print IDs one per line. Print INVALID if any record is malformed.",
    "constraints": [
      "Use Python 3 and read standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Analyze only supplied offline or simulated data; do not access networks or live systems.",
      "Follow the specified parsing, ordering, and invalid-input rules.",
      "Do not hard-code example results."
    ],
    "skills": [
      "SOC & SIEM",
      "SOC Incident Response",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 40,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline SOC/SIEM analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "soc-siem-generate-incident-summary",
    "title": "Generate Incident Summary",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Print OPEN=x INVESTIGATING=y CONTAINED=z CLOSED=w, counting all valid lines; print INVALID if N or any record is malformed.",
    "problemStatement": "Generate Incident Summary\n\nPrint OPEN=x INVESTIGATING=y CONTAINED=z CLOSED=w, counting all valid lines; print INVALID if N or any record is malformed.\n\nExample input:\n3\ni1|OPEN\ni2|CLOSED\ni3|OPEN\n\nExample output:\nOPEN=2 INVESTIGATING=0 CONTAINED=0 CLOSED=1\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only offline or simulated security data.",
    "inputFormat": "First line: integer N. Next N lines: INCIDENT_ID|STATUS with STATUS OPEN, INVESTIGATING, CONTAINED, or CLOSED.",
    "outputFormat": "Print OPEN=x INVESTIGATING=y CONTAINED=z CLOSED=w, counting all valid lines; print INVALID if N or any record is malformed.",
    "constraints": [
      "Use Python 3 and read standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Analyze only supplied offline or simulated data; do not access networks or live systems.",
      "Follow the specified parsing, ordering, and invalid-input rules.",
      "Do not hard-code example results."
    ],
    "skills": [
      "SOC & SIEM",
      "SOC Incident Response",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 40,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline SOC/SIEM analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  },
  {
    "slug": "soc-siem-evaluate-response-actions",
    "title": "Evaluate Response Actions",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Print COMPLETE if every nonempty required code appears in completed codes, otherwise INCOMPLETE. Comparison is case-insensitive after trimming; print INVALID if either line is missing.",
    "problemStatement": "Evaluate Response Actions\n\nPrint COMPLETE if every nonempty required code appears in completed codes, otherwise INCOMPLETE. Comparison is case-insensitive after trimming; print INVALID if either line is missing.\n\nExample input:\nisolate,collect_logs,notify\nnotify,isolate,collect_logs\n\nExample output:\nCOMPLETE\n\nImplement a Python 3 program that reads standard input and prints only the required output. Use only offline or simulated security data.",
    "inputFormat": "First line: comma-separated required action codes. Second line: comma-separated completed action codes.",
    "outputFormat": "Print COMPLETE if every nonempty required code appears in completed codes, otherwise INCOMPLETE. Comparison is case-insensitive after trimming; print INVALID if either line is missing.",
    "constraints": [
      "Use Python 3 and read standard input.",
      "Print only the required output; no prompts or debugging text.",
      "Analyze only supplied offline or simulated data; do not access networks or live systems.",
      "Follow the specified parsing, ordering, and invalid-input rules.",
      "Do not hard-code example results."
    ],
    "skills": [
      "SOC & SIEM",
      "SOC Incident Response",
      "Python",
      "Offline security analysis"
    ],
    "estimatedMinutes": 40,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n\ndef solve():\n    data = sys.stdin.read()\n    # TODO: Implement the required offline SOC/SIEM analysis.\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n"
  }
];
