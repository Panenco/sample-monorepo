import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { env } from './env';
import { buildOpenApiDocument } from './openapi';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  SwaggerModule.setup('api/docs', app, buildOpenApiDocument(app));
  await app.listen(env.PORT);
  console.log(`API running on http://localhost:${env.PORT}/api (docs: /api/docs)`);
}

void bootstrap();
