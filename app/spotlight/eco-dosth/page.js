import Link from "next/link";
import { FONTS, COLORS } from "@/lib/constants";

const ff = FONTS.heading;
const fb = FONTS.body;
const DARK_GREEN = "#2C3527";
const GOLD = "#C4A35A";
const CREAM = "#F4F1E8";
const MUTED = "#A8A393";

const HERO_IMG = "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1224,h=756,fit=crop/AwvDoRQlrZsGy017/eco-dosth-new-flyer-india-and-us-YleWMQXL3Wc0Bgj9.jpg";

export const metadata = {
  title: "The Plate That Disappears — Eco Dosth | Desi Adda Spotlight",
  description: "How one Troy entrepreneur is replacing plastic with an ancient tradition — one sal leaf at a time.",
  openGraph: {
    title: "The Plate That Disappears — Eco Dosth",
    description: "How one Troy entrepreneur is replacing plastic with an ancient tradition — one sal leaf at a time.",
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
    description: "How one Troy entrepreneur is replacing plastic with an ancient tradition — one sal leaf at a time.",
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

          {/* Headline */}
          <h1 style={{
            fontFamily: ff, fontSize: "clamp(36px, 6vw, 56px)", fontWeight: 700,
            lineHeight: 1.1, margin: "0 0 16px", color: CREAM,
          }}>
            The plate that disappears.
          </h1>

          {/* Subhead */}
          <p style={{
            fontFamily: fb, fontSize: "clamp(16px, 2.5vw, 20px)", fontWeight: 400,
            color: MUTED, lineHeight: 1.5, margin: "0 0 28px", maxWidth: "640px",
          }}>
            How one Troy entrepreneur is replacing plastic with an ancient tradition — one sal leaf at a time.
          </p>

          {/* Tags */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "36px" }}>
            {["100% compostable", "zero plastic", "chemical-free"].map(tag => (
              <span key={tag} style={{
                padding: "5px 14px", borderRadius: "999px", fontSize: "12px",
                fontFamily: fb, fontWeight: 500, color: GOLD,
                border: `1px solid ${GOLD}40`, background: `${GOLD}08`,
              }}>{tag}</span>
            ))}
          </div>

          {/* Product image */}
          <div style={{ borderRadius: "16px", overflow: "hidden", marginBottom: "32px" }}>
            <img src={HERO_IMG} alt="Eco Dosth sustainable leaf plates"
              style={{ width: "100%", height: "auto", maxHeight: "400px", objectFit: "cover" }} />
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
              Every desi kid has eaten off a leaf plate at some point — at a temple prasadam line, a wedding in India, a family puja. It&apos;s one of those things you don&apos;t think about until someone reframes it. Krishna Alapati reframed it.
            </p>

            <p style={{ marginBottom: "24px" }}>
              Alapati, a longtime Troy resident and IT professional, launched Eco Dosth (<em>dosth</em> means &ldquo;friend&rdquo; in Hindi/Telugu) to bring sal leaf plates, wooden cutlery, and other plastic-free alternatives to the American market. The pitch is simple: why use styrofoam at your next Diwali party when you could use something your grandmother would recognize — and that composts in weeks instead of sitting in a landfill for centuries?
            </p>

            <p style={{ marginBottom: "24px" }}>
              The product line includes sal leaf plates in multiple sizes (6-inch bowls to 14-inch buffet plates), compartment plates perfect for a thali setup, and wooden cutlery. Everything is 100% natural, chemical-free, compostable, and — this matters for anyone who&apos;s hosted a 200-person function — genuinely sturdy. Heat-resistant, leak-proof, and they hold up to dal without going soft.
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
                &ldquo;Why use styrofoam at your next Diwali party when you could use something your grandmother would recognize?&rdquo;
              </p>
            </blockquote>

            <p style={{ marginBottom: "24px" }}>
              But Eco Dosth is more than a product. It&apos;s a statement about what the desi community can lead on. South Asian culture has practiced sustainable dining for thousands of years. Eating off banana leaves in the South, sal leaves in the East, dona-pattal across the North — this isn&apos;t a trend, it&apos;s heritage. Alapati is just making it accessible in a 48083 zip code.
            </p>

            <p style={{ marginBottom: "24px" }}>
              Beyond the business, Alapati is a fixture in Metro Detroit&apos;s Telugu community. As a core member of the Troy Telugu Association (TTA), he&apos;s spent years organizing cultural events, Ugadi celebrations, and community programs that keep Telugu traditions alive for the next generation growing up in Michigan.
            </p>

            <p style={{ marginBottom: "0" }}>
              Eco Dosth ships across the US. For your next house party, temple event, or wedding function, it might be worth trading the Costco plasticware for something with a story.
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
