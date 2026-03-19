import type { WidgetProps } from '@rjsf/utils';
import { Select as SelectPrimitive } from 'radix-ui';
import { IconCheck, IconChevronDown } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

export const SelectWidget = (props: WidgetProps) => {
  const { id, value, required, disabled, readonly, onChange, options, placeholder } = props;
  const { enumOptions } = options;

  return (
    <SelectPrimitive.Root
      value={value ?? ''}
      onValueChange={onChange}
      disabled={disabled || readonly}
      required={required}
    >
      <SelectPrimitive.Trigger
        id={id}
        data-slot="select-trigger"
        className={cn(
          "border-input data-placeholder:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 shadow-xs flex h-9 w-full items-center justify-between gap-2 whitespace-nowrap rounded-md border bg-transparent px-3 py-2 text-sm outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        )}
      >
        <SelectPrimitive.Value data-slot="select-value" placeholder={placeholder || 'Select...'} />
        <SelectPrimitive.Icon asChild>
          <IconChevronDown className="size-4 opacity-50" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Content
        data-slot="select-content"
        className="bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border shadow-md"
        position="popper"
        sideOffset={4}
      >
        <SelectPrimitive.Viewport className="h-(--radix-select-trigger-height) min-w-(--radix-select-trigger-width) w-full scroll-my-1 p-1">
          {enumOptions?.map(({ value: optValue, label }) => (
            <SelectPrimitive.Item
              key={optValue}
              value={optValue}
              data-slot="select-item"
              className="focus:bg-accent focus:text-accent-foreground outline-hidden relative flex w-full cursor-default select-none items-center gap-2 rounded-sm py-1.5 pl-2 pr-8 text-sm data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            >
              <span className="absolute right-2 flex size-3.5 items-center justify-center">
                <SelectPrimitive.ItemIndicator>
                  <IconCheck className="size-4" />
                </SelectPrimitive.ItemIndicator>
              </span>
              <SelectPrimitive.ItemText>{label}</SelectPrimitive.ItemText>
            </SelectPrimitive.Item>
          ))}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  );
};
