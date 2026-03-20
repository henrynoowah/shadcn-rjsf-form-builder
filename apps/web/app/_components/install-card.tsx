import CodeBlock from './code-block';
import CopyButton from './copy-button';

type Props = {
  name: string;
  description: string;
  cmd: string;
  step?: number;
  note?: string;
  typeBadge?: string;
  dependencies?: string[];
};

export default async function InstallCard({
  name,
  description,
  cmd,
  step,
  note,
  typeBadge,
  dependencies,
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
        {typeBadge && (
          <span className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            {typeBadge}
          </span>
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

      {/* Dependencies */}
      {dependencies && dependencies.length > 0 && (
        <div className="border-t border-border px-4 py-2.5 flex flex-wrap gap-1.5">
          {dependencies.map((dep) => (
            <span
              key={dep}
              className="rounded bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
            >
              {dep}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
