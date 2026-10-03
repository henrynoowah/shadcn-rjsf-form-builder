import { getChangelog, versionAnchor } from '@/lib/changelog';
import registryData from '@/registry.json';

const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function GET() {
  const homepage = registryData.homepage.replace(/\/$/, '');
  const changelogUrl = `${homepage}/docs/changelog`;

  const items = getChangelog()
    .map((entry) => {
      const link = `${changelogUrl}#${versionAnchor(entry.version)}`;
      const body = [
        entry.summary ? `<p>${escapeXml(entry.summary)}</p>` : '',
        '<ul>',
        ...entry.changes.map((c) => `<li><strong>${c.type}</strong>: ${escapeXml(c.text.replace(/`/g, ''))}</li>`),
        '</ul>',
      ].join('');
      return `    <item>
      <title>v${entry.version}</title>
      <link>${link}</link>
      <guid isPermaLink="false">shadcn-rjsf-form-builder@${entry.version}</guid>
      <pubDate>${new Date(`${entry.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(body)}</description>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>shadcn-rjsf-form-builder releases</title>
    <link>${changelogUrl}</link>
    <description>Release notes for the shadcn-rjsf-form-builder registry items.</description>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
