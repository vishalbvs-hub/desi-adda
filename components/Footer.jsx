"use client";
import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState("");

  const handleSubscribe = async () => {
    if (!email.includes("@")) return;
    try {
      await supabase.from("subscribers").insert({ email: email.trim().toLowerCase(), opted_metros: ["detroit"] });
      setSubStatus("subscribed");
      setEmail("");
    } catch { setSubStatus("error"); }
  };

  const linkStyle = {
    color: "rgba(253,251,247,0.65)",
    textDecoration: "none",
    fontSize: "13px",
    display: "block",
    marginBottom: "8px",
  };

  const headStyle = {
    color: "var(--text-inverse)",
    fontWeight: 500,
    marginBottom: "12px",
    fontSize: "13px",
    letterSpacing: "0",
  };

  return (
    <footer
      style={{
        background: "var(--bg-header)",
        color: "rgba(253,251,247,0.65)",
        padding: "48px 20px 28px",
        fontSize: "13px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px", margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "32px",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "22px", fontWeight: 500, letterSpacing: "-0.03em",
              color: "var(--text-inverse)", marginBottom: "10px", lineHeight: 1,
            }}
          >
            adda<span style={{ color: "var(--brand-primary)" }}>.</span>
          </div>
          <p style={{ lineHeight: 1.6, fontSize: "13px", marginBottom: "16px" }}>
            Built and maintained by Vishal for the Metro Detroit desi community.
          </p>
          <Link
            href="/about"
            style={{ color: "var(--brand-primary)", textDecoration: "none", fontSize: "13px", fontWeight: 500 }}
          >
            About Desi Adda
          </Link>
        </div>

        <div>
          <h4 style={headStyle}>Directory</h4>
          {[
            { label: "Restaurants", href: "/restaurants" },
            { label: "Groceries", href: "/groceries" },
            { label: "Temples", href: "/temples" },
            { label: "Professionals", href: "/professionals" },
            { label: "Event planning", href: "/event-planning" },
            { label: "Community & events", href: "/community" },
          ].map(l => <Link key={l.label} href={l.href} style={linkStyle}>{l.label}</Link>)}
        </div>

        <div>
          <h4 style={headStyle}>More</h4>
          {[
            { label: "Entertainment", href: "/entertainment" },
            { label: "News", href: "/news" },
            { label: "New to Michigan?", href: "/welcome" },
            { label: "Suggest a business", href: "/suggest" },
          ].map(l => <Link key={l.label} href={l.href} style={linkStyle}>{l.label}</Link>)}
          <a href="mailto:hello@desiadda.com" style={linkStyle}>Is something wrong? Let us know</a>
        </div>

        <div>
          <h4 style={headStyle}>Newsletter</h4>
          <p style={{ fontSize: "12px", marginBottom: "12px", lineHeight: 1.5 }}>
            Weekly roundup of events, new businesses, and community news.
          </p>
          {subStatus === "subscribed" ? (
            <p style={{ color: "var(--brand-primary)", fontWeight: 500 }}>Subscribed!</p>
          ) : (
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubscribe()}
                placeholder="your@email.com"
                style={{
                  flex: 1,
                  padding: "0 14px",
                  height: "40px",
                  borderRadius: "var(--radius-pill)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.08)",
                  color: "var(--text-inverse)",
                  fontSize: "13px",
                  fontFamily: "inherit",
                  outline: "none",
                }}
              />
              <button
                onClick={handleSubscribe}
                style={{
                  height: "40px",
                  padding: "0 18px",
                  borderRadius: "var(--radius-pill)",
                  background: "var(--brand-primary)",
                  color: "#FFFFFF",
                  border: "none",
                  fontSize: "13px",
                  fontWeight: 500,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Subscribe
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "32px auto 0",
          paddingTop: "20px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          fontSize: "12px",
          color: "rgba(253,251,247,0.4)",
        }}
      >
        &copy; 2026 Desi Adda. Data verified March 2026.
      </div>
    </footer>
  );
}
