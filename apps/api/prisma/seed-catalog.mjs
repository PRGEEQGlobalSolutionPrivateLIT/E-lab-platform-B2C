import 'dotenv/config';
import { readFileSync } from 'node:fs';
import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../generated/prisma/client/index.js';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const catalog = JSON.parse(readFileSync(new URL('./catalog/catalog.json', import.meta.url), 'utf8'));

const json = (value) => (value === null || value === undefined ? undefined : value);

async function seedTechnologies() {
  const ids = new Map();
  for (const tech of catalog.technologies) {
    const existing = await prisma.technology.findUnique({ where: { slug: tech.slug } });
    if (existing) {
      ids.set(tech.slug, existing.id);
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
        judgeLanguage: tech.judgeLanguage,
      },
    });
    ids.set(tech.slug, created.id);
    console.log(`created technology ${tech.slug}`);
  }
  return ids;
}

function testRows(problem) {
  return [
    ...problem.samples.map((test) => ({ input: test.input, expectedOutput: test.expectedOutput, hidden: false })),
    ...problem.hidden.map((test) => ({ input: test.input, expectedOutput: test.expectedOutput, hidden: true })),
  ].map((test, position) => ({ ...test, position, kind: 'io' }));
}

async function main() {
  const technologyIds = await seedTechnologies();
  let created = 0;
  let filled = 0;
  let skipped = 0;

  for (const problem of catalog.problems) {
    const tests = testRows(problem);
    const existing = await prisma.problem.findUnique({
      where: { slug: problem.slug },
      select: { id: true, organizationId: true, _count: { select: { testCases: true, sourceChecks: true } } },
    });

    if (existing) {
      const empty = existing._count.testCases === 0 && existing._count.sourceChecks === 0;
      if (existing.organizationId === null && empty && (tests.length || problem.sourceChecks.length)) {
        await prisma.$transaction([
          prisma.testCase.createMany({ data: tests.map((test) => ({ ...test, problemId: existing.id })) }),
          prisma.sourceCheck.createMany({ data: problem.sourceChecks.map((check) => ({ ...check, problemId: existing.id })) }),
        ]);
        filled += 1;
      } else {
        skipped += 1;
      }
      continue;
    }

    await prisma.problem.create({
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
        testCases: { create: tests },
        sourceChecks: { create: problem.sourceChecks },
      },
    });
    created += 1;
  }

  console.log(`catalog v${catalog.version}: ${created} created, ${filled} filled with tests, ${skipped} unchanged`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
