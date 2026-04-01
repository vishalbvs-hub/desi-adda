"use client";
import { useState } from "react";
import { FONTS, COLORS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

const ff = FONTS.body;
const fb = FONTS.body;
const SAFFRON = "#C4943D";

function StarIcon({ filled, size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? SAFFRON : "#E2DFD8"} stroke="none">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function StarSelector({ rating, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: "flex", gap: "4px", cursor: "pointer" }}>
      {[1, 2, 3, 4, 5].map(i => (
        <button key={i} type="button" onClick={() => onChange(i)} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(0)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "2px" }}>
          <StarIcon filled={i <= (hover || rating)} size={28} />
        </button>
      ))}
    </div>
  );
}

export default function RestaurantClient({ restaurant, googleReviews, communityReviews }) {
  const [showAllGoogle, setShowAllGoogle] = useState(false);
  const [formData, setFormData] = useState({ name: "", rating: 0, ordered: "", text: "", hometown: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const topQuotes = googleReviews
    .filter(r => r.rating >= 4 && r.review_text?.length > 30)
    .slice(0, 3);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.rating || !formData.text) {
      setError("Please fill in your name, rating, and review.");
      return;
    }
    setSubmitting(true);
    setError("");
    const { error: dbErr } = await supabase.from("community_reviews").insert({
      restaurant_id: restaurant.id,
      google_place_id: restaurant.google_place_id,
      reviewer_name: formData.name,
      rating: formData.rating,
      what_i_ordered: formData.ordered || null,
      review_text: formData.text,
      hometown: formData.hometown || null,
    });
    setSubmitting(false);
    if (dbErr) { setError("Something went wrong. Please try again."); return; }
    setSubmitted(true);
  };

  return (
    <>
      {/* ═══ WHAT PEOPLE ARE SAYING — Pull Quotes ═══ */}
      {topQuotes.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ fontFamily: ff, fontSize: "20px", fontWeight: 700, margin: "0 0 16px", color: "#1A1A1A" }}>
            What People Are Saying
          </h3>
          <div style={{ display: "grid", gap: "12px", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
            {topQuotes.map((rev, i) => {
              const snippet = rev.review_text.split(/[.!?]/).filter(s => s.trim().length > 20).slice(0, 2).join(". ").trim();
              return (
                <div key={i} style={{
                  background: "white", borderRadius: "10px", padding: "20px 22px",
                  border: "1px solid #E2DFD8", borderLeft: `3px solid ${SAFFRON}`,
                  position: "relative",
                }}>
                  <div style={{ fontSize: "32px", color: `${SAFFRON}30`, fontFamily: "Georgia", position: "absolute", top: "10px", left: "16px", lineHeight: 1 }}>"</div>
                  <p style={{ fontSize: "14px", color: "#6B6B6B", lineHeight: 1.6, margin: "8px 0 12px", fontStyle: "italic", paddingLeft: "8px" }}>
                    {(snippet || rev.review_text).substring(0, 200)}{(snippet || rev.review_text).length > 200 ? "..." : "."}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#6B6B6B" }}>— {rev.author_name?.split(" ")[0]}</span>
                    <div style={{ display: "flex", gap: "1px" }}>
                      {[1, 2, 3, 4, 5].map(s => <StarIcon key={s} filled={s <= rev.rating} size={12} />)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ═══ COMMUNITY REVIEWS ═══ */}
      <div id="community-reviews" style={{ marginBottom: "24px" }}>
        <h3 style={{ fontFamily: ff, fontSize: "20px", fontWeight: 700, margin: "0 0 16px", color: "#1A1A1A" }}>
          Community Reviews
        </h3>
        {communityReviews.length > 0 ? (
          <div style={{ display: "grid", gap: "12px" }}>
            {communityReviews.map((cr) => (
              <div key={cr.id} style={{
                background: "white", borderRadius: "10px", padding: "18px 22px",
                border: "1px solid #E2DFD8",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{
                      width: "32px", height: "32px", borderRadius: "50%",
                      background: `${COLORS.primary}15`, display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: fb, fontWeight: 700, fontSize: "14px", color: COLORS.primary,
                    }}>
                      {cr.reviewer_name[0].toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontFamily: fb, fontSize: "14px", fontWeight: 600, color: "#1A1A1A" }}>{cr.reviewer_name}</div>
                      {cr.hometown && (
                        <span style={{ fontSize: "11px", color: "#6B6B6B", display: "flex", alignItems: "center", gap: "3px" }}>
                          📍 Originally from {cr.hometown}
                        </span>
                      )}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "1px" }}>
                    {[1, 2, 3, 4, 5].map(s => <StarIcon key={s} filled={s <= cr.rating} size={14} />)}
                  </div>
                </div>
                {cr.what_i_ordered && (
                  <div style={{ fontSize: "12px", color: SAFFRON, fontWeight: 600, marginBottom: "6px" }}>
                    🍛 Ordered: {cr.what_i_ordered}
                  </div>
                )}
                <p style={{ fontSize: "13px", color: "#6B6B6B", lineHeight: 1.6, margin: 0 }}>{cr.review_text}</p>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: "32px", textAlign: "center", background: "white", borderRadius: "10px", border: "1px dashed #E2DFD8" }}>
            <p style={{ fontSize: "15px", color: "#6B6B6B", margin: "0 0 4px" }}>Be the first to review this restaurant!</p>
            <p style={{ fontSize: "12px", color: "#999999", margin: 0 }}>Your review helps the community find great food.</p>
          </div>
        )}
      </div>

      {/* ═══ REVIEW FORM ═══ */}
      <div id="review-form" style={{ background: "white", borderRadius: "10px", padding: "24px", border: "1px solid #E2DFD8", marginBottom: "24px" }}>
        <h3 style={{ fontFamily: ff, fontSize: "20px", fontWeight: 700, margin: "0 0 4px", color: "#1A1A1A" }}>
          Share Your Experience
        </h3>
        <p style={{ fontSize: "13px", color: "#6B6B6B", margin: "0 0 20px" }}>
          Tried {restaurant.name}? Tell the community what you thought.
        </p>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{ fontSize: "36px", marginBottom: "8px" }}>✅</div>
            <p style={{ fontFamily: ff, fontSize: "18px", fontWeight: 600, margin: "0 0 4px", color: "#1A1A1A" }}>Thanks!</p>
            <p style={{ fontSize: "13px", color: "#6B6B6B", margin: 0 }}>Your review will appear after a quick check.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#6B6B6B", marginBottom: "6px" }}>Rating *</label>
              <StarSelector rating={formData.rating} onChange={v => setFormData({ ...formData, rating: v })} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#6B6B6B", marginBottom: "6px" }}>Your Name *</label>
                <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="First name or nickname"
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #E2DFD8", fontSize: "14px", fontFamily: fb, outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#6B6B6B", marginBottom: "6px" }}>Where are you from?</label>
                <input value={formData.hometown} onChange={e => setFormData({ ...formData, hometown: e.target.value })} placeholder="e.g. Hyderabad, Chennai"
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #E2DFD8", fontSize: "14px", fontFamily: fb, outline: "none", boxSizing: "border-box" }} />
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#6B6B6B", marginBottom: "6px" }}>What did you order?</label>
              <input value={formData.ordered} onChange={e => setFormData({ ...formData, ordered: e.target.value })} placeholder="e.g. Goat biryani, garlic naan"
                style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #E2DFD8", fontSize: "14px", fontFamily: fb, outline: "none", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#6B6B6B", marginBottom: "6px" }}>Your review * <span style={{ fontWeight: 400, color: "#999999" }}>({500 - formData.text.length} chars left)</span></label>
              <textarea value={formData.text} onChange={e => { if (e.target.value.length <= 500) setFormData({ ...formData, text: e.target.value }); }} placeholder="What was great? What could be better?"
                rows={4} style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #E2DFD8", fontSize: "14px", fontFamily: fb, outline: "none", boxSizing: "border-box", resize: "vertical" }} />
            </div>
            {error && <p style={{ color: "#C62828", fontSize: "13px", margin: 0 }}>{error}</p>}
            <button type="submit" disabled={submitting} style={{
              padding: "12px 28px", borderRadius: "12px", background: submitting ? "#ccc" : SAFFRON,
              color: "white", border: "none", fontFamily: fb, fontWeight: 600, fontSize: "14px",
              cursor: submitting ? "not-allowed" : "pointer", width: "fit-content",
            }}>{submitting ? "Submitting..." : "Submit Review"}</button>
          </form>
        )}
      </div>

      {/* ═══ GOOGLE REVIEWS — Expandable ═══ */}
      {googleReviews.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <button onClick={() => setShowAllGoogle(!showAllGoogle)} style={{
            background: "none", border: "none", cursor: "pointer", padding: 0,
            display: "flex", alignItems: "center", gap: "6px", marginBottom: showAllGoogle ? "12px" : 0,
          }}>
            <span style={{ fontFamily: fb, fontSize: "14px", fontWeight: 600, color: "#6B6B6B" }}>
              {showAllGoogle ? "Hide" : "See all"} {googleReviews.length} Google reviews
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="2" strokeLinecap="round"
              style={{ transform: showAllGoogle ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {showAllGoogle && (
            <div style={{ display: "grid", gap: "10px" }}>
              {googleReviews.map((rev, i) => (
                <div key={rev.id || i} style={{ background: "white", borderRadius: "12px", padding: "14px 18px", border: "1px solid #E2DFD8" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <div style={{
                        width: "28px", height: "28px", borderRadius: "50%", background: `${SAFFRON}15`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: fb, fontWeight: 700, fontSize: "12px", color: SAFFRON,
                      }}>{(rev.author_name || "?")[0].toUpperCase()}</div>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#1A1A1A" }}>{rev.author_name}</span>
                      <span style={{ fontSize: "11px", color: "#999999" }}>{rev.review_time}</span>
                    </div>
                    <div style={{ display: "flex", gap: "1px" }}>
                      {[1,2,3,4,5].map(s => <StarIcon key={s} filled={s <= (rev.rating || 0)} size={12} />)}
                    </div>
                  </div>
                  <p style={{ fontSize: "12px", color: "#6B6B6B", lineHeight: 1.5, margin: 0 }}>
                    {rev.review_text?.length > 300 ? rev.review_text.substring(0, 300) + "..." : rev.review_text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ═══ FLOATING WRITE REVIEW BUTTON (mobile) ═══ */}
      <button
        onClick={() => document.getElementById("review-form")?.scrollIntoView({ behavior: "smooth" })}
        style={{
          position: "fixed", bottom: "20px", left: "20px", zIndex: 100,
          background: SAFFRON, color: "white", border: "none", borderRadius: "50px",
          padding: "12px 20px", fontFamily: fb, fontWeight: 600, fontSize: "13px",
          cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          display: "flex", alignItems: "center", gap: "6px",
        }}
      >
        ✍️ Write a Review
      </button>
    </>
  );
}
