import type { PracticeProblem } from './types';

/* =========================================================
   GENERATIVE AI PRACTICE PROBLEMS
   Technology: generative-ai | Workspace: code | Language: python
   Offline deterministic stdin/stdout questions.
   Word counts and parameter ranges are exercise-specific,
   not representations of vendor tokenizers or APIs.
========================================================= */

export const generativeAiProblems: PracticeProblem[] = [
  /* 1. COUNT PROMPT TOKENS */
  {
    "slug": "genai-token-count",
    "title": "Count Prompt Tokens",
    "technologySlug": "generative-ai",
    "workspaceType": "code",
    "defaultLanguage": "python",
    "difficulty": "Easy",
    "shortDescription": "Count whitespace-separated tokens in a prompt.",
    "problemStatement": "Read a line containing a prompt and count tokens separated by whitespace. A token for this exercise is a nonempty whitespace-separated word, NOT a tokenizer-model token.",
    "inputFormat": "One line containing the prompt (possibly empty).",
    "outputFormat": "One integer: whitespace-separated word count.",
    "constraints": [
      "0 <= prompt length <= 100000",
      "Use whitespace splitting; repeated spaces count as one separator."
    ],
    "notes": [
      "Offline deterministic Python exercise; no external LLM services or API keys required."
    ],
    "skills": [
      "Generative AI",
      "Python",
      "Prompt Processing",
      "Token Counting"
    ],
    "estimatedMinutes": 15,
    "sampleTests": [
      {
        "id": "genai-token-count-sample-1",
        "title": "Ordinary prompt",
        "input": "Explain machine learning\n",
        "expectedOutput": "3"
      },
      {
        "id": "genai-token-count-sample-2",
        "title": "Empty prompt",
        "input": "\n",
        "expectedOutput": "0"
      }
    ],
    "starterCode": "prompt = input()\n\n# Count whitespace-separated words\n"
  },
  /* 2. FILL A PROMPT TEMPLATE */
  {
    "slug": "genai-prompt-template",
    "title": "Fill a Prompt Template",
    "technologySlug": "generative-ai",
    "workspaceType": "code",
    "defaultLanguage": "python",
    "difficulty": "Easy",
    "shortDescription": "Replace placeholders in a reusable prompt.",
    "problemStatement": "Read a template, a topic, and a tone on separate lines. Replace every occurrence of {topic} and {tone} in the template with the supplied values; leave all other characters untouched.",
    "inputFormat": "Line 1: template.\nLine 2: topic.\nLine 3: tone.",
    "outputFormat": "One line with the filled template.",
    "constraints": [
      "Each line has at most 10000 characters",
      "Placeholders are case-sensitive",
      "Values are used literally."
    ],
    "notes": [
      "Offline deterministic Python exercise; no external LLM services or API keys required."
    ],
    "skills": [
      "Generative AI",
      "Python",
      "Prompt Engineering",
      "String Replacement"
    ],
    "estimatedMinutes": 15,
    "sampleTests": [
      {
        "id": "genai-prompt-template-sample-1",
        "title": "Basic",
        "input": "Explain {topic} in a {tone} tone.\nAI\nfriendly\n",
        "expectedOutput": "Explain AI in a friendly tone."
      },
      {
        "id": "genai-prompt-template-sample-2",
        "title": "Repeated",
        "input": "{topic}: {topic}; tone={tone}\nRAG\nformal\n",
        "expectedOutput": "RAG: RAG; tone=formal"
      }
    ],
    "starterCode": "template = input()\ntopic = input()\ntone = input()\n\n# Replace all occurrences of {topic} and {tone}\n"
  },
  /* 3. VALIDATE GENERATION PARAMETERS */
  {
    "slug": "genai-validate-model-parameters",
    "title": "Validate Generation Parameters",
    "technologySlug": "generative-ai",
    "workspaceType": "code",
    "defaultLanguage": "python",
    "difficulty": "Easy",
    "shortDescription": "Check temperature and maximum output tokens.",
    "problemStatement": "Read temperature as a decimal number and max_output_tokens as an integer. Print VALID if 0.0 <= temperature <= 2.0 and 1 <= max_output_tokens <= 4096; otherwise print INVALID. These ranges are exercise rules, not universal API limits.",
    "inputFormat": "Line 1: temperature.\nLine 2: max_output_tokens.",
    "outputFormat": "VALID or INVALID.",
    "constraints": [
      "Inputs are valid numeric strings",
      "-10 <= temperature <= 10",
      "-100000 <= max_output_tokens <= 100000"
    ],
    "notes": [
      "Offline deterministic Python exercise; no external LLM services or API keys required."
    ],
    "skills": [
      "Generative AI",
      "Python",
      "Model Configuration",
      "Validation"
    ],
    "estimatedMinutes": 15,
    "sampleTests": [
      {
        "id": "genai-validate-model-parameters-sample-1",
        "title": "Valid",
        "input": "0.7\n1024\n",
        "expectedOutput": "VALID"
      },
      {
        "id": "genai-validate-model-parameters-sample-2",
        "title": "Too many tokens",
        "input": "1.0\n4097\n",
        "expectedOutput": "INVALID"
      }
    ],
    "starterCode": "temperature = float(input())\nmax_output_tokens = int(input())\n\n# Validate both values\n"
  },
  /* 4. ESTIMATE TOKEN USAGE COST */
  {
    "slug": "genai-estimate-token-cost",
    "title": "Estimate Token Usage Cost",
    "technologySlug": "generative-ai",
    "workspaceType": "code",
    "defaultLanguage": "python",
    "difficulty": "Easy",
    "shortDescription": "Compute a deterministic inference cost in micro-units.",
    "problemStatement": "Read input_tokens, output_tokens, input_rate and output_rate as nonnegative integers. Rates represent microcredits per 1000 tokens. Compute the total billed microcredits as ceil(input_tokens * input_rate / 1000) + ceil(output_tokens * output_rate / 1000). Use integer arithmetic.",
    "inputFormat": "Line 1: input_tokens output_tokens.\nLine 2: input_rate output_rate.",
    "outputFormat": "One integer representing billed microcredits.",
    "constraints": [
      "0 <= token counts <= 10^9",
      "0 <= rates <= 10^6",
      "Round each component upward independently."
    ],
    "notes": [
      "Offline deterministic Python exercise; no external LLM services or API keys required."
    ],
    "skills": [
      "Generative AI",
      "Python",
      "Token Economics",
      "Integer Arithmetic"
    ],
    "estimatedMinutes": 15,
    "sampleTests": [
      {
        "id": "genai-estimate-token-cost-sample-1",
        "title": "Whole increments",
        "input": "1000 500\n2 4\n",
        "expectedOutput": "4"
      },
      {
        "id": "genai-estimate-token-cost-sample-2",
        "title": "Component rounding",
        "input": "1 1\n1 1\n",
        "expectedOutput": "2"
      }
    ],
    "starterCode": "input_tokens, output_tokens = map(int, input().split())\ninput_rate, output_rate = map(int, input().split())\n\n# Apply ceiling division per component\n"
  },
  /* 5. SPLIT TEXT INTO CHUNKS */
  {
    "slug": "genai-split-text-chunks",
    "title": "Split Text Into Chunks",
    "technologySlug": "generative-ai",
    "workspaceType": "code",
    "defaultLanguage": "python",
    "difficulty": "Easy",
    "shortDescription": "Divide tokenized text into bounded chunks.",
    "problemStatement": "Read K then a single line of text. Split on whitespace into words and group consecutive words into chunks of at most K words. Output the number of chunks, followed by each chunk on its own line, with single spaces between words. Empty text produces zero chunks.",
    "inputFormat": "Line 1: positive integer K.\nLine 2: text (may be empty).",
    "outputFormat": "Line 1: number of chunks.\nFollowing lines: each chunk.",
    "constraints": [
      "1 <= K <= 10000",
      "Text length <= 100000",
      "No overlap between chunks."
    ],
    "notes": [
      "Offline deterministic Python exercise; no external LLM services or API keys required."
    ],
    "skills": [
      "Generative AI",
      "Python",
      "Text Chunking",
      "RAG Preprocessing"
    ],
    "estimatedMinutes": 15,
    "sampleTests": [
      {
        "id": "genai-split-text-chunks-sample-1",
        "title": "Two chunks",
        "input": "3\none two three four five\n",
        "expectedOutput": "2\none two three\nfour five"
      },
      {
        "id": "genai-split-text-chunks-sample-2",
        "title": "Empty",
        "input": "2\n\n",
        "expectedOutput": "0"
      }
    ],
    "starterCode": "k = int(input())\nwords = input().split()\n\n# Create consecutive groups of up to k words\n"
  },
  /* 6. FORMAT CHAT HISTORY */
  {
    "slug": "genai-build-chat-history",
    "title": "Format Chat History",
    "technologySlug": "generative-ai",
    "workspaceType": "code",
    "defaultLanguage": "python",
    "difficulty": "Easy",
    "shortDescription": "Turn role/message pairs into a formatted transcript.",
    "problemStatement": "Read N chat messages. Each message is a role on one line and text on the next. Allowed roles: system, user, assistant. Print N lines in original order as ROLE: message where ROLE is uppercased. Preserve message text exactly.",
    "inputFormat": "Line 1: N.\nFor each message: one role line, then one message line.",
    "outputFormat": "N lines of ROLE: message.",
    "constraints": [
      "0 <= N <= 1000",
      "Each message is one line",
      "Roles are system, user, or assistant."
    ],
    "notes": [
      "Offline deterministic Python exercise; no external LLM services or API keys required."
    ],
    "skills": [
      "Generative AI",
      "Python",
      "Chat Interfaces",
      "Message Formatting"
    ],
    "estimatedMinutes": 15,
    "sampleTests": [
      {
        "id": "genai-build-chat-history-sample-1",
        "title": "Conversation",
        "input": "2\nuser\nHi\nassistant\nHello!\n",
        "expectedOutput": "USER: Hi\nASSISTANT: Hello!"
      },
      {
        "id": "genai-build-chat-history-sample-2",
        "title": "Empty transcript",
        "input": "0\n",
        "expectedOutput": ""
      }
    ],
    "starterCode": "n = int(input())\n\n# Read roles/messages and print a formatted transcript\n"
  },
  /* 7. COMPUTE COSINE SIMILARITY */
  {
    "slug": "genai-cosine-similarity",
    "title": "Compute Cosine Similarity",
    "technologySlug": "generative-ai",
    "workspaceType": "code",
    "defaultLanguage": "python",
    "difficulty": "Medium",
    "shortDescription": "Measure the similarity of two integer embeddings.",
    "problemStatement": "Read dimension N and two integer vectors of length N. Compute cosine similarity = dot(A,B) / (norm(A)*norm(B)), rounded to exactly four decimals. If either vector has zero magnitude, print 0.0000.",
    "inputFormat": "Line 1: N.\nLine 2: vector A.\nLine 3: vector B.",
    "outputFormat": "One number with exactly four decimal places.",
    "constraints": [
      "1 <= N <= 10000",
      "-1000 <= each coordinate <= 1000",
      "Zero vector returns 0.0000."
    ],
    "notes": [
      "Offline deterministic Python exercise; no external LLM services or API keys required."
    ],
    "skills": [
      "Generative AI",
      "Python",
      "Embeddings",
      "Vector Similarity"
    ],
    "estimatedMinutes": 25,
    "sampleTests": [
      {
        "id": "genai-cosine-similarity-sample-1",
        "title": "Same direction",
        "input": "2\n1 2\n2 4\n",
        "expectedOutput": "1.0000"
      },
      {
        "id": "genai-cosine-similarity-sample-2",
        "title": "Orthogonal",
        "input": "2\n1 0\n0 1\n",
        "expectedOutput": "0.0000"
      }
    ],
    "starterCode": "import math\nn = int(input())\na = list(map(int, input().split()))\nb = list(map(int, input().split()))\n\n# Compute cosine similarity (or zero for a zero vector)\n"
  },
  /* 8. RETRIEVE TOP-K DOCUMENTS */
  {
    "slug": "genai-retrieve-top-k-documents",
    "title": "Retrieve Top-K Documents",
    "technologySlug": "generative-ai",
    "workspaceType": "code",
    "defaultLanguage": "python",
    "difficulty": "Medium",
    "shortDescription": "Rank documents by similarity score.",
    "problemStatement": "Read N and K, then N lines each containing a unique document ID (without spaces) and its integer relevance score. Return the top K IDs in descending score order. Resolve equal scores by ascending lexicographic document ID. Print each selected ID on a separate line.",
    "inputFormat": "Line 1: N K.\nNext N lines: document_id score.",
    "outputFormat": "Up to K document IDs, one per line.",
    "constraints": [
      "1 <= N <= 100000",
      "0 <= K <= N",
      "-10^9 <= score <= 10^9",
      "IDs are unique, length <= 100."
    ],
    "notes": [
      "Offline deterministic Python exercise; no external LLM services or API keys required."
    ],
    "skills": [
      "Generative AI",
      "Python",
      "Retrieval",
      "Ranking",
      "Tie Breaking"
    ],
    "estimatedMinutes": 25,
    "sampleTests": [
      {
        "id": "genai-retrieve-top-k-documents-sample-1",
        "title": "Ranking",
        "input": "4 2\ndocB 10\ndocA 10\ndocC 12\ndocD 2\n",
        "expectedOutput": "docC\ndocA"
      },
      {
        "id": "genai-retrieve-top-k-documents-sample-2",
        "title": "No results",
        "input": "2 0\nx 1\ny 3\n",
        "expectedOutput": ""
      }
    ],
    "starterCode": "n, k = map(int, input().split())\ndocuments = []\nfor _ in range(n):\n    doc_id, score = input().split()\n    documents.append((doc_id, int(score)))\n\n# Sort by descending score then ascending ID\n"
  },
  /* 9. BUILD A RAG CONTEXT WINDOW */
  {
    "slug": "genai-build-rag-context",
    "title": "Build a RAG Context Window",
    "technologySlug": "generative-ai",
    "workspaceType": "code",
    "defaultLanguage": "python",
    "difficulty": "Medium",
    "shortDescription": "Assemble retrieved passages under a token budget.",
    "problemStatement": "Read a positive token budget B and N passages. Each passage occupies one line. A passage costs the number of whitespace-separated words it contains. Visit passages in input order. Append a passage if its word count fits the remaining budget; otherwise skip it and continue. Print selected passages joined by a single newline, or EMPTY if none selected. This exercise uses word counts rather than LLM tokenizer counts.",
    "inputFormat": "Line 1: B N.\nNext N lines: passages (possibly blank).",
    "outputFormat": "Selected passages, one per line; or EMPTY.",
    "constraints": [
      "0 <= B <= 100000",
      "0 <= N <= 10000",
      "Passages are single-line strings",
      "Do not truncate passages."
    ],
    "notes": [
      "Offline deterministic Python exercise; no external LLM services or API keys required."
    ],
    "skills": [
      "Generative AI",
      "Python",
      "RAG",
      "Context Windows",
      "Greedy Selection"
    ],
    "estimatedMinutes": 25,
    "sampleTests": [
      {
        "id": "genai-build-rag-context-sample-1",
        "title": "Skip oversized",
        "input": "4 3\none two three\nfour five six\nseven\n",
        "expectedOutput": "one two three\nseven"
      },
      {
        "id": "genai-build-rag-context-sample-2",
        "title": "Nothing fits",
        "input": "0 2\nhello\nworld\n",
        "expectedOutput": "EMPTY"
      }
    ],
    "starterCode": "budget, n = map(int, input().split())\npassages = [input() for _ in range(n)]\n\n# Select full passages that fit the remaining budget\n"
  },
  /* 10. EVALUATE GENERATED RESPONSE */
  {
    "slug": "genai-evaluate-generated-response",
    "title": "Evaluate Generated Response",
    "technologySlug": "generative-ai",
    "workspaceType": "code",
    "defaultLanguage": "python",
    "difficulty": "Medium",
    "shortDescription": "Measure lexical overlap against a reference response.",
    "problemStatement": "Read a reference response and a generated response, each on its own line. Tokenize both using lowercase whitespace-separated words. Compute precision = matching_token_count / generated_token_count, and recall = matching_token_count / reference_token_count, with multiset matching (repeated words can match only as many times as in the reference). Compute F1 as 2*precision*recall/(precision+recall), or zero if the denominator is zero. Print precision, recall, and F1 on one line, each to exactly four decimals. Treat empty denominators as zero.",
    "inputFormat": "Line 1: reference text (may be empty).\nLine 2: generated text (may be empty).",
    "outputFormat": "PRECISION RECALL F1, each formatted to four decimals.",
    "constraints": [
      "Each text length <= 100000",
      "Compare words case-insensitively",
      "Retain repetitions using multiset intersection."
    ],
    "notes": [
      "Offline deterministic Python exercise; no external LLM services or API keys required."
    ],
    "skills": [
      "Generative AI",
      "Python",
      "GenAI Evaluation",
      "Precision",
      "Recall",
      "F1 Score"
    ],
    "estimatedMinutes": 25,
    "sampleTests": [
      {
        "id": "genai-evaluate-generated-response-sample-1",
        "title": "Partial overlap",
        "input": "cat dog\ncat bird\n",
        "expectedOutput": "0.5000 0.5000 0.5000"
      },
      {
        "id": "genai-evaluate-generated-response-sample-2",
        "title": "Perfect match",
        "input": "Hello world\nhello world\n",
        "expectedOutput": "1.0000 1.0000 1.0000"
      }
    ],
    "starterCode": "from collections import Counter\nreference = input().lower().split()\ngenerated = input().lower().split()\n\n# Calculate multiset token overlap and P/R/F1\n"
  },
];

export function getGenerativeAiProblemBySlug(slug: string): PracticeProblem | undefined {
  return generativeAiProblems.find((problem) => problem.slug === slug);
}
