'use client';

import { useState } from 'react';

type Tab = 'code' | 'preview';

export default function ExampleBlock({
  codeHtml,
  children,
}: {
  codeHtml: string;
  children: React.ReactNode;
}) {
  const [tab, setTab] = useState<Tab>('code');

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-border bg-muted/40">
        {(['code', 'preview'] as Tab[]).map((t) => (
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
        <div
          className="shiki-wrapper overflow-x-auto text-xs [&_.shiki]:!rounded-none [&_.shiki]:p-4"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: codeHtml }}
        />
      ) : (
        <div className="p-6">{children}</div>
      )}
    </div>
  );
}
