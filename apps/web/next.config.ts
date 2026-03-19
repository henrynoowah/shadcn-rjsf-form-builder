import type { NextConfig } from 'next';

const config: NextConfig = {
  outputFileTracingIncludes: {
    '/r/[name]': ['./registry/**/*'],
  },
};

export default config;
