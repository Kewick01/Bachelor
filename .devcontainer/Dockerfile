FROM mcr.microsoft.com/devcontainers/python:1-3.12-bookworm

WORKDIR /workspace

COPY app.py /app/
COPY home.py /app/
COPY login /app/
COPY logout.py /app/
COPY register.py /app/
COPY firebase_config.py /app/
COPY requirements.txt /app/
COPY devcontainer.json /app/
RUN pip install -r requirements.txt

EXPOSE 3000

CMD [ "python", "app.py" ]