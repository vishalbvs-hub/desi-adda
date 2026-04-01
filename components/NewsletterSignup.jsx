"use client";
import { useState } from "react";
import { Send } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";

export default function NewsletterSignup({ variant = "footer" }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  if (variant === "inline") {
    return (
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.primary}06, ${COLORS.marigold}06)`,
        borderRadius: "16px", padding: "30px", textAlign: "center", border: "1px solid #E2DFD8",
      }}>
        <h3 style={{ fontFamily: FONTS.body, fontSize: "20px", fontWeight: 700, marginBottom: "6px" }}>
          Enjoyed this? Get more every week.
        </h3>
        <p style={{ fontSize: "14px", color: "#6B6B6B", marginBottom: "16px" }}>
          The Adda Weekly — Detroit&apos;s desi digest, delivered every Friday.
        </p>
        <div style={{ display: "flex", gap: "8px", maxWidth: "380px", margin: "0 auto" }}>
          <input
            placeholder="your@email.com"
            style={{
              flex: 1, padding: "10px 14px", borderRadius: "10px",
              border: "1px solid #E2DFD8", fontSize: "14px", fontFamily: FONTS.body, outline: "none",
            }}
          />
          <button style={{
            padding: "10px 18px", borderRadius: "10px", background: COLORS.primary,
            color: "white", border: "none", fontFamily: FONTS.body, fontWeight: 600,
            fontSize: "14px", cursor: "pointer",
          }}>Subscribe</button>
        </div>
      </div>
    );
  }

  return (
    <section style={{ background: COLORS.primary, padding: "50px 20px", textAlign: "center" }}>
      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        <h2 style={{ fontFamily: FONTS.body, fontSize: "26px", fontWeight: 700, color: "white", marginBottom: "8px" }}>
          Stay in the loop.
        </h2>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "15px", marginBottom: "24px" }}>
          The Adda Weekly — Detroit&apos;s desi digest, every Friday.
        </p>
        {subscribed ? (
          <p style={{ color: COLORS.marigold, fontWeight: 600, fontFamily: FONTS.body, fontSize: "18px" }}>
            You&apos;re in! ✨
          </p>
        ) : (
          <div style={{ display: "flex", gap: "8px", maxWidth: "420px", margin: "0 auto" }}>
            <input
              value={email} onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{
                flex: 1, padding: "12px 16px", borderRadius: "12px", border: "none",
                fontSize: "14px", fontFamily: FONTS.body, outline: "none",
              }}
            />
            <button
              onClick={() => { if (email.includes("@")) setSubscribed(true); }}
              style={{
                padding: "12px 22px", borderRadius: "12px", background: COLORS.marigold,
                color: "white", border: "none", fontFamily: FONTS.body, fontWeight: 600,
                fontSize: "14px", cursor: "pointer",
              }}
            >
              <Send size={14} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
              Subscribe
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
