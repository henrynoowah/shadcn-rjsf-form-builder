import { getAllRegistryItems } from '@/lib/registry';
import CopyButton from './_components/copy-button';

const REGISTRY_URL = process.env.NEXT_PUBLIC_REGISTRY_URL;

const FEATURES = [
  {
    label: '01',
    title: 'JSON Schema Driven',
    description:
      'Built on react-jsonschema-form v6. Any valid JSON Schema definition renders as a fully accessible, styled form — no mapping layer needed.',
  },
  {
    label: '02',
    title: 'i18n First',
    description:
      'LocalizedString accepts a plain string or a locale-keyed map. Switch locales at runtime. No rebuilds, no separate i18n library required.',
  },
  {
    label: '03',
    title: 'shadcn Primitives',
    description:
      'Every widget — Input, Select, Checkbox, RadioGroup — is built on your existing shadcn/ui components. Fully themeable, zero style overrides.',
  },
  {
    label: '04',
    title: 'Visual Builder',
    description:
      'Drag-and-drop form builder with a live preview pane and schema inspector. Build visually, export a FormSchema, wire directly to the renderer.',
  },
];

const TYPE_LABELS: Record<string, string> = {
  'registry:lib': 'lib',
  'registry:ui': 'ui',
};

export default function Home() {
  const items = getAllRegistryItems();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="border-b border-border px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-semibold tracking-tight">shadcn-rjsf</span>
            <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
              registry
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="/docs"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Docs
            </a>
            <a
              href="/demo"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Demo
            </a>
            <a
              href="https://github.com/henrynoowah/shadcn-rjsf-form-builder"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="relative overflow-hidden border-b border-border px-6 py-24"
        style={{
          backgroundImage:
            'radial-gradient(circle, oklch(0.708 0 0 / 0.25) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        <div className="relative mx-auto max-w-5xl">
          <div className="mb-5 flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-foreground" />
            <span className="font-mono text-xs text-muted-foreground">
              react-jsonschema-form × shadcn/ui
            </span>
          </div>

          <h1 className="mb-6 max-w-2xl text-5xl font-bold tracking-tight leading-[1.1]">
            Form Builder
            <br />
            <span className="text-muted-foreground font-normal">for the shadcn ecosystem.</span>
          </h1>

          <p className="mb-10 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Copy-paste RJSF form components via the shadcn CLI. JSON Schema driven,
            i18n ready, and built entirely on your existing shadcn/ui primitives.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/demo"
              className="inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
            >
              View Demo
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
                <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" />
              </svg>
            </a>
            <a
              href="https://github.com/henrynoowah/shadcn-rjsf-form-builder"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
              </svg>
              Star on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-border px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex items-center gap-4">
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Features
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div key={f.label} className="bg-background p-6">
                <div className="mb-4 font-mono text-xs text-muted-foreground">{f.label}</div>
                <h3 className="mb-2 text-sm font-semibold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Install */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex items-center gap-4">
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Install
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="space-y-4">
            {items.map((item) => {
              const cmd = `npx shadcn@latest add "${REGISTRY_URL}/r/${item.name}"`;
              return (
                <div key={item.name} className="rounded-lg border border-border overflow-hidden">
                  {/* Card header */}
                  <div className="flex items-center justify-between border-b border-border px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-semibold">{item.name}</span>
                      <span className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                        {TYPE_LABELS[item.type] ?? item.type}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {item.files.length} file{item.files.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="px-5 py-3">
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>

                  {/* Install command */}
                  <div className="flex items-center gap-3 border-t border-border bg-muted/40 px-5 py-3">
                    <code className="flex-1 font-mono text-xs break-all">{cmd}</code>
                    <CopyButton text={cmd} />
                  </div>

                  {/* Dependencies */}
                  {item.dependencies && item.dependencies.length > 0 && (
                    <div className="border-t border-border px-5 py-2.5 flex flex-wrap gap-1.5">
                      {item.dependencies.map((dep) => (
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
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <span className="font-mono text-xs text-muted-foreground">
            shadcn-rjsf-form-builder
          </span>
          <a
            href="https://github.com/henrynoowah/shadcn-rjsf-form-builder"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            github.com/henrynoowah/shadcn-rjsf-form-builder
          </a>
        </div>
      </footer>
    </div>
  );
}
