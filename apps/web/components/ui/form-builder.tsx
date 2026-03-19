import { useCallback, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import type { FormSchema, FormFieldType, FormFieldDefinition } from '@/registry/form-builder-types/types';
import { BuilderProvider, useFormBuilder } from './builder-context';
import { FieldPalette, PaletteOverlayItem } from './field-palette';
import { Canvas } from './canvas';
import { CanvasFieldOverlay } from './canvas-field';
import { FieldSettingsPanel } from './field-settings-panel';
import { localizeText } from '@/registry/form-builder-types/i18n';

export type FormBuilderProps = {
  initialSchema?: FormSchema;
  onChange?: (schema: FormSchema) => void;
  locale: string;
  baseLocale?: string;
  availableLocales?: string[];
  className?: string;
};

type ActiveDrag = { source: 'palette'; fieldType: FormFieldType } | { source: 'canvas'; field: FormFieldDefinition };

const BuilderInner = ({
  locale,
  availableLocales,
  className,
}: {
  locale: string;
  availableLocales?: string[];
  className?: string;
}) => {
  const { addField, reorderFields } = useFormBuilder();
  const [activeDrag, setActiveDrag] = useState<ActiveDrag | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    const data = active.data.current;

    if (data?.source === 'palette') {
      setActiveDrag({ source: 'palette', fieldType: data.fieldType });
    } else if (data?.source === 'canvas') {
      setActiveDrag({ source: 'canvas', field: data.field });
    }
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveDrag(null);
      const { active, over } = event;
      if (!over) return;

      const source = active.data.current?.source;

      if (source === 'palette') {
        const fieldType = active.data.current?.fieldType as FormFieldType;
        addField(fieldType);
      } else if (source === 'canvas' && active.id !== over.id) {
        reorderFields(String(active.id), String(over.id));
      }
    },
    [addField, reorderFields],
  );

  const handleDragCancel = useCallback(() => {
    setActiveDrag(null);
  }, []);

  return (
    <div
      className={`bg-background text-foreground border-border flex h-full flex-col overflow-hidden rounded-lg border ${className ?? ''}`}
      data-testid="form-builder"
    >
      <div className="flex min-h-0 flex-1">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <FieldPalette />
          <Canvas locale={locale} />
          <DragOverlay dropAnimation={null}>
            {activeDrag?.source === 'palette' && <PaletteOverlayItem fieldType={activeDrag.fieldType} />}
            {activeDrag?.source === 'canvas' && (
              <CanvasFieldOverlay
                label={localizeText(activeDrag.field.label, locale) || activeDrag.field.type}
                type={activeDrag.field.type}
                required={activeDrag.field.required}
              />
            )}
          </DragOverlay>
        </DndContext>
        <FieldSettingsPanel locale={locale} availableLocales={availableLocales} />
      </div>
    </div>
  );
};

export const FormBuilder: React.FC<FormBuilderProps> = ({
  initialSchema,
  onChange,
  locale,
  availableLocales,
  className,
}) => {
  return (
    <BuilderProvider initialSchema={initialSchema} onChange={onChange}>
      <BuilderInner locale={locale} availableLocales={availableLocales} className={className} />
    </BuilderProvider>
  );
};
