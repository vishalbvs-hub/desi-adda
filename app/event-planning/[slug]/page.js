import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { FONTS, COLORS } from "@/lib/constants";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const ff = FONTS.body;
const fb = FONTS.body;
const SAFFRON = "#C4943D";

async function findBySlug(slug) {
  const { data: vendor } = await supabase
    .from("wedding_vendors")
    .select("*")
    .eq("slug", slug)
    .single();
  if (vendor) return { ...vendor, _type: "vendor" };

  const { data: hall } = await supabase
    .from("event_halls")
    .select("*")
    .eq("slug", slug)
    .single();
  if (hall) return { ...hall, _type: "hall" };

  return null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = await findBySlug(slug);
  if (!item) return { title: "Not Found — Desi Adda" };

  const typeLabel = item._type === "hall" ? "Event Venue" : "Wedding Vendor";
  return {
    title: `${item.name} — ${item.city} | Desi Adda`,
    description: `${item.name} in ${item.city}. ${typeLabel}. ${item.rating ? `Rated ${item.rating}/5.` : ""} ${item.description || ""}`.trim().substring(0, 160),
    openGraph: {
      title: `${item.name} — ${item.city}`,
      description: `${typeLabel} in ${item.city}, Metro Detroit.`,
    },
  };
}

export default async function EventDetailPage({ params }) {
  const { slug } = await params;
  const item = await findBySlug(slug);

  if (!item) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px" }}>
        <h1 style={{ fontFamily: ff, fontSize: "24px" }}>Not found</h1>
        <Link href="/event-planning" style={{ color: COLORS.primary, fontWeight: 600 }}>Browse event planning</Link>
      </div>
    );
  }

  const s = item;
  const photos = s.photos?.filter(Boolean) || [];
  const subs = s.subcategories || [];
  const typeLabel = s._type === "hall" ? "Event Venue" : "Wedding Vendor";
  const websiteUrl = s.url || s.website;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: s.name,
    description: s.description,
    address: {
      "@type": "PostalAddress",
      ...(s.address && { streetAddress: s.address }),
      addressLocality: s.city,
      addressRegion: "MI",
      addressCountry: "US",
    },
    telephone: s.phone,
    url: websiteUrl,
    ...(s.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: s.rating,
        reviewCount: s.reviews,
      },
    }),
    ...(s.latitude && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: s.latitude,
        longitude: s.longitude,
      },
    }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ background: "#F5F2EB", minHeight: "100vh" }}>
        {/* Back nav */}
        <div style={{ background: "white", borderBottom: "1px solid #E2DFD8", padding: "12px 20px" }}>
          <Link href="/event-planning" style={{ color: COLORS.primary, fontFamily: fb, fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
            ← Back to Event Planning
          </Link>
        </div>

        {/* Photo gallery */}
        {photos.length > 0 && (
          <>
            <div style={{
              display: "flex", gap: "4px", overflowX: "auto", background: "#1A1A1A",
              scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", scrollbarWidth: "none",
            }}>
              {photos.map((url, i) => (
                <div key={i} style={{
                  flexShrink: 0,
                  width: photos.length === 1 ? "100%" : photos.length === 2 ? "50%" : "clamp(280px, 40vw, 400px)",
                  height: "320px", scrollSnapAlign: "start",
                }}>
                  <img src={url} alt={`${s.name} photo ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
            {photos.length > 1 && (
              <div style={{ background: "#1A1A1A", padding: "6px 0", textAlign: "center" }}>
                <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", fontFamily: fb }}>{photos.length} photos — scroll →</span>
              </div>
            )}
          </>
        )}

        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "28px 20px" }}>
          {/* Header */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
              <span style={{
                padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 600,
                background: s._type === "hall" ? "#EFEBE9" : "#FCE4EC",
                color: s._type === "hall" ? "#795548" : "#2D5A3D",
              }}>
                {typeLabel}
              </span>
              {subs.map((sub) => (
                <span key={sub} style={{
                  padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 600,
                  background: "#F3E5F5", color: "#7B1FA2",
                }}>
                  {sub}
                </span>
              ))}
            </div>

            <h1 style={{ fontFamily: ff, fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 700, margin: "0 0 8px", color: "#1A1A1A" }}>
              {s.name}
            </h1>

            {s.rating && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px", fontSize: "14px" }}>
                <div style={{ display: "flex", gap: "1px" }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i <= Math.round(s.rating) ? SAFFRON : "#E2DFD8"} stroke="none">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span style={{ fontWeight: 700, color: "#1A1A1A" }}>{s.rating}</span>
                {s.reviews && <span style={{ color: "#6B6B6B" }}>({s.reviews.toLocaleString()} reviews)</span>}
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px", color: "#6B6B6B" }}>
              {(s.address || s.city) && <div>📍 {s.address ? `${s.address}, ${s.city}` : s.city}</div>}
              {s.phone && (
                <div>📞 <a href={`tel:${s.phone}`} style={{ color: COLORS.primary, textDecoration: "none" }}>{s.phone}</a></div>
              )}
              {websiteUrl && (
                <div>🌐 <a href={websiteUrl.startsWith("http") ? websiteUrl : `https://${websiteUrl}`} target="_blank" rel="noopener noreferrer" style={{ color: COLORS.primary, textDecoration: "none" }}>
                  {websiteUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                </a></div>
              )}
            </div>
          </div>

          {/* Two-column layout */}
          <style>{`@media (min-width: 768px) { .event-detail-grid { grid-template-columns: 1fr 320px !important; } }`}</style>
          <div className="event-detail-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
            {/* LEFT — main content */}
            <div>
              {s.description && (
                <div style={{ background: "white", borderRadius: "10px", padding: "24px", border: "1px solid #E2DFD8", marginBottom: "20px" }}>
                  <h3 style={{ fontFamily: ff, fontSize: "20px", fontWeight: 700, margin: "0 0 12px", color: "#1A1A1A" }}>About</h3>
                  <p style={{ fontSize: "15px", color: "#6B6B6B", margin: 0, lineHeight: 1.7 }}>{s.description}</p>
                </div>
              )}

              {s.badges && s.badges.length > 0 && (
                <div style={{ background: "white", borderRadius: "10px", padding: "20px 24px", border: "1px solid #E2DFD8", marginBottom: "20px" }}>
                  <h3 style={{ fontFamily: ff, fontSize: "18px", fontWeight: 700, margin: "0 0 12px" }}>Highlights</h3>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {s.badges.map((badge) => (
                      <span key={badge} style={{
                        padding: "5px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: 600,
                        background: "#F5F2EB", color: "#E65100",
                      }}>
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews count summary */}
              {s.reviews && s.reviews > 0 && (
                <div style={{ background: "white", borderRadius: "10px", padding: "20px 24px", border: "1px solid #E2DFD8", marginBottom: "20px" }}>
                  <h3 style={{ fontFamily: ff, fontSize: "18px", fontWeight: 700, margin: "0 0 8px" }}>Reviews</h3>
                  <p style={{ fontSize: "14px", color: "#6B6B6B", margin: 0, lineHeight: 1.6 }}>
                    {s.reviews.toLocaleString()} Google reviews with an average rating of {s.rating}/5
                  </p>
                </div>
              )}
            </div>

            {/* RIGHT — sidebar */}
            <div>
              {/* Contact CTA */}
              {(s.phone || websiteUrl) && (
                <div style={{
                  background: "linear-gradient(135deg, #4A1942, #6B2569)", borderRadius: "10px",
                  padding: "20px", marginBottom: "16px", textAlign: "center",
                }}>
                  <h3 style={{ fontFamily: ff, fontSize: "16px", fontWeight: 700, color: "white", margin: "0 0 12px" }}>Get in Touch</h3>
                  {s.phone && (
                    <a href={`tel:${s.phone}`} style={{
                      display: "block", padding: "10px 20px", borderRadius: "10px",
                      background: SAFFRON, color: "#1A1A1A", fontFamily: fb,
                      fontWeight: 600, fontSize: "14px", textDecoration: "none", marginBottom: "8px",
                    }}>
                      📞 Call Now
                    </a>
                  )}
                  {websiteUrl && (
                    <a href={websiteUrl.startsWith("http") ? websiteUrl : `https://${websiteUrl}`} target="_blank" rel="noopener noreferrer" style={{
                      display: "block", padding: "10px 20px", borderRadius: "10px",
                      background: "rgba(255,255,255,0.15)", color: "white", fontFamily: fb,
                      fontWeight: 600, fontSize: "14px", textDecoration: "none",
                    }}>
                      🌐 Visit Website
                    </a>
                  )}
                </div>
              )}

              {/* Hours */}
              {s.hours && (
                <div style={{ background: "white", borderRadius: "10px", padding: "18px 20px", border: "1px solid #E2DFD8", marginBottom: "16px" }}>
                  <h3 style={{ fontFamily: ff, fontSize: "16px", fontWeight: 700, margin: "0 0 10px" }}>Hours</h3>
                  <div style={{ display: "grid", gap: "2px", fontSize: "12px", color: "#6B6B6B" }}>
                    {s.hours.split(" | ").map((day, i) => {
                      const [dayName, ...times] = day.split(": ");
                      return (
                        <div key={i} style={{
                          display: "flex", justifyContent: "space-between", padding: "3px 0",
                          borderBottom: i < 6 ? "1px solid #F5F2EB" : "none",
                        }}>
                          <span style={{ fontWeight: 600, fontSize: "11px" }}>{dayName}</span>
                          <span style={{ color: "#6B6B6B", fontSize: "11px" }}>{times.join(": ")}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Map */}
              {s.latitude && s.longitude && (
                <div style={{ marginBottom: "16px", borderRadius: "10px", overflow: "hidden", border: "1px solid #E2DFD8" }}>
                  <iframe
                    width="100%" height="220" style={{ border: 0 }}
                    loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${s.latitude},${s.longitude}&z=15&output=embed`}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
