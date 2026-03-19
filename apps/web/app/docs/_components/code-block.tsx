import { codeToHtml } from 'shiki';

type Props = {
  code: string;
  lang?: string;
  className?: string;
};

export default async function CodeBlock({ code, lang = 'tsx', className }: Props) {
  const html = await codeToHtml(code, {
    lang,
    themes: { light: 'github-light', dark: 'github-dark-dimmed' },
    defaultColor: false,
  });

  return (
    <div
      className={`shiki-wrapper overflow-x-auto rounded-md text-xs ${className ?? ''}`}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
