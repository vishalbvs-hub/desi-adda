"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, MapPin, Calendar, Ticket } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

const ff = FONTS.heading;
const fb = FONTS.body;
const SAFFRON = "#E8A317";

const LANGUAGES = ["All", "Telugu", "Hindi", "Tamil", "Punjabi", "Malayalam", "Kannada", "Bengali"];

const SPOTIFY_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#1DB954">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

const APPLE_ICON = (
  <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <rect width="16" height="16" rx="3.5" fill="url(#amg)"/>
    <defs><linearGradient id="amg" x1="8" y1="0" x2="8" y2="16" gradientUnits="userSpaceOnUse"><stop stopColor="#FA233B"/><stop offset="1" stopColor="#FB5C74"/></linearGradient></defs>
    <path fill="white" d="M11.2 3.15L6.5 4.1c-.2.04-.29.12-.29.37v5.45c0 .2-.01.38-.05.57a1.4 1.4 0 0 1-.22.52 1.3 1.3 0 0 1-.41.38c-.16.1-.34.16-.52.19-.35.07-.59.09-.81-.04a1.1 1.1 0 0 1-.54-.28 1.15 1.15 0 0 1-.37-.74 1.18 1.18 0 0 1 .31-.94c.15-.15.32-.26.49-.31.22-.09.46-.14.83-.21l.29-.06c.13-.03.24-.06.33-.17.09-.11.1-.24.1-.37V4.5c0-.08.01-.13.01-.15a.47.47 0 0 1 .15-.29.62.62 0 0 1 .28-.13l4.49-.91c.04-.01.36-.07.4-.07.24-.02.38.14.38.4v4.34c0 .2 0 .39-.04.57a1.4 1.4 0 0 1-.22.52 1.3 1.3 0 0 1-.41.38c-.16.1-.34.15-.52.19-.35.07-.59.09-.81-.04a1.1 1.1 0 0 1-.54-.28 1.18 1.18 0 0 1-.38-.74 1.19 1.19 0 0 1 .32-.94c.15-.15.32-.26.49-.31.22-.09.46-.14.83-.21l.29-.06c.13-.03.24-.06.33-.17.09-.11.09-.24.09-.37V3.44c0-.26-.11-.33-.36-.29z"/>
  </svg>
);

function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export default function MusicPage() {
  const [lang, setLang] = useState("All");
  const [section, setSection] = useState("All");
  const [platform, setPlatform] = useState("All");
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const trendingRef = useFadeIn();
  const playlistsRef = useFadeIn();
  const concertsRef = useFadeIn();

  useEffect(() => {
    Promise.all([
      supabase.from("music_trending").select("*").order("rank"),
      supabase.from("music_playlists").select("*").order("name"),
      supabase.from("music_concerts").select("*").order("event_date"),
    ]).then(([s, p, c]) => {
      setSongs(s.data || []);
      setPlaylists(p.data || []);
      setConcerts(c.data || []);
      setLoading(false);
    });
  }, []);

  const filteredSongs = lang === "All" ? songs : songs.filter(s => s.language === lang);
  const filteredPlaylists = playlists.filter(p => {
    const langMatch = lang === "All" || p.language === lang || p.language === "All";
    const platformMatch = platform === "All" || p.platform === platform;
    return langMatch && platformMatch;
  });
  const detroitConcerts = concerts.filter(c => c.region === "detroit");
  const midwestConcerts = concerts.filter(c => c.region === "midwest");

  // Group songs by language for "All" view
  const songsByLang = {};
  filteredSongs.forEach(s => {
    if (!songsByLang[s.language]) songsByLang[s.language] = [];
    songsByLang[s.language].push(s);
  });

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFFBF5" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>{"\u{1F3B5}"}</div>
          <p style={{ fontFamily: ff, fontSize: "18px", color: COLORS.textMuted }}>Loading the music...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#FFFBF5", minHeight: "100vh" }}>
      {/* ═══ BACK NAV ═══ */}
      <div style={{ background: "white", borderBottom: "1px solid #EDE6DE", padding: "12px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "6px", color: COLORS.primary, fontFamily: fb, fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
          <ArrowLeft size={18} /> Back
        </Link>
      </div>

      {/* ═══ HERO ═══ */}
      <section style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
        padding: "48px 20px 40px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative music icons scattered around */}
        <div style={{ position: "absolute", top: "6%", left: "5%", fontSize: "44px", opacity: 0.07, transform: "rotate(-15deg)" }}>{"\u{1F3B6}"}</div>
        <div style={{ position: "absolute", top: "12%", right: "8%", fontSize: "56px", opacity: 0.06, transform: "rotate(12deg)" }}>{"\u{1F3B5}"}</div>
        <div style={{ position: "absolute", bottom: "18%", left: "12%", fontSize: "50px", opacity: 0.06, transform: "rotate(20deg)" }}>{"\u{1F3A7}"}</div>
        <div style={{ position: "absolute", top: "35%", left: "2%", fontSize: "38px", opacity: 0.05, transform: "rotate(-25deg)" }}>{"\u{1F3A4}"}</div>
        <div style={{ position: "absolute", top: "55%", right: "4%", fontSize: "46px", opacity: 0.06, transform: "rotate(18deg)" }}>{"\u{1F3B8}"}</div>
        <div style={{ position: "absolute", bottom: "8%", right: "15%", fontSize: "42px", opacity: 0.05, transform: "rotate(-10deg)" }}>{"\u{1F3B9}"}</div>
        <div style={{ position: "absolute", top: "8%", left: "40%", fontSize: "34px", opacity: 0.04, transform: "rotate(30deg)" }}>{"\u{1F941}"}</div>
        <div style={{ position: "absolute", bottom: "25%", left: "3%", fontSize: "36px", opacity: 0.05, transform: "rotate(15deg)" }}>{"\u{1F4FB}"}</div>
        <div style={{ position: "absolute", top: "45%", right: "12%", fontSize: "40px", opacity: 0.04, transform: "rotate(-20deg)" }}>{"\u{1F3BA}"}</div>
        <div style={{ position: "absolute", bottom: "5%", left: "30%", fontSize: "32px", opacity: 0.05, transform: "rotate(8deg)" }}>{"\u{1F3B6}"}</div>
        <div style={{ position: "absolute", top: "70%", left: "8%", fontSize: "48px", opacity: 0.04, transform: "rotate(-12deg)" }}>{"\u{1F3B5}"}</div>
        <div style={{ position: "absolute", bottom: "12%", right: "30%", fontSize: "38px", opacity: 0.05, transform: "rotate(22deg)" }}>{"\u{1F50A}"}</div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{
            fontFamily: ff, fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700,
            color: "white", lineHeight: 1.1, margin: "0 0 8px",
          }}>
            Desi <span style={{ color: SAFFRON, fontStyle: "italic" }}>Music</span>
          </h1>
          <p style={{
            fontFamily: ff, fontSize: "clamp(14px, 2vw, 18px)", fontWeight: 300,
            color: "rgba(255,255,255,0.6)", margin: "0 0 28px", fontStyle: "italic",
          }}>
            Charts, playlists & live shows — all in one place
          </p>

          {/* Language Filter Tabs */}
          <div style={{
            display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap",
          }}>
            {LANGUAGES.map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  padding: "8px 20px", borderRadius: "999px", fontSize: "13px",
                  fontFamily: fb, fontWeight: 600, cursor: "pointer",
                  border: lang === l ? `2px solid ${SAFFRON}` : "2px solid rgba(255,255,255,0.15)",
                  background: lang === l ? SAFFRON : "rgba(255,255,255,0.08)",
                  color: lang === l ? "#1a1a2e" : "rgba(255,255,255,0.7)",
                  transition: "all 0.25s",
                }}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Section Filter Tabs */}
          <div style={{
            display: "flex", gap: "6px", justifyContent: "center", flexWrap: "wrap",
            marginTop: "14px",
          }}>
            {[
              { id: "All", label: "All", icon: "\u{2728}" },
              { id: "Songs", label: "Songs", icon: "\u{1F525}" },
              { id: "Playlists", label: "Playlists", icon: "\u{1F3A7}" },
              { id: "Live", label: "Live Near You", icon: "\u{1F3A4}" },
            ].map(s => (
              <button
                key={s.id}
                onClick={() => setSection(s.id)}
                style={{
                  padding: "6px 16px", borderRadius: "999px", fontSize: "12px",
                  fontFamily: fb, fontWeight: 600, cursor: "pointer",
                  border: section === s.id ? `2px solid ${SAFFRON}` : "2px solid rgba(255,255,255,0.15)",
                  background: section === s.id ? SAFFRON : "rgba(255,255,255,0.08)",
                  color: section === s.id ? "#1a1a2e" : "rgba(255,255,255,0.6)",
                  transition: "all 0.25s",
                }}
              >
                {s.icon} {s.label}
              </button>
            ))}
          </div>

          {/* Platform Filter */}
          <div style={{
            display: "flex", gap: "6px", justifyContent: "center", flexWrap: "wrap",
            marginTop: "10px",
          }}>
            {[
              { id: "All", label: "All Platforms" },
              { id: "Spotify", label: "Spotify", icon: SPOTIFY_ICON },
              { id: "Apple Music", label: "Apple Music", icon: APPLE_ICON },
            ].map(p => (
              <button
                key={p.id}
                onClick={() => setPlatform(p.id)}
                style={{
                  padding: "5px 14px", borderRadius: "999px", fontSize: "11px",
                  fontFamily: fb, fontWeight: 600, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: "5px",
                  border: platform === p.id ? `2px solid ${SAFFRON}` : "2px solid rgba(255,255,255,0.15)",
                  background: platform === p.id ? SAFFRON : "rgba(255,255,255,0.08)",
                  color: platform === p.id ? "#1a1a2e" : "rgba(255,255,255,0.6)",
                  transition: "all 0.25s",
                }}
              >
                {p.icon && p.icon} {p.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRENDING THIS WEEK ═══ */}
      {(section === "All" || section === "Songs") && (
      <section ref={trendingRef} style={{ padding: "48px 20px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
            <h2 style={{ fontFamily: ff, fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 700, margin: 0, color: "#2D2420" }}>
              {"\u{1F525}"} Trending This Week
            </h2>
            <span style={{ fontSize: "12px", color: COLORS.textMuted, fontFamily: fb }}>
              Updated weekly
            </span>
          </div>

          {lang === "All" ? (
            // Show all languages in sections
            Object.entries(songsByLang).map(([language, langSongs]) => (
              <div key={language} style={{ marginBottom: "36px" }}>
                <h3 style={{
                  fontFamily: ff, fontSize: "20px", fontWeight: 600, margin: "0 0 14px",
                  color: COLORS.primary, display: "flex", alignItems: "center", gap: "8px",
                }}>
                  {language}
                  <span style={{
                    fontSize: "11px", fontFamily: fb, fontWeight: 500,
                    padding: "2px 10px", borderRadius: "999px",
                    background: "#FDE8EF", color: COLORS.primary,
                  }}>Top 10</span>
                </h3>
                <SongList songs={langSongs} platform={platform} />
              </div>
            ))
          ) : (
            <SongList songs={filteredSongs} platform={platform} />
          )}
        </div>
      </section>
      )}

      {/* ═══ OUR PLAYLISTS ═══ */}
      {(section === "All" || section === "Playlists") && (
      <section ref={playlistsRef} style={{ padding: "48px 20px", background: "rgba(240,228,212,0.3)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: ff, fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 700, margin: "0 0 8px", color: "#2D2420" }}>
            {"\u{1F3A7}"} Our Playlists
          </h2>
          <p style={{ fontFamily: fb, fontSize: "14px", color: COLORS.textMuted, margin: "0 0 24px" }}>
            Curated by the platforms, picked by us. Hit play and vibe.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "14px",
          }}>
            {filteredPlaylists.map((p, i) => (
              <a
                key={p.id || i}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "20px", borderRadius: "16px",
                  background: "white", border: "1px solid #EDE6DE",
                  textDecoration: "none", color: "inherit",
                  transition: "all 0.25s", display: "flex", flexDirection: "column", gap: "10px",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {p.platform === "Spotify" ? SPOTIFY_ICON : APPLE_ICON}
                    <span style={{
                      fontSize: "10px", fontFamily: fb, fontWeight: 600,
                      padding: "2px 8px", borderRadius: "999px",
                      background: p.platform === "Spotify" ? "#E8F5E9" : "#FFF0F0",
                      color: p.platform === "Spotify" ? "#1DB954" : "#FC3C44",
                    }}>
                      {p.platform}
                    </span>
                  </div>
                  {p.language !== "All" && (
                    <span style={{
                      fontSize: "10px", fontFamily: fb, fontWeight: 600,
                      padding: "2px 8px", borderRadius: "999px",
                      background: `${SAFFRON}15`, color: SAFFRON,
                    }}>
                      {p.language}
                    </span>
                  )}
                </div>
                <h4 style={{ fontFamily: ff, fontSize: "16px", fontWeight: 600, margin: 0, color: "#2D2420", lineHeight: 1.3 }}>
                  {p.name}
                </h4>
                <p style={{ fontSize: "12px", color: COLORS.textMuted, margin: 0, lineHeight: 1.5 }}>
                  {p.description}
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                  <span style={{ fontSize: "11px", color: COLORS.textFaint }}>{p.song_count} songs</span>
                  <span style={{
                    fontSize: "12px", fontFamily: fb, fontWeight: 600,
                    color: p.platform === "Spotify" ? "#1DB954" : "#FC3C44",
                    display: "flex", alignItems: "center", gap: "4px",
                  }}>
                    Listen <ExternalLink size={10} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ═══ LIVE NEAR YOU ═══ */}
      {(section === "All" || section === "Live") && (
      <section ref={concertsRef} style={{ padding: "48px 20px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: ff, fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 700, margin: "0 0 8px", color: "#2D2420" }}>
            {"\u{1F3A4}"} Live Near You
          </h2>
          <p style={{ fontFamily: fb, fontSize: "14px", color: COLORS.textMuted, margin: "0 0 28px" }}>
            Concerts, comedy nights & desi events in Metro Detroit and the Midwest.
          </p>

          {/* Detroit events */}
          {detroitConcerts.length > 0 && (
            <div style={{ marginBottom: "32px" }}>
              <h3 style={{
                fontFamily: ff, fontSize: "18px", fontWeight: 600, margin: "0 0 14px",
                color: "#2D2420", display: "flex", alignItems: "center", gap: "8px",
              }}>
                <MapPin size={16} color={COLORS.primary} /> Metro Detroit
              </h3>
              <div style={{ display: "grid", gap: "12px" }}>
                {detroitConcerts.map(c => <ConcertCard key={c.id} concert={c} />)}
              </div>
            </div>
          )}

          {/* Midwest events */}
          {midwestConcerts.length > 0 && (
            <div>
              <h3 style={{
                fontFamily: ff, fontSize: "18px", fontWeight: 600, margin: "0 0 14px",
                color: "#2D2420", display: "flex", alignItems: "center", gap: "8px",
              }}>
                {"\u{1F697}"} Worth the Drive
              </h3>
              <div style={{ display: "grid", gap: "12px" }}>
                {midwestConcerts.map(c => <ConcertCard key={c.id} concert={c} />)}
              </div>
            </div>
          )}

          {concerts.length === 0 && (
            <div style={{ padding: "40px", textAlign: "center", background: "white", borderRadius: "16px", border: "1px solid #E0D8CF" }}>
              <p style={{ fontSize: "15px", color: "#8A7968", margin: 0 }}>No upcoming shows right now — check back soon!</p>
            </div>
          )}
        </div>
      </section>
      )}
    </div>
  );
}

// ═══ SONG LIST COMPONENT ═══

// Generate an Apple Music search URL for a specific song
function getAppleMusicUrl(song) {
  if (song.apple_music_url) return song.apple_music_url;
  const query = encodeURIComponent(`${song.title} ${song.artist.split(",")[0].trim()}`);
  return `https://music.apple.com/us/search?term=${query}`;
}

function SongList({ songs, platform }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      {songs.map((song, i) => {
        const spotifyUrl = song.spotify_url;
        const appleUrl = getAppleMusicUrl(song);
        const showSpotify = platform === "All" || platform === "Spotify";
        const showApple = platform === "All" || platform === "Apple Music";

        return (
        <div
          key={song.id || i}
          style={{
            display: "flex", alignItems: "center", gap: "14px",
            padding: "12px 16px", borderRadius: "12px",
            background: i % 2 === 0 ? "white" : "rgba(255,251,245,0.6)",
            border: "1px solid transparent",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.border = "1px solid #EDE6DE"; e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.04)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = i % 2 === 0 ? "white" : "rgba(255,251,245,0.6)"; e.currentTarget.style.border = "1px solid transparent"; e.currentTarget.style.boxShadow = "none"; }}
        >
          {/* Rank */}
          <span style={{
            fontFamily: ff, fontSize: "18px", fontWeight: 700,
            color: song.rank <= 3 ? SAFFRON : COLORS.textMuted,
            minWidth: "28px", textAlign: "center",
          }}>
            {song.rank}
          </span>

          {/* Song info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: fb, fontSize: "14px", fontWeight: 600, color: "#2D2420", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {song.title}
            </div>
            <div style={{ fontSize: "12px", color: COLORS.textMuted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {song.artist}
            </div>
          </div>

          {/* Album - visible on wider screens */}
          <div style={{
            fontSize: "11px", color: COLORS.textFaint, fontFamily: fb,
            maxWidth: "140px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            display: "none",
          }}
            className="song-album"
          >
            {song.album}
          </div>

          {/* Streaming links */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center", flexShrink: 0 }}>
            {showSpotify && spotifyUrl && (
              <a href={spotifyUrl} target="_blank" rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: "4px",
                  padding: platform === "Spotify" ? "4px 10px" : "4px",
                  borderRadius: "999px",
                  background: platform === "Spotify" ? "#E8F5E9" : "transparent",
                  opacity: 0.8, transition: "all 0.2s", textDecoration: "none",
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => e.currentTarget.style.opacity = 0.8}
                title="Play on Spotify"
              >
                {SPOTIFY_ICON}
                {platform === "Spotify" && (
                  <span style={{ fontSize: "11px", fontWeight: 600, color: "#1DB954", fontFamily: fb }}>Play</span>
                )}
              </a>
            )}
            {showApple && appleUrl && (
              <a href={appleUrl} target="_blank" rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: "4px",
                  padding: platform === "Apple Music" ? "4px 10px" : "4px",
                  borderRadius: "999px",
                  background: platform === "Apple Music" ? "#FFF0F0" : "transparent",
                  opacity: 0.8, transition: "all 0.2s", textDecoration: "none",
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => e.currentTarget.style.opacity = 0.8}
                title="Listen on Apple Music"
              >
                {APPLE_ICON}
                {platform === "Apple Music" && (
                  <span style={{ fontSize: "11px", fontWeight: 600, color: "#FC3C44", fontFamily: fb }}>Play</span>
                )}
              </a>
            )}
          </div>
        </div>
        );
      })}
    </div>
  );
}

// ═══ CONCERT CARD COMPONENT ═══
function ConcertCard({ concert }) {
  return (
    <a
      href={concert.ticket_url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex", gap: "16px", alignItems: "flex-start",
        padding: "18px 20px", borderRadius: "14px",
        background: "white", border: "1px solid #EDE6DE",
        borderLeft: `3px solid ${COLORS.primary}`,
        textDecoration: "none", color: "inherit",
        transition: "all 0.25s",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      {/* Date badge */}
      <div style={{
        flexShrink: 0, width: "56px", textAlign: "center",
        padding: "8px 4px", borderRadius: "10px",
        background: "linear-gradient(135deg, #FDE8EF, #FCE4EC)",
      }}>
        <div style={{ fontSize: "10px", fontWeight: 600, color: COLORS.primary, fontFamily: fb, textTransform: "uppercase" }}>
          {concert.event_date.split(" ")[0]}
        </div>
        <div style={{ fontSize: "20px", fontWeight: 700, color: COLORS.primary, fontFamily: ff, lineHeight: 1.1 }}>
          {concert.event_date.split(" ")[1]?.replace(",", "")}
        </div>
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h4 style={{ fontFamily: ff, fontSize: "15px", fontWeight: 600, margin: "0 0 4px", color: "#2D2420", lineHeight: 1.3 }}>
          {concert.name}
        </h4>
        {concert.artist && concert.artist !== concert.name && (
          <div style={{ fontSize: "13px", fontWeight: 600, color: SAFFRON, marginBottom: "4px" }}>
            {concert.artist}
          </div>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", fontSize: "12px", color: COLORS.textMuted }}>
          <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            <MapPin size={11} /> {concert.venue}, {concert.city}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            <Calendar size={11} /> {concert.event_date}
          </span>
        </div>
        {concert.description && (
          <p style={{ fontSize: "12px", color: COLORS.textFaint, margin: "6px 0 0", lineHeight: 1.4 }}>
            {concert.description}
          </p>
        )}
      </div>

      {/* Ticket button */}
      <div style={{
        flexShrink: 0, display: "flex", alignItems: "center", gap: "4px",
        padding: "6px 12px", borderRadius: "999px",
        background: `${COLORS.primary}10`, color: COLORS.primary,
        fontSize: "11px", fontWeight: 600, fontFamily: fb,
      }}>
        <Ticket size={12} /> Tickets
      </div>
    </a>
  );
}
