"use client";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import { useSaved } from "@/hooks/useSaved";

const PILL_SET = [
  { bg: "var(--pill-blush-bg)", text: "var(--pill-blush-text)" },
  { bg: "var(--pill-mint-bg)", text: "var(--pill-mint-text)" },
  { bg: "var(--pill-butter-bg)", text: "var(--pill-butter-text)" },
  { bg: "var(--pill-lilac-bg)", text: "var(--pill-lilac-text)" },
];

function initialsFor(name) {
  if (!name) return "??";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function pillFor(id) {
  const s = String(id || "");
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return PILL_SET[h % PILL_SET.length];
}

export default function OrgCard({
  id,
  name,
  initials,
  event_count,
  city,
  href,
}) {
  const { isSaved, toggle } = useSaved();
  const saved = id ? isSaved("orgs", id) : false;
  const pill = pillFor(id || name);
  const ini = initials || initialsFor(name);
  const meta = event_count ? `${event_count} events this year` : city;

  return (
    <Link
      href={href || "#"}
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        padding: "18px 14px",
        textDecoration: "none", color: "inherit",
        display: "flex", flexDirection: "column", alignItems: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "48px", height: "48px", borderRadius: "50%",
          background: pill.bg, color: pill.text,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "15px", fontWeight: 500,
          marginBottom: "10px",
        }}
      >
        {ini}
      </div>
      <div
        style={{
          fontSize: "13px", fontWeight: 500, color: "var(--text-primary)",
          lineHeight: 1.3, marginBottom: "4px",
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}
      >
        {name}
      </div>
      {meta && (
        <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginBottom: "12px" }}>
          {meta}
        </div>
      )}
      {id ? (
        <button
          onClick={e => { e.preventDefault(); toggle("orgs", id); }}
          style={{
            display: "inline-flex", alignItems: "center", gap: "4px",
            background: saved ? "var(--brand-primary)" : "transparent",
            border: "1px solid var(--brand-primary)",
            color: saved ? "#FFFFFF" : "var(--brand-primary)",
            padding: "6px 14px",
            borderRadius: "var(--radius-pill)",
            fontSize: "12px", fontWeight: 500,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          <Bookmark size={12} /> {saved ? "Saved ✓" : "Save"}
        </button>
      ) : (
        <span
          style={{
            display: "inline-flex", alignItems: "center", gap: "4px",
            border: "1px solid var(--brand-primary)",
            color: "var(--brand-primary)",
            padding: "6px 14px",
            borderRadius: "var(--radius-pill)",
            fontSize: "12px", fontWeight: 500,
          }}
        >
          <Bookmark size={12} /> Save
        </span>
      )}
    </Link>
  );
}
