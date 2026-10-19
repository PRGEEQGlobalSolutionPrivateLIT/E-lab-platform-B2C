import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import {
  FrameworkExecutionsService,
} from './framework-executions.service.js';

import type {
  FrameworkExecutionRequest,
} from './framework-executions.service.js';

/* =========================================================
   FRAMEWORK EXECUTIONS CONTROLLER
========================================================= */

@Controller('framework-executions')
export class FrameworkExecutionsController {
  constructor(
    private readonly frameworkExecutionsService:
      FrameworkExecutionsService,
  ) {}

  /* =======================================================
     RUN FRAMEWORK

     POST /api/v1/framework-executions/run

     Supported currently:
     - Express
     - React
  ======================================================= */

  @Post('run')
  run(
    @Body()
    body:
      FrameworkExecutionRequest,
  ) {
    return this
      .frameworkExecutionsService
      .run(
        body,
      );
  }
}