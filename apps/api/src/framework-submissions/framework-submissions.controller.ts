import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import {
  FrameworkSubmissionsService,
} from './framework-submissions.service.js';

import type {
  FrameworkSubmissionRequest,
} from './framework-submissions.service.js';

/* =========================================================
   FRAMEWORK SUBMISSIONS CONTROLLER
========================================================= */

@Controller(
  'framework-submissions',
)
export class FrameworkSubmissionsController {
  constructor(
    private readonly frameworkSubmissionsService:
      FrameworkSubmissionsService,
  ) {}

  /* =======================================================
     SUBMIT

     POST /api/v1/framework-submissions
  ======================================================= */

  @Post()
  submit(
    @Body()
    body:
      FrameworkSubmissionRequest,
  ) {
    return this
      .frameworkSubmissionsService
      .submit(
        body,
      );
  }
}