"use client";
import { useState, useRef, useEffect } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { METROS, FONTS, COLORS } from "@/lib/constants";
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
    <div style={{
      background: COLORS.surface, borderBottom: `1px solid ${COLORS.border}`, padding: "6px 20px",
      display: "flex", alignItems: "center", justifyContent: "flex-start",
      fontSize: "12px",
    }}>
      <div ref={metroRef} style={{ position: "relative" }}>
        <button onClick={() => setMetroOpen(!metroOpen)} style={{
          display: "flex", alignItems: "center", gap: "4px", background: "none",
          border: `1px solid ${COLORS.border}`, borderRadius: "6px", padding: "4px 10px",
          cursor: "pointer", fontFamily: FONTS.body, fontSize: "12px",
          fontWeight: 500, color: COLORS.textSecondary,
        }}>
          <MapPin size={12} color={COLORS.primary} /> {metro} <ChevronDown size={11} />
        </button>
        {metroOpen && (
          <div style={{
            position: "absolute", top: "100%", left: 0, background: "white",
            border: `1px solid ${COLORS.border}`, borderRadius: "8px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)", zIndex: 200,
            minWidth: "200px", padding: "4px 0", marginTop: "4px",
          }}>
            {METROS.map(m => (
              <button key={m} onClick={() => { setMetro(m); setMetroOpen(false); }} style={{
                display: "block", width: "100%", textAlign: "left", padding: "7px 14px",
                background: m === metro ? `${COLORS.primary}10` : "transparent", border: "none",
                cursor: m === "Detroit / Michigan" ? "pointer" : "default",
                fontFamily: FONTS.body, fontSize: "13px",
                color: m === "Detroit / Michigan" ? COLORS.text : COLORS.textFaint,
                fontWeight: m === metro ? 600 : 400,
              }}>
                {m} {m !== "Detroit / Michigan" && <span style={{ fontSize: "11px", opacity: 0.5 }}>soon</span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
