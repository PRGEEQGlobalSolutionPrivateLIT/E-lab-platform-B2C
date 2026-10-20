import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { AdminActor } from '../common/admin-actor.decorator.js';
import type { UpdatePlacementDto } from './problem-placement.dto.js';

@Injectable()
export class ProblemPlacementService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  private async problemOrThrow(id: string) {
    const problem = await this.prisma.problem.findFirst({
      where: { id, organizationId: null },
      select: { id: true, title: true, technologyId: true, technology: { select: { slug: true, name: true } } },
    });
    if (!problem) throw new NotFoundException('Problem not found.');
    return problem;
  }

  async get(id: string) {
    const problem = await this.problemOrThrow(id);
    const [stages, modules, stageLinks, moduleLinks] = await Promise.all([
      this.prisma.practiceStage.findMany({
        where: { technologyId: problem.technologyId },
        orderBy: { position: 'asc' },
        select: { id: true, title: true, level: true, position: true, _count: { select: { problems: true } } },
      }),
      this.prisma.stackModule.findMany({
        orderBy: [{ stack: { domain: { position: 'asc' } } }, { stack: { position: 'asc' } }, { position: 'asc' }],
        select: {
          id: true,
          name: true,
          phase: true,
          technologySlug: true,
          _count: { select: { problems: true } },
          stack: { select: { name: true, domain: { select: { name: true } } } },
        },
      }),
      this.prisma.practiceStageProblem.findMany({ where: { problemId: id }, select: { stageId: true } }),
      this.prisma.stackModuleProblem.findMany({ where: { problemId: id }, select: { moduleId: true } }),
    ]);
    return {
      technology: problem.technology,
      stages: stages.map((stage) => ({
        id: stage.id,
        title: stage.title,
        level: stage.level,
        position: stage.position,
        problemCount: stage._count.problems,
      })),
      modules: modules.map((module) => ({
        id: module.id,
        name: module.name,
        phase: module.phase,
        stackName: module.stack.name,
        domainName: module.stack.domain.name,
        technologySlug: module.technologySlug,
        matchesTechnology: module.technologySlug === problem.technology.slug,
        problemCount: module._count.problems,
      })),
      stageIds: stageLinks.map((link) => link.stageId),
      moduleIds: moduleLinks.map((link) => link.moduleId),
    };
  }

  async update(id: string, dto: UpdatePlacementDto, actor: AdminActor) {
    const problem = await this.problemOrThrow(id);
    const stageIds = [...new Set(dto.stageIds)];
    const moduleIds = [...new Set(dto.moduleIds)];

    const [validStages, validModules] = await Promise.all([
      this.prisma.practiceStage.findMany({ where: { id: { in: stageIds } }, select: { id: true, technologyId: true } }),
      this.prisma.stackModule.findMany({ where: { id: { in: moduleIds } }, select: { id: true } }),
    ]);
    if (validStages.length !== stageIds.length) throw new BadRequestException('One or more practice stages do not exist.');
    if (validStages.some((stage) => stage.technologyId !== problem.technologyId)) {
      throw new BadRequestException(`Practice stages must belong to ${problem.technology.name}.`);
    }
    if (validModules.length !== moduleIds.length) throw new BadRequestException('One or more stack modules do not exist.');

    await this.prisma.$transaction(async (tx) => {
      const stageChanges = await this.sync(
        stageIds,
        (await tx.practiceStageProblem.findMany({ where: { problemId: id }, select: { stageId: true } })).map((link) => link.stageId),
        (remove) => tx.practiceStageProblem.deleteMany({ where: { problemId: id, stageId: { in: remove } } }),
        async (stageId) => {
          const last = await tx.practiceStageProblem.aggregate({ where: { stageId }, _max: { position: true } });
          await tx.practiceStageProblem.create({ data: { stageId, problemId: id, position: (last._max.position ?? -1) + 1 } });
        },
      );
      const moduleChanges = await this.sync(
        moduleIds,
        (await tx.stackModuleProblem.findMany({ where: { problemId: id }, select: { moduleId: true } })).map((link) => link.moduleId),
        (remove) => tx.stackModuleProblem.deleteMany({ where: { problemId: id, moduleId: { in: remove } } }),
        async (moduleId) => {
          const last = await tx.stackModuleProblem.aggregate({ where: { moduleId }, _max: { position: true } });
          await tx.stackModuleProblem.create({ data: { moduleId, problemId: id, position: (last._max.position ?? -1) + 1 } });
        },
      );
      if (stageChanges.changed || moduleChanges.changed) {
        await this.audit.record(tx, actor, {
          action: 'problem.placement',
          entityType: 'problem',
          entityId: id,
          summary: `Updated where ${problem.title} appears for learners`,
          changes: {
            practiceStages: { added: stageChanges.added, removed: stageChanges.removed },
            stackModules: { added: moduleChanges.added, removed: moduleChanges.removed },
            ...(dto.reason ? { reason: dto.reason } : {}),
          },
        });
      }
    });
    return this.get(id);
  }

  private async sync(
    wanted: string[],
    current: string[],
    removeMany: (ids: string[]) => Promise<unknown>,
    addOne: (id: string) => Promise<void>,
  ) {
    const removed = current.filter((value) => !wanted.includes(value));
    const added = wanted.filter((value) => !current.includes(value));
    if (removed.length) await removeMany(removed);
    for (const value of added) await addOne(value);
    return { added, removed, changed: added.length > 0 || removed.length > 0 };
  }
}