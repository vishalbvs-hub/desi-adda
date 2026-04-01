import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { FONTS, COLORS } from "@/lib/constants";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const ff = FONTS.body;
const fb = FONTS.body;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await supabase.from("curated_lists").select("title, subtitle").eq("slug", slug).single();
  if (!data) return { title: "List Not Found — Desi Adda" };
  return { title: `${data.title} | Desi Adda`, description: data.subtitle };
}

export default async function ListPage({ params }) {
  const { slug } = await params;
  const { data: list } = await supabase.from("curated_lists").select("*").eq("slug", slug).single();

  if (!list) {
    return <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px" }}><h1 style={{ fontFamily: ff, fontSize: "24px" }}>List not found</h1><Link href="/entertainment" style={{ color: COLORS.primary, fontWeight: 600 }}>Back to Entertainment</Link></div>;
  }

  const films = typeof list.films === "string" ? JSON.parse(list.films) : (list.films || []);

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh" }}>
      <div style={{ background: COLORS.surface, borderBottom: `1px solid ${COLORS.border}`, padding: "12px 20px" }}>
        <Link href="/entertainment?tab=watch" style={{ color: COLORS.primary, fontFamily: fb, fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>{"\u2190"} Back to Entertainment</Link>
      </div>

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "36px 20px 60px" }}>
        <h1 style={{ fontFamily: ff, fontSize: "clamp(28px, 5vw, 36px)", fontWeight: 700, margin: "0 0 8px", color: COLORS.text }}>{list.title}</h1>
        {list.subtitle && <p style={{ fontSize: "16px", color: COLORS.textSecondary, margin: "0 0 8px", lineHeight: 1.5 }}>{list.subtitle}</p>}
        <p style={{ fontSize: "14px", color: COLORS.textMuted, margin: "0 0 32px" }}>{list.film_count} films</p>

        <div style={{ display: "grid", gap: "16px" }}>
          {films.map((film, i) => (
            <div key={i} style={{ display: "flex", gap: "16px", padding: "18px 20px", background: COLORS.surface, borderRadius: "10px", border: `1px solid ${COLORS.border}`, alignItems: "flex-start" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#FFF3E0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: ff, fontSize: "18px", fontWeight: 700, color: COLORS.accent }}>{i + 1}</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: ff, fontSize: "16px", fontWeight: 500, margin: "0 0 4px", color: COLORS.text }}>{film.title} <span style={{ fontWeight: 400, color: COLORS.textSecondary, fontSize: "14px" }}>({film.year})</span></h3>
                {film.platform && <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: "999px", fontSize: "10px", fontWeight: 600, background: "#E3F2FD", color: "#1565C0", marginBottom: "6px" }}>{film.platform}</span>}
                {film.description && <p style={{ fontSize: "14px", color: COLORS.textSecondary, margin: 0, lineHeight: 1.5 }}>{film.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
