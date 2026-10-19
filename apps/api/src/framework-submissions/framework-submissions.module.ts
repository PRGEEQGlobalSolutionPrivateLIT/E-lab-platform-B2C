import {
  Module,
} from '@nestjs/common';

import {
  FrameworkSubmissionsController,
} from './framework-submissions.controller.js';

import {
  FrameworkSubmissionsService,
} from './framework-submissions.service.js';

/* =========================================================
   FRAMEWORK SUBMISSIONS MODULE
========================================================= */

@Module({
  controllers: [
    FrameworkSubmissionsController,
  ],

  providers: [
    FrameworkSubmissionsService,
  ],

  exports: [
    FrameworkSubmissionsService,
  ],
})
export class FrameworkSubmissionsModule {}