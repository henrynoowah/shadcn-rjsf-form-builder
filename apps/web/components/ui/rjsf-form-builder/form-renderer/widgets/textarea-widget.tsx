import type { WidgetProps } from '@rjsf/utils';
import { Textarea } from '@/components/ui/textarea';

export const TextareaWidget = (props: WidgetProps) => {
  const { id, value, required, disabled, readonly, onChange, onBlur, onFocus, placeholder, autofocus } = props;

  return (
    <Textarea
      id={id}
      value={value ?? ''}
      required={required}
      disabled={disabled || readonly}
      placeholder={placeholder}
      autoFocus={autofocus}
      rows={4}
      onChange={(e) => onChange(e.target.value)}
      onBlur={(e) => onBlur?.(id, e.target.value)}
      onFocus={(e) => onFocus?.(id, e.target.value)}
    />
  );
};
