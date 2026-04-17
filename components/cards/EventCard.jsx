"use client";
import Link from "next/link";

const DEFAULT_PILL_BG = "var(--pill-butter-bg)";

export default function EventCard({
  id,
  name,
  date,
  time,
  org_name,
  org_href,
  neighborhood,
  image_url,
  href,
  status_pills = [],
  accent_bg = DEFAULT_PILL_BG,
  date_label,
}) {
  const displayDate = date_label || formatDate(date, time);
  const meta = [org_name, neighborhood].filter(Boolean).join(" · ");

  return (
    <Link
      href={href || "/community?tab=events"}
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden", textDecoration: "none", color: "inherit",
        display: "flex", flexDirection: "column",
      }}
    >
      <div style={{ position: "relative", height: "140px", background: accent_bg }}>
        {image_url && (
          <img
            src={image_url} alt={name || ""} loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={e => { e.currentTarget.style.display = "none"; }}
          />
        )}
        {displayDate && (
          <div
            style={{
              position: "absolute", bottom: "10px", left: "10px",
              background: "var(--bg-surface)", color: "var(--text-primary)",
              fontSize: "11px", fontWeight: 500,
              padding: "4px 10px", borderRadius: "var(--radius-pill)",
            }}
          >
            {displayDate}
          </div>
        )}
      </div>
      <div style={{ padding: "12px 14px" }}>
        <div
          style={{
            fontSize: "14px", fontWeight: 500,
            color: "var(--text-primary)", lineHeight: 1.3,
            display: "-webkit-box", WebkitLineClamp: 2,
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
        {status_pills.length > 0 && (
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "8px" }}>
            {status_pills.map(p => (
              <span
                key={p.label}
                style={{
                  fontSize: "11px", fontWeight: 500,
                  padding: "2px 8px", borderRadius: "var(--radius-pill)",
                  background: p.bg || "var(--pill-butter-bg)",
                  color: p.text || "var(--pill-butter-text)",
                }}
              >
                {p.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

function formatDate(dateStr, time) {
  if (!dateStr) return null;
  const d = new Date(dateStr + "T00:00:00");
  if (isNaN(d.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.round((d - today) / 86400000);
  const day = d.toLocaleDateString("en-US", { weekday: "short" });
  const base =
    diff === 0 ? "Today"
    : diff === 1 ? "Tomorrow"
    : diff < 7 && diff > 0 ? day
    : d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return time ? `${base} · ${time}` : base;
}
