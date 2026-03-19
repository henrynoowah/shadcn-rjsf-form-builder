import type { FieldProps } from '@rjsf/utils';

export const HeadingField = (props: FieldProps) => {
  const { schema } = props;

  return (
    <div className="mb-4">
      <h2 className="text-foreground text-xl font-semibold tracking-tight">{schema.title}</h2>
      {schema.description && <p className="text-muted-foreground mt-1 text-sm">{schema.description}</p>}
    </div>
  );
};
