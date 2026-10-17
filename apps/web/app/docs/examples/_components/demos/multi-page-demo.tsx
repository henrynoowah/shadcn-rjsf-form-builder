'use client';

import { useState } from 'react';
import { FormRenderer } from '@/registry/form-renderer/form-renderer';
import type { FormSchema } from '@/registry/form-builder-types/types';

const schema: FormSchema = {
  id: 'multi-page-demo',
  title: 'Book a Consultation',
  submitLabel: 'Book',
  settings: { showProgressBar: true },
  fields: [
    { id: 'name', type: 'text', label: 'Full Name', required: true, order: 0 },
    { id: 'email', type: 'email', label: 'Email Address', required: true, order: 1 },
    {
      id: 'page-visit',
      type: 'pagebreak',
      label: 'Your Visit',
      description: 'Tell us what the consultation is about.',
      order: 2,
    },
    {
      id: 'department',
      type: 'select',
      label: 'Department',
      required: true,
      order: 3,
      options: [
        { value: 'dermatology', label: 'Dermatology' },
        { value: 'orthopedics', label: 'Orthopedics' },
        { value: 'other', label: 'Other' },
      ],
    },
    { id: 'reason', type: 'textarea', label: 'Reason for Visit', order: 4 },
    { id: 'page-confirm', type: 'pagebreak', label: 'Confirm', order: 5 },
    { id: 'consent', type: 'checkbox', label: 'I agree to be contacted by email', order: 6 },
  ],
};

export default function MultiPageDemo() {
  const [submitted, setSubmitted] = useState<Record<string, unknown> | null>(null);

  return (
    <div>
      <FormRenderer schema={schema} locale="en-US" baseLocale="en-US" onSubmit={setSubmitted} />
      {submitted && (
        <pre className="bg-muted mt-4 overflow-x-auto rounded-md p-3 text-xs">{JSON.stringify(submitted, null, 2)}</pre>
      )}
    </div>
  );
}
