import CodeBlock from '@/app/_components/code-block';
import { Code, H2, PropsTable, type PropRow } from '../_components/doc';

const RENDERER_PROPS: PropRow[] = [
  { name: 'schema', type: 'FormSchema', required: true, description: 'The form definition to render.' },
  { name: 'locale', type: 'string', required: true, description: 'Active locale used to resolve LocalizedString values.' },
  { name: 'baseLocale', type: 'string', description: 'Fallback locale when a string has no translation for locale.' },
  {
    name: 'formData',
    type: 'Record<string, unknown>',
    description: 'Controlled form data. When omitted, the renderer keeps its own state.',
  },
  {
    name: 'onChange',
    type: '(data) => void',
    description: (
      <>
        Called on every change. Values of fields hidden by a <Code>condition</Code> are left out.
      </>
    ),
  },
  {
    name: 'onSubmit',
    type: '(data) => void',
    description: 'Called with valid data on submit. Hidden fields are left out here too.',
  },
  { name: 'onError', type: '(errors) => void', description: 'Called when submit fails validation.' },
  {
    name: 'customValidate',
    type: 'CustomValidator',
    description: (
      <>
        Extra RJSF validation, run after validators registered with <Code>registerValidator</Code>. Those run
        automatically and need no prop.
      </>
    ),
  },
  {
    name: 'theme',
    type: 'Partial<ThemeProps>',
    description: (
      <>
        Override individual widgets, fields or templates. Define it outside the component or wrap it in{' '}
        <Code>useMemo</Code>: a new object on every render remounts the form.
      </>
    ),
  },
  { name: 'submitButton', type: 'ReactNode', description: 'Replaces the default submit button.' },
  { name: 'disabled', type: 'boolean', description: 'Disables every input and the submit button.' },
  { name: 'className', type: 'string', description: 'Class name for the wrapper element.' },
];

const BUILDER_PROPS: PropRow[] = [
  { name: 'locale', type: 'string', required: true, description: 'Locale used to display labels in the builder.' },
  {
    name: 'baseLocale',
    type: 'string',
    description: 'Fallback locale for display. New field and option labels are created under it (or under locale if omitted).',
  },
  {
    name: 'availableLocales',
    type: 'string[]',
    description: 'Locales shown as separate inputs when editing labels. Defaults to [locale].',
  },
  { name: 'initialSchema', type: 'FormSchema', description: 'Starting schema. Read once on mount.' },
  { name: 'onChange', type: '(schema: FormSchema) => void', description: 'Called with the updated schema after every edit.' },
  { name: 'className', type: 'string', description: 'Class name for the builder container. Give it a height.' },
];

const VALIDATION_HELPERS: PropRow[] = [
  {
    name: 'registerValidator',
    type: '(key, fn) => void',
    description: (
      <>
        Registers a named rule. <Code>fn(value, formData)</Code> returns an error message or <Code>undefined</Code>.
        Reference it from a field with <Code>validation.customRule</Code>.
      </>
    ),
  },
  { name: 'unregisterValidator', type: '(key) => void', description: 'Removes a registered rule.' },
  {
    name: 'createCustomValidator',
    type: '(schema) => CustomValidator',
    description: 'Builds an RJSF validator that runs the registered rules for a schema. FormRenderer already does this.',
  },
];

const SCHEMA_HELPERS: PropRow[] = [
  {
    name: 'toJsonSchema',
    type: '(schema, locale, baseLocale?) => RJSFSchema',
    description: 'Converts a FormSchema to JSON Schema, for using RJSF or a server-side validator directly.',
  },
  { name: 'toUiSchema', type: '(schema, locale, baseLocale?) => UiSchema', description: 'Builds the matching RJSF uiSchema.' },
  {
    name: 'fieldKey',
    type: '(field) => string',
    description: (
      <>
        The property name a field&apos;s value is stored under: <Code>key</Code>, or <Code>id</Code> if there is no key.
      </>
    ),
  },
  { name: 'evaluateCondition', type: '(condition, data) => boolean', description: 'Evaluates a single field condition.' },
  {
    name: 'getVisibleFields',
    type: '(fields, data) => FormFieldDefinition[]',
    description: 'Fields whose conditions pass. Chained conditions are resolved against visible fields only.',
  },
  {
    name: 'pruneHiddenData',
    type: '(fields, data) => Record<string, unknown>',
    description: 'Returns data without the values of hidden fields, as passed to onSubmit.',
  },
  {
    name: 'localizeText',
    type: '(value, locale?, baseLocale?) => string',
    description: 'Resolves a LocalizedString with the same fallback rules as the components.',
  },
];

export default function ApiReferencePage() {
  return (
    <div className="space-y-12">
      {/* Page header */}
      <div>
        <h1 className="mb-3 text-2xl font-bold tracking-tight">API Reference</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Props for the two components and the helpers exported by{' '}
          <Code>form-builder-types</Code>. <span className="text-destructive">*</span> marks required props.
        </p>
      </div>

      <section>
        <H2 id="formrenderer">FormRenderer</H2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          From <Code>@/components/ui/rjsf-form-builder/form-renderer/form-renderer</Code>.
        </p>
        <PropsTable rows={RENDERER_PROPS} />
      </section>

      <section>
        <H2 id="formbuilder">FormBuilder</H2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          From <Code>@/components/ui/rjsf-form-builder/form-builder/form-builder</Code>.
        </p>
        <PropsTable rows={BUILDER_PROPS} />
      </section>

      <section>
        <H2 id="validation-helpers">Validation helpers</H2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          From <Code>@/lib/form-builder-types/validation</Code>.
        </p>
        <PropsTable rows={VALIDATION_HELPERS} firstColumn="Function" />
        <div className="mt-4">
          <CodeBlock
            code={`import { registerValidator } from '@/lib/form-builder-types/validation';

registerValidator('work-email', (value) =>
  typeof value === 'string' && value.endsWith('@gmail.com')
    ? 'Please use a work email address.'
    : undefined,
);

// In the schema: { id: 'email', type: 'email', validation: { customRule: 'work-email' }, ... }`}
          />
        </div>
      </section>

      <section>
        <H2 id="schema-helpers">Schema helpers</H2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          From <Code>@/lib/form-builder-types/schema-builder</Code>, except <Code>localizeText</Code>, which is in{' '}
          <Code>@/lib/form-builder-types/i18n</Code>.
        </p>
        <PropsTable rows={SCHEMA_HELPERS} firstColumn="Function" />
      </section>
    </div>
  );
}
