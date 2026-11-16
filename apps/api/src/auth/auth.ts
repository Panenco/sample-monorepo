import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { username } from 'better-auth/plugins';
import type { Request } from 'express';
import { env } from '../env';
import type { PrismaService } from '../prisma/prisma.service';

export function createAuth(prisma: PrismaService) {
  return betterAuth({
    database: prismaAdapter(prisma, { provider: 'postgresql' }),
    basePath: '/api/auth',
    // The browser talks to the API through the web app's /api proxy, so the web URL is the public one.
    baseURL: env.WEB_URL,
    secret: env.BETTER_AUTH_SECRET,
    trustedOrigins: [env.WEB_URL],
    emailAndPassword: { enabled: true, disableSignUp: true },
    plugins: [username()],
  });
}

export type Auth = ReturnType<typeof createAuth>;
export type SessionUser = Auth['$Infer']['Session']['user'];
export type AuthenticatedRequest = Request & { user: SessionUser };

export const AUTH = Symbol('AUTH');
