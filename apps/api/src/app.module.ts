import {
  Module,
} from '@nestjs/common';

import {
  ExecutionsModule,
} from './executions/executions.module.js';

import {
  SubmissionsModule,
} from './submissions/submissions.module.js';

import {
  FrameworkSubmissionsModule,
} from './framework-submissions/framework-submissions.module.js';

import {
  FrameworkExecutionsModule,
} from './framework-executions/framework-executions.module.js';

import {
  DatabaseLabModule,
} from './database-lab/database-lab.module.js';

import {
  DevOpsLabModule,
} from './devops-lab/devops-lab.module.js';

@Module({
  imports: [
    ExecutionsModule,
    SubmissionsModule,
    FrameworkExecutionsModule,
    FrameworkSubmissionsModule,
    DatabaseLabModule,
    DevOpsLabModule,
  ],

  controllers: [],

  providers: [],
})
export class AppModule {}