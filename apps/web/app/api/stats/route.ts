import { NextResponse } from 'next/server';
import { getAllRegistryItems } from '@/lib/registry';
import { redis } from '@/lib/redis';

export async function GET() {
  const names = getAllRegistryItems().map((item) => item.name);

  if (!redis) {
    return NextResponse.json(
      { error: 'Redis not configured' },
      { status: 501 }
    );
  }

  const counts = names.length
    ? await redis.mget<number[]>(...names.map((name) => `downloads:${name}`))
    : [];

  return NextResponse.json(
    Object.fromEntries(names.map((name, i) => [name, counts[i] ?? 0]))
  );
}
