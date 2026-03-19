import type { ThemeProps } from '@rjsf/core';
import { TextWidget } from './text-widget';
import { TextareaWidget } from './textarea-widget';
import { SelectWidget } from './select-widget';
import { CheckboxWidget } from './checkbox-widget';
import { RadioWidget } from './radio-widget';
import { DateWidget } from './date-widget';
import { FileWidget } from './file-widget';
import { HeadingField } from './heading-field';
import { ParagraphField } from './paragraph-field';
import { SeparatorField } from './separator-field';
import { FieldTemplate } from './field-template';
import { ObjectFieldTemplate } from './object-template';
import { ArrayFieldTemplate } from './array-template';

export const formBuilderTheme: ThemeProps = {
  widgets: {
    TextWidget,
    TextareaWidget,
    SelectWidget,
    CheckboxWidget,
    RadioWidget,
    DateWidget,
    FileWidget,
    EmailWidget: TextWidget,
    URLWidget: TextWidget,
  },
  fields: {
    HeadingField,
    ParagraphField,
    SeparatorField,
  },
  templates: {
    FieldTemplate,
    ObjectFieldTemplate,
    ArrayFieldTemplate,
  },
};

export {
  TextWidget,
  TextareaWidget,
  SelectWidget,
  CheckboxWidget,
  RadioWidget,
  DateWidget,
  FileWidget,
  HeadingField,
  ParagraphField,
  SeparatorField,
  FieldTemplate,
  ObjectFieldTemplate,
  ArrayFieldTemplate,
};
