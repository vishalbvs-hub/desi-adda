"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, MapPin, Star, ArrowRight } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import { fetchAllData } from "@/lib/data";

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQ);
  const [data, setData] = useState(null);

  useEffect(() => { fetchAllData().then(setData); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  // Update local query when URL changes
  useEffect(() => {
    const q = searchParams.get("q") || "";
    setQuery(q);
  }, [searchParams]);

  const searchTerm = searchParams.get("q") || "";

  if (!data) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>;

  const { CATEGORIES } = data;

  // Search across ALL categories
  const results = [];
  if (searchTerm.trim()) {
    const q = searchTerm.toLowerCase();
    for (const cat of CATEGORIES) {
      if (!cat.data) continue;
      const matches = cat.data.filter(item =>
        item.name?.toLowerCase().includes(q) ||
        item.city?.toLowerCase().includes(q) ||
        (item.description || item.desc || "").toLowerCase().includes(q) ||
        item.sub?.some(s => s.toLowerCase().includes(q)) ||
        item.badges?.some(b => b.toLowerCase().includes(q))
      );
      for (const match of matches) {
        results.push({ ...match, _catName: cat.name, _catColor: cat.color, _catId: cat.id });
      }
    }
  }

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "30px 20px" }}>
      {/* Search bar */}
      <form onSubmit={handleSearch} style={{ position: "relative", marginBottom: "28px" }}>
        <Search size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#999999" }} />
        <input
          value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Search restaurants, temples, doctors, groceries..."
          style={{
            width: "100%", padding: "14px 120px 14px 44px", borderRadius: "14px",
            border: "1px solid #E2DFD8", fontSize: "15px", fontFamily: FONTS.body,
            background: "white", boxSizing: "border-box", outline: "none",
          }}
        />
        <button type="submit" style={{
          position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)",
          background: COLORS.primary, color: "white", border: "none", borderRadius: "10px",
          padding: "10px 20px", fontFamily: FONTS.body, fontWeight: 600, fontSize: "13px", cursor: "pointer",
        }}>Search</button>
      </form>

      {searchTerm.trim() ? (
        <>
          <h1 style={{ fontFamily: FONTS.body, fontSize: "24px", fontWeight: 700, margin: "0 0 4px" }}>
            Results for &ldquo;{searchTerm}&rdquo;
          </h1>
          <p style={{ fontSize: "14px", color: "#6B6B6B", margin: "0 0 24px" }}>
            {results.length} {results.length === 1 ? "result" : "results"} found across all categories
          </p>

          {results.length > 0 ? (
            <div style={{ display: "grid", gap: "12px" }}>
              {results.map((item, i) => (
                <Link
                  key={`${item._catId}-${item.id || i}`}
                  href={item._catId === "professionals" ? "/professionals" : `/category/${item._catId}?q=${encodeURIComponent(searchTerm)}`}
                  style={{
                    padding: "18px 22px", borderRadius: "16px", background: "white",
                    border: "1px solid #E2DFD8", borderLeft: `3px solid ${item._catColor}`,
                    display: "block", textDecoration: "none", color: "inherit",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                    <div>
                      <h3 style={{ fontFamily: FONTS.body, fontSize: "17px", fontWeight: 600, margin: "0 0 4px" }}>{item.name}</h3>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "12px", color: "#6B6B6B", marginBottom: "4px", flexWrap: "wrap" }}>
                        <span style={{
                          padding: "2px 8px", borderRadius: "999px", fontSize: "10px", fontWeight: 600,
                          background: item._catColor + "12", color: item._catColor,
                        }}>{item._catName}</span>
                        {item.city && <span style={{ display: "flex", alignItems: "center", gap: "3px" }}><MapPin size={11} /> {item.city}</span>}
                        {item.rating && (
                          <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                            <Star size={11} fill="#C4943D" color="#C4943D" /> {item.rating}
                          </span>
                        )}
                      </div>
                      {(item.description || item.desc) && (
                        <p style={{ fontSize: "13px", color: "#6B6B6B", margin: 0, lineHeight: 1.4 }}>
                          {(item.description || item.desc).length > 120 ? (item.description || item.desc).substring(0, 120) + "..." : (item.description || item.desc)}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ padding: "60px 20px", textAlign: "center", background: "white", borderRadius: "16px", border: "1px solid #E2DFD8" }}>
              <p style={{ fontFamily: FONTS.body, fontSize: "20px", fontWeight: 600, margin: "0 0 8px", color: "#1A1A1A" }}>
                No results found for &ldquo;{searchTerm}&rdquo;
              </p>
              <p style={{ fontSize: "14px", color: "#6B6B6B", margin: "0 0 20px" }}>
                Try a different search term or browse our categories.
              </p>
              <Link href="/" style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                color: COLORS.primary, fontWeight: 600, fontSize: "14px", fontFamily: FONTS.body, textDecoration: "none",
              }}>
                Browse Directory <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </>
      ) : (
        <div style={{ padding: "60px 20px", textAlign: "center" }}>
          <p style={{ fontFamily: FONTS.body, fontSize: "20px", fontWeight: 600, color: "#1A1A1A", margin: "0 0 8px" }}>
            Search the Desi Adda directory
          </p>
          <p style={{ fontSize: "14px", color: "#6B6B6B" }}>
            Find restaurants, temples, doctors, groceries, wedding vendors, and more.
          </p>
        </div>
      )}
    </div>
  );
}
