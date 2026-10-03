import changelogData from '../changelog.json';

export type ChangeType = 'feat' | 'fix' | 'breaking' | 'docs';

export type Change = {
  type: ChangeType;
  /** Registry items affected by the change. Omitted for site/docs-only changes. */
  items?: string[];
  text: string;
};

export type ChangelogEntry = {
  version: string;
  date: string;
  /** Commit to tag when the release is created after the fact. Defaults to the merge commit. */
  commit?: string;
  summary?: string;
  changes: Change[];
};

const changelog = changelogData as ChangelogEntry[];

/** All releases, newest first. */
export function getChangelog(): ChangelogEntry[] {
  return changelog;
}

export function getLatestRelease(): ChangelogEntry {
  const latest = changelog[0];
  if (!latest) throw new Error('changelog.json has no entries');
  return latest;
}

/** First line prepended to every installed file. Keep in sync with scripts/build-registry.mjs. */
export function versionHeader(version: string, homepage: string): string {
  return `// shadcn-rjsf-form-builder v${version} — ${homepage.replace(/\/$/, '')}/docs/changelog\n`;
}

/** Anchor id for a version, e.g. "0.2.0" → "v0-2-0". */
export function versionAnchor(version: string): string {
  return `v${version.replace(/\./g, '-')}`;
}
