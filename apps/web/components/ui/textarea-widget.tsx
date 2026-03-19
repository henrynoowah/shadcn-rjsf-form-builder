import type { WidgetProps } from '@rjsf/utils';
import { cn } from '@/lib/utils';

export const TextareaWidget = (props: WidgetProps) => {
  const { id, value, required, disabled, readonly, onChange, onBlur, onFocus, placeholder, autofocus } = props;

  return (
    <textarea
      id={id}
      data-slot="textarea"
      className={cn(
        'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 field-sizing-content shadow-xs flex min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      )}
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
