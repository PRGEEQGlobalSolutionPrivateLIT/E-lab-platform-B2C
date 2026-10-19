import {

  BadRequestException,

  Injectable,

  Logger,

  NotFoundException,

  OnModuleDestroy,

  OnModuleInit,

} from '@nestjs/common';

import { randomUUID } from 'node:crypto';

import type { CreateDatabaseSessionDto } from './dto/create-database-session.dto.js';

import type { ExecuteDatabaseQueryDto } from './dto/execute-database-query.dto.js';

import type { SubmitDatabaseSolutionDto } from './dto/submit-database-solution.dto.js';

import { PostgreSqlSandboxService } from './sandbox/postgresql-sandbox.service.js';

import type { PostgreSqlSandbox } from './sandbox/postgresql-sandbox.service.js';

import { PostgreSqlValidatorService } from './validation/postgresql-validator.service.js';

import { MysqlSandboxService } from './sandbox/mysql-sandbox.service.js';

import type { MysqlSandbox } from './sandbox/mysql-sandbox.service.js';

import { MysqlValidatorService } from './validation/mysql-validator.service.js';

import { SqlServerSandboxService } from './sandbox/sqlserver-sandbox.service.js';

import type { SqlServerSandbox } from './sandbox/sqlserver-sandbox.service.js';

import { SqlServerValidatorService } from './validation/sqlserver-validator.service.js';

import { MongoDbSandboxService } from './sandbox/mongodb-sandbox.service.js';

import type { MongoDbSandbox } from './sandbox/mongodb-sandbox.service.js';

import { MongoDbValidatorService } from './validation/mongodb-validator.service.js';

import { RedisSandboxService } from './sandbox/redis-sandbox.service.js';

import type { RedisSandbox } from './sandbox/redis-sandbox.service.js';

import { RedisValidatorService } from './validation/redis-validator.service.js';

type DatabaseSessionStatus =

  | 'creating'

  | 'ready'

  | 'closed'

  | 'failed';

type DatabaseSessionMode =

  | 'temporary'

  | 'persistent';

type DatabaseSandbox =

  | PostgreSqlSandbox

  | MysqlSandbox

  | SqlServerSandbox

  | MongoDbSandbox

  | RedisSandbox;

type DatabaseSession = {

  id: string;

  problemSlug: string;

  technologySlug: string;

  mode: DatabaseSessionMode;

  projectId?: string;

  status: DatabaseSessionStatus;

  createdAt: string;

  lastActivityAt: string;

  sandbox?: DatabaseSandbox;

};

type PublicDatabaseSession = {

  id: string;

  problemSlug: string;

  technologySlug: string;

  mode: DatabaseSessionMode;

  projectId?: string;

  status: DatabaseSessionStatus;

  database?: string;

  createdAt: string;

  lastActivityAt: string;

};

type NormalizedValidation = {

  accepted: boolean;

  passedTests: number;

  totalTests: number;

  score: number;

  message: string;

  tests: Array<{

    name: string;

    passed: boolean;

    message?: string;

  }>;

};

@Injectable()

export class DatabaseLabService

  implements OnModuleInit, OnModuleDestroy

{

  private readonly logger =

    new Logger(DatabaseLabService.name);

  private readonly sessions =

    new Map<string, DatabaseSession>();

  private readonly temporarySessionIdleTimeoutMs =

    15 * 60 * 1000;

  private readonly cleanupIntervalMs =

    60 * 1000;

  private cleanupTimer:

    ReturnType<typeof setInterval> | null =

    null;

  private cleanupRunning =

    false;

  constructor(

    private readonly postgresqlSandboxService:

      PostgreSqlSandboxService,

    private readonly postgresqlValidatorService:

      PostgreSqlValidatorService,

    private readonly mysqlSandboxService:

      MysqlSandboxService,

    private readonly mysqlValidatorService:

      MysqlValidatorService,

    private readonly sqlServerSandboxService:

      SqlServerSandboxService,

    private readonly sqlServerValidatorService:

      SqlServerValidatorService,

    private readonly mongoDbSandboxService:

      MongoDbSandboxService,

    private readonly mongoDbValidatorService:

      MongoDbValidatorService,

    private readonly redisSandboxService:

      RedisSandboxService,

    private readonly redisValidatorService:

      RedisValidatorService,

  ) {}

  onModuleInit(): void {

    this.startCleanupTimer();

    this.logger.log(

      'Database Lab temporary-session cleanup started.',

    );

  }

  onModuleDestroy(): void {

    this.stopCleanupTimer();

  }

  async createSession(

    body: CreateDatabaseSessionDto,

  ) {

    this.validateCreateSession(body);

    const sessionId =

      randomUUID();

    const now =

      new Date().toISOString();

    const session: DatabaseSession = {

      id: sessionId,

      problemSlug: body.problemSlug.trim(),

      technologySlug:

        this.normalizeTechnologySlug(

          body.technologySlug,

        ),

      mode:

        body.mode ??

        'temporary',

      projectId:

        body.projectId?.trim() ||

        undefined,

      status:

        'creating',

      createdAt:

        now,

      lastActivityAt:

        now,

    };

    this.sessions.set(

      sessionId,

      session,

    );

    try {

      if (

        session.technologySlug ===

        'postgresql'

      ) {

        this.logger.log(

          `Creating PostgreSQL sandbox for session ${sessionId} and problem ${session.problemSlug}.`,

        );

        session.sandbox =

          await this.postgresqlSandboxService.createSandbox(

            sessionId,

            session.problemSlug,

          );

      } else if (

        session.technologySlug ===

        'mysql'

      ) {

        this.logger.log(

          `Creating MySQL sandbox for session ${sessionId} and problem ${session.problemSlug}.`,

        );

        session.sandbox =

          await this.mysqlSandboxService.createSandbox(

            sessionId,

            session.problemSlug,

          );

      } else if (

        session.technologySlug ===

        'sqlserver'

      ) {

        this.logger.log(

          `Creating SQL Server sandbox for session ${sessionId} and problem ${session.problemSlug}.`,

        );

        session.sandbox =

          await this.sqlServerSandboxService.createSandbox(

            sessionId,

            session.problemSlug,

          );

      } else if (

        session.technologySlug ===

        'mongodb'

      ) {

        this.logger.log(

          `Creating MongoDB sandbox for session ${sessionId} and problem ${session.problemSlug}.`,

        );

        session.sandbox =

          await this.mongoDbSandboxService.createSandbox(

            sessionId,

            session.problemSlug,

          );

      } else if (

        session.technologySlug ===

        'redis'

      ) {

        this.logger.log(

          `Creating Redis sandbox for session ${sessionId} and problem ${session.problemSlug}.`,

        );

        session.sandbox =

          await this.redisSandboxService.createSandbox(

            session.problemSlug,

          );

      } else {

        throw new BadRequestException(

          `Database technology "${session.technologySlug}" is not supported yet.`,

        );

      }

      session.status =

        'ready';

      this.touchSession(

        session,

      );

      this.logger.log(

        `${this.getTechnologyLabel(session.technologySlug)} sandbox ready for session ${sessionId} (${session.problemSlug}).`,

      );

      return {

        success: true,

        session:

          this.toPublicSession(

            session,

          ),

      };

    } catch (error) {

      session.status =

        'failed';

      this.sessions.delete(

        sessionId,

      );

      this.logger.error(

        `Database session ${sessionId} creation failed: ${this.getErrorMessage(error)}`,

      );

      throw error;

    }

  }

  async getSession(

    sessionId: string,

  ) {

    const session =

      this.requireSession(

        sessionId,

      );

    this.touchSession(

      session,

    );

    return {

      success: true,

      session:

        this.toPublicSession(

          session,

        ),

    };

  }

  async heartbeat(

    sessionId: string,

  ) {

    const session =

      this.requireReadySession(

        sessionId,

      );

    this.touchSession(

      session,

    );

    return {

      success: true,

      sessionId:

        session.id,

      status:

        session.status,

      lastActivityAt:

        session.lastActivityAt,

    };

  }

  async executeQuery(

    sessionId: string,

    body: ExecuteDatabaseQueryDto,

  ) {

    const session =

      this.requireReadySession(

        sessionId,

      );

    if (

      !body.sql ||

      !body.sql.trim()

    ) {

      throw new BadRequestException(

        'Database query is required.',

      );

    }

    if (

      !session.sandbox

    ) {

      throw new BadRequestException(

        'Database sandbox is not available for this session.',

      );

    }

    this.assertSupportedTechnology(

      session.technologySlug,

      'Execution',

    );

    this.touchSession(

      session,

    );

    const result =

      await this.executeSqlForSession(

        session,

        body.sql,

      );

    this.touchSession(

      session,

    );

    return {

      success:

        result.exitCode === 0,

      sessionId:

        session.id,

      technologySlug:

        session.technologySlug,

      database:

        session.sandbox.database,

      stdout:

        result.stdout,

      stderr:

        result.stderr,

      exitCode:

        result.exitCode,

    };

  }

  async submitSolution(

    sessionId: string,

    body: SubmitDatabaseSolutionDto,

  ) {

    const session =

      this.requireReadySession(

        sessionId,

      );

    if (

      !body.sql ||

      !body.sql.trim()

    ) {

      throw new BadRequestException(

        'Database solution is required.',

      );

    }

    if (

      body.problemSlug &&

      body.problemSlug.trim() &&

      body.problemSlug.trim() !==

        session.problemSlug

    ) {

      throw new BadRequestException(

        'The submitted problem does not match the active database session.',

      );

    }

    if (

      !session.sandbox

    ) {

      throw new BadRequestException(

        'Database sandbox is not available for this session.',

      );

    }

    this.assertSupportedTechnology(

      session.technologySlug,

      'Submission validation',

    );

    this.touchSession(

      session,

    );

    /*

     * First validate the current state.

     *

     * This prevents CREATE DATABASE / CREATE TABLE submissions

     * from failing merely because the learner already clicked Run.

     */

    const currentStateValidation =

      await this.validateSessionState(

        session,

        body.sql,

      );

    if (

      currentStateValidation.accepted

    ) {

      this.touchSession(

        session,

      );

      this.logger.log(

        `${this.getTechnologyLabel(session.technologySlug)} solution accepted from existing sandbox state for session ${session.id}, problem ${session.problemSlug}.`,

      );

      return this.buildSubmissionResponse(

        session,

        currentStateValidation,

      );

    }

    /*

     * State is not correct yet, so execute the submitted SQL once.

     */

    const executionResult =

      await this.executeSqlForSession(

        session,

        body.sql,

      );

    this.touchSession(

      session,

    );

    /*

     * Validate final database state regardless of SQL exit code.

     */

    const finalValidation =

      await this.validateSessionState(

        session,

        body.sql,

      );

    this.touchSession(

      session,

    );

    if (

      finalValidation.accepted

    ) {

      this.logger.log(

        `${this.getTechnologyLabel(session.technologySlug)} solution accepted for session ${session.id}, problem ${session.problemSlug}.`,

      );

      return this.buildSubmissionResponse(

        session,

        finalValidation,

      );

    }

    const tests = [

      ...finalValidation.tests,

    ];

    if (

      executionResult.exitCode !==

      0

    ) {

      tests.unshift({

        name:

          'Database command executes successfully',

        passed:

          false,

        message:

          this.cleanExecutionMessage(

            executionResult.stderr ||

              executionResult.stdout ||

              'Database command execution failed.',

          ),

      });

    }

    const totalTests =

      tests.length;

    const passedTests =

      tests.filter(

        (test) =>

          test.passed,

      ).length;

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

    this.logger.log(

      `${this.getTechnologyLabel(session.technologySlug)} solution not accepted for session ${session.id}, problem ${session.problemSlug}.`,

    );

    return {

      success: true,

      accepted: false,

      sessionId:

        session.id,

      problemSlug:

        session.problemSlug,

      technologySlug:

        session.technologySlug,

      passedTests,

      totalTests,

      score,

      message:

        finalValidation.message,

      tests,

    };

  }

  async getSchema(

    sessionId: string,

  ) {

    const session =

      this.requireReadySession(

        sessionId,

      );

    if (

      !session.sandbox

    ) {

      throw new BadRequestException(

        'Database sandbox is not available for this session.',

      );

    }

    this.assertSupportedTechnology(

      session.technologySlug,

      'Schema inspection',

    );

    this.touchSession(

      session,

    );

    let tables: string[];

    let views: string[];

    let indexes: string[];

    if (

      session.technologySlug ===

      'mysql'

    ) {

      const sandbox =

        session.sandbox as MysqlSandbox;

      [

        tables,

        views,

        indexes,

      ] = await Promise.all([

        this.mysqlSandboxService.getTables(

          sandbox,

        ),

        this.mysqlSandboxService.getViews(

          sandbox,

        ),

        this.mysqlSandboxService.getIndexes(

          sandbox,

        ),

      ]);

    } else if (

      session.technologySlug ===

      'mongodb'

    ) {

      const sandbox =

        session.sandbox as MongoDbSandbox;

      tables =

        await this.mongoDbSandboxService.getCollections(

          sandbox,

        );

      views = [];

      indexes = [];

    } else if (

      session.technologySlug ===

      'redis'

    ) {

      const sandbox =

        session.sandbox as RedisSandbox;

      const schema =

        await this.redisSandboxService.getSchema(

          sandbox,

        );

      tables = schema.tables.map(
        (table) => table.name,
      );

      views = [];

      indexes = [];

    } else if (

      session.technologySlug ===

      'sqlserver'

    ) {

      const sandbox =

        session.sandbox as SqlServerSandbox;

      [

        tables,

        views,

        indexes,

      ] = await Promise.all([

        this.sqlServerSandboxService.getTables(

          sandbox,

        ),

        this.sqlServerSandboxService.getViews(

          sandbox,

        ),

        this.sqlServerSandboxService.getIndexes(

          sandbox,

        ),

      ]);

    } else {

      const sandbox =

        session.sandbox as PostgreSqlSandbox;

      [

        tables,

        views,

        indexes,

      ] = await Promise.all([

        this.postgresqlSandboxService.getTables(

          sandbox,

        ),

        this.postgresqlSandboxService.getViews(

          sandbox,

        ),

        this.postgresqlSandboxService.getIndexes(

          sandbox,

        ),

      ]);

    }

    this.touchSession(

      session,

    );

    return {

      success: true,

      sessionId:

        session.id,

      database:

        session.sandbox.database,

      tables,

      views,

      indexes,

    };

  }

  async closeSession(

    sessionId: string,

  ) {

    const session =

      this.requireSession(

        sessionId,

      );

    await this.destroySessionSandbox(

      session,

    );

    session.status =

      'closed';

    this.sessions.delete(

      sessionId,

    );

    this.logger.log(

      `Database session ${sessionId} closed.`,

    );

    return {

      success: true,

      sessionId:

        session.id,

      mode:

        session.mode,

      message:

        session.mode ===

        'temporary'

          ? `Temporary ${this.getTechnologyLabel(session.technologySlug)} sandbox destroyed successfully.`

          : 'Database session closed. Persistent project storage is not enabled yet.',

    };

  }

  private async executeSqlForSession(

    session: DatabaseSession,

    sql: string,

  ) {

    if (

      !session.sandbox

    ) {

      throw new BadRequestException(

        'Database sandbox is not available for this session.',

      );

    }

    if (

      session.technologySlug ===

      'mysql'

    ) {

      return this.mysqlSandboxService.executeSql(

        session.sandbox as MysqlSandbox,

        sql,

      );

    }

    if (

      session.technologySlug ===

      'sqlserver'

    ) {

      return this.sqlServerSandboxService.executeSql(

        session.sandbox as SqlServerSandbox,

        sql,

      );

    }

    if (

      session.technologySlug ===

      'mongodb'

    ) {

      return this.mongoDbSandboxService.executeScript(

        session.sandbox as MongoDbSandbox,

        sql,

      );

    }

    if (

      session.technologySlug ===

      'redis'

    ) {

      const result =

        await this.redisSandboxService.execute(

          session.sandbox as RedisSandbox,

          sql,

        );

      return {

        stdout: result.message,

        stderr: '',

        exitCode: 0,

      };

    }

    if (

      session.technologySlug ===

      'postgresql'

    ) {

      return this.postgresqlSandboxService.executeSql(

        session.sandbox as PostgreSqlSandbox,

        sql,

      );

    }

    throw new BadRequestException(

      `Execution for "${session.technologySlug}" is not supported yet.`,

    );

  }

  private async validateSessionState(

    session: DatabaseSession,

    learnerCode = '',

  ): Promise<NormalizedValidation> {

    const submittedCode =

      learnerCode.trim();

    if (

      !session.sandbox

    ) {

      throw new BadRequestException(

        'Database sandbox is not available for this session.',

      );

    }

    if (

      session.technologySlug ===

      'mysql'

    ) {

      const result =

        await this.mysqlValidatorService.validateState(

          session.problemSlug,

          session.sandbox as MysqlSandbox,

        );

      return {

        accepted:

          result.accepted,

        passedTests:

          result.passedTests,

        totalTests:

          result.totalTests,

        score:

          result.score,

        message:

          result.message,

        tests:

          result.tests,

      };

    }

    if (

      session.technologySlug ===

      'postgresql'

    ) {

      const result =

        await this.postgresqlValidatorService.validateState(

          session.problemSlug,

          session.sandbox as PostgreSqlSandbox,

        );

      return {

        accepted:

          result.accepted,

        passedTests:

          result.passedTests,

        totalTests:

          result.totalTests,

        score:

          result.score,

        message:

          result.message,

        tests:

          result.tests,

      };

    }

    if (

      session.technologySlug ===

      'sqlserver'

    ) {

      /*

       * The SQL Server validator created for this module exposes:

       *

       * validate(sandbox, problemSlug)

       *

       * and currently returns:

       *

       * { accepted, message }

       *

       * Normalize that result to the common submission response.

       */

      const result =

        await this.sqlServerValidatorService.validate(

          session.sandbox as SqlServerSandbox,

          session.problemSlug,

        );

      return {

        accepted:

          result.accepted,

        passedTests:

          result.accepted

            ? 1

            : 0,

        totalTests:

          1,

        score:

          result.accepted

            ? 100

            : 0,

        message:

          result.message,

        tests: [

          {

            name:

              'SQL Server hidden validation',

            passed:

              result.accepted,

            message:

              result.message,

          },

        ],

      };

    }

    if (

      session.technologySlug ===

      'mongodb'

    ) {

      const result =

        await this.mongoDbValidatorService.validate(

          session.sandbox as MongoDbSandbox,

          session.problemSlug,

          submittedCode,

        );

      const tests =

        result.tests.map(

          (test) => ({

            name: test.name,

            passed: test.passed,

            message: test.message ?? '',

          }),

        );

      const passedTests =

        tests.filter(

          (test) => test.passed,

        ).length;

      const totalTests =

        tests.length;

      return {

        accepted: result.passed,

        passedTests,

        totalTests,

        score:

          totalTests === 0

            ? 0

            : Math.round(

                (passedTests / totalTests) * 100,

              ),

        message: result.message,

        tests,

      };

    }

    if (

      session.technologySlug ===

      'redis'

    ) {

      const result =

        await this.redisValidatorService.validateState(

          session.problemSlug,

          session.sandbox as RedisSandbox,

          submittedCode,

        );

      return {

        accepted: result.accepted,

        passedTests: result.passedTests,

        totalTests: result.totalTests,

        score: result.score,

        message: result.message,

        tests: result.tests,

      };

    }

    throw new BadRequestException(

      `Submission validation for "${session.technologySlug}" is not supported yet.`,

    );

  }

  private buildSubmissionResponse(

    session: DatabaseSession,

    validation: NormalizedValidation,

  ) {

    return {

      success: true,

      accepted:

        validation.accepted,

      sessionId:

        session.id,

      problemSlug:

        session.problemSlug,

      technologySlug:

        session.technologySlug,

      passedTests:

        validation.passedTests,

      totalTests:

        validation.totalTests,

      score:

        validation.score,

      message:

        validation.message,

      tests:

        validation.tests,

    };

  }

  private startCleanupTimer(): void {

    if (

      this.cleanupTimer

    ) {

      return;

    }

    this.cleanupTimer =

      setInterval(

        () => {

          void this.cleanupExpiredSessions();

        },

        this.cleanupIntervalMs,

      );

    this.cleanupTimer.unref?.();

  }

  private stopCleanupTimer(): void {

    if (

      !this.cleanupTimer

    ) {

      return;

    }

    clearInterval(

      this.cleanupTimer,

    );

    this.cleanupTimer =

      null;

  }

  private async cleanupExpiredSessions(): Promise<void> {

    if (

      this.cleanupRunning

    ) {

      return;

    }

    this.cleanupRunning =

      true;

    try {

      const now =

        Date.now();

      const sessions =

        Array.from(

          this.sessions.values(),

        );

      for (

        const session of sessions

      ) {

        if (

          session.mode !==

          'temporary'

        ) {

          continue;

        }

        if (

          session.status !==

          'ready'

        ) {

          continue;

        }

        const lastActivity =

          new Date(

            session.lastActivityAt,

          ).getTime();

        if (

          !Number.isFinite(

            lastActivity,

          )

        ) {

          continue;

        }

        const idleTime =

          now -

          lastActivity;

        if (

          idleTime <

          this.temporarySessionIdleTimeoutMs

        ) {

          continue;

        }

        const currentSession =

          this.sessions.get(

            session.id,

          );

        if (

          currentSession !==

          session

        ) {

          continue;

        }

        try {

          this.logger.log(

            `Cleaning expired temporary database session ${session.id}.`,

          );

          await this.destroySessionSandbox(

            session,

          );

          session.status =

            'closed';

          this.sessions.delete(

            session.id,

          );

          this.logger.log(

            `Expired database session ${session.id} removed.`,

          );

        } catch (error) {

          this.logger.error(

            `Unable to clean database session ${session.id}: ${this.getErrorMessage(error)}`,

          );

        }

      }

    } finally {

      this.cleanupRunning =

        false;

    }

  }

  private async destroySessionSandbox(

    session: DatabaseSession,

  ): Promise<void> {

    if (

      !session.sandbox

    ) {

      return;

    }

    if (

      session.technologySlug ===

      'postgresql'

    ) {

      await this.postgresqlSandboxService.destroySandbox(

        session.sandbox as PostgreSqlSandbox,

      );

      session.sandbox =

        undefined;

      return;

    }

    if (

      session.technologySlug ===

      'mysql'

    ) {

      await this.mysqlSandboxService.destroySandbox(

        session.sandbox as MysqlSandbox,

      );

      session.sandbox =

        undefined;

      return;

    }

    if (

      session.technologySlug ===

      'sqlserver'

    ) {

      await this.sqlServerSandboxService.destroySandbox(

        session.sandbox as SqlServerSandbox,

      );

      session.sandbox =

        undefined;

      return;

    }

    if (

      session.technologySlug ===

      'mongodb'

    ) {

      await this.mongoDbSandboxService.destroySandbox(

        session.sandbox as MongoDbSandbox,

      );

      session.sandbox =

        undefined;

      return;

    }

    if (

      session.technologySlug ===

      'redis'

    ) {

      await this.redisSandboxService.destroySandbox(

        session.sandbox as RedisSandbox,

      );

      session.sandbox = undefined;

      return;

    }

    throw new BadRequestException(

      `Sandbox cleanup for "${session.technologySlug}" is not supported.`,

    );

  }

  private touchSession(

    session: DatabaseSession,

  ): void {

    session.lastActivityAt =

      new Date().toISOString();

  }

  private validateCreateSession(

    body: CreateDatabaseSessionDto,

  ): void {

    if (

      !body.problemSlug ||

      !body.problemSlug.trim()

    ) {

      throw new BadRequestException(

        'problemSlug is required.',

      );

    }

    if (

      !body.technologySlug ||

      !body.technologySlug.trim()

    ) {

      throw new BadRequestException(

        'technologySlug is required.',

      );

    }

    if (

      body.mode &&

      body.mode !==

        'temporary' &&

      body.mode !==

        'persistent'

    ) {

      throw new BadRequestException(

        'mode must be temporary or persistent.',

      );

    }

    if (

      body.mode ===

        'persistent' &&

      (

        !body.projectId ||

        !body.projectId.trim()

      )

    ) {

      throw new BadRequestException(

        'projectId is required for persistent database sessions.',

      );

    }

  }

  private normalizeTechnologySlug(

    technologySlug: string,

  ): string {

    const normalized =

      technologySlug

        .trim()

        .toLowerCase()

        .replace(/[\s_-]+/g, '');

    if (normalized === 'postgres' || normalized === 'postgresql') {

      return 'postgresql';

    }

    if (normalized === 'mysql') {

      return 'mysql';

    }

    if (normalized === 'redis') {

      return 'redis';

    }

    if (normalized === 'mongodb' || normalized === 'mongo') {

      return 'mongodb';

    }

    if (

      normalized === 'sqlserver' ||

      normalized === 'mssql' ||

      normalized === 'microsoftsqlserver'

    ) {

      return 'sqlserver';

    }

    return technologySlug.trim().toLowerCase();

  }

  private assertSupportedTechnology(

    technologySlug: string,

    operation: string,

  ): void {

    if (

      technologySlug !==

        'postgresql' &&

      technologySlug !==

        'mysql' &&

      technologySlug !==

        'sqlserver' &&

      technologySlug !==

        'mongodb' &&

      technologySlug !==

        'redis'

    ) {

      throw new BadRequestException(

        `${operation} for "${technologySlug}" is not supported yet.`,

      );

    }

  }

  private getTechnologyLabel(

    technologySlug: string,

  ): string {

    if (

      technologySlug ===

      'postgresql'

    ) {

      return 'PostgreSQL';

    }

    if (

      technologySlug ===

      'mysql'

    ) {

      return 'MySQL';

    }

    if (

      technologySlug ===

      'sqlserver'

    ) {

      return 'SQL Server';

    }

    if (

      technologySlug ===

      'mongodb'

    ) {

      return 'MongoDB';

    }

    if (

      technologySlug ===

      'redis'

    ) {

      return 'Redis';

    }

    return technologySlug;

  }

  private requireSession(

    sessionId: string,

  ): DatabaseSession {

    const session =

      this.sessions.get(

        sessionId,

      );

    if (

      !session

    ) {

      throw new NotFoundException(

        `Database session ${sessionId} was not found.`,

      );

    }

    return session;

  }

  private requireReadySession(

    sessionId: string,

  ): DatabaseSession {

    const session =

      this.requireSession(

        sessionId,

      );

    if (

      session.status !==

      'ready'

    ) {

      throw new BadRequestException(

        `Database session ${sessionId} is not ready.`,

      );

    }

    return session;

  }

  private toPublicSession(

    session: DatabaseSession,

  ): PublicDatabaseSession {

    return {

      id:

        session.id,

      problemSlug:

        session.problemSlug,

      technologySlug:

        session.technologySlug,

      mode:

        session.mode,

      projectId:

        session.projectId,

      status:

        session.status,

      database:

        session.sandbox?.database !== undefined

          ? String(

              session.sandbox.database,

            )

          : undefined,

      createdAt:

        session.createdAt,

      lastActivityAt:

        session.lastActivityAt,

    };

  }

  private cleanExecutionMessage(

    message: string,

  ): string {

    const cleaned =

      message

        .trim()

        .replace(

          /\r\n/g,

          '\n',

        );

    if (

      cleaned.length <=

      500

    ) {

      return cleaned;

    }

    return `${cleaned.slice(

      0,

      500,

    )}...`;

  }

  private getErrorMessage(

    error: unknown,

  ): string {

    if (

      error instanceof Error

    ) {

      return error.message;

    }

    return 'Unknown database sandbox error.';

  }

}
