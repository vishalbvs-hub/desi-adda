"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { MapPin, Star, ArrowRight, Calendar } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

const ff = FONTS.heading;
const fb = FONTS.body;
const SAFFRON = "#E8A317";

const TABS = [
  { id: "spotlight", label: "Business Spotlight" },
  { id: "community", label: "Community Spotlight" },
  { id: "new", label: "New in Town" },
  { id: "recaps", label: "Event Recaps" },
];

const CAT_COLORS = { Restaurant: "#E65100", Grocery: "#2E7D32", Professional: "#1565C0", Temple: "#BF360C", Community: "#6A1B9A", Beauty: "#C2185B", Wellness: "#00796B", Kids: "#E64A19", Wedding: "#C2185B" };

const SPOTLIGHTS = [
  { slug: "eco-dosth", title: "The Plate That Disappears", subtitle: "How one Troy entrepreneur is replacing plastic with an ancient tradition", image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1224,h=756,fit=crop/AwvDoRQlrZsGy017/eco-dosth-new-flyer-india-and-us-YleWMQXL3Wc0Bgj9.jpg", date: "March 2026", business: "Eco Dosth", city: "Troy" },
];

export default function NewsPage() {
  return <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>}><NewsContent /></Suspense>;
}

function NewsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTab = searchParams.get("tab") || "spotlight";
  const [tab, setTab] = useState(initialTab);
  const [newListings, setNewListings] = useState([]);
  const [recaps, setRecaps] = useState([]);

  useEffect(() => {
    supabase.from("restaurants").select("id, name, city, rating, reviews, slug, cuisine_type, photos, created_at")
      .order("created_at", { ascending: false }).limit(20)
      .then(({ data }) => setNewListings(data || []));
    supabase.from("event_recaps").select("*, community_networking(name)")
      .order("event_date", { ascending: false })
      .then(({ data }) => setRecaps(data || []));
  }, []);

  const changeTab = (t) => { setTab(t); router.replace(`/news?tab=${t}`, { scroll: false }); };

  return (
    <div style={{ background: "#FFFBF5", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "32px 20px 0" }}>
        <h1 style={{ fontFamily: ff, fontSize: "clamp(28px, 5vw, 36px)", fontWeight: 700, margin: "0 0 4px", color: "#2D2420" }}>News</h1>
        <p style={{ fontSize: "14px", color: "#8A7968", margin: "0 0 20px" }}>Stories, spotlights, and updates from the community.</p>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "6px", overflowX: "auto", scrollbarWidth: "none", marginBottom: "28px" }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => changeTab(t.id)} style={{
              padding: "8px 18px", borderRadius: "999px", fontSize: "13px", fontFamily: fb, fontWeight: 600,
              cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s",
              border: tab === t.id ? `2px solid ${SAFFRON}` : "2px solid #EDE6DE",
              background: tab === t.id ? SAFFRON : "white",
              color: tab === t.id ? "#2D2420" : "#8A7968",
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 20px 60px" }}>
        {/* TAB 1: Business Spotlight */}
        {tab === "spotlight" && (
          <div>
            {SPOTLIGHTS.map(s => (
              <Link key={s.slug} href={`/spotlight/${s.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block", marginBottom: "20px" }}>
                <div style={{ background: "white", borderRadius: "20px", overflow: "hidden", border: "1px solid #EDE6DE", transition: "box-shadow 0.2s" }}>
                  <div style={{ width: "100%", height: "280px", overflow: "hidden" }}>
                    <img src={s.image} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "24px" }}>
                    <div style={{ fontSize: "12px", color: "#8A7968", marginBottom: "8px" }}>{s.date} · {s.business} — {s.city}</div>
                    <h2 style={{ fontFamily: ff, fontSize: "24px", fontWeight: 700, margin: "0 0 8px", color: "#2D2420", lineHeight: 1.3 }}>{s.title}</h2>
                    <p style={{ fontSize: "15px", color: "#5A4A3F", margin: "0 0 12px", lineHeight: 1.6 }}>{s.subtitle}</p>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: COLORS.primary }}>Read the full story →</span>
                  </div>
                </div>
              </Link>
            ))}
            <p style={{ fontSize: "13px", color: "#8A7968", textAlign: "center" }}>New spotlight every week · <Link href="/suggest" style={{ color: COLORS.primary, fontWeight: 600, textDecoration: "none" }}>Nominate a business →</Link></p>
          </div>
        )}

        {/* TAB 2: Community Spotlight */}
        {tab === "community" && (
          <div style={{ textAlign: "center", padding: "48px 20px" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>{"\u{1F31F}"}</div>
            <h2 style={{ fontFamily: ff, fontSize: "28px", fontWeight: 700, margin: "0 0 8px", color: "#2D2420" }}>Community Spotlight</h2>
            <p style={{ fontSize: "16px", color: "#5A4A3F", margin: "0 0 24px", maxWidth: "520px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
              Every community has unsung heroes. We want to tell their stories.
            </p>
            <p style={{ fontSize: "14px", color: "#8A7968", margin: "0 0 28px", maxWidth: "480px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
              Know a community leader, student achiever, or someone making a difference in Metro Detroit&apos;s desi community? Nominate them for our next Community Spotlight.
            </p>
            <a href="mailto:hello@desiadda.com?subject=Community Spotlight Nomination" style={{
              display: "inline-block", padding: "14px 32px", borderRadius: "12px",
              background: COLORS.primary, color: "white", fontFamily: fb, fontWeight: 600,
              fontSize: "15px", textDecoration: "none",
            }}>Nominate Someone →</a>
          </div>
        )}

        {/* TAB 3: New in Town */}
        {tab === "new" && (
          <div>
            {/* Featured: Honest Restaurant */}
            <Link href="/restaurants/honest-restaurant-troy" style={{ textDecoration: "none", color: "inherit", display: "block", marginBottom: "24px" }}>
              <div style={{ background: "white", borderRadius: "16px", border: `2px solid ${SAFFRON}30`, padding: "24px", transition: "box-shadow 0.2s" }}>
                <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: "999px", fontSize: "10px", fontWeight: 700, background: `${SAFFRON}15`, color: SAFFRON, marginBottom: "10px" }}>FEATURED NEW ARRIVAL</span>
                <h3 style={{ fontFamily: ff, fontSize: "22px", fontWeight: 700, margin: "0 0 6px", color: "#2D2420" }}>Honest Restaurant</h3>
                <div style={{ fontSize: "12px", color: "#8A7968", marginBottom: "8px", display: "flex", gap: "8px", alignItems: "center" }}>
                  <span style={{ padding: "2px 8px", borderRadius: "999px", fontSize: "10px", fontWeight: 600, background: "#FFF3E0", color: "#E65100" }}>Restaurant</span>
                  <span><MapPin size={11} style={{ display: "inline", verticalAlign: "middle" }} /> Troy, MI</span>
                  <span><Star size={11} fill={SAFFRON} color={SAFFRON} style={{ display: "inline", verticalAlign: "middle" }} /> 4.4</span>
                </div>
                <p style={{ fontSize: "14px", color: "#5A4A3F", margin: 0, lineHeight: 1.6 }}>
                  Mumbai street food lands in Troy. Honest Restaurant brings pure vegetarian favorites — bhaji pav, chaat, dosa, Indo-Chinese, and Punjabi classics — to Rochester Road. If you&apos;ve been craving pav bhaji that actually tastes like Juhu Beach or a plate of sev puri done right, this is your spot.
                </p>
              </div>
            </Link>

            {/* Recent listings */}
            <h3 style={{ fontFamily: ff, fontSize: "18px", fontWeight: 700, margin: "0 0 14px", color: "#2D2420" }}>Recently Added</h3>
            <div style={{ display: "grid", gap: "10px" }}>
              {newListings.map(biz => (
                <Link key={biz.id} href={biz.slug ? `/restaurants/${biz.slug}` : "/businesses?cat=food"} style={{ textDecoration: "none", color: "inherit" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 18px", background: "white", borderRadius: "12px", border: "1px solid #EDE6DE", transition: "box-shadow 0.2s" }}>
                    {biz.photos?.[0] && <img src={biz.photos[0]} alt={biz.name} style={{ width: "50px", height: "50px", borderRadius: "8px", objectFit: "cover", flexShrink: 0 }} />}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: fb, fontSize: "14px", fontWeight: 600, color: "#2D2420", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{biz.name}</div>
                      <div style={{ fontSize: "11px", color: "#8A7968", display: "flex", gap: "6px", alignItems: "center" }}>
                        <span style={{ padding: "1px 6px", borderRadius: "999px", fontSize: "9px", fontWeight: 600, background: "#FFF3E0", color: "#E65100" }}>Restaurant</span>
                        {biz.city && <span>{biz.city}</span>}
                        {biz.rating && <span><Star size={9} fill={SAFFRON} color={SAFFRON} style={{ display: "inline", verticalAlign: "middle" }} /> {biz.rating}</span>}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Event Recaps */}
        {tab === "recaps" && (
          <div>
            {recaps.length > 0 ? (
              <div style={{ display: "grid", gap: "16px" }}>
                {recaps.map(r => (
                  <Link key={r.id} href={`/news/recaps/${r.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <div style={{ background: "white", borderRadius: "16px", padding: "24px", border: "1px solid #EDE6DE", transition: "box-shadow 0.2s" }}>
                      <div style={{ fontSize: "12px", color: "#8A7968", marginBottom: "8px", display: "flex", gap: "8px", alignItems: "center" }}>
                        <Calendar size={12} />
                        <span>{r.event_date ? new Date(r.event_date + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}</span>
                        {r.community_networking?.name && <><span>·</span><span>{r.community_networking.name}</span></>}
                      </div>
                      <h3 style={{ fontFamily: ff, fontSize: "20px", fontWeight: 700, margin: "0 0 8px", color: "#2D2420", lineHeight: 1.3 }}>{r.title}</h3>
                      {r.location && <div style={{ fontSize: "12px", color: "#8A7968", marginBottom: "8px" }}><MapPin size={11} style={{ display: "inline", verticalAlign: "middle" }} /> {r.location}</div>}
                      <p style={{ fontSize: "14px", color: "#5A4A3F", margin: "0 0 8px", lineHeight: 1.6 }}>{r.body_text?.substring(0, 200)}...</p>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: COLORS.primary }}>Read recap →</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "48px 20px", color: "#8A7968" }}>
                <p style={{ fontSize: "16px" }}>No event recaps yet — coming soon!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
