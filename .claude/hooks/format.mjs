// Formats the file Claude just edited with the repo's Prettier settings.
// Exits quietly when Prettier isn't installed on this machine (for example when the app only runs in Docker).
import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const projectDir = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();

async function readFilePath() {
  let input = '';
  for await (const chunk of process.stdin) input += chunk;
  return JSON.parse(input).tool_input?.file_path;
}

async function loadPrettier() {
  try {
    const prettierPath = createRequire(join(projectDir, 'package.json')).resolve('prettier');
    const prettier = await import(pathToFileURL(prettierPath).href);
    return prettier.default ?? prettier;
  } catch {
    return null;
  }
}

const filePath = await readFilePath();
const prettier = await loadPrettier();
if (filePath && prettier) {
  const info = await prettier.getFileInfo(filePath, {
    ignorePath: join(projectDir, '.prettierignore'),
    resolveConfig: true,
  });
  if (!info.ignored && info.inferredParser) {
    const source = await readFile(filePath, 'utf8');
    const options = await prettier.resolveConfig(filePath);
    const formatted = await prettier.format(source, { ...options, filepath: filePath });
    if (formatted !== source) await writeFile(filePath, formatted);
  }
}
