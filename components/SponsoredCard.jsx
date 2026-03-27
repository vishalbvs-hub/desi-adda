import { FONTS } from "@/lib/constants";

export default function SponsoredCard({ ad, style: s }) {
  return (
    <div style={{
      background: ad.bg, borderRadius: "14px", padding: "18px 20px",
      border: "1px solid #EDE6DE", position: "relative", ...s,
    }}>
      <span style={{
        position: "absolute", top: "8px", right: "12px",
        fontSize: "10px", fontWeight: 600, color: "#A89888", letterSpacing: "0.5px",
      }}>SPONSORED</span>
      <div style={{
        fontFamily: FONTS.heading, fontSize: "15px", fontWeight: 700,
        color: ad.color, marginBottom: "4px",
      }}>{ad.brand}</div>
      <p style={{ fontSize: "13px", color: "#5A4A3F", margin: "0 0 12px", lineHeight: 1.5 }}>
        {ad.tagline}
      </p>
      <a
        href={ad.url} target="_blank" rel="noopener noreferrer"
        style={{
          display: "inline-block", padding: "6px 16px", borderRadius: "8px",
          background: ad.color, color: "white", fontSize: "12px", fontWeight: 600,
          fontFamily: FONTS.body, textDecoration: "none",
        }}
      >{ad.cta}</a>
    </div>
  );
}
