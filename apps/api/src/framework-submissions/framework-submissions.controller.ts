import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { CurrentUser, type AuthenticatedUser } from '../auth/current-user.decorator.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { FrameworkSubmissionsService } from './framework-submissions.service.js';
import type { FrameworkSubmissionRequest } from './framework-submissions.service.js';

@Controller('framework-submissions')
@UseGuards(JwtAuthGuard)
export class FrameworkSubmissionsController {
  constructor(private readonly frameworkSubmissionsService: FrameworkSubmissionsService) {}

  @Post()
  submit(@Body() body: FrameworkSubmissionRequest, @CurrentUser() user?: AuthenticatedUser) {
    return this.frameworkSubmissionsService.submit(body, user?.id ?? null);
  }
}