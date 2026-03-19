import type { WidgetProps } from '@rjsf/utils';
import { Input } from '@/components/ui/input';

export const DateWidget = (props: WidgetProps) => {
  const { id, value, required, disabled, readonly, onChange, onBlur, onFocus, autofocus } = props;

  return (
    <Input
      id={id}
      type="date"
      value={value ?? ''}
      required={required}
      disabled={disabled || readonly}
      autoFocus={autofocus}
      onChange={(e) => onChange(e.target.value)}
      onBlur={(e) => onBlur?.(id, e.target.value)}
      onFocus={(e) => onFocus?.(id, e.target.value)}
    />
  );
};
