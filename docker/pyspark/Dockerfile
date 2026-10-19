FROM python:3.11-slim-bookworm

ENV DEBIAN_FRONTEND=noninteractive \
    PYTHONUNBUFFERED=1 \
    PYSPARK_PYTHON=python3 \
    PYSPARK_DRIVER_PYTHON=python3 \
    SPARK_LOCAL_IP=127.0.0.1

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        openjdk-17-jre-headless \
        procps \
        tini && \
    rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir \
    pyspark==3.5.6 \
    pandas==2.2.3 \
    pyarrow==19.0.1

RUN useradd -m -u 10001 learner && \
    mkdir -p /workspace /data && \
    chown -R learner:learner /workspace /data

WORKDIR /workspace

USER learner

ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["python3"]