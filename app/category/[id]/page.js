"use client";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, ArrowLeft, X, Calendar, MapPin } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import { fetchAllData } from "@/lib/data";
import { useApp } from "@/lib/context";
import ListingCard from "@/components/ListingCard";
import Badge from "@/components/Badge";

export default function CategoryPage() {
  const [_data, _setData] = useState(null);
  useEffect(() => { fetchAllData().then(_setData); }, []);
  if (!_data) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>;
  const { CATEGORIES, EVENTS, REMITTANCE_COMPARISON } = _data;

  const { id } = useParams();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("q") || "";
  const { culture } = useApp();
  const [activeSubs, setActiveSubs] = useState([]);
  const [catSearch, setCatSearch] = useState(initialSearch);

  const cat = CATEGORIES.find(c => c.id === id);
  if (!cat) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <h1 style={{ fontFamily: FONTS.heading, fontSize: "24px" }}>Category not found</h1>
        <Link href="/" style={{ color: COLORS.primary, fontWeight: 600, marginTop: "12px", display: "inline-block" }}>
          ← Back to home
        </Link>
      </div>
    );
  }

  // Redirect movies and events to their own pages
  if (cat.id === "movies" || cat.id === "events") {
    if (typeof window !== "undefined") {
      window.location.href = cat.id === "movies" ? "/movies" : "/events";
    }
    return null;
  }

  const toggleSub = (s) => setActiveSubs(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const pill = (active) => ({
    padding: "6px 16px", borderRadius: "999px", fontSize: "13px",
    fontFamily: FONTS.body, fontWeight: 500, cursor: "pointer",
    border: active ? `2px solid ${COLORS.primary}` : "2px solid #E8E0D8",
    background: active ? "#FDE8EF" : "white",
    color: active ? COLORS.primary : "#5A4A3F",
    transition: "all 0.2s", whiteSpace: "nowrap",
  });

  const filterData = () => {
    if (!cat.data) return [];
    let f = [...cat.data];
    if (activeSubs.length > 0) f = f.filter(i => i.sub?.some(s => activeSubs.includes(s)));
    if (catSearch.trim()) {
      const q = catSearch.toLowerCase();
      f = f.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.city?.toLowerCase().includes(q) ||
        i.desc.toLowerCase().includes(q) ||
        i.sub?.some(s => s.toLowerCase().includes(q))
      );
    }
    if (culture !== "All Desi") {
      const sp = f.filter(i =>
        i.sub?.some(s => s.toLowerCase().includes(culture.toLowerCase())) ||
        i.badges?.some(b => b.toLowerCase().includes(culture.toLowerCase()))
      );
      if (sp.length > 0) return [...sp, ...f.filter(i => !sp.includes(i))];
    }
    return f;
  };

  const data = filterData();

  return (
    <>
      {/* Category header */}
      <div style={{ background: "white", borderBottom: "1px solid #EDE6DE", padding: "12px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "6px", color: COLORS.primary, fontFamily: FONTS.body, fontWeight: 600, fontSize: "14px" }}>
          <ArrowLeft size={18} /> Back
        </Link>
      </div>

      <div style={{
        background: `linear-gradient(135deg, ${cat.color}12, ${cat.color}06)`,
        padding: "40px 20px 30px", borderBottom: "1px solid #EDE6DE",
      }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "8px" }}>
            <div style={{
              width: 48, height: 48, borderRadius: "14px", background: cat.color,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <cat.icon size={24} color="white" />
            </div>
            <div>
              <h1 style={{ fontFamily: FONTS.heading, fontSize: "28px", fontWeight: 700, margin: "0 0 4px" }}>
                {cat.name}
              </h1>
              <p style={{ fontSize: "14px", color: "#6B5B4F", margin: 0, maxWidth: "600px" }}>
                {cat.desc}
              </p>
            </div>
          </div>

          {cat.subs && (
            <>
              <div style={{ position: "relative", marginTop: "20px", maxWidth: "500px" }}>
                <Search size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#A89888" }} />
                <input
                  value={catSearch} onChange={e => setCatSearch(e.target.value)}
                  placeholder="Search..."
                  style={{
                    width: "100%", padding: "12px 14px 12px 42px", borderRadius: "12px",
                    border: "1px solid #E0D8CF", fontFamily: FONTS.body, fontSize: "14px",
                    background: "white", boxSizing: "border-box", outline: "none",
                  }}
                />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "16px" }}>
                {cat.subs.map(s => (
                  <button key={s} onClick={() => toggleSub(s)} style={pill(activeSubs.includes(s))}>
                    {s}
                  </button>
                ))}
                {activeSubs.length > 0 && (
                  <button onClick={() => setActiveSubs([])} style={{
                    ...pill(false), color: COLORS.primary, borderColor: COLORS.primary,
                    display: "flex", alignItems: "center", gap: "4px",
                  }}>
                    <X size={12} /> Clear
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "30px 20px" }}>
        {/* Remittance table for Travel category */}
        {cat.id === "travel" && (activeSubs.length === 0 || activeSubs.some(s => ["Bank Transfer", "Cash Pickup"].includes(s))) && (
          <div style={{ marginBottom: "30px" }}>
            <h2 style={{ fontFamily: FONTS.heading, fontSize: "20px", fontWeight: 700, marginBottom: "4px" }}>
              💸 Remittance Comparison: USD → INR
            </h2>
            <div style={{ overflowX: "auto", marginTop: "12px" }}>
              <table style={{
                width: "100%", borderCollapse: "collapse",
                fontFamily: FONTS.body, fontSize: "13px", minWidth: "500px",
              }}>
                <thead>
                  <tr style={{ background: "#F5F0EA", borderBottom: "2px solid #E0D8CF" }}>
                    {["Service", "Rate", "Fees", "Speed", "Min"].map(h => (
                      <th key={h} style={{
                        padding: "12px", textAlign: "left", fontWeight: 600,
                        color: "#5A4A3F", fontSize: "12px", textTransform: "uppercase",
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {REMITTANCE_COMPARISON.map((r, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #EDE6DE" }}>
                      <td style={{ padding: "14px 12px" }}>
                        <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, color: "#2D2420", textDecoration: "none" }}>
                          {r.name}
                        </a>
                        <div style={{ display: "flex", gap: "4px", marginTop: "4px" }}>
                          {r.badges?.map(b => <Badge key={b} name={b} />)}
                        </div>
                      </td>
                      <td style={{ padding: "14px 12px", color: "#5A4A3F" }}>{r.rate}</td>
                      <td style={{ padding: "14px 12px", color: "#5A4A3F" }}>{r.fee}</td>
                      <td style={{ padding: "14px 12px", color: "#5A4A3F" }}>{r.speed}</td>
                      <td style={{ padding: "14px 12px", color: "#5A4A3F" }}>{r.minSend}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Listings */}
        {data.length > 0 && (
          <div style={{ display: "grid", gap: "14px" }}>
            {data.map((item, i) => <ListingCard key={i} item={item} cat={cat} />)}
          </div>
        )}

        {data.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#8A7968" }}>
            <p style={{ fontFamily: FONTS.heading, fontSize: "20px" }}>No results found</p>
          </div>
        )}
      </div>
    </>
  );
}
