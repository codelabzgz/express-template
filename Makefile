.PHONY: build
build: ## Build the docker image.
	docker compose build

.PHONY: start
start: ## Start the docker container.
	docker compose up -d --force-recreate

.PHONY: stop
stop: ## Stop the docker container.
	docker compose down