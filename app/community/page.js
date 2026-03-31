"use client";
import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Search, ExternalLink, Users, MessageCircle, Globe, MapPin, ChevronLeft, ChevronRight, Plus, Calendar, List, Clock, Filter } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import ScrollingChips from "@/components/ScrollingChips";
import ListingCard from "@/components/ListingCard";

const ff = FONTS.heading;
const fb = FONTS.body;
const SAFFRON = "#E8A317";
const PAGE_SIZE = 20;

const TABS = [
  { id: "orgs", label: "Organizations", icon: "\u{1F465}" },
  { id: "whatsapp", label: "WhatsApp Groups", icon: "\u{1F4AC}" },
  { id: "events", label: "Local Events", icon: "\u{1F389}" },
];

const LANGUAGE_OPTIONS = ["All", "Telugu", "Tamil", "Gujarati", "Marathi", "Malayalam", "Kannada", "Bengali", "Punjabi", "Hindi", "Urdu", "Multi"];
const TYPE_OPTIONS = ["All", "Cultural Association", "Professional Network", "Religious/Spiritual", "Service/Charity", "Sports/Recreation", "Student Organization", "Seniors Group", "Women's Group"];

const CHIPS = [
  { emoji: "\u{1F465}", text: "Telugu associations Detroit" },
  { emoji: "\u{1F389}", text: "desi events this weekend" },
  { emoji: "\u{1F4AC}", text: "WhatsApp groups for new arrivals" },
  { emoji: "\u{1F6D5}", text: "Tamil Sangam Michigan" },
  { emoji: "\u{1F483}", text: "garba night Metro Detroit" },
  { emoji: "\u{1F465}", text: "Indian American organizations" },
  { emoji: "\u{1F386}", text: "Diwali celebrations 2026" },
  { emoji: "\u{1F4AC}", text: "desi parents WhatsApp group" },
  { emoji: "\u{1F3A4}", text: "comedy shows near me" },
  { emoji: "\u{1F465}", text: "Bengali association Metro Detroit" },
];

const TYPE_COLORS = { Cultural: "#E8832A", Festival: "#E8832A", Religious: "#8B1A2B", Concert: "#6A1B9A", Comedy: "#6A1B9A", Entertainment: "#6A1B9A", Sports: "#2E7D32", Food: "#795548", Music: "#1565C0", Family: "#C2185B", Garba: "#E8832A" };

function tryParseDate(d) { if (!d) return null; const iso = new Date(d + "T00:00:00"); return isNaN(iso.getTime()) ? null : iso; }
function formatDateLong(d) { const p = tryParseDate(d); return p ? p.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }) : d || ""; }
function getDaysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDayOfMonth(y, m) { return new Date(y, m, 1).getDay(); }

const selectStyle = {
  padding: "8px 12px", borderRadius: "10px", border: "1px solid #EDE6DE",
  fontSize: "13px", fontFamily: FONTS.body, color: "#5A4A3F", background: "white",
  cursor: "pointer", outline: "none", minWidth: "140px",
};

export default function CommunityPage() {
  return <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFFBF5" }}><p style={{ fontFamily: ff, color: COLORS.textMuted }}>Loading...</p></div>}><CommunityInner /></Suspense>;
}

function CommunityInner() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "orgs";
  const [tab, setTab] = useState(initialTab);
  const [orgs, setOrgs] = useState(null);
  const [events, setEvents] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("calendar");
  const [selectedDay, setSelectedDay] = useState(null);
  const [filterLang, setFilterLang] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [filterCity, setFilterCity] = useState("All");
  const [sortBy, setSortBy] = useState("active");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [orgEventCounts, setOrgEventCounts] = useState({});
  const now = new Date();
  const [calMonth, setCalMonth] = useState(now.getMonth());
  const [calYear, setCalYear] = useState(now.getFullYear());

  useEffect(() => {
    Promise.all([
      supabase.from("community_networking").select("*").order("name"),
      supabase.from("events").select("*").eq("status", "approved").order("event_date"),
      supabase.from("community_events").select("org_id, id").gte("event_date", new Date().toISOString().split("T")[0]),
    ]).then(([o, e, ce]) => {
      const counts = {};
      (ce.data || []).forEach(ev => { counts[ev.org_id] = (counts[ev.org_id] || 0) + 1; });
      setOrgEventCounts(counts);
      setOrgs(o.data || []);
      setEvents(e.data || []);
    });
  }, []);

  const triggerChat = (q) => { window.dispatchEvent(new CustomEvent("askadda", { detail: q })); };

  // Derive unique cities from orgs data
  const cityOptions = useMemo(() => {
    if (!orgs) return ["All"];
    const cities = [...new Set(orgs.map(o => o.city).filter(Boolean))].sort();
    return ["All", ...cities];
  }, [orgs]);

  if (!orgs || !events) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFFBF5" }}><p style={{ fontFamily: ff, color: COLORS.textMuted }}>Loading...</p></div>;

  const weightedScore = (o) => (o.rating || 0) * Math.log((o.reviews || 0) + 2);
  const filteredOrgs = orgs.filter(o => {
    if (filterLang !== "All" && o.language !== filterLang) return false;
    if (filterType !== "All" && o.org_type !== filterType) return false;
    if (filterCity !== "All" && o.city !== filterCity) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return o.name?.toLowerCase().includes(q) || o.description?.toLowerCase().includes(q) || o.city?.toLowerCase().includes(q) || o.subcategories?.some(s => s.toLowerCase().includes(q));
  }).sort((a, b) => {
    if (sortBy === "active") {
      const aEv = orgEventCounts[a.id] || 0;
      const bEv = orgEventCounts[b.id] || 0;
      if (bEv !== aEv) return bEv - aEv;
      return weightedScore(b) - weightedScore(a);
    }
    if (sortBy === "rating") return weightedScore(b) - weightedScore(a);
    if (sortBy === "reviews") return (b.reviews || 0) - (a.reviews || 0);
    return (a.name || "").localeCompare(b.name || "");
  });

  const visibleOrgs = filteredOrgs.slice(0, visibleCount);
  const hasMore = visibleCount < filteredOrgs.length;

  // Reset pagination when filters change
  const resetPagination = () => setVisibleCount(PAGE_SIZE);

  // Calendar logic
  const eventsByDate = {};
  for (const ev of events) { const p = tryParseDate(ev.event_date); if (p) { const k = `${p.getFullYear()}-${p.getMonth()}-${p.getDate()}`; if (!eventsByDate[k]) eventsByDate[k] = []; eventsByDate[k].push(ev); } }
  const prevMonth = () => { if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); } else setCalMonth(calMonth - 1); setSelectedDay(null); };
  const nextMonth = () => { if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); } else setCalMonth(calMonth + 1); setSelectedDay(null); };
  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);
  const today = now.getDate(); const isCurrentMonth = calMonth === now.getMonth() && calYear === now.getFullYear();
  const monthName = new Date(calYear, calMonth).toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const selectedEvents = selectedDay ? (eventsByDate[`${calYear}-${calMonth}-${selectedDay}`] || []) : [];
  const groupedByMonth = {};
  for (const ev of events) { const p = tryParseDate(ev.event_date); const k = p ? p.toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "Upcoming"; if (!groupedByMonth[k]) groupedByMonth[k] = []; groupedByMonth[k].push(ev); }

  const toggleStyle = (active) => ({ padding: "6px 14px", borderRadius: "8px", fontSize: "12px", fontFamily: fb, fontWeight: 600, cursor: "pointer", border: "none", background: active ? SAFFRON : "transparent", color: active ? "white" : "#5A4A3F", display: "flex", alignItems: "center", gap: "5px", transition: "all 0.2s" });

  return (
    <div style={{ background: "#FFFBF5", minHeight: "100vh" }}>
      {/* HERO */}
      <section style={{
        background: "linear-gradient(135deg, #1B3A26 0%, #2D5A3E 40%, #3E7A52 100%)",
        minHeight: "300px", padding: "40px 20px 36px", textAlign: "center",
        position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ position: "absolute", top: "10%", left: "6%", fontSize: "40px", opacity: 0.06 }}>{"\u{1F465}"}</div>
        <div style={{ position: "absolute", top: "20%", right: "8%", fontSize: "50px", opacity: 0.05 }}>{"\u{1F389}"}</div>
        <div style={{ position: "absolute", bottom: "15%", left: "12%", fontSize: "44px", opacity: 0.05 }}>{"\u{1F4AC}"}</div>
        <div style={{ position: "absolute", bottom: "8%", right: "20%", fontSize: "36px", opacity: 0.04 }}>{"\u{1F91D}"}</div>
        <div style={{ position: "absolute", top: "55%", left: "3%", fontSize: "38px", opacity: 0.04 }}>{"\u{1F3AD}"}</div>

        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
          {/* Tab Toggle */}
          <div style={{ display: "flex", gap: "4px", justifyContent: "center", marginBottom: "20px", flexWrap: "wrap" }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                padding: "10px 22px", borderRadius: "999px", fontSize: "14px", fontFamily: ff, fontWeight: 700, cursor: "pointer",
                background: tab === t.id ? SAFFRON : "rgba(255,255,255,0.1)",
                color: tab === t.id ? "#1B3A26" : "rgba(255,255,255,0.6)",
                border: tab === t.id ? `2px solid ${SAFFRON}` : "2px solid rgba(255,255,255,0.2)",
                transition: "all 0.3s", display: "flex", alignItems: "center", gap: "6px",
              }}>{t.icon} {t.label}</button>
            ))}
          </div>

          <h1 style={{ fontFamily: ff, fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: "white", lineHeight: 1.1, margin: "0 0 8px" }}>
            Community <span style={{ color: SAFFRON, fontStyle: "italic" }}>& Events</span>
          </h1>
          <p style={{ fontFamily: ff, fontSize: "clamp(14px, 2vw, 18px)", fontWeight: 300, color: "rgba(255,255,255,0.6)", margin: "0 0 24px", fontStyle: "italic" }}>
            {tab === "orgs" ? "Cultural associations & organizations in Metro Detroit" : tab === "whatsapp" ? "Connect with your community on WhatsApp" : "Everything happening in Detroit's desi community"}
          </p>

          {/* Search bar — chatbot for orgs, plain search for events */}
          <form onSubmit={e => { e.preventDefault(); if (searchQuery.trim()) triggerChat(searchQuery); }} style={{ maxWidth: "560px", margin: "0 auto", position: "relative" }}>
            <Search size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#A89888" }} />
            <input value={searchQuery} onChange={e => { setSearchQuery(e.target.value); resetPagination(); }} placeholder={tab === "events" ? "Search events..." : tab === "whatsapp" ? "Find a WhatsApp group..." : "Find a community organization..."}
              style={{ width: "100%", padding: "14px 150px 14px 44px", borderRadius: "14px", border: "none", fontSize: "15px", fontFamily: fb, background: "white", boxShadow: "0 6px 24px rgba(0,0,0,0.2)", boxSizing: "border-box", outline: "none" }} />
            <button type="submit" style={{ position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)", background: SAFFRON, color: "white", border: "none", borderRadius: "10px", padding: "10px 20px", fontFamily: fb, fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>Ask Adda {"\u2728"}</button>
          </form>
          <div style={{ maxWidth: "600px", margin: "14px auto 0" }}>
            <ScrollingChips chips={CHIPS} onChipClick={(chip) => triggerChat(`${chip.emoji} ${chip.text}`)} variant="light" />
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "30px 20px" }}>

        {/* ═══ ORGANIZATIONS TAB ═══ */}
        {tab === "orgs" && (
          <>
            {/* Filter dropdowns */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "16px", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#5A4A3F", fontWeight: 600 }}>
                <Filter size={14} /> Filters:
              </div>
              <select value={filterLang} onChange={e => { setFilterLang(e.target.value); resetPagination(); }} style={selectStyle}>
                {LANGUAGE_OPTIONS.map(l => <option key={l} value={l}>{l === "All" ? "All Languages" : l}</option>)}
              </select>
              <select value={filterType} onChange={e => { setFilterType(e.target.value); resetPagination(); }} style={selectStyle}>
                {TYPE_OPTIONS.map(t => <option key={t} value={t}>{t === "All" ? "All Types" : t}</option>)}
              </select>
              <select value={filterCity} onChange={e => { setFilterCity(e.target.value); resetPagination(); }} style={selectStyle}>
                {cityOptions.map(c => <option key={c} value={c}>{c === "All" ? "All Cities" : c}</option>)}
              </select>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={selectStyle}>
                <option value="active">Most Active</option>
                <option value="rating">Top Rated</option>
                <option value="reviews">Most Reviewed</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>

            <p style={{ fontSize: "13px", color: COLORS.textFaint, marginBottom: "16px" }}>
              {filteredOrgs.length} organization{filteredOrgs.length !== 1 ? "s" : ""}
              {visibleCount < filteredOrgs.length ? ` (showing ${visibleCount})` : ""}
            </p>

            <div style={{ display: "grid", gap: "14px" }}>
              {visibleOrgs.map(org => (
                <Link key={org.id} href={`/community/${org.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div style={{ background: "white", borderRadius: "14px", padding: "20px 24px", border: "1px solid #EDE6DE", transition: "box-shadow 0.2s", cursor: "pointer" }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.05)"; e.currentTarget.style.transform = "scale(1.01)"; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "scale(1)"; }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
                      {org.logo_url && (
                        <img src={org.logo_url} alt="" style={{ width: "40px", height: "40px", borderRadius: "10px", objectFit: "cover", border: "1px solid #EDE6DE", flexShrink: 0 }} />
                      )}
                      <h3 style={{ fontFamily: ff, fontSize: "17px", fontWeight: 700, margin: 0, color: "#2D2420" }}>{org.name}</h3>
                    </div>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "8px" }}>
                      {org.language && <span style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "10px", fontWeight: 600, background: "#FFF3E0", color: SAFFRON }}>{org.language}</span>}
                      {org.org_type && <span style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "10px", fontWeight: 600, background: "#E8F5E9", color: "#2E7D32" }}>{org.org_type}</span>}
                    </div>
                    {org.city && <p style={{ fontSize: "12px", color: COLORS.textMuted, margin: "0 0 4px", display: "flex", alignItems: "center", gap: "4px" }}><MapPin size={11} /> {org.city}</p>}
                    {org.description && <p style={{ fontSize: "13px", color: "#6B5B4F", margin: "6px 0 0", lineHeight: 1.5, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{org.description}</p>}
                  </div>
                </Link>
              ))}
              {filteredOrgs.length === 0 && <div style={{ textAlign: "center", padding: "60px 20px", color: "#8A7968" }}><p style={{ fontFamily: ff, fontSize: "18px" }}>No organizations found</p></div>}
            </div>

            {/* Load More */}
            {hasMore && (
              <div style={{ textAlign: "center", marginTop: "24px" }}>
                <button
                  onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
                  style={{
                    padding: "12px 32px", borderRadius: "12px", border: `2px solid ${SAFFRON}`,
                    background: "transparent", color: SAFFRON, fontFamily: ff, fontWeight: 700,
                    fontSize: "14px", cursor: "pointer", transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = SAFFRON; e.currentTarget.style.color = "white"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = SAFFRON; }}
                >
                  Load More ({filteredOrgs.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        )}

        {/* ═══ WHATSAPP TAB ═══ */}
        {tab === "whatsapp" && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: "56px", marginBottom: "16px" }}>{"\u{1F4AC}"}</div>
            <h2 style={{ fontFamily: ff, fontSize: "24px", fontWeight: 700, margin: "0 0 8px", color: "#2D2420" }}>WhatsApp Groups — Coming Soon</h2>
            <p style={{ fontSize: "14px", color: COLORS.textMuted, maxWidth: "400px", margin: "0 auto", lineHeight: 1.6 }}>
              We&apos;re compiling the best desi WhatsApp groups in Metro Detroit — new arrivals, parents, professionals, language-specific, and more.
            </p>
          </div>
        )}

        {/* ═══ LOCAL EVENTS TAB ═══ */}
        {tab === "events" && (
          <>
            {/* View toggle + Submit */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
              <div style={{ display: "flex", gap: "4px", background: "white", padding: "4px", borderRadius: "12px", border: "1px solid #EDE6DE" }}>
                <button onClick={() => setViewMode("calendar")} style={toggleStyle(viewMode === "calendar")}><Calendar size={14} /> Calendar</button>
                <button onClick={() => setViewMode("list")} style={toggleStyle(viewMode === "list")}><List size={14} /> List</button>
              </div>
              <Link href="/events/submit" style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "8px 16px", borderRadius: "10px", background: COLORS.primary, color: "white", fontFamily: fb, fontWeight: 600, fontSize: "13px", textDecoration: "none" }}><Plus size={14} /> Submit Event</Link>
            </div>

            {viewMode === "calendar" ? (
              <>
                {/* Calendar */}
                <div style={{ background: "white", borderRadius: "16px", border: "1px solid #EDE6DE", overflow: "hidden" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #EDE6DE" }}>
                    <button onClick={prevMonth} style={{ background: "none", border: "none", cursor: "pointer", padding: "6px" }}><ChevronLeft size={20} color="#5A4A3F" /></button>
                    <h3 style={{ fontFamily: ff, fontSize: "18px", fontWeight: 700, margin: 0 }}>{monthName}</h3>
                    <button onClick={nextMonth} style={{ background: "none", border: "none", cursor: "pointer", padding: "6px" }}><ChevronRight size={20} color="#5A4A3F" /></button>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center" }}>
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => <div key={d} style={{ padding: "10px 0", fontSize: "11px", fontWeight: 700, color: "#8A7968", fontFamily: fb }}>{d}</div>)}
                    {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1;
                      const key = `${calYear}-${calMonth}-${day}`;
                      const hasEvents = !!eventsByDate[key];
                      const isToday = isCurrentMonth && day === today;
                      const isSelected = selectedDay === day;
                      return (
                        <button key={day} onClick={() => setSelectedDay(isSelected ? null : day)} style={{
                          padding: "8px 0", fontSize: "14px", fontFamily: fb, fontWeight: isToday ? 700 : 500,
                          background: isSelected ? SAFFRON : isToday ? "#FFF3E0" : "transparent",
                          color: isSelected ? "white" : isToday ? SAFFRON : "#2D2420",
                          border: "none", cursor: "pointer", borderRadius: "8px", margin: "2px",
                          position: "relative",
                        }}>
                          {day}
                          {hasEvents && <div style={{ position: "absolute", bottom: "4px", left: "50%", transform: "translateX(-50%)", width: "5px", height: "5px", borderRadius: "50%", background: isSelected ? "white" : SAFFRON }} />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selected day events */}
                {selectedDay && (
                  <div style={{ marginTop: "20px" }}>
                    <h3 style={{ fontFamily: ff, fontSize: "16px", fontWeight: 700, marginBottom: "12px" }}>
                      {new Date(calYear, calMonth, selectedDay).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                    </h3>
                    {selectedEvents.length > 0 ? selectedEvents.map(ev => <EventCard key={ev.id} ev={ev} />) : <p style={{ fontSize: "14px", color: "#8A7968" }}>No events on this day.</p>}
                  </div>
                )}
              </>
            ) : (
              /* List view */
              <div>
                {Object.entries(groupedByMonth).map(([month, evts]) => (
                  <div key={month} style={{ marginBottom: "32px" }}>
                    <h3 style={{ fontFamily: ff, fontSize: "18px", fontWeight: 700, marginBottom: "12px", color: "#2D2420" }}>{month}</h3>
                    <div style={{ display: "grid", gap: "12px" }}>
                      {evts.map(ev => <EventCard key={ev.id} ev={ev} />)}
                    </div>
                  </div>
                ))}
                {events.length === 0 && <div style={{ textAlign: "center", padding: "60px 20px", color: "#8A7968" }}><p style={{ fontFamily: ff, fontSize: "18px" }}>No upcoming events</p></div>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function EventCard({ ev }) {
  const d = tryParseDate(ev.event_date);
  const dateStr = d ? d.toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "";
  const typeColor = TYPE_COLORS[ev.event_type] || "#8A7968";
  return (
    <div style={{ background: "white", borderRadius: "14px", padding: "18px 22px", border: "1px solid #EDE6DE", borderLeft: `4px solid ${typeColor}`, transition: "box-shadow 0.2s" }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.05)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
      <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
        {dateStr && <div style={{ padding: "8px 12px", borderRadius: "10px", background: "#FFF3E0", fontFamily: FONTS.heading, fontSize: "13px", fontWeight: 700, color: "#E8A317", textAlign: "center", lineHeight: 1.2, flexShrink: 0 }}>{dateStr}</div>}
        <div style={{ flex: 1 }}>
          <h4 style={{ fontFamily: FONTS.heading, fontSize: "16px", fontWeight: 700, margin: "0 0 4px", color: "#2D2420" }}>{ev.name}</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", fontSize: "12px", color: "#8A7968", marginBottom: "4px" }}>
            {ev.event_type && <span style={{ padding: "2px 8px", borderRadius: "999px", fontSize: "10px", fontWeight: 600, background: `${typeColor}15`, color: typeColor }}>{ev.event_type}</span>}
            {ev.venue && <span style={{ display: "flex", alignItems: "center", gap: "3px" }}><MapPin size={11} /> {ev.venue}</span>}
            {ev.time && <span style={{ display: "flex", alignItems: "center", gap: "3px" }}><Clock size={11} /> {ev.time}</span>}
          </div>
          {ev.description && <p style={{ fontSize: "13px", color: "#6B5B4F", margin: "4px 0 0", lineHeight: 1.5 }}>{ev.description?.substring(0, 150)}{ev.description?.length > 150 ? "..." : ""}</p>}
          {ev.url && <a href={ev.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", color: COLORS.primary, fontWeight: 600, marginTop: "6px", textDecoration: "none" }}>More Info <ExternalLink size={10} /></a>}
        </div>
      </div>
    </div>
  );
}
