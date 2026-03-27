"use client";
import { MapPin, Phone, ExternalLink, Navigation } from "lucide-react";
import { FONTS } from "@/lib/constants";
import Badge from "./Badge";
import StarRating from "./StarRating";

export default function ListingCard({ item, cat }) {
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
          <h3 style={{ fontFamily: FONTS.heading, fontSize: "17px", fontWeight: 600, margin: "0 0 4px" }}>
            {item.name}
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "13px", color: "#8A7968", marginBottom: "6px", flexWrap: "wrap" }}>
            {item.city && (
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <MapPin size={13} />{item.city}
              </span>
            )}
            {item.phone && (
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Phone size={13} />{item.phone}
              </span>
            )}
          </div>
          {item.rating && (
            <div style={{ marginBottom: "8px" }}>
              <StarRating rating={item.rating} reviews={item.reviews} />
            </div>
          )}
          {(item.description || item.desc) && (
            <p style={{ fontSize: "13px", color: "#8A7968", margin: "0 0 8px", lineHeight: 1.4, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
              {item.description || item.desc}
            </p>
          )}
          {item.badges?.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "10px" }}>
              {item.badges.map(b => <Badge key={b} name={b} />)}
            </div>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {item.sub?.map(s => (
              <span key={s} style={{
                padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 500,
                background: `${cat.color}08`, color: cat.color, border: `1px solid ${cat.color}20`,
              }}>{s}</span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", flexShrink: 0 }}>
          <a
            href={item.url || "#"} target="_blank" rel="noopener noreferrer"
            style={{
              padding: "8px 18px", borderRadius: "10px", background: cat.color,
              color: "white", fontFamily: FONTS.body, fontWeight: 600, fontSize: "13px",
              textDecoration: "none", display: "flex", alignItems: "center", gap: "5px",
            }}
          >Visit <ExternalLink size={12} /></a>
          {item.city && item.city !== "National" && item.city !== "Online" && (
            <a
              href={`https://www.google.com/maps/search/${encodeURIComponent(item.name + " " + item.city)}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                padding: "8px 18px", borderRadius: "10px", background: "white",
                color: "#5A4A3F", fontFamily: FONTS.body, fontWeight: 500, fontSize: "12px",
                textDecoration: "none", display: "flex", alignItems: "center", gap: "5px",
                border: "1px solid #E0D8CF",
              }}
            ><Navigation size={12} /> Directions</a>
          )}
        </div>
      </div>
    </div>
  );
}
