import { Card } from './card';
import { LabeledList } from './labeled-list';

const COMMANDS = [
  { label: 'pnpm dev', text: 'Run the app locally. Logs appear in this terminal.' },
  {
    label: 'docker compose --profile app up',
    text: 'Or run the app in Docker. Logs appear in this terminal.',
  },
  { label: 'pnpm generate:sdk', text: 'Refresh the website’s API client after changing the API.' },
  { label: 'pnpm lint && pnpm typecheck', text: 'Check the code for mistakes.' },
  { label: 'pnpm test', text: 'Run the automated tests.' },
];

export function EverydayCommands() {
  return (
    <Card title="Everyday commands">
      <LabeledList items={COMMANDS} />
    </Card>
  );
}
