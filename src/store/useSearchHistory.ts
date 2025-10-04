import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SearchItem = {
  id: string;
  query: string;
  at: number;
};

type SearchHistoryState = {
  items: SearchItem[];
  add: (query: string) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const MAX_ITEMS = 50;

function toKey(q: string) {
  return q.trim().toLowerCase();
}

export const useSearchHistory = create<SearchHistoryState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (query: string) => {
        const q = query.trim();
        if (!q) return;

        const now = Date.now();
        const key = toKey(q);
        const current = get().items;

        const withoutDup = current.filter((i) => toKey(i.query) !== key);
        const newItem: SearchItem = {
          id: crypto.randomUUID?.() ?? String(now),
          query: q,
          at: now,
        };
        const next = [newItem, ...withoutDup].slice(0, MAX_ITEMS);
        set({ items: next });
      },
      remove: (id: string) =>
        set({ items: get().items.filter((i) => i.id !== id) }),
      clear: () => set({ items: [] }),
    }),
    { name: "search-history" }
  )
);
