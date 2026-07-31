import { NextResponse, after } from 'next/server';
import type { NextRequest } from 'next/server';
import { getRegistryItem } from '@/lib/registry';
import { redis } from '@/lib/redis';

// Prebuilt files in public/r/*.json shadow app/r/[name]/route.ts, so this is
// the only place a request for a registry item is guaranteed to pass through.
export function middleware(request: NextRequest) {
  const name = request.nextUrl.pathname.replace(/^\/r\//, '').replace(/\.json$/, '');
  const client = redis;
  if (client && getRegistryItem(name)) {
    after(() => client.incr(`downloads:${name}`).catch(() => {}));
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/r/:name*',
};
