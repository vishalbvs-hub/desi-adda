import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { FONTS, COLORS } from "@/lib/constants";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const ff = FONTS.heading;
const fb = FONTS.body;
const SAFFRON = "#E8A317";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await supabase.from("event_recaps").select("title, location").eq("slug", slug).single();
  if (!data) return { title: "Recap Not Found — Desi Adda" };
  return { title: `${data.title} | Desi Adda`, description: data.title, openGraph: { title: data.title } };
}

export default async function RecapPage({ params }) {
  const { slug } = await params;
  const { data: recap } = await supabase.from("event_recaps").select("*, community_networking(id, name, slug)").eq("slug", slug).single();

  if (!recap) {
    return <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px" }}><h1 style={{ fontFamily: ff, fontSize: "24px" }}>Recap not found</h1><Link href="/news?tab=recaps" style={{ color: COLORS.primary, fontWeight: 600 }}>Back to recaps</Link></div>;
  }

  const photos = typeof recap.photos === "string" ? JSON.parse(recap.photos) : (recap.photos || []);
  const orgName = recap.community_networking?.name;
  const orgSlug = recap.community_networking?.slug;

  const jsonLd = { "@context": "https://schema.org", "@type": "Event", name: recap.title, startDate: recap.event_date, location: { "@type": "Place", name: recap.location }, description: recap.body_text?.substring(0, 200) };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ background: "#FFFBF5", minHeight: "100vh" }}>
        <div style={{ background: "white", borderBottom: "1px solid #EDE6DE", padding: "12px 20px" }}>
          <Link href="/news?tab=recaps" style={{ color: COLORS.primary, fontFamily: fb, fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>← Back to Recaps</Link>
        </div>

        <article style={{ maxWidth: "720px", margin: "0 auto", padding: "40px 20px 60px" }}>
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "13px", color: "#8A7968", marginBottom: "12px" }}>
              {recap.event_date && <span>{new Date(recap.event_date + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</span>}
              {orgName && <><span>·</span><span>Hosted by {orgSlug ? <Link href={`/community/${orgSlug}`} style={{ color: COLORS.primary, textDecoration: "none", fontWeight: 600 }}>{orgName}</Link> : orgName}</span></>}
            </div>
            <h1 style={{ fontFamily: ff, fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 700, margin: "0 0 8px", color: "#2D2420", lineHeight: 1.2 }}>{recap.title}</h1>
            {recap.location && <div style={{ fontSize: "14px", color: "#8A7968", display: "flex", alignItems: "center", gap: "4px" }}>📍 {recap.location}</div>}
          </div>

          <div style={{ borderTop: "1px solid #EDE6DE", paddingTop: "24px" }}>
            <div style={{ fontFamily: fb, fontSize: "16px", color: "#2D2420", lineHeight: 1.7, whiteSpace: "pre-line" }}>{recap.body_text}</div>
          </div>

          {photos.length > 0 && (
            <div style={{ marginTop: "36px" }}>
              <h3 style={{ fontFamily: ff, fontSize: "20px", fontWeight: 700, margin: "0 0 16px" }}>Photos</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "8px" }}>
                {photos.map((url, i) => <img key={i} src={url} alt={`Photo ${i + 1}`} style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "10px" }} />)}
              </div>
            </div>
          )}

          <div style={{ marginTop: "40px", textAlign: "center", padding: "28px", background: "white", borderRadius: "16px", border: "1px dashed #E0D8CF" }}>
            <p style={{ fontFamily: ff, fontSize: "18px", fontWeight: 600, margin: "0 0 8px", color: "#2D2420" }}>Were you there?</p>
            <p style={{ fontSize: "14px", color: "#8A7968", margin: "0 0 16px" }}>Share your photos and we&apos;ll add them to this recap.</p>
            <a href="mailto:hello@desiadda.com?subject=Event Photos" style={{ display: "inline-block", padding: "10px 24px", borderRadius: "10px", background: COLORS.primary, color: "white", fontFamily: fb, fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>Share Photos</a>
          </div>
        </article>
      </div>
    </>
  );
}
