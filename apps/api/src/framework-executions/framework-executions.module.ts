import {
  Module,
} from '@nestjs/common';

import {
  FrameworkExecutionsController,
} from './framework-executions.controller.js';

import {
  FrameworkExecutionsService,
} from './framework-executions.service.js';

/* =========================================================
   FRAMEWORK EXECUTIONS MODULE
========================================================= */

@Module({
  controllers: [
    FrameworkExecutionsController,
  ],

  providers: [
    FrameworkExecutionsService,
  ],

  exports: [
    FrameworkExecutionsService,
  ],
})
export class FrameworkExecutionsModule {}