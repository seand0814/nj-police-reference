"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  if (href === "/s/checklists") return path === "/s/checklists" || path.startsWith("/go/");
  if (href === "/more") return ["/more", "/notes", "/contacts", "/radio-codes", "/tools", "/saved", "/az"].some((p) => path.startsWith(p));
  return path === href || path.startsWith(href + "/");
}

export default function Nav() {
  const path = usePathname() || "/";
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200/80 bg-white/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl dark:border-white/10 dark:bg-ink-950/90"
    >
      <ul className="mx-auto grid max-w-3xl grid-cols-5 px-1">
        {TABS.map((t) => {
          const active = isActive(t.href, path);
          return (
            <li key={t.href}>
              <Link
                href={t.href}
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
