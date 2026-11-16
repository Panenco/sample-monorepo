#!/bin/sh
set -e

pnpm install --frozen-lockfile
pnpm --filter @app/api db:migrate
pnpm --filter @app/api db:seed
exec pnpm dev
