import { useMemo } from 'react';
import { withTheme } from '@rjsf/core';
import type { ThemeProps } from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import type { IChangeEvent } from '@rjsf/core';
import type { FormSchema } from '@/registry/form-builder-types/types';
import { toJsonSchema, toUiSchema } from '@/registry/form-builder-types/schema-builder';
import { localizeString } from '@/registry/form-builder-types/i18n';
import { formBuilderTheme } from './theme';

export type FormRendererProps = {
  schema: FormSchema;
  locale: string;
  baseLocale?: string;
  formData?: Record<string, unknown>;
  onChange?: (data: Record<string, unknown>) => void;
  onSubmit?: (data: Record<string, unknown>) => void;
  onError?: (errors: unknown[]) => void;
  className?: string;
  disabled?: boolean;
  /** Override individual widgets, fields, or templates. Merged on top of the default shadcn theme. */
  theme?: Partial<ThemeProps>;
  /** Replace the submit button with a custom element */
  submitButton?: React.ReactNode;
};

export const FormRenderer: React.FC<FormRendererProps> = ({
  schema,
  locale,
  baseLocale,
  formData,
  onChange,
  onSubmit,
  onError,
  className,
  disabled,
  theme: themeOverride,
  submitButton,
}) => {
  const jsonSchema = useMemo(() => toJsonSchema(schema, locale, baseLocale), [schema, locale, baseLocale]);
  const uiSchema = useMemo(() => toUiSchema(schema, locale, baseLocale), [schema, locale, baseLocale]);
  const submitLabel = localizeString(schema.submitLabel, locale, baseLocale) || 'Submit';

  const mergedTheme = useMemo<ThemeProps>(() => {
    if (!themeOverride) return formBuilderTheme;
    return {
      widgets: { ...formBuilderTheme.widgets, ...themeOverride.widgets },
      fields: { ...formBuilderTheme.fields, ...themeOverride.fields },
      templates: { ...formBuilderTheme.templates, ...themeOverride.templates },
    };
  }, [themeOverride]);

  const ThemedForm = useMemo(() => withTheme(mergedTheme), [mergedTheme]);

  return (
    <div className={className} data-testid="form-renderer">
      <ThemedForm
        schema={jsonSchema}
        uiSchema={uiSchema}
        validator={validator}
        formData={formData}
        disabled={disabled}
        onChange={(e: IChangeEvent) => onChange?.(e.formData)}
        onSubmit={(e: IChangeEvent) => onSubmit?.(e.formData)}
        onError={(errors: unknown[]) => onError?.(errors)}
      >
        {submitButton ?? (
          <button
            type="submit"
            disabled={disabled}
            className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring mt-4 inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
          >
            {submitLabel}
          </button>
        )}
      </ThemedForm>
    </div>
  );
};
