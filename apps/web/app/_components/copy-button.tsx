'use client';

import { useState } from 'react';

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={copy}
      className="shrink-0 rounded border border-border px-2.5 py-1 font-mono text-[10px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {copied ? 'copied!' : 'copy'}
    </button>
  );
}
