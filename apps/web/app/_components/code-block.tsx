import { ScrollArea } from 'radix-ui';
import { codeToHtml } from 'shiki';

type Props = {
  code: string;
  lang?: string;
  className?: string;
};

export default async function CodeBlock({ code, lang = 'tsx', className }: Props) {
  const html = await codeToHtml(code, {
    lang,
    themes: { light: 'nord', dark: 'github-dark-dimmed' },
    defaultColor: false,
  });

  return (
    <ScrollArea.Root>
      <ScrollArea.Viewport>
        <div
          className={`shiki-wrapper rounded-md text-xs ${className ?? ''}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="horizontal" />
    </ScrollArea.Root>
  );
}
