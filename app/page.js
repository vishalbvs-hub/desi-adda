"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, ArrowRight, MapPin, Star } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import ScrollingChips from "@/components/ScrollingChips";

const ff = FONTS.heading;
const fb = FONTS.body;
const SAFFRON = "#E8A317";

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

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    Promise.all([
      supabase.from("temple_events").select("*, temples(name, slug)").gte("event_date", today).order("event_date").limit(10),
      supabase.from("community_events").select("*, community_networking(name, slug)").gte("event_date", today).order("event_date").limit(10),
      supabase.from("restaurants").select("id, name, city, rating, reviews, description, photos, slug, notable_dishes, what_to_order").not("photos", "eq", "{}").gte("rating", 4.0).gte("reviews", 10).order("reviews", { ascending: false }).limit(20),
    ]).then(([te, ce, biz]) => {
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
    });
  }, []);

  const triggerChat = (q) => { window.dispatchEvent(new CustomEvent("askadda", { detail: q })); };
  const handleSearch = (e) => { if (e) e.preventDefault(); if (searchQuery.trim()) { triggerChat(searchQuery); setSearchQuery(""); } };



  const featuredRef = useFadeIn();
  const eventsRef = useFadeIn();

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


      </div>
    </div>
  );
}
