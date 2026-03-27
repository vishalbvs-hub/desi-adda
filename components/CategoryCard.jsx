"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { FONTS } from "@/lib/constants";

export default function CategoryCard({ cat }) {
  const isActive = cat.data || cat.id === "events" || cat.id === "movies";
  const href = cat.id === "movies" ? "/movies" : cat.id === "events" ? "/events" : `/category/${cat.id}`;

  const inner = (
    <div
      style={{
        background: "white", border: "1px solid #EDE6DE", borderRadius: "16px",
        padding: "20px", textAlign: "left", cursor: isActive ? "pointer" : "default",
        transition: "all 0.25s", opacity: isActive ? 1 : 0.55, display: "block",
        textDecoration: "none", color: "inherit",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{
          width: 42, height: 42, borderRadius: "11px",
          background: `${cat.color}10`, display: "flex",
          alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
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
          <ChevronRight size={16} color="#C5B8AA" />
        ) : (
          <span style={{
            fontSize: "10px", fontWeight: 600, color: "#BFB098",
            background: "#F5EDE4", padding: "2px 8px", borderRadius: "999px",
          }}>SOON</span>
        )}
      </div>
    </div>
  );

  if (!isActive) return inner;
  return <Link href={href} style={{ textDecoration: "none", color: "inherit" }}>{inner}</Link>;
}
