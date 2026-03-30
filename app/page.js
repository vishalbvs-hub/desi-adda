"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, ArrowRight, MapPin, Star, Clock, MessageSquare, Send } from "lucide-react";
import { FONTS, COLORS, CLASSIFIEDS_CATEGORIES } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

const ff = FONTS.heading;
const fb = FONTS.body;
const WARM_SAND = "#F0E4D4";
const WARM_CLAY = "#E8D5C4";
const SAFFRON = "#E8A317";

const QUICK_CATS = [
  { emoji: "\u{1F35B}", label: "Restaurants", href: "/category/food", bg: "#E8832A" },
  { emoji: "\u{1F6D5}", label: "Temples", href: "/category/religious", bg: "#8B1A2B" },
  { emoji: "\u{1F958}", label: "Groceries", href: "/category/grocery", bg: "#2E7D32" },
  { emoji: "\u{1F490}", label: "Weddings", href: "/category/weddings", bg: "#C2185B" },
  { emoji: "\u{1FA7A}", label: "Doctors", href: "/professionals", bg: "#1565C0" },
  { emoji: "\u{1F3E0}", label: "Roommates", href: "/community", bg: "#00796B" },
  { emoji: "\u{1F3AC}", label: "Movies", href: "/movies", bg: "#6A1B9A" },
  { emoji: "\u{1F389}", label: "Events", href: "/events", bg: "#F57F17" },
  { emoji: "\u{1F3A8}", label: "Kids", href: "/category/family", bg: "#E64A19" },
];

function Divider() {
  const c = "#E8832A";
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "-24px", marginBottom: "-24px", position: "relative", zIndex: 2 }}>
      <svg viewBox="0 0 320 50" xmlns="http://www.w3.org/2000/svg" style={{ width: "300px", height: "48px", opacity: 0.55 }}>
        {/* Lines */}
        <line x1="0" y1="25" x2="105" y2="25" stroke={c} strokeWidth="1" opacity="0.5" />
        <line x1="215" y1="25" x2="320" y2="25" stroke={c} strokeWidth="1" opacity="0.5" />
        {/* Small side ornaments */}
        <circle cx="108" cy="25" r="2.5" fill={c} />
        <circle cx="212" cy="25" r="2.5" fill={c} />
        {/* Center lotus/mandala */}
        <g transform="translate(160,25)">
          {/* Outer petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
            <ellipse key={angle} cx="0" cy="-14" rx="4" ry="10" fill={c} opacity="0.35"
              transform={`rotate(${angle})`} />
          ))}
          {/* Inner petals */}
          {[0, 60, 120, 180, 240, 300].map(angle => (
            <ellipse key={`i${angle}`} cx="0" cy="-9" rx="3" ry="7" fill={c} opacity="0.55"
              transform={`rotate(${angle})`} />
          ))}
          {/* Center circle */}
          <circle cx="0" cy="0" r="4" fill={c} opacity="0.7" />
          <circle cx="0" cy="0" r="2" fill="white" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
}

const RANGOLI_BG = {
  backgroundImage: `
    radial-gradient(circle at 50% 50%, rgba(200,160,100,0.04) 0%, rgba(200,160,100,0.04) 12%, transparent 12.5%, transparent 25%, rgba(200,160,100,0.03) 25%, rgba(200,160,100,0.03) 37%, transparent 37.5%, transparent 50%, rgba(200,160,100,0.02) 50%, rgba(200,160,100,0.02) 62%, transparent 62.5%),
    radial-gradient(circle at 0% 0%, rgba(200,160,100,0.03) 0%, rgba(200,160,100,0.03) 12%, transparent 12.5%),
    radial-gradient(circle at 100% 100%, rgba(200,160,100,0.03) 0%, rgba(200,160,100,0.03) 12%, transparent 12.5%)
  `,
  backgroundSize: "120px 120px",
};

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

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [recent, setRecent] = useState([]);
  const [classifieds, setClassifieds] = useState([]);
  const [nlEmail, setNlEmail] = useState("");
  const [nlDone, setNlDone] = useState(false);

  useEffect(() => {
    supabase.from("events").select("*").eq("status", "approved").order("name").limit(5)
      .then(({ data }) => setEvents(data || []));
    supabase.from("restaurants").select("id, name, city, rating, reviews, description, created_at").order("created_at", { ascending: false }).limit(6)
      .then(({ data }) => setRecent(data || []));
    supabase.from("classifieds").select("*").eq("status", "approved").order("created_at", { ascending: false }).limit(4)
      .then(({ data }) => setClassifieds(data || []));
  }, []);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/category/food?q=${encodeURIComponent(searchQuery)}`);
  };

  const catRef = useFadeIn();
  const eventsRef = useFadeIn();
  const recentRef = useFadeIn();
  const classifiedsRef = useFadeIn();
  const kidsRef = useFadeIn();
  const nlRef = useFadeIn();

  const formatDate = (d) => {
    if (!d) return "";
    const date = new Date(d + "T00:00:00");
    if (!isNaN(date.getTime())) return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    return d;
  };

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section style={{
        minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center",
        backgroundImage: "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.7)), url('/hero.jpg')",
        backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",
        padding: "60px 20px", textAlign: "center",
      }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h1 style={{ fontFamily: fb, fontSize: "clamp(30px, 5.5vw, 48px)", fontWeight: 700, color: "white", lineHeight: 1.2, margin: "0 0 6px" }}>
            Your desi life in <span style={{ fontFamily: ff, fontStyle: "italic", color: COLORS.primary }}>Detroit</span>
          </h1>
          <p style={{ fontFamily: ff, fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 300, color: "rgba(255,255,255,0.8)", margin: "0 0 24px", fontStyle: "italic" }}>
            the gathering place for desi life in America.
          </p>
          <p style={{ fontSize: "clamp(14px, 2.2vw, 16px)", color: "rgba(255,255,255,0.75)", lineHeight: 1.6, margin: "0 auto 32px", maxWidth: "560px" }}>
            Restaurants, wedding vendors, temples, roommates, movies, and more — curated by the community, for the community.
          </p>
          <form onSubmit={handleSearch} style={{ maxWidth: "560px", margin: "0 auto", position: "relative" }}>
            <Search size={20} style={{ position: "absolute", left: "18px", top: "50%", transform: "translateY(-50%)", color: "#A89888" }} />
            <input
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search restaurants, temples, doctors..."
              style={{
                width: "100%", padding: "18px 130px 18px 50px", borderRadius: "16px",
                border: "none", fontSize: "16px", fontFamily: fb,
                background: "white", boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                boxSizing: "border-box", outline: "none",
              }}
            />
            <button type="submit" style={{
              position: "absolute", right: "6px", top: "50%", transform: "translateY(-50%)",
              background: COLORS.primary, color: "white", border: "none", borderRadius: "12px",
              padding: "12px 24px", fontFamily: fb, fontWeight: 600, fontSize: "14px", cursor: "pointer",
            }}>Search</button>
          </form>
          <p style={{ marginTop: "28px", fontSize: "14px", color: "rgba(255,255,255,0.65)", fontFamily: fb, fontWeight: 500, letterSpacing: "0.3px" }}>
            455+ Businesses &middot; 18 Cities &middot; 100% Community-Driven
          </p>
        </div>
      </section>

      {/* ═══ CATEGORY ICONS ═══ */}
      <section ref={catRef} style={{ background: "#FFFBF5", padding: "44px 20px 40px", ...RANGOLI_BG }}>
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          display: "flex", gap: "16px", overflowX: "auto",
          scrollbarWidth: "none", paddingBottom: "8px", justifyContent: "center", flexWrap: "wrap",
        }}>
          {QUICK_CATS.map(cat => (
            <Link key={cat.label} href={cat.href} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: "10px",
              minWidth: "96px", padding: "20px 14px", borderRadius: "18px",
              background: "white", border: "1px solid #EDE6DE",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)", textDecoration: "none",
              transition: "all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)", cursor: "pointer", flexShrink: 0,
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.08) translateY(-4px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)"; }}
            >
              <div style={{
                width: 60, height: 60, borderRadius: "50%",
                background: cat.bg, display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 4px 12px ${cat.bg}40`,
              }}>
                <span style={{ fontSize: "28px", lineHeight: 1 }}>{cat.emoji}</span>
              </div>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#2D2420", fontFamily: fb }}>{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <Divider />

      {/* ═══ EVENTS — WARM SAND ═══ */}
      <section ref={eventsRef} style={{ background: "#FFFBF5", padding: "56px 20px", ...RANGOLI_BG }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px", flexWrap: "wrap", gap: "8px" }}>
            <h2 style={{ fontFamily: ff, fontSize: "clamp(26px, 4vw, 34px)", fontWeight: 700, margin: 0, color: "#2D2420" }}>What&apos;s Happening This Week</h2>
            <Link href="/events" style={{ color: COLORS.primary, fontWeight: 600, fontSize: "14px", fontFamily: fb, display: "flex", alignItems: "center", gap: "4px", textDecoration: "none" }}>
              See All Events <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ marginTop: "24px" }}>
            {events.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px" }}>
                {events.map(ev => (
                  <div key={ev.id} style={{
                    padding: "20px 22px", borderRadius: "16px", background: "white",
                    border: "1px solid #E0D8CF", borderLeft: `3px solid ${SAFFRON}`, transition: "all 0.25s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div style={{ display: "flex", gap: "8px", marginBottom: "10px", alignItems: "center" }}>
                      <span style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 600, background: "#F3E5F5", color: "#7B1FA2" }}>{ev.type}</span>
                      <span style={{ fontSize: "12px", color: "#8A7968", display: "flex", alignItems: "center", gap: "3px" }}>
                        <Clock size={11} /> {formatDate(ev.event_date)}
                      </span>
                    </div>
                    <h4 style={{ fontFamily: ff, fontSize: "17px", fontWeight: 600, margin: "0 0 6px", color: "#2D2420" }}>{ev.name}</h4>
                    <p style={{ fontSize: "12px", color: "#8A7968", margin: 0, display: "flex", alignItems: "center", gap: "3px" }}>
                      <MapPin size={11} /> {ev.location}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: "40px", textAlign: "center", background: "white", borderRadius: "16px", border: "1px solid #E0D8CF" }}>
                <p style={{ fontSize: "15px", color: "#8A7968", margin: "0 0 12px" }}>No events this week — submit yours!</p>
                <Link href="/events/submit" style={{ color: COLORS.primary, fontWeight: 600, fontSize: "14px", fontFamily: fb, textDecoration: "none" }}>
                  Submit an Event <ArrowRight size={14} style={{ display: "inline", verticalAlign: "middle" }} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ NEW ON DESI ADDA — LIGHT ═══ */}
      <section ref={recentRef} style={{ background: "#FFFBF5", padding: "56px 20px", ...RANGOLI_BG }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px", flexWrap: "wrap", gap: "8px" }}>
            <h2 style={{ fontFamily: ff, fontSize: "clamp(26px, 4vw, 34px)", fontWeight: 700, margin: 0, color: "#2D2420" }}>New on Desi Adda</h2>
            <Link href="/category/food" style={{ color: COLORS.primary, fontWeight: 600, fontSize: "14px", fontFamily: fb, display: "flex", alignItems: "center", gap: "4px", textDecoration: "none" }}>
              Explore the Full Directory <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "14px", marginTop: "24px" }}>
            {recent.map(biz => (
              <div key={biz.id} style={{
                padding: "20px 22px", borderRadius: "16px", border: "1px solid #EDE6DE",
                borderLeft: `3px solid ${SAFFRON}`, background: "white", transition: "all 0.25s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <h4 style={{ fontFamily: ff, fontSize: "17px", fontWeight: 600, margin: "0 0 6px" }}>{biz.name}</h4>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "12px", color: "#8A7968", marginBottom: "6px" }}>
                  <span style={{ padding: "2px 8px", borderRadius: "999px", fontSize: "10px", fontWeight: 600, background: "#FFF3E0", color: "#E65100" }}>Restaurant</span>
                  {biz.city && <span style={{ display: "flex", alignItems: "center", gap: "3px" }}><MapPin size={11} /> {biz.city}</span>}
                </div>
                {biz.rating && (
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "#5A4A3F" }}>
                    <Star size={13} fill={SAFFRON} color={SAFFRON} /> {biz.rating}
                    {biz.reviews && <span style={{ color: "#A89888" }}>({biz.reviews})</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ CLASSIFIEDS — WARM CLAY ═══ */}
      <section ref={classifiedsRef} style={{ background: "#FFFBF5", padding: "56px 20px", ...RANGOLI_BG }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px", flexWrap: "wrap", gap: "8px" }}>
            <h2 style={{ fontFamily: ff, fontSize: "clamp(26px, 4vw, 34px)", fontWeight: 700, margin: 0, color: "#2D2420" }}>Latest from the Community</h2>
            <Link href="/community" style={{ color: COLORS.primary, fontWeight: 600, fontSize: "14px", fontFamily: fb, display: "flex", alignItems: "center", gap: "4px", textDecoration: "none" }}>
              See All Posts <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ marginTop: "24px" }}>
            {classifieds.length > 0 ? (
              <div style={{ display: "grid", gap: "12px" }}>
                {classifieds.map(post => {
                  const catInfo = CLASSIFIEDS_CATEGORIES.find(c => c.id === post.category);
                  return (
                    <Link key={post.id} href="/community" style={{
                      padding: "18px 22px", borderRadius: "14px", border: "1px solid #E0D8CF",
                      borderLeft: `3px solid ${SAFFRON}`, background: "white", display: "block",
                      textDecoration: "none", color: "inherit", transition: "all 0.25s",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)"; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                    >
                      <div style={{ display: "flex", gap: "8px", marginBottom: "6px", alignItems: "center" }}>
                        <span style={{ padding: "2px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 600, background: "#F5EDE4", color: "#8A7968" }}>
                          {catInfo?.icon} {catInfo?.label}
                        </span>
                      </div>
                      <h4 style={{ fontFamily: ff, fontSize: "16px", fontWeight: 600, margin: "0 0 4px", lineHeight: 1.3, color: "#2D2420" }}>{post.title}</h4>
                      <p style={{ fontSize: "12px", color: "#8A7968", margin: 0 }}>
                        {post.author} · <MessageSquare size={11} style={{ display: "inline", verticalAlign: "middle" }} /> {post.replies || 0} replies
                      </p>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div style={{ padding: "40px", textAlign: "center", background: "white", borderRadius: "16px", border: "1px solid #E0D8CF" }}>
                <p style={{ fontSize: "15px", color: "#8A7968", margin: "0 0 12px" }}>Be the first to post!</p>
                <Link href="/community/post" style={{ color: COLORS.primary, fontWeight: 600, fontSize: "14px", fontFamily: fb, textDecoration: "none" }}>
                  Create a Post <ArrowRight size={14} style={{ display: "inline", verticalAlign: "middle" }} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ FOR THE KIDS ═══ */}
      <section ref={kidsRef} style={{ padding: "56px 20px", background: "#FFFBF5", ...RANGOLI_BG }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{
            borderRadius: "24px", padding: "48px 36px", textAlign: "center",
            background: "linear-gradient(135deg, #FFF8E1, #FCE4EC, #E8EAF6)",
            border: "1px solid #EDE6DE", position: "relative", overflow: "hidden",
          }}>
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>{"\u{1F3A8}"}</div>
            <h2 style={{ fontFamily: ff, fontSize: "28px", fontWeight: 700, margin: "0 0 4px", color: "#2D2420" }}>For the Little Ones</h2>
  
            <p style={{ fontSize: "16px", color: "#5A4A3F", maxWidth: "480px", margin: "16px auto 24px", lineHeight: 1.6 }}>
              Coloring books, alphabet worksheets, and festival activities for South Asian kids.
            </p>
            <span style={{
              display: "inline-block", padding: "8px 22px", borderRadius: "999px",
              fontSize: "12px", fontWeight: 700, background: "rgba(255,255,255,0.8)",
              color: "#E65100", letterSpacing: "1px",
            }}>COMING SOON</span>
          </div>
        </div>
      </section>

      {/* ═══ NEWSLETTER ═══ */}
      <section ref={nlRef} style={{ background: COLORS.primary, padding: "60px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: ff, fontSize: "28px", fontWeight: 700, color: "white", marginBottom: "4px" }}>Stay Connected</h2>

          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "15px", marginTop: "12px", marginBottom: "28px" }}>
            Your city. Your people. One email a week.
          </p>
          {nlDone ? (
            <p style={{ color: COLORS.marigold, fontWeight: 600, fontFamily: ff, fontSize: "18px" }}>You&apos;re in! {"\u2728"}</p>
          ) : (
            <div style={{ display: "flex", gap: "8px", maxWidth: "420px", margin: "0 auto" }}>
              <input
                value={nlEmail} onChange={e => setNlEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  flex: 1, padding: "14px 18px", borderRadius: "12px", border: "none",
                  fontSize: "15px", fontFamily: fb, outline: "none",
                }}
              />
              <button
                onClick={() => {
                  if (!nlEmail.includes("@")) return;
                  supabase.from("subscribers").insert({ email: nlEmail.trim().toLowerCase(), opted_metros: ["detroit"] }).then(() => setNlDone(true));
                }}
                style={{
                  padding: "14px 24px", borderRadius: "12px", background: COLORS.marigold,
                  color: "white", border: "none", fontFamily: fb, fontWeight: 600,
                  fontSize: "15px", cursor: "pointer", whiteSpace: "nowrap",
                }}
              >
                <Send size={14} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
                Subscribe
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
