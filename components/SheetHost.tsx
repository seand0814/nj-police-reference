"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { closeSheet, onSheet } from "@/lib/sheet";

/** iOS-style bottom sheet: slides up, tap outside or drag down to close. */
export default function SheetHost() {
  const [content, setContent] = useState<ReactNode | null>(null);
  const [shown, setShown] = useState(false);
  const [drag, setDrag] = useState(0);
  const startY = useRef<number | null>(null);
  const path = usePathname();

  useEffect(
    () =>
      onSheet((c) => {
        if (c) {
          setContent(c);
          requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
        } else {
          setShown(false);
          setTimeout(() => setContent(null), 220);
        }
      }),
    []
  );

  // Close when the page changes (e.g. after tapping "Open").
  useEffect(() => {
    closeSheet();
  }, [path]);

  useEffect(() => {
    if (content) document.body.dataset.sheet = "open";
    else delete document.body.dataset.sheet;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && closeSheet();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [content]);

  if (!content) return null;
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      <button
        type="button"
        aria-label="Close"
        onClick={closeSheet}
        className={"absolute inset-0 bg-black/40 transition-opacity duration-200 " + (shown ? "opacity-100" : "opacity-0")}
      />
      <div
        className="absolute inset-x-0 bottom-0 mx-auto max-h-[85vh] max-w-3xl overflow-y-auto rounded-t-3xl bg-white pb-[max(1rem,env(safe-area-inset-bottom))] shadow-2xl dark:bg-ink-900"
        style={{
          transform: shown ? `translateY(${drag}px)` : "translateY(100%)",
          transition: startY.current === null ? "transform 0.24s cubic-bezier(0.2, 0.8, 0.2, 1)" : "none",
        }}
      >
        <div
          className="sticky top-0 z-10 flex justify-center bg-white pb-2 pt-2.5 dark:bg-ink-900"
          onTouchStart={(e) => {
            startY.current = e.touches[0].clientY;
          }}
          onTouchMove={(e) => {
            if (startY.current !== null) setDrag(Math.max(0, e.touches[0].clientY - startY.current));
          }}
          onTouchEnd={() => {
            startY.current = null;
            if (drag > 90) closeSheet();
            setDrag(0);
          }}
        >
          <span className="h-1.5 w-10 rounded-full bg-slate-300 dark:bg-white/20" />
        </div>
        <div className="px-4">{content}</div>
      </div>
    </div>
  );
}
