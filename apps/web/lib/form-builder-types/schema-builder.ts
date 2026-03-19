import type { RJSFSchema, UiSchema } from '@rjsf/utils';
import type { FormFieldDefinition, FormSchema } from './types';
import { FormFieldType, isDisplayField } from './types';
import { localizeFormField, localizeString } from './i18n';

const fieldTypeToJsonSchema = (field: FormFieldDefinition, locale: string, baseLocale?: string): RJSFSchema => {
  switch (field.type) {
    case FormFieldType.NUMBER:
      return { type: 'number' };
    case FormFieldType.EMAIL:
      return { type: 'string', format: 'email' };
    case FormFieldType.TEL:
      return { type: 'string', format: 'tel' };
    case FormFieldType.DATE:
      return { type: 'string', format: 'date' };
    case FormFieldType.CHECKBOX:
      return { type: 'boolean' };
    case FormFieldType.SELECT:
    case FormFieldType.RADIO:
      return {
        type: 'string',
        enum: field.options?.map((o) => o.value) ?? [],
      };
    case FormFieldType.FILE:
      return { type: 'string', format: 'data-url' };
    case FormFieldType.TEXT:
    case FormFieldType.TEXTAREA:
    default:
      return { type: 'string' };
  }
};

const applyValidation = (schema: RJSFSchema, field: FormFieldDefinition): RJSFSchema => {
  if (!field.validation) return schema;

  const result: RJSFSchema = { ...schema };
  const { minLength, maxLength, min, max, pattern } = field.validation;

  if (minLength !== undefined) result.minLength = minLength;
  if (maxLength !== undefined) result.maxLength = maxLength;
  if (min !== undefined) result.minimum = min;
  if (max !== undefined) result.maximum = max;
  if (pattern !== undefined) result.pattern = pattern;

  return result;
};

export const toJsonSchema = (formSchema: FormSchema, locale: string, baseLocale?: string): RJSFSchema => {
  const properties: Record<string, RJSFSchema> = {};
  const required: string[] = [];

  const sortedFields = [...formSchema.fields].sort((a, b) => a.order - b.order);

  for (const field of sortedFields) {
    // Display fields use a null-type schema placeholder (rendered via custom UI field)
    if (isDisplayField(field.type)) {
      const localized = localizeFormField(field, locale, baseLocale);
      properties[field.id] = {
        type: 'null',
        title: localized.label,
        description: localized.description,
      };
      continue;
    }

    const localized = localizeFormField(field, locale, baseLocale);
    const typeSchema = fieldTypeToJsonSchema(field, locale, baseLocale);

    let fieldSchema: RJSFSchema = {
      ...typeSchema,
      title: localized.label,
    };

    if (localized.description) {
      fieldSchema.description = localized.description;
    }

    if (field.defaultValue !== undefined) {
      fieldSchema.default = field.defaultValue as string | number | boolean;
    }

    fieldSchema = applyValidation(fieldSchema, field);
    properties[field.id] = fieldSchema;

    if (field.required) {
      required.push(field.id);
    }
  }

  const schema: RJSFSchema = {
    type: 'object',
    title: localizeString(formSchema.title, locale, baseLocale),
    properties,
  };

  if (formSchema.description) {
    schema.description = localizeString(formSchema.description, locale, baseLocale);
  }

  if (required.length > 0) {
    schema.required = required;
  }

  return applyConditions(schema, sortedFields);
};

export const toUiSchema = (formSchema: FormSchema, locale: string, baseLocale?: string): UiSchema => {
  const uiSchema: UiSchema = {};
  const sortedFields = [...formSchema.fields].sort((a, b) => a.order - b.order);

  uiSchema['ui:order'] = sortedFields.map((f) => f.id);

  for (const field of sortedFields) {
    const localized = localizeFormField(field, locale, baseLocale);
    const fieldUi: UiSchema = {};

    if (localized.placeholder) {
      fieldUi['ui:placeholder'] = localized.placeholder;
    }

    // Move enumNames to uiSchema (deprecated in JSON Schema)
    if ((field.type === FormFieldType.SELECT || field.type === FormFieldType.RADIO) && field.options?.length) {
      fieldUi['ui:enumNames'] = field.options.map((o) => localizeString(o.label, locale, baseLocale));
    }

    switch (field.type) {
      case FormFieldType.TEXTAREA:
        fieldUi['ui:widget'] = 'textarea';
        break;
      case FormFieldType.RADIO:
        fieldUi['ui:widget'] = 'radio';
        break;
      case FormFieldType.FILE:
        fieldUi['ui:widget'] = 'file';
        break;
      case FormFieldType.HEADING:
        fieldUi['ui:field'] = 'HeadingField';
        break;
      case FormFieldType.PARAGRAPH:
        fieldUi['ui:field'] = 'ParagraphField';
        break;
      case FormFieldType.SEPARATOR:
        fieldUi['ui:field'] = 'SeparatorField';
        break;
    }

    if (Object.keys(fieldUi).length > 0) {
      uiSchema[field.id] = fieldUi;
    }
  }

  if (formSchema.settings?.layout === 'horizontal') {
    uiSchema['ui:rootFieldId'] = 'root';
    uiSchema['classNames'] = 'form-horizontal';
  }

  return uiSchema;
};

export const applyConditions = (schema: RJSFSchema, fields: FormFieldDefinition[]): RJSFSchema => {
  const fieldsWithConditions = fields.filter((f) => f.condition);
  if (fieldsWithConditions.length === 0) return schema;

  // Conditional fields must NOT live in top-level properties — otherwise RJSF always renders them.
  // Remove them here and place them exclusively inside the allOf then-branch.
  const conditionalIds = new Set(fieldsWithConditions.map((f) => f.id));
  const filteredProperties: Record<string, RJSFSchema> = {};
  for (const [key, value] of Object.entries(schema.properties ?? {})) {
    if (!conditionalIds.has(key)) {
      filteredProperties[key] = value as RJSFSchema;
    }
  }

  const allOf: RJSFSchema[] = [];

  for (const field of fieldsWithConditions) {
    const { condition } = field;
    if (!condition) continue;

    let ifSchema: RJSFSchema;

    switch (condition.operator) {
      case 'eq':
        ifSchema = { properties: { [condition.field]: { const: condition.value as string | number | boolean } } };
        break;
      case 'neq':
        ifSchema = {
          properties: { [condition.field]: { not: { const: condition.value as string | number | boolean } } },
        };
        break;
      case 'gt':
        ifSchema = {
          properties: { [condition.field]: { exclusiveMinimum: condition.value as number } },
        };
        break;
      case 'lt':
        ifSchema = {
          properties: { [condition.field]: { exclusiveMaximum: condition.value as number } },
        };
        break;
      case 'contains':
        ifSchema = {
          properties: { [condition.field]: { pattern: String(condition.value) } },
        };
        break;
      case 'empty':
        ifSchema = {
          properties: { [condition.field]: { maxLength: 0 } },
        };
        break;
      case 'notEmpty':
        ifSchema = {
          properties: { [condition.field]: { minLength: 1 } },
        };
        break;
      default:
        continue;
    }

    allOf.push({
      if: ifSchema,
      then: { properties: { [field.id]: schema.properties?.[field.id] as RJSFSchema } },
      else: {},
    });
  }

  if (allOf.length > 0) {
    return { ...schema, properties: filteredProperties, allOf };
  }

  return { ...schema, properties: filteredProperties };
};
