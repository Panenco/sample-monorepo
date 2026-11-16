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
  { command: 'pnpm dev', text: 'Run the app locally. Logs appear in this terminal.' },
  {
    command: 'docker compose --profile app up',
    text: 'Or run the app in Docker. Logs appear in this terminal.',
  },
  {
    command: 'pnpm generate:sdk',
    text: 'Refresh the website’s API client after changing the API.',
  },
  { command: 'pnpm lint && pnpm typecheck', text: 'Check the code for mistakes.' },
  { command: 'pnpm test', text: 'Run the automated tests.' },
];

const FEATURE_STEPS = [
  'Ask Claude Code to plan it: /spec-epic <your idea>. It asks questions, then writes a PRD, an architecture doc and slices in docs/planned/.',
  'Build it one slice at a time: /build-slice <feature>. Each slice is one commit, with tests.',
  'When every slice is done: /consolidate-epic <feature>. It updates docs/system/ and cleans up the plan.',
  'Small change? Skip the plan and just describe what you want to Claude Code.',
];

const FEATURE_EXAMPLE = [
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

const SKILL_GROUPS = [
  {
    title: 'Building a feature',
    skills: [
      {
        name: '/spec-epic <idea>',
        text: 'Plans a feature: questions, then a PRD, an architecture doc and slices.',
      },
      {
        name: '/build-slice <feature>',
        text: 'Builds the next slice of a plan, with tests, and commits it.',
      },
      {
        name: '/consolidate-epic <feature>',
        text: 'Finishes a feature: updates docs/system/ and removes the plan.',
      },
    ],
  },
  {
    title: 'Helpers',
    skills: [
      { name: '/grill-me', text: 'Claude questions your plan until every decision is made.' },
      {
        name: '/diagnosing-bugs',
        text: 'A step-by-step hunt for the cause when something breaks.',
      },
      { name: '/tdd', text: 'Build something test-first: a failing test, then the code.' },
    ],
  },
  {
    title: 'GitHub (optional, for teams)',
    skills: [
      {
        name: '/create-issues-from-epic <feature>',
        text: 'Turns a plan into GitHub issues: one for the feature, one per slice.',
      },
      {
        name: '/create-pr [issue]',
        text: 'Shares your work as a pull request: branch, checks, push.',
      },
    ],
  },
  {
    title: 'Used by Claude on its own',
    skills: [
      {
        name: 'create-api-endpoint',
        text: 'How Claude adds API endpoints. You just describe what you need.',
      },
      { name: 'create-nextjs-page', text: 'How Claude adds pages to the website.' },
      { name: 'grilling', text: 'The questioning behind /grill-me and /spec-epic.' },
    ],
  },
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
        <p className="mt-4 text-sm font-medium">For example</p>
        <ul className="mt-2 space-y-3 text-sm">
          {FEATURE_EXAMPLE.map((item) => (
            <li key={item.command}>
              <code className="block rounded bg-slate-100 px-2 py-1 break-words">
                {item.command}
              </code>
              <span className="mt-1 block text-slate-600">{item.text}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Claude Code skills">
        <p className="mb-4 text-sm text-slate-600">
          Type a command in Claude Code to start a skill. The rules in <code>.claude/rules/</code>{' '}
          apply automatically.
        </p>
        <div className="space-y-5">
          {SKILL_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="mb-2 text-sm font-medium">{group.title}</h3>
              <ul className="space-y-2 text-sm">
                {group.skills.map((skill) => (
                  <li key={skill.name} className="sm:flex sm:gap-4">
                    <code className="block shrink-0 break-words sm:w-80">{skill.name}</code>
                    <span className="text-slate-600">{skill.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Everyday commands">
        <ul className="space-y-2 text-sm">
          {COMMANDS.map((item) => (
            <li key={item.command} className="sm:flex sm:gap-4">
              <code className="shrink-0 rounded bg-slate-100 px-2 py-0.5 sm:w-72">
                {item.command}
              </code>
              <span className="text-slate-600">{item.text}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Useful links">
        <ul className="space-y-2 text-sm">
          <li>
            <a
              href="/api/docs"
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 underline"
            >
              API documentation (Swagger): your own endpoints, and you can try them out
            </a>
          </li>
          <li>
            <a
              href="/api/auth/reference"
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 underline"
            >
              Login documentation: sign in, sign out and sessions (handled by better-auth)
            </a>
          </li>
        </ul>
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
