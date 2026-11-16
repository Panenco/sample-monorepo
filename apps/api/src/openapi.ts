import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule, type OpenAPIObject } from '@nestjs/swagger';
import { cleanupOpenApiDoc } from 'nestjs-zod';
import { env } from './env';

export function buildOpenApiDocument(app: INestApplication): OpenAPIObject {
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription(
      `Login, logout and sessions are handled by better-auth and documented at ${env.WEB_URL}/api/auth/reference.`,
    )
    .setVersion('1.0')
    .build();
  return cleanupOpenApiDoc(SwaggerModule.createDocument(app, config));
}
