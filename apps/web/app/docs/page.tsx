import { headers } from 'next/headers';
import Link from 'next/link';
import CodeBlock from '../_components/code-block';
import { Code, DocTable, H2 } from './_components/doc';
import { getLatestRelease, versionHeader } from '@/lib/changelog';

const ITEMS = ['form-builder-types', 'form-renderer', 'form-builder'];

export default async function DocsGetStarted() {
  const host = (await headers()).get('host');
  const registryBase = `https://${host}/r`;
  const latest = getLatestRelease();
  const add = (name: string, flags = '') => `npx shadcn@latest add "${registryBase}/${name}.json"${flags}`;

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

      {/* Prerequisites */}
      <section>
        <H2 id="prerequisites">Prerequisites</H2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground marker:text-foreground">
          <li>
            <strong className="text-foreground">shadcn/ui</strong> initialized in your project (
            <Code>npx shadcn@latest init</Code>)
          </li>
          <li>
            <strong className="text-foreground">Next.js 13+</strong> (App Router) or{' '}
            <strong className="text-foreground">React 18+</strong> with a compatible bundler
          </li>
          <li>
            <strong className="text-foreground">Node.js 18+</strong>
          </li>
        </ul>
      </section>

      {/* Installation */}
      <section>
        <H2 id="installation">Installation</H2>
        <DocTable
          columns={['Item', 'What it is']}
          rows={[
            [
              <Code>form-builder-types</Code>,
              <>
                Types (<Code>FormSchema</Code>, <Code>FormFieldDefinition</Code>, …),{' '}
                <Code>registerValidator</Code> and <Code>createCustomValidator</Code>.
              </>,
            ],
            [
              <Code>form-renderer</Code>,
              <>
                Renders a <Code>FormSchema</Code> as an accessible form built on your shadcn/ui components.
              </>,
            ],
            [
              <Code>form-builder</Code>,
              <>
                Drag-and-drop editor with a field palette, canvas and settings panel. Emits a{' '}
                <Code>FormSchema</Code> via <Code>onChange</Code>.
              </>,
            ],
          ]}
        />
        <p className="mt-6 mb-3 text-sm text-muted-foreground leading-relaxed">
          Dependencies install automatically: <Code>form-builder</Code> pulls in <Code>form-renderer</Code> and{' '}
          <Code>form-builder-types</Code>, so one command gets everything:
        </p>
        <CodeBlock lang="sh" code={add('form-builder')} />
        <p className="mt-4 mb-3 text-sm text-muted-foreground leading-relaxed">
          Only rendering forms? Install just the renderer (it pulls in <Code>form-builder-types</Code>):
        </p>
        <CodeBlock lang="sh" code={add('form-renderer')} />
      </section>

      {/* Quick Start: FormRenderer */}
      <section>
        <H2 id="quick-start-formrenderer">Quick Start: FormRenderer</H2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Pass a <Code>FormSchema</Code> to <Code>FormRenderer</Code> and handle submissions via <Code>onSubmit</Code>.
        </p>
        <CodeBlock code={`import { FormRenderer } from '@/components/ui/rjsf-form-builder/form-renderer/form-renderer';
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
        <H2 id="quick-start-formbuilder">Quick Start: FormBuilder</H2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Wire <Code>FormBuilder</Code> to a <Code>FormRenderer</Code> for a live preview. The builder emits a full{' '}
          <Code>FormSchema</Code> on every change.
        </p>
        <CodeBlock code={`'use client';

import { useState } from 'react';
import { FormBuilder } from '@/components/ui/rjsf-form-builder/form-builder/form-builder';
import { FormRenderer } from '@/components/ui/rjsf-form-builder/form-renderer/form-renderer';
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
        <H2 id="locale-setup">Locale Setup</H2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Both components take a <Code>locale</Code> — the active locale used to resolve <Code>LocalizedString</Code>{' '}
          values — and a <Code>baseLocale</Code> fallback for missing translations. In <Code>FormBuilder</Code>, new
          field and option labels are created under <Code>baseLocale</Code>. A plain-string <Code>LocalizedString</Code>{' '}
          is always shown as-is. See the{' '}
          <Link href="/docs/api" className="text-foreground underline underline-offset-4">
            API Reference
          </Link>{' '}
          for every prop.
        </p>
      </section>

      {/* Updating */}
      <section>
        <H2 id="updating">Updating</H2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Registry items are copied into your project, so updates are not automatic. Every installed file starts with a
          comment naming the version it came from:
        </p>
        <CodeBlock code={versionHeader(latest.version, `https://${host}`).trimEnd()} lang="ts" />
        <p className="text-sm text-muted-foreground leading-relaxed my-4">
          Compare it with the latest release (<strong className="text-foreground">v{latest.version}</strong>) and read
          the{' '}
          <Link href="/docs/changelog" className="text-foreground underline underline-offset-4">
            changelog
          </Link>{' '}
          for what changed. To update, install again with <Code>--overwrite</Code>:
        </p>
        <CodeBlock lang="sh" code={ITEMS.map((name) => add(name, ' --overwrite')).join('\n')} />
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          This replaces the files in place. If you edited them, review the result with <Code>git diff</Code> and
          re-apply your changes.
        </p>
      </section>
    </div>
  );
}
