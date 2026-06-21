import { useCallback, useEffect, useState } from "react";

const KEY = "recent_searches";
const MAX = 8;

export function useRecentSearches() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = (next) => {
    setItems(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };

  const add = useCallback((q) => {
    if (!q) return;
    setItems((prev) => {
      const next = [q, ...prev.filter((x) => x !== q)].slice(0, MAX);
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clear = () => persist([]);

  return { items, add, clear };
}
