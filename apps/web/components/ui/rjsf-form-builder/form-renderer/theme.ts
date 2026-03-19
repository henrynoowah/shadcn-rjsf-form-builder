import type { ThemeProps } from '@rjsf/core';
import { TextWidget } from './widgets/text-widget';
import { TextareaWidget } from './widgets/textarea-widget';
import { SelectWidget } from './widgets/select-widget';
import { CheckboxWidget } from './widgets/checkbox-widget';
import { RadioWidget } from './widgets/radio-widget';
import { DateWidget } from './widgets/date-widget';
import { FileWidget } from './widgets/file-widget';
import { HeadingField } from './fields/heading-field';
import { ParagraphField } from './fields/paragraph-field';
import { SeparatorField } from './fields/separator-field';
import { FieldTemplate } from './templates/field-template';
import { ObjectFieldTemplate } from './templates/object-template';
import { ArrayFieldTemplate } from './templates/array-template';

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
