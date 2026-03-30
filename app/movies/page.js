"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, MapPin, Clock, Star, Play, X, Ticket } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

const ff = FONTS.heading;
const fb = FONTS.body;
const SAFFRON = "#E8A317";
const LANGUAGES = ["All", "Telugu", "Hindi", "Tamil", "Punjabi", "Malayalam", "Kannada", "Bengali", "English"];
const SECTIONS = [
  { id: "All", label: "All", icon: "\u{2728}" },
  { id: "now_playing", label: "Now Playing", icon: "\u{1F3AC}" },
  { id: "coming_soon", label: "Coming Soon", icon: "\u{1F4C5}" },
];

function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export default function MoviesPage() {
  const [lang, setLang] = useState("All");
  const [section, setSection] = useState("All");
  const [movies, setMovies] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailerYoutubeId, setTrailerYoutubeId] = useState(null);

  const moviesRef = useFadeIn();

  useEffect(() => {
    Promise.all([
      supabase.from("movies_catalog").select("*").order("release_date"),
      supabase.from("movie_news").select("*").order("published_date", { ascending: false }).limit(8),
    ]).then(([m, n]) => {
      setMovies(m.data || []);
      setNews(n.data || []);
      setLoading(false);
    });
  }, []);

  // Lock body when trailer modal is open
  useEffect(() => {
    if (trailerYoutubeId) { document.body.style.overflow = "hidden"; }
    else { document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [trailerYoutubeId]);

  const filtered = movies.filter(m => {
    const langMatch = lang === "All" || m.language === lang;
    const secMatch = section === "All" || m.status === section;
    return langMatch && secMatch;
  });

  const nowPlaying = filtered.filter(m => m.status === "now_playing");
  const comingSoon = filtered.filter(m => m.status === "coming_soon");

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFFBF5" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>{"\u{1F3AC}"}</div>
          <p style={{ fontFamily: ff, fontSize: "18px", color: COLORS.textMuted }}>Loading movies...</p>
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
        background: "linear-gradient(135deg, #1a0a0a 0%, #2d1117 40%, #4a1527 100%)",
        padding: "48px 20px 40px", textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        {/* Decorative film icons */}
        <div style={{ position: "absolute", top: "8%", left: "5%", fontSize: "44px", opacity: 0.06, transform: "rotate(-12deg)" }}>{"\u{1F3AC}"}</div>
        <div style={{ position: "absolute", top: "15%", right: "8%", fontSize: "50px", opacity: 0.05, transform: "rotate(15deg)" }}>{"\u{1F3A5}"}</div>
        <div style={{ position: "absolute", bottom: "20%", left: "10%", fontSize: "42px", opacity: 0.05, transform: "rotate(20deg)" }}>{"\u{1F37F}"}</div>
        <div style={{ position: "absolute", top: "40%", left: "3%", fontSize: "36px", opacity: 0.04, transform: "rotate(-25deg)" }}>{"\u{1F39E}\uFE0F"}</div>
        <div style={{ position: "absolute", top: "50%", right: "5%", fontSize: "46px", opacity: 0.05, transform: "rotate(10deg)" }}>{"\u{2B50}"}</div>
        <div style={{ position: "absolute", bottom: "10%", right: "15%", fontSize: "38px", opacity: 0.04, transform: "rotate(-8deg)" }}>{"\u{1F4FA}"}</div>
        <div style={{ position: "absolute", top: "10%", left: "35%", fontSize: "32px", opacity: 0.04, transform: "rotate(22deg)" }}>{"\u{1F3AC}"}</div>
        <div style={{ position: "absolute", bottom: "25%", left: "4%", fontSize: "40px", opacity: 0.04, transform: "rotate(18deg)" }}>{"\u{1F39F}\uFE0F"}</div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ fontFamily: ff, fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: "white", lineHeight: 1.1, margin: "0 0 8px" }}>
            Desi <span style={{ color: COLORS.primary, fontStyle: "italic" }}>Movies</span>
          </h1>
          <p style={{ fontFamily: ff, fontSize: "clamp(14px, 2vw, 18px)", fontWeight: 300, color: "rgba(255,255,255,0.6)", margin: "0 0 28px", fontStyle: "italic" }}>
            Now playing, coming soon & trailers — all in one place
          </p>

          {/* Language Filters */}
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
            {LANGUAGES.map(l => (
              <button key={l} onClick={() => setLang(l)} style={{
                padding: "8px 20px", borderRadius: "999px", fontSize: "13px",
                fontFamily: fb, fontWeight: 600, cursor: "pointer",
                border: lang === l ? `2px solid ${SAFFRON}` : "2px solid rgba(255,255,255,0.15)",
                background: lang === l ? SAFFRON : "rgba(255,255,255,0.08)",
                color: lang === l ? "#1a0a0a" : "rgba(255,255,255,0.7)",
                transition: "all 0.25s",
              }}>{l}</button>
            ))}
          </div>

          {/* Section Filters */}
          <div style={{ display: "flex", gap: "6px", justifyContent: "center", flexWrap: "wrap", marginTop: "14px" }}>
            {SECTIONS.map(s => (
              <button key={s.id} onClick={() => setSection(s.id)} style={{
                padding: "6px 16px", borderRadius: "999px", fontSize: "12px",
                fontFamily: fb, fontWeight: 600, cursor: "pointer",
                border: section === s.id ? `2px solid ${SAFFRON}` : "2px solid rgba(255,255,255,0.15)",
                background: section === s.id ? SAFFRON : "rgba(255,255,255,0.08)",
                color: section === s.id ? "#1a0a0a" : "rgba(255,255,255,0.6)",
                transition: "all 0.25s",
              }}>{s.icon} {s.label}</button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTENT + SIDEBAR LAYOUT ═══ */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 20px", display: "flex", gap: "32px", alignItems: "flex-start" }}>
        {/* ═══ MAIN CONTENT ═══ */}
        <div ref={moviesRef} style={{ flex: 1, minWidth: 0, padding: "48px 0" }}>

          {/* NOW PLAYING */}
          {(section === "All" || section === "now_playing") && nowPlaying.length > 0 && (
            <div style={{ marginBottom: "48px" }}>
              <h2 style={{ fontFamily: ff, fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 700, margin: "0 0 24px", color: "#2D2420" }}>
                {"\u{1F3AC}"} Now Playing
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
                {nowPlaying.map(m => (
                  <MovieCard key={m.id} movie={m} onTrailer={setTrailerYoutubeId} />
                ))}
              </div>
            </div>
          )}

          {/* COMING SOON */}
          {(section === "All" || section === "coming_soon") && comingSoon.length > 0 && (
            <div style={{ marginBottom: "48px" }}>
              <h2 style={{ fontFamily: ff, fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 700, margin: "0 0 24px", color: "#2D2420" }}>
                {"\u{1F4C5}"} Coming Soon
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
                {comingSoon.map(m => (
                  <MovieCard key={m.id} movie={m} onTrailer={setTrailerYoutubeId} />
                ))}
              </div>
            </div>
          )}

          {filtered.length === 0 && (
            <div style={{ padding: "60px 20px", textAlign: "center", background: "white", borderRadius: "16px", border: "1px solid #E0D8CF" }}>
              <p style={{ fontSize: "16px", color: "#8A7968", margin: 0, fontFamily: ff }}>No movies found for this filter — check back soon!</p>
            </div>
          )}
        </div>

        {/* ═══ NEWS SIDEBAR ═══ */}
        <aside style={{
          width: "320px", flexShrink: 0, position: "sticky", top: "70px", alignSelf: "flex-start",
          paddingTop: "48px", paddingBottom: "48px",
          maxHeight: "calc(100vh - 70px)", display: "flex", flexDirection: "column",
        }}>
          <div style={{
            background: "white", borderRadius: "16px", border: "1px solid #EDE6DE",
            overflow: "hidden", display: "flex", flexDirection: "column",
            maxHeight: "calc(100vh - 140px)",
          }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid #EDE6DE", background: "#2D2420", flexShrink: 0 }}>
              <h3 style={{ fontFamily: ff, fontSize: "15px", fontWeight: 700, margin: 0, color: "white", display: "flex", alignItems: "center", gap: "8px" }}>
                {"\u{1F4F0}"} Movie News
              </h3>
            </div>
            <div style={{ overflowY: "auto", scrollbarWidth: "thin" }}>
              {news.length > 0 ? news.map((item, i) => {
                const daysAgo = Math.floor((Date.now() - new Date(item.published_date + "T00:00:00").getTime()) / 86400000);
                const timeLabel = daysAgo === 0 ? "Today" : daysAgo === 1 ? "Yesterday" : `${daysAgo}d ago`;
                const hue = item.source.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
                return (
                  <a key={item.id || i} href={item.url} target="_blank" rel="noopener noreferrer" style={{
                    display: "flex", gap: "12px", padding: "14px 16px",
                    borderBottom: i < news.length - 1 ? "1px solid #F5F0EA" : "none",
                    textDecoration: "none", color: "inherit", transition: "background 0.2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = "#FFFBF5"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <div style={{
                      width: "64px", height: "64px", borderRadius: "10px", overflow: "hidden", flexShrink: 0,
                      background: item.image_url ? "#EDE6DE" : `hsl(${hue}, 30%, 90%)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {item.image_url ? (
                        <img src={item.image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <span style={{ fontSize: "20px", fontWeight: 700, fontFamily: ff, color: `hsl(${hue}, 40%, 50%)` }}>{item.source.charAt(0)}</span>
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: fb, fontSize: "12.5px", fontWeight: 600, color: "#2D2420", margin: "0 0 6px", lineHeight: 1.35, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {item.headline}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "10px", color: COLORS.textFaint }}>
                        <span style={{ fontWeight: 600, color: COLORS.primary }}>{item.source}</span>
                        <span>{"\u00B7"}</span>
                        <span>{timeLabel}</span>
                      </div>
                    </div>
                  </a>
                );
              }) : (
                <p style={{ padding: "20px 18px", fontSize: "13px", color: COLORS.textMuted, margin: 0 }}>No movie news yet — check back soon!</p>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* Hide sidebar on mobile, show news below */}
      <style>{`
        @media (max-width: 900px) {
          aside { display: none !important; }
        }
      `}</style>
      <div className="mobile-movie-news" style={{ padding: "0 20px 48px" }}>
        <style>{`@media (min-width: 901px) { .mobile-movie-news { display: none !important; } }`}</style>
        <div style={{ background: "white", borderRadius: "16px", border: "1px solid #EDE6DE", overflow: "hidden", maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid #EDE6DE", background: "#2D2420" }}>
            <h3 style={{ fontFamily: ff, fontSize: "15px", fontWeight: 700, margin: 0, color: "white" }}>{"\u{1F4F0}"} Movie News</h3>
          </div>
          <div>
            {news.slice(0, 5).map((item, i) => {
              const daysAgo = Math.floor((Date.now() - new Date(item.published_date + "T00:00:00").getTime()) / 86400000);
              const timeLabel = daysAgo === 0 ? "Today" : daysAgo === 1 ? "Yesterday" : `${daysAgo}d ago`;
              return (
                <a key={`mob-${item.id || i}`} href={item.url} target="_blank" rel="noopener noreferrer" style={{
                  display: "flex", gap: "12px", padding: "14px 16px",
                  borderBottom: i < 4 ? "1px solid #F5F0EA" : "none",
                  textDecoration: "none", color: "inherit",
                }}>
                  {item.image_url && <img src={item.image_url} alt="" style={{ width: "56px", height: "56px", borderRadius: "10px", objectFit: "cover", flexShrink: 0 }} />}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: fb, fontSize: "13px", fontWeight: 600, color: "#2D2420", margin: "0 0 4px", lineHeight: 1.35 }}>{item.headline}</p>
                    <div style={{ fontSize: "10px", color: COLORS.textFaint }}><span style={{ fontWeight: 600, color: COLORS.primary }}>{item.source}</span> {"\u00B7"} {timeLabel}</div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══ YOUTUBE TRAILER MODAL ═══ */}
      {trailerYoutubeId && (
        <div
          onClick={() => setTrailerYoutubeId(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "20px",
          }}
        >
          <div onClick={e => e.stopPropagation()} style={{
            width: "min(900px, 95vw)", position: "relative",
          }}>
            <button onClick={() => setTrailerYoutubeId(null)} style={{
              position: "absolute", top: "-40px", right: "0",
              background: "none", border: "none", color: "white",
              fontSize: "28px", cursor: "pointer", padding: "4px 8px",
            }}>{"\u2715"}</button>
            <div style={{
              position: "relative", paddingBottom: "56.25%", height: 0,
              borderRadius: "12px", overflow: "hidden",
            }}>
              <iframe
                src={`https://www.youtube.com/embed/${trailerYoutubeId}?autoplay=1&rel=0`}
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                title="Movie Trailer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══ MOVIE CARD COMPONENT ═══
function MovieCard({ movie, onTrailer }) {
  return (
    <div style={{
      borderRadius: "16px", overflow: "hidden",
      background: "white", border: "1px solid #EDE6DE",
      transition: "all 0.25s", display: "flex", flexDirection: "column",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      {/* Poster with play button overlay */}
      <div style={{ position: "relative", height: "200px", background: "#2D2420", overflow: "hidden" }}>
        {movie.poster_url ? (
          <img src={movie.poster_url} alt={movie.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px" }}>{"\u{1F3AC}"}</div>
        )}
        {/* Play trailer overlay */}
        {movie.trailer_youtube_id && (
          <button
            onClick={() => onTrailer(movie.trailer_youtube_id)}
            style={{
              position: "absolute", inset: 0,
              background: "rgba(0,0,0,0.3)", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: 0, transition: "opacity 0.25s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = 1}
            onMouseLeave={e => e.currentTarget.style.opacity = 0}
          >
            <div style={{
              width: "56px", height: "56px", borderRadius: "50%",
              background: "rgba(255,255,255,0.95)", display: "flex",
              alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}>
              <Play size={24} fill={COLORS.primary} color={COLORS.primary} style={{ marginLeft: "3px" }} />
            </div>
          </button>
        )}
        {/* Status badge */}
        <div style={{
          position: "absolute", top: "12px", left: "12px",
          padding: "4px 10px", borderRadius: "999px", fontSize: "10px",
          fontWeight: 700, fontFamily: fb, letterSpacing: "0.5px",
          background: movie.status === "now_playing" ? "#E8F5E9" : "#FFF3E0",
          color: movie.status === "now_playing" ? "#2E7D32" : "#E65100",
        }}>
          {movie.status === "now_playing" ? "NOW PLAYING" : "COMING SOON"}
        </div>
        {/* Language badge */}
        <div style={{
          position: "absolute", top: "12px", right: "12px",
          padding: "4px 10px", borderRadius: "999px", fontSize: "10px",
          fontWeight: 700, fontFamily: fb,
          background: "rgba(0,0,0,0.6)", color: "white",
        }}>
          {movie.language}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "18px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontFamily: ff, fontSize: "18px", fontWeight: 700, margin: "0 0 8px", color: "#2D2420", lineHeight: 1.3 }}>
          {movie.title}
        </h3>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "10px", fontSize: "11px", color: COLORS.textMuted }}>
          {movie.genre && <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>{movie.genre}</span>}
          {movie.runtime && <span style={{ display: "flex", alignItems: "center", gap: "3px" }}><Clock size={10} /> {movie.runtime}</span>}
          {movie.rating && <span style={{ display: "flex", alignItems: "center", gap: "3px" }}><Star size={10} fill={SAFFRON} color={SAFFRON} /> {movie.rating}</span>}
        </div>

        {movie.synopsis && (
          <p style={{
            fontSize: "12px", color: COLORS.textMuted, margin: "0 0 14px", lineHeight: 1.5,
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>
            {movie.synopsis}
          </p>
        )}

        {movie.release_date && (
          <div style={{ fontSize: "11px", color: COLORS.textFaint, marginBottom: "14px" }}>
            Release: {movie.release_date}
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
          {movie.fandango_url && (
            <a href={movie.fandango_url} target="_blank" rel="noopener noreferrer" style={{
              flex: 1, padding: "10px 14px", borderRadius: "10px",
              background: COLORS.primary, color: "white",
              fontSize: "12px", fontWeight: 700, fontFamily: fb,
              textDecoration: "none", textAlign: "center",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
              transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = 0.9}
              onMouseLeave={e => e.currentTarget.style.opacity = 1}
            >
              <Ticket size={13} /> Get Tickets
            </a>
          )}
          {movie.trailer_youtube_id && (
            <button onClick={() => onTrailer(movie.trailer_youtube_id)} style={{
              flex: 1, padding: "10px 14px", borderRadius: "10px",
              background: "#2D2420", color: "white",
              fontSize: "12px", fontWeight: 700, fontFamily: fb,
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
              transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = 0.9}
              onMouseLeave={e => e.currentTarget.style.opacity = 1}
            >
              <Play size={13} /> Trailer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
