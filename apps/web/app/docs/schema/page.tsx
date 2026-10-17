import CodeBlock from '@/app/_components/code-block';
import { Code, DocTable, H2, PropsTable, type PropRow } from '@/app/docs/_components/doc';

const FORM_SCHEMA_FIELDS: PropRow[] = [
  { name: 'id', type: 'string', required: true, description: 'Unique identifier for the form.' },
  {
    name: 'title',
    type: 'LocalizedString',
    required: true,
    description: 'Form heading, displayed above the fields.',
  },
  { name: 'description', type: 'LocalizedString', description: 'Optional subtitle shown below the title.' },
  {
    name: 'fields',
    type: 'FormFieldDefinition[]',
    required: true,
    description: (
      <>
        Ordered list of field definitions. Rendered in ascending <Code>order</Code> value.
      </>
    ),
  },
  { name: 'submitLabel', type: 'LocalizedString', description: 'Submit button label. Defaults to "Submit".' },
  { name: 'settings', type: 'FormSchemaSettings', description: 'Layout and behavior overrides.' },
];

const FIELD_DEFINITION_FIELDS: PropRow[] = [
  {
    name: 'id',
    type: 'string',
    required: true,
    description: (
      <>
        Internal identifier for the field (used for selection/reordering in the builder). Falls back to this
        as the form data key when <Code>key</Code> is not set.
      </>
    ),
  },
  {
    name: 'key',
    type: 'string',
    description:
      'Stable, human-readable property name used as the form data key in the submitted object and JSON Schema. Not applicable to display-only fields (heading, paragraph, separator, pagebreak).',
  },
  { name: 'type', type: 'FormFieldType', required: true, description: 'The widget type. See Field Types below.' },
  { name: 'label', type: 'LocalizedString', required: true, description: 'Visible label for the field.' },
  {
    name: 'order',
    type: 'number',
    required: true,
    description: 'Sort order. Fields are rendered in ascending order.',
  },
  {
    name: 'placeholder',
    type: 'LocalizedString',
    description: 'Input placeholder text. Applies to text, email, tel, number, textarea.',
  },
  { name: 'description', type: 'LocalizedString', description: 'Helper text shown below the input.' },
  {
    name: 'required',
    type: 'boolean',
    description: (
      <>
        Marks the field as required. Adds JSON Schema <Code>required</Code> constraint.
      </>
    ),
  },
  { name: 'defaultValue', type: 'unknown', description: 'Initial value pre-filled in the form.' },
  {
    name: 'options',
    type: 'FormFieldOption[]',
    description: (
      <>
        Required for <Code>select</Code> and <Code>radio</Code> types.
      </>
    ),
  },
  {
    name: 'validation',
    type: 'FormFieldValidation',
    description: 'Validation constraints. See Validation below.',
  },
  {
    name: 'condition',
    type: 'FormFieldCondition',
    description: 'Conditional display rule. Field is hidden unless the condition passes.',
  },
];

const INPUT_FIELD_TYPES: React.ReactNode[][] = [
  [<Code>text</Code>, 'Input (text)', <Code>type: "string"</Code>, 'General single-line text input.'],
  [
    <Code>number</Code>,
    'Input (number)',
    <Code>type: "number"</Code>,
    <>
      Numeric input. Supports <Code>min</Code>/<Code>max</Code> validation.
    </>,
  ],
  [
    <Code>email</Code>,
    'Input (email)',
    <Code>type: "string", format: "email"</Code>,
    'Validates email format automatically.',
  ],
  [
    <Code>tel</Code>,
    'Input (tel)',
    <Code>type: "string"</Code>,
    <>
      Phone number input with <Code>type="tel"</Code> for mobile keyboards.
    </>,
  ],
  [
    <Code>select</Code>,
    'Select (dropdown)',
    <Code>type: "string", enum: [...]</Code>,
    <>
      Requires <Code>options</Code>. Uses shadcn Select component.
    </>,
  ],
  [
    <Code>checkbox</Code>,
    'Checkbox',
    <Code>type: "boolean"</Code>,
    <>
      Single boolean toggle. Submits <Code>true</Code>/<Code>false</Code>.
    </>,
  ],
  [
    <Code>radio</Code>,
    'RadioGroup',
    <Code>type: "string", enum: [...]</Code>,
    <>
      Requires <Code>options</Code>. Each option renders as a radio button.
    </>,
  ],
  [
    <Code>date</Code>,
    'Input (date)',
    <Code>type: "string", format: "date"</Code>,
    'Native date picker. Submits ISO 8601 date string.',
  ],
  [
    <Code>textarea</Code>,
    'Textarea',
    <Code>type: "string"</Code>,
    <>
      Multi-line text. Supports <Code>minLength</Code>/<Code>maxLength</Code>.
    </>,
  ],
  [
    <Code>file</Code>,
    'Input (file)',
    <Code>type: "string", format: "data-url"</Code>,
    'File picker. Value is a base64 data URL.',
  ],
];

const VALIDATION_FIELDS: React.ReactNode[][] = [
  [<Code>minLength</Code>, 'number', 'text, email, tel, textarea', 'Minimum character count.'],
  [<Code>maxLength</Code>, 'number', 'text, email, tel, textarea', 'Maximum character count.'],
  [<Code>min</Code>, 'number', 'number', 'Minimum numeric value.'],
  [<Code>max</Code>, 'number', 'number', 'Maximum numeric value.'],
  [<Code>pattern</Code>, 'string', 'text, tel', 'Regex pattern the value must match.'],
  [
    <Code>customRule</Code>,
    'string',
    'all input types',
    <>
      Key referencing a validator registered via <Code>registerValidator</Code>.
    </>,
  ],
];

const CONDITION_OPERATORS: React.ReactNode[][] = [
  [
    <Code>eq</Code>,
    <>
      Strict equality (<Code>===</Code>)
    </>,
    'Yes',
  ],
  [
    <Code>neq</Code>,
    <>
      Strict inequality (<Code>!==</Code>)
    </>,
    'Yes',
  ],
  [<Code>gt</Code>, 'Greater than. Numeric comparison.', 'Yes'],
  [<Code>lt</Code>, 'Less than. Numeric comparison.', 'Yes'],
  [<Code>contains</Code>, 'String includes the value.', 'Yes'],
  [<Code>empty</Code>, 'Field value is empty, null, or undefined.', 'No'],
  [<Code>notEmpty</Code>, 'Field value is not empty.', 'No'],
];

const Planned = ({ children }: { children: React.ReactNode }) => (
  <>
    <Code>{children}</Code>
    <span className="ml-1.5 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
      planned
    </span>
  </>
);

const SETTINGS_FIELDS: React.ReactNode[][] = [
  [
    <Planned>layout</Planned>,
    '"vertical" | "horizontal"',
    '"vertical"',
    'Controls label position relative to the input.',
  ],
  [
    <Code>showProgressBar</Code>,
    'boolean',
    'false',
    'Multi-page forms only. Shows a progress bar under the page counter.',
  ],
  [<Code>nextLabel</Code>, 'LocalizedString', '"Next"', 'Multi-page forms only. Label of the button that goes to the next page.'],
  [<Code>backLabel</Code>, 'LocalizedString', '"Back"', 'Multi-page forms only. Label of the button that goes to the previous page.'],
  [
    <Planned>successMessage</Planned>,
    'LocalizedString',
    '—',
    'Message shown after successful submission (if provided).',
  ],
];

export default async function SchemaReferencePage() {
  return (
    <div className="space-y-12">
      {/* Page header */}
      <div>
        <h1 className="mb-3 text-2xl font-bold tracking-tight">Schema Reference</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Complete reference for all TypeScript types exported by <Code>form-builder-types</Code>.
        </p>
      </div>

      <section>
        <H2 id="formschema">FormSchema</H2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          The root object passed to <Code>FormRenderer</Code> and emitted by <Code>FormBuilder</Code>.
        </p>
        <PropsTable firstColumn="Field" rows={FORM_SCHEMA_FIELDS} />
      </section>

      <section>
        <H2 id="formfielddefinition">FormFieldDefinition</H2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Defines a single field in the form. Each entry in <Code>FormSchema.fields</Code> conforms to this
          type.
        </p>
        <PropsTable firstColumn="Field" rows={FIELD_DEFINITION_FIELDS} />
      </section>

      <section>
        <H2 id="field-types">Field Types</H2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          The 10 input types, their JSON Schema mapping, and notes on behavior.
        </p>
        <DocTable columns={['Type', 'Widget', 'JSON Schema', 'Notes']} rows={INPUT_FIELD_TYPES} />
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          Display fields — <Code>heading</Code>, <Code>paragraph</Code> and <Code>separator</Code> — render a
          heading, a paragraph (from <Code>label</Code>) and a divider. They collect no data and are excluded
          from submitted form data. <Code>pagebreak</Code> is a layout field that starts a new page; see{' '}
          <a href="#pages" className="text-foreground underline underline-offset-4">
            Pages
          </a>
          .
        </p>
      </section>

      <section>
        <H2 id="localizedstring">LocalizedString</H2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          <Code>LocalizedString</Code> is <Code>string | Record&lt;string, string&gt;</Code>. Use a plain
          string for single-language forms; use a locale map for multi-language forms.
        </p>
        <CodeBlock
          code={`// Plain string — always displayed as-is
label: "Full Name"

// Locale map — resolved at render time using the locale prop
label: { "en-US": "Full Name", "ko-KR": "이름", "ja-JP": "氏名" }`}
        />
        <p className="text-sm text-muted-foreground leading-relaxed">
          Resolution order: <strong className="text-foreground">active locale</strong> →{' '}
          <strong className="text-foreground">baseLocale</strong> → first available key → empty
          string.
        </p>
      </section>

      <section>
        <H2 id="validation">Validation</H2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          The <Code>validation</Code> field accepts a <Code>FormFieldValidation</Code> object.
        </p>
        <div className="mb-4">
          <DocTable columns={['Field', 'Type', 'Applies to', 'Description']} rows={VALIDATION_FIELDS} />
        </div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Custom validators
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          Register a validator once (at app startup) and reference it by key in any field's{' '}
          <Code>validation.customRule</Code>.
        </p>
        <CodeBlock
          code={`import { registerValidator } from '@/lib/form-builder-types/validation';

// Register once (e.g. in a layout or provider)
registerValidator('no-profanity', (value) => {
  if (typeof value === 'string' && value.includes('badword')) {
    return 'Please keep it respectful.';
  }
});

// FormRenderer runs registered validators automatically for any field with
// validation: { customRule: 'no-profanity' }.
// For one-off checks, pass an RJSF customValidate function as well:
<FormRenderer
  schema={schema}
  locale="en-US"
  customValidate={(formData, errors) => errors}
/>`}
        />
      </section>

      <section>
        <H2 id="conditions">Conditions</H2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Set <Code>condition</Code> on a field to make it conditionally visible based on another field's
          current value.
        </p>
        <CodeBlock
          lang="ts"
          code={`// Show "otherDetails" only when "topic" equals "other"
{
  id: 'otherDetails',
  type: 'textarea',
  label: 'Please describe',
  order: 5,
  condition: {
    field: 'topic',   // the field id to watch
    operator: 'eq',
    value: 'other',
  }
}`}
        />
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Operators
        </p>
        <DocTable columns={['Operator', 'Description', 'value required?']} rows={CONDITION_OPERATORS} />
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          Values of hidden fields are left out of the data passed to <Code>onChange</Code> and{' '}
          <Code>onSubmit</Code>. Conditions can chain: if a field depends on one that is hidden, it is hidden
          too. When a field is shown again, the value the user typed earlier comes back.
        </p>
      </section>

      <section>
        <H2 id="pages">Pages</H2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Add a <Code>pagebreak</Code> field to split a long form into pages. Fields before the first break form
          page 1, and each break starts the next page. The break&apos;s <Code>label</Code> and{' '}
          <Code>description</Code> become that page&apos;s title and subtitle; an empty label falls back to the
          form title.
        </p>
        <CodeBlock
          lang="ts"
          code={`fields: [
  { id: 'name',  key: 'name',  type: 'text',  label: 'Name',  required: true, order: 0 },
  { id: 'p2',    type: 'pagebreak', label: 'Contact', order: 1 },
  { id: 'email', key: 'email', type: 'email', label: 'Email', required: true, order: 2 },
],
settings: { showProgressBar: true }`}
        />
        <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground leading-relaxed">
          <li>
            Next validates only the current page. Back never validates, and values are kept when moving between
            pages.
          </li>
          <li>
            On submit, every visible field is validated again. If a field on an earlier page fails (for example,
            a condition made it required after that page was passed), the form goes back to that page and shows
            the error.
          </li>
          <li>
            Submitted data stays flat — pages don&apos;t nest it. <Code>toJsonSchema</Code> and{' '}
            <Code>toUiSchema</Code> skip page breaks, so the JSON Schema of a paged form is the same as without
            pages.
          </li>
          <li>Pages left empty, for example because every field on them is hidden by a condition, are skipped.</li>
        </ul>
      </section>

      <section>
        <H2 id="settings">Settings</H2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          <Code>FormSchemaSettings</Code> is an optional object on the root <Code>FormSchema</Code>. Fields
          marked <em>planned</em> are part of the type, but <Code>FormRenderer</Code> does not act on them yet.
          Track progress in the{' '}
          <a href="/docs/changelog" className="text-foreground underline underline-offset-4">
            changelog
          </a>
          .
        </p>
        <DocTable columns={['Field', 'Type', 'Default', 'Description']} rows={SETTINGS_FIELDS} />
      </section>
    </div>
  );
}
