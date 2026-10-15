import CodeBlock from './code-block';
import Link from 'next/link';
import CopyButton from './copy-button';

type Props = {
  name: string;
  description: string;
  cmd: string;
  step?: number;
  note?: string;
  /** Current registry version, linked to the changelog. */
  version?: string;
};

export default async function InstallCard({
  name,
  description,
  cmd,
  step,
  note,
  version,
}: Props) {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        {step !== undefined && (
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-[10px] font-semibold text-muted-foreground">
            {step}
          </span>
        )}
        <code className="font-mono text-sm font-semibold">{name}</code>
        {version && (
          <Link
            href="/docs/changelog"
            className="ml-auto font-mono text-[10px] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            v{version}
          </Link>
        )}
      </div>

      {/* Description */}
      <div className="px-4 py-3">
        <p className="text-sm text-muted-foreground">{description}</p>
        {note && <p className="mt-1 text-xs text-muted-foreground/70">{note}</p>}
      </div>

      {/* Command — syntax highlighted + copy button */}
      <div className="relative mx-4 mb-4 overflow-hidden rounded-md">
        <CodeBlock code={cmd} lang="sh" className="[&_.shiki]:p-3" />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10">
          <CopyButton text={cmd} />
        </div>
      </div>
    </div>
  );
}
