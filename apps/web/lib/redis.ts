import { Redis } from '@upstash/redis';

// ponytail: Vercel's Upstash Marketplace integration names vary by version
// (UPSTASH_REDIS_REST_* vs KV_REST_API_*) — support both instead of picking one
export const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
      ? new Redis({
          url: process.env.KV_REST_API_URL,
          token: process.env.KV_REST_API_TOKEN,
        })
      : null;
