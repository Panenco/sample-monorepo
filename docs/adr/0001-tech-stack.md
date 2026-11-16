# 0001: Tech stack

## Context

The project is a starting point for building a web product quickly, by people who are not full-time developers, with Claude Code doing much of the coding. It needs login, a database, an API and a website from day one, and it should be hard to break the connection between the website and the API by accident.

## Options considered

- **One full-stack Next.js app** (API routes or Server Actions, no separate API). Fewer moving parts, but the server and browser code mix, and there is no clear API to document or test.
- **Separate repositories for website and API.** A clear split, but every change to a data shape needs coordinated changes in two places, with nothing checking they match.
- **One monorepo with a separate API and website, sharing typed contracts.** More setup, but the boundary is explicit and checked by TypeScript.

## Decision

A pnpm + Turborepo monorepo:

- `apps/api`: NestJS, with Prisma on PostgreSQL and better-auth for login (cookie sessions, username and password).
- `apps/web`: Next.js used as a client-side single-page app, styled with Tailwind, with no extra data, form or component libraries.
- `packages/contracts`: Zod schemas shared by both sides, turned into an OpenAPI spec and a generated client (`packages/api-sdk`).
- Docker for the database, and optionally for the whole app, so setup is the same on macOS and Windows.

## Consequences

- A data shape is written once, and TypeScript catches mismatches between the website and the API.
- Adding an endpoint takes a few more steps (contract, controller, `pnpm generate:sdk`). The `add-endpoint` skill covers them.
- The website has no server-side rendering. That's fine for a logged-in app, but public, search-indexed pages would need a different setup.
- New libraries on the website (data fetching, forms, UI kits) are a decision worth a new ADR.
