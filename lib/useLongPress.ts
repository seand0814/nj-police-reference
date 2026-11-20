"use client";

import { useRef, type MouseEvent, type TouchEvent } from "react";
import { haptic } from "./haptics";

/**
 * Press and hold (about half a second) to run an action, like the iPhone's long-press menus.
 * Spread the returned handlers on a link or button; a normal tap still works as usual.
 */
export function useLongPress(action: () => void, ms = 450) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const start = useRef({ x: 0, y: 0 });
  const fired = useRef(false);

  const cancel = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };

  return {
    onTouchStart: (e: TouchEvent) => {
      fired.current = false;
      start.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      cancel();
      timer.current = setTimeout(() => {
        fired.current = true;
        haptic();
        action();
      }, ms);
    },
    onTouchMove: (e: TouchEvent) => {
      const t = e.touches[0];
      if (Math.abs(t.clientX - start.current.x) > 10 || Math.abs(t.clientY - start.current.y) > 10) cancel();
    },
    onTouchEnd: cancel,
    onTouchCancel: cancel,
    onClick: (e: MouseEvent) => {
      // The tap that ends a long press shouldn't also open the link.
      if (fired.current) {
        e.preventDefault();
        fired.current = false;
      }
    },
    onContextMenu: (e: MouseEvent) => {
      e.preventDefault();
      cancel();
      fired.current = true;
      action();
    },
  };
}
