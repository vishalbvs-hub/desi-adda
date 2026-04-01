"use client";
import { useState } from "react";
import { FONTS, COLORS } from "@/lib/constants";

const ff = FONTS.body;
const fb = FONTS.body;
const SAFFRON = "#C4943D";

function StarIcon({ filled, size = 14 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? SAFFRON : "#E2DFD8"} stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>;
}

export default function GroceryClient({ store, googleReviews }) {
  const [showAll, setShowAll] = useState(false);
  const topQuotes = googleReviews.filter(r => r.rating >= 4 && r.review_text?.length > 30).slice(0, 3);

  return (
    <>
      {/* Pull quotes */}
      {topQuotes.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ fontFamily: ff, fontSize: "20px", fontWeight: 700, margin: "0 0 16px", color: "#1A1A1A" }}>What Shoppers Say</h3>
          <div style={{ display: "grid", gap: "12px", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
            {topQuotes.map((rev, i) => {
              const snippet = rev.review_text.split(/[.!?]/).filter(s => s.trim().length > 20).slice(0, 2).join(". ").trim();
              return (
                <div key={i} style={{ background: "white", borderRadius: "10px", padding: "20px 22px", border: "1px solid #E2DFD8", borderLeft: "3px solid #2E7D32", position: "relative" }}>
                  <div style={{ fontSize: "32px", color: "#2E7D3220", fontFamily: "Georgia", position: "absolute", top: "10px", left: "16px", lineHeight: 1 }}>"</div>
                  <p style={{ fontSize: "14px", color: "#6B6B6B", lineHeight: 1.6, margin: "8px 0 12px", fontStyle: "italic", paddingLeft: "8px" }}>
                    {(snippet || rev.review_text).substring(0, 200)}{(snippet || rev.review_text).length > 200 ? "..." : "."}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#6B6B6B" }}>— {rev.author_name?.split(" ")[0]}</span>
                    <div style={{ display: "flex", gap: "1px" }}>{[1,2,3,4,5].map(s => <StarIcon key={s} filled={s <= rev.rating} size={12} />)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Expandable Google reviews */}
      {googleReviews.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <button onClick={() => setShowAll(!showAll)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: "6px", marginBottom: showAll ? "12px" : 0 }}>
            <span style={{ fontFamily: fb, fontSize: "14px", fontWeight: 600, color: "#6B6B6B" }}>{showAll ? "Hide" : "See all"} {googleReviews.length} Google reviews</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="2" strokeLinecap="round" style={{ transform: showAll ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}><polyline points="6 9 12 15 18 9" /></svg>
          </button>
          {showAll && (
            <div style={{ display: "grid", gap: "10px" }}>
              {googleReviews.map((rev, i) => (
                <div key={rev.id || i} style={{ background: "white", borderRadius: "12px", padding: "14px 18px", border: "1px solid #E2DFD8" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#2E7D3215", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fb, fontWeight: 700, fontSize: "12px", color: "#2E7D32" }}>{(rev.author_name || "?")[0].toUpperCase()}</div>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#1A1A1A" }}>{rev.author_name}</span>
                      <span style={{ fontSize: "11px", color: "#999999" }}>{rev.review_time}</span>
                    </div>
                    <div style={{ display: "flex", gap: "1px" }}>{[1,2,3,4,5].map(s => <StarIcon key={s} filled={s <= (rev.rating || 0)} size={12} />)}</div>
                  </div>
                  <p style={{ fontSize: "12px", color: "#6B6B6B", lineHeight: 1.5, margin: 0 }}>{rev.review_text?.length > 300 ? rev.review_text.substring(0, 300) + "..." : rev.review_text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
