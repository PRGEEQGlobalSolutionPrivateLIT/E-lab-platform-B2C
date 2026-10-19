FROM python:3.12-slim-bookworm

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PIP_NO_CACHE_DIR=1

RUN apt-get update \
    && apt-get install -y --no-install-recommends bash ca-certificates coreutils findutils grep sed procps \
    && rm -rf /var/lib/apt/lists/*

RUN python -m pip install --no-cache-dir \
    cryptography==46.0.2 \
    requests==2.32.5 \
    pyjwt==2.10.1 \
    beautifulsoup4==4.14.2

RUN groupadd --gid 10001 learner \
    && useradd --uid 10001 --gid 10001 --create-home --shell /bin/bash learner \
    && mkdir -p /workspace \
    && chown -R learner:learner /workspace

USER learner
WORKDIR /workspace
CMD ["/bin/bash"]
