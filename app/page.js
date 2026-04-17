"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Coffee, ShoppingCart, Landmark, Briefcase, Home as HomeIcon,
  Calendar, Music, Film,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import EventCard from "@/components/cards/EventCard";
import RestaurantCard from "@/components/cards/RestaurantCard";
import OrgCard from "@/components/cards/OrgCard";

const CATEGORIES = [
  { label: "Restaurants", href: "/businesses?tab=restaurants", bg: "var(--pill-blush-bg)", stroke: "var(--pill-blush-text)", Icon: Coffee },
  { label: "Groceries", href: "/businesses?tab=groceries", bg: "var(--pill-mint-bg)", stroke: "var(--pill-mint-text)", Icon: ShoppingCart },
  { label: "Temples", href: "/temples", bg: "var(--pill-butter-bg)", stroke: "var(--pill-butter-text)", Icon: Landmark },
  { label: "Professionals", href: "/professionals", bg: "var(--pill-lilac-bg)", stroke: "var(--pill-lilac-text)", Icon: Briefcase },
  { label: "Weddings", href: "/event-planning", bg: "var(--pill-blush-bg)", stroke: "var(--pill-blush-text)", Icon: HomeIcon },
  { label: "Events", href: "/community?tab=events", bg: "var(--pill-mint-bg)", stroke: "var(--pill-mint-text)", Icon: Calendar },
  { label: "Music", href: "/entertainment?tab=listen", bg: "var(--pill-butter-bg)", stroke: "var(--pill-butter-text)", Icon: Music },
  { label: "Movies", href: "/entertainment?tab=watch", bg: "var(--pill-lilac-bg)", stroke: "var(--pill-lilac-text)", Icon: Film },
];

const PILL_BGS = [
  "var(--pill-blush-bg)",
  "var(--pill-mint-bg)",
  "var(--pill-butter-bg)",
  "var(--pill-lilac-bg)",
];

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [recaps, setRecaps] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    Promise.all([
      supabase.from("temple_events")
        .select("id, event_name, event_date, temples(name, slug)")
        .gte("event_date", today).order("event_date").limit(4),
      supabase.from("community_events")
        .select("id, event_name, event_date, community_networking(name, slug)")
        .gte("event_date", today).order("event_date").limit(4),
      supabase.from("restaurants")
        .select("id, name, city, rating, reviews, slug, cuisine_type, photos")
        .ilike("city", "%Troy%").not("photos", "eq", "{}")
        .gte("rating", 4.0).gte("reviews", 10)
        .order("reviews", { ascending: false }).limit(8),
      supabase.from("community_networking")
        .select("id, name, city, slug").limit(8),
      supabase.from("event_recaps")
        .select("slug, title, summary, cover_image, event_date")
        .order("event_date", { ascending: false }).limit(3),
    ]).then(([te, ce, rest, orgRes, rec]) => {
      const unified = [
        ...(te.data || []).map(e => ({ id: e.id, name: e.event_name, date: e.event_date, org_name: e.temples?.name, org_slug: e.temples?.slug, _type: "temple" })),
        ...(ce.data || []).map(e => ({ id: e.id, name: e.event_name, date: e.event_date, org_name: e.community_networking?.name, org_slug: e.community_networking?.slug, _type: "community" })),
      ].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 6);
      setEvents(unified);
      setRestaurants(rest.data || []);
      setOrgs(orgRes.data || []);
      setRecaps(rec.data || []);
    });
  }, []);

  return (
    <div style={{ background: "var(--bg-page)" }}>
      {/* ═══ HERO ═══ */}
      <section
        style={{
          position: "relative", overflow: "hidden",
          height: "360px", display: "flex", alignItems: "center",
          padding: "0 40px",
          background: "var(--bg-header)",
        }}
      >
        <img
          src="/photos/hero-diwali.jpg"
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          onError={e => { e.currentTarget.style.display = "none"; }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)" }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: "72%" }}>
          <span
            style={{
              display: "inline-block",
              background: "var(--pill-blush-bg)", color: "var(--pill-blush-text)",
              padding: "4px 12px", fontSize: "11px", fontWeight: 500,
              borderRadius: "var(--radius-sm)", marginBottom: "14px",
            }}
          >
            Get into it
          </span>
          <h1
            style={{
              fontSize: "42px", fontWeight: 500, lineHeight: 1.05,
              letterSpacing: "-0.025em", color: "var(--text-inverse)",
              margin: 0,
            }}
          >
            <span
              style={{
                background: "var(--brand-primary)",
                color: "var(--text-primary)",
                padding: "2px 10px",
                borderRadius: "var(--radius-sm)",
                display: "inline-block",
              }}
            >
              Michigan&apos;s desi
            </span>
            <br />
            <span
              style={{
                marginTop: "6px",
                background: "var(--pill-mint-bg)",
                color: "var(--pill-mint-text)",
                padding: "2px 10px",
                borderRadius: "var(--radius-sm)",
                display: "inline-block",
              }}
            >
              weekend, planned.
            </span>
          </h1>
          <Link
            href="/community?tab=events"
            style={{
              marginTop: "20px",
              display: "inline-block",
              background: "var(--bg-surface)",
              color: "var(--text-primary)",
              padding: "10px 20px",
              borderRadius: "var(--radius-pill)",
              fontSize: "14px", fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Show me what&apos;s on
          </Link>
        </div>
      </section>

      {/* ═══ CATEGORY CHIPS ═══ */}
      <section
        style={{
          padding: "24px 20px 8px",
          maxWidth: "1200px", margin: "0 auto",
          overflowX: "auto",
        }}
      >
        <div
          style={{
            display: "flex", gap: "18px", justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {CATEGORIES.map(({ label, href, bg, stroke, Icon }) => (
            <Link
              key={label}
              href={href}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: "8px", textDecoration: "none",
                minWidth: "64px",
              }}
            >
              <div
                style={{
                  width: "54px", height: "54px", borderRadius: "50%",
                  background: bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <Icon size={22} color={stroke} strokeWidth={1.6} />
              </div>
              <span
                style={{
                  fontSize: "12px", fontWeight: 500,
                  color: "var(--text-primary)",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {events.length > 0 && (
          <SectionRow title="This weekend" href="/community?tab=events">
            {events.slice(0, 3).map((ev, i) => (
              <EventCard
                key={`${ev._type}-${ev.id}`}
                id={ev.id}
                name={ev.name}
                date={ev.date}
                org_name={ev.org_name}
                href={ev.org_slug ? (ev._type === "temple" ? `/temples/${ev.org_slug}` : `/community/${ev.org_slug}`) : "/community?tab=events"}
                accent_bg={PILL_BGS[i % PILL_BGS.length]}
              />
            ))}
          </SectionRow>
        )}

        {restaurants.length > 0 && (
          <SectionRow title="Trending restaurants in Troy" href="/businesses?tab=restaurants&city=Troy">
            {restaurants.slice(0, 3).map(r => (
              <RestaurantCard
                key={r.id}
                id={r.id}
                name={r.name}
                cuisine={r.cuisine_type}
                city={r.city}
                rating={r.rating}
                image_url={r.photos?.[0]}
                href={r.slug ? `/restaurants/${r.slug}` : "/businesses"}
              />
            ))}
          </SectionRow>
        )}

        {orgs.length > 0 && (
          <SectionRow title="Organizations to save" href="/community?tab=orgs">
            {orgs.slice(0, 3).map(org => (
              <OrgCard
                key={org.id}
                id={org.id}
                name={org.name}
                city={org.city}
                href={`/community/${org.slug}`}
              />
            ))}
          </SectionRow>
        )}

        <NewsletterBanner />

        {recaps.length > 0 && (
          <SectionRow title="Recent news" href="/news?tab=recaps">
            {recaps.slice(0, 3).map(r => (
              <EventCard
                key={r.slug}
                name={r.title}
                date={r.event_date}
                org_name={r.summary ? r.summary.slice(0, 60) : null}
                image_url={r.cover_image}
                href={`/news/recaps/${r.slug}`}
                accent_bg="var(--pill-lilac-bg)"
              />
            ))}
          </SectionRow>
        )}
      </div>
    </div>
  );
}

function SectionRow({ title, href, children }) {
  return (
    <section style={{ padding: "28px 20px 8px" }}>
      <div
        style={{
          display: "flex", alignItems: "baseline", justifyContent: "space-between",
          marginBottom: "14px",
        }}
      >
        <h2
          style={{
            fontSize: "22px", fontWeight: 500, letterSpacing: "-0.01em",
            color: "var(--text-primary)", margin: 0,
          }}
        >
          {title}
        </h2>
        <Link
          href={href}
          style={{
            fontSize: "14px", fontWeight: 500,
            color: "var(--brand-secondary)", textDecoration: "none",
          }}
        >
          Explore more →
        </Link>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "14px",
        }}
      >
        {children}
      </div>
    </section>
  );
}

function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = async () => {
    if (!email.includes("@")) return;
    try {
      await supabase.from("subscribers").insert({ email: email.trim().toLowerCase(), opted_metros: ["detroit"] });
      setSubmitted(true);
      setEmail("");
    } catch {}
  };

  return (
    <section style={{ padding: "28px 20px 8px" }}>
      <div
        style={{
          background: "var(--brand-secondary)",
          padding: "28px",
          borderRadius: "var(--radius-lg)",
          display: "flex", gap: "24px",
          alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div style={{ color: "var(--text-inverse)", maxWidth: "540px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: 500, margin: 0, marginBottom: "6px" }}>
            The weekly, from adda.
          </h3>
          <p style={{ fontSize: "13px", margin: 0, lineHeight: 1.5, opacity: 0.85 }}>
            One email every Friday. What&apos;s on this weekend, new businesses, festivals incoming.
          </p>
        </div>
        {submitted ? (
          <div style={{ color: "var(--text-inverse)", fontSize: "14px", fontWeight: 500 }}>
            Subscribed — see you Friday.
          </div>
        ) : (
          <div style={{ display: "flex", gap: "8px", flex: "1 1 280px", maxWidth: "420px" }}>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && submit()}
              placeholder="your@email.com"
              style={{
                flex: 1, height: "40px", padding: "0 16px",
                borderRadius: "var(--radius-pill)",
                border: "none",
                background: "var(--bg-surface)",
                fontSize: "14px", fontFamily: "inherit",
                color: "var(--text-primary)", outline: "none",
              }}
            />
            <button
              onClick={submit}
              style={{
                height: "40px", padding: "0 20px",
                borderRadius: "var(--radius-pill)",
                background: "var(--brand-primary)",
                color: "#FFFFFF", border: "none",
                fontSize: "14px", fontWeight: 500, cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
