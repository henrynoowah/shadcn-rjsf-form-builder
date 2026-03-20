/**
 * Generates static registry JSON files for each item in registry.json.
 * Output goes to apps/web/public/r/<name>.json so they can be served via
 * raw.githubusercontent.com without a running server.
 *
 * Usage: node scripts/build-registry.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const WEB = join(ROOT, 'apps/web');

const GITHUB_RAW_BASE =
  'https://raw.githubusercontent.com/henrynoowah/shadcn-rjsf-form-builder/main/apps/web/public/r';

const registry = JSON.parse(readFileSync(join(WEB, 'registry.json'), 'utf-8'));
const localNames = new Set(registry.items.map((item) => item.name));

const outDir = join(WEB, 'public/r');
mkdirSync(outDir, { recursive: true });

for (const item of registry.items) {
  const registryDependencies = (item.registryDependencies ?? []).map((dep) => {
    if (dep.startsWith('http')) return dep;
    return localNames.has(dep) ? `${GITHUB_RAW_BASE}/${dep}.json` : dep;
  });

  const files = item.files.map((file) => {
    const relativePath = file.path.replace('registry/', '');
    const absolutePath = join(WEB, 'registry', relativePath);
    const content = readFileSync(absolutePath, 'utf-8');
    return {
      path: file.path,
      type: file.type,
      target: file.target,
      content,
    };
  });

  const output = { ...item, registryDependencies, files };
  const outPath = join(outDir, `${item.name}.json`);
  writeFileSync(outPath, JSON.stringify(output, null, 2));
  console.log(`✓ ${item.name}.json`);
}

console.log(`\nGenerated ${registry.items.length} registry files → apps/web/public/r/`);
