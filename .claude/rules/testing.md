---
paths:
  - 'apps/api/**/*'
  - '**/*.test.ts'
---

# Testing

- Test behavior, not implementation: what a user or the website can observe, not how the code is arranged inside.
- Tests ship with the code they test, in the same PR. A failing test is never acceptable on `main`.
- The `tdd` skill helps when you want to work test-first.

## API tests

API tests run the real Nest app over HTTP with Vitest and supertest, against the real database. The example to copy is `apps/api/test/me.e2e.test.ts`.

- **Test journeys, not endpoints.** One test per thing a user does, walking several calls (create, read, change, read again), not one test per route that pokes it once.
- **Don't mock** Prisma, better-auth or the HTTP layer.
- **Log in once** per test file or in `beforeEach`, not again in every test.
- **One behavior, one test, at one level.** Don't test the same thing twice in different places.
- **Check the status code** next to every body assertion: an error response has a body too. A test that only checks for refusals also needs one assertion that something succeeded.
- Assert errors with `.expect(<status code>)`.
