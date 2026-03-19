import type { ObjectFieldTemplateProps } from '@rjsf/utils';

export const ObjectFieldTemplate = (props: ObjectFieldTemplateProps) => {
  const { title, description, properties } = props;

  return (
    <fieldset className="space-y-0">
      {title && <legend className="mb-4 text-lg font-semibold">{title}</legend>}
      {description && <div className="text-muted-foreground mb-4 text-sm">{description}</div>}
      {properties.map((prop) => (
        <div key={prop.name}>{prop.content}</div>
      ))}
    </fieldset>
  );
};
