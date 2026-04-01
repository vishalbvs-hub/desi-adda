"use client";
import { MapPin, Star, Globe, UtensilsCrossed, ShoppingBag, Stethoscope, Church, Gem, Sparkles, Heart, GraduationCap, Briefcase, Building2 } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";

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
    <div style={{
      background: COLORS.cardBg, borderRadius: "10px", overflow: "hidden",
      border: `1px solid ${COLORS.border}`, transition: "all 0.15s",
      display: "flex", flexDirection: "row", cursor: "pointer",
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 3px 12px rgba(0,0,0,0.06)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ width: "80px", height: "80px", flexShrink: 0, overflow: "hidden", background: COLORS.bg }}>
        {thumb ? (
          <img src={thumb} alt={item.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <PlaceholderIcon size={22} color={COLORS.textFaint} strokeWidth={1.5} />
          </div>
        )}
      </div>

      <div style={{ flex: 1, padding: "10px 14px", minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
          <h3 style={{ fontSize: "14px", fontWeight: 600, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: COLORS.text, fontFamily: FONTS.body }}>{item.name}</h3>
          {hasRating && (
            <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "12px", flexShrink: 0 }}>
              <Star size={11} fill={COLORS.accent} color={COLORS.accent} />
              <span style={{ fontWeight: 600, color: COLORS.text }}>{item.rating}</span>
              {item.reviews && <span style={{ color: COLORS.textMuted, fontSize: "11px" }}>({item.reviews.toLocaleString()})</span>}
            </span>
          )}
          {item.city && <span style={{ fontSize: "11px", color: COLORS.textSecondary, flexShrink: 0 }}>{item.city}</span>}
        </div>

        {(item.description || item.notable_dishes || item.specialty || item.bio) && (
          <p style={{ fontSize: "12px", color: COLORS.textSecondary, margin: 0, lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {item.notable_dishes || item.specialty || item.description || item.bio}
          </p>
        )}
      </div>
    </div>
  );
}
