import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Param,
  Post,
} from '@nestjs/common';

import {
  DevOpsLabService,
} from './devops-lab.service.js';

/* =========================================================
   REQUEST TYPES
========================================================= */

type CreateSessionBody = {
  problemSlug?: string;
};

type ExecuteCommandBody = {
  command?: string;
};

/* =========================================================
   DEVOPS LAB CONTROLLER

   Base API:

   /api/v1/devops-lab

   Routes:

   POST   /sessions
   POST   /sessions/:sessionId/execute
   POST   /sessions/:sessionId/check
   POST   /sessions/:sessionId/submit
   POST   /sessions/:sessionId/reset
   DELETE /sessions/:sessionId
========================================================= */

@Controller('devops-lab')
export class DevOpsLabController {
  constructor(
    private readonly devOpsLabService:
      DevOpsLabService,
  ) {}

  /* =======================================================
     CREATE LINUX LAB SESSION

     POST:
     /api/v1/devops-lab/sessions

     Body:

     {
       "problemSlug": "linux-create-directory"
     }
  ======================================================= */

  @Post('sessions')
  async createSession(
    @Body()
    body: CreateSessionBody,
  ) {
    const problemSlug =
      String(
        body?.problemSlug ?? '',
      ).trim();

    if (!problemSlug) {
      throw new BadRequestException(
        'Problem slug is required.',
      );
    }

    return this.devOpsLabService.createSession(
      problemSlug,
    );
  }

  /* =======================================================
     EXECUTE LINUX COMMAND

     POST:
     /api/v1/devops-lab/sessions/:sessionId/execute

     Body:

     {
       "command": "mkdir reports"
     }

     This REST endpoint remains available for testing and
     manual API verification.

     The browser terminal uses the persistent WebSocket
     shell instead.
  ======================================================= */

  @Post(
    'sessions/:sessionId/execute',
  )
  async executeCommand(
    @Param('sessionId')
    sessionId: string,

    @Body()
    body: ExecuteCommandBody,
  ) {
    const command =
      String(
        body?.command ?? '',
      );

    if (!command.trim()) {
      throw new BadRequestException(
        'Command is required.',
      );
    }

    return this.devOpsLabService.executeCommand(
      sessionId,
      command,
    );
  }

  /* =======================================================
     CHECK SOLUTION

     POST:
     /api/v1/devops-lab/sessions/:sessionId/check

     Practice validation.

     For:

     linux-create-directory

     this checks whether:

     /workspace/reports

     exists inside the learner's current Docker container.

     This provides quick learner feedback without creating
     the final submission result.
  ======================================================= */

  @Post(
    'sessions/:sessionId/check',
  )
  async checkSolution(
    @Param('sessionId')
    sessionId: string,
  ) {
    return this.devOpsLabService.checkSolution(
      sessionId,
    );
  }

  /* =======================================================
     SUBMIT SOLUTION

     POST:
     /api/v1/devops-lab/sessions/:sessionId/submit

     No request body is required.

     Unlike programming-language submissions, Linux
     submissions are graded against the CURRENT STATE of
     the learner's Docker environment.

     Example:

       mkdir reports

     creates:

       /workspace/reports

     The submission service then executes the hidden
     server-side validation tests against that same
     container.

     Example response:

     {
       "passed": true,
       "status": "Accepted",
       "score": 100,
       "passedTests": 3,
       "totalTests": 3,
       "message": "All hidden test cases passed.",
       "tests": [
         {
           "testNumber": 1,
           "name": "Reports directory exists",
           "passed": true
         }
       ]
     }

     Hidden validation commands are never returned to
     the frontend.
  ======================================================= */

  @Post(
    'sessions/:sessionId/submit',
  )
  async submitSolution(
    @Param('sessionId')
    sessionId: string,
  ) {
    return this.devOpsLabService.submitSolution(
      sessionId,
    );
  }

  /* =======================================================
     RESET ENVIRONMENT

     POST:
     /api/v1/devops-lab/sessions/:sessionId/reset

     Removes learner-created files/directories from:

     /workspace

     while keeping the Docker session alive.

     The WebSocket gateway can then start a fresh
     interactive shell.
  ======================================================= */

  @Post(
    'sessions/:sessionId/reset',
  )
  async resetSession(
    @Param('sessionId')
    sessionId: string,
  ) {
    await this.devOpsLabService.resetSession(
      sessionId,
    );

    return {
      success: true,

      message:
        'Linux environment reset successfully.',
    };
  }

  /* =======================================================
     DELETE SESSION

     DELETE:
     /api/v1/devops-lab/sessions/:sessionId

     Stops the persistent interactive shell and removes
     the learner's Docker container.
  ======================================================= */

  @Delete(
    'sessions/:sessionId',
  )
  async deleteSession(
    @Param('sessionId')
    sessionId: string,
  ) {
    await this.devOpsLabService.deleteSession(
      sessionId,
    );

    return {
      success: true,

      message:
        'Linux lab session deleted successfully.',
    };
  }
}