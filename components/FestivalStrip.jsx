"use client";
import { useState, useEffect } from "react";
import { FONTS, COLORS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

function daysFromNow(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr + "T00:00:00");
  return Math.ceil((target - today) / 86400000);
}

function formatEvent(ev) {
  const days = daysFromNow(ev.event_date);
  const name = ev.event_name.length > 30 ? ev.event_name.substring(0, 28) + "..." : ev.event_name;
  if (days === 0) return `${name} today`;
  if (days === 1) return `${name} tomorrow`;
  if (days <= 7) return `${name} in ${days} days`;
  const d = new Date(ev.event_date + "T00:00:00");
  return `${name} ${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
}

export default function FestivalStrip() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    Promise.all([
      supabase.from("temple_events").select("event_name, event_date").gte("event_date", today).order("event_date").limit(5),
      supabase.from("community_events").select("event_name, event_date").gte("event_date", today).order("event_date").limit(5),
    ]).then(([te, ce]) => {
      const all = [...(te.data || []), ...(ce.data || [])];
      all.sort((a, b) => a.event_date.localeCompare(b.event_date));
      setEvents(all.slice(0, 3));
    });
  }, []);

  if (events.length === 0) return null;

  return (
    <div style={{
      background: COLORS.primary, padding: "7px 20px",
      overflow: "hidden", whiteSpace: "nowrap",
    }}>
      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        display: "flex", gap: "20px", alignItems: "center",
        fontSize: "12px", fontFamily: FONTS.body, fontWeight: 500,
        color: "#F5F2EB",
      }}>
        {events.map((ev, i) => (
          <span key={`${ev.event_date}-${i}`} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            {i > 0 && <span style={{ color: "rgba(245,242,235,0.4)" }}>&middot;</span>}
            {formatEvent(ev)}
          </span>
        ))}
      </div>
    </div>
  );
}
