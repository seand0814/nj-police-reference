export const dynamic = "force-static";

/** The deployed version. The app compares it with its own to offer "Update". */
export function GET() {
  return Response.json({ version: process.env.NEXT_PUBLIC_BUILD_ID || "dev" });
}
