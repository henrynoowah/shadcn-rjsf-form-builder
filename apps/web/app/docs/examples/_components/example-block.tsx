'use client';

import { ScrollArea } from 'radix-ui';
import { useState } from 'react';

type Tab = 'code' | 'preview';

export default function ExampleBlock({
  codeHtml,
  children,
}: {
  codeHtml: string;
  children: React.ReactNode;
}) {
  const [tab, setTab] = useState<Tab>('preview');

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-border bg-muted/40">
        {(['preview', 'code'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-xs font-medium capitalize transition-colors ${
              tab === t
                ? 'border-b-2 border-foreground text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === 'code' ? (
        <ScrollArea.Root>
          <ScrollArea.Viewport>
            <div
              className="shiki-wrapper overflow-x-auto text-xs [&_.shiki]:rounded-none! [&_.shiki]:p-4"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: codeHtml }}
            />
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="horizontal" />
        </ScrollArea.Root>
      ) : (
        <div className="p-6">{children}</div>
      )}
    </div>
  );
}
