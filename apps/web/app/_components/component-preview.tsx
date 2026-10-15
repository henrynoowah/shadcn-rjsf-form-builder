'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FormRenderer } from '@/registry/form-renderer/form-renderer';
import { SAMPLE_SCHEMA } from '@/lib/sample-schema';

// Client-only: dnd-kit's DndDescribedBy id counter differs between server and client renders.
const FormBuilder = dynamic(
  () => import('@/registry/form-builder/form-builder').then((m) => m.FormBuilder),
  { ssr: false, loading: () => <div className="h-full bg-muted/30" /> },
);

// Both previews render at a fixed desktop size and are scaled to the card width,
// so they read as miniatures of the real component and share one aspect ratio.
const STAGE_W = 880;
const STAGE_H = 540;

// Live but inert: real components, no focus/drag on the homepage — the whole preview links to the playground.
function Miniature({ label, children }: { label: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [scale, setScale] = useState(0.55);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      if (entry) setScale(entry.contentRect.width / STAGE_W);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <Link
      ref={ref}
      href="/playground"
      aria-label={label}
      className="group relative block overflow-hidden border-b border-border bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      style={{ aspectRatio: `${STAGE_W} / ${STAGE_H}` }}
    >
      <div
        inert
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})` }}
      >
        {children}
      </div>
      <span className="absolute bottom-3 right-3 rounded-md border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        Open in playground
      </span>
    </Link>
  );
}

export function RendererPreview() {
  return (
    <Miniature label="Open the form renderer in the playground">
      <div className="h-full overflow-hidden px-10 pt-10 [mask-image:linear-gradient(to_bottom,black_75%,transparent)]">
        <div className="mx-auto max-w-lg rounded-lg border border-border bg-background p-8 shadow-sm">
          <FormRenderer schema={SAMPLE_SCHEMA} locale="en-US" baseLocale="en-US" />
        </div>
      </div>
    </Miniature>
  );
}

export function BuilderPreview() {
  return (
    <Miniature label="Open the form builder in the playground">
      <FormBuilder
        initialSchema={SAMPLE_SCHEMA}
        locale="en-US"
        baseLocale="en-US"
        className="h-full rounded-none! border-0!"
      />
    </Miniature>
  );
}
