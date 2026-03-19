import type { WidgetProps } from '@rjsf/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export const RadioWidget = (props: WidgetProps) => {
  const { id, value, required, disabled, readonly, onChange, options } = props;
  const { enumOptions } = options;

  return (
    <RadioGroup
      id={id}
      value={value ?? ''}
      onValueChange={onChange}
      disabled={disabled || readonly}
      required={required}
      className="flex flex-col gap-2"
    >
      {enumOptions?.map(({ value: optValue, label }) => (
        <div key={optValue} className="flex items-center gap-2">
          <RadioGroupItem id={`${id}-${optValue}`} value={optValue} />
          <label htmlFor={`${id}-${optValue}`} className="text-sm font-medium leading-none">
            {label}
          </label>
        </div>
      ))}
    </RadioGroup>
  );
};
