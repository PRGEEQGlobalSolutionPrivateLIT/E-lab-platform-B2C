import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';

import { CurrentUser, type AuthenticatedUser } from '../auth/current-user.decorator.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { LabOwnersService } from '../labs/lab-owners.service.js';
import { DatabaseLabService } from './database-lab.service.js';
import { CreateDatabaseSessionDto } from './dto/create-database-session.dto.js';
import { ExecuteDatabaseQueryDto } from './dto/execute-database-query.dto.js';
import { SubmitDatabaseSolutionDto } from './dto/submit-database-solution.dto.js';

@Controller('database-lab')
@UseGuards(JwtAuthGuard)
export class DatabaseLabController {
  constructor(
    private readonly databaseLabService: DatabaseLabService,
    private readonly owners: LabOwnersService,
  ) {}

  @Post('sessions')
  async createSession(@Body() body: CreateDatabaseSessionDto, @CurrentUser() user: AuthenticatedUser) {
    return this.owners.claim(await this.databaseLabService.createSession(body), user.id);
  }

  @Get('sessions/:sessionId')
  async getSession(@Param('sessionId') sessionId: string, @CurrentUser() user: AuthenticatedUser) {
    this.owners.assert(sessionId, user.id);
    return this.databaseLabService.getSession(sessionId);
  }

  @Post('sessions/:sessionId/execute')
  async executeQuery(@Param('sessionId') sessionId: string, @Body() body: ExecuteDatabaseQueryDto, @CurrentUser() user: AuthenticatedUser) {
    this.owners.assert(sessionId, user.id);
    return this.databaseLabService.executeQuery(sessionId, body);
  }

  @Post('sessions/:sessionId/submit')
  async submitSolution(@Param('sessionId') sessionId: string, @Body() body: SubmitDatabaseSolutionDto, @CurrentUser() user: AuthenticatedUser) {
    this.owners.assert(sessionId, user.id);
    return this.databaseLabService.submitSolution(sessionId, body);
  }

  @Get('sessions/:sessionId/schema')
  async getSchema(@Param('sessionId') sessionId: string, @CurrentUser() user: AuthenticatedUser) {
    this.owners.assert(sessionId, user.id);
    return this.databaseLabService.getSchema(sessionId);
  }

  @Delete('sessions/:sessionId')
  async closeSession(@Param('sessionId') sessionId: string, @CurrentUser() user: AuthenticatedUser) {
    this.owners.assert(sessionId, user.id);
    const result = await this.databaseLabService.closeSession(sessionId);
    this.owners.release(sessionId);
    return result;
  }
}