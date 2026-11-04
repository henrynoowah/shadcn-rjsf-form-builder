'use client';

import { useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { SlidersHorizontalIcon, Tick02Icon, UnfoldMoreIcon } from '@hugeicons/core-free-icons';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import SiteHeader from '../_components/site-header';
import ThemePresetSwitcher from '../_components/theme-preset-switcher';
import JsonBlock from '../_components/json-block';
import CopyButton from '../_components/copy-button';
import { FormRenderer } from '@/registry/form-renderer/form-renderer';
import { SHOWCASES, type Showcase } from './schemas';

type Locale = 'en-US' | 'ko-KR';
type Panel = 'schema' | 'output';

const LOCALES: { id: Locale; label: string }[] = [
  { id: 'en-US', label: 'English' },
  { id: 'ko-KR', label: '한국어' },
];

const num = (i: number) => String(i + 1).padStart(2, '0');

// Same dot grid as the homepage hero.
const DOT_GRID = {
  backgroundImage: 'radial-gradient(circle, oklch(0.708 0 0 / 0.4) 1px, transparent 1px)',
  backgroundSize: '24px 24px',
};

function ExampleBlock({ example, index, locale }: { example: Showcase; index: number; locale: Locale }) {
  const [panel, setPanel] = useState<Panel>('schema');
  const [submitted, setSubmitted] = useState<Record<string, unknown> | null>(null);

  function handleSubmit(data: Record<string, unknown>) {
    setSubmitted(data);
    setPanel('output');
  }

  return (
    <section id={example.id} aria-labelledby={`${example.id}-title`} className="scroll-mt-32">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div className="max-w-xl">
          <span className="font-mono text-xs text-muted-foreground tabular-nums">
            {num(index)}
          </span>
          <h2 id={`${example.id}-title`} className="mt-1 text-xl font-semibold tracking-tight">
            {example.title}
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{example.description}</p>
        </div>
        <ul className="flex flex-wrap gap-1.5">
          {example.tags.map((tag) => (
            <li key={tag} className="rounded-md border border-border bg-muted/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid overflow-hidden rounded-xl border border-border lg:grid-cols-[minmax(0,1fr)_22rem]">
        {/* Canvas: the live form */}
        <div className="relative flex min-h-[32rem] items-center justify-center px-4 py-10 sm:px-10">
          <div aria-hidden className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" style={DOT_GRID} />
          <div className="relative w-full max-w-md rounded-lg border border-border bg-background p-6 shadow-sm">
            <FormRenderer schema={example.schema} locale={locale} baseLocale="en-US" onSubmit={handleSubmit} />
          </div>
        </div>

        {/* Inspector: schema in, data out. Pinned to the canvas height on lg. */}
        <div className="relative border-t border-border bg-muted/30 lg:border-t-0 lg:border-l">
          <div className="flex flex-col lg:absolute lg:inset-0">
            <div className="flex items-center justify-between border-b border-border px-4">
              <div role="tablist" className="flex gap-5">
                {(['schema', 'output'] as Panel[]).map((p) => (
                  <button
                    key={p}
                    role="tab"
                    aria-selected={panel === p}
                    onClick={() => setPanel(p)}
                    className={`flex items-center gap-1.5 border-b-2 py-2.5 text-xs font-medium capitalize transition-colors ${
                      panel === p ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {p}
                    {p === 'output' && submitted && panel !== 'output' && (
                      <span className="size-1.5 rounded-full bg-primary" aria-label="new data" />
                    )}
                  </button>
                ))}
              </div>
              <div className="flex h-10 items-center">
                {panel === 'schema' ? (
                  <CopyButton text={JSON.stringify(example.schema, null, 2)} />
                ) : (
                  submitted && (
                    <button onClick={() => setSubmitted(null)} className="text-xs text-muted-foreground hover:text-foreground">
                      Clear
                    </button>
                  )
                )}
              </div>
            </div>

            <div role="tabpanel" className="shiki-pane max-h-96 flex-1 overflow-auto p-4 lg:max-h-none lg:min-h-0">
              {panel === 'schema' ? (
                <JsonBlock value={example.schema} />
              ) : submitted ? (
                <JsonBlock value={submitted} />
              ) : (
                <p className="py-10 text-center text-xs leading-relaxed text-white/50">
                  Submit the form to see what <code className="font-mono">onSubmit</code> receives.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ExamplesPage() {
  const [locale, setLocale] = useState<Locale>('en-US');
  const [activeId, setActiveId] = useState(SHOWCASES[0]!.id);

  // Scroll-spy: the section crossing the band just below the sticky bars is the active one.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActiveId(hit.target.id);
      },
      { rootMargin: '-140px 0px -55% 0px' },
    );
    for (const { id } of SHOWCASES) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const pendingId = useRef<string | null>(null);
  const activeIndex = SHOWCASES.findIndex((e) => e.id === activeId);

  // Scroll only once the drawer has finished closing: vaul restores the page position on close,
  // which would cancel a scroll started earlier. A ref, because vaul calls this from a timeout.
  function onPickerAnimationEnd(open: boolean) {
    if (open || !pendingId.current) return;
    document.getElementById(pendingId.current)?.scrollIntoView({ behavior: 'smooth' });
    pendingId.current = null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader
        badge="examples"
        links={[
          { href: '/docs', label: 'Docs' },
          { href: '/playground', label: 'Playground' },
        ]}
      />

      <section className="relative overflow-hidden border-b border-border px-6 py-16 lg:py-20">
        <div aria-hidden className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_30%_40%,black,transparent_75%)]" style={DOT_GRID} />
        <div className="relative mx-auto max-w-5xl">
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">Showcase</span>
          <h1 className="mt-3 mb-4 text-4xl font-bold tracking-tight lg:text-5xl">Examples</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Real-world forms, each rendered from one JSON schema. Fill them in and watch the data come out the other side.
          </p>
          <p className="mt-6 font-mono text-xs text-muted-foreground">
            {SHOWCASES.length} forms · every field type · en-US / ko-KR
          </p>
        </div>
      </section>

      {/* Toolbar: section nav + theme preset + locale, applied to every example */}
      <div className="sticky top-[65px] z-40 border-b border-border bg-background/80 px-6 py-2 backdrop-blur md:top-[61px]">
        {/* Desktop: anchor links + inline controls */}
        <div className="mx-auto hidden max-w-5xl items-center justify-between gap-3 lg:flex">
          <nav aria-label="Examples" className="flex gap-4 text-xs">
            {SHOWCASES.map((e) => (
              <a
                key={e.id}
                href={`#${e.id}`}
                aria-current={activeId === e.id ? 'location' : undefined}
                className={`transition-colors hover:text-foreground ${
                  activeId === e.id ? 'font-medium text-foreground' : 'text-muted-foreground'
                }`}
              >
                {e.title}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ThemePresetSwitcher />
            <div role="group" aria-label="Locale" className="flex items-center gap-2">
              {LOCALES.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLocale(l.id)}
                  aria-pressed={locale === l.id}
                  className={`flex h-7 items-center rounded-md px-2.5 font-mono text-xs font-medium transition-colors ${
                    locale === l.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {l.id}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: section picker + one settings button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Drawer onAnimationEnd={onPickerAnimationEnd}>
            <DrawerTrigger
              aria-label="Jump to example"
              className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-md border border-input bg-input/20 px-3 text-left text-sm"
            >
              <span className="font-mono text-xs text-muted-foreground tabular-nums">{num(activeIndex)}</span>
              {/* key: re-run the swap animation each time the active section changes */}
              <span key={activeId} className="drawer-swap min-w-0 flex-1 truncate">
                {SHOWCASES[activeIndex]!.title}
              </span>
              <HugeiconsIcon icon={UnfoldMoreIcon} strokeWidth={2} className="size-3.5 shrink-0 text-muted-foreground" />
            </DrawerTrigger>
            <DrawerContent aria-describedby={undefined}>
              <DrawerHeader>
                <DrawerTitle>Jump to example</DrawerTitle>
              </DrawerHeader>
              <ul className="px-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                {SHOWCASES.map((e, i) => (
                  <li key={e.id} className="drawer-item" style={{ '--i': i } as React.CSSProperties}>
                    <DrawerClose
                      onClick={() => {
                        pendingId.current = e.id;
                        setActiveId(e.id);
                      }}
                      aria-current={activeId === e.id ? 'location' : undefined}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition-colors ${
                        activeId === e.id ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground hover:bg-muted/60'
                      }`}
                    >
                      <span className="font-mono text-xs tabular-nums">{num(i)}</span>
                      <span className="flex-1">{e.title}</span>
                      {activeId === e.id && <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} className="size-4 text-primary" />}
                    </DrawerClose>
                  </li>
                ))}
              </ul>
            </DrawerContent>
          </Drawer>

          <Drawer>
            <DrawerTrigger
              aria-label="Display settings"
              className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <HugeiconsIcon icon={SlidersHorizontalIcon} strokeWidth={2} className="size-4" />
            </DrawerTrigger>
            <DrawerContent aria-describedby={undefined}>
              <DrawerHeader>
                <DrawerTitle>Display settings</DrawerTitle>
              </DrawerHeader>
              <div className="space-y-6 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                <div className="drawer-item space-y-2.5" style={{ '--i': 0 } as React.CSSProperties}>
                  <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Theme</h3>
                  <ThemePresetSwitcher variant="list" />
                </div>
                <div className="drawer-item space-y-2.5" style={{ '--i': 1 } as React.CSSProperties}>
                  <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Language</h3>
                  <div role="radiogroup" aria-label="Language" className="relative grid grid-cols-2 rounded-lg bg-muted p-1">
                    {/* Sliding thumb behind the active segment */}
                    <span
                      aria-hidden
                      className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-md bg-background shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                      style={{ transform: locale === 'ko-KR' ? 'translateX(100%)' : undefined }}
                    />
                    {LOCALES.map((l) => (
                      <button
                        key={l.id}
                        role="radio"
                        aria-checked={locale === l.id}
                        onClick={() => setLocale(l.id)}
                        className={`relative h-9 rounded-md text-sm transition-colors ${
                          locale === l.id ? 'font-medium text-foreground' : 'text-muted-foreground'
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      <main className="px-6 py-16">
        <div className="mx-auto max-w-5xl space-y-20">
          {SHOWCASES.map((example, i) => (
            <ExampleBlock key={example.id} example={example} index={i} locale={locale} />
          ))}
        </div>
      </main>
    </div>
  );
}
