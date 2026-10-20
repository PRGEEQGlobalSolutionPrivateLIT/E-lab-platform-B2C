import { BadRequestException, Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CurrentUser, type AuthenticatedUser } from '../auth/current-user.decorator.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { LabOwnersService } from '../labs/lab-owners.service.js';
import { LAB_SOCKET_TICKET } from '../labs/lab-socket.guard.js';
import { DevOpsLabService } from './devops-lab.service.js';

type CreateSessionBody = {
  problemSlug?: string;
};

type ExecuteCommandBody = {
  command?: string;
};

const TICKET_SECONDS = 120;

@Controller('devops-lab')
@UseGuards(JwtAuthGuard)
export class DevOpsLabController {
  constructor(
    private readonly devOpsLabService: DevOpsLabService,
    private readonly owners: LabOwnersService,
    private readonly jwt: JwtService,
  ) {}

  @Post('sessions')
  async createSession(@Body() body: CreateSessionBody, @CurrentUser() user: AuthenticatedUser) {
    const problemSlug = String(body?.problemSlug ?? '').trim();
    if (!problemSlug) throw new BadRequestException('Problem slug is required.');
    return this.owners.claim(await this.devOpsLabService.createSession(problemSlug), user.id);
  }

  @Post('sessions/:sessionId/terminal-ticket')
  async terminalTicket(@Param('sessionId') sessionId: string, @CurrentUser() user: AuthenticatedUser) {
    this.owners.assert(sessionId, user.id);
    const ticket = await this.jwt.signAsync({ sub: user.id, sid: sessionId, typ: LAB_SOCKET_TICKET }, { expiresIn: TICKET_SECONDS });
    return { ticket, expiresIn: TICKET_SECONDS };
  }

  @Post('sessions/:sessionId/execute')
  async executeCommand(@Param('sessionId') sessionId: string, @Body() body: ExecuteCommandBody, @CurrentUser() user: AuthenticatedUser) {
    this.owners.assert(sessionId, user.id);
    const command = String(body?.command ?? '');
    if (!command.trim()) throw new BadRequestException('Command is required.');
    return this.devOpsLabService.executeCommand(sessionId, command);
  }

  @Post('sessions/:sessionId/check')
  async checkSolution(@Param('sessionId') sessionId: string, @CurrentUser() user: AuthenticatedUser) {
    this.owners.assert(sessionId, user.id);
    return this.devOpsLabService.checkSolution(sessionId);
  }

  @Post('sessions/:sessionId/submit')
  async submitSolution(@Param('sessionId') sessionId: string, @CurrentUser() user: AuthenticatedUser) {
    this.owners.assert(sessionId, user.id);
    return this.devOpsLabService.submitSolution(sessionId);
  }

  @Post('sessions/:sessionId/reset')
  async resetSession(@Param('sessionId') sessionId: string, @CurrentUser() user: AuthenticatedUser) {
    this.owners.assert(sessionId, user.id);
    await this.devOpsLabService.resetSession(sessionId);
    return { success: true, message: 'Linux environment reset successfully.' };
  }

  @Delete('sessions/:sessionId')
  async deleteSession(@Param('sessionId') sessionId: string, @CurrentUser() user: AuthenticatedUser) {
    this.owners.assert(sessionId, user.id);
    await this.devOpsLabService.deleteSession(sessionId);
    this.owners.release(sessionId);
    return { success: true, message: 'Linux lab session deleted successfully.' };
  }
}