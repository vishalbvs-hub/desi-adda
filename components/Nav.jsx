"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FONTS, COLORS } from "@/lib/constants";

const NAV_ITEMS = [
  { label: "Local\nBusinesses", href: "/businesses" },
  { label: "Worship &\nSpiritual", href: "/temples" },
  { label: "Professionals\n& Services", href: "/professionals" },
  { label: "Event\nPlanning", href: "/event-planning" },
  { label: "Entertainment", href: "/entertainment" },
  { label: "Community\n& Events", href: "/community" },
  { label: "Classifieds", href: "/classifieds" },
  { label: "News", href: "/news" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav style={{
      background: "white", borderBottom: "1px solid #EDE6DE",
      padding: "0 20px", position: "sticky", top: 0, zIndex: 50,
    }}>
      <div style={{
        maxWidth: "1100px", margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link href="/" style={{
          fontFamily: FONTS.heading, fontSize: "38px", fontWeight: 700,
          color: COLORS.primary, padding: "10px 0", textDecoration: "none", flexShrink: 0,
        }}>adda.</Link>
        <div style={{ display: "flex", gap: "2px", overflowX: "auto", scrollbarWidth: "none", alignItems: "center" }}>
          {NAV_ITEMS.map(item => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            const isStacked = item.label.includes("\n");
            const lines = item.label.split("\n");
            return (
              <Link key={item.label} href={item.href} style={{
                background: "none", padding: "8px 12px", fontSize: "12px",
                fontWeight: 600, color: isActive ? COLORS.primary : "#5A4A3F",
                fontFamily: FONTS.body, textDecoration: "none",
                borderBottom: `2px solid ${isActive ? COLORS.primary : "transparent"}`,
                transition: "all 0.2s", textAlign: "center",
                lineHeight: isStacked ? 1.2 : 1.4,
                display: "flex", flexDirection: "column", alignItems: "center",
                whiteSpace: "nowrap",
              }}>
                {isStacked ? lines.map((line, i) => <span key={i}>{line}</span>) : item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
