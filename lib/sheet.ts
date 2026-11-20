import type { ReactNode } from "react";

/** A tiny store for the one bottom sheet the app shows at a time (see components/SheetHost.tsx). */
type Listener = (content: ReactNode | null) => void;
const listeners = new Set<Listener>();

export function openSheet(content: ReactNode) {
  listeners.forEach((l) => l(content));
}
export function closeSheet() {
  listeners.forEach((l) => l(null));
}
export function onSheet(l: Listener) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}
