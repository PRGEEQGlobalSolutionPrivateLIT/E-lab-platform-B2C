import { Module } from '@nestjs/common';

import { AdminModule } from './admin/admin.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ExecutionsModule } from './executions/executions.module.js';
import { LearnerModule } from './learner/learner.module.js';
import { PracticeModule } from './practice/practice.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { SubmissionsModule } from './submissions/submissions.module.js';
import { FrameworkSubmissionsModule } from './framework-submissions/framework-submissions.module.js';
import { FrameworkExecutionsModule } from './framework-executions/framework-executions.module.js';
import { DatabaseLabModule } from './database-lab/database-lab.module.js';
import { DevOpsLabModule } from './devops-lab/devops-lab.module.js';
import { PowerBILabModule } from './power-bi-lab/power-bi-lab.module.js';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    PracticeModule,
    ExecutionsModule,
    SubmissionsModule,
    FrameworkExecutionsModule,
    FrameworkSubmissionsModule,
    DatabaseLabModule,
    DevOpsLabModule,
    PowerBILabModule,
    LearnerModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}