import type { Metadata, Viewport } from "next";
import Nav from "@/components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "NJ Police Reference",
  description: "New Jersey statutes with grading, DWI and drug recognition, case law and field procedures.",
  appleWebApp: { capable: true, title: "NJ Police Ref", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <main className="mx-auto max-w-3xl px-4 pb-28 pt-6">{children}</main>
        <Nav />
      </body>
    </html>
  );
}
