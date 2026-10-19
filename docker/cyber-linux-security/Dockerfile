
FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      bash \
      coreutils \
      findutils \
      grep \
      sed \
      gawk \
      procps \
      util-linux \
      passwd \
      iproute2 \
      iputils-ping \
      openssh-client \
      ca-certificates \
      curl \
      jq \
      file \
      acl \
      sudo \
      less \
      nano && \
    rm -rf /var/lib/apt/lists/*

# Create a non-root learner account
RUN useradd -m -s /bin/bash learner

# Prepare isolated lab directories
RUN mkdir -p \
      /workspace \
      /lab/etc/ssh \
      /lab/firewall \
      /lab/var/log \
      /lab/audit \
      /lab/security

# Create simulated SSH configuration
RUN printf '%s\n' \
      'Port 22' \
      'PermitRootLogin yes' \
      'PasswordAuthentication yes' \
      'PubkeyAuthentication yes' \
      > /lab/etc/ssh/sshd_config

# Create simulated firewall rules
RUN printf '%s\n' \
      'DEFAULT_INPUT=ACCEPT' \
      'ALLOW_TCP=22,80,443' \
      > /lab/firewall/rules.conf

# Create simulated authentication logs
RUN printf '%s\n' \
      'Oct 12 09:15:00 lab sshd: Failed password for invalid user admin from 192.0.2.10' \
      'Oct 12 09:16:00 lab sshd: Accepted publickey for learner from 192.0.2.20' \
      'Oct 12 09:17:00 lab sudo: learner : COMMAND=/usr/bin/id' \
      > /lab/var/log/auth.log

# Give the learner access to training files only
RUN chown -R learner:learner /workspace /lab

WORKDIR /workspace

USER learner

CMD ["/bin/bash"]
