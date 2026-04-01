"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Clock, Star, Play, Ticket, Search } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import ScrollingChips from "@/components/ScrollingChips";

const ff = FONTS.body;
const fb = FONTS.body;
const SAFFRON = "#C4943D";
const LANGUAGES = ["All", "Telugu", "Hindi", "Tamil", "Punjabi", "Malayalam", "Kannada", "Bengali", "English"];
const SECTIONS = [
  { id: "All", label: "All", icon: "\u{2728}" },
  { id: "now_playing", label: "Now Playing", icon: "\u{1F3AC}" },
  { id: "coming_soon", label: "Coming Soon", icon: "\u{1F4C5}" },
  { id: "ott", label: "New on OTT", icon: "\u{1F4FA}" },
  { id: "lists", label: "Curated Lists", icon: "\u{1F4DA}" },
];
const PLATFORM_COLORS = {
  "Netflix": { bg: "#FDECEA", color: "#E50914", label: "Netflix" },
  "Prime Video": { bg: "#E3F2FD", color: "#00A8E1", label: "Prime" },
  "Hotstar": { bg: "#FFF8E1", color: "#1A73E8", label: "Hotstar" },
  "Zee5": { bg: "#F3E5F5", color: "#8E24AA", label: "Zee5" },
  "Jio Cinema": { bg: "#FCE4EC", color: "#E91E63", label: "Jio" },
  "SonyLIV": { bg: "#E8F5E9", color: "#43A047", label: "SonyLIV" },
  "Apple TV+": { bg: "#F5F5F5", color: "#333", label: "Apple TV+" },
  "Aha": { bg: "#FFF3E0", color: "#FF6F00", label: "Aha" },
  "Mubi": { bg: "#E3F2FD", color: "#1565C0", label: "Mubi" },
};
const LETTERBOXD_COLORS = { bg: "#E8F5E9", color: "#00C030" };

function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    el.style.opacity = "0"; el.style.transform = "translateY(24px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return ref;
}

export default function MoviesPage() {
  const [lang, setLang] = useState("All");
  const [section, setSection] = useState("All");
  const [movies, setMovies] = useState([]);
  const [news, setNews] = useState([]);
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailerYoutubeId, setTrailerYoutubeId] = useState(null);
  const moviesRef = useFadeIn();

  useEffect(() => {
    Promise.all([
      supabase.from("movies_catalog").select("*").order("release_date"),
      supabase.from("movie_news").select("*").order("published_date", { ascending: false }).limit(8),
      supabase.from("movie_lists").select("*").order("name"),
    ]).then(([m, n, l]) => { setMovies(m.data || []); setNews(n.data || []); setLists(l.data || []); setLoading(false); });
  }, []);

  useEffect(() => {
    if (trailerYoutubeId) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [trailerYoutubeId]);

  const filteredMovies = movies.filter(m => { const langMatch = lang === "All" || m.language === lang; const secMatch = section === "All" || section === "lists" || m.status === section; return langMatch && secMatch; });
  const filteredLists = lists.filter(l => lang === "All" || l.language === lang || l.language === "All");
  const nowPlaying = filteredMovies.filter(m => m.status === "now_playing");
  const comingSoon = filteredMovies.filter(m => m.status === "coming_soon");
  const ottMovies = filteredMovies.filter(m => m.status === "ott");

  if (loading) return (<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F2EB" }}><div style={{ textAlign: "center" }}><div style={{ fontSize: "48px", marginBottom: "12px" }}>{"\u{1F3AC}"}</div><p style={{ fontFamily: ff, fontSize: "18px", color: COLORS.textMuted }}>Loading movies...</p></div></div>);

  return (
    <div style={{ background: "#F5F2EB", minHeight: "100vh" }}>
      <div style={{ background: "white", borderBottom: "1px solid #E2DFD8", padding: "12px 20px" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "6px", color: COLORS.primary, fontFamily: fb, fontWeight: 600, fontSize: "14px", textDecoration: "none" }}><ArrowLeft size={18} /> Back</Link>
      </div>

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #1a0a0a 0%, #2d1117 40%, #4a1527 100%)", minHeight: "320px", padding: "48px 20px 40px", textAlign: "center", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", top: "8%", left: "5%", fontSize: "44px", opacity: 0.06, transform: "rotate(-12deg)" }}>{"\u{1F3AC}"}</div>
        <div style={{ position: "absolute", top: "15%", right: "8%", fontSize: "50px", opacity: 0.05, transform: "rotate(15deg)" }}>{"\u{1F3A5}"}</div>
        <div style={{ position: "absolute", bottom: "20%", left: "10%", fontSize: "42px", opacity: 0.05, transform: "rotate(20deg)" }}>{"\u{1F37F}"}</div>
        <div style={{ position: "absolute", top: "40%", left: "3%", fontSize: "36px", opacity: 0.04, transform: "rotate(-25deg)" }}>{"\u{1F39E}\uFE0F"}</div>
        <div style={{ position: "absolute", top: "50%", right: "5%", fontSize: "46px", opacity: 0.05, transform: "rotate(10deg)" }}>{"\u{2B50}"}</div>
        <div style={{ position: "absolute", bottom: "10%", right: "15%", fontSize: "38px", opacity: 0.04 }}>{"\u{1F4FA}"}</div>
        <div style={{ position: "absolute", top: "65%", left: "20%", fontSize: "32px", opacity: 0.04, transform: "rotate(22deg)" }}>{"\u{1F39F}\uFE0F"}</div>
        <div style={{ position: "absolute", bottom: "5%", left: "40%", fontSize: "34px", opacity: 0.04, transform: "rotate(-15deg)" }}>{"\u{1F3AC}"}</div>

        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <h1 style={{ fontFamily: ff, fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: "white", lineHeight: 1.1, margin: "0 0 8px" }}>Desi <span style={{ color: COLORS.primary, fontStyle: "italic" }}>Movies</span></h1>
          <p style={{ fontFamily: ff, fontSize: "clamp(14px, 2vw, 18px)", fontWeight: 300, color: "rgba(255,255,255,0.6)", margin: "0 0 28px", fontStyle: "italic" }}>Now playing, streaming, trailers & curated lists</p>

          <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
            {LANGUAGES.map(l => (<button key={l} onClick={() => setLang(l)} style={{ padding: "8px 20px", borderRadius: "999px", fontSize: "13px", fontFamily: fb, fontWeight: 600, cursor: "pointer", border: lang === l ? `2px solid ${SAFFRON}` : "2px solid rgba(255,255,255,0.15)", background: lang === l ? SAFFRON : "rgba(255,255,255,0.08)", color: lang === l ? "#1a0a0a" : "rgba(255,255,255,0.7)", transition: "all 0.25s" }}>{l}</button>))}
          </div>

          {/* Search bar inside hero */}
          <form onSubmit={e => { e.preventDefault(); const v = document.getElementById("movie-search").value; if (v.trim()) { window.dispatchEvent(new CustomEvent("askadda", { detail: v })); document.getElementById("movie-search").value = ""; } }} style={{ maxWidth: "560px", margin: "24px auto 0", position: "relative" }}>
            <Search size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#999999" }} />
            <input id="movie-search" placeholder="Ask about movies... new Telugu films on Netflix? Dhurandhar review?"
              style={{ width: "100%", padding: "14px 150px 14px 44px", borderRadius: "14px", border: "none", fontSize: "15px", fontFamily: fb, background: "white", boxShadow: "0 6px 24px rgba(0,0,0,0.2)", boxSizing: "border-box", outline: "none" }} />
            <button type="submit" style={{ position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)", background: SAFFRON, color: "white", border: "none", borderRadius: "10px", padding: "10px 20px", fontFamily: fb, fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>Ask Adda {"\u2728"}</button>
          </form>
          <div style={{ maxWidth: "600px", margin: "14px auto 0" }}>
            <ScrollingChips chips={[
              { emoji: "\u{1F3AC}", text: "Telugu movies on Netflix" },
              { emoji: "\u{1F37F}", text: "best Bollywood movie 2026" },
              { emoji: "\u{1F4FA}", text: "new Malayalam movies on OTT" },
              { emoji: "\u{1F3AC}", text: "Dhurandhar review" },
              { emoji: "\u{2B50}", text: "highest rated Tamil movies" },
              { emoji: "\u{1F39F}\uFE0F", text: "Indian movies in theaters Michigan" },
              { emoji: "\u{1F4C5}", text: "upcoming Punjabi movies" },
              { emoji: "\u{1F3A5}", text: "Coolie trailer Rajinikanth" },
              { emoji: "\u{1F4DA}", text: "best Telugu movies all time" },
              { emoji: "\u{1F525}", text: "Kannada movies 2026" },
            ]} onChipClick={(chip) => window.dispatchEvent(new CustomEvent("askadda", { detail: `${chip.emoji} ${chip.text}` }))} variant="light" />
          </div>
        </div>
      </section>

      {/* SECTION FILTERS */}
      <div style={{ background: "white", borderBottom: "1px solid #E2DFD8", padding: "12px 20px" }}>
        <div style={{ display: "flex", gap: "6px", justifyContent: "center", flexWrap: "wrap" }}>
          {SECTIONS.map(s => (<button key={s.id} onClick={() => setSection(s.id)} style={{ padding: "7px 16px", borderRadius: "999px", fontSize: "12px", fontFamily: fb, fontWeight: 600, cursor: "pointer", border: section === s.id ? `2px solid ${SAFFRON}` : "2px solid #E2DFD8", background: section === s.id ? SAFFRON : "white", color: section === s.id ? "#1A1A1A" : COLORS.textMuted, transition: "all 0.25s" }}>{s.icon} {s.label}</button>))}
        </div>
      </div>

      {/* CONTENT + SIDEBAR */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 20px", display: "flex", gap: "32px", alignItems: "flex-start" }}>
        <div ref={moviesRef} style={{ flex: 1, minWidth: 0, padding: "48px 0" }}>

          {(section === "All" || section === "now_playing") && nowPlaying.length > 0 && (<div style={{ marginBottom: "48px" }}><h2 style={{ fontFamily: ff, fontSize: "clamp(24px, 4vw, 30px)", fontWeight: 700, margin: "0 0 20px", color: "#1A1A1A" }}>{"\u{1F3AC}"} Now Playing</h2><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "18px" }}>{nowPlaying.map(m => <MovieCard key={m.id} movie={m} onTrailer={setTrailerYoutubeId} />)}</div></div>)}

          {(section === "All" || section === "ott") && ottMovies.length > 0 && (<div style={{ marginBottom: "48px" }}><h2 style={{ fontFamily: ff, fontSize: "clamp(24px, 4vw, 30px)", fontWeight: 700, margin: "0 0 20px", color: "#1A1A1A" }}>{"\u{1F4FA}"} New on OTT</h2><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "18px" }}>{ottMovies.map(m => <MovieCard key={m.id} movie={m} onTrailer={setTrailerYoutubeId} isOtt />)}</div></div>)}

          {(section === "All" || section === "coming_soon") && comingSoon.length > 0 && (<div style={{ marginBottom: "48px" }}><h2 style={{ fontFamily: ff, fontSize: "clamp(24px, 4vw, 30px)", fontWeight: 700, margin: "0 0 20px", color: "#1A1A1A" }}>{"\u{1F4C5}"} Coming Soon</h2><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "18px" }}>{comingSoon.map(m => <MovieCard key={m.id} movie={m} onTrailer={setTrailerYoutubeId} />)}</div></div>)}

          {(section === "All" || section === "lists") && filteredLists.length > 0 && (<div style={{ marginBottom: "48px" }}><h2 style={{ fontFamily: ff, fontSize: "clamp(24px, 4vw, 30px)", fontWeight: 700, margin: "0 0 8px", color: "#1A1A1A" }}>{"\u{1F4DA}"} Curated Lists</h2><p style={{ fontFamily: fb, fontSize: "14px", color: COLORS.textMuted, margin: "0 0 20px" }}>Handpicked from Letterboxd, IMDB & Mubi. Find your next favorite film.</p><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px" }}>{filteredLists.map((list, i) => { const sc = list.source === "Letterboxd" ? LETTERBOXD_COLORS : list.source === "IMDB" ? { bg: "#FFF8E1", color: "#F5C518" } : { bg: "#E3F2FD", color: "#1565C0" }; return (<a key={list.id || i} href={list.url} target="_blank" rel="noopener noreferrer" style={{ padding: "20px", borderRadius: "16px", background: "white", border: "1px solid #E2DFD8", textDecoration: "none", color: "inherit", transition: "all 0.25s", display: "flex", flexDirection: "column", gap: "8px" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}><div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span style={{ fontSize: "10px", fontFamily: fb, fontWeight: 700, padding: "3px 8px", borderRadius: "999px", background: sc.bg, color: sc.color }}>{list.source}</span>{list.language !== "All" && <span style={{ fontSize: "10px", fontFamily: fb, fontWeight: 600, padding: "3px 8px", borderRadius: "999px", background: `${SAFFRON}15`, color: SAFFRON }}>{list.language}</span>}</div><h4 style={{ fontFamily: ff, fontSize: "15px", fontWeight: 700, margin: 0, color: "#1A1A1A", lineHeight: 1.3 }}>{list.name}</h4>{list.description && <p style={{ fontSize: "12px", color: COLORS.textMuted, margin: 0, lineHeight: 1.5 }}>{list.description}</p>}<span style={{ fontSize: "12px", fontFamily: fb, fontWeight: 600, color: COLORS.primary, display: "flex", alignItems: "center", gap: "4px", marginTop: "auto" }}>Browse List <ExternalLink size={10} /></span></a>); })}</div></div>)}

          {filteredMovies.length === 0 && section !== "lists" && (<div style={{ padding: "60px 20px", textAlign: "center", background: "white", borderRadius: "16px", border: "1px solid #E2DFD8" }}><p style={{ fontSize: "16px", color: "#6B6B6B", margin: 0, fontFamily: ff }}>No movies found — check back soon!</p></div>)}
        </div>

        {/* SIDEBAR */}
        <aside style={{ width: "320px", flexShrink: 0, position: "sticky", top: "70px", alignSelf: "flex-start", paddingTop: "48px", paddingBottom: "48px", maxHeight: "calc(100vh - 70px)", display: "flex", flexDirection: "column" }}>
          <div style={{ background: "white", borderRadius: "16px", border: "1px solid #E2DFD8", overflow: "hidden", display: "flex", flexDirection: "column", maxHeight: "calc(100vh - 140px)" }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid #E2DFD8", background: "#1A1A1A", flexShrink: 0 }}><h3 style={{ fontFamily: ff, fontSize: "15px", fontWeight: 700, margin: 0, color: "white" }}>{"\u{1F4F0}"} Movie News</h3></div>
            <div style={{ overflowY: "auto", scrollbarWidth: "thin" }}>
              {news.length > 0 ? news.map((item, i) => { const da = Math.floor((Date.now() - new Date(item.published_date + "T00:00:00").getTime()) / 86400000); const tl = da === 0 ? "Today" : da === 1 ? "Yesterday" : `${da}d ago`; const hue = item.source.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 360; return (<a key={item.id || i} href={item.url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", gap: "12px", padding: "14px 16px", borderBottom: i < news.length - 1 ? "1px solid #F5F0EA" : "none", textDecoration: "none", color: "inherit", transition: "background 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = "#F5F2EB"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}><div style={{ width: "64px", height: "64px", borderRadius: "10px", overflow: "hidden", flexShrink: 0, background: item.image_url ? "#E2DFD8" : `hsl(${hue}, 30%, 90%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>{item.image_url ? <img src={item.image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: "20px", fontWeight: 700, fontFamily: ff, color: `hsl(${hue}, 40%, 50%)` }}>{item.source.charAt(0)}</span>}</div><div style={{ flex: 1, minWidth: 0 }}><p style={{ fontFamily: fb, fontSize: "12.5px", fontWeight: 600, color: "#1A1A1A", margin: "0 0 6px", lineHeight: 1.35, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.headline}</p><div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "10px", color: COLORS.textFaint }}><span style={{ fontWeight: 600, color: COLORS.primary }}>{item.source}</span><span>{"\u00B7"}</span><span>{tl}</span></div></div></a>); }) : <p style={{ padding: "20px 18px", fontSize: "13px", color: COLORS.textMuted, margin: 0 }}>No movie news yet.</p>}
            </div>
          </div>
        </aside>
      </div>

      <style>{`@media (max-width: 900px) { aside { display: none !important; } }`}</style>
      <div className="mobile-mn" style={{ padding: "0 20px 48px" }}>
        <style>{`@media (min-width: 901px) { .mobile-mn { display: none !important; } }`}</style>
        <div style={{ background: "white", borderRadius: "16px", border: "1px solid #E2DFD8", overflow: "hidden", maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid #E2DFD8", background: "#1A1A1A" }}><h3 style={{ fontFamily: ff, fontSize: "15px", fontWeight: 700, margin: 0, color: "white" }}>{"\u{1F4F0}"} Movie News</h3></div>
          {news.slice(0, 5).map((item, i) => { const da = Math.floor((Date.now() - new Date(item.published_date + "T00:00:00").getTime()) / 86400000); const tl = da === 0 ? "Today" : da === 1 ? "Yesterday" : `${da}d ago`; return (<a key={`mob-${item.id || i}`} href={item.url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", gap: "12px", padding: "14px 16px", borderBottom: i < 4 ? "1px solid #F5F0EA" : "none", textDecoration: "none", color: "inherit" }}>{item.image_url && <img src={item.image_url} alt="" style={{ width: "56px", height: "56px", borderRadius: "10px", objectFit: "cover", flexShrink: 0 }} />}<div style={{ flex: 1 }}><p style={{ fontFamily: fb, fontSize: "13px", fontWeight: 600, color: "#1A1A1A", margin: "0 0 4px", lineHeight: 1.35 }}>{item.headline}</p><div style={{ fontSize: "10px", color: COLORS.textFaint }}><span style={{ fontWeight: 600, color: COLORS.primary }}>{item.source}</span> {"\u00B7"} {tl}</div></div></a>); })}
        </div>
      </div>

      {/* TRAILER MODAL */}
      {trailerYoutubeId && (<div onClick={() => setTrailerYoutubeId(null)} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}><div onClick={e => e.stopPropagation()} style={{ width: "min(900px, 95vw)", position: "relative" }}><button onClick={() => setTrailerYoutubeId(null)} style={{ position: "absolute", top: "-40px", right: "0", background: "none", border: "none", color: "white", fontSize: "28px", cursor: "pointer" }}>{"\u2715"}</button><div style={{ position: "relative", paddingBottom: "56.25%", height: 0, borderRadius: "12px", overflow: "hidden" }}><iframe src={`https://www.youtube.com/embed/${trailerYoutubeId}?autoplay=1&rel=0`} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen title="Trailer" /></div></div></div>)}
    </div>
  );
}

function MovieCard({ movie, onTrailer, isOtt }) {
  const platInfo = PLATFORM_COLORS[movie.platform] || { bg: "#F5F5F5", color: "#666", label: movie.platform };
  return (
    <div style={{ borderRadius: "16px", overflow: "hidden", background: "white", border: "1px solid #E2DFD8", transition: "all 0.25s", display: "flex", flexDirection: "column" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
      <div style={{ position: "relative", height: "200px", background: "#1A1A1A", overflow: "hidden" }}>
        {movie.poster_url ? <img src={movie.poster_url} alt={movie.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px" }}>{"\u{1F3AC}"}</div>}
        {movie.trailer_youtube_id && (<button onClick={() => onTrailer(movie.trailer_youtube_id)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.25s" }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0}><div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(255,255,255,0.95)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}><Play size={24} fill={COLORS.primary} color={COLORS.primary} style={{ marginLeft: "3px" }} /></div></button>)}
        <div style={{ position: "absolute", top: "10px", left: "10px", display: "flex", gap: "6px" }}>
          {isOtt && movie.platform ? <span style={{ padding: "4px 10px", borderRadius: "999px", fontSize: "10px", fontWeight: 700, fontFamily: fb, background: platInfo.bg, color: platInfo.color }}>{platInfo.label}</span> : <span style={{ padding: "4px 10px", borderRadius: "999px", fontSize: "10px", fontWeight: 700, fontFamily: fb, background: movie.status === "now_playing" ? "#E8F5E9" : "#FFF3E0", color: movie.status === "now_playing" ? "#2E7D32" : "#E65100" }}>{movie.status === "now_playing" ? "IN THEATERS" : "COMING SOON"}</span>}
        </div>
        <span style={{ position: "absolute", top: "10px", right: "10px", padding: "4px 10px", borderRadius: "999px", fontSize: "10px", fontWeight: 700, fontFamily: fb, background: "rgba(0,0,0,0.6)", color: "white" }}>{movie.language}</span>
      </div>
      <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontFamily: ff, fontSize: "17px", fontWeight: 700, margin: "0 0 8px", color: "#1A1A1A", lineHeight: 1.3 }}>{movie.title}</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "8px", fontSize: "11px", color: COLORS.textMuted }}>
          {movie.genre && <span>{movie.genre}</span>}
          {movie.runtime && <span style={{ display: "flex", alignItems: "center", gap: "2px" }}><Clock size={10} /> {movie.runtime}</span>}
          {(movie.imdb_rating || movie.rating) && <span style={{ display: "flex", alignItems: "center", gap: "2px" }}><Star size={10} fill={SAFFRON} color={SAFFRON} /> {movie.imdb_rating ? `${movie.imdb_rating} IMDb` : movie.rating}</span>}
        </div>
        {movie.synopsis && <p style={{ fontSize: "12px", color: COLORS.textMuted, margin: "0 0 12px", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{movie.synopsis}</p>}
        {movie.release_date && <div style={{ fontSize: "11px", color: COLORS.textFaint, marginBottom: "12px" }}>{isOtt ? "Streaming since" : "Release"}: {movie.release_date}</div>}
        <div style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
          {isOtt && movie.watch_url ? (<a href={movie.watch_url} target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: "10px 14px", borderRadius: "10px", background: platInfo.color, color: "white", fontSize: "12px", fontWeight: 700, fontFamily: fb, textDecoration: "none", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}><Play size={13} /> Watch Now</a>) : movie.fandango_url ? (<a href={movie.fandango_url} target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: "10px 14px", borderRadius: "10px", background: COLORS.primary, color: "white", fontSize: "12px", fontWeight: 700, fontFamily: fb, textDecoration: "none", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}><Ticket size={13} /> Get Tickets</a>) : null}
          {movie.trailer_youtube_id && (<button onClick={() => onTrailer(movie.trailer_youtube_id)} style={{ flex: 1, padding: "10px 14px", borderRadius: "10px", background: "#1A1A1A", color: "white", fontSize: "12px", fontWeight: 700, fontFamily: fb, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}><Play size={13} /> Trailer</button>)}
        </div>
      </div>
    </div>
  );
}
