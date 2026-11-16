import type { INestApplication } from '@nestjs/common';

// Setup shared by the running API, the OpenAPI generator and the tests, so all three see the same app.
export function configureApp(app: INestApplication): INestApplication {
  return app.setGlobalPrefix('api');
}
