"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
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
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.55)",
        opacity: fadeOut ? 0 : 1, transition: "opacity 0.4s ease",
      }}
      onClick={e => { if (e.target === e.currentTarget) dismiss(); }}
    >
      <div
        style={{
          background: "var(--bg-surface)",
          borderRadius: "var(--radius-lg)",
          padding: "32px 32px 28px",
          maxWidth: "480px", width: "90%",
          position: "relative",
          transform: fadeOut ? "scale(0.96)" : "scale(1)",
          transition: "transform 0.4s ease",
        }}
      >
        <button
          aria-label="Close"
          onClick={dismiss}
          style={{
            position: "absolute", top: "12px", right: "12px",
            background: "transparent", border: "none", cursor: "pointer",
            padding: "8px", color: "var(--text-muted)",
          }}
        >
          <X size={18} />
        </button>

        {!submitted ? (
          <>
            <h2
              style={{
                fontSize: "22px", fontWeight: 500, letterSpacing: "-0.01em",
                color: "var(--text-primary)",
                lineHeight: 1.2, marginBottom: "8px",
                paddingRight: "28px",
              }}
            >
              Your city. Your people. One email a week.
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "var(--text-secondary)",
                lineHeight: 1.5,
                marginBottom: "20px",
              }}
            >
              The spots everyone&apos;s talking about. The events worth your weekend. Every Monday.
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                placeholder="your@email.com"
                style={{
                  flex: 1,
                  height: "40px",
                  padding: "0 14px",
                  borderRadius: "var(--radius-pill)",
                  border: "1px solid var(--border-default)",
                  fontSize: "14px",
                  fontFamily: "inherit",
                  outline: "none",
                  color: "var(--text-primary)",
                  background: "var(--bg-surface)",
                }}
              />
              <button
                onClick={handleSubmit}
                style={{
                  height: "40px",
                  padding: "0 18px",
                  borderRadius: "var(--radius-pill)",
                  background: "var(--brand-primary)",
                  color: "#FFFFFF",
                  border: "none",
                  fontWeight: 500,
                  fontSize: "14px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Sign me up
              </button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "12px 0" }}>
            <p style={{ fontSize: "22px", fontWeight: 500, color: "var(--text-primary)", marginBottom: "6px" }}>
              You&apos;re in.
            </p>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
              See you Monday morning.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
