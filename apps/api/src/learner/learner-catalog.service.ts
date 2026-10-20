import { Injectable, NotFoundException } from '@nestjs/common';

import type { Prisma } from '../../generated/prisma/client/index.js';
import { PrismaService } from '../prisma/prisma.service.js';

export const DB_JUDGED_LANGUAGES = [
  'c',
  'cpp',
  'java',
  'csharp',
  'python',
  'go',
  'ruby',
  'swift',
] as const;

const DIFFICULTY_LABEL = {
  Easy: 'Easy',
  Medium: 'Medium',
  Hard: 'Hard',
} as const;

const SUMMARY_SELECT = {
  id: true,
  slug: true,
  title: true,
  difficulty: true,
  workspaceType: true,
  shortDescription: true,
  skills: true,
  estimatedMinutes: true,
  defaultLanguage: true,
  allowedLanguages: true,
  organizationId: true,
  createdById: true,
  technology: { select: { slug: true, name: true } },
} satisfies Prisma.ProblemSelect;

type SummaryRow = Prisma.ProblemGetPayload<{ select: typeof SUMMARY_SELECT }>;

export interface LearnerScope {
  organizationId: string | null;
  groupId?: string | null;
  institution: { id: string; name: string } | null;
}

const LEVEL_LABEL = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
} as const;

export interface PracticeStageView {
  slug: string;
  title: string;
  description: string;
  level: (typeof LEVEL_LABEL)[keyof typeof LEVEL_LABEL];
  order: number;
  problemSlugs: string[];
}

export interface PracticePathView {
  technologySlug: string;
  name: string;
  shortName: string;
  description: string;
  stages: PracticeStageView[];
}

export interface PathTechnology {
  slug: string;
  name: string;
  pathName?: string | null;
  pathShortName?: string | null;
  pathDescription?: string | null;
}

const strings = (value: Prisma.JsonValue | null) =>
  Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : [];

@Injectable()
export class LearnerCatalogService {
  constructor(private readonly prisma: PrismaService) {}

  async scope(userId: string | null): Promise<LearnerScope> {
    if (!userId) return { organizationId: null, institution: null };
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        learnerGroupId: true,
        organization: { select: { id: true, name: true, status: true } },
      },
    });
    const org = user?.organization;
    if (!org || org.status !== 'active')
      return { organizationId: null, institution: null };
    return {
      organizationId: org.id,
      groupId: user?.learnerGroupId ?? null,
      institution: { id: org.id, name: org.name },
    };
  }

  visibleWhere(scope: LearnerScope): Prisma.ProblemWhereInput {
    return {
      status: 'published',
      visibility: 'listed',
      OR: [
        { organizationId: null },
        ...(scope.organizationId
          ? [{ organizationId: scope.organizationId }]
          : []),
      ],
    };
  }

  private summary(row: SummaryRow, scope: LearnerScope) {
    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      technologySlug: row.technology.slug,
      technologyName: row.technology.name,
      difficulty: DIFFICULTY_LABEL[row.difficulty],
      workspaceType: row.workspaceType,
      shortDescription: row.shortDescription,
      skills: strings(row.skills),
      estimatedMinutes: row.estimatedMinutes,
      defaultLanguage: row.defaultLanguage,
      allowedLanguages: strings(row.allowedLanguages).length ? strings(row.allowedLanguages) : [row.defaultLanguage],
      source: row.organizationId
        ? ('institution' as const)
        : ('platform' as const),
      institutionName: row.organizationId
        ? (scope.institution?.name ?? null)
        : null,
    };
  }

  async list(userId: string, technology?: string) {
    const scope = await this.scope(userId);
    const rows = await this.prisma.problem.findMany({
      where: {
        ...this.visibleWhere(scope),
        ...(technology ? { technology: { slug: technology } } : {}),
      },
      orderBy: [
        { organizationId: { sort: 'desc', nulls: 'last' } },
        { difficulty: 'asc' },
        { title: 'asc' },
      ],
      take: 500,
      select: SUMMARY_SELECT,
    });
    return {
      institution: scope.institution,
      items: rows.map((row) => this.summary(row, scope)),
    };
  }

  async get(userId: string, slug: string) {
    const scope = await this.scope(userId);
    const row = await this.prisma.problem.findFirst({
      where: { ...this.visibleWhere(scope), slug },
      select: {
        ...SUMMARY_SELECT,
        problemStatement: true,
        inputFormat: true,
        outputFormat: true,
        constraints: true,
        notes: true,
        starterCode: true,
        starterFiles: true,
        sampleTests: true,
        config: true,
        testCases: {
          where: { hidden: false, enabled: true },
          orderBy: [{ position: 'asc' }, { createdAt: 'asc' }],
          select: { id: true, input: true, expectedOutput: true },
        },
      },
    });
    if (!row) throw new NotFoundException('Problem not found.');
    const authored = Array.isArray(row.sampleTests) ? (row.sampleTests as Array<Record<string, unknown>>) : [];
    const config = row.config && typeof row.config === 'object' && !Array.isArray(row.config) ? (row.config as Record<string, unknown>) : {};
    const text = (value: unknown) => (typeof value === 'string' ? value : undefined);
    return {
      ...this.summary(row, scope),
      problemStatement: row.problemStatement,
      inputFormat: row.inputFormat ?? undefined,
      outputFormat: row.outputFormat ?? undefined,
      constraints: strings(row.constraints),
      notes: strings(row.notes),
      starterCode: row.starterCode ?? undefined,
      starterFiles: Array.isArray(row.starterFiles) ? row.starterFiles : undefined,
      powerBi: config.powerBi ?? undefined,
      sampleTests: row.testCases.length
        ? row.testCases.map((test, index) => ({
            id: test.id,
            title: text(authored[index]?.title) ?? `Sample ${index + 1}`,
            description: text(authored[index]?.description),
            input: test.input ?? undefined,
            expectedOutput: test.expectedOutput,
          }))
        : authored,
    };
  }

  async catalog(userId: string) {
    const scope = await this.scope(userId);
    const [rows, stages] = await Promise.all([
      this.prisma.problem.findMany({
        where: this.visibleWhere(scope),
        orderBy: [{ title: 'asc' }],
        select: SUMMARY_SELECT,
      }),
      this.prisma.practiceStage.findMany({
        orderBy: [{ technologyId: 'asc' }, { position: 'asc' }],
        select: {
          slug: true,
          title: true,
          description: true,
          level: true,
          position: true,
          technology: { select: { slug: true, name: true, pathName: true, pathShortName: true, pathDescription: true } },
          problems: { orderBy: { position: 'asc' }, select: { problem: { select: { slug: true } } } },
        },
      }),
    ]);
    const visible = new Set(rows.map((row) => row.slug));
    const staged = new Set(stages.flatMap((stage) => stage.problems.map((link) => link.problem.slug)));
    const paths = new Map<string, PracticePathView>();
    const pathFor = (technology: PathTechnology) => {
      const existing = paths.get(technology.slug);
      if (existing) return existing;
      const created: PracticePathView = {
        technologySlug: technology.slug,
        name: technology.pathName ?? technology.name,
        shortName: technology.pathShortName ?? technology.name,
        description: technology.pathDescription ?? `Practice problems for ${technology.name}.`,
        stages: [],
      };
      paths.set(technology.slug, created);
      return created;
    };
    for (const stage of stages) {
      pathFor(stage.technology).stages.push({
        slug: stage.slug,
        title: stage.title,
        description: stage.description,
        level: LEVEL_LABEL[stage.level],
        order: stage.position + 1,
        problemSlugs: stage.problems.map((link) => link.problem.slug).filter((slug) => visible.has(slug)),
      });
    }
    const uploaded = new Map<string, { technology: PathTechnology; institution: string[]; platform: string[] }>();
    for (const row of rows) {
      if (staged.has(row.slug) || (row.organizationId === null && row.createdById === null)) continue;
      const entry = uploaded.get(row.technology.slug) ?? { technology: row.technology, institution: [], platform: [] };
      (row.organizationId ? entry.institution : entry.platform).push(row.slug);
      uploaded.set(row.technology.slug, entry);
    }
    for (const { technology, institution, platform } of uploaded.values()) {
      const path = pathFor(technology);
      let order = path.stages.reduce((max, stage) => Math.max(max, stage.order), 0);
      if (institution.length) {
        path.stages.push({
          slug: `${technology.slug}-institution`,
          title: `From ${scope.institution?.name ?? 'your institution'}`,
          description: 'Published by your institution for its learners.',
          level: 'Intermediate',
          order: (order += 1),
          problemSlugs: institution,
        });
      }
      if (platform.length) {
        path.stages.push({
          slug: `${technology.slug}-more`,
          title: 'More problems',
          description: 'Recently published practice problems.',
          level: 'Intermediate',
          order: (order += 1),
          problemSlugs: platform,
        });
      }
    }
    return {
      institution: scope.institution,
      problems: rows.map((row) => this.summary(row, scope)),
      practicePaths: [...paths.values()].filter((path) => path.stages.some((stage) => stage.problemSlugs.length)),
    };
  }

  async stacks() {
    const [domains, stacks] = await Promise.all([
      this.prisma.domain.findMany({
        orderBy: [{ position: 'asc' }, { createdAt: 'asc' }],
        select: { slug: true, name: true, description: true, pathDescription: true },
      }),
      this.prisma.stack.findMany({
        orderBy: [{ position: 'asc' }, { createdAt: 'asc' }],
        select: {
          slug: true,
          name: true,
          shortName: true,
          description: true,
          technologies: true,
          level: true,
          domain: { select: { slug: true } },
          modules: {
            orderBy: { position: 'asc' },
            select: {
              slug: true,
              name: true,
              phase: true,
              description: true,
              technologySlug: true,
              topics: true,
              problems: { orderBy: { position: 'asc' }, select: { problem: { select: { slug: true } } } },
            },
          },
        },
      }),
    ]);
    return {
      domains,
      stacks: stacks.map((stack) => ({
        slug: stack.slug,
        domainSlug: stack.domain.slug,
        name: stack.name,
        shortName: stack.shortName,
        description: stack.description,
        technologies: strings(stack.technologies),
        level: stack.level,
      })),
      roadmaps: stacks
        .filter((stack) => stack.modules.length)
        .map((stack) => ({
          stackSlug: stack.slug,
          modules: stack.modules.map((module) => ({
            slug: module.slug,
            name: module.name,
            phase: module.phase,
            description: module.description,
            technologySlug: module.technologySlug ?? undefined,
            topics: strings(module.topics),
          })),
        })),
      mappings: Object.fromEntries(
        stacks.flatMap((stack) =>
          stack.modules.map((module) => [`${stack.slug}:${module.slug}`, module.problems.map((link) => link.problem.slug)]),
        ),
      ),
    };
  }

  async solvedSlugs(userId: string) {
    const rows = await this.prisma.codeRun.findMany({
      where: { userId, kind: 'submit', verdict: 'ac' },
      distinct: ['problemSlug'],
      select: { problemSlug: true },
    });
    return rows.map((row) => row.problemSlug);
  }

  async batches(userId: string) {
    const scope = await this.scope(userId);
    if (!scope.organizationId) return { institution: null, items: [] };
    const visible = this.visibleWhere(scope);
    const [batches, solved] = await Promise.all([
      this.prisma.contentBatch.findMany({
        where: {
          organizationId: scope.organizationId,
          assignedAt: { not: null },
          OR: [
            { assignedGroupId: null },
            ...(scope.groupId ? [{ assignedGroupId: scope.groupId }] : []),
          ],
        },
        orderBy: { assignedAt: 'desc' },
        select: {
          id: true,
          name: true,
          description: true,
          type: true,
          focus: true,
          assignedAt: true,
          items: {
            where: { problem: visible },
            orderBy: { position: 'asc' },
            select: {
              problem: {
                select: {
                  slug: true,
                  title: true,
                  difficulty: true,
                  shortDescription: true,
                  skills: true,
                  estimatedMinutes: true,
                  technology: { select: { slug: true, name: true } },
                },
              },
            },
          },
        },
      }),
      this.solvedSlugs(userId),
    ]);
    const done = new Set(solved);
    return {
      institution: scope.institution,
      items: batches.map((batch) => {
        const problems = batch.items.map(({ problem }) => ({
          slug: problem.slug,
          title: problem.title,
          difficulty: DIFFICULTY_LABEL[problem.difficulty],
          shortDescription: problem.shortDescription,
          skills: strings(problem.skills),
          estimatedMinutes: problem.estimatedMinutes,
          technologySlug: problem.technology.slug,
          technologyName: problem.technology.name,
          solved: done.has(problem.slug),
        }));
        return {
          id: batch.id,
          name: batch.name,
          description: batch.description,
          type: batch.type,
          focus: batch.focus,
          assignedAt: batch.assignedAt,
          problems,
          total: problems.length,
          solvedCount: problems.filter((problem) => problem.solved).length,
        };
      }),
    };
  }

    async judgeTests(userId: string | null, slug: string) {
    const scope = await this.scope(userId);
    const row = await this.prisma.problem.findFirst({
      where: {
        slug,
        status: 'published',
        OR: [{ organizationId: null }, ...(scope.organizationId ? [{ organizationId: scope.organizationId }] : [])],
      },
      select: {
        testCases: {
          where: { hidden: true, enabled: true, kind: 'io' },
          orderBy: [{ position: 'asc' }, { createdAt: 'asc' }],
          select: { input: true, expectedOutput: true },
        },
        sourceChecks: {
          where: { enabled: true },
          orderBy: { createdAt: 'asc' },
          select: { kind: true, pattern: true, isRegex: true, message: true },
        },
      },
    });
    if (!row) return [];
    const toRegex = (pattern: string, isRegex: boolean) => {
      if (!isRegex) return new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
      const literal = /^\/(.*)\/([dgimsuvy]*)$/s.exec(pattern);
      return literal ? new RegExp(literal[1], literal[2]) : new RegExp(pattern);
    };
    const checks = (kind: 'required' | 'forbidden') =>
      row.sourceChecks.filter((check) => check.kind === kind).map((check) => ({ pattern: toRegex(check.pattern, check.isRegex), message: check.message }));
    const requiredSourceChecks = checks('required');
    const forbiddenSourceChecks = checks('forbidden');
    return row.testCases.map((test) => ({
      input: test.input ?? '',
      expectedOutput: test.expectedOutput,
      requiredSourceChecks,
      forbiddenSourceChecks,
    }));
  }

  async hiddenTests(userId: string | null, slug: string, language: string) {
    const scope = await this.scope(userId);
    const row = await this.prisma.problem.findFirst({
      where: { ...this.visibleWhere(scope), slug },
      select: {
        defaultLanguage: true,
        allowedLanguages: true,
        testCases: {
          where: { hidden: true, enabled: true },
          orderBy: [{ position: 'asc' }, { createdAt: 'asc' }],
          select: { input: true, expectedOutput: true },
        },
      },
    });
    if (!row) return [];
    const allowed = new Set([
      row.defaultLanguage,
      ...strings(row.allowedLanguages),
    ]);
    if (!allowed.has(language)) return [];
    return row.testCases.map((test) => ({
      input: test.input ?? undefined,
      expectedOutput: test.expectedOutput,
    }));
  }
}
