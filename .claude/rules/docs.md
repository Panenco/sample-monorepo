---
paths:
  - 'docs/**/*'
---

# Docs: how features are planned and described

## The folders

| Folder                      | What it holds                                                                     | Lifetime                                    |
| --------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------- |
| `docs/planned/<feature>/`   | The plan for one feature that is being built: PRD, architecture, slices           | Temporary: deleted when the feature is done |
| `docs/planned/_template/`   | The templates `plan-feature` copies                                               | Permanent                                   |
| `docs/system/features/`     | What the product does **today**, one file per capability (`login.md`, `notes.md`) | Living, always current                      |
| `docs/system/architecture/` | How the system works **today**, for topics that span several features             | Living, always current                      |
| `docs/adr/`                 | Decisions: why we chose X over Y. One file per decision, `NNNN-title.md`          | Permanent, never edited                     |

No other folders. Research and notes that don't fit go nowhere: summarize what matters in one of the above.

## A feature's life

1. **Plan** (`/plan-feature`): a grilling session, then `docs/planned/<feature>/` with `<feature>-prd.md`, `<feature>-architecture.md` and `slices/NN-<name>.md`.
2. **Build** (`/build-slice`): one slice at a time, one PR per slice. Slice PRs don't touch `docs/system/`.
3. **Finish** (`/finish-feature`): when every slice is merged, update `docs/system/`, turn lasting decisions into ADRs, and delete `docs/planned/<feature>/`.

Plan first when a change needs more than about two PRs, adds a database table or changes one, or adds a new flow for users. A smaller change skips planning: build it, and update `docs/system/features/` in the same PR if what the product does changed.

## The PRD: what and why

`<feature>-prd.md` is written from the user's point of view, for someone who doesn't code. About 150 lines at most. Sections:

- **Context**: what is missing or painful today, for whom, and why it matters. The most important section.
- **Users**: who does what. Plain nouns (admin, customer, team member).
- **Flow**: the steps a user takes, as a numbered list (one action or decision per step), plus a Mermaid `flowchart` of the same steps.
- **Rules**: the conditions, limits and edge cases, grouped under short headings per action. Every rule is testable ("Only the person who wrote a note can edit it"), not vague ("booking should be easy").
- **Out of scope**: what we decided not to do, each with a one-line reason.
- **Open questions**: functional questions still to answer.

**No technical words in a PRD**: no endpoints, tables, components, libraries or data models. If you need them, they belong in the architecture doc.

## The architecture doc: how

`<feature>-architecture.md` explains how this feature will be built, at a high level. It links to the PRD instead of repeating it. Sections:

- **Summary**: the approach in a few sentences.
- **Data**: new or changed Prisma models and fields.
- **API**: new or changed endpoints and their contract schemas.
- **Pages**: new or changed pages and what each one shows.
- **Decisions**: each choice in one line, plus why ("Store notes per user, because...").
- **Risks**: what could go wrong or is still uncertain.

## Slices: the work breakdown

Each `slices/NN-<name>.md` is one PR's worth of work, numbered in the order to build them:

- **Vertical**: a slice delivers something a user can see or use, through every layer it needs (contract, API, page). "All the database work, then all the API work" is not a slice.
- **Exclusive files**: two slices don't change the same file. Exceptions: one-line registrations (a module in `app.module.ts`, an export in `packages/contracts/src/index.ts`, a link in the header), and slice 01 may be shared groundwork (database models and contracts) when later slices all need it.
- **Small**: if the slice file doesn't fit on one screen, split it.
- **Working after each merge**: the app works after every slice on its own. No links or buttons to pages that a later slice builds.

Sections: **Goal** (one sentence), **Rules covered** (which PRD rules), **May touch** (the complete list of files, apart from generated ones such as migration folders), **May not touch**, **Steps**, **Done when** (checks anyone can verify, such as "`pnpm test` passes and the new journey test covers creating and listing notes").

## ADRs: decisions that outlive a feature

Test: _will someone still ask "why did we do it this way?" after the feature's plan is deleted?_ If yes, write an ADR. Examples: choosing a new library, a new concept that many features build on, a big trade-off. A detail of one feature belongs in its architecture doc.

An ADR (`docs/adr/NNNN-title.md`, next free number) has: **Context**, **Options considered**, **Decision**, **Consequences**. ADRs are never edited later. A changed decision gets a new ADR that says which one it replaces.

## Writing `docs/system/`

- Describe what **is**, in the present tense. No "added", "now", "previously", "no longer", no dates, no PR numbers. The history is in Git.
- `features/` docs are about what users can do and the business rules, in 20 to 50 lines. Don't restate the code (fields, endpoints, folder layouts): link to the file instead.
- A small Mermaid diagram (`flowchart`, `sequenceDiagram`, `erDiagram`) is welcome when it explains a flow better than words.
