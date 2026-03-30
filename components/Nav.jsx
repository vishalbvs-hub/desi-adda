"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FONTS, COLORS } from "@/lib/constants";

const NAV_ITEMS = [
  { label: "Local Businesses", href: "/businesses" },
  { label: "Professionals", href: "/professionals" },
  { label: "Community Board", href: "/community" },
  { label: "Events", href: "/events" },
  { label: "Music", href: "/music" },
  { label: "Movies", href: "/movies" },
  { label: "News", href: "/blog" },
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
        <div style={{ display: "flex", gap: "2px", overflowX: "auto", scrollbarWidth: "none" }}>
          {NAV_ITEMS.map(item => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link key={item.label} href={item.href} style={{
                background: "none", padding: "12px 12px", fontSize: "13px",
                fontWeight: 600, color: isActive ? COLORS.primary : "#5A4A3F",
                fontFamily: FONTS.body, whiteSpace: "nowrap", textDecoration: "none",
                borderBottom: `2px solid ${isActive ? COLORS.primary : "transparent"}`,
                transition: "all 0.2s",
              }}>{item.label}</Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
