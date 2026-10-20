import { Injectable, NotFoundException } from '@nestjs/common';

const IDLE_LIMIT_MS = 24 * 60 * 60 * 1000;

type Owner = { userId: string; touchedAt: number };

function readId(value: unknown): string | null {
  if (!value || typeof value !== 'object') return null;
  const record = value as Record<string, unknown>;
  for (const key of ['sessionId', 'attemptId', 'id']) {
    if (typeof record[key] === 'string' && record[key]) return record[key] as string;
  }
  for (const key of ['session', 'attempt']) {
    const nested = readId(record[key]);
    if (nested) return nested;
  }
  return null;
}

@Injectable()
export class LabOwnersService {
  private readonly owners = new Map<string, Owner>();

  claim<T>(result: T, userId: string): T {
    const id = readId(result);
    if (id) {
      this.prune();
      this.owners.set(id, { userId, touchedAt: Date.now() });
    }
    return result;
  }

  owns(id: string, userId: string): boolean {
    const owner = this.owners.get(id);
    if (!owner || owner.userId !== userId) return false;
    owner.touchedAt = Date.now();
    return true;
  }

  assert(id: string, userId: string): void {
    if (!this.owns(id, userId)) throw new NotFoundException('Lab session not found.');
  }

  release(id: string): void {
    this.owners.delete(id);
  }

  private prune() {
    const cutoff = Date.now() - IDLE_LIMIT_MS;
    for (const [id, owner] of this.owners) {
      if (owner.touchedAt < cutoff) this.owners.delete(id);
    }
  }
}