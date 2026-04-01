"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ArrowRight, MapPin, Star, Calendar } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

const ff = FONTS.body;

const QUICK_LINKS = [
  { label: "Restaurants", href: "/restaurants" },
  { label: "Grocery", href: "/groceries" },
  { label: "Doctors", href: "/professionals" },
  { label: "Temples", href: "/temples" },
  { label: "Events", href: "/community?tab=events" },
  { label: "Groups", href: "/community?tab=groups" },
  { label: "Community Orgs", href: "/community?tab=orgs" },
];

const AREAS = [
  { name: "Troy / Novi", filter: "Troy,Novi", desc: "IT corridor, most restaurants" },
  { name: "Canton / Plymouth", filter: "Canton,Plymouth", desc: "Temples, family-friendly" },
  { name: "Farmington Hills", filter: "Farmington Hills", desc: "Grocery stores, dining" },
  { name: "Ann Arbor", filter: "Ann Arbor", desc: "University town, students" },
  { name: "Sterling Heights", filter: "Sterling Heights", desc: "Growing desi community" },
  { name: "West Bloomfield", filter: "West Bloomfield,Bloomfield Hills", desc: "Upscale, professionals" },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [stats, setStats] = useState({});
  const [recentBiz, setRecentBiz] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    Promise.all([
      supabase.from("temple_events").select("*, temples(name, slug)").gte("event_date", today).order("event_date").limit(10),
      supabase.from("community_events").select("*, community_networking(name, slug)").gte("event_date", today).order("event_date").limit(10),
      supabase.from("restaurants").select("id, name, city, rating, reviews, description, photos, slug, notable_dishes").not("photos", "eq", "{}").gte("rating", 4.0).gte("reviews", 10).order("reviews", { ascending: false }).limit(20),
      // Stats
      supabase.from("restaurants").select("*", { count: "exact", head: true }),
      supabase.from("temples").select("*", { count: "exact", head: true }),
      supabase.from("community_networking").select("*", { count: "exact", head: true }),
      supabase.from("groceries").select("*", { count: "exact", head: true }),
      // Recent
      supabase.from("restaurants").select("id, name, city, photos, slug").not("photos", "eq", "{}").order("created_at", { ascending: false }).limit(6),
    ]).then(([te, ce, biz, s1, s2, s3, s4, recent]) => {
      const unified = [];
      (te.data || []).forEach(e => unified.push({ ...e, _type: "temple", _hostName: e.temples?.name, _hostSlug: e.temples?.slug ? `/temples/${e.temples.slug}` : null }));
      (ce.data || []).forEach(e => unified.push({ ...e, _type: "community", _hostName: e.community_networking?.name, _hostSlug: e.community_networking?.slug ? `/community/${e.community_networking.slug}` : null }));
      unified.sort((a, b) => a.event_date.localeCompare(b.event_date));
      setEvents(unified.slice(0, 5));
      const sorted = (biz.data || [])
        .filter(b => b.photos?.length > 0 && b.rating >= 4.0 && b.reviews >= 10)
        .sort((a, b) => ((b.rating || 0) * Math.log((b.reviews || 0) + 2)) - ((a.rating || 0) * Math.log((a.reviews || 0) + 2)));
      setBusinesses(sorted.slice(0, 6));
      setStats({ biz: s1.count || 0, temples: s2.count || 0, orgs: s3.count || 0, grocery: s4.count || 0 });
      setRecentBiz(recent.data || []);
    });
  }, []);

  const triggerChat = (q) => { window.dispatchEvent(new CustomEvent("askadda", { detail: q })); };
  const handleSearch = (e) => { if (e) e.preventDefault(); if (searchQuery.trim()) { triggerChat(searchQuery); setSearchQuery(""); } };

  return (
    <div style={{ background: COLORS.bg }}>
      {/* ═══ SEARCH SECTION ═══ */}
      <section style={{ padding: "40px 20px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <form onSubmit={handleSearch} style={{ position: "relative", maxWidth: "720px" }}>
          <Search size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: COLORS.textMuted }} />
          <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search 1,300+ businesses, temples, professionals..."
            style={{ width: "100%", padding: "14px 120px 14px 44px", borderRadius: "10px", border: `1px solid ${COLORS.border}`, fontSize: "15px", fontFamily: ff, background: COLORS.surface, boxSizing: "border-box", outline: "none" }}
            onFocus={e => e.target.style.borderColor = COLORS.primary}
            onBlur={e => e.target.style.borderColor = COLORS.border}
          />
          <button type="submit" style={{ position: "absolute", right: "4px", top: "50%", transform: "translateY(-50%)", background: COLORS.primary, color: "white", border: "none", borderRadius: "8px", padding: "10px 20px", fontFamily: ff, fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>Search</button>
        </form>

        {/* Quick links */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "14px" }}>
          {QUICK_LINKS.map(l => (
            <Link key={l.label} href={l.href} style={{
              padding: "6px 14px", borderRadius: "999px", fontSize: "13px", fontWeight: 500,
              border: `1px solid ${COLORS.primary}30`, color: COLORS.primary,
              textDecoration: "none", transition: "all 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = `${COLORS.primary}10`; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
            >{l.label}</Link>
          ))}
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      {stats.biz > 0 && (
        <div style={{ borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}`, padding: "10px 20px", background: COLORS.surface }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "24px", flexWrap: "wrap", fontSize: "12px", color: COLORS.textSecondary }}>
            <span><strong style={{ color: COLORS.text }}>{stats.biz.toLocaleString()}</strong> businesses</span>
            <span><strong style={{ color: COLORS.text }}>{stats.temples}</strong> places of worship</span>
            <span><strong style={{ color: COLORS.text }}>{stats.orgs}</strong> community orgs</span>
            <span><strong style={{ color: COLORS.text }}>{stats.grocery}</strong> grocery stores</span>
            <span style={{ color: COLORS.textMuted }}>Data verified March 2026</span>
          </div>
        </div>
      )}

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>

        {/* ═══ SPOTLIGHT ═══ */}
        <section style={{ padding: "28px 0 20px" }}>
          <Link href="/spotlight/eco-dosth" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div style={{ background: "#2D3D2F", borderRadius: "12px", overflow: "hidden", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(45,61,47,0.25)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
                  <img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=480,h=497,fit=crop/AwvDoRQlrZsGy017/clipped_image_20240122_103955-YbNqppxb4kt5nXkW.png" alt="Eco Dosth sal leaf plate"
                    style={{ width: "clamp(100px, 16vw, 140px)", height: "clamp(100px, 16vw, 140px)", borderRadius: "50%", objectFit: "cover", border: "2px solid #C4943D", boxShadow: "0 6px 20px rgba(0,0,0,0.25)" }} />
                </div>
                <div style={{ flex: "1 1 300px", padding: "24px" }}>
                  <span style={{ display: "inline-block", padding: "3px 12px", borderRadius: "999px", border: "1px solid #C4943D50", background: "#C4943D10", color: "#C4943D", fontSize: "10px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "10px" }}>
                    This Week&apos;s Spotlight
                  </span>
                  <h3 style={{ fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 700, margin: "0 0 8px", color: "#F4F1E8", lineHeight: 1.3 }}>The plate that disappears.</h3>
                  <p style={{ fontSize: "13px", color: "#A8A393", margin: "0 0 12px", lineHeight: 1.5 }}>How one Troy entrepreneur is replacing plastic with an ancient tradition — one sal leaf at a time.</p>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#C4943D" }}>Read the full story →</span>
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* ═══ UPCOMING EVENTS ═══ */}
        {events.length > 0 && (
          <section style={{ padding: "20px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 600, margin: 0, color: COLORS.text }}>What&apos;s happening this week</h2>
              <Link href="/community?tab=events" style={{ fontSize: "13px", fontWeight: 600, color: COLORS.primary, textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>All events <ArrowRight size={14} /></Link>
            </div>
            <div style={{ display: "grid", gap: "6px" }}>
              {events.map((ev, i) => {
                const d = new Date(ev.event_date + "T00:00:00");
                return (
                  <div key={`${ev._type}-${ev.id}-${i}`} style={{ display: "flex", gap: "12px", background: COLORS.surface, borderRadius: "8px", padding: "10px 14px", border: `1px solid ${COLORS.border}`, alignItems: "center" }}>
                    <div style={{ width: "42px", textAlign: "center", flexShrink: 0, padding: "4px", borderRadius: "6px", background: `${COLORS.primary}08` }}>
                      <div style={{ fontSize: "10px", fontWeight: 700, color: COLORS.primary, textTransform: "uppercase" }}>{d.toLocaleDateString("en-US", { month: "short" })}</div>
                      <div style={{ fontSize: "18px", fontWeight: 700, color: COLORS.text, lineHeight: 1.1 }}>{d.getDate()}</div>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ fontSize: "14px", fontWeight: 600, color: COLORS.text }}>{ev.event_name}</span>
                      {ev._hostName && (
                        <span style={{ fontSize: "12px", color: COLORS.textSecondary }}> at {ev._hostSlug ? <Link href={ev._hostSlug} style={{ color: COLORS.primary, fontWeight: 600 }}>{ev._hostName}</Link> : ev._hostName}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ═══ TRENDING BUSINESSES ═══ */}
        {businesses.length > 0 && (
          <section style={{ padding: "20px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 600, margin: 0, color: COLORS.text }}>Trending businesses</h2>
              <Link href="/businesses" style={{ fontSize: "13px", fontWeight: 600, color: COLORS.primary, textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>View all <ArrowRight size={14} /></Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "10px" }}>
              {businesses.map(biz => (
                <Link key={biz.id} href={biz.slug ? `/restaurants/${biz.slug}` : "/businesses"} style={{ textDecoration: "none", color: "inherit" }}>
                  <div style={{ background: COLORS.surface, borderRadius: "10px", overflow: "hidden", border: `1px solid ${COLORS.border}`, transition: "box-shadow 0.15s", display: "flex" }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = "0 3px 12px rgba(0,0,0,0.06)"}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                    {biz.photos?.[0] && <div style={{ width: "80px", height: "80px", flexShrink: 0, overflow: "hidden" }}><img src={biz.photos[0]} alt={biz.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>}
                    <div style={{ padding: "10px 14px", flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                        <h3 style={{ fontSize: "14px", fontWeight: 600, margin: 0, color: COLORS.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{biz.name}</h3>
                        {biz.rating && <span style={{ display: "flex", alignItems: "center", gap: "2px", fontSize: "12px", flexShrink: 0 }}><Star size={11} fill={COLORS.accent} color={COLORS.accent} /> {biz.rating}</span>}
                      </div>
                      {biz.city && <p style={{ fontSize: "11px", color: COLORS.textSecondary, margin: "0 0 2px" }}>{biz.city}</p>}
                      {biz.notable_dishes && <p style={{ fontSize: "12px", color: COLORS.textSecondary, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{biz.notable_dishes}</p>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ═══ EXPLORE BY AREA ═══ */}
        <section style={{ padding: "20px 0" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 600, margin: "0 0 12px", color: COLORS.text }}>Explore by area</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: "8px" }}>
            {AREAS.map(area => (
              <Link key={area.name} href={`/businesses?city=${encodeURIComponent(area.filter.split(",")[0])}`} style={{ textDecoration: "none" }}>
                <div style={{ background: COLORS.surface, borderRadius: "8px", padding: "14px 16px", border: `1px solid ${COLORS.border}`, transition: "border-color 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.primary}
                  onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: COLORS.text, marginBottom: "2px" }}>{area.name}</div>
                  <div style={{ fontSize: "12px", color: COLORS.textSecondary }}>{area.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══ NEW TO MICHIGAN ═══ */}
        <section style={{ padding: "20px 0 32px" }}>
          <Link href="/welcome" style={{ textDecoration: "none", display: "block" }}>
            <div style={{ background: COLORS.surface, borderRadius: "10px", padding: "20px 24px", border: `2px solid ${COLORS.primary}30`, display: "flex", justifyContent: "space-between", alignItems: "center", transition: "border-color 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.primary}
              onMouseLeave={e => e.currentTarget.style.borderColor = `${COLORS.primary}30`}>
              <div>
                <div style={{ fontSize: "16px", fontWeight: 700, color: COLORS.text, marginBottom: "2px" }}>Just moved to Metro Detroit?</div>
                <div style={{ fontSize: "13px", color: COLORS.textSecondary }}>Interactive checklist to get settled — groceries, temple, doctor, roommates, and more.</div>
              </div>
              <ArrowRight size={20} color={COLORS.primary} style={{ flexShrink: 0 }} />
            </div>
          </Link>
        </section>
      </div>
    </div>
  );
}
