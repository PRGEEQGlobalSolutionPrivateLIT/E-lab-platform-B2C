import type { PracticeProblem } from './types';

/**
 * Cybersecurity > Network Security
 * Phase 1: 10 offline, Python-based network security exercises.
 * Requires registration in the practice-problem aggregator.
 * Hidden judge tests must be implemented separately.
 */
export const networkSecurityProblems: PracticeProblem[] = [
  {
    "slug": "network-security-validate-ipv4-address",
    "title": "Validate IPv4 Address",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Determine whether an input is a valid IPv4 address using Python ipaddress.",
    "problemStatement": "Determine whether an input is a valid IPv4 address using Python ipaddress.\n\nExample input:\n192.168.1.10\n\nExample output:\nVALID\n\nImplement a Python 3 program that reads standard input and prints only the specified output. No external network access is required.",
    "inputFormat": "One line containing a candidate IP address.",
    "outputFormat": "Print VALID if it is an IPv4 address; otherwise print INVALID.",
    "constraints": [
      "Use Python 3.",
      "Read the specified input from standard input.",
      "Print only the required output, with no extra prompts.",
      "Do not make external network requests.",
      "Do not hard-code answers."
    ],
    "skills": [
      "Network Security",
      "ipaddress",
      "Python"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "address = input().strip()\n# Print VALID or INVALID\n"
  },
  {
    "slug": "network-security-classify-ipv4-address",
    "title": "Classify IPv4 Address",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Classify an IPv4 address as PRIVATE, LOOPBACK, LINK_LOCAL, MULTICAST, or OTHER, checking in that priority order.",
    "problemStatement": "Classify an IPv4 address as PRIVATE, LOOPBACK, LINK_LOCAL, MULTICAST, or OTHER, checking in that priority order.\n\nExample input:\n127.0.0.1\n\nExample output:\nLOOPBACK\n\nImplement a Python 3 program that reads standard input and prints only the specified output. No external network access is required.",
    "inputFormat": "One valid IPv4 address.",
    "outputFormat": "Print exactly one of PRIVATE, LOOPBACK, LINK_LOCAL, MULTICAST, OTHER.",
    "constraints": [
      "Use Python 3.",
      "Read the specified input from standard input.",
      "Print only the required output, with no extra prompts.",
      "Do not make external network requests.",
      "Do not hard-code answers."
    ],
    "skills": [
      "Network Security",
      "ipaddress",
      "Python"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "address = input().strip()\n# Classify using ipaddress properties\n"
  },
  {
    "slug": "network-security-calculate-network-address",
    "title": "Calculate Network Address",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Calculate the network address from an IPv4 interface written in CIDR notation.",
    "problemStatement": "Calculate the network address from an IPv4 interface written in CIDR notation.\n\nExample input:\n192.168.10.44/24\n\nExample output:\n192.168.10.0\n\nImplement a Python 3 program that reads standard input and prints only the specified output. No external network access is required.",
    "inputFormat": "One IPv4 interface, e.g. 192.168.10.44/24.",
    "outputFormat": "Print the network address only, without the prefix length.",
    "constraints": [
      "Use Python 3.",
      "Read the specified input from standard input.",
      "Print only the required output, with no extra prompts.",
      "Do not make external network requests.",
      "Do not hard-code answers."
    ],
    "skills": [
      "Network Security",
      "ipaddress",
      "Python"
    ],
    "estimatedMinutes": 20,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "cidr = input().strip()\n# Calculate the network address\n"
  },
  {
    "slug": "network-security-calculate-subnet-range",
    "title": "Calculate Subnet Range",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "For an IPv4 network, output its network and broadcast addresses. Host bits in the input may be set.",
    "problemStatement": "For an IPv4 network, output its network and broadcast addresses. Host bits in the input may be set.\n\nExample input:\n10.20.5.7/24\n\nExample output:\nNETWORK=10.20.5.0\nBROADCAST=10.20.5.255\n\nImplement a Python 3 program that reads standard input and prints only the specified output. No external network access is required.",
    "inputFormat": "One IPv4 CIDR string.",
    "outputFormat": "Print two lines: NETWORK=<address> and BROADCAST=<address>.",
    "constraints": [
      "Use Python 3.",
      "Read the specified input from standard input.",
      "Print only the required output, with no extra prompts.",
      "Do not make external network requests.",
      "Do not hard-code answers."
    ],
    "skills": [
      "Network Security",
      "ipaddress",
      "Python"
    ],
    "estimatedMinutes": 20,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "cidr = input().strip()\n# Print network and broadcast addresses\n"
  },
  {
    "slug": "network-security-check-ip-in-subnet",
    "title": "Check IP in Subnet",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Check whether an IPv4 address belongs to an IPv4 subnet.",
    "problemStatement": "Check whether an IPv4 address belongs to an IPv4 subnet.\n\nExample input:\n192.168.1.42\n192.168.1.0/24\n\nExample output:\nYES\n\nImplement a Python 3 program that reads standard input and prints only the specified output. No external network access is required.",
    "inputFormat": "First line: IPv4 address. Second line: IPv4 CIDR subnet.",
    "outputFormat": "Print YES if the address belongs to the subnet; otherwise NO.",
    "constraints": [
      "Use Python 3.",
      "Read the specified input from standard input.",
      "Print only the required output, with no extra prompts.",
      "Do not make external network requests.",
      "Do not hard-code answers."
    ],
    "skills": [
      "Network Security",
      "ipaddress",
      "Python"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "address = input().strip()\nsubnet = input().strip()\n# Check membership\n"
  },
  {
    "slug": "network-security-validate-tcp-port",
    "title": "Validate TCP Port",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Validate a TCP destination port number. A valid port is an integer from 1 to 65535 inclusive.",
    "problemStatement": "Validate a TCP destination port number. A valid port is an integer from 1 to 65535 inclusive.\n\nExample input:\n443\n\nExample output:\nVALID\n\nImplement a Python 3 program that reads standard input and prints only the specified output. No external network access is required.",
    "inputFormat": "One line containing a candidate port.",
    "outputFormat": "Print VALID for a decimal integer in the allowed range; otherwise INVALID.",
    "constraints": [
      "Use Python 3.",
      "Read the specified input from standard input.",
      "Print only the required output, with no extra prompts.",
      "Do not make external network requests.",
      "Do not hard-code answers."
    ],
    "skills": [
      "Network Security",
      "standard library",
      "Python"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "value = input().strip()\n# Validate the port\n"
  },
  {
    "slug": "network-security-parse-dns-records",
    "title": "Parse DNS Records",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Analyze a provided DNS record list without making external DNS requests. Each record is TYPE VALUE; ignore empty lines. Count A, AAAA, and CNAME records.",
    "problemStatement": "Analyze a provided DNS record list without making external DNS requests. Each record is TYPE VALUE; ignore empty lines. Count A, AAAA, and CNAME records.\n\nExample input:\n4\nA 192.0.2.10\nAAAA 2001:db8::10\nCNAME alias.example.test\nA 192.0.2.11\n\nExample output:\nA=2\nAAAA=1\nCNAME=1\n\nImplement a Python 3 program that reads standard input and prints only the specified output. No external network access is required.",
    "inputFormat": "First line: integer N (0 to 100). Next N lines: TYPE VALUE, where TYPE is A, AAAA, CNAME, or TXT.",
    "outputFormat": "Print A=<count>, AAAA=<count>, CNAME=<count> on separate lines.",
    "constraints": [
      "Use Python 3.",
      "Read the specified input from standard input.",
      "Print only the required output, with no extra prompts.",
      "Do not make external network requests.",
      "Do not hard-code answers."
    ],
    "skills": [
      "Network Security",
      "string processing",
      "Python"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "n = int(input())\n# Read and count record types\n"
  },
  {
    "slug": "network-security-audit-http-security-headers",
    "title": "Audit HTTP Security Headers",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Audit supplied HTTP response headers without contacting a website. Header names are case-insensitive. Require Strict-Transport-Security, X-Content-Type-Options, and Content-Security-Policy.",
    "problemStatement": "Audit supplied HTTP response headers without contacting a website. Header names are case-insensitive. Require Strict-Transport-Security, X-Content-Type-Options, and Content-Security-Policy.\n\nExample input:\n2\nStrict-Transport-Security: max-age=31536000\nX-Content-Type-Options: nosniff\n\nExample output:\nMISSING:Content-Security-Policy\n\nImplement a Python 3 program that reads standard input and prints only the specified output. No external network access is required.",
    "inputFormat": "First line: integer N (0 to 100). Next N lines: HTTP header lines in Name: Value form.",
    "outputFormat": "Print SECURE if all three required headers exist with non-empty values; otherwise print MISSING: followed by missing header names in the required order separated by commas.",
    "constraints": [
      "Use Python 3.",
      "Read the specified input from standard input.",
      "Print only the required output, with no extra prompts.",
      "Do not make external network requests.",
      "Do not hard-code answers."
    ],
    "skills": [
      "Network Security",
      "string processing",
      "Python"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "n = int(input())\n# Audit required response headers\n"
  },
  {
    "slug": "network-security-inspect-tls-certificate-dates",
    "title": "Inspect TLS Certificate Dates",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Check the validity window of an offline TLS certificate fixture using ISO dates. The certificate is valid on both its start and end dates.",
    "problemStatement": "Check the validity window of an offline TLS certificate fixture using ISO dates. The certificate is valid on both its start and end dates.\n\nExample input:\n2026-01-01\n2026-12-31\n2026-10-14\n\nExample output:\nVALID\n\nImplement a Python 3 program that reads standard input and prints only the specified output. No external network access is required.",
    "inputFormat": "Three lines: not_before (YYYY-MM-DD), not_after (YYYY-MM-DD), check_date (YYYY-MM-DD).",
    "outputFormat": "Print VALID if not_before <= check_date <= not_after; otherwise print EXPIRED if check_date > not_after, or NOT_YET_VALID if check_date < not_before.",
    "constraints": [
      "Use Python 3.",
      "Read the specified input from standard input.",
      "Print only the required output, with no extra prompts.",
      "Do not make external network requests.",
      "Do not hard-code answers."
    ],
    "skills": [
      "Network Security",
      "datetime",
      "Python"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "from datetime import date\nnot_before = input().strip()\nnot_after = input().strip()\ncheck_date = input().strip()\n# Evaluate certificate dates\n"
  },
  {
    "slug": "network-security-detect-port-scan-in-logs",
    "title": "Detect Port Scan in Logs",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Analyze a synthetic network connection log. Flag source IPs contacting at least K distinct destination ports. Do not perform live scanning.",
    "problemStatement": "Analyze a synthetic network connection log. Flag source IPs contacting at least K distinct destination ports. Do not perform live scanning.\n\nExample input:\n5 3\n192.0.2.1 22\n192.0.2.1 80\n192.0.2.2 443\n192.0.2.1 443\n192.0.2.2 443\n\nExample output:\n192.0.2.1\n\nImplement a Python 3 program that reads standard input and prints only the specified output. No external network access is required.",
    "inputFormat": "First line: N K (1 <= N <= 10000; 1 <= K <= 65535). Next N lines: source_ipv4 destination_port.",
    "outputFormat": "Print flagged source IPs in lexicographic order, one per line; print NONE if no source reaches K distinct ports.",
    "constraints": [
      "Use Python 3.",
      "Read the specified input from standard input.",
      "Print only the required output, with no extra prompts.",
      "Do not make external network requests.",
      "Do not hard-code answers."
    ],
    "skills": [
      "Network Security",
      "collections",
      "Python"
    ],
    "estimatedMinutes": 35,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "from collections import defaultdict\nn, k = map(int, input().split())\n# Group distinct destination ports by source\n"
  }
];
