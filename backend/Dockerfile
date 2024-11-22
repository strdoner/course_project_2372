FROM python:3.11.10-bullseye

ENV PYTHONUNBUFFERED=1

WORKDIR /app/backend

COPY requirements.txt /app/backend/
RUN pip install --no-cache --upgrade pip
RUN pip install --no-cache -r requirements.txt

COPY . .
COPY .env ./backend

EXPOSE 8000
RUN chmod +x /app/backend/entrypoint.sh
ENTRYPOINT ["/app/backend/entrypoint.sh"]
CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]
