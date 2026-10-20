import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module.js';
import { LabChecksService } from '../labs/lab-checks.service.js';
import { LabOwnersService } from '../labs/lab-owners.service.js';
import { LabSocketGuard } from '../labs/lab-socket.guard.js';
import { DevOpsLabController } from './devops-lab.controller.js';
import { DevOpsLabGateway } from './devops-lab.gateway.js';
import { DevOpsLabService } from './devops-lab.service.js';

@Module({
  imports: [AuthModule],
  controllers: [DevOpsLabController],
  providers: [DevOpsLabService, DevOpsLabGateway, LabOwnersService, LabSocketGuard, LabChecksService],
  exports: [DevOpsLabService],
})
export class DevOpsLabModule {}