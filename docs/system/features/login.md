# Login

Only logged-in users can use the app. There is no sign-up: accounts are created by the seed script. A fresh database has one account, **admin** / **admin**.

- **Logging in:** username and password on `/login`. A wrong combination shows "Invalid username or password". A user who is already logged in and opens `/login` is sent to the app.
- **Session:** after logging in, the session is kept in a cookie, so the user stays logged in across page loads until they log out or the session expires.
- **Protected pages:** every page under `apps/web/src/app/(app)/` needs a session. Without one, the user is sent to `/login`.
- **Logging out:** "Log out" in the header ends the session and returns to `/login`.
- **Who am I:** the app shows the user's name through `GET /api/me`, the one example endpoint.

The login endpoints come from better-auth and are documented at `/api/auth/reference`. How it's wired: [architecture overview](../architecture/overview.md#login).
