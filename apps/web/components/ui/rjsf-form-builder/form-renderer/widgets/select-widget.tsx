import type { WidgetProps } from '@rjsf/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const SelectWidget = (props: WidgetProps) => {
  const { id, value, required, disabled, readonly, onChange, options, placeholder } = props;
  const { enumOptions } = options;

  return (
    <Select value={value ?? ''} onValueChange={onChange} disabled={disabled || readonly} required={required}>
      <SelectTrigger id={id} className="w-full">
        <SelectValue placeholder={placeholder || 'Select...'} />
      </SelectTrigger>
      <SelectContent>
        {enumOptions?.map(({ value: optValue, label }) => (
          <SelectItem key={optValue} value={optValue}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
