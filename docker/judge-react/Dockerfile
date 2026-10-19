FROM node:22-bookworm-slim

WORKDIR /runtime

COPY package.json ./

RUN npm install --omit=dev

RUN useradd \
    --create-home \
    --uid 10001 \
    --shell /bin/bash \
    judge

USER judge

WORKDIR /workspace

ENV NODE_PATH=/runtime/node_modules

CMD ["node", "--version"]