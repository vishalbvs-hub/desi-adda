import Link from "next/link";
import { FONTS, COLORS } from "@/lib/constants";

const ff = FONTS.body;
const fb = FONTS.body;
const ACCENT = COLORS.accent;

export const metadata = {
  title: "Business Spotlight — Desi Adda",
  description: "Featuring one South Asian business every week. Stories of entrepreneurs, innovators, and community builders in Metro Detroit.",
};

const SPOTLIGHTS = [
  {
    slug: "eco-dosth",
    title: "The Plate That Disappears: How One Troy Entrepreneur Is Replacing Plastic, One Leaf at a Time",
    excerpt: "Krishna Alapati spent two decades in tech before launching Eco Dosth — a sustainability brand rooted in a tradition older than plastic itself.",
    image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1224,h=756,fit=crop/AwvDoRQlrZsGy017/eco-dosth-new-flyer-india-and-us-YleWMQXL3Wc0Bgj9.jpg",
    date: "March 2026",
    business: "Eco Dosth",
    city: "Troy, MI",
  },
];

export default function SpotlightIndex() {
  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px" }}>
        <div style={{ marginBottom: "32px" }}>
          <span style={{
            display: "inline-block", padding: "6px 16px", borderRadius: "999px",
            background: `${ACCENT}15`, color: ACCENT, fontSize: "12px",
            fontWeight: 700, fontFamily: fb, letterSpacing: "0.5px", marginBottom: "12px",
          }}>
            {"\u2728"} BUSINESS SPOTLIGHT
          </span>
          <h1 style={{ fontFamily: ff, fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 700, margin: "0 0 8px", color: COLORS.text }}>
            Business Spotlight
          </h1>
          <p style={{ fontSize: "16px", color: COLORS.textSecondary, margin: 0, lineHeight: 1.6, maxWidth: "600px" }}>
            Every week, we feature one South Asian business in Metro Detroit — their story, their craft, and why you should know about them.
          </p>
        </div>

        {/* Spotlight Cards */}
        <div style={{ display: "grid", gap: "20px" }}>
          {SPOTLIGHTS.map(s => (
            <Link key={s.slug} href={`/spotlight/${s.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{
                background: "white", borderRadius: "10px", overflow: "hidden",
                border: `1px solid ${COLORS.border}`, transition: "all 0.25s",
              }}
              >
                <div style={{ width: "100%", height: "320px", overflow: "hidden" }}>
                  <img src={s.image} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "24px 28px" }}>
                  <div style={{ display: "flex", gap: "8px", marginBottom: "12px", fontSize: "12px", color: COLORS.textSecondary }}>
                    <span>{s.date}</span>
                    <span>{"\u00B7"}</span>
                    <span>{s.business} — {s.city}</span>
                  </div>
                  <h2 style={{ fontFamily: ff, fontSize: "24px", fontWeight: 700, margin: "0 0 12px", color: COLORS.text, lineHeight: 1.3 }}>
                    {s.title}
                  </h2>
                  <p style={{ fontSize: "15px", color: COLORS.textSecondary, margin: 0, lineHeight: 1.6 }}>{s.excerpt}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Nominate */}
        <div style={{ marginTop: "48px", textAlign: "center", padding: "32px", background: "white", borderRadius: "10px", border: `1px dashed ${COLORS.border}` }}>
          <p style={{ fontFamily: ff, fontSize: "20px", fontWeight: 600, margin: "0 0 8px", color: COLORS.text }}>Know a business we should feature?</p>
          <p style={{ fontSize: "14px", color: COLORS.textSecondary, margin: "0 0 16px" }}>We&apos;re looking for South Asian entrepreneurs, shops, and service providers with a great story.</p>
          <Link href="/suggest" style={{
            display: "inline-block", padding: "12px 28px", borderRadius: "10px",
            background: COLORS.primary, color: "white", fontFamily: fb,
            fontWeight: 600, fontSize: "15px", textDecoration: "none",
          }}>
            Nominate a Business
          </Link>
        </div>
      </div>
    </div>
  );
}
