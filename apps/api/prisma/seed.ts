import { randomUUID } from 'node:crypto';
import { PrismaPg } from '@prisma/adapter-pg';
import { hashPassword } from 'better-auth/crypto';
import { env } from '../src/env';
import { PrismaClient } from '../src/generated/prisma/client';

const ADMIN = { username: 'admin', password: 'admin', name: 'Admin', email: 'admin@example.com' };

async function seed(): Promise<void> {
  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: env.DATABASE_URL }),
  });

  const existing = await prisma.user.findUnique({ where: { username: ADMIN.username } });
  if (existing) {
    console.log(`User "${ADMIN.username}" already exists, nothing to seed.`);
    await prisma.$disconnect();
    return;
  }

  const now = new Date();
  const userId = randomUUID();
  await prisma.user.create({
    data: {
      id: userId,
      name: ADMIN.name,
      email: ADMIN.email,
      emailVerified: true,
      username: ADMIN.username,
      displayUsername: ADMIN.username,
      createdAt: now,
      updatedAt: now,
      accounts: {
        create: {
          id: randomUUID(),
          accountId: userId,
          providerId: 'credential',
          password: await hashPassword(ADMIN.password),
          createdAt: now,
          updatedAt: now,
        },
      },
    },
  });
  console.log(`Created user "${ADMIN.username}" with password "${ADMIN.password}".`);
  await prisma.$disconnect();
}

seed().catch((error: unknown) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
