"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Phone, Star, ChevronDown } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import ListingCard from "@/components/ListingCard";

const ff = FONTS.body;
const fb = FONTS.body;
const SAFFRON = COLORS.accent;

const FILTER_TABS = [
  { id: "all", label: "All" },
  { id: "catering", label: "Caterers" },
  { id: "venues", label: "Venues & Halls" },
  { id: "dj", label: "DJs & Music" },
  { id: "photographer", label: "Photo & Video" },
  { id: "decorator", label: "Decorators" },
  { id: "planner", label: "Wedding Planners" },
  { id: "mehndi", label: "Mehndi" },
  { id: "makeup", label: "Makeup" },
  { id: "florist", label: "Florists" },
  { id: "jewelry", label: "Jewelry" },
  { id: "bridal", label: "Bridal Wear" },
];

const TAB_MATCH = {
  photographer: ["Photography", "Photographer", "Cinematography", "Videographer", "Video"],
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

  if (!vendors || !venues) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F2EB" }}>
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
    <div style={{ background: "#F5F2EB", minHeight: "100vh" }}>
      {/* PAGE HEADER */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 20px 0" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#1A1A1A", margin: "0 0 4px" }}>Event Planning</h1>
        <p style={{ fontSize: "14px", color: "#6B6B6B", margin: "0" }}>Wedding vendors, venues, catering & everything for your celebration</p>
      </div>

      {/* FILTER TABS */}
      <div style={{ background: "white", borderBottom: "1px solid #E2DFD8", padding: "12px 20px", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: "6px", justifyContent: "center", flexWrap: "wrap" }}>
          {FILTER_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                padding: "7px 16px", borderRadius: "999px", fontSize: "12px", fontFamily: fb,
                fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
                border: activeTab === t.id ? `2px solid ${SAFFRON}` : "2px solid #E2DFD8",
                background: activeTab === t.id ? SAFFRON : "white",
                color: activeTab === t.id ? "#1A1A1A" : COLORS.textMuted,
                transition: "all 0.25s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* CITY + SORT DROPDOWNS */}
      <div style={{ background: "#F5F2EB", borderBottom: "1px solid #E2DFD8", padding: "10px 20px" }}>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
          {/* City filter */}
          <div style={{ position: "relative" }}>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{
                appearance: "none", padding: "7px 32px 7px 12px", borderRadius: "10px",
                border: "1px solid #E2DFD8", fontSize: "12px", fontFamily: fb, fontWeight: 500,
                background: "white", color: "#6B6B6B", cursor: "pointer", outline: "none",
              }}
            >
              <option value="all">All Cities</option>
              {allCities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown size={12} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#6B6B6B" }} />
          </div>

          {/* Sort */}
          <div style={{ position: "relative" }}>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{
                appearance: "none", padding: "7px 32px 7px 12px", borderRadius: "10px",
                border: "1px solid #E2DFD8", fontSize: "12px", fontFamily: fb, fontWeight: 500,
                background: "white", color: "#6B6B6B", cursor: "pointer", outline: "none",
              }}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.id} value={o.id}>{o.label}</option>
              ))}
            </select>
            <ChevronDown size={12} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#6B6B6B" }} />
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
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#6B6B6B" }}>
            <p style={{ fontFamily: ff, fontSize: "18px" }}>No results found</p>
            <p style={{ fontSize: "13px" }}>Try a different search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
