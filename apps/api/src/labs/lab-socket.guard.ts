import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import type { Socket } from 'socket.io';

import { LabOwnersService } from './lab-owners.service.js';

export const LAB_SOCKET_TICKET = 'lab-socket';

type TicketPayload = { sub?: string; sid?: string; typ?: string };

@Injectable()
export class LabSocketGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly owners: LabOwnersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient<Socket>();
    const data = context.switchToWs().getData<{ sessionId?: unknown } | undefined>();
    const state = client.data as { userId?: string };

    if (!state.userId) {
      const ticket = (client.handshake.auth as { ticket?: unknown } | undefined)?.ticket;
      if (typeof ticket !== 'string' || !ticket) throw new WsException('Authentication is required.');
      let payload: TicketPayload;
      try {
        payload = await this.jwt.verifyAsync<TicketPayload>(ticket);
      } catch {
        throw new WsException('Terminal ticket is invalid or expired.');
      }
      if (payload.typ !== LAB_SOCKET_TICKET || !payload.sub) throw new WsException('Terminal ticket is invalid or expired.');
      state.userId = payload.sub;
    }

    const sessionId = String(data?.sessionId ?? '').trim();
    if (sessionId && !this.owners.owns(sessionId, state.userId)) throw new WsException('Lab session not found.');
    return true;
  }
}