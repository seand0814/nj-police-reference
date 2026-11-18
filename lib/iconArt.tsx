/** Shared artwork for the app icons: a navy badge with gold "NJ" and a small label. */
export function IconArt({ size }: { size: number }) {
  const s = size / 512;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #1d4ed8 100%)",
      }}
    >
      <div
        style={{
          width: 330 * s,
          height: 370 * s,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: `${14 * s}px solid #fbbf24`,
          borderRadius: 64 * s,
          background: "rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ fontSize: 170 * s, fontWeight: 800, color: "#fbbf24", letterSpacing: -6 * s, lineHeight: 1 }}>NJ</div>
        <div style={{ marginTop: 14 * s, fontSize: 40 * s, fontWeight: 700, color: "#e2e8f0", letterSpacing: 6 * s }}>POLICE REF</div>
      </div>
    </div>
  );
}
