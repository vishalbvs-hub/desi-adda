"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, ArrowRight, MapPin, Star, Clock, Calendar, Play, Ticket, ExternalLink, Film, Music } from "lucide-react";
import { FONTS, COLORS, CLASSIFIEDS_CATEGORIES } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import ScrollingChips from "@/components/ScrollingChips";

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
    const today = new Date().toISOString().split("T")[0];
    Promise.all([
      supabase.from("temple_events").select("*, temples(name, slug)").gte("event_date", today).order("event_date").limit(10),
      supabase.from("community_events").select("*, community_networking(name, slug)").gte("event_date", today).order("event_date").limit(10),
      supabase.from("restaurants").select("id, name, city, rating, reviews, description, photos, slug, notable_dishes, what_to_order").not("photos", "eq", "{}").gte("rating", 4.0).gte("reviews", 10).order("reviews", { ascending: false }).limit(20),
      supabase.from("classifieds").select("*").eq("status", "approved").order("created_at", { ascending: false }).limit(4),
      supabase.from("movies_catalog").select("*").eq("status", "ott").order("release_date", { ascending: false }).limit(6),
      supabase.from("movies_catalog").select("*").eq("status", "now_playing").order("release_date", { ascending: false }).limit(4),
    ]).then(([te, ce, biz, cl, ott, np]) => {
      // Build unified events feed
      const unified = [];
      (te.data || []).forEach(e => unified.push({ ...e, _type: "temple", _hostName: e.temples?.name, _hostSlug: e.temples?.slug ? `/temples/${e.temples.slug}` : null }));
      (ce.data || []).forEach(e => unified.push({ ...e, _type: "community", _hostName: e.community_networking?.name, _hostSlug: e.community_networking?.slug ? `/community/${e.community_networking.slug}` : null }));
      unified.sort((a, b) => a.event_date.localeCompare(b.event_date));
      setEvents(unified.slice(0, 5));
      // Sort by weighted rating and filter to only good data
      const sorted = (biz.data || [])
        .filter(b => b.photos?.length > 0 && b.rating >= 4.0 && b.reviews >= 10 && b.description)
        .sort((a, b) => ((b.rating || 0) * Math.log((b.reviews || 0) + 2)) - ((a.rating || 0) * Math.log((a.reviews || 0) + 2)));
      setBusinesses(sorted);
      setClassifieds(cl.data || []);
      setOttMovies(ott.data || []);
      setNowPlaying(np.data || []);
    });
  }, []);

  const triggerChat = (q) => { window.dispatchEvent(new CustomEvent("askadda", { detail: q })); };
  const handleSearch = (e) => { if (e) e.preventDefault(); if (searchQuery.trim()) { triggerChat(searchQuery); setSearchQuery(""); } };



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

          <div style={{ maxWidth: "580px", margin: "14px auto 0" }}>
            <ScrollingChips
              chips={[
                { emoji: "\u{1F35B}", text: "best biryani in Troy" },
                { emoji: "\u{1FA7A}", text: "Telugu doctor near me" },
                { emoji: "\u{1F6D5}", text: "temples in Novi" },
                { emoji: "\u{1F958}", text: "Indian grocery stores Canton" },
                { emoji: "\u{1F490}", text: "mehndi artist for wedding" },
                { emoji: "\u{1F3E0}", text: "roommates in Farmington Hills" },
                { emoji: "\u{1F4BC}", text: "immigration lawyer H1B" },
                { emoji: "\u{1F3AC}", text: "Telugu movies near me" },
                { emoji: "\u{1F9D1}\u200D\u{2695}\uFE0F", text: "Indian dentist Southfield" },
                { emoji: "\u{1F389}", text: "desi events this weekend" },
              ]}
              onChipClick={(chip) => triggerChat(`${chip.emoji} ${chip.text}`)}
              variant="light"
              noPause
            />
          </div>

          <p style={{ marginTop: "14px", fontSize: "13px", color: "rgba(255,255,255,0.5)", fontFamily: fb, fontWeight: 500 }}>
            1,300+ Businesses {"\u00B7"} 125+ Cities {"\u00B7"} Powered by AI
          </p>
        </div>
      </section>

      {/* ═══ CONTENT FEED ═══ */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 20px" }}>

        {/* ═══ FEATURED BUSINESSES ═══ */}
        <section ref={featuredRef} style={{ padding: "36px 0 24px" }}>
          {/* ── BUSINESS SPOTLIGHT — Eco Dosth ── */}
          <Link href="/spotlight/eco-dosth" style={{ textDecoration: "none", color: "inherit", display: "block", marginBottom: "24px" }}>
            <div style={{
              background: "#2C3527", borderRadius: "20px", overflow: "hidden",
              transition: "all 0.25s", position: "relative",
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(44,53,39,0.3)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                {/* Circular plate image side */}
                <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center", padding: "28px" }}>
                  <img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=480,h=497,fit=crop/AwvDoRQlrZsGy017/clipped_image_20240122_103955-YbNqppxb4kt5nXkW.png" alt="Eco Dosth sal leaf plate"
                    style={{ width: "clamp(120px, 20vw, 160px)", height: "clamp(120px, 20vw, 160px)", borderRadius: "50%", objectFit: "cover", border: "2px solid #C4A35A", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }} />
                </div>
                {/* Content side */}
                <div style={{ flex: "1 1 320px", padding: "28px 28px" }}>
                  <span style={{
                    display: "inline-block", padding: "4px 14px", borderRadius: "999px",
                    border: "1px solid #C4A35A50", background: "#C4A35A10",
                    color: "#C4A35A", fontSize: "10px", fontWeight: 700, fontFamily: fb,
                    letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "14px",
                  }}>
                    {"\u2728"} This Week&apos;s Spotlight
                  </span>
                  <h3 style={{ fontFamily: ff, fontSize: "clamp(20px, 3.5vw, 26px)", fontWeight: 700, margin: "0 0 10px", color: "#F4F1E8", lineHeight: 1.25 }}>
                    The plate that disappears.
                  </h3>
                  <p style={{ fontSize: "14px", color: "#A8A393", margin: "0 0 8px", lineHeight: 1.5 }}>
                    How one Troy entrepreneur is replacing plastic with an ancient tradition — one sal leaf at a time.
                  </p>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "14px" }}>
                    {["100% compostable", "zero plastic"].map(t => (
                      <span key={t} style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "10px", fontFamily: fb, fontWeight: 500, color: "#C4A35A", border: "1px solid #C4A35A30" }}>{t}</span>
                    ))}
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#C4A35A" }}>Read the full story {"\u2192"}</span>
                </div>
              </div>
            </div>
          </Link>

          {/* ── TRENDING BUSINESSES ── */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ fontFamily: ff, fontSize: "22px", fontWeight: 700, margin: 0, color: "#2D2420" }}>Trending Businesses</h2>
            <Link href="/businesses" style={{ fontSize: "13px", fontFamily: fb, fontWeight: 600, color: COLORS.primary, textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>View all <ArrowRight size={14} /></Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "14px" }}>
            {businesses.slice(1, 7).map(biz => (
              <Link key={biz.id} href={biz.slug ? `/restaurants/${biz.slug}` : "/businesses?cat=food"} style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{
                  background: "white", borderRadius: "16px", overflow: "hidden",
                  border: "1px solid #EDE6DE", transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "scale(1.015)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "scale(1)"; }}
                >
                  {biz.photos?.[0] && (
                    <div style={{ width: "100%", height: "160px", overflow: "hidden" }}>
                      <img src={biz.photos[0]} alt={biz.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  )}
                  <div style={{ padding: "14px 18px" }}>
                    <h3 style={{ fontFamily: ff, fontSize: "15px", fontWeight: 700, margin: "0 0 4px", color: "#2D2420", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{biz.name}</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#8A7968", marginBottom: "4px" }}>
                      {biz.city && <span style={{ display: "flex", alignItems: "center", gap: "3px" }}><MapPin size={11} /> {biz.city}</span>}
                      {biz.rating && <span style={{ display: "flex", alignItems: "center", gap: "3px" }}><Star size={11} fill={SAFFRON} color={SAFFRON} /> {biz.rating} ({biz.reviews?.toLocaleString()})</span>}
                    </div>
                    {(biz.notable_dishes || biz.description) && (
                      <p style={{ fontSize: "12px", color: "#6B5B4F", margin: 0, lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {biz.notable_dishes || biz.description}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <p style={{ fontSize: "11px", color: "#A89888", textAlign: "center", marginTop: "12px" }}>
            <Link href="/suggest" style={{ color: COLORS.primary, textDecoration: "none" }}>Want your business featured? Contact us</Link>
          </p>
        </section>

        {/* ═══ UPCOMING EVENTS ═══ */}
        {events.length > 0 && (
          <section ref={eventsRef} style={{ padding: "24px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h2 style={{ fontFamily: ff, fontSize: "22px", fontWeight: 700, margin: 0, color: "#2D2420" }}>Upcoming Events</h2>
              <Link href="/community?tab=events" style={{ fontSize: "13px", fontFamily: fb, fontWeight: 600, color: COLORS.primary, textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>All events <ArrowRight size={14} /></Link>
            </div>
            <div style={{ display: "grid", gap: "10px" }}>
              {events.map((ev, i) => {
                const d = new Date(ev.event_date + "T00:00:00");
                const monthStr = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
                const dayNum = d.getDate();
                const isTemple = ev._type === "temple";
                const badgeColor = isTemple ? "#BF360C" : "#6A1B9A";
                return (
                  <div key={`${ev._type}-${ev.id}-${i}`} style={{
                    display: "flex", gap: "14px", background: "white", borderRadius: "14px",
                    padding: "14px 18px", border: "1px solid #EDE6DE", alignItems: "center",
                    transition: "border-color 0.2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = `${SAFFRON}60`}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "#EDE6DE"}
                  >
                    <div style={{ width: "48px", textAlign: "center", flexShrink: 0, padding: "6px 4px", borderRadius: "10px", background: "#FFF3E0" }}>
                      <div style={{ fontSize: "10px", fontWeight: 700, color: "#BF360C", fontFamily: fb, textTransform: "uppercase" }}>{monthStr}</div>
                      <div style={{ fontSize: "20px", fontWeight: 700, color: "#2D2420", fontFamily: ff, lineHeight: 1.1 }}>{dayNum}</div>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", gap: "6px", alignItems: "center", marginBottom: "2px" }}>
                        <span style={{ padding: "1px 6px", borderRadius: "999px", fontSize: "9px", fontWeight: 700, background: `${badgeColor}12`, color: badgeColor }}>{isTemple ? "Temple" : "Community"}</span>
                      </div>
                      <h4 style={{ fontFamily: ff, fontSize: "15px", fontWeight: 700, margin: "0 0 2px", color: "#2D2420" }}>{ev.event_name}</h4>
                      {ev._hostName && (
                        <div style={{ fontSize: "12px", color: "#8A7968" }}>
                          Hosted by {ev._hostSlug ? <Link href={ev._hostSlug} style={{ color: COLORS.primary, textDecoration: "none", fontWeight: 600 }}>{ev._hostName}</Link> : ev._hostName}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
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
