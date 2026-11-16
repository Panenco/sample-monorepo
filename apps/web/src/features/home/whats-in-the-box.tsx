import { Card } from './card';
import { LabeledList } from './labeled-list';

const FOLDERS = [
  { label: 'apps/web', text: 'The website your users see. Pages live in src/app.' },
  { label: 'apps/api', text: 'The server. It checks who is logged in and reads and writes data.' },
  { label: 'apps/api/prisma', text: 'The database tables (schema.prisma) and the seed user.' },
  {
    label: 'packages/contracts',
    text: 'The shape of the data the API sends and receives, written once and shared.',
  },
  {
    label: 'packages/api-sdk',
    text: 'Generated code that lets the website call the API. Never edit it by hand.',
  },
  {
    label: 'packages/typescript-config, packages/eslint-config',
    text: 'Shared settings, so every app follows the same rules.',
  },
  {
    label: 'docs',
    text: 'Plans for features being built, and how the product works today. See docs/README.md.',
  },
  {
    label: '.claude',
    text: 'Rules and skills that tell Claude Code how to work in this repo.',
  },
];

export function WhatsInTheBox() {
  return (
    <Card title="What's in the box">
      <LabeledList items={FOLDERS} />
    </Card>
  );
}
