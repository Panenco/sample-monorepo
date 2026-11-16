import 'reflect-metadata';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { buildOpenApiDocument } from '../openapi';

// Writes apps/api/openapi.json, which packages/api-sdk turns into a typed client for the web app.
async function generate(): Promise<void> {
  const app = await NestFactory.create(AppModule, { logger: false });
  app.setGlobalPrefix('api');
  const outputPath = resolve(process.cwd(), 'openapi.json');
  await writeFile(outputPath, JSON.stringify(buildOpenApiDocument(app), null, 2));
  await app.close();
  console.log(`OpenAPI spec written to ${outputPath}`);
}

generate().catch((error: unknown) => {
  console.error('Generating the OpenAPI spec failed:', error);
  process.exit(1);
});
