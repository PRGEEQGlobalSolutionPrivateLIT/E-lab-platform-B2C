FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      bash \
      coreutils \
      iproute2 \
      iputils-ping \
      dnsutils \
      net-tools \
      traceroute \
      curl \
      wget \
      jq \
      openssl \
      ca-certificates \
      tcpdump \
      nmap \
      tshark \
      python3 \
      python3-pip \
      procps \
      grep \
      sed \
      gawk \
      && rm -rf /var/lib/apt/lists/*

RUN useradd -m -s /bin/bash learner && \
    mkdir -p /workspace && \
    chown -R learner:learner /workspace

WORKDIR /workspace

USER learner

CMD ["/bin/bash"]