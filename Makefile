run:
		sudo docker-compose up

run-dev:
		sudo docker-compose -f docker-compose-dev.yml up

run-dev-backend:
		sudo docker-compose -f docker-compose-dev.yml run backend python manage.py runserver 0.0.0.0:8000

build:
		sudo docker-compose build

build-dev:
		sudo docker-compose -f docker-compose-dev.yml build

build-dev-backend:
		sudo docker-compose -f docker-compose-dev.yml build backend

build-dev-frontend:
		sudo docker-compose -f docker-compose-dev.yml build frontend

test:
		sudo docker-compose -f docker-compose-dev.yml run backend python manage.py test

shell:
		sudo docker-compose -f docker-compose-dev.yml run backend python manage.py shell

setup-dev:
		sudo docker-compose -f docker-compose-dev.yml run frontend npm install
