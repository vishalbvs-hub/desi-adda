"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Search, ArrowLeft, X, MapPin, Map, List } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import { fetchAllData } from "@/lib/data";
import { useApp } from "@/lib/context";
import ListingCard from "@/components/ListingCard";
import ScrollingChips from "@/components/ScrollingChips";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

const ff = FONTS.heading;
const fb = FONTS.body;
const SAFFRON = "#E8A317";

const CHIPS = [
  { emoji: "\u{1F35B}", text: "best biryani in Troy" },
  { emoji: "\u{1F958}", text: "Indian grocery near Canton" },
  { emoji: "\u{1F490}", text: "mehndi artist for wedding" },
  { emoji: "\u{1F485}", text: "eyebrow threading Novi" },
  { emoji: "\u{1F3DB}\uFE0F", text: "banquet hall for 300 guests" },
  { emoji: "\u{1F6D5}", text: "Telugu temple near me" },
  { emoji: "\u{1F957}", text: "vegetarian restaurant Farmington" },
  { emoji: "\u{1F9D8}", text: "yoga classes Metro Detroit" },
  { emoji: "\u{1F370}", text: "Indian bakery or sweets shop" },
  { emoji: "\u{1F3A4}", text: "DJ for sangeet night" },
];

const CAT_TABS = [
  { id: "all", label: "All", emoji: "\u{2728}" },
  { id: "food", label: "Restaurants", emoji: "\u{1F35B}" },
  { id: "religious", label: "Temples", emoji: "\u{1F6D5}" },
  { id: "grocery", label: "Groceries", emoji: "\u{1F958}" },
  { id: "weddings", label: "Weddings", emoji: "\u{1F490}" },
  { id: "beauty", label: "Beauty", emoji: "\u{1F485}" },
  { id: "event-halls", label: "Event Halls", emoji: "\u{1F3DB}\uFE0F" },
  { id: "wellness", label: "Wellness", emoji: "\u{1F9D8}" },
  { id: "family", label: "Kids & Education", emoji: "\u{1F3A8}" },
  { id: "community", label: "Community", emoji: "\u{1F465}" },
  { id: "services", label: "Services", emoji: "\u{1F4BC}" },
  { id: "travel", label: "Travel", emoji: "\u{2708}\uFE0F" },
];

export default function BusinessesPage() {
  return <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFFBF5" }}><p style={{ fontFamily: ff, fontSize: "18px", color: COLORS.textMuted }}>Loading directory...</p></div>}><BusinessesPageInner /></Suspense>;
}

function BusinessesPageInner() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("cat") || "all";
  const initialQ = searchParams.get("q") || "";
  const { culture } = useApp();

  const [_data, _setData] = useState(null);
  const [activeCat, setActiveCat] = useState(initialCat);
  const [activeSubs, setActiveSubs] = useState([]);
  const [searchQuery, setSearchQuery] = useState(initialQ);
  const [viewMode, setViewMode] = useState("list");

  useEffect(() => { fetchAllData().then(_setData); }, []);

  // Reset subs when category changes
  useEffect(() => { setActiveSubs([]); }, [activeCat]);

  if (!_data) return (<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFFBF5" }}><p style={{ fontFamily: ff, fontSize: "18px", color: COLORS.textMuted }}>Loading directory...</p></div>);

  const { CATEGORIES } = _data;
  // Filter out movies, events, professionals, dating (they have their own pages)
  const dirCats = CATEGORIES.filter(c => !["movies", "events", "professionals", "dating"].includes(c.id));

  // Get current category data
  const currentCat = activeCat === "all" ? null : dirCats.find(c => c.id === activeCat);

  // Build listings
  let listings = [];
  if (activeCat === "all") {
    dirCats.forEach(c => { if (c.data) listings.push(...c.data.map(d => ({ ...d, _catId: c.id, _catName: c.name, _catColor: c.color }))); });
  } else if (currentCat && currentCat.data) {
    listings = currentCat.data.map(d => ({ ...d, _catId: currentCat.id, _catName: currentCat.name, _catColor: currentCat.color }));
  }

  // Filter by subcategory
  if (activeSubs.length > 0) {
    listings = listings.filter(i => i.sub?.some(s => activeSubs.includes(s)));
  }

  // Filter by search
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    listings = listings.filter(i =>
      i.name?.toLowerCase().includes(q) ||
      i.city?.toLowerCase().includes(q) ||
      (i.description || i.desc || "").toLowerCase().includes(q) ||
      i.sub?.some(s => s.toLowerCase().includes(q))
    );
  }

  // Culture boost
  if (culture !== "All Desi") {
    const sp = listings.filter(i =>
      i.sub?.some(s => s.toLowerCase().includes(culture.toLowerCase())) ||
      i.badges?.some(b => b.toLowerCase().includes(culture.toLowerCase()))
    );
    if (sp.length > 0) listings = [...sp, ...listings.filter(i => !sp.includes(i))];
  }

  const subs = currentCat?.subs || [];
  const toggleSub = (s) => setActiveSubs(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const triggerChat = (q) => { window.dispatchEvent(new CustomEvent("askadda", { detail: q })); };

  return (
    <div style={{ background: "#FFFBF5", minHeight: "100vh" }}>
      {/* HERO */}
      <section style={{
        background: "linear-gradient(135deg, #2D2420 0%, #4A3728 40%, #6B4D35 100%)",
        minHeight: "280px", padding: "40px 20px 36px", textAlign: "center",
        position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ position: "absolute", top: "8%", left: "6%", fontSize: "40px", opacity: 0.05, transform: "rotate(-12deg)" }}>{"\u{1F3EA}"}</div>
        <div style={{ position: "absolute", top: "20%", right: "8%", fontSize: "50px", opacity: 0.04, transform: "rotate(15deg)" }}>{"\u{1F35B}"}</div>
        <div style={{ position: "absolute", bottom: "15%", left: "12%", fontSize: "44px", opacity: 0.05, transform: "rotate(20deg)" }}>{"\u{1F6D5}"}</div>
        <div style={{ position: "absolute", top: "50%", right: "5%", fontSize: "38px", opacity: 0.04, transform: "rotate(-18deg)" }}>{"\u{1F490}"}</div>
        <div style={{ position: "absolute", bottom: "8%", right: "20%", fontSize: "36px", opacity: 0.04, transform: "rotate(10deg)" }}>{"\u{1F958}"}</div>
        <div style={{ position: "absolute", top: "10%", left: "35%", fontSize: "32px", opacity: 0.04, transform: "rotate(25deg)" }}>{"\u{1F485}"}</div>

        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <h1 style={{ fontFamily: ff, fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: "white", lineHeight: 1.1, margin: "0 0 8px" }}>
            Local <span style={{ color: SAFFRON, fontStyle: "italic" }}>Businesses</span>
          </h1>
          <p style={{ fontFamily: ff, fontSize: "clamp(14px, 2vw, 18px)", fontWeight: 300, color: "rgba(255,255,255,0.6)", margin: "0 0 24px", fontStyle: "italic" }}>
            {listings.length}+ listings across Metro Detroit
          </p>

          {/* Search bar */}
          <form onSubmit={e => { e.preventDefault(); if (searchQuery.trim()) triggerChat(searchQuery); }} style={{ maxWidth: "560px", margin: "0 auto", position: "relative" }}>
            <Search size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#A89888" }} />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search businesses... biryani, threading, banquet hall..."
              style={{ width: "100%", padding: "14px 150px 14px 44px", borderRadius: "14px", border: "none", fontSize: "15px", fontFamily: fb, background: "white", boxShadow: "0 6px 24px rgba(0,0,0,0.2)", boxSizing: "border-box", outline: "none" }} />
            <button type="submit" style={{ position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)", background: SAFFRON, color: "white", border: "none", borderRadius: "10px", padding: "10px 20px", fontFamily: fb, fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>
              Ask Adda {"\u2728"}
            </button>
          </form>
          <div style={{ maxWidth: "600px", margin: "14px auto 0" }}>
            <ScrollingChips chips={CHIPS} onChipClick={(chip) => triggerChat(`${chip.emoji} ${chip.text}`)} variant="light" />
          </div>
        </div>
      </section>

      {/* CATEGORY TABS */}
      <div style={{ background: "white", borderBottom: "1px solid #EDE6DE", padding: "12px 20px", overflowX: "auto", scrollbarWidth: "none" }}>
        <div style={{ display: "flex", gap: "6px", justifyContent: "center", flexWrap: "wrap" }}>
          {CAT_TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveCat(tab.id)} style={{
              padding: "7px 16px", borderRadius: "999px", fontSize: "12px", fontFamily: fb, fontWeight: 600, cursor: "pointer",
              border: activeCat === tab.id ? `2px solid ${SAFFRON}` : "2px solid #EDE6DE",
              background: activeCat === tab.id ? SAFFRON : "white",
              color: activeCat === tab.id ? "#2D2420" : COLORS.textMuted,
              transition: "all 0.25s", display: "flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap",
            }}>{tab.emoji} {tab.label}</button>
          ))}
        </div>
      </div>

      {/* SUBCATEGORY PILLS + VIEW TOGGLE */}
      {(subs.length > 0 || true) && (
        <div style={{ background: "#FFFBF5", borderBottom: "1px solid #EDE6DE", padding: "12px 20px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", flex: 1 }}>
              {subs.map(s => (
                <button key={s} onClick={() => toggleSub(s)} style={{
                  padding: "5px 14px", borderRadius: "999px", fontSize: "11px", fontFamily: fb, fontWeight: 500, cursor: "pointer",
                  border: activeSubs.includes(s) ? `2px solid ${COLORS.primary}` : "2px solid #E8E0D8",
                  background: activeSubs.includes(s) ? "#FDE8EF" : "white",
                  color: activeSubs.includes(s) ? COLORS.primary : "#5A4A3F", transition: "all 0.2s", whiteSpace: "nowrap",
                }}>{s}</button>
              ))}
              {activeSubs.length > 0 && (
                <button onClick={() => setActiveSubs([])} style={{
                  padding: "5px 14px", borderRadius: "999px", fontSize: "11px", fontFamily: fb, fontWeight: 500,
                  border: `2px solid ${COLORS.primary}`, background: "white", color: COLORS.primary, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: "4px",
                }}><X size={10} /> Clear</button>
              )}
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              <button onClick={() => setViewMode("list")} style={{
                padding: "6px 14px", borderRadius: "999px", fontSize: "12px", fontFamily: fb, fontWeight: 500, cursor: "pointer",
                border: viewMode === "list" ? `2px solid ${SAFFRON}` : "2px solid #E8E0D8",
                background: viewMode === "list" ? `${SAFFRON}18` : "white", color: viewMode === "list" ? SAFFRON : "#5A4A3F",
                display: "flex", alignItems: "center", gap: "4px",
              }}><List size={13} /> List</button>
              <button onClick={() => setViewMode("map")} style={{
                padding: "6px 14px", borderRadius: "999px", fontSize: "12px", fontFamily: fb, fontWeight: 500, cursor: "pointer",
                border: viewMode === "map" ? `2px solid ${SAFFRON}` : "2px solid #E8E0D8",
                background: viewMode === "map" ? `${SAFFRON}18` : "white", color: viewMode === "map" ? SAFFRON : "#5A4A3F",
                display: "flex", alignItems: "center", gap: "4px",
              }}><Map size={13} /> Map</button>
            </div>
          </div>
        </div>
      )}

      {/* LISTINGS */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "30px 20px" }}>
        {activeCat !== "all" && currentCat && (
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ fontFamily: ff, fontSize: "24px", fontWeight: 700, margin: "0 0 4px", color: "#2D2420" }}>{currentCat.name}</h2>
            <p style={{ fontSize: "14px", color: COLORS.textMuted, margin: 0 }}>{currentCat.desc}</p>
          </div>
        )}

        <p style={{ fontSize: "13px", color: COLORS.textFaint, marginBottom: "16px" }}>{listings.length} results</p>

        {viewMode === "map" && currentCat ? (
          <MapView listings={listings} color={currentCat.color || SAFFRON} catName={currentCat.name || "All"} />
        ) : (
          <>
            {listings.length > 0 ? (
              <div style={{ display: "grid", gap: "14px" }}>
                {listings.map((item, i) => <ListingCard key={`${item._catId || "x"}-${item.id || i}`} item={item} cat={currentCat || { color: SAFFRON }} />)}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#8A7968" }}>
                <p style={{ fontFamily: ff, fontSize: "20px" }}>No results found</p>
                <p style={{ fontSize: "14px" }}>Try a different search or category</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
