import type { FieldTemplateProps } from '@rjsf/utils';

export const FieldTemplate = (props: FieldTemplateProps) => {
  const { id, label, required, description, errors, children, schema, displayLabel } = props;

  if (schema.type === 'boolean') {
    return (
      <div className="mb-4">
        {children}
        {description && <div className="text-muted-foreground mt-1 text-xs">{description}</div>}
        {errors && <div className="text-destructive mt-1 text-xs">{errors}</div>}
      </div>
    );
  }

  return (
    <div className="mb-4">
      {displayLabel && label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium leading-none">
          {label}
          {required && <span className="text-destructive ml-0.5">*</span>}
        </label>
      )}
      {children}
      {description && <div className="text-muted-foreground mt-1 text-xs">{description}</div>}
      {errors && <div className="text-destructive mt-1 text-xs">{errors}</div>}
    </div>
  );
};
