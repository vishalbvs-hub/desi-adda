"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { MapPin, Phone, Globe, Languages, UserCheck } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import { fetchProfessionals } from "@/lib/data";
import { professionalSlug } from "@/lib/slugify";

const ff = FONTS.body;
const SAFFRON = COLORS.accent;

const SPECIALTY_TYPES = [
  "All",
  "Doctor",
  "Dentist",
  "Cardiologist",
  "Pediatrician",
  "Psychiatrist",
  "Dermatologist",
  "Immigration Attorney",
  "Family Attorney",
  "CPA/Tax",
  "Realtor",
  "Insurance",
  "Mortgage",
  "Financial Advisor",
  "Driving School",
];

const SORT_OPTIONS = [
  { value: "top-rated", label: "Top Rated" },
  { value: "most-reviewed", label: "Most Reviewed" },
  { value: "a-z", label: "A–Z" },
];

function getProfessionType(p) {
  if (p.subcategories?.length > 0) return p.subcategories[0];
  const match = p.bio?.match(/Type:\s*([^.]+)/);
  return match ? match[1].trim() : "Other";
}

function matchesSpecialty(p, filter) {
  if (filter === "All") return true;
  const haystack = [
    p.specialty,
    p.title,
    p.bio,
    ...(p.subcategories || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  const needle = filter.toLowerCase();
  return haystack.includes(needle);
}

function weightedScore(p) {
  const rating = p.google_rating || 0;
  const reviews = p.google_reviews || 0;
  return rating * Math.log(reviews + 2);
}

export default function ProfessionalsPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Loading...
        </div>
      }
    >
      <ProfessionalsPageInner />
    </Suspense>
  );
}

function ProfessionalsPageInner() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("q") || "";
  const initialType = searchParams.get("type") || "All";
  const [professionals, setProfessionals] = useState(null);
  const [specialtyFilter, setSpecialtyFilter] = useState(initialType);
  const [cityFilter, setCityFilter] = useState("All");
  const [sortBy, setSortBy] = useState("top-rated");
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  useEffect(() => {
    fetchProfessionals().then(setProfessionals);
  }, []);

  if (!professionals) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading...
      </div>
    );
  }

  const cities = [
    "All",
    ...new Set(
      professionals
        .map((p) => p.city)
        .filter(Boolean)
        .sort()
    ),
  ];

  const filtered = professionals.filter((p) => {
    if (!matchesSpecialty(p, specialtyFilter)) return false;
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

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "top-rated") return weightedScore(b) - weightedScore(a);
    if (sortBy === "most-reviewed")
      return (b.google_reviews || 0) - (a.google_reviews || 0);
    return (a.name || "").localeCompare(b.name || "");
  });

  // Group by profession type
  const grouped = {};
  for (const p of sorted) {
    const type = getProfessionType(p);
    if (!grouped[type]) grouped[type] = [];
    grouped[type].push(p);
  }

  const selectStyle = {
    padding: "8px 14px",
    borderRadius: "10px",
    border: "1px solid #E2DFD8",
    fontSize: "13px",
    fontFamily: FONTS.body,
    color: "#6B6B6B",
    background: "white",
    cursor: "pointer",
  };

  return (
    <div style={{ background: "#F5F2EB", minHeight: "100vh" }}>
      {/* PAGE HEADER */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 20px 0" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#1A1A1A", margin: "0 0 4px" }}>Professionals & Services</h1>
        <p style={{ fontSize: "14px", color: "#6B6B6B", margin: "0" }}>Doctors, attorneys, CPAs, realtors & advisors in Metro Detroit</p>
      </div>

      {/* FILTER BAR */}
      <div
        style={{
          background: "white",
          borderBottom: "1px solid #E2DFD8",
          padding: "14px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <select
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
            style={selectStyle}
          >
            {SPECIALTY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t === "All" ? "All Specialties" : t}
              </option>
            ))}
          </select>

          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            style={selectStyle}
          >
            {cities.map((c) => (
              <option key={c} value={c}>
                {c === "All" ? "All Cities" : c}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={selectStyle}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          <span
            style={{ marginLeft: "auto", fontSize: "13px", color: "#6B6B6B" }}
          >
            {sorted.length} professional{sorted.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "30px 20px" }}>
        {/* Grouped listings */}
        {Object.entries(grouped).map(([type, pros]) => (
          <div key={type} style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontFamily: FONTS.body,
                fontSize: "20px",
                fontWeight: 600,
                margin: "0 0 14px",
                color: "#37474F",
                borderBottom: "2px solid #ECEFF1",
                paddingBottom: "8px",
              }}
            >
              {type === "CPA/Tax" ? "CPAs & Tax Professionals" : type + "s"} (
              {pros.length})
            </h2>
            <div style={{ display: "grid", gap: "12px" }}>
              {pros.map((p) => (
                <ProfessionalCard key={p.id} p={p} />
              ))}
            </div>
          </div>
        ))}

        {sorted.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#6B6B6B",
            }}
          >
            <UserCheck size={40} strokeWidth={1.5} />
            <p
              style={{
                fontFamily: FONTS.body,
                fontSize: "18px",
                marginTop: "12px",
              }}
            >
              No professionals found
            </p>
            <p style={{ fontSize: "13px" }}>
              Try adjusting your filters or search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function ProfessionalCard({ p }) {
  const langs =
    Array.isArray(p.languages) && p.languages.length > 0
      ? p.languages
      : typeof p.languages === "string" && p.languages
        ? [p.languages]
        : [];

  const slug = professionalSlug(p.name, p.city);

  return (
    <Link
      href={`/professionals/${slug}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "10px",
          padding: "20px 24px",
          border: "1px solid #E2DFD8",
          transition: "box-shadow 0.2s",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <div style={{ flex: 1, minWidth: "200px" }}>
            <h3
              style={{
                fontFamily: FONTS.body,
                fontSize: "17px",
                fontWeight: 600,
                margin: "0 0 2px",
              }}
            >
              {p.name}
              {p.title ? `, ${p.title}` : ""}
            </h3>
            {p.practice_name && (
              <p
                style={{
                  fontSize: "13px",
                  color: "#6B6B6B",
                  margin: "0 0 6px",
                  fontWeight: 500,
                }}
              >
                {p.practice_name}
              </p>
            )}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "13px",
                color: "#6B6B6B",
                marginBottom: "6px",
                flexWrap: "wrap",
              }}
            >
              {p.city && (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <MapPin size={13} />
                  {p.city}
                </span>
              )}
              {p.phone && (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <Phone size={13} />
                  {p.phone}
                </span>
              )}
              {p.website && (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <Globe size={13} />
                  {p.website
                    .replace(/^https?:\/\/(www\.)?/, "")
                    .replace(/\/$/, "")}
                </span>
              )}
            </div>
            {p.google_rating && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "12px",
                  color: COLORS.textMuted,
                  marginBottom: "6px",
                }}
              >
                <div style={{ display: "flex", gap: "1px" }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill={
                        i <= Math.round(p.google_rating) ? SAFFRON : "#E2DFD8"
                      }
                      stroke="none"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span style={{ fontWeight: 600 }}>{p.google_rating}</span>
                {p.google_reviews > 0 && (
                  <span>({p.google_reviews} reviews)</span>
                )}
              </div>
            )}
            {p.specialty && (
              <span
                style={{
                  display: "inline-block",
                  padding: "3px 10px",
                  borderRadius: "999px",
                  fontSize: "11px",
                  fontWeight: 600,
                  background: "#ECEFF1",
                  color: "#37474F",
                  marginBottom: "6px",
                }}
              >
                {p.specialty}
              </span>
            )}
            {p.bio && (
              <p
                style={{
                  fontSize: "13px",
                  color: "#6B6B6B",
                  margin: "6px 0 0",
                  lineHeight: 1.4,
                  fontWeight: 500,
                  maxWidth: "420px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {p.bio}
              </p>
            )}
            {langs.length > 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "12px",
                  color: "#999999",
                  marginTop: "6px",
                }}
              >
                <Languages size={12} />
                {langs.join(", ")}
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                padding: "8px 18px",
                borderRadius: "10px",
                background: SAFFRON,
                color: "white",
                fontFamily: FONTS.body,
                fontWeight: 600,
                fontSize: "13px",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              View Profile
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
