import type { Metadata } from 'next';
import { getChangelog, versionAnchor, type ChangeType } from '@/lib/changelog';

export const metadata: Metadata = {
  title: 'Changelog · shadcn RJSF Form Builder',
};

const REPO_URL = 'https://github.com/henrynoowah/shadcn-rjsf-form-builder';

const TYPE_LABELS: Record<ChangeType, string> = {
  breaking: 'breaking',
  feat: 'feat',
  fix: 'fix',
  docs: 'docs',
};

const TYPE_ORDER: ChangeType[] = ['breaking', 'feat', 'fix', 'docs'];

/** Renders `backtick` spans in changelog text as inline code. */
const renderText = (text: string) =>
  text.split(/(`[^`]+`)/g).map((part, i) =>
    part.startsWith('`') && part.endsWith('`') ? (
      <code key={i} className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
        {part.slice(1, -1)}
      </code>
    ) : (
      part
    ),
  );

export default function ChangelogPage() {
  const entries = getChangelog();

  return (
    <div className="space-y-12">
      {/* Page header */}
      <div>
        <h1 className="mb-3 text-2xl font-bold tracking-tight">Changelog</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Every release of the registry items. All three items share one version number, and every installed file
          starts with a comment naming the version it came from.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <a
            href="/changelog.xml"
            className="rounded-md border border-border px-3 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            RSS feed
          </a>
          <a
            href={`${REPO_URL}/releases`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-border px-3 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            GitHub Releases
          </a>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          To get notified on GitHub, choose <strong className="text-foreground">Watch → Custom → Releases</strong> on
          the repository.
        </p>
      </div>

      {entries.map((entry, i) => {
        const previous = entries[i + 1];
        const changes = [...entry.changes].sort((a, b) => TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type));

        return (
          <section key={entry.version}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-border pb-2 mb-4">
              <h2 id={versionAnchor(entry.version)} className="scroll-mt-20 text-xl font-semibold">
                v{entry.version}
              </h2>
              {i === 0 && (
                <span className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                  latest
                </span>
              )}
              <time dateTime={entry.date} className="font-mono text-xs text-muted-foreground">
                {entry.date}
              </time>
              <div className="ml-auto flex gap-3 text-xs">
                <a
                  href={`${REPO_URL}/releases/tag/v${entry.version}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  Release
                </a>
                {previous && (
                  <a
                    href={`${REPO_URL}/compare/v${previous.version}...v${entry.version}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    Diff from v{previous.version}
                  </a>
                )}
              </div>
            </div>

            {entry.summary && <p className="text-sm text-muted-foreground leading-relaxed mb-4">{entry.summary}</p>}

            <ul className="space-y-3">
              {changes.map((change, j) => (
                <li key={j} className="flex items-start gap-3 text-sm">
                  <span
                    className={`mt-0.5 w-16 shrink-0 rounded border px-1.5 py-0.5 text-center font-mono text-[10px] ${
                      change.type === 'breaking'
                        ? 'border-destructive/40 text-destructive'
                        : 'border-border text-muted-foreground'
                    }`}
                  >
                    {TYPE_LABELS[change.type]}
                  </span>
                  <div className="min-w-0">
                    <p className="text-muted-foreground leading-relaxed">{renderText(change.text)}</p>
                    {change.items && change.items.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {change.items.map((item) => (
                          <span
                            key={item}
                            className="rounded bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
