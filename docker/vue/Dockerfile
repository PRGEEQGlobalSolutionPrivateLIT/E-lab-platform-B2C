FROM node:22-bookworm-slim

WORKDIR /opt/vue

ENV NODE_ENV=development
ENV npm_config_cache=/tmp/npm-cache

RUN npm install \
    vue@3 \
    @vue/compiler-sfc@3 \
    @vitejs/plugin-vue@latest \
    vite@latest

ENV NODE_PATH=/opt/vue/node_modules
ENV PATH="/opt/vue/node_modules/.bin:${PATH}"

WORKDIR /workspace

CMD ["sh"]