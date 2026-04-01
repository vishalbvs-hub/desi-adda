"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ExternalLink, Clock, Star, Play, Ticket } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

const ff = FONTS.heading;
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

export default function MoviesContent() {
  const [lang, setLang] = useState("All");
  const [section, setSection] = useState("All");
  const [movies, setMovies] = useState([]);
  const [news, setNews] = useState([]);
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailerYoutubeId, setTrailerYoutubeId] = useState(null);

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

  if (loading) return <div style={{ padding: "60px 20px", textAlign: "center" }}><p style={{ fontFamily: ff, color: COLORS.textMuted }}>Loading movies...</p></div>;

  return (
    <>
      {/* FILTERS */}
      <div style={{ background: "white", borderBottom: "1px solid #E2DFD8", padding: "12px 20px" }}>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {LANGUAGES.map(l => (<button key={l} onClick={() => setLang(l)} style={{ padding: "6px 14px", borderRadius: "999px", fontSize: "12px", fontFamily: fb, fontWeight: 600, cursor: "pointer", border: lang === l ? `2px solid ${SAFFRON}` : "2px solid #E2DFD8", background: lang === l ? SAFFRON : "white", color: lang === l ? "#1A1A1A" : COLORS.textMuted, transition: "all 0.25s" }}>{l}</button>))}
          </div>
          <div style={{ width: "1px", height: "24px", background: "#E2DFD8" }} />
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {SECTIONS.map(s => (<button key={s.id} onClick={() => setSection(s.id)} style={{ padding: "6px 14px", borderRadius: "999px", fontSize: "12px", fontFamily: fb, fontWeight: 600, cursor: "pointer", border: section === s.id ? `2px solid ${SAFFRON}` : "2px solid #E2DFD8", background: section === s.id ? SAFFRON : "white", color: section === s.id ? "#1A1A1A" : COLORS.textMuted, transition: "all 0.25s" }}>{s.icon} {s.label}</button>))}
          </div>
        </div>
      </div>

      {/* CONTENT + SIDEBAR */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 20px", display: "flex", gap: "32px", alignItems: "flex-start" }}>
        <div style={{ flex: 1, minWidth: 0, padding: "36px 0" }}>

          {(section === "All" || section === "now_playing") && nowPlaying.length > 0 && (<div style={{ marginBottom: "40px" }}><h2 style={{ fontFamily: ff, fontSize: "clamp(22px, 3.5vw, 28px)", fontWeight: 700, margin: "0 0 16px", color: "#1A1A1A" }}>{"\u{1F3AC}"} Now Playing</h2><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>{nowPlaying.map(m => <MovieCard key={m.id} movie={m} onTrailer={setTrailerYoutubeId} />)}</div></div>)}

          {(section === "All" || section === "ott") && ottMovies.length > 0 && (<div style={{ marginBottom: "40px" }}><h2 style={{ fontFamily: ff, fontSize: "clamp(22px, 3.5vw, 28px)", fontWeight: 700, margin: "0 0 16px", color: "#1A1A1A" }}>{"\u{1F4FA}"} New on OTT</h2><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>{ottMovies.map(m => <MovieCard key={m.id} movie={m} onTrailer={setTrailerYoutubeId} isOtt />)}</div></div>)}

          {(section === "All" || section === "coming_soon") && comingSoon.length > 0 && (<div style={{ marginBottom: "40px" }}><h2 style={{ fontFamily: ff, fontSize: "clamp(22px, 3.5vw, 28px)", fontWeight: 700, margin: "0 0 16px", color: "#1A1A1A" }}>{"\u{1F4C5}"} Coming Soon</h2><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>{comingSoon.map(m => <MovieCard key={m.id} movie={m} onTrailer={setTrailerYoutubeId} />)}</div></div>)}

          {(section === "All" || section === "lists") && filteredLists.length > 0 && (<div style={{ marginBottom: "40px" }}><h2 style={{ fontFamily: ff, fontSize: "clamp(22px, 3.5vw, 28px)", fontWeight: 700, margin: "0 0 6px", color: "#1A1A1A" }}>{"\u{1F4DA}"} Curated Lists</h2><p style={{ fontFamily: fb, fontSize: "13px", color: COLORS.textMuted, margin: "0 0 16px" }}>Handpicked from Letterboxd, IMDB & Mubi.</p><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "14px" }}>{filteredLists.map((list, i) => { const sc = list.source === "Letterboxd" ? LETTERBOXD_COLORS : list.source === "IMDB" ? { bg: "#FFF8E1", color: "#F5C518" } : { bg: "#E3F2FD", color: "#1565C0" }; return (<a key={list.id || i} href={list.url} target="_blank" rel="noopener noreferrer" style={{ padding: "18px", borderRadius: "14px", background: "white", border: "1px solid #E2DFD8", textDecoration: "none", color: "inherit", transition: "all 0.25s", display: "flex", flexDirection: "column", gap: "6px" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}><div style={{ display: "flex", gap: "6px" }}><span style={{ fontSize: "10px", fontFamily: fb, fontWeight: 700, padding: "3px 8px", borderRadius: "999px", background: sc.bg, color: sc.color }}>{list.source}</span>{list.language !== "All" && <span style={{ fontSize: "10px", fontFamily: fb, fontWeight: 600, padding: "3px 8px", borderRadius: "999px", background: `${SAFFRON}15`, color: SAFFRON }}>{list.language}</span>}</div><h4 style={{ fontFamily: ff, fontSize: "14px", fontWeight: 700, margin: 0, color: "#1A1A1A", lineHeight: 1.3 }}>{list.name}</h4>{list.description && <p style={{ fontSize: "11px", color: COLORS.textMuted, margin: 0, lineHeight: 1.4 }}>{list.description}</p>}<span style={{ fontSize: "11px", fontFamily: fb, fontWeight: 600, color: COLORS.primary, display: "flex", alignItems: "center", gap: "4px", marginTop: "auto" }}>Browse <ExternalLink size={10} /></span></a>); })}</div></div>)}

          {filteredMovies.length === 0 && section !== "lists" && (<div style={{ padding: "60px 20px", textAlign: "center", background: "white", borderRadius: "16px", border: "1px solid #E0D8CF" }}><p style={{ fontSize: "16px", color: "#6B6B6B", margin: 0, fontFamily: ff }}>No movies found — check back soon!</p></div>)}
        </div>

        {/* NEWS SIDEBAR */}
        <aside style={{ width: "300px", flexShrink: 0, position: "sticky", top: "70px", alignSelf: "flex-start", paddingTop: "36px", paddingBottom: "36px", maxHeight: "calc(100vh - 70px)", display: "flex", flexDirection: "column" }}>
          <NewsSidebar news={news} title="Movie News" />
        </aside>
      </div>
      <style>{`@media (max-width: 900px) { aside { display: none !important; } }`}</style>

      {/* TRAILER MODAL */}
      {trailerYoutubeId && (<div onClick={() => setTrailerYoutubeId(null)} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}><div onClick={e => e.stopPropagation()} style={{ width: "min(900px, 95vw)", position: "relative" }}><button onClick={() => setTrailerYoutubeId(null)} style={{ position: "absolute", top: "-40px", right: "0", background: "none", border: "none", color: "white", fontSize: "28px", cursor: "pointer" }}>{"\u2715"}</button><div style={{ position: "relative", paddingBottom: "56.25%", height: 0, borderRadius: "12px", overflow: "hidden" }}><iframe src={`https://www.youtube.com/embed/${trailerYoutubeId}?autoplay=1&rel=0`} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen title="Trailer" /></div></div></div>)}
    </>
  );
}

function NewsSidebar({ news, title }) {
  return (
    <div style={{ background: "white", borderRadius: "16px", border: "1px solid #E2DFD8", overflow: "hidden", display: "flex", flexDirection: "column", maxHeight: "calc(100vh - 140px)" }}>
      <div style={{ padding: "14px 18px", borderBottom: "1px solid #E2DFD8", background: "#1A1A1A", flexShrink: 0 }}><h3 style={{ fontFamily: FONTS.heading, fontSize: "15px", fontWeight: 700, margin: 0, color: "white" }}>{"\u{1F4F0}"} {title}</h3></div>
      <div style={{ overflowY: "auto", scrollbarWidth: "thin" }}>
        {news.length > 0 ? news.map((item, i) => { const da = Math.floor((Date.now() - new Date(item.published_date + "T00:00:00").getTime()) / 86400000); const tl = da === 0 ? "Today" : da === 1 ? "Yesterday" : `${da}d ago`; const hue = item.source.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 360; return (<a key={item.id || i} href={item.url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", gap: "12px", padding: "14px 16px", borderBottom: i < news.length - 1 ? "1px solid #F5F0EA" : "none", textDecoration: "none", color: "inherit", transition: "background 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = "#F5F2EB"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}><div style={{ width: "56px", height: "56px", borderRadius: "10px", overflow: "hidden", flexShrink: 0, background: item.image_url ? "#E2DFD8" : `hsl(${hue}, 30%, 90%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>{item.image_url ? <img src={item.image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display = "none"; e.target.parentElement.innerHTML = `<span style="font-size:18px;font-weight:700;color:hsl(${hue},40%,50%)">${item.source.charAt(0)}</span>`; }} /> : <span style={{ fontSize: "18px", fontWeight: 700, color: `hsl(${hue}, 40%, 50%)` }}>{item.source.charAt(0)}</span>}</div><div style={{ flex: 1, minWidth: 0 }}><p style={{ fontFamily: FONTS.body, fontSize: "12px", fontWeight: 600, color: "#1A1A1A", margin: "0 0 4px", lineHeight: 1.35, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.headline}</p><div style={{ fontSize: "10px", color: COLORS.textFaint }}><span style={{ fontWeight: 600, color: COLORS.primary }}>{item.source}</span> {"\u00B7"} {tl}</div></div></a>); }) : <p style={{ padding: "20px", fontSize: "13px", color: COLORS.textMuted }}>No news yet.</p>}
      </div>
    </div>
  );
}

function MovieCard({ movie, onTrailer, isOtt }) {
  const platInfo = PLATFORM_COLORS[movie.platform] || { bg: "#F5F5F5", color: "#666", label: movie.platform };
  return (
    <div style={{ borderRadius: "14px", overflow: "hidden", background: "white", border: "1px solid #E2DFD8", transition: "all 0.25s", display: "flex", flexDirection: "column" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
      <div style={{ position: "relative", height: "180px", background: "#1A1A1A", overflow: "hidden" }}>
        {movie.poster_url ? <img src={movie.poster_url} alt={movie.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.onerror = null; e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} /> : null}<div style={{ width: "100%", height: "100%", display: movie.poster_url ? "none" : "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", background: "#F5EDE4" }}>{"\u{1F3AC}"}</div>
        {movie.trailer_youtube_id && (<button onClick={() => onTrailer(movie.trailer_youtube_id)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.25s" }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0}><div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255,255,255,0.95)", display: "flex", alignItems: "center", justifyContent: "center" }}><Play size={20} fill={COLORS.primary} color={COLORS.primary} style={{ marginLeft: "2px" }} /></div></button>)}
        <div style={{ position: "absolute", top: "8px", left: "8px", display: "flex", gap: "4px" }}>
          {isOtt && movie.platform ? <span style={{ padding: "3px 8px", borderRadius: "999px", fontSize: "9px", fontWeight: 700, fontFamily: fb, background: platInfo.bg, color: platInfo.color }}>{platInfo.label}</span> : <span style={{ padding: "3px 8px", borderRadius: "999px", fontSize: "9px", fontWeight: 700, fontFamily: fb, background: movie.status === "now_playing" ? "#E8F5E9" : "#FFF3E0", color: movie.status === "now_playing" ? "#2E7D32" : "#E65100" }}>{movie.status === "now_playing" ? "IN THEATERS" : "COMING SOON"}</span>}
        </div>
        <span style={{ position: "absolute", top: "8px", right: "8px", padding: "3px 8px", borderRadius: "999px", fontSize: "9px", fontWeight: 700, fontFamily: fb, background: "rgba(0,0,0,0.6)", color: "white" }}>{movie.language}</span>
      </div>
      <div style={{ padding: "14px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontFamily: ff, fontSize: "15px", fontWeight: 700, margin: "0 0 6px", color: "#1A1A1A", lineHeight: 1.3 }}>{movie.title}</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "6px", fontSize: "10px", color: COLORS.textMuted }}>
          {movie.genre && <span>{movie.genre}</span>}
          {movie.runtime && <span style={{ display: "flex", alignItems: "center", gap: "2px" }}><Clock size={9} /> {movie.runtime}</span>}
          {(movie.imdb_rating || movie.rating) && <span style={{ display: "flex", alignItems: "center", gap: "2px" }}><Star size={9} fill={SAFFRON} color={SAFFRON} /> {movie.imdb_rating ? `${movie.imdb_rating} IMDb` : movie.rating}</span>}
        </div>
        {movie.synopsis && <p style={{ fontSize: "11px", color: COLORS.textMuted, margin: "0 0 10px", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{movie.synopsis}</p>}
        <div style={{ display: "flex", gap: "6px", marginTop: "auto" }}>
          {isOtt && movie.watch_url ? (<a href={movie.watch_url} target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: "8px 12px", borderRadius: "10px", background: platInfo.color, color: "white", fontSize: "11px", fontWeight: 700, fontFamily: fb, textDecoration: "none", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}><Play size={11} /> Watch</a>) : movie.fandango_url ? (<a href={movie.fandango_url} target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: "8px 12px", borderRadius: "10px", background: COLORS.primary, color: "white", fontSize: "11px", fontWeight: 700, fontFamily: fb, textDecoration: "none", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}><Ticket size={11} /> Tickets</a>) : null}
          {movie.trailer_youtube_id && (<button onClick={() => onTrailer(movie.trailer_youtube_id)} style={{ flex: 1, padding: "8px 12px", borderRadius: "10px", background: "#1A1A1A", color: "white", fontSize: "11px", fontWeight: 700, fontFamily: fb, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}><Play size={11} /> Trailer</button>)}
        </div>
      </div>
    </div>
  );
}
