import CodeBlock from '../_components/code-block';
import InstallCard from '../_components/install-card';

const REGISTRY_RAW_BASE =
  'https://raw.githubusercontent.com/henrynoowah/shadcn-rjsf-form-builder/main/apps/web/public/r';

const INSTALL_STEPS = [
  {
    name: 'form-builder-types',
    description: 'TypeScript types, validators, and shared utilities',
    note: 'Install this first — the other two depend on it.',
  },
  {
    name: 'form-renderer',
    description: 'Renders a FormSchema as a live, accessible form',
    note: null,
  },
  {
    name: 'form-builder',
    description: 'Drag-and-drop visual builder that emits a FormSchema',
    note: null,
  },
];

export default async function DocsGetStarted() {
  return (
    <div className="space-y-12">
      {/* Page header */}
      <div>
        <h1 className="mb-3 text-2xl font-bold tracking-tight">Get Started</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          shadcn-rjsf is a set of three copy-paste registry items that bring JSON Schema–driven forms
          and a visual form builder to any shadcn/ui project.
        </p>
      </div>

      {/* Overview */}
      <section>
        <h2 id="overview" className="text-xl font-semibold border-b border-border pb-2 mb-4">Overview</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          The registry ships three items that work together:
        </p>
        <div className="space-y-3">
          <div className="rounded-md border border-border p-4">
            <div className="flex items-center gap-2 mb-1">
              <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">form-builder-types</code>
              <span className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">lib</span>
            </div>
            <p className="text-sm text-muted-foreground">
              TypeScript types (<code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">FormSchema</code>,{' '}
              <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">FormFieldDefinition</code>, etc.),
              the <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">registerValidator</code> API,
              and <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">createCustomValidator</code>.
              Both the renderer and builder import from here.
            </p>
          </div>
          <div className="rounded-md border border-border p-4">
            <div className="flex items-center gap-2 mb-1">
              <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">form-renderer</code>
              <span className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">ui</span>
            </div>
            <p className="text-sm text-muted-foreground">
              A React component that accepts a <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">FormSchema</code> and
              renders it as a fully accessible, themed form using your existing shadcn/ui components.
            </p>
          </div>
          <div className="rounded-md border border-border p-4">
            <div className="flex items-center gap-2 mb-1">
              <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">form-builder</code>
              <span className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">ui</span>
            </div>
            <p className="text-sm text-muted-foreground">
              A drag-and-drop visual editor with a live preview pane. Emits a{' '}
              <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">FormSchema</code> via{' '}
              <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">onChange</code> on every edit.
            </p>
          </div>
        </div>
      </section>

      {/* Prerequisites */}
      <section>
        <h2 id="prerequisites" className="text-xl font-semibold border-b border-border pb-2 mb-4">Prerequisites</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-foreground">•</span>
            <span>
              <strong className="text-foreground">shadcn/ui</strong> initialized in your project (
              <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">npx shadcn@latest init</code>)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-foreground">•</span>
            <span>
              <strong className="text-foreground">Next.js 13+</strong> (App Router) or{' '}
              <strong className="text-foreground">React 18+</strong> with a compatible bundler
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-foreground">•</span>
            <span>
              <strong className="text-foreground">Node.js 18+</strong>
            </span>
          </li>
        </ul>
      </section>

      {/* Installation */}
      <section>
        <h2 id="installation" className="text-xl font-semibold border-b border-border pb-2 mb-4">Installation</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          Install in order — <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">form-builder-types</code> must
          be installed first because the other two depend on it.
        </p>
        <div className="space-y-4">
          {INSTALL_STEPS.map((step, i) => (
            <InstallCard
              key={step.name}
              step={i + 1}
              name={step.name}
              description={step.description}
              note={step.note ?? undefined}
              cmd={`npx shadcn@latest add "${REGISTRY_RAW_BASE}/${step.name}.json"`}
            />
          ))}
        </div>
      </section>

      {/* Quick Start: FormRenderer */}
      <section>
        <h2 id="quick-start-formrenderer" className="text-xl font-semibold border-b border-border pb-2 mb-4">Quick Start: FormRenderer</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Pass a <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">FormSchema</code> to{' '}
          <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">FormRenderer</code> and handle submissions
          via <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">onSubmit</code>.
        </p>
        <CodeBlock code={`import { FormRenderer } from '@/components/form-renderer/form-renderer';
import type { FormSchema } from '@/lib/form-builder-types/types';

const schema: FormSchema = {
  id: 'contact',
  title: 'Contact Us',
  fields: [
    { id: 'name', type: 'text', label: 'Name', required: true, order: 0 },
    { id: 'email', type: 'email', label: 'Email', required: true, order: 1 },
    { id: 'message', type: 'textarea', label: 'Message', order: 2 },
  ],
};

export default function ContactPage() {
  return (
    <FormRenderer
      schema={schema}
      locale="en-US"
      baseLocale="en-US"
      onSubmit={(data) => console.log(data)}
    />
  );
}`} />
      </section>

      {/* Quick Start: FormBuilder */}
      <section>
        <h2 id="quick-start-formbuilder" className="text-xl font-semibold border-b border-border pb-2 mb-4">Quick Start: FormBuilder</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Wire <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">FormBuilder</code> to a{' '}
          <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">FormRenderer</code> for a live preview.
          The builder emits a full <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">FormSchema</code> on
          every change.
        </p>
        <CodeBlock code={`'use client';

import { useState } from 'react';
import { FormBuilder } from '@/components/form-builder/form-builder';
import { FormRenderer } from '@/components/form-renderer/form-renderer';
import type { FormSchema } from '@/lib/form-builder-types/types';

const INITIAL: FormSchema = { id: 'my-form', title: 'My Form', fields: [] };

export default function BuilderPage() {
  const [schema, setSchema] = useState<FormSchema>(INITIAL);

  return (
    <div className="grid grid-cols-2 gap-6 h-screen">
      <FormBuilder
        initialSchema={schema}
        onChange={setSchema}
        locale="en-US"
        baseLocale="en-US"
        availableLocales={['en-US']}
        className="h-full"
      />
      <div className="p-6 border rounded-lg overflow-auto">
        <FormRenderer schema={schema} locale="en-US" baseLocale="en-US" />
      </div>
    </div>
  );
}`} />
      </section>

      {/* Locale Setup */}
      <section>
        <h2 id="locale-setup" className="text-xl font-semibold border-b border-border pb-2 mb-4">Locale Setup</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Both components accept a <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">locale</code> and{' '}
          <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">baseLocale</code> prop.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border border-border text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2 text-left font-medium">Prop</th>
                <th className="px-4 py-2 text-left font-medium">Type</th>
                <th className="px-4 py-2 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-2"><code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">locale</code></td>
                <td className="px-4 py-2 text-muted-foreground">string</td>
                <td className="px-4 py-2 text-muted-foreground">The active locale key (e.g. <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">"en-US"</code>). Used to resolve LocalizedString values.</td>
              </tr>
              <tr>
                <td className="px-4 py-2"><code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">baseLocale</code></td>
                <td className="px-4 py-2 text-muted-foreground">string</td>
                <td className="px-4 py-2 text-muted-foreground">Fallback locale when the active locale has no translation for a string.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          If a <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">LocalizedString</code> is a plain string
          (not a locale map), it is always used as-is regardless of the active locale.
        </p>
      </section>
    </div>
  );
}
