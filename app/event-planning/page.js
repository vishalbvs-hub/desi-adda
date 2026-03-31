"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, MapPin, Phone, Star, ChevronDown } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import ListingCard from "@/components/ListingCard";
import ScrollingChips from "@/components/ScrollingChips";

const ff = FONTS.heading;
const fb = FONTS.body;
const SAFFRON = "#E8A317";

const FILTER_TABS = [
  { id: "all", label: "All" },
  { id: "photographer", label: "Photographers" },
  { id: "dj", label: "DJs" },
  { id: "mehndi", label: "Mehndi" },
  { id: "decorator", label: "Decorators" },
  { id: "makeup", label: "Makeup" },
  { id: "catering", label: "Catering" },
  { id: "venues", label: "Venues" },
  { id: "planner", label: "Planners" },
  { id: "florist", label: "Florists" },
  { id: "jewelry", label: "Jewelry" },
  { id: "bridal", label: "Bridal Wear" },
];

const TAB_MATCH = {
  photographer: ["Photography", "Photographer", "Cinematography", "Videographer"],
  dj: ["DJ", "Entertainment", "Sangeet"],
  mehndi: ["Mehndi", "Mehndi Artist"],
  decorator: ["Decor", "Decorator", "Mandap"],
  makeup: ["Makeup", "Bridal Makeup"],
  catering: ["Catering", "Wedding Caterer"],
  venues: ["_hall"],
  planner: ["Planner", "Wedding Planner"],
  florist: ["Florist"],
  jewelry: ["Jewelry"],
  bridal: ["Bridal Wear", "Bridal", "Sarees", "Clothing", "Pakistani Bridal"],
};

const SORT_OPTIONS = [
  { id: "weighted", label: "Top Rated" },
  { id: "reviews", label: "Most Reviewed" },
  { id: "az", label: "A-Z" },
];

const CHIPS = [
  { emoji: "💐", text: "mehndi artist near Troy" },
  { emoji: "🏛️", text: "banquet hall for 300 guests" },
  { emoji: "📷", text: "Indian wedding photographer" },
  { emoji: "🍽️", text: "desi catering for reception" },
  { emoji: "🎶", text: "DJ for sangeet night" },
  { emoji: "💄", text: "bridal makeup artist" },
  { emoji: "🎨", text: "mandap and decor setup" },
  { emoji: "🏛️", text: "outdoor wedding venue Michigan" },
  { emoji: "📹", text: "Indian wedding videographer" },
  { emoji: "🎉", text: "event planner for desi wedding" },
];

function weightedScore(item) {
  const r = item.rating || 0;
  const n = item.reviews || 0;
  return r * Math.log2(n + 1);
}

export default function EventPlanningPage() {
  const [vendors, setVendors] = useState(null);
  const [venues, setVenues] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [city, setCity] = useState("all");
  const [sort, setSort] = useState("weighted");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    Promise.all([
      supabase.from("wedding_vendors").select("*").order("name"),
      supabase.from("event_halls").select("*").order("name"),
    ]).then(([v, h]) => {
      setVendors((v.data || []).map((r) => ({ ...r, _type: "vendor" })));
      setVenues((h.data || []).map((r) => ({ ...r, _type: "hall" })));
    });
  }, []);

  const triggerChat = (q) => {
    window.dispatchEvent(new CustomEvent("askadda", { detail: q }));
  };

  if (!vendors || !venues) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFFBF5" }}>
        <p style={{ fontFamily: ff, color: COLORS.textMuted }}>Loading...</p>
      </div>
    );
  }

  const allCities = [...new Set([...vendors, ...venues].map((x) => x.city).filter(Boolean))].sort();

  // Build listings
  let listings = [...vendors, ...venues];

  // Filter by tab
  if (activeTab !== "all") {
    const matchSubs = TAB_MATCH[activeTab] || [];
    if (matchSubs.includes("_hall")) {
      listings = listings.filter((l) => l._type === "hall");
    } else {
      listings = listings.filter((l) =>
        l.subcategories?.some((sub) =>
          matchSubs.some((m) => sub.toLowerCase().includes(m.toLowerCase()))
        )
      );
    }
  }

  // Filter by city
  if (city !== "all") {
    listings = listings.filter((l) => l.city === city);
  }

  // Filter by search
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    listings = listings.filter(
      (l) =>
        l.name?.toLowerCase().includes(q) ||
        l.city?.toLowerCase().includes(q) ||
        l.description?.toLowerCase().includes(q) ||
        l.subcategories?.some((s) => s.toLowerCase().includes(q))
    );
  }

  // Sort
  if (sort === "weighted") {
    listings.sort((a, b) => weightedScore(b) - weightedScore(a));
  } else if (sort === "reviews") {
    listings.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
  } else if (sort === "az") {
    listings.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  }

  return (
    <div style={{ background: "#FFFBF5", minHeight: "100vh" }}>
      {/* HERO */}
      <section
        style={{
          background: "linear-gradient(135deg, #4A1942 0%, #6B2569 40%, #8E3090 100%)",
          minHeight: "300px", padding: "40px 20px 36px", textAlign: "center",
          position: "relative", overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <div style={{ position: "absolute", top: "8%", left: "5%", fontSize: "44px", opacity: 0.06, transform: "rotate(-12deg)" }}>💐</div>
        <div style={{ position: "absolute", top: "15%", right: "8%", fontSize: "50px", opacity: 0.05, transform: "rotate(15deg)" }}>🏛️</div>
        <div style={{ position: "absolute", bottom: "20%", left: "10%", fontSize: "42px", opacity: 0.05 }}>📷</div>
        <div style={{ position: "absolute", top: "50%", right: "5%", fontSize: "46px", opacity: 0.05 }}>🍽️</div>
        <div style={{ position: "absolute", bottom: "8%", right: "20%", fontSize: "38px", opacity: 0.04 }}>🎶</div>
        <div style={{ position: "absolute", top: "65%", left: "3%", fontSize: "36px", opacity: 0.04 }}>💄</div>
        <div style={{ position: "absolute", bottom: "25%", left: "40%", fontSize: "34px", opacity: 0.04 }}>💍</div>

        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <h1 style={{ fontFamily: ff, fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: "white", lineHeight: 1.1, margin: "0 0 8px" }}>
            Event <span style={{ color: SAFFRON, fontStyle: "italic" }}>Planning</span>
          </h1>
          <p style={{ fontFamily: ff, fontSize: "clamp(14px, 2vw, 18px)", fontWeight: 300, color: "rgba(255,255,255,0.6)", margin: "0 0 24px", fontStyle: "italic" }}>
            Wedding vendors, venues, catering & everything for your celebration
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) triggerChat(searchQuery);
            }}
            style={{ maxWidth: "560px", margin: "0 auto", position: "relative" }}
          >
            <Search size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#A89888" }} />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find a vendor, venue, caterer..."
              style={{
                width: "100%", padding: "14px 150px 14px 44px", borderRadius: "14px",
                border: "none", fontSize: "15px", fontFamily: fb, background: "white",
                boxShadow: "0 6px 24px rgba(0,0,0,0.2)", boxSizing: "border-box", outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)",
                background: SAFFRON, color: "white", border: "none", borderRadius: "10px",
                padding: "10px 20px", fontFamily: fb, fontWeight: 600, fontSize: "13px", cursor: "pointer",
              }}
            >
              Ask Adda ✨
            </button>
          </form>
          <div style={{ maxWidth: "600px", margin: "14px auto 0" }}>
            <ScrollingChips chips={CHIPS} onChipClick={(chip) => triggerChat(`${chip.emoji} ${chip.text}`)} variant="light" />
          </div>
        </div>
      </section>

      {/* FILTER TABS */}
      <div style={{ background: "white", borderBottom: "1px solid #EDE6DE", padding: "12px 20px", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: "6px", justifyContent: "center", flexWrap: "wrap" }}>
          {FILTER_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                padding: "7px 16px", borderRadius: "999px", fontSize: "12px", fontFamily: fb,
                fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
                border: activeTab === t.id ? `2px solid ${SAFFRON}` : "2px solid #EDE6DE",
                background: activeTab === t.id ? SAFFRON : "white",
                color: activeTab === t.id ? "#2D2420" : COLORS.textMuted,
                transition: "all 0.25s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* CITY + SORT DROPDOWNS */}
      <div style={{ background: "#FFFBF5", borderBottom: "1px solid #EDE6DE", padding: "10px 20px" }}>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
          {/* City filter */}
          <div style={{ position: "relative" }}>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{
                appearance: "none", padding: "7px 32px 7px 12px", borderRadius: "10px",
                border: "1px solid #EDE6DE", fontSize: "12px", fontFamily: fb, fontWeight: 500,
                background: "white", color: "#5A4A3F", cursor: "pointer", outline: "none",
              }}
            >
              <option value="all">All Cities</option>
              {allCities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown size={12} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#8A7968" }} />
          </div>

          {/* Sort */}
          <div style={{ position: "relative" }}>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{
                appearance: "none", padding: "7px 32px 7px 12px", borderRadius: "10px",
                border: "1px solid #EDE6DE", fontSize: "12px", fontFamily: fb, fontWeight: 500,
                background: "white", color: "#5A4A3F", cursor: "pointer", outline: "none",
              }}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.id} value={o.id}>{o.label}</option>
              ))}
            </select>
            <ChevronDown size={12} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#8A7968" }} />
          </div>
        </div>
      </div>

      {/* LISTINGS */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "30px 20px" }}>
        <p style={{ fontSize: "13px", color: COLORS.textFaint, marginBottom: "16px" }}>
          {listings.length} results
        </p>

        {listings.length > 0 ? (
          <div style={{ display: "grid", gap: "14px" }}>
            {listings.map((item, i) => (
              <Link
                key={`${item._type}-${item.id || i}`}
                href={`/event-planning/${item.slug || ""}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListingCard
                  item={{
                    ...item,
                    url: item.url || item.website,
                  }}
                  cat="event"
                />
              </Link>
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
