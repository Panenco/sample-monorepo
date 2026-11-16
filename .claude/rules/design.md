---
paths:
  - 'apps/web/**/*.tsx'
  - 'apps/web/**/*.css'
---

# Design and accessibility

## Styling

- Tailwind CSS v4 classes only. No inline `style={{}}` and no separate CSS files beyond `globals.css`.
- Spacing follows a 4px grid (Tailwind's default scale): 4, 8, 12, 16, 24, 32, 48, 64.
- Don't put cards inside cards. Use spacing, headings and dividers inside one card.

## Responsive

- Every page works at 375px (phone), 768px (tablet), 1024px and 1440px (laptop), with no horizontal scrolling of the whole page.
- Never disable zooming.

## Accessibility

- Use real HTML elements: `<button>` for actions (not a clickable `<div>`), `<a>`/`Link` for navigation, and `<main>`, `<nav>` and `<header>` landmarks.
- One `<h1>` per page, and don't skip heading levels.
- Every input has a visible `<label>`. A placeholder is not a label.
- Icon-only buttons have an `aria-label`. Decorative icons and images get `aria-hidden="true"` or `alt=""`.
- Text contrast meets WCAG AA (4.5:1 for normal text). Never use color alone to carry meaning: add text or an icon.
- Sentence case for headings, buttons and labels ("Add note", not "Add Note").

## Forms, tables and dialogs

- Show errors next to the field they belong to. Disable the submit button while saving.
- Use `autoComplete` on name, email and password fields.
- One main action per screen or dialog.
- Tables don't make the page scroll sideways. On small screens they reflow (for example into cards) or scroll inside their own box.
- Deleting something permanent always asks for confirmation first, and the confirm button says what it does ("Delete note").

## Loading, empty and error states

Every view that loads data shows all three:

- **Loading:** a placeholder or a specific message ("Loading notes…").
- **Empty:** what's missing and the action to fix it ("No notes yet. Add your first note.").
- **Error:** what went wrong in plain words, plus a way to retry.

## Writing

- Error messages say what happened and how to fix it: "Enter a date like 31/12/2026", not "Invalid date".
- Buttons name the action: "Save changes", not "OK". "Create account", not "Submit".
