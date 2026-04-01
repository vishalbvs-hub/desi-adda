"use client";
import { useState, useEffect } from "react";
import { FONTS, COLORS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

export default function NewsletterOverlay() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = document.cookie.includes("adda_newsletter_seen=true");
    if (dismissed) return;
    const timer = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setFadeOut(true);
    document.cookie = "adda_newsletter_seen=true; max-age=31536000; path=/";
    setTimeout(() => setVisible(false), 400);
  }

  async function handleSubmit() {
    if (!email.includes("@")) return;
    try { await supabase.from("subscribers").insert({ email: email.trim().toLowerCase(), opted_metros: ["detroit"] }); } catch {}
    setSubmitted(true);
    setTimeout(dismiss, 1800);
  }

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
      opacity: fadeOut ? 0 : 1, transition: "opacity 0.4s ease",
    }} onClick={e => { if (e.target === e.currentTarget) dismiss(); }}>
      <div style={{
        background: "white", borderRadius: "16px", padding: "40px 36px", maxWidth: "480px", width: "90%",
        textAlign: "center", position: "relative", boxShadow: "0 20px 48px rgba(0,0,0,0.2)",
        transform: fadeOut ? "scale(0.96)" : "scale(1)", transition: "transform 0.4s ease",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", borderRadius: "16px 16px 0 0", background: COLORS.primary }} />

        {!submitted ? (
          <>
            <h2 style={{ fontFamily: FONTS.body, fontSize: "26px", fontWeight: 700, color: COLORS.text, lineHeight: 1.3, marginBottom: "10px" }}>
              Your city. Your people.<br /><span style={{ color: COLORS.primary }}>One email a week.</span>
            </h2>
            <p style={{ fontSize: "14px", color: COLORS.textSecondary, lineHeight: 1.6, marginBottom: "28px", maxWidth: "360px", margin: "0 auto 28px" }}>
              The spots everyone&apos;s talking about. The events worth your weekend. Every Monday.
            </p>
            <div style={{ display: "flex", gap: "8px", maxWidth: "380px", margin: "0 auto" }}>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubmit()} placeholder="your@email.com"
                style={{ flex: 1, padding: "12px 16px", borderRadius: "8px", border: `1px solid ${COLORS.border}`, fontSize: "14px", fontFamily: FONTS.body, outline: "none" }}
                onFocus={e => e.target.style.borderColor = COLORS.primary}
                onBlur={e => e.target.style.borderColor = COLORS.border} />
              <button onClick={handleSubmit} style={{
                padding: "12px 20px", borderRadius: "8px", background: COLORS.primary, color: "white",
                border: "none", fontFamily: FONTS.body, fontWeight: 600, fontSize: "14px", cursor: "pointer", whiteSpace: "nowrap",
              }}
                onMouseEnter={e => e.target.style.background = COLORS.primaryHover}
                onMouseLeave={e => e.target.style.background = COLORS.primary}
              >Sign Me Up</button>
            </div>
            <button onClick={dismiss} style={{
              marginTop: "20px", background: "none", border: "none", color: COLORS.textMuted,
              fontFamily: FONTS.body, fontSize: "13px", cursor: "pointer", padding: "4px 8px",
            }}>Skip for now</button>
          </>
        ) : (
          <div>
            <p style={{ fontSize: "24px", fontWeight: 700, color: COLORS.text, marginBottom: "6px" }}>You&apos;re in.</p>
            <p style={{ fontSize: "14px", color: COLORS.textSecondary }}>See you Monday morning.</p>
          </div>
        )}
      </div>
    </div>
  );
}
