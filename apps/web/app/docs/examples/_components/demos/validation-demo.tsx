'use client';

import { useState } from 'react';
import { FormRenderer } from '@/registry/form-renderer/form-renderer';
import type { FormSchema } from '@/registry/form-builder-types/types';

const schema: FormSchema = {
  id: 'validation-demo',
  title: 'Work Sign-up',
  fields: [
    {
      id: 'email',
      type: 'email',
      label: 'Email Address',
      description: 'Must be a valid email format.',
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

export default function ValidationDemo() {
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
