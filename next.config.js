/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.graphassets.com',
      },
      {
        protocol: 'https',
        hostname: 'media.graphcms.com',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'api.qrserver.com',
      },
      {
        protocol: 'https',
        hostname: 'files.stripe.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    config.externals.push({
      bufferutil: 'commonjs bufferutil',
      'utf-8-validate': 'commonjs utf-8-validate',
    });

    if (!isServer) {
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        ws: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
