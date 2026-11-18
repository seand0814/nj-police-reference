"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Home", icon: "🏛️" },
  { href: "/search", label: "Search", icon: "🔎" },
  { href: "/ask", label: "Ask AI", icon: "💬" },
  { href: "/s/checklists", label: "Go-Bys", icon: "✅" },
  { href: "/more", label: "More", icon: "☰" },
];

function isActive(href: string, path: string) {
  if (href === "/") return path === "/" || (path.startsWith("/s/") && path !== "/s/checklists") || path.startsWith("/entry/");
  if (href === "/s/checklists") return path === "/s/checklists" || path.startsWith("/go/");
  if (href === "/more") return ["/more", "/notes", "/contacts", "/radio-codes", "/tools", "/saved"].some((p) => path.startsWith(p));
  return path === href || path.startsWith(href + "/");
}

export default function Nav() {
  const path = usePathname() || "/";
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur dark:border-slate-800 dark:bg-slate-950/95"
    >
      <ul className="mx-auto grid max-w-3xl grid-cols-5">
        {TABS.map((t) => {
          const active = isActive(t.href, path);
          return (
            <li key={t.href}>
              <Link
                href={t.href}
                aria-current={active ? "page" : undefined}
                className={
                  "flex min-h-[58px] flex-col items-center justify-center gap-0.5 text-[11px] " +
                  (active ? "font-bold text-brand dark:text-brand-dark" : "text-slate-500 dark:text-slate-400")
                }
              >
                <span aria-hidden className={"text-xl leading-none transition " + (active ? "scale-110" : "opacity-70 grayscale")}>{t.icon}</span>
                {t.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
