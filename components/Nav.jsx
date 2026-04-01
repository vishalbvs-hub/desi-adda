"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";

const NAV_ITEMS = [
  { label: "Businesses", href: "/businesses" },
  { label: "Worship", href: "/temples" },
  { label: "Professionals", href: "/professionals" },
  { label: "Event Planning", href: "/event-planning" },
  { label: "Community", href: "/community" },
  { label: "Entertainment", href: "/entertainment" },
  { label: "News", href: "/news" },
];

export default function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav style={{
      background: COLORS.surface, borderBottom: `1px solid ${COLORS.border}`,
      padding: "0 20px", position: "sticky", top: 0, zIndex: 50,
    }}>
      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "52px",
      }}>
        <Link href="/" style={{
          fontFamily: FONTS.body, fontSize: "28px", fontWeight: 700,
          color: COLORS.primary, textDecoration: "none", flexShrink: 0,
        }}>adda.</Link>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: "0", alignItems: "center" }}
          className="desktop-nav">
          {NAV_ITEMS.map(item => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link key={item.label} href={item.href} style={{
                padding: "14px 14px",
                fontSize: "13px",
                fontWeight: isActive ? 700 : 500,
                color: COLORS.primary,
                fontFamily: FONTS.body,
                textDecoration: "none",
                borderBottom: isActive ? `2px solid ${COLORS.primary}` : "2px solid transparent",
                transition: "all 0.15s",
                whiteSpace: "nowrap",
              }}>
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="mobile-menu-btn"
          style={{
            display: "none", background: "none", border: "none",
            cursor: "pointer", padding: "8px", color: COLORS.primary,
          }}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="mobile-nav" style={{
          borderTop: `1px solid ${COLORS.border}`,
          padding: "8px 0 16px",
        }}>
          {NAV_ITEMS.map(item => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)} style={{
                display: "block", padding: "10px 16px",
                fontSize: "14px", fontWeight: isActive ? 700 : 500,
                color: COLORS.primary, fontFamily: FONTS.body,
                borderLeft: isActive ? `3px solid ${COLORS.primary}` : "3px solid transparent",
                background: isActive ? `${COLORS.primary}08` : "transparent",
              }}>
                {item.label}
              </Link>
            );
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-nav { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
