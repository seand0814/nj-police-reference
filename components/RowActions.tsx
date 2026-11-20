"use client";

import Link from "next/link";
import { useState } from "react";
import Icon, { type IconName } from "./Icon";
import GradeBadge from "./GradeBadge";
import type { Badge } from "@/lib/sections";
import { copyText } from "@/lib/copy";
import { haptic } from "@/lib/haptics";
import { closeSheet } from "@/lib/sheet";
import { KEYS, useStoredList } from "@/lib/useStoredList";

type Props = { href: string; title: string; citation?: string; badge?: Badge | null; points?: string[] };

function Action({ icon, label, onClick, href }: { icon: IconName; label: string; onClick?: () => void; href?: string }) {
  const cls = "flex min-h-[54px] w-full items-center gap-3 px-4 text-left font-medium active:bg-slate-100 dark:active:bg-white/5";
  const inner = (
    <>
      <Icon name={icon} size={20} className="text-navy-700 dark:text-gold-300" />
      <span className="flex-1">{label}</span>
    </>
  );
  return href ? (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

/** Long-press menu and quick preview for an entry, go-by or comparison. */
export default function RowActions({ href, title, citation, badge, points }: Props) {
  const id = href.startsWith("/entry/") ? href.slice(7) : null;
  const { items, save, loaded } = useStoredList<string>(KEYS.bookmarks);
  const [note, setNote] = useState("");
  const starred = !!id && items.includes(id);

  async function share() {
    const url = window.location.origin + href;
    haptic();
    try {
      if (navigator.share) {
        await navigator.share({ title, text: [title, citation].filter(Boolean).join(" · "), url });
        closeSheet();
        return;
      }
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
    }
    if (await copyText(`${title}\n${url}`)) setNote("Link copied");
  }

  return (
    <div>
      <div className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-bold leading-snug">{title}</h2>
          <GradeBadge badge={badge ?? null} large />
        </div>
        {citation ? <p className="mt-0.5 font-mono text-xs text-slate-500">{citation}</p> : null}
        {points?.length ? (
          <ul className="mt-3 space-y-2">
            {points.map((p, i) => (
              <li key={i} className="flex gap-2.5 text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                {p}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="-mx-4 divide-y divide-slate-100 border-t border-slate-100 dark:divide-white/5 dark:border-white/10">
        <Action icon="arrowRight" label="Open" href={href} />
        {id && loaded ? (
          <Action
            icon={starred ? "starFill" : "star"}
            label={starred ? "Remove star" : "Star"}
            onClick={() => {
              haptic(starred ? "light" : "success");
              save(starred ? items.filter((x) => x !== id) : [id, ...items]);
            }}
          />
        ) : null}
        <Action icon="share" label="Share" onClick={share} />
        {citation ? (
          <Action
            icon="copy"
            label="Copy citation"
            onClick={async () => {
              if (await copyText(`${citation} – ${title}`)) {
                haptic("success");
                setNote("Copied");
              }
            }}
          />
        ) : null}
      </div>
      {note ? <p className="pt-2 text-center text-xs font-semibold text-emerald-700 dark:text-emerald-400">{note}</p> : null}
    </div>
  );
}
