import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { CurrentUser, type AuthenticatedUser } from '../auth/current-user.decorator.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { SubmissionsService } from './submissions.service.js';

type SubmissionRequest = Parameters<SubmissionsService['submit']>[0];

@Controller('submissions')
@UseGuards(JwtAuthGuard)
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  submit(@Body() body: SubmissionRequest, @CurrentUser() user?: AuthenticatedUser) {
    return this.submissionsService.submit(body, user?.id ?? null);
  }
}