# Plan: shadcn-rjsf-form-builder Turborepo Monorepo

## Context
Create a new turborepo monorepo at `/Users/henrycho/repo_personal/shadcn-rjsf-form-builder` (currently empty) that packages the rjsf form-builder as a **shadcn registry** (copy-paste via `npx shadcn@latest add <url>`) rather than an npm package.

Reference: `/Users/henrycho/cloudhospital/client-monorepo/packages/form-builder/`

## Monorepo Structure

```
shadcn-rjsf-form-builder/
├── package.json                  # Root: private, turbo dev/build/lint/typecheck
├── pnpm-workspace.yaml           # packages: ["apps/*", "packages/*"]
├── turbo.json                    # Pipeline config
├── .gitignore
├── .prettierrc
│
├── packages/
│   ├── typescript-config/        # Shared TS configs (base, nextjs, react-library)
│   └── eslint-config/            # Shared ESLint configs (base, react-internal, next)
│
└── apps/
    └── web/                      # Next.js 15 docs + registry server
        ├── package.json
        ├── next.config.ts        # outputFileTracingIncludes for registry files
        ├── tsconfig.json         # Path aliases mapping @/lib/* → registry/*
        ├── registry.json         # shadcn registry manifest (all 3 items)
        │
        ├── registry/             # Source files served to shadcn CLI
        │   ├── form-builder-types/   # Types + utils (registry:lib)
        │   │   ├── types.ts
        │   │   ├── i18n.ts
        │   │   ├── schema-builder.ts
        │   │   └── validation.ts
        │   ├── form-renderer/        # RJSF renderer (registry:ui)
        │   │   ├── form-renderer.tsx
        │   │   ├── theme.ts
        │   │   ├── widgets/ (7 files)
        │   │   ├── fields/ (3 files)
        │   │   └── templates/ (3 files)
        │   └── form-builder/         # Visual builder (registry:ui)
        │       ├── form-builder.tsx
        │       ├── builder-context.tsx
        │       ├── canvas.tsx
        │       ├── canvas-field.tsx
        │       ├── field-palette.tsx
        │       └── field-settings-panel.tsx
        │
        ├── app/
        │   ├── layout.tsx
        │   ├── page.tsx              # Docs landing
        │   ├── globals.css           # Tailwind v4 + CSS variable theme
        │   ├── r/[name]/route.ts     # Registry API: GET /r/[name].json
        │   └── docs/                 # Documentation pages with live demos
        │       ├── form-renderer/page.tsx
        │       ├── form-builder/page.tsx
        │       └── form-builder-types/page.tsx
        │
        └── lib/
            ├── utils.ts              # cn() helper (clsx + tailwind-merge)
            └── registry.ts           # getRegistryItem(), getAllRegistryItems()
```

## Registry Items (registry.json)

Three installable items using shadcn registry format:

1. **`form-builder-types`** (`registry:lib`) → installs to `lib/form-builder-types/`
   - `types.ts`, `i18n.ts`, `schema-builder.ts`, `validation.ts`
   - Dependencies: `@rjsf/utils`, `@rjsf/validator-ajv8`

2. **`form-renderer`** (`registry:ui`) → installs to `components/ui/form-renderer/`
   - All widgets, fields, templates + `form-renderer.tsx` + `theme.ts`
   - Dependencies: `@rjsf/core`, `@rjsf/utils`, `@rjsf/validator-ajv8`, `radix-ui`, `@tabler/icons-react`, `clsx`, `tailwind-merge`
   - `registryDependencies: ["form-builder-types"]`

3. **`form-builder`** (`registry:ui`) → installs to `components/ui/form-builder/`
   - All builder components + context
   - Dependencies: adds `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`, `nanoid`
   - `registryDependencies: ["form-builder-types", "form-renderer"]`

## Key Technical Decisions

### Registry API Route (`/r/[name]/route.ts`)
```typescript
// Reads .tsx source files at runtime via readFileSync, serves raw content
// Requires next.config.ts: outputFileTracingIncludes: { '/r/[name]': ['./registry/**/*'] }
```

### tsconfig Path Aliases (for docs app to compile registry files)
```json
"paths": {
  "@/*": ["./*"],
  "@/lib/form-builder-types/*": ["./registry/form-builder-types/*"],
  "@/components/ui/form-renderer/*": ["./registry/form-renderer/*"],
  "@/components/ui/form-builder/*": ["./registry/form-builder/*"]
}
```
Single source of truth in `registry/` — docs import via aliases, CLI serves from `registry/`.

### Import Path Rewrites When Porting
| Reference project import | Registry file import |
|---|---|
| `'../types'` or `'../../types'` | `'@/lib/form-builder-types/types'` |
| `'../utils/i18n'` | `'@/lib/form-builder-types/i18n'` |
| `'../../../lib/utils'` (cn) | `'@/lib/utils'` |
| Peer widget imports | relative `'./text-widget'` |

### apps/web Dependencies
All rjsf/dnd-kit/radix-ui/tabler deps in `apps/web` (not in shared packages) since registry files live there and Next.js builds need them locally.

## Implementation Sequence

1. **Root scaffold**: `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `.gitignore`, `.prettierrc`
2. **packages/typescript-config**: `base.json`, `nextjs.json`, `react-library.json`, `package.json`
3. **packages/eslint-config**: `base.ts`, `react-internal.ts`, `next.ts`, `package.json`
4. **apps/web shell**: `package.json`, `next.config.ts`, `tsconfig.json`, `app/layout.tsx`, `app/globals.css`
5. **`pnpm install`** at root
6. **`apps/web/lib/utils.ts`**: `cn` utility
7. **Port `registry/form-builder-types/`**: Copy from `src/types/index.ts` + `src/utils/` — fix relative imports
8. **Port `registry/form-renderer/`**: Copy from `src/renderer/` — fix import paths to use aliases
9. **Port `registry/form-builder/`**: Copy from `src/builder/` — fix import paths to use aliases
10. **`apps/web/registry.json`**: Write full manifest with all 3 items
11. **`apps/web/lib/registry.ts`** + **`apps/web/app/r/[name]/route.ts`**: Registry server
12. **Docs pages**: Landing + 3 component doc pages with live demos
13. **Verify**: `pnpm dev` → test `curl http://localhost:3000/r/form-renderer.json`

## Critical Reference Files

- `src/types/index.ts` — port first (all other files depend on it)
- `src/renderer/theme/index.ts` — theme composition pattern
- `src/builder/context/builder-context.tsx` — most complex: reducer + context
- `src/global.css` — Tailwind v4 CSS vars to reproduce in `globals.css`
- `src/lib/utils.ts` — the `cn` helper

## Verification

1. `pnpm dev` starts without errors
2. `curl http://localhost:3000/r/form-builder-types.json` returns JSON with `files[].content`
3. `curl http://localhost:3000/r/form-renderer.json` returns all 14 files with content
4. `curl http://localhost:3000/r/form-builder.json` returns all 6 builder files
5. Docs demo pages render `FormRenderer` and `FormBuilder` correctly with live schema
6. TypeScript: `pnpm typecheck` passes in all workspaces
