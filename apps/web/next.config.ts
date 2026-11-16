import path from 'node:path';
import type { NextConfig } from 'next';

const API_URL = process.env.API_URL ?? 'http://localhost:3001';

const nextConfig: NextConfig = {
  // api-sdk ships TypeScript source, so Next compiles it like the app's own code.
  transpilePackages: ['@app/api-sdk'],
  turbopack: { root: path.resolve(__dirname, '../..') },
  // The browser only ever talks to this app; /api/* is forwarded to the API, so login cookies just work.
  async rewrites() {
    return [{ source: '/api/:path*', destination: `${API_URL}/api/:path*` }];
  },
};

export default nextConfig;
