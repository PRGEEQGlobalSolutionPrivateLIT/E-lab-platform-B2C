'use client';

import { apiFetch } from '@/features/auth/apiFetch';
import {

  useCallback,

  useEffect,

  useState,

} from 'react';

import {

  useRouter,

} from 'next/navigation';

import {

  ArrowLeft,

  BookOpen,

  CheckCircle2,

  Database,

  Loader2,

  Play,

  Send,

  Table2,

  XCircle,

} from 'lucide-react';

import CodeEditor from '@/components/editor/CodeEditor';

import type {

  PracticeProblem,

} from '@/features/problem-engine';

import {

  markProblemSolved,

} from '@/features/progress/local-progress';

import styles from './DatabaseWorkspace.module.css';

const API_URL =

  process.env.NEXT_PUBLIC_API_URL ??

  'http://127.0.0.1:4000/api/v1';

export type DatabaseWorkspaceSource =

  | 'practice'

  | 'stack'

  | 'challenge';

type DatabaseWorkspaceProps = {

  problem: PracticeProblem;

  source: DatabaseWorkspaceSource;

};

type DatabaseSession = {

  id: string;

  problemSlug: string;

  technologySlug: string;

  mode:

    | 'temporary'

    | 'persistent';

  status:

    | 'creating'

    | 'ready'

    | 'closed'

    | 'failed';

  database?: string;

  createdAt: string;

  lastActivityAt: string;

};

type CreateSessionResponse = {

  success: boolean;

  session: DatabaseSession;

};

type ExecuteQueryResponse = {

  success: boolean;

  sessionId: string;

  technologySlug: string;

  database: string;

  stdout: string;

  stderr: string;

  exitCode: number;

};

type DatabaseSchemaResponse = {

  success: boolean;

  sessionId: string;

  database: string;

  tables: string[];

  views: string[];

  indexes: string[];

};

type ValidationTestResult = {

  name: string;

  passed: boolean;

  message?: string;

};

type SubmitSolutionResponse = {

  success: boolean;

  accepted: boolean;

  sessionId: string;

  problemSlug?: string;

  passedTests: number;

  totalTests: number;

  score?: number;

  message?: string;

  tests?: ValidationTestResult[];

};

type DatabaseTable = {

  name: string;

};

type ExtendedPracticeProblem =

  PracticeProblem & {

    problemStatement?: string;

    shortDescription?: string;

    description?: string;

    instructions?: string;

    outputFormat?: string;

    skills?: string[];

    requirements?: string[];

    examples?: Array<

      | string

      | {

          title?: string;

          input?: string;

          output?: string;

          expectedOutput?: string;

          description?: string;

        }

    >;

    expectedOutput?: string;

  };

function cleanProblemText(value?: string): string {
  if (!value) return '';

  return value
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .trim();
}

export default function DatabaseWorkspace({

  problem,

  source,

}: DatabaseWorkspaceProps) {

  const router =

    useRouter();

  const databaseProblem =

    problem as ExtendedPracticeProblem;

  const isPracticeSource =

    source === 'practice';

  const normalizedTechnologySlug =

    problem.technologySlug

      ?.trim()

      .toLowerCase() ??

    '';

  const isMysql =

    normalizedTechnologySlug === 'mysql';

  const isSqlServer =

    normalizedTechnologySlug === 'sqlserver' ||

    normalizedTechnologySlug === 'sql-server' ||

    normalizedTechnologySlug === 'mssql';

  const isMongoDb =

    normalizedTechnologySlug === 'mongodb' ||

    normalizedTechnologySlug === 'mongo' ||

    normalizedTechnologySlug === 'mongo-db';

  const isRedis =

    normalizedTechnologySlug === 'redis' ||

    normalizedTechnologySlug === 'redis-cli';

  const databaseTechnologySlug = isMysql

    ? 'mysql'

    : isSqlServer

      ? 'sqlserver'

      : isMongoDb

        ? 'mongodb'

        : isRedis

          ? 'redis'

          : 'postgresql';

  const databaseEngineName = isMysql

    ? 'MySQL'

    : isSqlServer

      ? 'SQL Server'

      : isMongoDb

        ? 'MongoDB'

        : isRedis

          ? 'Redis'

          : 'PostgreSQL';

  const editorLanguage = isMongoDb

    ? 'javascript'

    : isRedis

      ? 'plaintext'

      : 'sql';

  const editorTitle = isMongoDb

    ? 'MongoDB Editor'

    : isRedis

      ? 'Redis CLI'

      : 'SQL Editor';

  const runButtonLabel = isMongoDb || isRedis ? 'Run' : 'Run Query';

  const databaseObjectLabel = isMongoDb

    ? 'Collections'

    : isRedis

      ? 'Keys'

      : 'Tables';

  const emptyDatabaseObjectLabel = isMongoDb

    ? 'No collections created'

    : isRedis

      ? 'No keys created'

      : 'No tables created';

  const commandNoun = isMongoDb

    ? 'MongoDB command'

    : isRedis

      ? 'Redis command'

      : 'SQL query';

  const handleBack =

    () => {

      router.back();

    };

  const [

    sql,

    setSql,

  ] = useState(

    problem.starterCode ?? '',

  );

  const [

    output,

    setOutput,

  ] = useState(

    `Preparing ${databaseEngineName} sandbox...`,

  );

  const [

    tables,

    setTables,

  ] = useState<

    DatabaseTable[]

  >([]);

  const [

    views,

    setViews,

  ] = useState<

    string[]

  >([]);

  const [

    indexes,

    setIndexes,

  ] = useState<

    string[]

  >([]);

  const [

    sessionId,

    setSessionId,

  ] = useState<

    string | null

  >(

    null,

  );

  const [

    databaseName,

    setDatabaseName,

  ] = useState(

    'learner_db',

  );

  const [

    isSessionReady,

    setIsSessionReady,

  ] = useState(

    false,

  );

  const [

    isCreatingSession,

    setIsCreatingSession,

  ] = useState(

    true,

  );

  const [

    sessionError,

    setSessionError,

  ] = useState<

    string | null

  >(

    null,

  );

  const [

    isRunning,

    setIsRunning,

  ] = useState(

    false,

  );

  const [

    isSubmitting,

    setIsSubmitting,

  ] = useState(

    false,

  );

  const [

    submissionResult,

    setSubmissionResult,

  ] = useState<

    SubmitSolutionResponse | null

  >(

    null,

  );

  const readErrorMessage =

    async (

      response: Response,

    ): Promise<string> => {

      try {

        const data =

          await response.json();

        if (

          typeof data?.message ===

          'string'

        ) {

          return data.message;

        }

        if (

          Array.isArray(

            data?.message,

          )

        ) {

          return data.message.join(

            '\n',

          );

        }

        return JSON.stringify(

          data,

        );

      } catch {

        return (

          response.statusText ||

          `Request failed with status ${response.status}.`

        );

      }

    };

  const refreshSchema =

    useCallback(

      async (

        activeSessionId: string,

      ) => {

        const response =

          await apiFetch(

            `${API_URL}/database-lab/sessions/${activeSessionId}/schema`,

            {

              method:

                'GET',

              cache:

                'no-store',

            },

          );

        if (

          !response.ok

        ) {

          throw new Error(

            await readErrorMessage(

              response,

            ),

          );

        }

        const data =

          await response.json() as

            DatabaseSchemaResponse;

        setDatabaseName(

          data.database ??

            'learner_db',

        );

        setTables(

          (

            data.tables ??

            []

          ).map(

            (

              name,

            ) => ({

              name,

            }),

          ),

        );

        setViews(

          data.views ??

            [],

        );

        setIndexes(

          data.indexes ??

            [],

        );

      },

      [],

    );

  useEffect(

    () => {

      let cancelled =

        false;

      const createSession =

        async () => {

          setIsCreatingSession(

            true,

          );

          setIsSessionReady(

            false,

          );

          setSessionError(

            null,

          );

          setSessionId(

            null,

          );

          setSubmissionResult(

            null,

          );

          setTables(

            [],

          );

          setViews(

            [],

          );

          setIndexes(

            [],

          );

          setSql(

            problem.starterCode ??

              '',

          );

          setOutput(

            `Starting isolated ${databaseEngineName} sandbox...`,

          );

          try {

            const response =

              await apiFetch(

                `${API_URL}/database-lab/sessions`,

                {

                  method:

                    'POST',

                  headers: {

                    'Content-Type':

                      'application/json',

                  },

                  body:

                    JSON.stringify({

                      problemSlug:

                        problem.slug,

                      technologySlug:

                        databaseTechnologySlug,

                      mode:

                        'temporary',

                    }),

                },

              );

            if (

              !response.ok

            ) {

              throw new Error(

                await readErrorMessage(

                  response,

                ),

              );

            }

            const data =

              await response.json() as

                CreateSessionResponse;

            if (

              !data.success ||

              !data.session?.id

            ) {

              throw new Error(

                'Database session was not created.',

              );

            }

            if (

              cancelled

            ) {

              void apiFetch(

                `${API_URL}/database-lab/sessions/${data.session.id}`,

                {

                  method:

                    'DELETE',

                  keepalive:

                    true,

                },

              ).catch(

                () => {

                },

              );

              return;

            }

            setSessionId(

              data.session.id,

            );

            setDatabaseName(

              data.session.database ??

                'learner_db',

            );

            setIsSessionReady(

              true,

            );

            setOutput(

              [

                `${databaseEngineName} Sandbox Ready`,

                '',

                `Database: ${

                  data.session.database ??

                  'learner_db'

                }`,

                '',

                isRedis ? 'Enter a Redis command and click Run.' : isMongoDb ? 'Enter a MongoDB command and click Run.' : 'Enter a SQL query and click Run Query.',

              ].join(

                '\n',

              ),

            );

            try {

              await refreshSchema(

                data.session.id,

              );

            } catch {

            }

          } catch (

            error

          ) {

            if (

              cancelled

            ) {

              return;

            }

            const message =

              error instanceof Error

                ? error.message

                : `Unable to start ${databaseEngineName} sandbox.`;

            setSessionError(

              message,

            );

            setOutput(

              [

                `Unable to start ${databaseEngineName} sandbox.`,

                '',

                message,

                '',

                'Make sure the API and Docker services are running.',

              ].join(

                '\n',

              ),

            );

          } finally {

            if (

              !cancelled

            ) {

              setIsCreatingSession(

                false,

              );

            }

          }

        };

      void createSession();

      return () => {

        cancelled =

          true;

      };

    },

    [

      problem.slug,

      problem.starterCode,

      problem.technologySlug,

      refreshSchema,

    ],

  );

  useEffect(

    () => {

      if (

        !sessionId ||

        !isSessionReady

      ) {

        return;

      }

      const sendHeartbeat =

        async () => {

          try {

            const response =

              await apiFetch(

                `${API_URL}/database-lab/sessions/${sessionId}`,

                {

                  method:

                    'GET',

                  cache:

                    'no-store',

                },

              );

            if (

              response.status ===

              404

            ) {

              setIsSessionReady(

                false,

              );

              setSessionError(

                'The database session has expired.',

              );

              setOutput(

                [

                  `${databaseEngineName} session expired.`,

                  '',

                  'Reload the workspace to start a new temporary database.',

                ].join(

                  '\n',

                ),

              );

            }

          } catch {

          }

        };

      const interval =

        window.setInterval(

          () => {

            void sendHeartbeat();

          },

          30_000,

        );

      return () => {

        window.clearInterval(

          interval,

        );

      };

    },

    [

      sessionId,

      isSessionReady,

    ],

  );

  const handleRun =

    async () => {

      if (

        !sql.trim()

      ) {

        setOutput(

          `Please enter a ${commandNoun} before running.`,

        );

        return;

      }

      if (

        !sessionId ||

        !isSessionReady

      ) {

        setOutput(

          sessionError ??

            `${databaseEngineName} sandbox is not ready yet.`,

        );

        return;

      }

      setSubmissionResult(

        null,

      );

      setIsRunning(

        true,

      );

      setOutput(

        isRedis ? 'Running Redis command...' : isMongoDb ? 'Running MongoDB command...' : 'Running query...',

      );

      try {

        const response =

          await apiFetch(

            `${API_URL}/database-lab/sessions/${sessionId}/execute`,

            {

              method:

                'POST',

              headers: {

                'Content-Type':

                  'application/json',

              },

              body:

                JSON.stringify({

                  sql,

                }),

            },

          );

        if (

          !response.ok

        ) {

          throw new Error(

            await readErrorMessage(

              response,

            ),

          );

        }

        const data =

          await response.json() as

            ExecuteQueryResponse;

        if (

          data.success

        ) {

          const resultText =

            data.stdout.trim();

          setOutput(

            resultText ||

              (isRedis

                ? 'Redis command executed successfully.'

                : isMongoDb

                  ? 'MongoDB command executed successfully.'

                  : 'Query executed successfully.'),

          );

          try {

            await refreshSchema(

              sessionId,

            );

          } catch (

            schemaError

          ) {

            console.error(

              'Unable to refresh database schema:',

              schemaError,

            );

          }

        } else {

          setOutput(

            data.stderr.trim() ||

              data.stdout.trim() ||

              `Query failed with exit code ${data.exitCode}.`,

          );

        }

      } catch (

        error

      ) {

        const message =

          error instanceof Error

            ? error.message

            : `Unable to execute ${commandNoun}.`;

        setOutput(

          [

            isRedis ? 'Redis command execution failed.' : isMongoDb ? 'MongoDB command execution failed.' : 'Query execution failed.',

            '',

            message,

          ].join(

            '\n',

          ),

        );

      } finally {

        setIsRunning(

          false,

        );

      }

    };

  const formatSubmissionResult =

    (

      result:

        SubmitSolutionResponse,

    ): string => {

      const lines:

        string[] = [];

      if (

        result.accepted

      ) {

        lines.push(

          '✓ Accepted',

        );

      } else {

        lines.push(

          '✕ Incorrect Solution',

        );

      }

      lines.push(

        '',

      );

      if (

        result.message

      ) {

        lines.push(

          result.message,

          '',

        );

      }

      lines.push(

        `${result.passedTests} / ${result.totalTests} Test Cases Passed`,

      );

      if (

        typeof result.score ===

        'number'

      ) {

        lines.push(

          `Score: ${result.score}%`,

        );

      }

      if (

        result.tests &&

        result.tests.length >

          0

      ) {

        lines.push(

          '',

          'Test Results',

          '',

        );

        result.tests.forEach(

          (

            test,

            index,

          ) => {

            lines.push(

              `${

                test.passed

                  ? '✓'

                  : '✕'

              } Test ${

                index + 1

              }: ${test.name}`,

            );

            if (

              test.message

            ) {

              lines.push(

                `  ${test.message}`,

              );

            }

          },

        );

      }

      return lines.join(

        '\n',

      );

    };

  const handleSubmit =

    async () => {

      if (

        !sql.trim()

      ) {

        setOutput(

          `Please enter a ${commandNoun} before submitting.`,

        );

        return;

      }

      if (

        !sessionId ||

        !isSessionReady

      ) {

        setOutput(

          sessionError ??

            `${databaseEngineName} sandbox is not ready.`,

        );

        return;

      }

      if (

        !isPracticeSource

      ) {

        setIsSubmitting(

          true,

        );

        setOutput(

          [

            `${databaseEngineName} Submission`,

            '',

            isRedis ? 'Your Redis workspace is connected and ready.' : isMongoDb ? 'Your MongoDB workspace is connected and ready.' : 'Your SQL workspace is connected and ready.',

            '',

            'Project/challenge validation will be connected in the assessment step.',

          ].join(

            '\n',

          ),

        );

        setIsSubmitting(

          false,

        );

        return;

      }

      setIsSubmitting(

        true,

      );

      setSubmissionResult(

        null,

      );

      setOutput(

        'Running hidden database tests...',

      );

      try {

        const response =

          await apiFetch(

            `${API_URL}/database-lab/sessions/${sessionId}/submit`,

            {

              method:

                'POST',

              headers: {

                'Content-Type':

                  'application/json',

              },

              body:

                JSON.stringify({

                  sql,

                  problemSlug:

                    problem.slug,

                }),

            },

          );

        if (

          !response.ok

        ) {

          throw new Error(

            await readErrorMessage(

              response,

            ),

          );

        }

        const data =

          await response.json() as

            SubmitSolutionResponse;

        setSubmissionResult(

          data,

        );

        if (

          data.accepted ===

          true

        ) {

          markProblemSolved(

            problem.slug,

          );

        }

        setOutput(

          formatSubmissionResult(

            data,

          ),

        );

        try {

          await refreshSchema(

            sessionId,

          );

        } catch (

          schemaError

        ) {

          console.error(

            'Unable to refresh schema after submission:',

            schemaError,

          );

        }

      } catch (

        error

      ) {

        const message =

          error instanceof Error

            ? error.message

            : `Unable to validate ${databaseEngineName} solution.`;

        setSubmissionResult(

          null,

        );

        setOutput(

          [

            'Submission failed.',

            '',

            message,

            '',

            isRedis ? 'Your Redis solution has not been marked as accepted.' : isMongoDb ? 'Your MongoDB solution has not been marked as accepted.' : 'Your SQL has not been marked as accepted.',

          ].join(

            '\n',

          ),

        );

      } finally {

        setIsSubmitting(

          false,

        );

      }

    };

  const statusClassName =

    isCreatingSession

      ? `${styles.status} ${styles.statusLoading}`

      : isSessionReady

        ? `${styles.status} ${styles.statusReady}`

        : `${styles.status} ${styles.statusError}`;

  const practiceDescription =

    cleanProblemText(

      databaseProblem.problemStatement ??

        databaseProblem.shortDescription ??

        databaseProblem.description ??

        databaseProblem.instructions ??

        '',

    );

  const practiceRequirements =

    databaseProblem.requirements ??

    [];

  const practiceSkills =

    databaseProblem.skills ??

    [];

  const practiceOutput =

    databaseProblem.outputFormat ??

    databaseProblem.expectedOutput ??

    '';

  const renderEditorWorkspace =

    () => (

      <section

        className={

          styles.editorWorkspace

        }

      >

        {}

        <div

          className={

            styles.toolbar

          }

        >

          <div

            className={

              styles.toolbarTitle

            }

          >

            <strong>

              {editorTitle}

            </strong>

            <span

              className={

                styles.languageBadge

              }

            >

              {databaseEngineName}

            </span>

          </div>

          <div

            className={

              styles.toolbarActions

            }

          >

            <button

              type="button"

              className={`${styles.actionButton} ${styles.runButton}`}

              onClick={

                handleRun

              }

              disabled={

                isRunning ||

                isSubmitting ||

                isCreatingSession ||

                !isSessionReady

              }

            >

              {isRunning ? (

                <Loader2

                  size={16}

                  className={

                    styles.spinner

                  }

                />

              ) : (

                <Play

                  size={16}

                />

              )}

              <span>

                {isRunning

                  ? 'Running...'

                  : runButtonLabel}

              </span>

            </button>

            <button

              type="button"

              className={`${styles.actionButton} ${styles.submitButton}`}

              onClick={

                handleSubmit

              }

              disabled={

                isRunning ||

                isSubmitting ||

                isCreatingSession ||

                !isSessionReady

              }

            >

              {isSubmitting ? (

                <Loader2

                  size={16}

                  className={

                    styles.spinner

                  }

                />

              ) : (

                <Send

                  size={16}

                />

              )}

              <span>

                {isSubmitting

                  ? 'Submitting...'

                  : 'Submit'}

              </span>

            </button>

          </div>

        </div>

        {}

        <div

          className={

            styles.editorShell

          }

        >

          <CodeEditor

            language={editorLanguage}

            value={sql}

            onChange={(

              value,

            ) => {

              setSql(

                value ?? '',

              );

            }}

            readOnly={false}

          />

        </div>

        {}

        <section

          className={

            styles.results

          }

        >

          <div

            className={

              styles.resultsHeader

            }

          >

            <strong>

              {submissionResult

                ? 'Submission Results'

                : isMongoDb || isRedis ? 'Command Results' : 'Query Results'}

            </strong>

            {submissionResult ? (

              <span>

                {submissionResult.accepted

                  ? 'Accepted'

                  : 'Not Accepted'}

              </span>

            ) : sessionId ? (

              <span

                className={

                  styles.resultsDatabase

                }

              >

                {databaseName}

              </span>

            ) : null}

          </div>

          <pre

            className={

              styles.resultsOutput

            }

          >

            {output}

          </pre>

        </section>

      </section>

    );

  const renderDatabaseExplorer =

    () => (

      <aside

        className={

          styles.explorer

        }

      >

        <div

          className={

            styles.explorerHeader

          }

        >

          <Database

            size={18}

          />

          <strong>

            Database Explorer

          </strong>

        </div>

        <div

          className={

            styles.explorerBody

          }

        >

          <p

            className={

              styles.databaseName

            }

            title={

              databaseName

            }

          >

            {databaseName}

          </p>

          {}

          <div

            className={

              styles.explorerGroup

            }

          >

            <div

              className={

                styles.explorerGroupHeader

              }

            >

              <Table2

                size={16}

              />

              <span>

                {databaseObjectLabel}

              </span>

            </div>

            {tables.length ===

            0 ? (

              <p

                className={

                  styles.emptyItem

                }

              >

                {emptyDatabaseObjectLabel}

              </p>

            ) : (

              tables.map(

                (

                  table,

                ) => (

                  <button

                    key={

                      table.name

                    }

                    type="button"

                    className={

                      styles.schemaItem

                    }

                    title={

                      table.name

                    }

                  >

                    {table.name}

                  </button>

                ),

              )

            )}

          </div>

          {}

          <div

            className={

              styles.explorerGroup

            }

          >

            <div

              className={

                styles.explorerGroupHeader

              }

            >

              <span>

                Views

              </span>

            </div>

            {views.length ===

            0 ? (

              <p

                className={

                  styles.emptyItem

                }

              >

                No views created

              </p>

            ) : (

              views.map(

                (

                  view,

                ) => (

                  <button

                    key={

                      view

                    }

                    type="button"

                    className={

                      styles.schemaItem

                    }

                    title={

                      view

                    }

                  >

                    {view}

                  </button>

                ),

              )

            )}

          </div>

          {}

          <div

            className={

              styles.explorerGroup

            }

          >

            <div

              className={

                styles.explorerGroupHeader

              }

            >

              <span>

                Indexes

              </span>

            </div>

            {indexes.length ===

            0 ? (

              <p

                className={

                  styles.emptyItem

                }

              >

                No indexes created

              </p>

            ) : (

              indexes.map(

                (

                  index,

                ) => (

                  <button

                    key={

                      index

                    }

                    type="button"

                    className={

                      styles.schemaItem

                    }

                    title={

                      index

                    }

                  >

                    {index}

                  </button>

                ),

              )

            )}

          </div>

        </div>

      </aside>

    );

  return (

    <main

      className={

        styles.page

      }

    >

      {}

      <header

        className={

          styles.header

        }

      >

        <div

          className={

            styles.headerLeft

          }

        >

          <button

            type="button"

            className={

              styles.backButton

            }

            onClick={

              handleBack

            }

            aria-label="Go back"

            title="Go back"

          >

            <ArrowLeft

              size={18}

            />

            <span>

              Back

            </span>

          </button>

          <div

            className={

              styles.databaseIcon

            }

          >

            <Database

              size={22}

            />

          </div>

          <div

            className={

              styles.headerText

            }

          >

            <div

              className={

                styles.technologyLine

              }

            >

              <span

                className={

                  styles.technologyName

                }

              >

                {isRedis ? 'Redis' : databaseEngineName}

              </span>

              <span

                className={

                  styles.separator

                }

              >

                •

              </span>

              <span

                className={

                  styles.difficulty

                }

              >

                {problem.difficulty}

              </span>

              {isPracticeSource && (

                <>

                  <span

                    className={

                      styles.separator

                    }

                  >

                    •

                  </span>

                  <span>

                    Practice

                  </span>

                </>

              )}

            </div>

            <h1

              className={

                styles.problemTitle

              }

            >

              {problem.title}

            </h1>

          </div>

        </div>

        <div

          className={

            statusClassName

          }

        >

          {isCreatingSession ? (

            <>

              <Loader2

                size={15}

                className={

                  styles.spinner

                }

              />

              <span>

                Starting sandbox...

              </span>

            </>

          ) : isSessionReady ? (

            <>

              <CheckCircle2

                size={15}

              />

              <span>

                Sandbox ready

              </span>

            </>

          ) : (

            <>

              <XCircle

                size={15}

              />

              <span>

                Sandbox unavailable

              </span>

            </>

          )}

        </div>

      </header>

      {}

      {isPracticeSource ? (

        <div

          className={

            styles.practiceWorkspace

          }

        >

          {}

          <aside

            className={

              styles.problemPanel

            }

          >

            <div

              className={

                styles.problemPanelHeader

              }

            >

              <div

                className={

                  styles.problemPanelHeading

                }

              >

                <BookOpen

                  size={18}

                />

                <strong>

                  Problem

                </strong>

              </div>

              <span

                className={

                  styles.problemDifficulty

                }

              >

                {problem.difficulty}

              </span>

            </div>

            <div

              className={

                styles.problemContent

              }

            >

              <h2

                className={

                  styles.practiceTitle

                }

              >

                {problem.title}

              </h2>

              {practiceDescription && (

                <div

                  className={

                    styles.problemDescription

                  }

                >

                  {practiceDescription}

                </div>

              )}

              {}

              {practiceRequirements.length >

                0 && (

                <section

                  className={

                    styles.problemSection

                  }

                >

                  <h3>

                    Requirements

                  </h3>

                  <div

                    className={

                      styles.requirementsList

                    }

                  >

                    {practiceRequirements.map(

                      (

                        requirement,

                        index,

                      ) => (

                        <div

                          key={`${requirement}-${index}`}

                          className={

                            styles.requirementItem

                          }

                        >

                          <CheckCircle2

                            size={14}

                          />

                          <span>

                            {requirement}

                          </span>

                        </div>

                      ),

                    )}

                  </div>

                </section>

              )}

              {}

              {practiceOutput && (

                <section

                  className={

                    styles.problemSection

                  }

                >

                  <h3>

                    Output Format

                  </h3>

                  <div

                    className={

                      styles.outputFormat

                    }

                  >

                    {practiceOutput}

                  </div>

                </section>

              )}

              {}

              {practiceSkills.length >

                0 && (

                <section

                  className={

                    styles.problemSection

                  }

                >

                  <h3>

                    Skills

                  </h3>

                  <div

                    className={

                      styles.skillsList

                    }

                  >

                    {practiceSkills.map(

                      (

                        skill,

                      ) => (

                        <span

                          key={

                            skill

                          }

                          className={

                            styles.skillBadge

                          }

                        >

                          {skill}

                        </span>

                      ),

                    )}

                  </div>

                </section>

              )}

              {}

              <section

                className={

                  styles.problemSection

                }

              >

                <h3>

                  Database

                </h3>

                <div

                  className={

                    styles.practiceDatabase

                  }

                >

                  <div

                    className={

                      styles.practiceDatabaseName

                    }

                  >

                    <Database

                      size={15}

                    />

                    <strong>

                      {databaseName}

                    </strong>

                  </div>

                  {}

                  <div

                    className={

                      styles.practiceSchemaSection

                    }

                  >

                    <div

                      className={

                        styles.practiceSchemaHeading

                      }

                    >

                      <Table2

                        size={14}

                      />

                      <span>

                        {databaseObjectLabel}

                      </span>

                    </div>

                    {tables.length ===

                    0 ? (

                      <span

                        className={

                          styles.practiceEmptySchema

                        }

                      >

                        {emptyDatabaseObjectLabel}

                      </span>

                    ) : (

                      <div

                        className={

                          styles.practiceSchemaItems

                        }

                      >

                        {tables.map(

                          (

                            table,

                          ) => (

                            <span

                              key={

                                table.name

                              }

                              className={

                                styles.practiceSchemaBadge

                              }

                            >

                              {table.name}

                            </span>

                          ),

                        )}

                      </div>

                    )}

                  </div>

                  {}

                  {views.length >

                    0 && (

                    <div

                      className={

                        styles.practiceSchemaSection

                      }

                    >

                      <div

                        className={

                          styles.practiceSchemaHeading

                        }

                      >

                        Views

                      </div>

                      <div

                        className={

                          styles.practiceSchemaItems

                        }

                      >

                        {views.map(

                          (

                            view,

                          ) => (

                            <span

                              key={

                                view

                              }

                              className={

                                styles.practiceSchemaBadge

                              }

                            >

                              {view}

                            </span>

                          ),

                        )}

                      </div>

                    </div>

                  )}

                  {}

                  {indexes.length >

                    0 && (

                    <div

                      className={

                        styles.practiceSchemaSection

                      }

                    >

                      <div

                        className={

                          styles.practiceSchemaHeading

                        }

                      >

                        Indexes

                      </div>

                      <div

                        className={

                          styles.practiceSchemaItems

                        }

                      >

                        {indexes.map(

                          (

                            index,

                          ) => (

                            <span

                              key={

                                index

                              }

                              className={

                                styles.practiceSchemaBadge

                              }

                            >

                              {index}

                            </span>

                          ),

                        )}

                      </div>

                    </div>

                  )}

                </div>

              </section>

            </div>

          </aside>

          {}

          {renderEditorWorkspace()}

        </div>

      ) : (

        <div

          className={

            styles.workspace

          }

        >

          {renderDatabaseExplorer()}

          {renderEditorWorkspace()}

        </div>

      )}

    </main>

  );

}
