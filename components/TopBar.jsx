"use client";
import { useState, useRef, useEffect } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { METROS } from "@/lib/constants";
import { useApp } from "@/lib/context";

export default function TopBar() {
  const { metro, setMetro } = useApp();
  const [metroOpen, setMetroOpen] = useState(false);
  const metroRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (metroRef.current && !metroRef.current.contains(e.target)) setMetroOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      style={{
        background: "var(--bg-header)",
        padding: "6px 20px",
        fontSize: "12px",
        color: "var(--text-inverse)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center" }}>
        <div ref={metroRef} style={{ position: "relative" }}>
          <button
            onClick={() => setMetroOpen(!metroOpen)}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "var(--radius-pill)",
              padding: "4px 12px",
              cursor: "pointer",
              fontSize: "12px", fontWeight: 500,
              color: "var(--text-inverse)",
              fontFamily: "inherit",
            }}
          >
            <MapPin size={12} style={{ color: "var(--brand-primary)" }} /> {metro} <ChevronDown size={11} />
          </button>
          {metroOpen && (
            <div
              style={{
                position: "absolute", top: "100%", left: 0, marginTop: "6px",
                background: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-md)",
                zIndex: 200, minWidth: "220px", padding: "4px 0",
              }}
            >
              {METROS.map(m => {
                const active = m === metro;
                const available = m === "Detroit / Michigan";
                return (
                  <button
                    key={m}
                    onClick={() => { if (available) { setMetro(m); setMetroOpen(false); } }}
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      padding: "8px 14px",
                      background: active ? "var(--pill-butter-bg)" : "transparent",
                      border: "none",
                      cursor: available ? "pointer" : "default",
                      fontFamily: "inherit",
                      fontSize: "13px",
                      color: available ? "var(--text-primary)" : "var(--text-muted)",
                      fontWeight: active ? 500 : 400,
                    }}
                  >
                    {m} {!available && <span style={{ fontSize: "11px", opacity: 0.6 }}>soon</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
