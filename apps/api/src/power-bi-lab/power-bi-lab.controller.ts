import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { CurrentUser, type AuthenticatedUser } from '../auth/current-user.decorator.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { LabOwnersService } from '../labs/lab-owners.service.js';
import { CheckPowerBIDto } from './dto/check-power-bi.dto.js';
import { SavePowerBIProgressDto } from './dto/save-power-bi-progress.dto.js';
import { SubmitPowerBIDto } from './dto/submit-power-bi.dto.js';
import { PowerBILabService } from './power-bi-lab.service.js';

export class CreatePowerBIAttemptDto {
  @IsString()
  @IsNotEmpty()
  problemSlug!: string;

  @IsOptional()
  @IsString()
  userId?: string;
}

@Controller('power-bi-lab')
@UseGuards(JwtAuthGuard)
export class PowerBILabController {
  constructor(
    private readonly powerBILabService: PowerBILabService,
    private readonly owners: LabOwnersService,
  ) {}

  @Post('attempts')
  @HttpCode(HttpStatus.CREATED)
  async createAttempt(@Body() dto: CreatePowerBIAttemptDto, @CurrentUser() user: AuthenticatedUser) {
    const attempt = await this.powerBILabService.createAttempt({ problemSlug: dto.problemSlug, userId: user.id });
    return this.owners.claim(attempt, user.id);
  }

  @Get('attempts/:attemptId')
  getAttempt(@Param('attemptId') attemptId: string, @CurrentUser() user: AuthenticatedUser) {
    this.owners.assert(attemptId, user.id);
    return this.powerBILabService.getAttempt(attemptId);
  }

  @Post('attempts/:attemptId/check')
  @HttpCode(HttpStatus.OK)
  checkSolution(@Param('attemptId') attemptId: string, @Body() dto: CheckPowerBIDto, @CurrentUser() user: AuthenticatedUser) {
    this.owners.assert(attemptId, user.id);
    return this.powerBILabService.checkSolution(attemptId, dto);
  }

  @Post('attempts/:attemptId/save')
  @HttpCode(HttpStatus.OK)
  saveProgress(@Param('attemptId') attemptId: string, @Body() dto: SavePowerBIProgressDto, @CurrentUser() user: AuthenticatedUser) {
    this.owners.assert(attemptId, user.id);
    return this.powerBILabService.saveProgress(attemptId, dto);
  }

  @Post('attempts/:attemptId/reset')
  @HttpCode(HttpStatus.OK)
  resetAttempt(@Param('attemptId') attemptId: string, @CurrentUser() user: AuthenticatedUser) {
    this.owners.assert(attemptId, user.id);
    return this.powerBILabService.resetAttempt(attemptId);
  }

  @Post('attempts/:attemptId/submit')
  @HttpCode(HttpStatus.OK)
  submit(@Param('attemptId') attemptId: string, @Body() dto: SubmitPowerBIDto, @CurrentUser() user: AuthenticatedUser) {
    this.owners.assert(attemptId, user.id);
    return this.powerBILabService.submit(attemptId, dto);
  }
}