FROM node:22-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /runtime

COPY package.json ./package.json

RUN npm install --no-audit --no-fund \
    && npm cache clean --force

ENV NODE_ENV=production
ENV PATH="/runtime/node_modules/.bin:${PATH}"
ENV NODE_PATH="/runtime/node_modules"

WORKDIR /workspace

CMD ["sh", "-lc", "node --version && /runtime/node_modules/.bin/tsc --version"]