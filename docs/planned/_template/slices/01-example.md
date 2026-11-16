# 01: <slice name>

<!-- One slice is one commit. If it doesn't fit on one screen, split it. Delete these comments. -->

## Goal

<!-- One sentence: what a user can do after this slice. -->

## Rules covered

<!-- The PRD rules this slice makes true. -->

- <Rule from the PRD>

## May touch

<!-- The complete list of files this slice creates or changes. -->

- `packages/contracts/src/<feature>.schemas.ts`
- `apps/api/src/domains/<feature>/...`
- `apps/api/test/<feature>.e2e.test.ts`
- `apps/web/src/app/(app)/<route>/page.tsx`

## May not touch

<!-- Files other slices own, and anything else that must stay as it is. -->

- <file> (slice NN)

## Steps

1. <Concrete step>

## Done when

- [ ] `pnpm lint`, `pnpm typecheck` and `pnpm test` pass.
- [ ] <A check anyone can do, e.g. "A logged-in user can add a note and sees it in the list">
