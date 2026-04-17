"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Coffee, ShoppingCart, Landmark, Briefcase, Home as HomeIcon,
  Calendar, Music, Film, Star, Bookmark,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

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

const PILL_SET = [
  { bg: "var(--pill-blush-bg)", text: "var(--pill-blush-text)" },
  { bg: "var(--pill-mint-bg)", text: "var(--pill-mint-text)" },
  { bg: "var(--pill-butter-bg)", text: "var(--pill-butter-text)" },
  { bg: "var(--pill-lilac-bg)", text: "var(--pill-lilac-text)" },
];

function formatEventDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.round((d - today) / 86400000);
  const day = d.toLocaleDateString("en-US", { weekday: "short" });
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff < 7) return day;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function initialsFor(name) {
  if (!name) return "??";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

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
        ...(te.data || []).map(e => ({ id: e.id, name: e.event_name, date: e.event_date, org: e.temples?.name, slug: e.temples?.slug ? `/temples/${e.temples.slug}` : null, _type: "temple" })),
        ...(ce.data || []).map(e => ({ id: e.id, name: e.event_name, date: e.event_date, org: e.community_networking?.name, slug: e.community_networking?.slug ? `/community/${e.community_networking.slug}` : null, _type: "community" })),
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
        {/* ═══ THIS WEEKEND ═══ */}
        {events.length > 0 && (
          <SectionRow title="This weekend" href="/community?tab=events">
            {events.slice(0, 3).map((ev, i) => (
              <InlineEventCard key={`${ev._type}-${ev.id}`} ev={ev} pill={PILL_SET[i % PILL_SET.length]} />
            ))}
          </SectionRow>
        )}

        {/* ═══ TRENDING RESTAURANTS ═══ */}
        {restaurants.length > 0 && (
          <SectionRow title="Trending restaurants in Troy" href="/businesses?tab=restaurants&city=Troy">
            {restaurants.slice(0, 3).map(r => (
              <InlineRestaurantCard key={r.id} biz={r} />
            ))}
          </SectionRow>
        )}

        {/* ═══ ORGANIZATIONS TO SAVE ═══ */}
        {orgs.length > 0 && (
          <SectionRow title="Organizations to save" href="/community?tab=orgs">
            {orgs.slice(0, 3).map((org, i) => (
              <InlineOrgCard key={org.id} org={org} pill={PILL_SET[i % PILL_SET.length]} />
            ))}
          </SectionRow>
        )}

        {/* ═══ NEWSLETTER BANNER ═══ */}
        <NewsletterBanner />

        {/* ═══ RECENT NEWS ═══ */}
        {recaps.length > 0 && (
          <SectionRow title="Recent news" href="/news?tab=recaps">
            {recaps.slice(0, 3).map(r => (
              <InlineNewsCard key={r.slug} rec={r} />
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

function InlineEventCard({ ev, pill }) {
  const dateLabel = formatEventDate(ev.date);
  return (
    <Link
      href={ev.slug || "/community?tab=events"}
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden", textDecoration: "none", color: "inherit",
        display: "flex", flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "relative", height: "140px",
          background: pill.bg,
        }}
      >
        <div
          style={{
            position: "absolute", bottom: "10px", left: "10px",
            background: "var(--bg-surface)",
            color: "var(--text-primary)",
            fontSize: "11px", fontWeight: 500,
            padding: "4px 10px",
            borderRadius: "var(--radius-pill)",
          }}
        >
          {dateLabel}
        </div>
      </div>
      <div style={{ padding: "12px 14px" }}>
        <div
          style={{
            fontSize: "14px", fontWeight: 500, color: "var(--text-primary)",
            lineHeight: 1.3,
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {ev.name}
        </div>
        {ev.org && (
          <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>
            {ev.org}
          </div>
        )}
      </div>
    </Link>
  );
}

function InlineRestaurantCard({ biz }) {
  const photo = biz.photos?.[0];
  return (
    <Link
      href={biz.slug ? `/restaurants/${biz.slug}` : "/businesses"}
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden", textDecoration: "none", color: "inherit",
        display: "flex", flexDirection: "column",
      }}
    >
      <div style={{ position: "relative", height: "120px", background: "var(--pill-butter-bg)" }}>
        {photo && (
          <img
            src={photo} alt={biz.name} loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
        {biz.rating && (
          <div
            style={{
              position: "absolute", top: "10px", left: "10px",
              background: "var(--bg-surface)", color: "var(--text-primary)",
              fontSize: "11px", fontWeight: 500,
              padding: "4px 10px", borderRadius: "var(--radius-pill)",
              display: "inline-flex", alignItems: "center", gap: "4px",
            }}
          >
            <Star size={11} fill="var(--brand-primary)" color="var(--brand-primary)" />
            {biz.rating}
          </div>
        )}
      </div>
      <div style={{ padding: "12px 14px" }}>
        <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)" }}>
          {biz.name}
        </div>
        <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>
          {[biz.cuisine_type, biz.city].filter(Boolean).join(" · ")}
        </div>
      </div>
    </Link>
  );
}

function InlineOrgCard({ org, pill }) {
  return (
    <Link
      href={`/community/${org.slug}`}
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        padding: "18px 14px",
        textDecoration: "none", color: "inherit",
        display: "flex", flexDirection: "column", alignItems: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "48px", height: "48px", borderRadius: "50%",
          background: pill.bg, color: pill.text,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "15px", fontWeight: 500,
          marginBottom: "10px",
        }}
      >
        {initialsFor(org.name)}
      </div>
      <div
        style={{
          fontSize: "13px", fontWeight: 500, color: "var(--text-primary)",
          lineHeight: 1.3, marginBottom: "4px",
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {org.name}
      </div>
      {org.city && (
        <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginBottom: "12px" }}>
          {org.city}
        </div>
      )}
      <span
        style={{
          display: "inline-flex", alignItems: "center", gap: "4px",
          background: "transparent",
          border: "1px solid var(--brand-primary)",
          color: "var(--brand-primary)",
          padding: "6px 14px",
          borderRadius: "var(--radius-pill)",
          fontSize: "12px", fontWeight: 500,
        }}
      >
        <Bookmark size={12} /> Save
      </span>
    </Link>
  );
}

function InlineNewsCard({ rec }) {
  return (
    <Link
      href={`/news/recaps/${rec.slug}`}
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden", textDecoration: "none", color: "inherit",
        display: "flex", flexDirection: "column",
      }}
    >
      <div style={{ position: "relative", height: "140px", background: "var(--pill-lilac-bg)" }}>
        {rec.cover_image && (
          <img
            src={rec.cover_image} alt={rec.title} loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </div>
      <div style={{ padding: "12px 14px" }}>
        <div
          style={{
            fontSize: "14px", fontWeight: 500, color: "var(--text-primary)",
            lineHeight: 1.3,
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {rec.title}
        </div>
        {rec.summary && (
          <div
            style={{
              fontSize: "12px", color: "var(--text-secondary)",
              marginTop: "4px", lineHeight: 1.5,
              display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {rec.summary}
          </div>
        )}
      </div>
    </Link>
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
