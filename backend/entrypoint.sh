#!/bin/sh
until python manage.py migrate --noinput
do
    echo "Waiting for db to be ready..."
    sleep 2
done


exec "$@"