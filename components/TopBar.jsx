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
      background: "white", borderBottom: "1px solid #EDE6DE", padding: "8px 20px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: "8px", fontSize: "13px",
    }}>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {/* Metro selector */}
        <div ref={metroRef} style={{ position: "relative" }}>
          <button
            onClick={() => setMetroOpen(!metroOpen)}
            style={{
              display: "flex", alignItems: "center", gap: "4px", background: "none",
              border: "1px solid #E0D8CF", borderRadius: "8px", padding: "5px 10px",
              cursor: "pointer", fontFamily: FONTS.body, fontSize: "12px",
              fontWeight: 500, color: "#5A4A3F",
            }}
          >
            <MapPin size={13} color={COLORS.primary} /> {metro} <ChevronDown size={12} />
          </button>
          {metroOpen && (
            <div style={{
              position: "absolute", top: "100%", left: 0, background: "white",
              border: "1px solid #EDE6DE", borderRadius: "12px",
              boxShadow: "0 12px 40px rgba(0,0,0,0.12)", zIndex: 200,
              minWidth: "220px", padding: "8px 0", marginTop: "4px",
            }}>
              {METROS.map(m => (
                <button
                  key={m}
                  onClick={() => { setMetro(m); setMetroOpen(false); }}
                  style={{
                    display: "block", width: "100%", textAlign: "left", padding: "8px 16px",
                    background: m === metro ? "#FDE8EF" : "transparent", border: "none",
                    cursor: m === "Detroit / Michigan" ? "pointer" : "default",
                    fontFamily: FONTS.body, fontSize: "13px",
                    color: m === "Detroit / Michigan" ? "#2D2420" : "#BFAB98",
                    fontWeight: m === metro ? 600 : 400,
                  }}
                >
                  {m} {m !== "Detroit / Michigan" && <span style={{ fontSize: "11px", opacity: 0.5 }}>soon</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <span style={{ fontFamily: FONTS.body, fontSize: "11px", fontStyle: "italic", color: "#A89888" }}>
        the gathering place for desi life in America
      </span>
    </div>
  );
}
