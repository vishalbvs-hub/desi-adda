"use client";
import { useState, useEffect } from "react";
import { ExternalLink, MapPin, Calendar, Ticket } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

const ff = FONTS.heading;
const fb = FONTS.body;
const SAFFRON = "#C4943D";
const LANGUAGES = ["All", "Telugu", "Hindi", "Tamil", "Punjabi", "Malayalam", "Kannada", "Bengali", "English"];

const SPOTIFY_ICON = <svg width="14" height="14" viewBox="0 0 24 24" fill="#1DB954"><circle cx="12" cy="12" r="12"/><path d="M16.5 16.3c-.2 0-.3-.1-.5-.2-2-1.2-4.5-1.5-7.4-.8-.3.1-.5-.1-.6-.4-.1-.3.1-.5.4-.6 3.2-.7 6-.4 8.2.9.2.1.3.4.2.7-.1.2-.2.4-.3.4zm1.1-2.5c-.2 0-.3-.1-.5-.2-2.3-1.4-5.8-1.8-8.5-1-.3.1-.6 0-.7-.3s0-.6.3-.7c3.1-.9 6.9-.5 9.5 1.1.3.2.4.5.2.8-.1.2-.2.3-.3.3zm.1-2.6c-2.8-1.6-7.3-1.8-9.9-.9-.3.1-.7-.1-.8-.4-.1-.3.1-.7.4-.8 3-.9 8-.7 11.1 1.1.3.2.4.6.2.9-.2.2-.6.3-1 .1z" fill="white"/></svg>;
const APPLE_ICON = <svg width="14" height="14" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="url(#appleGrad)"/><defs><linearGradient id="appleGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FA233B"/><stop offset="100%" stopColor="#FB5C74"/></linearGradient></defs><path d="M16.5 6.5c0-.8.3-1.4.3-1.4s-1.2.1-2 1c-.7.8-.6 1.7-.6 1.7s1.1 0 1.7-.6c.4-.4.6-.7.6-.7zM15.8 8.5c-1 0-1.8.6-2.3.6s-1.2-.6-2-.6c-1.5 0-3 1.3-3 3.7 0 1.5.6 3 1.3 4 .6.8 1.1 1.4 1.8 1.4.7 0 1-.5 2-.5s1.2.5 2 .5c.7 0 1.2-.7 1.7-1.4.4-.5.7-1 .9-1.5-1.7-.7-2-3.1-.3-4.1-.6-.7-1.4-1.1-2.1-1.1z" fill="white"/></svg>;

const SECTIONS = [
  { id: "All", label: "All", icon: "\u{2728}" },
  { id: "Songs", label: "Songs", icon: "\u{1F525}" },
  { id: "Playlists", label: "Playlists", icon: "\u{1F3A7}" },
  { id: "Live", label: "Live Near You", icon: "\u{1F3A4}" },
];

export default function MusicContent() {
  const [lang, setLang] = useState("All");
  const [section, setSection] = useState("All");
  const [platform, setPlatform] = useState("All");
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [concerts, setConcerts] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      supabase.from("music_trending").select("*").order("rank"),
      supabase.from("music_playlists").select("*").order("name"),
      supabase.from("music_concerts").select("*").order("event_date"),
      supabase.from("music_news").select("*").order("published_date", { ascending: false }).limit(8),
    ]).then(([s, p, c, n]) => { setSongs(s.data || []); setPlaylists(p.data || []); setConcerts(c.data || []); setNews(n.data || []); setLoading(false); });
  }, []);

  const filteredSongs = songs.filter(s => (lang === "All" || s.language === lang) && (platform === "All" || (platform === "Spotify" && s.spotify_url) || (platform === "Apple Music" && s.apple_music_url)));
  const filteredPlaylists = playlists.filter(p => (lang === "All" || p.language === lang || p.language === "Multi") && (platform === "All" || p.platform === platform));
  const detroitConcerts = concerts.filter(c => c.region === "Detroit" || !c.region);
  const midwestConcerts = concerts.filter(c => c.region === "Midwest");

  if (loading) return <div style={{ padding: "60px 20px", textAlign: "center" }}><p style={{ fontFamily: ff, color: COLORS.textMuted }}>Loading music...</p></div>;

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
          <div style={{ width: "1px", height: "24px", background: "#E2DFD8" }} />
          <div style={{ display: "flex", gap: "6px" }}>
            {[{ id: "All", label: "All Platforms" }, { id: "Spotify", label: "Spotify", icon: SPOTIFY_ICON }, { id: "Apple Music", label: "Apple Music", icon: APPLE_ICON }].map(p => (<button key={p.id} onClick={() => setPlatform(p.id)} style={{ padding: "5px 12px", borderRadius: "999px", fontSize: "11px", fontFamily: fb, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", border: platform === p.id ? `2px solid ${SAFFRON}` : "2px solid #E2DFD8", background: platform === p.id ? SAFFRON : "white", color: platform === p.id ? "#1A1A1A" : COLORS.textMuted, transition: "all 0.25s" }}>{p.icon && p.icon} {p.label}</button>))}
          </div>
        </div>
      </div>

      {/* CONTENT + SIDEBAR */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 20px", display: "flex", gap: "32px", alignItems: "flex-start" }}>
        <div style={{ flex: 1, minWidth: 0, padding: "36px 0" }}>

          {/* TRENDING SONGS */}
          {(section === "All" || section === "Songs") && filteredSongs.length > 0 && (
            <div style={{ marginBottom: "40px" }}>
              <h2 style={{ fontFamily: ff, fontSize: "clamp(22px, 3.5vw, 28px)", fontWeight: 700, margin: "0 0 6px", color: "#1A1A1A" }}>{"\u{1F525}"} Trending This Week</h2>
              <p style={{ fontSize: "12px", color: COLORS.textFaint, margin: "0 0 16px" }}>Updated weekly</p>
              <div style={{ display: "grid", gap: "8px" }}>
                {filteredSongs.map((song, i) => (
                  <div key={song.id || i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", background: "white", borderRadius: "12px", border: "1px solid #E2DFD8" }}>
                    <span style={{ fontFamily: ff, fontSize: "16px", fontWeight: 700, color: SAFFRON, width: "28px", textAlign: "center" }}>{song.rank || i + 1}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: fb, fontSize: "13px", fontWeight: 600, color: "#1A1A1A", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{song.title}</p>
                      <p style={{ fontSize: "11px", color: COLORS.textMuted, margin: 0 }}>{song.artist}{song.language ? ` · ${song.language}` : ""}</p>
                    </div>
                    <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                      {song.spotify_url && <a href={song.spotify_url} target="_blank" rel="noopener noreferrer" title="Spotify">{SPOTIFY_ICON}</a>}
                      {song.apple_music_url && <a href={song.apple_music_url} target="_blank" rel="noopener noreferrer" title="Apple Music">{APPLE_ICON}</a>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PLAYLISTS */}
          {(section === "All" || section === "Playlists") && filteredPlaylists.length > 0 && (
            <div style={{ marginBottom: "40px" }}>
              <h2 style={{ fontFamily: ff, fontSize: "clamp(22px, 3.5vw, 28px)", fontWeight: 700, margin: "0 0 16px", color: "#1A1A1A" }}>{"\u{1F3A7}"} Our Playlists</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "14px" }}>
                {filteredPlaylists.map((pl, i) => (
                  <a key={pl.id || i} href={pl.url} target="_blank" rel="noopener noreferrer" style={{ padding: "16px", borderRadius: "14px", background: "white", border: "1px solid #E2DFD8", textDecoration: "none", color: "inherit", transition: "all 0.25s" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.06)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                      {pl.platform === "Spotify" ? SPOTIFY_ICON : APPLE_ICON}
                      <span style={{ fontSize: "10px", fontWeight: 600, color: COLORS.textMuted }}>{pl.platform}</span>
                      {pl.language && <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 6px", borderRadius: "999px", background: `${SAFFRON}15`, color: SAFFRON }}>{pl.language}</span>}
                    </div>
                    <h4 style={{ fontFamily: ff, fontSize: "14px", fontWeight: 700, margin: "0 0 4px", color: "#1A1A1A" }}>{pl.name}</h4>
                    {pl.description && <p style={{ fontSize: "11px", color: COLORS.textMuted, margin: 0, lineHeight: 1.4 }}>{pl.description}</p>}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* CONCERTS */}
          {(section === "All" || section === "Live") && (detroitConcerts.length > 0 || midwestConcerts.length > 0) && (
            <div style={{ marginBottom: "40px" }}>
              <h2 style={{ fontFamily: ff, fontSize: "clamp(22px, 3.5vw, 28px)", fontWeight: 700, margin: "0 0 16px", color: "#1A1A1A" }}>{"\u{1F3A4}"} Live Near You</h2>
              <div style={{ display: "grid", gap: "12px" }}>
                {[...detroitConcerts, ...midwestConcerts].map((c, i) => {
                  const d = c.event_date ? new Date(c.event_date + "T00:00:00") : null;
                  const dateStr = d ? d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";
                  return (
                    <div key={c.id || i} style={{ display: "flex", gap: "14px", padding: "16px", background: "white", borderRadius: "14px", border: "1px solid #E2DFD8", alignItems: "center" }}>
                      {dateStr && <div style={{ padding: "8px 12px", borderRadius: "10px", background: SAFFRON, color: "white", fontFamily: ff, fontSize: "12px", fontWeight: 700, textAlign: "center", lineHeight: 1.3, flexShrink: 0 }}>{dateStr}</div>}
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontFamily: ff, fontSize: "15px", fontWeight: 700, margin: "0 0 3px", color: "#1A1A1A" }}>{c.name}</h4>
                        <p style={{ fontSize: "12px", color: COLORS.textMuted, margin: 0, display: "flex", alignItems: "center", gap: "4px" }}><MapPin size={11} /> {c.venue}, {c.city}</p>
                      </div>
                      {c.ticket_url && <a href={c.ticket_url} target="_blank" rel="noopener noreferrer" style={{ padding: "8px 16px", borderRadius: "10px", background: SAFFRON, color: "white", fontSize: "11px", fontWeight: 700, fontFamily: fb, textDecoration: "none", display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}><Ticket size={11} /> Tickets</a>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* NEWS SIDEBAR */}
        <aside style={{ width: "300px", flexShrink: 0, position: "sticky", top: "70px", alignSelf: "flex-start", paddingTop: "36px", paddingBottom: "36px", maxHeight: "calc(100vh - 70px)", display: "flex", flexDirection: "column" }}>
          <div style={{ background: "white", borderRadius: "16px", border: "1px solid #E2DFD8", overflow: "hidden", display: "flex", flexDirection: "column", maxHeight: "calc(100vh - 140px)" }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid #E2DFD8", background: "#1A1A1A", flexShrink: 0 }}><h3 style={{ fontFamily: ff, fontSize: "15px", fontWeight: 700, margin: 0, color: "white" }}>{"\u{1F4F0}"} Music News</h3></div>
            <div style={{ overflowY: "auto", scrollbarWidth: "thin" }}>
              {news.length > 0 ? news.map((item, i) => { const da = Math.floor((Date.now() - new Date(item.published_date + "T00:00:00").getTime()) / 86400000); const tl = da === 0 ? "Today" : da === 1 ? "Yesterday" : `${da}d ago`; const hue = item.source.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 360; return (<a key={item.id || i} href={item.url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", gap: "10px", padding: "12px 14px", borderBottom: i < news.length - 1 ? "1px solid #F5F0EA" : "none", textDecoration: "none", color: "inherit", transition: "background 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = "#F5F2EB"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}><div style={{ width: "50px", height: "50px", borderRadius: "8px", overflow: "hidden", flexShrink: 0, background: item.image_url ? "#E2DFD8" : `hsl(${hue}, 30%, 90%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>{item.image_url ? <img src={item.image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: "16px", fontWeight: 700, color: `hsl(${hue}, 40%, 50%)` }}>{item.source.charAt(0)}</span>}</div><div style={{ flex: 1, minWidth: 0 }}><p style={{ fontFamily: fb, fontSize: "11px", fontWeight: 600, color: "#1A1A1A", margin: "0 0 3px", lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.headline}</p><div style={{ fontSize: "9px", color: COLORS.textFaint }}><span style={{ fontWeight: 600, color: COLORS.primary }}>{item.source}</span> {"\u00B7"} {tl}</div></div></a>); }) : <p style={{ padding: "16px", fontSize: "12px", color: COLORS.textMuted }}>No news yet.</p>}
            </div>
          </div>
        </aside>
      </div>
      <style>{`@media (max-width: 900px) { aside { display: none !important; } }`}</style>
    </>
  );
}
