/**
 * Generates static registry JSON files for each item in registry.json.
 * Output goes to apps/web/public/r/<name>.json, which the site serves statically.
 * Local registryDependencies point back at the site so installs stay on our domain.
 * Every file is stamped with the current version from apps/web/changelog.json,
 * and CHANGELOG.md at the repo root is regenerated from the same source.
 *
 * Usage: node scripts/build-registry.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readChangelog, renderChangelogMarkdown } from './changelog-md.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const WEB = join(ROOT, 'apps/web');

const registry = JSON.parse(readFileSync(join(WEB, 'registry.json'), 'utf-8'));
const HOMEPAGE = registry.homepage.replace(/\/$/, '');
const REGISTRY_BASE = `${HOMEPAGE}/r`;
const localNames = new Set(registry.items.map((item) => item.name));

const changelog = readChangelog();
const version = changelog[0].version;
// Keep in sync with versionHeader() in apps/web/lib/changelog.ts
const header = `// shadcn-rjsf-form-builder v${version} — ${HOMEPAGE}/docs/changelog\n`;

const outDir = join(WEB, 'public/r');
mkdirSync(outDir, { recursive: true });

for (const item of registry.items) {
  const registryDependencies = (item.registryDependencies ?? []).map((dep) => {
    if (dep.startsWith('http')) return dep;
    return localNames.has(dep) ? `${REGISTRY_BASE}/${dep}.json` : dep;
  });

  const files = item.files.map((file) => {
    const relativePath = file.path.replace('registry/', '');
    const absolutePath = join(WEB, 'registry', relativePath);
    const content = header + readFileSync(absolutePath, 'utf-8');
    return {
      path: file.path,
      type: file.type,
      target: file.target,
      content,
    };
  });

  const output = {
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
    ...item,
    registryDependencies,
    files,
    docs: `Installed ${item.name} v${version}. Release notes: ${HOMEPAGE}/docs/changelog`,
    meta: { version },
  };
  const outPath = join(outDir, `${item.name}.json`);
  writeFileSync(outPath, JSON.stringify(output, null, 2));
  console.log(`✓ ${item.name}.json`);
}

writeFileSync(join(ROOT, 'CHANGELOG.md'), renderChangelogMarkdown(changelog, HOMEPAGE));
console.log('✓ CHANGELOG.md');

console.log(`\nGenerated ${registry.items.length} registry files (v${version}) → apps/web/public/r/`);
