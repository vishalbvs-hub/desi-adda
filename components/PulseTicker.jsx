"use client";
import { useState, useEffect } from "react";
import { FONTS, COLORS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

export default function PulseTicker() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function loadStats() {
      const [
        { count: restCount },
        { count: templeCount },
        { count: eventCount },
        { count: classifiedCount },
        { count: vendorCount },
        { count: groceryCount },
      ] = await Promise.all([
        supabase.from("restaurants").select("*", { count: "exact", head: true }),
        supabase.from("temples").select("*", { count: "exact", head: true }),
        supabase.from("events").select("*", { count: "exact", head: true }),
        supabase.from("classifieds").select("*", { count: "exact", head: true }),
        supabase.from("wedding_vendors").select("*", { count: "exact", head: true }),
        supabase.from("groceries").select("*", { count: "exact", head: true }),
      ]);

      setItems([
        `🍛 ${restCount || 0}+ restaurants listed`,
        `🛕 ${templeCount || 0}+ temples & mosques`,
        `🎉 ${eventCount || 0}+ upcoming events`,
        `📋 ${classifiedCount || 0}+ community posts`,
        `💍 ${vendorCount || 0}+ wedding vendors`,
        `🛒 ${groceryCount || 0}+ grocery stores`,
        `📰 New listings added daily`,
        `🔄 Updated ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}`,
      ]);
    }
    loadStats();
  }, []);

  if (items.length === 0) return null;

  // Double the items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div
      style={{
        overflow: "hidden",
        background: COLORS.surface,
        borderBottom: `1px solid ${COLORS.borderLight}`,
        padding: "8px 0",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "48px",
          whiteSpace: "nowrap",
          animation: "ticker-scroll 30s linear infinite",
          width: "fit-content",
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: FONTS.body,
              fontSize: "12px",
              color: COLORS.textMuted,
              fontWeight: 500,
              letterSpacing: "0.3px",
            }}
          >
            {item}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
