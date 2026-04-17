"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Menu, X, Search, MapPin } from "lucide-react";
import { supabase } from "@/lib/supabase";

const PRIMARY_LINKS = [
  { label: "Find events", href: "/events" },
  { label: "Submit a business", href: "/suggest" },
  { label: "News", href: "/news" },
];

const DRAWER_LINKS = [
  { label: "Restaurants", href: "/businesses?tab=restaurants" },
  { label: "Groceries", href: "/businesses?tab=groceries" },
  { label: "Temples", href: "/temples" },
  { label: "Professionals", href: "/professionals" },
  { label: "Event planning", href: "/event-planning" },
  { label: "Community", href: "/community" },
  { label: "Entertainment", href: "/entertainment" },
  { label: "News", href: "/news" },
  { label: "Find events", href: "/events" },
  { label: "Submit a business", href: "/suggest" },
];

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setResultsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => { setResultsOpen(false); setQuery(""); setDrawerOpen(false); setMobileSearchOpen(false); }, [pathname]);

  const doSearch = async (q) => {
    if (q.length < 2) { setResults([]); setResultsOpen(false); return; }
    setLoading(true);
    const term = `%${q}%`;
    const [r1, r2, r3, r4, r5] = await Promise.all([
      supabase.from("restaurants").select("id, name, city, slug, rating").ilike("name", term).limit(4),
      supabase.from("temples").select("id, name, city, slug").ilike("name", term).limit(3),
      supabase.from("professionals").select("id, name, city, slug, specialty").ilike("name", term).limit(3),
      supabase.from("community_networking").select("id, name, city, slug").ilike("name", term).limit(3),
      supabase.from("groceries").select("id, name, city, slug").ilike("name", term).limit(3),
    ]);
    const all = [
      ...(r1.data || []).map(r => ({ ...r, _type: "Restaurant", _href: `/restaurants/${r.slug}` })),
      ...(r2.data || []).map(r => ({ ...r, _type: "Temple", _href: `/temples/${r.slug}` })),
      ...(r3.data || []).map(r => ({ ...r, _type: "Professional", _href: `/professionals/${r.slug}` })),
      ...(r4.data || []).map(r => ({ ...r, _type: "Community org", _href: `/community/${r.slug}` })),
      ...(r5.data || []).map(r => ({ ...r, _type: "Grocery", _href: `/groceries/${r.slug}` })),
    ];
    setResults(all.slice(0, 8));
    setResultsOpen(all.length > 0);
    setLoading(false);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(val), 250);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    window.dispatchEvent(new CustomEvent("askadda", { detail: query }));
    setQuery("");
    setResultsOpen(false);
  };

  return (
    <nav
      style={{
        background: "var(--bg-header)",
        position: "sticky", top: 0, zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1200px", margin: "0 auto",
          display: "flex", alignItems: "center", gap: "16px",
          padding: "14px 20px",
          height: "64px",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontSize: "22px", fontWeight: 500, letterSpacing: "-0.03em",
            color: "var(--text-inverse)", textDecoration: "none",
            flexShrink: 0, lineHeight: 1,
          }}
        >
          adda<span style={{ color: "var(--brand-primary)" }}>.</span>
        </Link>

        {/* Desktop search */}
        <div
          ref={searchRef}
          className="desktop-search"
          style={{
            flex: 1, position: "relative", maxWidth: "640px",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                height: "40px", padding: "0 4px 0 14px",
                background: "var(--bg-page)",
                borderRadius: "var(--radius-pill)",
              }}
            >
              <Search size={14} style={{ color: "var(--text-secondary)", flexShrink: 0 }} />
              <input
                value={query}
                onChange={handleChange}
                onFocus={() => { if (results.length > 0) setResultsOpen(true); }}
                placeholder="Search restaurants, temples, events"
                style={{
                  flex: 1, background: "transparent", border: "none", outline: "none",
                  fontSize: "14px", color: "var(--text-primary)",
                  fontFamily: "inherit",
                }}
              />
              <div style={{ width: "1px", height: "20px", background: "var(--border-default)", flexShrink: 0 }} />
              <div
                style={{
                  display: "flex", alignItems: "center", gap: "4px",
                  fontSize: "13px", color: "var(--text-primary)",
                  padding: "0 8px", flexShrink: 0,
                }}
              >
                <MapPin size={12} style={{ color: "var(--text-secondary)" }} />
                Troy
              </div>
              <button
                type="submit"
                aria-label="Search"
                style={{
                  width: "32px", height: "32px", borderRadius: "var(--radius-pill)",
                  background: "var(--brand-primary)", color: "#FFFFFF",
                  border: "none", cursor: "pointer", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <Search size={14} color="#FFFFFF" />
              </button>
            </div>
          </form>

          {resultsOpen && (
            <div
              style={{
                position: "absolute", top: "100%", left: 0, right: 0, marginTop: "6px",
                background: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-lg)", overflow: "hidden",
                zIndex: 100,
              }}
            >
              {results.map((r, i) => (
                <Link
                  key={`${r._type}-${r.id}`}
                  href={r._href}
                  onClick={() => setResultsOpen(false)}
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "10px 14px", textDecoration: "none", color: "var(--text-primary)",
                    borderBottom: i < results.length - 1 ? "1px solid var(--border-subtle)" : "none",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 500 }}>{r.name}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{r.city}</div>
                  </div>
                  <span
                    style={{
                      fontSize: "10px", fontWeight: 500,
                      padding: "2px 8px", borderRadius: "var(--radius-pill)",
                      background: "var(--pill-butter-bg)", color: "var(--pill-butter-text)",
                    }}
                  >
                    {r._type}
                  </span>
                </Link>
              ))}
              {loading && (
                <div style={{ padding: "12px 14px", fontSize: "13px", color: "var(--text-muted)" }}>
                  Searching…
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile search icon */}
        <button
          aria-label="Open search"
          onClick={() => setMobileSearchOpen(v => !v)}
          className="mobile-search-btn"
          style={{
            display: "none", background: "transparent", border: "none",
            cursor: "pointer", padding: "8px", color: "var(--text-inverse)",
            marginLeft: "auto",
          }}
        >
          <Search size={20} />
        </button>

        {/* Desktop primary links */}
        <div className="desktop-links" style={{ display: "flex", alignItems: "center", gap: "18px", flexShrink: 0 }}>
          {PRIMARY_LINKS.map(l => (
            <Link
              key={l.label}
              href={l.href}
              style={{
                fontSize: "13px", fontWeight: 500, color: "var(--text-inverse)",
                textDecoration: "none", whiteSpace: "nowrap",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Hamburger */}
        <button
          aria-label="Open menu"
          onClick={() => setDrawerOpen(true)}
          className="hamburger-btn"
          style={{
            display: "none", background: "transparent", border: "none",
            cursor: "pointer", padding: "8px", color: "var(--text-inverse)",
          }}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile search row */}
      {mobileSearchOpen && (
        <div
          className="mobile-search-row"
          style={{ padding: "0 20px 12px", background: "var(--bg-header)" }}
        >
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                height: "40px", padding: "0 4px 0 14px",
                background: "var(--bg-page)",
                borderRadius: "var(--radius-pill)",
              }}
            >
              <Search size={14} style={{ color: "var(--text-secondary)", flexShrink: 0 }} />
              <input
                value={query}
                onChange={handleChange}
                placeholder="Search restaurants, temples, events"
                autoFocus
                style={{
                  flex: 1, background: "transparent", border: "none", outline: "none",
                  fontSize: "14px", color: "var(--text-primary)", fontFamily: "inherit",
                }}
              />
              <button
                type="submit"
                aria-label="Search"
                style={{
                  width: "32px", height: "32px", borderRadius: "var(--radius-pill)",
                  background: "var(--brand-primary)", color: "#FFFFFF",
                  border: "none", cursor: "pointer", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <Search size={14} color="#FFFFFF" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mobile drawer */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
            zIndex: 100,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: "absolute", top: 0, right: 0, bottom: 0,
              width: "280px", background: "var(--bg-header)",
              padding: "20px",
              overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "8px" }}>
              <button
                aria-label="Close menu"
                onClick={() => setDrawerOpen(false)}
                style={{
                  background: "transparent", border: "none", cursor: "pointer",
                  color: "var(--text-inverse)", padding: "8px",
                }}
              >
                <X size={20} />
              </button>
            </div>
            {DRAWER_LINKS.map(l => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setDrawerOpen(false)}
                style={{
                  display: "block", padding: "12px 8px",
                  fontSize: "15px", fontWeight: 500,
                  color: "var(--text-inverse)", textDecoration: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 760px) {
          .desktop-search { display: none !important; }
          .desktop-links { display: none !important; }
          .mobile-search-btn { display: inline-flex !important; }
          .hamburger-btn { display: inline-flex !important; }
        }
      `}</style>
    </nav>
  );
}
