"use client";
import { useState, useEffect } from "react";
import { Search, MapPin, Phone, Globe, Star, ExternalLink } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import ScrollingChips from "@/components/ScrollingChips";

const ff = FONTS.heading;
const fb = FONTS.body;
const SAFFRON = "#E8A317";

const TABS = [
  { id: "all", label: "All", icon: "\u{2728}" },
  { id: "vendors", label: "Wedding Vendors", icon: "\u{1F490}" },
  { id: "venues", label: "Event Halls & Venues", icon: "\u{1F3DB}\uFE0F" },
  { id: "catering", label: "Catering", icon: "\u{1F37D}\uFE0F" },
];

const VENDOR_SUBS = ["Photography", "Cinematography", "Mehndi", "DJ", "Entertainment", "Sangeet", "Planner", "Decor", "Mandap", "Makeup", "Bridal"];
const VENUE_SUBS = ["Banquet Hall", "Wedding Venue", "Party Hall", "Conference", "Outdoor"];

const CHIPS = [
  { emoji: "\u{1F490}", text: "mehndi artist near Troy" },
  { emoji: "\u{1F3DB}\uFE0F", text: "banquet hall for 300 guests" },
  { emoji: "\u{1F4F7}", text: "Indian wedding photographer" },
  { emoji: "\u{1F37D}\uFE0F", text: "desi catering for reception" },
  { emoji: "\u{1F3B6}", text: "DJ for sangeet night" },
  { emoji: "\u{1F484}", text: "bridal makeup artist" },
  { emoji: "\u{1F3A8}", text: "mandap and decor setup" },
  { emoji: "\u{1F3DB}\uFE0F", text: "outdoor wedding venue Michigan" },
  { emoji: "\u{1F4F9}", text: "Indian wedding videographer" },
  { emoji: "\u{1F389}", text: "event planner for desi wedding" },
];

export default function EventPlanningPage() {
  const [tab, setTab] = useState("all");
  const [vendors, setVendors] = useState(null);
  const [venues, setVenues] = useState(null);
  const [activeSubs, setActiveSubs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    Promise.all([
      supabase.from("wedding_vendors").select("*").order("name"),
      supabase.from("event_halls").select("*").order("name"),
    ]).then(([v, h]) => {
      setVendors((v.data || []).map(r => ({ ...r, _type: "vendor", sub: r.subcategories })));
      setVenues((h.data || []).map(r => ({ ...r, _type: "venue", sub: r.subcategories })));
    });
  }, []);

  const triggerChat = (q) => { window.dispatchEvent(new CustomEvent("askadda", { detail: q })); };
  const toggleSub = (s) => setActiveSubs(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  if (!vendors || !venues) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFFBF5" }}><p style={{ fontFamily: ff, color: COLORS.textMuted }}>Loading...</p></div>;

  // Build listings based on tab
  let listings = [];
  if (tab === "all") listings = [...vendors, ...venues];
  else if (tab === "vendors") listings = vendors;
  else if (tab === "venues") listings = venues;
  else if (tab === "catering") listings = [...vendors, ...venues].filter(l => l.name?.toLowerCase().includes("cater") || l.sub?.some(s => s.toLowerCase().includes("cater")) || l.description?.toLowerCase().includes("cater"));

  // Filter by subs
  if (activeSubs.length > 0) {
    listings = listings.filter(l => l.sub?.some(s => activeSubs.includes(s)));
  }

  // Filter by search
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    listings = listings.filter(l => l.name?.toLowerCase().includes(q) || l.city?.toLowerCase().includes(q) || l.description?.toLowerCase().includes(q) || l.sub?.some(s => s.toLowerCase().includes(q)));
  }

  // Relevant subs for current tab
  const currentSubs = tab === "venues" ? VENUE_SUBS : tab === "vendors" ? VENDOR_SUBS : [...VENDOR_SUBS, ...VENUE_SUBS];

  return (
    <div style={{ background: "#FFFBF5", minHeight: "100vh" }}>
      {/* HERO */}
      <section style={{
        background: "linear-gradient(135deg, #4A1942 0%, #6B2569 40%, #8E3090 100%)",
        minHeight: "300px", padding: "40px 20px 36px", textAlign: "center",
        position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ position: "absolute", top: "8%", left: "5%", fontSize: "44px", opacity: 0.06, transform: "rotate(-12deg)" }}>{"\u{1F490}"}</div>
        <div style={{ position: "absolute", top: "15%", right: "8%", fontSize: "50px", opacity: 0.05, transform: "rotate(15deg)" }}>{"\u{1F3DB}\uFE0F"}</div>
        <div style={{ position: "absolute", bottom: "20%", left: "10%", fontSize: "42px", opacity: 0.05 }}>{"\u{1F4F7}"}</div>
        <div style={{ position: "absolute", top: "50%", right: "5%", fontSize: "46px", opacity: 0.05 }}>{"\u{1F37D}\uFE0F"}</div>
        <div style={{ position: "absolute", bottom: "8%", right: "20%", fontSize: "38px", opacity: 0.04 }}>{"\u{1F3B6}"}</div>
        <div style={{ position: "absolute", top: "65%", left: "3%", fontSize: "36px", opacity: 0.04 }}>{"\u{1F484}"}</div>
        <div style={{ position: "absolute", bottom: "25%", left: "40%", fontSize: "34px", opacity: 0.04 }}>{"\u{1F48D}"}</div>

        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <h1 style={{ fontFamily: ff, fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: "white", lineHeight: 1.1, margin: "0 0 8px" }}>
            Event <span style={{ color: SAFFRON, fontStyle: "italic" }}>Planning</span>
          </h1>
          <p style={{ fontFamily: ff, fontSize: "clamp(14px, 2vw, 18px)", fontWeight: 300, color: "rgba(255,255,255,0.6)", margin: "0 0 24px", fontStyle: "italic" }}>
            Wedding vendors, venues, catering & everything for your celebration
          </p>

          <form onSubmit={e => { e.preventDefault(); if (searchQuery.trim()) triggerChat(searchQuery); }} style={{ maxWidth: "560px", margin: "0 auto", position: "relative" }}>
            <Search size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#A89888" }} />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Find a vendor, venue, caterer..."
              style={{ width: "100%", padding: "14px 150px 14px 44px", borderRadius: "14px", border: "none", fontSize: "15px", fontFamily: fb, background: "white", boxShadow: "0 6px 24px rgba(0,0,0,0.2)", boxSizing: "border-box", outline: "none" }} />
            <button type="submit" style={{ position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)", background: SAFFRON, color: "white", border: "none", borderRadius: "10px", padding: "10px 20px", fontFamily: fb, fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>Ask Adda {"\u2728"}</button>
          </form>
          <div style={{ maxWidth: "600px", margin: "14px auto 0" }}>
            <ScrollingChips chips={CHIPS} onChipClick={(chip) => triggerChat(`${chip.emoji} ${chip.text}`)} variant="light" />
          </div>
        </div>
      </section>

      {/* TAB + SUB FILTERS */}
      <div style={{ background: "white", borderBottom: "1px solid #EDE6DE", padding: "12px 20px" }}>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => { setTab(t.id); setActiveSubs([]); }} style={{
                padding: "7px 16px", borderRadius: "999px", fontSize: "12px", fontFamily: fb, fontWeight: 600, cursor: "pointer",
                border: tab === t.id ? `2px solid ${SAFFRON}` : "2px solid #EDE6DE",
                background: tab === t.id ? SAFFRON : "white",
                color: tab === t.id ? "#2D2420" : COLORS.textMuted, transition: "all 0.25s",
              }}>{t.icon} {t.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* SUBCATEGORY PILLS */}
      {currentSubs.length > 0 && (
        <div style={{ background: "#FFFBF5", borderBottom: "1px solid #EDE6DE", padding: "10px 20px" }}>
          <div style={{ display: "flex", gap: "6px", justifyContent: "center", flexWrap: "wrap" }}>
            {currentSubs.map(s => (
              <button key={s} onClick={() => toggleSub(s)} style={{
                padding: "5px 12px", borderRadius: "999px", fontSize: "11px", fontFamily: fb, fontWeight: 500, cursor: "pointer",
                border: activeSubs.includes(s) ? `2px solid ${COLORS.primary}` : "2px solid #E8E0D8",
                background: activeSubs.includes(s) ? "#FDE8EF" : "white",
                color: activeSubs.includes(s) ? COLORS.primary : "#5A4A3F", transition: "all 0.2s",
              }}>{s}</button>
            ))}
            {activeSubs.length > 0 && (
              <button onClick={() => setActiveSubs([])} style={{ padding: "5px 12px", borderRadius: "999px", fontSize: "11px", fontFamily: fb, fontWeight: 500, border: `2px solid ${COLORS.primary}`, background: "white", color: COLORS.primary, cursor: "pointer" }}>{"\u2715"} Clear</button>
            )}
          </div>
        </div>
      )}

      {/* LISTINGS */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "30px 20px" }}>
        <p style={{ fontSize: "13px", color: COLORS.textFaint, marginBottom: "16px" }}>{listings.length} results</p>

        {listings.length > 0 ? (
          <div style={{ display: "grid", gap: "14px" }}>
            {listings.map((item, i) => (
              <div key={`${item._type}-${item.id || i}`} style={{
                background: "white", borderRadius: "14px", padding: "20px 24px",
                border: "1px solid #EDE6DE", transition: "box-shadow 0.2s",
                borderLeft: `4px solid ${item._type === "venue" ? "#795548" : "#C2185B"}`,
              }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                  <div style={{ flex: 1, minWidth: "250px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                      <h3 style={{ fontFamily: ff, fontSize: "17px", fontWeight: 700, margin: 0, color: "#2D2420" }}>{item.name}</h3>
                      <span style={{ padding: "2px 8px", borderRadius: "999px", fontSize: "9px", fontWeight: 700, background: item._type === "venue" ? "#EFEBE9" : "#FCE4EC", color: item._type === "venue" ? "#795548" : "#C2185B" }}>
                        {item._type === "venue" ? "VENUE" : "VENDOR"}
                      </span>
                    </div>
                    {item.sub?.length > 0 && (
                      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "8px" }}>
                        {item.sub.map(s => <span key={s} style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "10px", fontWeight: 600, background: "#F3E5F5", color: "#7B1FA2" }}>{s}</span>)}
                      </div>
                    )}
                    <div style={{ display: "flex", flexDirection: "column", gap: "3px", fontSize: "13px", color: "#8A7968" }}>
                      {item.city && <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><MapPin size={12} color={COLORS.primary} /> {item.address ? `${item.address}, ` : ""}{item.city}</span>}
                      {item.phone && <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><Phone size={12} color={COLORS.primary} /> {item.phone}</span>}
                    </div>
                    {item.description && <p style={{ fontSize: "13px", color: "#6B5B4F", margin: "8px 0 0", lineHeight: 1.5 }}>{item.description}</p>}
                    {item.rating && <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "6px", fontSize: "12px", color: SAFFRON }}><Star size={12} fill={SAFFRON} /> {item.rating}{item.reviews ? ` (${item.reviews} reviews)` : ""}</div>}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", flexShrink: 0 }}>
                    {item.website && (
                      <a href={item.website.startsWith("http") ? item.website : `https://${item.website}`} target="_blank" rel="noopener noreferrer" style={{
                        padding: "8px 16px", borderRadius: "10px", background: COLORS.primary, color: "white",
                        fontFamily: fb, fontWeight: 600, fontSize: "12px", textDecoration: "none",
                        display: "flex", alignItems: "center", gap: "4px",
                      }}><Globe size={12} /> Website</a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#8A7968" }}>
            <p style={{ fontFamily: ff, fontSize: "18px" }}>No results found</p>
            <p style={{ fontSize: "13px" }}>Try a different search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
