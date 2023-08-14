/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "media.graphcms.com",
      "media.graphassets.com",
      "localhost",
      "api.qrserver.com",
      "files.stripe.com",
      "images.unsplash.com",
    ],
  },
  basePath: '',
};

module.exports = nextConfig;
