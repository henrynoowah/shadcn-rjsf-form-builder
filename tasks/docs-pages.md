# Plan: /docs Documentation Pages

## Status: COMPLETED (2026-03-19)

## Context
Add a `/docs` section to `apps/web` with detailed documentation for the three registry items. The existing `app/page.tsx` is a landing page with install commands; the docs pages provide depth: how to use the API, all schema properties, and copy-paste examples.

## Files Created

```
apps/web/app/docs/
├── layout.tsx          # 'use client' sidebar nav + sticky main content area
├── page.tsx            # "Get Started" — installation, prerequisites, quick-start
├── schema/
│   └── page.tsx        # "Schema Reference" — all types documented
└── examples/
    └── page.tsx        # "Examples" — annotated real-world schemas + usage patterns
```

## Files Modified

- `apps/web/app/page.tsx` — added "Docs" link in top nav alongside "Demo"

## Layout (`docs/layout.tsx`)

- `'use client'` for `usePathname()` active link highlighting
- Left sidebar (`w-52`, sticky): nav links to `/docs`, `/docs/schema`, `/docs/examples`
- Main content: `max-w-3xl`, generous prose spacing

## Page Content

### 1. Get Started (`/docs/page.tsx`)
- Overview of the three packages and how they relate
- Prerequisites: shadcn/ui, Next.js 13+, Node 18+
- Installation: ordered steps with npx commands using `NEXT_PUBLIC_REGISTRY_URL`
- Quick Start: FormRenderer minimal example
- Quick Start: FormBuilder wired to renderer
- Locale Setup: `locale` + `baseLocale` props table

### 2. Schema Reference (`/docs/schema/page.tsx`)
- FormSchema root object table
- FormFieldDefinition all fields table
- Field Types: all 13 types with JSON Schema mapping + notes
- LocalizedString: plain string vs locale-map, fallback behavior
- Validation: FormFieldValidation fields table + custom validators
- Conditions: FormFieldCondition with operator reference table
- Settings: FormSchemaSettings table

### 3. Examples (`/docs/examples/page.tsx`)
- Contact Form (heading + text + email + select + separator + textarea + checkbox)
- Conditional Fields (field only appears when another field equals a specific value)
- Multi-locale Form (LocalizedString with three locales + locale switcher)
- Custom Validation (registerValidator + createCustomValidator usage)
- Controlled FormBuilder (onChange from FormBuilder into FormRenderer for live preview)

## Styling Conventions Applied

- Section headings: `text-xl font-semibold border-b border-border pb-2 mb-4`
- Subsection headings: `text-sm font-semibold uppercase tracking-wider text-muted-foreground`
- Code blocks: `<pre className="bg-muted rounded-md p-4 text-xs font-mono overflow-x-auto">`
- Inline code: `<code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">`
- Tables: `border border-border` with `text-sm` cells
- Prose paragraphs: `text-sm text-muted-foreground leading-relaxed`

## Verification

- `pnpm --filter web typecheck` passes ✓
- `/docs`, `/docs/schema`, `/docs/examples` all render as server components
- Sidebar active-link highlights correctly via `usePathname()`
- All install commands in Get Started use `NEXT_PUBLIC_REGISTRY_URL`
