"use client";

import { useEffect, useState } from "react";

/** u = link, t = title, c = citation, k = category, g = grade, x = searchable text */
export type IndexItem = { id: string; u: string; t: string; c: string; k: string; g: string; x: string };

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
