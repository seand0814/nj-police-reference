import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import AppChrome from "@/components/AppChrome";
import Nav from "@/components/Nav";
import SheetHost from "@/components/SheetHost";
import OfflineSupport from "@/components/OfflineSupport";
import { THEME_SCRIPT } from "@/lib/theme";
import splash from "@/lib/splash.json";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

// Custom domain if set; otherwise Vercel's production URL; otherwise localhost.
const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "NJ Police Reference",
  description: "New Jersey statutes with grading, case law, checklists and go-bys for patrol officers.",
  applicationName: "NJ Police Reference",
  appleWebApp: { capable: true, title: "NJ Police Ref", statusBarStyle: "black-translucent", startupImage: splash },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "NJ Police Reference",
    description: "New Jersey statutes, case law, checklists and go-bys for patrol officers.",
    images: [{ url: "/logo-1024.png", width: 1024, height: 1024 }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0c1834",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-screen font-sans">
        <OfflineSupport />
        <main className="mx-auto max-w-3xl px-4 pb-28 pt-6">{children}</main>
        <Nav />
        <AppChrome />
        <SheetHost />
      </body>
    </html>
  );
}
