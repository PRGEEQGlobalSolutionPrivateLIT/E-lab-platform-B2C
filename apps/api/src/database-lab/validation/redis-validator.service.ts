import {
  BadRequestException,
  Injectable,
  Logger,
} from '@nestjs/common';

import {
  RedisSandboxService,
} from '../sandbox/redis-sandbox.service.js';

import type {
  RedisSandbox,
} from '../sandbox/redis-sandbox.service.js';

/* =========================================================
   VALIDATION TYPES
========================================================= */

export type RedisValidationTestResult = {
  name: string;

  passed: boolean;

  message: string;
};

export type RedisValidationResult = {
  accepted: boolean;

  passedTests: number;

  totalTests: number;

  score: number;

  message: string;

  tests: RedisValidationTestResult[];
};

/* =========================================================
   INTERNAL TYPES
========================================================= */

type ValidationContext = {
  problemSlug: string;

  sandbox: RedisSandbox;

  learnerCode: string;
};

type ProblemValidator = (
  context: ValidationContext,
) => Promise<RedisValidationResult>;

/* =========================================================
   REDIS VALIDATOR SERVICE

   Redis validation uses both:

   1. Learner command validation
   2. Actual Redis sandbox state validation

   This is required because some Redis commands such as:

   GET
   EXISTS
   HGETALL
   LRANGE
   ZREVRANGE

   do not modify Redis state.
========================================================= */

@Injectable()
export class RedisValidatorService {
  private readonly logger =
    new Logger(
      RedisValidatorService.name,
    );

  constructor(
    private readonly redisSandboxService:
      RedisSandboxService,
  ) {}

  /* =======================================================
     MAIN VALIDATION ENTRY POINT
  ======================================================= */

  async validateState(
    problemSlug: string,
    sandbox: RedisSandbox,
    learnerCode: string,
  ): Promise<RedisValidationResult> {
    const normalizedProblemSlug =
      problemSlug
        .trim()
        .toLowerCase();

    if (!normalizedProblemSlug) {
      throw new BadRequestException(
        'problemSlug is required for Redis validation.',
      );
    }

    this.logger.log(
      `Validating Redis state for problem "${normalizedProblemSlug}".`,
    );

    const validator =
      this.getProblemValidator(
        normalizedProblemSlug,
      );

    if (!validator) {
      throw new BadRequestException(
        `Redis validation is not configured for problem "${normalizedProblemSlug}".`,
      );
    }

    return validator({
      problemSlug:
        normalizedProblemSlug,

      sandbox,

      learnerCode:
        this.cleanLearnerCode(
          learnerCode,
        ),
    });
  }

  /* =======================================================
     VALIDATOR REGISTRY
  ======================================================= */

  private getProblemValidator(
    problemSlug: string,
  ): ProblemValidator | null {
    switch (problemSlug) {
      case 'redis-set-value':
        return this.validateSetValue.bind(
          this,
        );

      case 'redis-get-value':
        return this.validateGetValue.bind(
          this,
        );

      case 'redis-key-exists':
        return this.validateKeyExists.bind(
          this,
        );

      case 'redis-delete-key':
        return this.validateDeleteKey.bind(
          this,
        );

      case 'redis-increment-counter':
        return this.validateIncrementCounter.bind(
          this,
        );

      case 'redis-key-expiration':
        return this.validateKeyExpiration.bind(
          this,
        );

      case 'redis-hash':
        return this.validateHash.bind(
          this,
        );

      case 'redis-hgetall':
        return this.validateHgetall.bind(
          this,
        );

      case 'redis-list':
        return this.validateList.bind(
          this,
        );

      case 'redis-list-range':
        return this.validateListRange.bind(
          this,
        );

      case 'redis-set-members':
        return this.validateSetMembers.bind(
          this,
        );

      case 'redis-sorted-set':
        return this.validateSortedSet.bind(
          this,
        );

      case 'redis-leaderboard-ranking':
        return this.validateLeaderboardRanking.bind(
          this,
        );

      case 'redis-transactions':
        return this.validateTransaction.bind(
          this,
        );

      default:
        return null;
    }
  }

  /* =======================================================
     1. SET VALUE

     Expected:

     SET employee:name Ananya
  ======================================================= */

  private async validateSetValue(
    context: ValidationContext,
  ): Promise<RedisValidationResult> {
    const code =
      context.learnerCode;

    const usesSet =
      /^SET\s+employee:name\s+Ananya$/i.test(
        code,
      );

    const value =
      await this.redisSandboxService.getString(
        context.sandbox,
        'employee:name',
      );

    const correctValue =
      value === 'Ananya';

    return this.buildResult(
      [
        {
          name:
            'Uses SET with employee:name',

          passed:
            usesSet,

          message:
            usesSet
              ? 'SET command is correct.'
              : 'Use SET employee:name Ananya.',
        },

        {
          name:
            'employee:name contains Ananya',

          passed:
            correctValue,

          message:
            correctValue
              ? 'employee:name contains Ananya.'
              : 'employee:name must contain Ananya.',
        },
      ],
      'Redis value was stored correctly.',
      'Redis value was not stored correctly.',
    );
  }

  /* =======================================================
     2. GET VALUE
  ======================================================= */

  private async validateGetValue(
    context: ValidationContext,
  ): Promise<RedisValidationResult> {
    const usesGet =
      /^GET\s+employee:name$/i.test(
        context.learnerCode,
      );

    const value =
      await this.redisSandboxService.getString(
        context.sandbox,
        'employee:name',
      );

    const fixtureCorrect =
      value === 'Ananya';

    return this.buildResult(
      [
        {
          name:
            'Uses GET command',

          passed:
            usesGet,

          message:
            usesGet
              ? 'GET command is correct.'
              : 'Use GET employee:name.',
        },

        {
          name:
            'Required key contains Ananya',

          passed:
            fixtureCorrect,

          message:
            fixtureCorrect
              ? 'employee:name contains Ananya.'
              : 'The expected Redis value was not found.',
        },
      ],
      'Redis value was retrieved correctly.',
      'Redis GET solution is not correct.',
    );
  }

  /* =======================================================
     3. EXISTS
  ======================================================= */

  private async validateKeyExists(
    context: ValidationContext,
  ): Promise<RedisValidationResult> {
    const usesExists =
      /^EXISTS\s+employee:name$/i.test(
        context.learnerCode,
      );

    const exists =
      await this.redisSandboxService.exists(
        context.sandbox,
        'employee:name',
      );

    return this.buildResult(
      [
        {
          name:
            'Uses EXISTS command',

          passed:
            usesExists,

          message:
            usesExists
              ? 'EXISTS command is correct.'
              : 'Use EXISTS employee:name.',
        },

        {
          name:
            'employee:name exists',

          passed:
            exists,

          message:
            exists
              ? 'employee:name exists.'
              : 'employee:name was not found.',
        },
      ],
      'Redis key existence was checked correctly.',
      'Redis EXISTS solution is not correct.',
    );
  }

  /* =======================================================
     4. DELETE KEY
  ======================================================= */

  private async validateDeleteKey(
    context: ValidationContext,
  ): Promise<RedisValidationResult> {
    const usesDel =
      /^DEL\s+employee:temporary$/i.test(
        context.learnerCode,
      );

    const exists =
      await this.redisSandboxService.exists(
        context.sandbox,
        'employee:temporary',
      );

    const deleted =
      !exists;

    return this.buildResult(
      [
        {
          name:
            'Uses DEL command',

          passed:
            usesDel,

          message:
            usesDel
              ? 'DEL command is correct.'
              : 'Use DEL employee:temporary.',
        },

        {
          name:
            'employee:temporary was deleted',

          passed:
            deleted,

          message:
            deleted
              ? 'employee:temporary no longer exists.'
              : 'employee:temporary still exists.',
        },
      ],
      'Redis key was deleted correctly.',
      'Redis key deletion is not correct.',
    );
  }

  /* =======================================================
     5. INCREMENT COUNTER
  ======================================================= */

  private async validateIncrementCounter(
    context: ValidationContext,
  ): Promise<RedisValidationResult> {
    const usesIncr =
      /^INCR\s+page:views$/i.test(
        context.learnerCode,
      );

    const value =
      await this.redisSandboxService.getString(
        context.sandbox,
        'page:views',
      );

    const correctValue =
      value === '11';

    return this.buildResult(
      [
        {
          name:
            'Uses INCR command',

          passed:
            usesIncr,

          message:
            usesIncr
              ? 'INCR command is correct.'
              : 'Use INCR page:views.',
        },

        {
          name:
            'page:views equals 11',

          passed:
            correctValue,

          message:
            correctValue
              ? 'page:views is 11.'
              : 'page:views must equal 11.',
        },
      ],
      'Redis counter was incremented correctly.',
      'Redis counter solution is not correct.',
    );
  }

  /* =======================================================
     6. KEY EXPIRATION
  ======================================================= */

  private async validateKeyExpiration(
    context: ValidationContext,
  ): Promise<RedisValidationResult> {
    const usesExpire =
      /^EXPIRE\s+session:user:101\s+300$/i.test(
        context.learnerCode,
      );

    const ttl =
      await this.redisSandboxService.ttl(
        context.sandbox,
        'session:user:101',
      );

    /*
     * Time passes between Run and Submit.
     *
     * Therefore TTL does not have to remain exactly 300.
     */

    const correctTtl =
      ttl > 0 &&
      ttl <= 300;

    return this.buildResult(
      [
        {
          name:
            'Uses EXPIRE with 300 seconds',

          passed:
            usesExpire,

          message:
            usesExpire
              ? 'EXPIRE command is correct.'
              : 'Use EXPIRE session:user:101 300.',
        },

        {
          name:
            'Session key has an expiration',

          passed:
            correctTtl,

          message:
            correctTtl
              ? `Current TTL is ${ttl} seconds.`
              : 'session:user:101 must have a TTL of up to 300 seconds.',
        },
      ],
      'Redis key expiration was configured correctly.',
      'Redis expiration solution is not correct.',
    );
  }

  /* =======================================================
     7. HASH
  ======================================================= */

  private async validateHash(
    context: ValidationContext,
  ): Promise<RedisValidationResult> {
    const usesHset =
      /^HSET\s+employee:101\s+/i.test(
        context.learnerCode,
      );

    const hash =
      await this.redisSandboxService.getHash(
        context.sandbox,
        'employee:101',
      );

    const nameCorrect =
      hash.name ===
      'Ananya';

    const departmentCorrect =
      hash.department ===
      'Engineering';

    const salaryCorrect =
      hash.salary ===
      '65000';

    return this.buildResult(
      [
        {
          name:
            'Uses HSET',

          passed:
            usesHset,

          message:
            usesHset
              ? 'HSET command detected.'
              : 'Use HSET to create employee:101.',
        },

        {
          name:
            'Employee name is correct',

          passed:
            nameCorrect,

          message:
            nameCorrect
              ? 'name is Ananya.'
              : 'name must be Ananya.',
        },

        {
          name:
            'Employee department is correct',

          passed:
            departmentCorrect,

          message:
            departmentCorrect
              ? 'department is Engineering.'
              : 'department must be Engineering.',
        },

        {
          name:
            'Employee salary is correct',

          passed:
            salaryCorrect,

          message:
            salaryCorrect
              ? 'salary is 65000.'
              : 'salary must be 65000.',
        },
      ],
      'Redis employee hash was created correctly.',
      'Redis employee hash is not correct.',
    );
  }

  /* =======================================================
     8. HGETALL
  ======================================================= */

  private async validateHgetall(
    context: ValidationContext,
  ): Promise<RedisValidationResult> {
    const usesHgetall =
      /^HGETALL\s+employee:101$/i.test(
        context.learnerCode,
      );

    const hash =
      await this.redisSandboxService.getHash(
        context.sandbox,
        'employee:101',
      );

    const fixtureExists =
      hash.name ===
        'Ananya' &&
      hash.department ===
        'Engineering' &&
      hash.salary ===
        '65000';

    return this.buildResult(
      [
        {
          name:
            'Uses HGETALL',

          passed:
            usesHgetall,

          message:
            usesHgetall
              ? 'HGETALL command is correct.'
              : 'Use HGETALL employee:101.',
        },

        {
          name:
            'Employee hash is available',

          passed:
            fixtureExists,

          message:
            fixtureExists
              ? 'employee:101 contains the expected data.'
              : 'The expected employee hash was not found.',
        },
      ],
      'Redis hash was retrieved correctly.',
      'Redis HGETALL solution is not correct.',
    );
  }

  /* =======================================================
     9. CREATE LIST
  ======================================================= */

  private async validateList(
    context: ValidationContext,
  ): Promise<RedisValidationResult> {
    const usesRpush =
      /^RPUSH\s+tasks\s+design\s+develop\s+test$/i.test(
        context.learnerCode,
      );

    const list =
      await this.redisSandboxService.getList(
        context.sandbox,
        'tasks',
      );

    const correctList =
      this.arraysEqual(
        list,
        [
          'design',
          'develop',
          'test',
        ],
      );

    return this.buildResult(
      [
        {
          name:
            'Uses RPUSH with required tasks',

          passed:
            usesRpush,

          message:
            usesRpush
              ? 'RPUSH command is correct.'
              : 'Use RPUSH tasks design develop test.',
        },

        {
          name:
            'Tasks are stored in correct order',

          passed:
            correctList,

          message:
            correctList
              ? 'Task order is correct.'
              : 'tasks must contain design, develop and test in that order.',
        },
      ],
      'Redis task list was created correctly.',
      'Redis list solution is not correct.',
    );
  }

  /* =======================================================
     10. LRANGE
  ======================================================= */

  private async validateListRange(
    context: ValidationContext,
  ): Promise<RedisValidationResult> {
    const usesLrange =
      /^LRANGE\s+tasks\s+0\s+-1$/i.test(
        context.learnerCode,
      );

    const list =
      await this.redisSandboxService.getList(
        context.sandbox,
        'tasks',
      );

    const fixtureCorrect =
      this.arraysEqual(
        list,
        [
          'design',
          'develop',
          'test',
        ],
      );

    return this.buildResult(
      [
        {
          name:
            'Uses LRANGE for all list items',

          passed:
            usesLrange,

          message:
            usesLrange
              ? 'LRANGE command is correct.'
              : 'Use LRANGE tasks 0 -1.',
        },

        {
          name:
            'Task list contains expected data',

          passed:
            fixtureCorrect,

          message:
            fixtureCorrect
              ? 'The expected task list is available.'
              : 'The expected task list was not found.',
        },
      ],
      'Redis list was retrieved correctly.',
      'Redis LRANGE solution is not correct.',
    );
  }

  /* =======================================================
     11. SET MEMBERS
  ======================================================= */

  private async validateSetMembers(
    context: ValidationContext,
  ): Promise<RedisValidationResult> {
    const usesSadd =
      /^SADD\s+employee:101:skills\s+/i.test(
        context.learnerCode,
      );

    const members =
      await this.redisSandboxService.getSetMembers(
        context.sandbox,
        'employee:101:skills',
      );

    const normalizedMembers =
      [...members]
        .map(
          (member) =>
            member.toLowerCase(),
        )
        .sort();

    const expectedMembers =
      [
        'javascript',
        'nodejs',
        'redis',
      ].sort();

    const correctMembers =
      this.arraysEqual(
        normalizedMembers,
        expectedMembers,
      );

    return this.buildResult(
      [
        {
          name:
            'Uses SADD',

          passed:
            usesSadd,

          message:
            usesSadd
              ? 'SADD command detected.'
              : 'Use SADD employee:101:skills.',
        },

        {
          name:
            'All required skills are stored',

          passed:
            correctMembers,

          message:
            correctMembers
              ? 'All required skills are present.'
              : 'The set must contain JavaScript, NodeJS and Redis only.',
        },
      ],
      'Redis skills set was created correctly.',
      'Redis set solution is not correct.',
    );
  }

  /* =======================================================
     12. SORTED SET
  ======================================================= */

  private async validateSortedSet(
    context: ValidationContext,
  ): Promise<RedisValidationResult> {
    const usesZadd =
      /^ZADD\s+leaderboard\s+/i.test(
        context.learnerCode,
      );

    const members =
      await this.redisSandboxService.getSortedSet(
        context.sandbox,
        'leaderboard',
      );

    const ananya =
      members.find(
        (item) =>
          item.member ===
          'Ananya',
      );

    const rahul =
      members.find(
        (item) =>
          item.member ===
          'Rahul',
      );

    const meera =
      members.find(
        (item) =>
          item.member ===
          'Meera',
      );

    const correctMembers =
      members.length === 3 &&
      ananya?.score === 95 &&
      rahul?.score === 82 &&
      meera?.score === 91;

    return this.buildResult(
      [
        {
          name:
            'Uses ZADD',

          passed:
            usesZadd,

          message:
            usesZadd
              ? 'ZADD command detected.'
              : 'Use ZADD leaderboard.',
        },

        {
          name:
            'Leaderboard members and scores are correct',

          passed:
            correctMembers,

          message:
            correctMembers
              ? 'Leaderboard data is correct.'
              : 'Leaderboard must contain Ananya 95, Rahul 82 and Meera 91.',
        },
      ],
      'Redis leaderboard was created correctly.',
      'Redis sorted-set solution is not correct.',
    );
  }

  /* =======================================================
     13. LEADERBOARD RANKING
  ======================================================= */

  private async validateLeaderboardRanking(
    context: ValidationContext,
  ): Promise<RedisValidationResult> {
    const usesZrevrange =
      /^ZREVRANGE\s+leaderboard\s+0\s+-1\s+WITHSCORES$/i.test(
        context.learnerCode,
      );

    const members =
      await this.redisSandboxService.getSortedSet(
        context.sandbox,
        'leaderboard',
      );

    const stateCorrect =
      members.length === 3 &&
      members.some(
        (item) =>
          item.member ===
            'Ananya' &&
          item.score ===
            95,
      ) &&
      members.some(
        (item) =>
          item.member ===
            'Meera' &&
          item.score ===
            91,
      ) &&
      members.some(
        (item) =>
          item.member ===
            'Rahul' &&
          item.score ===
            82,
      );

    return this.buildResult(
      [
        {
          name:
            'Uses ZREVRANGE with WITHSCORES',

          passed:
            usesZrevrange,

          message:
            usesZrevrange
              ? 'ZREVRANGE command is correct.'
              : 'Use ZREVRANGE leaderboard 0 -1 WITHSCORES.',
        },

        {
          name:
            'Leaderboard contains expected data',

          passed:
            stateCorrect,

          message:
            stateCorrect
              ? 'Leaderboard contains the expected members and scores.'
              : 'The expected leaderboard data was not found.',
        },
      ],
      'Redis leaderboard ranking query is correct.',
      'Redis leaderboard ranking solution is not correct.',
    );
  }

  /* =======================================================
     14. TRANSACTION
  ======================================================= */

  private async validateTransaction(
    context: ValidationContext,
  ): Promise<RedisValidationResult> {
    const code =
      context.learnerCode;

    const lines =
      code
        .split(/\r?\n/)
        .map(
          (line) =>
            line.trim(),
        )
        .filter(Boolean);

    const usesMulti =
      lines.some(
        (line) =>
          /^MULTI$/i.test(
            line,
          ),
      );

    const usesDecrby =
      lines.some(
        (line) =>
          /^DECRBY\s+account:101:balance\s+100$/i.test(
            line,
          ),
      );

    const usesIncrby =
      lines.some(
        (line) =>
          /^INCRBY\s+account:102:balance\s+100$/i.test(
            line,
          ),
      );

    const usesExec =
      lines.some(
        (line) =>
          /^EXEC$/i.test(
            line,
          ),
      );

    const account101 =
      await this.redisSandboxService.getString(
        context.sandbox,
        'account:101:balance',
      );

    const account102 =
      await this.redisSandboxService.getString(
        context.sandbox,
        'account:102:balance',
      );

    const balancesCorrect =
      account101 ===
        '900' &&
      account102 ===
        '600';

    const transactionOrderCorrect =
      this.validateTransactionOrder(
        lines,
      );

    return this.buildResult(
      [
        {
          name:
            'Uses MULTI',

          passed:
            usesMulti,

          message:
            usesMulti
              ? 'MULTI command detected.'
              : 'Start the transaction with MULTI.',
        },

        {
          name:
            'Decreases account 101 by 100',

          passed:
            usesDecrby,

          message:
            usesDecrby
              ? 'DECRBY command is correct.'
              : 'Use DECRBY account:101:balance 100.',
        },

        {
          name:
            'Increases account 102 by 100',

          passed:
            usesIncrby,

          message:
            usesIncrby
              ? 'INCRBY command is correct.'
              : 'Use INCRBY account:102:balance 100.',
        },

        {
          name:
            'Uses EXEC',

          passed:
            usesExec,

          message:
            usesExec
              ? 'EXEC command detected.'
              : 'Complete the transaction with EXEC.',
        },

        {
          name:
            'Commands are inside one transaction',

          passed:
            transactionOrderCorrect,

          message:
            transactionOrderCorrect
              ? 'Transaction command order is correct.'
              : 'MULTI must come before DECRBY and INCRBY, and EXEC must come after them.',
        },

        {
          name:
            'Final account balances are correct',

          passed:
            balancesCorrect,

          message:
            balancesCorrect
              ? 'Final balances are 900 and 600.'
              : 'Expected balances are 900 and 600.',
        },
      ],
      'Redis transaction was completed correctly.',
      'Redis transaction solution is not correct.',
    );
  }

  /* =======================================================
     TRANSACTION ORDER
  ======================================================= */

  private validateTransactionOrder(
    lines: string[],
  ): boolean {
    const multiIndex =
      lines.findIndex(
        (line) =>
          /^MULTI$/i.test(
            line,
          ),
      );

    const decrIndex =
      lines.findIndex(
        (line) =>
          /^DECRBY\s+account:101:balance\s+100$/i.test(
            line,
          ),
      );

    const incrIndex =
      lines.findIndex(
        (line) =>
          /^INCRBY\s+account:102:balance\s+100$/i.test(
            line,
          ),
      );

    const execIndex =
      lines.findIndex(
        (line) =>
          /^EXEC$/i.test(
            line,
          ),
      );

    if (
      multiIndex < 0 ||
      decrIndex < 0 ||
      incrIndex < 0 ||
      execIndex < 0
    ) {
      return false;
    }

    return (
      multiIndex <
        decrIndex &&
      multiIndex <
        incrIndex &&
      decrIndex <
        execIndex &&
      incrIndex <
        execIndex
    );
  }

  /* =======================================================
     CLEAN LEARNER CODE

     Removes starter comments without changing the Redis
     commands entered by the learner.
  ======================================================= */

  private cleanLearnerCode(
    learnerCode: string,
  ): string {
    return learnerCode
      .replace(
        /\/\*[\s\S]*?\*\//g,
        '',
      )
      .split(/\r?\n/)
      .map(
        (line) =>
          line.trim(),
      )
      .filter(
        (line) => {
          if (!line) {
            return false;
          }

          if (
            line.startsWith('#') ||
            line.startsWith('//') ||
            line.startsWith('--')
          ) {
            return false;
          }

          return true;
        },
      )
      .join('\n')
      .trim();
  }

  /* =======================================================
     ARRAY COMPARISON
  ======================================================= */

  private arraysEqual(
    left: string[],
    right: string[],
  ): boolean {
    if (
      left.length !==
      right.length
    ) {
      return false;
    }

    return left.every(
      (
        value,
        index,
      ) =>
        value ===
        right[index],
    );
  }

  /* =======================================================
     BUILD RESULT

     Same response structure as the existing database
     validators.
  ======================================================= */

  private buildResult(
    tests: RedisValidationTestResult[],
    successMessage: string,
    failureMessage: string,
  ): RedisValidationResult {
    const totalTests =
      tests.length;

    const passedTests =
      tests.filter(
        (test) =>
          test.passed,
      ).length;

    const accepted =
      totalTests > 0 &&
      passedTests ===
        totalTests;

    const score =
      totalTests === 0
        ? 0
        : Math.round(
            (
              passedTests /
              totalTests
            ) *
              100,
          );

    return {
      accepted,

      passedTests,

      totalTests,

      score,

      message:
        accepted
          ? successMessage
          : failureMessage,

      tests,
    };
  }
}