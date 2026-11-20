"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { haptic } from "@/lib/haptics";
import Icon, { type IconName } from "./Icon";

const TABS: { href: string; label: string; icon: IconName }[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/search", label: "Search", icon: "search" },
  { href: "/ask", label: "Ask AI", icon: "chat" },
  { href: "/s/checklists", label: "Go-Bys", icon: "checklist" },
  { href: "/more", label: "More", icon: "grid" },
];

function isActive(href: string, path: string) {
  if (href === "/") return path === "/" || (path.startsWith("/s/") && path !== "/s/checklists") || path.startsWith("/entry/");
  if (href === "/s/checklists") return path === "/s/checklists" || path.startsWith("/go/") || path.startsWith("/compare");
  if (href === "/more") return ["/more", "/notes", "/contacts", "/radio-codes", "/tools", "/saved", "/az"].some((p) => path.startsWith(p));
  return path === href || path.startsWith(href + "/");
}

/** Pages that clearly belong to one tab. Other pages (entries, go-bys, sections) stay in whichever tab you opened them from. */
function ownerTab(path: string): string | null {
  if (path === "/") return "/";
  if (path === "/search") return "/search";
  if (path === "/ask") return "/ask";
  if (path === "/s/checklists") return "/s/checklists";
  if (["/more", "/notes", "/contacts", "/radio-codes", "/tools", "/saved", "/az"].some((p) => path.startsWith(p))) return "/more";
  return null;
}

const STATE_KEY = "njpr.tabs";
type TabState = { current: string; last: Record<string, string> };

function load(): TabState | null {
  try {
    return JSON.parse(sessionStorage.getItem(STATE_KEY) || "null");
  } catch {
    return null;
  }
}

export default function Nav() {
  const path = usePathname() || "/";
  const router = useRouter();
  const [state, setState] = useState<TabState | null>(null);

  // Like an iPhone tab bar: each tab remembers the last page you had open in it.
  useEffect(() => {
    const prev = load();
    const current = ownerTab(path) ?? prev?.current ?? TABS.find((t) => isActive(t.href, path))?.href ?? "/";
    const next: TabState = { current, last: { ...(prev?.last ?? {}), [current]: path } };
    setState(next);
    try {
      sessionStorage.setItem(STATE_KEY, JSON.stringify(next));
    } catch {}
  }, [path]);

  function tap(e: MouseEvent, href: string) {
    e.preventDefault();
    haptic();
    const current = state?.current ?? TABS.find((t) => isActive(t.href, path))?.href;
    if (current === href) {
      // Second tap: back to the top of this tab.
      if (path === href) window.scrollTo({ top: 0, behavior: "smooth" });
      else router.push(href);
      return;
    }
    const target = state?.last[href] ?? href;
    const next: TabState = { current: href, last: state?.last ?? {} };
    try {
      sessionStorage.setItem(STATE_KEY, JSON.stringify(next));
    } catch {}
    setState(next);
    router.push(target);
  }

  const activeTab = state?.current ?? TABS.find((t) => isActive(t.href, path))?.href ?? "/";

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200/80 bg-white/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl dark:border-white/10 dark:bg-ink-950/90"
    >
      <ul className="mx-auto grid max-w-3xl grid-cols-5 px-1">
        {TABS.map((t) => {
          const active = activeTab === t.href;
          return (
            <li key={t.href}>
              <Link
                href={t.href}
                onClick={(e) => tap(e, t.href)}
                aria-current={active ? "page" : undefined}
                className="group flex min-h-[60px] flex-col items-center justify-center gap-1 text-[11px] font-medium"
              >
                <span
                  className={
                    "flex h-8 w-14 items-center justify-center rounded-full transition " +
                    (active ? "bg-navy-800 text-gold-300 dark:bg-white/10" : "text-slate-500 dark:text-slate-400")
                  }
                >
                  <Icon name={t.icon} size={21} strokeWidth={active ? 2.1 : 1.8} />
                </span>
                <span className={active ? "font-semibold text-navy-800 dark:text-white" : "text-slate-500 dark:text-slate-400"}>{t.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
