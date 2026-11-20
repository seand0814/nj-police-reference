export type ThemeChoice = "auto" | "light" | "dark" | "night";
export const THEME_KEY = "njpr.theme";

/** Runs before the page paints (inlined in <head>) so there is no flash of the wrong theme. */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("${"njpr.theme"}")||"auto";var d=t==="dark"||t==="night"||(t==="auto"&&window.matchMedia("(prefers-color-scheme: dark)").matches);var c=document.documentElement.classList;c.toggle("dark",d);c.toggle("night",t==="night");var z=localStorage.getItem("njpr.textSize");if(z)document.documentElement.style.fontSize=z;if(navigator.standalone||window.matchMedia("(display-mode: standalone)").matches)c.add("standalone");}catch(e){}})();`;

export const TEXT_KEY = "njpr.textSize";
export const TEXT_SIZES = [
  { value: "93.75%", label: "Small" },
  { value: "", label: "Default" },
  { value: "112.5%", label: "Large" },
  { value: "125%", label: "Larger" },
] as const;

export function applyTextSize(v: string) {
  document.documentElement.style.fontSize = v;
  try {
    if (v) localStorage.setItem(TEXT_KEY, v);
    else localStorage.removeItem(TEXT_KEY);
  } catch {}
}

/** True when opened from the Home Screen icon (no Safari toolbar). */
export function isStandalone() {
  if (typeof window === "undefined") return false;
  return (navigator as unknown as { standalone?: boolean }).standalone === true || window.matchMedia("(display-mode: standalone)").matches;
}

export function applyTheme(t: ThemeChoice) {
  const dark = t === "dark" || t === "night" || (t === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  const c = document.documentElement.classList;
  c.toggle("dark", dark);
  c.toggle("night", t === "night");
}
