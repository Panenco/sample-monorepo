# Starter monorepo

A ready-to-use starting point for building a web application: a website, an API and a database,
with login already working. Build your own product on top of it.

There are two ways to run it. Pick one and stick with it:

- **In Docker**: `docker compose --profile app up`. You only need Docker and Git.
- **Locally**: `pnpm dev`. You also need Node.js, and the database still runs in Docker.

Either way, the logs (including your own `console.log` output) appear in the terminal where you
ran the command. Follow the steps for your computer: [macOS](#setup-on-macos) or
[Windows](#setup-on-windows).

## Setup on macOS

### 1. Install the tools (once)

1. Install [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/). Pick
   "Apple Silicon" or "Intel chip" to match your Mac (Apple menu > About This Mac).
2. Open Docker Desktop and wait until it says Docker is running.
3. Open the **Terminal** app and run `git --version`. If macOS offers to install the developer
   tools, accept and wait for it to finish.
4. Only to run locally: install [Node.js 24](https://nodejs.org/) with the macOS installer, then
   run `sudo corepack enable` in Terminal (it asks for your Mac password).

### 2. Get the code

```sh
git clone <repository-url>
cd sample-monorepo
```

### 3. Start the app

In Docker:

```sh
docker compose --profile app up
```

Or locally:

```sh
pnpm install   # first time, and after someone adds a dependency
pnpm dev
```

Then continue with [When the app is running](#when-the-app-is-running).

## Setup on Windows

### 1. Install the tools (once)

1. Install [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/). Keep
   the option "Use WSL 2 instead of Hyper-V" ticked, and restart your computer when asked.
2. Open Docker Desktop and wait until it says Docker is running. If it asks you to update WSL,
   open **PowerShell as administrator** (right-click PowerShell in the Start menu) and run
   `wsl --update`, then restart Docker Desktop.
3. Install [Git for Windows](https://git-scm.com/download/win). The default options are fine.
4. Only to run locally: install [Node.js 24](https://nodejs.org/) with the Windows installer.
   Then, in **PowerShell as administrator**, run once:

   ```powershell
   corepack enable
   Set-ExecutionPolicy -Scope CurrentUser RemoteSigned   # lets PowerShell run the pnpm command
   ```

Use a normal **PowerShell** for all commands below (Start menu > type "PowerShell").

### 2. Get the code

```powershell
git clone <repository-url>
cd sample-monorepo
```

### 3. Start the app

In Docker:

```powershell
docker compose --profile app up
```

Or locally:

```powershell
pnpm install   # first time, and after someone adds a dependency
pnpm dev
```

Then continue with [When the app is running](#when-the-app-is-running).

## When the app is running

The first start takes a while (a few minutes in Docker) while it installs everything. When you
see `API running`, open the website at http://localhost:3000 and log in with
**admin / admin**. The page you land on explains how the project is organised.

Code changes on your laptop are picked up automatically. Stop with `Ctrl+C`. If you change
dependencies, stop and start the app again (locally: run `pnpm install` first).

## What's inside

| Folder                       | What it is                                                          |
| ---------------------------- | ------------------------------------------------------------------- |
| `apps/web`                   | The website (Next.js, React, Tailwind)                              |
| `apps/api`                   | The API (NestJS) with login (better-auth) and the database (Prisma) |
| `packages/contracts`         | Data shapes (Zod schemas) shared by the API                         |
| `packages/api-sdk`           | Typed API client for the website, generated from the API            |
| `packages/typescript-config` | Shared TypeScript settings                                          |
| `packages/eslint-config`     | Shared code-style rules                                             |

While the app runs, the API documentation is at http://localhost:3001/api/docs. Login, logout and
sessions are handled by better-auth and documented separately at
http://localhost:3000/api/auth/reference.

## Commands

| Command             | What it does                                          |
| ------------------- | ----------------------------------------------------- |
| `pnpm dev`          | Start the database, API and website (locally)         |
| `pnpm build`        | Build everything                                      |
| `pnpm generate:sdk` | Regenerate the website's API client after API changes |
| `pnpm lint`         | Check code style                                      |
| `pnpm typecheck`    | Check types                                           |
| `pnpm test`         | Run the tests (needs the database running)            |

Running in Docker? Run these commands inside the app container by putting
`docker compose exec app` in front, for example `docker compose exec app pnpm generate:sdk`
(in a second terminal, while the app runs).

Database changes: edit `apps/api/prisma/schema.prisma`, then create a migration:

```sh
pnpm --filter @app/api exec prisma migrate dev --name <what-changed>
```

## Troubleshooting

**"Cannot connect to the Docker daemon"**: Docker Desktop is not running. Start it and try again.

**"port is already allocated" or "address already in use"**: another program is already using
port 3000 (website), 3001 (API) or 5433 (database). Often it is the app itself, started twice:
run it either with Docker or with `pnpm dev`, not both at once. Stop the other one with `Ctrl+C`
in its terminal, or `docker compose --profile app down`. To find what is using a port:

```sh
lsof -i :3000                   # macOS / Linux
netstat -ano | findstr :3000    # Windows
```

**Windows: "running scripts is disabled on this system"** when you type `pnpm`: run
`Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once in PowerShell, then try again.

**Windows: Docker Desktop says WSL is missing or outdated**: run `wsl --update` in PowerShell as
administrator, restart your computer, and open Docker Desktop again.

**"Module not found" after pulling new code**: someone added a dependency. Locally: run
`pnpm install`. In Docker: stop and start the app again (it installs them).

**Start over from scratch**: this deletes the database and everything Docker installed. The next
start rebuilds it all, including the admin user.

```sh
docker compose --profile app down -v
docker compose --profile app up --build   # or: pnpm dev
```
