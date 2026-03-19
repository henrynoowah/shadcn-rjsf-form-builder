import type { ArrayFieldTemplateProps } from '@rjsf/utils';

export const ArrayFieldTemplate = (props: ArrayFieldTemplateProps) => {
  const { title, items, canAdd, onAddClick } = props;

  return (
    <div className="mb-4">
      {title && <h3 className="mb-2 text-sm font-medium">{title}</h3>}
      <div className="space-y-2">{items}</div>
      {canAdd && (
        <button
          type="button"
          className="border-border hover:bg-accent mt-2 rounded-md border px-3 py-1.5 text-sm"
          onClick={onAddClick}
        >
          Add Item
        </button>
      )}
    </div>
  );
};
