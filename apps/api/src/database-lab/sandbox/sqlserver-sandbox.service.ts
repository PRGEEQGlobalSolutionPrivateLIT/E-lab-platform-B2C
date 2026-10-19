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
  getSqlServerFixtureSql,
} from './sqlserver-fixtures.js';

/* =========================================================
   TYPES
========================================================= */

export type SqlServerSandbox = {
  sessionId: string;
  containerName: string;
  database: string;
  username: string;
  password: string;
  problemSlug: string;
};

export type SqlServerQueryResult = {
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
   SQL SERVER SANDBOX SERVICE

   IMPORTANT:

   This file MUST export:

   SqlServerSandboxService

   database-lab.module.ts imports this exact class.
========================================================= */

@Injectable()
export class SqlServerSandboxService {
  private readonly logger =
    new Logger(
      SqlServerSandboxService.name,
    );

  /* =======================================================
     CONFIGURATION
  ======================================================= */

  private readonly image =
    process.env.SQLSERVER_SANDBOX_IMAGE ??
    'mcr.microsoft.com/mssql/server:2022-latest';

  private readonly defaultDatabase =
    'learner_db';

  private readonly username =
    'sa';

  private readonly memoryLimit =
    process.env.SQLSERVER_SANDBOX_MEMORY ??
    '2g';

  private readonly cpuLimit =
    process.env.SQLSERVER_SANDBOX_CPUS ??
    '1';

  private readonly commandTimeoutMs =
    30_000;

  private readonly startupTimeoutMs =
    120_000;

  private readonly maxOutputBytes =
    2 * 1024 * 1024;

  /* =======================================================
     SQLCMD LOCATIONS

     New SQL Server images normally use:

     /opt/mssql-tools18/bin/sqlcmd

     Older images may use:

     /opt/mssql-tools/bin/sqlcmd
  ======================================================= */

  private readonly sqlcmdCandidates = [
    '/opt/mssql-tools18/bin/sqlcmd',
    '/opt/mssql-tools/bin/sqlcmd',
  ];

  /* =======================================================
     CREATE SANDBOX
  ======================================================= */

  async createSandbox(
    sessionId: string,
    problemSlug: string,
  ): Promise<SqlServerSandbox> {
    const cleanSessionId =
      this.sanitizeSessionId(
        sessionId,
      );

    const containerName =
      `elab-sqlserver-${cleanSessionId}`;

    const password =
      this.generatePassword();

    /*
     * Remove stale container if the same session
     * was previously interrupted.
     */
    await this.removeContainerIfExists(
      containerName,
    );

    this.logger.log(
      `Creating SQL Server sandbox "${containerName}" for "${problemSlug}".`,
    );

    try {
      /* ---------------------------------------------------
         START SQL SERVER CONTAINER
      --------------------------------------------------- */

      const runResult =
        await this.runDocker([
          'run',

          '--detach',

          '--name',
          containerName,

          '--memory',
          this.memoryLimit,

          '--cpus',
          this.cpuLimit,

          '--pids-limit',
          '256',

          '-e',
          'ACCEPT_EULA=Y',

          '-e',
          'MSSQL_PID=Developer',

          '-e',
          `MSSQL_SA_PASSWORD=${password}`,

          this.image,
        ]);

      if (
        runResult.exitCode !== 0
      ) {
        throw new Error(
          runResult.stderr ||
          runResult.stdout ||
          'Unable to create SQL Server sandbox.',
        );
      }

      /* ---------------------------------------------------
         WAIT FOR SQL SERVER
      --------------------------------------------------- */

      const sqlcmdPath =
        await this.waitUntilReady(
          containerName,
          password,
        );

      /* ---------------------------------------------------
         CREATE INTERNAL DATABASE

         learner_db is the default working database.

         The CREATE DATABASE exercise can still create:

         employee_management
      --------------------------------------------------- */

      await this.createLearnerDatabase(
        containerName,
        password,
        sqlcmdPath,
      );

      const sandbox:
        SqlServerSandbox = {
          sessionId,

          containerName,

          database:
            this.defaultDatabase,

          username:
            this.username,

          password,

          problemSlug,
        };

      /* ---------------------------------------------------
         LOAD PROBLEM FIXTURE
      --------------------------------------------------- */

      const fixtureSql =
        getSqlServerFixtureSql(
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
          fixtureResult.exitCode !== 0
        ) {
          throw new Error(
            fixtureResult.stderr ||
            fixtureResult.stdout ||
            `Unable to apply SQL Server fixture for "${problemSlug}".`,
          );
        }
      }

      this.logger.log(
        `SQL Server sandbox "${containerName}" is ready.`,
      );

      return sandbox;
    } catch (error) {
      /*
       * Never leave a failed container running.
       */
      await this.removeContainerIfExists(
        containerName,
      );

      throw error;
    }
  }

  /* =======================================================
     EXECUTE LEARNER SQL
  ======================================================= */

  async executeSql(
    sandbox: SqlServerSandbox,
    sql: string,
  ): Promise<SqlServerQueryResult> {
    const cleanSql =
      sql.trim();

    if (
      !cleanSql
    ) {
      return {
        stdout: '',
        stderr: 'SQL query is empty.',
        exitCode: 1,
      };
    }

    const sqlcmdPath =
      await this.resolveSqlcmdPath(
        sandbox.containerName,
      );

    /*
     * SQL is passed through stdin.
     *
     * This is safer than inserting learner SQL directly
     * into the Docker command arguments.
     */
    const result =
      await this.runDocker(
        [
          'exec',

          '-i',

          sandbox.containerName,

          sqlcmdPath,

          '-S',
          'localhost',

          '-U',
          sandbox.username,

          '-P',
          sandbox.password,

          '-d',
          sandbox.database,

          /*
           * Trust the local container certificate.
           */
          '-C',

          /*
           * Return non-zero exit status on SQL errors.
           */
          '-b',

          /*
           * Remove trailing spaces from output.
           */
          '-W',
        ],

        cleanSql,
      );

    return {
      stdout:
        result.stdout,

      stderr:
        result.stderr,

      exitCode:
        result.exitCode,
    };
  }

  /* =======================================================
     GET TABLES
  ======================================================= */

  async getTables(
    sandbox: SqlServerSandbox,
  ): Promise<string[]> {
    const result =
      await this.executeMetadataSql(
        sandbox,
        `
SET NOCOUNT ON;

SELECT TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_TYPE = 'BASE TABLE'
ORDER BY TABLE_NAME;
        `.trim(),
      );

    if (
      result.exitCode !== 0
    ) {
      this.logger.warn(
        `Unable to inspect tables in "${sandbox.containerName}": ${result.stderr}`,
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
    sandbox: SqlServerSandbox,
  ): Promise<string[]> {
    const result =
      await this.executeMetadataSql(
        sandbox,
        `
SET NOCOUNT ON;

SELECT TABLE_NAME
FROM INFORMATION_SCHEMA.VIEWS
ORDER BY TABLE_NAME;
        `.trim(),
      );

    if (
      result.exitCode !== 0
    ) {
      this.logger.warn(
        `Unable to inspect views in "${sandbox.containerName}": ${result.stderr}`,
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
    sandbox: SqlServerSandbox,
  ): Promise<string[]> {
    const result =
      await this.executeMetadataSql(
        sandbox,
        `
SET NOCOUNT ON;

SELECT DISTINCT i.name
FROM sys.indexes AS i
INNER JOIN sys.objects AS o
  ON i.object_id = o.object_id
WHERE o.type = 'U'
  AND i.name IS NOT NULL
  AND i.is_primary_key = 0
  AND i.is_unique_constraint = 0
ORDER BY i.name;
        `.trim(),
      );

    if (
      result.exitCode !== 0
    ) {
      this.logger.warn(
        `Unable to inspect indexes in "${sandbox.containerName}": ${result.stderr}`,
      );

      return [];
    }

    return this.parseSingleColumnOutput(
      result.stdout,
    );
  }

  /* =======================================================
     DATABASE EXISTS

     Used by hidden validation for:

     sqlserver-create-database
  ======================================================= */

  async databaseExists(
    sandbox: SqlServerSandbox,
    databaseName: string,
  ): Promise<boolean> {
    const safeDatabaseName =
      databaseName.replace(
        /'/g,
        "''",
      );

    const result =
      await this.executeMasterSql(
        sandbox,
        `
SET NOCOUNT ON;

SELECT CASE
  WHEN DB_ID(N'${safeDatabaseName}') IS NULL
    THEN 0
  ELSE 1
END;
        `.trim(),
      );

    if (
      result.exitCode !== 0
    ) {
      return false;
    }

    return this
      .parseSingleColumnOutput(
        result.stdout,
      )
      .includes(
        '1',
      );
  }

  /* =======================================================
     DESTROY SANDBOX
  ======================================================= */

  async destroySandbox(
    sandbox:
      | SqlServerSandbox
      | string,
  ): Promise<void> {
    const containerName =
      typeof sandbox === 'string'
        ? sandbox
        : sandbox.containerName;

    await this.removeContainerIfExists(
      containerName,
    );
  }

  /* =======================================================
     CREATE INTERNAL LEARNER DATABASE
  ======================================================= */

  private async createLearnerDatabase(
    containerName: string,
    password: string,
    sqlcmdPath: string,
  ): Promise<void> {
    const result =
      await this.runDocker(
        [
          'exec',

          '-i',

          containerName,

          sqlcmdPath,

          '-S',
          'localhost',

          '-U',
          this.username,

          '-P',
          password,

          '-d',
          'master',

          '-C',

          '-b',

          '-W',
        ],

        `
IF DB_ID(N'${this.defaultDatabase}') IS NULL
BEGIN
  CREATE DATABASE [${this.defaultDatabase}];
END;
        `.trim(),
      );

    if (
      result.exitCode !== 0
    ) {
      throw new Error(
        result.stderr ||
        result.stdout ||
        `Unable to create ${this.defaultDatabase}.`,
      );
    }
  }

  /* =======================================================
     EXECUTE METADATA SQL
  ======================================================= */

  private async executeMetadataSql(
    sandbox: SqlServerSandbox,
    sql: string,
  ): Promise<SqlServerQueryResult> {
    const sqlcmdPath =
      await this.resolveSqlcmdPath(
        sandbox.containerName,
      );

    const result =
      await this.runDocker(
        [
          'exec',

          '-i',

          sandbox.containerName,

          sqlcmdPath,

          '-S',
          'localhost',

          '-U',
          sandbox.username,

          '-P',
          sandbox.password,

          '-d',
          sandbox.database,

          '-C',

          '-b',

          /*
           * Do not print column headers.
           */
          '-h',
          '-1',

          '-W',
        ],

        sql,
      );

    return {
      stdout:
        result.stdout,

      stderr:
        result.stderr,

      exitCode:
        result.exitCode,
    };
  }

  /* =======================================================
     EXECUTE AGAINST MASTER DATABASE
  ======================================================= */

  private async executeMasterSql(
    sandbox: SqlServerSandbox,
    sql: string,
  ): Promise<SqlServerQueryResult> {
    const sqlcmdPath =
      await this.resolveSqlcmdPath(
        sandbox.containerName,
      );

    const result =
      await this.runDocker(
        [
          'exec',

          '-i',

          sandbox.containerName,

          sqlcmdPath,

          '-S',
          'localhost',

          '-U',
          sandbox.username,

          '-P',
          sandbox.password,

          '-d',
          'master',

          '-C',

          '-b',

          '-h',
          '-1',

          '-W',
        ],

        sql,
      );

    return {
      stdout:
        result.stdout,

      stderr:
        result.stderr,

      exitCode:
        result.exitCode,
    };
  }

  /* =======================================================
     WAIT FOR SQL SERVER

     SQL Server normally takes longer to start than MySQL
     or PostgreSQL.
  ======================================================= */

  private async waitUntilReady(
    containerName: string,
    password: string,
  ): Promise<string> {
    const startedAt =
      Date.now();

    let lastError =
      '';

    let sqlcmdPath:
      string | undefined;

    while (
      Date.now() -
        startedAt <
      this.startupTimeoutMs
    ) {
      try {
        /*
         * Find sqlcmd once it becomes available.
         */
        if (
          !sqlcmdPath
        ) {
          sqlcmdPath =
            await this.tryResolveSqlcmdPath(
              containerName,
            );
        }

        if (
          sqlcmdPath
        ) {
          const result =
            await this.runDocker([
              'exec',

              containerName,

              sqlcmdPath,

              '-S',
              'localhost',

              '-U',
              this.username,

              '-P',
              password,

              '-d',
              'master',

              '-C',

              '-b',

              '-h',
              '-1',

              '-W',

              '-Q',
              'SET NOCOUNT ON; SELECT 1;',
            ]);

          if (
            result.exitCode === 0
          ) {
            const output =
              this.parseSingleColumnOutput(
                result.stdout,
              );

            if (
              output.includes(
                '1',
              )
            ) {
              return sqlcmdPath;
            }
          }

          lastError =
            result.stderr ||
            result.stdout;
        }
      } catch (error) {
        lastError =
          error instanceof Error
            ? error.message
            : String(
                error,
              );
      }

      await this.sleep(
        1000,
      );
    }

    throw new Error(
      `SQL Server sandbox "${containerName}" did not become ready within ${this.startupTimeoutMs}ms.${
        lastError
          ? ` Last response: ${lastError}`
          : ''
      }`,
    );
  }

  /* =======================================================
     RESOLVE SQLCMD PATH
  ======================================================= */

  private async resolveSqlcmdPath(
    containerName: string,
  ): Promise<string> {
    const sqlcmdPath =
      await this.tryResolveSqlcmdPath(
        containerName,
      );

    if (
      !sqlcmdPath
    ) {
      throw new Error(
        `sqlcmd was not found inside SQL Server sandbox "${containerName}".`,
      );
    }

    return sqlcmdPath;
  }

  private async tryResolveSqlcmdPath(
    containerName: string,
  ): Promise<string | undefined> {
    for (
      const candidate
      of this.sqlcmdCandidates
    ) {
      const result =
        await this.runDocker([
          'exec',

          containerName,

          'test',

          '-x',

          candidate,
        ]);

      if (
        result.exitCode === 0
      ) {
        return candidate;
      }
    }

    return undefined;
  }

  /* =======================================================
     REMOVE CONTAINER
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
       * Cleanup failure can safely be ignored here.
       */
    }
  }

  /* =======================================================
     RUN DOCKER COMMAND
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
          callback: () => void,
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
              if (
                finished
              ) {
                return;
              }

              try {
                child.kill();
              } catch {
                // Ignore kill failure.
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

        const appendOutput = (
          chunk: Buffer,
          stream:
            'stdout'
            | 'stderr',
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
              // Ignore kill failure.
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

          const text =
            chunk.toString(
              'utf8',
            );

          if (
            stream ===
            'stdout'
          ) {
            stdout += text;
          } else {
            stderr += text;
          }
        };

        child.stdout.on(
          'data',
          (
            chunk: Buffer,
          ) => {
            appendOutput(
              chunk,
              'stdout',
            );
          },
        );

        child.stderr.on(
          'data',
          (
            chunk: Buffer,
          ) => {
            appendOutput(
              chunk,
              'stderr',
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
                    `Unable to execute Docker command: ${error.message}`,
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
                    code ?? 1,
                });
              },
            );
          },
        );

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
     PARSE SQLCMD SINGLE-COLUMN OUTPUT
  ======================================================= */

  private parseSingleColumnOutput(
    stdout: string,
  ): string[] {
    if (
      !stdout.trim()
    ) {
      return [];
    }

    return Array.from(
      new Set(
        stdout
          .split(
            /\r?\n/,
          )
          .map(
            (line) =>
              line.trim(),
          )
          .filter(
            (line) => {
              if (
                !line
              ) {
                return false;
              }

              if (
                /^\(\d+\s+rows?\s+affected\)$/i.test(
                  line,
                )
              ) {
                return false;
              }

              if (
                /^changed database context/i.test(
                  line,
                )
              ) {
                return false;
              }

              return true;
            },
          ),
      ),
    );
  }

  /* =======================================================
     PASSWORD GENERATOR

     SQL Server password complexity:

     uppercase
     lowercase
     number
     special character
  ======================================================= */

  private generatePassword(): string {
    const random =
      randomBytes(
        24,
      ).toString(
        'hex',
      );

    return `Elab@A1${random}`;
  }

  /* =======================================================
     SESSION ID SANITIZER
  ======================================================= */

  private sanitizeSessionId(
    sessionId: string,
  ): string {
    const clean =
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
      clean
    ) {
      return clean;
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