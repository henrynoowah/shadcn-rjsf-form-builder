import type { WidgetProps } from '@rjsf/utils';
import { Checkbox } from '@/components/ui/checkbox';

export const CheckboxWidget = (props: WidgetProps) => {
  const { id, value, disabled, readonly, onChange, label } = props;

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={id}
        checked={value ?? false}
        disabled={disabled || readonly}
        onCheckedChange={(checked) => onChange(checked === true)}
      />
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
