import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    domains: ['picsum.photos', 'rbkzdxccqxasqaqrlhum.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'rbkzdxccqxasqaqrlhum.supabase.co',
      },
    ],
  },
}

export default nextConfig
