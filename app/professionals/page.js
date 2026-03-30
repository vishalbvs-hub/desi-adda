"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { MapPin, Phone, Globe, Languages, Search, UserCheck } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import { fetchProfessionals } from "@/lib/data";
import ScrollingChips from "@/components/ScrollingChips";

const ff = FONTS.heading;
const fb = FONTS.body;
const SAFFRON = "#E8A317";

const PROFESSION_TYPES = [
  "All",
  "Doctor",
  "Dentist",
  "Optometrist",
  "Chiropractor",
  "Physical Therapist",
  "Attorney",
  "CPA/Tax",
  "Realtor",
  "Insurance Agent",
  "Mortgage Broker",
  "Financial Advisor",
];

function getProfessionType(p) {
  if (p.subcategories?.length > 0) return p.subcategories[0];
  const match = p.bio?.match(/Type:\s*([^.]+)/);
  return match ? match[1].trim() : "Other";
}

export default function ProfessionalsPage() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("q") || "";
  const initialType = searchParams.get("type") || "All";
  const [professionals, setProfessionals] = useState(null);
  const [typeFilter, setTypeFilter] = useState(initialType);
  const [cityFilter, setCityFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  useEffect(() => {
    fetchProfessionals().then(setProfessionals);
  }, []);

  if (!professionals) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        Loading...
      </div>
    );
  }

  const cities = ["All", ...new Set(professionals.map(p => p.city).filter(Boolean).sort())];

  const filtered = professionals.filter(p => {
    if (typeFilter !== "All" && getProfessionType(p) !== typeFilter) return false;
    if (cityFilter !== "All" && p.city !== cityFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.name?.toLowerCase().includes(q) ||
        p.specialty?.toLowerCase().includes(q) ||
        p.city?.toLowerCase().includes(q) ||
        p.bio?.toLowerCase().includes(q) ||
        p.practice_name?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Group by profession type
  const grouped = {};
  for (const p of filtered) {
    const type = getProfessionType(p);
    if (!grouped[type]) grouped[type] = [];
    grouped[type].push(p);
  }

  const pill = (active) => ({
    padding: "6px 16px", borderRadius: "999px", fontSize: "13px",
    fontFamily: FONTS.body, fontWeight: 500, cursor: "pointer",
    border: active ? "2px solid #37474F" : "2px solid #E8E0D8",
    background: active ? "#ECEFF1" : "white",
    color: active ? "#37474F" : "#5A4A3F",
    transition: "all 0.2s", whiteSpace: "nowrap",
  });

  return (
    <div style={{ background: "#FFFBF5", minHeight: "100vh" }}>
      {/* HERO */}
      <section style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
        minHeight: "280px", padding: "40px 20px 36px", textAlign: "center",
        position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ position: "absolute", top: "10%", left: "6%", fontSize: "40px", opacity: 0.05, transform: "rotate(-12deg)" }}>{"\u{1FA7A}"}</div>
        <div style={{ position: "absolute", top: "20%", right: "8%", fontSize: "50px", opacity: 0.04, transform: "rotate(15deg)" }}>{"\u{2696}\uFE0F"}</div>
        <div style={{ position: "absolute", bottom: "15%", left: "12%", fontSize: "44px", opacity: 0.05 }}>{"\u{1F4CB}"}</div>
        <div style={{ position: "absolute", top: "50%", right: "5%", fontSize: "38px", opacity: 0.04 }}>{"\u{1F3E1}"}</div>
        <div style={{ position: "absolute", bottom: "8%", right: "20%", fontSize: "36px", opacity: 0.04 }}>{"\u{1F4B0}"}</div>

        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <h1 style={{ fontFamily: ff, fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: "white", lineHeight: 1.1, margin: "0 0 8px" }}>
            Desi <span style={{ color: SAFFRON, fontStyle: "italic" }}>Professionals</span>
          </h1>
          <p style={{ fontFamily: ff, fontSize: "clamp(14px, 2vw, 18px)", fontWeight: 300, color: "rgba(255,255,255,0.6)", margin: "0 0 24px", fontStyle: "italic" }}>
            Doctors, attorneys, CPAs, realtors & advisors in Metro Detroit
          </p>
          <form onSubmit={e => { e.preventDefault(); const v = document.getElementById("pro-search").value; if (v.trim()) { window.dispatchEvent(new CustomEvent("askadda", { detail: v })); document.getElementById("pro-search").value = ""; } }} style={{ maxWidth: "560px", margin: "0 auto", position: "relative" }}>
            <Search size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#A89888" }} />
            <input id="pro-search" placeholder="Find a doctor, lawyer, CPA..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              style={{ width: "100%", padding: "14px 150px 14px 44px", borderRadius: "14px", border: "none", fontSize: "15px", fontFamily: fb, background: "white", boxShadow: "0 6px 24px rgba(0,0,0,0.2)", boxSizing: "border-box", outline: "none" }} />
            <button type="submit" style={{ position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)", background: SAFFRON, color: "white", border: "none", borderRadius: "10px", padding: "10px 20px", fontFamily: fb, fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>Ask Adda {"\u2728"}</button>
          </form>
          <div style={{ maxWidth: "600px", margin: "14px auto 0" }}>
            <ScrollingChips chips={[
              { emoji: "\u{1FA7A}", text: "Telugu doctor near Troy" },
              { emoji: "\u{1F9B7}", text: "Indian dentist Southfield" },
              { emoji: "\u{2696}\uFE0F", text: "immigration lawyer H1B" },
              { emoji: "\u{1F4CB}", text: "NRI tax CPA filing" },
              { emoji: "\u{1F3E1}", text: "desi realtor Novi" },
              { emoji: "\u{1F6E1}\uFE0F", text: "Indian insurance agent" },
              { emoji: "\u{1F4B0}", text: "financial advisor retirement" },
              { emoji: "\u{1F441}\uFE0F", text: "Indian optometrist Canton" },
              { emoji: "\u{1FA7A}", text: "cardiologist Metro Detroit" },
              { emoji: "\u{2696}\uFE0F", text: "family law attorney" },
            ]} onChipClick={(chip) => window.dispatchEvent(new CustomEvent("askadda", { detail: `${chip.emoji} ${chip.text}` }))} variant="light" />
          </div>
        </div>
      </section>

      {/* TYPE FILTER BAR */}
      <div style={{ background: "white", borderBottom: "1px solid #EDE6DE", padding: "12px 20px", overflowX: "auto", scrollbarWidth: "none" }}>
        <div style={{ display: "flex", gap: "6px", justifyContent: "center", flexWrap: "wrap" }}>
          {PROFESSION_TYPES.map(t => (
            <button key={t} onClick={() => setTypeFilter(t)} style={{
              padding: "7px 16px", borderRadius: "999px", fontSize: "12px", fontFamily: fb, fontWeight: 600, cursor: "pointer",
              border: typeFilter === t ? `2px solid ${SAFFRON}` : "2px solid #EDE6DE",
              background: typeFilter === t ? SAFFRON : "white",
              color: typeFilter === t ? "#2D2420" : COLORS.textMuted, transition: "all 0.25s", whiteSpace: "nowrap",
            }}>{t}</button>
          ))}
        </div>
      </div>

    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "30px 20px" }}>

      {/* City filter */}
      <div style={{ marginBottom: "24px" }}>
        <select
          value={cityFilter}
          onChange={e => setCityFilter(e.target.value)}
          style={{
            padding: "8px 14px", borderRadius: "10px", border: "1px solid #E0D8CF",
            fontSize: "13px", fontFamily: FONTS.body, color: "#5A4A3F",
            background: "white", cursor: "pointer",
          }}
        >
          {cities.map(c => (
            <option key={c} value={c}>{c === "All" ? "All Cities" : c}</option>
          ))}
        </select>
        <span style={{ marginLeft: "12px", fontSize: "13px", color: "#8A7968" }}>
          {filtered.length} professional{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Grouped listings */}
      {Object.entries(grouped).map(([type, pros]) => (
        <div key={type} style={{ marginBottom: "32px" }}>
          <h2 style={{
            fontFamily: FONTS.heading, fontSize: "20px", fontWeight: 600,
            margin: "0 0 14px", color: "#37474F",
            borderBottom: "2px solid #ECEFF1", paddingBottom: "8px",
          }}>
            {type === "CPA/Tax" ? "CPAs & Tax Professionals" : type + "s"} ({pros.length})
          </h2>
          <div style={{ display: "grid", gap: "12px" }}>
            {pros.map(p => (
              <ProfessionalCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#8A7968" }}>
          <UserCheck size={40} strokeWidth={1.5} />
          <p style={{ fontFamily: FONTS.heading, fontSize: "18px", marginTop: "12px" }}>
            No professionals found
          </p>
          <p style={{ fontSize: "13px" }}>Try adjusting your filters or search.</p>
        </div>
      )}
    </div>
    </div>
  );
}

function ProfessionalCard({ p }) {
  const langs = Array.isArray(p.languages) && p.languages.length > 0
    ? p.languages
    : typeof p.languages === "string" && p.languages
    ? [p.languages]
    : [];

  return (
    <div
      style={{
        background: "white", borderRadius: "16px", padding: "20px 24px",
        border: "1px solid #EDE6DE", transition: "box-shadow 0.2s",
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
        <div style={{ flex: 1, minWidth: "200px" }}>
          <h3 style={{ fontFamily: FONTS.heading, fontSize: "17px", fontWeight: 600, margin: "0 0 2px" }}>
            {p.name}{p.title ? `, ${p.title}` : ""}
          </h3>
          {p.practice_name && (
            <p style={{ fontSize: "13px", color: "#5A4A3F", margin: "0 0 6px", fontWeight: 500 }}>
              {p.practice_name}
            </p>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "13px", color: "#8A7968", marginBottom: "6px", flexWrap: "wrap" }}>
            {p.city && (
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <MapPin size={13} />{p.city}
              </span>
            )}
            {p.phone && (
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Phone size={13} />{p.phone}
              </span>
            )}
            {p.website && (
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Globe size={13} />{p.website}
              </span>
            )}
          </div>
          {p.specialty && (
            <span style={{
              display: "inline-block", padding: "3px 10px", borderRadius: "999px",
              fontSize: "11px", fontWeight: 600, background: "#ECEFF1", color: "#37474F",
              marginBottom: "6px",
            }}>
              {p.specialty}
            </span>
          )}
          {p.bio && (
            <p style={{ fontSize: "13px", color: "#8A7968", margin: "6px 0 0", lineHeight: 1.4, fontWeight: 500, maxWidth: "420px" }}>
              {p.bio}
            </p>
          )}
          {langs.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#A89888", marginTop: "6px" }}>
              <Languages size={12} />
              {langs.join(", ")}
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", flexShrink: 0 }}>
          <Link
            href={`/claim/${p.id}`}
            style={{
              padding: "8px 18px", borderRadius: "10px", background: "#37474F",
              color: "white", fontFamily: FONTS.body, fontWeight: 600, fontSize: "13px",
              textDecoration: "none", display: "flex", alignItems: "center", gap: "5px",
            }}
          >Claim Your Profile</Link>
        </div>
      </div>
    </div>
    </div>
  );
}
