import CodeBlock from '@/app/_components/code-block';

export default async function SchemaReferencePage() {
  return (
    <div className="space-y-12">
      {/* Page header */}
      <div>
        <h1 className="mb-3 text-2xl font-bold tracking-tight">Schema Reference</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Complete reference for all TypeScript types exported by{' '}
          <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
            form-builder-types
          </code>
          .
        </p>
      </div>

      {/* FormSchema */}
      <section>
        <h2 id="formschema" className="scroll-mt-20 text-xl font-semibold border-b border-border pb-2 mb-4">
          FormSchema
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          The root object passed to{' '}
          <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">FormRenderer</code> and
          emitted by{' '}
          <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">FormBuilder</code>.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border border-border text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2 text-left font-medium">Field</th>
                <th className="px-4 py-2 text-left font-medium">Type</th>
                <th className="px-4 py-2 text-left font-medium">Required</th>
                <th className="px-4 py-2 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">id</code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">string</td>
                <td className="px-4 py-2 text-muted-foreground">Yes</td>
                <td className="px-4 py-2 text-muted-foreground">Unique identifier for the form.</td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">title</code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">LocalizedString</td>
                <td className="px-4 py-2 text-muted-foreground">Yes</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Form heading, displayed above the fields.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
                    description
                  </code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">LocalizedString</td>
                <td className="px-4 py-2 text-muted-foreground">No</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Optional subtitle shown below the title.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">fields</code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">FormFieldDefinition[]</td>
                <td className="px-4 py-2 text-muted-foreground">Yes</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Ordered list of field definitions. Rendered in ascending{' '}
                  <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">order</code>{' '}
                  value.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
                    submitLabel
                  </code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">LocalizedString</td>
                <td className="px-4 py-2 text-muted-foreground">No</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Submit button label. Defaults to "Submit".
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">settings</code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">FormSchemaSettings</td>
                <td className="px-4 py-2 text-muted-foreground">No</td>
                <td className="px-4 py-2 text-muted-foreground">Layout and behavior overrides.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FormFieldDefinition */}
      <section>
        <h2
          id="formfielddefinition"
          className="scroll-mt-20 text-xl font-semibold border-b border-border pb-2 mb-4"
        >
          FormFieldDefinition
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Defines a single field in the form. Each entry in{' '}
          <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
            FormSchema.fields
          </code>{' '}
          conforms to this type.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border border-border text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2 text-left font-medium">Field</th>
                <th className="px-4 py-2 text-left font-medium">Type</th>
                <th className="px-4 py-2 text-left font-medium">Required</th>
                <th className="px-4 py-2 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">id</code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">string</td>
                <td className="px-4 py-2 text-muted-foreground">Yes</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Unique field key. Used as the form data key in the submitted object.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">type</code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">FormFieldType</td>
                <td className="px-4 py-2 text-muted-foreground">Yes</td>
                <td className="px-4 py-2 text-muted-foreground">
                  The widget type. See Field Types below.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">label</code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">LocalizedString</td>
                <td className="px-4 py-2 text-muted-foreground">Yes</td>
                <td className="px-4 py-2 text-muted-foreground">Visible label for the field.</td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">order</code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">number</td>
                <td className="px-4 py-2 text-muted-foreground">Yes</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Sort order. Fields are rendered in ascending order.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
                    placeholder
                  </code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">LocalizedString</td>
                <td className="px-4 py-2 text-muted-foreground">No</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Input placeholder text. Applies to text, email, tel, number, textarea.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
                    description
                  </code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">LocalizedString</td>
                <td className="px-4 py-2 text-muted-foreground">No</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Helper text shown below the input.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">required</code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">boolean</td>
                <td className="px-4 py-2 text-muted-foreground">No</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Marks the field as required. Adds JSON Schema{' '}
                  <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">required</code>{' '}
                  constraint.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
                    defaultValue
                  </code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">unknown</td>
                <td className="px-4 py-2 text-muted-foreground">No</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Initial value pre-filled in the form.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">options</code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">FormFieldOption[]</td>
                <td className="px-4 py-2 text-muted-foreground">No</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Required for{' '}
                  <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">select</code> and{' '}
                  <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">radio</code>{' '}
                  types.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
                    validation
                  </code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">FormFieldValidation</td>
                <td className="px-4 py-2 text-muted-foreground">No</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Validation constraints. See Validation below.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
                    condition
                  </code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">FormFieldCondition</td>
                <td className="px-4 py-2 text-muted-foreground">No</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Conditional display rule. Field is hidden unless the condition passes.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Field Types */}
      <section>
        <h2 id="field-types" className="scroll-mt-20 text-xl font-semibold border-b border-border pb-2 mb-4">
          Field Types
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          All 13 supported field types, their JSON Schema mapping, and notes on behavior.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border border-border text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2 text-left font-medium">Type</th>
                <th className="px-4 py-2 text-left font-medium">Widget</th>
                <th className="px-4 py-2 text-left font-medium">JSON Schema</th>
                <th className="px-4 py-2 text-left font-medium">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">text</code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">Input (text)</td>
                <td className="px-4 py-2 text-muted-foreground">
                  <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">
                    type: "string"
                  </code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">General single-line text input.</td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">number</code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">Input (number)</td>
                <td className="px-4 py-2 text-muted-foreground">
                  <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">
                    type: "number"
                  </code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">
                  Numeric input. Supports{' '}
                  <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">min</code>/
                  <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">max</code>{' '}
                  validation.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">email</code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">Input (email)</td>
                <td className="px-4 py-2 text-muted-foreground">
                  <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">
                    type: "string", format: "email"
                  </code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">
                  Validates email format automatically.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">tel</code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">Input (tel)</td>
                <td className="px-4 py-2 text-muted-foreground">
                  <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">
                    type: "string"
                  </code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">
                  Phone number input with{' '}
                  <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">type="tel"</code>{' '}
                  for mobile keyboards.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">select</code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">Select (dropdown)</td>
                <td className="px-4 py-2 text-muted-foreground">
                  <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">
                    type: "string", enum: [...]
                  </code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">
                  Requires{' '}
                  <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">options</code>.
                  Uses shadcn Select component.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">checkbox</code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">Checkbox</td>
                <td className="px-4 py-2 text-muted-foreground">
                  <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">
                    type: "boolean"
                  </code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">
                  Single boolean toggle. Submits{' '}
                  <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">true</code>/
                  <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">false</code>.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">radio</code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">RadioGroup</td>
                <td className="px-4 py-2 text-muted-foreground">
                  <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">
                    type: "string", enum: [...]
                  </code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">
                  Requires{' '}
                  <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">options</code>.
                  Each option renders as a radio button.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">date</code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">Input (date)</td>
                <td className="px-4 py-2 text-muted-foreground">
                  <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">
                    type: "string", format: "date"
                  </code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">
                  Native date picker. Submits ISO 8601 date string.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">textarea</code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">Textarea</td>
                <td className="px-4 py-2 text-muted-foreground">
                  <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">
                    type: "string"
                  </code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">
                  Multi-line text. Supports{' '}
                  <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">minLength</code>/
                  <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">maxLength</code>.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">file</code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">Input (file)</td>
                <td className="px-4 py-2 text-muted-foreground">
                  <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">
                    type: "string", format: "data-url"
                  </code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">
                  File picker. Value is a base64 data URL.
                </td>
              </tr>
              <tr className="bg-muted/20">
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">heading</code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">h3 element</td>
                <td className="px-4 py-2 text-muted-foreground">—</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Display only. Does not collect data.
                </td>
              </tr>
              <tr className="bg-muted/20">
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
                    paragraph
                  </code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">p element</td>
                <td className="px-4 py-2 text-muted-foreground">—</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Display only. Renders{' '}
                  <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">label</code> as a
                  paragraph.
                </td>
              </tr>
              <tr className="bg-muted/20">
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
                    separator
                  </code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">hr / Separator</td>
                <td className="px-4 py-2 text-muted-foreground">—</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Display only. Visual divider between form sections.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Rows with a grey background are display-only fields — they are excluded from the submitted
          form data.
        </p>
      </section>

      {/* LocalizedString */}
      <section>
        <h2 id="localizedstring" className="scroll-mt-20 text-xl font-semibold border-b border-border pb-2 mb-4">
          LocalizedString
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">LocalizedString</code>{' '}
          is{' '}
          <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
            string | Record&lt;string, string&gt;
          </code>
          . Use a plain string for single-language forms; use a locale map for multi-language forms.
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

      {/* Validation */}
      <section>
        <h2 id="validation" className="scroll-mt-20 text-xl font-semibold border-b border-border pb-2 mb-4">
          Validation
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          The <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">validation</code>{' '}
          field accepts a{' '}
          <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
            FormFieldValidation
          </code>{' '}
          object.
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-border text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2 text-left font-medium">Field</th>
                <th className="px-4 py-2 text-left font-medium">Type</th>
                <th className="px-4 py-2 text-left font-medium">Applies to</th>
                <th className="px-4 py-2 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
                    minLength
                  </code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">number</td>
                <td className="px-4 py-2 text-muted-foreground">text, email, tel, textarea</td>
                <td className="px-4 py-2 text-muted-foreground">Minimum character count.</td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
                    maxLength
                  </code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">number</td>
                <td className="px-4 py-2 text-muted-foreground">text, email, tel, textarea</td>
                <td className="px-4 py-2 text-muted-foreground">Maximum character count.</td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">min</code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">number</td>
                <td className="px-4 py-2 text-muted-foreground">number</td>
                <td className="px-4 py-2 text-muted-foreground">Minimum numeric value.</td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">max</code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">number</td>
                <td className="px-4 py-2 text-muted-foreground">number</td>
                <td className="px-4 py-2 text-muted-foreground">Maximum numeric value.</td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">pattern</code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">string</td>
                <td className="px-4 py-2 text-muted-foreground">text, tel</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Regex pattern the value must match.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
                    customRule
                  </code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">string</td>
                <td className="px-4 py-2 text-muted-foreground">all input types</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Key referencing a validator registered via{' '}
                  <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">
                    registerValidator
                  </code>
                  .
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Custom validators
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          Register a validator once (at app startup) and reference it by key in any field's{' '}
          <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
            validation.customRule
          </code>
          .
        </p>
        <CodeBlock
          code={`import { registerValidator, createCustomValidator } from '@/lib/form-builder-types/validation';

// Register once (e.g. in a layout or provider)
registerValidator('no-profanity', (value) => {
  if (typeof value === 'string' && value.includes('badword')) {
    return 'Please keep it respectful.';
  }
});

// Pass the validator to FormRenderer
<FormRenderer
  schema={schema}
  customValidate={createCustomValidator(schema)}
/>`}
        />
      </section>

      {/* Conditions */}
      <section>
        <h2 id="conditions" className="scroll-mt-20 text-xl font-semibold border-b border-border pb-2 mb-4">
          Conditions
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Set <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">condition</code> on
          a field to make it conditionally visible based on another field's current value.
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
        <div className="overflow-x-auto">
          <table className="w-full border border-border text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2 text-left font-medium">Operator</th>
                <th className="px-4 py-2 text-left font-medium">Description</th>
                <th className="px-4 py-2 text-left font-medium">value required?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">eq</code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">
                  Strict equality (
                  <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">===</code>)
                </td>
                <td className="px-4 py-2 text-muted-foreground">Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">neq</code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">
                  Strict inequality (
                  <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">!==</code>)
                </td>
                <td className="px-4 py-2 text-muted-foreground">Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">gt</code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">
                  Greater than. Numeric comparison.
                </td>
                <td className="px-4 py-2 text-muted-foreground">Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">lt</code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">Less than. Numeric comparison.</td>
                <td className="px-4 py-2 text-muted-foreground">Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">contains</code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">String includes the value.</td>
                <td className="px-4 py-2 text-muted-foreground">Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">empty</code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">
                  Field value is empty, null, or undefined.
                </td>
                <td className="px-4 py-2 text-muted-foreground">No</td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">notEmpty</code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">Field value is not empty.</td>
                <td className="px-4 py-2 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Settings */}
      <section>
        <h2 id="settings" className="scroll-mt-20 text-xl font-semibold border-b border-border pb-2 mb-4">
          Settings
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
            FormSchemaSettings
          </code>{' '}
          is an optional object on the root{' '}
          <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">FormSchema</code>.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border border-border text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2 text-left font-medium">Field</th>
                <th className="px-4 py-2 text-left font-medium">Type</th>
                <th className="px-4 py-2 text-left font-medium">Default</th>
                <th className="px-4 py-2 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">layout</code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">"vertical" | "horizontal"</td>
                <td className="px-4 py-2 text-muted-foreground">"vertical"</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Controls label position relative to the input.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
                    showProgressBar
                  </code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">boolean</td>
                <td className="px-4 py-2 text-muted-foreground">false</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Displays a progress bar indicating form completion percentage.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
                    successMessage
                  </code>
                </td>
                <td className="px-4 py-2 text-muted-foreground">LocalizedString</td>
                <td className="px-4 py-2 text-muted-foreground">—</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Message shown after successful submission (if provided).
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
