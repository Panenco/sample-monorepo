---
name: consolidate-epic
description: Wrap up a feature whose slices are all built. Updates docs/system to describe what now exists, turns lasting decisions into ADRs, and deletes docs/planned/<feature>/. Use when the user says a feature is done, finished or shipped, or asks to clean up its plan.
argument-hint: <feature>
---

# Finish a feature

When every slice is built, the plan in `docs/planned/<feature>/` has done its job. Its useful content moves into the permanent docs and the folder goes away. `.claude/rules/docs.md` describes those docs.

## 1. Check it is really done

Every slice file has all its "Done when" boxes ticked, and that work is on `main`. If not, list what's missing and stop.

## 2. Update `docs/system/`

Describe the product as it is now, in the present tense (see "Writing `docs/system/`" in `docs.md`):

- `docs/system/features/<capability>.md`: what users can do and the business rules. Base it on the PRD's flow and rules, but **check the code**, because the code is what shipped, not the plan. Add to an existing capability file when the feature extends it. Otherwise create a new one.
- `docs/system/architecture/`: only if the feature changed how the system works across features (a new building block, a new kind of integration).

## 3. Keep the decisions

Go through the architecture doc's Decisions and anything else in the folder that explains a "why":

- It will still matter after this folder is gone (a new library, a pattern other features will follow): write an ADR in `docs/adr/` with the next free number.
- It only explains how this feature was put together: fold the essence into the `system/` doc, or let it go.

## 4. Delete the plan

Delete `docs/planned/<feature>/`. Then tell the user what went where (which system docs and ADRs), and commit it as `docs: finish <feature>`.
