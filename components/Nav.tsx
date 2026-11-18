"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Browse", icon: "📚" },
  { href: "/search", label: "Search", icon: "🔎" },
  { href: "/saved", label: "Saved", icon: "★" },
  { href: "/notes", label: "Notes", icon: "📝" },
  { href: "/more", label: "More", icon: "☰" },
];

export default function Nav() {
  const path = usePathname() || "/";
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur dark:border-slate-800 dark:bg-slate-950/95"
    >
      <ul className="mx-auto grid max-w-3xl grid-cols-5">
        {TABS.map((t) => {
          const active =
            t.href === "/"
              ? path === "/" || path.startsWith("/c/") || path.startsWith("/entry/")
              : path === t.href || path.startsWith(t.href + "/");
          return (
            <li key={t.href}>
              <Link
                href={t.href}
                aria-current={active ? "page" : undefined}
                className={
                  "flex min-h-[56px] flex-col items-center justify-center text-xs " +
                  (active ? "font-semibold text-brand dark:text-brand-dark" : "text-slate-500 dark:text-slate-400")
                }
              >
                <span aria-hidden className="text-lg leading-none">{t.icon}</span>
                {t.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
