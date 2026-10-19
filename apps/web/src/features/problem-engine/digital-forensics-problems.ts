
import type { PracticeProblem } from './types';

/**
 * Cybersecurity > Digital Forensics
 *
 * Stack: digital-forensics
 * Technology: python
 * Runtime: python-security
 *
 * 10 modules | 30 offline Python exercises
 *
 * Note:
 * Hidden test cases and server-side grading
 * must be registered separately.
 */

type Difficulty = 'Easy' | 'Medium' | 'Hard';

type ForensicQuestion = {
  slug: string;
  title: string;
  module: string;
  difficulty: Difficulty;
  task: string;
  input: string;
  output: string;
  exampleInput: string;
  exampleOutput: string;
};

const starterCode = `import sys

def solve():
    data = sys.stdin.read()
    # TODO: Analyze the supplied forensic data.
    pass

if __name__ == "__main__":
    solve()
`;

const questions: ForensicQuestion[] = [
  // ======================================================
  // MODULE 1: DIGITAL FORENSICS FUNDAMENTALS
  // ======================================================
  {
    slug: 'identify-evidence-type',
    title: 'Identify Evidence Type',
    module: 'Digital Forensics Fundamentals',
    difficulty: 'Easy',
    task: 'Classify a file extension. Print IMAGE for .jpg or .png, LOG for .log, DOCUMENT for .pdf or .docx, and OTHER otherwise. Matching is case-insensitive.',
    input: 'One file extension including its leading dot.',
    output: 'IMAGE, LOG, DOCUMENT, or OTHER.',
    exampleInput: '.LOG',
    exampleOutput: 'LOG',
  },
  {
    slug: 'classify-digital-artifacts',
    title: 'Classify Digital Artifacts',
    module: 'Digital Forensics Fundamentals',
    difficulty: 'Easy',
    task: 'Classify an artifact source. Registry means SYSTEM, browser means USER, memory means VOLATILE, and anything else means UNKNOWN. Matching is case-insensitive.',
    input: 'One artifact source name.',
    output: 'SYSTEM, USER, VOLATILE, or UNKNOWN.',
    exampleInput: 'memory',
    exampleOutput: 'VOLATILE',
  },
  {
    slug: 'validate-evidence-record',
    title: 'Validate Evidence Record',
    module: 'Digital Forensics Fundamentals',
    difficulty: 'Medium',
    task: 'Validate an evidence record containing exactly three nonempty trimmed fields. The evidence ID must start with EV- followed by one or more decimal digits.',
    input: 'One CSV record: evidence_id,collector,location.',
    output: 'VALID or INVALID.',
    exampleInput: 'EV-102,Ana,Lab',
    exampleOutput: 'VALID',
  },

  // ======================================================
  // MODULE 2: EVIDENCE COLLECTION AND INTEGRITY
  // ======================================================
  {
    slug: 'compare-evidence-hashes',
    title: 'Compare Evidence Hashes',
    module: 'Evidence Collection and Integrity',
    difficulty: 'Easy',
    task: 'Compare two SHA-256 hexadecimal digests. Each must contain exactly 64 hexadecimal characters. Compare case-insensitively.',
    input: 'Two lines containing SHA-256 hexadecimal digests.',
    output: 'MATCH if identical, MISMATCH if different, or INVALID if either digest is malformed.',
    exampleInput: `${'a'.repeat(64)}\n${'A'.repeat(64)}`,
    exampleOutput: 'MATCH',
  },
  {
    slug: 'check-custody-sequence',
    title: 'Check Custody Sequence',
    module: 'Evidence Collection and Integrity',
    difficulty: 'Medium',
    task: 'Validate the order of chain-of-custody steps. There must be at least one step and the numbers must be exactly 1,2,...,N in order.',
    input: 'Comma-separated positive integer step numbers.',
    output: 'VALID or INVALID.',
    exampleInput: '1,2,3,4',
    exampleOutput: 'VALID',
  },
  {
    slug: 'verify-evidence-size',
    title: 'Verify Evidence Size',
    module: 'Evidence Collection and Integrity',
    difficulty: 'Easy',
    task: 'Compare expected and actual evidence sizes. Both must be nonnegative decimal integers.',
    input: 'expected_bytes,actual_bytes',
    output: 'VERIFIED if equal, ALTERED if different, or INVALID for malformed or negative values.',
    exampleInput: '4096,4096',
    exampleOutput: 'VERIFIED',
  },

  // ======================================================
  // MODULE 3: FILE SYSTEM FORENSICS
  // ======================================================
  {
    slug: 'detect-file-signature',
    title: 'Detect File Signature',
    module: 'File System Forensics',
    difficulty: 'Medium',
    task: 'Identify a file from its hexadecimal byte prefix. PDF starts with 25504446, PNG with 89504E470D0A1A0A, and JPG with FFD8FF. Match the longest applicable prefix. Input must contain an even number of hexadecimal digits.',
    input: 'One hexadecimal byte string without spaces.',
    output: 'PDF, PNG, JPG, UNKNOWN, or INVALID.',
    exampleInput: '255044462D312E37',
    exampleOutput: 'PDF',
  },
  {
    slug: 'classify-file-timestamps',
    title: 'Classify File Timestamps',
    module: 'File System Forensics',
    difficulty: 'Medium',
    task: 'Compare a file creation date with its modification date. Both must be valid ISO calendar dates. A modification date earlier than creation is an anomaly.',
    input: 'created,modified in YYYY-MM-DD format.',
    output: 'CONSISTENT, ANOMALY, or INVALID.',
    exampleInput: '2026-01-01,2026-01-03',
    exampleOutput: 'CONSISTENT',
  },
  {
    slug: 'count-deleted-records',
    title: 'Count Deleted Records',
    module: 'File System Forensics',
    difficulty: 'Easy',
    task: 'Count DELETED entries in a simulated file system record list. Each entry must be ACTIVE or DELETED, case-insensitively.',
    input: 'Comma-separated file status values.',
    output: 'The deleted record count, or INVALID for empty or malformed input.',
    exampleInput: 'ACTIVE,DELETED,ACTIVE,DELETED',
    exampleOutput: '2',
  },

  // ======================================================
  // MODULE 4: DISK AND STORAGE FORENSICS
  // ======================================================
  {
    slug: 'calculate-sector-offset',
    title: 'Calculate Sector Offset',
    module: 'Disk and Storage Forensics',
    difficulty: 'Easy',
    task: 'Calculate the byte offset of a disk sector. Sector number must be nonnegative and sector size must be 512 or 4096.',
    input: 'sector_number,sector_size',
    output: 'The product of the two numbers, or INVALID.',
    exampleInput: '8,512',
    exampleOutput: '4096',
  },
  {
    slug: 'validate-partition-range',
    title: 'Validate Partition Range',
    module: 'Disk and Storage Forensics',
    difficulty: 'Medium',
    task: 'Verify that a partition lies within a disk. Start must be nonnegative, length and total must be positive, and start + length must not exceed total.',
    input: 'start_sector,length_sectors,total_sectors',
    output: 'VALID or INVALID.',
    exampleInput: '100,200,1000',
    exampleOutput: 'VALID',
  },
  {
    slug: 'summarize-disk-image',
    title: 'Summarize Disk Image',
    module: 'Disk and Storage Forensics',
    difficulty: 'Medium',
    task: 'Calculate how many complete sectors fit in a disk image and how many bytes remain. Image size must be nonnegative and sector size must be 512 or 4096.',
    input: 'image_bytes,sector_size',
    output: 'Two integers separated by a space: complete_sectors remaining_bytes, or INVALID.',
    exampleInput: '1025,512',
    exampleOutput: '2 1',
  },

  // ======================================================
  // MODULE 5: WINDOWS FORENSICS
  // ======================================================
  {
    slug: 'classify-windows-event',
    title: 'Classify Windows Event',
    module: 'Windows Forensics',
    difficulty: 'Easy',
    task: 'Classify a Windows Event ID. 4624 means LOGON, 4625 means FAILED_LOGON, 4688 means PROCESS, and other nonnegative IDs mean OTHER.',
    input: 'One decimal Windows Event ID.',
    output: 'LOGON, FAILED_LOGON, PROCESS, OTHER, or INVALID.',
    exampleInput: '4625',
    exampleOutput: 'FAILED_LOGON',
  },
  {
    slug: 'detect-repeated-logon-failures',
    title: 'Detect Repeated Logon Failures',
    module: 'Windows Forensics',
    difficulty: 'Medium',
    task: 'Detect repeated failed logons by counting Windows Event ID 4625. Raise an alert when at least three failures are present.',
    input: 'A nonempty comma-separated list of decimal Windows Event IDs.',
    output: 'ALERT, NORMAL, or INVALID.',
    exampleInput: '4625,4624,4625,4625',
    exampleOutput: 'ALERT',
  },
  {
    slug: 'identify-registry-hive',
    title: 'Identify Registry Hive',
    module: 'Windows Forensics',
    difficulty: 'Easy',
    task: 'Classify a Windows Registry hive abbreviation. HKLM means MACHINE, HKCU means USER, HKCR means CLASSES. Matching is case-insensitive.',
    input: 'One registry hive abbreviation.',
    output: 'MACHINE, USER, CLASSES, or UNKNOWN.',
    exampleInput: 'HKLM',
    exampleOutput: 'MACHINE',
  },

  // ======================================================
  // MODULE 6: LINUX FORENSICS
  // ======================================================
  {
    slug: 'classify-linux-auth-result',
    title: 'Classify Linux Auth Result',
    module: 'Linux Forensics',
    difficulty: 'Easy',
    task: 'Classify a Linux authentication result. accepted means SUCCESS, failed means FAILURE, invalid means UNKNOWN_USER, and any other value means OTHER.',
    input: 'One authentication result word.',
    output: 'SUCCESS, FAILURE, UNKNOWN_USER, or OTHER.',
    exampleInput: 'failed',
    exampleOutput: 'FAILURE',
  },
  {
    slug: 'count-sudo-events',
    title: 'Count Sudo Events',
    module: 'Linux Forensics',
    difficulty: 'Easy',
    task: 'Count event labels equal to sudo, ignoring case and surrounding whitespace. Empty input produces zero.',
    input: 'Comma-separated Linux event labels.',
    output: 'The number of sudo events.',
    exampleInput: 'sudo,ssh,SUDO,cron',
    exampleOutput: '2',
  },
  {
    slug: 'evaluate-file-permissions',
    title: 'Evaluate File Permissions',
    module: 'Linux Forensics',
    difficulty: 'Medium',
    task: 'Analyze a three-digit octal permission string. The file is WORLD_WRITABLE when the final octal digit contains the write bit (2).',
    input: 'One three-digit octal permission string.',
    output: 'WORLD_WRITABLE, RESTRICTED, or INVALID.',
    exampleInput: '666',
    exampleOutput: 'WORLD_WRITABLE',
  },

  // ======================================================
  // MODULE 7: MEMORY FORENSICS
  // ======================================================
  {
    slug: 'identify-suspicious-process',
    title: 'Identify Suspicious Process',
    module: 'Memory Forensics',
    difficulty: 'Easy',
    task: 'Identify process names that imitate Windows system processes: svch0st.exe, expl0rer.exe, or lsasss.exe. Compare case-insensitively.',
    input: 'One process name.',
    output: 'SUSPICIOUS or NORMAL.',
    exampleInput: 'svch0st.exe',
    exampleOutput: 'SUSPICIOUS',
  },
  {
    slug: 'detect-orphan-process',
    title: 'Detect Orphan Process',
    module: 'Memory Forensics',
    difficulty: 'Medium',
    task: 'Classify a simulated process record as ORPHAN when PID is greater than 1 and parent PID is zero. Both identifiers must be nonnegative integers.',
    input: 'pid,ppid',
    output: 'ORPHAN, NORMAL, or INVALID.',
    exampleInput: '125,0',
    exampleOutput: 'ORPHAN',
  },
  {
    slug: 'summarize-memory-regions',
    title: 'Summarize Memory Regions',
    module: 'Memory Forensics',
    difficulty: 'Medium',
    task: 'Count memory regions with read, write, and execute permissions simultaneously. Allowed tokens are R, RW, RX, and RWX.',
    input: 'A nonempty comma-separated list of memory permission tokens.',
    output: 'The number of RWX regions, or INVALID.',
    exampleInput: 'RW,RWX,R,RWX',
    exampleOutput: '2',
  },

  // ======================================================
  // MODULE 8: NETWORK FORENSICS
  // ======================================================
  {
    slug: 'classify-network-port',
    title: 'Classify Network Port',
    module: 'Network Forensics',
    difficulty: 'Easy',
    task: 'Classify a TCP/UDP port. Port 80 is HTTP, 443 is HTTPS, 53 is DNS, and 22 is SSH. Other valid ports are OTHER.',
    input: 'One decimal port number between 0 and 65535.',
    output: 'HTTP, HTTPS, DNS, SSH, OTHER, or INVALID.',
    exampleInput: '443',
    exampleOutput: 'HTTPS',
  },
  {
    slug: 'count-external-connections',
    title: 'Count External Connections',
    module: 'Network Forensics',
    difficulty: 'Medium',
    task: 'Count destination IPv4 addresses outside private address ranges 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16. Reject malformed addresses.',
    input: 'Comma-separated IPv4 destination addresses.',
    output: 'The count of external addresses, or INVALID.',
    exampleInput: '192.168.1.2,8.8.8.8,10.1.2.3',
    exampleOutput: '1',
  },
  {
    slug: 'detect-port-scan-pattern',
    title: 'Detect Port Scan Pattern',
    module: 'Network Forensics',
    difficulty: 'Hard',
    task: 'Detect a simulated port scan when at least five distinct valid destination ports appear. Every port must be an integer from 0 through 65535.',
    input: 'Comma-separated destination port numbers.',
    output: 'SCAN, NORMAL, or INVALID.',
    exampleInput: '20,21,22,23,80',
    exampleOutput: 'SCAN',
  },

  // ======================================================
  // MODULE 9: FORENSIC TIMELINE ANALYSIS
  // ======================================================
  {
    slug: 'sort-forensic-timestamps',
    title: 'Sort Forensic Timestamps',
    module: 'Forensic Timeline Analysis',
    difficulty: 'Medium',
    task: 'Sort valid UTC timestamps into chronological order. Timestamps must follow YYYY-MM-DDTHH:MM:SSZ with valid date and time values.',
    input: 'A nonempty comma-separated list of UTC timestamps.',
    output: 'Sorted timestamps separated by commas, or INVALID.',
    exampleInput: '2026-01-02T10:00:00Z,2026-01-01T09:00:00Z',
    exampleOutput: '2026-01-01T09:00:00Z,2026-01-02T10:00:00Z',
  },
  {
    slug: 'calculate-event-gap',
    title: 'Calculate Event Gap',
    module: 'Forensic Timeline Analysis',
    difficulty: 'Medium',
    task: 'Calculate the absolute difference between two valid UTC timestamps in whole seconds.',
    input: 'Two lines, each containing a YYYY-MM-DDTHH:MM:SSZ timestamp.',
    output: 'The absolute difference in seconds, or INVALID.',
    exampleInput: '2026-01-01T10:00:00Z\n2026-01-01T10:01:30Z',
    exampleOutput: '90',
  },
  {
    slug: 'detect-timeline-order-anomaly',
    title: 'Detect Timeline Order Anomaly',
    module: 'Forensic Timeline Analysis',
    difficulty: 'Hard',
    task: 'Check whether forensic events are chronologically ordered. Equal timestamps are allowed, but a timestamp earlier than its predecessor indicates an anomaly.',
    input: 'A nonempty comma-separated list of UTC timestamps.',
    output: 'ANOMALY, ORDERED, or INVALID.',
    exampleInput: '2026-01-02T10:00:00Z,2026-01-01T10:00:00Z',
    exampleOutput: 'ANOMALY',
  },

  // ======================================================
  // MODULE 10: INCIDENT RECONSTRUCTION AND REPORTING
  // ======================================================
  {
    slug: 'rank-forensic-findings',
    title: 'Rank Forensic Findings',
    module: 'Incident Reconstruction and Reporting',
    difficulty: 'Medium',
    task: 'Determine the highest severity among forensic findings. Severity order is CRITICAL > HIGH > MEDIUM > LOW.',
    input: 'A nonempty comma-separated list of severity labels.',
    output: 'The highest severity, or INVALID.',
    exampleInput: 'LOW,HIGH,MEDIUM',
    exampleOutput: 'HIGH',
  },
  {
    slug: 'correlate-evidence-identifiers',
    title: 'Correlate Evidence Identifiers',
    module: 'Incident Reconstruction and Reporting',
    difficulty: 'Hard',
    task: 'Find evidence identifiers common to two evidence lists. Identifiers contain only letters, digits, and hyphens. Remove duplicates and sort common identifiers alphabetically.',
    input: 'Two lines of comma-separated evidence identifiers.',
    output: 'Common identifiers separated by commas, NONE if there are no matches, or INVALID.',
    exampleInput: 'EV-1,EV-2,EV-3\nEV-2,EV-4,EV-1',
    exampleOutput: 'EV-1,EV-2',
  },
  {
    slug: 'generate-incident-summary',
    title: 'Generate Incident Summary',
    module: 'Incident Reconstruction and Reporting',
    difficulty: 'Hard',
    task: 'Generate a normalized incident summary. Incident ID must be nonempty, severity must be LOW, MEDIUM, HIGH, or CRITICAL, and evidence count must be a nonnegative integer.',
    input: 'incident_id,severity,evidence_count',
    output: 'INCIDENT=<id>;SEVERITY=<severity>;EVIDENCE=<count>, or INVALID. Severity must be uppercase and count normalized to decimal.',
    exampleInput: 'INC-7,HIGH,3',
    exampleOutput: 'INCIDENT=INC-7;SEVERITY=HIGH;EVIDENCE=3',
  },
];

// ==========================================================
// CONVERT QUESTION DEFINITIONS TO E-LAB PRACTICE PROBLEMS
// ==========================================================

export const digitalForensicsProblems: PracticeProblem[] =
  questions.map((question) => {
    const {
      slug,
      title,
      module,
      difficulty,
      task,
      input,
      output,
      exampleInput,
      exampleOutput,
    } = question;

    const statement = [
      title,
      '',
      task,
      '',
      'Example input:',
      exampleInput,
      '',
      'Example output:',
      exampleOutput,
      '',
      'Write a Python 3 program that reads standard input',
      'and prints only the required output.',
      '',
      'Analyze supplied simulated or offline',
      'forensic evidence only.',
    ].join('\n');

    return {
      slug: `digital-forensics-${slug}`,
      title,
      technologySlug: 'python',
      difficulty,
      workspaceType: 'code',
      shortDescription: task,
      problemStatement: statement,
      inputFormat: input,
      outputFormat: output,
      constraints: [
        'Use Python 3.',
        'Read input from standard input.',
        'Print only the required output.',
        'Do not hard-code example answers.',
        'Validate input according to the problem.',
        'Do not access external networks.',
        'Use only supplied simulated forensic data.',
      ],
      skills: [
        'Digital Forensics',
        module,
        'Python',
        'Offline forensic analysis',
      ],
      estimatedMinutes:
        difficulty === 'Easy'
          ? 15
          : difficulty === 'Medium'
            ? 25
            : 40,
      defaultLanguage: 'python',
      allowedLanguages: ['python'],
      starterCode,
    };
  });
