import { Card } from './card';

const LINKS = [
  {
    href: '/api/docs',
    text: 'API documentation (Swagger): your own endpoints, and you can try them out',
  },
  {
    href: '/api/auth/reference',
    text: 'Login documentation: sign in, sign out and sessions (handled by better-auth)',
  },
];

export function UsefulLinks() {
  return (
    <Card title="Useful links">
      <ul className="space-y-2 text-sm">
        {LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 underline"
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </Card>
  );
}
