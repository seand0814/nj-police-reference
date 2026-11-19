import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NJ Police Reference",
    short_name: "NJ Police Ref",
    description: "New Jersey statutes, case law, checklists and go-bys for patrol officers.",
    start_url: "/",
    display: "standalone",
    background_color: "#0c1834",
    theme_color: "#0c1834",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
