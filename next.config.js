/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "d144dqt8e4woe2.cloudfront.net",
      "hbothq-bucket.s3.ap-southeast-2.amazonaws.com",
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      "picsum.photos",
      "drive.google.com",
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "1mb",
      allowedOrigins: ["*"],
    },
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
