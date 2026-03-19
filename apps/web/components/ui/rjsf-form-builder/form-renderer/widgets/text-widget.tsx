import type { WidgetProps } from '@rjsf/utils';
import { Input } from '@/components/ui/input';

export const TextWidget = (props: WidgetProps) => {
  const { id, value, required, disabled, readonly, onChange, onBlur, onFocus, placeholder, autofocus, schema } =
    props;

  const type = schema.format === 'email' ? 'email' : schema.format === 'tel' ? 'tel' : 'text';

  return (
    <Input
      id={id}
      type={type}
      value={value ?? ''}
      required={required}
      disabled={disabled || readonly}
      placeholder={placeholder}
      autoFocus={autofocus}
      onChange={(e) => onChange(e.target.value)}
      onBlur={(e) => onBlur?.(id, e.target.value)}
      onFocus={(e) => onFocus?.(id, e.target.value)}
    />
  );
};
