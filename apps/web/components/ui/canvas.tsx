import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useFormBuilder } from './builder-context';
import { CanvasField } from './canvas-field';

type CanvasProps = {
  locale: string;
};

export const Canvas = ({ locale }: CanvasProps) => {
  const { state } = useFormBuilder();
  const { fields } = state.schema;
  const sortedFields = [...fields].sort((a, b) => a.order - b.order);

  const { setNodeRef } = useDroppable({ id: 'canvas' });

  return (
    <div ref={setNodeRef} className="bg-muted/40 flex-1 overflow-y-auto p-4">
      {sortedFields.length === 0 ? (
        <div className="border-border text-muted-foreground bg-background/50 flex h-full items-center justify-center rounded-lg border-2 border-dashed p-8 text-center text-sm">
          Drag fields from the palette to start building your form
        </div>
      ) : (
        <SortableContext items={sortedFields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {sortedFields.map((field) => (
              <CanvasField key={field.id} field={field} locale={locale} />
            ))}
          </div>
        </SortableContext>
      )}
    </div>
  );
};
