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
  { id: 'terminal', label: 'Retro Terminal', swatch: 'oklch(0.6 0.2 145)' },
  { id: 'minimal', label: 'Minimal', swatch: 'oklch(0.3 0 0)' },
  { id: 'brutalist', label: 'Neo-Brutalist', swatch: 'oklch(0.82 0.19 95)' },
  { id: 'playful', label: 'Playful', swatch: 'oklch(0.7 0.19 330)' },
] as const;

const PRESET_IDS = new Set(PRESETS.map((p) => p.id));
const STORAGE_KEY = 'theme-preset';

export default function ThemePresetSwitcher() {
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

  if (!mounted) return <div className="h-7 w-[160px]" />;

  return (
    <Select value={preset} onValueChange={handleChange}>
      <SelectTrigger className="h-7 w-[160px] text-xs" size="sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
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
