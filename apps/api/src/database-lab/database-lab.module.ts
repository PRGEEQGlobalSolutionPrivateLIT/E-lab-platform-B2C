import {
  Module,
} from '@nestjs/common';

import {
  DatabaseLabController,
} from './database-lab.controller.js';

import {
  DatabaseLabService,
} from './database-lab.service.js';

/* =========================================================
   SANDBOX SERVICES
========================================================= */

import {
  PostgreSqlSandboxService,
} from './sandbox/postgresql-sandbox.service.js';

import {
  MysqlSandboxService,
} from './sandbox/mysql-sandbox.service.js';

import {
  SqlServerSandboxService,
} from './sandbox/sqlserver-sandbox.service.js';

import {
  MongoDbSandboxService,
} from './sandbox/mongodb-sandbox.service.js';

import {
  RedisSandboxService,
} from './sandbox/redis-sandbox.service.js';

/* =========================================================
   VALIDATOR SERVICES
========================================================= */

import {
  PostgreSqlValidatorService,
} from './validation/postgresql-validator.service.js';

import {
  MysqlValidatorService,
} from './validation/mysql-validator.service.js';

import {
  SqlServerValidatorService,
} from './validation/sqlserver-validator.service.js';

import {
  MongoDbValidatorService,
} from './validation/mongodb-validator.service.js';

import {
  RedisValidatorService,
} from './validation/redis-validator.service.js';

/* =========================================================
   DATABASE LAB MODULE

   PostgreSQL
      ↓
   PostgreSqlSandboxService
      ↓
   PostgreSqlValidatorService

   MySQL
      ↓
   MysqlSandboxService
      ↓
   MysqlValidatorService

   SQL Server
      ↓
   SqlServerSandboxService
      ↓
   SqlServerValidatorService

   MongoDB
      ↓
   MongoDbSandboxService
      ↓
   MongoDbValidatorService

   Redis
      ↓
   RedisSandboxService
      ↓
   RedisValidatorService
========================================================= */

@Module({
  /* =======================================================
     CONTROLLER
  ======================================================= */

  controllers: [
    DatabaseLabController,
  ],

  /* =======================================================
     PROVIDERS
  ======================================================= */

  providers: [
    /* -----------------------------------------------------
       CORE DATABASE LAB SERVICE
    ----------------------------------------------------- */

    DatabaseLabService,

    /* -----------------------------------------------------
       POSTGRESQL
    ----------------------------------------------------- */

    PostgreSqlSandboxService,

    PostgreSqlValidatorService,

    /* -----------------------------------------------------
       MYSQL
    ----------------------------------------------------- */

    MysqlSandboxService,

    MysqlValidatorService,

    /* -----------------------------------------------------
       SQL SERVER
    ----------------------------------------------------- */

    SqlServerSandboxService,

    SqlServerValidatorService,

    /* -----------------------------------------------------
       MONGODB
    ----------------------------------------------------- */

    MongoDbSandboxService,

    MongoDbValidatorService,

    /* -----------------------------------------------------
       REDIS
    ----------------------------------------------------- */

    RedisSandboxService,

    RedisValidatorService,
  ],

  /* =======================================================
     EXPORTS

     Export database services so they can later be used by:

     - assessment module
     - challenge module
     - project module
     - scheduled sandbox cleanup
  ======================================================= */

  exports: [
    /* -----------------------------------------------------
       CORE DATABASE LAB SERVICE
    ----------------------------------------------------- */

    DatabaseLabService,

    /* -----------------------------------------------------
       POSTGRESQL
    ----------------------------------------------------- */

    PostgreSqlSandboxService,

    PostgreSqlValidatorService,

    /* -----------------------------------------------------
       MYSQL
    ----------------------------------------------------- */

    MysqlSandboxService,

    MysqlValidatorService,

    /* -----------------------------------------------------
       SQL SERVER
    ----------------------------------------------------- */

    SqlServerSandboxService,

    SqlServerValidatorService,

    /* -----------------------------------------------------
       MONGODB
    ----------------------------------------------------- */

    MongoDbSandboxService,

    MongoDbValidatorService,

    /* -----------------------------------------------------
       REDIS
    ----------------------------------------------------- */

    RedisSandboxService,

    RedisValidatorService,
  ],
})
export class DatabaseLabModule {}