# CLAUDE.md

Starter monorepo for students building a web product: Next.js website (`apps/web`, port 3000),
NestJS API (`apps/api`, port 3001), Postgres (port 5433), shared packages in `packages/`.
`README.md` has the human setup steps per OS, the folder overview and troubleshooting.

The users are business students, not developers. Explain in plain words, and do things for them
where you can.

## Starting the app

Use Docker unless the user asks for the non-Docker route. It works the same on macOS and Windows.
On Windows, run commands in PowerShell.

1. **Check Docker**: `docker info`. If it fails, Docker Desktop is not installed or not running.
   - Not installed: ask before installing. macOS: `brew install --cask docker` if Homebrew exists.
     Windows: `winget install -e --id Docker.DockerDesktop`. Otherwise send the user to
     https://www.docker.com/products/docker-desktop/.
   - The user must open Docker Desktop themselves (Windows may need a restart, or `wsl --update`
     in an administrator PowerShell). Ask them to, then run `docker info` again.
2. **Start in the background**: `docker compose up -d --build`. Never run `docker compose up`
   without `-d`: it does not exit.
3. **Wait until ready**: every few seconds, request http://localhost:3001/api/me (returns 401
   when the API is up) and http://localhost:3000/login (returns 200 when the website is up). On
   Windows use `curl.exe`, not `curl` (an alias for `Invoke-WebRequest` in PowerShell). The first
   start takes several minutes (it installs dependencies). Don't judge readiness from the logs:
   they include earlier runs. If it takes over 10 minutes or `docker compose ps` shows the app
   exited, read `docker compose logs app --tail 100`.
4. **Hand over**: tell the user to open http://localhost:3000 and log in with **admin / admin**.
5. **Stop**: `docker compose down` keeps the data. `docker compose down -v` also deletes the
   database and installed dependencies (confirm with the user first).

Without Docker: follow the "Without Docker" steps for the user's OS in `README.md`. The database
still runs in Docker (`pnpm db:setup`). Run `pnpm dev` as a background process.

Never run the Docker app and `pnpm dev` at the same time: they use the same ports.

## Running commands

- Docker route: prefix commands with `docker compose exec app`, e.g.
  `docker compose exec app pnpm lint`.
- Without Docker: run `pnpm <command>` from the repo root.
- After changing an API endpoint: `pnpm generate:sdk` (refreshes the typed client the website uses).
- After changing `apps/api/prisma/schema.prisma`:
  `pnpm --filter @app/api exec prisma migrate dev --name <what-changed>`.
- Checks: `pnpm lint`, `pnpm typecheck`, `pnpm test` (tests need the database running).

## Windows notes

- Windows PowerShell 5.1 does not support `&&`; run commands one by one or separate them with `;`.
- "running scripts is disabled" for `pnpm`: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.
- Find what uses a port: `netstat -ano | findstr :3000`, stop it with `Stop-Process -Id <pid>`.
