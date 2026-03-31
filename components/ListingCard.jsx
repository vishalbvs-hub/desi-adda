"use client";
import { MapPin, Star, Globe, UtensilsCrossed, ShoppingBag, Stethoscope, Church, Gem, Sparkles, Heart, GraduationCap, Briefcase, Building2 } from "lucide-react";
import { FONTS } from "@/lib/constants";

const SAFFRON = "#E8A317";
const ff = FONTS.heading;

// Category-specific placeholder icons
const CAT_ICONS = {
  food: UtensilsCrossed, sweets: UtensilsCrossed,
  grocery: ShoppingBag,
  religious: Church, temples: Church,
  weddings: Gem, "event-halls": Building2,
  beauty: Sparkles, wellness: Heart,
  family: GraduationCap, services: Briefcase,
  professionals: Stethoscope,
};

export default function ListingCard({ item, cat }) {
  const thumb = item.photos?.[0] || null;
  const hasRating = item.rating && item.rating > 0;
  const catId = item._catId || cat?.id || "";
  const PlaceholderIcon = CAT_ICONS[catId] || Briefcase;

  return (
    <div
      style={{
        background: "white", borderRadius: "16px", overflow: "hidden",
        border: "1px solid #EDE6DE", transition: "all 0.2s",
        display: "flex", flexDirection: "row", cursor: "pointer",
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
      {/* Thumbnail — always shown, 16:9 aspect, 140x79px */}
      <div style={{
        width: "140px", height: "100px", flexShrink: 0, overflow: "hidden",
        background: "#F5EDE4", borderRadius: "0", position: "relative",
      }}>
        {thumb ? (
          <img src={thumb} alt={item.name} loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px 0 0 8px" }} />
        ) : (
          <div style={{
            width: "100%", height: "100%", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "4px",
          }}>
            <PlaceholderIcon size={24} color="#C5B8AA" strokeWidth={1.5} />
            <span style={{ fontSize: "8px", color: "#C5B8AA", fontFamily: FONTS.body }}>No photo</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "12px 16px", minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <h3 style={{
          fontFamily: ff, fontSize: "15px", fontWeight: 600, margin: "0 0 3px",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#2D2420",
        }}>{item.name}</h3>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "#8A7968", marginBottom: "3px" }}>
          {item.city && <span style={{ display: "flex", alignItems: "center", gap: "2px" }}><MapPin size={10} /> {item.city}</span>}
        </div>

        {hasRating && (
          <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "3px" }}>
            <div style={{ display: "flex", gap: "1px" }}>
              {[1,2,3,4,5].map(s => <Star key={s} size={11} fill={s <= Math.round(item.rating) ? SAFFRON : "#E0D8CF"} color={s <= Math.round(item.rating) ? SAFFRON : "#E0D8CF"} />)}
            </div>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#2D2420" }}>{item.rating}</span>
            {item.reviews && <span style={{ fontSize: "10px", color: "#A89888" }}>({item.reviews.toLocaleString()})</span>}
          </div>
        )}

        {(item.description || item.notable_dishes || item.specialty || item.bio) && (
          <p style={{
            fontSize: "11px", color: "#8A7968", margin: 0, lineHeight: 1.3,
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {item.notable_dishes || item.specialty || item.description || item.bio}
          </p>
        )}
      </div>
    </div>
  );
}
