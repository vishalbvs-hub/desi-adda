"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Search, X, MapPin, Map, List } from "lucide-react";
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
  { id: "grocery", label: "Groceries", emoji: "\u{1F958}" },
  { id: "sweets", label: "Sweets & Bakery", emoji: "\u{1F370}" },
  { id: "beauty", label: "Beauty", emoji: "\u{1F485}" },
  { id: "wellness", label: "Wellness", emoji: "\u{1F9D8}" },
  { id: "family", label: "Kids & Education", emoji: "\u{1F3A8}" },
  { id: "services", label: "Services", emoji: "\u{1F4BC}" },
];

export default function BusinessesPage() {
  return <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFFBF5" }}><p style={{ fontFamily: ff, fontSize: "18px", color: COLORS.textMuted }}>Loading directory...</p></div>}><BusinessesPageInner /></Suspense>;
}

const CUISINE_FILTERS = [
  "All Cuisines", "South Indian", "North Indian", "Hyderabadi/Biryani", "Pakistani",
  "Bangladeshi", "Gujarati", "Chaat/Street Food", "Pan-Indian", "Nepali",
  "Indo-Chinese", "Mughlai", "Punjabi", "Tamil", "Bengali", "Fusion",
];

const VEG_FILTERS = ["All", "Veg", "Both", "Non-Veg"];
const PRICE_FILTERS = ["All", "$", "$$", "$$$"];
const STORE_TYPE_FILTERS = [
  "All Types", "Full Grocery", "South Indian Specialty", "Bengali Specialty",
  "Kerala Specialty", "Halal Meat Shop", "Sweets & Grocery", "Fresh Produce", "Spice Shop",
];
const SWEETS_FILTERS = ["All Types", "Indian Sweets", "Bengali Sweets", "Chai Cafe", "Bakery", "Chaat & Snacks"];
const BEAUTY_FILTERS = ["All Types", "Full Service Salon", "Threading Specialist", "Henna/Mehndi Artist", "Bridal Makeup", "Med Spa"];
const WELLNESS_FILTERS = ["All Types", "Yoga Studio", "Ayurveda", "Meditation", "Holistic Wellness"];
const KIDS_FILTERS = ["All Types", "Bharatanatyam", "Bollywood Dance", "Kathak", "Carnatic Music", "Hindustani Music", "Instruments", "Tutoring", "Language Classes"];
const SERVICES_FILTERS = ["All Types", "Driving School", "Shipping/Cargo", "Travel Agent", "ITIN Services", "Insurance"];
const SORT_OPTIONS = [
  { id: "rating", label: "Top Rated" },
  { id: "reviews", label: "Most Reviewed" },
  { id: "name", label: "A-Z" },
];

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
  // Restaurant-specific filters
  const [cuisineFilter, setCuisineFilter] = useState("All Cuisines");
  const [vegFilter, setVegFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [cityFilter, setCityFilter] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  // Grocery-specific filters
  const [storeTypeFilter, setStoreTypeFilter] = useState("All Types");
  const [groceryCityFilter, setGroceryCityFilter] = useState("All");
  const [grocerySortBy, setGrocerySortBy] = useState("rating");
  // Generic category filter (sweets, beauty, wellness, kids, services)
  const [genericTypeFilter, setGenericTypeFilter] = useState("All Types");
  const [genericCityFilter, setGenericCityFilter] = useState("All");
  const [genericSortBy, setGenericSortBy] = useState("rating");
  // Pagination
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => { fetchAllData().then(_setData); }, []);

  // Reset filters when category changes
  useEffect(() => {
    setActiveSubs([]);
    setCuisineFilter("All Cuisines");
    setVegFilter("All");
    setPriceFilter("All");
    setCityFilter("All");
    setSortBy("rating");
    setStoreTypeFilter("All Types");
    setGroceryCityFilter("All");
    setGrocerySortBy("rating");
    setGenericTypeFilter("All Types");
    setGenericCityFilter("All");
    setGenericSortBy("rating");
    setVisibleCount(20);
  }, [activeCat]);

  if (!_data) return (<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFFBF5" }}><p style={{ fontFamily: ff, fontSize: "18px", color: COLORS.textMuted }}>Loading directory...</p></div>);

  const { CATEGORIES } = _data;
  // Filter out categories that have dedicated pages
  const excludedCats = ["movies", "events", "professionals", "dating", "religious", "weddings", "event-halls", "community", "travel"];
  const dirCats = CATEGORIES.filter(c => !excludedCats.includes(c.id));

  // Build "Sweets & Bakery" virtual category from restaurants
  const foodCat = CATEGORIES.find(c => c.id === "food");
  const sweetsData = (foodCat?.data || []).filter(r =>
    (r.cuisine_type || "").toLowerCase().match(/sweet|bakery|chai|cafe|mithai|dessert/)
  );
  const sweetsCat = { id: "sweets", name: "Sweets & Bakery", data: sweetsData, color: "#E65100", subs: [], desc: "Indian sweet shops, bakeries, chai cafes, and dessert spots." };

  // Get current category data
  const currentCat = activeCat === "all" ? null : activeCat === "sweets" ? sweetsCat : dirCats.find(c => c.id === activeCat);

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

  // Restaurant-specific filters
  const isRestaurants = activeCat === "food";
  if (isRestaurants) {
    if (cuisineFilter !== "All Cuisines") {
      listings = listings.filter(i => i.cuisine_type?.toLowerCase().includes(cuisineFilter.toLowerCase()));
    }
    if (vegFilter !== "All") {
      listings = listings.filter(i => i.veg_status === vegFilter);
    }
    if (priceFilter !== "All") {
      listings = listings.filter(i => i.price_range === priceFilter);
    }
    if (cityFilter !== "All") {
      listings = listings.filter(i => i.city === cityFilter);
    }
    // Sort — weighted rating: rating * log(reviews + 1) so high-review places rank higher
    if (sortBy === "rating") {
      listings.sort((a, b) => ((b.rating || 0) * Math.log((b.reviews || 0) + 2)) - ((a.rating || 0) * Math.log((a.reviews || 0) + 2)));
    } else if (sortBy === "reviews") {
      listings.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    } else if (sortBy === "name") {
      listings.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }
  }

  // Sort sweets by weighted rating
  if (activeCat === "sweets") {
    listings.sort((a, b) => ((b.rating || 0) * Math.log((b.reviews || 0) + 2)) - ((a.rating || 0) * Math.log((a.reviews || 0) + 2)));
  }

  // Grocery-specific filters
  const isGrocery = activeCat === "grocery";
  if (isGrocery) {
    if (storeTypeFilter !== "All Types") {
      listings = listings.filter(i =>
        (i.store_type || i.description || "").toLowerCase().includes(storeTypeFilter.toLowerCase()) ||
        (i.subcategories || []).some(s => s.toLowerCase().includes(storeTypeFilter.toLowerCase()))
      );
    }
    if (groceryCityFilter !== "All") {
      listings = listings.filter(i => i.city === groceryCityFilter);
    }
    if (grocerySortBy === "rating") {
      listings.sort((a, b) => ((b.rating || 0) * Math.log((b.reviews || 0) + 2)) - ((a.rating || 0) * Math.log((a.reviews || 0) + 2)));
    } else if (grocerySortBy === "reviews") {
      listings.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    } else if (grocerySortBy === "name") {
      listings.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }
  }

  // Get unique cities for grocery filter
  const groceryCities = isGrocery
    ? ["All", ...new Set((_data.CATEGORIES.find(c => c.id === "grocery")?.data || []).map(g => g.city).filter(Boolean).sort())]
    : [];

  // Generic category filters (sweets, beauty, wellness, kids, services)
  const hasGenericFilter = ["sweets", "beauty", "wellness", "family", "services"].includes(activeCat);
  if (hasGenericFilter) {
    if (genericTypeFilter !== "All Types") {
      listings = listings.filter(i =>
        (i.description || i.store_type || i.specialties || "").toLowerCase().includes(genericTypeFilter.toLowerCase()) ||
        (i.subcategories || []).some(s => s.toLowerCase().includes(genericTypeFilter.toLowerCase())) ||
        (i.name || "").toLowerCase().includes(genericTypeFilter.toLowerCase())
      );
    }
    if (genericCityFilter !== "All") {
      listings = listings.filter(i => i.city === genericCityFilter);
    }
    if (genericSortBy === "rating") {
      listings.sort((a, b) => ((b.rating || 0) * Math.log((b.reviews || 0) + 2)) - ((a.rating || 0) * Math.log((a.reviews || 0) + 2)));
    } else if (genericSortBy === "reviews") {
      listings.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    } else if (genericSortBy === "name") {
      listings.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }
  }

  // Default weighted sort for other categories without specific filters
  if (!isRestaurants && !isGrocery && !hasGenericFilter) {
    listings.sort((a, b) => ((b.rating || 0) * Math.log((b.reviews || 0) + 2)) - ((a.rating || 0) * Math.log((a.reviews || 0) + 2)));
  }

  // Get unique cities for generic filter
  const genericCities = hasGenericFilter && currentCat?.data
    ? ["All", ...new Set(currentCat.data.map(r => r.city).filter(Boolean).sort())]
    : [];
  // Get filter options for current category
  const genericFilterOptions = activeCat === "sweets" ? SWEETS_FILTERS : activeCat === "beauty" ? BEAUTY_FILTERS : activeCat === "wellness" ? WELLNESS_FILTERS : activeCat === "family" ? KIDS_FILTERS : activeCat === "services" ? SERVICES_FILTERS : [];

  // Get unique cities for restaurant city filter
  const restaurantCities = isRestaurants
    ? ["All", ...new Set((_data.CATEGORIES.find(c => c.id === "food")?.data || []).map(r => r.city).filter(Boolean).sort())]
    : [];

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

      {/* RESTAURANT FILTERS — dropdowns only */}
      {isRestaurants && (
        <div style={{ background: "white", borderBottom: "1px solid #EDE6DE", padding: "12px 20px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
            <select value={cuisineFilter} onChange={e => setCuisineFilter(e.target.value)} style={{
              padding: "8px 14px", borderRadius: "10px", border: "1px solid #E0D8CF", fontSize: "13px", fontFamily: fb, color: "#5A4A3F", background: "white", cursor: "pointer",
            }}>
              {CUISINE_FILTERS.map(c => <option key={c} value={c}>{c === "All Cuisines" ? "All Cuisines" : c}</option>)}
            </select>
            <select value={vegFilter} onChange={e => setVegFilter(e.target.value)} style={{
              padding: "8px 14px", borderRadius: "10px", border: "1px solid #E0D8CF", fontSize: "13px", fontFamily: fb, color: "#5A4A3F", background: "white", cursor: "pointer",
            }}>
              {VEG_FILTERS.map(v => <option key={v} value={v}>{v === "All" ? "Veg / Non-Veg" : v === "Veg" ? "Veg Only" : v === "Both" ? "Veg & Non-Veg" : v}</option>)}
            </select>
            <select value={priceFilter} onChange={e => setPriceFilter(e.target.value)} style={{
              padding: "8px 14px", borderRadius: "10px", border: "1px solid #E0D8CF", fontSize: "13px", fontFamily: fb, color: "#5A4A3F", background: "white", cursor: "pointer",
            }}>
              {PRICE_FILTERS.map(p => <option key={p} value={p}>{p === "All" ? "Any Price" : p}</option>)}
            </select>
            <select value={cityFilter} onChange={e => setCityFilter(e.target.value)} style={{
              padding: "8px 14px", borderRadius: "10px", border: "1px solid #E0D8CF", fontSize: "13px", fontFamily: fb, color: "#5A4A3F", background: "white", cursor: "pointer",
            }}>
              {restaurantCities.map(c => <option key={c} value={c}>{c === "All" ? "All Cities" : c}</option>)}
            </select>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
              padding: "8px 14px", borderRadius: "10px", border: "1px solid #E0D8CF", fontSize: "13px", fontFamily: fb, color: "#5A4A3F", background: "white", cursor: "pointer",
            }}>
              {SORT_OPTIONS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </div>
        </div>
      )}

      {/* GROCERY FILTERS */}
      {isGrocery && (
        <div style={{ background: "white", borderBottom: "1px solid #EDE6DE", padding: "12px 20px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
            <select value={storeTypeFilter} onChange={e => setStoreTypeFilter(e.target.value)} style={{
              padding: "8px 14px", borderRadius: "10px", border: "1px solid #E0D8CF", fontSize: "13px", fontFamily: fb, color: "#5A4A3F", background: "white", cursor: "pointer",
            }}>
              {STORE_TYPE_FILTERS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <select value={groceryCityFilter} onChange={e => setGroceryCityFilter(e.target.value)} style={{
              padding: "8px 14px", borderRadius: "10px", border: "1px solid #E0D8CF", fontSize: "13px", fontFamily: fb, color: "#5A4A3F", background: "white", cursor: "pointer",
            }}>
              {groceryCities.map(c => <option key={c} value={c}>{c === "All" ? "All Cities" : c}</option>)}
            </select>
            <select value={grocerySortBy} onChange={e => setGrocerySortBy(e.target.value)} style={{
              padding: "8px 14px", borderRadius: "10px", border: "1px solid #E0D8CF", fontSize: "13px", fontFamily: fb, color: "#5A4A3F", background: "white", cursor: "pointer",
            }}>
              {SORT_OPTIONS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </div>
        </div>
      )}

      {/* GENERIC CATEGORY FILTERS (sweets, beauty, wellness, kids, services) */}
      {hasGenericFilter && genericFilterOptions.length > 0 && (
        <div style={{ background: "white", borderBottom: "1px solid #EDE6DE", padding: "12px 20px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
            <select value={genericTypeFilter} onChange={e => { setGenericTypeFilter(e.target.value); setVisibleCount(20); }} style={{
              padding: "8px 14px", borderRadius: "10px", border: "1px solid #E0D8CF", fontSize: "13px", fontFamily: fb, color: "#5A4A3F", background: "white", cursor: "pointer",
            }}>
              {genericFilterOptions.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <select value={genericCityFilter} onChange={e => { setGenericCityFilter(e.target.value); setVisibleCount(20); }} style={{
              padding: "8px 14px", borderRadius: "10px", border: "1px solid #E0D8CF", fontSize: "13px", fontFamily: fb, color: "#5A4A3F", background: "white", cursor: "pointer",
            }}>
              {genericCities.map(c => <option key={c} value={c}>{c === "All" ? "All Cities" : c}</option>)}
            </select>
            <select value={genericSortBy} onChange={e => setGenericSortBy(e.target.value)} style={{
              padding: "8px 14px", borderRadius: "10px", border: "1px solid #E0D8CF", fontSize: "13px", fontFamily: fb, color: "#5A4A3F", background: "white", cursor: "pointer",
            }}>
              {SORT_OPTIONS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
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
              <>
                <div style={{ display: "grid", gap: "12px" }}>
                  {listings.slice(0, visibleCount).map((item, i) => {
                    let detailHref = null;
                    if ((item._catId === "food" || item._catId === "sweets") && item.slug) detailHref = `/restaurants/${item.slug}`;
                    else if (item._catId === "grocery" && item.slug) detailHref = `/groceries/${item.slug}`;
                    else if (item._catId === "beauty" && item.slug) detailHref = `/beauty/${item.slug}`;
                    else if (item._catId === "wellness" && item.slug) detailHref = `/wellness/${item.slug}`;
                    else if (item._catId === "family" && item.slug) detailHref = `/kids/${item.slug}`;

                    const card = <ListingCard key={`${item._catId || "x"}-${item.id || i}`} item={item} cat={currentCat || { color: SAFFRON }} />;

                    if (detailHref) {
                      return <Link key={`link-${item._catId}-${item.id || i}`} href={detailHref} style={{ textDecoration: "none", color: "inherit" }}>{card}</Link>;
                    }
                    return card;
                  })}
                </div>
                {visibleCount < listings.length && (
                  <div style={{ textAlign: "center", marginTop: "24px" }}>
                    <button onClick={() => setVisibleCount(prev => prev + 20)} style={{
                      padding: "12px 32px", borderRadius: "12px", background: "white",
                      border: `2px solid ${SAFFRON}`, color: SAFFRON, fontFamily: fb,
                      fontWeight: 600, fontSize: "14px", cursor: "pointer", transition: "all 0.2s",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = SAFFRON; e.currentTarget.style.color = "white"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = SAFFRON; }}
                    >
                      Load More ({listings.length - visibleCount} remaining)
                    </button>
                  </div>
                )}
              </>
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
