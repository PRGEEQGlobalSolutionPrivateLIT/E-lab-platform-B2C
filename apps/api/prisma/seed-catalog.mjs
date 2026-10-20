import 'dotenv/config';
import { readFileSync } from 'node:fs';
import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../generated/prisma/client/index.js';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const catalog = JSON.parse(readFileSync(new URL('./catalog/catalog.json', import.meta.url), 'utf8'));

const json = (value) => (value === null || value === undefined ? undefined : value);
const counts = {};
const bump = (key) => {
  counts[key] = (counts[key] ?? 0) + 1;
};

async function seedTechnologies() {
  const ids = new Map();
  const paths = new Map((catalog.practicePaths ?? []).map((path) => [path.technologySlug, path]));
  for (const tech of catalog.technologies) {
    const path = paths.get(tech.slug);
    const existing = await prisma.technology.findUnique({ where: { slug: tech.slug } });
    if (existing) {
      ids.set(tech.slug, existing.id);
      if (path && !existing.pathName) {
        await prisma.technology.update({
          where: { id: existing.id },
          data: { pathName: path.name, pathShortName: path.shortName, pathDescription: path.description },
        });
      }
      continue;
    }
    const created = await prisma.technology.create({
      data: {
        slug: tech.slug,
        name: tech.name,
        description: tech.description,
        category: tech.category,
        status: 'active',
        runtimeImage: '',
        judgeLanguage: tech.judgeLanguage ?? null,
        pathName: path?.name ?? null,
        pathShortName: path?.shortName ?? null,
        pathDescription: path?.description ?? null,
      },
    });
    ids.set(tech.slug, created.id);
    bump('technologies');
  }
  return ids;
}

function testRows(problem) {
  return [
    ...problem.samples.map((test) => ({ input: test.input, expectedOutput: test.expectedOutput, hidden: false })),
    ...problem.hidden.map((test) => ({ input: test.input, expectedOutput: test.expectedOutput, hidden: true })),
  ].map((test, position) => ({ ...test, position, kind: 'io' }));
}

function specRows(specs, kind) {
  return (specs ?? []).map((spec, position) => ({
    input: null,
    expectedOutput: '',
    hidden: true,
    position,
    kind,
    spec,
  }));
}

async function seedProblems(technologyIds) {
  const ids = new Map();
  for (const problem of catalog.problems) {
    const tests = testRows(problem);
    const specGroups = [
      ['framework', specRows(problem.frameworkTests, 'framework')],
      ['lab', specRows(problem.labChecks, 'lab')],
    ];
    const existing = await prisma.problem.findUnique({
      where: { slug: problem.slug },
      select: { id: true, organizationId: true, _count: { select: { testCases: true, sourceChecks: true } } },
    });

    if (existing) {
      if (existing.organizationId !== null) continue;
      ids.set(problem.slug, existing.id);
            for (const [kind, rows] of specGroups) {
        if (!rows.length) continue;
        const present = await prisma.testCase.count({ where: { problemId: existing.id, kind } });
        if (present === 0) {
          await prisma.testCase.createMany({ data: rows.map((test) => ({ ...test, problemId: existing.id })) });
          bump(`problems filled with ${kind} tests`);
        }
      }
      const ioCount = await prisma.testCase.count({ where: { problemId: existing.id, kind: 'io' } });
      const empty = ioCount === 0 && existing._count.sourceChecks === 0;
      if (empty && (tests.length || problem.sourceChecks.length)) {
        await prisma.$transaction([
          prisma.testCase.createMany({ data: tests.map((test) => ({ ...test, problemId: existing.id })) }),
          prisma.sourceCheck.createMany({ data: problem.sourceChecks.map((check) => ({ ...check, problemId: existing.id })) }),
        ]);
        bump('problems filled with tests');
      }
      continue;
    }

    const created = await prisma.problem.create({
      data: {
        slug: problem.slug,
        title: problem.title,
        technologyId: technologyIds.get(problem.technologySlug),
        difficulty: problem.difficulty,
        workspaceType: problem.workspaceType,
        source: 'practice',
        shortDescription: problem.shortDescription,
        problemStatement: problem.problemStatement,
        inputFormat: problem.inputFormat,
        outputFormat: problem.outputFormat,
        constraints: json(problem.constraints),
        notes: json(problem.notes),
        skills: problem.skills,
        estimatedMinutes: problem.estimatedMinutes,
        defaultLanguage: problem.defaultLanguage,
        allowedLanguages: problem.allowedLanguages,
        starterCode: problem.starterCode,
        starterFiles: json(problem.starterFiles),
        sampleTests: json(problem.sampleTests),
        config: json(problem.config),
        status: 'published',
        publishedAt: new Date(),
        visibility: 'listed',
        testCases: { create: [...tests, ...specGroups.flatMap(([, rows]) => rows)] },
        sourceChecks: { create: problem.sourceChecks },
      },
      select: { id: true },
    });
    ids.set(problem.slug, created.id);
    bump('problems');
  }
  return ids;
}

const links = (slugs, problemIds) =>
  slugs
    .map((slug) => problemIds.get(slug))
    .filter(Boolean)
    .map((problemId, position) => ({ problemId, position }));

async function seedPracticePaths(technologyIds, problemIds) {
  for (const path of catalog.practicePaths ?? []) {
    const technologyId = technologyIds.get(path.technologySlug);
    if (!technologyId) continue;
    for (const stage of path.stages) {
      const existing = await prisma.practiceStage.findUnique({ where: { slug: stage.slug }, select: { id: true } });
      if (existing) continue;
      await prisma.practiceStage.create({
        data: {
          technologyId,
          slug: stage.slug,
          title: stage.title,
          description: stage.description,
          level: stage.level,
          position: stage.position,
          problems: { create: links(stage.problemSlugs, problemIds) },
        },
      });
      bump('practice stages');
    }
  }
}

async function seedStacks(problemIds) {
  const domainIds = new Map();
  for (const domain of catalog.domains ?? []) {
    const existing = await prisma.domain.findUnique({ where: { slug: domain.slug }, select: { id: true } });
    if (existing) {
      domainIds.set(domain.slug, existing.id);
      continue;
    }
    const created = await prisma.domain.create({ data: domain, select: { id: true } });
    domainIds.set(domain.slug, created.id);
    bump('domains');
  }

  const stackIds = new Map();
  for (const stack of catalog.stacks ?? []) {
    const domainId = domainIds.get(stack.domainSlug);
    if (!domainId) continue;
    const existing = await prisma.stack.findUnique({ where: { slug: stack.slug }, select: { id: true } });
    if (existing) {
      stackIds.set(stack.slug, existing.id);
      continue;
    }
    const { domainSlug, ...fields } = stack;
    const created = await prisma.stack.create({ data: { ...fields, domainId }, select: { id: true } });
    stackIds.set(stack.slug, created.id);
    bump('stacks');
  }

  for (const roadmap of catalog.roadmaps ?? []) {
    const stackId = stackIds.get(roadmap.stackSlug);
    if (!stackId) continue;
    for (const module of roadmap.modules) {
      const existing = await prisma.stackModule.findUnique({
        where: { stackId_slug: { stackId, slug: module.slug } },
        select: { id: true },
      });
      if (existing) continue;
      const { problemSlugs, ...fields } = module;
      await prisma.stackModule.create({
        data: { ...fields, stackId, problems: { create: links(problemSlugs, problemIds) } },
      });
      bump('stack modules');
    }
  }
}

async function main() {
  const technologyIds = await seedTechnologies();
  const problemIds = await seedProblems(technologyIds);
  await seedPracticePaths(technologyIds, problemIds);
  await seedStacks(problemIds);
  const summary = Object.entries(counts).map(([key, value]) => `${value} ${key}`).join(', ');
  console.log(`catalog v${catalog.version}: ${summary || 'nothing new'}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
