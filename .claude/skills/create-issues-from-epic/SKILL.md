---
name: create-issues-from-epic
description: Create GitHub issues from a planned feature in docs/planned/<feature>/, with one epic issue from the PRD and one issue per slice. Use only when the user asks to create issues for a plan, so a team can track and divide the work on GitHub.
argument-hint: <feature folder or name>
disable-model-invocation: true
---

# Create issues from an epic

Turns a plan written by `/spec-epic` into GitHub issues: one **epic issue** for the feature and one **issue per slice**. The slice files stay the source of truth. The issues only point to them, so the team can divide the work and follow it on GitHub.

## Before you start

1. **GitHub CLI:** `gh auth status` must succeed. If `gh` is missing, tell the user to install it (macOS `brew install gh`, Windows `winget install --id GitHub.cli`), run `gh auth login`, and stop.
2. **The plan exists:** `docs/planned/<feature>/` has a `<feature>-prd.md`. If it doesn't, stop.
3. **The plan is on GitHub:** the issues link to the plan files, so they must be pushed to `main`. Check with `git fetch` then `git log origin/main -- docs/planned/<feature>/`. If they aren't there yet, say so and stop. The user can push them first or share them with `/create-pr`.
4. **No duplicates:** before creating any issue, search for one with the same title (`gh issue list --state all --search "<title> in:title"`). If it exists, reuse its number and don't create it again. That makes the skill safe to run twice.

## 1. Summarize

Read the PRD, the architecture doc if there is one, and the slices in `slices/`, in number order. Show the user:

```
<Feature name>: <2–3 sentence summary of the problem>

  01. <slice name>: <goal in one sentence>
  02. ...
```

**Stop and ask the user to confirm** before creating anything.

## 2. Epic issue

Title: `[Epic] <Feature name>`. Body:

```markdown
## Summary

<The problem in 2–3 sentences: who has it and why it matters.>

## Acceptance criteria

- [ ] <one line per PRD rule a user could check>

## Out of scope

- <from the PRD>

## Docs

- PRD: <link to docs/planned/<feature>/<feature>-prd.md on GitHub>
- Architecture: <link, if the file exists>

## Slices

<filled in by step 4>
```

Create it with `gh issue create --title "..." --body "..."`, and keep its number as EPIC.

Build the links from the repository URL (`gh repo view --json url -q .url`) plus `/blob/main/<path>`.

## 3. One issue per slice

For each slice file, in number order. Title: `<Feature name> <NN>: <slice name>`. Body:

```markdown
Part of #<EPIC>

## Goal

<the slice's goal>

## Plan

<link to the slice file on GitHub>

## Done when

- [ ] <copied from the slice's "Done when" list>
```

## 4. Link them up

Update the epic issue's body (`gh issue edit <EPIC> --body "..."`): under `## Slices`, add one line per slice issue in order, `- [ ] #<number> <slice name>`.

## Done

Show the user the epic issue and the slice issues with their numbers and links. Mention that `/create-pr <number>` opens a pull request that closes a slice's issue when it's merged.

## Rules

- Issues come only from the slice files. Don't invent other tasks from the PRD.
- One slice is one issue and one pull request. Don't split or merge slices here: change the plan instead.
- No issues for anything the PRD lists as out of scope.
