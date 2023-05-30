clear-db:
	docker-compose down
	docker volume rm lesson-typeorm_pgdata

setup-db:
	yarn db:migration:run
	yarn db:seed