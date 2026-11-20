/** Direction of the next page change, so the new page can slide in from the matching side. */
let dir: "left" | "right" | null = null;

export function setNavDir(d: "left" | "right") {
  dir = d;
}

export function takeNavDir() {
  const d = dir;
  dir = null;
  return d;
}
