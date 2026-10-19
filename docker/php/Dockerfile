FROM php:8.3-cli-alpine

WORKDIR /workspace

RUN addgroup -S runner && \
    adduser -S runner -G runner

RUN chown -R runner:runner /workspace

USER runner

CMD ["php", "--version"]