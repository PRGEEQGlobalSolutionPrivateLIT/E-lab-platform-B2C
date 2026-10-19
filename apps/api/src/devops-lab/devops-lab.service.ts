import {


  Injectable,


  Logger,


  NotFoundException,


} from '@nestjs/common';


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


  private readonly hiddenTestCases:


    Record<


      string,


      DevOpsHiddenTestCase[]


    > = {


      /* =====================================================


         CREATE A DIRECTORY


      ===================================================== */


             // Linux Security — Inspect User Account (User & Group Security)


      'linux-security-inspect-user-account': [


        {


          name: 'Account audit file exists',


          command: 'test -f /workspace/account-audit.txt && test ! -L /workspace/account-audit.txt',


        },


        {


          name: 'Saved account matches the actual executing user',


          command: 'test "$(cat /workspace/account-audit.txt)" = "$(id -un)"',


        },


        {


          name: 'Account audit contains only one username',


          command: 'test "$(wc -c < /workspace/account-audit.txt)" -le 128 && test "$(wc -l < /workspace/account-audit.txt)" -le 1 && ! grep -q "[[:space:]]" /workspace/account-audit.txt',


        },


      ],


      'linux-security-identify-current-user': [


         {


           name: 'Current-user audit file exists',


           command: 'test -f /workspace/current-user.txt',


         },


         {


           name: 'File contains the actual executing username',


           command: 'test "$(cat /workspace/current-user.txt)" = "$(id -un)"',


         },


         {


           name: 'File contains only the username and optional newline',


           command: 'test "$(wc -l < /workspace/current-user.txt)" -le 1 && test "$(wc -c < /workspace/current-user.txt)" -le 128 && ! grep -q "[[:space:]]" /workspace/current-user.txt',


         },


       ],


'linux-create-directory': [


        {


          name:


            'Reports directory exists',


          command:


            'test -d /workspace/reports',


        },


        {


          name:


            'Reports is a directory',


          command:


            '[ -d /workspace/reports ] && [ ! -f /workspace/reports ]',


        },


        {


          name:


            'Reports exists at the required path',


          command:


            'test "$(find /workspace -maxdepth 1 -type d -name reports -print)" = "/workspace/reports"',


        },


      ],


      /* =====================================================


         INITIALIZE A GIT REPOSITORY


      ===================================================== */


      'git-initialize-repository': [


        {


          name:


            'Project directory exists',


          command:


            'test -d /workspace/project',


        },


        {


          name:


            'Git repository metadata exists',


          command:


            'test -d /workspace/project/.git',


        },


        {


          name:


            'Project is a valid Git work tree',


          command:


            'git -C /workspace/project rev-parse --is-inside-work-tree >/dev/null 2>&1',


        },


      ],


      /* =====================================================


         CHECK DOCKER VERSION


      ===================================================== */


      'docker-check-version': [


        {


          name: 'Docker CLI is installed',


          command: 'command -v docker >/dev/null 2>&1',


        },


        {


          name: 'Docker version command succeeds',


          command: 'docker --version >/dev/null 2>&1',


        },


        {


          name: 'Docker reports a valid version',


          command: 'docker --version 2>/dev/null | grep -q "Docker version"',


        },


      ],


      /* =====================================================


         CHECK KUBERNETES CLI VERSION


      ===================================================== */


      'kubernetes-check-kubectl-version': [


        {


          name: 'kubectl CLI is installed',


          command: 'command -v kubectl >/dev/null 2>&1',


        },


        {


          name: 'kubectl client version command succeeds',


          command: 'kubectl version --client >/dev/null 2>&1',


        },


        {


          name: 'kubectl reports a client version',


          command:


            'kubectl version --client 2>/dev/null | grep -q "Client Version"',


        },


      ],


      /* =====================================================


         CREATE A CI WORKFLOW


      ===================================================== */


      'cicd-create-github-actions-workflow': [


        { name: 'CI workflow file exists', command: 'test -f /workspace/.github/workflows/ci.yml' },


        { name: 'Workflow contains a valid name', command: "grep -Eq '^[[:space:]]*name:[[:space:]]*[^[:space:]].*$' /workspace/.github/workflows/ci.yml" },


        { name: 'Workflow contains at least one job', command: "grep -Eq '^[[:space:]]*jobs:[[:space:]]*$' /workspace/.github/workflows/ci.yml && awk '/^[[:space:]]*jobs:[[:space:]]*$/ { in_jobs=1; next } in_jobs && /^[[:space:]]{2,}[A-Za-z0-9\\\\\\\\_-]+:[[:space:]]*$/ { found=1; exit } END { exit(found ? 0 : 1) }' /workspace/.github/workflows/ci.yml" },


      ],


    };


  /* =======================================================


     CREATE SESSION


  ======================================================= */


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


  private isNetworkSecuritySession(session: DevOpsLabSession): boolean {


    return session.problemSlug.startsWith('network-security-');


  }


  // Execute hidden input/output tests against the learner's main.py in the


  // existing offline container. Input is piped directly to Python, not


  // interpolated into shell commands. The reference cases remain server-side.


  private async runNetworkSecurityValidation(


    session: DevOpsLabSession,


  ): Promise<DevOpsSubmissionTestResult[]> {


    if (session.problemSlug !== 'network-security-validate-ipv4-address') {


      return [];


    }


    const checks = [


      { name: 'Valid IPv4 address', input: '192.168.1.10\n', expected: 'VALID' },


      { name: 'Invalid octet', input: '256.168.1.10\n', expected: 'INVALID' },


      { name: 'IPv6 must be rejected', input: '2001:db8::1\n', expected: 'INVALID' },


    ];


    const results: DevOpsSubmissionTestResult[] = [];


    for (const [index, check] of checks.entries()) {


      // The runner uses Python's subprocess API so user input never becomes


      // part of a shell expression. No network is available in this container.


      const runner = `import os,subprocess,sys


p='/workspace/main.py'


if not os.path.isfile(p) or os.path.islink(p): sys.exit(1)


try:


    r=subprocess.run([sys.executable,'-I',p],input=${JSON.stringify(check.input)},capture_output=True,text=True,timeout=5,check=False,cwd='/workspace')


    sys.exit(0 if r.returncode==0 and r.stdout.strip()==${JSON.stringify(check.expected)} and not r.stderr.strip() and len(r.stdout)<1024 else 1)


except (OSError,subprocess.TimeoutExpired,UnicodeError):


    sys.exit(1)`;


      try {


        const result = await this.runDocker([


          'exec', '--user', 'learner', '--workdir', this.workspacePath,


          session.containerName, 'python3', '-I', '-c', runner,


        ], 10_000);


        results.push({


          testNumber: index + 1,


          name: check.name,


          passed: result.exitCode === 0,


        });


      } catch (error) {


        this.logger.error(`Network Security validation ${index + 1}: ${String(error)}`);


        results.push({ testNumber: index + 1, name: check.name, passed: false });


      }


    }


    return results;


  }


  private summarizeNetworkSecurityTests(


    results: DevOpsSubmissionTestResult[],


  ): DevOpsSubmissionResult {


    const passedTests = results.filter((test) => test.passed).length;


    const totalTests = results.length;


    const passed = totalTests > 0 && passedTests === totalTests;


    return {


      passed,


      status: passed ? 'Accepted' : 'Wrong Answer',


      score: totalTests ? Math.round((passedTests / totalTests) * 100) : 0,


      passedTests,


      totalTests,


      message: !totalTests


        ? 'No Network Security submission tests are configured for this problem.'


        : passed


          ? 'All Network Security tests passed.'


          : `${passedTests}/${totalTests} Network Security tests passed. Check /workspace/main.py.`,


      tests: results,


    };


  }


  private isPythonSecuritySession(session: DevOpsLabSession): boolean {


    return session.problemSlug.startsWith('python-security-');


  }


  private isInspectPythonRuntimeProblem(slug: string): boolean {


    return /^python-security-(?:inspect-python-runtime|inspect-runtime|python-runtime|inspect-python-version)$/.test(slug);


  }


  // Python Security grading runs inside the same isolated learner container.


  // Python source stays in /workspace/main.py; no learner code is returned to the API.


  private async runPythonSecurityValidation(


    session: DevOpsLabSession,


  ): Promise<DevOpsSubmissionTestResult[]> {


    if (!this.isInspectPythonRuntimeProblem(session.problemSlug)) {


      return [];


    }


    // All checks are independent. The expected version is read from the


    // interpreter in the container rather than hard-coded into the tests.


    const checks: Array<{ name: string; code: string }> = [


      {


        name: 'main.py exists and is a regular file',


        code: `import os,sys


p='/workspace/main.py'


sys.exit(0 if os.path.isfile(p) and not os.path.islink(p) else 1)`,


      },


      {


        name: 'Python source is valid and uses runtime version information',


        code: `import ast,sys


p='/workspace/main.py'


try:


    source=open(p,encoding='utf-8').read()


    tree=ast.parse(source,filename=p)


    allowed={'sys.version_info','sys.version','platform.python_version','platform.python_version_tuple'}


    def dotted(node):


        if isinstance(node,ast.Name): return node.id


        if isinstance(node,ast.Attribute):


            root=dotted(node.value)


            return root+'.'+node.attr if root else ''


        return ''


    imported={}


    for node in ast.walk(tree):


        if isinstance(node,ast.Import):


            for item in node.names: imported[item.asname or item.name]=item.name


        elif isinstance(node,ast.ImportFrom) and node.module in ('sys','platform'):


            for item in node.names: imported[item.asname or item.name]=node.module+'.'+item.name


    def canonical(name):


        parts=name.split('.',1)


        return imported.get(parts[0],parts[0])+('.'+parts[1] if len(parts)>1 else '')


    found=any(canonical(dotted(node)) in allowed for node in ast.walk(tree))


    sys.exit(0 if found else 1)


except (OSError,SyntaxError,UnicodeError):


    sys.exit(1)`,


      },


      {


        name: 'Output matches the actual Python major.minor.micro version',


        code: `import subprocess,sys


p='/workspace/main.py'


v=sys.version_info


expected=f'{v.major}.{v.minor}.{v.micro}'


try:


    result=subprocess.run([sys.executable,'-I',p],input='',capture_output=True,text=True,timeout=5,check=False)


    sys.exit(0 if result.returncode==0 and result.stdout.strip()==expected and not result.stderr.strip() and len(result.stdout)<=128 else 1)


except (OSError,subprocess.TimeoutExpired,UnicodeError):


    sys.exit(1)`,


      },


    ];


    const results: DevOpsSubmissionTestResult[] = [];


    for (const [index, check] of checks.entries()) {


      try {


        const result = await this.runDocker([


          'exec', '--user', 'learner', '--workdir', this.workspacePath,


          session.containerName, 'python3', '-I', '-c', check.code,


        ], 10_000);


        results.push({


          testNumber: index + 1,


          name: check.name,


          passed: result.exitCode === 0,


        });


      } catch (error) {


        this.logger.error(`Python Security validation ${index + 1}: ${String(error)}`);


        results.push({ testNumber: index + 1, name: check.name, passed: false });


      }


    }


    return results;


  }


  private summarizePythonSecurityTests(


    results: DevOpsSubmissionTestResult[],


  ): DevOpsSubmissionResult {


    const passedTests = results.filter((test) => test.passed).length;


    const totalTests = results.length;


    const passed = totalTests > 0 && passedTests === totalTests;


    return {


      passed,


      status: passed ? 'Accepted' : 'Wrong Answer',


      score: totalTests ? Math.round((passedTests / totalTests) * 100) : 0,


      passedTests,


      totalTests,


      message: passed


        ? 'All Python Security tests passed.'


        : totalTests


          ? `${passedTests}/${totalTests} Python Security tests passed. Check main.py and its output.`


          : 'No Python Security submission tests are configured for this problem.',


      tests: results,


    };


  }


  // Web Security: grade the saved Python program using server-side test inputs.
  private isWebSecuritySession(session: DevOpsLabSession): boolean {
    return session.problemSlug.startsWith('web-security-');
  }

  private async runWebSecurityValidation(
    session: DevOpsLabSession,
  ): Promise<DevOpsSubmissionTestResult[]> {
    if (session.problemSlug !== 'web-security-validate-http-status-code') {
      return [];
    }

    const cases = [
      { name: 'Successful HTTP response', input: '200\n', expected: 'SUCCESS' },
      { name: 'Success upper boundary', input: '299\n', expected: 'SUCCESS' },
      { name: 'Redirect response', input: '301\n', expected: 'REDIRECT' },
      { name: 'Client error response', input: '404\n', expected: 'CLIENT_ERROR' },
      { name: 'Server error response', input: '503\n', expected: 'SERVER_ERROR' },
      { name: 'Below valid range', input: '199\n', expected: 'INVALID' },
      { name: 'Above valid range', input: '600\n', expected: 'INVALID' },
      { name: 'Invalid text input', input: 'abc\n', expected: 'INVALID' },
    ];

    const results: DevOpsSubmissionTestResult[] = [];
    for (const [index, test] of cases.entries()) {
      const runner = `import os, subprocess, sys
p = '/workspace/main.py'
if not os.path.isfile(p) or os.path.islink(p):
    sys.exit(1)
try:
    result = subprocess.run([sys.executable, '-I', p], input=${JSON.stringify(test.input)}, capture_output=True, text=True, timeout=5, cwd='/workspace', check=False)
    sys.exit(0 if result.returncode == 0 and result.stdout.strip() == ${JSON.stringify(test.expected)} and not result.stderr.strip() and len(result.stdout) < 1024 else 1)
except (OSError, subprocess.TimeoutExpired, UnicodeError):
    sys.exit(1)`;
      try {
        const result = await this.runDocker([
          'exec', '--user', 'learner', '--workdir', this.workspacePath,
          session.containerName, 'python3', '-I', '-c', runner,
        ], 10_000);
        results.push({ testNumber: index + 1, name: test.name, passed: result.exitCode === 0 });
      } catch (error) {
        this.logger.error(`Web Security validation ${index + 1}: ${String(error)}`);
        results.push({ testNumber: index + 1, name: test.name, passed: false });
      }
    }
    return results;
  }

  private summarizeWebSecurityTests(
    results: DevOpsSubmissionTestResult[],
  ): DevOpsSubmissionResult {
    const totalTests = results.length;
    const passedTests = results.filter((test) => test.passed).length;
    const passed = totalTests > 0 && passedTests === totalTests;
    return {
      passed,
      status: passed ? 'Accepted' : 'Wrong Answer',
      score: totalTests ? Math.round((passedTests / totalTests) * 100) : 0,
      passedTests,
      totalTests,
      message: !totalTests
        ? 'No Web Security submission tests are configured for this problem.'
        : passed
          ? 'All Web Security tests passed.'
          : `${passedTests}/${totalTests} Web Security tests passed. Check /workspace/main.py.`,
      tests: results,
    };
  }


  /* Security stack grading. Cases are scoped to exact problem slugs. */
  private readonly securityPythonCases: Record<string, Array<{name: string; input: string; expected: string}>> = {
    'incident-response-identify-incident-severity': [
      { name: 'Critical severity', input: 'critical\n', expected: 'P1' },
      { name: 'SEV1 uppercase', input: 'SEV1\n', expected: 'P1' },
      { name: 'Critical mixed case', input: 'CrItIcAl\n', expected: 'P1' },
      { name: 'High severity', input: 'high\n', expected: 'P2' },
      { name: 'SEV2 uppercase', input: 'SEV2\n', expected: 'P2' },
      { name: 'Medium severity', input: 'medium\n', expected: 'P3' },
      { name: 'SEV3 mixed case', input: 'SeV3\n', expected: 'P3' },
      { name: 'Low severity', input: 'low\n', expected: 'P4' },
      { name: 'SEV4 uppercase', input: 'SEV4\n', expected: 'P4' },
      { name: 'Unknown label', input: 'informational\n', expected: 'UNKNOWN' },
      { name: 'Whitespace and case', input: '  HIGH  \n', expected: 'P2' },
      { name: 'Blank label', input: '\n', expected: 'UNKNOWN' },
    ],
    'devsecops-identify-sdlc-security-phase': [
      { name: 'Design phase', input: 'design\n', expected: 'PLAN' },
      { name: 'Requirements uppercase', input: 'REQUIREMENTS\n', expected: 'PLAN' },
      { name: 'Coding phase', input: 'coding\n', expected: 'BUILD' },
      { name: 'Implementation mixed case', input: 'ImPlEmEnTaTiOn\n', expected: 'BUILD' },
      { name: 'Testing phase', input: 'testing\n', expected: 'TEST' },
      { name: 'QA uppercase', input: 'QA\n', expected: 'TEST' },
      { name: 'Deployment phase', input: 'deployment\n', expected: 'DEPLOY' },
      { name: 'Release uppercase', input: 'RELEASE\n', expected: 'DEPLOY' },
      { name: 'Unknown activity', input: 'maintenance\n', expected: 'UNKNOWN' },
      { name: 'Whitespace handling', input: '  design  \n', expected: 'PLAN' },
      { name: 'Unrecognized activity', input: 'review\n', expected: 'UNKNOWN' },
    ],
    'penetration-testing-validate-authorized-target-scope': [
      { name: 'Allowed subnet', input: '192.168.1.0/24,10.0.0.0/8\n192.168.1.12\n', expected: 'IN_SCOPE' },
      { name: 'Outside authorized scope', input: '192.168.1.0/24\n192.168.2.10\n', expected: 'OUT_OF_SCOPE' },
      { name: 'Malformed CIDR', input: '192.168.1.0/33\n192.168.1.12\n', expected: 'OUT_OF_SCOPE' },
      { name: 'Malformed address', input: '10.0.0.0/8\n999.1.1.1\n', expected: 'OUT_OF_SCOPE' },
      { name: 'Boundary address', input: '10.0.0.0/8\n10.255.255.255\n', expected: 'IN_SCOPE' },
      { name: 'Invalid network in list', input: '10.0.0.0/8,bad\n10.1.1.1\n', expected: 'OUT_OF_SCOPE' },
    ],
    'cloud-security-identify-cloud-service-model': [
      { name: 'EC2 uppercase', input: 'EC2\n', expected: 'IAAS' },
      { name: 'Virtual machine', input: 'virtual-machine\n', expected: 'IAAS' },
      { name: 'Lambda service', input: 'lambda\n', expected: 'PAAS' },
      { name: 'Functions mixed case', input: 'FuNcTiOnS\n', expected: 'PAAS' },
      { name: 'Office365 service', input: 'office365\n', expected: 'SAAS' },
      { name: 'Gmail uppercase', input: 'GMAIL\n', expected: 'SAAS' },
      { name: 'Unknown service', input: 'azure\n', expected: 'OTHER' },
      { name: 'Surrounding whitespace', input: '  EC2  \n', expected: 'IAAS' },
      { name: 'Empty input', input: '\n', expected: 'OTHER' },
    ],
    'digital-forensics-identify-evidence-type': [
      { name: 'Uppercase log', input: '.LOG\n', expected: 'LOG' },
      { name: 'JPEG image', input: '.jpg\n', expected: 'IMAGE' },
      { name: 'Uppercase PNG', input: '.PNG\n', expected: 'IMAGE' },
      { name: 'PDF document', input: '.pdf\n', expected: 'DOCUMENT' },
      { name: 'DOCX document', input: '.DOCX\n', expected: 'DOCUMENT' },
      { name: 'Unknown extension', input: '.txt\n', expected: 'OTHER' },
    ],
  };

  private async gradeSecurityPython(session: DevOpsLabSession): Promise<DevOpsSubmissionResult> {
    const cases = this.securityPythonCases[session.problemSlug];
    const results: DevOpsSubmissionTestResult[] = [];
    if (cases?.length) {
      for (const [index, test] of cases.entries()) {
        // Test input is passed to subprocess, never interpolated into a shell.
        const runner = `import os, subprocess, sys
p='/workspace/main.py'
if not os.path.isfile(p) or os.path.islink(p): sys.exit(1)
try:
    r=subprocess.run([sys.executable,'-I',p],input=${JSON.stringify(test.input)},capture_output=True,text=True,timeout=5,cwd='/workspace',check=False)
    sys.exit(0 if r.returncode==0 and r.stdout.strip()==${JSON.stringify(test.expected)} and not r.stderr.strip() and len(r.stdout)<=4096 else 1)
except (OSError,subprocess.TimeoutExpired,UnicodeError):
    sys.exit(1)`;
        try {
          const execution = await this.runDocker([
            'exec', '--user', 'learner', '--workdir', this.workspacePath,
            session.containerName, 'python3', '-I', '-c', runner,
          ], 10_000);
          results.push({testNumber:index+1, name:test.name, passed:execution.exitCode===0});
        } catch (error) {
          this.logger.error(`Security grading failed for ${session.problemSlug}: ${String(error)}`);
          results.push({testNumber:index+1, name:test.name, passed:false});
        }
      }
    }
    const totalTests = results.length;
    const passedTests = results.filter(t=>t.passed).length;
    const passed = totalTests>0 && passedTests===totalTests;
    return {
      passed, status:passed?'Accepted':'Wrong Answer',
      score:totalTests?Math.round(100*passedTests/totalTests):0,
      passedTests, totalTests,
      message:!totalTests
        ? `No verified hidden tests are configured for ${session.problemSlug}. Add its exact problem-specific tests before accepting submissions.`
        : passed ? 'All security lab tests passed.' : `${passedTests}/${totalTests} security lab tests passed. Check /workspace/main.py.`,
      tests:results,
    };
  }

  /**
   * Deploy Local Accounts: deterministic offline EVM tests.
   * Learner entrypoint: /workspace/main.mjs.
   * Output: one address and its decimal wei balance per line, sorted by address.
   * The test input is provided on stdin; no external RPC is used.
   */
  private async gradeDeployLocalAccounts(
    session: DevOpsLabSession,
  ): Promise<DevOpsSubmissionResult> {
    // Trusted deterministic Ganache fixture for wallet.deterministic=true,
    // totalAccounts=10, defaultBalance=100 ETH. Do not launch another Ganache
    // process here: its module startup/cleanup can fail before any tests run.
    const addresses = [
      '0x1df62f291b2e969fb0849d99d9ce41e2f137006e',
      '0x22d491bde2303f2f43325b2108d26f1eaba1e32b',
      '0x28a8746e75304c0780e011bed21c72cd78cd535e',
      '0x3e5e9111ae8eb78fe1cc3bb8915d5d461f3ef9a9',
      '0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1',
      '0x95ced938f7991cd0dfcb48f0a06a40fa1af46ebc',
      '0xaca94ef8bd5ffee41947b4585a84bda5a3d3da6e',
      '0xd03ea8624c8c5987235048901fb614fdca89b117',
      '0xe11ba2b4d45eaed5996cd0823791e0c93114882d',
      '0xffcf8fdee72ac11b5c542428b35eef5769c409f0',
    ];
    const fundedBalanceWei = '100000000000000000000';
    const balances = new Map<string, string>(
      addresses.map((address): [string, string] => [address, fundedBalanceWei]),
    );
    // A non-precompile address absent from the deterministic funded fixture.
    const unknown = '0x000000000000000000000000000000000000dead';
    const cases: Array<{ name: string; addresses: string[] }> = [
      { name: 'Funded balances and ascending address order', addresses: [addresses[3], addresses[0], addresses[2]] },
      { name: 'Unknown local address has zero balance', addresses: [unknown, addresses[1]] },
      { name: 'Duplicate addresses appear only once', addresses: [addresses[2], addresses[2], addresses[0], addresses[0]] },
      { name: 'Many funded local accounts', addresses: [...addresses].reverse() },
    ];
    const tests: DevOpsSubmissionTestResult[] = [];
    for (const [index, check] of cases.entries()) {
      const expected = [...new Set(check.addresses.map((a) => a.toLowerCase()))]
        .sort()
        .map((address) => `${address} ${balances.get(address) ?? '0'}`);
      // Encode server-owned input rather than interpolating raw learner input into shell.
      const encodedInput = Buffer.from(check.addresses.join('\n') + '\n', 'utf8').toString('base64');
      const command = `test -f /workspace/main.mjs && test ! -L /workspace/main.mjs && printf '%s' '${encodedInput}' | base64 -d | node /workspace/main.mjs ${check.addresses.join(' ')}`;
      try {
        const result = await this.runDocker([
          'exec', '--user', 'learner', '--workdir', this.workspacePath,
          session.containerName, 'bash', '-lc', command,
        ], 25_000);
        const actual = result.stdout.trim().split(/\r?\n/).map((line) => line.trim().toLowerCase());
        // Reject extra output, repeated addresses, unsorted lines and wrong wei values.
        const passed = result.exitCode === 0 && actual.length === expected.length &&
          actual.every((line, position) => line === expected[position]);
        tests.push({ testNumber: index + 1, name: check.name, passed });
      } catch (error) {
        this.logger.error(`Blockchain accounts case ${index + 1}: ${String(error)}`);
        tests.push({ testNumber: index + 1, name: check.name, passed: false });
      }
    }
    const passedTests = tests.filter((test) => test.passed).length;
    const totalTests = tests.length;
    const passed = totalTests > 0 && passedTests === totalTests;
    return {
      passed, status: passed ? 'Accepted' : 'Wrong Answer',
      score: totalTests ? Math.round((passedTests / totalTests) * 100) : 0,
      passedTests, totalTests, tests,
      message: passed
        ? 'All offline local-EVM account balance tests passed.'
        : `${passedTests}/${totalTests} local-EVM tests passed. Print unique addresses in ascending order with exact decimal wei balances.`,
    };
  }


  /** Offline local-chain checks for the Web3 foundation exercise. */
  private async gradeReadLocalChainIdentity(
    session: DevOpsLabSession,
  ): Promise<DevOpsSubmissionResult> {
    const cases = [
      { name: 'Recognizes matching local chain 1337', expectedChain: '1337', mismatch: false },
      { name: 'Rejects an unexpected mainnet chain ID', expectedChain: '1', mismatch: true },
      { name: 'Rejects a second unexpected chain ID', expectedChain: '11155111', mismatch: true },
    ];
    const tests: DevOpsSubmissionTestResult[] = [];
    for (const [index, test] of cases.entries()) {
      try {
        // Run as the unprivileged learner in the existing offline container.
        // The chain fixture in main.mjs must be isolated and deterministic.
        const result = await this.runDocker([
          'exec', '--user', 'learner', '--workdir', this.workspacePath,
          session.containerName, 'node', '/workspace/main.mjs', test.expectedChain,
        ], 20_000);
        const output = result.stdout.trim();
        const passed = test.mismatch
          ? result.exitCode === 0 && output === 'NETWORK_MISMATCH'
          : result.exitCode === 0 &&
            /^CHAIN_ID 1337\r?\nBLOCK_NUMBER (0|[1-9][0-9]*)$/.test(output);
        tests.push({ testNumber: index + 1, name: test.name, passed });
      } catch (error) {
        this.logger.error(`Chain identity case ${index + 1}: ${String(error)}`);
        tests.push({ testNumber: index + 1, name: test.name, passed: false });
      }
    }
    const passedTests = tests.filter((test) => test.passed).length;
    const totalTests = tests.length;
    const passed = passedTests === totalTests;
    return {
      passed,
      status: passed ? 'Accepted' : 'Wrong Answer',
      score: Math.round((passedTests / totalTests) * 100),
      passedTests,
      totalTests,
      tests,
      message: passed
        ? 'All configured offline local-chain identity tests passed.'
        : `${passedTests}/${totalTests} local-chain identity tests passed. Verify CHAIN_ID, BLOCK_NUMBER and NETWORK_MISMATCH output.`,
    };
  }

  /**
   * Smart Contract Security: grade the saved AST-based analyzer against
   * independent offline Solidity fixtures. No public RPC or wallets.
   * Contract source is supplied through an isolated temporary JSON file;
   * the file is removed even if the learner program fails.
   */
  private async gradeMapTokenAttackSurface(
    session: DevOpsLabSession,
  ): Promise<DevOpsSubmissionResult> {
    const cases = [
      {
        name: 'Admin setter writes owner; constructor is not an entry point',
        source: 'pragma solidity ^0.8.20; contract AdminToken { address public owner; constructor() { owner = msg.sender; } function setOwner(address next) external { owner = next; } function getOwner() external view returns (address) { return owner; } }',
        assets: ['ERC20'],
        contract: 'AdminToken',
        expected: [
          { name: 'setOwner', stateChanging: true, payable: false, writes: ['owner'] },
          { name: 'getOwner', stateChanging: false, payable: false, writes: [] },
        ],
      },
      {
        name: 'Payable receive method and read-only supply',
        source: 'pragma solidity ^0.8.20; contract VaultToken { uint256 public totalSupply; receive() external payable {} function getSupply() external view returns (uint256) { return totalSupply; } }',
        assets: ['ETH'],
        contract: 'VaultToken',
        expected: [
          { name: 'receive', stateChanging: true, payable: true, writes: [] },
          { name: 'getSupply', stateChanging: false, payable: false, writes: [] },
        ],
      },
      {
        name: 'ERC-20 balance and supply mutators',
        source: 'pragma solidity ^0.8.20; contract LedgerToken { mapping(address=>uint256) public balanceOf; uint256 public totalSupply; function transfer(address to,uint256 amount) external { balanceOf[msg.sender] -= amount; balanceOf[to] += amount; } function mint(address to,uint256 amount) public { balanceOf[to] += amount; totalSupply += amount; } function supply() external pure returns(uint256) { return 1; } }',
        assets: ['ERC20'],
        contract: 'LedgerToken',
        expected: [
          { name: 'transfer', stateChanging: true, payable: false, writes: ['balanceOf'] },
          { name: 'mint', stateChanging: true, payable: false, writes: ['balanceOf', 'totalSupply'] },
          { name: 'supply', stateChanging: false, payable: false, writes: [] },
        ],
      },
      {
        name: 'Public/external entry points only; declared assets preserved',
        source: 'pragma solidity ^0.8.20; contract AccessToken { address public admin; function changeAdmin(address next) public { admin = next; } function internalUpdate() internal { admin = address(0); } function privateUpdate() private { admin = address(1); } function inspect() external view returns(address) { return admin; } fallback() external payable {} }',
        assets: ['ETH', 'ERC20'],
        contract: 'AccessToken',
        expected: [
          { name: 'changeAdmin', stateChanging: true, payable: false, writes: ['admin'] },
          { name: 'inspect', stateChanging: false, payable: false, writes: [] },
          { name: 'fallback', stateChanging: true, payable: true, writes: [] },
        ],
      },
    ];

    const tests: DevOpsSubmissionTestResult[] = [];
    for (const [index, test] of cases.entries()) {
      // Pass fixtures as encoded arguments to a trusted runner, not as shell text.
      const fixture = Buffer.from(JSON.stringify(test), 'utf8').toString('base64');
      const runner = `
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const cp = require('node:child_process');
const fixture = JSON.parse(Buffer.from(process.argv[1], 'base64').toString('utf8'));
const file = '/workspace/main.mjs';
if (!fs.existsSync(file) || fs.lstatSync(file).isSymbolicLink() || !fs.statSync(file).isFile()) process.exit(1);
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'elab-contract-grade-'));
try {
  const inputFile = path.join(dir, 'fixture.json');
  fs.writeFileSync(inputFile, JSON.stringify({source:fixture.source, assets:fixture.assets}), {mode:0o600});
  const r = cp.spawnSync(process.execPath, [file, inputFile], {
    cwd:'/workspace', encoding:'utf8', timeout:12000, maxBuffer:1048576, stdio:['ignore','pipe','pipe'],
  });
  if (r.error || r.status !== 0 || !r.stdout || r.stdout.length > 262144) process.exit(1);
  let output;
  try { output = JSON.parse(r.stdout); } catch { process.exit(1); }
  if (!output || output.inventoryVersion !== '1.0' || !Array.isArray(output.contracts)) process.exit(1);
  const contract = output.contracts.find(c => c && c.contract === fixture.contract);
  if (!contract || !Array.isArray(contract.assets) || !Array.isArray(contract.entryPoints)) process.exit(1);
  const exactAssets = a => JSON.stringify([...a].sort()) === JSON.stringify([...fixture.assets].sort());
  if (!exactAssets(contract.assets)) process.exit(1);
  const entries = contract.entryPoints;
  if (entries.some(e => !e || e.name === 'unnamed' || e.name === 'constructor' || !['public','external'].includes(e.visibility))) process.exit(1);
  // Public state-variable getters may also appear; the reference analyzer omits them.
  for (const exp of fixture.expected) {
    const actual = entries.find(e => e.name === exp.name);
    if (!actual || actual.stateChanging !== exp.stateChanging || actual.payable !== exp.payable || !Array.isArray(actual.writtenStateVariables)) process.exit(1);
    if (!exp.writes.every(w => actual.writtenStateVariables.includes(w))) process.exit(1);
    if (!exp.stateChanging && actual.writtenStateVariables.length) process.exit(1);
    if (exp.payable && (!Array.isArray(actual.potentialAssets) || !actual.potentialAssets.includes('ETH'))) process.exit(1);
  }
  if (entries.some(e => ['internalUpdate','privateUpdate'].includes(e.name))) process.exit(1);
  process.exitCode = 0;
} finally { fs.rmSync(dir, {recursive:true, force:true}); }
`;
      try {
        const result = await this.runDocker([
          'exec', '--user', 'learner', '--workdir', this.workspacePath,
          session.containerName, 'node', '-e', runner, fixture,
        ], 22_000);
        tests.push({ testNumber: index + 1, name: test.name, passed: result.exitCode === 0 });
      } catch (error) {
        this.logger.error(`Smart Contract Security validation ${index + 1}: ${String(error)}`);
        tests.push({ testNumber: index + 1, name: test.name, passed: false });
      }
    }
    const passedTests = tests.filter(t => t.passed).length;
    const totalTests = tests.length;
    const passed = totalTests > 0 && passedTests === totalTests;
    return {
      passed, status: passed ? 'Accepted' : 'Wrong Answer',
      score: totalTests ? Math.round(passedTests * 100 / totalTests) : 0,
      passedTests, totalTests, tests,
      message: passed
        ? 'All offline Smart Contract Security attack-surface tests passed.'
        : `${passedTests}/${totalTests} attack-surface tests passed. Check constructor exclusion, mutators, state writes, payable methods and read-only methods.`,
    };
  }

  /**
   * DeFi / Tokenization: validate exact integer-only token decimal conversions.
   * Inputs are passed as argv (no stdin waiting in persistent terminals).
   * We verify both the exact base-unit representation and round-trip display.
   * Invalid inputs must be explicitly rejected with a non-zero exit code.
   */
  private async gradeConvertTokenUnitsExactly(
    session: DevOpsLabSession,
  ): Promise<DevOpsSubmissionResult> {
    const cases: Array<{
      name: string;
      amount: string;
      decimals: string;
      baseUnits?: string;
      formatted?: string;
      error?: string;
    }> = [
      { name: 'Standard 18-decimal conversion', amount: '1.5', decimals: '18', baseUnits: '1500000000000000000', formatted: '1.5' },
      { name: 'Zero amount', amount: '0', decimals: '18', baseUnits: '0', formatted: '0' },
      { name: 'Smallest 18-decimal fractional unit', amount: '0.000000000000000001', decimals: '18', baseUnits: '1', formatted: '0.000000000000000001' },
      { name: 'Large 6-decimal token amount without floating-point overflow', amount: '123456789012345678901234567890.123456', decimals: '6', baseUnits: '123456789012345678901234567890123456', formatted: '123456789012345678901234567890.123456' },
      { name: 'Zero decimal token', amount: '125', decimals: '0', baseUnits: '125', formatted: '125' },
      { name: 'Trailing fractional zeros normalized on round-trip', amount: '12.3400', decimals: '6', baseUnits: '12340000', formatted: '12.34' },
      { name: 'Exact 255-decimal scale', amount: '0.1', decimals: '255', baseUnits: '1' + '0'.repeat(254), formatted: '0.1' },
      { name: 'Reject excess fractional precision', amount: '1.1234567', decimals: '6', error: 'TOO_MANY_DECIMAL_PLACES' },
      { name: 'Reject scale larger than supported bound', amount: '1', decimals: '256', error: 'INVALID_DECIMALS' },
      { name: 'Reject malformed human amount', amount: '1.2.3', decimals: '18', error: 'INVALID_AMOUNT' },
      { name: 'Reject negative decimals', amount: '1', decimals: '-1', error: 'INVALID_DECIMALS' },
    ];

    const tests: DevOpsSubmissionTestResult[] = [];
    for (const [index, test] of cases.entries()) {
      try {
        // The container is already running with --network none as learner.
        // Docker exec passes argv directly; no learner input is shell-expanded.
        const result = await this.runDocker([
          'exec', '--user', 'learner', '--workdir', this.workspacePath,
          session.containerName, 'node', '/workspace/main.mjs', test.amount, test.decimals,
        ], 20_000);
        const output = result.stdout.trim().replace(/\r/g, '');
        const lines = output.split('\n').map((line) => line.trim());
        let passed: boolean;
        if (test.error) {
          passed = result.exitCode !== 0 &&
            lines.length === 1 && lines[0] === `ERROR ${test.error}`;
        } else {
          passed = result.exitCode === 0 &&
            lines.length === 2 &&
            lines[0] === `BASE_UNITS ${test.baseUnits}` &&
            lines[1] === `FORMATTED ${test.formatted}`;
        }
        tests.push({ testNumber: index + 1, name: test.name, passed });
      } catch (error) {
        this.logger.error(`DeFi token conversion test ${index + 1}: ${String(error)}`);
        tests.push({ testNumber: index + 1, name: test.name, passed: false });
      }
    }

    const totalTests = tests.length;
    const passedTests = tests.filter((test) => test.passed).length;
    const passed = totalTests > 0 && passedTests === totalTests;
    return {
      passed,
      status: passed ? 'Accepted' : 'Wrong Answer',
      score: totalTests ? Math.round((passedTests / totalTests) * 100) : 0,
      passedTests,
      totalTests,
      tests,
      message: passed
        ? 'All exact token-unit conversion tests passed.'
        : `${passedTests}/${totalTests} token-unit conversion tests passed. Verify exact BigInt output, round-trip formatting and error handling in /workspace/main.mjs.`,
    };
  }

  async checkSolution(


    sessionId: string,


  ): Promise<DevOpsCheckResult> {


    const session =


      this.getSessionOrThrow(


        sessionId,


      );


    session.lastActivityAt =


      Date.now();


    if (session.problemSlug === 'ethereum-solidity-deploy-local-accounts') {
      const result = await this.gradeDeployLocalAccounts(session);
      return { passed: result.passed, message: result.message };
    }
    if (session.problemSlug === 'web3-dapp-development-read-local-chain-identity') {
      const result = await this.gradeReadLocalChainIdentity(session);
      return { passed: result.passed, message: result.message };
    }
    if (session.problemSlug === 'smart-contract-security-map-token-attack-surface') {
      const result = await this.gradeMapTokenAttackSurface(session);
      return { passed: result.passed, message: result.message };
    }
    if (session.problemSlug === 'defi-tokenization-convert-token-units-exactly') {
      const result = await this.gradeConvertTokenUnitsExactly(session);
      return { passed: result.passed, message: result.message };
    }
    if (/^(ethereum-solidity|web3-dapp-development|smart-contract-security|defi-tokenization)-/.test(session.problemSlug)) {
      return { passed: false, message: `No verified Blockchain hidden tests are configured for ${session.problemSlug}.` };
    }

         if (/^(soc-siem|penetration-testing|digital-forensics|cloud-security|devsecops|incident-response)-/.test(session.problemSlug)) {
       const result = await this.gradeSecurityPython(session);
       return {passed: result.passed, message: result.message};
     }

if (this.isWebSecuritySession(session)) {
      const result = this.summarizeWebSecurityTests(
        await this.runWebSecurityValidation(session),
      );
      return { passed: result.passed, message: result.message };
    }

    if (this.isNetworkSecuritySession(session)) {


      const result = this.summarizeNetworkSecurityTests(


        await this.runNetworkSecurityValidation(session),


      );


      return { passed: result.passed, message: result.message };


    }


    if (this.isPythonSecuritySession(session)) {


      const result = this.summarizePythonSecurityTests(


        await this.runPythonSecurityValidation(session),


      );


      return { passed: result.passed, message: result.message };


    }


    switch (


      session.problemSlug


    ) {


        case 'linux-security-inspect-user-account':


          return this.checkLinuxSecurityAccountAudit(session);


        case 'linux-security-identify-current-user':


          return this.checkLinuxSecurityCurrentUser(session);


      case 'linux-create-directory':


        return this.checkCreateDirectory(


          session,


        );


      case 'git-initialize-repository':


        return this.checkInitializeGitRepository(


          session,


        );


      case 'docker-check-version':


        return this.checkDockerVersion(


          session,


        );


      case 'kubernetes-check-kubectl-version':


        return this.checkKubernetesVersion(


          session,


        );


      case 'cicd-create-github-actions-workflow':


        return this.checkCiCdWorkflow(


          session,


        );


      default:


        return {


          passed:


            false,


          message:


            'No DevOps validator is configured for this problem.',


        };


    }


  }


  /* =======================================================


     VALIDATOR


     linux-create-directory


  ======================================================= */


  // Check Solution against the SAME running learner container.


  private async checkLinuxSecurityAccountAudit(


    session: DevOpsLabSession,


  ): Promise<DevOpsCheckResult> {


    const checks = this.hiddenTestCases['linux-security-inspect-user-account'];


    for (const check of checks) {


      const result = await this.runDocker([


        'exec', '--user', 'learner', '--workdir', this.workspacePath,


        session.containerName, 'bash', '-lc', check.command,


      ]);


      if (result.exitCode !== 0) {


        return {


          passed: false,


          message: 'Create /workspace/account-audit.txt containing only the current username from whoami or id -un.',


        };


      }


    }


    return {


      passed: true,


      message: 'Success! The account audit file contains the current Linux username.',


    };


  }


  private async checkLinuxSecurityCurrentUser(


    session: DevOpsLabSession,


  ): Promise<DevOpsCheckResult> {


    const result = await this.runDocker([


      'exec', '--user', 'learner', session.containerName,


      'bash', '-lc',


      'test -f /workspace/current-user.txt && test "$(cat /workspace/current-user.txt)" = "$(id -un)" && test "$(wc -l < /workspace/current-user.txt)" -le 1 && test "$(wc -c < /workspace/current-user.txt)" -le 128 && ! grep -q "[[:space:]]" /workspace/current-user.txt',


    ]);


    return result.exitCode === 0


      ? { passed: true, message: 'Success! The audit file contains the current Linux username.' }


      : { passed: false, message: 'Create /workspace/current-user.txt containing only the username returned by whoami.' };


  }


  private async checkCreateDirectory(


    session: DevOpsLabSession,


  ): Promise<DevOpsCheckResult> {


    const result =


      await this.runDocker([


        'exec',


        session.containerName,


        'test',


        '-d',


        '/workspace/reports',


      ]);


    if (


      result.exitCode ===


      0


    ) {


      return {


        passed:


          true,


        message:


          'Success! /workspace/reports exists.',


      };


    }


    return {


      passed:


        false,


      message:


        'The directory /workspace/reports was not found.',


    };


  }


  /* =======================================================


     VALIDATOR


     git-initialize-repository


  ======================================================= */


  private async checkInitializeGitRepository(


    session: DevOpsLabSession,


  ): Promise<DevOpsCheckResult> {


    const result =


      await this.runDocker([


        'exec',


        '--workdir',


        this.workspacePath,


        session.containerName,


        'sh',


        '-lc',


        'test -d /workspace/project/.git && git -C /workspace/project rev-parse --is-inside-work-tree >/dev/null 2>&1',


      ]);


    if (


      result.exitCode ===


      0


    ) {


      return {


        passed:


          true,


        message:


          'Success! /workspace/project is a valid Git repository.',


      };


    }


    return {


      passed:


        false,


      message:


        'The Git repository /workspace/project/.git was not found or is not valid.',


    };


  }


  /* =======================================================


     VALIDATOR


     docker-check-version


  ======================================================= */


  private async checkDockerVersion(


    session: DevOpsLabSession,


  ): Promise<DevOpsCheckResult> {


    if (


      !this.hasExecutedCommand(


        session,


        'docker --version',


      )


    ) {


      return {


        passed: false,


        message:


          'Run docker --version in the Docker terminal first.',


      };


    }


    const result =


      await this.runDocker([


        'exec',


        '--workdir',


        this.workspacePath,


        session.containerName,


        'sh',


        '-lc',


        'command -v docker >/dev/null 2>&1 && docker --version >/dev/null 2>&1',


      ]);


    if (result.exitCode === 0) {


      return {


        passed: true,


        message:


          'Success! Docker CLI is available and docker --version executes successfully.',


      };


    }


    return {


      passed: false,


      message:


        'Docker CLI was not found or docker --version failed.',


    };


  }


  /* =======================================================


     VALIDATOR


     kubernetes-check-kubectl-version


  ======================================================= */


  private async checkKubernetesVersion(


    session: DevOpsLabSession,


  ): Promise<DevOpsCheckResult> {


    if (


      !this.hasExecutedCommand(


        session,


        'kubectl version --client',


      )


    ) {


      return {


        passed: false,


        message:


          'Run kubectl version --client in the Kubernetes terminal first.',


      };


    }


    const result =


      await this.runDocker([


        'exec',


        '--workdir',


        this.workspacePath,


        session.containerName,


        'sh',


        '-lc',


        'command -v kubectl >/dev/null 2>&1 && kubectl version --client >/dev/null 2>&1',


      ]);


    if (result.exitCode === 0) {


      return {


        passed: true,


        message:


          'Success! kubectl CLI is available and kubectl version --client executes successfully.',


      };


    }


    return {


      passed: false,


      message:


        'kubectl CLI was not found or kubectl version --client failed.',


    };


  }


  /* =======================================================


     VALIDATOR


     cicd-create-github-actions-workflow


  ======================================================= */


  private async checkCiCdWorkflow(


    session: DevOpsLabSession,


  ): Promise<DevOpsCheckResult> {


    const result = await this.runDocker([


      'exec', '--workdir', this.workspacePath, session.containerName, 'sh', '-lc',


      `test -f /workspace/.github/workflows/ci.yml &&


grep -Eq '^[[:space:]]*name:[[:space:]]*[^[:space:]].*$' /workspace/.github/workflows/ci.yml &&


grep -Eq '^[[:space:]]*jobs:[[:space:]]*$' /workspace/.github/workflows/ci.yml &&


awk '/^[[:space:]]*jobs:[[:space:]]*$/ { in_jobs=1; next } in_jobs && /^[[:space:]]{2,}[A-Za-z0-9\\\\\\\\_-]+:[[:space:]]*$/ { found=1; exit } END { exit(found ? 0 : 1) }' /workspace/.github/workflows/ci.yml`,


    ]);


    if (result.exitCode === 0) {


      return { passed: true, message: 'Success! CI workflow exists with a workflow name and at least one job.' };


    }


    return { passed: false, message: 'Create /workspace/.github/workflows/ci.yml with a workflow name and at least one job.' };


  }


  /* =======================================================


     SUBMIT SOLUTION


     Linux submission is different from a normal source-code


     submission.


     We do not submit:


       mkdir reports


     as source code.


     Instead, the API grades the CURRENT STATE of the


     learner's Docker environment.


     Example:


       /workspace/reports


     must actually exist inside the active container.


  ======================================================= */


  async submitSolution(


    sessionId: string,


  ): Promise<DevOpsSubmissionResult> {


    const session =


      this.getSessionOrThrow(


        sessionId,


      );


    session.lastActivityAt =


      Date.now();


    if (session.problemSlug === 'ethereum-solidity-deploy-local-accounts') {
      return this.gradeDeployLocalAccounts(session);
    }
    if (session.problemSlug === 'web3-dapp-development-read-local-chain-identity') {
      return this.gradeReadLocalChainIdentity(session);
    }
    if (session.problemSlug === 'smart-contract-security-map-token-attack-surface') {
      return this.gradeMapTokenAttackSurface(session);
    }
    if (session.problemSlug === 'defi-tokenization-convert-token-units-exactly') {
      return this.gradeConvertTokenUnitsExactly(session);
    }
    if (/^(ethereum-solidity|web3-dapp-development|smart-contract-security|defi-tokenization)-/.test(session.problemSlug)) {
      return {
        passed: false, status: 'Wrong Answer', score: 0,
        passedTests: 0, totalTests: 0, tests: [],
        message: `No verified Blockchain hidden tests are configured for ${session.problemSlug}.`,
      };
    }

         if (/^(soc-siem|penetration-testing|digital-forensics|cloud-security|devsecops|incident-response)-/.test(session.problemSlug)) {
       return this.gradeSecurityPython(session);
     }

if (this.isWebSecuritySession(session)) {
      return this.summarizeWebSecurityTests(
        await this.runWebSecurityValidation(session),
      );
    }

    if (this.isNetworkSecuritySession(session)) {


      return this.summarizeNetworkSecurityTests(


        await this.runNetworkSecurityValidation(session),


      );


    }


    if (this.isPythonSecuritySession(session)) {


      return this.summarizePythonSecurityTests(


        await this.runPythonSecurityValidation(session),


      );


    }


    const requiredCommand =


      session.problemSlug ===


      'docker-check-version'


        ? 'docker --version'


        : session.problemSlug ===


            'kubernetes-check-kubectl-version'


          ? 'kubectl version --client'


          : undefined;


    if (


      requiredCommand &&


      !this.hasExecutedCommand(


        session,


        requiredCommand,


      )


    ) {


      return {


        passed: false,


        status: 'Wrong Answer',


        score: 0,


        passedTests: 0,


        totalTests:


          this.hiddenTestCases[


            session.problemSlug


          ]?.length ?? 0,


        message:


          `Run ${requiredCommand} in the terminal before submitting.`,


        tests: [],


      };


    }


    const testCases =


      this.hiddenTestCases[


        session.problemSlug


      ];


    /* =====================================================


       NO TEST CONFIGURATION


    ===================================================== */


    if (


      !testCases ||


      testCases.length ===


        0


    ) {


      this.logger.warn(


        `No submission tests configured for ${session.problemSlug}`,


      );


      return {


        passed:


          false,


        status:


          'Wrong Answer',


        score:


          0,


        passedTests:


          0,


        totalTests:


          0,


        message:


          'No submission test cases are configured for this problem.',


        tests:


          [],


      };


    }


    const results:


      DevOpsSubmissionTestResult[] =


      [];


    /* =====================================================


       EXECUTE HIDDEN TEST CASES


       Each test executes directly against the SAME Docker


       container currently being used by the learner.


       The learner's persistent interactive shell does not


       need to be stopped.


    ===================================================== */


    for (


      let index = 0;


      index <


      testCases.length;


      index += 1


    ) {


      const testCase =


        testCases[index];


      try {


        const result =


          await this.runDocker([


            'exec',


            '--workdir',


            this.workspacePath,


            session.containerName,


            this.getSessionShell(session),


            '-lc',


            testCase.command,


          ]);


        results.push({


          testNumber:


            index + 1,


          name:


            testCase.name,


          passed:


            result.exitCode ===


            0,


        });


      } catch (


        error


      ) {


        this.logger.error(


          `Submission test ${index + 1} failed to execute for ${session.problemSlug}: ${


            error instanceof Error


              ? error.message


              : String(


                  error,


                )


          }`,


        );


        results.push({


          testNumber:


            index + 1,


          name:


            testCase.name,


          passed:


            false,


        });


      }


    }


    /* =====================================================


       CALCULATE SUBMISSION RESULT


    ===================================================== */


    const passedTests =


      results.filter(


        (


          result,


        ) =>


          result.passed,


      ).length;


    const totalTests =


      results.length;


    const passed =


      totalTests > 0 &&


      passedTests ===


        totalTests;


    const score =


      totalTests === 0


        ? 0


        : Math.round(


            (


              passedTests /


              totalTests


            ) *


              100,


          );


    /* =====================================================


       LOG RESULT


    ===================================================== */


    this.logger.log(


      `DevOps submission: ${session.problemSlug} | ${sessionId} | ${passedTests}/${totalTests} | ${score}%`,


    );


    /* =====================================================


       RETURN SAFE RESULT


       Notice that testCase.command is NOT returned.


       Hidden Docker validation commands therefore remain


       private on the API.


    ===================================================== */


    return {


      passed,


      status:


        passed


          ? 'Accepted'


          : 'Wrong Answer',


      score,


      passedTests,


      totalTests,


      message:


        passed


          ? 'All hidden test cases passed.'


          : `${passedTests}/${totalTests} hidden test cases passed.`,


      tests:


        results,


    };


  }


  /* =======================================================


     RESET SESSION


  ======================================================= */


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


