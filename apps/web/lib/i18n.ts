import type { FormFieldDefinition, LocalizedString } from './types';

export const localizeText = (
  content: string | Record<string, string> | undefined,
  locale?: string,
  baseLocale?: string,
): string => {
  if (!content) return '';

  if (!locale) {
    if (typeof content === 'string') return content;
    if (baseLocale && content[baseLocale]) return content[baseLocale];
    return Object.values(content)[0] ?? '';
  }

  if (typeof content === 'object') {
    if (content[locale]) return content[locale];

    const localeLang = locale.split('-')[0];
    const langKey = Object.keys(content).find((k) => k === localeLang || k.startsWith(`${localeLang}-`));
    if (langKey && content[langKey]) return content[langKey];

    if (baseLocale && content[baseLocale]) return content[baseLocale];

    if (baseLocale) {
      const baseLang = baseLocale.split('-')[0];
      const baseLangKey = Object.keys(content).find((k) => k === baseLang || k.startsWith(`${baseLang}-`));
      if (baseLangKey && content[baseLangKey]) return content[baseLangKey];
    }
  }

  if (typeof content === 'string') return content;

  return Object.values(content)[0] ?? '';
};

export const localizeFormField = (
  field: FormFieldDefinition,
  locale: string,
  baseLocale?: string,
): { label: string; placeholder?: string; description?: string } => ({
  label: localizeText(field.label, locale, baseLocale),
  placeholder: field.placeholder ? localizeText(field.placeholder, locale, baseLocale) : undefined,
  description: field.description ? localizeText(field.description, locale, baseLocale) : undefined,
});

export const localizeString = (content: LocalizedString | undefined, locale: string, baseLocale?: string): string =>
  localizeText(content, locale, baseLocale);
