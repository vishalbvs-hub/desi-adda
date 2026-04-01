import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { FONTS, COLORS } from "@/lib/constants";
import TempleClient from "./TempleClient";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const ff = FONTS.body;
const fb = FONTS.body;
const SAFFRON = "#C4943D";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await supabase.from("temples").select("name, city, subcategories, rating, description").eq("slug", slug).single();
  if (!data) return { title: "Temple Not Found — Desi Adda" };
  const subs = (data.subcategories || []).join(", ");
  return {
    title: `${data.name} — ${data.city} | Desi Adda`,
    description: `${data.name} in ${data.city}. ${subs ? subs + "." : ""} ${data.rating ? `Rated ${data.rating}/5.` : ""} ${data.description || ""}`.trim().substring(0, 160),
    openGraph: { title: `${data.name} — ${data.city}`, description: `${subs || "Temple"} in ${data.city}, Metro Detroit.` },
  };
}

export default async function TemplePage({ params }) {
  const { slug } = await params;
  const { data: temple } = await supabase.from("temples").select("*").eq("slug", slug).single();

  if (!temple) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px" }}>
        <h1 style={{ fontFamily: ff, fontSize: "24px" }}>Temple not found</h1>
        <Link href="/temples" style={{ color: COLORS.primary, fontWeight: 600 }}>Browse all temples</Link>
      </div>
    );
  }

  // Fetch events for this temple
  const { data: events } = await supabase
    .from("temple_events")
    .select("*")
    .eq("temple_id", temple.id)
    .gte("event_date", new Date().toISOString().split("T")[0])
    .order("event_date");

  const t = temple;
  const photos = t.photos?.filter(Boolean) || [];
  const subs = t.subcategories || [];

  const jsonLd = {
    "@context": "https://schema.org", "@type": "PlaceOfWorship",
    name: t.name,
    address: { "@type": "PostalAddress", streetAddress: t.address, addressLocality: t.city, addressRegion: "MI", addressCountry: "US" },
    telephone: t.phone, url: t.url,
    ...(t.rating && { aggregateRating: { "@type": "AggregateRating", ratingValue: t.rating, reviewCount: t.reviews } }),
    ...(t.latitude && { geo: { "@type": "GeoCoordinates", latitude: t.latitude, longitude: t.longitude } }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ background: "#F5F2EB", minHeight: "100vh" }}>
        <div style={{ background: "white", borderBottom: "1px solid #E2DFD8", padding: "12px 20px" }}>
          <Link href="/temples" style={{ color: COLORS.primary, fontFamily: fb, fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>← Back to Temples</Link>
        </div>

        {/* Photos */}
        {photos.length > 0 && (
          <>
            <div style={{ display: "flex", gap: "4px", overflowX: "auto", background: "#1A1A1A", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
              {photos.map((url, i) => (
                <div key={i} style={{ flexShrink: 0, width: photos.length === 1 ? "100%" : photos.length === 2 ? "50%" : "clamp(280px, 40vw, 400px)", height: "320px", scrollSnapAlign: "start" }}>
                  <img src={url} alt={`${t.name} photo ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
            {photos.length > 1 && <div style={{ background: "#1A1A1A", padding: "6px 0", textAlign: "center" }}><span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", fontFamily: fb }}>{photos.length} photos — scroll →</span></div>}
          </>
        )}

        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "28px 20px" }}>
          {/* Header */}
          <div style={{ marginBottom: "24px" }}>
            {subs.length > 0 && (
              <div style={{ display: "flex", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
                {subs.map(s => <span key={s} style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 600, background: "#F5F2EB", color: "#E65100" }}>{s}</span>)}
              </div>
            )}
            <h1 style={{ fontFamily: ff, fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 700, margin: "0 0 8px", color: "#1A1A1A" }}>{t.name}</h1>
            {t.rating && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px", fontSize: "14px" }}>
                <div style={{ display: "flex", gap: "1px" }}>
                  {[1,2,3,4,5].map(i => <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i <= Math.round(t.rating) ? SAFFRON : "#E2DFD8"} stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>)}
                </div>
                <span style={{ fontWeight: 700, color: "#1A1A1A" }}>{t.rating}</span>
                {t.reviews && <span style={{ color: "#6B6B6B" }}>({t.reviews.toLocaleString()} reviews)</span>}
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px", color: "#6B6B6B" }}>
              {t.address && <div>📍 {t.address}</div>}
              {t.phone && <div>📞 <a href={`tel:${t.phone}`} style={{ color: COLORS.primary, textDecoration: "none" }}>{t.phone}</a></div>}
              {t.url && <div>🌐 <a href={t.url.startsWith("http") ? t.url : `https://${t.url}`} target="_blank" rel="noopener noreferrer" style={{ color: COLORS.primary, textDecoration: "none" }}>{t.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</a></div>}
            </div>
          </div>

          {/* Two-column layout */}
          <style>{`@media (min-width: 768px) { .temple-grid { grid-template-columns: 1fr 320px !important; } }`}</style>
          <div className="temple-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
            {/* LEFT */}
            <div>
              {t.description && (
                <div style={{ background: "white", borderRadius: "10px", padding: "24px", border: "1px solid #E2DFD8", marginBottom: "20px" }}>
                  <h3 style={{ fontFamily: ff, fontSize: "20px", fontWeight: 700, margin: "0 0 12px" }}>About</h3>
                  <p style={{ fontSize: "15px", color: "#6B6B6B", margin: 0, lineHeight: 1.7 }}>{t.description}</p>
                </div>
              )}

              {/* Events + Email signup — client component */}
              <TempleClient
                temple={{ id: t.id, name: t.name, address: t.address || t.city || "", website: t.url || null }}
                events={events || []}
              />
            </div>

            {/* RIGHT */}
            <div>
              {t.hours && (
                <div style={{ background: "white", borderRadius: "10px", padding: "18px 20px", border: "1px solid #E2DFD8", marginBottom: "16px" }}>
                  <h3 style={{ fontFamily: ff, fontSize: "16px", fontWeight: 700, margin: "0 0 10px" }}>Hours</h3>
                  <div style={{ display: "grid", gap: "2px", fontSize: "12px", color: "#6B6B6B" }}>
                    {t.hours.split(" | ").map((day, i) => {
                      const [dayName, ...times] = day.split(": ");
                      return (<div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", borderBottom: i < 6 ? "1px solid #F5F2EB" : "none" }}><span style={{ fontWeight: 600, fontSize: "11px" }}>{dayName}</span><span style={{ color: "#6B6B6B", fontSize: "11px" }}>{times.join(": ")}</span></div>);
                    })}
                  </div>
                </div>
              )}
              {t.latitude && t.longitude && (
                <div style={{ marginBottom: "16px", borderRadius: "10px", overflow: "hidden", border: "1px solid #E2DFD8" }}>
                  <iframe width="100%" height="220" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${t.latitude},${t.longitude}&z=15&output=embed`} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
