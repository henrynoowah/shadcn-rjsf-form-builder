import type { WidgetProps } from '@rjsf/utils';
import { Input } from '@/components/ui/input';

export const FileWidget = (props: WidgetProps) => {
  const { id, required, disabled, readonly, onChange, autofocus } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      onChange(undefined);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <Input
      id={id}
      type="file"
      required={required}
      disabled={disabled || readonly}
      autoFocus={autofocus}
      onChange={handleChange}
    />
  );
};
