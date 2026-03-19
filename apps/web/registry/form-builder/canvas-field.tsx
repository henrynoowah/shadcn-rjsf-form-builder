import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { FormFieldDefinition } from '@/lib/form-builder-types/types';
import { useFormBuilder } from './builder-context';
import { localizeText } from '@/lib/form-builder-types/i18n';

export const CanvasFieldOverlay = ({ label, type, required }: { label: string; type: string; required?: boolean }) => {
  return (
    <div className="bg-card text-card-foreground border-primary cursor-grabbing rounded-lg border-2 px-4 py-3 shadow-lg">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">⠿</span>
        <div className="flex-1">
          <div className="text-sm font-medium">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </div>
          <div className="text-muted-foreground text-xs">{type}</div>
        </div>
      </div>
    </div>
  );
};

type CanvasFieldProps = {
  field: FormFieldDefinition;
  locale: string;
};

export const CanvasField = ({ field, locale }: CanvasFieldProps) => {
  const { selectField, removeField, state } = useFormBuilder();
  const isSelected = state.selectedFieldId === field.id;

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: field.id,
    data: { source: 'canvas', field },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const label = localizeText(field.label, locale) || field.type;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-card text-card-foreground group relative rounded-lg border px-4 py-3 shadow-sm transition-all ${
        isSelected ? 'border-primary ring-primary/20 ring-2' : 'border-border hover:border-primary/40 hover:shadow-md'
      } ${isDragging ? 'opacity-50' : ''}`}
      onClick={() => selectField(field.id)}
    >
      <div className="flex items-center gap-2">
        <span
          {...attributes}
          {...listeners}
          className="text-muted-foreground hover:text-foreground cursor-grab rounded p-0.5 transition-colors"
        >
          ⠿
        </span>
        <div className="flex-1">
          <div className="text-sm font-medium">
            {label}
            {field.required && <span className="text-destructive ml-1">*</span>}
          </div>
          <div className="text-muted-foreground text-xs">{field.type}</div>
        </div>
        <button
          type="button"
          className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded p-1 text-xs opacity-0 transition-opacity group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            removeField(field.id);
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
};
