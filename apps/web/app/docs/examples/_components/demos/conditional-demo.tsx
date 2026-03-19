'use client';

import { FormRenderer } from '@/registry/form-renderer/form-renderer';
import type { FormSchema } from '@/registry/form-builder-types/types';

const schema: FormSchema = {
  id: 'conditional-demo',
  title: 'Support Ticket',
  fields: [
    {
      id: 'topic',
      type: 'select',
      label: 'Topic',
      required: true,
      order: 0,
      options: [
        { value: 'bug', label: 'Bug Report' },
        { value: 'feature', label: 'Feature Request' },
        { value: 'other', label: 'Other' },
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
      condition: { field: 'topic', operator: 'eq', value: 'other' },
    },
  ],
};

export default function ConditionalDemo() {
  return (
    <div>
      <p className="mb-4 text-xs text-muted-foreground">
        Select <strong className="text-foreground">Other</strong> from the Topic dropdown to reveal the extra field.
      </p>
      <FormRenderer schema={schema} locale="en-US" baseLocale="en-US" />
    </div>
  );
}
