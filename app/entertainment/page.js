"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FONTS, COLORS } from "@/lib/constants";
import { Film, Music } from "lucide-react";

const ff = FONTS.heading;
const fb = FONTS.body;
const SAFFRON = "#E8A317";

// Lazy load the heavy page components
import dynamic from "next/dynamic";
const MoviesContent = dynamic(() => import("./MoviesContent"), { ssr: false, loading: () => <div style={{ padding: "60px 20px", textAlign: "center" }}><p style={{ fontFamily: ff, color: COLORS.textMuted }}>Loading movies...</p></div> });
const MusicContent = dynamic(() => import("./MusicContent"), { ssr: false, loading: () => <div style={{ padding: "60px 20px", textAlign: "center" }}><p style={{ fontFamily: ff, color: COLORS.textMuted }}>Loading music...</p></div> });

export default function EntertainmentPage() {
  return <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFFBF5" }}><p style={{ fontFamily: ff, color: COLORS.textMuted }}>Loading...</p></div>}><EntertainmentInner /></Suspense>;
}

function EntertainmentInner() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "movies";
  const [tab, setTab] = useState(initialTab);

  const heroGradient = tab === "movies"
    ? "linear-gradient(135deg, #1a0a0a 0%, #2d1117 40%, #4a1527 100%)"
    : "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)";

  return (
    <div style={{ background: "#FFFBF5", minHeight: "100vh" }}>
      {/* HERO */}
      <section style={{
        background: heroGradient, minHeight: "300px", padding: "40px 20px 36px",
        textAlign: "center", position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background 0.5s ease",
      }}>
        {/* Decorative icons */}
        <div style={{ position: "absolute", top: "8%", left: "5%", fontSize: "44px", opacity: 0.06, transform: "rotate(-12deg)" }}>{tab === "movies" ? "\u{1F3AC}" : "\u{1F3B6}"}</div>
        <div style={{ position: "absolute", top: "15%", right: "8%", fontSize: "50px", opacity: 0.05, transform: "rotate(15deg)" }}>{tab === "movies" ? "\u{1F3A5}" : "\u{1F3B5}"}</div>
        <div style={{ position: "absolute", bottom: "20%", left: "10%", fontSize: "42px", opacity: 0.05, transform: "rotate(20deg)" }}>{tab === "movies" ? "\u{1F37F}" : "\u{1F3A7}"}</div>
        <div style={{ position: "absolute", top: "50%", right: "5%", fontSize: "46px", opacity: 0.05, transform: "rotate(10deg)" }}>{tab === "movies" ? "\u{2B50}" : "\u{1F3B8}"}</div>
        <div style={{ position: "absolute", bottom: "8%", right: "20%", fontSize: "38px", opacity: 0.04 }}>{tab === "movies" ? "\u{1F4FA}" : "\u{1F3B9}"}</div>
        <div style={{ position: "absolute", top: "65%", left: "3%", fontSize: "36px", opacity: 0.04 }}>{tab === "movies" ? "\u{1F39E}\uFE0F" : "\u{1F3A4}"}</div>

        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
          {/* Tab Toggle */}
          <div style={{ display: "flex", gap: "4px", justifyContent: "center", marginBottom: "20px" }}>
            <button onClick={() => setTab("movies")} style={{
              padding: "10px 28px", borderRadius: "999px", fontSize: "15px", fontFamily: ff, fontWeight: 700, cursor: "pointer",
              background: tab === "movies" ? SAFFRON : "rgba(255,255,255,0.1)",
              color: tab === "movies" ? "#1a0a0a" : "rgba(255,255,255,0.6)",
              border: tab === "movies" ? `2px solid ${SAFFRON}` : "2px solid rgba(255,255,255,0.2)",
              transition: "all 0.3s", display: "flex", alignItems: "center", gap: "8px",
            }}><Film size={16} /> Movies</button>
            <button onClick={() => setTab("music")} style={{
              padding: "10px 28px", borderRadius: "999px", fontSize: "15px", fontFamily: ff, fontWeight: 700, cursor: "pointer",
              background: tab === "music" ? SAFFRON : "rgba(255,255,255,0.1)",
              color: tab === "music" ? "#1a1a2e" : "rgba(255,255,255,0.6)",
              border: tab === "music" ? `2px solid ${SAFFRON}` : "2px solid rgba(255,255,255,0.2)",
              transition: "all 0.3s", display: "flex", alignItems: "center", gap: "8px",
            }}><Music size={16} /> Music</button>
          </div>

          <h1 style={{ fontFamily: ff, fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: "white", lineHeight: 1.1, margin: "0 0 8px" }}>
            Desi <span style={{ color: SAFFRON, fontStyle: "italic" }}>{tab === "movies" ? "Movies" : "Music"}</span>
          </h1>
          <p style={{ fontFamily: ff, fontSize: "clamp(14px, 2vw, 18px)", fontWeight: 300, color: "rgba(255,255,255,0.6)", margin: "0 0 8px", fontStyle: "italic" }}>
            {tab === "movies" ? "Now playing, streaming, trailers & curated lists" : "Charts, playlists & live shows — all in one place"}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      {tab === "movies" ? <MoviesContent /> : <MusicContent />}
    </div>
  );
}
