import Link from "next/link";
import { FONTS, COLORS } from "@/lib/constants";

const ff = FONTS.heading;
const fb = FONTS.body;
const SAFFRON = "#E8A317";

const HERO_IMG = "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1224,h=756,fit=crop/AwvDoRQlrZsGy017/eco-dosth-new-flyer-india-and-us-YleWMQXL3Wc0Bgj9.jpg";

export const metadata = {
  title: "The Plate That Disappears — Eco Dosth | Desi Adda Spotlight",
  description: "Krishna Alapati spent two decades in tech before launching Eco Dosth — a sustainability brand rooted in a tradition older than plastic itself.",
  openGraph: {
    title: "The Plate That Disappears: How One Troy Entrepreneur Is Replacing Plastic, One Leaf at a Time",
    description: "Krishna Alapati spent two decades in tech before launching Eco Dosth — a sustainability brand rooted in a tradition older than plastic itself.",
    images: [{ url: HERO_IMG, width: 1224, height: 756 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Plate That Disappears — Eco Dosth",
    description: "How one Troy entrepreneur is replacing plastic with leaf plates.",
    images: [HERO_IMG],
  },
};

export default function EcoDosthSpotlight() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "The Plate That Disappears: How One Troy Entrepreneur Is Replacing Plastic, One Leaf at a Time",
    description: "Krishna Alapati spent two decades in tech before launching Eco Dosth — a sustainability brand rooted in a tradition older than plastic itself.",
    image: HERO_IMG,
    author: { "@type": "Organization", name: "Desi Adda" },
    publisher: { "@type": "Organization", name: "Desi Adda", url: "https://desiadda.com" },
    datePublished: "2026-03-30",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ background: "#FFFBF5", minHeight: "100vh" }}>
        {/* Hero Image */}
        <div style={{ width: "100%", maxHeight: "480px", overflow: "hidden", position: "relative" }}>
          <img src={HERO_IMG} alt="Eco Dosth leaf plates and sustainable dining products"
            style={{ width: "100%", height: "480px", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 40%, rgba(0,0,0,0.5))" }} />
        </div>

        {/* Article */}
        <article style={{ maxWidth: "720px", margin: "0 auto", padding: "40px 20px 60px" }}>
          {/* Badge */}
          <div style={{ marginBottom: "20px" }}>
            <Link href="/spotlight" style={{ textDecoration: "none" }}>
              <span style={{
                display: "inline-block", padding: "6px 16px", borderRadius: "999px",
                background: `${SAFFRON}15`, color: SAFFRON, fontSize: "12px",
                fontWeight: 700, fontFamily: fb, letterSpacing: "0.5px",
              }}>
                {"\u2728"} BUSINESS SPOTLIGHT
              </span>
            </Link>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: ff, fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 700,
            lineHeight: 1.15, margin: "0 0 16px", color: "#2D2420",
          }}>
            The Plate That Disappears: How One Troy Entrepreneur Is Replacing Plastic, One Leaf at a Time
          </h1>

          {/* Subhead */}
          <p style={{
            fontFamily: fb, fontSize: "18px", fontStyle: "italic", fontWeight: 400,
            color: "#6B5B4F", lineHeight: 1.5, margin: "0 0 32px",
          }}>
            Krishna Alapati spent two decades in tech before launching Eco Dosth — a sustainability brand rooted in a tradition older than plastic itself.
          </p>

          {/* Byline */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "36px", paddingBottom: "24px", borderBottom: "1px solid #EDE6DE" }}>
            <span style={{ fontSize: "13px", color: "#8A7968", fontFamily: fb }}>By <strong style={{ color: "#2D2420" }}>Desi Adda</strong></span>
            <span style={{ color: "#E0D8CF" }}>{"\u00B7"}</span>
            <span style={{ fontSize: "13px", color: "#8A7968" }}>March 2026</span>
            <span style={{ color: "#E0D8CF" }}>{"\u00B7"}</span>
            <span style={{ fontSize: "13px", color: "#8A7968" }}>5 min read</span>
          </div>

          {/* Body */}
          <div style={{ fontFamily: fb, fontSize: "17px", color: "#2D2420", lineHeight: 1.8 }}>
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
              margin: "40px 0", padding: "24px 32px",
              borderLeft: `4px solid ${SAFFRON}`, background: "#FFFDF8",
              borderRadius: "0 12px 12px 0",
            }}>
              <p style={{
                fontFamily: ff, fontSize: "22px", fontWeight: 600, fontStyle: "italic",
                color: "#2D2420", lineHeight: 1.4, margin: 0,
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
            marginTop: "48px", padding: "28px", background: "white",
            borderRadius: "20px", border: "1px solid #EDE6DE",
            display: "flex", flexDirection: "column", gap: "16px",
          }}>
            <div>
              <h3 style={{ fontFamily: ff, fontSize: "22px", fontWeight: 700, margin: "0 0 4px", color: "#2D2420" }}>Eco Dosth</h3>
              <p style={{ fontSize: "14px", color: "#8A7968", margin: 0 }}>Sustainable leaf plates &amp; eco-friendly dining products</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px", color: "#5A4A3F" }}>
              <div>{"\u{1F310}"} <a href="https://ecodosth.com" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.primary, textDecoration: "none", fontWeight: 600 }}>ecodosth.com</a></div>
              <div>{"\u{1F4E7}"} <a href="mailto:ecodosth@gmail.com" style={{ color: COLORS.primary, textDecoration: "none" }}>ecodosth@gmail.com</a></div>
              <div>{"\u{1F4DE}"} <a href="tel:+12488543145" style={{ color: COLORS.primary, textDecoration: "none" }}>(248) 854-3145</a></div>
              <div>{"\u{1F4CD}"} Troy, Michigan</div>
            </div>
            <a href="https://ecodosth.com" target="_blank" rel="noopener noreferrer" style={{
              display: "inline-block", padding: "12px 28px", borderRadius: "12px",
              background: SAFFRON, color: "white", fontFamily: fb, fontWeight: 600,
              fontSize: "15px", textDecoration: "none", textAlign: "center",
            }}>
              Visit Eco Dosth {"\u2192"}
            </a>
          </div>

          {/* CTA */}
          <div style={{ marginTop: "48px", textAlign: "center", padding: "32px", background: "white", borderRadius: "16px", border: "1px dashed #E0D8CF" }}>
            <p style={{ fontFamily: ff, fontSize: "18px", fontWeight: 600, margin: "0 0 8px", color: "#2D2420" }}>More Spotlights Coming Soon</p>
            <p style={{ fontSize: "14px", color: "#8A7968", margin: "0 0 16px" }}>We feature one South Asian business every week.</p>
            <Link href="/suggest" style={{
              display: "inline-block", padding: "10px 24px", borderRadius: "10px",
              background: COLORS.primary, color: "white", fontFamily: fb,
              fontWeight: 600, fontSize: "14px", textDecoration: "none",
            }}>
              Nominate a Business
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
