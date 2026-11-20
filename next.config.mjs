/** @type {import('next').NextConfig} */
const BUILD_ID = (process.env.VERCEL_GIT_COMMIT_SHA || process.env.VERCEL_DEPLOYMENT_ID || "dev").slice(0, 12);

const nextConfig = {
  reactStrictMode: true,
  // Lets the app notice when a newer version has been published.
  env: { NEXT_PUBLIC_BUILD_ID: BUILD_ID },
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
