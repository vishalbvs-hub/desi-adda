"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FONTS, COLORS } from "@/lib/constants";
import ScrollingChips from "@/components/ScrollingChips";
import { Search, Film, Music } from "lucide-react";

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

  const triggerChat = (q) => { window.dispatchEvent(new CustomEvent("askadda", { detail: q })); };

  const movieChips = [
    { emoji: "\u{1F3AC}", text: "Telugu movies on Netflix" },
    { emoji: "\u{1F37F}", text: "best Bollywood movie 2026" },
    { emoji: "\u{1F4FA}", text: "new Malayalam movies on OTT" },
    { emoji: "\u{2B50}", text: "highest rated Tamil movies" },
    { emoji: "\u{1F39F}\uFE0F", text: "Indian movies in theaters Michigan" },
    { emoji: "\u{1F4C5}", text: "upcoming Punjabi movies" },
    { emoji: "\u{1F3A5}", text: "Coolie trailer Rajinikanth" },
    { emoji: "\u{1F4DA}", text: "best Telugu movies all time" },
    { emoji: "\u{1F525}", text: "Kannada movies 2026" },
    { emoji: "\u{1F3AC}", text: "Dhurandhar review" },
  ];
  const musicChips = [
    { emoji: "\u{1F3B5}", text: "trending Telugu songs this week" },
    { emoji: "\u{1F3A4}", text: "Anirudh concerts near Detroit" },
    { emoji: "\u{1F3A7}", text: "best Tamil playlist on Spotify" },
    { emoji: "\u{1F525}", text: "new Punjabi songs this week" },
    { emoji: "\u{1F3B6}", text: "Arijit Singh latest hits" },
    { emoji: "\u{1F3B8}", text: "Malayalam indie music" },
    { emoji: "\u{1F3B9}", text: "Bollywood road trip playlist" },
    { emoji: "\u{1F399}\uFE0F", text: "desi concerts in Michigan" },
    { emoji: "\u{1F4FA}", text: "best Kannada songs 2026" },
    { emoji: "\u{1F3A4}", text: "Diljit Dosanjh tour dates" },
  ];

  const chips = tab === "movies" ? movieChips : musicChips;
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
          <p style={{ fontFamily: ff, fontSize: "clamp(14px, 2vw, 18px)", fontWeight: 300, color: "rgba(255,255,255,0.6)", margin: "0 0 24px", fontStyle: "italic" }}>
            {tab === "movies" ? "Now playing, streaming, trailers & curated lists" : "Charts, playlists & live shows — all in one place"}
          </p>

          {/* Search bar */}
          <form onSubmit={e => { e.preventDefault(); const v = document.getElementById("ent-search").value; if (v.trim()) { triggerChat(v); document.getElementById("ent-search").value = ""; } }} style={{ maxWidth: "560px", margin: "0 auto", position: "relative" }}>
            <Search size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#A89888" }} />
            <input id="ent-search" placeholder={tab === "movies" ? "Ask about movies... new Telugu films on Netflix?" : "Ask about music... trending songs? concerts near me?"}
              style={{ width: "100%", padding: "14px 150px 14px 44px", borderRadius: "14px", border: "none", fontSize: "15px", fontFamily: fb, background: "white", boxShadow: "0 6px 24px rgba(0,0,0,0.2)", boxSizing: "border-box", outline: "none" }} />
            <button type="submit" style={{ position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)", background: SAFFRON, color: "white", border: "none", borderRadius: "10px", padding: "10px 20px", fontFamily: fb, fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>Ask Adda {"\u2728"}</button>
          </form>
          <div style={{ maxWidth: "600px", margin: "14px auto 0" }}>
            <ScrollingChips chips={chips} onChipClick={(chip) => triggerChat(`${chip.emoji} ${chip.text}`)} variant="light" />
          </div>
        </div>
      </section>

      {/* CONTENT */}
      {tab === "movies" ? <MoviesContent /> : <MusicContent />}
    </div>
  );
}
