FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PIP_NO_CACHE_DIR=1

WORKDIR /workspace

COPY requirements.txt /tmp/requirements.txt

RUN python3 -m pip install --upgrade pip \
    && python3 -m pip install -r /tmp/requirements.txt \
    && python3 -c "import numpy, pandas, sklearn, scipy, joblib; print('Python ML dependencies installed successfully')" \
    && rm -f /tmp/requirements.txt

CMD ["python3"]