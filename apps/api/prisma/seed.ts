import { createAuth } from '../src/auth/auth';
import { PrismaService } from '../src/prisma/prisma.service';

const ADMIN = { username: 'admin', password: 'admin', name: 'Admin', email: 'admin@example.com' };

// Creates the admin through better-auth itself, so the stored user and password match what login expects.
async function seed(): Promise<void> {
  const prisma = new PrismaService();
  try {
    const existing = await prisma.user.findUnique({ where: { username: ADMIN.username } });
    if (existing) {
      console.log(`User "${ADMIN.username}" already exists, nothing to seed.`);
      return;
    }

    const { internalAdapter, password } = await createAuth(prisma).$context;
    const user = await internalAdapter.createUser(
      {
        name: ADMIN.name,
        email: ADMIN.email,
        emailVerified: true,
        username: ADMIN.username,
        displayUsername: ADMIN.username,
      },
      { method: 'admin' },
    );
    await internalAdapter.linkAccount({
      userId: user.id,
      providerId: 'credential',
      accountId: user.id,
      password: await password.hash(ADMIN.password),
    });
    console.log(`Created user "${ADMIN.username}" with password "${ADMIN.password}".`);
  } finally {
    await prisma.$disconnect();
  }
}

seed().catch((error: unknown) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
