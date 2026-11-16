import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configureApp } from './configure-app';
import { env } from './env';
import { buildOpenApiDocument } from './openapi';

async function bootstrap(): Promise<void> {
  const app = configureApp(await NestFactory.create(AppModule));
  SwaggerModule.setup('api/docs', app, buildOpenApiDocument(app));
  await app.listen(env.PORT);
  console.log(`API running. Documentation: http://localhost:${env.PORT}/api/docs`);
}

void bootstrap();
