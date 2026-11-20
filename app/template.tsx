"use client";

import { useState } from "react";
import { takeNavDir } from "@/lib/navDir";

/** Re-mounts on every page change: a short fade, or a slide when you swiped to the next or previous entry. */
export default function Template({ children }: { children: React.ReactNode }) {
  const [cls] = useState(() => {
    const d = typeof window === "undefined" ? null : takeNavDir();
    return d === "left" ? "page-in-left" : d === "right" ? "page-in-right" : "page-in";
  });
  return <div className={cls}>{children}</div>;
}
