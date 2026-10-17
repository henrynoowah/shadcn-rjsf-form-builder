import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { isPageBreak } from '@/lib/form-builder-types/types';
import { useFormBuilder } from './builder-context';
import { CanvasField } from './canvas-field';

type CanvasProps = {
  locale: string;
  baseLocale?: string;
};

export const Canvas = ({ locale, baseLocale }: CanvasProps) => {
  const { state } = useFormBuilder();
  const { fields } = state.schema;
  const sortedFields = [...fields].sort((a, b) => a.order - b.order);
  const hasPages = sortedFields.some((f) => isPageBreak(f.type));
  const startsWithBreak = hasPages && isPageBreak(sortedFields[0]!.type);

  // Page number each break starts. A leading break starts page 1 (the renderer drops empty pages).
  const pageNumbers = new Map<string, number>();
  for (const field of sortedFields) {
    if (isPageBreak(field.type)) pageNumbers.set(field.id, pageNumbers.size + (startsWithBreak ? 1 : 2));
  }

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
            {hasPages && !startsWithBreak && (
              <div className="text-muted-foreground px-1 text-xs font-semibold uppercase tracking-wider">Page 1</div>
            )}
            {sortedFields.map((field) => (
              <CanvasField
                key={field.id}
                field={field}
                locale={locale}
                baseLocale={baseLocale}
                pageNumber={pageNumbers.get(field.id)}
              />
            ))}
          </div>
        </SortableContext>
      )}
    </div>
  );
};
