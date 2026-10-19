import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import {
  spawn,
} from 'node:child_process';

import {
  randomBytes,
} from 'node:crypto';

import {
  getPostgresqlFixtureSql,
} from './postgresql-fixtures.js';

/* =========================================================
   POSTGRESQL SANDBOX TYPES
========================================================= */

export type PostgreSqlSandbox = {
  containerName: string;

  database: string;

  username: string;

  password: string;
};

export type PostgreSqlQueryResult = {
  stdout: string;

  stderr: string;

  exitCode: number;
};

/* =========================================================
   DOCKER ERROR TYPE
========================================================= */

type DockerProcessError =
  Error & {
    stdout?: string;

    stderr?: string;

    code?: number;
  };

/* =========================================================
   POSTGRESQL SANDBOX SERVICE

   Each learner session receives an isolated PostgreSQL
   Docker container.

   Temporary mode:
     container removed when session closes.

   No PostgreSQL port is published to the host.

   The learner never receives PostgreSQL credentials.
========================================================= */

@Injectable()
export class PostgreSqlSandboxService {
  private readonly image =
    'postgres:17-alpine';

  private readonly database =
    'learner_db';

  private readonly username =
    'learner';

  private readonly commandTimeout =
    15_000;

  private readonly maxOutputBytes =
    2 * 1024 * 1024;

  /* =======================================================
     CREATE SANDBOX
  ======================================================= */

  async createSandbox(
    sessionId: string,

    problemSlug?: string,
  ): Promise<PostgreSqlSandbox> {
    const safeSessionId =
      sessionId
        .replace(
          /[^a-zA-Z0-9]/g,
          '',
        )
        .toLowerCase()
        .slice(
          0,
          20,
        );

    const containerName =
      `elab-pg-${safeSessionId}`;

    const password =
      randomBytes(
        24,
      ).toString(
        'hex',
      );

    /*
     * Development safety:
     *
     * If an earlier failed request left the same
     * container behind, remove it before creating
     * another sandbox.
     */
    await this.removeContainerIfExists(
      containerName,
    );

    try {
      await this.runDocker([
        'run',

        '--detach',

        '--name',
        containerName,

        /* ===============================================
           RESOURCE LIMITS
        =============================================== */

        '--memory',
        '256m',

        '--cpus',
        '0.50',

        '--pids-limit',
        '100',

        '--shm-size',
        '64m',

        /* ===============================================
           POSTGRESQL CONFIGURATION
        =============================================== */

        '-e',
        `POSTGRES_DB=${this.database}`,

        '-e',
        `POSTGRES_USER=${this.username}`,

        '-e',
        `POSTGRES_PASSWORD=${password}`,

        /*
         * IMPORTANT:
         *
         * No -p / --publish option is used.
         *
         * PostgreSQL is therefore not published as
         * a learner-accessible host port.
         *
         * No persistent volume is attached yet.
         *
         * Removing this temporary container removes
         * the temporary learner database.
         */

        this.image,
      ]);

      await this.waitUntilReady(
        containerName,
        this.username,
        this.database,
        password,
      );

      const sandbox:
        PostgreSqlSandbox = {
          containerName,

          database:
            this.database,

          username:
            this.username,

          password,
        };

      /*
       * Practice fixtures are internal setup SQL.
       *
       * They prepare the temporary database for problems
       * such as SELECT, UPDATE, JOIN, VIEW, INDEX, etc.
       *
       * The SQL is never returned to the learner and is
       * never inserted into the Monaco editor.
       *
       * problemSlug is optional so existing callers remain
       * compatible until DatabaseLabService is updated.
       */
      if (
        problemSlug
      ) {
        await this.applyProblemFixture(
          sandbox,
          problemSlug,
        );
      }

      return sandbox;
    } catch (error) {
      await this.removeContainerIfExists(
        containerName,
      );

      throw new InternalServerErrorException(
        this.getErrorMessage(
          error,
          'Unable to create PostgreSQL sandbox.',
        ),
      );
    }
  }

  /* =======================================================
     APPLY PRACTICE FIXTURE

     Runs only after PostgreSQL is ready.

     The fixture is trusted application-owned SQL from
     mysql-fixtures.ts. It is not learner SQL.
  ======================================================= */

  private async applyProblemFixture(
    sandbox:
      PostgreSqlSandbox,

    problemSlug: string,
  ): Promise<void> {
    const setupSql =
      getPostgresqlFixtureSql(
        problemSlug,
      );

    if (
      !setupSql.trim()
    ) {
      return;
    }

    try {
      await this.runDocker(
        [
          'exec',

          '-i',

          sandbox.containerName,

          'psql',

          '-X',

          '--no-psqlrc',

          '--set',
          'ON_ERROR_STOP=1',

          '--username',
          sandbox.username,

          '--dbname',
          sandbox.database,
        ],

        setupSql,
      );
    } catch (error) {
      throw new Error(
        this.getErrorMessage(
          error,
          `Unable to prepare PostgreSQL fixture for problem "${problemSlug}".`,
        ),
      );
    }
  }

  /* =======================================================
     EXECUTE SQL
  ======================================================= */

  async executeSql(
    sandbox:
      PostgreSqlSandbox,

    sql: string,
  ): Promise<PostgreSqlQueryResult> {
    if (
      !sql.trim()
    ) {
      return {
        stdout:
          '',

        stderr:
          'SQL query is empty.',

        exitCode:
          1,
      };
    }

    try {
      /*
       * SQL is passed to the mysql client through stdin.
       *
       * We intentionally do NOT use:
       *
       * exec()
       * shell: true
       * sh -c
       *
       * Learner SQL is therefore not interpolated
       * into a host shell command.
       */

      const result =
        await this.runDocker(
          [
            'exec',

            '-i',

            sandbox.containerName,

            'psql',

            '-X',

            '--no-psqlrc',

            '--set',
            'ON_ERROR_STOP=1',

            '--username',
            sandbox.username,

            '--dbname',
            sandbox.database,
          ],

          sql,
        );

      return {
        stdout:
          result.stdout,

        stderr:
          result.stderr,

        exitCode:
          0,
      };
    } catch (error) {
      const dockerError =
        error as DockerProcessError;

      return {
        stdout:
          dockerError.stdout ??
          '',

        stderr:
          dockerError.stderr ??
          dockerError.message ??
          'PostgreSQL query failed.',

        exitCode:
          typeof dockerError.code ===
          'number'
            ? dockerError.code
            : 1,
      };
    }
  }

  /* =======================================================
     GET TABLES
  ======================================================= */

  async getTables(
    sandbox:
      PostgreSqlSandbox,
  ): Promise<string[]> {
    const sql = `
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE'
ORDER BY table_name;
`;

    try {
      const result =
        await this.runDocker(
          [
            'exec',

            '-i',

            sandbox.containerName,

            'psql',

            '-X',

            '--no-psqlrc',

            '--set',
            'ON_ERROR_STOP=1',

            '--username',
            sandbox.username,

            '--dbname',
            sandbox.database,
          ],

          sql,
        );

      return this.parseListOutput(
        result.stdout,
      );
    } catch {
      return [];
    }
  }

  /* =======================================================
     GET VIEWS
  ======================================================= */

  async getViews(
    sandbox:
      PostgreSqlSandbox,
  ): Promise<string[]> {
    const sql = `
SELECT table_name
FROM information_schema.views
WHERE table_schema = 'public'
ORDER BY table_name;
`;

    try {
      const result =
        await this.runDocker(
          [
            'exec',

            '-i',

            sandbox.containerName,

            'psql',

            '-X',

            '--no-psqlrc',

            '--set',
            'ON_ERROR_STOP=1',

            '--username',
            sandbox.username,

            '--dbname',
            sandbox.database,
          ],

          sql,
        );

      return this.parseListOutput(
        result.stdout,
      );
    } catch {
      return [];
    }
  }

  /* =======================================================
     GET INDEXES
  ======================================================= */

  async getIndexes(
    sandbox:
      PostgreSqlSandbox,
  ): Promise<string[]> {
    const sql = `
SELECT indexname
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY indexname;
`;

    try {
      const result =
        await this.runDocker(
          [
            'exec',

            '-i',

            sandbox.containerName,

            'psql',

            '-X',

            '--no-psqlrc',

            '--set',
            'ON_ERROR_STOP=1',

            '--username',
            sandbox.username,

            '--dbname',
            sandbox.database,
          ],

          sql,
        );

      return this.parseListOutput(
        result.stdout,
      );
    } catch {
      return [];
    }
  }

  /* =======================================================
     DESTROY TEMPORARY SANDBOX
  ======================================================= */

  async destroySandbox(
    sandbox:
      PostgreSqlSandbox,
  ): Promise<void> {
    await this.removeContainerIfExists(
      sandbox.containerName,
    );
  }

  /* =======================================================
     WAIT FOR POSTGRESQL
  ======================================================= */

  private async waitUntilReady(
    containerName: string,

    username: string,

    database: string,

    _password?: string,
  ): Promise<void> {
    const attempts = 60;

    for (let attempt = 0; attempt < attempts; attempt += 1) {
      try {
        await this.runDocker([
          'exec',
          containerName,
          'pg_isready',
          '--username',
          username,
          '--dbname',
          database,
        ]);
        return;
      } catch {
        await this.sleep(500);
      }
    }

    throw new Error(
      'PostgreSQL sandbox did not become ready in time.',
    );
  }

  /* =======================================================
     REMOVE CONTAINER IF IT EXISTS
  ======================================================= */

  private async removeContainerIfExists(
    containerName: string,
  ): Promise<void> {
    try {
      await this.runDocker([
        'rm',

        '--force',

        '--volumes',

        containerName,
      ]);
    } catch {
      /*
       * This is expected when the container
       * does not exist.
       */
    }
  }

  /* =======================================================
     PARSE DATABASE LIST OUTPUT
  ======================================================= */

  private parseListOutput(
    stdout: string,
  ): string[] {
    return stdout
      .split(
        /\r?\n/,
      )
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
          Boolean(
            value,
          ),
      );
  }

  /* =======================================================
     DOCKER EXECUTION

     spawn() is required here because learner SQL needs
     to be sent to:

       docker exec -i ... psql

     through stdin.

     shell:false prevents Docker arguments from being
     interpreted by a host shell.
  ======================================================= */

  private async runDocker(
    args: string[],

    input?: string,
  ): Promise<{
    stdout: string;

    stderr: string;
  }> {
    return new Promise(
      (
        resolve,
        reject,
      ) => {
        const child =
          spawn(
            'docker',
            args,
            {
              windowsHide:
                true,

              shell:
                false,

              stdio: [
                'pipe',
                'pipe',
                'pipe',
              ],
            },
          );

        let stdout =
          '';

        let stderr =
          '';

        let stdoutBytes =
          0;

        let stderrBytes =
          0;

        let finished =
          false;

        let outputLimitExceeded =
          false;

        /* ===============================================
           COMPLETE SUCCESSFULLY
        =============================================== */

        const completeSuccess =
          () => {
            if (
              finished
            ) {
              return;
            }

            finished =
              true;

            clearTimeout(
              timeout,
            );

            resolve({
              stdout,
              stderr,
            });
          };

        /* ===============================================
           COMPLETE WITH ERROR
        =============================================== */

        const completeError =
          (
            error:
              DockerProcessError,
          ) => {
            if (
              finished
            ) {
              return;
            }

            finished =
              true;

            clearTimeout(
              timeout,
            );

            error.stdout =
              stdout;

            error.stderr =
              stderr;

            reject(
              error,
            );
          };

        /* ===============================================
           TIMEOUT
        =============================================== */

        const timeout =
          setTimeout(
            () => {
              if (
                finished
              ) {
                return;
              }

              const error =
                new Error(
                  'Docker command timed out.',
                ) as DockerProcessError;

              error.code =
                124;

              child.kill();

              completeError(
                error,
              );
            },
            this.commandTimeout,
          );

        /* ===============================================
           STDOUT
        =============================================== */

        child.stdout.on(
          'data',
          (
            chunk:
              Buffer,
          ) => {
            if (
              finished
            ) {
              return;
            }

            stdoutBytes +=
              chunk.length;

            if (
              stdoutBytes >
              this.maxOutputBytes
            ) {
              outputLimitExceeded =
                true;

              child.kill();

              return;
            }

            stdout +=
              chunk.toString(
                'utf8',
              );
          },
        );

        /* ===============================================
           STDERR
        =============================================== */

        child.stderr.on(
          'data',
          (
            chunk:
              Buffer,
          ) => {
            if (
              finished
            ) {
              return;
            }

            stderrBytes +=
              chunk.length;

            if (
              stderrBytes >
              this.maxOutputBytes
            ) {
              outputLimitExceeded =
                true;

              child.kill();

              return;
            }

            stderr +=
              chunk.toString(
                'utf8',
              );
          },
        );

        /* ===============================================
           PROCESS START ERROR

           Example:
           Docker command not found.
        =============================================== */

        child.on(
          'error',
          (
            error,
          ) => {
            const processError =
              error as DockerProcessError;

            completeError(
              processError,
            );
          },
        );

        /* ===============================================
           PROCESS CLOSED
        =============================================== */

        child.on(
          'close',
          (
            code,
          ) => {
            if (
              finished
            ) {
              return;
            }

            if (
              outputLimitExceeded
            ) {
              const error =
                new Error(
                  'Docker command output exceeded the allowed limit.',
                ) as DockerProcessError;

              error.code =
                125;

              completeError(
                error,
              );

              return;
            }

            if (
              code === 0
            ) {
              completeSuccess();

              return;
            }

            const error =
              new Error(
                stderr.trim() ||
                  `Docker command exited with code ${code ?? 1}.`,
              ) as DockerProcessError;

            error.code =
              code ?? 1;

            completeError(
              error,
            );
          },
        );

        /* ===============================================
           SEND INPUT THROUGH STDIN
        =============================================== */

        if (
          typeof input ===
          'string'
        ) {
          child.stdin.write(
            input,
            'utf8',
          );
        }

        child.stdin.end();
      },
    );
  }

  /* =======================================================
     ERROR MESSAGE
  ======================================================= */

  private getErrorMessage(
    error: unknown,

    fallback: string,
  ): string {
    if (
      error instanceof Error
    ) {
      return `${fallback} ${error.message}`;
    }

    return fallback;
  }

  /* =======================================================
     SLEEP
  ======================================================= */

  private async sleep(
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