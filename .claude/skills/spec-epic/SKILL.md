---
name: spec-epic
description: Plan a new feature before building it. Grills the user about the idea, then writes a PRD, an architecture doc and slices (one per PR) into docs/planned/<feature>/. Use when the user wants to plan, spec or design a feature, or describes something big to build ("add a booking system", "customers should be able to...").
argument-hint: <feature idea>
---

# Plan a feature

Turn an idea into `docs/planned/<feature>/`: a PRD (what and why), an architecture doc (how) and slices (one PR each). `.claude/rules/docs.md` defines what each document contains. This skill is the order of work.

Four phases. **Stop after each one** and let the user read and correct it before you start the next. Never run several phases without the user's go.

## 0. Is it big enough?

Check the rule in `docs.md` ("Plan first when..."). If the change is below that bar, say so and offer to just build it. Stop unless the user still wants a plan.

Agree on a short `kebab-case` name for the feature (`shared-notes`). That is the folder and file prefix.

## 1. Understand: grill

Use the `grilling` skill on the idea until you and the user agree on:

- who the users are and what problem it solves for them
- the flow, step by step
- the rules and edge cases (what happens when..., who may...)
- what is out of scope, and why

Look at the code and `docs/system/` first, so you only ask what they can't tell you.

## 2. PRD

Copy `docs/planned/_template/prd.md` to `docs/planned/<feature>/<feature>-prd.md` and fill it in from the answers. Use the user's words. No technical terms (see `docs.md`). Every rule must be testable. Anything still undecided goes under Open questions, not into a guess.

Checkpoint: show the PRD and ask what to change.

## 3. Architecture

1. Read the code the feature touches: `apps/api/prisma/schema.prisma`, the related `apps/api/src/domains/`, `packages/contracts/src/` and the pages in `apps/web/src/app/`.
2. When there is a real choice to make (where data lives, one page or two, ...), give 2–3 genuinely different options with what each costs, then **recommend one**. A list without a recommendation isn't enough.
3. Copy `docs/planned/_template/architecture.md` to `<feature>-architecture.md` and fill it in: data, API, pages, decisions (each with a one-line why) and risks.

Checkpoint: show it and ask what to change.

## 4. Slices

First settle with the user any open question that changes what a slice builds. Only questions that don't affect the build may stay open.

Split the work following the slice rules in `docs.md`: vertical, exclusive files, small, numbered in build order. Copy `docs/planned/_template/slices/01-example.md` for each slice as `slices/NN-<name>.md`.

Check before you finish:

- Every PRD rule appears under "Rules covered" in at least one slice. A rule built partly in one slice and partly in another is listed in both.
- Every slice has a "Done when" that anyone can check.
- No file appears under "May touch" in two slices, apart from the one-line registrations `docs.md` allows.

Checkpoint: list the slices (number, goal, size) and ask what to change.

## Done

1. Commit the plan (`docs: plan <feature>`), so every slice starts from it.
2. Optional: ask whether the team tracks its work in GitHub issues. Only with a yes, create one issue per slice, as described under "GitHub (optional)" in `CLAUDE.md`. Write `Issue: #<number>` under each slice's title and commit that too.
3. Tell the user which files were written, and the next step: `/build-slice docs/planned/<feature>/slices/01-<name>.md`.
