/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@sms/shared"],
  // Enable standalone output for Docker deployment
  output: "standalone",
};

module.exports = nextConfig;
