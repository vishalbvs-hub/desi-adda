"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { FONTS, COLORS, SPONSORED_HOME } from "@/lib/constants";
import { fetchBlogArticles } from "@/lib/data";
import SponsoredCard from "@/components/SponsoredCard";
import ScrollingChips from "@/components/ScrollingChips";

const ff = FONTS.heading;
const fb = FONTS.body;
const SAFFRON = "#E8A317";

export default function BlogPage() {
  const [_data, _setData] = useState(null);
  useEffect(() => { fetchBlogArticles().then(_setData); }, []);

  if (!_data) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>;
  const BLOG_ARTICLES = _data;

  return (
    <div style={{ background: "#FFFBF5", minHeight: "100vh" }}>
      {/* HERO */}
      <section style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
        minHeight: "280px", padding: "40px 20px 36px", textAlign: "center",
        position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ position: "absolute", top: "10%", left: "6%", fontSize: "40px", opacity: 0.05 }}>{"\u{1F4F0}"}</div>
        <div style={{ position: "absolute", top: "20%", right: "8%", fontSize: "50px", opacity: 0.04 }}>{"\u{1F4DD}"}</div>
        <div style={{ position: "absolute", bottom: "15%", left: "12%", fontSize: "44px", opacity: 0.05 }}>{"\u{1F4F1}"}</div>
        <div style={{ position: "absolute", bottom: "8%", right: "20%", fontSize: "36px", opacity: 0.04 }}>{"\u{1F30D}"}</div>

        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <h1 style={{ fontFamily: ff, fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: "white", lineHeight: 1.1, margin: "0 0 8px" }}>
            Desi <span style={{ color: SAFFRON, fontStyle: "italic" }}>News</span>
          </h1>
          <p style={{ fontFamily: ff, fontSize: "clamp(14px, 2vw, 18px)", fontWeight: 300, color: "rgba(255,255,255,0.6)", margin: "0 0 24px", fontStyle: "italic" }}>
            Guides, rankings & stories for the South Asian American experience
          </p>
          <form onSubmit={e => { e.preventDefault(); const v = document.getElementById("news-search").value; if (v.trim()) { window.dispatchEvent(new CustomEvent("askadda", { detail: v })); document.getElementById("news-search").value = ""; } }} style={{ maxWidth: "560px", margin: "0 auto", position: "relative" }}>
            <Search size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#A89888" }} />
            <input id="news-search" placeholder="Search news and articles..."
              style={{ width: "100%", padding: "14px 150px 14px 44px", borderRadius: "14px", border: "none", fontSize: "15px", fontFamily: fb, background: "white", boxShadow: "0 6px 24px rgba(0,0,0,0.2)", boxSizing: "border-box", outline: "none" }} />
            <button type="submit" style={{ position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)", background: SAFFRON, color: "white", border: "none", borderRadius: "10px", padding: "10px 20px", fontFamily: fb, fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>Ask Adda {"\u2728"}</button>
          </form>
          <div style={{ maxWidth: "600px", margin: "14px auto 0" }}>
            <ScrollingChips chips={[
              { emoji: "\u{1F35B}", text: "best biryani spots in Troy" },
              { emoji: "\u{1F3E0}", text: "buying a home as NRI" },
              { emoji: "\u{1FA7A}", text: "finding an Indian doctor" },
              { emoji: "\u{1F4BC}", text: "H1B visa latest updates" },
              { emoji: "\u{1F3AC}", text: "Bollywood box office this week" },
              { emoji: "\u{1F4B0}", text: "NRI tax filing guide" },
              { emoji: "\u{1F6D5}", text: "temple guide Metro Detroit" },
              { emoji: "\u{1F958}", text: "best Indian groceries ranked" },
              { emoji: "\u{1F490}", text: "desi wedding planning tips" },
              { emoji: "\u{1F4F0}", text: "desi community news Detroit" },
            ]} onChipClick={(chip) => window.dispatchEvent(new CustomEvent("askadda", { detail: `${chip.emoji} ${chip.text}` }))} variant="light" />
          </div>
        </div>
      </section>

    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "30px 20px" }}>

      {/* Featured articles */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px", marginBottom: "40px" }}>
        {BLOG_ARTICLES.filter(a => a.featured).map(a => (
          <Link key={a.id} href={`/blog/${a.slug}`} style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid #EDE6DE", transition: "transform 0.2s, box-shadow 0.2s", background: "white", display: "block", textDecoration: "none", color: "inherit" }}>
            <div style={{ height: "8px", background: `linear-gradient(90deg, ${a.color}, ${a.color}80)` }} />
            <div style={{ padding: "22px" }}>
              <div style={{ display: "flex", gap: "8px", marginBottom: "8px", alignItems: "center" }}>
                <span style={{ fontSize: "11px", fontWeight: 600, color: a.color, textTransform: "uppercase", letterSpacing: "0.5px" }}>{a.category}</span>
                <span style={{ fontSize: "11px", color: "#A89888" }}>{"\u00B7"}</span>
                <span style={{ fontSize: "11px", color: "#A89888" }}>{a.readTime}</span>
              </div>
              <h2 style={{ fontFamily: ff, fontSize: "19px", fontWeight: 700, margin: "0 0 8px", lineHeight: 1.3 }}>{a.title}</h2>
              <p style={{ fontSize: "13px", color: "#6B5B4F", lineHeight: 1.5, margin: "0 0 12px" }}>{a.excerpt}</p>
              <div style={{ fontSize: "12px", color: "#A89888" }}>{a.author} {"\u00B7"} {a.date}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Sponsored */}
      <div style={{ marginBottom: "30px" }}>
        <SponsoredCard ad={SPONSORED_HOME[1]} />
      </div>

      {/* All articles */}
      <h2 style={{ fontFamily: ff, fontSize: "22px", fontWeight: 700, marginBottom: "16px" }}>All Articles</h2>
      <div style={{ display: "grid", gap: "14px" }}>
        {BLOG_ARTICLES.filter(a => !a.featured).map(a => (
          <Link key={a.id} href={`/blog/${a.slug}`} style={{ background: "white", borderRadius: "14px", padding: "18px 22px", border: "1px solid #EDE6DE", transition: "box-shadow 0.2s", display: "flex", gap: "16px", alignItems: "flex-start", textDecoration: "none", color: "inherit" }}>
            <div style={{ width: "6px", height: "60px", borderRadius: "3px", background: a.color, flexShrink: 0, marginTop: "4px" }} />
            <div>
              <div style={{ display: "flex", gap: "8px", marginBottom: "4px", alignItems: "center" }}>
                <span style={{ fontSize: "11px", fontWeight: 600, color: a.color, textTransform: "uppercase" }}>{a.category}</span>
                <span style={{ fontSize: "11px", color: "#A89888" }}>{a.readTime}</span>
              </div>
              <h3 style={{ fontFamily: ff, fontSize: "16px", fontWeight: 600, margin: "0 0 4px", lineHeight: 1.3 }}>{a.title}</h3>
              <p style={{ fontSize: "13px", color: "#6B5B4F", margin: "0 0 6px", lineHeight: 1.5 }}>{a.excerpt.substring(0, 120)}...</p>
              <div style={{ fontSize: "12px", color: "#A89888" }}>{a.date}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </div>
  );
}
