---
name: create-pr
description: Share the current work as a GitHub pull request. Creates or reuses a branch, commits, runs the checks, pushes and opens the pull request, linked to a GitHub issue when one is given. Use only when the user asks to open a pull request or share their work with the team.
argument-hint: '[issue number or URL]'
disable-model-invocation: true
---

# Create a pull request

Shares the current work with the team as a pull request on GitHub. The argument is optional: an issue number (`12`, `#12`) or issue URL that this work completes.

## Before you start

- `gh auth status` must succeed. If `gh` is missing, the user can still share the work: do steps 1–4, then show the "Create a pull request" link that GitHub prints after the push.
- With an issue given: `gh issue view <number> --json number,title,body` must find it. **Check that the work matches it.** Compare the changes with the issue's title and goal. A slice issue links its slice file under "Plan": the work should be that slice. If they don't match, ask the user which issue this work belongs to. If it belongs to none, continue without an issue. If the work only contributes to the issue without finishing it, use `Refs` instead of `Closes` (step 5).
- The base branch is the repository's default: `gh repo view --json defaultBranchRef -q .defaultBranchRef.name` (usually `main`). Call it BASE.

## 1. Branch

- Already on a branch other than BASE: reuse it.
- On BASE: create a new branch from the current state, so local commits and changes move with it. Name it after the work, not after the issue: `<feature>/<NN-name>` when the work is a slice, otherwise `<type>/<short-description>` with the same type as the commit (`feat`, `fix`, `docs`, `chore`). Add the issue number when there is one (`docs/12-login-session`). Lowercase, words joined with `-`.

Never throw away committed or uncommitted work.

## 2. Commit what's left

Look at `git status --short`.

- **Stage files by name**, only the ones that belong to this work. Never use `git add -A` or `git add .`. Tell the user which changed files you left out.
- **Never stage secrets or local files:** `.env*`, `*.pem`, `*.key`, credentials, build output, scratch files. If one looks like part of the change, ask first.
- Commit with a conventional message (`feat:`, `fix:`, `docs:`, ...). Add `Refs #<issue>` in the body when there is an issue.
- If everything is already committed, don't make an empty commit. If there's nothing ahead of BASE either, tell the user there is nothing to share and stop.

## 3. Check

Run `pnpm lint`, `pnpm typecheck` and `pnpm test` (put `docker compose exec app` in front when the app runs in Docker). If something fails, fix it or tell the user. Don't push red work.

## 4. Push

`git push -u origin <branch>`

## 5. Open the pull request

```bash
gh pr create --base <BASE> --title "<conventional title>" --body "<body>"
```

Body:

```markdown
## What

<what changed, in 2–4 lines a teammate understands>

## How it was checked

<the checks, and what was tried in the browser>

Closes #<issue>
```

Use `Closes #<issue>` only when merging this pull request finishes the issue, and `Refs #<issue>` when it's only part of it. Leave the line out without an issue. For a slice, also link its slice file.

## Done

Show the pull request's link. CI runs the checks on GitHub. A teammate reviews and approves, then it's merged into BASE. Don't merge it yourself.
