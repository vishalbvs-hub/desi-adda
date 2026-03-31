"use client";
import { MapPin, Star, Globe } from "lucide-react";
import { FONTS } from "@/lib/constants";

const SAFFRON = "#E8A317";
const ff = FONTS.heading;
const fb = FONTS.body;

export default function ListingCard({ item, cat, href }) {
  const thumb = item.photos?.[0] || null;
  const hasRating = item.rating && item.rating > 0;

  const inner = (
    <div
      style={{
        background: "white", borderRadius: "16px", overflow: "hidden",
        border: "1px solid #EDE6DE", transition: "all 0.2s",
        display: "flex", flexDirection: "row", cursor: href ? "pointer" : "default",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.08)";
        e.currentTarget.style.transform = "scale(1.015)";
        e.currentTarget.style.background = "#FFFDF8";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.background = "white";
      }}
    >
      {/* Thumbnail */}
      <div style={{
        width: thumb ? "130px" : "0px", minHeight: thumb ? "120px" : "0px",
        flexShrink: 0, overflow: "hidden", background: "#F5EDE4",
      }}>
        {thumb && <img src={thumb} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "14px 18px", minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <h3 style={{
          fontFamily: ff, fontSize: "16px", fontWeight: 600, margin: "0 0 4px",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#2D2420",
        }}>{item.name}</h3>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#8A7968", marginBottom: "4px", flexWrap: "wrap" }}>
          {item.city && <span style={{ display: "flex", alignItems: "center", gap: "3px" }}><MapPin size={11} /> {item.city}</span>}
          {item.phone && <span>{item.phone}</span>}
        </div>

        {hasRating && (
          <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "4px" }}>
            <div style={{ display: "flex", gap: "1px" }}>
              {[1,2,3,4,5].map(s => <Star key={s} size={12} fill={s <= Math.round(item.rating) ? SAFFRON : "#E0D8CF"} color={s <= Math.round(item.rating) ? SAFFRON : "#E0D8CF"} />)}
            </div>
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#2D2420" }}>{item.rating}</span>
            {item.reviews && <span style={{ fontSize: "11px", color: "#A89888" }}>({item.reviews.toLocaleString()})</span>}
          </div>
        )}

        {(item.description || item.notable_dishes) && (
          <p style={{
            fontSize: "12px", color: "#5A4A3F", margin: 0, lineHeight: 1.4,
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {item.notable_dishes || item.description}
          </p>
        )}
      </div>

      {/* Small website icon — secondary */}
      {item.url && (
        <div style={{ display: "flex", alignItems: "center", paddingRight: "14px", flexShrink: 0 }}
          onClick={e => { e.preventDefault(); e.stopPropagation(); window.open(item.url.startsWith("http") ? item.url : `https://${item.url}`, "_blank"); }}
        >
          <div style={{
            width: "32px", height: "32px", borderRadius: "8px", background: "#F5EDE4",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "#EDE6DE"}
            onMouseLeave={e => e.currentTarget.style.background = "#F5EDE4"}
          >
            <Globe size={14} color="#8A7968" />
          </div>
        </div>
      )}
    </div>
  );

  return inner;
}
