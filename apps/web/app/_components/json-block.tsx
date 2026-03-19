'use client';

import { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';

export default function JsonBlock({ value }: { value: unknown }) {
  const [html, setHtml] = useState<string | null>(null);
  const json = JSON.stringify(value, null, 2);

  useEffect(() => {
    let cancelled = false;
    codeToHtml(json, {
      lang: 'json',
      themes: { light: 'nord', dark: 'github-dark-dimmed' },
      defaultColor: false,
    }).then((result) => {
      if (!cancelled) setHtml(result);
    });
    return () => {
      cancelled = true;
    };
  }, [json]);

  if (html === null) {
    return <pre className="text-xs font-mono whitespace-pre-wrap">{json}</pre>;
  }

  return (
    <div
      className="shiki-wrapper text-xs [&_.shiki]:!rounded-none [&_.shiki]:p-0"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
