import Link from "next/link";
import { FONTS, COLORS } from "@/lib/constants";

const ff = FONTS.body;
const fb = FONTS.body;

// Template for future community spotlight articles
// Content will be stored in a Supabase table when we start publishing

export const metadata = {
  title: "Community Spotlight — Desi Adda",
  description: "Stories of community leaders and changemakers in Metro Detroit's South Asian community.",
};

export default function CommunitySpotlightPage() {
  return (
    <div style={{ background: "#F5F2EB", minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 20px" }}>
      <h1 style={{ fontFamily: ff, fontSize: "28px", fontWeight: 700, margin: "0 0 8px" }}>Coming Soon</h1>
      <p style={{ fontSize: "15px", color: "#6B6B6B", margin: "0 0 20px" }}>This community spotlight is being prepared.</p>
      <Link href="/news?tab=community" style={{ color: COLORS.primary, fontWeight: 600, textDecoration: "none" }}>← Back to News</Link>
    </div>
  );
}
