"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search, ArrowRight, MapPin, Star, Clock, MessageSquare, Send,
  UtensilsCrossed, Church, ShoppingBag, Heart, Stethoscope, Home, Film, Calendar, Baby,
} from "lucide-react";
import { FONTS, COLORS, CLASSIFIEDS_CATEGORIES } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

const ff = FONTS.heading;
const fb = FONTS.body;

const QUICK_CATS = [
  { icon: UtensilsCrossed, label: "Restaurants", href: "/category/food", color: "#E65100" },
  { icon: Church, label: "Temples", href: "/category/religious", color: "#BF360C" },
  { icon: ShoppingBag, label: "Groceries", href: "/category/grocery", color: "#33691E" },
  { icon: Heart, label: "Weddings", href: "/category/weddings", color: "#C2185B" },
  { icon: Stethoscope, label: "Doctors", href: "/professionals", color: "#37474F" },
  { icon: Home, label: "Roommates", href: "/community", color: "#455A64" },
  { icon: Film, label: "Movies", href: "/movies", color: "#6A1B9A" },
  { icon: Calendar, label: "Events", href: "/events", color: "#7B1FA2" },
  { icon: Baby, label: "Kids", href: "/category/family", color: "#1565C0" },
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
    const today = new Date().toISOString().split("T")[0];
    supabase.from("events").select("*").eq("status", "approved").gte("event_date", today).order("event_date").limit(5)
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
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };

  return (
    <>
      {/* ─── HERO ─── */}
      <section style={{
        minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center",
        backgroundImage: "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.7)), url('/hero.jpg')",
        backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",
        padding: "60px 20px", textAlign: "center", position: "relative",
      }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h1 style={{
            fontFamily: fb, fontSize: "clamp(30px, 5.5vw, 48px)", fontWeight: 700,
            color: "white", lineHeight: 1.2, margin: "0 0 6px",
          }}>
            Your desi life in <span style={{ fontFamily: ff, fontStyle: "italic", color: COLORS.primary }}> Detroit</span>
          </h1>
          <p style={{
            fontFamily: ff, fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 300,
            color: "rgba(255,255,255,0.8)", margin: "0 0 24px", fontStyle: "italic",
          }}>
            the gathering place for desi life in America.
          </p>
          <p style={{
            fontSize: "clamp(14px, 2.2vw, 16px)", color: "rgba(255,255,255,0.75)",
            lineHeight: 1.6, margin: "0 auto 32px", maxWidth: "560px",
          }}>
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

          <p style={{
            marginTop: "28px", fontSize: "14px", color: "rgba(255,255,255,0.65)",
            fontFamily: fb, fontWeight: 500, letterSpacing: "0.3px",
          }}>
            455+ Businesses &middot; 18 Cities &middot; 100% Community-Driven
          </p>
        </div>
      </section>

      {/* ─── CATEGORY ICONS ─── */}
      <section ref={catRef} style={{ background: "#FFFBF5", padding: "40px 20px 36px" }}>
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          display: "flex", gap: "12px", overflowX: "auto",
          scrollbarWidth: "none", paddingBottom: "8px",
        }}>
          {QUICK_CATS.map(cat => (
            <Link key={cat.label} href={cat.href} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
              minWidth: "90px", padding: "16px 12px", borderRadius: "16px",
              background: "white", border: "1px solid #EDE6DE",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)", textDecoration: "none",
              transition: "all 0.2s", cursor: "pointer", flexShrink: 0,
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = cat.color + "60"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 6px 20px ${cat.color}15`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#EDE6DE"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: "12px",
                background: cat.color + "10", display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <cat.icon size={22} color={cat.color} />
              </div>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "#5A4A3F", fontFamily: fb }}>{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── EVENTS THIS WEEK ─── */}
      <section ref={eventsRef} style={{ maxWidth: "1100px", margin: "0 auto", padding: "44px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px", flexWrap: "wrap", gap: "8px" }}>
          <h2 style={{ fontFamily: ff, fontSize: "24px", fontWeight: 700, margin: 0 }}>What&apos;s Happening This Week</h2>
          <Link href="/events" style={{ color: COLORS.primary, fontWeight: 600, fontSize: "14px", fontFamily: fb, display: "flex", alignItems: "center", gap: "4px", textDecoration: "none" }}>
            See All Events <ArrowRight size={14} />
          </Link>
        </div>
        {events.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px" }}>
            {events.map(ev => (
              <div key={ev.id} style={{
                padding: "18px 20px", borderRadius: "16px", background: "white",
                border: "1px solid #EDE6DE", transition: "box-shadow 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              >
                <div style={{ display: "flex", gap: "8px", marginBottom: "8px", alignItems: "center" }}>
                  <span style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 600, background: "#F3E5F5", color: "#7B1FA2" }}>{ev.type}</span>
                  <span style={{ fontSize: "12px", color: "#8A7968", display: "flex", alignItems: "center", gap: "3px" }}>
                    <Clock size={11} /> {formatDate(ev.event_date)}
                  </span>
                </div>
                <h4 style={{ fontFamily: ff, fontSize: "16px", fontWeight: 600, margin: "0 0 4px" }}>{ev.name}</h4>
                <p style={{ fontSize: "12px", color: "#8A7968", margin: 0, display: "flex", alignItems: "center", gap: "3px" }}>
                  <MapPin size={11} /> {ev.location}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: "40px", textAlign: "center", background: "white", borderRadius: "16px", border: "1px solid #EDE6DE" }}>
            <p style={{ fontSize: "15px", color: "#8A7968", margin: "0 0 12px" }}>No events this week — submit yours!</p>
            <Link href="/events/submit" style={{ color: COLORS.primary, fontWeight: 600, fontSize: "14px", fontFamily: fb, textDecoration: "none" }}>
              Submit an Event <ArrowRight size={14} style={{ display: "inline", verticalAlign: "middle" }} />
            </Link>
          </div>
        )}
      </section>

      {/* ─── NEW ON DESI ADDA ─── */}
      <section ref={recentRef} style={{ background: "white", padding: "50px 20px", borderTop: "1px solid #EDE6DE", borderBottom: "1px solid #EDE6DE" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px", flexWrap: "wrap", gap: "8px" }}>
            <h2 style={{ fontFamily: ff, fontSize: "24px", fontWeight: 700, margin: 0 }}>New on Desi Adda</h2>
            <Link href="/category/food" style={{ color: COLORS.primary, fontWeight: 600, fontSize: "14px", fontFamily: fb, display: "flex", alignItems: "center", gap: "4px", textDecoration: "none" }}>
              Explore the Full Directory <ArrowRight size={14} />
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "14px" }}>
            {recent.map(biz => (
              <div key={biz.id} style={{
                padding: "18px 20px", borderRadius: "16px", border: "1px solid #EDE6DE",
                background: "#FFFBF5", transition: "box-shadow 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              >
                <h4 style={{ fontFamily: ff, fontSize: "16px", fontWeight: 600, margin: "0 0 4px" }}>{biz.name}</h4>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "12px", color: "#8A7968", marginBottom: "6px" }}>
                  <span style={{ padding: "2px 8px", borderRadius: "999px", fontSize: "10px", fontWeight: 600, background: "#FFF3E0", color: "#E65100" }}>Restaurant</span>
                  {biz.city && <span style={{ display: "flex", alignItems: "center", gap: "3px" }}><MapPin size={11} /> {biz.city}</span>}
                </div>
                {biz.rating && (
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "#5A4A3F" }}>
                    <Star size={13} fill="#E8A317" color="#E8A317" /> {biz.rating}
                    {biz.reviews && <span style={{ color: "#A89888" }}>({biz.reviews})</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LATEST CLASSIFIEDS ─── */}
      <section ref={classifiedsRef} style={{ maxWidth: "1100px", margin: "0 auto", padding: "44px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px", flexWrap: "wrap", gap: "8px" }}>
          <h2 style={{ fontFamily: ff, fontSize: "24px", fontWeight: 700, margin: 0 }}>Latest from the Community</h2>
          <Link href="/community" style={{ color: COLORS.primary, fontWeight: 600, fontSize: "14px", fontFamily: fb, display: "flex", alignItems: "center", gap: "4px", textDecoration: "none" }}>
            See All Posts <ArrowRight size={14} />
          </Link>
        </div>
        {classifieds.length > 0 ? (
          <div style={{ display: "grid", gap: "12px" }}>
            {classifieds.map(post => {
              const catInfo = CLASSIFIEDS_CATEGORIES.find(c => c.id === post.category);
              return (
                <Link key={post.id} href="/community" style={{
                  padding: "16px 20px", borderRadius: "14px", border: "1px solid #EDE6DE",
                  background: "white", display: "block", textDecoration: "none", color: "inherit",
                  transition: "box-shadow 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.05)"}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                >
                  <div style={{ display: "flex", gap: "8px", marginBottom: "4px", alignItems: "center" }}>
                    <span style={{ padding: "2px 8px", borderRadius: "999px", fontSize: "11px", fontWeight: 600, background: "#F5EDE4", color: "#8A7968" }}>
                      {catInfo?.icon} {catInfo?.label}
                    </span>
                  </div>
                  <h4 style={{ fontFamily: ff, fontSize: "15px", fontWeight: 600, margin: "0 0 2px", lineHeight: 1.3 }}>{post.title}</h4>
                  <p style={{ fontSize: "12px", color: "#A89888", margin: 0 }}>
                    {post.author} · <MessageSquare size={11} style={{ display: "inline", verticalAlign: "middle" }} /> {post.replies || 0} replies
                  </p>
                </Link>
              );
            })}
          </div>
        ) : (
          <div style={{ padding: "40px", textAlign: "center", background: "white", borderRadius: "16px", border: "1px solid #EDE6DE" }}>
            <p style={{ fontSize: "15px", color: "#8A7968", margin: "0 0 12px" }}>Be the first to post!</p>
            <Link href="/community/post" style={{ color: COLORS.primary, fontWeight: 600, fontSize: "14px", fontFamily: fb, textDecoration: "none" }}>
              Create a Post <ArrowRight size={14} style={{ display: "inline", verticalAlign: "middle" }} />
            </Link>
          </div>
        )}
      </section>

      {/* ─── FOR THE KIDS ─── */}
      <section ref={kidsRef} style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px 44px" }}>
        <div style={{
          borderRadius: "20px", padding: "40px 32px", textAlign: "center",
          background: "linear-gradient(135deg, #FFF8E1, #FCE4EC, #E8EAF6)",
          border: "1px solid #EDE6DE", position: "relative", overflow: "hidden",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "12px" }}>
            <Baby size={22} color="#E65100" />
            <h2 style={{ fontFamily: ff, fontSize: "24px", fontWeight: 700, margin: 0 }}>For the Little Ones</h2>
          </div>
          <p style={{ fontSize: "16px", color: "#5A4A3F", maxWidth: "480px", margin: "0 auto 20px", lineHeight: 1.6 }}>
            Free coloring books, alphabet worksheets, and festival activities for South Asian kids.
          </p>
          <span style={{
            display: "inline-block", padding: "6px 18px", borderRadius: "999px",
            fontSize: "12px", fontWeight: 700, background: "rgba(255,255,255,0.7)",
            color: "#E65100", letterSpacing: "0.5px",
          }}>COMING SOON</span>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section ref={nlRef} style={{ background: COLORS.primary, padding: "56px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: ff, fontSize: "26px", fontWeight: 700, color: "white", marginBottom: "6px" }}>Stay Connected</h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "15px", marginBottom: "28px" }}>
            Your city. Your people. One email a week.
          </p>
          {nlDone ? (
            <p style={{ color: COLORS.marigold, fontWeight: 600, fontFamily: ff, fontSize: "18px" }}>You&apos;re in! ✨</p>
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
