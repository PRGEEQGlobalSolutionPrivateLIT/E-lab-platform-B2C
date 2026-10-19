FROM python:3.13-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /opt/fastapi

RUN pip install --no-cache-dir \
    fastapi \
    "uvicorn[standard]" \
    httpx

WORKDIR /workspace

EXPOSE 8000

CMD ["python", "--version"]