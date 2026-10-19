import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import {
  DatabaseLabService,
} from './database-lab.service.js';

import {
  CreateDatabaseSessionDto,
} from './dto/create-database-session.dto.js';

import {
  ExecuteDatabaseQueryDto,
} from './dto/execute-database-query.dto.js';

import {
  SubmitDatabaseSolutionDto,
} from './dto/submit-database-solution.dto.js';

/* =========================================================
   DATABASE LAB CONTROLLER

   Base route:

   /api/v1/database-lab
========================================================= */

@Controller(
  'database-lab',
)
export class DatabaseLabController {
  constructor(
    private readonly databaseLabService:
      DatabaseLabService,
  ) {}

  /* =======================================================
     CREATE DATABASE SESSION

     POST
     /api/v1/database-lab/sessions
  ======================================================= */

  @Post(
    'sessions',
  )
  async createSession(
    @Body()
    body:
      CreateDatabaseSessionDto,
  ) {
    return this.databaseLabService.createSession(
      body,
    );
  }

  /* =======================================================
     GET DATABASE SESSION

     GET
     /api/v1/database-lab/sessions/:sessionId
  ======================================================= */

  @Get(
    'sessions/:sessionId',
  )
  async getSession(
    @Param(
      'sessionId',
    )
    sessionId: string,
  ) {
    return this.databaseLabService.getSession(
      sessionId,
    );
  }

  /* =======================================================
     EXECUTE SQL

     Used by:
     Run Query

     POST
     /api/v1/database-lab/sessions/:sessionId/execute
  ======================================================= */

  @Post(
    'sessions/:sessionId/execute',
  )
  async executeQuery(
    @Param(
      'sessionId',
    )
    sessionId: string,

    @Body()
    body:
      ExecuteDatabaseQueryDto,
  ) {
    return this.databaseLabService.executeQuery(
      sessionId,
      body,
    );
  }

  /* =======================================================
     SUBMIT DATABASE SOLUTION

     Used by:
     Practice -> Submit

     POST
     /api/v1/database-lab/sessions/:sessionId/submit

     Flow:

     Browser
        ↓
     DatabaseLabController
        ↓
     DatabaseLabService
        ↓
     PostgreSQL validator
        ↓
     Hidden database tests
        ↓
     Accepted / Incorrect
  ======================================================= */

  @Post(
    'sessions/:sessionId/submit',
  )
  async submitSolution(
    @Param(
      'sessionId',
    )
    sessionId: string,

    @Body()
    body:
      SubmitDatabaseSolutionDto,
  ) {
    return this.databaseLabService.submitSolution(
      sessionId,
      body,
    );
  }

  /* =======================================================
     DATABASE SCHEMA

     GET
     /api/v1/database-lab/sessions/:sessionId/schema

     Returns:
     - tables
     - views
     - indexes
  ======================================================= */

  @Get(
    'sessions/:sessionId/schema',
  )
  async getSchema(
    @Param(
      'sessionId',
    )
    sessionId: string,
  ) {
    return this.databaseLabService.getSchema(
      sessionId,
    );
  }

  /* =======================================================
     CLOSE DATABASE SESSION

     DELETE
     /api/v1/database-lab/sessions/:sessionId

     Temporary sandbox/container should be destroyed.
  ======================================================= */

  @Delete(
    'sessions/:sessionId',
  )
  async closeSession(
    @Param(
      'sessionId',
    )
    sessionId: string,
  ) {
    return this.databaseLabService.closeSession(
      sessionId,
    );
  }
}