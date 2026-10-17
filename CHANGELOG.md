# Changelog

All notable changes to the registry items. Also published at https://shadcn-rjsf-form-builder.noowah.dev/docs/changelog and as GitHub Releases.

<!-- Generated from apps/web/changelog.json by scripts/build-registry.mjs. Do not edit by hand. -->

## [0.3.0](https://github.com/henrynoowah/shadcn-rjsf-form-builder/releases/tag/v0.3.0) - 2026-10-17

Multi-page forms: split long forms with a Page Break field.

### Features

- New `pagebreak` field type. Each one starts a new page, and its label and description become the page title and subtitle. Submitted data stays flat, and `toJsonSchema` / `toUiSchema` skip page breaks. _(form-builder-types, form-renderer, form-builder)_
- `FormRenderer` pages through multi-page forms. Next validates the current page, Back keeps values, and submit validates every visible field again, going back to the first page with an error. `submitButton` is shown on the last page. _(form-renderer)_
- `settings.showProgressBar` is implemented, and `settings.nextLabel` / `settings.backLabel` set the page button labels. _(form-builder-types, form-renderer)_
- New helper `splitIntoPages`. _(form-builder-types)_
- Page Break in a new Layout palette section. The canvas shows page boundaries, and the form settings show page button labels and the progress bar toggle when the form has pages. _(form-builder)_

### Fixes

- Errors that `customValidate` adds to hidden fields no longer block submit. _(form-renderer)_
- The form description is no longer shown a second time below the last field. _(form-renderer)_

**Full diff:** https://github.com/henrynoowah/shadcn-rjsf-form-builder/compare/v0.2.0...v0.3.0

## [0.2.0](https://github.com/henrynoowah/shadcn-rjsf-form-builder/releases/tag/v0.2.0) - 2026-10-03

Correctness fixes for validators, conditional fields and builder locales, plus versioned registry output.

### Features

- `FormRenderer` accepts a `customValidate` prop for one-off validation, run after registered validators. _(form-renderer)_
- New helpers: `fieldKey`, `getVisibleFields` and `pruneHiddenData`. _(form-builder-types)_
- Installed files start with a version comment, and registry items include `meta.version`. _(form-builder-types, form-renderer, form-builder)_

### Fixes

- Custom validators registered with `registerValidator` now run automatically in `FormRenderer` and look up values by field `key` instead of `id`. _(form-builder-types, form-renderer)_
- Values of fields hidden by a condition are left out of `onChange` / `onSubmit` data. Chained conditions are evaluated against visible fields only, and values come back when a field is shown again. _(form-builder-types, form-renderer)_
- `FormBuilder` respects `baseLocale`: new field and option labels are created under it, and labels fall back to it on the canvas and in the condition editor. _(form-builder)_
- Registry dependencies resolve through the site domain instead of raw.githubusercontent.com. _(form-builder-types, form-renderer, form-builder)_

### Docs

- Added an API reference, an Updating guide, this changelog and an RSS feed. Settings that are not implemented yet are now marked as planned.

**Full diff:** https://github.com/henrynoowah/shadcn-rjsf-form-builder/compare/v0.1.0...v0.2.0

## [0.1.0](https://github.com/henrynoowah/shadcn-rjsf-form-builder/releases/tag/v0.1.0) - 2026-08-18

First public release of the three registry items.

### Features

- Initial registry items: `form-builder-types` (types, schema conversion, i18n, validators), `form-renderer` (RJSF renderer with shadcn/ui widgets) and `form-builder` (drag-and-drop builder). _(form-builder-types, form-renderer, form-builder)_
- 13 field types, including display-only `heading`, `paragraph` and `separator`. _(form-builder-types, form-renderer)_
- `LocalizedString` accepts a plain string or a locale-keyed map, with fallback to `baseLocale`. _(form-builder-types)_
- Conditional fields (`eq`, `neq`, `gt`, `lt`, `contains`, `empty`, `notEmpty`) evaluated against live form data, with a condition editor in the builder. _(form-builder-types, form-renderer, form-builder)_
- Optional `key` on fields for stable JSON Schema property names, generated from the label in the builder. _(form-builder-types, form-builder)_
- `registerValidator` / `createCustomValidator` API for named custom validation rules. _(form-builder-types)_
