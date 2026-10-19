
# E-Lab Blockchain & Web3 Practice Runtime

FROM node:22-bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive \
    NODE_ENV=development \
    npm_config_update_notifier=false \
    npm_config_fund=false \
    npm_config_audit=false \
    HOME=/home/learner

# System dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       ca-certificates bash git python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

# Install blockchain tooling outside /workspace
WORKDIR /opt/elab-blockchain

RUN npm init -y \
    && npm pkg set type=module \
    && npm install --no-audit --no-fund \
       hardhat@^3 \
       solc@0.8.30 \
       ethers@^6 \
       typescript@^5 \
       tsx@^4 \
       ganache@^7.9.2 \
    && node --version \
    && ./node_modules/.bin/solcjs --version \
    && ./node_modules/.bin/hardhat --version \
    && ./node_modules/.bin/ganache --version

ENV PATH="/opt/elab-blockchain/node_modules/.bin:${PATH}" \
    NODE_PATH="/opt/elab-blockchain/node_modules"

# Unprivileged learner account
RUN groupadd --gid 10001 learner \
    && useradd --uid 10001 --gid 10001 \
       --create-home --shell /bin/sh learner \
    && mkdir -p /workspace \
    && chown -R learner:learner \
       /workspace /opt/elab-blockchain /home/learner

USER learner

WORKDIR /workspace

CMD ["/bin/sh"]
