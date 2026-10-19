import type { PracticeProblem } from './types';

/**
 * Cybersecurity > Python Security
 * 50 code-editor problems across 10 modules.
 * Uses the existing Python judge. Backend hidden tests must be registered separately.
 * Problem slugs are kept identical to the approved 50-problem list.
 */
export const pythonSecurityProblems: PracticeProblem[] = [
  // Module 1: Python Security Fundamentals
  {
    "slug": "python-security-inspect-python-runtime",
    "title": "Inspect Python Runtime",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Display Python version without hard-coding.",
    "problemStatement": "Display Python version without hard-coding.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "No input.",
    "outputFormat": "Print major.minor.micro version, e.g. 3.12.2.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Python Security Fundamentals",
      "Python"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sys\n# Print the interpreter version as major.minor.micro\n"
  },
  {
    "slug": "python-security-identify-current-process-user",
    "title": "Identify Current Process User",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Get effective user using os APIs.",
    "problemStatement": "Get effective user using os APIs.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "No input.",
    "outputFormat": "Print the effective account name.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Python Security Fundamentals",
      "Python"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import getpass\n# Print the current process account name\n"
  },
  {
    "slug": "python-security-validate-safe-file-path",
    "title": "Validate Safe File Path",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Reject paths escaping a permitted directory.",
    "problemStatement": "Reject paths escaping a permitted directory.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "First line: allowed root path. Second line: candidate path.",
    "outputFormat": "Print SAFE or UNSAFE. Resolve paths lexically and reject traversal outside root.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Python Security Fundamentals",
      "Python"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "from pathlib import Path\nroot = input().strip()\ncandidate = input().strip()\n# Print SAFE or UNSAFE\n"
  },
  {
    "slug": "python-security-sanitize-audit-event",
    "title": "Sanitize Audit Event",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Normalize an audit event without losing evidence.",
    "problemStatement": "Normalize an audit event without losing evidence.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One audit message line.",
    "outputFormat": "Print the message with CR/LF/TAB converted to spaces and surrounding whitespace removed.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Python Security Fundamentals",
      "Python"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "message = input()\n# Normalize control characters without deleting other evidence\n"
  },
  {
    "slug": "python-security-build-security-environment-report",
    "title": "Build Security Environment Report",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Create JSON report with runtime and user metadata.",
    "problemStatement": "Create JSON report with runtime and user metadata.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "No input.",
    "outputFormat": "Print a JSON object with keys python_version and user, using runtime values.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Python Security Fundamentals",
      "Python"
    ],
    "estimatedMinutes": 40,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import json\nimport sys\nimport getpass\n# Print a JSON report with python_version and user\n"
  },
  // Module 2: Input Validation and Sanitization
  {
    "slug": "python-security-validate-username",
    "title": "Validate Username",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Accept only approved username characters.",
    "problemStatement": "Accept only approved username characters.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One username line.",
    "outputFormat": "Print VALID for 3-32 ASCII letters, digits, underscore or hyphen, starting with a letter; otherwise INVALID.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Input Validation and Sanitization",
      "Python"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import re\nusername = input().strip()\n# Validate using fullmatch\n"
  },
  {
    "slug": "python-security-validate-ipv4-address",
    "title": "Validate IPv4 Address",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Parse IPv4 using ipaddress.",
    "problemStatement": "Parse IPv4 using ipaddress.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One IP address line.",
    "outputFormat": "Print VALID for IPv4 only, otherwise INVALID.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Input Validation and Sanitization",
      "Python"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import ipaddress\naddress = input().strip()\n# Validate IPv4\n"
  },
  {
    "slug": "python-security-validate-email-input",
    "title": "Validate Email Input",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Enforce a documented email format.",
    "problemStatement": "Enforce a documented email format.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One email line.",
    "outputFormat": "Print VALID for one @, nonempty local part, and a dot-separated domain of ASCII alphanumeric labels optionally containing internal hyphens; otherwise INVALID.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Input Validation and Sanitization",
      "Python"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "email = input().strip()\n# Validate the documented format\n"
  },
  {
    "slug": "python-security-reject-malicious-filenames",
    "title": "Reject Malicious Filenames",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Prevent traversal and unsafe file names.",
    "problemStatement": "Prevent traversal and unsafe file names.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One filename line.",
    "outputFormat": "Print SAFE for a single nonempty filename component without slash, backslash, NUL or dot/dot-dot; otherwise UNSAFE.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Input Validation and Sanitization",
      "Python"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "filename = input()\n# Reject traversal and separators\n"
  },
  {
    "slug": "python-security-implement-structured-input-validator",
    "title": "Implement Structured Input Validator",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Validate nested input with typed rules.",
    "problemStatement": "Validate nested input with typed rules.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One JSON object line with name (string), age (integer 0-130), and active (boolean).",
    "outputFormat": "Print VALID only when all three fields have correct types and bounds; otherwise INVALID.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Input Validation and Sanitization",
      "Python"
    ],
    "estimatedMinutes": 40,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import json\npayload = json.loads(input())\n# Validate strict types and bounds\n"
  },
  // Module 3: Authentication and Password Security
  {
    "slug": "python-security-check-password-strength",
    "title": "Check Password Strength",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Check length and character policy.",
    "problemStatement": "Check length and character policy.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One password line.",
    "outputFormat": "Print STRONG for length >= 12 with uppercase, lowercase, digit and punctuation; otherwise WEAK.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Authentication and Password Security",
      "Python"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "password = input()\n# Evaluate password policy\n"
  },
  {
    "slug": "python-security-generate-secure-token",
    "title": "Generate Secure Token",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Use secrets to generate unpredictable tokens.",
    "problemStatement": "Use secrets to generate unpredictable tokens.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One integer specifying number of random bytes (1-64).",
    "outputFormat": "Print a hexadecimal token of exactly twice the requested byte count.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Authentication and Password Security",
      "Python"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import secrets\nn = int(input())\n# Generate token using secrets\n"
  },
  {
    "slug": "python-security-hash-password-with-salt",
    "title": "Hash Password with Salt",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Use PBKDF2 with random salt.",
    "problemStatement": "Use PBKDF2 with random salt.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One password line.",
    "outputFormat": "Print salt and PBKDF2-HMAC-SHA256 digest as lowercase hex separated by a colon; salt must be 16 random bytes and iterations >= 100000.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Authentication and Password Security",
      "Python"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import hashlib\nimport secrets\npassword = input()\n# Create random salt and derive PBKDF2 digest\n"
  },
  {
    "slug": "python-security-verify-stored-password-hash",
    "title": "Verify Stored Password Hash",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Verify password using constant-time comparison.",
    "problemStatement": "Verify password using constant-time comparison.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "Line 1: password. Line 2: salt hex. Line 3: expected digest hex.",
    "outputFormat": "Print MATCH or NO MATCH; use PBKDF2-HMAC-SHA256 with 100000 iterations and compare_digest.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Authentication and Password Security",
      "Python"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import hashlib\nimport hmac\npassword = input()\nsalt_hex = input().strip()\nexpected_hex = input().strip()\n# Recompute and compare in constant time\n"
  },
  {
    "slug": "python-security-implement-login-attempt-lockout",
    "title": "Implement Login Attempt Lockout",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Track failures and enforce lockout safely.",
    "problemStatement": "Track failures and enforce lockout safely.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One JSON array of booleans (true means successful login).",
    "outputFormat": "Print LOCKED if three consecutive failures occur before a success; otherwise OPEN. Reset failure count after a success.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Authentication and Password Security",
      "Python"
    ],
    "estimatedMinutes": 40,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import json\nattempts = json.loads(input())\n# Simulate lockout policy\n"
  },
  // Module 4: Cryptography and Data Protection
  {
    "slug": "python-security-calculate-sha-256-digest",
    "title": "Calculate SHA-256 Digest",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Hash provided bytes with hashlib.",
    "problemStatement": "Hash provided bytes with hashlib.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One UTF-8 text line.",
    "outputFormat": "Print the SHA-256 hexadecimal digest of its UTF-8 bytes.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Cryptography and Data Protection",
      "Python"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import hashlib\ntext = input()\n# Print SHA-256 hexdigest\n"
  },
  {
    "slug": "python-security-generate-secure-random-bytes",
    "title": "Generate Secure Random Bytes",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Use secrets.token_bytes.",
    "problemStatement": "Use secrets.token_bytes.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One integer N (1-64).",
    "outputFormat": "Print exactly 2*N lowercase hexadecimal characters from cryptographically secure random bytes.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Cryptography and Data Protection",
      "Python"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import secrets\nn = int(input())\n# Print random bytes as hex\n"
  },
  {
    "slug": "python-security-verify-file-integrity",
    "title": "Verify File Integrity",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Compare expected and actual digests.",
    "problemStatement": "Compare expected and actual digests.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "Line 1: text content. Line 2: expected SHA-256 hex.",
    "outputFormat": "Print INTACT if the digest matches, otherwise MODIFIED; compare using compare_digest.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Cryptography and Data Protection",
      "Python"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import hashlib\nimport hmac\ncontent = input()\nexpected = input().strip()\n# Verify digest\n"
  },
  {
    "slug": "python-security-encrypt-sensitive-data",
    "title": "Encrypt Sensitive Data",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Use authenticated encryption in a provided library.",
    "problemStatement": "Use authenticated encryption in a provided library.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "Line 1: 32-byte AES key as hex. Line 2: plaintext.",
    "outputFormat": "Print nonce and ciphertext/tag as two hex strings separated by colon, using AESGCM from cryptography and random 12-byte nonce.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation.",
      "Requires the cryptography package in the judge image; configure it before enabling this problem."
    ],
    "skills": [
      "Python Security",
      "Cryptography and Data Protection",
      "Python"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "from cryptography.hazmat.primitives.ciphers.aead import AESGCM\nimport os\nkey = bytes.fromhex(input().strip())\nplaintext = input().encode()\n# Encrypt with a random nonce and AESGCM\n"
  },
  {
    "slug": "python-security-build-secure-secret-storage-utility",
    "title": "Build Secure Secret Storage Utility",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Design authenticated encryption with rotation metadata.",
    "problemStatement": "Design authenticated encryption with rotation metadata.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One JSON object containing key_id (string) and secret (string).",
    "outputFormat": "Print JSON with key_id, nonce_hex and ciphertext_hex using a runtime-provided AES_KEY_HEX environment variable and AESGCM.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation.",
      "Requires the cryptography package in the judge image; configure it before enabling this problem."
    ],
    "skills": [
      "Python Security",
      "Cryptography and Data Protection",
      "Python"
    ],
    "estimatedMinutes": 40,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import os\nimport json\nfrom cryptography.hazmat.primitives.ciphers.aead import AESGCM\npayload = json.loads(input())\n# Encrypt secret and include key rotation identifier\n"
  },
  // Module 5: File and OS Security
  {
    "slug": "python-security-inspect-file-permissions",
    "title": "Inspect File Permissions",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Read mode bits using stat.",
    "problemStatement": "Read mode bits using stat.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One octal permission string, e.g. 600.",
    "outputFormat": "Print PRIVATE if no group/other permission bits are set; otherwise EXPOSED.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "File and OS Security",
      "Python"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "mode = int(input().strip(), 8)\n# Check group and other bits\n"
  },
  {
    "slug": "python-security-create-private-file",
    "title": "Create Private File",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Create a file with restrictive permissions.",
    "problemStatement": "Create a file with restrictive permissions.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One UTF-8 text line.",
    "outputFormat": "Create a private temporary file containing the text and print PRIVATE if its mode has no group/other bits.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "File and OS Security",
      "Python"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import os\nimport tempfile\nimport stat\ntext = input()\n# Create and inspect a private file\n"
  },
  {
    "slug": "python-security-detect-symbolic-link",
    "title": "Detect Symbolic Link",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Identify links before reading.",
    "problemStatement": "Identify links before reading.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One path line.",
    "outputFormat": "Print LINK if path is a symbolic link; otherwise NOT_LINK. Do not follow the link.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "File and OS Security",
      "Python"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "from pathlib import Path\npath = Path(input().strip())\n# Detect symbolic link\n"
  },
  {
    "slug": "python-security-secure-temporary-file",
    "title": "Secure Temporary File",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Use tempfile safely.",
    "problemStatement": "Use tempfile safely.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One text line.",
    "outputFormat": "Write the text to a securely created temporary file, read it back, delete the file, and print the read text.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "File and OS Security",
      "Python"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import tempfile\ntext = input()\n# Use tempfile safely\n"
  },
  {
    "slug": "python-security-prevent-toctou-file-replacement",
    "title": "Prevent TOCTOU File Replacement",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Use safe file descriptor operations.",
    "problemStatement": "Use safe file descriptor operations.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One file path line.",
    "outputFormat": "Print OPENED if opened read-only without following symlinks; otherwise REJECTED. Use O_NOFOLLOW where supported.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "File and OS Security",
      "Python"
    ],
    "estimatedMinutes": 40,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import os\npath = input().strip()\n# Open with no-follow flags and close descriptor\n"
  },
  // Module 6: Web Application Security
  {
    "slug": "python-security-escape-html-output",
    "title": "Escape HTML Output",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Escape untrusted HTML text.",
    "problemStatement": "Escape untrusted HTML text.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One HTML text line.",
    "outputFormat": "Print HTML-escaped text, including quotation marks.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Web Application Security",
      "Python"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import html\ntext = input()\n# Escape untrusted HTML\n"
  },
  {
    "slug": "python-security-validate-redirect-target",
    "title": "Validate Redirect Target",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Allow only approved destinations.",
    "problemStatement": "Allow only approved destinations.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One redirect target line.",
    "outputFormat": "Print ALLOWED only for relative paths beginning with a single / and not // or backslash; otherwise BLOCKED.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Web Application Security",
      "Python"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "target = input().strip()\n# Validate local-only redirect\n"
  },
  {
    "slug": "python-security-check-csrf-token",
    "title": "Check CSRF Token",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Compare session token securely.",
    "problemStatement": "Compare session token securely.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "Two lines: expected CSRF token, supplied CSRF token.",
    "outputFormat": "Print VALID when nonempty tokens match with compare_digest; otherwise INVALID.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Web Application Security",
      "Python"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import hmac\nexpected = input()\nsupplied = input()\n# Constant-time token comparison\n"
  },
  {
    "slug": "python-security-prevent-sql-injection",
    "title": "Prevent SQL Injection",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Use parameterized SQLite queries.",
    "problemStatement": "Use parameterized SQLite queries.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One search term line.",
    "outputFormat": "Create in-memory SQLite users table containing alice and bob; print MATCH if parameterized query finds exact name, else NO MATCH.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Web Application Security",
      "Python"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import sqlite3\nterm = input()\n# Use ? parameters, never string concatenation\n"
  },
  {
    "slug": "python-security-build-secure-api-input-layer",
    "title": "Build Secure API Input Layer",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Apply validation and error handling.",
    "problemStatement": "Apply validation and error handling.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One JSON object with method, path and body.",
    "outputFormat": "Print VALID for POST /items with body.name as a nonempty string of at most 80 characters; otherwise INVALID.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Web Application Security",
      "Python"
    ],
    "estimatedMinutes": 40,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import json\npayload = json.loads(input())\n# Validate request shape\n"
  },
  // Module 7: Network and API Security
  {
    "slug": "python-security-validate-allowed-port",
    "title": "Validate Allowed Port",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Check port integer range.",
    "problemStatement": "Check port integer range.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One port string.",
    "outputFormat": "Print VALID for decimal integer 1..65535 without signs/spaces; otherwise INVALID.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Network and API Security",
      "Python"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "port = input().strip()\n# Check decimal range\n"
  },
  {
    "slug": "python-security-parse-safe-url",
    "title": "Parse Safe URL",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Validate scheme and hostname.",
    "problemStatement": "Validate scheme and hostname.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One URL line.",
    "outputFormat": "Print SAFE for https URLs with a nonempty hostname and no userinfo; otherwise UNSAFE.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Network and API Security",
      "Python"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "from urllib.parse import urlsplit\nurl = input().strip()\n# Validate scheme, hostname, and userinfo\n"
  },
  {
    "slug": "python-security-enforce-request-timeout",
    "title": "Enforce Request Timeout",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Apply timeout to a mock request.",
    "problemStatement": "Apply timeout to a mock request.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One integer timeout in milliseconds.",
    "outputFormat": "Print VALID for timeout 1..30000, otherwise INVALID.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Network and API Security",
      "Python"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "value = input().strip()\n# Validate timeout bound\n"
  },
  {
    "slug": "python-security-implement-api-rate-limiter",
    "title": "Implement API Rate Limiter",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Limit calls in a time window.",
    "problemStatement": "Limit calls in a time window.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One JSON array of request timestamps in seconds, sorted ascending.",
    "outputFormat": "Print ALLOW or BLOCK on separate lines for each request; allow at most 3 requests in any inclusive 10-second rolling window.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Network and API Security",
      "Python"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import json\nrequests = json.loads(input())\n# Implement rolling-window rate limiter\n"
  },
  {
    "slug": "python-security-block-ssrf-destinations",
    "title": "Block SSRF Destinations",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Reject private and link-local targets.",
    "problemStatement": "Reject private and link-local targets.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One IP address line.",
    "outputFormat": "Print BLOCK for loopback, private, link-local, multicast, reserved or unspecified IP; otherwise ALLOW.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Network and API Security",
      "Python"
    ],
    "estimatedMinutes": 40,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import ipaddress\naddress = input().strip()\n# Check address safety\n"
  },
  // Module 8: Security Logging and Monitoring
  {
    "slug": "python-security-record-audit-event",
    "title": "Record Audit Event",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Emit structured JSON event.",
    "problemStatement": "Emit structured JSON event.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One JSON object with action and actor strings.",
    "outputFormat": "Print compact JSON containing action, actor and a UTC timestamp string in ISO 8601 format.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Security Logging and Monitoring",
      "Python"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import json\nfrom datetime import datetime, timezone\npayload = json.loads(input())\n# Emit structured event\n"
  },
  {
    "slug": "python-security-redact-sensitive-values",
    "title": "Redact Sensitive Values",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Remove secrets from logs.",
    "problemStatement": "Remove secrets from logs.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One JSON object.",
    "outputFormat": "Print JSON with keys containing password, token, secret or api_key (case-insensitive) replaced with [REDACTED].",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Security Logging and Monitoring",
      "Python"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import json\npayload = json.loads(input())\n# Redact sensitive fields\n"
  },
  {
    "slug": "python-security-detect-repeated-login-failures",
    "title": "Detect Repeated Login Failures",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Analyze sample auth events.",
    "problemStatement": "Analyze sample auth events.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One JSON array of objects with user and success boolean.",
    "outputFormat": "Print JSON object mapping each username to its number of failed logins, sorted by key.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Security Logging and Monitoring",
      "Python"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import json\nevents = json.loads(input())\n# Count failures per user\n"
  },
  {
    "slug": "python-security-identify-suspicious-access-pattern",
    "title": "Identify Suspicious Access Pattern",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Detect anomalous requests.",
    "problemStatement": "Detect anomalous requests.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One JSON array of integer HTTP status codes.",
    "outputFormat": "Print SUSPICIOUS if there are at least five 401/403 statuses; otherwise NORMAL.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Security Logging and Monitoring",
      "Python"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import json\ncodes = json.loads(input())\n# Detect suspicious pattern\n"
  },
  {
    "slug": "python-security-generate-security-incident-summary",
    "title": "Generate Security Incident Summary",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Aggregate events with timestamps.",
    "problemStatement": "Aggregate events with timestamps.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One JSON array of objects with severity (low, medium, high) and timestamp.",
    "outputFormat": "Print JSON object containing total, high, medium and low counts.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Security Logging and Monitoring",
      "Python"
    ],
    "estimatedMinutes": 40,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import json\nevents = json.loads(input())\n# Aggregate incident counts\n"
  },
  // Module 9: Dependency and Code Security
  {
    "slug": "python-security-inspect-package-metadata",
    "title": "Inspect Package Metadata",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Parse dependency metadata.",
    "problemStatement": "Parse dependency metadata.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One JSON object containing name and version strings.",
    "outputFormat": "Print name@version if both are nonempty strings; otherwise INVALID.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Dependency and Code Security",
      "Python"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import json\nmetadata = json.loads(input())\n# Validate dependency metadata\n"
  },
  {
    "slug": "python-security-detect-unsafe-eval-usage",
    "title": "Detect Unsafe Eval Usage",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Find eval calls in Python AST.",
    "problemStatement": "Find eval calls in Python AST.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One Python source line.",
    "outputFormat": "Print UNSAFE if the Python AST contains a call to eval; otherwise SAFE.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Dependency and Code Security",
      "Python"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import ast\nsource = input()\n# Inspect AST Call nodes\n"
  },
  {
    "slug": "python-security-check-hardcoded-secrets",
    "title": "Check Hardcoded Secrets",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Scan sample source for secret patterns.",
    "problemStatement": "Scan sample source for secret patterns.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One Python source line.",
    "outputFormat": "Print POSSIBLE_SECRET if source assigns a nonempty string literal to password, secret or api_key; otherwise CLEAN.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Dependency and Code Security",
      "Python"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import ast\nsource = input()\n# Inspect assignment nodes\n"
  },
  {
    "slug": "python-security-analyze-dangerous-subprocess-calls",
    "title": "Analyze Dangerous Subprocess Calls",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Flag shell=True in AST.",
    "problemStatement": "Flag shell=True in AST.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One Python source line.",
    "outputFormat": "Print UNSAFE if subprocess.run/call/Popen is called with shell=True; otherwise SAFE.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Dependency and Code Security",
      "Python"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import ast\nsource = input()\n# Inspect subprocess calls\n"
  },
  {
    "slug": "python-security-create-static-security-scanner",
    "title": "Create Static Security Scanner",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Combine multiple AST-based checks.",
    "problemStatement": "Combine multiple AST-based checks.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One Python source line.",
    "outputFormat": "Print JSON with integer counts eval_calls, shell_calls and hardcoded_secrets, using AST.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Dependency and Code Security",
      "Python"
    ],
    "estimatedMinutes": 40,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import ast\nimport json\nsource = input()\n# Combine static checks\n"
  },
  // Module 10: Python Security Capstone
  {
    "slug": "python-security-secure-registration-validator",
    "title": "Secure Registration Validator",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Validate user registration payload.",
    "problemStatement": "Validate user registration payload.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One JSON object with username, email, password.",
    "outputFormat": "Print VALID if username matches module 2 policy, email has valid documented format, and password meets module 3 policy; otherwise INVALID.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Python Security Capstone",
      "Python"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import json\nimport re\npayload = json.loads(input())\n# Validate registration fields\n"
  },
  {
    "slug": "python-security-secure-file-upload-handler",
    "title": "Secure File Upload Handler",
    "technologySlug": "python",
    "difficulty": "Easy",
    "workspaceType": "code",
    "shortDescription": "Enforce filename and size policy.",
    "problemStatement": "Enforce filename and size policy.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "Line 1: filename. Line 2: size in bytes.",
    "outputFormat": "Print ACCEPT if filename is a safe single component ending in .txt, .pdf or .png and size is 0..1048576; otherwise REJECT.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Python Security Capstone",
      "Python"
    ],
    "estimatedMinutes": 15,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "filename = input()\nsize = int(input())\n# Apply upload restrictions\n"
  },
  {
    "slug": "python-security-authentication-audit-analyzer",
    "title": "Authentication Audit Analyzer",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Summarize failed logins and lockouts.",
    "problemStatement": "Summarize failed logins and lockouts.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One JSON array of objects with user, success and timestamp.",
    "outputFormat": "Print JSON mapping each user to failed login count; sort keys alphabetically.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Python Security Capstone",
      "Python"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import json\nevents = json.loads(input())\n# Analyze failed logins\n"
  },
  {
    "slug": "python-security-secure-configuration-auditor",
    "title": "Secure Configuration Auditor",
    "technologySlug": "python",
    "difficulty": "Medium",
    "workspaceType": "code",
    "shortDescription": "Check JSON config for unsafe settings.",
    "problemStatement": "Check JSON config for unsafe settings.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One JSON object with debug, tls_enabled and allowed_origins.",
    "outputFormat": "Print SECURE only if debug is false, tls_enabled true and allowed_origins does not contain *; otherwise INSECURE.",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Python Security Capstone",
      "Python"
    ],
    "estimatedMinutes": 25,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import json\nconfig = json.loads(input())\n# Audit security settings\n"
  },
  {
    "slug": "python-security-build-python-security-audit-toolkit",
    "title": "Build Python Security Audit Toolkit",
    "technologySlug": "python",
    "difficulty": "Hard",
    "workspaceType": "code",
    "shortDescription": "Combine file, config, and log audits.",
    "problemStatement": "Combine file, config, and log audits.\n\nImplement a Python 3 program that follows the input and output contract exactly. Use safe standard-library APIs where possible. Do not hard-code outputs or bypass the requested security checks.",
    "inputFormat": "One JSON object with files (list of octal modes), config (security settings) and events (login objects).",
    "outputFormat": "Print JSON with exposed_files (count of modes with group/other bits), config_secure (boolean), and failed_logins (integer).",
    "constraints": [
      "Use Python 3.",
      "Read input from standard input where specified.",
      "Print only the required result to standard output.",
      "Do not hard-code outputs; use safe APIs and validation."
    ],
    "skills": [
      "Python Security",
      "Python Security Capstone",
      "Python"
    ],
    "estimatedMinutes": 40,
    "defaultLanguage": "python",
    "allowedLanguages": [
      "python"
    ],
    "starterCode": "import json\npayload = json.loads(input())\n# Combine file, configuration and event audits\n"
  },
];
