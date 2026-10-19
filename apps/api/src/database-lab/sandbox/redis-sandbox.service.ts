import {

  Injectable,

  Logger,

} from '@nestjs/common';

import {

  randomUUID,

} from 'node:crypto';

import {

  execFile,

  spawn,

} from 'node:child_process';

import {

  promisify,

} from 'node:util';

const execFileAsync =

  promisify(execFile);

/* =========================================================

   TYPES

========================================================= */

export interface RedisSandbox {

  id: string;

  containerName: string;

  host: string;

  port: number;

  database: number;

  problemSlug: string;

  createdAt: Date;

}

export interface RedisExecutionResult {

  columns: string[];

  rows: Array<

    Record<string, unknown>

  >;

  rowCount: number;

  message: string;

}

export interface RedisSchema {

  database: string;

  tables: Array<{

    name: string;

    columns: Array<{

      name: string;

      dataType: string;

    }>;

  }>;

}

/* =========================================================

   REDIS SANDBOX SERVICE

========================================================= */

@Injectable()

export class RedisSandboxService {

  private readonly logger =

    new Logger(

      RedisSandboxService.name,

    );

  private readonly image =

    process.env

      .REDIS_SANDBOX_IMAGE ??

    'redis:7-alpine';

  private readonly containerPort =

    6379;

  /* =======================================================

     CREATE SANDBOX

  ======================================================= */

  async createSandbox(

    problemSlug: string,

  ): Promise<RedisSandbox> {

    const id =

      randomUUID();

    const shortId =

      id

        .replace(/-/g, '')

        .slice(0, 12);

    const containerName =

      `elab-redis-${shortId}`;

    this.logger.log(

      `Creating Redis sandbox ${containerName} for ${problemSlug}.`,

    );

    try {

      await this.runDocker([

        'run',

        '-d',

        '--rm',

        '--name',

        containerName,

        '--memory',

        '256m',

        '--cpus',

        '0.50',

        '--pids-limit',

        '100',

        '--security-opt',

        'no-new-privileges',

        this.image,

        'redis-server',

        '--save',

        '',

        '--appendonly',

        'no',

        '--protected-mode',

        'no',

      ]);

      const sandbox:

        RedisSandbox = {

          id,

          containerName,

          host:

            containerName,

          port:

            this.containerPort,

          database:

            0,

          problemSlug,

          createdAt:

            new Date(),

        };

      await this.waitUntilReady(

        sandbox,

      );

      await this.applyFixtures(

        sandbox,

        problemSlug,

      );

      this.logger.log(

        `Redis sandbox ${containerName} is ready.`,

      );

      return sandbox;

    } catch (error) {

      this.logger.error(

        `Unable to create Redis sandbox ${containerName}.`,

        error instanceof Error

          ? error.stack

          : String(error),

      );

      await this.forceRemoveContainer(

        containerName,

      );

      throw error;

    }

  }

  /* =======================================================

     WAIT UNTIL REDIS IS READY

  ======================================================= */

  private async waitUntilReady(

    sandbox: RedisSandbox,

  ): Promise<void> {

    const attempts =

      30;

    for (

      let attempt = 1;

      attempt <= attempts;

      attempt += 1

    ) {

      try {

        const output =

          await this.redisCli(

            sandbox,

            [

              'PING',

            ],

          );

        if (

          output

            .trim()

            .toUpperCase() ===

          'PONG'

        ) {

          return;

        }

      } catch {

        // Redis may still be starting.

      }

      await this.delay(

        250,

      );

    }

    throw new Error(

      'Redis sandbox did not become ready.',

    );

  }

  /* =======================================================

     APPLY PROBLEM FIXTURES

  ======================================================= */

  private async applyFixtures(

    sandbox: RedisSandbox,

    problemSlug: string,

  ): Promise<void> {

    switch (

      problemSlug

    ) {

      /* ---------------------------------------------------

         GET VALUE

      --------------------------------------------------- */

      case 'redis-get-value': {

        await this.redisCli(

          sandbox,

          [

            'SET',

            'employee:name',

            'Ananya',

          ],

        );

        break;

      }

      /* ---------------------------------------------------

         KEY EXISTS

      --------------------------------------------------- */

      case 'redis-key-exists': {

        await this.redisCli(

          sandbox,

          [

            'SET',

            'employee:name',

            'Ananya',

          ],

        );

        break;

      }

      /* ---------------------------------------------------

         DELETE KEY

      --------------------------------------------------- */

      case 'redis-delete-key': {

        await this.redisCli(

          sandbox,

          [

            'SET',

            'employee:temporary',

            'temporary',

          ],

        );

        break;

      }

      /* ---------------------------------------------------

         COUNTER

      --------------------------------------------------- */

      case 'redis-increment-counter': {

        await this.redisCli(

          sandbox,

          [

            'SET',

            'page:views',

            '10',

          ],

        );

        break;

      }

      /* ---------------------------------------------------

         EXPIRATION

      --------------------------------------------------- */

      case 'redis-key-expiration': {

        await this.redisCli(

          sandbox,

          [

            'SET',

            'session:user:101',

            'active',

          ],

        );

        break;

      }

      /* ---------------------------------------------------

         HGETALL

      --------------------------------------------------- */

      case 'redis-hgetall': {

        await this.redisCli(

          sandbox,

          [

            'HSET',

            'employee:101',

            'name',

            'Ananya',

            'department',

            'Engineering',

            'salary',

            '65000',

          ],

        );

        break;

      }

      /* ---------------------------------------------------

         LIST RANGE

      --------------------------------------------------- */

      case 'redis-list-range': {

        await this.redisCli(

          sandbox,

          [

            'RPUSH',

            'tasks',

            'design',

            'develop',

            'test',

          ],

        );

        break;

      }

      /* ---------------------------------------------------

         LEADERBOARD RANKING

      --------------------------------------------------- */

      case 'redis-leaderboard-ranking': {

        await this.redisCli(

          sandbox,

          [

            'ZADD',

            'leaderboard',

            '95',

            'Ananya',

            '82',

            'Rahul',

            '91',

            'Meera',

          ],

        );

        break;

      }

      /* ---------------------------------------------------

         TRANSACTION

      --------------------------------------------------- */

      case 'redis-transactions': {

        await this.redisCli(

          sandbox,

          [

            'SET',

            'account:101:balance',

            '1000',

          ],

        );

        await this.redisCli(

          sandbox,

          [

            'SET',

            'account:102:balance',

            '500',

          ],

        );

        break;

      }

      default:

        break;

    }

  }

  /* =======================================================

     EXECUTE LEARNER COMMANDS

     Supports multiple Redis commands separated by lines.

     Example:

     SET employee:name Ananya

     GET employee:name

     Transactions are handled through redis-cli --pipe-like

     stdin execution so MULTI / EXEC use the same connection.

  ======================================================= */

  async execute(
    sandbox: RedisSandbox,
    learnerCode: string,
  ): Promise<RedisExecutionResult> {
    const commandText =
      this.cleanLearnerCode(
        learnerCode,
      );

    if (!commandText) {
      throw new Error(
        'Redis command is required.',
      );
    }

    this.assertSafeCommands(
      commandText,
    );

    try {
      const output =
        await this.executeRedisCliWithInput(
          sandbox,
          commandText,
        );

      const outputLines =
        output
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter(Boolean);

      return {
        columns: ['result'],
        rows: outputLines.map(
          (value) => ({
            result: value,
          }),
        ),
        rowCount: outputLines.length,
        message:
          outputLines.length > 0
            ? outputLines.join('\n')
            : 'OK',
      };
    } catch (error) {
      throw new Error(
        this.getExecutionErrorMessage(
          error,
        ),
      );
    }
  }

  /* =======================================================
     EXECUTE REDIS CLI WITH STDIN
  ======================================================= */

  private async executeRedisCliWithInput(

    sandbox: RedisSandbox,

    commandText: string,

  ): Promise<string> {

    return new Promise<string>(

      (

        resolve,

        reject,

      ) => {

        const child =

          spawn(

            'docker',

            [

              'exec',

              '-i',

              sandbox.containerName,

              'redis-cli',

              '-n',

              String(

                sandbox.database,

              ),

            ],

            {

              stdio: [

                'pipe',

                'pipe',

                'pipe',

              ],

              windowsHide:

                true,

            },

          );

        let stdout =

          '';

        let stderr =

          '';

        let settled =

          false;

        const timeout =

          setTimeout(

            () => {

              if (settled) {

                return;

              }

              settled =

                true;

              child.kill();

              reject(

                new Error(

                  'Redis command timed out.',

                ),

              );

            },

            10_000,

          );

        child.stdout.on(

          'data',

          (

            chunk: Buffer,

          ) => {

            stdout +=

              chunk.toString(

                'utf8',

              );

            if (

              stdout.length >

              1024 * 1024

            ) {

              child.kill();

              if (!settled) {

                settled =

                  true;

                clearTimeout(

                  timeout,

                );

                reject(

                  new Error(

                    'Redis command output exceeded the allowed size.',

                  ),

                );

              }

            }

          },

        );

        child.stderr.on(

          'data',

          (

            chunk: Buffer,

          ) => {

            stderr +=

              chunk.toString(

                'utf8',

              );

          },

        );

        child.on(

          'error',

          (

            error,

          ) => {

            if (settled) {

              return;

            }

            settled =

              true;

            clearTimeout(

              timeout,

            );

            reject(

              error,

            );

          },

        );

        child.on(

          'close',

          (

            code,

          ) => {

            if (settled) {

              return;

            }

            settled =

              true;

            clearTimeout(

              timeout,

            );

            if (code !== 0) {

              reject(

                new Error(

                  stderr.trim() ||

                  stdout.trim() ||

                  `Redis CLI exited with code ${code}.`,

                ),

              );

              return;

            }

            if (stderr.trim()) {

              this.logger.debug(

                stderr.trim(),

              );

            }

            resolve(

              stdout.trim(),

            );

          },

        );

        child.stdin.on(

          'error',

          (

            error,

          ) => {

            const candidate =

              error as NodeJS.ErrnoException;

            if (

              candidate.code !==

              'EPIPE'

            ) {

              this.logger.debug(

                `Redis stdin error: ${candidate.message}`,

              );

            }

          },

        );

        child.stdin.write(

          `${commandText}\n`,

          'utf8',

        );

        child.stdin.end();

      },

    );

  }

  /* =======================================================

     GET CURRENT REDIS STATE

     DatabaseWorkspace currently expects database-like

     tables/columns. Redis keys are represented as tables

     so the existing workspace can display them without

     requiring an immediate UI rewrite.

  ======================================================= */

  async getSchema(

    sandbox: RedisSandbox,

  ): Promise<RedisSchema> {

    const keysOutput =

      await this.redisCli(

        sandbox,

        [

          '--scan',

        ],

      );

    const keys =

      keysOutput

        .split(/\r?\n/)

        .map(

          (

            key,

          ) =>

            key.trim(),

        )

        .filter(Boolean)

        .sort();

    const tables:

      RedisSchema['tables'] =

      [];

    for (

      const key of keys

    ) {

      let type =

        'unknown';

      try {

        type =

          (

            await this.redisCli(

              sandbox,

              [

                'TYPE',

                key,

              ],

            )

          )

            .trim() ||

          'unknown';

      } catch {

        type =

          'unknown';

      }

      tables.push({

        name:

          key,

        columns: [

          {

            name:

              'value',

            dataType:

              type,

          },

        ],

      });

    }

    return {

      database:

        `Redis DB ${sandbox.database}`,

      tables,

    };

  }

  /* =======================================================

     READ STRING VALUE

  ======================================================= */

  async getString(

    sandbox: RedisSandbox,

    key: string,

  ): Promise<string | null> {

    const output =

      await this.redisCli(

        sandbox,

        [

          'GET',

          key,

        ],

      );

    const value =

      output.trim();

    if (

      value === '' ||

      value === '(nil)'

    ) {

      return null;

    }

    return value;

  }

  /* =======================================================

     CHECK KEY EXISTS

  ======================================================= */

  async exists(

    sandbox: RedisSandbox,

    key: string,

  ): Promise<boolean> {

    const output =

      await this.redisCli(

        sandbox,

        [

          'EXISTS',

          key,

        ],

      );

    return (

      Number(

        output.trim(),

      ) ===

      1

    );

  }

  /* =======================================================

     GET TTL

  ======================================================= */

  async ttl(

    sandbox: RedisSandbox,

    key: string,

  ): Promise<number> {

    const output =

      await this.redisCli(

        sandbox,

        [

          'TTL',

          key,

        ],

      );

    return Number(

      output.trim(),

    );

  }

  /* =======================================================

     GET HASH

  ======================================================= */

  async getHash(

    sandbox: RedisSandbox,

    key: string,

  ): Promise<

    Record<

      string,

      string

    >

  > {

    const output =

      await this.redisCli(

        sandbox,

        [

          'HGETALL',

          key,

        ],

      );

    const values =

      output

        .split(/\r?\n/)

        .map(

          (

            value,

          ) =>

            value.trim(),

        )

        .filter(

          (

            value,

          ) =>

            value !== '',

        );

    const result:

      Record<

        string,

        string

      > = {};

    for (

      let index = 0;

      index <

      values.length;

      index += 2

    ) {

      const field =

        values[index];

      const value =

        values[

          index + 1

        ];

      if (

        field !==

          undefined &&

        value !==

          undefined

      ) {

        result[field] =

          value;

      }

    }

    return result;

  }

  /* =======================================================

     GET LIST

  ======================================================= */

  async getList(

    sandbox: RedisSandbox,

    key: string,

  ): Promise<string[]> {

    const output =

      await this.redisCli(

        sandbox,

        [

          'LRANGE',

          key,

          '0',

          '-1',

        ],

      );

    if (

      !output.trim()

    ) {

      return [];

    }

    return output

      .split(/\r?\n/)

      .map(

        (

          value,

        ) =>

          value.trim(),

      )

      .filter(Boolean);

  }

  /* =======================================================

     GET SET MEMBERS

  ======================================================= */

  async getSetMembers(

    sandbox: RedisSandbox,

    key: string,

  ): Promise<string[]> {

    const output =

      await this.redisCli(

        sandbox,

        [

          'SMEMBERS',

          key,

        ],

      );

    if (

      !output.trim()

    ) {

      return [];

    }

    return output

      .split(/\r?\n/)

      .map(

        (

          value,

        ) =>

          value.trim(),

      )

      .filter(Boolean);

  }

  /* =======================================================

     GET SORTED SET WITH SCORES

  ======================================================= */

  async getSortedSet(

    sandbox: RedisSandbox,

    key: string,

  ): Promise<

    Array<{

      member: string;

      score: number;

    }>

  > {

    const output =

      await this.redisCli(

        sandbox,

        [

          'ZRANGE',

          key,

          '0',

          '-1',

          'WITHSCORES',

        ],

      );

    const values =

      output

        .split(/\r?\n/)

        .map(

          (

            value,

          ) =>

            value.trim(),

        )

        .filter(Boolean);

    const result:

      Array<{

        member: string;

        score: number;

      }> = [];

    for (

      let index = 0;

      index <

      values.length;

      index += 2

    ) {

      const member =

        values[index];

      const score =

        values[

          index + 1

        ];

      if (

        member !==

          undefined &&

        score !==

          undefined

      ) {

        result.push({

          member,

          score:

            Number(

              score,

            ),

        });

      }

    }

    return result;

  }

  /* =======================================================

     RESET SANDBOX

  ======================================================= */

  async resetSandbox(

    sandbox: RedisSandbox,

  ): Promise<void> {

    await this.redisCli(

      sandbox,

      [

        'FLUSHDB',

      ],

    );

    await this.applyFixtures(

      sandbox,

      sandbox.problemSlug,

    );

  }

  /* =======================================================

     DESTROY SANDBOX

  ======================================================= */

  async destroySandbox(

    sandbox: RedisSandbox,

  ): Promise<void> {

    this.logger.log(

      `Destroying Redis sandbox ${sandbox.containerName}.`,

    );

    await this.forceRemoveContainer(

      sandbox.containerName,

    );

  }

  /* =======================================================

     REDIS CLI

  ======================================================= */

  private async redisCli(

    sandbox: RedisSandbox,

    args: string[],

  ): Promise<string> {

    const {

      stdout,

      stderr,

    } =

      await execFileAsync(

        'docker',

        [

          'exec',

          sandbox.containerName,

          'redis-cli',

          '-n',

          String(

            sandbox.database,

          ),

          ...args,

        ],

        {

          timeout:

            10_000,

          maxBuffer:

            1024 *

            1024,

        },

      );

    if (

      stderr?.trim()

    ) {

      this.logger.debug(

        stderr.trim(),

      );

    }

    return (

      stdout ??

      ''

    );

  }

  /* =======================================================

     CLEAN LEARNER CODE

  ======================================================= */

  private cleanLearnerCode(
    learnerCode: string,
  ): string {
    return learnerCode
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => {
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
      })
      .join('\n')
      .trim();
  }

  /* =======================================================
     BASIC SECURITY
  ======================================================= */

  private assertSafeCommands(

    commandText: string,

  ): void {

    const blocked =

      [

        /\bFLUSHALL\b/i,

        /\bFLUSHDB\b/i,

        /\bSHUTDOWN\b/i,

        /\bCONFIG\b/i,

        /\bDEBUG\b/i,

        /\bMODULE\b/i,

        /\bREPLICAOF\b/i,

        /\bSLAVEOF\b/i,

        /\bMIGRATE\b/i,

        /\bCLUSTER\b/i,

        /\bMONITOR\b/i,

        /\bACL\b/i,

        /\bSCRIPT\s+KILL\b/i,

        /\bCLIENT\s+KILL\b/i,

        /\bSAVE\b/i,

        /\bBGSAVE\b/i,

        /\bBGREWRITEAOF\b/i,

      ];

    for (

      const pattern of blocked

    ) {

      if (

        pattern.test(

          commandText,

        )

      ) {

        throw new Error(

          'This Redis administrative command is not allowed in the practice sandbox.',

        );

      }

    }

  }

  /* =======================================================

     DOCKER COMMAND

  ======================================================= */

  private async runDocker(

    args: string[],

  ): Promise<string> {

    const {

      stdout,

      stderr,

    } =

      await execFileAsync(

        'docker',

        args,

        {

          timeout:

            30_000,

          maxBuffer:

            1024 *

            1024,

        },

      );

    if (

      stderr?.trim()

    ) {

      this.logger.debug(

        stderr.trim(),

      );

    }

    return (

      stdout ??

      ''

    );

  }

  /* =======================================================

     FORCE REMOVE CONTAINER

  ======================================================= */

  private async forceRemoveContainer(

    containerName: string,

  ): Promise<void> {

    try {

      await this.runDocker([

        'rm',

        '-f',

        containerName,

      ]);

    } catch {

      /*

       * Ignore cleanup errors.

       *

       * The container may already have been removed because

       * it was started with --rm.

       */

    }

  }

  /* =======================================================

     EXECUTION ERROR MESSAGE

  ======================================================= */

  private getExecutionErrorMessage(

    error: unknown,

  ): string {

    if (

      error instanceof Error

    ) {

      const candidate =

        error as Error & {

          stderr?: string;

          stdout?: string;

        };

      const stderr =

        candidate.stderr

          ?.trim();

      if (

        stderr

      ) {

        return stderr;

      }

      const stdout =

        candidate.stdout

          ?.trim();

      if (

        stdout

      ) {

        return stdout;

      }

      return error.message;

    }

    return String(

      error,

    );

  }

  /* =======================================================

     DELAY

  ======================================================= */

  private async delay(

    milliseconds: number,

  ): Promise<void> {

    await new Promise<void>(

      (

        resolve,

      ) => {

        setTimeout(

          resolve,

          milliseconds,

        );

      },

    );

  }

}
