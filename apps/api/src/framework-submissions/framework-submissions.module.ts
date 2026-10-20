import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module.js';
import { LearnerModule } from '../learner/learner.module.js';
import { FrameworkSubmissionsController } from './framework-submissions.controller.js';
import { FrameworkSubmissionsService } from './framework-submissions.service.js';

@Module({
  imports: [AuthModule, LearnerModule],
  controllers: [FrameworkSubmissionsController],
  providers: [FrameworkSubmissionsService],
  exports: [FrameworkSubmissionsService],
})
export class FrameworkSubmissionsModule {}