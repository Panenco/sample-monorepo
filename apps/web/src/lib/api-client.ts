import { createApiClient } from '@app/api-sdk';

// An empty base URL keeps requests on this origin (/api/...), where next.config.ts forwards them.
export const apiClient = createApiClient('');
