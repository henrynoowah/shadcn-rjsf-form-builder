import { headers } from 'next/headers';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Bug01Icon,
  DocumentCodeIcon,
  Download04Icon,
  DragDropIcon,
  Idea01Icon,
  PaintBoardIcon,
  StarIcon,
  TranslateIcon,
} from '@hugeicons/core-free-icons';
import { getAllRegistryItems } from '@/lib/registry';
import { redis } from '@/lib/redis';
import { getLatestRelease } from '@/lib/changelog';
import { GITHUB_URL } from '@/lib/site';
import CodeBlock from './_components/code-block';
import CopyButton from './_components/copy-button';
import { BuilderPreview, RendererPreview } from './_components/component-preview';
import HeroDemo from './_components/hero-demo';
import SiteHeader from './_components/site-header';

const FEATURES = [
  {
    icon: DocumentCodeIcon,
    title: 'JSON Schema driven',
    description: 'Built on react-jsonschema-form v6. Any valid schema renders as an accessible form.',
  },
  {
    icon: TranslateIcon,
    title: 'i18n first',
    description: 'Labels take a string or a locale map. Switch locales at runtime, no extra library.',
  },
  {
    icon: PaintBoardIcon,
    title: 'shadcn primitives',
    description: 'Every widget uses your own shadcn/ui components, so your theme just applies.',
  },
  {
    icon: DragDropIcon,
    title: 'Visual builder',
    description: 'Drag-and-drop palette, canvas and settings panel. Exports a FormSchema the renderer consumes.',
  },
];

const COMMUNITY_LINKS = [
  { icon: StarIcon, label: 'Star the repo', href: GITHUB_URL },
  { icon: Bug01Icon, label: 'Report a bug', href: `${GITHUB_URL}/issues/new?template=bug_report.yml` },
  { icon: Idea01Icon, label: 'Request a feature', href: `${GITHUB_URL}/issues/new?template=feature_request.yml` },
];

const PREVIEWS: Record<string, React.ReactNode> = {
  'form-renderer': <RendererPreview />,
  'form-builder': <BuilderPreview />,
};

function InstallCommand({ cmd }: { cmd: string }) {
  return (
    <div className="relative overflow-hidden rounded-md">
      <CodeBlock code={cmd} lang="sh" className="[&_.shiki]:p-3! [&_.shiki]:pr-12! [&_.shiki]:whitespace-pre-wrap [&_.shiki]:break-all" />
      <div className="absolute right-2 top-1/2 z-10 -translate-y-1/2">
        <CopyButton text={cmd} />
      </div>
    </div>
  );
}

export default async function Home() {
  const items = getAllRegistryItems();
  const latest = getLatestRelease();
  const host = (await headers()).get('host');
  const registryBase = `https://${host}/r`;
  const downloadCounts = redis
    ? await redis.mget<number[]>(...items.map((item) => `downloads:${item.name}`))
    : [];
  const totalInstalls = downloadCounts.reduce((sum, n) => sum + (n ?? 0), 0);
  const components = items.filter((item) => item.type === 'registry:ui');
  const downloadsFor = (name: string) => downloadCounts[items.findIndex((item) => item.name === name)] ?? 0;
  const installCmd = (name: string) => `npx shadcn@latest add "${registryBase}/${name}.json"`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader
        badge="registry"
        links={[
          { href: '/docs', label: 'Docs' },
          { href: '/playground', label: 'Playground' },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border px-6 py-20 lg:py-24">
        <div
          aria-hidden
          className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_30%_40%,black,transparent_75%)]"
          style={{
            backgroundImage: 'radial-gradient(circle, oklch(0.708 0 0 / 0.4) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="mb-6 h-10 w-10" aria-hidden="true">
              <rect width="32" height="32" rx="7" className="fill-primary" />
              <circle cx="8" cy="12" r="1.25" className="fill-primary-foreground" opacity="0.25" />
              <circle cx="8" cy="16" r="1.25" className="fill-primary-foreground" opacity="0.25" />
              <circle cx="8" cy="20" r="1.25" className="fill-primary-foreground" opacity="0.25" />
              <rect x="12" y="10" width="13" height="3" rx="1.5" className="fill-primary-foreground" opacity="0.9" />
              <rect x="12" y="14.5" width="10" height="3" rx="1.5" className="fill-primary-foreground" opacity="0.55" />
              <rect x="12" y="19" width="7" height="3" rx="1.5" className="fill-primary-foreground" opacity="0.25" />
            </svg>

            <h1 className="mb-6 text-5xl font-bold tracking-tight leading-[1.1] text-balance">
              Form Builder
              <br />
              <span className="text-muted-foreground font-normal">for the shadcn ecosystem.</span>
            </h1>

            <p className="mb-10 max-w-xl text-lg text-muted-foreground leading-relaxed">
              react-jsonschema-form, built on your shadcn/ui components. Render forms from JSON
              Schema, or build them visually.
            </p>

            <InstallCommand cmd={installCmd('form-builder')} />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-sm">
              <span className="text-muted-foreground">Pulls in form-renderer and types automatically.</span>
              <a
                href="/playground"
                className="group inline-flex items-center gap-1 font-medium underline-offset-4 hover:underline"
              >
                Try the playground
                <svg
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5 fill-current transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" />
                </svg>
              </a>
            </div>
          </div>

          <HeroDemo />
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
              <div key={f.title} className="bg-background p-6">
                <HugeiconsIcon icon={f.icon} strokeWidth={1.75} className="mb-4 size-5 text-muted-foreground" />
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
            <a
              href="/docs/changelog"
              className="font-mono text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              v{latest.version} · {latest.date} · changelog →
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {components.map((item) => (
              <article key={item.name} className="flex flex-col overflow-hidden rounded-lg border border-border">
                {PREVIEWS[item.name]}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-mono text-sm font-semibold">{item.name}</h3>
                    {redis && (
                      <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground tabular-nums">
                        <HugeiconsIcon icon={Download04Icon} strokeWidth={1.75} className="size-3.5" aria-hidden />
                        {downloadsFor(item.name).toLocaleString()}
                        <span className="sr-only">installs</span>
                      </span>
                    )}
                  </div>
                  <p className="mt-1 mb-5 flex-1 text-sm text-muted-foreground">{item.description}</p>
                  <InstallCommand cmd={installCmd(item.name)} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="border-t border-border px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex items-center gap-4">
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Community
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <h2 className="mb-3 text-2xl font-bold tracking-tight">
            {totalInstalls > 0
              ? `${totalInstalls.toLocaleString()} installs and counting.`
              : 'Help shape what ships next.'}
          </h2>
          <p className="mb-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
            This is a solo-maintained project — stars, bug reports and feature ideas are
            what decide the roadmap.
          </p>

          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium">
            {COMMUNITY_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 underline-offset-4 hover:underline"
                >
                  <HugeiconsIcon
                    icon={link.icon}
                    strokeWidth={1.75}
                    className="size-4 text-muted-foreground transition-colors group-hover:text-foreground"
                  />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-xs text-muted-foreground">
            shadcn-rjsf-form-builder
          </span>
          <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-muted-foreground">
            <a href="/docs/changelog" className="transition-colors hover:text-foreground">
              Changelog
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
