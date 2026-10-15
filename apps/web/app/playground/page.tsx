'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import SiteHeader from '../_components/site-header';
import ThemePresetSwitcher from '../_components/theme-preset-switcher';
import JsonBlock from '../_components/json-block';
import { FormRenderer } from '@/registry/form-renderer/form-renderer';
import type { FormSchema } from '@/registry/form-builder-types/types';
import { SAMPLE_SCHEMA } from '@/lib/sample-schema';

// Client-only: dnd-kit's DndDescribedBy id counter differs between server and client renders.
const FormBuilder = dynamic(
  () => import('@/registry/form-builder/form-builder').then((m) => m.FormBuilder),
  { ssr: false, loading: () => <div className="h-full bg-muted/30" /> },
);

type View = 'preview' | 'schema';
type Locale = 'en-US' | 'ko-KR';

const VIEWS: { id: View; label: string }[] = [
  { id: 'preview', label: 'Preview' },
  { id: 'schema', label: 'Schema' },
];

export default function PlaygroundPage() {
  const [view, setView] = useState<View>('preview');
  const [locale, setLocale] = useState<Locale>('en-US');
  const [submittedData, setSubmittedData] = useState<Record<string, unknown> | null>(null);
  const [schema, setSchema] = useState<FormSchema>(SAMPLE_SCHEMA);
  const submittedRef = useRef<HTMLDivElement>(null);

  // The result renders below the form, often off-screen in the preview pane.
  useEffect(() => {
    if (submittedData) submittedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [submittedData]);

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground xl:h-dvh">
      <SiteHeader badge="playground" links={[{ href: '/docs', label: 'Docs' }]} fullWidth />

      {/* Toolbar: theme preset + locale drive both panes */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-2">
        <p className="text-sm text-muted-foreground">Edits in the builder update the preview live.</p>
        <div className="flex flex-wrap items-center gap-3">
          <ThemePresetSwitcher />
          <div role="group" aria-label="Locale" className="flex items-center gap-2">
            {(['en-US', 'ko-KR'] as Locale[]).map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                aria-pressed={locale === l}
                className={`rounded px-2.5 py-1 font-mono text-xs font-medium transition-colors ${
                  locale === l
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Workspace: side by side on xl, stacked below */}
      <main className="grid flex-1 xl:min-h-0 xl:grid-cols-[minmax(0,1fr)_28rem]">
        <section
          aria-label="Form builder"
          className="h-[36rem] min-w-0 overflow-x-auto border-b border-border xl:h-auto xl:min-h-0 xl:border-b-0 xl:border-r"
        >
          {/* Palette + canvas + settings need ~52rem; scroll sideways on narrow screens rather than crush the canvas. */}
          <div className="h-full min-w-[52rem] xl:min-w-0">
            <FormBuilder
              initialSchema={schema}
              onChange={setSchema}
              locale={locale}
              baseLocale="en-US"
              availableLocales={['en-US', 'ko-KR']}
              className="h-full rounded-none! border-0!"
            />
          </div>
        </section>

        <section aria-label="Live form" className="flex min-w-0 flex-col xl:min-h-0">
          <div role="tablist" className="flex gap-6 border-b border-border px-6">
            {VIEWS.map((v) => (
              <button
                key={v.id}
                role="tab"
                aria-selected={view === v.id}
                onClick={() => setView(v.id)}
                className={`whitespace-nowrap py-3 text-sm font-medium border-b-2 transition-colors ${
                  view === v.id
                    ? 'border-primary text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>

          <div role="tabpanel" className="flex-1 overflow-y-auto bg-muted/30 xl:min-h-0">
            {view === 'preview' ? (
              <div className="mx-auto max-w-md space-y-6 p-6">
                <div className="rounded-lg border border-border bg-background p-6">
                  <FormRenderer
                    schema={schema}
                    locale={locale}
                    baseLocale="en-US"
                    onSubmit={setSubmittedData}
                  />
                </div>

                {submittedData && (
                  <div ref={submittedRef}>
                    <div className="mb-2 flex items-center justify-between">
                      <h2 className="text-sm font-medium">Submitted data</h2>
                      <button
                        onClick={() => setSubmittedData(null)}
                        className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="overflow-auto rounded-lg border border-border bg-background">
                      <JsonBlock value={submittedData} />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <JsonBlock value={schema} />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
