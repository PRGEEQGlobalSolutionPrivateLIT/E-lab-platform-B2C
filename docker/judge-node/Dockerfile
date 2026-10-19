FROM node:22-bookworm-slim

RUN useradd \
    --create-home \
    --uid 10001 \
    --shell /bin/bash \
    judge

USER judge

WORKDIR /workspace

CMD ["node", "--version"]