"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function GlobalSearch() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapRef = useRef(null);
  const debounceRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close dropdown on route change
  useEffect(() => { setOpen(false); setQuery(""); }, [pathname]);

  const doSearch = async (q) => {
    if (q.length < 2) { setResults([]); setOpen(false); return; }
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
      ...(r4.data || []).map(r => ({ ...r, _type: "Community Org", _href: `/community/${r.slug}` })),
      ...(r5.data || []).map(r => ({ ...r, _type: "Grocery", _href: `/groceries/${r.slug}` })),
    ];

    setResults(all.slice(0, 8));
    setOpen(all.length > 0);
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
    if (query.trim()) {
      window.dispatchEvent(new CustomEvent("askadda", { detail: query }));
      setQuery("");
      setOpen(false);
    }
  };

  // Homepage: skip rendering here (homepage has its own search)
  if (isHome) return null;

  return (
    <div style={{ background: COLORS.surface, borderBottom: `1px solid ${COLORS.border}`, padding: "10px 20px" }}>
      <div ref={wrapRef} style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
        <form onSubmit={handleSubmit} style={{ position: "relative" }}>
          <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: COLORS.textMuted }} />
          <input
            value={query}
            onChange={handleChange}
            onFocus={() => { if (results.length > 0) setOpen(true); }}
            placeholder="Search businesses, temples, professionals..."
            style={{
              width: "100%", padding: "9px 100px 9px 36px", borderRadius: "8px",
              border: `1px solid ${COLORS.border}`, fontSize: "13px",
              fontFamily: FONTS.body, background: COLORS.bg, boxSizing: "border-box",
              outline: "none",
            }}
            onFocusCapture={e => e.target.style.borderColor = COLORS.primary}
            onBlurCapture={e => { if (!open) e.target.style.borderColor = COLORS.border; }}
          />
          <button type="submit" style={{
            position: "absolute", right: "3px", top: "50%", transform: "translateY(-50%)",
            background: COLORS.primary, color: "white", border: "none", borderRadius: "6px",
            padding: "7px 14px", fontSize: "12px", fontWeight: 600, cursor: "pointer",
            fontFamily: FONTS.body,
          }}>Search</button>
        </form>

        {/* Dropdown results */}
        {open && (
          <div style={{
            position: "absolute", top: "100%", left: 0, right: 0, marginTop: "4px",
            background: "white", border: `1px solid ${COLORS.border}`, borderRadius: "8px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)", zIndex: 100, overflow: "hidden",
          }}>
            {results.map((r, i) => (
              <Link key={`${r._type}-${r.id}`} href={r._href} onClick={() => setOpen(false)}
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "10px 14px", textDecoration: "none", color: "inherit",
                  borderBottom: i < results.length - 1 ? `1px solid ${COLORS.borderLight}` : "none",
                  transition: "background 0.1s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = COLORS.bg}
                onMouseLeave={e => e.currentTarget.style.background = "white"}
              >
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: COLORS.text }}>{r.name}</div>
                  <div style={{ fontSize: "11px", color: COLORS.textSecondary }}>{r.city}</div>
                </div>
                <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "999px", background: `${COLORS.primary}10`, color: COLORS.primary }}>{r._type}</span>
              </Link>
            ))}
            {loading && <div style={{ padding: "12px 14px", fontSize: "13px", color: COLORS.textMuted }}>Searching...</div>}
          </div>
        )}
      </div>
    </div>
  );
}
