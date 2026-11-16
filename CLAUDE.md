# CLAUDE.md

Starter monorepo for students building a web product: Next.js website (`apps/web`, port 3000),
NestJS API (`apps/api`, port 3001), Postgres (port 5433), shared packages in `packages/`.
`README.md` has the human setup steps per OS, the folder overview and troubleshooting.

The users are business students, not developers. Explain in plain words, and do things for them
where you can.

## How we work

Coding conventions live in `.claude/rules/`, one file per area. Claude Code loads each one
automatically when you touch matching files. Follow them. They are the single source: don't
repeat them elsewhere.

| Rule          | Applies to                      | About                                                      |
| ------------- | ------------------------------- | ---------------------------------------------------------- |
| `general.md`  | everything                      | simplicity, functions, naming, types, errors, env, commits |
| `testing.md`  | `apps/api/**`, `*.test.ts`      | what and how to test                                       |
| `api.md`      | `apps/api/**`                   | feature folders, validation, errors, Prisma                |
| `auth.md`     | auth code, API domains, web app | better-auth, guarded routes, `authClient`                  |
| `web.md`      | `apps/web/**`                   | client-only pages, data through the SDK, components        |
| `design.md`   | `apps/web/**/*.tsx`, `*.css`    | Tailwind, responsive, accessibility, states, wording       |
| `packages.md` | `packages/**`                   | compiled vs source-direct packages, adding a package       |
| `docs.md`     | `docs/**`                       | PRD, architecture, slices, ADRs, current-state docs        |

Building a feature goes through the docs (`docs/README.md`):

1. `/spec-epic`: grill the idea, then write the PRD, architecture doc and slices in
   `docs/planned/<feature>/`.
2. `/build-slice`: build one slice (one PR) at a time, with tests.
3. `/consolidate-epic`: update `docs/system/`, record lasting decisions as ADRs, delete the plan.

Small changes skip the plan. Skills for the building blocks: `/create-api-endpoint`, `/create-nextjs-page`. Also
available: `/grill-me` (stress-test a plan), `/diagnosing-bugs` (when something breaks), `/tdd`
(test-first).

## Starting the app

There are two ways to run it, and they must never run at the same time (same ports):

- **Locally**: `pnpm dev` from the repo root. Starts the database in Docker in the background
  (`pnpm db:setup`: migrations and the admin user), then the API and website in that terminal.
  Needs Node 24 and pnpm (`pnpm -v`).
- **In Docker**: `docker compose --profile app up`. Runs the database and the app in containers.
  Needs only Docker. A plain `docker compose up` starts the database only.

Use the route the user asks for. Otherwise use local if `pnpm -v` works, else Docker. On Windows,
run commands in PowerShell.

1. **Check Docker** (both routes need it): `docker info`. If it fails, Docker Desktop is not
   installed or not running.
   - Not installed: ask before installing. macOS: `brew install --cask docker` if Homebrew exists.
     Windows: `winget install -e --id Docker.DockerDesktop`. Otherwise send the user to
     https://www.docker.com/products/docker-desktop/.
   - The user must open Docker Desktop themselves (Windows may need a restart, or `wsl --update`
     in an administrator PowerShell). Ask them to, then run `docker info` again.
2. **Prepare**: for the local route, run `pnpm install`. If pnpm is missing, follow the
   "Install the tools" step for the user's OS in `README.md`.
3. **Let the user start it**: the logs (including `console.log` output) appear in the terminal
   that runs the start command, so ask the user to run `pnpm dev` or
   `docker compose --profile app up` in their own terminal. Only if they want you to start it,
   run it in the background (`docker compose --profile app up -d --build` for Docker) and tell
   them where the logs are: your background task output, or `docker compose logs -f app`.
4. **Wait until ready**: every few seconds, request http://localhost:3001/api/me (returns 401
   when the API is up) and http://localhost:3000/login (returns 200 when the website is up). On
   Windows use `curl.exe`, not `curl` (an alias for `Invoke-WebRequest` in PowerShell). The first
   Docker start takes several minutes (it installs dependencies). Don't judge readiness from
   `docker compose logs`: it includes earlier runs.
5. **Hand over**: tell the user to open http://localhost:3000 and log in with **admin / admin**.
6. **Stop**: `Ctrl+C` in the terminal that runs it. A Docker app started in the background stops
   with `docker compose --profile app down` (plain `docker compose down` leaves the app
   running). Adding `-v` also deletes the database and installed dependencies; confirm with the
   user first.

## Running commands

- Local route: run `pnpm <command>` from the repo root.
- Docker route: prefix commands with `docker compose exec app`, e.g.
  `docker compose exec app pnpm lint`.
- After changing an API endpoint: `pnpm generate:sdk` (refreshes the typed client the website uses).
- After changing `apps/api/prisma/schema.prisma`: `pnpm db:migration --name <what-changed>`. It
  regenerates the Prisma client and creates the migration (Prisma 7's `migrate dev` alone does
  not regenerate the client).
- Checks: `pnpm lint`, `pnpm typecheck`, `pnpm test` (tests need the database running).

## Windows notes

- Windows PowerShell 5.1 does not support `&&`; run commands one by one or separate them with `;`.
- "running scripts is disabled" for `pnpm`: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.
- Find what uses a port: `netstat -ano | findstr :3000`, stop it with `Stop-Process -Id <pid>`.
