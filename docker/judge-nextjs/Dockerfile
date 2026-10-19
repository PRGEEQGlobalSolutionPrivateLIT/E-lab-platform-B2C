FROM node:22-alpine

# Next.js native runtime compatibility on Alpine.
RUN apk add --no-cache libc6-compat

WORKDIR /runtime

COPY package.json ./package.json

# Keep all framework/compiler dependencies inside the image.
# No package download is required while learner code is running.
RUN npm install --omit=dev --no-audit --no-fund \
    && npm cache clean --force

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PATH="/runtime/node_modules/.bin:${PATH}"
ENV NODE_PATH="/runtime/node_modules"

WORKDIR /workspace

CMD ["sh", "-lc", "node --version && next --version"]
