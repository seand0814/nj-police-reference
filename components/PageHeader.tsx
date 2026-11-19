import Link from "next/link";
import type { ReactNode } from "react";
import Icon, { type IconName } from "./Icon";

type Props = {
  title: ReactNode;
  eyebrow?: ReactNode;
  subtitle?: ReactNode;
  back?: { href: string; label: string };
  icon?: IconName;
  iconBg?: string;
  actions?: ReactNode;
  children?: ReactNode;
};

/** Navy page header with a gold hairline: the shared top of every section, entry and go-by page. */
export default function PageHeader({ title, eyebrow, subtitle, back, icon, iconBg = "bg-white/15", actions, children }: Props) {
  return (
    <header className="relative -mx-4 -mt-6 mb-5 overflow-hidden bg-gradient-to-b from-navy-900 to-navy-800 px-4 pb-6 pt-[max(1.5rem,env(safe-area-inset-top))] text-white">
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/10 blur-2xl" />
      <div className="relative">
        {back ? (
          <Link href={back.href} className="inline-flex min-h-[32px] items-center gap-1 text-sm font-medium text-white/75">
            <Icon name="chevronLeft" size={16} /> {back.label}
          </Link>
        ) : null}
        <div className="mt-3 flex items-start gap-3">
          {icon ? (
            <span className={"flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg shadow-black/20 " + iconBg}>
              <Icon name={icon} size={24} />
            </span>
          ) : null}
          <div className="min-w-0 flex-1">
            {eyebrow ? <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-300">{eyebrow}</p> : null}
            <h1 className="mt-0.5 text-[1.6rem] font-bold leading-tight tracking-tight">{title}</h1>
            {subtitle ? <p className="mt-1 text-sm leading-snug text-white/75">{subtitle}</p> : null}
          </div>
          {actions ? <div className="flex shrink-0 gap-2">{actions}</div> : null}
        </div>
        {children}
      </div>
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />
    </header>
  );
}
