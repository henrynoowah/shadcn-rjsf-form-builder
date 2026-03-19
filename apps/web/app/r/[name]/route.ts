import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
import { getRegistryItem, getAllRegistryItems } from '@/lib/registry';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const item = getRegistryItem(name.replace(/\.json$/, ''));

  if (!item) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const { origin } = new URL(request.url);
  const localNames = new Set(getAllRegistryItems().map((i) => i.name));
  const registryDependencies = (item.registryDependencies ?? []).map((dep) => {
    if (dep.startsWith('http')) return dep;
    // Only rewrite deps that live in this registry; leave official shadcn names as-is
    return localNames.has(dep) ? `${origin}/r/${dep}.json` : dep;
  });

  const files = item.files.map((file) => {
    const relativePath = file.path.replace('registry/', '');
    const absolutePath = join(process.cwd(), 'registry', relativePath);
    const content = readFileSync(absolutePath, 'utf-8');
    return {
      path: file.path,
      type: file.type,
      content,
    };
  });

  return NextResponse.json(
    { ...item, registryDependencies, files },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600',
      },
    }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
    },
  });
}
