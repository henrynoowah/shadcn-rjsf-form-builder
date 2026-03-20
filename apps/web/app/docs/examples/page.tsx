import { codeToHtml } from 'shiki';
import ExampleBlock from './_components/example-block';
import ContactFormDemo from './_components/demos/contact-form-demo';
import ConditionalDemo from './_components/demos/conditional-demo';
import LocaleDemo from './_components/demos/locale-demo';
import ValidationDemo from './_components/demos/validation-demo';
import BuilderDemo from './_components/demos/builder-demo';

async function highlight(code: string) {
  return codeToHtml(code, {
    lang: 'tsx',
    themes: { light: 'nord', dark: 'github-dark-dimmed' },
    defaultColor: false,
  });
}

const CONTACT_FORM_CODE = `import { FormRenderer } from '@/components/form-renderer/form-renderer';
import type { FormSchema } from '@/lib/form-builder-types/types';

const schema: FormSchema = {
  id: 'contact',
  title: { 'en-US': 'Contact Us' },
  description: { 'en-US': "Fill out the form and we'll get back to you." },
  submitLabel: { 'en-US': 'Send Message' },
  fields: [
    // Display-only heading — not in submitted data
    { id: 'heading-1', type: 'heading', label: { 'en-US': 'Personal Information' }, order: 0 },

    { id: 'name',  type: 'text',  label: { 'en-US': 'Full Name' },    required: true, order: 1 },
    { id: 'email', type: 'email', label: { 'en-US': 'Email Address' }, required: true, order: 2 },

    {
      id: 'topic',
      type: 'select',
      label: { 'en-US': 'Topic' },
      required: true,
      order: 3,
      options: [
        { value: 'general', label: { 'en-US': 'General Inquiry' } },
        { value: 'support', label: { 'en-US': 'Technical Support' } },
        { value: 'billing', label: { 'en-US': 'Billing' } },
      ],
    },

    // Visual divider
    { id: 'sep-1', type: 'separator', label: '', order: 4 },

    {
      id: 'message',
      type: 'textarea',
      label: { 'en-US': 'Message' },
      required: true,
      validation: { minLength: 20, maxLength: 1000 },
      order: 5,
    },

    { id: 'newsletter', type: 'checkbox', label: { 'en-US': 'Subscribe to newsletter' }, order: 6 },
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
}`;

const CONDITIONAL_CODE = `const schema: FormSchema = {
  id: 'support-ticket',
  title: 'Support Ticket',
  fields: [
    {
      id: 'topic',
      type: 'select',
      label: 'Topic',
      required: true,
      order: 0,
      options: [
        { value: 'bug',     label: 'Bug Report' },
        { value: 'feature', label: 'Feature Request' },
        { value: 'other',   label: 'Other' },
      ],
    },
    {
      id: 'description',
      type: 'textarea',
      label: 'Description',
      required: true,
      order: 1,
    },
    {
      id: 'otherDetails',
      type: 'textarea',
      label: 'Please describe what "Other" means',
      order: 2,
      // Only rendered when topic === 'other'
      condition: {
        field: 'topic',
        operator: 'eq',
        value: 'other',
      },
    },
  ],
};`;

const LOCALE_CODE = `'use client';

import { useState } from 'react';
import { FormRenderer } from '@/components/form-renderer/form-renderer';
import type { FormSchema } from '@/lib/form-builder-types/types';

const schema: FormSchema = {
  id: 'multilingual',
  title: { 'en-US': 'Registration', 'ko-KR': '회원가입', 'ja-JP': '登録' },
  submitLabel: { 'en-US': 'Register', 'ko-KR': '등록하기', 'ja-JP': '登録する' },
  fields: [
    {
      id: 'name',
      type: 'text',
      label: { 'en-US': 'Full Name', 'ko-KR': '이름', 'ja-JP': '氏名' },
      placeholder: { 'en-US': 'John Doe', 'ko-KR': '홍길동', 'ja-JP': '山田太郎' },
      required: true,
      order: 0,
    },
    {
      id: 'email',
      type: 'email',
      // Only en-US label provided — ko-KR and ja-JP fall back to "Email Address"
      label: { 'en-US': 'Email Address' },
      placeholder: {
        'en-US': 'john@example.com (en-US)',
        'ko-KR': 'label falls back → "Email Address"',
        'ja-JP': 'label falls back → "Email Address"',
      },
      required: true,
      order: 1,
    },
  ],
};

type Locale = 'en-US' | 'ko-KR' | 'ja-JP';
const LOCALES: Locale[] = ['en-US', 'ko-KR', 'ja-JP'];

export default function RegistrationPage() {
  const [locale, setLocale] = useState<Locale>('en-US');

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {LOCALES.map((l) => (
          <button key={l} onClick={() => setLocale(l)}>
            {l}
          </button>
        ))}
      </div>
      <FormRenderer schema={schema} locale={locale} baseLocale="en-US" />
    </div>
  );
}`;

const VALIDATION_CODE = `import type { FormSchema } from '@/lib/form-builder-types/types';

// Built-in validators: minLength, maxLength, min, max, pattern
const schema: FormSchema = {
  id: 'signup',
  title: 'Work Sign-up',
  fields: [
    {
      id: 'email',
      type: 'email',
      label: 'Email Address',
      required: true,
      order: 0,
    },
    {
      id: 'username',
      type: 'text',
      label: 'Username',
      required: true,
      order: 1,
      description: 'Lowercase letters, numbers, and underscores only. 3–20 characters.',
      validation: { minLength: 3, maxLength: 20, pattern: '^[a-z0-9_]+$' },
    },
    {
      id: 'age',
      type: 'number',
      label: 'Age',
      required: true,
      order: 2,
      description: 'Must be between 18 and 120.',
      validation: { min: 18, max: 120 },
    },
    {
      id: 'bio',
      type: 'textarea',
      label: 'Short Bio',
      order: 3,
      description: '50–300 characters.',
      validation: { minLength: 50, maxLength: 300 },
    },
  ],
};

// ---- Custom validators (registerValidator API) ----
// Register once at app startup, then reference by key in validation.customRule

import { registerValidator, createCustomValidator } from '@/lib/form-builder-types/validation';

registerValidator('no-free-email', (value) => {
  const freeProviders = ['gmail.com', 'yahoo.com', 'hotmail.com'];
  if (typeof value === 'string' && value.includes('@')) {
    const domain = value.split('@')[1] ?? '';
    if (freeProviders.includes(domain)) return 'Please use a work email address.';
  }
});

// Reference by key in any field's validation.customRule:
// validation: { customRule: 'no-free-email' }
//
// Then pass the validator to FormRenderer:
// customValidate={createCustomValidator(schema)}`;

const BUILDER_CODE = `'use client';

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
        onChange={setSchema}        // emits a new FormSchema on every change
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
}`;

export default async function ExamplesPage() {
  const [contactHtml, conditionalHtml, localeHtml, validationHtml, builderHtml] = await Promise.all(
    [
      highlight(CONTACT_FORM_CODE),
      highlight(CONDITIONAL_CODE),
      highlight(LOCALE_CODE),
      highlight(VALIDATION_CODE),
      highlight(BUILDER_CODE),
    ]
  );

  return (
    <div className="space-y-14">
      {/* Page header */}
      <div>
        <h1 className="mb-3 text-2xl font-bold tracking-tight">Examples</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Annotated, copy-paste examples covering the most common patterns. Toggle between{' '}
          <strong className="text-foreground">Code</strong> and{' '}
          <strong className="text-foreground">Preview</strong> on each example.
        </p>
      </div>

      {/* Contact Form */}
      <section>
        <h2 id="contact-form" className="scroll-mt-20 text-xl font-semibold border-b border-border pb-2 mb-3">
          Contact Form
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          A realistic contact form with display fields (
          <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">heading</code>,{' '}
          <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">separator</code>),
          validation, and a checkbox. Display fields are excluded from the submitted data.
        </p>
        <ExampleBlock codeHtml={contactHtml}>
          <ContactFormDemo />
        </ExampleBlock>
      </section>

      {/* Conditional Fields */}
      <section>
        <h2
          id="conditional-fields"
          className="scroll-mt-20 text-xl font-semibold border-b border-border pb-2 mb-3"
        >
          Conditional Fields
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          A field with a{' '}
          <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">condition</code> is
          hidden until the condition passes. Here, "Other details" only appears when the topic
          select is set to "other".
        </p>
        <ExampleBlock codeHtml={conditionalHtml}>
          <ConditionalDemo />
        </ExampleBlock>
      </section>

      {/* Multi-locale Form */}
      <section>
        <h2
          id="multi-locale-form"
          className="scroll-mt-20 text-xl font-semibold border-b border-border pb-2 mb-3"
        >
          Multi-locale Form
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Provide a locale map for every label, then switch the active locale at runtime. The{' '}
          <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">baseLocale</code> is
          used as a fallback when a translation is missing.
        </p>
        <ExampleBlock codeHtml={localeHtml}>
          <LocaleDemo />
        </ExampleBlock>
      </section>

      {/* Custom Validation */}
      <section>
        <h2
          id="custom-validation"
          className="scroll-mt-20 text-xl font-semibold border-b border-border pb-2 mb-3"
        >
          Custom Validation
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Register a validator once at app startup. Reference it by key in any field's{' '}
          <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
            validation.customRule
          </code>
          . The validator receives the field's value and the full form data object.
        </p>
        <ExampleBlock codeHtml={validationHtml}>
          <ValidationDemo />
        </ExampleBlock>
      </section>

      {/* Controlled FormBuilder */}
      <section>
        <h2
          id="controlled-formbuilder"
          className="scroll-mt-20 text-xl font-semibold border-b border-border pb-2 mb-3"
        >
          Controlled FormBuilder
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Wire <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">FormBuilder</code>
          's <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">onChange</code> into
          a <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">FormRenderer</code>{' '}
          for a live side-by-side preview. The builder is always the source of truth; the renderer
          is a read-only consumer.
        </p>
        <ExampleBlock codeHtml={builderHtml}>
          <BuilderDemo />
        </ExampleBlock>
      </section>
    </div>
  );
}
