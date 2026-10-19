'use client';



import {



  useCallback,



  useEffect,



  useRef,



  useState,



  type KeyboardEvent,



} from 'react';



import {



  ArrowLeft,



  RotateCcw,



  Terminal as TerminalIcon,



} from 'lucide-react';



import {



  useRouter,



} from 'next/navigation';



import {



  io,



  type Socket,



} from 'socket.io-client';



import type {



  Terminal as XTermTerminal,



} from '@xterm/xterm';



import type {



  FitAddon,



} from '@xterm/addon-fit';



import type {



  PracticeProblem,



} from '@/features/problem-engine';



import styles



  from './DevOpsWorkspace.module.css';



import '@xterm/xterm/css/xterm.css';



const normalizeBaseUrl = (value: string) => value.trim().replace(/\/+$/, '');

const API_URL = normalizeBaseUrl(process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1');
const SOCKET_URL = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_API_BASE_URL ?? API_URL.replace(/\/api\/v1\/?$/, ''),
).replace(/\/api\/v1\/?$/, '');

const TERMINAL_NAMESPACE =



  '/devops-terminal';



const DEFAULT_WORKSPACE =



  '/workspace';



const COMMAND_DONE_MARKER =



  '__ELAB_COMMAND_DONE__';



function createPrompt(



  currentPath: string,



) {



  return (



    '\x1b[32mlearner@elab\x1b[0m:' +



    `\x1b[36m${currentPath}\x1b[0m$ `



  );



}



type DevOpsWorkspaceProps = {



  problem: PracticeProblem;



  source:



    | 'practice'



    | 'stack'



    | 'challenge';



};



type CreateSessionResponse = {



  sessionId: string;



  problemSlug: string;



  workspacePath: string;



  shell: string;



};



type TerminalReadyPayload = {



  sessionId: string;



  workspacePath: string;



  shell: string;



};



type TerminalStreamPayload = {



  data?: string;



};



type TerminalOutputPayload = {



  stdout?: string;



  stderr?: string;



  exitCode?: number;



};



type TerminalErrorPayload = {



  message?: string;



};



type CheckResultPayload = {



  passed: boolean;



  message: string;



};



type ResetResultPayload = {



  success: boolean;



  message: string;



};



type SubmitResultPayload = {



  passed: boolean;



  status: string;



  score: number;



  passedTests: number;



  totalTests: number;



  message: string;



};



export default function DevOpsWorkspace({



  problem,



}: DevOpsWorkspaceProps) {



  const router =



    useRouter();



  const technologySlug =



    String(problem.technologySlug ?? '')



      .trim()



      .toLowerCase();



  // Linux Security uses its own sandbox; existing Linux DevOps is unchanged.



  const isLinuxSecurityWorkspace =



    String(problem.slug ?? '').trim().toLowerCase().startsWith('linux-security-');



  // Network Security uses its own isolated DevOps Docker runtime.



  const isNetworkSecurityWorkspace =



    String(problem.slug ?? '').trim().toLowerCase().startsWith('network-security-') ||



    technologySlug === 'network-security';



  const isWebSecurityWorkspace =



    String(problem.slug ?? '').trim().toLowerCase().startsWith('web-security-') ||



    technologySlug === 'web-security';



  const isPythonSecurityWorkspace =



    String(problem.slug ?? '').trim().toLowerCase().startsWith('python-security-');



  // Penetration Testing shares the existing Python Security runtime.

  const isPenetrationTestingWorkspace =

    String(problem.slug ?? '').trim().toLowerCase().startsWith('penetration-testing-') ||

    technologySlug === 'penetration-testing';



  // SOC & SIEM reuses the trusted Python Security Docker runtime.
  const isSocSiemWorkspace =
    String(problem.slug ?? '').trim().toLowerCase().startsWith('soc-siem-') ||
    technologySlug === 'soc-siem';

  // Digital Forensics uses the existing Python Security Docker runtime.
  const isDigitalForensicsWorkspace =
    String(problem.slug ?? '').trim().toLowerCase().startsWith('digital-forensics-') ||
    technologySlug === 'digital-forensics';

  // Cloud Security reuses the existing Python Security Docker runtime.
  // DevSecOps uses the existing isolated Python Security runtime.
  // Incident Response shares the existing Python Security runtime and editor.
  const isIncidentResponseWorkspace =
    String(problem.slug ?? '').trim().toLowerCase().startsWith('incident-response-') ||
    technologySlug === 'incident-response';

  const isDevSecOpsWorkspace =
    String(problem.slug ?? '').trim().toLowerCase().startsWith('devsecops-') ||
    technologySlug === 'devsecops';

  const isCloudSecurityWorkspace =
    String(problem.slug ?? '').trim().toLowerCase().startsWith('cloud-security-') ||
    technologySlug === 'cloud-security';

  // Blockchain & Web3 reuse the editor layout with their own Node.js runtime.
  const blockchainStackSlugs = [
    'ethereum-solidity',
    'web3-dapp-development',
    'smart-contract-security',
    'defi-tokenization',
  ] as const;

  const blockchainProblemSlug = String(problem.slug ?? '').trim().toLowerCase();
  const blockchainStackSlug = blockchainStackSlugs.find(
    (slug) => blockchainProblemSlug.startsWith(`${slug}-`) || technologySlug === slug,
  );
  const isBlockchainWorkspace = Boolean(blockchainStackSlug);

  // Only Blockchain switches to main.mjs; existing Python labs keep main.py.
  const editorFileName = isBlockchainWorkspace ? 'main.mjs' : 'main.py';

  const isGitWorkspace =



    technologySlug === 'git';



  const isDockerWorkspace =



    technologySlug === 'docker';



  const isKubernetesWorkspace =



    technologySlug === 'kubernetes';



  const isCiCdWorkspace =



    technologySlug === 'ci-cd' ||



    technologySlug === 'cicd' ||



    technologySlug === 'ci_cd' ||



    technologySlug === 'continuous-integration-continuous-delivery' ||



    technologySlug === 'continuous-integration-continuous-deployment';



  const environmentName =

    blockchainStackSlug
      ? ({
          'ethereum-solidity': 'Ethereum & Solidity',
          'web3-dapp-development': 'Web3 & DApp Development',
          'smart-contract-security': 'Smart Contract Security',
          'defi-tokenization': 'DeFi & Tokenization',
        } as Record<string, string>)[blockchainStackSlug]
      : isIncidentResponseWorkspace
      ? 'Incident Response'
      : 
    isDevSecOpsWorkspace
       ? 'DevSecOps'
       : isCloudSecurityWorkspace
       ? 'Cloud Security'
      :     isDigitalForensicsWorkspace
      ? 'Digital Forensics'
      : isSocSiemWorkspace
      ? 'SOC & SIEM'
      : isPenetrationTestingWorkspace

      ? 'Penetration Testing'

      : isWebSecurityWorkspace



      ? 'Web Application Security'



      : isNetworkSecurityWorkspace



      ? 'Network Security'



      : isPythonSecurityWorkspace



      ? 'Python Security'



      : isLinuxSecurityWorkspace



      ? 'Linux Security'



      : isKubernetesWorkspace



      ? 'Kubernetes'



      : isDockerWorkspace



        ? 'Docker'



        : isGitWorkspace



          ? 'Git'



          : isCiCdWorkspace



            ? 'CI/CD'



            : 'Linux';



  const workspaceLabel =



    `${environmentName} Practice Workspace`;



  const terminalLabel =



    `${environmentName} Terminal`;



  const terminalFooterLabel =



    `${environmentName} • Shell`;



  const environmentBanner =



    `E-Lab ${environmentName} Environment`;



  const preparingMessage =



    `Preparing isolated ${environmentName} workspace...`;



  const sessionNotReadyMessage =



    `${environmentName} session is not ready.`;



  const createEnvironmentError =



    `Unable to create ${environmentName} environment.`;



  const startEnvironmentError =



    `Unable to start ${environmentName} environment.`;



  const submitSolutionError =



    `Unable to submit ${environmentName} solution.`;



  const terminalElementRef =



    useRef<HTMLDivElement | null>(



      null,



    );



  const terminalRef =



    useRef<XTermTerminal | null>(



      null,



    );



  const fitAddonRef =



    useRef<FitAddon | null>(



      null,



    );



  const socketRef =



    useRef<Socket | null>(



      null,



    );



  const sessionIdRef =



    useRef<string | null>(



      null,



    );



  const pendingPythonSaveRef = useRef<{ code: string; run: boolean } | null>(null);



  const commandBufferRef =



    useRef('');



  const commandRunningRef =



    useRef(false);



  const currentPathRef =



    useRef(



      DEFAULT_WORKSPACE,



    );



  const streamBufferRef =



    useRef('');



  const mountedRef =



    useRef(true);



  const [sessionId, setSessionId] =



    useState<string | null>(



      null,



    );



  const [



    environmentStatus,



    setEnvironmentStatus,



  ] =



    useState(



      'Starting environment...',



    );



  const [isReady, setIsReady] =



    useState(false);



  const [isRunning, setIsRunning] =



    useState(false);



  const [isResetting, setIsResetting] =



    useState(false);



  const [isChecking, setIsChecking] =



    useState(false);



  const [isSubmitting, setIsSubmitting] =



    useState(false);



  const [



    currentPath,



    setCurrentPath,



  ] =



    useState(



      DEFAULT_WORKSPACE,



    );



  const writePrompt =



    useCallback(



      () => {



        terminalRef.current?.write(



          createPrompt(



            currentPathRef.current,



          ),



        );



      },



      [],



    );



  const writeLine =



    useCallback(



      (



        value = '',



      ) => {



        const terminal =



          terminalRef.current;



        if (!terminal) {



          return;



        }



        const normalized =



          String(



            value,



          ).replace(



            /\r?\n/g,



            '\r\n',



          );



        terminal.writeln(



          normalized,



        );



      },



      [],



    );



  const finishCommand =



    useCallback(



      (



        path?: string,



        exitCode?: number,



      ) => {



        if (path) {



          const normalizedPath =



            path.trim();



          if (normalizedPath) {



            currentPathRef.current =



              normalizedPath;



            if (



              mountedRef.current



            ) {



              setCurrentPath(



                normalizedPath,



              );



            }



          }



        }



        const pendingSave = pendingPythonSaveRef.current;



        if (pendingSave) {



          pendingPythonSaveRef.current = null;



          if (exitCode === 0) {



            setPythonSavedCode(pendingSave.code);



            setPythonEditorMessage(pendingSave.run ? `${editorFileName} run completed` : `${editorFileName} saved`);



          } else {



            setPythonEditorMessage(



              pendingSave.run ? `${isBlockchainWorkspace ? 'Node.js' : 'Python'} exited with code ${exitCode ?? 'unknown'}` : `Unable to save ${editorFileName}`,



            );



          }



        }



        commandRunningRef.current =



          false;



        if (



          mountedRef.current



        ) {



          setIsRunning(



            false,



          );



        }



        writePrompt();



        terminalRef.current?.focus();



      },



      [



        writePrompt,
        editorFileName,
        isBlockchainWorkspace,



      ],



    );



  const processStreamData =



    useCallback(



      (



        incoming: string,



      ) => {



        const terminal =



          terminalRef.current;



        if (



          !terminal ||



          !incoming



        ) {



          return;



        }



        streamBufferRef.current +=



          incoming;



        /*



         * The backend persistent shell is expected to send:



         *



         * __ELAB_COMMAND_DONE__:0:/workspace



         *



         * after each command.



         */



        const markerRegex =



          /(?:\r?\n)?__ELAB_COMMAND_DONE__:(-?\d+):([^\r\n]+)(?:\r?\n)?/;



        const match =



          markerRegex.exec(



            streamBufferRef.current,



          );



        if (match) {



          const markerIndex =



            match.index;



          const beforeMarker =



            streamBufferRef.current.slice(



              0,



              markerIndex,



            );



          if (beforeMarker) {



            terminal.write(



              beforeMarker.replace(



                /(?<!\r)\n/g,



                '\r\n',



              ),



            );



          }



          const path =



            String(



              match[2] ??



                DEFAULT_WORKSPACE,



            ).trim();



          const remainder =



            streamBufferRef.current.slice(



              markerIndex +



                match[0].length,



            );



          streamBufferRef.current =



            '';



          finishCommand(



            path ||



              DEFAULT_WORKSPACE,



              Number(match[1]),



          );



          if (remainder) {



            processStreamData(



              remainder,



            );



          }



          return;



        }



        /*



         * A marker can be split between WebSocket packets.



         *



         * Example:



         *



         * packet 1: "__ELAB_COMM"



         * packet 2: "AND_DONE__:0:/workspace"



         *



         * Therefore keep a small possible marker suffix.



         */



        const buffer =



          streamBufferRef.current;



        let keepLength =



          0;



        const maxPossible =



          Math.min(



            buffer.length,



            COMMAND_DONE_MARKER.length,



          );



        for (



          let length =



            maxPossible;



          length > 0;



          length -= 1



        ) {



          const suffix =



            buffer.slice(



              -length,



            );



          if (



            COMMAND_DONE_MARKER.startsWith(



              suffix,



            )



          ) {



            keepLength =



              length;



            break;



          }



        }



        const printableLength =



          buffer.length -



          keepLength;



        if (



          printableLength <= 0



        ) {



          return;



        }



        const printable =



          buffer.slice(



            0,



            printableLength,



          );



        streamBufferRef.current =



          buffer.slice(



            printableLength,



          );



        terminal.write(



          printable.replace(



            /(?<!\r)\n/g,



            '\r\n',



          ),



        );



      },



      [



        finishCommand,



      ],



    );



  const createSession =



    useCallback(



      async () => {



        const response =



          await fetch(



            `${API_URL}/devops-lab/sessions`,



            {



              method: 'POST',



              headers: {



                'Content-Type':



                  'application/json',



              },



              body: JSON.stringify({



                problemSlug:



                  problem.slug,



                // The backend must map this trusted runtime key to the image.



                // Do not accept arbitrary Docker image names from clients.



                ...(blockchainStackSlug
                   ? { stackSlug: blockchainStackSlug, runtimeSlug: 'blockchain' }
                   : isIncidentResponseWorkspace
                   ? { stackSlug: 'incident-response', runtimeSlug: 'python-security' }
                   : isDevSecOpsWorkspace
                   ? { stackSlug: 'devsecops', runtimeSlug: 'python-security' }
                   : isCloudSecurityWorkspace
                   ? { stackSlug: 'cloud-security', runtimeSlug: 'python-security' }
                   : isDigitalForensicsWorkspace
                  ? { stackSlug: 'digital-forensics', runtimeSlug: 'python-security' }
                  : isSocSiemWorkspace
                  ? { stackSlug: 'soc-siem', runtimeSlug: 'python-security' }
                  : isPenetrationTestingWorkspace

                  ? { stackSlug: 'penetration-testing', runtimeSlug: 'python-security' }

                  : isWebSecurityWorkspace



                  ? { stackSlug: 'web-security', runtimeSlug: 'web-security' }



                  : isNetworkSecurityWorkspace



                  ? { stackSlug: 'network-security', runtimeSlug: 'network-security' }



                  : isLinuxSecurityWorkspace



                  ? { stackSlug: 'linux-security', runtimeSlug: 'linux-security' }



                  : isPythonSecurityWorkspace



                    ? { stackSlug: 'python-security', runtimeSlug: 'python-security' }



                    : {}),



              }),



            },



          );



        if (!response.ok) {



          const message =



            await response.text();



          throw new Error(



            message ||



              createEnvironmentError,



          );



        }



        return response.json() as Promise<CreateSessionResponse>;



      },



      [



        problem.slug,
        blockchainStackSlug,



        isLinuxSecurityWorkspace,



        isPythonSecurityWorkspace,

        isPenetrationTestingWorkspace,
        isSocSiemWorkspace,
        isDigitalForensicsWorkspace,
         isIncidentResponseWorkspace,
        isDevSecOpsWorkspace,
         isCloudSecurityWorkspace,



        isNetworkSecurityWorkspace,



        isWebSecurityWorkspace,



      createEnvironmentError,



      ],



    );



  const deleteSession =



    useCallback(



      async (



        id: string,



      ) => {



        try {



          await fetch(



            `${API_URL}/devops-lab/sessions/${encodeURIComponent(



              id,



            )}`,



            {



              method:



                'DELETE',



            },



          );



        } catch {



          /*



           * Cleanup failure must not block navigation.



           */



        }



      },



      [],



    );



  useEffect(



    () => {



      mountedRef.current =



        true;



      let disposed =



        false;



      let resizeObserver:



        ResizeObserver | null =



          null;



      let inputDisposable:



        {



          dispose: () => void;



        } | null =



          null;



      const initialize =



        async () => {



          try {



            setEnvironmentStatus(



              'Starting environment...',



            );



            /*



             * Dynamic imports keep xterm completely



             * client-side.



             */



            const [



              xtermModule,



              fitModule,



            ] =



              await Promise.all([



                import(



                  '@xterm/xterm'



                ),



                import(



                  '@xterm/addon-fit'



                ),



              ]);



            if (



              disposed ||



              !terminalElementRef.current



            ) {



              return;



            }



            const terminal =



              new xtermModule.Terminal(



                {



                  cursorBlink:



                    true,



                  cursorStyle:



                    'block',



                  convertEol:



                    true,



                  fontFamily:



                    'Consolas, Monaco, "Courier New", monospace',



                  fontSize:



                    13,



                  lineHeight:



                    1.35,



                  scrollback:



                    2000,



                  allowProposedApi:



                    false,



                  theme: {



                    background:



                      '#101827',



                    foreground:



                      '#e2e8f0',



                    cursor:



                      '#e2e8f0',



                    selectionBackground:



                      '#334155',



                  },



                },



              );



            const fitAddon =



              new fitModule.FitAddon();



            terminal.loadAddon(



              fitAddon,



            );



            terminal.open(



              terminalElementRef.current,



            );



            terminalRef.current =



              terminal;



            fitAddonRef.current =



              fitAddon;



            requestAnimationFrame(



              () => {



                try {



                  fitAddon.fit();



                } catch {



                  // Ignore initial fit race.



                }



                terminal.focus();



              },



            );



            terminal.writeln(



              `\x1b[1;36m${environmentBanner}\x1b[0m`,



            );



            terminal.writeln(



              preparingMessage,



            );



            terminal.writeln(



              '',



            );



            const created =



              await createSession();



            if (



              disposed



            ) {



              await deleteSession(



                created.sessionId,



              );



              return;



            }



            sessionIdRef.current =



              created.sessionId;



            setSessionId(



              created.sessionId,



            );



            currentPathRef.current =



              created.workspacePath ||



              DEFAULT_WORKSPACE;



            setCurrentPath(



              currentPathRef.current,



            );



            const socket = io(`${SOCKET_URL}${TERMINAL_NAMESPACE}`, {



              path: '/socket.io',



              transports: ['polling', 'websocket'],



              upgrade: true,



              reconnection: true,



              reconnectionAttempts: 5,



              reconnectionDelay: 1000,



              timeout: 15000,



              autoConnect: false,



            });



            socketRef.current =



              socket;



            socket.on(



              'connect',



              () => {



                if (



                  disposed



                ) {



                  return;



                }



                socket.emit(



                  'terminal:join',



                  {



                    sessionId:



                      created.sessionId,



                  },



                );



              },



            );



            socket.on(



              'terminal:ready',



              (



                payload:



                  TerminalReadyPayload,



              ) => {



                if (



                  disposed



                ) {



                  return;



                }



                currentPathRef.current =



                  payload.workspacePath ||



                  DEFAULT_WORKSPACE;



                streamBufferRef.current =



                  '';



                commandBufferRef.current =



                  '';



                commandRunningRef.current =



                  false;



                setCurrentPath(



                  currentPathRef.current,



                );



                setEnvironmentStatus(



                  'Environment Ready',



                );



                setIsReady(



                  true,



                );



                setIsRunning(



                  false,



                );



                terminal.writeln(



                  `Workspace: ${payload.workspacePath}`,



                );



                terminal.writeln(



                  `Shell: ${payload.shell}`,



                );



                terminal.writeln(



                  '',



                );



                writePrompt();



                terminal.focus();



              },



            );



            socket.on(



              'terminal:stream',



              (



                payload:



                  TerminalStreamPayload,



              ) => {



                if (



                  disposed



                ) {



                  return;



                }



                const data =



                  String(



                    payload?.data ??



                      '',



                  );



                if (!data) {



                  return;



                }



                processStreamData(



                  data,



                );



              },



            );



            socket.on(



              'terminal:output',



              (



                payload:



                  TerminalOutputPayload,



              ) => {



                if (



                  disposed



                ) {



                  return;



                }



                /*



                 * If stream mode has already completed the



                 * command, ignore a duplicate legacy event.



                 */



                if (



                  !commandRunningRef.current



                ) {



                  return;



                }



                if (



                  payload.stdout



                ) {



                  writeLine(



                    payload.stdout,



                  );



                }



                if (



                  payload.stderr



                ) {



                  terminal.write(



                    '\x1b[31m',



                  );



                  writeLine(



                    payload.stderr,



                  );



                  terminal.write(



                    '\x1b[0m',



                  );



                }



                finishCommand(undefined, payload.exitCode);



              },



            );



            socket.on(



              'terminal:check-result',



              (



                payload:



                  CheckResultPayload,



              ) => {



                if (



                  mountedRef.current



                ) {



                  setIsChecking(



                    false,



                  );



                }



                terminal.writeln(



                  '',



                );



                if (



                  payload.passed



                ) {



                  terminal.write(



                    '\x1b[32m',



                  );



                  terminal.writeln(



                    `✓ ${payload.message}`,



                  );



                } else {



                  terminal.write(



                    '\x1b[31m',



                  );



                  terminal.writeln(



                    `✗ ${payload.message}`,



                  );



                }



                terminal.write(



                  '\x1b[0m',



                );



                terminal.writeln(



                  '',



                );



                writePrompt();



                terminal.focus();



              },



            );



            socket.on(



              'terminal:reset-complete',



              (



                payload:



                  ResetResultPayload,



              ) => {



                commandBufferRef.current =



                  '';



                commandRunningRef.current =



                  false;



                streamBufferRef.current =



                  '';



                currentPathRef.current =



                  DEFAULT_WORKSPACE;



                if (



                  mountedRef.current



                ) {



                  setCurrentPath(



                    DEFAULT_WORKSPACE,



                  );



                  setIsResetting(



                    false,



                  );



                  setIsRunning(



                    false,



                  );



                  setIsReady(



                    true,



                  );



                  setEnvironmentStatus(



                    'Environment Ready',



                  );



                }



                terminal.clear();



                terminal.writeln(



                  `\x1b[1;36m${environmentBanner}\x1b[0m`,



                );



                terminal.writeln(



                  payload.message,



                );



                terminal.writeln(



                  '',



                );



                writePrompt();



                terminal.focus();



              },



            );



            socket.on(



              'terminal:error',



              (



                payload:



                  TerminalErrorPayload,



              ) => {



                commandBufferRef.current =



                  '';



                commandRunningRef.current =



                  false;



                streamBufferRef.current =



                  '';



                if (



                  mountedRef.current



                ) {



                  setIsRunning(



                    false,



                  );



                  setIsChecking(



                    false,



                  );



                  setIsResetting(



                    false,



                  );



                  setEnvironmentStatus(



                    'Environment Error',



                  );



                }



                terminal.writeln(



                  '',



                );



                terminal.write(



                  '\x1b[31m',



                );



                terminal.writeln(



                  payload.message ??



                    'Terminal error.',



                );



                terminal.write(



                  '\x1b[0m',



                );



                terminal.writeln(



                  '',



                );



                writePrompt();



                terminal.focus();



              },



            );



            socket.on(



              'connect_error',



              (



                error,



              ) => {



                commandRunningRef.current =



                  false;



                if (



                  mountedRef.current



                ) {



                  setIsRunning(



                    false,



                  );



                  setEnvironmentStatus(



                    'Connection Error',



                  );



                }



                terminal.writeln(



                  '',



                );



                terminal.write(



                  '\x1b[31m',



                );



                terminal.writeln(



                  `Connection error (${SOCKET_URL}): ${error.message}${error.cause ? ` | Cause: ${String(error.cause)}` : ''}`,



                );



                terminal.write(



                  '\x1b[0m',



                );



                terminal.writeln(



                  '',



                );



              },



            );



            socket.on('disconnect', (reason) => {



              pendingPythonSaveRef.current = null;



              if (disposed) return;



              commandRunningRef.current = false;



              streamBufferRef.current = '';



              setIsReady(false);



              setIsRunning(false);



              setEnvironmentStatus('Terminal Disconnected');



              terminal.writeln(`\r\nTerminal disconnected: ${reason}. Reconnecting...`);



            });



            socket.connect();



            inputDisposable =



              terminal.onData(



                (



                  data,



                ) => {



                  /*



                   * While a command is executing we do not



                   * allow another command to be submitted.



                   */



                  if (



                    commandRunningRef.current



                  ) {



                    /*



                     * Ctrl+C should at least restore the



                     * local prompt state.



                     */



                    if (



                      data === '\x03'



                    ) {



                      commandBufferRef.current =



                        '';



                      commandRunningRef.current =



                        false;



                      if (



                        mountedRef.current



                      ) {



                        setIsRunning(



                          false,



                        );



                      }



                      terminal.write(



                        '^C\r\n',



                      );



                      writePrompt();



                    }



                    return;



                  }



                  if (



                    data === '\r' ||



                    data === '\n'



                  ) {



                    const command =



                      commandBufferRef.current;



                    terminal.write(



                      '\r\n',



                    );



                    commandBufferRef.current =



                      '';



                    if (



                      !command.trim()



                    ) {



                      writePrompt();



                      return;



                    }



                    const activeSessionId =



                      sessionIdRef.current;



                    if (



                      !activeSessionId



                    ) {



                      terminal.writeln(



                        sessionNotReadyMessage,



                      );



                      writePrompt();



                      return;



                    }



                    if (



                      !socket.connected



                    ) {



                      terminal.write(



                        '\x1b[31m',



                      );



                      terminal.writeln(



                        'Terminal connection is not available.',



                      );



                      terminal.write(



                        '\x1b[0m',



                      );



                      writePrompt();



                      return;



                    }



                    commandRunningRef.current =



                      true;



                    streamBufferRef.current =



                      '';



                    if (



                      mountedRef.current



                    ) {



                      setIsRunning(



                        true,



                      );



                    }



                    socket.emit(



                      'terminal:command',



                      {



                        sessionId:



                          activeSessionId,



                        command,



                      },



                    );



                    return;



                  }



                  if (



                    data === '\x7f' ||



                    data === '\b'



                  ) {



                    if (



                      commandBufferRef.current



                        .length >



                      0



                    ) {



                      commandBufferRef.current =



                        commandBufferRef.current.slice(



                          0,



                          -1,



                        );



                      terminal.write(



                        '\b \b',



                      );



                    }



                    return;



                  }



                  if (



                    data === '\x03'



                  ) {



                    commandBufferRef.current =



                      '';



                    terminal.write(



                      '^C\r\n',



                    );



                    writePrompt();



                    return;



                  }



                  if (



                    data === '\x0c'



                  ) {



                    terminal.clear();



                    writePrompt();



                    if (



                      commandBufferRef.current



                    ) {



                      terminal.write(



                        commandBufferRef.current,



                      );



                    }



                    return;



                  }



                  if (



                    data === '\t'



                  ) {



                    return;



                  }



                  if (



                    data.startsWith(



                      '\x1b',



                    )



                  ) {



                    return;



                  }



                  const printable =



                    Array.from(



                      data,



                    )



                      .filter(



                        (



                          character,



                        ) => {



                          const code =



                            character.charCodeAt(



                              0,



                            );



                          return (



                            code >= 32 &&



                            code !== 127



                          );



                        },



                      )



                      .join(



                        '',



                      );



                  if (



                    !printable



                  ) {



                    return;



                  }



                  commandBufferRef.current +=



                    printable;



                  terminal.write(



                    printable,



                  );



                },



              );



            if (



              terminalElementRef.current



            ) {



              resizeObserver =



                new ResizeObserver(



                  () => {



                    try {



                      fitAddon.fit();



                    } catch {



                      // Ignore fit errors during layout changes.



                    }



                  },



                );



              resizeObserver.observe(



                terminalElementRef.current,



              );



            }



          } catch (



            error



          ) {



            const message =



              error instanceof Error



                ? error.message



                : startEnvironmentError;



            if (



              mountedRef.current



            ) {



              setEnvironmentStatus(



                'Environment Error',



              );



              setIsReady(



                false,



              );



              setIsRunning(



                false,



              );



            }



            terminalRef.current?.writeln(



              '',



            );



            terminalRef.current?.write(



              '\x1b[31m',



            );



            terminalRef.current?.writeln(



              `Error: ${message}`,



            );



            terminalRef.current?.write(



              '\x1b[0m',



            );



          }



        };



      void initialize();



      return () => {



        disposed =



          true;



        mountedRef.current =



          false;



        inputDisposable?.dispose();



        resizeObserver?.disconnect();



        const socket =



          socketRef.current;



        socketRef.current =



          null;



        socket?.removeAllListeners();



        socket?.disconnect();



        fitAddonRef.current =



          null;



        terminalRef.current?.dispose();



        terminalRef.current =



          null;



        commandBufferRef.current =



          '';



        streamBufferRef.current =



          '';



        commandRunningRef.current =



          false;



        const activeSessionId =



          sessionIdRef.current;



        sessionIdRef.current =



          null;



        if (



          activeSessionId



        ) {



          void deleteSession(



            activeSessionId,



          );



        }



      };



    },



    [



      createSession,



      deleteSession,



      environmentBanner,



      preparingMessage,



      sessionNotReadyMessage,



      startEnvironmentError,



      finishCommand,



      processStreamData,



      writeLine,



      writePrompt,



    ],



  );



  const handleReset =



    useCallback(



      () => {



        const socket =



          socketRef.current;



        const activeSessionId =



          sessionIdRef.current;



        if (



          !socket ||



          !activeSessionId ||



          !isReady ||



          isResetting ||



          isRunning



        ) {



          return;



        }



        setIsResetting(



          true,



        );



        socket.emit(



          'terminal:reset',



          {



            sessionId:



              activeSessionId,



          },



        );



      },



      [



        isReady,



        isResetting,



        isRunning,



      ],



    );



  const handleCheck =



    useCallback(



      () => {



        const socket =



          socketRef.current;



        const activeSessionId =



          sessionIdRef.current;



        if (



          !socket ||



          !activeSessionId ||



          !isReady ||



          isChecking ||



          isRunning



        ) {



          return;



        }



        setIsChecking(



          true,



        );



        socket.emit(



          'terminal:check',



          {



            sessionId:



              activeSessionId,



          },



        );



      },



      [



        isReady,



        isChecking,



        isRunning,



      ],



    );



  const handleSubmit =



    useCallback(



      async () => {



        const activeSessionId =



          sessionIdRef.current;



        if (



          !activeSessionId ||



          !isReady ||



          isSubmitting ||



          isRunning ||



          isResetting ||



          isChecking



        ) {



          return;



        }



        setIsSubmitting(true);



        const terminal =



          terminalRef.current;



        try {



          terminal?.writeln('');



          terminal?.writeln(



            'Submitting solution...',



          );



          const response =



            await fetch(



              `${API_URL}/devops-lab/sessions/${encodeURIComponent(



                activeSessionId,



              )}/submit`,



              {



                method: 'POST',



              },



            );



          if (!response.ok) {



            const message =



              await response.text();



            throw new Error(



              message ||



                submitSolutionError,



            );



          }



          const result =



            (await response.json()) as SubmitResultPayload;



          terminal?.writeln('');



          terminal?.write(



            result.passed



              ? '\x1b[32m'



              : '\x1b[31m',



          );



          terminal?.writeln(



            `${result.passed ? '✓' : '✗'} ${result.status}`,



          );



          terminal?.write(



            '\x1b[0m',



          );



          terminal?.writeln(



            `Score: ${result.score}%`,



          );



          terminal?.writeln(



            `Tests Passed: ${result.passedTests}/${result.totalTests}`,



          );



          terminal?.writeln(



            result.message,



          );



          terminal?.writeln('');



          writePrompt();



          terminal?.focus();



        } catch (error) {



          const message =



            error instanceof Error



              ? error.message



              : submitSolutionError;



          terminal?.writeln('');



          terminal?.write(



            '\x1b[31m',



          );



          terminal?.writeln(



            `Submission failed: ${message}`,



          );



          terminal?.write(



            '\x1b[0m',



          );



          terminal?.writeln('');



          writePrompt();



          terminal?.focus();



        } finally {



          if (mountedRef.current) {



            setIsSubmitting(



              false,



            );



          }



        }



      },



      [



        isReady,



        isSubmitting,



        isRunning,



        isResetting,



        isChecking,



        submitSolutionError,



        writePrompt,



      ],



    );



  // VS Code-inspired single-file editor, enabled for Python Security, Network Security, and Web Application Security.



  const [pythonCode, setPythonCode] = useState<string>(



    isBlockchainWorkspace ? '// Write your Blockchain JavaScript solution in main.mjs\n\n' : '# Write your Python solution in main.py\n\n',



  );



  // Run Python uses explicit sample stdin; hidden tests are still graded by the backend.
  const [pythonRunInput, setPythonRunInput] = useState<string>(
    problem.slug === 'cloud-security-identify-cloud-service-model' ? 'EC2' : '',
  );

  const [pythonSavedCode, setPythonSavedCode] = useState<string | null>(null);



  const [pythonEditorMessage, setPythonEditorMessage] = useState(editorFileName);



  const pythonEditorRef = useRef<HTMLTextAreaElement | null>(null);



  const pythonDirty = pythonSavedCode !== pythonCode;



  const sendPythonFile = useCallback((runAfterSave: boolean) => {



    const socket = socketRef.current;



    const activeSessionId = sessionIdRef.current;



    if (!socket?.connected || !activeSessionId || !isReady || commandRunningRef.current) {



      setPythonEditorMessage('Wait for the terminal to become ready.');



      return;



    }



    const bytes = new TextEncoder().encode(pythonCode);



    let binary = '';



    for (let index = 0; index < bytes.length; index += 8192) {



      binary += String.fromCharCode(...bytes.subarray(index, index + 8192));



    }



    const encoded = btoa(binary);



    const saveCommand = `printf '%s' '${encoded}' | base64 -d > /workspace/${editorFileName}`;



    // Encode stdin separately so shell quoting and embedded newlines cannot corrupt commands.
    // The backend runs each hidden test independently; this input is for Run Python only.
    const inputBytes = new TextEncoder().encode(pythonRunInput);
    let inputBinary = '';
    for (let index = 0; index < inputBytes.length; index += 8192) {
      inputBinary += String.fromCharCode(...inputBytes.subarray(index, index + 8192));
    }
    const inputEncoded = btoa(inputBinary);
    const executable = isBlockchainWorkspace ? 'node' : 'python3';
    const runCommand = inputEncoded
      ? `printf '%s' '${inputEncoded}' | base64 -d | ${executable} /workspace/${editorFileName}`
      : `${executable} /workspace/${editorFileName} < /dev/null`;
    const command = runAfterSave ? `${saveCommand} && ${runCommand}` : saveCommand;



    commandRunningRef.current = true;



    streamBufferRef.current = '';



    setIsRunning(true);



    pendingPythonSaveRef.current = { code: pythonCode, run: runAfterSave };



    setPythonEditorMessage(runAfterSave ? `Saving and running ${editorFileName}...` : `Saving ${editorFileName}...`);



    terminalRef.current?.writeln('');



    terminalRef.current?.writeln(`$ Saving /workspace/${editorFileName}`);



    socket.emit('terminal:command', { sessionId: activeSessionId, command });



  }, [isReady, pythonCode, pythonRunInput, isBlockchainWorkspace, editorFileName]);



  const handlePythonEditorKeyDown = useCallback((event: KeyboardEvent<HTMLTextAreaElement>) => {



    if (event.key === 'Tab') {



      event.preventDefault();



      const target = event.currentTarget;



      const start = target.selectionStart;



      const end = target.selectionEnd;



      setPythonCode(previous => previous.slice(0, start) + '    ' + previous.slice(end));



      requestAnimationFrame(() => {



        target.selectionStart = start + 4;



        target.selectionEnd = start + 4;



      });



    }



    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {



      event.preventDefault();



      sendPythonFile(false);



    }



  }, [sendPythonFile]);



  const focusTerminal =



    useCallback(



      () => {



        terminalRef.current?.focus();



      },



      [],



    );



  return (



    <main



      className={



        styles.workspace



      }



    >



      {}



      <header



        className={



          styles.workspaceHeader



        }



      >



        <button



          type="button"



          className={



            styles.backButton



          }



          onClick={() =>



            router.back()



          }



        >



          <ArrowLeft />



          <span>



            Back



          </span>



        </button>



        <div



          className={



            styles.problemTitle



          }



        >



          <TerminalIcon



            className={



              styles.titleIcon



            }



          />



          <div



            className={



              styles.problemTitleText



            }



          >



            <strong>



              {problem.title}



            </strong>



            <span>



              {workspaceLabel}



            </span>



          </div>



        </div>



        <div



          className={



            styles.workspaceActions



          }



        >



          <button



            type="button"



            className={



              styles.resetButton



            }



            onClick={



              handleReset



            }



            disabled={



              !isReady ||



              isResetting ||



              isRunning ||



              isSubmitting



            }



          >



            <RotateCcw



              size={14}



            />



            {isResetting



              ? 'Resetting...'



              : 'Reset'}



          </button>



          <button



            type="button"



            className={



              styles.checkButton



            }



            onClick={



              handleCheck



            }



            disabled={



              !isReady ||



              isChecking ||



              isRunning ||



              isSubmitting



            }



          >



            {isChecking



              ? 'Checking...'



              : 'Check Solution'}



          </button>



          <button



            type="button"



            className={



              styles.checkButton



            }



            onClick={



              handleSubmit



            }



            disabled={



              !isReady ||



              isSubmitting ||



              isRunning ||



              isResetting ||



              isChecking



            }



          >



            {isSubmitting



              ? 'Submitting...'



              : 'Submit'}



          </button>



        </div>



      </header>



      {}



      <section



        className={



          styles.workspaceBody



        }



      >



        {}



        <aside



          className={



            styles.problemPanel



          }



        >



          <div



            className={



              styles.problemPanelHeader



            }



          >



            Problem



          </div>



          <div



            className={



              styles.problemPanelContent



            }



          >



            <div



              className={



                styles.difficulty



              }



            >



              {problem.difficulty}



            </div>



            <h1>



              {problem.title}



            </h1>



            {problem.shortDescription && (



              <p



                className={



                  styles.statement



                }



              >



                {



                  problem.shortDescription



                }



              </p>



            )}



            <h2>



              Problem Statement



            </h2>



            <p



              className={



                styles.statement



              }



            >



              {



                problem.problemStatement



              }



            </p>



            {problem.inputFormat && (



              <>



                <h2>



                  Input Format



                </h2>



                <div



                  className={



                    styles.contextBox



                  }



                >



                  <span>



                    Input



                  </span>



                  <p>



                    {



                      problem.inputFormat



                    }



                  </p>



                </div>



              </>



            )}



            {problem.outputFormat && (



              <>



                <h2>



                  Expected Result



                </h2>



                <div



                  className={



                    styles.contextBox



                  }



                >



                  <span>



                    Result



                  </span>



                  <p>



                    {



                      problem.outputFormat



                    }



                  </p>



                </div>



              </>



            )}



            {problem.constraints &&



              problem.constraints.length >



                0 && (



                <>



                  <h2>



                    Constraints



                  </h2>



                  <div



                    className={



                      styles.contextBox



                    }



                  >



                    <span>



                      Requirements



                    </span>



                    <p>



                      {problem.constraints



                        .map(



                          (



                            constraint,



                            index,



                          ) =>



                            `${index + 1}. ${constraint}`,



                        )



                        .join(



                          '\n',



                        )}



                    </p>



                  </div>



                </>



              )}



            {problem.skills &&



              problem.skills.length >



                0 && (



                <>



                  <h2>



                    Skills



                  </h2>



                  <div



                    className={



                      styles.skillTags



                    }



                  >



                    {problem.skills.map(



                      (



                        skill,



                      ) => (



                        <span



                          key={



                            skill



                          }



                        >



                          {skill}



                        </span>



                      ),



                    )}



                  </div>



                </>



              )}



            <h2>



              Practice Context



            </h2>



            <div



              className={



                styles.contextBox



              }



            >



              <span>



                Environment



              </span>



              <p>



                {environmentName}



                {'\n'}



                Workspace: /workspace



                {'\n'}



                Terminal: Shell



              </p>



            </div>



          </div>



        </aside>



        {}



        <section



          className={



            styles.terminalPanel



          }



          style={(isPythonSecurityWorkspace || isNetworkSecurityWorkspace || isWebSecurityWorkspace || isPenetrationTestingWorkspace || isSocSiemWorkspace || isDigitalForensicsWorkspace || isCloudSecurityWorkspace || isDevSecOpsWorkspace || isIncidentResponseWorkspace || isBlockchainWorkspace) ? { display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' } : undefined}



        >



          {(isPythonSecurityWorkspace || isNetworkSecurityWorkspace || isWebSecurityWorkspace || isPenetrationTestingWorkspace || isSocSiemWorkspace || isDigitalForensicsWorkspace || isCloudSecurityWorkspace || isDevSecOpsWorkspace || isIncidentResponseWorkspace || isBlockchainWorkspace) && (



            <div style={{ display: 'flex', flexDirection: 'column', flex: '1 1 58%', minHeight: 260, minWidth: 0, overflow: 'hidden', background: '#1e1e1e', borderBottom: '1px solid #334155', color: '#d4d4d4' }}>



              <div style={{ display: 'flex', minHeight: 38, alignItems: 'stretch', background: '#252526', borderBottom: '1px solid #333' }}>



                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 18px', background: '#1e1e1e', borderTop: '2px solid #60a5fa', fontFamily: 'Consolas, monospace', fontSize: 12 }}>



                  <span style={{ color: '#facc15', fontWeight: 700 }}>{isBlockchainWorkspace ? 'JS' : 'Py'}</span>



                  <span>{editorFileName}</span>



                  {pythonDirty && <span title="Unsaved changes" style={{ color: '#cbd5e1' }}>●</span>}



                </div>



                <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center', paddingRight: 12 }}>



                  <button type="button" onClick={() => sendPythonFile(false)} disabled={!isReady || isRunning} style={{ padding: '5px 12px', border: '1px solid #475569', borderRadius: 5, background: '#334155', color: '#fff', cursor: 'pointer' }}>Save</button>



                  <button type="button" onClick={() => sendPythonFile(true)} disabled={!isReady || isRunning} style={{ padding: '5px 12px', border: 0, borderRadius: 5, background: '#2563eb', color: '#fff', cursor: 'pointer' }}>{isBlockchainWorkspace ? '▶ Run Blockchain' : '▶ Run Python'}</button>



                </div>



              </div>



              <div style={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>



                <div style={{ width: 132, flexShrink: 0, background: '#252526', borderRight: '1px solid #333', fontSize: 12 }}>



                  <div style={{ padding: '12px 10px 8px', color: '#aaa', fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>EXPLORER</div>



                  <div style={{ padding: '5px 9px', fontWeight: 600, color: '#ddd' }}>⌄ WORKSPACE</div>



                  <button type="button" onClick={() => pythonEditorRef.current?.focus()} style={{ width: '100%', border: 0, background: '#37373d', color: '#d4d4d4', textAlign: 'left', padding: '7px 12px 7px 20px', cursor: 'pointer', fontFamily: 'Consolas, monospace', fontSize: 12 }}><span style={{ color: '#facc15' }}>{isBlockchainWorkspace ? 'JS' : 'Py'}</span> {editorFileName}</button>



                </div>



                <div style={{ flex: 1, minWidth: 0, display: 'flex', overflow: 'hidden' }}>



                  <div aria-hidden="true" style={{ flexShrink: 0, width: 42, padding: '12px 8px 12px 0', textAlign: 'right', overflow: 'hidden', background: '#1e1e1e', color: '#858585', font: '13px/21px Consolas, Monaco, monospace', userSelect: 'none' }}>



                    {pythonCode.split('\n').map((_, index) => <div key={index}>{index + 1}</div>)}



                  </div>



                  <textarea ref={pythonEditorRef} aria-label={`${environmentName} ${editorFileName} code editor`} spellCheck={false} autoCapitalize="off" autoComplete="off" autoCorrect="off" value={pythonCode} onChange={event => setPythonCode(event.target.value)} onKeyDown={handlePythonEditorKeyDown} style={{ flex: 1, minWidth: 0, height: '100%', resize: 'none', border: 0, outline: 'none', padding: '12px 16px 12px 4px', background: '#1e1e1e', color: '#d4d4d4', caretColor: '#fff', font: '13px/21px Consolas, Monaco, monospace', tabSize: 4, whiteSpace: 'pre', overflow: 'auto' }} />



                </div>



              </div>



              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 12px', background: '#252526', borderTop: '1px solid #333' }}>
                <label htmlFor="elab-python-stdin" style={{ color: '#d4d4d4', fontSize: 12, whiteSpace: 'nowrap' }}>Run Input (stdin)</label>
                <input
                  id="elab-python-stdin"
                  aria-label={isBlockchainWorkspace ? "Standard input for Run Blockchain" : "Standard input for Run Python"}
                  value={pythonRunInput}
                  onChange={event => setPythonRunInput(event.target.value)}
                  placeholder="Enter sample input (e.g. EC2)"
                  style={{ flex: 1, minWidth: 0, padding: '6px 8px', border: '1px solid #475569', borderRadius: 4, background: '#1e1e1e', color: '#fff', fontFamily: 'Consolas, monospace', fontSize: 12 }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 12px', background: '#007acc', color: '#fff', fontSize: 11 }}><span>{pythonEditorMessage}</span><span>{isBlockchainWorkspace ? 'JavaScript · UTF-8 · main.mjs' : 'Python · UTF-8 · main.py'}</span></div>



            </div>



          )}



          <div



            className={



              styles.terminalHeader



            }



          >



            <div



              className={



                styles.terminalHeaderLeft



              }



            >



              <TerminalIcon



                size={15}



              />



              <span>



                {terminalLabel}



              </span>



            </div>



            <div



              className={



                styles.terminalHeaderRight



              }



            >



              <span



                className={



                  styles.statusDot



                }



              />



              <span>



                {



                  environmentStatus



                }



              </span>



            </div>



          </div>



          {}



          <div



            className={



              styles.terminalBody



            }



              style={(isPythonSecurityWorkspace || isNetworkSecurityWorkspace || isWebSecurityWorkspace || isPenetrationTestingWorkspace || isSocSiemWorkspace || isDigitalForensicsWorkspace || isCloudSecurityWorkspace || isDevSecOpsWorkspace || isIncidentResponseWorkspace || isBlockchainWorkspace) ? { flex: '1 1 35%', minHeight: 120, height: 'auto' } : undefined}



            onClick={



              focusTerminal



            }



          >



            <div



              ref={



                terminalElementRef



              }



              style={{



                width: '100%',



                height: '100%',



              }}



            />



          </div>



          <div



            className={



              styles.terminalFooter



            }



          >



            <span>



              {terminalFooterLabel}



            </span>



            <strong>



              {sessionId



                ? currentPath



                : 'Starting...'}



            </strong>



          </div>



        </section>



      </section>



    </main>



  );

}
