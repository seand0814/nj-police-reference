"use client";

import { useEffect, useState } from "react";

export type IndexItem = { id: string; t: string; c: string; k: string; g: string; x: string };

let cached: IndexItem[] | null = null;

/** Loads the search index once per page load. */
export function useIndex() {
  const [items, setItems] = useState<IndexItem[] | null>(cached);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (cached) return;
    fetch("/search-index.json")
      .then((r) => r.json())
      .then((data: IndexItem[]) => {
        cached = data;
        setItems(data);
      })
      .catch(() => setError(true));
  }, []);
  return { items, error };
}
