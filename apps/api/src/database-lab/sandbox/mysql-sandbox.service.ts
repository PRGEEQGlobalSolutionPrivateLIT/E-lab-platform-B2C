import {
  Injectable,
  Logger,
} from '@nestjs/common';

import {
  randomBytes,
} from 'node:crypto';

import {
  spawn,
} from 'node:child_process';

import {
  getMysqlFixtureSql,
} from './mysql-fixtures.js';

/* =========================================================
   MYSQL SANDBOX TYPES
========================================================= */

export type MysqlSandbox = {
  sessionId: string;

  containerName: string;

  database: string;

  username: string;

  password: string;

  problemSlug: string;
};

export type MysqlQueryResult = {
  stdout: string;

  stderr: string;

  exitCode: number;
};

type DockerCommandResult = {
  stdout: string;

  stderr: string;

  exitCode: number;
};

/* =========================================================
   MYSQL SANDBOX SERVICE

   Architecture:

   NestJS API
        ↓
   MysqlSandboxService
        ↓
   Docker
        ↓
   mysql:8.4
        ↓
   learner_db
========================================================= */

@Injectable()
export class MysqlSandboxService {
  private readonly logger =
    new Logger(
      MysqlSandboxService.name,
    );

  /* =======================================================
     MYSQL CONFIGURATION
  ======================================================= */

  private readonly image =
    process.env.MYSQL_SANDBOX_IMAGE ??
    'mysql:8.4';

  private readonly database =
    'learner_db';

  private readonly username =
    'learner';

  private readonly memoryLimit =
    '256m';

  private readonly cpuLimit =
    '0.5';

  /* =======================================================
     COMMAND SAFETY
  ======================================================= */

  private readonly commandTimeoutMs =
    15_000;

  private readonly startupTimeoutMs =
    60_000;

  private readonly maxOutputBytes =
    2 * 1024 * 1024;

  /* =======================================================
     CREATE SANDBOX
  ======================================================= */

  async createSandbox(
    sessionId: string,

    problemSlug: string,
  ): Promise<MysqlSandbox> {
    const cleanSessionId =
      this.sanitizeSessionId(
        sessionId,
      );

    const containerName =
      `elab-mysql-${cleanSessionId}`;

    const password =
      this.generatePassword();

    /*
     * Remove any stale container left behind
     * from a previous failed session.
     */

    await this.removeContainerIfExists(
      containerName,
    );

    this.logger.log(
      `Creating MySQL sandbox "${containerName}" for problem "${problemSlug}".`,
    );

    try {
      const createResult =
        await this.runDocker([
        'run',

        '--detach',

        '--name',
        containerName,

        '--memory',
        this.memoryLimit,

        '--cpus',
        this.cpuLimit,

        /*
         * Prevent excessive process creation
         * inside the learner database container.
         */

        '--pids-limit',
        '128',

        /*
         * Do not expose MySQL to the host.
         *
         * The NestJS API communicates with the
         * database through docker exec.
         */

        '-e',
        `MYSQL_DATABASE=${this.database}`,

        '-e',
        `MYSQL_USER=${this.username}`,

        '-e',
        `MYSQL_PASSWORD=${password}`,

        '-e',
        `MYSQL_ROOT_PASSWORD=${password}`,

        this.image,
      ]);

      if (
        createResult.exitCode !==
        0
      ) {
        throw new Error(
          createResult.stderr ||
            createResult.stdout ||
            'Unable to create MySQL Docker sandbox.',
        );
      }

      await this.waitUntilReady(
        containerName,
        password,
      );

      /*
       * The Docker MySQL image grants MYSQL_USER access to
       * MYSQL_DATABASE only. Database practice includes
       * CREATE DATABASE, so grant broader privileges inside
       * this isolated disposable sandbox.
       */

      await this.grantLearnerPrivileges(
        containerName,
        password,
      );

      const sandbox:
        MysqlSandbox = {
          sessionId,

          containerName,

          database:
            this.database,

          username:
            this.username,

          password,

          problemSlug,
        };

      /*
       * Apply internal fixture data.
       *
       * Example:
       *
       * mysql-select-records
       * receives an employees table
       * containing sample rows.
       */

      const fixtureSql =
        getMysqlFixtureSql(
          problemSlug,
        );

      if (
        fixtureSql.trim()
      ) {
        const fixtureResult =
          await this.executeSql(
            sandbox,
            fixtureSql,
          );

        if (
          fixtureResult.exitCode !==
          0
        ) {
          throw new Error(
            fixtureResult.stderr ||
              fixtureResult.stdout ||
              'Unable to apply MySQL practice fixture.',
          );
        }
      }

      this.logger.log(
        `MySQL sandbox "${containerName}" is ready.`,
      );

      return sandbox;
    } catch (
      error
    ) {
      /*
       * Never leave a failed sandbox running.
       */

      await this.removeContainerIfExists(
        containerName,
      );

      throw error;
    }
  }

  /* =======================================================
     EXECUTE SQL

     SQL is passed through stdin.

     This is safer and more reliable than placing
     learner SQL directly in command arguments.
  ======================================================= */

  async executeSql(
    sandbox: MysqlSandbox,

    sql: string,
  ): Promise<MysqlQueryResult> {
    const cleanSql =
      sql.trim();

    if (
      !cleanSql
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

    const result =
      await this.runDocker(
        [
          'exec',

          '-i',

          sandbox.containerName,

          'mysql',

          '--batch',

          '--raw',

          `--user=${sandbox.username}`,

          `--password=${sandbox.password}`,

          sandbox.database,
        ],

        cleanSql,
      );

    return {
      stdout:
        result.stdout,

      stderr:
        this.cleanMysqlWarning(
          result.stderr,
        ),

      exitCode:
        result.exitCode,
    };
  }

  /* =======================================================
     GET TABLES
  ======================================================= */

  async getTables(
    sandbox: MysqlSandbox,
  ): Promise<string[]> {
    const result =
      await this.executeMetadataSql(
        sandbox,
        `
SELECT table_name
FROM information_schema.tables
WHERE table_schema = DATABASE()
  AND table_type = 'BASE TABLE'
ORDER BY table_name;
        `.trim(),
      );

    if (
      result.exitCode !==
      0
    ) {
      this.logger.warn(
        `Unable to read MySQL tables for "${sandbox.containerName}": ${result.stderr}`,
      );

      return [];
    }

    return this.parseSingleColumnOutput(
      result.stdout,
    );
  }

  /* =======================================================
     GET VIEWS
  ======================================================= */

  async getViews(
    sandbox: MysqlSandbox,
  ): Promise<string[]> {
    const result =
      await this.executeMetadataSql(
        sandbox,
        `
SELECT table_name
FROM information_schema.views
WHERE table_schema = DATABASE()
ORDER BY table_name;
        `.trim(),
      );

    if (
      result.exitCode !==
      0
    ) {
      this.logger.warn(
        `Unable to read MySQL views for "${sandbox.containerName}": ${result.stderr}`,
      );

      return [];
    }

    return this.parseSingleColumnOutput(
      result.stdout,
    );
  }

  /* =======================================================
     GET INDEXES
  ======================================================= */

  async getIndexes(
    sandbox: MysqlSandbox,
  ): Promise<string[]> {
    const result =
      await this.executeMetadataSql(
        sandbox,
        `
SELECT DISTINCT index_name
FROM information_schema.statistics
WHERE table_schema = DATABASE()
  AND index_name <> 'PRIMARY'
ORDER BY index_name;
        `.trim(),
      );

    if (
      result.exitCode !==
      0
    ) {
      this.logger.warn(
        `Unable to read MySQL indexes for "${sandbox.containerName}": ${result.stderr}`,
      );

      return [];
    }

    return this.parseSingleColumnOutput(
      result.stdout,
    );
  }

  /* =======================================================
     DESTROY SANDBOX
  ======================================================= */

  async destroySandbox(
    sandbox:
      | MysqlSandbox
      | string,
  ): Promise<void> {
    const containerName =
      typeof sandbox ===
      'string'
        ? sandbox
        : sandbox.containerName;

    await this.removeContainerIfExists(
      containerName,
    );
  }

  /* =======================================================
     EXECUTE METADATA SQL

     Uses --skip-column-names so schema explorer
     receives clean values.
  ======================================================= */

  private async executeMetadataSql(
    sandbox: MysqlSandbox,

    sql: string,
  ): Promise<MysqlQueryResult> {
    const result =
      await this.runDocker(
        [
          'exec',

          '-i',

          sandbox.containerName,

          'mysql',

          '--batch',

          '--raw',

          '--skip-column-names',

          `--user=${sandbox.username}`,

          `--password=${sandbox.password}`,

          sandbox.database,
        ],

        sql,
      );

    return {
      stdout:
        result.stdout,

      stderr:
        this.cleanMysqlWarning(
          result.stderr,
        ),

      exitCode:
        result.exitCode,
    };
  }

  /* =======================================================
     WAIT FOR MYSQL

     MySQL requires a short initialization period after
     the Docker container starts.

     mysqladmin ping confirms the server is accepting
     connections.

     A second SELECT confirms learner_db is available.
  ======================================================= */

  private async waitUntilReady(
    containerName: string,

    password: string,
  ): Promise<void> {
    const startedAt =
      Date.now();

    let lastError =
      '';

    while (
      Date.now() -
        startedAt <
      this.startupTimeoutMs
    ) {
      try {
        /*
         * Use the MySQL root account for the startup probe.
         *
         * The learner account receives its broader practice
         * privileges only AFTER startup succeeds, so readiness
         * must not depend on learner permissions.
         *
         * A successful SELECT against learner_db proves:
         * - mysqld is accepting connections
         * - Docker initialization has completed
         * - learner_db exists
         */

        const result =
          await this.runDocker([
            'exec',

            containerName,

            'mysql',

            '--batch',

            '--raw',

            '--skip-column-names',

            '--user=root',

            `--password=${password}`,

            this.database,

            '-e',

            'SELECT 1;',
          ]);

        if (
          result.exitCode ===
          0 &&
          result.stdout
            .trim() ===
            '1'
        ) {
          return;
        }

        lastError =
          this.cleanMysqlWarning(
            result.stderr ||
              result.stdout,
          );
      } catch (
        error
      ) {
        lastError =
          error instanceof Error
            ? error.message
            : String(
                error,
              );
      }

      await this.sleep(
        500,
      );
    }

    const details =
      lastError
        ? ` Last MySQL response: ${lastError}`
        : '';

    throw new Error(
      `MySQL sandbox "${containerName}" did not become ready within ${this.startupTimeoutMs}ms.${details}`,
    );
  }

  /* =======================================================
     GRANT LEARNER SANDBOX PRIVILEGES

     MYSQL_USER created by the official Docker image is
     initially scoped to learner_db.

     E-Lab database practice also requires database-level
     statements such as CREATE DATABASE. Because every lab
     runs in its own temporary Docker container, the learner
     can safely receive full privileges inside that sandbox.
  ======================================================= */

  private async grantLearnerPrivileges(
    containerName: string,

    rootPassword: string,
  ): Promise<void> {
    const result =
      await this.runDocker(
        [
          'exec',

          '-i',

          containerName,

          'mysql',

          '--batch',

          '--raw',

          '--user=root',

          `--password=${rootPassword}`,
        ],

        `
GRANT ALL PRIVILEGES ON *.* TO '${this.username}'@'%';
FLUSH PRIVILEGES;
        `.trim(),
      );

    if (
      result.exitCode !==
      0
    ) {
      const cleanError =
        this.cleanMysqlWarning(
          result.stderr ||
            result.stdout,
        );

      throw new Error(
        cleanError ||
          'Unable to grant MySQL learner sandbox privileges.',
      );
    }

    this.logger.log(
      `MySQL learner privileges granted for "${containerName}".`,
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

        '-f',

        containerName,
      ]);
    } catch {
      /*
       * docker rm returns an error when the container
       * does not exist.
       *
       * That is safe to ignore here.
       */
    }
  }

  /* =======================================================
     DOCKER COMMAND RUNNER

     Uses spawn rather than exec.

     Benefits:

     - avoids shell interpolation
     - avoids shell command injection
     - supports stdin
     - allows output limits
     - allows timeout control
  ======================================================= */

  private runDocker(
    args: string[],

    stdin?: string,
  ): Promise<DockerCommandResult> {
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

        let outputBytes =
          0;

        let finished =
          false;

        const finish = (
          callback:
            () => void,
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

          callback();
        };

        const timeout =
          setTimeout(
            () => {
              try {
                child.kill();
              } catch {
                /*
                 * Ignore kill failure.
                 */
              }

              finish(
                () => {
                  reject(
                    new Error(
                      `Docker command timed out after ${this.commandTimeoutMs}ms.`,
                    ),
                  );
                },
              );
            },
            this.commandTimeoutMs,
          );

        child.stdout.on(
          'data',
          (
            chunk:
              Buffer,
          ) => {
            outputBytes +=
              chunk.length;

            if (
              outputBytes >
              this.maxOutputBytes
            ) {
              try {
                child.kill();
              } catch {
                /*
                 * Ignore kill failure.
                 */
              }

              finish(
                () => {
                  reject(
                    new Error(
                      'Docker command exceeded the maximum output size.',
                    ),
                  );
                },
              );

              return;
            }

            stdout +=
              chunk.toString(
                'utf8',
              );
          },
        );

        child.stderr.on(
          'data',
          (
            chunk:
              Buffer,
          ) => {
            outputBytes +=
              chunk.length;

            if (
              outputBytes >
              this.maxOutputBytes
            ) {
              try {
                child.kill();
              } catch {
                /*
                 * Ignore kill failure.
                 */
              }

              finish(
                () => {
                  reject(
                    new Error(
                      'Docker command exceeded the maximum output size.',
                    ),
                  );
                },
              );

              return;
            }

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
            finish(
              () => {
                reject(
                  new Error(
                    `Unable to start Docker command: ${error.message}`,
                  ),
                );
              },
            );
          },
        );

        child.on(
          'close',
          (
            code,
          ) => {
            finish(
              () => {
                resolve({
                  stdout:
                    stdout.trim(),

                  stderr:
                    stderr.trim(),

                  exitCode:
                    code ??
                    1,
                });
              },
            );
          },
        );

        /*
         * Pass SQL through stdin.
         */

        if (
          typeof stdin ===
          'string'
        ) {
          child.stdin.write(
            stdin,
          );
        }

        child.stdin.end();
      },
    );
  }

  /* =======================================================
     PARSE SINGLE COLUMN MYSQL OUTPUT
  ======================================================= */

  private parseSingleColumnOutput(
    stdout: string,
  ): string[] {
    if (
      !stdout.trim()
    ) {
      return [];
    }

    const values =
      stdout
        .split(
          /\r?\n/,
        )
        .map(
          (
            line,
          ) =>
            line.trim(),
        )
        .filter(
          (
            line,
          ) =>
            Boolean(
              line,
            ),
        );

    return Array.from(
      new Set(
        values,
      ),
    );
  }

  /* =======================================================
     REMOVE MYSQL PASSWORD WARNING

     The mysql CLI can print:

     mysql: [Warning] Using a password on the command line
     interface can be insecure.

     This is internal infrastructure output and should not
     be displayed as a learner SQL error.
  ======================================================= */

  private cleanMysqlWarning(
    stderr: string,
  ): string {
    if (
      !stderr
    ) {
      return '';
    }

    return stderr
      .split(
        /\r?\n/,
      )
      .filter(
        (
          line,
        ) =>
          !line.includes(
            'Using a password on the command line interface can be insecure',
          ),
      )
      .join(
        '\n',
      )
      .trim();
  }

  /* =======================================================
     GENERATE MYSQL PASSWORD
  ======================================================= */

  private generatePassword(): string {
    /*
     * Hex avoids characters that could be troublesome
     * when passed as Docker environment variables or
     * command-line values.
     */

    return randomBytes(
      24,
    ).toString(
      'hex',
    );
  }

  /* =======================================================
     SANITIZE SESSION ID

     Docker container names should contain only safe,
     predictable characters.
  ======================================================= */

  private sanitizeSessionId(
    sessionId: string,
  ): string {
    const cleanSessionId =
      sessionId
        .trim()
        .toLowerCase()
        .replace(
          /[^a-z0-9_-]/g,
          '-',
        )
        .replace(
          /-+/g,
          '-',
        )
        .replace(
          /^[-_]+|[-_]+$/g,
          '',
        );

    if (
      cleanSessionId
    ) {
      return cleanSessionId;
    }

    return randomBytes(
      8,
    ).toString(
      'hex',
    );
  }

  /* =======================================================
     SLEEP
  ======================================================= */

  private sleep(
    milliseconds: number,
  ): Promise<void> {
    return new Promise(
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