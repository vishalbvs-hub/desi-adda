import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { FONTS, COLORS } from "@/lib/constants";
import CommunityClient from "./CommunityClient";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const ff = FONTS.heading;
const fb = FONTS.body;
const SAFFRON = "#E8A317";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await supabase.from("community_networking").select("name, city, org_type, language, description").eq("slug", slug).single();
  if (!data) return { title: "Organization Not Found — Desi Adda" };
  return {
    title: `${data.name} — ${data.city || "Metro Detroit"} | Desi Adda`,
    description: `${data.name} in ${data.city || "Metro Detroit"}. ${data.org_type || "Community organization"}. ${data.language ? `${data.language}-speaking community.` : ""} ${data.description || ""}`.trim().substring(0, 160),
    openGraph: { title: `${data.name} — ${data.city || "Metro Detroit"}`, description: `${data.org_type || "Community organization"} in ${data.city || "Metro Detroit"}.` },
  };
}

export default async function CommunityOrgPage({ params }) {
  const { slug } = await params;
  const { data: org } = await supabase.from("community_networking").select("*").eq("slug", slug).single();

  if (!org) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px" }}>
        <h1 style={{ fontFamily: ff, fontSize: "24px" }}>Organization not found</h1>
        <Link href="/community" style={{ color: COLORS.primary, fontWeight: 600 }}>Browse community organizations</Link>
      </div>
    );
  }

  // Fetch events for this org
  const { data: communityEvents } = await supabase
    .from("community_events")
    .select("*")
    .eq("org_id", org.id)
    .gte("event_date", new Date().toISOString().split("T")[0])
    .order("event_date");

  const o = org;
  const socialLinks = [
    { url: o.facebook_url, label: "Facebook", color: "#1877F2", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
    { url: o.instagram_url, label: "Instagram", color: "#E4405F", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
    { url: o.youtube_url, label: "YouTube", color: "#FF0000", icon: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
    { url: o.twitter_url, label: "Twitter", color: "#1DA1F2", icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" },
    { url: o.whatsapp_url, label: "WhatsApp", color: "#25D366", icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" },
  ].filter(s => s.url);

  const ctaUrl = o.website || o.facebook_url || o.url;

  const jsonLd = {
    "@context": "https://schema.org", "@type": "Organization",
    name: o.name,
    description: o.description,
    ...(o.url && { url: o.url }),
    ...(o.website && { url: o.website }),
    ...(o.email && { email: o.email }),
    ...(o.phone && { telephone: o.phone }),
    ...(o.city && { address: { "@type": "PostalAddress", addressLocality: o.city, addressRegion: "MI", addressCountry: "US" } }),
    ...(o.latitude && { geo: { "@type": "GeoCoordinates", latitude: o.latitude, longitude: o.longitude } }),
    ...(o.logo_url && { logo: o.logo_url }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ background: "#FFFBF5", minHeight: "100vh" }}>
        {/* Back nav */}
        <div style={{ background: "white", borderBottom: "1px solid #EDE6DE", padding: "12px 20px" }}>
          <Link href="/community" style={{ color: COLORS.primary, fontFamily: fb, fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
            ← Back to Community
          </Link>
        </div>

        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "28px 20px" }}>
          {/* Header */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
              {o.logo_url && (
                <img
                  src={o.logo_url}
                  alt={`${o.name} logo`}
                  style={{ width: "72px", height: "72px", borderRadius: "14px", objectFit: "cover", border: "1px solid #EDE6DE" }}
                />
              )}
              <div>
                <h1 style={{ fontFamily: ff, fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 700, margin: "0 0 8px", color: "#2D2420" }}>
                  {o.name}
                </h1>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {o.org_type && (
                    <span style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 600, background: "#E8F5E9", color: "#2E7D32" }}>
                      {o.org_type}
                    </span>
                  )}
                  {o.language && (
                    <span style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 600, background: "#FFF3E0", color: SAFFRON }}>
                      {o.language}
                    </span>
                  )}
                  {o.ethnicity && (
                    <span style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 600, background: "#FCE4EC", color: "#C2185B" }}>
                      {o.ethnicity}
                    </span>
                  )}
                </div>
              </div>
            </div>
            {o.city && (
              <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "14px", color: "#5A4A3F", marginBottom: "4px" }}>
                📍 {o.city}{o.address ? ` — ${o.address}` : ""}
              </div>
            )}
          </div>

          {/* Two-column layout */}
          <style>{`@media (min-width: 768px) { .community-org-grid { grid-template-columns: 1fr 340px !important; } }`}</style>
          <div className="community-org-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
            {/* LEFT COLUMN */}
            <div>
              {/* Description */}
              {o.description && (
                <div style={{ background: "white", borderRadius: "16px", padding: "24px", border: "1px solid #EDE6DE", marginBottom: "20px" }}>
                  <h3 style={{ fontFamily: ff, fontSize: "20px", fontWeight: 700, margin: "0 0 12px", color: "#2D2420" }}>About</h3>
                  <p style={{ fontSize: "15px", color: "#5A4A3F", margin: 0, lineHeight: 1.7, whiteSpace: "pre-line" }}>{o.description}</p>
                </div>
              )}

              {/* Events + Email signup — client component */}
              <CommunityClient
                org={{ id: o.id, name: o.name, address: o.address || o.city || "", website: o.website || o.url || null }}
                events={communityEvents || []}
              />

              {/* CTA */}
              {ctaUrl && (
                <a
                  href={ctaUrl.startsWith("http") ? ctaUrl : `https://${ctaUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "14px 32px", borderRadius: "12px", background: COLORS.primary,
                    color: "white", fontFamily: ff, fontWeight: 700, fontSize: "16px",
                    textDecoration: "none", marginBottom: "20px",
                    transition: "opacity 0.2s",
                  }}
                >
                  🤝 Join this community
                </a>
              )}
            </div>

            {/* RIGHT COLUMN */}
            <div>
              {/* Contact Info */}
              <div style={{ background: "white", borderRadius: "16px", padding: "20px", border: "1px solid #EDE6DE", marginBottom: "16px" }}>
                <h3 style={{ fontFamily: ff, fontSize: "16px", fontWeight: 700, margin: "0 0 12px" }}>Contact</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px", color: "#5A4A3F" }}>
                  {o.email && (
                    <div>📧 <a href={`mailto:${o.email}`} style={{ color: COLORS.primary, textDecoration: "none" }}>{o.email}</a></div>
                  )}
                  {o.phone && (
                    <div>📞 <a href={`tel:${o.phone}`} style={{ color: COLORS.primary, textDecoration: "none" }}>{o.phone}</a></div>
                  )}
                  {o.website && (
                    <div>🌐 <a href={o.website.startsWith("http") ? o.website : `https://${o.website}`} target="_blank" rel="noopener noreferrer" style={{ color: COLORS.primary, textDecoration: "none" }}>
                      {o.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                    </a></div>
                  )}
                </div>
              </div>

              {/* Social Media */}
              {socialLinks.length > 0 && (
                <div style={{ background: "white", borderRadius: "16px", padding: "20px", border: "1px solid #EDE6DE", marginBottom: "16px" }}>
                  <h3 style={{ fontFamily: ff, fontSize: "16px", fontWeight: 700, margin: "0 0 12px" }}>Social Media</h3>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    {socialLinks.map(s => (
                      <a
                        key={s.label}
                        href={s.url.startsWith("http") ? s.url : `https://${s.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={s.label}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "center",
                          width: "44px", height: "44px", borderRadius: "12px",
                          background: `${s.color}12`, transition: "background 0.2s",
                        }}
                      >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill={s.color}>
                          <path d={s.icon} />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Map */}
              {o.latitude && o.longitude && (
                <div style={{ marginBottom: "16px", borderRadius: "16px", overflow: "hidden", border: "1px solid #EDE6DE" }}>
                  <iframe
                    width="100%"
                    height="220"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${o.latitude},${o.longitude}&z=15&output=embed`}
                  />
                </div>
              )}

              {/* Hours */}
              {o.hours && (
                <div style={{ background: "white", borderRadius: "16px", padding: "18px 20px", border: "1px solid #EDE6DE", marginBottom: "16px" }}>
                  <h3 style={{ fontFamily: ff, fontSize: "16px", fontWeight: 700, margin: "0 0 10px" }}>Hours</h3>
                  <div style={{ display: "grid", gap: "2px", fontSize: "12px", color: "#5A4A3F" }}>
                    {o.hours.split(" | ").map((day, i) => {
                      const [dayName, ...times] = day.split(": ");
                      return (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", borderBottom: i < 6 ? "1px solid #F5EDE4" : "none" }}>
                          <span style={{ fontWeight: 600, fontSize: "11px" }}>{dayName}</span>
                          <span style={{ color: "#8A7968", fontSize: "11px" }}>{times.join(": ")}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
