/** Placeholder shown for a split second while a page loads (navy header and grey lines). */
export default function Skeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div aria-busy="true" aria-label="Loading">
      <div className="-mx-4 -mt-6 mb-5 bg-gradient-to-b from-navy-900 to-navy-800 px-4 pb-6 pt-[max(1.5rem,env(safe-area-inset-top))]">
        <div className="h-4 w-20 animate-pulse rounded bg-white/15" />
        <div className="mt-5 h-3 w-28 animate-pulse rounded bg-gold-300/30" />
        <div className="mt-3 h-7 w-3/4 animate-pulse rounded-lg bg-white/20" />
        <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-white/10" />
      </div>
      <div className="space-y-2.5">
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-white/10 dark:bg-white/[0.04]">
            <div className="h-4 animate-pulse rounded bg-slate-200 dark:bg-white/10" style={{ width: `${85 - (i % 3) * 15}%` }} />
            <div className="mt-2 h-3 w-1/3 animate-pulse rounded bg-slate-100 dark:bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
