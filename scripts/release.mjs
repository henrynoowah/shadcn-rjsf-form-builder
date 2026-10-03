/**
 * Creates a git tag + GitHub release for every version in apps/web/changelog.json
 * that doesn't have one yet, oldest first. Entries with a `commit` field are
 * tagged at that commit; everything else at TARGET_SHA (defaults to HEAD).
 *
 * Usage: node scripts/release.mjs [--dry-run]
 * Requires the gh CLI, authenticated with permission to create releases.
 */

import { execFileSync } from 'child_process';
import { mkdtempSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { readChangelog, renderReleaseBody } from './changelog-md.mjs';

const dryRun = process.argv.includes('--dry-run');
const run = (cmd, args) => execFileSync(cmd, args, { encoding: 'utf-8' }).trim();

const tagExists = (tag) => {
  try {
    run('git', ['rev-parse', '--verify', '--quiet', `refs/tags/${tag}`]);
    return true;
  } catch {
    return false;
  }
};

const entries = readChangelog();
const latestVersion = entries[0].version;
const targetSha = process.env.TARGET_SHA || run('git', ['rev-parse', 'HEAD']);
const notesDir = mkdtempSync(join(tmpdir(), 'release-notes-'));

let created = 0;
for (let i = entries.length - 1; i >= 0; i--) {
  const entry = entries[i];
  const tag = `v${entry.version}`;
  if (tagExists(tag)) continue;

  const target = entry.commit ? run('git', ['rev-parse', entry.commit]) : targetSha;
  const notesFile = join(notesDir, `${tag}.md`);
  writeFileSync(notesFile, renderReleaseBody(entry, entries[i + 1]));

  const args = ['release', 'create', tag, '--target', target, '--title', tag, '--notes-file', notesFile];
  args.push(entry.version === latestVersion ? '--latest' : '--latest=false');

  if (dryRun) {
    console.log(`[dry-run] ${tag} → ${target.slice(0, 7)}\n  gh ${args.join(' ')}`);
  } else {
    run('gh', args);
    console.log(`✓ released ${tag} at ${target.slice(0, 7)}`);
  }
  created++;
}

if (created === 0) console.log(`Nothing to release — v${latestVersion} is already tagged.`);
