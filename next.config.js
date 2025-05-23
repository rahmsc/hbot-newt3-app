/*
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "hbothq-bucket.s3.ap-southeast-2.amazonaws.com",
      "lh3.googleusercontent.com",
      "fastly.picsum.photos",
      "picsum.photos",
      "d144dqt8e4woe2.cloudfront.net",
      "maps.googleapis.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hbothq-bucket.s3.ap-southeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "maps.googleapis.com",
        port: "",
        pathname: "/maps/api/place/photo/**",
      },
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

export default nextConfig;
