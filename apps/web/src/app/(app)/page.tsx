'use client';

import { meControllerGetMe, type MeDtoOutput } from '@app/api-sdk';
import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';

const FOLDERS = [
  { path: 'apps/web', text: 'The website your users see. Pages live in src/app.' },
  { path: 'apps/api', text: 'The server. It checks who is logged in and reads and writes data.' },
  { path: 'apps/api/prisma', text: 'The database tables (schema.prisma) and the seed user.' },
  {
    path: 'packages/contracts',
    text: 'The shape of the data the API sends and receives, written once and shared.',
  },
  {
    path: 'packages/api-sdk',
    text: 'Generated code that lets the website call the API. Never edit it by hand.',
  },
  {
    path: 'packages/typescript-config, packages/eslint-config',
    text: 'Shared settings, so every app follows the same rules.',
  },
];

const COMMANDS = [
  { command: 'docker compose up', text: 'Start everything (database, API and website).' },
  {
    command: 'pnpm dev',
    text: 'Start the API and website without Docker (run pnpm db:setup first).',
  },
  {
    command: 'pnpm generate:sdk',
    text: 'Refresh the website’s API client after changing the API.',
  },
  { command: 'pnpm lint && pnpm typecheck', text: 'Check the code for mistakes.' },
  { command: 'pnpm test', text: 'Run the automated tests.' },
];

const FEATURE_STEPS = [
  'Describe the data in packages/contracts (for example a Patient schema).',
  'Add a table for it in apps/api/prisma/schema.prisma and create a migration.',
  'Add an endpoint in apps/api/src/domains/<feature>/. Copy domains/me as a starting point.',
  'Run pnpm generate:sdk so the website gets a typed function for the new endpoint.',
  'Add a page in apps/web/src/app/(app)/<feature>/page.tsx that calls that function.',
];

export default function HomePage() {
  const [me, setMe] = useState<MeDtoOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    meControllerGetMe({ client: apiClient, throwOnError: true })
      .then(({ data }) => setMe(data))
      .catch(() => setError('Could not load your profile from the API.'));
  }, []);

  return (
    <div className="space-y-10">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold">Welcome{me ? `, ${me.name}` : ''}</h1>
        <p className="max-w-2xl text-slate-600">
          This is the starting point for your product. Login, the database, the API and this website
          already work, so you can spend your time on the features that make your product special.
          This page explains how the project is organised.
        </p>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </section>

      <Card title="How it fits together">
        <div className="flex flex-col items-stretch gap-2 text-center text-sm sm:flex-row sm:items-center">
          <Box title="Website" subtitle="apps/web" />
          <Arrow />
          <Box title="API" subtitle="apps/api" />
          <Arrow />
          <Box title="Database" subtitle="PostgreSQL" />
        </div>
        <p className="mt-4 text-sm text-slate-600">
          Everything lives in one repository: a <strong>monorepo</strong>. The website and the API
          share code through <code>packages/</code>, so a change to the shape of your data is
          checked in both places at once.
        </p>
      </Card>

      <Card title="What's in the box">
        <ul className="divide-y divide-slate-100">
          {FOLDERS.map((folder) => (
            <li key={folder.path} className="py-2 text-sm sm:flex sm:gap-4">
              <code className="shrink-0 font-medium sm:w-80">{folder.path}</code>
              <span className="text-slate-600">{folder.text}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Adding a feature">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-700">
          {FEATURE_STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </Card>

      <Card title="Everyday commands">
        <ul className="space-y-2 text-sm">
          {COMMANDS.map((item) => (
            <li key={item.command} className="sm:flex sm:gap-4">
              <code className="shrink-0 rounded bg-slate-100 px-2 py-0.5 sm:w-64">
                {item.command}
              </code>
              <span className="text-slate-600">{item.text}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Useful links">
        <a
          href="http://localhost:3001/api/docs"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-blue-700 underline"
        >
          API documentation (Swagger): every endpoint, and you can try them out
        </a>
      </Card>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function Box({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
      <div className="font-medium">{title}</div>
      <code className="text-xs text-slate-500">{subtitle}</code>
    </div>
  );
}

function Arrow() {
  return (
    <span aria-hidden className="text-slate-400 sm:px-1">
      <span className="hidden sm:inline">→</span>
      <span className="sm:hidden">↓</span>
    </span>
  );
}
