import type { PracticeProblem } from './types';

/**
 * Cybersecurity > Web Application Security
 * Phase 1: 10 offline, Python-based web application security exercises.
 * Requires registration in the practice-problem aggregator.
 * Hidden judge tests must be implemented separately.
 */
export const webSecurityProblems: PracticeProblem[] = [
  {
    "slug": "web-security-validate-http-status-code",
    "title": "Validate HTTP Status Code",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Classify an HTTP status code as SUCCESS, REDIRECT, CLIENT_ERROR, SERVER_ERROR, or INVALID.",
    "problemStatement": "Classify an HTTP status code as SUCCESS, REDIRECT, CLIENT_ERROR, SERVER_ERROR, or INVALID.\n\nExample input:\n200\n\nExample output:\nSUCCESS\n\nImplement a Python 3 program that reads standard input and prints only the specified output. No external network access is required.",
    "inputFormat": "One line containing a candidate integer HTTP status code.",
    "outputFormat": "Print SUCCESS for 200-299, REDIRECT for 300-399, CLIENT_ERROR for 400-499, SERVER_ERROR for 500-599; otherwise INVALID.",
    "constraints": [
      "Use Python 3.",
      "Read the specified input from standard input.",
      "Print only the required output, with no extra prompts.",
      "Do not make external network requests.",
      "Do not hard-code answers."
    ],
    "skills": [
      "Web Application Security",
      "HTTP",
      "status codes",
      "Python"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "code = input().strip()\n# Classify the HTTP status code\n"
  },
  {
    "slug": "web-security-detect-sql-injection-patterns",
    "title": "Detect SQL Injection Patterns",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Detect potentially unsafe SQL syntax in a supplied input string using case-insensitive pattern matching.",
    "problemStatement": "Detect potentially unsafe SQL syntax in a supplied input string using case-insensitive pattern matching.\n\nExample input:\n' OR 1=1 --\n\nExample output:\nSUSPICIOUS\n\nImplement a Python 3 program that reads standard input and prints only the specified output. No external network access is required.",
    "inputFormat": "One line containing a user-supplied string.",
    "outputFormat": "Print SUSPICIOUS if the lowercase input contains any of these exact substrings: \"' or \", '\" or ', 'union select', '--', or '/*'; otherwise SAFE.",
    "constraints": [
      "Use Python 3.",
      "Read the specified input from standard input.",
      "Print only the required output, with no extra prompts.",
      "Do not make external network requests.",
      "Do not hard-code answers."
    ],
    "skills": [
      "Web Application Security",
      "SQL injection",
      "string matching",
      "Python"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "value = input()\n# Check for the specified suspicious substrings\n"
  },
  {
    "slug": "web-security-identify-unsafe-html-input",
    "title": "Identify Unsafe HTML Input",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Flag HTML input containing a script element or an inline event-handler attribute.",
    "problemStatement": "Flag HTML input containing a script element or an inline event-handler attribute.\n\nExample input:\n<img src=x onerror=alert(1)>\n\nExample output:\nUNSAFE\n\nImplement a Python 3 program that reads standard input and prints only the specified output. No external network access is required.",
    "inputFormat": "One line containing an HTML fragment.",
    "outputFormat": "Print UNSAFE if the lowercase fragment contains '<script', 'onerror=', or 'onload='; otherwise SAFE.",
    "constraints": [
      "Use Python 3.",
      "Read the specified input from standard input.",
      "Print only the required output, with no extra prompts.",
      "Do not make external network requests.",
      "Do not hard-code answers."
    ],
    "skills": [
      "Web Application Security",
      "XSS",
      "HTML",
      "Python"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "html = input()\n# Check for the specified unsafe HTML patterns\n"
  },
  {
    "slug": "web-security-validate-secure-password",
    "title": "Validate Secure Password",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Check whether a password meets a fixed set of strength requirements.",
    "problemStatement": "Check whether a password meets a fixed set of strength requirements.\n\nExample input:\nStrongPass9!\n\nExample output:\nSTRONG\n\nImplement a Python 3 program that reads standard input and prints only the specified output. No external network access is required.",
    "inputFormat": "One line containing a password (spaces count as characters).",
    "outputFormat": "Print STRONG if length is at least 12 and it contains an uppercase letter, lowercase letter, digit, and a character from !@#$%^&*; otherwise WEAK.",
    "constraints": [
      "Use Python 3.",
      "Read the specified input from standard input.",
      "Print only the required output, with no extra prompts.",
      "Do not make external network requests.",
      "Do not hard-code answers."
    ],
    "skills": [
      "Web Application Security",
      "password policy",
      "validation",
      "Python"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "password = input()\n# Validate all password requirements\n"
  },
  {
    "slug": "web-security-detect-suspicious-url-parameters",
    "title": "Detect Suspicious URL Parameters",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Inspect a URL's query parameter names for security-sensitive keys without fetching the URL.",
    "problemStatement": "Inspect a URL's query parameter names for security-sensitive keys without fetching the URL.\n\nExample input:\nhttps://example.test/view?debug=true\n\nExample output:\nSUSPICIOUS\n\nImplement a Python 3 program that reads standard input and prints only the specified output. No external network access is required.",
    "inputFormat": "One line containing an absolute URL.",
    "outputFormat": "Print SUSPICIOUS if any case-insensitive query parameter name equals debug, admin, token, or password; otherwise SAFE. Use urllib.parse; inspect names, not values.",
    "constraints": [
      "Use Python 3.",
      "Read the specified input from standard input.",
      "Print only the required output, with no extra prompts.",
      "Do not make external network requests.",
      "Do not hard-code answers."
    ],
    "skills": [
      "Web Application Security",
      "URL parsing",
      "urllib.parse",
      "Python"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "from urllib.parse import urlsplit, parse_qsl\nurl = input().strip()\n# Inspect query parameter names\n"
  },
  {
    "slug": "web-security-identify-missing-security-headers",
    "title": "Identify Missing Security Headers",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Audit a supplied HTTP response header list for three required security headers.",
    "problemStatement": "Audit a supplied HTTP response header list for three required security headers.\n\nExample input:\n2\nStrict-Transport-Security: max-age=31536000\nX-Content-Type-Options: nosniff\n\nExample output:\nMISSING:Content-Security-Policy\n\nImplement a Python 3 program that reads standard input and prints only the specified output. No external network access is required.",
    "inputFormat": "First line N (0 to 100); next N lines contain Name: Value HTTP headers.",
    "outputFormat": "Print SECURE if Strict-Transport-Security, X-Content-Type-Options, and Content-Security-Policy are all present with non-empty values. Otherwise print MISSING: followed by absent header names, comma-separated, in that order. Names are case-insensitive.",
    "constraints": [
      "Use Python 3.",
      "Read the specified input from standard input.",
      "Print only the required output, with no extra prompts.",
      "Do not make external network requests.",
      "Do not hard-code answers."
    ],
    "skills": [
      "Web Application Security",
      "security headers",
      "HTTP",
      "Python"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "n = int(input())\n# Read headers and audit the required names\n"
  },
  {
    "slug": "web-security-validate-jwt-expiration",
    "title": "Validate JWT Expiration",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Check an offline JWT expiration timestamp against a supplied current timestamp. Do not verify signatures or accept the token as authenticated.",
    "problemStatement": "Check an offline JWT expiration timestamp against a supplied current timestamp. Do not verify signatures or accept the token as authenticated.\n\nExample input:\n1735689600\n1735689599\n\nExample output:\nVALID\n\nImplement a Python 3 program that reads standard input and prints only the specified output. No external network access is required.",
    "inputFormat": "Two lines: exp Unix timestamp, then current Unix timestamp; both non-negative integers.",
    "outputFormat": "Print VALID if current time is strictly less than exp; otherwise EXPIRED. This is an expiration-only check, not full JWT validation.",
    "constraints": [
      "Use Python 3.",
      "Read the specified input from standard input.",
      "Print only the required output, with no extra prompts.",
      "Do not make external network requests.",
      "Do not hard-code answers."
    ],
    "skills": [
      "Web Application Security",
      "JWT",
      "timestamps",
      "Python"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "exp = int(input())\nnow = int(input())\n# Compare expiration and current timestamps\n"
  },
  {
    "slug": "web-security-detect-path-traversal-attempts",
    "title": "Detect Path Traversal Attempts",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Detect parent-directory traversal segments in an untrusted URL path, including percent-encoded forms.",
    "problemStatement": "Detect parent-directory traversal segments in an untrusted URL path, including percent-encoded forms.\n\nExample input:\n/files/%2e%2e/secrets.txt\n\nExample output:\nTRAVERSAL\n\nImplement a Python 3 program that reads standard input and prints only the specified output. No external network access is required.",
    "inputFormat": "One line containing a URL path, optionally percent-encoded.",
    "outputFormat": "Decode percent-encoding repeatedly up to 3 times using urllib.parse.unquote, convert backslashes to forward slashes, and print TRAVERSAL if any slash-delimited segment is exactly '..'; otherwise SAFE.",
    "constraints": [
      "Use Python 3.",
      "Read the specified input from standard input.",
      "Print only the required output, with no extra prompts.",
      "Do not make external network requests.",
      "Do not hard-code answers."
    ],
    "skills": [
      "Web Application Security",
      "path traversal",
      "URL decoding",
      "Python"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "from urllib.parse import unquote\npath = input().strip()\n# Normalize and check path segments\n"
  },
  {
    "slug": "web-security-implement-safe-html-escaping",
    "title": "Implement Safe HTML Escaping",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Escape a supplied text string for safe insertion into HTML text content.",
    "problemStatement": "Escape a supplied text string for safe insertion into HTML text content.\n\nExample input:\n<script>alert('x')</script>\n\nExample output:\n&lt;script&gt;alert(&#x27;x&#x27;)&lt;/script&gt;\n\nImplement a Python 3 program that reads standard input and prints only the specified output. No external network access is required.",
    "inputFormat": "One line containing text to escape.",
    "outputFormat": "Print the result of html.escape(text, quote=True). Do not wrap the output in HTML tags.",
    "constraints": [
      "Use Python 3.",
      "Read the specified input from standard input.",
      "Print only the required output, with no extra prompts.",
      "Do not make external network requests.",
      "Do not hard-code answers."
    ],
    "skills": [
      "Web Application Security",
      "output encoding",
      "html.escape",
      "Python"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import html\ntext = input()\n# Escape text for HTML output\n"
  },
  {
    "slug": "web-security-analyze-http-access-logs",
    "title": "Analyze HTTP Access Logs",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Analyze synthetic access logs and identify client IPs with at least K HTTP 4xx or 5xx responses.",
    "problemStatement": "Analyze synthetic access logs and identify client IPs with at least K HTTP 4xx or 5xx responses.\n\nExample input:\n5 2\n192.0.2.1 200\n192.0.2.1 404\n192.0.2.2 500\n192.0.2.1 403\n192.0.2.2 200\n\nExample output:\n192.0.2.1\n\nImplement a Python 3 program that reads standard input and prints only the specified output. No external network access is required.",
    "inputFormat": "First line N K (1 <= N <= 10000, 1 <= K <= N); next N lines: client_ipv4 status_code (100-599).",
    "outputFormat": "Print IP addresses with at least K entries whose status is 400-599, in lexicographic order, one per line. Print NONE if no address qualifies.",
    "constraints": [
      "Use Python 3.",
      "Read the specified input from standard input.",
      "Print only the required output, with no extra prompts.",
      "Do not make external network requests.",
      "Do not hard-code answers."
    ],
    "skills": [
      "Web Application Security",
      "log analysis",
      "collections",
      "Python"
    ],
    "estimatedMinutes": 35,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "from collections import defaultdict\nn, k = map(int, input().split())\n# Count error responses per client IP\n"
  }
];
