# E-Lab Penetration Testing offline Python runner

Build (PowerShell, from this folder):

```powershell
docker build -t elab-penetration-testing:latest .
docker run --rm --network none --read-only --cap-drop ALL --security-opt no-new-privileges --pids-limit 64 --memory 256m --cpus 1 elab-penetration-testing:latest
```

Run an individual solution against standard input (PowerShell):

```powershell
'192.168.1.0/24' | docker run --rm -i --network none --read-only --cap-drop ALL --security-opt no-new-privileges --pids-limit 64 --memory 256m --cpus 1 --mount "type=bind,source=$((Get-Location).Path),target=/workspace,readonly" elab-penetration-testing:latest python3 -B /workspace/main.py
```

Keep learner source and hidden tests separate on the server. Never mount Docker socket or host secrets. Apply an execution timeout in the NestJS judge, since `docker run` itself does not set a wall-clock timeout. For programs requiring temporary files, add a restricted tmpfs mount, e.g. `--tmpfs /tmp:rw,noexec,nosuid,size=16m`.

This image intentionally does not install Kali, Metasploit, or live network scanning utilities. It is intended for offline data analysis and simulated pentest exercises. Building/running Docker requires Docker Desktop on the developer's machine.
