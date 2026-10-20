import { Injectable } from '@nestjs/common';

import type { Prisma } from '../../generated/prisma/client/index.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { normalizeLabCheck, type LabCheck } from './lab-checks.js';

@Injectable()
export class LabChecksService {
  constructor(private readonly prisma: PrismaService) {}

  private async specs(problemSlug: string) {
    const rows = await this.prisma.testCase.findMany({
      where: { kind: 'lab', enabled: true, hidden: true, problem: { slug: problemSlug.trim(), status: 'published' } },
      orderBy: [{ position: 'asc' }, { createdAt: 'asc' }],
      select: { spec: true },
    });
    return rows.map((row) => row.spec).filter((spec): spec is Prisma.JsonObject => spec !== null && typeof spec === 'object' && !Array.isArray(spec));
  }

  async checks(problemSlug: string): Promise<LabCheck[]> {
    const checks: LabCheck[] = [];
    for (const spec of await this.specs(problemSlug)) {
      try {
        checks.push(normalizeLabCheck(spec));
      } catch {
        continue;
      }
    }
    return checks;
  }

  async rules<T>(problemSlug: string): Promise<T[]> {
    return (await this.specs(problemSlug)) as unknown as T[];
  }

  async problemConfig(problemSlug: string): Promise<Record<string, unknown>> {
    const problem = await this.prisma.problem.findFirst({ where: { slug: problemSlug.trim(), status: 'published' }, select: { config: true } });
    const config = problem?.config;
    return config && typeof config === 'object' && !Array.isArray(config) ? (config as Record<string, unknown>) : {};
  }
}