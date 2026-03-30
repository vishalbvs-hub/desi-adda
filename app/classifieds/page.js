"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, Plus, User, MessageSquare } from "lucide-react";
import { FONTS, COLORS, CLASSIFIEDS_CATEGORIES, SPONSORED_HOME } from "@/lib/constants";
import { fetchClassifieds } from "@/lib/data";
import SponsoredCard from "@/components/SponsoredCard";
import ScrollingChips from "@/components/ScrollingChips";

const ff = FONTS.heading;
const fb = FONTS.body;
const SAFFRON = "#E8A317";

const CHIPS = [
  { emoji: "\u{1F3E0}", text: "roommate in Farmington Hills" },
  { emoji: "\u{1F4BC}", text: "IT jobs Metro Detroit" },
  { emoji: "\u{1F697}", text: "used Honda for sale" },
  { emoji: "\u{1F37D}\uFE0F", text: "tiffin service near Troy" },
  { emoji: "\u{1F476}", text: "babysitter near Novi" },
  { emoji: "\u{1F3E0}", text: "apartment sublease Ann Arbor" },
  { emoji: "\u{1F527}", text: "handyman services" },
  { emoji: "\u{1F4BC}", text: "desi consulting firms hiring" },
  { emoji: "\u{1F697}", text: "Indian mechanic near me" },
  { emoji: "\u{1F3E0}", text: "2 BHK share Canton" },
];

export default function ClassifiedsPage() {
  return <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>}><ClassifiedsInner /></Suspense>;
}

function ClassifiedsInner() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("cat") || "all";
  const [boardFilter, setBoardFilter] = useState(initialCat);
  const [_data, _setData] = useState(null);

  useEffect(() => { fetchClassifieds().then(_setData); }, []);

  const triggerChat = (q) => { window.dispatchEvent(new CustomEvent("askadda", { detail: q })); };

  if (!_data) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFFBF5" }}><p style={{ fontFamily: ff, color: COLORS.textMuted }}>Loading...</p></div>;

  const filtered = boardFilter === "all" ? _data : _data.filter(p => p.cat === boardFilter);

  return (
    <div style={{ background: "#FFFBF5", minHeight: "100vh" }}>
      {/* HERO */}
      <section style={{
        background: "linear-gradient(135deg, #2D2420 0%, #3E2F26 40%, #5A4435 100%)",
        minHeight: "300px", padding: "40px 20px 36px", textAlign: "center",
        position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ position: "absolute", top: "10%", left: "6%", fontSize: "40px", opacity: 0.05 }}>{"\u{1F3E0}"}</div>
        <div style={{ position: "absolute", top: "20%", right: "8%", fontSize: "50px", opacity: 0.04 }}>{"\u{1F4BC}"}</div>
        <div style={{ position: "absolute", bottom: "15%", left: "12%", fontSize: "44px", opacity: 0.05 }}>{"\u{1F697}"}</div>
        <div style={{ position: "absolute", bottom: "8%", right: "20%", fontSize: "36px", opacity: 0.04 }}>{"\u{1F37D}\uFE0F"}</div>

        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <h1 style={{ fontFamily: ff, fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: "white", lineHeight: 1.1, margin: "0 0 8px" }}>
            Desi <span style={{ color: SAFFRON, fontStyle: "italic" }}>Classifieds</span>
          </h1>
          <p style={{ fontFamily: ff, fontSize: "clamp(14px, 2vw, 18px)", fontWeight: 300, color: "rgba(255,255,255,0.6)", margin: "0 0 24px", fontStyle: "italic" }}>
            Roommates, jobs, services & more from the Detroit desi community
          </p>

          <form onSubmit={e => { e.preventDefault(); const v = document.getElementById("class-search").value; if (v.trim()) { triggerChat(v); document.getElementById("class-search").value = ""; } }} style={{ maxWidth: "560px", margin: "0 auto", position: "relative" }}>
            <Search size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#A89888" }} />
            <input id="class-search" placeholder="Find roommates, jobs, services..."
              style={{ width: "100%", padding: "14px 150px 14px 44px", borderRadius: "14px", border: "none", fontSize: "15px", fontFamily: fb, background: "white", boxShadow: "0 6px 24px rgba(0,0,0,0.2)", boxSizing: "border-box", outline: "none" }} />
            <button type="submit" style={{ position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)", background: SAFFRON, color: "white", border: "none", borderRadius: "10px", padding: "10px 20px", fontFamily: fb, fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>Ask Adda {"\u2728"}</button>
          </form>
          <div style={{ maxWidth: "600px", margin: "14px auto 0" }}>
            <ScrollingChips chips={CHIPS} onChipClick={(chip) => triggerChat(`${chip.emoji} ${chip.text}`)} variant="light" />
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <div style={{ background: "white", borderBottom: "1px solid #EDE6DE", padding: "12px 20px", display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          <button onClick={() => setBoardFilter("all")} style={{ padding: "7px 16px", borderRadius: "999px", fontSize: "12px", fontFamily: fb, fontWeight: 600, cursor: "pointer", border: boardFilter === "all" ? `2px solid ${SAFFRON}` : "2px solid #EDE6DE", background: boardFilter === "all" ? SAFFRON : "white", color: boardFilter === "all" ? "#2D2420" : COLORS.textMuted, transition: "all 0.25s" }}>{"\u2728"} All</button>
          {CLASSIFIEDS_CATEGORIES.map(c => (
            <button key={c.id} onClick={() => setBoardFilter(c.id)} style={{ padding: "7px 16px", borderRadius: "999px", fontSize: "12px", fontFamily: fb, fontWeight: 600, cursor: "pointer", border: boardFilter === c.id ? `2px solid ${SAFFRON}` : "2px solid #EDE6DE", background: boardFilter === c.id ? SAFFRON : "white", color: boardFilter === c.id ? "#2D2420" : COLORS.textMuted, transition: "all 0.25s" }}>{c.emoji} {c.label}</button>
          ))}
        </div>
        <Link href="/community/post" style={{ textDecoration: "none" }}>
          <button style={{ padding: "8px 18px", borderRadius: "10px", background: COLORS.primary, color: "white", border: "none", fontFamily: fb, fontWeight: 600, fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
            <Plus size={14} /> Post
          </button>
        </Link>
      </div>

      {/* POSTS */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "30px 20px" }}>
        <div style={{ marginBottom: "16px" }}>
          <SponsoredCard ad={SPONSORED_HOME[0]} />
        </div>

        <div style={{ display: "grid", gap: "12px" }}>
          {filtered.map(post => {
            const catInfo = CLASSIFIEDS_CATEGORIES.find(c => c.id === post.cat);
            return (
              <div key={post.id} style={{ background: "white", borderRadius: "14px", padding: "18px 22px", border: "1px solid #EDE6DE", cursor: "pointer", transition: "box-shadow 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.05)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", flexWrap: "wrap" }}>
                      <span style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 600, background: "#F5EDE4", color: "#8A7968" }}>
                        {catInfo ? `${catInfo.emoji} ${catInfo.label}` : post.cat}
                      </span>
                      {post.city && <span style={{ fontSize: "11px", color: "#A89888" }}>{post.city}</span>}
                    </div>
                    <h3 style={{ fontFamily: ff, fontSize: "16px", fontWeight: 600, margin: "0 0 6px", color: "#2D2420" }}>{post.title}</h3>
                    <p style={{ fontSize: "13px", color: "#6B5B4F", margin: "0 0 8px", lineHeight: 1.5 }}>{post.body?.substring(0, 180)}{post.body?.length > 180 ? "..." : ""}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "12px", color: "#A89888" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "3px" }}><User size={12} /> {post.author_name || "Anonymous"}</span>
                      {post.budget && <span style={{ fontWeight: 600, color: COLORS.primary }}>{post.budget}</span>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#8A7968" }}>
              <p style={{ fontFamily: ff, fontSize: "18px" }}>No posts yet in this category</p>
              <p style={{ fontSize: "13px" }}>Be the first to post!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
