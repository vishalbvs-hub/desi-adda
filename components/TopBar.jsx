"use client";
import { useState, useRef, useEffect } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { METROS, CULTURES, FONTS, COLORS } from "@/lib/constants";
import { useApp } from "@/lib/context";

export default function TopBar() {
  const { metro, setMetro, culture, setCulture } = useApp();
  const [metroOpen, setMetroOpen] = useState(false);
  const [cultureOpen, setCultureOpen] = useState(false);
  const metroRef = useRef(null);
  const cultureRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (metroRef.current && !metroRef.current.contains(e.target)) setMetroOpen(false);
      if (cultureRef.current && !cultureRef.current.contains(e.target)) setCultureOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <div style={{
        background: "white", borderBottom: "1px solid #EDE6DE", padding: "8px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: "8px", fontSize: "13px",
      }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {/* Metro selector */}
          <div ref={metroRef} style={{ position: "relative" }}>
            <button
              onClick={() => { setMetroOpen(!metroOpen); setCultureOpen(false); }}
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

          {/* Culture selector */}
          <div ref={cultureRef} style={{ position: "relative" }}>
            <button
              onClick={() => { setCultureOpen(!cultureOpen); setMetroOpen(false); }}
              style={{
                display: "flex", alignItems: "center", gap: "4px",
                background: culture !== "All Desi" ? "#FDE8EF" : "none",
                border: `1px solid ${culture !== "All Desi" ? COLORS.primary : "#E0D8CF"}`,
                borderRadius: "8px", padding: "5px 10px", cursor: "pointer",
                fontFamily: FONTS.body, fontSize: "12px", fontWeight: 500,
                color: culture !== "All Desi" ? COLORS.primary : "#5A4A3F",
              }}
            >
              {culture} <ChevronDown size={12} />
            </button>
            {cultureOpen && (
              <div style={{
                position: "absolute", top: "100%", left: 0, background: "white",
                border: "1px solid #EDE6DE", borderRadius: "12px",
                boxShadow: "0 12px 40px rgba(0,0,0,0.12)", zIndex: 200,
                minWidth: "200px", padding: "8px 0", marginTop: "4px",
                maxHeight: "320px", overflowY: "auto",
              }}>
                {CULTURES.map(c => (
                  <button
                    key={c}
                    onClick={() => { setCulture(c); setCultureOpen(false); }}
                    style={{
                      display: "block", width: "100%", textAlign: "left", padding: "8px 16px",
                      background: c === culture ? "#FDE8EF" : "transparent", border: "none",
                      cursor: "pointer", fontFamily: FONTS.body, fontSize: "13px",
                      color: "#2D2420", fontWeight: c === culture ? 600 : 400,
                    }}
                  >{c}</button>
                ))}
              </div>
            )}
          </div>
        </div>
        <span style={{ fontFamily: FONTS.body, fontSize: "11px", fontStyle: "italic", color: "#A89888" }}>
          the gathering place for desi life in America
        </span>
      </div>

      {/* Culture filter banner */}
      {culture !== "All Desi" && (
        <div style={{
          background: `linear-gradient(90deg, ${COLORS.primary}10, ${COLORS.marigold}10)`,
          padding: "8px 20px", textAlign: "center", fontSize: "13px",
          color: COLORS.primary, fontWeight: 500, borderBottom: "1px solid #EDE6DE",
        }}>
          Showing <strong>{culture}</strong> results first —{" "}
          <button
            onClick={() => setCulture("All Desi")}
            style={{
              background: "none", border: "none", textDecoration: "underline",
              cursor: "pointer", color: COLORS.primary, fontFamily: FONTS.body,
              fontWeight: 600, fontSize: "13px",
            }}
          >show all</button>
        </div>
      )}
    </>
  );
}
