import {
  Module,
} from '@nestjs/common';

import {
  DevOpsLabController,
} from './devops-lab.controller.js';

import {
  DevOpsLabGateway,
} from './devops-lab.gateway.js';

import {
  DevOpsLabService,
} from './devops-lab.service.js';

@Module({
  controllers: [
    DevOpsLabController,
  ],

  providers: [
    DevOpsLabService,
    DevOpsLabGateway,
  ],

  exports: [
    DevOpsLabService,
  ],
})
export class DevOpsLabModule {}