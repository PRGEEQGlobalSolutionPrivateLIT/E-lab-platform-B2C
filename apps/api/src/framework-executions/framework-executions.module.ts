import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module.js';
import { FrameworkExecutionsController } from './framework-executions.controller.js';
import { FrameworkExecutionsService } from './framework-executions.service.js';

@Module({
  imports: [AuthModule],
  controllers: [FrameworkExecutionsController],
  providers: [FrameworkExecutionsService],
  exports: [FrameworkExecutionsService],
})
export class FrameworkExecutionsModule {}