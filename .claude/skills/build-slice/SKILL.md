---
name: build-slice
description: Build one slice of a planned feature (docs/planned/<feature>/slices/NN-*.md), staying inside its "May touch" files, with tests, until its "Done when" checks pass. Use when the user wants to build, implement or start a slice or the next step of a planned feature.
argument-hint: <path to slice file, or feature name for the next open slice>
---

# Build a slice

A slice is one PR's worth of work, described in `docs/planned/<feature>/slices/NN-<name>.md`.

## 1. Read

- The slice file. If you were given a feature name, take the lowest-numbered slice whose "Done when" boxes on `main` aren't all ticked.
- The feature's PRD and architecture doc, for the rules and decisions this slice relies on.
- Earlier slices must be merged into `main` (their boxes are ticked there). If they aren't, say so and stop.

## 2. Plan in one message

Tell the user in a few lines what you'll change and how you'll check it. Start when they agree.

## 3. Build

- Change only files listed under **May touch**, plus the slice file itself (to tick its boxes). If you need another file, stop and ask: the plan may need updating.
- Follow `.claude/rules/` for each area. For the usual building blocks, follow the `add-endpoint` and `add-page` skills.
- Fences (these keep slices small and on target):
  - Do the simplest thing that meets "Done when".
  - No options, settings, generics or abstractions nobody asked for.
  - No defensive code for situations that can't happen.
  - Stop when "Done when" holds. No extra polishing round.
- API changes get their tests in this slice (`.claude/rules/testing.md`). Website changes are checked in the browser (step 4).

## 4. Check

1. `pnpm generate:sdk` if the API changed.
2. `pnpm lint`, `pnpm typecheck` and `pnpm test`. All must pass. The database must be running for the tests (`pnpm dev` or `pnpm db:setup`). When the app runs in Docker, put `docker compose exec app` in front of each command.
3. Try it in the browser at http://localhost:3000, or ask the user to, for anything a user sees.
4. Tick each "Done when" box in the slice file that is now true. If one isn't true, keep going or tell the user what's blocking it.

## 5. Hand over

- Summarize what changed and how it was checked.
- Commit on a branch `<feature>/<NN-name>` with the message `feat(<feature>): <slice goal>`, push it, and open a pull request on GitHub (`gh pr create`, or the link Git prints after the push). Ask before pushing. One slice is one PR.
- The PR merges into `main` once CI is green and the user, or whoever reviews for them, approves it. The next slice starts after that.
- Name the next slice. If this was the last one, suggest `/finish-feature <feature>`.
