import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { withTheme } from '@rjsf/core';
import type Form from '@rjsf/core';
import type { ThemeProps } from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import type { IChangeEvent } from '@rjsf/core';
import type { CustomValidator, FormValidation } from '@rjsf/utils';
import type { FormSchema } from '@/lib/form-builder-types/types';
import {
  toJsonSchema,
  toUiSchema,
  getVisibleFields,
  pruneHiddenData,
  splitIntoPages,
  fieldKey,
} from '@/lib/form-builder-types/schema-builder';
import { createCustomValidator } from '@/lib/form-builder-types/validation';
import { localizeString } from '@/lib/form-builder-types/i18n';
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
  /** Replace the submit button with a custom element. On multi-page forms it is shown on the last page. */
  submitButton?: React.ReactNode;
  /** Extra validation, run after any validators registered via `registerValidator`. */
  customValidate?: CustomValidator;
};

const BUTTON_BASE =
  'focus-visible:ring-ring inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50';
const PRIMARY_BUTTON = `bg-primary text-primary-foreground hover:bg-primary/90 ${BUTTON_BASE}`;
const OUTLINE_BUTTON = `border-input bg-background hover:bg-accent hover:text-accent-foreground border ${BUTTON_BASE}`;

/** Keeps errors for the given keys plus root-level errors, so fields on other pages don't block navigation. */
const scopeErrors = (errors: FormValidation, keys: Set<string>): FormValidation =>
  Object.fromEntries(
    Object.entries(errors).filter(([k]) => k === '__errors' || k === 'addError' || keys.has(k)),
  ) as FormValidation;

export const FormRenderer: React.FC<FormRendererProps> = ({
  schema,
  locale,
  baseLocale,
  formData: externalFormData,
  onChange,
  onSubmit,
  onError,
  className,
  disabled,
  theme: themeOverride,
  submitButton,
  customValidate,
}) => {
  // Track live form data so we can evaluate conditions and hide/show fields dynamically.
  const [liveData, setLiveData] = useState<Record<string, unknown>>(externalFormData ?? {});
  // Page position is tied to the schema id so loading a different form starts at page 1.
  const [position, setPosition] = useState({ schemaId: schema.id, index: 0 });
  const formRef = useRef<Form>(null);
  // Set when the final submit sends the user back to a page with errors; that page validates on mount.
  const validateOnMount = useRef(false);

  const visibleSchema = useMemo<FormSchema>(() => ({
    ...schema,
    fields: getVisibleFields(schema.fields, liveData),
  }), [schema, liveData]);

  const pages = useMemo(() => splitIntoPages(visibleSchema.fields), [visibleSchema]);
  const pageIndex = position.schemaId === schema.id ? Math.min(position.index, pages.length - 1) : 0;
  const page = pages[pageIndex]!;
  const isMultiPage = pages.length > 1;
  const isLastPage = pageIndex === pages.length - 1;
  const goToPage = (index: number) => setPosition({ schemaId: schema.id, index });

  // RJSF only sees the current page, so it validates just the fields shown.
  // Pages after a break use the break's label/description; an empty label falls back to the form title.
  const pageSchema = useMemo<FormSchema>(() => {
    if (!isMultiPage) return visibleSchema;
    if (page.title === undefined) return { ...schema, fields: page.fields };
    return {
      ...schema,
      title: localizeString(page.title, locale, baseLocale) ? page.title : schema.title,
      description: page.description,
      fields: page.fields,
    };
  }, [isMultiPage, visibleSchema, schema, page, locale, baseLocale]);

  const jsonSchema = useMemo(() => toJsonSchema(pageSchema, locale, baseLocale), [pageSchema, locale, baseLocale]);
  const uiSchema = useMemo(() => toUiSchema(pageSchema, locale, baseLocale), [pageSchema, locale, baseLocale]);
  const submitLabel = localizeString(schema.submitLabel, locale, baseLocale) || 'Submit';
  const nextLabel = localizeString(schema.settings?.nextLabel, locale, baseLocale) || 'Next';
  const backLabel = localizeString(schema.settings?.backLabel, locale, baseLocale) || 'Back';

  const mergedTheme = useMemo<ThemeProps>(() => {
    if (!themeOverride) return formBuilderTheme;
    return {
      widgets: { ...formBuilderTheme.widgets, ...themeOverride.widgets },
      fields: { ...formBuilderTheme.fields, ...themeOverride.fields },
      templates: { ...formBuilderTheme.templates, ...themeOverride.templates },
    };
  }, [themeOverride]);

  const ThemedForm = useMemo(() => withTheme(mergedTheme), [mergedTheme]);

  const createValidate = useCallback((target: FormSchema): CustomValidator => {
    const registered = createCustomValidator(target);
    const keys = new Set(target.fields.map(fieldKey));
    return (data, errors, ...rest) => {
      const result = registered(data, errors, ...rest);
      return scopeErrors(customValidate ? customValidate(data, result, ...rest) : result, keys);
    };
  }, [customValidate]);

  const validate = useMemo(() => createValidate(pageSchema), [createValidate, pageSchema]);

  useEffect(() => {
    if (!validateOnMount.current) return;
    validateOnMount.current = false;
    formRef.current?.validateForm();
  }, [pageIndex]);

  const handleSubmit = (data: Record<string, unknown>) => {
    if (!isLastPage) {
      goToPage(pageIndex + 1);
      return;
    }
    if (isMultiPage) {
      // Earlier pages were validated before their data could change; check every visible field again.
      const fullSchema = toJsonSchema(visibleSchema, locale, baseLocale);
      const { errors } = validator.validateFormData(data, fullSchema, createValidate(visibleSchema));
      if (errors.length > 0) {
        const keys = errors.map((e) => e.property?.replace(/^\./, '').split('.')[0]);
        const target = pages.findIndex((p) => p.fields.some((f) => keys.includes(fieldKey(f))));
        if (target >= 0 && target !== pageIndex) {
          validateOnMount.current = true;
          goToPage(target);
        } else {
          onError?.(errors);
        }
        return;
      }
    }
    onSubmit?.(pruneHiddenData(schema.fields, data));
  };

  const progress = isMultiPage && (
    <div className="mb-4 space-y-1.5" data-testid="form-progress">
      <div className="text-muted-foreground text-xs tabular-nums">
        {pageIndex + 1} / {pages.length}
      </div>
      {schema.settings?.showProgressBar && (
        <div
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={pages.length}
          aria-valuenow={pageIndex + 1}
          className="bg-muted h-1 overflow-hidden rounded-full"
        >
          <div
            className="bg-primary h-full rounded-full transition-[width] duration-300"
            style={{ width: `${((pageIndex + 1) / pages.length) * 100}%` }}
          />
        </div>
      )}
    </div>
  );

  const submit = submitButton ?? (
    <button type="submit" disabled={disabled} className={isMultiPage ? PRIMARY_BUTTON : `mt-4 ${PRIMARY_BUTTON}`}>
      {submitLabel}
    </button>
  );

  return (
    <div className={className} data-testid="form-renderer">
      {progress}
      <ThemedForm
        // Remount per page so RJSF starts each page with a clean error state.
        key={pageIndex}
        ref={formRef}
        schema={jsonSchema}
        uiSchema={uiSchema}
        validator={validator}
        formData={externalFormData ?? liveData}
        disabled={disabled}
        customValidate={validate}
        onChange={(e: IChangeEvent) => {
          setLiveData(e.formData);
          onChange?.(pruneHiddenData(schema.fields, e.formData));
        }}
        onSubmit={(e: IChangeEvent) => handleSubmit(e.formData)}
        onError={(errors: unknown[]) => onError?.(errors)}
      >
        {isMultiPage ? (
          <div className="mt-4 flex items-center gap-2">
            {pageIndex > 0 && (
              <button type="button" disabled={disabled} className={OUTLINE_BUTTON} onClick={() => goToPage(pageIndex - 1)}>
                {backLabel}
              </button>
            )}
            {isLastPage ? (
              submit
            ) : (
              <button type="submit" disabled={disabled} className={PRIMARY_BUTTON}>
                {nextLabel}
              </button>
            )}
          </div>
        ) : (
          submit
        )}
      </ThemedForm>
    </div>
  );
};
