import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { FONTS, COLORS } from "@/lib/constants";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const ff = FONTS.heading;
const fb = FONTS.body;
const SAFFRON = "#E8A317";

// ═══ SEO METADATA ═══
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await supabase.from("restaurants").select("name, city, cuisine_type, rating, description").eq("slug", slug).single();
  if (!data) return { title: "Restaurant Not Found — Desi Adda" };
  return {
    title: `${data.name} — ${data.city} | Desi Adda`,
    description: `${data.name} in ${data.city}. ${data.cuisine_type || "Indian"} cuisine. ${data.rating ? `Rated ${data.rating}/5.` : ""} ${data.description || ""}`.trim(),
    openGraph: {
      title: `${data.name} — ${data.city}`,
      description: `${data.cuisine_type || "Indian"} restaurant in ${data.city}, Metro Detroit.`,
    },
  };
}

// ═══ PAGE ═══
export default async function RestaurantPage({ params }) {
  const { slug } = await params;

  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!restaurant) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px" }}>
        <h1 style={{ fontFamily: ff, fontSize: "24px" }}>Restaurant not found</h1>
        <Link href="/businesses" style={{ color: COLORS.primary, fontWeight: 600 }}>Browse all businesses</Link>
      </div>
    );
  }

  const { data: reviews } = await supabase
    .from("restaurant_reviews")
    .select("*")
    .eq("restaurant_google_place_id", restaurant.google_place_id)
    .order("rating", { ascending: false });

  const r = restaurant;
  const wto = r.what_to_order ? (typeof r.what_to_order === "string" ? JSON.parse(r.what_to_order) : r.what_to_order) : null;
  const photos = r.photos?.filter(Boolean) || [];

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: r.name,
    address: { "@type": "PostalAddress", streetAddress: r.address, addressLocality: r.city, addressRegion: "MI", addressCountry: "US" },
    telephone: r.phone,
    url: r.url,
    servesCuisine: r.cuisine_type,
    priceRange: r.price_range,
    ...(r.rating && { aggregateRating: { "@type": "AggregateRating", ratingValue: r.rating, reviewCount: r.reviews } }),
    ...(r.latitude && { geo: { "@type": "GeoCoordinates", latitude: r.latitude, longitude: r.longitude } }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ background: "#FFFBF5", minHeight: "100vh" }}>
        {/* Back nav */}
        <div style={{ background: "white", borderBottom: "1px solid #EDE6DE", padding: "12px 20px" }}>
          <Link href="/businesses?cat=restaurants" style={{ color: COLORS.primary, fontFamily: fb, fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
            ← Back to Restaurants
          </Link>
        </div>

        {/* Photo Gallery */}
        {photos.length > 0 && (
          <div style={{ display: "flex", gap: "4px", overflowX: "auto", scrollbarWidth: "none", background: "#2D2420" }}>
            {photos.slice(0, 3).map((url, i) => (
              <div key={i} style={{ flexShrink: 0, width: photos.length === 1 ? "100%" : "50%", minWidth: "280px", height: "280px" }}>
                <img src={url} alt={`${r.name} photo ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
        )}

        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "28px 20px" }}>
          {/* Header */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
              {r.cuisine_type && (
                <span style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 600, background: `${SAFFRON}15`, color: SAFFRON }}>{r.cuisine_type}</span>
              )}
              {r.veg_status && (
                <span style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 600, background: r.veg_status === "Veg" ? "#E8F5E9" : "#FFF3E0", color: r.veg_status === "Veg" ? "#2E7D32" : "#E65100" }}>
                  {r.veg_status === "Veg" ? "🌿 Vegetarian" : r.veg_status === "Both" ? "🍽️ Veg & Non-Veg" : r.veg_status}
                </span>
              )}
              {r.price_range && (
                <span style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 600, background: "#F5EDE4", color: "#8A7968" }}>{r.price_range}</span>
              )}
            </div>

            <h1 style={{ fontFamily: ff, fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 700, margin: "0 0 8px", color: "#2D2420" }}>{r.name}</h1>

            {/* Rating */}
            {r.rating && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <div style={{ display: "flex", gap: "2px" }}>
                  {[1, 2, 3, 4, 5].map(i => (
                    <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill={i <= Math.round(r.rating) ? SAFFRON : "#E0D8CF"} stroke="none">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span style={{ fontFamily: fb, fontSize: "16px", fontWeight: 700, color: "#2D2420" }}>{r.rating}</span>
                <span style={{ fontSize: "14px", color: "#8A7968" }}>({r.reviews?.toLocaleString()} reviews)</span>
              </div>
            )}

            {/* Contact info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px", color: "#5A4A3F" }}>
              {r.address && <div>📍 {r.address}</div>}
              {r.phone && <div>📞 <a href={`tel:${r.phone}`} style={{ color: COLORS.primary, textDecoration: "none" }}>{r.phone}</a></div>}
              {r.url && <div>🌐 <a href={r.url.startsWith("http") ? r.url : `https://${r.url}`} target="_blank" rel="noopener noreferrer" style={{ color: COLORS.primary, textDecoration: "none" }}>{r.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</a></div>}
            </div>
          </div>

          {/* Hours */}
          {r.hours && (
            <div style={{ background: "white", borderRadius: "16px", padding: "20px 24px", border: "1px solid #EDE6DE", marginBottom: "20px" }}>
              <h3 style={{ fontFamily: ff, fontSize: "18px", fontWeight: 700, margin: "0 0 12px" }}>Hours</h3>
              <div style={{ display: "grid", gap: "4px", fontSize: "13px", color: "#5A4A3F" }}>
                {r.hours.split(" | ").map((day, i) => {
                  const [dayName, ...times] = day.split(": ");
                  return (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: i < 6 ? "1px solid #F5EDE4" : "none" }}>
                      <span style={{ fontWeight: 600 }}>{dayName}</span>
                      <span style={{ color: "#8A7968" }}>{times.join(": ")}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* What to Order */}
          {wto && (
            <div style={{ background: "white", borderRadius: "16px", padding: "24px", border: "1px solid #EDE6DE", borderLeft: `4px solid ${SAFFRON}`, marginBottom: "20px" }}>
              <h3 style={{ fontFamily: ff, fontSize: "20px", fontWeight: 700, margin: "0 0 16px", display: "flex", alignItems: "center", gap: "8px" }}>
                🍛 What to Order
              </h3>

              {wto.known_for && (
                <div style={{ marginBottom: "14px" }}>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: SAFFRON, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Known For</div>
                  <div style={{ fontSize: "15px", fontWeight: 600, color: "#2D2420" }}>{wto.known_for}</div>
                </div>
              )}

              {wto.the_move && (
                <div style={{ marginBottom: "14px" }}>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: SAFFRON, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>The Move</div>
                  <div style={{ fontSize: "14px", color: "#5A4A3F", lineHeight: 1.6 }}>{wto.the_move}</div>
                </div>
              )}

              {wto.skip && (
                <div style={{ marginBottom: "14px" }}>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "#C62828", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Skip</div>
                  <div style={{ fontSize: "14px", color: "#5A4A3F", lineHeight: 1.6 }}>{wto.skip}</div>
                </div>
              )}

              {wto.vibe && (
                <div style={{ marginBottom: "14px" }}>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "#6A1B9A", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Vibe</div>
                  <div style={{ fontSize: "14px", color: "#5A4A3F", lineHeight: 1.6 }}>{wto.vibe}</div>
                </div>
              )}

              {wto.pro_tip && (
                <div style={{ padding: "12px 16px", background: "#FFFBF5", borderRadius: "10px", border: "1px dashed #E0D8CF" }}>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "#00796B", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>💡 Pro Tip</div>
                  <div style={{ fontSize: "14px", color: "#5A4A3F", lineHeight: 1.6 }}>{wto.pro_tip}</div>
                </div>
              )}
            </div>
          )}

          {/* Map */}
          {r.latitude && r.longitude && (
            <div style={{ marginBottom: "20px", borderRadius: "16px", overflow: "hidden", border: "1px solid #EDE6DE" }}>
              <iframe
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || process.env.GOOGLE_API_KEY}&q=${r.latitude},${r.longitude}&zoom=15`}
              />
            </div>
          )}

          {/* Reviews */}
          {reviews && reviews.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontFamily: ff, fontSize: "20px", fontWeight: 700, margin: "0 0 16px" }}>
                Reviews ({reviews.length})
              </h3>
              <div style={{ display: "grid", gap: "12px" }}>
                {reviews.map((rev, i) => (
                  <div key={rev.id || i} style={{
                    background: "white", borderRadius: "14px", padding: "18px 22px",
                    border: "1px solid #EDE6DE",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{
                          width: "32px", height: "32px", borderRadius: "50%",
                          background: `${SAFFRON}20`, display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: fb, fontWeight: 700, fontSize: "14px", color: SAFFRON,
                        }}>
                          {(rev.author_name || "?")[0].toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontFamily: fb, fontSize: "14px", fontWeight: 600, color: "#2D2420" }}>{rev.author_name}</div>
                          <div style={{ fontSize: "11px", color: "#A89888" }}>{rev.review_time}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "2px" }}>
                        {[1, 2, 3, 4, 5].map(s => (
                          <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s <= (rev.rating || 0) ? SAFFRON : "#E0D8CF"} stroke="none">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    {rev.review_text && (
                      <p style={{ fontSize: "13px", color: "#5A4A3F", lineHeight: 1.6, margin: 0 }}>
                        {rev.review_text.length > 400 ? rev.review_text.substring(0, 400) + "..." : rev.review_text}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notable dishes */}
          {r.notable_dishes && (
            <div style={{ background: "white", borderRadius: "16px", padding: "20px 24px", border: "1px solid #EDE6DE", marginBottom: "20px" }}>
              <h3 style={{ fontFamily: ff, fontSize: "18px", fontWeight: 700, margin: "0 0 8px" }}>Notable Dishes</h3>
              <p style={{ fontSize: "14px", color: "#5A4A3F", margin: 0 }}>{r.notable_dishes}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
