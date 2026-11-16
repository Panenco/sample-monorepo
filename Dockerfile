# Development image: runs the whole monorepo (API + website) with hot reload.
# Your code is mounted in from your laptop by docker-compose.yml, so nothing is copied here.
FROM node:24.16.0-slim

RUN apt-get update && apt-get install -y --no-install-recommends openssl \
  && rm -rf /var/lib/apt/lists/*

ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
ENV npm_config_store_dir=/pnpm-store
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate

WORKDIR /repo
CMD ["sh", "docker/start.sh"]
