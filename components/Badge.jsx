import { BADGE_CONFIG } from "@/lib/constants";

export default function Badge({ name }) {
  const c = BADGE_CONFIG[name];
  if (!c) return null;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "3px",
      padding: "2px 8px", borderRadius: "999px", fontSize: "11px",
      fontWeight: 600, background: c.bg, color: c.color, whiteSpace: "nowrap",
    }}>
      <span style={{ fontSize: "10px" }}>{c.icon}</span> {name}
    </span>
  );
}
