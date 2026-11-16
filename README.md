# Starter monorepo

A ready-to-use starting point for building a web application: a website, an API and a database,
with login already working. Build your own product on top of it.

Follow the steps for your computer: [macOS](#setup-on-macos) or [Windows](#setup-on-windows).
The easiest way is with Docker: then Docker is the only thing you install, besides Git.

## Setup on macOS

### 1. Install the tools (once)

1. Install [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/). Pick
   "Apple Silicon" or "Intel chip" to match your Mac (Apple menu > About This Mac).
2. Open Docker Desktop and wait until it says Docker is running.
3. Open the **Terminal** app and run `git --version`. If macOS offers to install the developer
   tools, accept and wait for it to finish.

### 2. Get the code

```sh
git clone <repository-url>
cd sample-monorepo
```

### 3. Start the app

```sh
docker compose up
```

Then continue with [When the app is running](#when-the-app-is-running).

### Without Docker (optional, macOS)

You still need Docker Desktop for the database. Install
[Node.js 24](https://nodejs.org/) with the macOS installer, then in Terminal:

```sh
sudo corepack enable   # once; asks for your Mac password
pnpm install
pnpm db:setup          # starts the database, creates the tables and the admin user
pnpm dev               # starts the API (port 3001) and the website (port 3000)
```

## Setup on Windows

### 1. Install the tools (once)

1. Install [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/). Keep
   the option "Use WSL 2 instead of Hyper-V" ticked, and restart your computer when asked.
2. Open Docker Desktop and wait until it says Docker is running. If it asks you to update WSL,
   open **PowerShell as administrator** (right-click PowerShell in the Start menu) and run
   `wsl --update`, then restart Docker Desktop.
3. Install [Git for Windows](https://git-scm.com/download/win). The default options are fine.

Use **PowerShell** for all commands below (Start menu > type "PowerShell").

### 2. Get the code

```powershell
git clone <repository-url>
cd sample-monorepo
```

### 3. Start the app

```powershell
docker compose up
```

The first start can take a bit longer on Windows. Then continue with
[When the app is running](#when-the-app-is-running).

### Without Docker (optional, Windows)

You still need Docker Desktop for the database. Install [Node.js 24](https://nodejs.org/) with the
Windows installer. Then, once, in **PowerShell as administrator**:

```powershell
corepack enable
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned   # lets PowerShell run the pnpm command
```

Close it, open a normal PowerShell in the project folder, and run:

```powershell
pnpm install
pnpm db:setup   # starts the database, creates the tables and the admin user
pnpm dev        # starts the API (port 3001) and the website (port 3000)
```

## When the app is running

The first start takes a few minutes while it installs everything. When you see
`API running on http://localhost:3001/api`, open http://localhost:3000 and log in with
**admin / admin**. The page you land on explains how the project is organised.

Code changes on your laptop are picked up automatically. Stop with `Ctrl+C`. If you change
dependencies or the database schema, start it again with `docker compose up`.

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

## Troubleshooting

**"Cannot connect to the Docker daemon"**: Docker Desktop is not running. Start it and try again.

**"port is already allocated" or "address already in use"**: another program is already using
port 3000 (website), 3001 (API) or 5433 (database). Often it is the app itself, started twice:
run it either with Docker or with `pnpm dev`, not both at once. Stop the other one with `Ctrl+C`
in its terminal, or `docker compose down`. To find what is using a port:

```sh
lsof -i :3000                   # macOS / Linux
netstat -ano | findstr :3000    # Windows
```

**Windows: "running scripts is disabled on this system"** when you type `pnpm`: run
`Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once in PowerShell, then try again.

**Windows: Docker Desktop says WSL is missing or outdated**: run `wsl --update` in PowerShell as
administrator, restart your computer, and open Docker Desktop again.

**"Module not found" after pulling new code**: someone added a dependency. Restart with
`docker compose up` (it installs them), or run `pnpm install` without Docker.

**Start over from scratch**: this deletes the database and everything installed, then the next
`docker compose up` rebuilds it all, including the admin user.

```sh
docker compose down -v
docker compose up --build
```
