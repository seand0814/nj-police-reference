/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  // The chat API reads content/ at request time; make sure Vercel bundles those files with it.
  outputFileTracingIncludes: {
    "/api/chat": ["./content/**/*"],
  },
};
export default nextConfig;
