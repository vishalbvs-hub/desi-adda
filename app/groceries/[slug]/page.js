import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { FONTS, COLORS } from "@/lib/constants";
import GroceryClient from "./GroceryClient";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const ff = FONTS.body;
const fb = FONTS.body;
const SAFFRON = "#C4943D";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await supabase.from("groceries").select("name, city, store_type, rating, specialties").eq("slug", slug).single();
  if (!data) return { title: "Store Not Found — Desi Adda" };
  return {
    title: `${data.name} — ${data.city} | Desi Adda`,
    description: `${data.name} in ${data.city}. ${data.store_type || "Indian grocery"}. ${data.rating ? `Rated ${data.rating}/5.` : ""} ${data.specialties || ""}`.trim().substring(0, 160),
    openGraph: { title: `${data.name} — ${data.city}`, description: `${data.store_type || "Indian grocery"} store in ${data.city}, Metro Detroit.` },
  };
}

export default async function GroceryPage({ params }) {
  const { slug } = await params;
  const { data: store } = await supabase.from("groceries").select("*").eq("slug", slug).single();

  if (!store) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px" }}>
        <h1 style={{ fontFamily: ff, fontSize: "24px" }}>Store not found</h1>
        <Link href="/businesses?cat=grocery" style={{ color: COLORS.primary, fontWeight: 600 }}>Browse grocery stores</Link>
      </div>
    );
  }

  const { data: googleReviews } = await supabase.from("grocery_reviews").select("*").eq("grocery_google_place_id", store.google_place_id).order("rating", { ascending: false });

  const s = store;
  const wtk = s.what_to_know ? (typeof s.what_to_know === "string" ? JSON.parse(s.what_to_know) : s.what_to_know) : null;
  const photos = s.photos?.filter(Boolean) || [];

  const jsonLd = {
    "@context": "https://schema.org", "@type": "GroceryStore",
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
          <Link href="/businesses?cat=grocery" style={{ color: COLORS.primary, fontFamily: fb, fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>← Back to Groceries</Link>
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
              {s.store_type && <span style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 600, background: "#E8F5E9", color: "#2E7D32" }}>{s.store_type}</span>}
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
          <style>{`@media (min-width: 768px) { .grocery-grid { grid-template-columns: 1fr 320px !important; } }`}</style>
          <div className="grocery-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
            {/* LEFT */}
            <div>
              {/* What to Know */}
              {wtk && (
                <div style={{ background: "white", borderRadius: "10px", padding: "24px", border: "1px solid #E2DFD8", borderLeft: "4px solid #2E7D32", marginBottom: "20px" }}>
                  <h3 style={{ fontFamily: ff, fontSize: "20px", fontWeight: 700, margin: "0 0 16px", display: "flex", alignItems: "center", gap: "8px" }}>🥘 What to Know</h3>
                  {wtk.known_for && <div style={{ marginBottom: "14px" }}><div style={{ fontSize: "12px", fontWeight: 600, color: "#2E7D32", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Known For</div><div style={{ fontSize: "15px", fontWeight: 600, color: "#1A1A1A" }}>{wtk.known_for}</div></div>}
                  {wtk.best_for && <div style={{ marginBottom: "14px" }}><div style={{ fontSize: "12px", fontWeight: 600, color: "#2E7D32", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Best For</div><div style={{ fontSize: "14px", color: "#6B6B6B", lineHeight: 1.6 }}>{wtk.best_for}</div></div>}
                  {wtk.freshness_day && <div style={{ marginBottom: "14px" }}><div style={{ fontSize: "12px", fontWeight: 600, color: SAFFRON, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Fresh Produce Day</div><div style={{ fontSize: "14px", color: "#6B6B6B" }}>{wtk.freshness_day}</div></div>}
                  {wtk.skip && <div style={{ marginBottom: "14px" }}><div style={{ fontSize: "12px", fontWeight: 600, color: "#C62828", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Skip</div><div style={{ fontSize: "14px", color: "#6B6B6B" }}>{wtk.skip}</div></div>}
                  {wtk.pro_tip && <div style={{ padding: "12px 16px", background: "#F5F2EB", borderRadius: "10px", border: "1px dashed #E2DFD8" }}><div style={{ fontSize: "12px", fontWeight: 600, color: "#00796B", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>💡 Pro Tip</div><div style={{ fontSize: "14px", color: "#6B6B6B" }}>{wtk.pro_tip}</div></div>}
                </div>
              )}

              {s.specialties && (
                <div style={{ background: "white", borderRadius: "10px", padding: "20px 24px", border: "1px solid #E2DFD8", marginBottom: "20px" }}>
                  <h3 style={{ fontFamily: ff, fontSize: "18px", fontWeight: 700, margin: "0 0 8px" }}>What They Carry</h3>
                  <p style={{ fontSize: "14px", color: "#6B6B6B", margin: 0, lineHeight: 1.6 }}>{s.specialties}</p>
                </div>
              )}

              <GroceryClient store={{ id: s.id, name: s.name, google_place_id: s.google_place_id }} googleReviews={googleReviews || []} />
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
