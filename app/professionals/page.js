"use client";
import { useState, useEffect } from "react";
import { MapPin, Phone, Globe, Languages, Search, UserCheck } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import { fetchProfessionals } from "@/lib/data";

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
  const [professionals, setProfessionals] = useState(null);
  const [typeFilter, setTypeFilter] = useState("All");
  const [cityFilter, setCityFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

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
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "30px 20px" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontFamily: FONTS.heading, fontSize: "28px", fontWeight: 700, margin: "0 0 4px" }}>
          Professionals
        </h1>
        <p style={{ fontSize: "14px", color: "#8A7968", margin: 0 }}>
          Desi doctors, attorneys, CPAs, realtors, and advisors in metro Detroit.
        </p>
      </div>

      {/* Search */}
      <div style={{
        display: "flex", alignItems: "center", gap: "10px",
        background: "white", borderRadius: "12px", border: "1px solid #E0D8CF",
        padding: "10px 16px", marginBottom: "16px",
      }}>
        <Search size={16} color="#8A7968" />
        <input
          type="text"
          placeholder="Search by name, specialty, or city..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{
            border: "none", outline: "none", flex: 1, fontSize: "14px",
            fontFamily: FONTS.body, background: "transparent", color: "#2D2420",
          }}
        />
      </div>

      {/* Type filter pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
        {PROFESSION_TYPES.map(t => (
          <button key={t} onClick={() => setTypeFilter(t)} style={pill(typeFilter === t)}>
            {t}
          </button>
        ))}
      </div>

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
          <a
            href={p.website ? (p.website.startsWith("http") ? p.website : `https://${p.website}`) : "#"}
            target="_blank" rel="noopener noreferrer"
            style={{
              padding: "8px 18px", borderRadius: "10px", background: "#37474F",
              color: "white", fontFamily: FONTS.body, fontWeight: 600, fontSize: "13px",
              textDecoration: "none", display: "flex", alignItems: "center", gap: "5px",
              opacity: p.website ? 1 : 0.4, pointerEvents: p.website ? "auto" : "none",
            }}
          >Claim Your Profile</a>
        </div>
      </div>
    </div>
  );
}
