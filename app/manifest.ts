import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NJ Police Reference",
    short_name: "NJ Police Ref",
    description: "New Jersey statutes, case law, checklists and go-bys for patrol officers.",
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#1e3a8a",
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
