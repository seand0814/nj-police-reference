"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * A list saved in this browser's localStorage. Data stays on the device;
 * it is not synced or sent anywhere.
 */
export function useStoredList<T>(key: string) {
  const [items, setItems] = useState<T[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) setItems(JSON.parse(raw) as T[]);
    } catch {
      // Storage unavailable (private mode, blocked) or corrupt: start empty.
    }
    setLoaded(true);
  }, [key]);

  const save = useCallback(
    (next: T[]) => {
      setItems(next);
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // Ignore quota or availability errors; the change still shows until reload.
      }
    },
    [key]
  );

  return { items, save, loaded };
}

export function newId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export const KEYS = {
  bookmarks: "njpr.bookmarks",
  notes: "njpr.notes",
  contacts: "njpr.contacts",
  radio: "njpr.radioCodes",
  recent: "njpr.recent",
  ccView: "njpr.criminalCodeView",
  checks: "njpr.checks.", // + checklist id
};
