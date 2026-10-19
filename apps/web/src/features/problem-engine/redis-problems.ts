import type {
  PracticeProblem,
} from './types';

/* =========================================================
   REDIS PRACTICE PROBLEMS

   PRACTICE RULES

   1. Every Redis practice problem uses:
      workspaceType: 'database'

   2. problemStatement contains learner instructions.

   3. starterCode must NOT reveal the solution.

   4. The learner writes Redis CLI commands.

   5. Run executes commands inside an isolated Redis sandbox.

   6. Submit executes hidden Redis validation.

   7. Learner commands must NEVER execute against the
      platform Redis instance.

   IMPORTANT FOR BACKEND

   Some problems require initial keys/data.

   These fixtures must be created automatically by the
   sandbox based on problemSlug.
========================================================= */

export const redisProblems:
  PracticeProblem[] = [

    /* =====================================================
       BEGINNER
       STRING FUNDAMENTALS
    ===================================================== */

    {
      slug:
        'redis-set-value',

      title:
        'Store a Value',

      technologySlug:
        'redis',

      difficulty:
        'Easy',

      workspaceType:
        'database',

      shortDescription:
        'Store a value in Redis using the SET command.',

      problemStatement: `# Store a Value

Create a Redis key named:

employee:name

Store the following value:

Ananya

## Requirements

- Use the Redis SET command.
- The key must be employee:name.
- The value must be Ananya.
- Do not create additional keys.

## Expected Result

employee:name should contain the value Ananya.

## Skills

**Redis, SET, Strings, Key-Value Storage**`,

      outputFormat:
        'Store the value Ananya in the Redis key employee:name.',

      skills: [
        'Redis',
        'SET',
        'Strings',
        'Key-Value Storage',
      ],

      estimatedMinutes:
        5,

      defaultLanguage:
        'sql',

      allowedLanguages: [
        'sql',
      ],

      starterCode:
        `# Write your Redis command here\n`,
    },

    /* =====================================================
       BEGINNER
       GET VALUE
    ===================================================== */

    {
      slug:
        'redis-get-value',

      title:
        'Retrieve a Value',

      technologySlug:
        'redis',

      difficulty:
        'Easy',

      workspaceType:
        'database',

      shortDescription:
        'Retrieve an existing Redis string value using GET.',

      problemStatement: `# Retrieve a Value

The following Redis key already exists:

employee:name

Its value is:

Ananya

Retrieve the value stored in employee:name.

## Requirements

- Use GET.
- Retrieve employee:name.
- Do not modify the key.

## Expected Result

The command should return:

Ananya

## Skills

**Redis, GET, Strings, Key-Value Storage**`,

      outputFormat:
        'Return the value stored in employee:name.',

      skills: [
        'Redis',
        'GET',
        'Strings',
        'Key-Value Storage',
      ],

      estimatedMinutes:
        5,

      defaultLanguage:
        'sql',

      allowedLanguages: [
        'sql',
      ],

      starterCode:
        `# Retrieve the employee name here\n`,
    },

    /* =====================================================
       BEGINNER
       KEY EXISTENCE
    ===================================================== */

    {
      slug:
        'redis-key-exists',

      title:
        'Check Whether a Key Exists',

      technologySlug:
        'redis',

      difficulty:
        'Easy',

      workspaceType:
        'database',

      shortDescription:
        'Check whether a Redis key exists using EXISTS.',

      problemStatement: `# Check Whether a Key Exists

The following Redis key already exists:

employee:name

Check whether the key exists.

## Requirements

- Use EXISTS.
- Check employee:name.
- Do not modify or delete the key.

## Expected Result

Redis should return:

1

## Skills

**Redis, EXISTS, Keys, Key Validation**`,

      outputFormat:
        'Check whether employee:name exists.',

      skills: [
        'Redis',
        'EXISTS',
        'Keys',
        'Key Validation',
      ],

      estimatedMinutes:
        5,

      defaultLanguage:
        'sql',

      allowedLanguages: [
        'sql',
      ],

      starterCode:
        `# Check whether the key exists\n`,
    },

    /* =====================================================
       BEGINNER
       DELETE KEY
    ===================================================== */

    {
      slug:
        'redis-delete-key',

      title:
        'Delete a Key',

      technologySlug:
        'redis',

      difficulty:
        'Easy',

      workspaceType:
        'database',

      shortDescription:
        'Delete an existing Redis key using DEL.',

      problemStatement: `# Delete a Key

The following Redis key already exists:

employee:temporary

Delete this key.

## Requirements

- Use DEL.
- Delete employee:temporary.
- Do not delete any other key.

## Expected Result

employee:temporary should no longer exist.

## Skills

**Redis, DEL, Keys, Data Management**`,

      outputFormat:
        'Delete only the Redis key employee:temporary.',

      skills: [
        'Redis',
        'DEL',
        'Keys',
        'Data Management',
      ],

      estimatedMinutes:
        5,

      defaultLanguage:
        'sql',

      allowedLanguages: [
        'sql',
      ],

      starterCode:
        `# Delete employee:temporary here\n`,
    },

    /* =====================================================
       BEGINNER
       COUNTERS
    ===================================================== */

    {
      slug:
        'redis-increment-counter',

      title:
        'Increment a Counter',

      technologySlug:
        'redis',

      difficulty:
        'Easy',

      workspaceType:
        'database',

      shortDescription:
        'Increment a numeric Redis value using INCR.',

      problemStatement: `# Increment a Counter

The following Redis key already exists:

page:views

Its current value is:

10

Increment the value by exactly 1.

## Requirements

- Use INCR.
- Increment page:views.
- Do not use SET to replace the value.

## Expected Result

page:views should contain:

11

## Skills

**Redis, INCR, Counters, Atomic Operations**`,

      outputFormat:
        'Increment page:views from 10 to 11.',

      skills: [
        'Redis',
        'INCR',
        'Counters',
        'Atomic Operations',
      ],

      estimatedMinutes:
        5,

      defaultLanguage:
        'sql',

      allowedLanguages: [
        'sql',
      ],

      starterCode:
        `# Increment page:views here\n`,
    },

    /* =====================================================
       INTERMEDIATE
       EXPIRATION
    ===================================================== */

    {
      slug:
        'redis-key-expiration',

      title:
        'Set Key Expiration',

      technologySlug:
        'redis',

      difficulty:
        'Medium',

      workspaceType:
        'database',

      shortDescription:
        'Set an expiration time on an existing Redis key.',

      problemStatement: `# Set Key Expiration

The following key already exists:

session:user:101

Set the key to expire after:

300 seconds

## Requirements

- Use EXPIRE.
- Apply the expiration to session:user:101.
- Set the expiration to 300 seconds.
- Do not delete the key.

## Expected Result

session:user:101 should have an expiration time.

## Skills

**Redis, EXPIRE, TTL, Session Management**`,

      outputFormat:
        'Set session:user:101 to expire after 300 seconds.',

      skills: [
        'Redis',
        'EXPIRE',
        'TTL',
        'Session Management',
      ],

      estimatedMinutes:
        10,

      defaultLanguage:
        'sql',

      allowedLanguages: [
        'sql',
      ],

      starterCode:
        `# Set the key expiration here\n`,
    },

    /* =====================================================
       INTERMEDIATE
       HASHES
    ===================================================== */

    {
      slug:
        'redis-hash',

      title:
        'Create an Employee Hash',

      technologySlug:
        'redis',

      difficulty:
        'Medium',

      workspaceType:
        'database',

      shortDescription:
        'Store structured employee data using a Redis hash.',

      problemStatement: `# Create an Employee Hash

Create a Redis hash named:

employee:101

Store these fields:

name = Ananya
department = Engineering
salary = 65000

## Requirements

- Use HSET.
- The hash key must be employee:101.
- Store name as Ananya.
- Store department as Engineering.
- Store salary as 65000.

## Expected Result

employee:101 should contain all three required fields.

## Skills

**Redis, Hashes, HSET, Structured Data**`,

      outputFormat:
        'Create employee:101 with name, department and salary fields.',

      skills: [
        'Redis',
        'Hashes',
        'HSET',
        'Structured Data',
      ],

      estimatedMinutes:
        10,

      defaultLanguage:
        'sql',

      allowedLanguages: [
        'sql',
      ],

      starterCode:
        `# Create the employee hash here\n`,
    },

    /* =====================================================
       INTERMEDIATE
       HASH RETRIEVAL
    ===================================================== */

    {
      slug:
        'redis-hgetall',

      title:
        'Retrieve an Employee Hash',

      technologySlug:
        'redis',

      difficulty:
        'Medium',

      workspaceType:
        'database',

      shortDescription:
        'Retrieve all fields from a Redis hash.',

      problemStatement: `# Retrieve an Employee Hash

The following hash already exists:

employee:101

Retrieve every field and value stored in the hash.

## Requirements

- Use HGETALL.
- Query employee:101.
- Do not modify the hash.

## Expected Result

All employee:101 fields and values should be returned.

## Skills

**Redis, Hashes, HGETALL, Data Retrieval**`,

      outputFormat:
        'Return every field and value from employee:101.',

      skills: [
        'Redis',
        'Hashes',
        'HGETALL',
        'Data Retrieval',
      ],

      estimatedMinutes:
        10,

      defaultLanguage:
        'sql',

      allowedLanguages: [
        'sql',
      ],

      starterCode:
        `# Retrieve the employee hash here\n`,
    },

    /* =====================================================
       INTERMEDIATE
       LISTS
    ===================================================== */

    {
      slug:
        'redis-list',

      title:
        'Create a Task List',

      technologySlug:
        'redis',

      difficulty:
        'Medium',

      workspaceType:
        'database',

      shortDescription:
        'Create an ordered Redis list using RPUSH.',

      problemStatement: `# Create a Task List

Create a Redis list named:

tasks

Add the following values in this exact order:

design
develop
test

## Requirements

- Use RPUSH.
- The key must be tasks.
- Preserve the required order.
- Do not add additional values.

## Expected Result

The tasks list should contain:

design
develop
test

in that order.

## Skills

**Redis, Lists, RPUSH, Ordered Data**`,

      outputFormat:
        'Create tasks containing design, develop and test in that order.',

      skills: [
        'Redis',
        'Lists',
        'RPUSH',
        'Ordered Data',
      ],

      estimatedMinutes:
        10,

      defaultLanguage:
        'sql',

      allowedLanguages: [
        'sql',
      ],

      starterCode:
        `# Create the tasks list here\n`,
    },

    /* =====================================================
       INTERMEDIATE
       LIST RETRIEVAL
    ===================================================== */

    {
      slug:
        'redis-list-range',

      title:
        'Retrieve All List Items',

      technologySlug:
        'redis',

      difficulty:
        'Medium',

      workspaceType:
        'database',

      shortDescription:
        'Retrieve all values from a Redis list using LRANGE.',

      problemStatement: `# Retrieve All List Items

The tasks list is already populated.

Retrieve every value from the list.

## Requirements

- Use LRANGE.
- Query the tasks key.
- Start from index 0.
- Return all remaining elements.
- Do not modify the list.

## Expected Result

All values in tasks should be returned.

## Skills

**Redis, Lists, LRANGE, Data Retrieval**`,

      outputFormat:
        'Return every item from the tasks list.',

      skills: [
        'Redis',
        'Lists',
        'LRANGE',
        'Data Retrieval',
      ],

      estimatedMinutes:
        10,

      defaultLanguage:
        'sql',

      allowedLanguages: [
        'sql',
      ],

      starterCode:
        `# Retrieve all task items here\n`,
    },

    /* =====================================================
       ADVANCED
       SETS
    ===================================================== */

    {
      slug:
        'redis-set-members',

      title:
        'Store Unique Employee Skills',

      technologySlug:
        'redis',

      difficulty:
        'Hard',

      workspaceType:
        'database',

      shortDescription:
        'Store unique employee skills using a Redis set.',

      problemStatement: `# Store Unique Employee Skills

Create a Redis set named:

employee:101:skills

Add these skills:

JavaScript
NodeJS
Redis

## Requirements

- Use SADD.
- Use employee:101:skills.
- Add all three required skills.
- Do not add additional members.

## Expected Result

employee:101:skills should contain all three unique skills.

## Skills

**Redis, Sets, SADD, Unique Values**`,

      outputFormat:
        'Store JavaScript, NodeJS and Redis in employee:101:skills.',

      skills: [
        'Redis',
        'Sets',
        'SADD',
        'Unique Values',
      ],

      estimatedMinutes:
        15,

      defaultLanguage:
        'sql',

      allowedLanguages: [
        'sql',
      ],

      starterCode:
        `# Add the employee skills here\n`,
    },

    /* =====================================================
       ADVANCED
       SORTED SETS
    ===================================================== */

    {
      slug:
        'redis-sorted-set',

      title:
        'Create a Leaderboard',

      technologySlug:
        'redis',

      difficulty:
        'Hard',

      workspaceType:
        'database',

      shortDescription:
        'Create a scored leaderboard using a Redis sorted set.',

      problemStatement: `# Create a Leaderboard

Create a sorted set named:

leaderboard

Add:

Ananya with score 95
Rahul with score 82
Meera with score 91

## Requirements

- Use ZADD.
- The key must be leaderboard.
- Use the exact scores provided.
- Add all three members.

## Expected Result

leaderboard should contain all three users with their required scores.

## Skills

**Redis, Sorted Sets, ZADD, Scores, Leaderboards**`,

      outputFormat:
        'Create leaderboard with Ananya 95, Rahul 82 and Meera 91.',

      skills: [
        'Redis',
        'Sorted Sets',
        'ZADD',
        'Scores',
        'Leaderboards',
      ],

      estimatedMinutes:
        15,

      defaultLanguage:
        'sql',

      allowedLanguages: [
        'sql',
      ],

      starterCode:
        `# Create the leaderboard here\n`,
    },

    /* =====================================================
       ADVANCED
       SORTED SET RETRIEVAL
    ===================================================== */

    {
      slug:
        'redis-leaderboard-ranking',

      title:
        'Rank Leaderboard Members',

      technologySlug:
        'redis',

      difficulty:
        'Hard',

      workspaceType:
        'database',

      shortDescription:
        'Retrieve leaderboard members from highest to lowest score.',

      problemStatement: `# Rank Leaderboard Members

The leaderboard sorted set is already populated.

Return all members from the highest score to the lowest score.

Include each member's score.

## Requirements

- Use ZREVRANGE.
- Query leaderboard.
- Return every member.
- Include scores.
- Do not modify the sorted set.

## Expected Result

The ranking should be:

Ananya = 95
Meera = 91
Rahul = 82

## Skills

**Redis, Sorted Sets, ZREVRANGE, Ranking**`,

      outputFormat:
        'Return all leaderboard members from highest to lowest score with scores.',

      skills: [
        'Redis',
        'Sorted Sets',
        'ZREVRANGE',
        'Ranking',
      ],

      estimatedMinutes:
        15,

      defaultLanguage:
        'sql',

      allowedLanguages: [
        'sql',
      ],

      starterCode:
        `# Retrieve the leaderboard ranking here\n`,
    },

    /* =====================================================
       ADVANCED
       TRANSACTIONS
    ===================================================== */

    {
      slug:
        'redis-transactions',

      title:
        'Transfer Balance with a Transaction',

      technologySlug:
        'redis',

      difficulty:
        'Hard',

      workspaceType:
        'database',

      shortDescription:
        'Use a Redis transaction to transfer a balance between accounts.',

      problemStatement: `# Transfer Balance with a Transaction

The following keys already exist:

account:101:balance = 1000
account:102:balance = 500

Transfer 100 from account 101 to account 102.

## Requirements

1. Use MULTI.
2. Decrease account:101:balance by 100 using DECRBY.
3. Increase account:102:balance by 100 using INCRBY.
4. Use EXEC.
5. Both balance operations must be part of the same transaction.
6. Do not replace the balances manually with SET.

## Expected Result

account:101:balance should become:

900

account:102:balance should become:

600

## Skills

**Redis, Transactions, MULTI, DECRBY, INCRBY, EXEC**`,

      outputFormat:
        'Transfer 100 from account:101:balance to account:102:balance inside one Redis transaction.',

      skills: [
        'Redis',
        'Transactions',
        'MULTI',
        'DECRBY',
        'INCRBY',
        'EXEC',
      ],

      estimatedMinutes:
        20,

      defaultLanguage:
        'sql',

      allowedLanguages: [
        'sql',
      ],

      starterCode:
        `# Write the Redis transaction here\n`,
    },
  ];

/* =========================================================
   REDIS PROBLEM HELPERS
========================================================= */

export function getRedisProblemBySlug(
  problemSlug: string,
): PracticeProblem | undefined {
  return redisProblems.find(
    (
      problem,
    ) =>
      problem.slug ===
      problemSlug,
  );
}

export function isRedisProblem(
  problemSlug: string,
): boolean {
  return redisProblems.some(
    (
      problem,
    ) =>
      problem.slug ===
      problemSlug,
  );
}