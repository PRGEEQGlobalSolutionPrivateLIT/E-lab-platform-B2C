FROM python:3.12-slim-bookworm

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      bash \
      curl \
      ca-certificates \
      jq \
      iproute2 \
      dnsutils \
      openssl && \
    rm -rf /var/lib/apt/lists/*

RUN groupadd -r learner && \
    useradd -r -g learner -m -s /bin/bash learner && \
    mkdir -p /workspace && \
    chown -R learner:learner /workspace

WORKDIR /workspace

USER learner

CMD ["/bin/bash"]