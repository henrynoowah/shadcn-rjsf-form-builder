import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
import { getRegistryItem } from '@/lib/registry';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const item = getRegistryItem(name);

  if (!item) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

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
    { ...item, files },
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
