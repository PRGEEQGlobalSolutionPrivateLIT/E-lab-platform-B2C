import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module.js';
import { LabChecksService } from '../labs/lab-checks.service.js';
import { LabOwnersService } from '../labs/lab-owners.service.js';
import { DatabaseLabController } from './database-lab.controller.js';
import { DatabaseLabService } from './database-lab.service.js';
import { MongoDbSandboxService } from './sandbox/mongodb-sandbox.service.js';
import { MysqlSandboxService } from './sandbox/mysql-sandbox.service.js';
import { PostgreSqlSandboxService } from './sandbox/postgresql-sandbox.service.js';
import { RedisSandboxService } from './sandbox/redis-sandbox.service.js';
import { SqlServerSandboxService } from './sandbox/sqlserver-sandbox.service.js';

@Module({
  imports: [AuthModule],
  controllers: [DatabaseLabController],
  providers: [
    LabOwnersService,
    LabChecksService,
    DatabaseLabService,
    PostgreSqlSandboxService,
    MysqlSandboxService,
    SqlServerSandboxService,
    MongoDbSandboxService,
    RedisSandboxService,
  ],
  exports: [DatabaseLabService, PostgreSqlSandboxService, MysqlSandboxService, SqlServerSandboxService, MongoDbSandboxService, RedisSandboxService],
})
export class DatabaseLabModule {}