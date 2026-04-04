"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Globe, Phone, Calendar, Clock, ExternalLink, ChevronDown } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import ListingCard from "@/components/ListingCard";


const ff = FONTS.body;
const fb = FONTS.body;
const SAFFRON = COLORS.accent;

const RELIGION_FILTERS = ["All", "Hindu", "Christian", "Sikh", "Jain", "Buddhist", "Islamic"];
const CHRISTIAN_DENOMS = ["All", "Syrian Orthodox", "Syro-Malabar", "Mar Thoma", "CSI", "Pentecostal", "Catholic", "Protestant", "Non-denominational"];
const LANGUAGE_FILTERS = ["All", "Malayalam", "Tamil", "Telugu", "Hindi", "Punjabi", "Gujarati", "Bengali", "Multi"];
const SERVICE_FILTERS = ["All", "Temples/Churches/Mosques", "Pandit/Priest Services", "Astrology/Vastu"];


const SORT_OPTIONS = [
  { value: "active", label: "Most Active" },
  { value: "rating", label: "Top Rated" },
  { value: "reviews", label: "Most Reviewed" },
  { value: "name", label: "Name A-Z" },
];

export default function TemplesPage() {
  const [temples, setTemples] = useState(null);
  const [events, setEvents] = useState([]);
  const [religionFilter, setReligionFilter] = useState("All");
  const [denomFilter, setDenomFilter] = useState("All");
  const [langFilter, setLangFilter] = useState("All");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [city, setCity] = useState("All");
  const [sortBy, setSortBy] = useState("active");
  const [eventCounts, setEventCounts] = useState({});

  useEffect(() => {
    Promise.all([
      supabase.from("temples").select("*").order("name"),
      supabase.from("events").select("*").eq("status", "approved").order("event_date"),
      supabase.from("temple_events").select("temple_id, id").gte("event_date", new Date().toISOString().split("T")[0]),
    ]).then(([t, e, te]) => {
      // Count events per temple
      const counts = {};
      (te.data || []).forEach(ev => { counts[ev.temple_id] = (counts[ev.temple_id] || 0) + 1; });
      setEventCounts(counts);
      setTemples(t.data || []);
      setEvents(e.data || []);
    });
  }, []);

  if (!temples) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F2EB" }}>
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
      christian: ["christian", "church", "orthodox", "catholic", "mar thoma", "syro", "csi", "pentecostal", "protestant"],
      sikh: ["sikh", "gurudwara", "gurdwara"],
      islamic: ["muslim", "mosque", "masjid", "islamic", "islam"],
      jain: ["jain"],
      buddhist: ["buddhist", "vihara"],
    };
    const terms = aliases[religionFilter.toLowerCase()] || [religionFilter.toLowerCase()];
    filtered = filtered.filter(t => {
      const text = `${t.name || ""} ${t.description || ""} ${(t.subcategories || []).join(" ")}`.toLowerCase();
      return terms.some(term => text.includes(term));
    });
  }

  // Christian denomination sub-filter
  if (religionFilter === "Christian" && denomFilter !== "All") {
    filtered = filtered.filter(t => {
      const text = `${t.name || ""} ${t.description || ""} ${(t.subcategories || []).join(" ")}`.toLowerCase();
      return text.includes(denomFilter.toLowerCase());
    });
  }

  // Language filter
  if (langFilter !== "All") {
    filtered = filtered.filter(t => {
      const text = `${t.name || ""} ${t.description || ""} ${(t.subcategories || []).join(" ")}`.toLowerCase();
      return text.includes(langFilter.toLowerCase());
    });
  }

  // Service type filter
  if (serviceFilter !== "All") {
    const aliases = {
      "temples/churches/mosques": ["temple", "mandir", "mosque", "masjid", "gurudwara", "church", "orthodox", "catholic", "pentecostal"],
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
  const weightedScore = (t) => (t.rating || 0) * Math.log((t.reviews || 0) + 2);
  if (sortBy === "active") {
    filtered = [...filtered].sort((a, b) => {
      const aEvents = eventCounts[a.id] || 0;
      const bEvents = eventCounts[b.id] || 0;
      if (bEvents !== aEvents) return bEvents - aEvents;
      return weightedScore(b) - weightedScore(a);
    });
  } else if (sortBy === "rating") {
    filtered = [...filtered].sort((a, b) => weightedScore(b) - weightedScore(a));
  } else if (sortBy === "reviews") {
    filtered = [...filtered].sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
  } else if (sortBy === "name") {
    filtered = [...filtered].sort((a, b) => (a.name || "").localeCompare(b.name || ""));
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


  return (
    <div style={{ background: "#F5F2EB", minHeight: "100vh" }}>
      {/* PAGE HEADER */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 20px 16px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#1A1A1A", margin: "0 0 4px" }}>Worship & Spiritual</h1>
        <p style={{ fontSize: "14px", color: "#6B6B6B", margin: "0 0 16px" }}>{filtered.length} temples, gurudwaras, mosques & spiritual services</p>

        {/* Religion filters */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "8px" }}>
          {RELIGION_FILTERS.map(d => (
            <button key={d} onClick={() => { setReligionFilter(d); if (d !== "Christian") setDenomFilter("All"); }} style={{
              padding: "6px 14px", borderRadius: "999px", fontSize: "13px", fontFamily: fb, fontWeight: 600, cursor: "pointer",
              border: religionFilter === d ? "2px solid #C4943D" : "2px solid #E2DFD8",
              background: religionFilter === d ? "#C4943D" : "white",
              color: religionFilter === d ? "#1A1A1A" : "#6B6B6B", transition: "all 0.2s",
            }}>{d}</button>
          ))}
        </div>
        {religionFilter === "Christian" && (
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {CHRISTIAN_DENOMS.map(d => (
              <button key={d} onClick={() => setDenomFilter(d)} style={{
                padding: "5px 12px", borderRadius: "999px", fontSize: "11px", fontFamily: fb, fontWeight: 500, cursor: "pointer",
                border: denomFilter === d ? "2px solid #2D5A3D" : "2px solid #E2DFD8",
                background: denomFilter === d ? "#2D5A3D10" : "white",
                color: denomFilter === d ? "#2D5A3D" : "#999999", transition: "all 0.2s",
              }}>{d}</button>
            ))}
          </div>
        )}
      </div>

      {/* TEMPLE LISTINGS */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "36px 20px" }}>
        {/* Controls row: city dropdown + sort */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "16px", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontSize: "13px", color: COLORS.textFaint, margin: 0 }}>{filtered.length} temples found</p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <div style={{ position: "relative" }}>
              <select value={langFilter} onChange={e => setLangFilter(e.target.value)}
                style={{ appearance: "none", padding: "8px 32px 8px 12px", borderRadius: "10px", border: "1px solid #E2DFD8", background: "white", fontSize: "13px", fontFamily: fb, color: "#1A1A1A", cursor: "pointer", outline: "none" }}>
                {LANGUAGE_FILTERS.map(l => <option key={l} value={l}>{l === "All" ? "All Languages" : l}</option>)}
              </select>
              <ChevronDown size={14} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#6B6B6B" }} />
            </div>
            <div style={{ position: "relative" }}>
              <select value={serviceFilter} onChange={e => setServiceFilter(e.target.value)}
                style={{ appearance: "none", padding: "8px 32px 8px 12px", borderRadius: "10px", border: "1px solid #E2DFD8", background: "white", fontSize: "13px", fontFamily: fb, color: "#1A1A1A", cursor: "pointer", outline: "none" }}>
                {SERVICE_FILTERS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown size={14} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#6B6B6B" }} />
            </div>
            <div style={{ position: "relative" }}>
              <select
                value={city}
                onChange={e => setCity(e.target.value)}
                style={{
                  appearance: "none", padding: "8px 32px 8px 12px", borderRadius: "10px",
                  border: "1px solid #E2DFD8", background: "white", fontSize: "13px",
                  fontFamily: fb, color: "#1A1A1A", cursor: "pointer", outline: "none",
                }}
              >
                {cities.map(c => <option key={c} value={c}>{c === "All" ? "All Cities" : c}</option>)}
              </select>
              <ChevronDown size={14} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#6B6B6B" }} />
            </div>
            <div style={{ position: "relative" }}>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{
                  appearance: "none", padding: "8px 32px 8px 12px", borderRadius: "10px",
                  border: "1px solid #E2DFD8", background: "white", fontSize: "13px",
                  fontFamily: fb, color: "#1A1A1A", cursor: "pointer", outline: "none",
                }}
              >
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ChevronDown size={14} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#6B6B6B" }} />
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
                      background: "#F5F2EB", padding: "14px 24px",
                      border: "1px solid #E2DFD8", borderTop: "none",
                      borderRadius: "0 0 10px 10px", marginTop: "-8px",
                    }}>
                      <h4 style={{ fontFamily: ff, fontSize: "13px", fontWeight: 700, color: "#6B6B6B", margin: "0 0 10px", display: "flex", alignItems: "center", gap: "6px" }}>
                        <Calendar size={13} /> Upcoming Events
                      </h4>
                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        {templeEvents.map(ev => {
                          const d = ev.event_date ? new Date(ev.event_date + "T00:00:00") : null;
                          const dateStr = d ? d.toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "";
                          return (
                            <div key={ev.id} style={{
                              padding: "10px 14px", borderRadius: "10px", background: "white",
                              border: "1px solid #E2DFD8", flex: "1 1 200px", maxWidth: "300px",
                            }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                                {dateStr && <span style={{ padding: "2px 8px", borderRadius: "999px", fontSize: "10px", fontWeight: 700, background: SAFFRON, color: "white" }}>{dateStr}</span>}
                                {ev.event_type && <span style={{ fontSize: "10px", fontWeight: 600, color: "#6B6B6B" }}>{ev.event_type}</span>}
                              </div>
                              <p style={{ fontFamily: fb, fontSize: "13px", fontWeight: 600, color: "#1A1A1A", margin: 0, lineHeight: 1.3 }}>{ev.name}</p>
                              {ev.time && <p style={{ fontSize: "11px", color: "#6B6B6B", margin: "3px 0 0", display: "flex", alignItems: "center", gap: "4px" }}><Clock size={10} /> {ev.time}</p>}
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
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#6B6B6B" }}>
            <p style={{ fontFamily: ff, fontSize: "20px" }}>No temples found</p>
            <p style={{ fontSize: "14px" }}>Try a different search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
