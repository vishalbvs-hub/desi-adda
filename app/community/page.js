"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Plus, User, MessageSquare, Search } from "lucide-react";
import { FONTS, COLORS, CLASSIFIEDS_CATEGORIES, SPONSORED_HOME } from "@/lib/constants";
import { fetchClassifieds } from "@/lib/data";
import SponsoredCard from "@/components/SponsoredCard";
import ScrollingChips from "@/components/ScrollingChips";

const ff = FONTS.heading;
const fb = FONTS.body;
const SAFFRON = "#E8A317";

export default function CommunityPage() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("cat") || "all";
  const [boardFilter, setBoardFilter] = useState(initialCat);

  const pill = (active) => ({
    padding: "7px 16px", borderRadius: "999px", fontSize: "12px",
    fontFamily: fb, fontWeight: 600, cursor: "pointer",
    border: active ? `2px solid ${SAFFRON}` : "2px solid #EDE6DE",
    background: active ? SAFFRON : "white",
    color: active ? "#2D2420" : COLORS.textMuted,
    transition: "all 0.25s", whiteSpace: "nowrap",
  });

  const [_data, _setData] = useState(null);
  useEffect(() => { fetchClassifieds().then(_setData); }, []);


  if (!_data) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>;
  const CLASSIFIEDS_POSTS = _data;
  const filtered = boardFilter === "all" ? CLASSIFIEDS_POSTS : CLASSIFIEDS_POSTS.filter(p => p.cat === boardFilter);

  return (
    <div style={{ background: "#FFFBF5", minHeight: "100vh" }}>
      {/* HERO */}
      <section style={{
        background: "linear-gradient(135deg, #2D2420 0%, #3E2F26 40%, #5A4435 100%)",
        minHeight: "280px", padding: "40px 20px 36px", textAlign: "center",
        position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ position: "absolute", top: "10%", left: "6%", fontSize: "40px", opacity: 0.05 }}>{"\u{1F3E0}"}</div>
        <div style={{ position: "absolute", top: "20%", right: "8%", fontSize: "50px", opacity: 0.04 }}>{"\u{1F4BC}"}</div>
        <div style={{ position: "absolute", bottom: "15%", left: "12%", fontSize: "44px", opacity: 0.05 }}>{"\u{1F465}"}</div>
        <div style={{ position: "absolute", bottom: "8%", right: "20%", fontSize: "36px", opacity: 0.04 }}>{"\u{1F697}"}</div>

        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <h1 style={{ fontFamily: ff, fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: "white", lineHeight: 1.1, margin: "0 0 8px" }}>
            Community <span style={{ color: SAFFRON, fontStyle: "italic" }}>Board</span>
          </h1>
          <p style={{ fontFamily: ff, fontSize: "clamp(14px, 2vw, 18px)", fontWeight: 300, color: "rgba(255,255,255,0.6)", margin: "0 0 24px", fontStyle: "italic" }}>
            Roommates, jobs, services & more from the Detroit desi community
          </p>
          <form onSubmit={e => { e.preventDefault(); const v = document.getElementById("comm-search").value; if (v.trim()) { window.dispatchEvent(new CustomEvent("askadda", { detail: v })); document.getElementById("comm-search").value = ""; } }} style={{ maxWidth: "560px", margin: "0 auto", position: "relative" }}>
            <Search size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#A89888" }} />
            <input id="comm-search" placeholder="Find roommates, jobs, services..."
              style={{ width: "100%", padding: "14px 150px 14px 44px", borderRadius: "14px", border: "none", fontSize: "15px", fontFamily: fb, background: "white", boxShadow: "0 6px 24px rgba(0,0,0,0.2)", boxSizing: "border-box", outline: "none" }} />
            <button type="submit" style={{ position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)", background: SAFFRON, color: "white", border: "none", borderRadius: "10px", padding: "10px 20px", fontFamily: fb, fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>Ask Adda {"\u2728"}</button>
          </form>
          <div style={{ maxWidth: "600px", margin: "14px auto 0" }}>
            <ScrollingChips chips={[
              { emoji: "\u{1F3E0}", text: "roommate in Farmington Hills" },
              { emoji: "\u{1F4BC}", text: "IT jobs Metro Detroit" },
              { emoji: "\u{1F697}", text: "used Honda Civic for sale" },
              { emoji: "\u{1F37D}\uFE0F", text: "home cooked tiffin service" },
              { emoji: "\u{1F476}", text: "babysitter near Troy" },
              { emoji: "\u{1F3E0}", text: "apartment share Novi" },
              { emoji: "\u{1F527}", text: "handyman services" },
              { emoji: "\u{1F4BC}", text: "desi consulting firms hiring" },
              { emoji: "\u{1F697}", text: "Indian mechanic near me" },
              { emoji: "\u{1F3E0}", text: "2 BHK sublease Ann Arbor" },
            ]} onChipClick={(chip) => window.dispatchEvent(new CustomEvent("askadda", { detail: `${chip.emoji} ${chip.text}` }))} variant="light" />
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <div style={{ background: "white", borderBottom: "1px solid #EDE6DE", padding: "12px 20px", display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          <button onClick={() => setBoardFilter("all")} style={pill(boardFilter === "all")}>{"\u2728"} All</button>
          {CLASSIFIEDS_CATEGORIES.map(c => (
            <button key={c.id} onClick={() => setBoardFilter(c.id)} style={pill(boardFilter === c.id)}>{c.emoji} {c.label}</button>
          ))}
        </div>
        <Link href="/community/post" style={{ textDecoration: "none" }}>
          <button style={{ padding: "8px 18px", borderRadius: "10px", background: COLORS.primary, color: "white", border: "none", fontFamily: fb, fontWeight: 600, fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
            <Plus size={14} /> Post
          </button>
        </Link>
      </div>

    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "30px 20px" }}>

      {/* Sponsored */}
      <div style={{ marginBottom: "16px" }}>
        <SponsoredCard ad={SPONSORED_HOME[0]} />
      </div>

      {/* Posts */}
      <div style={{ display: "grid", gap: "12px" }}>
        {filtered.map(post => {
          const catInfo = CLASSIFIEDS_CATEGORIES.find(c => c.id === post.cat);
          return (
            <div
              key={post.id}
              style={{
                background: "white", borderRadius: "14px", padding: "18px 22px",
                border: "1px solid #EDE6DE", cursor: "pointer", transition: "box-shadow 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.05)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", flexWrap: "wrap" }}>
                    <span style={{
                      padding: "3px 10px", borderRadius: "999px", fontSize: "11px",
                      fontWeight: 600, background: "#F5EDE4", color: "#8A7968",
                    }}>
                      {catInfo?.icon} {catInfo?.label}
                    </span>
                    <span style={{ fontSize: "12px", color: "#A89888" }}>{post.date}</span>
                  </div>
                  <h3 style={{
                    fontFamily: FONTS.heading, fontSize: "16px", fontWeight: 600,
                    margin: "0 0 6px", lineHeight: 1.3, color: "#2D2420",
                  }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: "13px", color: "#5A4A3F", margin: "0 0 8px", lineHeight: 1.5 }}>
                    {post.body.length > 180 ? post.body.substring(0, 180) + "..." : post.body}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "12px", color: "#A89888" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <User size={12} />{post.author}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <MessageSquare size={12} />{post.replies} replies
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
}
