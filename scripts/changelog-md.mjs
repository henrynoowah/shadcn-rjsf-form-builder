/**
 * Markdown rendering for apps/web/changelog.json. Shared by build-registry.mjs
 * (CHANGELOG.md) and release.mjs (GitHub release notes).
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const WEB = join(__dirname, '..', 'apps/web');

export const REPO_URL = 'https://github.com/henrynoowah/shadcn-rjsf-form-builder';

const SECTION_TITLES = {
  breaking: 'Breaking Changes',
  feat: 'Features',
  fix: 'Fixes',
  docs: 'Docs',
};

export const readChangelog = () => JSON.parse(readFileSync(join(WEB, 'changelog.json'), 'utf-8'));

export const readHomepage = () =>
  JSON.parse(readFileSync(join(WEB, 'registry.json'), 'utf-8')).homepage.replace(/\/$/, '');

/** Body of a single release: summary + changes grouped by type. No version heading. */
export const renderReleaseBody = (entry, previous) => {
  const lines = [];
  if (entry.summary) lines.push(entry.summary, '');

  for (const [type, title] of Object.entries(SECTION_TITLES)) {
    const changes = entry.changes.filter((c) => c.type === type);
    if (changes.length === 0) continue;
    lines.push(`### ${title}`, '');
    for (const change of changes) {
      const items = change.items?.length ? ` _(${change.items.join(', ')})_` : '';
      lines.push(`- ${change.text}${items}`);
    }
    lines.push('');
  }

  if (previous) {
    lines.push(`**Full diff:** ${REPO_URL}/compare/v${previous.version}...v${entry.version}`, '');
  }
  return lines.join('\n');
};

export const renderChangelogMarkdown = (entries, homepage) => {
  const lines = [
    '# Changelog',
    '',
    `All notable changes to the registry items. Also published at ${homepage}/docs/changelog and as GitHub Releases.`,
    '',
    '<!-- Generated from apps/web/changelog.json by scripts/build-registry.mjs. Do not edit by hand. -->',
    '',
  ];
  entries.forEach((entry, i) => {
    lines.push(`## [${entry.version}](${REPO_URL}/releases/tag/v${entry.version}) - ${entry.date}`, '');
    lines.push(renderReleaseBody(entry, entries[i + 1]));
  });
  return `${lines.join('\n').trimEnd()}\n`;
};
