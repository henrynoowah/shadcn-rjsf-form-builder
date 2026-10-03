import type { CustomValidator, FormValidation } from '@rjsf/utils';
import type { FormSchema } from './types';
import { fieldKey } from './schema-builder';

type ValidatorFn = (value: unknown, formData: Record<string, unknown>) => string | undefined;

const customValidators = new Map<string, ValidatorFn>();

export const registerValidator = (key: string, fn: ValidatorFn): void => {
  customValidators.set(key, fn);
};

export const unregisterValidator = (key: string): void => {
  customValidators.delete(key);
};

export const createCustomValidator = (formSchema: FormSchema): CustomValidator => {
  return (formData: Record<string, unknown>, errors: FormValidation) => {
    for (const field of formSchema.fields) {
      const customRule = field.validation?.customRule;
      if (!customRule) continue;

      const validator = customValidators.get(customRule);
      if (!validator) continue;

      const key = fieldKey(field);
      const value = formData?.[key];
      const error = validator(value, formData ?? {});

      if (error) {
        (errors as any)[key]?.addError(error);
      }
    }

    return errors;
  };
};
