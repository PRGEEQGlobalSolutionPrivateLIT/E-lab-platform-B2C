FROM python:3.12-slim-bookworm

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    HOME=/home/learner

RUN groupadd --gid 10001 learner \
 && useradd --uid 10001 --gid learner --create-home --shell /bin/sh learner \
 && mkdir -p /workspace \
 && chown learner:learner /workspace

WORKDIR /workspace
USER learner
CMD ["python3", "--version"]
