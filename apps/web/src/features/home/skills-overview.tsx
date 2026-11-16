import { Card } from './card';
import { LabeledList } from './labeled-list';

const SKILL_GROUPS = [
  {
    title: 'Building a feature',
    skills: [
      {
        label: '/spec-epic <idea>',
        text: 'Plans a feature: questions, then a PRD, an architecture doc and slices.',
      },
      {
        label: '/build-slice <feature>',
        text: 'Builds the next slice of a plan, with tests, and commits it.',
      },
      {
        label: '/consolidate-epic <feature>',
        text: 'Finishes a feature: updates docs/system/ and removes the plan.',
      },
    ],
  },
  {
    title: 'Helpers',
    skills: [
      { label: '/grill-me', text: 'Claude questions your plan until every decision is made.' },
      {
        label: '/diagnosing-bugs',
        text: 'A step-by-step hunt for the cause when something breaks.',
      },
      { label: '/tdd', text: 'Build something test-first: a failing test, then the code.' },
      {
        label: '/code-review main',
        text: 'Reviews your changes since main: against the rules in .claude/rules/ and against the plan.',
      },
    ],
  },
  {
    title: 'GitHub (optional, for teams)',
    skills: [
      {
        label: '/create-issues-from-epic <feature>',
        text: 'Turns a plan into GitHub issues: one for the feature, one per slice.',
      },
      {
        label: '/create-pr [issue]',
        text: 'Shares your work as a pull request: branch, checks, push.',
      },
    ],
  },
];

export function SkillsOverview() {
  return (
    <Card title="Claude Code skills">
      <p className="mb-4 text-sm text-slate-600">
        Type a command in Claude Code to start a skill. The rules in <code>.claude/rules/</code>{' '}
        apply automatically.
      </p>
      <div className="space-y-5">
        {SKILL_GROUPS.map((group) => (
          <div key={group.title}>
            <h3 className="mb-2 text-sm font-medium">{group.title}</h3>
            <LabeledList items={group.skills} />
          </div>
        ))}
      </div>
    </Card>
  );
}
