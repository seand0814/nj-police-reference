"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import ScrollMemory from "./ScrollMemory";
import { haptic } from "@/lib/haptics";
import { setNavDir } from "@/lib/navDir";
import { isStandalone } from "@/lib/theme";

const BUILD = process.env.NEXT_PUBLIC_BUILD_ID || "dev";
const PULL = 80; // px to pull before a refresh
const EDGE = 22; // px from the left edge where a back swipe can start

/**
 * Native-app touches for the Home Screen version (Safari has its own):
 * swipe from the left edge to go back, pull down at the top to refresh,
 * plus an "update available" banner and scroll memory everywhere.
 */
export default function AppChrome() {
  const router = useRouter();
  const [pull, setPull] = useState(0);
  const [edge, setEdge] = useState(0);
  const [update, setUpdate] = useState(false);
  const g = useRef({ mode: "" as "" | "pull" | "edge", x: 0, y: 0, fired: false, pull: 0, edge: 0 });

  // New version check: on open and whenever the app comes back to the foreground (at most every 10 minutes).
  useEffect(() => {
    if (BUILD === "dev") return;
    let last = 0;
    const check = () => {
      if (document.visibilityState !== "visible" || !navigator.onLine || Date.now() - last < 600_000) return;
      last = Date.now();
      fetch("/version.json", { cache: "no-store" })
        .then((r) => r.json())
        .then((v: { version: string }) => setUpdate(!!v.version && v.version !== "dev" && v.version !== BUILD))
        .catch(() => {});
    };
    check();
    document.addEventListener("visibilitychange", check);
    return () => document.removeEventListener("visibilitychange", check);
  }, []);

  useEffect(() => {
    if (!isStandalone()) return;
    const blocked = () => document.body.dataset.sheet === "open";
    const start = (e: TouchEvent) => {
      if (e.touches.length !== 1 || blocked()) return;
      const t = e.touches[0];
      g.current = { mode: "", x: t.clientX, y: t.clientY, fired: false, pull: 0, edge: 0 };
      if (t.clientX < EDGE) g.current.mode = "edge";
      else if (window.scrollY <= 0) g.current.mode = "pull";
    };
    const move = (e: TouchEvent) => {
      const s = g.current;
      if (!s.mode) return;
      const t = e.touches[0];
      const dx = t.clientX - s.x;
      const dy = t.clientY - s.y;
      if (s.mode === "edge") {
        if (Math.abs(dy) > Math.abs(dx) && dx < 20) return void (s.mode = "");
        s.edge = Math.max(0, Math.min(dx, 140));
        setEdge(s.edge);
      } else {
        if (Math.abs(dx) > Math.abs(dy) || window.scrollY > 0) {
          s.mode = "";
          s.pull = 0;
          setPull(0);
          return;
        }
        const p = Math.max(0, Math.min(dy * 0.55, 120));
        if (p >= PULL && !s.fired) {
          s.fired = true;
          haptic();
        }
        s.pull = p;
        setPull(p);
      }
    };
    const end = () => {
      const s = g.current;
      if (s.mode === "edge") {
        setEdge(0);
        if (s.edge > 80) {
          haptic();
          setNavDir("right");
          if (window.history.length > 1) router.back();
          else router.push("/");
        }
      } else if (s.mode === "pull") {
        if (s.pull >= PULL) {
          setPull(PULL);
          setTimeout(() => window.location.reload(), 150);
        } else setPull(0);
      }
      s.mode = "";
    };
    document.addEventListener("touchstart", start, { passive: true });
    document.addEventListener("touchmove", move, { passive: true });
    document.addEventListener("touchend", end, { passive: true });
    document.addEventListener("touchcancel", end, { passive: true });
    return () => {
      document.removeEventListener("touchstart", start);
      document.removeEventListener("touchmove", move);
      document.removeEventListener("touchend", end);
      document.removeEventListener("touchcancel", end);
    };
  }, [router]);

  return (
    <>
      <ScrollMemory />

      {pull > 0 ? (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center"
          style={{ transform: `translateY(calc(env(safe-area-inset-top) + ${pull - 34}px))` }}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-navy-800 shadow-lg dark:bg-navy-800 dark:text-gold-300">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              className={pull >= PULL ? "animate-spin" : ""}
              style={pull >= PULL ? undefined : { transform: `rotate(${pull * 3}deg)` }}
            >
              <path d="M21 12a9 9 0 1 1-3-6.7" />
              <path d="M21 4v5h-5" />
            </svg>
          </span>
        </div>
      ) : null}

      {edge > 0 ? (
        <div aria-hidden className="pointer-events-none fixed left-0 top-1/2 z-40 -translate-y-1/2" style={{ transform: `translate(${edge * 0.5 - 30}px, -50%)` }}>
          <span
            className={
              "flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition-colors " +
              (edge > 80 ? "bg-gold-400 text-navy-900" : "bg-white text-navy-800 dark:bg-navy-800 dark:text-white")
            }
          >
            <Icon name="chevronLeft" size={22} />
          </span>
        </div>
      ) : null}

      {update ? (
        <div className="fixed inset-x-3 bottom-[calc(76px+env(safe-area-inset-bottom))] z-30 mx-auto flex max-w-md items-center gap-3 rounded-2xl bg-navy-900 p-3 pl-4 text-white shadow-2xl">
          <Icon name="alert" size={18} className="shrink-0 text-gold-300" />
          <span className="flex-1 text-sm font-medium">A new version is available.</span>
          <button type="button" onClick={() => window.location.reload()} className="h-10 rounded-xl bg-gold-400 px-4 text-sm font-bold text-navy-900">
            Update
          </button>
          <button type="button" aria-label="Later" onClick={() => setUpdate(false)} className="flex h-10 w-8 items-center justify-center text-white/60">
            <Icon name="close" size={16} />
          </button>
        </div>
      ) : null}
    </>
  );
}
