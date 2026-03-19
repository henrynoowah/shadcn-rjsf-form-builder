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

type FieldTypeEntry = { type: FormFieldType; label: string; icon: ComponentType<{ size?: number }> };

const INPUT_FIELD_TYPES: FieldTypeEntry[] = [
  { type: 'text', label: 'Text', icon: IconLetterCase },
  { type: 'number', label: 'Number', icon: IconHash },
  { type: 'email', label: 'Email', icon: IconAt },
  { type: 'tel', label: 'Phone', icon: IconPhone },
  { type: 'select', label: 'Select', icon: IconSelector },
  { type: 'checkbox', label: 'Checkbox', icon: IconCheckbox },
  { type: 'radio', label: 'Radio', icon: IconCircleDot },
  { type: 'date', label: 'Date', icon: IconCalendar },
  { type: 'textarea', label: 'Text Area', icon: IconAlignLeft },
  { type: 'file', label: 'File', icon: IconPaperclip },
];

const DISPLAY_FIELD_TYPES: FieldTypeEntry[] = [
  { type: 'heading', label: 'Heading', icon: IconHeading },
  { type: 'paragraph', label: 'Paragraph', icon: IconTextCaption },
  { type: 'separator', label: 'Separator', icon: IconSeparator },
];

const ALL_FIELD_TYPES = [...INPUT_FIELD_TYPES, ...DISPLAY_FIELD_TYPES];

export const FIELD_ICON_MAP: Record<string, ComponentType<{ size?: number }>> = Object.fromEntries(
  ALL_FIELD_TYPES.map((f) => [f.type, f.icon]),
);

export const FIELD_LABEL_MAP: Record<string, string> = Object.fromEntries(
  ALL_FIELD_TYPES.map((f) => [f.type, f.label]),
);

export const PaletteOverlayItem = ({ fieldType }: { fieldType: string }) => {
  const Icon = FIELD_ICON_MAP[fieldType];
  const label = FIELD_LABEL_MAP[fieldType] ?? fieldType;

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
