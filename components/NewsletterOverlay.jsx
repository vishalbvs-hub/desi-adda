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
    try {
      await supabase.from("subscribers").insert({
        email: email.trim().toLowerCase(),
        opted_metros: ["detroit"],
      });
    } catch (e) {
      console.error("Signup error:", e);
    }
    setSubmitted(true);
    setTimeout(dismiss, 1800);
  }

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(6px)",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.4s ease",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "48px 40px",
          maxWidth: "520px",
          width: "90%",
          textAlign: "center",
          position: "relative",
          boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
          transform: fadeOut ? "scale(0.95)" : "scale(1)",
          transition: "transform 0.4s ease",
        }}
      >
        {/* Subtle decorative pattern - top border accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            borderRadius: "20px 20px 0 0",
            background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.marigold}, ${COLORS.teal}, ${COLORS.primary})`,
          }}
        />

        {!submitted ? (
          <>
            <h2
              style={{
                fontFamily: FONTS.heading,
                fontSize: "32px",
                fontWeight: 700,
                color: COLORS.text,
                lineHeight: 1.2,
                marginBottom: "12px",
              }}
            >
              Your city. Your people.
              <br />
              <span style={{ color: COLORS.primary }}>One email a week.</span>
            </h2>

            <p
              style={{
                fontFamily: FONTS.body,
                fontSize: "16px",
                color: COLORS.textSecondary,
                lineHeight: 1.6,
                marginBottom: "32px",
                maxWidth: "400px",
                margin: "0 auto 32px",
              }}
            >
              The spots everyone&apos;s talking about. The events worth your
              weekend. The recipe that&apos;ll make your kitchen smell like
              home. Every Monday.
            </p>

            <div
              style={{
                display: "flex",
                gap: "8px",
                maxWidth: "400px",
                margin: "0 auto",
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="your@email.com"
                style={{
                  flex: 1,
                  padding: "14px 18px",
                  borderRadius: "12px",
                  border: "1px solid #E0D8CF",
                  fontSize: "15px",
                  fontFamily: FONTS.body,
                  outline: "none",
                  transition: "border 0.2s",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = COLORS.primary)
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "#E0D8CF")
                }
              />
              <button
                onClick={handleSubmit}
                style={{
                  padding: "14px 24px",
                  borderRadius: "12px",
                  background: COLORS.primary,
                  color: "white",
                  border: "none",
                  fontFamily: FONTS.body,
                  fontWeight: 600,
                  fontSize: "15px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.background = "#A01548")
                }
                onMouseLeave={(e) =>
                  (e.target.style.background = COLORS.primary)
                }
              >
                Sign Me Up
              </button>
            </div>

            <button
              onClick={dismiss}
              style={{
                marginTop: "24px",
                background: "none",
                border: "none",
                color: COLORS.textMuted,
                fontFamily: FONTS.body,
                fontSize: "13px",
                cursor: "pointer",
                padding: "4px 8px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.color = COLORS.textSecondary)
              }
              onMouseLeave={(e) =>
                (e.target.style.color = COLORS.textMuted)
              }
            >
              Skip for now →
            </button>
          </>
        ) : (
          <div>
            <p style={{ fontSize: "48px", marginBottom: "12px" }}>🎉</p>
            <h2
              style={{
                fontFamily: FONTS.heading,
                fontSize: "28px",
                fontWeight: 700,
                color: COLORS.text,
                marginBottom: "8px",
              }}
            >
              You&apos;re in.
            </h2>
            <p
              style={{
                fontFamily: FONTS.body,
                fontSize: "16px",
                color: COLORS.textSecondary,
              }}
            >
              See you Monday morning.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
