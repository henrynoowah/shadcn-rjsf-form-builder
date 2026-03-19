import type { WidgetProps } from '@rjsf/utils';
import { Checkbox as CheckboxPrimitive } from 'radix-ui';
import { IconCheck } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

export const CheckboxWidget = (props: WidgetProps) => {
  const { id, value, disabled, readonly, onChange, label } = props;

  return (
    <div className="flex items-center space-x-2">
      <CheckboxPrimitive.Root
        id={id}
        data-slot="checkbox"
        className={cn(
          'border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-xs peer size-4 shrink-0 rounded-[4px] border outline-none transition-shadow focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        )}
        checked={value ?? false}
        disabled={disabled || readonly}
        onCheckedChange={(checked) => onChange(checked === true)}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="grid place-content-center text-current transition-none"
        >
          <IconCheck className="size-3.5" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      )}
    </div>
  );
};
