'use client';

import { useState } from 'react';
import { FormRenderer } from '@/registry/form-renderer/form-renderer';
import { FormBuilder } from '@/registry/form-builder/form-builder';
import type { FormSchema } from '@/registry/form-builder-types/types';

const SAMPLE_SCHEMA: FormSchema = {
  id: 'demo-form',
  title: { 'en-US': 'Contact Us', 'ko-KR': '문의하기' },
  description: { 'en-US': 'Fill out the form below and we\'ll get back to you.' },
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

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState<Tab>('renderer');
  const [locale, setLocale] = useState<Locale>('en-US');
  const [submittedData, setSubmittedData] = useState<Record<string, unknown> | null>(null);
  const [builderSchema, setBuilderSchema] = useState<FormSchema>(SAMPLE_SCHEMA);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">shadcn RJSF Form Builder</h1>
            <p className="text-sm text-muted-foreground">Registry demo — form-renderer &amp; form-builder</p>
          </div>
          {/* Locale switcher */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Locale:</span>
            {(['en-US', 'ko-KR'] as Locale[]).map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
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
      </header>

      {/* Tabs */}
      <div className="border-b border-border px-6">
        <div className="mx-auto max-w-5xl flex gap-6">
          {[
            { id: 'renderer', label: 'Form Renderer' },
            { id: 'builder', label: 'Form Builder' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
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
                  schema={SAMPLE_SCHEMA}
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
              <div className="rounded-lg border border-border bg-muted/30 p-6 min-h-40">
                {submittedData ? (
                  <pre className="text-xs font-mono overflow-auto whitespace-pre-wrap">
                    {JSON.stringify(submittedData, null, 2)}
                  </pre>
                ) : (
                  <p className="text-sm text-muted-foreground">Submit the form to see data here.</p>
                )}
              </div>

              {/* Schema preview */}
              <h2 className="mb-4 mt-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                FormSchema
              </h2>
              <div className="rounded-lg border border-border bg-muted/30 p-6 max-h-96 overflow-auto">
                <pre className="text-xs font-mono whitespace-pre-wrap">
                  {JSON.stringify(SAMPLE_SCHEMA, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'builder' && (
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Drag fields from the palette, edit their settings, and see the schema update in real time.
            </p>
            <div className="rounded-lg border border-border overflow-hidden" style={{ height: '70vh' }}>
              <FormBuilder
                initialSchema={builderSchema}
                onChange={setBuilderSchema}
                locale={locale}
                baseLocale="en-US"
                availableLocales={['en-US', 'ko-KR']}
                className="h-full"
              />
            </div>
            {/* Live schema output */}
            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Generated Schema
              </h2>
              <div className="rounded-lg border border-border bg-muted/30 p-6 max-h-64 overflow-auto">
                <pre className="text-xs font-mono whitespace-pre-wrap">
                  {JSON.stringify(builderSchema, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
