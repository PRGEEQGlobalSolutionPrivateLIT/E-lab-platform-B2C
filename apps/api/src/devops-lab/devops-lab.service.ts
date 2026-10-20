import {


  Injectable,


  Logger,


  NotFoundException,


} from '@nestjs/common';

import { evaluateLabChecks, type LabCheck, type LabRunResult } from '../labs/lab-checks.js';
import { LabChecksService } from '../labs/lab-checks.service.js';


import {


  randomUUID,


} from 'node:crypto';


import {


  spawn,


  type ChildProcessWithoutNullStreams,


} from 'node:child_process';


/* =========================================================


   TYPES


\\\========================================================= */


type DockerResult = {


  stdout: string;


  stderr: string;


  exitCode: number;


};


export type DevOpsLabSession = {


  sessionId: string;


  containerName: string;


  problemSlug: string;


  createdAt: number;


  lastActivityAt: number;


  executedCommands: string[];


};


type InteractiveShell = {


  sessionId: string;


  process: ChildProcessWithoutNullStreams;


};


export type CreateDevOpsLabSessionResult = {


  sessionId: string;


  problemSlug: string;


  workspacePath: string;


  shell: string;


};


export type DevOpsCommandResult = {


  stdout: string;


  stderr: string;


  exitCode: number;


};


export type DevOpsCheckResult = {


  passed: boolean;


  message: string;


};


/* =========================================================


   SUBMISSION TYPES


\\\========================================================= */


export type DevOpsSubmissionTestResult = {


  testNumber: number;


  name: string;


  passed: boolean;


};


export type DevOpsSubmissionResult = {


  passed: boolean;


  status:


    | 'Accepted'


    | 'Wrong Answer';


  score: number;


  passedTests: number;


  totalTests: number;


  message: string;


  tests: DevOpsSubmissionTestResult[];


};


type DevOpsHiddenTestCase = {


  name: string;


  command: string;


};


/* =========================================================


   DEVOPS LAB SERVICE


\\\========================================================= */


@Injectable()


export class DevOpsLabService {


  private readonly logger =


    new Logger(


      DevOpsLabService.name,


    );


  /*


   * Active learner Docker sessions.


   */


  private readonly sessions =


    new Map<


      string,


      DevOpsLabSession


    >();


  /*


   * Persistent interactive shell processes.


   *


   * One docker exec process is maintained for each


   * learner session.


   */


  private readonly shells =


    new Map<


      string,


      InteractiveShell


    >();


  /* =======================================================


     LINUX ENVIRONMENT


  ======================================================= */


  private readonly linuxImage =


    process.env


      .DEVOPS_LINUX_IMAGE ??


    'alpine:3.20';


  // Dedicated, prebuilt image for Cybersecurity > Linux Security.


  private readonly linuxSecurityImage =


    process.env.DEVOPS_LINUX_SECURITY_IMAGE ??


    'elab-judge-linux-security:latest';


  // Web Security uses its dedicated Python-based offline Docker image.


  private readonly webSecurityImage =


    process.env.DEVOPS_WEB_SECURITY_IMAGE ??


    'elab-web-security:latest';





  private readonly pythonSecurityImage =


    process.env.DEVOPS_PYTHON_SECURITY_IMAGE ??


    'elab-judge-python-security:latest';


  // Dedicated offline Network Security sandbox.


  private readonly networkSecurityImage =


    process.env.DEVOPS_NETWORK_SECURITY_IMAGE ??


    'elab-network-security:latest';


  // Dedicated offline Python sandbox for Penetration Testing exercises.
  // This image intentionally contains no live scanning or exploitation tools.
  private readonly penetrationTestingImage =
    process.env.DEVOPS_PENETRATION_TESTING_IMAGE ??
    'elab-penetration-testing:latest';

  // Shared Docker image for four Blockchain & Web3 stacks.
  private readonly blockchainImage =
    process.env.DEVOPS_BLOCKCHAIN_IMAGE ??
    'elab-judge-blockchain:latest';

  private readonly workspacePath =


    '/workspace';


  /* =======================================================


     HIDDEN SUBMISSION TEST CASES


     IMPORTANT:


     These commands remain on the API only.


     They must never be returned to the learner frontend.


  ======================================================= */


  constructor(private readonly labChecks: LabChecksService) {}

  async createSession(


    problemSlug: string,


  ): Promise<CreateDevOpsLabSessionResult> {


    const normalizedProblemSlug =


      String(


        problemSlug ?? '',


      ).trim();


    if (!normalizedProblemSlug) {


      throw new Error(


        'Problem slug is required.',


      );


    }


    const sessionId =


      randomUUID();


    const safeSessionId =


      sessionId.replace(


        /[^a-zA-Z0-9_-]/g,


        '',


      );


    const containerName =


      `elab-devops-${safeSessionId}`;


    const isLinuxSecurityProblem =


      normalizedProblemSlug.startsWith('linux-security-');


    const isWebSecurityProblem =


      normalizedProblemSlug.startsWith('web-security-');





    const isPythonSecurityProblem =


      normalizedProblemSlug.startsWith('python-security-');


    const isNetworkSecurityProblem =


      normalizedProblemSlug.startsWith('network-security-');


    const isPenetrationTestingProblem =
      normalizedProblemSlug.startsWith('penetration-testing-');

    // SOC & SIEM reuses the existing Python Security Docker image.
    const isSocSiemProblem =
      normalizedProblemSlug.startsWith('soc-siem-');

    const isDigitalForensicsProblem =
      normalizedProblemSlug.startsWith('digital-forensics-');

    // Cloud Security reuses the isolated Python Security Docker image.
    const isCloudSecurityProblem =
      normalizedProblemSlug.startsWith('cloud-security-');

    // DevSecOps uses the existing offline Python Security runtime.
    const isDevSecOpsProblem =
      normalizedProblemSlug.startsWith('devsecops-');

    const isIncidentResponseProblem =
      normalizedProblemSlug.startsWith('incident-response-');

    // Select Blockchain image by trusted server-side problem slug.
    const blockchainStackSlugs = [
      'ethereum-solidity',
      'web3-dapp-development',
      'smart-contract-security',
      'defi-tokenization',
    ] as const;
    const blockchainStackSlug = blockchainStackSlugs.find((slug) =>
      normalizedProblemSlug.toLowerCase().startsWith(`${slug}-`),
    );
    const isBlockchainProblem = Boolean(blockchainStackSlug);

    const isGitProblem =


      normalizedProblemSlug.startsWith(


        'git-',


      );


    const isDockerProblem =


      normalizedProblemSlug.startsWith(


        'docker-',


      );


    const isKubernetesProblem =


      normalizedProblemSlug.startsWith(


        'kubernetes-',


      );


    const isCiCdProblem =


      normalizedProblemSlug.startsWith(


        'cicd-',


      ) ||


      normalizedProblemSlug.startsWith(


        'ci-cd-',


      );


    const needsPackageInstall =


      isGitProblem ||


      isDockerProblem ||


      isKubernetesProblem;


    /*


     * Linux keeps the existing working configuration:


     *   alpine:3.20


     *   --network none


     *   /workspace


     *


     * Git uses the same Alpine image. Network access is available


     * only during startup so Git can be installed. Once Git is


     * ready, the container is disconnected from the bridge network.


     */


    const dockerArgs: string[] = [


      'run',


      '-d',


      '--name',


      containerName,


    ];


    if (!needsPackageInstall && !isLinuxSecurityProblem) {


      dockerArgs.push(


        '--network',


        'none',


      );


    }


    if (isPythonSecurityProblem || isWebSecurityProblem || isNetworkSecurityProblem || isPenetrationTestingProblem || isSocSiemProblem || isDigitalForensicsProblem || isCloudSecurityProblem || isDevSecOpsProblem || isIncidentResponseProblem || isBlockchainProblem) {


      dockerArgs.push(


        '--cap-drop', 'ALL',


        '--security-opt', 'no-new-privileges',


        '--user', 'learner',


      );


    }


    if (isLinuxSecurityProblem) {


      dockerArgs.push(


        '--network', 'none',


        '--cap-drop', 'ALL',


        '--security-opt', 'no-new-privileges',


        '--user', 'learner',


      );


    }


    dockerArgs.push(


      '--memory',


      isNetworkSecurityProblem || isWebSecurityProblem || isPenetrationTestingProblem || isSocSiemProblem || isDigitalForensicsProblem || isCloudSecurityProblem || isDevSecOpsProblem || isIncidentResponseProblem || isBlockchainProblem ? (isBlockchainProblem ? '1g' : '512m') : '256m',


      '--cpus',


      '0.50',


      '--pids-limit',


      '128',


      '--workdir',


      this.workspacePath,


       isBlockchainProblem
          ? this.blockchainImage
        : isDigitalForensicsProblem || isSocSiemProblem || isCloudSecurityProblem || isDevSecOpsProblem || isIncidentResponseProblem
          ? this.pythonSecurityImage
        : isPenetrationTestingProblem
        ? this.penetrationTestingImage
        : isNetworkSecurityProblem


        ? this.networkSecurityImage


        : isWebSecurityProblem


          ? this.webSecurityImage


          : isPythonSecurityProblem


          ? this.pythonSecurityImage


        : isLinuxSecurityProblem


          ? this.linuxSecurityImage


          : this.linuxImage,


               isDigitalForensicsProblem || isSocSiemProblem || isCloudSecurityProblem || isDevSecOpsProblem || isIncidentResponseProblem || isNetworkSecurityProblem || isWebSecurityProblem || isPythonSecurityProblem || isLinuxSecurityProblem || isBlockchainProblem ? 'bash' : 'sh',


      '-c',


             isDigitalForensicsProblem || isSocSiemProblem || isCloudSecurityProblem || isDevSecOpsProblem || isIncidentResponseProblem || isPenetrationTestingProblem || isNetworkSecurityProblem || isWebSecurityProblem || isPythonSecurityProblem || isBlockchainProblem ? 'tail -f /dev/null' :


      isGitProblem


        ? `apk add --no-cache git && mkdir -p ${this.workspacePath}/project && tail -f /dev/null`


        : isDockerProblem


          ? `apk add --no-cache docker-cli && mkdir -p ${this.workspacePath} && tail -f /dev/null`


          : isKubernetesProblem


            ? `apk add --no-cache kubectl && mkdir -p ${this.workspacePath} && tail -f /dev/null`


            : `mkdir -p ${this.workspacePath} && tail -f /dev/null`,


    );


    const result =


      await this.runDocker(


        dockerArgs,


        needsPackageInstall


          ? 60_000


          : 15_000,


      );


    if (


      result.exitCode !==


      0


    ) {


      this.logger.error(


        `Unable to create DevOps lab container: ${result.stderr}`,


      );


      throw new Error(


        'Unable to create DevOps lab environment.',


      );


    }


    if (needsPackageInstall) {


      const environmentReady =


        isGitProblem


          ? await this.waitForGitReady(containerName)


          : isDockerProblem


            ? await this.waitForDockerReady(containerName)


            : await this.waitForKubernetesReady(containerName);


      if (!environmentReady) {


        const logs =


          await this.runDocker(


            ['logs', containerName],


            15_000,


          );


        await this.runDocker(


          ['rm', '-f', containerName],


          15_000,


        );


        const environmentName =


          isGitProblem


            ? 'Git'


            : isDockerProblem


              ? 'Docker'


              : 'Kubernetes';


        this.logger.error(


          `Unable to prepare ${environmentName} lab container: ${logs.stderr || logs.stdout}`,


        );


        throw new Error(


          `Unable to prepare ${environmentName} lab environment.`,


        );


      }


      const disconnectResult =


        await this.runDocker(


          [


            'network',


            'disconnect',


            'bridge',


            containerName,


          ],


          15_000,


        );


      if (disconnectResult.exitCode !== 0) {


        await this.runDocker(


          ['rm', '-f', containerName],


          15_000,


        );


        throw new Error(


          disconnectResult.stderr ||


            'Unable to isolate DevOps lab environment.',


        );


      }


    }


    const now =


      Date.now();


    this.sessions.set(


      sessionId,


      {


        sessionId,


        containerName,


        problemSlug:


          normalizedProblemSlug,


        createdAt:


          now,


        lastActivityAt:


          now,


        executedCommands: [],


      },


    );


    this.logger.log(


      `${isBlockchainProblem ? 'Blockchain & Web3' : isIncidentResponseProblem ? 'Incident Response' : isDevSecOpsProblem ? 'DevSecOps' : isCloudSecurityProblem ? 'Cloud Security' : isDigitalForensicsProblem ? 'Digital Forensics' : isSocSiemProblem ? 'SOC & SIEM' : isPenetrationTestingProblem ? 'Penetration Testing' : isNetworkSecurityProblem ? 'Network Security' : isWebSecurityProblem ? 'Web Application Security' : isPythonSecurityProblem ? 'Python Security' : isLinuxSecurityProblem ? 'Linux Security' : isKubernetesProblem ? 'Kubernetes' : isDockerProblem ? 'Docker' : isGitProblem ? 'Git' : isCiCdProblem ? 'CI/CD' : 'Linux'} lab created: ${sessionId}`,


    );


    return {


      sessionId,


      problemSlug:


        normalizedProblemSlug,


      workspacePath:


        this.workspacePath,


      shell:


        isDigitalForensicsProblem || isSocSiemProblem || isCloudSecurityProblem || isDevSecOpsProblem || isIncidentResponseProblem || isNetworkSecurityProblem || isWebSecurityProblem || isPythonSecurityProblem || isLinuxSecurityProblem || isBlockchainProblem ? 'bash' : 'sh',


    };


  }


  private async waitForGitReady(


    containerName: string,


  ): Promise<boolean> {


    const startedAt =


      Date.now();


    while (


      Date.now() - startedAt <


      45_000


    ) {


      const inspectResult =


        await this.runDocker(


          [


            'inspect',


            '-f',


            '{{.State.Running}}',


            containerName,


          ],


          5_000,


        );


      if (


        inspectResult.exitCode !== 0 ||


        inspectResult.stdout.trim() !==


          'true'


      ) {


        return false;


      }


      const gitResult =


        await this.runDocker(


          [


            'exec',


            containerName,


            'sh',


            '-lc',


            'command -v git >/dev/null 2>&1 && test -d /workspace/project',


          ],


          5_000,


        );


      if (


        gitResult.exitCode ===


        0


      ) {


        return true;


      }


      await new Promise<void>(


        (resolve) => {


          setTimeout(


            resolve,


            500,


          );


        },


      );


    }


    return false;


  }


  private async waitForDockerReady(


    containerName: string,


  ): Promise<boolean> {


    const startedAt = Date.now();


    while (Date.now() - startedAt < 45_000) {


      const inspectResult =


        await this.runDocker(


          [


            'inspect',


            '-f',


            '{{.State.Running}}',


            containerName,


          ],


          5_000,


        );


      if (


        inspectResult.exitCode !== 0 ||


        inspectResult.stdout.trim() !== 'true'


      ) {


        return false;


      }


      const dockerResult =


        await this.runDocker(


          [


            'exec',


            containerName,


            'sh',


            '-lc',


            'command -v docker >/dev/null 2>&1 && docker --version >/dev/null 2>&1',


          ],


          5_000,


        );


      if (dockerResult.exitCode === 0) {


        return true;


      }


      await new Promise<void>((resolve) => {


        setTimeout(resolve, 500);


      });


    }


    return false;


  }


  private async waitForKubernetesReady(


    containerName: string,


  ): Promise<boolean> {


    const startedAt = Date.now();


    while (Date.now() - startedAt < 45_000) {


      const inspectResult =


        await this.runDocker(


          [


            'inspect',


            '-f',


            '{{.State.Running}}',


            containerName,


          ],


          5_000,


        );


      if (


        inspectResult.exitCode !== 0 ||


        inspectResult.stdout.trim() !== 'true'


      ) {


        return false;


      }


      const kubectlResult =


        await this.runDocker(


          [


            'exec',


            containerName,


            'sh',


            '-lc',


            'command -v kubectl >/dev/null 2>&1 && kubectl version --client >/dev/null 2>&1',


          ],


          5_000,


        );


      if (kubectlResult.exitCode === 0) {


        return true;


      }


      await new Promise<void>((resolve) => {


        setTimeout(resolve, 500);


      });


    }


    return false;


  }


  /* =======================================================


     START INTERACTIVE SHELL


     Starts ONE persistent:


       docker exec -i ...


     process for the learner session.


     Because the same shell remains alive:


       cd reports


       pwd


     correctly results in:


       /workspace/reports


  ======================================================= */


  startInteractiveShell(


    sessionId: string,


    onOutput: (


      data: string,


    ) => void,


    onError?: (


      data: string,


    ) => void,


    onExit?: (


      exitCode:


        number | null,


    ) => void,


  ): void {


    const session =


      this.getSessionOrThrow(


        sessionId,


      );


    /*


     * If this session already owns a shell, stop the old


     * process before starting another one.


     */


    this.stopInteractiveShell(


      sessionId,


    );


    session.lastActivityAt =


      Date.now();


    /*


     * -i keeps stdin open.


     *


     * We deliberately do NOT use -t here because Node's


     * child_process pipes are not a real host PTY.


     *


     * The shell remains persistent even without -t.


     */


    const child =


      spawn(


        'docker',


        [


          'exec',


          '-i',


          '--workdir',


          this.workspacePath,


          session.containerName,


          this.getSessionShell(session),


        ],


        {


          windowsHide:


            true,


          shell:


            false,


          stdio: [


            'pipe',


            'pipe',


            'pipe',


          ],


        },


      );


    const interactiveShell:


      InteractiveShell = {


        sessionId,


        process:


          child,


      };


    this.shells.set(


      sessionId,


      interactiveShell,


    );


    child.stdout.on(


      'data',


      (


        chunk: Buffer,


      ) => {


        session.lastActivityAt =


          Date.now();


        onOutput(


          chunk.toString(


            'utf8',


          ),


        );


      },


    );


    child.stderr.on(


      'data',


      (


        chunk: Buffer,


      ) => {


        session.lastActivityAt =


          Date.now();


        const value =


          chunk.toString(


            'utf8',


          );


        if (


          onError


        ) {


          onError(


            value,


          );


        } else {


          onOutput(


            value,


          );


        }


      },


    );


    child.on(


      'error',


      (


        error,


      ) => {


        this.logger.error(


          `Interactive shell error for ${sessionId}: ${error.message}`,


        );


        if (


          onError


        ) {


          onError(


            `${error.message}\r\n`,


          );


        }


      },


    );


    child.on(


      'close',


      (


        code,


      ) => {


        const activeShell =


          this.shells.get(


            sessionId,


          );


        /*


         * Only remove the mapping when it still references


         * this exact child process.


         */


        if (


          activeShell?.process ===


          child


        ) {


          this.shells.delete(


            sessionId,


          );


        }


        this.logger.log(


          `Interactive shell closed: ${sessionId} (${code ?? 'unknown'})`,


        );


        onExit?.(


          code,


        );


      },


    );


    /*


     * Configure a predictable interactive prompt.


     *


     * The prompt is produced INSIDE the shell, rather than


     * being hard-coded by the React frontend.


     *


     * `pwd` is evaluated every time the prompt is displayed,


     * so changing directories is reflected immediately.


     */


    child.stdin.write(


      `export PS1='learner@elab:$(pwd)$ '\n`,


    );


    /*


     * Alpine sh launched over a pipe is not attached to a


     * terminal and therefore does not automatically display


     * PS1. We implement a tiny persistent command loop in


     * the shell itself.


     *


     * Instead of relying on shell-generated prompts, the


     * gateway/frontend can display the initial prompt and


     * request the current working directory after commands.


     */


    this.logger.log(


      `Interactive shell started: ${sessionId}`,


    );


  }


  /* =======================================================


     WRITE TO INTERACTIVE SHELL


  ======================================================= */


  writeToInteractiveShell(


    sessionId: string,


    data: string,


  ): void {


    const session =


      this.getSessionOrThrow(


        sessionId,


      );


    const shell =


      this.shells.get(


        sessionId,


      );


    if (


      !shell ||


      shell.process.killed ||


      !shell.process.stdin.writable


    ) {


      throw new Error(


        'Interactive DevOps shell is not running.',


      );


    }


    session.lastActivityAt =


      Date.now();


    shell.process.stdin.write(


      data,


    );


  }


  /* =======================================================


     EXECUTE INTERACTIVE COMMAND


     Used by our current xterm command-per-Enter frontend.


     Unlike executeCommand(), this writes into the SAME


     persistent shell process, so commands such as `cd`


     persist between executions.


  ======================================================= */


  executeInteractiveCommand(


    sessionId: string,


    command: string,


  ): void {


    const session =


      this.getSessionOrThrow(


        sessionId,


      );


    const normalizedCommand =


      String(


        command ?? '',


      ).trim();


    if (!normalizedCommand) {


      return;


    }


    session.executedCommands.push(


      normalizedCommand,


    );


    session.lastActivityAt =


      Date.now();


    this.writeToInteractiveShell(


      sessionId,


      `${normalizedCommand}\n`,


    );


  }


  /* =======================================================


     STOP INTERACTIVE SHELL


  ======================================================= */


  stopInteractiveShell(


    sessionId: string,


  ): void {


    const shell =


      this.shells.get(


        sessionId,


      );


    if (!shell) {


      return;


    }


    this.shells.delete(


      sessionId,


    );


    try {


      if (


        shell.process.stdin


          .writable


      ) {


        shell.process.stdin.end();


      }


    } catch {


      // Ignore stdin cleanup errors.


    }


    try {


      if (


        !shell.process.killed


      ) {


        shell.process.kill();


      }


    } catch {


      // Ignore process cleanup errors.


    }


    this.logger.log(


      `Interactive shell stopped: ${sessionId}`,


    );


  }


  /* =======================================================


     LEGACY / REST COMMAND EXECUTION


     Keep this because your REST controller and manual


     PowerShell tests currently use it.


     This command DOES NOT preserve shell state.


     Interactive browser terminals should use:


       startInteractiveShell()


       executeInteractiveCommand()


  ======================================================= */


  async executeCommand(


    sessionId: string,


    command: string,


  ): Promise<DevOpsCommandResult> {


    const session =


      this.getSessionOrThrow(


        sessionId,


      );


    const normalizedCommand =


      String(


        command ?? '',


      );


    if (


      !normalizedCommand.trim()


    ) {


      return {


        stdout: '',


        stderr: '',


        exitCode:


          0,


      };


    }


    session.lastActivityAt =


      Date.now();


    session.executedCommands.push(


      normalizedCommand.trim(),


    );


    return this.runDocker([


      'exec',


      '--workdir',


      this.workspacePath,


      session.containerName,


      this.getSessionShell(session),


      '-lc',


      normalizedCommand,


    ]);


  }


  /* =======================================================


     GET CURRENT DIRECTORY


     This executes `pwd` through the persistent shell.


     The gateway can use this when it needs to refresh the


     visible prompt after a command.


  ======================================================= */


  requestWorkingDirectory(


    sessionId: string,


  ): void {


    this.writeToInteractiveShell(


      sessionId,


      'pwd\n',


    );


  }


  private hasExecutedCommand(


    session: DevOpsLabSession,


    requiredCommand: string,


  ): boolean {


    const expected =


      requiredCommand


        .trim()


        .replace(/\s+/g, ' ');


    return session.executedCommands.some(


      (command) =>


        command


          .trim()


          .replace(/\s+/g, ' ') ===


        expected,


    );


  }


  /* =======================================================


     CHECK SOLUTION


  ======================================================= */


  private getSessionShell(session: DevOpsLabSession): 'bash' | 'sh' {
    if (/^(ethereum-solidity|web3-dapp-development|smart-contract-security|defi-tokenization)-/.test(session.problemSlug)) {
      return 'bash';
    }


    return session.problemSlug.startsWith('linux-security-') ||


      session.problemSlug.startsWith('python-security-') ||
             session.problemSlug.startsWith('soc-siem-') ||
       session.problemSlug.startsWith('digital-forensics-') ||
       session.problemSlug.startsWith('cloud-security-') ||
       session.problemSlug.startsWith('devsecops-') ||
        session.problemSlug.startsWith('incident-response-') ||
       session.problemSlug.startsWith('penetration-testing-') ||


      session.problemSlug.startsWith('web-security-') ||


      session.problemSlug.startsWith('network-security-')


      ? 'bash'


      : 'sh';


  }


  private async runCheck(
    session: DevOpsLabSession,
    check: LabCheck,
    command: string,
  ): Promise<LabRunResult> {
    const runner = check.runner ?? 'shell';
    const program =
      runner === 'python'
        ? ['python3', '-I', '-c', command, ...(check.args ?? [])]
        : runner === 'node'
          ? ['node', '-e', command, ...(check.args ?? [])]
          : [
              this.getSessionShell(session),
              '-lc',
              check.stdin === undefined
                ? command
                : `printf '%s' '${Buffer.from(check.stdin, 'utf8').toString('base64')}' | base64 -d | (${command})`,
            ];
    const result = await this.runDocker(
      ['exec', ...(check.user ? ['--user', check.user] : []), '--workdir', this.workspacePath, session.containerName, ...program],
      check.timeoutMs ?? 20_000,
    );
    return { exitCode: result.exitCode, stdout: result.stdout, stderr: result.stderr };
  }

  private async evaluateSession(session: DevOpsLabSession) {
    const checks = await this.labChecks.checks(session.problemSlug);
    return evaluateLabChecks(checks, {
      history: session.executedCommands,
      run: (check, command) => this.runCheck(session, check, command),
    });
  }

  async checkSolution(
    sessionId: string,
  ): Promise<DevOpsCheckResult> {
    const session = this.getSessionOrThrow(sessionId);
    session.lastActivityAt = Date.now();
    const evaluation = await this.evaluateSession(session);
    return {
      passed: evaluation.accepted,
      message: evaluation.accepted ? 'Success! All checks passed.' : evaluation.message,
    };
  }

  async submitSolution(
    sessionId: string,
  ): Promise<DevOpsSubmissionResult> {
    const session = this.getSessionOrThrow(sessionId);
    session.lastActivityAt = Date.now();
    const evaluation = await this.evaluateSession(session);
    this.logger.log(
      `DevOps submission: ${session.problemSlug} | ${sessionId} | ${evaluation.passedTests}/${evaluation.totalTests} | ${evaluation.score}%`,
    );
    return {
      passed: evaluation.accepted,
      status: evaluation.accepted ? 'Accepted' : 'Wrong Answer',
      score: evaluation.score,
      passedTests: evaluation.passedTests,
      totalTests: evaluation.totalTests,
      message: evaluation.message,
      tests: evaluation.tests.map((test, index) => ({ testNumber: index + 1, name: test.name, passed: test.passed })),
    };
  }

  async resetSession(


    sessionId: string,


  ): Promise<void> {


    const session =


      this.getSessionOrThrow(


        sessionId,


      );


    /*


     * Stop the interactive shell first so it cannot remain


     * inside a directory that is about to be deleted.


     */


    this.stopInteractiveShell(


      sessionId,


    );


    /*


     * Remove everything inside /workspace while preserving


     * the workspace directory itself.


     *


     * `find` also removes hidden files/directories.


     */


    const result =


      await this.runDocker([


        'exec',


        session.containerName,


        'find',


        this.workspacePath,


        '-mindepth',


        '1',


        '-maxdepth',


        '1',


        '-exec',


        'rm',


        '-rf',


        '--',


        '{}',


        '+',


      ]);


    if (


      result.exitCode !==


      0


    ) {


      throw new Error(


        result.stderr ||


          'Unable to reset DevOps environment.',


      );


    }


    if (


      session.problemSlug.startsWith(


        'git-',


      )


    ) {


      const prepareResult =


        await this.runDocker([


          'exec',


          session.containerName,


          'mkdir',


          '-p',


          `${this.workspacePath}/project`,


        ]);


      if (


        prepareResult.exitCode !==


        0


      ) {


        throw new Error(


          prepareResult.stderr ||


            'Unable to prepare Git workspace after reset.',


        );


      }


    }


    session.executedCommands = [];


    session.lastActivityAt =


      Date.now();


    this.logger.log(


      `DevOps lab reset: ${sessionId}`,


    );


  }


  /* =======================================================


     DELETE SESSION


  ======================================================= */


  async deleteSession(


    sessionId: string,


  ): Promise<void> {


    const session =


      this.sessions.get(


        sessionId,


      );


    if (!session) {


      return;


    }


    /*


     * Stop docker exec before deleting its parent


     * container.


     */


    this.stopInteractiveShell(


      sessionId,


    );


    await this.runDocker([


      'rm',


      '-f',


      session.containerName,


    ]);


    this.sessions.delete(


      sessionId,


    );


    this.logger.log(


      `DevOps lab removed: ${sessionId}`,


    );


  }


  /* =======================================================


     GET SESSION


  ======================================================= */


  getSession(


    sessionId: string,


  ): DevOpsLabSession | undefined {


    return this.sessions.get(


      sessionId,


    );


  }


  /* =======================================================


     CHECK INTERACTIVE SHELL


  ======================================================= */


  hasInteractiveShell(


    sessionId: string,


  ): boolean {


    const shell =


      this.shells.get(


        sessionId,


      );


    return Boolean(


      shell &&


        !shell.process.killed &&


        shell.process.stdin


          .writable,


    );


  }


  /* =======================================================


     GET SESSION OR THROW


  ======================================================= */


  private getSessionOrThrow(


    sessionId: string,


  ): DevOpsLabSession {


    const session =


      this.sessions.get(


        sessionId,


      );


    if (!session) {


      throw new NotFoundException(


        'DevOps lab session was not found.',


      );


    }


    return session;


  }


  /* =======================================================


     DOCKER EXECUTION


     Used for:


     - container creation


     - validation


     - submission tests


     - reset


     - deletion


     - REST command execution


     shell:false ensures arguments are not interpreted by


     the Windows host shell.


  ======================================================= */


  private async runDocker(


    args: string[],


    timeoutMs = 15_000,


  ): Promise<DockerResult> {


    return new Promise(


      (


        resolve,


        reject,


      ) => {


        const child =


          spawn(


            'docker',


            args,


            {


              windowsHide:


                true,


              shell:


                false,


              stdio: [


                'ignore',


                'pipe',


                'pipe',


              ],


            },


          );


        let stdout =


          '';


        let stderr =


          '';


        let settled =


          false;


        const timeout =


          setTimeout(


            () => {


              if (


                settled


              ) {


                return;


              }


              settled =


                true;


              try {


                child.kill();


              } catch {


                // Ignore kill errors.


              }


              reject(


                new Error(


                  'Docker command timed out.',


                ),


              );


            },


            timeoutMs,


          );


        child.stdout.on(


          'data',


          (


            chunk: Buffer,


          ) => {


            stdout +=


              chunk.toString(


                'utf8',


              );


          },


        );


        child.stderr.on(


          'data',


          (


            chunk: Buffer,


          ) => {


            stderr +=


              chunk.toString(


                'utf8',


              );


          },


        );


        child.on(


          'error',


          (


            error,


          ) => {


            if (


              settled


            ) {


              return;


            }


            settled =


              true;


            clearTimeout(


              timeout,


            );


            reject(


              error,


            );


          },


        );


        child.on(


          'close',


          (


            code,


          ) => {


            if (


              settled


            ) {


              return;


            }


            settled =


              true;


            clearTimeout(


              timeout,


            );


            resolve({


              stdout:


                stdout.trimEnd(),


              stderr:


                stderr.trimEnd(),


              exitCode:


                code ?? 1,


            });


          },


        );


      },


    );


  }


}


