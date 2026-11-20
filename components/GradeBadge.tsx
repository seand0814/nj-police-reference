import type { Badge } from "@/lib/sections";

export default function GradeBadge({ badge, large }: { badge: Badge | null; large?: boolean }) {
  if (!badge) return null;
  return (
    <span
      className={
        "inline-flex shrink-0 items-center justify-center rounded-full font-bold " +
        (large ? "px-3 py-1 text-sm " : "min-w-[3.25rem] px-2 py-0.5 text-[11px] ") +
        badge.cls
      }
    >
      {badge.label}
    </span>
  );
}

