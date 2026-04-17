"use client";
import Link from "next/link";
import { Star } from "lucide-react";

const FALLBACK_BG = "var(--pill-butter-bg)";

export default function RestaurantCard({
  id,
  name,
  cuisine,
  city,
  price_tier,
  rating,
  image_url,
  href,
  meta_override,
  fallback_bg = FALLBACK_BG,
}) {
  const meta = meta_override ?? [cuisine, city, price_tier].filter(Boolean).join(" · ");

  return (
    <Link
      href={href || "#"}
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden", textDecoration: "none", color: "inherit",
        display: "flex", flexDirection: "column",
      }}
    >
      <div style={{ position: "relative", height: "120px", background: fallback_bg }}>
        {image_url && (
          <img
            src={image_url} alt={name || ""} loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={e => { e.currentTarget.style.display = "none"; }}
          />
        )}
        {rating && (
          <div
            style={{
              position: "absolute", top: "10px", left: "10px",
              background: "var(--bg-surface)", color: "var(--text-primary)",
              fontSize: "11px", fontWeight: 500,
              padding: "4px 10px", borderRadius: "var(--radius-pill)",
              display: "inline-flex", alignItems: "center", gap: "4px",
            }}
          >
            <Star size={11} fill="var(--brand-primary)" color="var(--brand-primary)" />
            {rating}
          </div>
        )}
      </div>
      <div style={{ padding: "12px 14px" }}>
        <div
          style={{
            fontSize: "14px", fontWeight: 500,
            color: "var(--text-primary)",
            display: "-webkit-box", WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical", overflow: "hidden",
          }}
        >
          {name}
        </div>
        {meta && (
          <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>
            {meta}
          </div>
        )}
      </div>
    </Link>
  );
}
