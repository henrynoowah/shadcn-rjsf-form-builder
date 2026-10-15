'use client';

import { useEffect, useRef, useState } from 'react';
import { FormRenderer } from '@/registry/form-renderer/form-renderer';
import type { FormFieldDefinition, FormSchema } from '@/registry/form-builder-types/types';

type Locale = 'en-US' | 'ko-KR';

const FIELDS: FormFieldDefinition[] = [
  { id: 'name', key: 'full_name', type: 'text', required: true, order: 0, label: { 'en-US': 'Full Name', 'ko-KR': '이름' }, placeholder: { 'en-US': 'John Doe', 'ko-KR': '홍길동' } },
  { id: 'email', key: 'email', type: 'email', required: true, order: 1, label: { 'en-US': 'Email Address', 'ko-KR': '이메일 주소' }, placeholder: { 'en-US': 'john@example.com' } },
  {
    id: 'topic', key: 'topic', type: 'select', order: 2, label: { 'en-US': 'Topic', 'ko-KR': '주제' },
    options: [{ value: 'general', label: { 'en-US': 'General Inquiry', 'ko-KR': '일반 문의' } }],
  },
  { id: 'newsletter', key: 'newsletter', type: 'checkbox', order: 3, label: { 'en-US': 'Subscribe to newsletter', 'ko-KR': '뉴스레터 구독' } },
];

// The code card mirrors FIELDS — one line per field, revealed in step with the form.
const FIELD_LINES = [
  ["'text'", "'full_name'"],
  ["'email'", "'email'"],
  ["'select'", "'topic'"],
  ["'checkbox'", "'newsletter'"],
];

// Swatches from theme-preset-switcher.tsx; null = the page's own --primary.
const ACCENTS = [
  { name: 'default', color: null },
  { name: 'terminal', color: 'oklch(0.6 0.2 145)' },
  { name: 'playful', color: 'oklch(0.7 0.19 330)' },
] as const;

type Step = { fields: number; locale: Locale; accent: number; hidden?: boolean; ms: number };

// One loop ≈ 12s: build the form field by field → switch locale → cycle accent → fade and restart.
const TIMELINE: Step[] = [
  { fields: 0, locale: 'en-US', accent: 0, ms: 700 },
  { fields: 1, locale: 'en-US', accent: 0, ms: 900 },
  { fields: 2, locale: 'en-US', accent: 0, ms: 900 },
  { fields: 3, locale: 'en-US', accent: 0, ms: 900 },
  { fields: 4, locale: 'en-US', accent: 0, ms: 1600 },
  { fields: 4, locale: 'ko-KR', accent: 0, ms: 2000 },
  { fields: 4, locale: 'ko-KR', accent: 1, ms: 1600 },
  { fields: 4, locale: 'ko-KR', accent: 2, ms: 1600 },
  { fields: 4, locale: 'ko-KR', accent: 2, hidden: true, ms: 600 },
];
// Start on the fully built form so the SSR / no-JS / reduced-motion render is complete.
const COMPLETE = 4;

const schemaFor = (n: number): FormSchema => ({
  id: 'hero-demo',
  title: { 'en-US': 'Contact Us', 'ko-KR': '문의하기' },
  submitLabel: { 'en-US': 'Send Message', 'ko-KR': '메시지 보내기' },
  fields: FIELDS.slice(0, n),
});

export default function HeroDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(COMPLETE);
  const [running, setRunning] = useState(false);
  const step = TIMELINE[index]!;

  // Run only when motion is allowed, the demo is on screen and the tab is visible.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let onScreen = false;
    const update = () => setRunning(onScreen && !reduce.matches && !document.hidden);
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry?.isIntersecting ?? false;
      update();
    });
    io.observe(el);
    reduce.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      io.disconnect();
      reduce.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  useEffect(() => {
    if (!running) {
      setIndex(COMPLETE);
      return;
    }
    const id = setTimeout(() => setIndex((i) => (i + 1) % TIMELINE.length), step.ms);
    return () => clearTimeout(id);
  }, [running, index, step.ms]);

  const accent = ACCENTS[step.accent]!;
  const accentStyle = accent.color
    ? ({ '--primary': accent.color, '--ring': accent.color } as React.CSSProperties)
    : undefined;
  // Highlight the line behind the current change: the newest field, then the localized title.
  const activeLine = index >= 1 && index <= COMPLETE ? step.fields - 1 : index === COMPLETE + 1 ? 'title' : null;

  return (
    <div ref={rootRef} className="hero-demo relative h-[22rem] select-none sm:h-[35rem]">
      <p className="sr-only">
        Animated example: a FormSchema rendering into a form, switching locale and theme.
      </p>

      <div aria-hidden inert className={`transition-opacity duration-500 ${step.hidden ? 'opacity-0' : 'opacity-100'}`}>
        {/* Code card — FormSchema source */}
        <div className="absolute left-0 top-0 hidden w-[96%] overflow-hidden rounded-lg bg-[#2e3440] font-mono text-[11px] leading-[1.7] text-[#d8dee9] shadow-[0_12px_32px_-12px_rgb(0_0_0/0.35)] sm:block dark:bg-[#22272e] dark:text-[#adbac7]">
          <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/15" />
            <span className="ml-2 text-white/45">schema.ts</span>
          </div>
          <div className="px-3 py-2.5">
            <Line>
              <K>const</K> schema: <T>FormSchema</T> = {'{'}
            </Line>
            <Line indent={1} active={activeLine === 'title'}>
              title: {'{'} <S>&apos;en-US&apos;</S>: <S>&apos;Contact Us&apos;</S>, <S>&apos;ko-KR&apos;</S>: <S>&apos;문의하기&apos;</S> {'}'},
            </Line>
            <Line indent={1}>fields: [</Line>
            {FIELD_LINES.map(([type, key], i) => (
              <Line key={key} indent={2} hidden={i >= step.fields} active={activeLine === i}>
                {'{'} type: <S>{type}</S>, key: <S>{key}</S> {'}'},
              </Line>
            ))}
            <Line indent={1}>],</Line>
            <Line>{'}'}</Line>
          </div>
        </div>

        {/* Form card — the real FormRenderer */}
        <div
          style={accentStyle}
          className="absolute right-0 top-0 w-full overflow-hidden rounded-lg border border-border bg-background shadow-[0_24px_48px_-20px_rgb(0_0_0/0.3)] sm:top-[11.25rem] sm:w-[80%]"
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-2">
            <span className="font-mono text-[11px] text-muted-foreground">form-renderer</span>
            <span className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
              <span className="size-2 rounded-full bg-primary transition-colors duration-300" />
              <span className="w-14">{accent.name}</span>
              <span className="rounded border border-border px-1.5 py-px text-foreground">{step.locale}</span>
            </span>
          </div>
          <div className="p-5 text-sm [&_button]:transition-colors [&_button]:duration-300 [&_fieldset>div>div]:mb-3 [&_legend]:mb-3 [&_legend]:text-base">
            <FormRenderer schema={schemaFor(step.fields)} locale={step.locale} baseLocale="en-US" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Line({
  children,
  indent = 0,
  hidden,
  active,
}: {
  children: React.ReactNode;
  indent?: number;
  hidden?: boolean;
  active?: boolean;
}) {
  if (hidden) return null;
  return (
    <div
      className={`hero-line relative -mx-3 whitespace-pre px-3 transition-colors duration-300 ${active ? 'bg-white/[0.07]' : ''}`}
      style={{ paddingLeft: `calc(0.75rem + ${indent * 2}ch)` }}
    >
      {active && <span className="absolute inset-y-0 left-0 w-0.5 bg-primary" />}
      {children}
      {active && <span className="hero-caret ml-0.5 inline-block h-[1.1em] w-[0.5ch] translate-y-[0.2em] bg-current" />}
    </div>
  );
}

const K = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#81a1c1] dark:text-[#f47067]">{children}</span>
);
const T = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#8fbcbb] dark:text-[#6cb6ff]">{children}</span>
);
const S = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#a3be8c] dark:text-[#96d0ff]">{children}</span>
);
