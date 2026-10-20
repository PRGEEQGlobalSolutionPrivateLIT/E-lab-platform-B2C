import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process';
import {

  ConnectedSocket,

  MessageBody,

  OnGatewayConnection,

  OnGatewayDisconnect,

  SubscribeMessage,

  WebSocketGateway,

  WebSocketServer,

} from '@nestjs/websockets';



import {

  Logger,

  UseGuards,

} from '@nestjs/common';

import { LabSocketGuard } from '../labs/lab-socket.guard.js';



import type {

  Server,

  Socket,

} from 'socket.io';



import {

  DevOpsLabService,

} from './devops-lab.service.js';



/* =========================================================

   TYPES

========================================================= */



type TerminalJoinPayload = {

  sessionId?: string;

};



type TerminalCommandPayload = {

  sessionId?: string;

  command?: string;

};



type TerminalSessionPayload = {

  sessionId?: string;

};



/* =========================================================

   DEVOPS TERMINAL GATEWAY

========================================================= */



@WebSocketGateway({
  namespace: '/devops-terminal',
  cors: {
    origin: [
      ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL.replace(/\/+$/, '')] : []),
      'http://localhost:3000',
      'http://127.0.0.1:3000',
    ],
    credentials: true,
  },
})
@UseGuards(LabSocketGuard)
export class DevOpsLabGateway

  implements

    OnGatewayConnection,

    OnGatewayDisconnect

{

  @WebSocketServer()

  server!: Server;



  private readonly logger =

    new Logger(

      DevOpsLabGateway.name,

    );



  /*

   * Track which Linux session belongs to each

   * connected browser socket.

   */

  private readonly pythonProcesses = new Map<string, ChildProcessWithoutNullStreams>();

  private readonly clientSessions =

    new Map<

      string,

      string

    >();



  constructor(

    private readonly devOpsLabService:

      DevOpsLabService,

  ) {}



  /* =======================================================

     CLIENT CONNECTED

  ======================================================= */



  handleConnection(

    client: Socket,

  ): void {

    this.logger.log(

      `Terminal client connected: ${client.id}`,

    );

  }



  /* =======================================================

     CLIENT DISCONNECTED

  ======================================================= */



  handleDisconnect(

    client: Socket,

  ): void {

    const sessionId =

      this.clientSessions.get(

        client.id,

      );



    /*

     * Stop only the interactive docker exec shell.

     *

     * The Docker lab container itself is deleted by the

     * existing DELETE session endpoint when the workspace

     * component is unmounted.

     */

    if (sessionId) {

      this.stopPythonProcess(sessionId);

      this.devOpsLabService

        .stopInteractiveShell(

          sessionId,

        );



      this.clientSessions.delete(

        client.id,

      );

    }



    this.logger.log(

      `Terminal client disconnected: ${client.id}`,

    );

  }



  /* =======================================================

     JOIN TERMINAL SESSION



     Browser:

       terminal:join

           ↓

     Validate session

           ↓

     Start persistent docker exec -i sh

           ↓

     Stream stdout/stderr back to xterm

  ======================================================= */



  @SubscribeMessage(

    'terminal:join',

  )

  handleJoin(

    @ConnectedSocket()

    client: Socket,



    @MessageBody()

    payload:

      TerminalJoinPayload,

  ): void {

    const sessionId =

      String(

        payload?.sessionId ??

          '',

      ).trim();



    if (!sessionId) {

      client.emit(

        'terminal:error',

        {

          message:

            'Session ID is required.',

        },

      );



      return;

    }



    const session =

      this.devOpsLabService

        .getSession(

          sessionId,

        );



    if (!session) {

      client.emit(

        'terminal:error',

        {

          message:

            'Lab session was not found.',

        },

      );



      return;

    }



    /*

     * If this browser was previously attached to another

     * Linux shell, detach it first.

     */

    const previousSessionId =

      this.clientSessions.get(

        client.id,

      );



    if (

      previousSessionId &&

      previousSessionId !==

        sessionId

    ) {

      this.devOpsLabService

        .stopInteractiveShell(

          previousSessionId,

        );

    }



    this.clientSessions.set(

      client.id,

      sessionId,

    );



    client.join(

      sessionId,

    );



    try {

      /*

       * Start one persistent shell for this learner.

       *

       * stdout and stderr are streamed directly to

       * this browser.

       */

      this.devOpsLabService

        .startInteractiveShell(

          sessionId,



          /* ===============================================

             STDOUT

          =============================================== */



          (

            data,

          ) => {

            client.emit(

              'terminal:stream',

              {

                data,

              },

            );

          },



          /* ===============================================

             STDERR

          =============================================== */



          (

            data,

          ) => {

            client.emit(

              'terminal:stream',

              {

                data,

              },

            );

          },



          /* ===============================================

             SHELL EXIT

          =============================================== */



          (

            exitCode,

          ) => {

            client.emit(

              'terminal:shell-exit',

              {

                exitCode,

              },

            );

          },

        );



      client.emit(

        'terminal:ready',

        {

          sessionId,



          workspacePath:

            '/workspace',



          shell:

            'sh',

        },

      );



      this.logger.log(

        `Terminal attached to Linux session: ${sessionId}`,

      );

    } catch (error) {

      const message =

        error instanceof Error

          ? error.message

          : 'Unable to start Linux terminal.';



      client.emit(

        'terminal:error',

        {

          message,

        },

      );

    }

  }



  /* =======================================================

     EXECUTE COMMAND



     IMPORTANT:



     This no longer calls:



       executeCommand()



     because that creates a new shell for every command.



     Instead the command is written into the SAME

     persistent shell started during terminal:join.

  ======================================================= */



  @SubscribeMessage(

    'terminal:command',

  )

  handleCommand(

    @ConnectedSocket()

    client: Socket,



    @MessageBody()

    payload:

      TerminalCommandPayload,

  ): void {

    const sessionId =

      String(

        payload?.sessionId ??

          '',

      ).trim();



    const command =

      String(

        payload?.command ??

          '',

      );



    if (!sessionId) {

      client.emit(

        'terminal:error',

        {

          message:

            'Session ID is required.',

        },

      );



      return;

    }



    const session =

      this.devOpsLabService

        .getSession(

          sessionId,

        );



    if (!session) {

      client.emit(

        'terminal:error',

        {

          message:

            'Lab session was not found.',

        },

      );



      return;

    }



    const attachedSessionId =

      this.clientSessions.get(

        client.id,

      );



    if (

      attachedSessionId !==

      sessionId

    ) {

      client.emit(

        'terminal:error',

        {

          message:

            'Terminal is not attached to this session.',

        },

      );



      return;

    }



    if (

      !command.trim()

    ) {

      client.emit(

        'terminal:command-complete',

        {

          success: true,

        },

      );



      return;

    }



    if (session.problemSlug.startsWith('python-security-') &&
        /^python3?\s+(?:\/workspace\/)?main\.py\s*$/.test(command.trim())) {
      this.startPythonProcess(client, sessionId, session.containerName);
      return;
    }

    try {

      /*

       * Write into the SAME persistent shell.

       */

      this.devOpsLabService

        .executeInteractiveCommand(

          sessionId,

          command,

        );



      /*

       * Add a marker command after the learner command.

       *

       * This lets the frontend know when the shell has

       * completed the command and also gives us the

       * current working directory.

       *

       * Example:

       *

       *   cd reports

       *   printf ...

       *

       * returns:

       *

       *   __ELAB_COMMAND_DONE__:0:/workspace/reports

       */

      this.devOpsLabService

        .writeToInteractiveShell(

          sessionId,

          [

            '__elab_exit_code=$?',

            'printf \"\\n__ELAB_COMMAND_DONE__:%s:%s\\n\" \"$__elab_exit_code\" \"$PWD\"',

            '',

          ].join(

            '\n',

          ),

        );

    } catch (error) {

      const message =

        error instanceof Error

          ? error.message

          : 'Unable to execute Linux command.';



      client.emit(

        'terminal:error',

        {

          message,

        },

      );

    }

  }



  /* =======================================================

     RAW TERMINAL INPUT



     Reserved for the next frontend step.



     xterm can eventually send keystrokes directly through:



       terminal:input



     This allows us to move from command-per-Enter input

     to fully interactive terminal input.

  ======================================================= */



  @SubscribeMessage(

    'terminal:input',

  )

  handleInput(

    @ConnectedSocket()

    client: Socket,



    @MessageBody()

    payload: {

      sessionId?: string;

      data?: string;

    },

  ): void {

    const sessionId =

      String(

        payload?.sessionId ??

          '',

      ).trim();



    const data =

      String(

        payload?.data ??

          '',

      );



    if (

      !sessionId ||

      !data

    ) {

      return;

    }



    const attachedSessionId =

      this.clientSessions.get(

        client.id,

      );



    if (

      attachedSessionId !==

      sessionId

    ) {

      client.emit(

        'terminal:error',

        {

          message:

            'Terminal is not attached to this session.',

        },

      );



      return;

    }



    const pythonProcess = this.pythonProcesses.get(sessionId);
    if (pythonProcess) {
      if (data === '\x03') {
        this.stopPythonProcess(sessionId);
      } else if (pythonProcess.stdin.writable) {
        pythonProcess.stdin.write(data === '\r' ? '\n' : data);
      }
      return;
    }

    try {

      this.devOpsLabService

        .writeToInteractiveShell(

          sessionId,

          data,

        );

    } catch (error) {

      const message =

        error instanceof Error

          ? error.message

          : 'Unable to write to Linux terminal.';



      client.emit(

        'terminal:error',

        {

          message,

        },

      );

    }

  }



  /* =======================================================

     CHECK SOLUTION

  ======================================================= */



  @SubscribeMessage(

    'terminal:check',

  )

  async handleCheck(

    @ConnectedSocket()

    client: Socket,



    @MessageBody()

    payload:

      TerminalSessionPayload,

  ): Promise<void> {

    const sessionId =

      String(

        payload?.sessionId ??

          '',

      ).trim();



    if (!sessionId) {

      client.emit(

        'terminal:error',

        {

          message:

            'Session ID is required.',

        },

      );



      return;

    }



    // Only the browser socket attached to this session may operate on it.
    if (this.clientSessions.get(client.id) !== sessionId) {
      client.emit('terminal:error', {
        message: 'Terminal is not attached to this session.',
      });
      return;
    }

    try {

      const result =

        await this.devOpsLabService

          .checkSolution(

            sessionId,

          );



      client.emit(

        'terminal:check-result',

        result,

      );

    } catch (error) {

      const message =

        error instanceof Error

          ? error.message

          : 'Unable to check solution.';



      client.emit(

        'terminal:error',

        {

          message,

        },

      );

    }

  }



  /* =======================================================

     RESET ENVIRONMENT

  ======================================================= */



  @SubscribeMessage(

    'terminal:reset',

  )

  async handleReset(

    @ConnectedSocket()

    client: Socket,



    @MessageBody()

    payload:

      TerminalSessionPayload,

  ): Promise<void> {

    const sessionId =

      String(

        payload?.sessionId ??

          '',

      ).trim();



    if (!sessionId) {

      client.emit(

        'terminal:error',

        {

          message:

            'Session ID is required.',

        },

      );



      return;

    }



    // Only the browser socket attached to this session may operate on it.
    if (this.clientSessions.get(client.id) !== sessionId) {
      client.emit('terminal:error', {
        message: 'Terminal is not attached to this session.',
      });
      return;
    }

    try {

      /*

       * resetSession() stops the old persistent shell

       * before cleaning /workspace.

       */

      await this.devOpsLabService

        .resetSession(

          sessionId,

        );



      /*

       * Start a fresh persistent shell after reset.

       */

      this.devOpsLabService

        .startInteractiveShell(

          sessionId,



          (

            data,

          ) => {

            client.emit(

              'terminal:stream',

              {

                data,

              },

            );

          },



          (

            data,

          ) => {

            client.emit(

              'terminal:stream',

              {

                data,

              },

            );

          },



          (

            exitCode,

          ) => {

            client.emit(

              'terminal:shell-exit',

              {

                exitCode,

              },

            );

          },

        );



      client.emit(

        'terminal:reset-complete',

        {

          success: true,



          message:

            'Linux environment reset successfully.',



          workspacePath:

            '/workspace',



          shell:

            'sh',

        },

      );



      this.logger.log(

        `Linux terminal reset: ${sessionId}`,

      );

    } catch (error) {

      const message =

        error instanceof Error

          ? error.message

          : 'Unable to reset Linux environment.';



      client.emit(

        'terminal:error',

        {

          message,

        },

      );

    }

  }



  /* =======================================================

     STOP TERMINAL



     Optional explicit cleanup event from frontend.

  ======================================================= */



  @SubscribeMessage(

    'terminal:stop',

  )

  handleStop(

    @ConnectedSocket()

    client: Socket,



    @MessageBody()

    payload:

      TerminalSessionPayload,

  ): void {

    const sessionId =

      String(

        payload?.sessionId ??

          '',

      ).trim();



    if (!sessionId) {

      return;

    }



    const attachedSessionId =

      this.clientSessions.get(

        client.id,

      );



    if (

      attachedSessionId !==

      sessionId

    ) {

      return;

    }



    this.devOpsLabService

      .stopInteractiveShell(

        sessionId,

      );



    this.clientSessions.delete(

      client.id,

    );



    client.leave(

      sessionId,

    );



    client.emit(

      'terminal:stopped',

      {

        success: true,

      },

    );

  }

  private stopPythonProcess(sessionId: string): void {
    const child = this.pythonProcesses.get(sessionId);
    if (!child) return;
    this.pythonProcesses.delete(sessionId);
    try { child.stdin.end(); } catch { /* already closed */ }
    try { child.kill(); } catch { /* already closed */ }
  }

  private startPythonProcess(client: Socket, sessionId: string, containerName: string): void {
    if (this.pythonProcesses.has(sessionId)) {
      client.emit('terminal:error', { message: 'A Python process is already running.' });
      return;
    }
    const child = spawn('docker', [
      'exec', '-i', '--workdir', '/workspace', containerName,
      'python3', '-u', '/workspace/main.py',
    ], { shell: false, windowsHide: true, stdio: ['pipe', 'pipe', 'pipe'] });
    this.pythonProcesses.set(sessionId, child);
    child.stdout.on('data', (chunk: Buffer) => {
      client.emit('terminal:stream', { data: chunk.toString('utf8') });
    });
    child.stderr.on('data', (chunk: Buffer) => {
      client.emit('terminal:stream', { data: chunk.toString('utf8') });
    });
    child.on('error', (error: Error) => {
      client.emit('terminal:stream', { data: `\n${error.message}\n` });
    });
    child.on('close', (code: number | null) => {
      if (this.pythonProcesses.get(sessionId) === child) {
        this.pythonProcesses.delete(sessionId);
      }
      client.emit('terminal:stream', {
        data: `\n__ELAB_COMMAND_DONE__:${code ?? 1}:/workspace\n`,
      });
    });
  }

}