FROM mcr.microsoft.com/devcontainers/python:1-3.12-bookworm

WORKDIR /workspaces

COPY .devcontainer/backend /workspaces/backend/

WORKDIR /workspace/backend/src

COPY /requirements.txt /workspace/backend/src/

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 3000
