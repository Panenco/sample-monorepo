---
paths:
  - 'packages/**/*'
  - 'pnpm-workspace.yaml'
  - 'turbo.json'
---

# Shared packages

Each package in `packages/` is one of two kinds. Pick by one question: **does the API import it while running?**

| Kind              | When                                  | `package.json`                                                                                                   | Example              |
| ----------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | -------------------- |
| **Compiled**      | The API imports it at runtime         | `"main": "./dist/index.js"`, `"build": "tsc"`, `"dev": "tsc --watch --preserveWatchOutput"`, `"files": ["dist"]` | `packages/contracts` |
| **Source-direct** | Only the website (or tooling) uses it | `"main": "./src/index.ts"`, no build step; add the name to `transpilePackages` in `apps/web/next.config.ts`      | `packages/api-sdk`   |

Why it matters: the API runs compiled JavaScript with Node, which can't load `.ts` files from another package. The website's bundler can.

## Adding a package

1. Create `packages/<name>/` with a `package.json` named `@app/<name>`, a `tsconfig.json` that extends `@app/typescript-config/base.json`, and an `eslint.config.mjs`.
2. Add it as a dependency where it's used: `"@app/<name>": "workspace:*"`, then run `pnpm install`.
3. If it has dependencies of its own, add a `node_modules` volume for it in `docker-compose.yml`, next to the others. `docker/start.sh` stops with a message if you forget.

A "Cannot find module '@app/…'" error for a package that is already listed in `package.json` usually means `pnpm install` hasn't run since it was added.
