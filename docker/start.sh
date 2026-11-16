#!/bin/sh
set -e

# Each workspace package with dependencies needs its own node_modules volume in docker-compose.yml.
# Without one, the container would write Linux packages into the folder on your laptop.
for dir in apps/* packages/*; do
  grep -qE '"(dev)?[dD]ependencies"' "$dir/package.json" 2>/dev/null || continue
  if ! grep -q " /repo/$dir/node_modules " /proc/mounts; then
    echo "docker-compose.yml has no node_modules volume for $dir." >&2
    echo "Add '- <name>_node_modules:/repo/$dir/node_modules' under volumes (and the volume name at the bottom)." >&2
    exit 1
  fi
done

pnpm install --frozen-lockfile
pnpm --filter @app/api db:migrate
pnpm --filter @app/api db:seed
exec pnpm turbo run dev
