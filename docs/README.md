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

1. `/spec-epic <idea>`: Claude asks questions, then writes a PRD (what and why), an architecture doc (how) and slices (one PR each) in `planned/<feature>/`.
2. `/build-slice <feature>`: build the next slice with tests and commit it. Repeat for each slice.
3. `/consolidate-epic <feature>`: update `system/`, record lasting decisions in `adr/`, delete the plan.

Small changes skip the plan (`.claude/rules/docs.md` says where the line is): build them and update `system/features/` in the same commit.
