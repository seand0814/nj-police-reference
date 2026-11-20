/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  // The chat API reads content/ at request time; make sure Vercel bundles those files with it.
  outputFileTracingIncludes: {
    "/api/chat": ["./content/**/*"],
  },
  // The offline service worker must always be re-checked so updates reach phones.
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
    ];
  },
};
export default nextConfig;
