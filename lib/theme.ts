export type ThemeChoice = "auto" | "light" | "dark" | "night";
export const THEME_KEY = "njpr.theme";

/** Runs before the page paints (inlined in <head>) so there is no flash of the wrong theme. */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("${"njpr.theme"}")||"auto";var d=t==="dark"||t==="night"||(t==="auto"&&window.matchMedia("(prefers-color-scheme: dark)").matches);var c=document.documentElement.classList;c.toggle("dark",d);c.toggle("night",t==="night");}catch(e){}})();`;

export function applyTheme(t: ThemeChoice) {
  const dark = t === "dark" || t === "night" || (t === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  const c = document.documentElement.classList;
  c.toggle("dark", dark);
  c.toggle("night", t === "night");
}
