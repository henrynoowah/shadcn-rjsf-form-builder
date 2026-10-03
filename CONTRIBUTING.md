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

## Releasing

The registry has one version, shared by all items. `apps/web/changelog.json` is the source of truth: the docs changelog page, the RSS feed, `CHANGELOG.md`, the version comment in every installed file and the GitHub releases are all generated from it.

1. Add a new entry at the **top** of `apps/web/changelog.json` with the version, date, a one-line summary and the changes (`feat`, `fix`, `breaking` or `docs`, plus the affected `items`).
2. Run `pnpm build:registry` to restamp `apps/web/public/r/*.json` and regenerate `CHANGELOG.md`.
3. Merge the PR. The Release workflow creates the `v<version>` tag and GitHub release on the merge commit.

Use [SemVer](https://semver.org/). While we're on `0.x`, bump the minor version for breaking changes or notable features and the patch version for fixes. Changes that don't touch `apps/web/registry/` (site or docs only) don't need a release.

To preview what the workflow will do: `node scripts/release.mjs --dry-run`.

## Before opening a PR

```sh
pnpm lint
pnpm typecheck
pnpm build
pnpm format   # if you touched formatting-sensitive files
```

Use [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, ...) for commit messages, and keep one logical change per PR.
