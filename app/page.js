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
  { emoji: "\u{1F35B}", label: "Restaurants", href: "/category/food" },
  { emoji: "\u{1F6D5}", label: "Temples", href: "/category/religious" },
  { emoji: "\u{1F958}", label: "Groceries", href: "/category/grocery" },
  { emoji: "\u{1F490}", label: "Weddings", href: "/category/weddings" },
  { emoji: "\u{1FA7A}", label: "Doctors", href: "/professionals" },
  { emoji: "\u{1F3E0}", label: "Roommates", href: "/community" },
  { emoji: "\u{1F3AC}", label: "Movies", href: "/movies" },
  { emoji: "\u{1F389}", label: "Events", href: "/events" },
  { emoji: "\u{1F3B5}", label: "Music", href: "/music" },
  { emoji: "\u{1F3A8}", label: "Kids", href: "/category/family" },
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

// Kolam SVG pattern as a data URI — dot-and-line grid with interlocking curves
const KOLAM_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'>
  <g fill='none' stroke='rgb(180,140,80)' stroke-width='0.8' opacity='0.045'>
    <!-- Dot grid -->
    <circle cx='50' cy='50' r='2.5' fill='rgb(180,140,80)' opacity='0.06'/>
    <circle cx='150' cy='50' r='2.5' fill='rgb(180,140,80)' opacity='0.06'/>
    <circle cx='100' cy='100' r='2.5' fill='rgb(180,140,80)' opacity='0.06'/>
    <circle cx='50' cy='150' r='2.5' fill='rgb(180,140,80)' opacity='0.06'/>
    <circle cx='150' cy='150' r='2.5' fill='rgb(180,140,80)' opacity='0.06'/>
    <circle cx='0' cy='0' r='2.5' fill='rgb(180,140,80)' opacity='0.06'/>
    <circle cx='200' cy='0' r='2.5' fill='rgb(180,140,80)' opacity='0.06'/>
    <circle cx='0' cy='200' r='2.5' fill='rgb(180,140,80)' opacity='0.06'/>
    <circle cx='200' cy='200' r='2.5' fill='rgb(180,140,80)' opacity='0.06'/>
    <circle cx='100' cy='0' r='2.5' fill='rgb(180,140,80)' opacity='0.06'/>
    <circle cx='0' cy='100' r='2.5' fill='rgb(180,140,80)' opacity='0.06'/>
    <circle cx='200' cy='100' r='2.5' fill='rgb(180,140,80)' opacity='0.06'/>
    <circle cx='100' cy='200' r='2.5' fill='rgb(180,140,80)' opacity='0.06'/>
    <!-- Weaving curves connecting dots -->
    <path d='M0,0 C25,25 25,75 50,50 C75,25 75,75 100,100 C125,75 125,25 150,50 C175,75 175,25 200,0'/>
    <path d='M0,200 C25,175 25,125 50,150 C75,175 75,125 100,100 C125,125 125,175 150,150 C175,125 175,175 200,200'/>
    <path d='M0,0 C25,25 75,25 50,50 C25,75 75,75 100,100 C75,125 25,125 50,150 C75,175 25,175 0,200'/>
    <path d='M200,0 C175,25 125,25 150,50 C175,75 125,75 100,100 C125,125 175,125 150,150 C125,175 175,175 200,200'/>
    <!-- Looping arcs around center -->
    <path d='M50,50 C75,30 125,30 150,50 C170,75 170,125 150,150 C125,170 75,170 50,150 C30,125 30,75 50,50'/>
    <path d='M100,0 C80,30 80,70 100,100 C120,70 120,30 100,0'/>
    <path d='M0,100 C30,80 70,80 100,100 C70,120 30,120 0,100'/>
    <path d='M200,100 C170,80 130,80 100,100 C130,120 170,120 200,100'/>
    <path d='M100,200 C80,170 80,130 100,100 C120,130 120,170 100,200'/>
  </g>
</svg>`;
const KOLAM_URI = `url("data:image/svg+xml,${encodeURIComponent(KOLAM_SVG)}")`;

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
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, chatLoading]);

  // Lock body scroll when chat is open
  useEffect(() => {
    if (chatOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [chatOpen]);

  useEffect(() => {
    supabase.from("events").select("*").eq("status", "approved").order("name").limit(5)
      .then(({ data }) => setEvents(data || []));
    supabase.from("restaurants").select("id, name, city, rating, reviews, description, created_at").order("created_at", { ascending: false }).limit(6)
      .then(({ data }) => setRecent(data || []));
    supabase.from("classifieds").select("*").eq("status", "approved").order("created_at", { ascending: false }).limit(4)
      .then(({ data }) => setClassifieds(data || []));
  }, []);

  const sendChat = async (msg) => {
    const q = msg.trim();
    if (!q) return;
    const userMsg = { role: "user", content: q, listings: [] };
    setChatMessages(prev => [...prev, userMsg]);
    setChatLoading(true);
    setChatInput("");
    try {
      // Send only PREVIOUS messages as history (not the current one)
      const history = chatMessages.length > 0
        ? chatMessages.map(m => ({ role: m.role, content: m.content }))
        : null;
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, history }),
      });
      const data = await res.json();
      setChatMessages(prev => [...prev, { role: "assistant", content: data.response, listings: data.listings || [] }]);
    } catch {
      setChatMessages(prev => [...prev, { role: "assistant", content: "Something went wrong. Please try again.", listings: [] }]);
    }
    setChatLoading(false);
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    setChatOpen(true);
    sendChat(searchQuery);
    setSearchQuery("");
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
    <div style={{
      background: `#FFFBF5 ${KOLAM_URI}`,
      backgroundRepeat: "repeat",
      backgroundSize: "200px 200px",
    }}>
      {/* ═══ HERO ═══ */}
      <style>{`@keyframes heroChevronBounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(8px); } }`}</style>
      <section style={{
        minHeight: "clamp(40vh, 45vh, 45vh)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.65)), url('/hero.jpg')",
        backgroundSize: "cover", backgroundPosition: "center 80%", backgroundRepeat: "no-repeat",
        padding: "28px 20px 20px", textAlign: "center", position: "relative",
      }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h1 style={{ fontFamily: fb, fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 700, color: "white", lineHeight: 1.2, margin: "0 0 4px" }}>
            Your desi life in <span style={{ fontFamily: ff, fontStyle: "italic", color: COLORS.primary }}>Detroit</span>
          </h1>
          <p style={{ fontFamily: ff, fontSize: "clamp(16px, 2.5vw, 22px)", fontWeight: 300, color: "rgba(255,255,255,0.8)", margin: "0 0 14px", fontStyle: "italic" }}>
            the gathering place for desi life in America.
          </p>
          <p style={{ fontSize: "clamp(13px, 2vw, 15px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.5, margin: "0 auto 20px", maxWidth: "520px" }}>
            Restaurants, wedding vendors, temples, roommates, movies, and more — curated by the community, for the community.
          </p>
          <form onSubmit={handleSearch} style={{ maxWidth: "520px", margin: "0 auto", position: "relative" }}>
            <Search size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#A89888" }} />
            <input
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="Ask me anything... best biryani? Telugu dentist?"
              style={{
                width: "100%", padding: "14px 150px 14px 44px", borderRadius: "14px",
                border: "none", fontSize: "15px", fontFamily: fb,
                background: "white", boxShadow: "0 6px 24px rgba(0,0,0,0.2)",
                boxSizing: "border-box", outline: "none",
              }}
            />
            <button type="submit" style={{
              position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)",
              background: COLORS.primary, color: "white", border: "none", borderRadius: "10px",
              padding: "10px 20px", fontFamily: fb, fontWeight: 600, fontSize: "13px", cursor: "pointer",
            }}>Ask Adda {"\u2728"}</button>
          </form>
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap", marginTop: "14px" }}>
            {[
              { emoji: "\u{1F35B}", text: "best biryani in Troy" },
              { emoji: "\u{1FA7A}", text: "Telugu doctor near me" },
              { emoji: "\u{1F6D5}", text: "temples in Novi" },
            ].map(chip => (
              <button key={chip.text} onClick={() => { setSearchQuery(`${chip.emoji} ${chip.text}`); setChatOpen(true); sendChat(`${chip.emoji} ${chip.text}`); }} style={{
                padding: "6px 14px", borderRadius: "999px", fontSize: "12px", fontFamily: fb,
                fontWeight: 500, color: "white", cursor: "pointer",
                background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)",
                transition: "background 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
              >{chip.emoji} {chip.text}</button>
            ))}
          </div>
          <p style={{ marginTop: "10px", fontSize: "11px", color: "rgba(255,255,255,0.5)", fontFamily: fb }}>
            Powered by AI — ask in plain English
          </p>
          <p style={{ marginTop: "8px", fontSize: "13px", color: "rgba(255,255,255,0.55)", fontFamily: fb, fontWeight: 500, letterSpacing: "0.3px" }}>
            455+ Businesses &middot; 18 Cities &middot; 100% Community-Driven
          </p>
          {/* Scroll indicator */}
          <button
            onClick={() => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              marginTop: "18px", background: "none", border: "none", cursor: "pointer", padding: "4px",
              animation: "heroChevronBounce 2s ease-in-out infinite",
            }}
            aria-label="Scroll to categories"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </section>

      {/* ═══ ASK ADDA CHAT OVERLAY ═══ */}
      <style>{`
        @keyframes askPulse { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes chatSlideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes chatOverlayIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
      {chatOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
          animation: "chatOverlayIn 0.2s ease",
        }} onClick={e => { if (e.target === e.currentTarget) { setChatOpen(false); setChatMessages([]); } }}>
          <div style={{
            width: "min(660px, 95vw)", maxHeight: "min(78vh, 700px)", display: "flex", flexDirection: "column",
            background: "#FFFBF5", borderRadius: "20px", overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.25)", animation: "chatSlideIn 0.3s ease",
          }}>
            {/* Header */}
            <div style={{
              background: "#2D2420", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span style={{ fontFamily: ff, fontSize: "18px", fontWeight: 700, color: "white", display: "flex", alignItems: "center", gap: "8px" }}>
                {"\u2728"} Ask Adda
              </span>
              <button onClick={() => { setChatOpen(false); setChatMessages([]); }} style={{
                background: "none", border: "none", color: "rgba(255,255,255,0.7)", fontSize: "20px", cursor: "pointer", padding: "4px 8px", lineHeight: 1,
              }}>{"\u2715"}</button>
            </div>

            {/* Chat messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
              {chatMessages.length === 0 && !chatLoading && (
                <div style={{ textAlign: "center", padding: "30px 0", color: "#8A7968" }}>
                  <p style={{ fontFamily: ff, fontSize: "16px", fontWeight: 600, margin: "0 0 4px" }}>Hi! I&apos;m your desi directory concierge.</p>
                  <p style={{ fontSize: "13px" }}>Ask me anything — &ldquo;best biryani in Troy&rdquo;, &ldquo;Telugu temples near me&rdquo;, &ldquo;immigration lawyer&rdquo;...</p>
                </div>
              )}
              {chatMessages.map((msg, i) => (
                <div key={i} style={{
                  display: "flex", flexDirection: "column",
                  alignItems: msg.role === "user" ? "flex-end" : "flex-start",
                  animation: "chatSlideIn 0.3s ease",
                }}>
                  <div style={{
                    maxWidth: "85%", padding: "12px 16px", borderRadius: "18px",
                    background: msg.role === "user" ? SAFFRON : "white",
                    color: msg.role === "user" ? "white" : "#2D2420",
                    border: msg.role === "user" ? "none" : "1px solid #EDE6DE",
                    fontSize: "14px", lineHeight: 1.6, whiteSpace: "pre-line",
                    borderBottomRightRadius: msg.role === "user" ? "6px" : "18px",
                    borderBottomLeftRadius: msg.role === "assistant" ? "6px" : "18px",
                  }}
                    dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }}
                  />
                  {msg.role === "assistant" && msg.listings?.length > 0 && (
                    <div style={{
                      display: "flex", gap: "8px", overflowX: "auto", scrollbarWidth: "none",
                      padding: "10px 0 2px", maxWidth: "85%",
                    }}>
                      {msg.listings.map((l, j) => (
                        <Link key={`${l._table}-${l.id}-${j}`} href={`${l._table === "professionals" ? "/professionals" : `/category/${l._table === "restaurants" ? "food" : l._table === "temples" ? "religious" : l._table === "groceries" ? "grocery" : l._table === "wedding_vendors" ? "weddings" : l._table === "event_halls" ? "event-halls" : l._table === "kids" ? "family" : l._table === "health_wellness" ? "wellness" : l._table === "beauty_brands" ? "beauty" : l._table === "community_networking" ? "community" : "food"}`}?q=${encodeURIComponent(l.name)}`}
                          onClick={() => { setChatOpen(false); setChatMessages([]); }}
                          style={{
                            flexShrink: 0, width: "180px", padding: "10px 12px", borderRadius: "12px",
                            background: "white", border: "1px solid #EDE6DE", borderLeft: `3px solid ${SAFFRON}`,
                            textDecoration: "none", color: "inherit", transition: "box-shadow 0.2s",
                          }}
                          onMouseEnter={e => e.currentTarget.style.boxShadow = "0 3px 10px rgba(0,0,0,0.06)"}
                          onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                        >
                          <div style={{ fontFamily: ff, fontSize: "12px", fontWeight: 600, margin: "0 0 3px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.name}</div>
                          <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", color: "#8A7968" }}>
                            <span style={{ padding: "1px 5px", borderRadius: "999px", background: `${SAFFRON}15`, color: SAFFRON, fontWeight: 600 }}>{l._category}</span>
                            {l.rating && <span><Star size={9} fill={SAFFRON} color={SAFFRON} style={{ display: "inline", verticalAlign: "middle" }} /> {l.rating}</span>}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {chatLoading && (
                <div style={{ display: "flex", alignItems: "flex-start", animation: "chatSlideIn 0.3s ease" }}>
                  <div style={{ padding: "14px 18px", borderRadius: "18px 18px 18px 6px", background: "white", border: "1px solid #EDE6DE", display: "flex", gap: "5px", alignItems: "center" }}>
                    {[0, 1, 2].map(i => (
                      <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: SAFFRON, animation: `askPulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={e => { e.preventDefault(); sendChat(chatInput); }} style={{
              padding: "12px 16px", borderTop: "1px solid #EDE6DE", background: "white",
              display: "flex", gap: "8px",
            }}>
              <input
                value={chatInput} onChange={e => setChatInput(e.target.value)}
                placeholder="Ask a follow-up..."
                autoFocus
                style={{
                  flex: 1, padding: "12px 16px", borderRadius: "12px", border: "1px solid #E0D8CF",
                  fontSize: "14px", fontFamily: fb, outline: "none", background: "#FFFBF5",
                }}
              />
              <button type="submit" disabled={chatLoading} style={{
                padding: "10px 18px", borderRadius: "12px", background: chatLoading ? "#ccc" : SAFFRON,
                color: "white", border: "none", fontFamily: fb, fontWeight: 600, fontSize: "13px",
                cursor: chatLoading ? "not-allowed" : "pointer",
              }}>
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ═══ CATEGORY ICONS ═══ */}
      <section id="categories" ref={catRef} style={{ background: "rgba(255,251,245,0.85)", padding: "36px 20px 32px" }}>
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
              <span style={{ fontSize: "32px", lineHeight: 1 }}>{cat.emoji}</span>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#2D2420", fontFamily: fb }}>{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <Divider />

      {/* ═══ EVENTS — WARM SAND ═══ */}
      <section ref={eventsRef} style={{ background: "rgba(255,251,245,0.85)", padding: "56px 20px" }}>
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
                  <Link key={ev.id} href="/events" style={{
                    padding: "20px 22px", borderRadius: "16px", background: "white",
                    border: "1px solid #E0D8CF", borderLeft: `3px solid ${SAFFRON}`, transition: "all 0.25s",
                    display: "block", textDecoration: "none", color: "inherit",
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
                  </Link>
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
      <section ref={recentRef} style={{ background: "rgba(255,251,245,0.85)", padding: "56px 20px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px", flexWrap: "wrap", gap: "8px" }}>
            <h2 style={{ fontFamily: ff, fontSize: "clamp(26px, 4vw, 34px)", fontWeight: 700, margin: 0, color: "#2D2420" }}>New on Desi Adda</h2>
            <Link href="/category/food" style={{ color: COLORS.primary, fontWeight: 600, fontSize: "14px", fontFamily: fb, display: "flex", alignItems: "center", gap: "4px", textDecoration: "none" }}>
              Explore the Full Directory <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "14px", marginTop: "24px" }}>
            {recent.map(biz => (
              <Link key={biz.id} href="/category/food" style={{
                padding: "20px 22px", borderRadius: "16px", border: "1px solid #EDE6DE",
                borderLeft: `3px solid ${SAFFRON}`, background: "white", transition: "all 0.25s",
                display: "block", textDecoration: "none", color: "inherit",
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
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ CLASSIFIEDS — WARM CLAY ═══ */}
      <section ref={classifiedsRef} style={{ background: "rgba(255,251,245,0.85)", padding: "56px 20px" }}>
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
      <section ref={kidsRef} style={{ padding: "56px 20px", background: "rgba(255,251,245,0.85)" }}>
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
    </div>
  );
}
