import { createClient } from './generated/client';

export type ApiClient = ReturnType<typeof createClient>;

export function createApiClient(baseUrl: string): ApiClient {
  return createClient({ baseUrl, throwOnError: true, credentials: 'include' });
}
