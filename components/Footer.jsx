"use client";
import Link from "next/link";
import { FONTS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer style={{ background: "#2D2420", color: "rgba(255,255,255,0.6)", padding: "40px 20px", fontSize: "13px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "30px" }}>
        <div style={{ maxWidth: "280px" }}>
          <div style={{ fontFamily: FONTS.heading, fontSize: "24px", fontWeight: 700, color: "white", marginBottom: "8px" }}>adda.</div>
          <p style={{ lineHeight: 1.6 }}>The gathering place for desi life in America.</p>
        </div>
        <div>
          <h4 style={{ color: "white", fontWeight: 600, marginBottom: "8px" }}>Explore</h4>
          {[
            { label: "Directory", href: "/" },
            { label: "Community Board", href: "/community" },
            { label: "Blog", href: "/blog" },
            { label: "Movies", href: "/movies" },
            { label: "Events", href: "/events" },
          ].map(l => (
            <div key={l.label} style={{ marginBottom: "4px" }}>
              <Link href={l.href} style={{ color: "inherit", textDecoration: "none" }}>{l.label}</Link>
            </div>
          ))}
        </div>
        <div>
          <h4 style={{ color: "white", fontWeight: 600, marginBottom: "8px" }}>Popular</h4>
          {[
            { label: "Restaurants", href: "/category/food" },
            { label: "Weddings", href: "/category/weddings" },
            { label: "Temples", href: "/category/religious" },
            { label: "Groceries", href: "/category/grocery" },
            { label: "Roommates", href: "/community" },
          ].map(l => (
            <div key={l.label} style={{ marginBottom: "4px" }}>
              <Link href={l.href} style={{ color: "inherit", textDecoration: "none" }}>{l.label}</Link>
            </div>
          ))}
        </div>
        <div>
          <h4 style={{ color: "white", fontWeight: 600, marginBottom: "8px" }}>Company</h4>
          {["About", "Advertise With Us", "Contact", "Privacy"].map(l => (
            <div key={l} style={{ marginBottom: "4px", cursor: "pointer" }}>{l}</div>
          ))}
        </div>
      </div>
      <div style={{
        maxWidth: "1100px", margin: "30px auto 0", paddingTop: "20px",
        borderTop: "1px solid rgba(255,255,255,0.1)", textAlign: "center", fontSize: "12px",
      }}>
        &copy; 2026 Desi Adda. Made with ❤️ for the South Asian American community.
      </div>
    </footer>
  );
}
