# Starter monorepo

A ready-to-use starting point for building a web application: a website, an API and a database,
with login already working. Build your own product on top of it.

## Start the app

You only need [Docker Desktop](https://www.docker.com/products/docker-desktop/).

```sh
docker compose up
```

The first start takes a few minutes while it installs everything. When you see
`API running on http://localhost:3001/api`, open http://localhost:3000 and log in with
**admin / admin**. The page you land on explains how the project is organised.

Code changes on your laptop are picked up automatically. Stop with `Ctrl+C`. If you change
dependencies or the database schema, restart with `docker compose up` again.

## Without Docker (optional)

Install Node 24 (see `.nvmrc`) and enable pnpm with `corepack enable`. Docker is still used for
the database.

```sh
pnpm install
pnpm db:setup   # starts the database, creates the tables and the admin user
pnpm dev        # starts the API (port 3001) and the website (port 3000)
```

## What's inside

| Folder                       | What it is                                                          |
| ---------------------------- | ------------------------------------------------------------------- |
| `apps/web`                   | The website (Next.js, React, Tailwind)                              |
| `apps/api`                   | The API (NestJS) with login (better-auth) and the database (Prisma) |
| `packages/contracts`         | Data shapes (Zod schemas) shared by the API                         |
| `packages/api-sdk`           | Typed API client for the website, generated from the API            |
| `packages/typescript-config` | Shared TypeScript settings                                          |
| `packages/eslint-config`     | Shared code-style rules                                             |

API documentation is available at http://localhost:3001/api/docs while the app runs.

## Commands

| Command             | What it does                                          |
| ------------------- | ----------------------------------------------------- |
| `pnpm dev`          | Start the API and website in development mode         |
| `pnpm build`        | Build everything                                      |
| `pnpm generate:sdk` | Regenerate the website's API client after API changes |
| `pnpm lint`         | Check code style                                      |
| `pnpm typecheck`    | Check types                                           |
| `pnpm test`         | Run the tests (needs the database running)            |

Using Docker? Run any command inside the running app container by prefixing it with
`docker compose exec app`, for example `docker compose exec app pnpm generate:sdk`.

Database changes: edit `apps/api/prisma/schema.prisma`, then create a migration:

```sh
docker compose exec app pnpm --filter @app/api exec prisma migrate dev --name <what-changed>
```
