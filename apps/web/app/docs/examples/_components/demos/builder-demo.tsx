'use client';

import { useState } from 'react';
import { FormBuilder } from '@/registry/form-builder/form-builder';
import { FormRenderer } from '@/registry/form-renderer/form-renderer';
import type { FormSchema } from '@/registry/form-builder-types/types';

const INITIAL: FormSchema = {
  id: 'builder-demo',
  title: 'My Form',
  fields: [],
};

export default function BuilderDemo() {
  const [schema, setSchema] = useState<FormSchema>(INITIAL);

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border overflow-hidden" style={{ height: 480 }}>
        <FormBuilder
          initialSchema={schema}
          onChange={setSchema}
          locale="en-US"
          baseLocale="en-US"
          availableLocales={['en-US']}
          className="h-full"
        />
      </div>
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Live Preview
        </p>
        <div className="rounded-lg border border-border p-6">
          {schema.fields.length === 0 ? (
            <p className="text-sm text-muted-foreground">Add fields in the builder above to see the preview.</p>
          ) : (
            <FormRenderer schema={schema} locale="en-US" baseLocale="en-US" />
          )}
        </div>
      </div>
    </div>
  );
}
