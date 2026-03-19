import type { FieldProps } from '@rjsf/utils';

export const SeparatorField = (_props: FieldProps) => {
  return (
    <div className="my-4" role="separator">
      <hr className="border-border" />
    </div>
  );
};
