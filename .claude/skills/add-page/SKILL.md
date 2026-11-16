---
name: add-page
description: Add a page to the website that shows or edits data through the generated API SDK, with loading, empty and error states and a link in the header. Use when the user wants a new screen, page or view in the web app.
argument-hint: <what the page should show>
---

# Add a page

Conventions are in `.claude/rules/web.md` and `design.md`. Follow them; this is the order of work. `apps/web/src/app/(app)/page.tsx` is a working example of loading data.

## 1. The data must exist

The page reads and writes through `@app/api-sdk`. If the endpoint it needs doesn't exist yet, build it first with the `add-endpoint` skill and run `pnpm generate:sdk`.

## 2. Route

Create `apps/web/src/app/(app)/<route>/page.tsx` for a logged-in page (`(app)` doesn't appear in the URL). Start it with `'use client'`. The page stays short: it loads the data and combines components.

Add a link to it in the header in `apps/web/src/app/(app)/layout.tsx` when users should find it from the menu.

## 3. Load the data

```tsx
const [patients, setPatients] = useState<PatientDto[] | null>(null);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  patientsControllerList({ client: apiClient, throwOnError: true })
    .then(({ data }) => setPatients(data))
    .catch(() => setError('We couldn’t load your patients. Try again.'));
}, []);
```

Render all three states: loading (`patients === null`), empty (`patients.length === 0`, with the action to add one) and error (the message plus a retry).

## 4. Components

Put the pieces (list, form, item) in `apps/web/src/features/<feature>/`, one component per file, kebab-case file names. A form:

- has a visible `<label>` per field
- disables its submit button while saving
- shows errors next to the field
- refreshes the list after a successful save

## 5. Check

1. `pnpm lint` and `pnpm typecheck` pass.
2. Open the page at http://localhost:3000 while logged in. Try the empty state, adding something, and an error, for example by stopping the API.
3. Check it at phone width (375px) as well as on a laptop.
