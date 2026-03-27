"use client";
import Link from "next/link";
import { FONTS, SPONSORED_HOME } from "@/lib/constants";
import { BLOG_ARTICLES } from "@/lib/data";
import SponsoredCard from "@/components/SponsoredCard";

export default function BlogPage() {
  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "30px 20px" }}>
      <h1 style={{ fontFamily: FONTS.heading, fontSize: "32px", fontWeight: 700, margin: "0 0 4px" }}>
        The Adda Blog
      </h1>
      <p style={{ fontSize: "15px", color: "#8A7968", margin: "0 0 30px" }}>
        Guides, rankings, and stories for the South Asian American experience.
      </p>

      {/* Featured articles */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px", marginBottom: "40px" }}>
        {BLOG_ARTICLES.filter(a => a.featured).map(a => (
          <Link
            key={a.id} href={`/blog/${a.slug}`}
            style={{
              borderRadius: "16px", overflow: "hidden", border: "1px solid #EDE6DE",
              transition: "transform 0.2s, box-shadow 0.2s", background: "white",
              display: "block", textDecoration: "none", color: "inherit",
            }}
          >
            <div style={{ height: "8px", background: `linear-gradient(90deg, ${a.color}, ${a.color}80)` }} />
            <div style={{ padding: "22px" }}>
              <div style={{ display: "flex", gap: "8px", marginBottom: "8px", alignItems: "center" }}>
                <span style={{ fontSize: "11px", fontWeight: 600, color: a.color, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  {a.category}
                </span>
                <span style={{ fontSize: "11px", color: "#A89888" }}>·</span>
                <span style={{ fontSize: "11px", color: "#A89888" }}>{a.readTime}</span>
              </div>
              <h2 style={{ fontFamily: FONTS.heading, fontSize: "19px", fontWeight: 700, margin: "0 0 8px", lineHeight: 1.3 }}>
                {a.title}
              </h2>
              <p style={{ fontSize: "13px", color: "#6B5B4F", lineHeight: 1.5, margin: "0 0 12px" }}>
                {a.excerpt}
              </p>
              <div style={{ fontSize: "12px", color: "#A89888" }}>{a.author} · {a.date}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Sponsored */}
      <div style={{ marginBottom: "30px" }}>
        <SponsoredCard ad={SPONSORED_HOME[1]} />
      </div>

      {/* All articles */}
      <h2 style={{ fontFamily: FONTS.heading, fontSize: "22px", fontWeight: 700, marginBottom: "16px" }}>
        All Articles
      </h2>
      <div style={{ display: "grid", gap: "14px" }}>
        {BLOG_ARTICLES.filter(a => !a.featured).map(a => (
          <Link
            key={a.id} href={`/blog/${a.slug}`}
            style={{
              background: "white", borderRadius: "14px", padding: "18px 22px",
              border: "1px solid #EDE6DE", transition: "box-shadow 0.2s",
              display: "flex", gap: "16px", alignItems: "flex-start",
              textDecoration: "none", color: "inherit",
            }}
          >
            <div style={{
              width: "6px", height: "60px", borderRadius: "3px",
              background: a.color, flexShrink: 0, marginTop: "4px",
            }} />
            <div>
              <div style={{ display: "flex", gap: "8px", marginBottom: "4px", alignItems: "center" }}>
                <span style={{ fontSize: "11px", fontWeight: 600, color: a.color, textTransform: "uppercase" }}>
                  {a.category}
                </span>
                <span style={{ fontSize: "11px", color: "#A89888" }}>{a.readTime}</span>
              </div>
              <h3 style={{ fontFamily: FONTS.heading, fontSize: "16px", fontWeight: 600, margin: "0 0 4px", lineHeight: 1.3 }}>
                {a.title}
              </h3>
              <p style={{ fontSize: "13px", color: "#6B5B4F", margin: "0 0 6px", lineHeight: 1.5 }}>
                {a.excerpt.substring(0, 120)}...
              </p>
              <div style={{ fontSize: "12px", color: "#A89888" }}>{a.date}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
