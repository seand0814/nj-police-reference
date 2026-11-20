"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

/**
 * iOS "large title" behavior: when the big header scrolls away, a slim bar with the
 * title (and back button) slides in at the top. Place it at the bottom of the header.
 */
export default function CompactTitle({ title, back }: { title: string; back?: { href: string; label: string } }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting && e.boundingClientRect.top < 0), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={ref} aria-hidden className="absolute bottom-10 h-px w-px" />
      <div
        aria-hidden={!show}
        className={
          "fixed inset-x-0 top-0 z-20 border-b border-white/10 bg-navy-900/90 pt-[env(safe-area-inset-top)] text-white backdrop-blur-xl transition-all duration-200 " +
          (show ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0")
        }
      >
        <div className="mx-auto flex h-11 max-w-3xl items-center gap-1 px-2">
          {back ? (
            <Link href={back.href} aria-label={`Back to ${back.label}`} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gold-300">
              <Icon name="chevronLeft" size={22} />
            </Link>
          ) : (
            <span className="w-3" />
          )}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="min-w-0 flex-1 truncate pr-10 text-center text-[15px] font-semibold"
          >
            {title}
          </button>
        </div>
      </div>
    </>
  );
}
