import { useFormBuilder } from './builder-context';
import type { LocalizedString, FormFieldOption, FormFieldCondition, FormFieldConditionOperator } from '@/lib/form-builder-types/types';
import { FormFieldType, isDisplayField } from '@/lib/form-builder-types/types';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

/** Field types that support minLength/maxLength validation. Extend when adding new string-based types. */
const STRING_LENGTH_TYPES = new Set<string>(['text', 'textarea', 'email', 'tel']);

/** Field types that support min/max validation. Extend when adding new numeric types. */
const NUMBER_RANGE_TYPES = new Set<string>(['number']);

type FieldSettingsPanelProps = {
  locale: string;
  availableLocales?: string[];
};

const LocalizedInput = ({
  value,
  locale,
  availableLocales,
  onChange,
  placeholder,
}: {
  value: LocalizedString | undefined;
  locale: string;
  availableLocales?: string[];
  onChange: (value: LocalizedString) => void;
  placeholder?: string;
}) => {
  const locales = availableLocales ?? [locale];
  const current: Record<string, string> = typeof value === 'string' ? { [locale]: value } : (value ?? {});

  return (
    <div className="space-y-1">
      {locales.map((loc) => (
        <div key={loc} className="flex items-center gap-2">
          <span className="text-sidebar-foreground/50 w-12 shrink-0 text-xs">{loc}</span>
          <Input
            value={current[loc] ?? ''}
            placeholder={placeholder}
            onChange={(e) => onChange({ ...current, [loc]: e.target.value })}
          />
        </div>
      ))}
    </div>
  );
};

const OptionsEditor = ({
  options,
  locale,
  availableLocales,
  onChange,
}: {
  options: FormFieldOption[];
  locale: string;
  availableLocales?: string[];
  onChange: (options: FormFieldOption[]) => void;
}) => {
  const addOption = () => {
    onChange([
      ...options,
      { value: `option_${options.length + 1}`, label: { [locale]: `Option ${options.length + 1}` } },
    ]);
  };

  const removeOption = (index: number) => {
    onChange(options.filter((_, i) => i !== index));
  };

  const updateOption = (index: number, updates: Partial<FormFieldOption>) => {
    onChange(options.map((opt, i) => (i === index ? { ...opt, ...updates } : opt)));
  };

  return (
    <div className="space-y-2">
      {options.map((opt, i) => (
        <div key={i} className="border-sidebar-border bg-background/50 rounded-md border p-2">
          <div className="mb-1 flex items-center gap-2">
            <Input
              value={opt.value}
              placeholder="Value"
              onChange={(e) => updateOption(i, { value: e.target.value })}
            />
            <button
              type="button"
              className="text-destructive shrink-0 text-xs hover:underline"
              onClick={() => removeOption(i)}
            >
              ✕
            </button>
          </div>
          <LocalizedInput
            value={opt.label}
            locale={locale}
            availableLocales={availableLocales}
            onChange={(label) => updateOption(i, { label })}
            placeholder="Label"
          />
        </div>
      ))}
      <button
        type="button"
        className="border-sidebar-border text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full rounded-md border border-dashed px-2 py-1 text-xs transition-colors"
        onClick={addOption}
      >
        + Add Option
      </button>
    </div>
  );
};

const OPERATORS: { value: FormFieldConditionOperator; label: string; hasValue: boolean }[] = [
  { value: 'eq',       label: 'equals',         hasValue: true  },
  { value: 'neq',      label: 'not equals',     hasValue: true  },
  { value: 'gt',       label: 'greater than',   hasValue: true  },
  { value: 'lt',       label: 'less than',      hasValue: true  },
  { value: 'contains', label: 'contains',       hasValue: true  },
  { value: 'empty',    label: 'is empty',       hasValue: false },
  { value: 'notEmpty', label: 'is not empty',   hasValue: false },
];

const ConditionEditor = ({
  condition,
  currentFieldId,
  onChange,
}: {
  condition: FormFieldCondition | undefined;
  currentFieldId: string;
  onChange: (condition: FormFieldCondition | undefined) => void;
}) => {
  const { state } = useFormBuilder();

  // All input fields except the current one (can't condition on itself or display fields)
  const watchableFields = state.schema.fields.filter(
    (f) => f.id !== currentFieldId && !isDisplayField(f.type),
  );

  const enabled = condition !== undefined;
  const operator = condition?.operator ?? 'eq';
  const needsValue = OPERATORS.find((o) => o.value === operator)?.hasValue ?? true;

  const toggle = () => {
    if (enabled) {
      onChange(undefined);
    } else {
      const firstField = watchableFields[0];
      if (firstField) {
        onChange({ field: firstField.id, operator: 'eq', value: '' });
      }
    }
  };

  const update = (patch: Partial<FormFieldCondition>) => {
    if (!condition) return;
    onChange({ ...condition, ...patch });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Checkbox id="condition-enabled" checked={enabled} onCheckedChange={toggle} />
        <label htmlFor="condition-enabled" className="text-xs">
          Show only when…
        </label>
      </div>

      {enabled && (
        <div className="border-sidebar-border space-y-2 rounded-md border p-2">
          {watchableFields.length === 0 ? (
            <p className="text-sidebar-foreground/50 text-xs">
              No other input fields to condition on.
            </p>
          ) : (
            <>
              {/* Field selector */}
              <Select
                value={condition?.field ?? ''}
                onValueChange={(v) => update({ field: v })}
              >
                <SelectTrigger className="w-full text-xs">
                  <SelectValue placeholder="Select field…" />
                </SelectTrigger>
                <SelectContent>
                  {watchableFields.map((f) => {
                    const label =
                      typeof f.label === 'string'
                        ? f.label
                        : Object.values(f.label)[0] ?? f.id;
                    return (
                      <SelectItem key={f.id} value={f.id}>
                        {label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              {/* Operator selector */}
              <Select
                value={operator}
                onValueChange={(v) => update({ operator: v as FormFieldConditionOperator, value: undefined })}
              >
                <SelectTrigger className="w-full text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {OPERATORS.map((op) => (
                    <SelectItem key={op.value} value={op.value}>
                      {op.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Value input (hidden for empty / notEmpty) */}
              {needsValue && (
                <Input
                  placeholder="Value…"
                  value={condition?.value !== undefined ? String(condition.value) : ''}
                  onChange={(e) => update({ value: e.target.value })}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export const FieldSettingsPanel = ({ locale, availableLocales }: FieldSettingsPanelProps) => {
  const { selectedField, updateField } = useFormBuilder();

  if (!selectedField) {
    return (
      <div className="bg-sidebar text-sidebar-foreground/60 border-sidebar-border w-64 shrink-0 border-l p-4 text-center text-sm">
        Select a field to edit its properties
      </div>
    );
  }

  const hasOptions = selectedField.type === FormFieldType.SELECT || selectedField.type === FormFieldType.RADIO;
  const isDisplay = isDisplayField(selectedField.type);

  return (
    <div className="bg-sidebar text-sidebar-foreground border-sidebar-border w-64 shrink-0 space-y-4 overflow-y-auto border-l p-3">
      <h3 className="text-sidebar-foreground/60 px-1 text-xs font-semibold uppercase tracking-wider">Field Settings</h3>

      <div>
        <label className="mb-1 block text-xs font-medium">Type</label>
        <Select
          value={selectedField.type}
          onValueChange={(v) => updateField(selectedField.id, { type: v as FormFieldType })}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(FormFieldType).map(([key, value]) => (
              <SelectItem key={value} value={value}>
                {key}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium">
          {selectedField.type === FormFieldType.PARAGRAPH ? 'Text' : 'Label'}
        </label>
        <LocalizedInput
          value={selectedField.label}
          locale={locale}
          availableLocales={availableLocales}
          onChange={(label) => updateField(selectedField.id, { label })}
        />
      </div>

      {!isDisplay && (
        <div>
          <label className="mb-1 block text-xs font-medium">Placeholder</label>
          <LocalizedInput
            value={selectedField.placeholder}
            locale={locale}
            availableLocales={availableLocales}
            onChange={(placeholder) => updateField(selectedField.id, { placeholder })}
          />
        </div>
      )}

      {selectedField.type === FormFieldType.HEADING && (
        <div>
          <label className="mb-1 block text-xs font-medium">Description</label>
          <LocalizedInput
            value={selectedField.description}
            locale={locale}
            availableLocales={availableLocales}
            onChange={(description) => updateField(selectedField.id, { description })}
            placeholder="Optional subtitle"
          />
        </div>
      )}

      {!isDisplay && (
        <div className="flex items-center gap-2">
          <Checkbox
            id="field-required"
            checked={selectedField.required ?? false}
            onCheckedChange={(checked) => updateField(selectedField.id, { required: checked === true })}
          />
          <label htmlFor="field-required" className="text-sm">
            Required
          </label>
        </div>
      )}

      {hasOptions && (
        <div>
          <label className="mb-1 block text-xs font-medium">Options</label>
          <OptionsEditor
            options={selectedField.options ?? []}
            locale={locale}
            availableLocales={availableLocales}
            onChange={(options) => updateField(selectedField.id, { options })}
          />
        </div>
      )}

      {!isDisplay && (
        <div>
          <label className="mb-1 block text-xs font-medium">Validation</label>
          <div className="space-y-2">
            {STRING_LENGTH_TYPES.has(selectedField.type) && (
              <>
                <div className="flex items-center gap-2">
                  <span className="w-20 shrink-0 text-xs">Min Length</span>
                  <Input
                    type="number"
                    value={selectedField.validation?.minLength ?? ''}
                    onChange={(e) =>
                      updateField(selectedField.id, {
                        validation: {
                          ...selectedField.validation,
                          minLength: e.target.value ? Number(e.target.value) : undefined,
                        },
                      })
                    }
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-20 shrink-0 text-xs">Max Length</span>
                  <Input
                    type="number"
                    value={selectedField.validation?.maxLength ?? ''}
                    onChange={(e) =>
                      updateField(selectedField.id, {
                        validation: {
                          ...selectedField.validation,
                          maxLength: e.target.value ? Number(e.target.value) : undefined,
                        },
                      })
                    }
                  />
                </div>
              </>
            )}
            {NUMBER_RANGE_TYPES.has(selectedField.type) && (
              <>
                <div className="flex items-center gap-2">
                  <span className="w-20 shrink-0 text-xs">Min</span>
                  <Input
                    type="number"
                    value={selectedField.validation?.min ?? ''}
                    onChange={(e) =>
                      updateField(selectedField.id, {
                        validation: {
                          ...selectedField.validation,
                          min: e.target.value ? Number(e.target.value) : undefined,
                        },
                      })
                    }
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-20 shrink-0 text-xs">Max</span>
                  <Input
                    type="number"
                    value={selectedField.validation?.max ?? ''}
                    onChange={(e) =>
                      updateField(selectedField.id, {
                        validation: {
                          ...selectedField.validation,
                          max: e.target.value ? Number(e.target.value) : undefined,
                        },
                      })
                    }
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {!isDisplay && (
        <div>
          <label className="mb-1 block text-xs font-medium">Condition</label>
          <ConditionEditor
            condition={selectedField.condition}
            currentFieldId={selectedField.id}
            onChange={(condition) => updateField(selectedField.id, { condition })}
          />
        </div>
      )}
    </div>
  );
};
