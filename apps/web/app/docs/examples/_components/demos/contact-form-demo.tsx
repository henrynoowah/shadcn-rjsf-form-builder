'use client';

import { useState } from 'react';
import { FormRenderer } from '@/registry/form-renderer/form-renderer';
import type { FormSchema } from '@/registry/form-builder-types/types';

const schema: FormSchema = {
  id: 'contact-demo',
  title: { 'en-US': 'Contact Us' },
  description: { 'en-US': "Fill out the form and we'll get back to you." },
  submitLabel: { 'en-US': 'Send Message' },
  fields: [
    { id: 'heading-1', type: 'heading', label: { 'en-US': 'Personal Information' }, order: 0 },
    { id: 'name', type: 'text', label: { 'en-US': 'Full Name' }, required: true, order: 1 },
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
    { id: 'sep-1', type: 'separator', label: '', order: 4 },
    {
      id: 'message',
      type: 'textarea',
      label: { 'en-US': 'Message' },
      required: true,
      validation: { minLength: 20, maxLength: 1000 },
      order: 5,
    },
    {
      id: 'newsletter',
      type: 'checkbox',
      label: { 'en-US': 'Subscribe to newsletter' },
      order: 6,
    },
  ],
};

export default function ContactFormDemo() {
  const [submitted, setSubmitted] = useState<Record<string, unknown> | null>(null);

  return (
    <div className="space-y-6">
      <FormRenderer
        schema={schema}
        locale="en-US"
        baseLocale="en-US"
        onSubmit={(data) => setSubmitted(data)}
      />
      {submitted && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Submitted Data
          </p>
          <pre className="rounded-md bg-muted p-3 text-xs font-mono">
            {JSON.stringify(submitted, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
