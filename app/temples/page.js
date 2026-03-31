"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, MapPin, Globe, Phone, Calendar, Clock, ExternalLink, ChevronDown } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import ListingCard from "@/components/ListingCard";
import ScrollingChips from "@/components/ScrollingChips";

const ff = FONTS.heading;
const fb = FONTS.body;
const SAFFRON = "#E8A317";

const RELIGION_FILTERS = ["All", "Hindu", "Sikh", "Islamic", "Jain", "Buddhist", "Multi-faith"];
const SERVICE_FILTERS = ["All", "Temples", "Pandit/Priest Services", "Astrology/Vastu"];

const CHIPS = [
  { emoji: "\u{1F6D5}", text: "Telugu temple near Troy" },
  { emoji: "\u{1F54B}", text: "Gurudwara in Metro Detroit" },
  { emoji: "\u{1F54C}", text: "mosque near Hamtramck" },
  { emoji: "\u{1F6D5}", text: "ISKCON temple events" },
  { emoji: "\u{1F9D8}", text: "meditation center near me" },
  { emoji: "\u{1F54D}", text: "Swaminarayan mandir Michigan" },
  { emoji: "\u{1F6D5}", text: "Ganesh temple Novi" },
  { emoji: "\u{1F389}", text: "temple events this weekend" },
  { emoji: "\u{1F6D5}", text: "Hindu temple near Canton" },
  { emoji: "\u{1F54C}", text: "Eid prayers Dearborn" },
  { emoji: "\u{1F52E}", text: "Pandit for puja near me" },
  { emoji: "\u{2B50}", text: "Astrology consultation Michigan" },
];

const SORT_OPTIONS = [
  { value: "name", label: "Name A-Z" },
  { value: "rating", label: "Highest Rated" },
];

export default function TemplesPage() {
  const [temples, setTemples] = useState(null);
  const [events, setEvents] = useState([]);
  const [religionFilter, setReligionFilter] = useState("All");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [city, setCity] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    Promise.all([
      supabase.from("temples").select("*").order("name"),
      supabase.from("events").select("*").eq("status", "approved").order("event_date"),
    ]).then(([t, e]) => {
      setTemples(t.data || []);
      setEvents(e.data || []);
    });
  }, []);

  if (!temples) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFFBF5" }}>
      <p style={{ fontFamily: ff, fontSize: "18px", color: COLORS.textMuted }}>Loading temples...</p>
    </div>
  );

  // Unique cities for dropdown
  const cities = ["All", ...Array.from(new Set(temples.map(t => t.city).filter(Boolean))).sort()];

  // Filter
  let filtered = temples;

  // Religion filter
  if (religionFilter !== "All") {
    const aliases = {
      hindu: ["hindu", "mandir", "temple"],
      sikh: ["sikh", "gurudwara", "gurdwara"],
      islamic: ["muslim", "mosque", "masjid", "islamic", "islam"],
      jain: ["jain"],
      buddhist: ["buddhist", "vihara"],
      "multi-faith": ["multi", "interfaith", "vedanta"],
    };
    const terms = aliases[religionFilter.toLowerCase()] || [religionFilter.toLowerCase()];
    filtered = filtered.filter(t => {
      const text = `${t.name || ""} ${t.description || ""} ${(t.subcategories || []).join(" ")}`.toLowerCase();
      return terms.some(term => text.includes(term));
    });
  }

  // Service type filter
  if (serviceFilter !== "All") {
    const aliases = {
      "temples": ["temple", "mandir", "mosque", "masjid", "gurudwara", "church"],
      "pandit/priest services": ["pandit", "priest", "puja", "pooja", "imam"],
      "astrology/vastu": ["astrology", "astrologer", "vastu", "jyotish", "horoscope"],
    };
    const terms = aliases[serviceFilter.toLowerCase()] || [serviceFilter.toLowerCase()];
    filtered = filtered.filter(t => {
      const text = `${t.name || ""} ${t.description || ""} ${(t.subcategories || []).join(" ")}`.toLowerCase();
      return terms.some(term => text.includes(term));
    });
  }

  if (city !== "All") {
    filtered = filtered.filter(t => t.city === city);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(t =>
      t.name?.toLowerCase().includes(q) ||
      t.city?.toLowerCase().includes(q) ||
      t.description?.toLowerCase().includes(q) ||
      t.subcategories?.some(s => s.toLowerCase().includes(q))
    );
  }

  // Sort
  if (sortBy === "rating") {
    filtered = [...filtered].sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  // Match events to temples by name similarity
  function getTempleEvents(temple) {
    const tName = temple.name?.toLowerCase() || "";
    const tWords = tName.split(/\s+/).filter(w => w.length > 3);
    return events.filter(ev => {
      const evText = `${ev.name || ""} ${ev.venue || ""} ${ev.description || ""}`.toLowerCase();
      return tWords.some(w => evText.includes(w));
    }).slice(0, 3);
  }

  const triggerChat = (q) => { window.dispatchEvent(new CustomEvent("askadda", { detail: q })); };

  return (
    <div style={{ background: "#FFFBF5", minHeight: "100vh" }}>
      {/* HERO */}
      <section style={{
        background: "linear-gradient(135deg, #3E1C0A 0%, #6B2E0F 40%, #8B3A1A 100%)",
        minHeight: "320px", padding: "48px 20px 40px", textAlign: "center",
        position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ position: "absolute", top: "8%", left: "5%", fontSize: "44px", opacity: 0.06, transform: "rotate(-12deg)" }}>{"\u{1F6D5}"}</div>
        <div style={{ position: "absolute", top: "15%", right: "8%", fontSize: "50px", opacity: 0.05, transform: "rotate(15deg)" }}>{"\u{1F54B}"}</div>
        <div style={{ position: "absolute", bottom: "20%", left: "10%", fontSize: "42px", opacity: 0.05, transform: "rotate(20deg)" }}>{"\u{1F54C}"}</div>
        <div style={{ position: "absolute", top: "45%", left: "3%", fontSize: "36px", opacity: 0.04, transform: "rotate(-25deg)" }}>{"\u{1F9D8}"}</div>
        <div style={{ position: "absolute", top: "55%", right: "5%", fontSize: "46px", opacity: 0.05, transform: "rotate(10deg)" }}>{"\u{1F3EF}"}</div>
        <div style={{ position: "absolute", bottom: "8%", right: "15%", fontSize: "38px", opacity: 0.04, transform: "rotate(-8deg)" }}>{"\u{1F54D}"}</div>
        <div style={{ position: "absolute", top: "10%", left: "35%", fontSize: "32px", opacity: 0.04, transform: "rotate(22deg)" }}>{"\u{1F52F}"}</div>
        <div style={{ position: "absolute", bottom: "25%", left: "4%", fontSize: "40px", opacity: 0.04, transform: "rotate(18deg)" }}>{"\u{1F6D5}"}</div>

        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <h1 style={{ fontFamily: ff, fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: "white", lineHeight: 1.1, margin: "0 0 8px" }}>
            Temples & <span style={{ color: SAFFRON, fontStyle: "italic" }}>Spiritual</span>
          </h1>
          <p style={{ fontFamily: ff, fontSize: "clamp(14px, 2vw, 18px)", fontWeight: 300, color: "rgba(255,255,255,0.6)", margin: "0 0 24px", fontStyle: "italic" }}>
            Temples, gurudwaras, mosques, pandit services & astrology in Metro Detroit
          </p>

          {/* Search bar */}
          <form onSubmit={e => { e.preventDefault(); if (searchQuery.trim()) triggerChat(searchQuery); }} style={{ maxWidth: "560px", margin: "0 auto", position: "relative" }}>
            <Search size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#A89888" }} />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="Find a temple, pandit, astrologer..."
              style={{ width: "100%", padding: "14px 150px 14px 44px", borderRadius: "14px", border: "none", fontSize: "15px", fontFamily: fb, background: "white", boxShadow: "0 6px 24px rgba(0,0,0,0.2)", boxSizing: "border-box", outline: "none" }} />
            <button type="submit" style={{ position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)", background: SAFFRON, color: "white", border: "none", borderRadius: "10px", padding: "10px 20px", fontFamily: fb, fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>
              Ask Adda {"\u2728"}
            </button>
          </form>
          <div style={{ maxWidth: "600px", margin: "14px auto 0" }}>
            <ScrollingChips chips={CHIPS} onChipClick={(chip) => triggerChat(`${chip.emoji} ${chip.text}`)} variant="light" />
          </div>

          {/* Religion filters inside hero */}
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap", marginTop: "20px" }}>
            {RELIGION_FILTERS.map(d => (
              <button key={d} onClick={() => setReligionFilter(d)} style={{
                padding: "7px 18px", borderRadius: "999px", fontSize: "13px", fontFamily: fb, fontWeight: 600, cursor: "pointer",
                border: religionFilter === d ? `2px solid ${SAFFRON}` : "2px solid rgba(255,255,255,0.15)",
                background: religionFilter === d ? SAFFRON : "rgba(255,255,255,0.08)",
                color: religionFilter === d ? "#3E1C0A" : "rgba(255,255,255,0.7)", transition: "all 0.25s",
              }}>{d}</button>
            ))}
          </div>
        </div>
      </section>

      {/* TEMPLE LISTINGS */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "36px 20px" }}>
        {/* Controls row: city dropdown + sort */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "16px", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontSize: "13px", color: COLORS.textFaint, margin: 0 }}>{filtered.length} temples found</p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <div style={{ position: "relative" }}>
              <select value={serviceFilter} onChange={e => setServiceFilter(e.target.value)}
                style={{ appearance: "none", padding: "8px 32px 8px 12px", borderRadius: "10px", border: "1px solid #EDE6DE", background: "white", fontSize: "13px", fontFamily: fb, color: "#2D2420", cursor: "pointer", outline: "none" }}>
                {SERVICE_FILTERS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown size={14} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#8A7968" }} />
            </div>
            <div style={{ position: "relative" }}>
              <select
                value={city}
                onChange={e => setCity(e.target.value)}
                style={{
                  appearance: "none", padding: "8px 32px 8px 12px", borderRadius: "10px",
                  border: "1px solid #EDE6DE", background: "white", fontSize: "13px",
                  fontFamily: fb, color: "#2D2420", cursor: "pointer", outline: "none",
                }}
              >
                {cities.map(c => <option key={c} value={c}>{c === "All" ? "All Cities" : c}</option>)}
              </select>
              <ChevronDown size={14} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#8A7968" }} />
            </div>
            <div style={{ position: "relative" }}>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{
                  appearance: "none", padding: "8px 32px 8px 12px", borderRadius: "10px",
                  border: "1px solid #EDE6DE", background: "white", fontSize: "13px",
                  fontFamily: fb, color: "#2D2420", cursor: "pointer", outline: "none",
                }}
              >
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ChevronDown size={14} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#8A7968" }} />
            </div>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div style={{ display: "grid", gap: "12px" }}>
            {filtered.map(temple => {
              const templeEvents = getTempleEvents(temple);
              return (
                <div key={temple.id}>
                  <Link href={`/temples/${temple.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                    <ListingCard item={temple} cat="temples" />
                  </Link>

                  {/* Upcoming events for this temple */}
                  {templeEvents.length > 0 && (
                    <div style={{
                      background: "#FFFBF5", padding: "14px 24px",
                      border: "1px solid #EDE6DE", borderTop: "none",
                      borderRadius: "0 0 16px 16px", marginTop: "-8px",
                    }}>
                      <h4 style={{ fontFamily: ff, fontSize: "13px", fontWeight: 700, color: "#8A7968", margin: "0 0 10px", display: "flex", alignItems: "center", gap: "6px" }}>
                        <Calendar size={13} /> Upcoming Events
                      </h4>
                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        {templeEvents.map(ev => {
                          const d = ev.event_date ? new Date(ev.event_date + "T00:00:00") : null;
                          const dateStr = d ? d.toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "";
                          return (
                            <div key={ev.id} style={{
                              padding: "10px 14px", borderRadius: "12px", background: "white",
                              border: "1px solid #EDE6DE", flex: "1 1 200px", maxWidth: "300px",
                            }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                                {dateStr && <span style={{ padding: "2px 8px", borderRadius: "999px", fontSize: "10px", fontWeight: 700, background: SAFFRON, color: "white" }}>{dateStr}</span>}
                                {ev.event_type && <span style={{ fontSize: "10px", fontWeight: 600, color: "#8A7968" }}>{ev.event_type}</span>}
                              </div>
                              <p style={{ fontFamily: fb, fontSize: "13px", fontWeight: 600, color: "#2D2420", margin: 0, lineHeight: 1.3 }}>{ev.name}</p>
                              {ev.time && <p style={{ fontSize: "11px", color: "#8A7968", margin: "3px 0 0", display: "flex", alignItems: "center", gap: "4px" }}><Clock size={10} /> {ev.time}</p>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#8A7968" }}>
            <p style={{ fontFamily: ff, fontSize: "20px" }}>No temples found</p>
            <p style={{ fontSize: "14px" }}>Try a different search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
