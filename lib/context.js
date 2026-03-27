"use client";
import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [metro, setMetro] = useState("Detroit / Michigan");
  const [culture, setCulture] = useState("All Desi");

  return (
    <AppContext.Provider value={{ metro, setMetro, culture, setCulture }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
