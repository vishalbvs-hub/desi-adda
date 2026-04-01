"use client";
import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Search, ExternalLink, Users, MessageCircle, Globe, MapPin, Plus, Clock, Filter, CheckCircle } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import ScrollingChips from "@/components/ScrollingChips";
import ListingCard from "@/components/ListingCard";

const fb = FONTS.body;
const PAGE_SIZE = 20;

const TABS = [
  { id: "events", label: "Events", icon: "\u{1F389}" },
  { id: "orgs", label: "Organizations", icon: "\u{1F465}" },
  { id: "groups", label: "Groups", icon: "\u{1F4AC}" },
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

// Groups constants
const GROUP_CATEGORIES = [
  { value: "all", label: "All" },
  { value: "Housing & Roommates", label: "Housing & Roommates" },
  { value: "Jobs & Careers", label: "Jobs & Careers" },
  { value: "Buy/Sell/Trade", label: "Buy/Sell/Trade" },
  { value: "Social & Networking", label: "Social & Networking" },
  { value: "Parents & Families", label: "Parents & Families" },
  { value: "Language-Specific", label: "Language-Specific" },
  { value: "Students", label: "Students" },
];

const PLATFORMS = ["All", "facebook", "whatsapp", "telegram", "meetup", "discord", "other"];
const PLATFORM_LABELS = { facebook: "Facebook", whatsapp: "WhatsApp", telegram: "Telegram", meetup: "Meetup", discord: "Discord", other: "Website / Other" };
const GROUP_LANG_FILTER = ["All", "Telugu", "Hindi", "Tamil", "Gujarati", "Marathi", "Malayalam", "Kannada", "Bengali", "Punjabi", "Urdu", "Multi"];

const PLATFORM_STYLES = {
  facebook: { color: "#1877F2", bg: "#E7F0FD", icon: "\uD83D\uDC65", border: "#1877F2" },
  whatsapp: { color: "#25D366", bg: "#E8F8EE", icon: "\uD83D\uDCAC", border: "#25D366" },
  telegram: { color: "#0088CC", bg: "#E3F2FD", icon: "\u2708\uFE0F", border: "#0088CC" },
  meetup:   { color: "#ED1C40", bg: "#FDE8EC", icon: "\uD83E\uDD1D", border: "#ED1C40" },
  discord:  { color: "#5865F2", bg: "#EDEEFE", icon: "\uD83C\uDFAE", border: "#5865F2" },
  other:    { color: "#6B6B6B", bg: "#F5F2EB", icon: "\uD83C\uDF10", border: "#6B6B6B" },
};

const CAT_COLORS = {
  "Housing & Roommates": { bg: "#E8F5E9", color: "#2E7D32" },
  "Jobs & Careers":      { bg: "#E3F2FD", color: "#1565C0" },
  "Buy/Sell/Trade":      { bg: "#FFF3E0", color: "#E65100" },
  "Social & Networking": { bg: "#F3E5F5", color: "#7B1FA2" },
  "Parents & Families":  { bg: "#FCE4EC", color: "#2D5A3D" },
  "Language-Specific":   { bg: "#FFF8E1", color: "#F57F17" },
  "Students":            { bg: "#E0F7FA", color: "#00838F" },
};

function ctaLabel(platform) {
  if (platform === "facebook") return "View on Facebook";
  if (platform === "other") return "Visit site";
  return "Join";
}

function platformLabel(p) {
  return PLATFORM_LABELS[p] || p;
}

const selectStyle = {
  padding: "8px 12px", borderRadius: "10px", border: `1px solid ${COLORS.border}`,
  fontSize: "13px", fontFamily: FONTS.body, color: "#1A1A1A", background: "white",
  cursor: "pointer", outline: "none", minWidth: "140px",
};

export default function CommunityPage() {
  return <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: COLORS.bg }}><p style={{ fontFamily: fb, color: COLORS.textMuted }}>Loading...</p></div>}><CommunityInner /></Suspense>;
}

function CommunityInner() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "events";
  const [tab, setTab] = useState(initialTab);
  const [orgs, setOrgs] = useState(null);
  const [events, setEvents] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLang, setFilterLang] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [filterCity, setFilterCity] = useState("All");
  const [sortBy, setSortBy] = useState("active");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [orgEventCounts, setOrgEventCounts] = useState({});
  const [unifiedEvents, setUnifiedEvents] = useState([]);
  const [eventFilter, setEventFilter] = useState("90days");
  const [eventTypeFilter, setEventTypeFilter] = useState("all");
  const now = new Date();

  // Groups state
  const [groups, setGroups] = useState([]);
  const [groupCat, setGroupCat] = useState("all");
  const [groupPlatform, setGroupPlatform] = useState("All");
  const [groupLang, setGroupLang] = useState("All");
  const [showGroupForm, setShowGroupForm] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    Promise.all([
      supabase.from("community_networking").select("*").order("name"),
      supabase.from("events").select("*").eq("status", "approved").order("event_date"),
      supabase.from("community_events").select("org_id, id").gte("event_date", today),
      supabase.from("temple_events").select("*, temples(id, name, slug)").gte("event_date", today).order("event_date"),
      supabase.from("community_events").select("*, community_networking(id, name, slug)").gte("event_date", today).order("event_date"),
      supabase.from("groups").select("*").eq("is_active", true).order("name"),
    ]).then(([o, e, ce, te, fullCe, gr]) => {
      const counts = {};
      (ce.data || []).forEach(ev => { counts[ev.org_id] = (counts[ev.org_id] || 0) + 1; });
      setOrgEventCounts(counts);
      setOrgs(o.data || []);
      setEvents(e.data || []);
      setGroups(gr.data || []);

      // Build unified events feed
      const unified = [];
      (te.data || []).forEach(ev => unified.push({
        ...ev, _type: "temple", _hostName: ev.temples?.name, _hostSlug: ev.temples?.slug ? `/temples/${ev.temples.slug}` : null,
      }));
      (fullCe.data || []).forEach(ev => unified.push({
        ...ev, _type: "community", _hostName: ev.community_networking?.name, _hostSlug: ev.community_networking?.slug ? `/community/${ev.community_networking.slug}` : null,
      }));
      unified.sort((a, b) => a.event_date.localeCompare(b.event_date));
      setUnifiedEvents(unified);
    });
  }, []);

  const triggerChat = (q) => { window.dispatchEvent(new CustomEvent("askadda", { detail: q })); };

  // Derive unique cities from orgs data
  const cityOptions = useMemo(() => {
    if (!orgs) return ["All"];
    const cities = [...new Set(orgs.map(o => o.city).filter(Boolean))].sort();
    return ["All", ...cities];
  }, [orgs]);

  // Groups filtering
  const filteredGroups = groups.filter(g => {
    if (groupCat !== "all" && g.category !== groupCat) return false;
    if (groupPlatform !== "All" && g.platform !== groupPlatform) return false;
    if (groupLang !== "All" && g.language !== groupLang) return false;
    return true;
  });

  const groupPillStyle = (active) => ({
    padding: "6px 14px", borderRadius: "999px", fontSize: "12px", fontFamily: fb, fontWeight: 600,
    cursor: "pointer", border: active ? `2px solid ${COLORS.accent}` : `2px solid ${COLORS.border}`,
    background: active ? COLORS.accent : "white", color: active ? COLORS.text : COLORS.textSecondary,
    transition: "all 0.2s", whiteSpace: "nowrap",
  });

  const groupSelectStyle = {
    padding: "6px 12px", borderRadius: "10px", border: `1px solid ${COLORS.border}`, fontSize: "12px",
    fontFamily: fb, color: COLORS.text, background: "white", cursor: "pointer",
  };

  if (!orgs || !events) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: COLORS.bg }}><p style={{ fontFamily: fb, color: COLORS.textMuted }}>Loading...</p></div>;

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


  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh" }}>
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
                padding: "10px 22px", borderRadius: "999px", fontSize: "14px", fontFamily: fb, fontWeight: 700, cursor: "pointer",
                background: tab === t.id ? COLORS.accent : "rgba(255,255,255,0.1)",
                color: tab === t.id ? "#1B3A26" : "rgba(255,255,255,0.6)",
                border: tab === t.id ? `2px solid ${COLORS.accent}` : "2px solid rgba(255,255,255,0.2)",
                transition: "all 0.3s", display: "flex", alignItems: "center", gap: "6px",
              }}>{t.icon} {t.label}</button>
            ))}
          </div>

          <h1 style={{ fontFamily: fb, fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: "white", lineHeight: 1.1, margin: "0 0 8px" }}>
            Community <span style={{ color: COLORS.accent, fontStyle: "italic" }}>& Events</span>
          </h1>
          <p style={{ fontFamily: fb, fontSize: "clamp(14px, 2vw, 18px)", fontWeight: 300, color: "rgba(255,255,255,0.6)", margin: "0 0 24px", fontStyle: "italic" }}>
            {tab === "orgs" ? "Cultural associations & organizations in Metro Detroit" : tab === "groups" ? "Connect with your community online" : "Everything happening in Detroit's desi community"}
          </p>

          {/* Search bar — chatbot for orgs, plain search for events */}
          <form onSubmit={e => { e.preventDefault(); if (searchQuery.trim()) triggerChat(searchQuery); }} style={{ maxWidth: "560px", margin: "0 auto", position: "relative" }}>
            <Search size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#A89888" }} />
            <input value={searchQuery} onChange={e => { setSearchQuery(e.target.value); resetPagination(); }} placeholder={tab === "events" ? "Search events..." : tab === "groups" ? "Find a group..." : "Find a community organization..."}
              style={{ width: "100%", padding: "14px 150px 14px 44px", borderRadius: "14px", border: "none", fontSize: "15px", fontFamily: fb, background: "white", boxShadow: "0 6px 24px rgba(0,0,0,0.2)", boxSizing: "border-box", outline: "none" }} />
            <button type="submit" style={{ position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)", background: COLORS.accent, color: "white", border: "none", borderRadius: "10px", padding: "10px 20px", fontFamily: fb, fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>Ask Adda {"\u2728"}</button>
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
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: COLORS.text, fontWeight: 600 }}>
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
                  <div style={{ background: COLORS.surface, borderRadius: "14px", padding: "20px 24px", border: `1px solid ${COLORS.border}`, transition: "box-shadow 0.2s", cursor: "pointer" }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.05)"; e.currentTarget.style.transform = "scale(1.01)"; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "scale(1)"; }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
                      {org.logo_url && (
                        <img src={org.logo_url} alt="" style={{ width: "40px", height: "40px", borderRadius: "10px", objectFit: "cover", border: `1px solid ${COLORS.border}`, flexShrink: 0 }} />
                      )}
                      <h3 style={{ fontFamily: fb, fontSize: "16px", fontWeight: 500, margin: 0, color: COLORS.text }}>{org.name}</h3>
                    </div>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "8px" }}>
                      {org.language && <span style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "10px", fontWeight: 600, background: "#FFF3E0", color: COLORS.accent }}>{org.language}</span>}
                      {org.org_type && <span style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "10px", fontWeight: 600, background: "#E8F5E9", color: "#2E7D32" }}>{org.org_type}</span>}
                    </div>
                    {org.city && <p style={{ fontSize: "12px", color: COLORS.textMuted, margin: "0 0 4px", display: "flex", alignItems: "center", gap: "4px" }}><MapPin size={11} /> {org.city}</p>}
                    {org.description && <p style={{ fontSize: "14px", color: COLORS.textSecondary, margin: "6px 0 0", lineHeight: 1.5, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{org.description}</p>}
                  </div>
                </Link>
              ))}
              {filteredOrgs.length === 0 && <div style={{ textAlign: "center", padding: "60px 20px", color: COLORS.textSecondary }}><p style={{ fontFamily: fb, fontSize: "20px", fontWeight: 600 }}>No organizations found</p></div>}
            </div>

            {/* Load More */}
            {hasMore && (
              <div style={{ textAlign: "center", marginTop: "24px" }}>
                <button
                  onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
                  style={{
                    padding: "12px 32px", borderRadius: "12px", border: `2px solid ${COLORS.accent}`,
                    background: "transparent", color: COLORS.accent, fontFamily: fb, fontWeight: 700,
                    fontSize: "14px", cursor: "pointer", transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = COLORS.accent; e.currentTarget.style.color = "white"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = COLORS.accent; }}
                >
                  Load More ({filteredOrgs.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        )}

        {/* ═══ GROUPS TAB ═══ */}
        {tab === "groups" && (
          <>
            {/* TOP CTA */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
              <p style={{ fontSize: "14px", color: COLORS.textSecondary, margin: 0, fontFamily: fb }}>
                <strong style={{ color: COLORS.text }}>{groups.length} groups</strong> and counting
              </p>
              <button onClick={() => { setShowGroupForm(!showGroupForm); if (!showGroupForm) setTimeout(() => document.getElementById("submit-group-form")?.scrollIntoView({ behavior: "smooth" }), 100); }} style={{
                padding: "8px 18px", borderRadius: "10px", background: COLORS.primary, color: "white",
                border: "none", fontFamily: fb, fontWeight: 600, fontSize: "13px", cursor: "pointer",
                display: "flex", alignItems: "center", gap: "6px",
              }}>
                <Plus size={14} /> Submit a Group
              </button>
            </div>

            {/* FILTERS */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px", alignItems: "center" }}>
              {GROUP_CATEGORIES.map(c => (
                <button key={c.value} onClick={() => setGroupCat(c.value)} style={groupPillStyle(groupCat === c.value)}>{c.label}</button>
              ))}
            </div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
              <select value={groupPlatform} onChange={e => setGroupPlatform(e.target.value)} style={groupSelectStyle}>
                <option value="All">Platform</option>
                {PLATFORMS.filter(p => p !== "All").map(p => <option key={p} value={p}>{platformLabel(p)}</option>)}
              </select>
              <select value={groupLang} onChange={e => setGroupLang(e.target.value)} style={groupSelectStyle}>
                {GROUP_LANG_FILTER.map(l => <option key={l} value={l}>{l === "All" ? "Language" : l}</option>)}
              </select>
            </div>

            {/* WhatsApp notice */}
            {(groupPlatform === "All" || groupPlatform === "whatsapp") && (
              <p style={{ fontSize: "11px", color: COLORS.textMuted, margin: "0 0 16px", fontStyle: "italic" }}>
                WhatsApp links may expire. If a link doesn&apos;t work, use the Submit form to let us know.
              </p>
            )}

            {/* GROUP LISTINGS */}
            <div style={{ display: "grid", gap: "12px" }}>
              {filteredGroups.map(g => {
                const ps = PLATFORM_STYLES[g.platform] || PLATFORM_STYLES.other;
                const cc = CAT_COLORS[g.category] || { bg: COLORS.bg, color: COLORS.textSecondary };
                const langVal = g.language || "Multi";

                return (
                  <div key={g.id} style={{
                    background: COLORS.surface, borderRadius: "14px", padding: "20px 22px",
                    border: `1px solid ${COLORS.border}`, borderLeft: `4px solid ${ps.border}`,
                    transition: "box-shadow 0.2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.05)"}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                  >
                    <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                      {/* Platform icon */}
                      <div style={{
                        width: "44px", height: "44px", borderRadius: "12px", background: ps.bg,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "22px", flexShrink: 0,
                      }}>
                        {ps.icon}
                      </div>

                      {/* Content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        {/* Badges */}
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px", flexWrap: "wrap" }}>
                          <span style={{ padding: "2px 8px", borderRadius: "999px", fontSize: "10px", fontWeight: 700, background: ps.bg, color: ps.color }}>{platformLabel(g.platform)}</span>
                          <span style={{ padding: "2px 8px", borderRadius: "999px", fontSize: "10px", fontWeight: 600, background: cc.bg, color: cc.color }}>{g.category}</span>
                          {langVal !== "Multi" && (
                            <span style={{ padding: "2px 7px", borderRadius: "999px", fontSize: "9px", fontWeight: 600, background: `${COLORS.accent}15`, color: COLORS.accent }}>{langVal}</span>
                          )}
                          {langVal === "Multi" && (
                            <span style={{ padding: "2px 7px", borderRadius: "999px", fontSize: "9px", fontWeight: 600, background: COLORS.bg, color: COLORS.textSecondary }}>Multi-language</span>
                          )}
                        </div>

                        {/* Name */}
                        <h3 style={{ fontFamily: fb, fontSize: "16px", fontWeight: 500, margin: "0 0 4px", color: COLORS.text }}>{g.name}</h3>

                        {/* Member count */}
                        {g.member_count && (
                          <p style={{ fontSize: "12px", color: COLORS.textSecondary, margin: "0 0 4px", display: "flex", alignItems: "center", gap: "4px" }}>
                            <Users size={11} /> {g.member_count.toLocaleString()} members
                          </p>
                        )}

                        {/* Description */}
                        {g.description && (
                          <p style={{ fontSize: "14px", color: COLORS.textSecondary, margin: "0 0 10px", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                            {g.description}
                          </p>
                        )}

                        {/* Bottom row */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                          {g.invite_url && (
                            <a href={g.invite_url} target="_blank" rel="noopener noreferrer" style={{
                              padding: "7px 16px", borderRadius: "8px", background: ps.color, color: "white",
                              fontSize: "12px", fontWeight: 700, fontFamily: fb, textDecoration: "none",
                              display: "inline-flex", alignItems: "center", gap: "5px",
                            }}>
                              {ctaLabel(g.platform)} <ExternalLink size={11} />
                            </a>
                          )}
                          {g.verified_date && (
                            <span style={{ fontSize: "10px", color: COLORS.textMuted }}>
                              Last verified: {new Date(g.verified_date + "T00:00:00").toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredGroups.length === 0 && (
                <div style={{ textAlign: "center", padding: "60px 20px", background: COLORS.surface, borderRadius: "16px", border: `1px solid ${COLORS.border}` }}>
                  <p style={{ fontFamily: fb, fontSize: "20px", fontWeight: 600, color: COLORS.textSecondary, margin: "0 0 8px" }}>No groups found</p>
                  <p style={{ fontSize: "13px", color: COLORS.textMuted }}>Try adjusting your filters or submit a group below.</p>
                </div>
              )}
            </div>

            {/* SUBMIT GROUP FORM */}
            <div id="submit-group-form" style={{ marginTop: "40px" }}>
              <SubmitGroupForm onSuccess={() => {
                supabase.from("groups").select("*").eq("is_active", true).order("name")
                  .then(({ data }) => setGroups(data || []));
              }} />
            </div>
          </>
        )}

        {/* ═══ LOCAL EVENTS TAB ═══ */}
        {tab === "events" && (() => {
          const in90 = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
          const eventMonths = [...new Set(unifiedEvents.map(e => e.event_date.substring(0, 7)))].sort();
          const filterOpts = [
            { value: "90days", label: "Next 90 days" },
            ...eventMonths.map(ym => { const [y, m] = ym.split("-"); return { value: ym, label: new Date(parseInt(y), parseInt(m) - 1).toLocaleDateString("en-US", { month: "long", year: "numeric" }) }; }),
          ];

          let filtered = unifiedEvents.filter(e => {
            const d = new Date(e.event_date + "T00:00:00");
            if (eventFilter === "90days") return d >= now && d <= in90;
            return e.event_date.startsWith(eventFilter);
          });
          if (eventTypeFilter !== "all") {
            filtered = filtered.filter(e => e._type === eventTypeFilter);
          }

          const formatDate = (ds) => {
            const d = new Date(ds + "T00:00:00");
            return { month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(), day: d.getDate(), weekday: d.toLocaleDateString("en-US", { weekday: "short" }) };
          };

          const generateICS = (ev) => {
            const d = new Date(ev.event_date + "T00:00:00");
            const dtStart = d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
            const ics = ["BEGIN:VCALENDAR","VERSION:2.0","BEGIN:VEVENT",`DTSTART:${dtStart}`,`SUMMARY:${ev.event_name}`,`DESCRIPTION:${(ev.event_description || "").replace(/\n/g, "\\n")}`,`LOCATION:${ev._hostName || ""}`,
              "END:VEVENT","END:VCALENDAR"].join("\r\n");
            const blob = new Blob([ics], { type: "text/calendar" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a"); a.href = url; a.download = `${ev.event_name.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.ics`; a.click(); URL.revokeObjectURL(url);
          };

          return (
            <>
              {/* Filters + Submit */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {[{ id: "all", label: "All" }, { id: "community", label: "Community" }, { id: "temple", label: "Temple" }].map(t => (
                    <button key={t.id} onClick={() => setEventTypeFilter(t.id)} style={{
                      padding: "6px 14px", borderRadius: "999px", fontSize: "12px", fontFamily: fb, fontWeight: 600, cursor: "pointer",
                      border: eventTypeFilter === t.id ? `2px solid ${COLORS.accent}` : `2px solid ${COLORS.border}`,
                      background: eventTypeFilter === t.id ? COLORS.accent : "white",
                      color: eventTypeFilter === t.id ? COLORS.text : COLORS.textSecondary, transition: "all 0.2s",
                    }}>{t.label}</button>
                  ))}
                  <select value={eventFilter} onChange={e => setEventFilter(e.target.value)} style={{ padding: "6px 12px", borderRadius: "10px", border: `1px solid ${COLORS.border}`, fontSize: "12px", fontFamily: fb, color: COLORS.text, background: "white", cursor: "pointer" }}>
                    {filterOpts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <Link href="/events/submit" style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "8px 16px", borderRadius: "10px", background: COLORS.primary, color: "white", fontFamily: fb, fontWeight: 600, fontSize: "13px", textDecoration: "none" }}><Plus size={14} /> Submit Event</Link>
              </div>

              <p style={{ fontSize: "13px", color: COLORS.textFaint, marginBottom: "14px" }}>{filtered.length} events</p>

              {filtered.length > 0 ? (
                <div style={{ display: "grid", gap: "10px" }}>
                  {filtered.map((ev, i) => {
                    const d = formatDate(ev.event_date);
                    const isTemple = ev._type === "temple";
                    const badgeColor = isTemple ? "#BF360C" : "#6A1B9A";
                    const badgeLabel = isTemple ? "Temple Event" : "Community Event";
                    return (
                      <div key={`${ev._type}-${ev.id}-${i}`} style={{
                        display: "flex", gap: "14px", alignItems: "center",
                        padding: "14px 16px", borderRadius: "12px", background: COLORS.surface,
                        border: `1px solid ${COLORS.border}`, transition: "border-color 0.2s",
                      }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = `${COLORS.accent}60`}
                        onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}
                      >
                        <div style={{ width: "52px", textAlign: "center", flexShrink: 0, padding: "6px 4px", borderRadius: "10px", background: "#FFF3E0" }}>
                          <div style={{ fontSize: "10px", fontWeight: 700, color: "#BF360C", fontFamily: fb, textTransform: "uppercase" }}>{d.month}</div>
                          <div style={{ fontSize: "20px", fontWeight: 700, color: COLORS.text, fontFamily: fb, lineHeight: 1.1 }}>{d.day}</div>
                          <div style={{ fontSize: "10px", color: COLORS.textSecondary, fontFamily: fb }}>{d.weekday}</div>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", gap: "6px", alignItems: "center", marginBottom: "2px", flexWrap: "wrap" }}>
                            <span style={{ padding: "1px 7px", borderRadius: "999px", fontSize: "9px", fontWeight: 700, background: `${badgeColor}12`, color: badgeColor }}>{badgeLabel}</span>
                          </div>
                          <div style={{ fontFamily: fb, fontSize: "15px", fontWeight: 600, color: COLORS.text, marginBottom: "2px" }}>{ev.event_name}</div>
                          {ev._hostName && (
                            <div style={{ fontSize: "12px", color: COLORS.textSecondary, marginBottom: "2px" }}>
                              Hosted by {ev._hostSlug ? <Link href={ev._hostSlug} style={{ color: COLORS.primary, textDecoration: "none", fontWeight: 600 }}>{ev._hostName}</Link> : ev._hostName}
                            </div>
                          )}
                          {ev.event_description && <div style={{ fontSize: "12px", color: COLORS.textSecondary, lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ev.event_description}</div>}
                          {(ev.start_time || ev.is_all_day) && <div style={{ fontSize: "11px", color: COLORS.textMuted, marginTop: "2px" }}>{ev.is_all_day ? "All day" : `${ev.start_time}${ev.end_time ? " – " + ev.end_time : ""}`}</div>}
                        </div>
                        <button onClick={() => generateICS(ev)} style={{ flexShrink: 0, padding: "5px 10px", borderRadius: "8px", background: `${COLORS.accent}10`, border: `1px solid ${COLORS.accent}30`, color: COLORS.accent, fontSize: "10px", fontWeight: 600, fontFamily: fb, cursor: "pointer", whiteSpace: "nowrap" }}>+ Cal</button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "48px 20px", color: COLORS.textSecondary }}>
                  <p style={{ fontSize: "16px", margin: "0 0 8px" }}>No events found for this period.</p>
                  <Link href="/events/submit" style={{ color: COLORS.primary, fontWeight: 600, textDecoration: "none" }}>Submit an event →</Link>
                </div>
              )}
            </>
          );
        })()}
      </div>
    </div>
  );
}

/* ═══ SUBMIT GROUP FORM ═══ */
function SubmitGroupForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: "", platform: "", invite_url: "", category: "", language: "Multi", description: "", submitter_email: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const { error: err } = await supabase.from("groups").insert({
      name: form.name,
      platform: form.platform,
      invite_url: form.invite_url,
      category: form.category,
      language: form.language || "Multi",
      description: form.description || null,
      is_active: false,
      verified_date: null,
    });

    setSubmitting(false);
    if (err) setError("Something went wrong. Please try again.");
    else setSuccess(true);
  };

  const labelStyle = { display: "block", fontSize: "13px", fontWeight: 600, color: COLORS.text, fontFamily: FONTS.body, marginBottom: "6px" };
  const inputStyle = { width: "100%", padding: "10px 14px", borderRadius: "10px", border: `1px solid ${COLORS.border}`, fontSize: "14px", fontFamily: FONTS.body, outline: "none", boxSizing: "border-box" };

  if (success) {
    return (
      <div style={{ background: "#E8F5E9", borderRadius: "14px", padding: "28px", textAlign: "center" }}>
        <CheckCircle size={36} color="#2E7D32" style={{ marginBottom: "10px" }} />
        <p style={{ fontFamily: FONTS.body, fontSize: "20px", fontWeight: 600, color: "#2E7D32", margin: "0 0 4px" }}>Thanks!</p>
        <p style={{ fontSize: "13px", color: COLORS.text, margin: 0 }}>We&apos;ll verify and add this group within 24 hours.</p>
      </div>
    );
  }

  return (
    <div style={{ background: COLORS.surface, borderRadius: "16px", padding: "28px", border: `1px solid ${COLORS.border}` }}>
      <h3 style={{ fontFamily: FONTS.body, fontSize: "20px", fontWeight: 600, margin: "0 0 4px", color: COLORS.text }}>Know a group we&apos;re missing?</h3>
      <p style={{ fontSize: "13px", color: COLORS.textSecondary, margin: "0 0 20px" }}>Add it below. We&apos;ll verify the link and publish it.</p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>
        <div>
          <label style={labelStyle}>Group Name *</label>
          <input required type="text" value={form.name} onChange={update("name")} placeholder="e.g. Michigan Telugu Association" style={inputStyle} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <label style={labelStyle}>Platform *</label>
            <select required value={form.platform} onChange={update("platform")} style={{ ...inputStyle, cursor: "pointer" }}>
              <option value="">Select platform</option>
              {PLATFORMS.filter(p => p !== "All").map(p => <option key={p} value={p}>{platformLabel(p)}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Category *</label>
            <select required value={form.category} onChange={update("category")} style={{ ...inputStyle, cursor: "pointer" }}>
              <option value="">Select category</option>
              {GROUP_CATEGORIES.filter(c => c.value !== "all").map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label style={labelStyle}>Invite Link / URL *</label>
          <input required type="url" value={form.invite_url} onChange={update("invite_url")} placeholder="https://chat.whatsapp.com/... or https://facebook.com/groups/..." style={inputStyle} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <label style={labelStyle}>Language</label>
            <select value={form.language} onChange={update("language")} style={{ ...inputStyle, cursor: "pointer" }}>
              {GROUP_LANG_FILTER.filter(l => l !== "All").map(l => <option key={l} value={l}>{l === "Multi" ? "Multi-language" : l}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Your Email (for verification)</label>
            <input type="email" value={form.submitter_email} onChange={update("submitter_email")} placeholder="Not displayed publicly" style={inputStyle} />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Description (optional)</label>
          <textarea value={form.description} onChange={update("description")} rows={3} placeholder="What's this group about?" style={{ ...inputStyle, resize: "vertical" }} />
        </div>

        {error && <p style={{ color: "#C62828", fontSize: "13px", margin: 0 }}>{error}</p>}

        <button type="submit" disabled={submitting} style={{
          padding: "12px 32px", borderRadius: "12px",
          background: submitting ? "#ccc" : COLORS.primary, color: "white",
          border: "none", fontFamily: FONTS.body, fontWeight: 700, fontSize: "14px",
          cursor: submitting ? "not-allowed" : "pointer", justifySelf: "start",
        }}>
          {submitting ? "Submitting..." : "Submit Group"}
        </button>
      </form>
    </div>
  );
}
