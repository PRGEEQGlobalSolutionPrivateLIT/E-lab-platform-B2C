import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { FrameworkExecutionsService } from './framework-executions.service.js';
import type { FrameworkExecutionRequest } from './framework-executions.service.js';

@Controller('framework-executions')
@UseGuards(JwtAuthGuard)
export class FrameworkExecutionsController {
  constructor(private readonly frameworkExecutionsService: FrameworkExecutionsService) {}

  @Post('run')
  run(@Body() body: FrameworkExecutionRequest) {
    return this.frameworkExecutionsService.run(body);
  }
}