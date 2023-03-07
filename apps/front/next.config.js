/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['image.tmdb.org', 'upload.wikimedia.org', 'help.twitter.com'],
  },
};

module.exports = nextConfig;
