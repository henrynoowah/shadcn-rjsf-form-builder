import type { ComponentType } from 'react';
import { useDraggable } from '@dnd-kit/core';
import {
  IconLetterCase,
  IconHash,
  IconAt,
  IconPhone,
  IconSelector,
  IconCheckbox,
  IconCircleDot,
  IconCalendar,
  IconAlignLeft,
  IconPaperclip,
  IconHeading,
  IconSeparator,
  IconTextCaption,
} from '@tabler/icons-react';
import type { FormFieldType } from '@/registry/form-builder-types/types';

type FieldTypeMeta = {
  label: string;
  icon: ComponentType<{ size?: number }>;
  category: 'input' | 'display';
};

/**
 * Single source of truth for builder UI metadata per field type.
 * To add a new field type: add an entry here + a case in schema-builder.ts.
 */
export const FIELD_TYPE_META: Record<string, FieldTypeMeta> = {
  text:      { label: 'Text',      icon: IconLetterCase, category: 'input' },
  number:    { label: 'Number',    icon: IconHash,        category: 'input' },
  email:     { label: 'Email',     icon: IconAt,          category: 'input' },
  tel:       { label: 'Phone',     icon: IconPhone,       category: 'input' },
  select:    { label: 'Select',    icon: IconSelector,    category: 'input' },
  checkbox:  { label: 'Checkbox',  icon: IconCheckbox,    category: 'input' },
  radio:     { label: 'Radio',     icon: IconCircleDot,   category: 'input' },
  date:      { label: 'Date',      icon: IconCalendar,    category: 'input' },
  textarea:  { label: 'Text Area', icon: IconAlignLeft,   category: 'input' },
  file:      { label: 'File',      icon: IconPaperclip,   category: 'input' },
  heading:   { label: 'Heading',   icon: IconHeading,     category: 'display' },
  paragraph: { label: 'Paragraph', icon: IconTextCaption, category: 'display' },
  separator: { label: 'Separator', icon: IconSeparator,   category: 'display' },
};

const INPUT_FIELD_TYPES = Object.entries(FIELD_TYPE_META)
  .filter(([, m]) => m.category === 'input')
  .map(([type, m]) => ({ type: type as FormFieldType, ...m }));

const DISPLAY_FIELD_TYPES = Object.entries(FIELD_TYPE_META)
  .filter(([, m]) => m.category === 'display')
  .map(([type, m]) => ({ type: type as FormFieldType, ...m }));

export const PaletteOverlayItem = ({ fieldType }: { fieldType: string }) => {
  const meta = FIELD_TYPE_META[fieldType];
  const Icon = meta?.icon;
  const label = meta?.label ?? fieldType;

  return (
    <div className="bg-card text-card-foreground border-primary flex w-48 cursor-grabbing items-center gap-2 rounded-md border-2 px-3 py-2 text-sm shadow-lg">
      {Icon && <Icon size={16} />}
      <span>{label}</span>
    </div>
  );
};

const PaletteItem = ({
  type,
  label,
  icon: Icon,
}: {
  type: FormFieldType;
  label: string;
  icon: ComponentType<{ size?: number }>;
}) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${type}`,
    data: { source: 'palette', fieldType: type },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex cursor-grab items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${isDragging ? 'opacity-50' : ''}`}
    >
      <Icon size={16} />
      <span>{label}</span>
    </div>
  );
};

export const FieldPalette = () => {
  return (
    <div className="bg-sidebar text-sidebar-foreground border-sidebar-border w-48 shrink-0 overflow-y-auto border-r p-2">
      <h3 className="text-sidebar-foreground/60 mb-1 px-2 pt-1 text-xs font-semibold uppercase tracking-wider">
        Input
      </h3>
      <div className="space-y-0.5">
        {INPUT_FIELD_TYPES.map((item) => (
          <PaletteItem key={item.type} {...item} />
        ))}
      </div>
      <h3 className="text-sidebar-foreground/60 mb-1 mt-3 px-2 text-xs font-semibold uppercase tracking-wider">
        Display
      </h3>
      <div className="space-y-0.5">
        {DISPLAY_FIELD_TYPES.map((item) => (
          <PaletteItem key={item.type} {...item} />
        ))}
      </div>
    </div>
  );
};
