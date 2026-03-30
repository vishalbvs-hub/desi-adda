"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, ArrowRight, MapPin, Star, Clock, Calendar, Play, Ticket, ExternalLink, Film, Music } from "lucide-react";
import { FONTS, COLORS, CLASSIFIEDS_CATEGORIES } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

const ff = FONTS.heading;
const fb = FONTS.body;
const SAFFRON = "#E8A317";

const PLATFORM_COLORS = {
  "Netflix": { bg: "#FDECEA", color: "#E50914", label: "Netflix" },
  "Prime Video": { bg: "#E3F2FD", color: "#00A8E1", label: "Prime" },
  "Hotstar": { bg: "#FFF8E1", color: "#1A73E8", label: "Hotstar" },
  "Zee5": { bg: "#F3E5F5", color: "#8E24AA", label: "Zee5" },
};

function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    el.style.opacity = "0"; el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return ref;
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [classifieds, setClassifieds] = useState([]);
  const [ottMovies, setOttMovies] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);

  useEffect(() => {
    Promise.all([
      supabase.from("events").select("*").eq("status", "approved").order("event_date").limit(4),
      supabase.from("restaurants").select("id, name, city, rating, reviews, description").order("rating", { ascending: false }).limit(6),
      supabase.from("classifieds").select("*").eq("status", "approved").order("created_at", { ascending: false }).limit(4),
      supabase.from("movies_catalog").select("*").eq("status", "ott").order("release_date", { ascending: false }).limit(6),
      supabase.from("movies_catalog").select("*").eq("status", "now_playing").order("release_date", { ascending: false }).limit(4),
    ]).then(([ev, biz, cl, ott, np]) => {
      setEvents(ev.data || []);
      setBusinesses(biz.data || []);
      setClassifieds(cl.data || []);
      setOttMovies(ott.data || []);
      setNowPlaying(np.data || []);
    });
  }, []);

  const triggerChat = (q) => { window.dispatchEvent(new CustomEvent("askadda", { detail: q })); };
  const handleSearch = (e) => { if (e) e.preventDefault(); if (searchQuery.trim()) { triggerChat(searchQuery); setSearchQuery(""); } };

  const formatDate = (d) => {
    if (!d) return "";
    const date = new Date(d + "T00:00:00");
    return isNaN(date.getTime()) ? d : date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const featuredRef = useFadeIn();
  const ottRef = useFadeIn();
  const eventsRef = useFadeIn();
  const classifiedsRef = useFadeIn();
  const nowPlayingRef = useFadeIn();

  return (
    <div style={{ background: "#FFFBF5" }}>
      {/* ═══ HERO — tight, purposeful ═══ */}
      <section style={{
        minHeight: "clamp(320px, 38vh, 400px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        backgroundImage: "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.65)), url('/hero.jpg')",
        backgroundSize: "cover", backgroundPosition: "center 80%",
        padding: "32px 20px 28px", textAlign: "center",
      }}>
        <div style={{ maxWidth: "620px", margin: "0 auto" }}>
          <h1 style={{ fontFamily: fb, fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 700, color: "white", lineHeight: 1.2, margin: "0 0 6px" }}>
            Your desi life in <span style={{ fontFamily: ff, fontStyle: "italic", color: COLORS.primary }}>Detroit</span>
          </h1>
          <p style={{ fontFamily: ff, fontSize: "clamp(14px, 2vw, 18px)", fontWeight: 300, color: "rgba(255,255,255,0.7)", margin: "0 0 20px", fontStyle: "italic" }}>
            the gathering place for desi life in America.
          </p>

          <form onSubmit={handleSearch} style={{ maxWidth: "520px", margin: "0 auto", position: "relative" }}>
            <Search size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#A89888" }} />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="Ask me anything... best biryani? Telugu dentist?"
              style={{ width: "100%", padding: "14px 150px 14px 44px", borderRadius: "14px", border: "none", fontSize: "15px", fontFamily: fb, background: "white", boxShadow: "0 6px 24px rgba(0,0,0,0.2)", boxSizing: "border-box", outline: "none" }} />
            <button type="submit" style={{ position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)", background: COLORS.primary, color: "white", border: "none", borderRadius: "10px", padding: "10px 20px", fontFamily: fb, fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>Ask Adda {"\u2728"}</button>
          </form>

          <p style={{ marginTop: "14px", fontSize: "13px", color: "rgba(255,255,255,0.5)", fontFamily: fb, fontWeight: 500 }}>
            455+ Businesses {"\u00B7"} 18 Cities {"\u00B7"} Powered by AI
          </p>
        </div>
      </section>

      {/* ═══ CONTENT FEED ═══ */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 20px" }}>

        {/* ═══ FEATURED BUSINESSES ═══ */}
        <section ref={featuredRef} style={{ padding: "36px 0 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ fontFamily: ff, fontSize: "22px", fontWeight: 700, margin: 0, color: "#2D2420" }}>Featured Businesses</h2>
            <Link href="/businesses" style={{ fontSize: "13px", fontFamily: fb, fontWeight: 600, color: COLORS.primary, textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>View all <ArrowRight size={14} /></Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px" }}>
            {businesses.slice(0, 6).map(biz => (
              <Link key={biz.id} href={`/businesses?cat=food`} style={{ background: "white", borderRadius: "14px", padding: "18px 20px", border: "1px solid #EDE6DE", textDecoration: "none", color: "inherit", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <h3 style={{ fontFamily: ff, fontSize: "15px", fontWeight: 700, margin: "0 0 4px", color: "#2D2420" }}>{biz.name}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#8A7968", marginBottom: "6px" }}>
                  {biz.city && <span style={{ display: "flex", alignItems: "center", gap: "3px" }}><MapPin size={11} /> {biz.city}</span>}
                  {biz.rating && <span style={{ display: "flex", alignItems: "center", gap: "3px" }}><Star size={11} fill={SAFFRON} color={SAFFRON} /> {biz.rating}</span>}
                  {biz.reviews && <span>({biz.reviews})</span>}
                </div>
                {biz.description && <p style={{ fontSize: "12px", color: "#6B5B4F", margin: 0, lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{biz.description}</p>}
              </Link>
            ))}
          </div>
        </section>

        {/* ═══ UPCOMING EVENTS ═══ */}
        {events.length > 0 && (
          <section ref={eventsRef} style={{ padding: "24px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h2 style={{ fontFamily: ff, fontSize: "22px", fontWeight: 700, margin: 0, color: "#2D2420" }}>Upcoming Events</h2>
              <Link href="/community?tab=events" style={{ fontSize: "13px", fontFamily: fb, fontWeight: 600, color: COLORS.primary, textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>All events <ArrowRight size={14} /></Link>
            </div>
            <div style={{ display: "grid", gap: "12px" }}>
              {events.map(ev => (
                <div key={ev.id} style={{ display: "flex", gap: "14px", background: "white", borderRadius: "14px", padding: "16px 20px", border: "1px solid #EDE6DE", alignItems: "center", transition: "box-shadow 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.05)"}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                  <div style={{ padding: "10px 14px", borderRadius: "10px", background: "#FFF3E0", fontFamily: ff, fontSize: "14px", fontWeight: 700, color: SAFFRON, textAlign: "center", lineHeight: 1.2, flexShrink: 0 }}>{formatDate(ev.event_date)}</div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontFamily: ff, fontSize: "15px", fontWeight: 700, margin: "0 0 3px", color: "#2D2420" }}>{ev.name}</h4>
                    <div style={{ fontSize: "12px", color: "#8A7968", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {ev.event_type && <span style={{ padding: "2px 8px", borderRadius: "999px", fontSize: "10px", fontWeight: 600, background: `rgba(232,163,23,0.1)`, color: SAFFRON }}>{ev.event_type}</span>}
                      {ev.venue && <span style={{ display: "flex", alignItems: "center", gap: "3px" }}><MapPin size={11} /> {ev.venue}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ═══ LATEST CLASSIFIEDS ═══ */}
        {classifieds.length > 0 && (
          <section ref={classifiedsRef} style={{ padding: "24px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h2 style={{ fontFamily: ff, fontSize: "22px", fontWeight: 700, margin: 0, color: "#2D2420" }}>Latest Classifieds</h2>
              <Link href="/classifieds" style={{ fontSize: "13px", fontFamily: fb, fontWeight: 600, color: COLORS.primary, textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>View all <ArrowRight size={14} /></Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
              {classifieds.map(post => {
                const catInfo = CLASSIFIEDS_CATEGORIES.find(c => c.id === post.cat);
                return (
                  <Link key={post.id} href="/classifieds" style={{ background: "white", borderRadius: "14px", padding: "16px 20px", border: "1px solid #EDE6DE", textDecoration: "none", color: "inherit", transition: "box-shadow 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.05)"}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                      <span style={{ padding: "3px 8px", borderRadius: "999px", fontSize: "10px", fontWeight: 600, background: "#F5EDE4", color: "#8A7968" }}>{catInfo ? `${catInfo.emoji} ${catInfo.label}` : post.cat}</span>
                      {post.city && <span style={{ fontSize: "10px", color: "#A89888" }}>{post.city}</span>}
                    </div>
                    <h4 style={{ fontFamily: ff, fontSize: "14px", fontWeight: 700, margin: "0 0 4px", color: "#2D2420" }}>{post.title}</h4>
                    <p style={{ fontSize: "12px", color: "#6B5B4F", margin: 0, lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{post.body?.substring(0, 120)}</p>
                    {post.budget && <p style={{ fontSize: "12px", fontWeight: 600, color: COLORS.primary, margin: "6px 0 0" }}>{post.budget}</p>}
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* ═══ NOW IN THEATERS ═══ */}
        {nowPlaying.length > 0 && (
          <section ref={nowPlayingRef} style={{ padding: "24px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h2 style={{ fontFamily: ff, fontSize: "22px", fontWeight: 700, margin: 0, color: "#2D2420" }}>Now in Theaters</h2>
              <Link href="/entertainment?tab=movies" style={{ fontSize: "13px", fontFamily: fb, fontWeight: 600, color: COLORS.primary, textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>All movies <ArrowRight size={14} /></Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "14px" }}>
              {nowPlaying.map(m => (
                <div key={m.id} style={{ borderRadius: "14px", overflow: "hidden", background: "white", border: "1px solid #EDE6DE", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.06)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ height: "120px", background: "#2D2420", overflow: "hidden" }}>
                    {m.poster_url ? <img src={m.poster_url} alt={m.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px" }}>{"\u{1F3AC}"}</div>}
                  </div>
                  <div style={{ padding: "12px 14px" }}>
                    <h4 style={{ fontFamily: ff, fontSize: "14px", fontWeight: 700, margin: "0 0 4px", color: "#2D2420", lineHeight: 1.3 }}>{m.title}</h4>
                    <div style={{ display: "flex", gap: "6px", fontSize: "10px", color: "#8A7968" }}>
                      <span style={{ padding: "2px 6px", borderRadius: "999px", background: "rgba(0,0,0,0.06)", fontWeight: 600 }}>{m.language}</span>
                      {m.imdb_rating && <span style={{ display: "flex", alignItems: "center", gap: "2px" }}><Star size={9} fill={SAFFRON} color={SAFFRON} /> {m.imdb_rating}</span>}
                    </div>
                    {m.fandango_url && <a href={m.fandango_url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "3px", fontSize: "11px", fontWeight: 600, color: COLORS.primary, marginTop: "8px", textDecoration: "none" }}><Ticket size={11} /> Get Tickets</a>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ═══ NEW ON STREAMING ═══ */}
        {ottMovies.length > 0 && (
          <section ref={ottRef} style={{ padding: "24px 0 36px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h2 style={{ fontFamily: ff, fontSize: "22px", fontWeight: 700, margin: 0, color: "#2D2420" }}>New on Streaming</h2>
              <Link href="/entertainment?tab=movies" style={{ fontSize: "13px", fontFamily: fb, fontWeight: 600, color: COLORS.primary, textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>All OTT <ArrowRight size={14} /></Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px" }}>
              {ottMovies.slice(0, 6).map(m => {
                const plat = PLATFORM_COLORS[m.platform] || { bg: "#F5F5F5", color: "#666", label: m.platform };
                return (
                  <div key={m.id} style={{ display: "flex", gap: "14px", background: "white", borderRadius: "14px", padding: "16px", border: "1px solid #EDE6DE", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.06)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                    <div style={{ width: "60px", height: "80px", borderRadius: "8px", overflow: "hidden", flexShrink: 0, background: "#2D2420" }}>
                      {m.poster_url ? <img src={m.poster_url} alt={m.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>{"\u{1F3AC}"}</div>}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{ fontFamily: ff, fontSize: "14px", fontWeight: 700, margin: "0 0 4px", color: "#2D2420", lineHeight: 1.3 }}>{m.title}</h4>
                      <div style={{ display: "flex", gap: "6px", marginBottom: "4px", flexWrap: "wrap" }}>
                        <span style={{ padding: "2px 8px", borderRadius: "999px", fontSize: "10px", fontWeight: 700, background: plat.bg, color: plat.color }}>{plat.label}</span>
                        <span style={{ padding: "2px 6px", borderRadius: "999px", fontSize: "10px", background: "rgba(0,0,0,0.06)", fontWeight: 600, color: "#8A7968" }}>{m.language}</span>
                        {m.imdb_rating && <span style={{ fontSize: "10px", display: "flex", alignItems: "center", gap: "2px", color: "#8A7968" }}><Star size={9} fill={SAFFRON} color={SAFFRON} /> {m.imdb_rating}</span>}
                      </div>
                      {m.watch_url && <a href={m.watch_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "11px", fontWeight: 600, color: plat.color, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "3px" }}><Play size={10} /> Watch Now</a>}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
