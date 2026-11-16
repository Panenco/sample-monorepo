# General: how we write code here

Applies to every change. The area rules (`api.md`, `web.md`, `testing.md`, ...) add detail for their folders.

## Keep it simple

- Write the simplest code that does what was asked. Prefer plain, explicit code over clever abstractions.
- No optional parameters, settings or "for later" hooks that nobody asked for.
- No shared helper or abstraction until a second place really needs it.
- No defensive branches for situations that cannot happen.
- Delete dead code. Don't comment it out.

## Functions and components

- One function does one thing. Around 30 lines is the limit: longer means split.
- Use early returns instead of deeply nested `if`s.
- More than 3 parameters: pass one object and destructure it.
- React components and hooks stay around 50 lines. A bigger page becomes a thin page plus small components in their own files.

## Naming

- Variables and functions `camelCase`, types and components `PascalCase`, constants `UPPER_SNAKE_CASE`.
- Files and folders `kebab-case` (`note-list.tsx`, `use-notes.ts`).
- Booleans start with `is`, `has` or `should` (`isLoading`, `hasError`).
- Code is in English, even when the product's language is not.

## Types and data shapes

- A data shape that crosses between API and website is a Zod schema in `packages/contracts`. Types come from it (`z.infer`) or from the generated `@app/api-sdk`. Never write a second, hand-made copy of an API type.
- Zod 4 only. Request bodies use `z.strictObject({...})`, so unknown fields are rejected.
- A fixed list of values is a `z.enum([...])` defined once. Use `MySchema.enum.VALUE` in code, never a bare string like `'ACTIVE'`.
- No non-null assertions (`value!`). Handle the missing case.

## Errors

- Never swallow an error: `catch {}` with nothing in it is forbidden. Log it or rethrow it with context.
- Messages a user sees are plain language: what happened and what to do next.

## Comments

- No comments by default. Add a short one only to explain _why_, when the code cannot make that obvious.
- Don't mention the task, ticket or conversation in comments. That belongs in the commit message.

## Environment variables

- The API reads environment variables only through `apps/api/src/env.ts`, never `process.env` elsewhere.
- A new variable goes in that schema, in `apps/api/.env.example`, and in `globalPassThroughEnv` in `turbo.json`. Turborepo hides variables it doesn't know about from the apps.

## Dependencies

- Don't add a package for something that takes fewer than 20 lines to write.
- Check the license before adding one.

## Commits

- Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`.
- The message says what changed and why, not how.
- Tests go in the same commit or PR as the code they test.
