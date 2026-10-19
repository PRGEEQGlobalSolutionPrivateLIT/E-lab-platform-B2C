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
  getMongoDbFixtureScript,
} from './mongodb-fixtures.js';

/* =========================================================
   MONGODB SANDBOX TYPES
========================================================= */

export type MongoDbSandbox = {
  sessionId: string;

  containerName: string;

  database: string;

  problemSlug: string;
};

export type MongoDbQueryResult = {
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
   MONGODB SANDBOX SERVICE

   Architecture:

   NestJS API
        ↓
   MongoDbSandboxService
        ↓
   Docker
        ↓
   mongo:8
        ↓
   learner_db
========================================================= */

@Injectable()
export class MongoDbSandboxService {
  private readonly logger =
    new Logger(
      MongoDbSandboxService.name,
    );

  /* =======================================================
     MONGODB CONFIGURATION
  ======================================================= */

  private readonly image =
    process.env.MONGODB_SANDBOX_IMAGE ??
    'mongo:8';

  private readonly database =
    'learner_db';

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
  ): Promise<MongoDbSandbox> {
    const cleanSessionId =
      this.sanitizeSessionId(
        sessionId,
      );

    const containerName =
      `elab-mongodb-${cleanSessionId}`;

    /*
     * Remove any stale container left behind
     * from a previous failed session.
     */

    await this.removeContainerIfExists(
      containerName,
    );

    this.logger.log(
      `Creating MongoDB sandbox "${containerName}" for problem "${problemSlug}".`,
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
           * inside the learner container.
           */

          '--pids-limit',
          '128',

          /*
           * Do not expose MongoDB to the host.
           *
           * The NestJS API communicates with MongoDB
           * through docker exec.
           */

          this.image,
        ]);

      if (
        createResult.exitCode !==
        0
      ) {
        throw new Error(
          createResult.stderr ||
            createResult.stdout ||
            'Unable to create MongoDB Docker sandbox.',
        );
      }

      await this.waitUntilReady(
        containerName,
      );

      const sandbox:
        MongoDbSandbox = {
          sessionId,

          containerName,

          database:
            this.database,

          problemSlug,
        };

      /*
       * Apply internal fixture data.
       */

      const fixtureScript =
        getMongoDbFixtureScript(
          problemSlug,
        );

      if (
        fixtureScript.trim()
      ) {
        const fixtureResult =
          await this.executeScript(
            sandbox,

            fixtureScript,
          );

        if (
          fixtureResult.exitCode !==
          0
        ) {
          throw new Error(
            fixtureResult.stderr ||
              fixtureResult.stdout ||
              'Unable to apply MongoDB practice fixture.',
          );
        }
      }

      this.logger.log(
        `MongoDB sandbox "${containerName}" is ready.`,
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
     EXECUTE LEARNER SCRIPT

     MongoDB commands are passed through stdin to mongosh.

     This avoids placing learner code directly in shell
     command arguments.
  ======================================================= */

  async executeScript(
    sandbox: MongoDbSandbox,

    script: string,
  ): Promise<MongoDbQueryResult> {
    const cleanScript =
      script.trim();

    if (
      !cleanScript
    ) {
      return {
        stdout:
          '',

        stderr:
          'MongoDB command is empty.',

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

          'mongosh',

          '--quiet',

          sandbox.database,
        ],

        cleanScript,
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
     EXECUTE SCRIPT AGAINST A SPECIFIC DATABASE

     Useful for database-level exercises and validators.
  ======================================================= */

  async executeScriptInDatabase(
    sandbox: MongoDbSandbox,

    database: string,

    script: string,
  ): Promise<MongoDbQueryResult> {
    const cleanDatabase =
      this.sanitizeDatabaseName(
        database,
      );

    const cleanScript =
      script.trim();

    if (
      !cleanScript
    ) {
      return {
        stdout:
          '',

        stderr:
          'MongoDB command is empty.',

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

          'mongosh',

          '--quiet',

          cleanDatabase,
        ],

        cleanScript,
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
     GET DATABASES
  ======================================================= */

  async getDatabases(
    sandbox: MongoDbSandbox,
  ): Promise<string[]> {
    const result =
      await this.executeMetadataScript(
        sandbox,

        `
const databases =
  db.adminCommand({
    listDatabases: 1
  }).databases
    .map(
      (database) =>
        database.name
    )
    .sort();

print(
  JSON.stringify(
    databases
  )
);
        `.trim(),
      );

    if (
      result.exitCode !==
      0
    ) {
      this.logger.warn(
        `Unable to read MongoDB databases for "${sandbox.containerName}": ${result.stderr}`,
      );

      return [];
    }

    return this.parseStringArray(
      result.stdout,
    );
  }

  /* =======================================================
     GET COLLECTIONS
  ======================================================= */

  async getCollections(
    sandbox: MongoDbSandbox,
  ): Promise<string[]> {
    const result =
      await this.executeMetadataScript(
        sandbox,

        `
const collections =
  db.getCollectionNames()
    .sort();

print(
  JSON.stringify(
    collections
  )
);
        `.trim(),
      );

    if (
      result.exitCode !==
      0
    ) {
      this.logger.warn(
        `Unable to read MongoDB collections for "${sandbox.containerName}": ${result.stderr}`,
      );

      return [];
    }

    return this.parseStringArray(
      result.stdout,
    );
  }

  /* =======================================================
     GET INDEXES

     Returns index names from all non-system collections.
  ======================================================= */

  async getIndexes(
    sandbox: MongoDbSandbox,
  ): Promise<string[]> {
    const result =
      await this.executeMetadataScript(
        sandbox,

        `
const names = [];

for (
  const collectionName
  of db.getCollectionNames()
) {
  const indexes =
    db
      .getCollection(
        collectionName
      )
      .getIndexes();

  for (
    const index
    of indexes
  ) {
    if (
      index.name !== '_id_'
    ) {
      names.push(
        index.name
      );
    }
  }
}

names.sort();

print(
  JSON.stringify(
    names
  )
);
        `.trim(),
      );

    if (
      result.exitCode !==
      0
    ) {
      this.logger.warn(
        `Unable to read MongoDB indexes for "${sandbox.containerName}": ${result.stderr}`,
      );

      return [];
    }

    return this.parseStringArray(
      result.stdout,
    );
  }

  /* =======================================================
     GET DOCUMENTS

     Used by validators and potentially the schema explorer.
  ======================================================= */

  async getDocuments(
    sandbox: MongoDbSandbox,

    collectionName: string,
  ): Promise<unknown[]> {
    const cleanCollection =
      this.sanitizeCollectionName(
        collectionName,
      );

    const result =
      await this.executeMetadataScript(
        sandbox,

        `
const documents =
  db
    .getCollection(
      ${JSON.stringify(
        cleanCollection,
      )}
    )
    .find({})
    .toArray();

print(
  EJSON.stringify(
    documents
  )
);
        `.trim(),
      );

    if (
      result.exitCode !==
      0
    ) {
      this.logger.warn(
        `Unable to read MongoDB documents from "${cleanCollection}": ${result.stderr}`,
      );

      return [];
    }

    try {
      const parsed =
        JSON.parse(
          result.stdout,
        );

      return Array.isArray(
        parsed,
      )
        ? parsed
        : [];
    } catch {
      return [];
    }
  }

  /* =======================================================
     DESTROY SANDBOX
  ======================================================= */

  async destroySandbox(
    sandbox:
      | MongoDbSandbox
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
     EXECUTE METADATA SCRIPT

     Internal metadata scripts run against learner_db.
  ======================================================= */

  private async executeMetadataScript(
    sandbox: MongoDbSandbox,

    script: string,
  ): Promise<MongoDbQueryResult> {
    const result =
      await this.runDocker(
        [
          'exec',

          '-i',

          sandbox.containerName,

          'mongosh',

          '--quiet',

          sandbox.database,
        ],

        script,
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
     WAIT FOR MONGODB

     MongoDB requires a short initialization period after
     the Docker container starts.

     db.adminCommand({ ping: 1 }) confirms that mongod is
     accepting connections.
  ======================================================= */

  private async waitUntilReady(
    containerName: string,
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
        const result =
          await this.runDocker([
            'exec',

            containerName,

            'mongosh',

            '--quiet',

            '--eval',

            'const result = db.adminCommand({ ping: 1 }); print(result.ok);',
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
          result.stderr ||
          result.stdout;
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
        ? ` Last MongoDB response: ${lastError}`
        : '';

    throw new Error(
      `MongoDB sandbox "${containerName}" did not become ready within ${this.startupTimeoutMs}ms.${details}`,
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
       * Safe to ignore here.
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
         * Pass MongoDB learner commands through stdin.
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
     PARSE STRING ARRAY
  ======================================================= */

  private parseStringArray(
    stdout: string,
  ): string[] {
    if (
      !stdout.trim()
    ) {
      return [];
    }

    try {
      const parsed =
        JSON.parse(
          stdout,
        );

      if (
        !Array.isArray(
          parsed,
        )
      ) {
        return [];
      }

      return parsed
        .filter(
          (
            value,
          ): value is string =>
            typeof value ===
            'string',
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
    } catch {
      return [];
    }
  }

  /* =======================================================
     SANITIZE DATABASE NAME
  ======================================================= */

  private sanitizeDatabaseName(
    database: string,
  ): string {
    const cleanDatabase =
      database
        .trim()
        .replace(
          /[^a-zA-Z0-9_-]/g,
          '',
        );

    if (
      !cleanDatabase
    ) {
      throw new Error(
        'Invalid MongoDB database name.',
      );
    }

    return cleanDatabase;
  }

  /* =======================================================
     SANITIZE COLLECTION NAME
  ======================================================= */

  private sanitizeCollectionName(
    collectionName: string,
  ): string {
    const cleanCollection =
      collectionName
        .trim()
        .replace(
          /[^a-zA-Z0-9_.-]/g,
          '',
        );

    if (
      !cleanCollection
    ) {
      throw new Error(
        'Invalid MongoDB collection name.',
      );
    }

    return cleanCollection;
  }

  /* =======================================================
     SANITIZE SESSION ID
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