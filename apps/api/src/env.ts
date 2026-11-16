import 'dotenv/config';
import { z } from 'zod';

// Defaults make local development work without a .env file. Override them in production.
const EnvSchema = z.object({
  PORT: z.coerce.number().default(3001),
  DATABASE_URL: z.string().default('postgresql://postgres:postgres@localhost:5433/app'),
  WEB_URL: z.string().default('http://localhost:3000'),
  BETTER_AUTH_SECRET: z.string().min(32).default('local-development-secret-change-me-in-prod'),
});

export const env = EnvSchema.parse(process.env);
