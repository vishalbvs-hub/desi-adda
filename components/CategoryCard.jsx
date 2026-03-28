"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { FONTS } from "@/lib/constants";

export default function CategoryCard({ cat }) {
  const [hovered, setHovered] = useState(false);
  const isActive = cat.data || cat.id === "events" || cat.id === "movies";
  const href = cat.id === "movies" ? "/movies" : cat.id === "events" ? "/events" : cat.id === "professionals" ? "/professionals" : `/category/${cat.id}`;

  const inner = (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "white",
        border: `1px solid ${hovered && isActive ? cat.color + "40" : "#EDE6DE"}`,
        borderRadius: "16px",
        padding: "20px",
        textAlign: "left",
        cursor: isActive ? "pointer" : "default",
        transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        opacity: isActive ? 1 : 0.55,
        display: "block",
        textDecoration: "none",
        color: "inherit",
        transform: hovered && isActive ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered && isActive
          ? `0 12px 24px ${cat.color}15, 0 4px 8px rgba(0,0,0,0.06)`
          : "0 1px 3px rgba(0,0,0,0.04)",
        borderLeft: hovered && isActive ? `3px solid ${cat.color}` : "1px solid #EDE6DE",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: "11px",
            background: `${cat.color}10`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.3s ease",
            transform: hovered && isActive ? "scale(1.1)" : "scale(1)",
          }}
        >
          <cat.icon size={20} color={cat.color} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: FONTS.heading, fontSize: "15px", fontWeight: 600 }}>
            {cat.name}
          </div>
          <div style={{ fontSize: "12px", color: "#A89888", fontWeight: 500 }}>
            {cat.count} listings
          </div>
        </div>
        {isActive ? (
          <ChevronRight
            size={16}
            color="#C5B8AA"
            style={{
              transition: "all 0.3s ease",
              transform: hovered ? "translateX(4px)" : "translateX(0)",
              opacity: hovered ? 1 : 0.6,
            }}
          />
        ) : (
          <span
            style={{
              fontSize: "10px",
              fontWeight: 600,
              color: "#BFB098",
              background: "#F5EDE4",
              padding: "2px 8px",
              borderRadius: "999px",
            }}
          >
            SOON
          </span>
        )}
      </div>
    </div>
  );

  if (!isActive) return inner;
  return <Link href={href} style={{ textDecoration: "none", color: "inherit" }}>{inner}</Link>;
}
