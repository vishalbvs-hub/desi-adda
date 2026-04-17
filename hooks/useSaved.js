"use client";
import { useState, useEffect, useCallback } from "react";

const KEY = "adda_saved_v1";
const EMPTY = { orgs: [], events: [], businesses: [] };

export function useSaved() {
  const [state, setState] = useState(EMPTY);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...EMPTY, ...JSON.parse(raw) });
    } catch {}

    const onStorage = (e) => {
      if (e.key !== KEY) return;
      try {
        const next = e.newValue ? { ...EMPTY, ...JSON.parse(e.newValue) } : EMPTY;
        setState(next);
      } catch {}
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = useCallback((type, id) => {
    setState(prev => {
      const list = prev[type] || [];
      const next = list.includes(id)
        ? { ...prev, [type]: list.filter(x => x !== id) }
        : { ...prev, [type]: [...list, id] };
      try {
        if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const isSaved = useCallback((type, id) => {
    return (state[type] || []).includes(id);
  }, [state]);

  return { state, toggle, isSaved };
}
