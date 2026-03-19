import type { FieldProps } from '@rjsf/utils';

export const ParagraphField = (props: FieldProps) => {
  const { schema } = props;

  return (
    <div className="mb-4">
      <p className="text-muted-foreground text-sm leading-relaxed">{schema.title}</p>
    </div>
  );
};
