# Docs

How the product works today, why it was built this way, and the plans for what's being built now. The full rules are in `.claude/rules/docs.md`.

| Folder                 | What's in it                                                |
| ---------------------- | ----------------------------------------------------------- |
| `system/features/`     | What the product does today, one file per capability        |
| `system/architecture/` | How the system works today                                  |
| `adr/`                 | Decisions and why we made them, one file each               |
| `planned/<feature>/`   | The plan for a feature being built (deleted when it's done) |
| `planned/_template/`   | Templates for those plans                                   |

## Building a feature

1. `/spec-epic <idea>`: Claude asks questions, then writes a PRD (what and why), an architecture doc (how) and slices (one commit each) in `planned/<feature>/`.
2. `/build-slice <feature>`: build the next slice with tests and commit it. Repeat for each slice.
3. `/consolidate-epic <feature>`: update `system/`, record lasting decisions in `adr/`, delete the plan.

For example:

```text
/spec-epic customers can book an appointment online and get a confirmation email
```

Claude asks its questions and proposes a short name for the feature, say `online-booking`. It then writes:

```text
docs/planned/online-booking/
├── online-booking-prd.md
├── online-booking-architecture.md
└── slices/
    ├── 01-booking-data.md
    ├── 02-book-a-slot.md
    └── 03-confirmation-email.md
```

`/build-slice online-booking` builds the first slice whose "Done when" boxes aren't all ticked, so running it three times builds 01, 02 and 03 in order. To build one specific slice, give its file: `/build-slice docs/planned/online-booking/slices/02-book-a-slot.md`. When all three are done, `/consolidate-epic online-booking` finishes the feature.

Working as a team on GitHub? `/create-issues-from-epic <feature>` turns the slices into issues, and `/create-pr` shares each slice as a pull request.

Small changes skip the plan (`.claude/rules/docs.md` says where the line is): build them and update `system/features/` in the same commit.
