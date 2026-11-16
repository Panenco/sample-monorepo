import 'reflect-metadata';
import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { AppModule } from '../src/app.module';
import { configureApp } from '../src/configure-app';
import { env } from '../src/env';

// Needs a running, seeded database: `pnpm db:setup` from the repo root.
describe('GET /api/me', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = configureApp(moduleRef.createNestApplication());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('rejects a request without a session', async () => {
    await request(app.getHttpServer()).get('/api/me').expect(401);
  });

  it('returns the logged-in user', async () => {
    const login = await request(app.getHttpServer())
      .post('/api/auth/sign-in/username')
      .set('Origin', env.WEB_URL)
      .send({ username: 'admin', password: 'admin' })
      .expect(200);

    const response = await request(app.getHttpServer())
      .get('/api/me')
      .set('Cookie', login.get('Set-Cookie') ?? [])
      .expect(200);

    expect(response.body).toMatchObject({ name: 'Admin', email: 'admin@example.com' });
  });

  it('rejects a wrong password', async () => {
    await request(app.getHttpServer())
      .post('/api/auth/sign-in/username')
      .set('Origin', env.WEB_URL)
      .send({ username: 'admin', password: 'wrong' })
      .expect(401);
  });
});
