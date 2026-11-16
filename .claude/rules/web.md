---
paths:
  - 'apps/web/**/*'
---

# Website (Next.js, client-side only)

The website is a single-page app: everything runs in the browser and talks to the API. It uses React state, the generated `@app/api-sdk` and Tailwind. There is no data-fetching, form or component library.

## Pages

- Pages live in `apps/web/src/app/`. Logged-in pages go in the `(app)` folder (invisible in the URL), which adds the header and the login check.
- Every page and layout starts with `'use client'`. The root `app/layout.tsx` is the one exception: it only sets up `<html>` and `<body>`.
- Not used here: Server Components, Server Actions, `loading.tsx`/`error.tsx` files, `next/headers`, `next/server`. Handle loading and errors inside the component.
- Read URL parameters in the browser with `useParams()` / `useSearchParams()`.
- Code that needs `window` or `document` loads through `next/dynamic` with `{ ssr: false }`.
- A new page that users reach from the menu also gets a link in the header in `app/(app)/layout.tsx`.

## Data

- Call the API only through `@app/api-sdk` functions with `client: apiClient` from `src/lib/api-client.ts` and `throwOnError: true`. See `app/(app)/page.tsx` for the pattern.
- Use the types the SDK generates. Don't write your own copy of an API type or map it into a different shape.
- If the page needs a field the API doesn't return, add it to the contract and the API. Don't work around it in the website.
- Every view handles three states: loading, empty and error (see `design.md`).
- A field that can be cleared sends `null`, not `undefined`: `undefined` disappears from the JSON and the change is silently lost.

## Components

- A page file stays thin: it combines small components. Feature components go in `src/features/<feature>/`.
- JSX repeated 3 or more times in a file becomes a small component in that file. Move it to a shared place only when another feature really uses it.
- Environment variables starting with `NEXT_PUBLIC_` are visible to everyone in the browser. Never put secrets in them.
