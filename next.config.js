/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: [
      "d144dqt8e4woe2.cloudfront.net",
      "hbothq-bucket.s3.ap-southeast-2.amazonaws.com",
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "1mb",
      allowedOrigins: ["*"],
    },
  },
};

export default config;
