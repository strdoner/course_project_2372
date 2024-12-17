FROM python:3.11.10-bullseye

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app/backend

COPY requirements.txt /app/backend/
RUN pip install --no-cache --upgrade pip
RUN pip install --no-cache -r requirements.txt
RUN pip install --no-cache gunicorn

COPY . .
COPY .env ./backend/

EXPOSE 8000
RUN chmod +x /app/backend/entrypoint.sh
ENTRYPOINT ["sh", "/app/backend/entrypoint.sh"]
