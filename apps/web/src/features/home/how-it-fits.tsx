import { Card } from './card';

export function HowItFits() {
  return (
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
        share code through <code>packages/</code>, so a change to the shape of your data is checked
        in both places at once.
      </p>
    </Card>
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
