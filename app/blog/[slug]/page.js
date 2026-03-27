"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import { fetchBlogArticles } from "@/lib/data";
import NewsletterSignup from "@/components/NewsletterSignup";

export default function ArticlePage() {
  const [_data, _setData] = useState(null);
  useEffect(() => { fetchBlogArticles().then(_setData); }, []);
  if (!_data) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>;
  const BLOG_ARTICLES = _data;

  const { slug } = useParams();
  const a = BLOG_ARTICLES.find(article => article.slug === slug);

  if (!a) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <h1 style={{ fontFamily: FONTS.heading, fontSize: "24px" }}>Article not found</h1>
        <Link href="/blog" style={{ color: COLORS.primary, fontWeight: 600, marginTop: "12px", display: "inline-block" }}>
          ← Back to blog
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Sticky article nav */}
      <div style={{
        background: "white", borderBottom: "1px solid #EDE6DE", padding: "12px 20px",
        display: "flex", alignItems: "center", gap: "12px",
      }}>
        <Link href="/blog" style={{
          display: "flex", alignItems: "center", gap: "6px",
          color: COLORS.primary, fontFamily: FONTS.body, fontWeight: 600, fontSize: "14px",
        }}>
          <ArrowLeft size={18} /> Blog
        </Link>
      </div>

      <article style={{ maxWidth: "720px", margin: "0 auto", padding: "40px 20px" }}>
        <div style={{ display: "flex", gap: "8px", marginBottom: "12px", alignItems: "center" }}>
          <span style={{
            padding: "4px 12px", borderRadius: "999px", fontSize: "12px",
            fontWeight: 600, background: `${a.color}15`, color: a.color,
          }}>
            {a.category}
          </span>
          <span style={{ fontSize: "13px", color: "#A89888" }}>{a.readTime}</span>
        </div>

        <h1 style={{
          fontFamily: FONTS.heading, fontSize: "clamp(28px, 5vw, 38px)",
          fontWeight: 700, lineHeight: 1.2, margin: "0 0 12px",
        }}>
          {a.title}
        </h1>

        <div style={{ fontSize: "14px", color: "#8A7968", marginBottom: "30px" }}>
          By {a.author} · {a.date}
        </div>

        <div style={{
          height: "4px", background: `linear-gradient(90deg, ${a.color}, ${a.color}40)`,
          borderRadius: "2px", marginBottom: "30px",
        }} />

        <div style={{ fontSize: "16px", lineHeight: 1.8, color: "#3D3530" }}>
          <p style={{
            fontSize: "18px", fontWeight: 500, color: "#2D2420",
            lineHeight: 1.6, marginBottom: "24px",
          }}>
            {a.excerpt}
          </p>
          <p>
            This is where the full article content would go. In production, articles would be stored
            in Supabase or a CMS (like Notion or Contentful) and rendered dynamically.
          </p>
          <p>
            Each article is an SEO opportunity — &quot;H-1B to Green Card timeline 2026&quot; is a search
            query thousands of people type every month. &quot;Best biryani in Troy Michigan&quot; drives
            local search traffic. This is how you build organic traffic that compounds over time.
          </p>
          <p>
            Articles also create natural placements for affiliate links and sponsored content that
            feel editorial rather than promotional.
          </p>
        </div>

        {/* Newsletter CTA */}
        <div style={{ marginTop: "40px" }}>
          <NewsletterSignup variant="inline" />
        </div>
      </article>
    </>
  );
}
