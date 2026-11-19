/** Brand mark: gold-rimmed navy shield with a star and "NJ". Matches the home-screen icon (pipeline/build_icons.py). */
const SHIELD = "M50 0 L100 14.4 L100 57.6 C100 93.6 72 108 50 120 C28 108 0 93.6 0 57.6 L0 14.4 Z";

export function LogoMark({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="-4 -4 108 128" className={className} role="img" aria-label="NJ Police Reference">
      <path d={SHIELD} fill="#E2B24A" />
      <path d={SHIELD} fill="#0C1834" transform="translate(5.5 5.2) scale(0.89)" />
      <path d={SHIELD} fill="none" stroke="#F5D68C" strokeOpacity="0.7" strokeWidth="1.6" transform="translate(11 10.5) scale(0.78)" />
      <polygon
        points="50,22 53.2,30.6 62.4,30.9 55.2,36.6 57.7,45.4 50,40.3 42.3,45.4 44.8,36.6 37.6,30.9 46.8,30.6"
        fill="#F5D68C"
      />
      <text x="50" y="80" textAnchor="middle" fontSize="38" fontWeight="800" fill="#F1F5F9" letterSpacing="-1" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
        NJ
      </text>
    </svg>
  );
}

export function Wordmark({ light = true }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <LogoMark size={44} />
      <div className="leading-tight">
        <p className={"text-[11px] font-semibold uppercase tracking-[0.22em] " + (light ? "text-amber-300/90" : "text-amber-600")}>New Jersey</p>
        <p className={"text-xl font-extrabold tracking-tight " + (light ? "text-white" : "text-slate-900 dark:text-white")}>Police Reference</p>
      </div>
    </div>
  );
}
