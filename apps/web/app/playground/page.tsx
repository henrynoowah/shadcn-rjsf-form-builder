'use client';

import { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from '../_components/theme-toggle';
import JsonBlock from '../_components/json-block';
import { FormRenderer } from '@/registry/form-renderer/form-renderer';
import { FormBuilder } from '@/registry/form-builder/form-builder';
import type { FormSchema } from '@/registry/form-builder-types/types';

const SAMPLE_SCHEMA: FormSchema = {
  id: 'demo-form',
  title: { 'en-US': 'Contact Us', 'ko-KR': '문의하기' },
  description: { 'en-US': "Fill out the form below and we'll get back to you." },
  submitLabel: { 'en-US': 'Send Message', 'ko-KR': '메시지 보내기' },
  fields: [
    {
      id: 'heading-1',
      type: 'heading',
      label: { 'en-US': 'Personal Information' },
      order: 0,
    },
    {
      id: 'name',
      type: 'text',
      label: { 'en-US': 'Full Name', 'ko-KR': '이름' },
      placeholder: { 'en-US': 'John Doe', 'ko-KR': '홍길동' },
      required: true,
      order: 1,
    },
    {
      id: 'email',
      type: 'email',
      label: { 'en-US': 'Email Address', 'ko-KR': '이메일 주소' },
      placeholder: { 'en-US': 'john@example.com' },
      required: true,
      order: 2,
    },
    {
      id: 'topic',
      type: 'select',
      label: { 'en-US': 'Topic', 'ko-KR': '주제' },
      required: true,
      order: 3,
      options: [
        { value: 'general', label: { 'en-US': 'General Inquiry', 'ko-KR': '일반 문의' } },
        { value: 'support', label: { 'en-US': 'Technical Support', 'ko-KR': '기술 지원' } },
        { value: 'billing', label: { 'en-US': 'Billing', 'ko-KR': '결제' } },
        { value: 'other', label: { 'en-US': 'Other', 'ko-KR': '기타' } },
      ],
    },
    {
      id: 'separator-1',
      type: 'separator',
      label: { 'en-US': '' },
      order: 4,
    },
    {
      id: 'message',
      type: 'textarea',
      label: { 'en-US': 'Message', 'ko-KR': '메시지' },
      placeholder: { 'en-US': 'Tell us how we can help...' },
      required: true,
      validation: { minLength: 20, maxLength: 1000 },
      order: 5,
    },
    {
      id: 'newsletter',
      type: 'checkbox',
      label: { 'en-US': 'Subscribe to newsletter', 'ko-KR': '뉴스레터 구독' },
      defaultValue: false,
      order: 6,
    },
  ],
};

type Tab = 'renderer' | 'builder';
type Locale = 'en-US' | 'ko-KR';

const GITHUB_SVG = (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
  </svg>
);

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState<Tab>('renderer');
  const [locale, setLocale] = useState<Locale>('en-US');
  const [submittedData, setSubmittedData] = useState<Record<string, unknown> | null>(null);
  const [builderSchema, setBuilderSchema] = useState<FormSchema>(SAMPLE_SCHEMA);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav — matches landing page and docs */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="font-mono text-sm font-semibold tracking-tight hover:opacity-80"
            >
              shadcn-rjsf
            </Link>
            <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
              playground
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/docs"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Docs
            </Link>
            <ThemeToggle />
            <a
              href="https://github.com/henrynoowah/shadcn-rjsf-form-builder"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {GITHUB_SVG}
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Subheader: tabs + locale switcher */}
      <div className="border-b border-border px-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex gap-6">
            {(
              [
                { id: 'renderer', label: 'Form Renderer' },
                { id: 'builder', label: 'Form Builder' },
              ] as { id: Tab; label: string }[]
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-foreground text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Locale switcher */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mr-1">
              locale
            </span>
            {(['en-US', 'ko-KR'] as Locale[]).map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={`rounded px-2.5 py-1 font-mono text-xs font-medium transition-colors ${
                  locale === l
                    ? 'bg-foreground text-background'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-6 py-8">
        {activeTab === 'renderer' && (
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Form */}
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Live Form
              </h2>
              <div className="rounded-lg border border-border p-6">
                <FormRenderer
                  schema={builderSchema}
                  locale={locale}
                  baseLocale="en-US"
                  onSubmit={(data) => setSubmittedData(data)}
                />
              </div>
            </div>

            {/* Output */}
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Submitted Data
              </h2>
              <div className="rounded-lg border border-border bg-muted/30 p-4 min-h-40 overflow-auto">
                {submittedData ? (
                  <JsonBlock value={submittedData} />
                ) : (
                  <p className="text-sm text-muted-foreground">Submit the form to see data here.</p>
                )}
              </div>

              <h2 className="mb-4 mt-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                FormSchema
              </h2>
              <div className="rounded-lg border border-border bg-muted/30 max-h-96 overflow-auto">
                <JsonBlock value={builderSchema} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'builder' && (
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Drag fields from the palette, edit their settings, and see the schema update in real
              time.
            </p>
            <div
              className="rounded-lg border border-border overflow-hidden"
              style={{ height: '70vh' }}
            >
              <FormBuilder
                initialSchema={builderSchema}
                onChange={setBuilderSchema}
                locale={locale}
                baseLocale="en-US"
                availableLocales={['en-US', 'ko-KR']}
                className="h-full"
              />
            </div>
            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Generated Schema
              </h2>
              <div className="rounded-lg border border-border bg-muted/30 max-h-64 overflow-auto">
                <JsonBlock value={builderSchema} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
