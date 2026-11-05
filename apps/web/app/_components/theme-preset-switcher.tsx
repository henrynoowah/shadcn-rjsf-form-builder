'use client';

import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const PRESETS = [
  { id: 'default', label: 'Default', swatch: 'oklch(0.62 0.19 41)' },
  { id: 'mono', label: 'Mono', swatch: 'oklch(0.205 0 0)' },
  { id: 'slate', label: 'Slate', swatch: 'oklch(0.546 0.245 262.881)' },
  { id: 'editorial', label: 'Editorial', swatch: 'oklch(0.8 0.04 75)' },
  {
    id: 'pop',
    label: 'Pop',
    // Figma's five brand colors
    swatch: 'conic-gradient(#f24e1e 0 20%, #ff7262 0 40%, #a259ff 0 60%, #1abcfe 0 80%, #0acf83 0)',
  },
  { id: 'terminal', label: 'Retro Terminal', swatch: 'oklch(0.6 0.2 145)' },
  { id: 'brutalist', label: 'Neo-Brutalist', swatch: 'oklch(0.82 0.19 95)' },
] as const;

const PRESET_IDS = new Set(PRESETS.map((p) => p.id));
const STORAGE_KEY = 'theme-preset';

/** `select` is a compact dropdown for toolbars; `list` is a touch-sized grid for sheets and panels. */
export default function ThemePresetSwitcher({ variant = 'select' }: { variant?: 'select' | 'list' }) {
  const [preset, setPreset] = useState<string>('default');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && PRESET_IDS.has(saved as (typeof PRESETS)[number]['id'])) {
      setPreset(saved);
      if (saved !== 'default') {
        document.documentElement.setAttribute('data-theme-preset', saved);
      }
    } else if (saved) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  function handleChange(id: string) {
    setPreset(id);
    localStorage.setItem(STORAGE_KEY, id);
    if (id === 'default') {
      document.documentElement.removeAttribute('data-theme-preset');
    } else {
      document.documentElement.setAttribute('data-theme-preset', id);
    }
  }

  if (variant === 'list') {
    return (
      <div role="radiogroup" aria-label="Theme preset" className="grid grid-cols-2 gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            role="radio"
            aria-checked={mounted && preset === p.id}
            onClick={() => handleChange(p.id)}
            className={`flex h-11 items-center gap-2.5 rounded-lg border px-3 text-left text-sm transition-colors ${
              mounted && preset === p.id
                ? 'border-primary bg-primary/5 font-medium text-foreground'
                : 'border-border text-muted-foreground hover:bg-muted'
            }`}
          >
            <span className="size-3 shrink-0 rounded-full" style={{ background: p.swatch }} aria-hidden="true" />
            {p.label}
          </button>
        ))}
      </div>
    );
  }

  if (!mounted) return <div className="h-7 w-[160px]" />;

  return (
    <Select value={preset} onValueChange={handleChange}>
      <SelectTrigger className="w-[160px] text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent position="popper" align="end">
        {PRESETS.map((p) => (
          <SelectItem key={p.id} value={p.id}>
            <span className="inline-flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: p.swatch }}
                aria-hidden="true"
              />
              {p.label}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
