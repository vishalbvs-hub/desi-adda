"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, User, MessageSquare } from "lucide-react";
import { FONTS, COLORS, CLASSIFIEDS_CATEGORIES, SPONSORED_HOME } from "@/lib/constants";
import { fetchClassifieds } from "@/lib/data";
import SponsoredCard from "@/components/SponsoredCard";

export default function CommunityPage() {
  const [boardFilter, setBoardFilter] = useState("all");

  const pill = (active) => ({
    padding: "6px 16px", borderRadius: "999px", fontSize: "13px",
    fontFamily: FONTS.body, fontWeight: 500, cursor: "pointer",
    border: active ? `2px solid ${COLORS.primary}` : "2px solid #E8E0D8",
    background: active ? "#FDE8EF" : "white",
    color: active ? COLORS.primary : "#5A4A3F",
    transition: "all 0.2s", whiteSpace: "nowrap",
    display: "flex", alignItems: "center", gap: "5px",
  });

  const [_data, _setData] = useState(null);
  useEffect(() => { fetchClassifieds().then(_setData); }, []);


  if (!_data) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>;
  const CLASSIFIEDS_POSTS = _data;
  const filtered = boardFilter === "all" ? CLASSIFIEDS_POSTS : CLASSIFIEDS_POSTS.filter(p => p.cat === boardFilter);

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "30px 20px" }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: "20px", flexWrap: "wrap", gap: "12px",
      }}>
        <div>
          <h1 style={{ fontFamily: FONTS.heading, fontSize: "28px", fontWeight: 700, margin: "0 0 4px" }}>
            Community Board
          </h1>
          <p style={{ fontSize: "14px", color: "#8A7968", margin: 0 }}>
            Roommates, housing, jobs, services, and more from the Detroit desi community.
          </p>
        </div>
        <Link href="/community/post" style={{ textDecoration: "none" }}>
          <button style={{
            padding: "10px 20px", borderRadius: "12px", background: COLORS.primary,
            color: "white", border: "none", fontFamily: FONTS.body, fontWeight: 600,
            fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px",
          }}>
            <Plus size={16} /> Post
          </button>
        </Link>
      </div>

      {/* Category pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
        {CLASSIFIEDS_CATEGORIES.map(c => (
          <button key={c.id} onClick={() => setBoardFilter(c.id)} style={pill(boardFilter === c.id)}>
            <span style={{ fontSize: "14px" }}>{c.icon}</span> {c.label}
          </button>
        ))}
      </div>

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
  );
}
