import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { FONTS, COLORS } from "@/lib/constants";
import { professionalSlug } from "@/lib/slugify";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const ff = FONTS.heading;
const fb = FONTS.body;
const SAFFRON = "#E8A317";

async function findBySlug(slug) {
  const { data } = await supabase.from("professionals").select("*");
  if (!data) return null;
  return data.find((p) => professionalSlug(p.name, p.city) === slug) || null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = await findBySlug(slug);
  if (!p) return { title: "Professional Not Found — Desi Adda" };
  const desc = [
    p.specialty && `${p.specialty} specialist`,
    p.practice_name && `at ${p.practice_name}`,
    p.city && `in ${p.city}, MI`,
    p.google_rating && `Rated ${p.google_rating}/5`,
  ]
    .filter(Boolean)
    .join(". ");
  return {
    title: `${p.name}${p.title ? `, ${p.title}` : ""} — ${p.city || "Metro Detroit"} | Desi Adda`,
    description: `${p.name}${p.title ? `, ${p.title}` : ""}. ${desc}.`.trim(),
    openGraph: {
      title: `${p.name} — ${p.city || "Metro Detroit"}`,
      description: desc || `Desi professional in Metro Detroit.`,
    },
  };
}

export default async function ProfessionalPage({ params }) {
  const { slug } = await params;
  const p = await findBySlug(slug);

  if (!p) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        <h1 style={{ fontFamily: ff, fontSize: "24px" }}>
          Professional not found
        </h1>
        <Link
          href="/professionals"
          style={{ color: COLORS.primary, fontWeight: 600 }}
        >
          Browse all professionals
        </Link>
      </div>
    );
  }

  const photos = p.photos?.filter(Boolean) || [];
  if (p.photo_url && !photos.includes(p.photo_url)) photos.unshift(p.photo_url);

  const langs =
    Array.isArray(p.languages) && p.languages.length > 0
      ? p.languages
      : typeof p.languages === "string" && p.languages
        ? [p.languages]
        : [];

  const schemaType =
    p.specialty &&
    /doctor|md|physician|cardiol|pediatr|dermat|dentist|optom|chiropract|psychiatr/i.test(
      (p.specialty || "") + " " + (p.title || "")
    )
      ? "MedicalBusiness"
      : "ProfessionalService";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: p.practice_name || p.name,
    description: p.bio || `${p.specialty || "Professional"} in ${p.city || "Metro Detroit"}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: p.city,
      addressRegion: "MI",
      addressCountry: "US",
    },
    ...(p.phone && { telephone: p.phone }),
    ...(p.website && {
      url: p.website.startsWith("http") ? p.website : `https://${p.website}`,
    }),
    ...(p.google_rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: p.google_rating,
        reviewCount: p.google_reviews || 1,
      },
    }),
    ...(p.latitude && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: p.latitude,
        longitude: p.longitude,
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ background: "#FFFBF5", minHeight: "100vh" }}>
        {/* Back nav */}
        <div
          style={{
            background: "white",
            borderBottom: "1px solid #EDE6DE",
            padding: "12px 20px",
          }}
        >
          <Link
            href="/professionals"
            style={{
              color: COLORS.primary,
              fontFamily: fb,
              fontWeight: 600,
              fontSize: "14px",
              textDecoration: "none",
            }}
          >
            ← Back to Professionals
          </Link>
        </div>

        {/* Photo Gallery */}
        {photos.length > 0 && (
          <>
            <div
              style={{
                display: "flex",
                gap: "4px",
                overflowX: "auto",
                background: "#2D2420",
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
              }}
            >
              {photos.map((url, i) => (
                <div
                  key={i}
                  style={{
                    flexShrink: 0,
                    width:
                      photos.length === 1
                        ? "100%"
                        : photos.length === 2
                          ? "50%"
                          : "clamp(280px, 40vw, 400px)",
                    height: "320px",
                    scrollSnapAlign: "start",
                  }}
                >
                  <img
                    src={url}
                    alt={`${p.name} photo ${i + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </div>
            {photos.length > 1 && (
              <div
                style={{
                  background: "#2D2420",
                  padding: "6px 0",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.4)",
                    fontFamily: fb,
                  }}
                >
                  {photos.length} photos — scroll to see more →
                </span>
              </div>
            )}
          </>
        )}

        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "28px 20px" }}>
          {/* Header */}
          <div style={{ marginBottom: "24px" }}>
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginBottom: "8px",
                flexWrap: "wrap",
              }}
            >
              {p.specialty && (
                <span
                  style={{
                    padding: "3px 10px",
                    borderRadius: "999px",
                    fontSize: "11px",
                    fontWeight: 600,
                    background: `${SAFFRON}15`,
                    color: SAFFRON,
                  }}
                >
                  {p.specialty}
                </span>
              )}
              {p.subcategories?.map((sc) => (
                <span
                  key={sc}
                  style={{
                    padding: "3px 10px",
                    borderRadius: "999px",
                    fontSize: "11px",
                    fontWeight: 600,
                    background: "#ECEFF1",
                    color: "#37474F",
                  }}
                >
                  {sc}
                </span>
              ))}
            </div>
            <h1
              style={{
                fontFamily: ff,
                fontSize: "clamp(28px, 5vw, 40px)",
                fontWeight: 700,
                margin: "0 0 4px",
                color: "#2D2420",
              }}
            >
              {p.name}
              {p.title && (
                <span
                  style={{
                    fontSize: "clamp(18px, 3vw, 24px)",
                    fontWeight: 400,
                    color: COLORS.textSecondary,
                  }}
                >
                  , {p.title}
                </span>
              )}
            </h1>
            {p.practice_name && (
              <p
                style={{
                  fontFamily: fb,
                  fontSize: "16px",
                  fontWeight: 500,
                  color: COLORS.textSecondary,
                  margin: "0 0 8px",
                }}
              >
                {p.practice_name}
              </p>
            )}

            {/* Rating */}
            {p.google_rating && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "10px",
                  flexWrap: "wrap",
                  fontSize: "14px",
                }}
              >
                <div style={{ display: "flex", gap: "1px" }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill={
                        i <= Math.round(p.google_rating) ? SAFFRON : "#E0D8CF"
                      }
                      stroke="none"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span style={{ fontWeight: 700, color: "#2D2420" }}>
                  {p.google_rating} on Google
                </span>
                {p.google_reviews > 0 && (
                  <span style={{ color: COLORS.textMuted }}>
                    ({p.google_reviews.toLocaleString()} reviews)
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Two-column layout */}
          <style>{`@media (min-width: 768px) { .pro-detail-grid { grid-template-columns: 1fr 320px !important; } }`}</style>
          <div
            className="pro-detail-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "20px",
            }}
          >
            {/* LEFT COLUMN — main content */}
            <div>
              {/* Bio */}
              {p.bio && (
                <div
                  style={{
                    background: "white",
                    borderRadius: "16px",
                    padding: "24px",
                    border: "1px solid #EDE6DE",
                    marginBottom: "20px",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: ff,
                      fontSize: "20px",
                      fontWeight: 700,
                      margin: "0 0 12px",
                    }}
                  >
                    About
                  </h3>
                  <p
                    style={{
                      fontSize: "15px",
                      color: COLORS.textSecondary,
                      margin: 0,
                      lineHeight: 1.7,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {p.bio}
                  </p>
                </div>
              )}

              {/* Languages */}
              {langs.length > 0 && (
                <div
                  style={{
                    background: "white",
                    borderRadius: "16px",
                    padding: "20px 24px",
                    border: "1px solid #EDE6DE",
                    marginBottom: "20px",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: ff,
                      fontSize: "18px",
                      fontWeight: 700,
                      margin: "0 0 10px",
                    }}
                  >
                    Languages Spoken
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      flexWrap: "wrap",
                    }}
                  >
                    {langs.map((lang) => (
                      <span
                        key={lang}
                        style={{
                          padding: "5px 14px",
                          borderRadius: "999px",
                          fontSize: "13px",
                          fontWeight: 500,
                          background: "#F5EDE4",
                          color: COLORS.textSecondary,
                        }}
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Badges */}
              {p.badges?.length > 0 && (
                <div
                  style={{
                    background: "white",
                    borderRadius: "16px",
                    padding: "20px 24px",
                    border: "1px solid #EDE6DE",
                    marginBottom: "20px",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: ff,
                      fontSize: "18px",
                      fontWeight: 700,
                      margin: "0 0 10px",
                    }}
                  >
                    Highlights
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      flexWrap: "wrap",
                    }}
                  >
                    {p.badges.map((badge) => (
                      <span
                        key={badge}
                        style={{
                          padding: "5px 14px",
                          borderRadius: "999px",
                          fontSize: "13px",
                          fontWeight: 600,
                          background: "#E3F2FD",
                          color: "#1565C0",
                        }}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN — contact & map */}
            <div>
              {/* Contact Card */}
              <div
                style={{
                  background: "white",
                  borderRadius: "16px",
                  padding: "20px",
                  border: "1px solid #EDE6DE",
                  marginBottom: "16px",
                }}
              >
                <h3
                  style={{
                    fontFamily: ff,
                    fontSize: "16px",
                    fontWeight: 700,
                    margin: "0 0 14px",
                  }}
                >
                  Contact Information
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    fontSize: "14px",
                    color: COLORS.textSecondary,
                  }}
                >
                  {p.city && <div>📍 {p.city}, MI</div>}
                  {p.phone && (
                    <div>
                      📞{" "}
                      <a
                        href={`tel:${p.phone}`}
                        style={{
                          color: COLORS.primary,
                          textDecoration: "none",
                        }}
                      >
                        {p.phone}
                      </a>
                    </div>
                  )}
                  {p.email && (
                    <div>
                      ✉️{" "}
                      <a
                        href={`mailto:${p.email}`}
                        style={{
                          color: COLORS.primary,
                          textDecoration: "none",
                        }}
                      >
                        {p.email}
                      </a>
                    </div>
                  )}
                  {p.website && (
                    <div>
                      🌐{" "}
                      <a
                        href={
                          p.website.startsWith("http")
                            ? p.website
                            : `https://${p.website}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: COLORS.primary,
                          textDecoration: "none",
                        }}
                      >
                        {p.website
                          .replace(/^https?:\/\/(www\.)?/, "")
                          .replace(/\/$/, "")}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Map */}
              {p.latitude && p.longitude && (
                <div
                  style={{
                    marginBottom: "16px",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid #EDE6DE",
                  }}
                >
                  <iframe
                    width="100%"
                    height="220"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${p.latitude},${p.longitude}&z=15&output=embed`}
                  />
                </div>
              )}

              {/* Claim CTA */}
              <div
                style={{
                  background: "white",
                  borderRadius: "16px",
                  padding: "20px",
                  border: "1px solid #EDE6DE",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>✍️</div>
                <h4
                  style={{
                    fontFamily: ff,
                    fontSize: "16px",
                    fontWeight: 700,
                    margin: "0 0 6px",
                    color: "#2D2420",
                  }}
                >
                  Is this your practice?
                </h4>
                <p
                  style={{
                    fontSize: "13px",
                    color: COLORS.textMuted,
                    margin: "0 0 12px",
                    lineHeight: 1.4,
                  }}
                >
                  Claim your profile to update info, add photos, and connect
                  with the community.
                </p>
                <a
                  href={`/claim/${p.id}`}
                  style={{
                    display: "inline-block",
                    padding: "10px 24px",
                    borderRadius: "12px",
                    background: "#37474F",
                    color: "white",
                    fontFamily: fb,
                    fontWeight: 600,
                    fontSize: "13px",
                    textDecoration: "none",
                  }}
                >
                  Claim Your Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
