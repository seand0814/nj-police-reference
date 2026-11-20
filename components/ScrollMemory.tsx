"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const KEY = "njpr.scroll";
let wentBack = false;

function read(): Record<string, number> {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

/** Going back to a list returns you to the same spot, like a native app. */
export default function ScrollMemory() {
  const path = usePathname() || "/";

  useEffect(() => {
    const onPop = () => {
      wentBack = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (wentBack) {
      wentBack = false;
      const y = read()[path];
      if (y) {
        // Wait for lists to re-open their groups before scrolling.
        const go = () => window.scrollTo(0, y);
        requestAnimationFrame(go);
        const t1 = setTimeout(go, 60);
        const t2 = setTimeout(go, 250);
        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
        };
      }
    }
  }, [path]);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined;
    const save = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const all = read();
        all[path] = Math.round(window.scrollY);
        try {
          sessionStorage.setItem(KEY, JSON.stringify(all));
        } catch {}
      }, 120);
    };
    window.addEventListener("scroll", save, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", save);
    };
  }, [path]);

  return null;
}
