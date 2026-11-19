/** Simple line icons (24×24, stroke-based) used across the app instead of emoji. */
export type IconName =
  | "home" | "search" | "chat" | "checklist" | "grid" | "scale" | "car" | "glass" | "house" | "badge" | "shield" | "book"
  | "eye" | "radio" | "pulse" | "language" | "paw" | "star" | "starFill" | "share" | "moon" | "sun" | "auto" | "chevronRight"
  | "chevronLeft" | "external" | "copy" | "check" | "note" | "phone" | "calculator" | "az" | "branch" | "template" | "list"
  | "alert" | "clock" | "speaker" | "lock" | "pin" | "file" | "gavel";

const P: Record<IconName, string[]> = {
  home: ["M3 10.5 12 3l9 7.5", "M5 9v11h14V9", "M10 20v-6h4v6"],
  search: ["M10.5 3a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15z", "m21 21-5.2-5.2"],
  chat: ["M4 5h16v11H9l-5 4z", "M8 10h8", "M8 13h5"],
  checklist: ["M9 6h11", "M9 12h11", "M9 18h11", "m3.5 6 1.5 1.5L7.5 5", "m3.5 12 1.5 1.5 2.5-2.5", "m3.5 18 1.5 1.5 2.5-2.5"],
  grid: ["M4 4h7v7H4z", "M13 4h7v7h-7z", "M4 13h7v7H4z", "M13 13h7v7h-7z"],
  scale: ["M12 3v18", "M7 21h10", "M5 7h14", "M5 7l-3 7a3 3 0 0 0 6 0z", "M19 7l-3 7a3 3 0 0 0 6 0z", "M12 3a1 1 0 1 1 0 .01"],
  car: ["M5 16V11l2-5h10l2 5v5", "M3 16h18v3H3z", "M7 19v2", "M17 19v2", "M5 11h14", "M7.5 13.5h.01", "M16.5 13.5h.01"],
  glass: ["M7 3h10l-1 7a4 4 0 0 1-8 0z", "M12 14v6", "M8 21h8"],
  house: ["M3 11 12 4l9 7", "M5 10v10h14V10", "M12 18s-3.5-2-3.5-4.2A2 2 0 0 1 12 12.6a2 2 0 0 1 3.5 1.2C15.5 16 12 18 12 18z"],
  badge: ["M12 2.5l2.3 2.1 3.1-.4.9 3 2.8 1.5-1 3 1 3-2.8 1.5-.9 3-3.1-.4L12 21.5l-2.3-2.1-3.1.4-.9-3-2.8-1.5 1-3-1-3 2.8-1.5.9-3 3.1.4z", "m12 8.5 1 2.1 2.3.3-1.7 1.6.4 2.3-2-1.1-2 1.1.4-2.3-1.7-1.6 2.3-.3z"],
  shield: ["M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z", "m9 12 2 2 4-4"],
  book: ["M4 5a2 2 0 0 1 2-2h13v15H6a2 2 0 0 0-2 2z", "M4 20a2 2 0 0 0 2 2h13v-4", "M8 7h7"],
  eye: ["M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z", "M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"],
  radio: ["M4 10h16v10H4z", "M8 10 17 4", "M8 15h.01", "M13 13h4", "M13 17h4"],
  pulse: ["M3 12h4l2-5 4 10 2-5h6"],
  language: ["M4 5h9", "M8.5 3v2", "M6 5c.5 3 2.5 5.5 5 7", "M11 5c-.5 3-2.5 5.5-5.5 7.5", "m13 21 4-9 4 9", "M14.5 18h5"],
  paw: ["M8 6.5a1.5 2 0 1 1 0 .01", "M16 6.5a1.5 2 0 1 1 0 .01", "M4.5 11a1.5 1.8 0 1 1 0 .01", "M19.5 11a1.5 1.8 0 1 1 0 .01", "M12 12c-3 0-5 3.5-5 5.5S9 20 12 20s5-.5 5-2.5S15 12 12 12z"],
  star: ["m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9z"],
  starFill: ["m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9z"],
  share: ["M12 3v12", "m7.5 7.5 4.5-4.5 4.5 4.5", "M5 12v8h14v-8"],
  moon: ["M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"],
  sun: ["M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z", "M12 2v2", "M12 20v2", "m4.9 4.9 1.4 1.4", "m17.7 17.7 1.4 1.4", "M2 12h2", "M20 12h2", "m4.9 19.1 1.4-1.4", "m17.7 6.3 1.4-1.4"],
  auto: ["M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z", "M12 3v18", "M12 3a9 9 0 0 0 0 18"],
  chevronRight: ["m9 5 7 7-7 7"],
  chevronLeft: ["m15 5-7 7 7 7"],
  external: ["M14 4h6v6", "M20 4l-9 9", "M18 14v6H4V6h6"],
  copy: ["M9 9h11v11H9z", "M5 15H4V4h11v1"],
  check: ["m5 12 5 5 9-10"],
  note: ["M5 3h10l4 4v14H5z", "M14 3v5h5", "M8 13h8", "M8 17h5"],
  phone: ["M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"],
  calculator: ["M6 3h12v18H6z", "M9 7h6", "M9 12h.01", "M12 12h.01", "M15 12h.01", "M9 16h.01", "M12 16h.01", "M15 16h.01"],
  az: ["m3 18 3.5-12L10 18", "M4.2 14h4.6", "M14 6h6l-6 12h6"],
  branch: ["M6 3v12", "M6 15a3 3 0 1 0 0 .01", "M18 9a3 3 0 1 0 0-.01", "M18 9c0 4-6 3-12 6"],
  template: ["M5 3h14v18H5z", "M8 7h8", "M8 11h8", "M8 15h4"],
  list: ["M8 6h12", "M8 12h12", "M8 18h12", "M4 6h.01", "M4 12h.01", "M4 18h.01"],
  alert: ["M12 3 2 20h20z", "M12 10v4", "M12 17h.01"],
  clock: ["M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z", "M12 7v5l3 2"],
  speaker: ["M4 9h4l5-4v14l-5-4H4z", "M16 9a4 4 0 0 1 0 6", "M18.5 6.5a7.5 7.5 0 0 1 0 11"],
  lock: ["M6 11h12v10H6z", "M8.5 11V8a3.5 3.5 0 0 1 7 0v3"],
  pin: ["M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z", "M12 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"],
  file: ["M6 3h9l4 4v14H6z", "M14 3v5h5"],
  gavel: ["m14 4 6 6", "m11 7 6 6", "m12.5 5.5-4 4 6 6 4-4", "M10.5 11.5 3 19l2 2 7.5-7.5", "M13 21h8"],
};

export default function Icon({ name, size = 22, className = "", strokeWidth = 1.8 }: { name: IconName; size?: number; className?: string; strokeWidth?: number }) {
  const filled = name === "starFill";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {P[name].map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
