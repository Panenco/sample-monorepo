import { Card } from './card';

const STEPS = [
  'Ask Claude Code to plan it: /spec-epic <your idea>. It asks questions, then writes a PRD, an architecture doc and slices in docs/planned/.',
  'Build it one slice at a time: /build-slice <feature>. Each slice is one commit, with tests.',
  'When every slice is done: /consolidate-epic <feature>. It updates docs/system/ and cleans up the plan.',
  'Small change? Skip the plan and just describe what you want to Claude Code.',
];

const EXAMPLE = [
  {
    command: '/spec-epic customers can book an appointment online and get a confirmation email',
    text: 'Claude asks questions, proposes the name online-booking, and writes docs/planned/online-booking/ with a PRD, an architecture doc and slices 01, 02 and 03.',
  },
  {
    command: '/build-slice online-booking',
    text: 'Builds the first slice that isn’t done yet. Run it again for the next one: 01, then 02, then 03.',
  },
  {
    command: '/consolidate-epic online-booking',
    text: 'When all three slices are done: updates docs/system/ and removes the plan.',
  },
];

export function AddingAFeature() {
  return (
    <Card title="Adding a feature">
      <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-700">
        {STEPS.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <p className="mt-4 text-sm font-medium">For example</p>
      <ul className="mt-2 space-y-3 text-sm">
        {EXAMPLE.map((item) => (
          <li key={item.command}>
            <code className="block rounded bg-slate-100 px-2 py-1 break-words">{item.command}</code>
            <span className="mt-1 block text-slate-600">{item.text}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
