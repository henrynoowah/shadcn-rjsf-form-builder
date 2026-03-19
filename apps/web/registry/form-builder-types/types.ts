/**
 * Locale-keyed string for i18n support.
 * @example { "en-US": "Name", "ko-KR": "이름" }
 */
export type LocalizedString = Record<string, string>;

export const FormFieldType = {
  TEXT: 'text',
  NUMBER: 'number',
  EMAIL: 'email',
  TEL: 'tel',
  SELECT: 'select',
  CHECKBOX: 'checkbox',
  RADIO: 'radio',
  DATE: 'date',
  TEXTAREA: 'textarea',
  FILE: 'file',
  // Display-only (non-input) fields
  HEADING: 'heading',
  PARAGRAPH: 'paragraph',
  SEPARATOR: 'separator',
} as const;

/** Field types that are display-only and do not collect form data */
export const DISPLAY_FIELD_TYPES: readonly FormFieldType[] = [
  FormFieldType.HEADING,
  FormFieldType.PARAGRAPH,
  FormFieldType.SEPARATOR,
];

export const isDisplayField = (type: FormFieldType): boolean =>
  (DISPLAY_FIELD_TYPES as readonly string[]).includes(type);

export type FormFieldType = (typeof FormFieldType)[keyof typeof FormFieldType];

export type FormFieldOption = {
  value: string;
  label: LocalizedString;
};

export type FormFieldValidation = {
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  customRule?: string;
};

export type FormFieldConditionOperator = 'eq' | 'neq' | 'gt' | 'lt' | 'contains' | 'empty' | 'notEmpty';

export type FormFieldCondition = {
  field: string;
  operator: FormFieldConditionOperator;
  value?: unknown;
};

export type FormFieldDefinition = {
  id: string;
  type: FormFieldType;
  label: LocalizedString;
  placeholder?: LocalizedString;
  description?: LocalizedString;
  required?: boolean;
  defaultValue?: unknown;
  order: number;
  options?: FormFieldOption[];
  validation?: FormFieldValidation;
  condition?: FormFieldCondition;
};

export type FormSchemaSettings = {
  layout?: 'vertical' | 'horizontal';
  showProgressBar?: boolean;
  successMessage?: LocalizedString;
};

export type FormSchema = {
  id: string;
  title: LocalizedString;
  description?: LocalizedString;
  fields: FormFieldDefinition[];
  submitLabel?: LocalizedString;
  settings?: FormSchemaSettings;
};
