# Contributing

## Getting started

This is a [pnpm](https://pnpm.io/) + [Turborepo](https://turbo.build/) monorepo. Use pnpm 10 (matches the `packageManager` field in `package.json`).

```sh
pnpm install
pnpm dev   # starts the Next.js app (registry server, docs, playground) at apps/web
```

## Project structure

- `apps/web` — Next.js app that serves the registry, docs, and playground.
- `packages/eslint-config`, `packages/typescript-config` — shared configs.
- `apps/web/registry/<item-name>/` — source for each registry item (e.g. `form-builder-types`, `form-renderer/{fields,widgets,templates}`, `form-builder`).
- `apps/web/registry.json` — the registry manifest; declares each item's files, dependencies, and target paths.

## Adding or editing a registry item

1. Edit files under `apps/web/registry/<item-name>/`.
2. Update the matching entry in `apps/web/registry.json`.
3. Run `pnpm build:registry` to regenerate the static JSON served from `apps/web/public/r/`.

Don't hand-edit files under `apps/web/public/r/` — they're generated. A CI workflow also regenerates and commits them automatically on push when registry-related paths change.

## Before opening a PR

```sh
pnpm lint
pnpm typecheck
pnpm build
pnpm format   # if you touched formatting-sensitive files
```

Use [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, ...) for commit messages, and keep one logical change per PR.
