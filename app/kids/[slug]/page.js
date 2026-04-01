import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { FONTS, COLORS } from "@/lib/constants";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const ff = FONTS.body;
const fb = FONTS.body;
const SAFFRON = "#C4943D";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await supabase.from("kids").select("name, city, subcategories, rating, description").eq("slug", slug).single();
  if (!data) return { title: "Program Not Found — Desi Adda" };
  const sub = Array.isArray(data.subcategories) ? data.subcategories.join(", ") : "";
  return {
    title: `${data.name} — ${data.city} | Desi Adda`,
    description: `${data.name} in ${data.city}. ${sub || "Kids & education"}. ${data.rating ? `Rated ${data.rating}/5.` : ""} ${data.description || ""}`.trim().substring(0, 160),
    openGraph: { title: `${data.name} — ${data.city}`, description: `${sub || "Kids & education program"} in ${data.city}, Metro Detroit.` },
  };
}

export default async function KidsPage({ params }) {
  const { slug } = await params;
  const { data: biz } = await supabase.from("kids").select("*").eq("slug", slug).single();

  if (!biz) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px" }}>
        <h1 style={{ fontFamily: ff, fontSize: "24px" }}>Program not found</h1>
        <Link href="/businesses?cat=family" style={{ color: COLORS.primary, fontWeight: 600 }}>Browse kids & education</Link>
      </div>
    );
  }

  const s = biz;
  const photos = s.photos?.filter(Boolean) || [];
  const subcats = Array.isArray(s.subcategories) ? s.subcategories : [];

  const jsonLd = {
    "@context": "https://schema.org", "@type": "EducationalOrganization",
    name: s.name,
    address: { "@type": "PostalAddress", streetAddress: s.address, addressLocality: s.city, addressRegion: "MI", addressCountry: "US" },
    telephone: s.phone, url: s.url,
    ...(s.rating && { aggregateRating: { "@type": "AggregateRating", ratingValue: s.rating, reviewCount: s.reviews } }),
    ...(s.latitude && { geo: { "@type": "GeoCoordinates", latitude: s.latitude, longitude: s.longitude } }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ background: "#F5F2EB", minHeight: "100vh" }}>
        <div style={{ background: "white", borderBottom: "1px solid #E2DFD8", padding: "12px 20px" }}>
          <Link href="/businesses?cat=family" style={{ color: COLORS.primary, fontFamily: fb, fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>← Back to Kids & Education</Link>
        </div>

        {/* Photos */}
        {photos.length > 0 && (
          <>
            <div style={{ display: "flex", gap: "4px", overflowX: "auto", background: "#1A1A1A", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
              {photos.map((url, i) => (
                <div key={i} style={{ flexShrink: 0, width: photos.length === 1 ? "100%" : photos.length === 2 ? "50%" : "clamp(280px, 40vw, 400px)", height: "320px", scrollSnapAlign: "start" }}>
                  <img src={url} alt={`${s.name} photo ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
            {photos.length > 1 && <div style={{ background: "#1A1A1A", padding: "6px 0", textAlign: "center" }}><span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", fontFamily: fb }}>{photos.length} photos — scroll →</span></div>}
          </>
        )}

        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "28px 20px" }}>
          {/* Header */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
              {subcats.map((cat, i) => <span key={i} style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 600, background: "#F5F2EB", color: "#E65100" }}>{cat}</span>)}
            </div>
            <h1 style={{ fontFamily: ff, fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 700, margin: "0 0 8px", color: "#1A1A1A" }}>{s.name}</h1>
            {s.rating && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px", fontSize: "14px" }}>
                <div style={{ display: "flex", gap: "1px" }}>
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i <= Math.round(s.rating) ? SAFFRON : "#E2DFD8"} stroke="none">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span style={{ fontWeight: 700, color: "#1A1A1A" }}>{s.rating}</span>
                <span style={{ color: "#6B6B6B" }}>({s.reviews?.toLocaleString()} reviews)</span>
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px", color: "#6B6B6B" }}>
              {s.address && <div>📍 {s.address}</div>}
              {s.phone && <div>📞 <a href={`tel:${s.phone}`} style={{ color: COLORS.primary, textDecoration: "none" }}>{s.phone}</a></div>}
              {s.url && <div>🌐 <a href={s.url.startsWith("http") ? s.url : `https://${s.url}`} target="_blank" rel="noopener noreferrer" style={{ color: COLORS.primary, textDecoration: "none" }}>{s.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</a></div>}
            </div>
          </div>

          {/* Two-column layout */}
          <style>{`@media (min-width: 768px) { .kids-grid { grid-template-columns: 1fr 320px !important; } }`}</style>
          <div className="kids-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
            {/* LEFT */}
            <div>
              {(s.description || s.desc) && (
                <div style={{ background: "white", borderRadius: "10px", padding: "20px 24px", border: "1px solid #E2DFD8", marginBottom: "20px" }}>
                  <h3 style={{ fontFamily: ff, fontSize: "18px", fontWeight: 700, margin: "0 0 8px" }}>About</h3>
                  <p style={{ fontSize: "14px", color: "#6B6B6B", margin: 0, lineHeight: 1.6 }}>{s.description || s.desc}</p>
                </div>
              )}

              {subcats.length > 0 && (
                <div style={{ background: "white", borderRadius: "10px", padding: "20px 24px", border: "1px solid #E2DFD8", marginBottom: "20px" }}>
                  <h3 style={{ fontFamily: ff, fontSize: "18px", fontWeight: 700, margin: "0 0 8px" }}>Programs</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {subcats.map((cat, i) => <span key={i} style={{ padding: "6px 14px", borderRadius: "999px", fontSize: "13px", fontWeight: 500, background: "#F5F2EB", color: "#6B6B6B" }}>{cat}</span>)}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT */}
            <div>
              {s.hours && (
                <div style={{ background: "white", borderRadius: "10px", padding: "18px 20px", border: "1px solid #E2DFD8", marginBottom: "16px" }}>
                  <h3 style={{ fontFamily: ff, fontSize: "16px", fontWeight: 700, margin: "0 0 10px" }}>Hours</h3>
                  <div style={{ display: "grid", gap: "2px", fontSize: "12px", color: "#6B6B6B" }}>
                    {s.hours.split(" | ").map((day, i) => {
                      const [dayName, ...times] = day.split(": ");
                      return (<div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", borderBottom: i < 6 ? "1px solid #F5F2EB" : "none" }}><span style={{ fontWeight: 600, fontSize: "11px" }}>{dayName}</span><span style={{ color: "#6B6B6B", fontSize: "11px" }}>{times.join(": ")}</span></div>);
                    })}
                  </div>
                </div>
              )}
              {s.latitude && s.longitude && (
                <div style={{ marginBottom: "16px", borderRadius: "10px", overflow: "hidden", border: "1px solid #E2DFD8" }}>
                  <iframe width="100%" height="220" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${s.latitude},${s.longitude}&z=15&output=embed`} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
