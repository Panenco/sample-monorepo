import 'dotenv/config';
import { z } from 'zod';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const DEV_AUTH_SECRET = 'local-development-secret-not-for-production';

// Defaults make local development work without a .env file. In production the auth secret must be set.
const EnvSchema = z.object({
  PORT: z.coerce.number().default(3001),
  DATABASE_URL: z.string().default('postgresql://postgres:postgres@localhost:5433/app'),
  WEB_URL: z
    .url({ protocol: /^https?$/ })
    .default('http://localhost:3000')
    .transform((url) => url.replace(/\/+$/, '')),
  BETTER_AUTH_SECRET: IS_PRODUCTION
    ? z.string().min(32)
    : z.string().min(32).default(DEV_AUTH_SECRET),
});

export const env = EnvSchema.parse(process.env);
