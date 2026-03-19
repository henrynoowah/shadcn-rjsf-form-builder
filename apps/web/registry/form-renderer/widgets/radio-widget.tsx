import type { WidgetProps } from '@rjsf/utils';
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';
import { IconCircleFilled } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

export const RadioWidget = (props: WidgetProps) => {
  const { id, value, required, disabled, readonly, onChange, options } = props;
  const { enumOptions } = options;

  return (
    <RadioGroupPrimitive.Root
      id={id}
      value={value ?? ''}
      onValueChange={onChange}
      disabled={disabled || readonly}
      required={required}
      className="flex flex-col gap-2"
    >
      {enumOptions?.map(({ value: optValue, label }) => (
        <div key={optValue} className="flex items-center space-x-2">
          <RadioGroupPrimitive.Item
            id={`${id}-${optValue}`}
            value={optValue}
            className={cn(
              'border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 shadow-xs aspect-square size-4 shrink-0 rounded-full border outline-none transition-shadow focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
            )}
          >
            <RadioGroupPrimitive.Indicator className="relative flex items-center justify-center">
              <IconCircleFilled className="size-2.5" />
            </RadioGroupPrimitive.Indicator>
          </RadioGroupPrimitive.Item>
          <label htmlFor={`${id}-${optValue}`} className="text-sm font-medium leading-none">
            {label}
          </label>
        </div>
      ))}
    </RadioGroupPrimitive.Root>
  );
};
