"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BookmarkButton from "./BookmarkButton";
import Icon from "./Icon";
import ShareButton from "./ShareButton";
import { copyText } from "@/lib/copy";
import { haptic } from "@/lib/haptics";
import { setNavDir } from "@/lib/navDir";

type Nb = { href: string; title: string } | null;
type Props = {
  id: string;
  title: string;
  path: string;
  shareText: string;
  copy: { text: string; label: string };
  prev: Nb;
  next: Nb;
  /** Hide the star (go-bys and comparisons aren't saved). */
  noStar?: boolean;
};

const HINT_KEY = "njpr.swipeHint";

/** True when the touch started inside something that scrolls sideways (tables, carousels) or a form field. */
function blocked(el: EventTarget | null) {
  let n = el as HTMLElement | null;
  while (n && n !== document.body) {
    if (n.dataset?.noswipe !== undefined || /^(INPUT|TEXTAREA|SELECT)$/.test(n.tagName)) return true;
    if (n.scrollWidth > n.clientWidth + 4) {
      const ox = getComputedStyle(n).overflowX;
      if (ox === "auto" || ox === "scroll") return true;
    }
    n = n.parentElement;
  }
  return false;
}

/**
 * Bottom action bar within thumb reach: previous, copy, share, star, next.
 * Swiping left or right anywhere on the page also moves to the next or previous item.
 */
export default function EntryActionBar({ id, title, path, shareText, copy, prev, next, noStar }: Props) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [hint, setHint] = useState(false);

  function go(to: Nb, d: "left" | "right") {
    if (!to) return;
    haptic();
    setNavDir(d);
    router.push(to.href);
  }

  useEffect(() => {
    if (prev || next) {
      try {
        if (!localStorage.getItem(HINT_KEY)) setHint(true);
      } catch {}
    }
    let sx = 0, sy = 0, t0 = 0, ok = false;
    const start = (e: TouchEvent) => {
      const t = e.touches[0];
      // Leave the screen edges to Safari's own back/forward swipe.
      ok = e.touches.length === 1 && t.clientX > 24 && t.clientX < window.innerWidth - 24 && !blocked(e.target);
      sx = t.clientX;
      sy = t.clientY;
      t0 = Date.now();
    };
    const end = (e: TouchEvent) => {
      if (!ok) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - sx, dy = t.clientY - sy;
      if (Date.now() - t0 > 700 || Math.abs(dx) < 70 || Math.abs(dy) > Math.abs(dx) * 0.5) return;
      try {
        localStorage.setItem(HINT_KEY, "1");
      } catch {}
      if (dx < 0) go(next, "left");
      else go(prev, "right");
    };
    document.addEventListener("touchstart", start, { passive: true });
    document.addEventListener("touchend", end, { passive: true });
    return () => {
      document.removeEventListener("touchstart", start);
      document.removeEventListener("touchend", end);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prev?.href, next?.href]);

  async function doCopy() {
    const ok = await copyText(copy.text);
    if (ok) {
      haptic("success");
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  }

  const nav = "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white/90 active:scale-95 disabled:opacity-30";

  return (
    <div className="sticky bottom-[calc(68px+env(safe-area-inset-bottom))] z-10 mt-6" data-noswipe>
      {hint ? (
        <p className="mb-2 text-center text-xs text-slate-500 dark:text-slate-400">
          Tip: swipe left or right for the next or previous one
          <button
            type="button"
            onClick={() => {
              setHint(false);
              try {
                localStorage.setItem(HINT_KEY, "1");
              } catch {}
            }}
            className="ml-2 font-semibold text-brand dark:text-brand-dark"
          >
            Got it
          </button>
        </p>
      ) : null}
      <div className="mx-auto flex max-w-md items-center gap-1 rounded-2xl border border-white/10 bg-navy-900/95 p-1.5 shadow-2xl shadow-navy-900/30 backdrop-blur">
        {prev ? (
          <Link href={prev.href} onClick={() => { haptic(); setNavDir("right"); }} aria-label={`Previous: ${prev.title}`} className={nav}>
            <Icon name="chevronLeft" size={22} />
          </Link>
        ) : (
          <button type="button" disabled aria-label="No previous" className={nav}>
            <Icon name="chevronLeft" size={22} />
          </button>
        )}
        <button
          type="button"
          onClick={doCopy}
          className="flex h-11 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl bg-gold-400 px-3 text-sm font-bold text-navy-900 active:scale-[0.97]"
        >
          <Icon name={copied ? "check" : "copy"} size={17} />
          <span className="truncate">{copied ? "Copied" : copy.label}</span>
        </button>
        <ShareButton title={title} text={shareText} path={path} />
        {noStar ? null : <BookmarkButton id={id} />}
        {next ? (
          <Link href={next.href} onClick={() => { haptic(); setNavDir("left"); }} aria-label={`Next: ${next.title}`} className={nav}>
            <Icon name="chevronRight" size={22} />
          </Link>
        ) : (
          <button type="button" disabled aria-label="No next" className={nav}>
            <Icon name="chevronRight" size={22} />
          </button>
        )}
      </div>
    </div>
  );
}
