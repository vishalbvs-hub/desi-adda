import Link from "next/link";
import { FONTS, COLORS } from "@/lib/constants";

const ff = FONTS.heading;
const fb = FONTS.body;
const DARK_GREEN = "#2C3527";
const GOLD = "#C4A35A";
const CREAM = "#F4F1E8";
const MUTED = "#A8A393";

const HERO_IMG = "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1224,h=756,fit=crop/AwvDoRQlrZsGy017/eco-dosth-new-flyer-india-and-us-YleWMQXL3Wc0Bgj9.jpg";
const PLATE_IMG = "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=480,h=497,fit=crop/AwvDoRQlrZsGy017/clipped_image_20240122_103955-YbNqppxb4kt5nXkW.png";

export const metadata = {
  title: "The Plate That Disappears — Eco Dosth | Desi Adda Spotlight",
  description: "Krishna Alapati spent two decades in tech before launching Eco Dosth — a sustainability brand rooted in a tradition older than plastic itself.",
  openGraph: {
    title: "The Plate That Disappears — Eco Dosth",
    description: "Krishna Alapati spent two decades in tech before launching Eco Dosth — a sustainability brand rooted in a tradition older than plastic itself.",
    images: [{ url: HERO_IMG, width: 1224, height: 756 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Plate That Disappears — Eco Dosth",
    description: "How one Troy entrepreneur is replacing plastic with an ancient tradition.",
    images: [HERO_IMG],
  },
};

export default function EcoDosthSpotlight() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Article",
    headline: "The Plate That Disappears",
    description: "Krishna Alapati spent two decades in tech before launching Eco Dosth — a sustainability brand rooted in a tradition older than plastic itself.",
    image: HERO_IMG,
    author: { "@type": "Organization", name: "Desi Adda" },
    publisher: { "@type": "Organization", name: "Desi Adda" },
    datePublished: "2026-03-30",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ═══ HERO ═══ */}
      <section style={{
        background: DARK_GREEN, padding: "60px 20px 50px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Subtle leaf texture overlay */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "radial-gradient(circle at 20% 30%, rgba(196,163,90,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(196,163,90,0.2) 0%, transparent 40%)" }} />

        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Badge */}
          <div style={{ marginBottom: "24px" }}>
            <Link href="/spotlight" style={{ textDecoration: "none" }}>
              <span style={{
                display: "inline-block", padding: "6px 18px", borderRadius: "999px",
                border: `1.5px solid ${GOLD}50`, background: `${GOLD}10`,
                color: GOLD, fontSize: "11px", fontWeight: 700, fontFamily: fb,
                letterSpacing: "1.5px", textTransform: "uppercase",
              }}>
                {"\u2728"} This Week&apos;s Spotlight
              </span>
            </Link>
          </div>

          {/* Headline + Product Image */}
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(24px, 5vw, 48px)", flexWrap: "wrap", marginBottom: "28px" }}>
            <div style={{ flex: "1 1 320px" }}>
              <h1 style={{
                fontFamily: ff, fontSize: "clamp(36px, 6vw, 56px)", fontWeight: 700,
                lineHeight: 1.1, margin: "0 0 16px", color: CREAM,
              }}>
                The plate that disappears.
              </h1>
              <p style={{
                fontFamily: fb, fontSize: "clamp(16px, 2.5vw, 20px)", fontWeight: 400,
                color: MUTED, lineHeight: 1.5, margin: "0 0 20px", maxWidth: "480px",
              }}>
                How one Troy entrepreneur is replacing plastic with an ancient tradition — one sal leaf at a time.
              </p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {["100% compostable", "zero plastic", "chemical-free"].map(tag => (
                  <span key={tag} style={{
                    padding: "5px 14px", borderRadius: "999px", fontSize: "12px",
                    fontFamily: fb, fontWeight: 500, color: GOLD,
                    border: `1px solid ${GOLD}40`, background: `${GOLD}08`,
                  }}>{tag}</span>
                ))}
              </div>
            </div>
            {/* Circular plate image */}
            <div style={{ flexShrink: 0 }}>
              <img src={PLATE_IMG} alt="Eco Dosth sal leaf plate"
                style={{
                  width: "clamp(160px, 25vw, 200px)", height: "clamp(160px, 25vw, 200px)",
                  borderRadius: "50%", objectFit: "cover",
                  border: `2px solid ${GOLD}`,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                }} />
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px" }}>
            {[
              { num: "6", label: "plate sizes" },
              { num: "0", label: "chemicals" },
              { num: "4 hrs", label: "leak-proof" },
              { num: "100%", label: "natural" },
            ].map(stat => (
              <div key={stat.label} style={{
                padding: "16px", borderRadius: "12px", background: `${GOLD}08`,
                border: `1px solid ${GOLD}15`, textAlign: "center",
              }}>
                <div style={{ fontFamily: ff, fontSize: "24px", fontWeight: 700, color: GOLD, marginBottom: "2px" }}>{stat.num}</div>
                <div style={{ fontSize: "12px", color: MUTED, fontFamily: fb }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ARTICLE BODY ═══ */}
      <article style={{ background: "#FFFBF5" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "48px 20px 60px" }}>
          {/* Byline */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "36px", paddingBottom: "20px", borderBottom: "1px solid #EDE6DE" }}>
            <span style={{ fontSize: "13px", color: "#8A7968", fontFamily: fb }}>By <strong style={{ color: "#2D2420" }}>Desi Adda</strong></span>
            <span style={{ color: "#E0D8CF" }}>{"\u00B7"}</span>
            <span style={{ fontSize: "13px", color: "#8A7968" }}>March 2026</span>
            <span style={{ color: "#E0D8CF" }}>{"\u00B7"}</span>
            <span style={{ fontSize: "13px", color: "#8A7968" }}>5 min read</span>
          </div>

          {/* Body */}
          <div style={{ fontFamily: fb, fontSize: "16px", color: "#2D2420", lineHeight: 1.7 }}>
            <p style={{ marginBottom: "24px" }}>
              South Asian culture has practiced sustainable dining for centuries. Long before &ldquo;eco-friendly&rdquo; became a marketing term, communities across India served meals on sal leaves, banana leaves, and areca palm — natural materials that decompose in weeks rather than decades.
            </p>

            <p style={{ marginBottom: "24px" }}>
              Krishna Alapati, a Troy-based IT professional and entrepreneur, is bringing that tradition to the American market through Eco Dosth. The name combines &ldquo;eco&rdquo; with &ldquo;dosth,&rdquo; meaning friend in Hindi and Telugu — a fitting identity for a brand built around the idea that sustainability and culture can reinforce each other.
            </p>

            <p style={{ marginBottom: "24px" }}>
              The product line is straightforward: sal leaf plates in multiple sizes ranging from 6-inch bowls to 14-inch buffet plates, compartment plates designed for thali-style serving, and wooden cutlery. Every product is 100% natural, chemical-free, compostable, and built to perform. The plates are heat-resistant, leak-proof for up to four hours, and sturdy enough for heavy catering use — a practical alternative to styrofoam and plastic at community events, temple functions, and large gatherings.
            </p>

            {/* Pull Quote */}
            <blockquote style={{
              margin: "40px 0", padding: "28px 32px",
              borderLeft: `4px solid ${GOLD}`, background: "white",
              borderRadius: "0 16px 16px 0",
            }}>
              <p style={{
                fontFamily: ff, fontSize: "22px", fontWeight: 500, fontStyle: "italic",
                color: DARK_GREEN, lineHeight: 1.4, margin: 0,
              }}>
                &ldquo;Sustainability and culture can reinforce each other.&rdquo;
              </p>
            </blockquote>

            <p style={{ marginBottom: "24px" }}>
              What makes Eco Dosth notable is the intersection of cultural heritage and environmental impact. The sal leaf plate is not a new invention. It has been used across eastern and central India for generations, crafted by pressing dried leaves into shape without any chemical binding. Alapati recognized an opportunity to bring this established product to the South Asian diaspora in the United States, where demand for sustainable alternatives is growing and cultural familiarity with leaf plates already exists.
            </p>

            <p style={{ marginBottom: "24px" }}>
              Beyond the business, Alapati is a well-known figure in Metro Detroit&apos;s Telugu community. As a core member of the Troy Telugu Association, he has spent years organizing cultural events, Ugadi celebrations, and programs that strengthen Telugu heritage for families across Michigan.
            </p>

            <p style={{ marginBottom: "0" }}>
              Eco Dosth ships across the United States and is available for individual orders as well as bulk event catering.
            </p>
          </div>

          {/* Business Card */}
          <div style={{
            marginTop: "48px", padding: "32px", background: "white",
            borderRadius: "20px", border: "1px solid #EDE6DE",
          }}>
            <h3 style={{ fontFamily: ff, fontSize: "24px", fontWeight: 700, margin: "0 0 4px", color: DARK_GREEN }}>Eco Dosth</h3>
            <p style={{ fontSize: "14px", color: "#8A7968", margin: "0 0 16px" }}>Troy, Michigan {"\u00B7"} ecodosth.com</p>

            <p style={{
              fontFamily: ff, fontSize: "16px", fontStyle: "italic", color: "#5A4A3F",
              lineHeight: 1.5, margin: "0 0 20px", borderLeft: `3px solid ${GOLD}`, paddingLeft: "16px",
            }}>
              &ldquo;Sustainable leaf plates and eco-friendly dining — heritage, not a trend.&rdquo;
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "20px" }}>
              <a href="https://ecodosth.com" target="_blank" rel="noopener noreferrer" style={{
                display: "inline-block", padding: "12px 24px", borderRadius: "12px",
                background: DARK_GREEN, color: CREAM, fontFamily: fb, fontWeight: 600,
                fontSize: "14px", textDecoration: "none",
              }}>
                Visit ecodosth.com {"\u2192"}
              </a>
              <a href="mailto:ecodosth@gmail.com" style={{
                display: "inline-block", padding: "12px 24px", borderRadius: "12px",
                background: "white", color: DARK_GREEN, fontFamily: fb, fontWeight: 600,
                fontSize: "14px", textDecoration: "none", border: `1.5px solid ${DARK_GREEN}`,
              }}>
                Contact
              </a>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "14px", color: "#5A4A3F" }}>
              <span>{"\u{1F4E7}"} ecodosth@gmail.com</span>
              <span>{"\u{1F4DE}"} (248) 854-3145</span>
            </div>
          </div>

          {/* CTA */}
          <div style={{
            marginTop: "48px", textAlign: "center", padding: "36px",
            background: DARK_GREEN, borderRadius: "20px",
          }}>
            <p style={{ fontFamily: ff, fontSize: "20px", fontWeight: 600, margin: "0 0 8px", color: CREAM }}>More Spotlights Coming Soon</p>
            <p style={{ fontSize: "14px", color: MUTED, margin: "0 0 20px" }}>We feature one South Asian business every week.</p>
            <Link href="/suggest" style={{
              display: "inline-block", padding: "12px 28px", borderRadius: "12px",
              background: GOLD, color: DARK_GREEN, fontFamily: fb,
              fontWeight: 700, fontSize: "14px", textDecoration: "none",
            }}>
              Nominate a Business
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
