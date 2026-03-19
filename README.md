# shadcn-rjsf-form-builder

A shadcn/ui registry for JSON Schema–driven forms with a drag-and-drop visual builder. Copy-paste components via the shadcn CLI — no npm package to install.

## Registry Items

| Name | Type | Description |
|------|------|-------------|
| `form-builder-types` | lib | Core types: `FormSchema`, `FormFieldDefinition`, `LocalizedString`, conditions, validation |
| `form-renderer` | ui | Renders a `FormSchema` as a fully accessible, styled form |
| `form-builder` | ui | Drag-and-drop visual builder that produces a `FormSchema` |

## Quick Start

### 1. Install via shadcn CLI

```sh
npx shadcn@latest add "<REGISTRY_URL>/r/form-builder-types"
npx shadcn@latest add "<REGISTRY_URL>/r/form-renderer"
npx shadcn@latest add "<REGISTRY_URL>/r/form-builder"
```

### 2. Render a form

```tsx
import { FormRenderer } from '@/components/form-renderer/form-renderer';
import type { FormSchema } from '@/lib/form-builder-types/types';

const schema: FormSchema = {
  id: 'contact',
  title: { 'en-US': 'Contact Us' },
  fields: [
    { id: 'name', type: 'text', label: { 'en-US': 'Name' }, required: true, order: 0 },
    { id: 'email', type: 'email', label: { 'en-US': 'Email' }, required: true, order: 1 },
  ],
};

export default function Page() {
  return (
    <FormRenderer
      schema={schema}
      locale="en-US"
      baseLocale="en-US"
      onSubmit={(data) => console.log(data)}
    />
  );
}
```

### 3. Use the visual builder

```tsx
import { FormBuilder } from '@/components/form-builder/form-builder';
import { FormRenderer } from '@/components/form-renderer/form-renderer';
import { useState } from 'react';
import type { FormSchema } from '@/lib/form-builder-types/types';

export default function Page() {
  const [schema, setSchema] = useState<FormSchema>({ id: 'my-form', title: 'My Form', fields: [] });

  return (
    <>
      <FormBuilder
        initialSchema={schema}
        onChange={setSchema}
        locale="en-US"
        baseLocale="en-US"
        availableLocales={['en-US']}
        className="h-[70vh]"
      />
      <FormRenderer schema={schema} locale="en-US" baseLocale="en-US" onSubmit={console.log} />
    </>
  );
}
```

## FormSchema

```ts
type FormSchema = {
  id: string;
  title: LocalizedString;
  description?: LocalizedString;
  submitLabel?: LocalizedString;   // defaults to "Submit"
  fields: FormFieldDefinition[];
  settings?: FormSchemaSettings;
};
```

## Field Types

| Type | Description |
|------|-------------|
| `text` | Single-line text input |
| `number` | Numeric input |
| `email` | Email input |
| `tel` | Phone number input |
| `select` | Dropdown select |
| `checkbox` | Boolean checkbox |
| `radio` | Radio group |
| `date` | Date picker |
| `textarea` | Multi-line text |
| `file` | File upload |
| `heading` | Display heading (non-input) |
| `paragraph` | Display text block (non-input) |
| `separator` | Visual divider (non-input) |

## i18n

`LocalizedString` is either a plain string or a locale-keyed map:

```ts
// Plain string (no i18n)
label: 'Name'

// Locale map
label: { 'en-US': 'Name', 'ko-KR': '이름' }
```

Pass `locale` and `baseLocale` to `FormRenderer`/`FormBuilder`. If a translation is missing for the active locale, it falls back to `baseLocale`.

## Conditional Fields

A field is shown only when its `condition` evaluates to `true` against live form data:

```ts
{
  id: 'details',
  type: 'textarea',
  label: { 'en-US': 'Details' },
  order: 1,
  condition: { field: 'topic', operator: 'eq', value: 'other' },
}
```

Supported operators: `eq`, `neq`, `gt`, `lt`, `contains`, `empty`, `notEmpty`.

## Development

This is a [Turborepo](https://turbo.build/) monorepo.

```sh
pnpm install
pnpm dev          # start the Next.js registry/docs app
pnpm typecheck    # type-check all packages
pnpm build        # build all packages
```

**Apps & Packages**

- `apps/web` — Next.js app (registry server, docs, playground)
- `packages/eslint-config` — shared ESLint config
- `packages/typescript-config` — shared `tsconfig` base

## Links

- [Playground](https://shadcn-rjsf-form-builder.vercel.app/playground)
- [Docs](https://shadcn-rjsf-form-builder.vercel.app/docs)
- [GitHub](https://github.com/henrynoowah/shadcn-rjsf-form-builder)
