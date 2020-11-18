python manage.py collectstatic
python manage.py makemigrations
python manage.py migrate
gunicorn backend_managing_system.wsgi:application --bind 0.0.0.0:8000
