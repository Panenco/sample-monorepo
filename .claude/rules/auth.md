---
paths:
  - 'apps/api/src/auth/**/*'
  - 'apps/api/src/domains/**/*'
  - 'apps/web/src/lib/**/*'
  - 'apps/web/src/app/**/*'
---

# Login and sessions (better-auth)

- better-auth handles sign-in, sign-out and sessions. It stores users and sessions in the database through Prisma and keeps the session in a cookie.
- All `/api/auth/*` requests go to better-auth through one catch-all route in `apps/api/src/auth/auth.controller.ts`. Don't add your own login endpoints. Its endpoints are documented at `/api/auth/reference`.
- **API:** every route that returns or changes user data has `@UseGuards(AuthGuard)` (on the controller or the route) and gets the user with `@CurrentUser() user: CurrentUser`.
- **Website:** use `authClient` from `apps/web/src/lib/auth-client.ts` (`signIn.username`, `signOut`, `useSession`). Never call `/api/auth/*` with `fetch` yourself.
- Pages inside `apps/web/src/app/(app)/` are only shown to logged-in users. Their layout sends everyone else to `/login`.
- `BETTER_AUTH_SECRET` must be set in production. The API refuses to start without it.
