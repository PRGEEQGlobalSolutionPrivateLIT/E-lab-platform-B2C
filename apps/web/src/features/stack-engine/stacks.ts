import type {
  StackDefinition,
} from './types';

export const stacks: StackDefinition[] = [
  /* =====================================================
     FULL STACK DEVELOPMENT
  ===================================================== */

  {
    slug: 'mern',

    domainSlug: 'full-stack',

    name: 'MERN Stack',

    shortName: 'MERN',

    description:
      'Build modern full-stack applications using MongoDB, Express.js, React and Node.js.',

    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
    ],

    level: 'Beginner to Advanced',
  },

  {
    slug: 'mean',

    domainSlug: 'full-stack',

    name: 'MEAN Stack',

    shortName: 'MEAN',

    description:
      'Build enterprise full-stack applications using MongoDB, Express.js, Angular and Node.js.',

    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
      'Angular',
      'Node.js',
      'Express.js',
      'MongoDB',
    ],

    level: 'Beginner to Advanced',
  },

  {
    slug: 'next-nest',

    domainSlug: 'full-stack',

    name: 'Next.js + NestJS',

    shortName: 'NEXT + NEST',

    description:
      'Build production-ready TypeScript applications using Next.js, NestJS and PostgreSQL.',

    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'NestJS',
      'PostgreSQL',
    ],

    level: 'Intermediate to Advanced',
  },

  {
    slug: 'django',

    domainSlug: 'full-stack',

    name: 'Django Full Stack',

    shortName: 'DJANGO',

    description:
      'Build complete web applications using Python, Django and PostgreSQL.',

    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'Python',
      'Django',
      'PostgreSQL',
    ],

    level: 'Beginner to Advanced',
  },

  {
    slug: 'react-spring',

    domainSlug: 'full-stack',

    name: 'React + Spring Boot',

    shortName: 'REACT + SPRING',

    description:
      'Build enterprise applications using React, Java, Spring Boot and PostgreSQL.',

    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'React',
      'Java',
      'Spring Boot',
      'PostgreSQL',
    ],

    level: 'Intermediate to Advanced',
  },

  {
    slug: 'angular-spring',

    domainSlug: 'full-stack',

    name: 'Angular + Spring Boot',

    shortName: 'ANGULAR + SPRING',

    description:
      'Build enterprise applications using Angular, Java, Spring Boot and PostgreSQL.',

    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
      'Angular',
      'Java',
      'Spring Boot',
      'PostgreSQL',
    ],

    level: 'Intermediate to Advanced',
  },

  {
    slug: 'dotnet',

    domainSlug: 'full-stack',

    name: '.NET Full Stack',

    shortName: '.NET',

    description:
      'Build enterprise applications using C#, ASP.NET Core and modern frontend technologies.',

    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'C#',
      'ASP.NET Core',
      'SQL Server',
    ],

    level: 'Beginner to Advanced',
  },

  /* =====================================================
     JAVA FULL STACK
  ===================================================== */

  {
    slug: 'java-fullstack',

    domainSlug: 'full-stack',

    name: 'Java Full Stack',

    shortName: 'JAVA FULL STACK',

    description:
      'Build complete full-stack applications using Java, Spring Boot, modern frontend technologies and PostgreSQL.',

    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'Java',
      'Spring Boot',
      'PostgreSQL',
    ],

    level: 'Beginner to Advanced',
  },

  /* =====================================================
     PHP FULL STACK
  ===================================================== */

  {
    slug: 'php-fullstack',

    domainSlug: 'full-stack',

    name: 'PHP Full Stack',

    shortName: 'PHP FULL STACK',

    description:
      'Build complete web applications using PHP, modern frontend technologies and MySQL.',

    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'PHP',
      'MySQL',
    ],

    level: 'Beginner to Advanced',
  },

  /* =====================================================
     DATA ANALYTICS
  ===================================================== */

  {
    slug: 'python-analytics',

    domainSlug: 'data-analytics',

    name: 'Python Data Analytics',

    shortName: 'PYTHON ANALYTICS',

    description:
      'Analyze and visualize data using Python, SQL, Pandas and modern analytics libraries.',

    technologies: [
      'Excel',
      'SQL',
      'Python',
      'NumPy',
      'Pandas',
      'Visualization',
    ],

    level: 'Beginner to Advanced',
  },

  {
    slug: 'power-bi',

    domainSlug: 'data-analytics',

    name: 'Power BI Analyst',

    shortName: 'POWER BI',

    description:
      'Build professional business intelligence reports, models and dashboards.',

    technologies: [
      'Excel',
      'SQL',
      'Power BI',
      'DAX',
      'Data Modeling',
    ],

    level: 'Beginner to Advanced',
  },

  /* =====================================================
     DATA ENGINEERING
  ===================================================== */

  {
    slug: 'python-spark',

    domainSlug: 'data-engineering',

    name: 'Python + Spark Data Engineering',

    shortName: 'PYTHON + SPARK',

    description:
      'Build scalable data pipelines using Python, SQL and Apache Spark.',

    technologies: [
      'SQL',
      'Python',
      'ETL',
      'Apache Spark',
      'Data Pipelines',
    ],

    level: 'Intermediate to Advanced',
  },

  /* =====================================================
     AI / ML
  ===================================================== */

  {
    slug: 'python-ml',

    domainSlug: 'ai-ml',

    name: 'Python Machine Learning',

    shortName: 'PYTHON ML',

    description:
      'Learn machine learning from Python fundamentals through complete ML projects.',

    technologies: [
      'Python',
      'NumPy',
      'Pandas',
      'Machine Learning',
      'Scikit-learn',
    ],

    level: 'Beginner to Advanced',
  },

  {
    slug: 'generative-ai',

    domainSlug: 'ai-ml',

    name: 'Generative AI Engineer',

    shortName: 'GEN AI',

    description:
      'Build modern AI applications using LLMs, prompting, embeddings and RAG.',

    technologies: [
      'Python',
      'LLMs',
      'Prompt Engineering',
      'Embeddings',
      'RAG',
    ],

    level: 'Intermediate to Advanced',
  },

  /* =====================================================
     CLOUD & DEVOPS
  ===================================================== */

  {
    slug: 'devops-engineer',

    domainSlug: 'cloud-devops',

    name: 'DevOps Engineer',

    shortName: 'DEVOPS',

    description:
      'Learn Linux, Git, Docker, Kubernetes and CI/CD from fundamentals through deployment.',

    technologies: [
      'Linux',
      'Git',
      'Docker',
      'Kubernetes',
      'CI/CD',
    ],

    level: 'Beginner to Advanced',
  },

  /* =====================================================
     CYBERSECURITY
  ===================================================== */

  {
    slug: 'linux-security',

    domainSlug: 'cybersecurity',

    name: 'Linux Security',

    shortName: 'LINUX SECURITY',

    description:
      'Secure Linux systems using permissions, access controls, auditing and system hardening.',

    technologies: [
      'Linux',
      'Bash',
      'OpenSSH',
      'UFW',
      'auditd',
    ],

    level: 'Beginner to Advanced',
  },

  {
    slug: 'python-security',

    domainSlug: 'cybersecurity',

    name: 'Python for Cybersecurity',

    shortName: 'PYTHON SECURITY',

    description:
      'Develop security automation, log analysis and cryptographic utilities using Python.',

    technologies: [
      'Python',
      'Scapy',
      'Cryptography',
      'Requests',
      'Bandit',
    ],

    level: 'Beginner to Advanced',
  },

  {
    slug: 'network-security',

    domainSlug: 'cybersecurity',

    name: 'Network Security',

    shortName: 'NETWORK SECURITY',

    description:
      'Analyze network traffic, detect threats and configure defensive network controls.',

    technologies: [
      'TCP/IP',
      'Wireshark',
      'Nmap',
      'tcpdump',
      'Suricata',
      'Zeek',
    ],

    level: 'Beginner to Advanced',
  },

  {
    slug: 'web-security',

    domainSlug: 'cybersecurity',

    name: 'Web Application Security',

    shortName: 'WEB SECURITY',

    description:
      'Identify and remediate common web application vulnerabilities in isolated labs.',

    technologies: [
      'OWASP Top 10',
      'OWASP ZAP',
      'Burp Suite',
      'OWASP Juice Shop',
    ],

    level: 'Beginner to Advanced',
  },

  {
    slug: 'penetration-testing',

    domainSlug: 'cybersecurity',

    name: 'Penetration Testing',

    shortName: 'PEN TESTING',

    description:
      'Practice authorized security testing and vulnerability verification in isolated environments.',

    technologies: [
      'Kali Linux',
      'Nmap',
      'Metasploit',
      'OWASP Testing Guide',
    ],

    level: 'Intermediate to Advanced',
  },

  {
    slug: 'soc-siem',

    domainSlug: 'cybersecurity',

    name: 'SOC & SIEM',

    shortName: 'SOC & SIEM',

    description:
      'Investigate security events, correlate alerts and detect threats using SOC and SIEM tools.',

    technologies: [
      'Wazuh',
      'Elastic Security',
      'Splunk',
      'Sigma',
      'YARA',
    ],

    level: 'Intermediate to Advanced',
  },

  {
    slug: 'digital-forensics',

    domainSlug: 'cybersecurity',

    name: 'Digital Forensics',

    shortName: 'FORENSICS',

    description:
      'Collect and analyze digital evidence using forensic investigation tools and techniques.',

    technologies: [
      'Autopsy',
      'Volatility 3',
      'Wireshark',
      'File Analysis',
    ],

    level: 'Intermediate to Advanced',
  },

  {
    slug: 'cloud-security',

    domainSlug: 'cybersecurity',

    name: 'Cloud Security',

    shortName: 'CLOUD SECURITY',

    description:
      'Secure cloud identities, configurations, workloads and audit trails.',

    technologies: [
      'AWS IAM',
      'AWS CloudTrail',
      'AWS Config',
      'Azure Security',
      'Terraform',
    ],

    level: 'Intermediate to Advanced',
  },

  {
    slug: 'devsecops',

    domainSlug: 'cybersecurity',

    name: 'DevSecOps',

    shortName: 'DEVSECOPS',

    description:
      'Integrate code, dependency, container and secret scanning into secure delivery pipelines.',

    technologies: [
      'Semgrep',
      'Trivy',
      'Gitleaks',
      'OWASP Dependency-Check',
      'GitHub Actions',
    ],

    level: 'Intermediate to Advanced',
  },

  {
    slug: 'incident-response',

    domainSlug: 'cybersecurity',

    name: 'Incident Response',

    shortName: 'INCIDENT RESPONSE',

    description:
      'Investigate security incidents and practice containment, recovery and reporting.',

    technologies: [
      'MITRE ATT&CK',
      'NIST',
      'Velociraptor',
      'TheHive',
    ],

    level: 'Intermediate to Advanced',
  },

  /* =====================================================
     BLOCKCHAIN & WEB3
  ===================================================== */

  {
    slug: 'ethereum-solidity',

    domainSlug: 'blockchain-web3',

    name: 'Ethereum & Solidity',

    shortName: 'ETHEREUM & SOLIDITY',

    description:
      'Learn Solidity programming, smart contract development, deployment and testing using an isolated local Ethereum Virtual Machine.',

    technologies: [
      'Solidity',
      'Ethereum',
      'EVM',
      'Smart Contracts',
      'Foundry',
      'Local Blockchain',
    ],

    level: 'Beginner to Advanced',
  },

  {
    slug: 'web3-dapp-development',

    domainSlug: 'blockchain-web3',

    name: 'Web3 & DApp Development',

    shortName: 'WEB3 & DAPP',

    description:
      'Build decentralized applications using JavaScript, TypeScript, ethers.js and locally deployed smart contracts.',

    technologies: [
      'JavaScript',
      'TypeScript',
      'Node.js',
      'ethers.js',
      'Web3',
      'DApps',
      'Local EVM',
    ],

    level: 'Beginner to Advanced',
  },

  {
    slug: 'smart-contract-security',

    domainSlug: 'blockchain-web3',

    name: 'Smart Contract Security',

    shortName: 'CONTRACT SECURITY',

    description:
      'Identify, test and remediate smart contract vulnerabilities using Solidity, Foundry tests and offline security analysis.',

    technologies: [
      'Solidity',
      'Foundry',
      'Smart Contract Auditing',
      'Security Testing',
      'Static Analysis',
      'Local EVM',
    ],

    level: 'Intermediate to Advanced',
  },

  {
    slug: 'defi-tokenization',

    domainSlug: 'blockchain-web3',

    name: 'DeFi & Tokenization',

    shortName: 'DEFI & TOKENS',

    description:
      'Develop and test token standards, decentralized finance primitives and simulated on-chain financial workflows entirely on a local EVM.',

    technologies: [
      'Solidity',
      'ERC-20',
      'ERC-721',
      'Tokenization',
      'DeFi',
      'Local EVM',
    ],

    level: 'Intermediate to Advanced',
  },

];

/* =========================================================
   HELPERS
========================================================= */

export function getStacksByDomain(
  domainSlug: string,
) {
  return stacks.filter(
    (stack) =>
      stack.domainSlug === domainSlug,
  );
}

export function getStackBySlug(
  domainSlug: string,
  stackSlug: string,
) {
  return stacks.find(
    (stack) =>
      stack.domainSlug === domainSlug &&
      stack.slug === stackSlug,
  );
}
