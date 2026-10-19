'use client';

import {
  ArrowLeft,
  BookOpen,
  Braces,
  Code2,
  Layers3,
  LogOut,
  Trophy,
  UserRound,
} from 'lucide-react';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  useParams,
  useRouter,
} from 'next/navigation';

import {
  getProblemsBySlugs,
} from '@/features/problem-engine';

import {
  getPracticePathByTechnology,
  type PracticeLevel,
} from '@/features/practice-path-engine';

import {
  getSolvedProblemSlugs,
} from '@/features/progress/local-progress';

import ProblemList from '@/components/problems/ProblemList';

import styles from './practice.module.css';

/* =========================================================
   FILTER TYPE
========================================================= */

type LevelFilter =
  | 'All'
  | PracticeLevel;

/* =========================================================
   NORMALIZE ROUTE TECHNOLOGY SLUG
========================================================= */

function normalizeTechnologySlug(
  technologySlug: string,
) {
  const slug =
    technologySlug
      .trim()
      .toLowerCase();

  const aliases:
    Record<string, string> = {
      /* Programming languages */

      c:
        'c',

      cpp:
        'cpp',

      'c++':
        'cpp',

      javascript:
        'javascript',

      js:
        'javascript',

      typescript:
        'typescript',

      ts:
        'typescript',

      python:
        'python',

      py:
        'python',

      java:
        'java',

      csharp:
        'csharp',

      'c-sharp':
        'csharp',

      'c#':
        'csharp',

      cs:
        'csharp',

      php:
        'php',

      php8:
        'php',

      'php-8':
        'php',

      'php8.3':
        'php',

      /* Databases */

      postgresql:
        'postgresql',

      postgres:
        'postgresql',

      pg:
        'postgresql',

      pgsql:
        'postgresql',

      'postgre-sql':
        'postgresql',

      'postgresql-db':
        'postgresql',

      /* Frontend */

      react:
        'react',

      reactjs:
        'react',

      'react-js':
        'react',

      angular:
        'angular',

      angularjs:
        'angular',

      'html-css':
        'html-css',

      htmlcss:
        'html-css',

      /* Backend */

      node:
        'nodejs',

      nodejs:
        'nodejs',

      'node-js':
        'nodejs',

      express:
        'expressjs',

      expressjs:
        'expressjs',

      'express-js':
        'expressjs',

      nextjs:
        'nextjs',

      'next-js':
        'nextjs',

      nestjs:
        'nestjs',

      'nest-js':
        'nestjs',

      springboot:
        'springboot',

      'spring-boot':
        'springboot',

      aspnetcore:
        'aspnetcore',

      'aspnet-core':
        'aspnetcore',

      'asp.net-core':
        'aspnetcore',

      'asp.netcore':
        'aspnetcore',

      'asp.net core':
        'aspnetcore',

      'dotnet:aspnet-core':
        'aspnetcore',

      'dotnet:aspnetcore':
        'aspnetcore',

      'dotnet/aspnet-core':
        'aspnetcore',

      'dotnet/aspnetcore':
        'aspnetcore',
    };

  return (
    aliases[slug] ??
    slug
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function TechnologyPracticePage() {
  const router =
    useRouter();

  const params =
    useParams<{
      technologySlug:
        string;
    }>();

  /* =======================================================
     ROUTE TECHNOLOGY
  ======================================================= */

  const rawTechnologySlug =
    params.technologySlug;

  const technologySlug =
    useMemo(
      () =>
        normalizeTechnologySlug(
          rawTechnologySlug,
        ),
      [
        rawTechnologySlug,
      ],
    );

  /* =======================================================
     PRACTICE PATH
  ======================================================= */

  const practicePath =
    useMemo(
      () =>
        getPracticePathByTechnology(
          technologySlug,
        ),
      [
        technologySlug,
      ],
    );

  /* =======================================================
     FILTER
  ======================================================= */

  const [
    selectedLevel,
    setSelectedLevel,
  ] =
    useState<LevelFilter>(
      'All',
    );

  /* =======================================================
     SOLVED PROBLEM STATE
  ======================================================= */

  const [
    solvedProblemSlugs,
    setSolvedProblemSlugs,
  ] =
    useState<string[]>(
      [],
    );

  /* =======================================================
     AUTH
  ======================================================= */

  useEffect(
    () => {
      const authenticated =
        localStorage.getItem(
          'elab_dummy_auth',
        ) === 'true';

      if (
        !authenticated
      ) {
        router.replace(
          '/login',
        );
      }
    },
    [
      router,
    ],
  );

  /* =======================================================
     RESET FILTER WHEN TECHNOLOGY CHANGES
  ======================================================= */

  useEffect(
    () => {
      setSelectedLevel(
        'All',
      );
    },
    [
      technologySlug,
    ],
  );

  /* =======================================================
     ALL PROBLEM SLUGS

     Example PostgreSQL:

     postgresql-create-database
     postgresql-create-table
     postgresql-insert-records
     ...
  ======================================================= */

  const pathProblemSlugs =
    useMemo(
      () => {
        if (
          !practicePath
        ) {
          return [];
        }

        return [
          ...practicePath.stages,
        ]
          .sort(
            (
              a,
              b,
            ) =>
              a.order -
              b.order,
          )
          .flatMap(
            (
              stage,
            ) =>
              stage.problemSlugs,
          );
      },
      [
        practicePath,
      ],
    );

  /* =======================================================
     RESOLVE ALL REGISTERED PROBLEMS

     This checks the practice path against the central
     problem registry.
  ======================================================= */

  const registeredProblems =
    useMemo(
      () =>
        getProblemsBySlugs(
          pathProblemSlugs,
        ),
      [
        pathProblemSlugs,
      ],
    );

  /* =======================================================
     REGISTERED PROBLEM LOOKUP

     This allows each stage to obtain its problems without
     repeatedly scanning the entire registry.
  ======================================================= */

  const registeredProblemMap =
    useMemo(
      () =>
        new Map(
          registeredProblems.map(
            (
              problem,
            ) => [
              problem.slug,
              problem,
            ],
          ),
        ),
      [
        registeredProblems,
      ],
    );

  /* =======================================================
     DEBUG MISSING PROBLEM DEFINITIONS

     If a slug exists in practice-paths.ts but is not
     registered in problem-engine/problems.ts, this warning
     tells us exactly which problem is missing.
  ======================================================= */

  useEffect(
    () => {
      if (
        !practicePath
      ) {
        return;
      }

      const missingSlugs =
        pathProblemSlugs.filter(
          (
            slug,
          ) =>
            !registeredProblemMap.has(
              slug,
            ),
        );

      if (
        missingSlugs.length >
        0
      ) {
        console.warn(
          `[Practice] ${technologySlug} has problem slugs that are not registered:`,
          missingSlugs,
        );
      }
    },
    [
      practicePath,
      pathProblemSlugs,
      registeredProblemMap,
      technologySlug,
    ],
  );

  /* =======================================================
     REFRESH PROGRESS
  ======================================================= */

  const refreshProgress =
    useCallback(
      () => {
        const solved =
          getSolvedProblemSlugs();

        setSolvedProblemSlugs(
          solved,
        );
      },
      [],
    );

  /* =======================================================
     INITIAL PROGRESS
  ======================================================= */

  useEffect(
    () => {
      refreshProgress();
    },
    [
      refreshProgress,
      technologySlug,
    ],
  );

  /* =======================================================
     REFRESH PROGRESS WHEN USER RETURNS
  ======================================================= */

  useEffect(
    () => {
      const handleFocus =
        () => {
          refreshProgress();
        };

      const handlePageShow =
        () => {
          refreshProgress();
        };

      window.addEventListener(
        'focus',
        handleFocus,
      );

      window.addEventListener(
        'pageshow',
        handlePageShow,
      );

      return () => {
        window.removeEventListener(
          'focus',
          handleFocus,
        );

        window.removeEventListener(
          'pageshow',
          handlePageShow,
        );
      };
    },
    [
      refreshProgress,
    ],
  );

  /* =======================================================
     VISIBLE STAGES
  ======================================================= */

  const visibleStages =
    useMemo(
      () => {
        if (
          !practicePath
        ) {
          return [];
        }

        const ordered =
          [
            ...practicePath.stages,
          ].sort(
            (
              a,
              b,
            ) =>
              a.order -
              b.order,
          );

        if (
          selectedLevel ===
          'All'
        ) {
          return ordered;
        }

        return ordered.filter(
          (
            stage,
          ) =>
            stage.level ===
            selectedLevel,
        );
      },
      [
        practicePath,
        selectedLevel,
      ],
    );

  /* =======================================================
     TOTAL PROBLEMS

     Use practice-path count so the UI reflects the complete
     curriculum even if a registry definition is missing.
  ======================================================= */

  const totalProblems =
    pathProblemSlugs.length;

  /* =======================================================
     SOLVED COUNT
  ======================================================= */

  const solvedProblems =
    useMemo(
      () =>
        pathProblemSlugs.filter(
          (
            problemSlug,
          ) =>
            solvedProblemSlugs.includes(
              problemSlug,
            ),
        ).length,
      [
        pathProblemSlugs,
        solvedProblemSlugs,
      ],
    );

  /* =======================================================
     PROGRESS %
  ======================================================= */

  const progress =
    totalProblems >
    0
      ? Math.round(
          (
            solvedProblems /
            totalProblems
          ) *
            100,
        )
      : 0;

  /* =======================================================
     LOGOUT
  ======================================================= */

  const logout =
    () => {
      localStorage.removeItem(
        'elab_dummy_auth',
      );

      localStorage.removeItem(
        'elab_dummy_user',
      );

      router.replace(
        '/login',
      );
    };

  /* =======================================================
     NOT FOUND
  ======================================================= */

  if (
    !practicePath
  ) {
    return (
      <main
        className={
          styles.page
        }
      >
        <div
          className={
            styles.notFound
          }
        >
          <Code2 />

          <h1>
            Practice path not
            available
          </h1>

          <p>
            A practice path has
            not yet been created
            for{' '}
            {
              technologySlug
            }
            .
          </p>

          <button
            type="button"
            onClick={() =>
              router.push(
                '/dashboard',
              )
            }
          >
            Back to Dashboard
          </button>
        </div>
      </main>
    );
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <main
      className={
        styles.page
      }
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <header
        className={
          styles.header
        }
      >
        <div
          className={
            styles.headerInner
          }
        >
          {/* =============================================
              LOGO
          ============================================= */}

          <button
            type="button"
            className={
              styles.logoArea
            }
            onClick={() =>
              router.push(
                '/dashboard',
              )
            }
          >
            <div
              className={
                styles.logoIcon
              }
            >
              <Braces />
            </div>

            <div
              className={
                styles.logo
              }
            >
              e<span>Lab</span>
            </div>
          </button>

          {/* =============================================
              NAVIGATION
          ============================================= */}

          <nav
            className={
              styles.navShell
            }
          >
            <button
              type="button"
              className={`${styles.navButton} ${styles.activeNav}`}
              onClick={() =>
                router.push(
                  '/dashboard',
                )
              }
            >
              <Code2 />

              Start Practicing
            </button>

            <button
              type="button"
              className={
                styles.navButton
              }
              onClick={() =>
                router.push(
                  '/stacks',
                )
              }
            >
              <Layers3 />

              Targeted Stack
            </button>

            <button
              type="button"
              className={
                styles.navButton
              }
              onClick={() =>
                router.push(
                  '/challenges',
                )
              }
            >
              <Trophy />

              Real-Time Challenges
            </button>
          </nav>

          {/* =============================================
              USER
          ============================================= */}

          <div
            className={
              styles.userArea
            }
          >
            <div
              className={
                styles.avatar
              }
            >
              <UserRound />
            </div>

            <div
              className={
                styles.userText
              }
            >
              <strong>
                Learner
              </strong>

              <span>
                Practice Workspace
              </span>
            </div>

            <button
              type="button"
              className={
                styles.logoutButton
              }
              onClick={
                logout
              }
            >
              <LogOut />
            </button>
          </div>
        </div>
      </header>

      {/* =================================================
          CONTENT
      ================================================= */}

      <div
        className={
          styles.container
        }
      >
        {/* ===============================================
            BACK
        =============================================== */}

        <button
          type="button"
          className={
            styles.backButton
          }
          onClick={() =>
            router.push(
              '/dashboard',
            )
          }
        >
          <ArrowLeft />

          All Technologies
        </button>

        {/* =================================================
            HERO
        ================================================= */}

        <section
          className={
            styles.hero
          }
        >
          <div
            className={
              styles.heroIcon
            }
          >
            <Code2 />
          </div>

          <div
            className={
              styles.heroContent
            }
          >
            <span
              className={
                styles.eyebrow
              }
            >
              Start Practicing
            </span>

            <h1>
              {
                practicePath.name
              }
            </h1>

            <p>
              {
                practicePath.description
              }
            </p>
          </div>

          {/* =============================================
              PROGRESS
          ============================================= */}

          <div
            className={
              styles.progressCard
            }
          >
            <div>
              <strong>
                {
                  totalProblems
                }
              </strong>

              <span>
                Problems
              </span>
            </div>

            <div>
              <strong>
                {
                  solvedProblems
                }
              </strong>

              <span>
                Solved
              </span>
            </div>

            <div>
              <strong>
                {progress}%
              </strong>

              <span>
                Progress
              </span>
            </div>
          </div>
        </section>

        {/* =================================================
            FILTERS
        ================================================= */}

        <section
          className={
            styles.filters
          }
        >
          {(
            [
              'All',
              'Beginner',
              'Intermediate',
              'Advanced',
            ] as LevelFilter[]
          ).map(
            (
              level,
            ) => (
              <button
                key={
                  level
                }
                type="button"
                className={`${styles.filterButton} ${
                  selectedLevel ===
                  level
                    ? styles.filterActive
                    : ''
                }`}
                onClick={() =>
                  setSelectedLevel(
                    level,
                  )
                }
              >
                {level}
              </button>
            ),
          )}
        </section>

        {/* =================================================
            PRACTICE STAGES
        ================================================= */}

        <section
          className={
            styles.stageList
          }
        >
          {visibleStages.map(
            (
              stage,
            ) => {
              /* ===========================================
                 RESOLVE STAGE PROBLEMS

                 IMPORTANT:

                 practice-paths.ts contains problem slugs.

                 problem-engine/problems.ts contains the
                 actual PracticeProblem objects.

                 We resolve them here.
              =========================================== */

              const problems =
                stage.problemSlugs
                  .map(
                    (
                      problemSlug,
                    ) =>
                      registeredProblemMap.get(
                        problemSlug,
                      ),
                  )
                  .filter(
                    (
                      problem,
                    ): problem is NonNullable<
                      typeof problem
                    > =>
                      Boolean(
                        problem,
                      ),
                  );

              /* ===========================================
                 MISSING DEFINITIONS FOR THIS STAGE
              =========================================== */

              const missingProblemSlugs =
                stage.problemSlugs.filter(
                  (
                    problemSlug,
                  ) =>
                    !registeredProblemMap.has(
                      problemSlug,
                    ),
                );

              /* ===========================================
                 SOLVED COUNT
              =========================================== */

              const stageSolvedCount =
                stage.problemSlugs.filter(
                  (
                    problemSlug,
                  ) =>
                    solvedProblemSlugs.includes(
                      problemSlug,
                    ),
                ).length;

              return (
                <section
                  key={`${stage.slug}-${solvedProblemSlugs.length}`}
                  className={
                    styles.stage
                  }
                >
                  {/* =====================================
                      STAGE HEADER
                  ===================================== */}

                  <div
                    className={
                      styles.stageHeader
                    }
                  >
                    <div
                      className={
                        styles.stageNumber
                      }
                    >
                      {String(
                        stage.order,
                      ).padStart(
                        2,
                        '0',
                      )}
                    </div>

                    <div
                      className={
                        styles.stageInfo
                      }
                    >
                      <div
                        className={
                          styles.stageMeta
                        }
                      >
                        <span>
                          {
                            stage.level
                          }
                        </span>

                        <span>
                          {
                            stage.problemSlugs
                              .length
                          }{' '}
                          problems
                        </span>

                        {stageSolvedCount >
                          0 && (
                          <span>
                            {
                              stageSolvedCount
                            }{' '}
                            solved
                          </span>
                        )}
                      </div>

                      <h2>
                        {
                          stage.title
                        }
                      </h2>

                      <p>
                        {
                          stage.description
                        }
                      </p>
                    </div>

                    <BookOpen
                      className={
                        styles.stageIcon
                      }
                    />
                  </div>

                  {/* =====================================
                      PROBLEMS
                  ===================================== */}

                  <div
                    className={
                      styles.problemArea
                    }
                  >
                    <ProblemList
                      key={`${stage.slug}-${solvedProblemSlugs.join('-')}`}
                      problems={
                        problems
                      }
                      context={{
                        source:
                          'practice',

                        technologySlug,
                      }}
                      emptyTitle="No problems available"
                      emptyDescription={
                        missingProblemSlugs.length >
                        0
                          ? `Problem definitions are missing from the central registry: ${missingProblemSlugs.join(', ')}`
                          : 'Problems for this stage have not yet been added.'
                      }
                    />
                  </div>
                </section>
              );
            },
          )}
        </section>
      </div>
    </main>
  );
}