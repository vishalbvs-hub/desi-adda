"use client";
import { useState } from "react";
import Link from "next/link";
import { FONTS, COLORS } from "@/lib/constants";
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

  const linkStyle = { color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "13px", display: "block", marginBottom: "6px" };

  return (
    <footer style={{ background: "#1A1A1A", color: "rgba(255,255,255,0.6)", padding: "40px 20px 24px", fontSize: "13px", fontFamily: FONTS.body }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "32px" }}>
        <div>
          <div style={{ fontSize: "22px", fontWeight: 700, color: "white", marginBottom: "8px" }}>adda.</div>
          <p style={{ lineHeight: 1.6, fontSize: "13px", marginBottom: "16px" }}>
            Built and maintained by Vishal for the Metro Detroit desi community.
          </p>
          <Link href="/about" style={{ color: COLORS.accent, textDecoration: "none", fontSize: "13px", fontWeight: 600 }}>About Desi Adda</Link>
        </div>

        <div>
          <h4 style={{ color: "white", fontWeight: 600, marginBottom: "10px", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Directory</h4>
          {[
            { label: "Restaurants", href: "/restaurants" },
            { label: "Groceries", href: "/groceries" },
            { label: "Temples", href: "/temples" },
            { label: "Professionals", href: "/professionals" },
            { label: "Event Planning", href: "/event-planning" },
            { label: "Community & Events", href: "/community" },
          ].map(l => <Link key={l.label} href={l.href} style={linkStyle}>{l.label}</Link>)}
        </div>

        <div>
          <h4 style={{ color: "white", fontWeight: 600, marginBottom: "10px", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px" }}>More</h4>
          {[
            { label: "Entertainment", href: "/entertainment" },
            { label: "News", href: "/news" },
            { label: "New to Michigan?", href: "/welcome" },
            { label: "Suggest a Business", href: "/suggest" },
          ].map(l => <Link key={l.label} href={l.href} style={linkStyle}>{l.label}</Link>)}
          <a href="mailto:hello@desiadda.com" style={linkStyle}>Is something wrong? Let us know</a>
        </div>

        <div>
          <h4 style={{ color: "white", fontWeight: 600, marginBottom: "10px", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Newsletter</h4>
          <p style={{ fontSize: "12px", marginBottom: "10px", lineHeight: 1.5 }}>Weekly roundup of events, new businesses, and community news.</p>
          {subStatus === "subscribed" ? (
            <p style={{ color: COLORS.accent, fontWeight: 600 }}>Subscribed!</p>
          ) : (
            <div style={{ display: "flex", gap: "6px" }}>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubscribe()}
                placeholder="your@email.com"
                style={{ flex: 1, padding: "8px 12px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.1)", color: "white", fontSize: "13px", fontFamily: FONTS.body, outline: "none" }} />
              <button onClick={handleSubscribe} style={{
                padding: "8px 14px", borderRadius: "6px", background: COLORS.primary, color: "white",
                border: "none", fontSize: "12px", fontWeight: 600, cursor: "pointer",
              }}>Subscribe</button>
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "28px auto 0", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>
        &copy; 2026 Desi Adda. Data verified March 2026.
      </div>
    </footer>
  );
}
