"use client";
import { useState, useEffect } from "react";
import { Search, ExternalLink, Users, MessageCircle, Globe, MapPin } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import ScrollingChips from "@/components/ScrollingChips";

const ff = FONTS.heading;
const fb = FONTS.body;
const SAFFRON = "#E8A317";

const TABS = [
  { id: "orgs", label: "Organizations", icon: "\u{1F465}" },
  { id: "whatsapp", label: "WhatsApp Groups", icon: "\u{1F4AC}" },
];

const CHIPS = [
  { emoji: "\u{1F465}", text: "Telugu associations Detroit" },
  { emoji: "\u{1F4AC}", text: "WhatsApp groups for new arrivals" },
  { emoji: "\u{1F6D5}", text: "Tamil Sangam Michigan" },
  { emoji: "\u{1F465}", text: "Gujarati community groups" },
  { emoji: "\u{1F4AC}", text: "desi parents WhatsApp group" },
  { emoji: "\u{1F465}", text: "Indian American organizations" },
  { emoji: "\u{1F4AC}", text: "H1B community group" },
  { emoji: "\u{1F465}", text: "Bengali association Metro Detroit" },
  { emoji: "\u{1F4AC}", text: "desi women's networking group" },
  { emoji: "\u{1F465}", text: "Sikh community center" },
];

export default function CommunityPage() {
  const [tab, setTab] = useState("orgs");
  const [orgs, setOrgs] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    supabase.from("community_networking").select("*").order("name")
      .then(({ data }) => setOrgs(data || []));
  }, []);

  const triggerChat = (q) => { window.dispatchEvent(new CustomEvent("askadda", { detail: q })); };

  if (!orgs) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFFBF5" }}><p style={{ fontFamily: ff, color: COLORS.textMuted }}>Loading...</p></div>;

  const filtered = orgs.filter(o => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return o.name?.toLowerCase().includes(q) || o.description?.toLowerCase().includes(q) || o.city?.toLowerCase().includes(q) || o.subcategories?.some(s => s.toLowerCase().includes(q));
  });

  return (
    <div style={{ background: "#FFFBF5", minHeight: "100vh" }}>
      {/* HERO */}
      <section style={{
        background: "linear-gradient(135deg, #1B3A26 0%, #2D5A3E 40%, #3E7A52 100%)",
        minHeight: "300px", padding: "40px 20px 36px", textAlign: "center",
        position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ position: "absolute", top: "10%", left: "6%", fontSize: "40px", opacity: 0.06 }}>{"\u{1F465}"}</div>
        <div style={{ position: "absolute", top: "20%", right: "8%", fontSize: "50px", opacity: 0.05 }}>{"\u{1F91D}"}</div>
        <div style={{ position: "absolute", bottom: "15%", left: "12%", fontSize: "44px", opacity: 0.05 }}>{"\u{1F4AC}"}</div>
        <div style={{ position: "absolute", bottom: "8%", right: "20%", fontSize: "36px", opacity: 0.04 }}>{"\u{1F30D}"}</div>

        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
          {/* Tab Toggle */}
          <div style={{ display: "flex", gap: "4px", justifyContent: "center", marginBottom: "20px" }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                padding: "10px 24px", borderRadius: "999px", fontSize: "14px", fontFamily: ff, fontWeight: 700, cursor: "pointer",
                background: tab === t.id ? SAFFRON : "rgba(255,255,255,0.1)",
                color: tab === t.id ? "#1B3A26" : "rgba(255,255,255,0.6)",
                border: tab === t.id ? `2px solid ${SAFFRON}` : "2px solid rgba(255,255,255,0.2)",
                transition: "all 0.3s", display: "flex", alignItems: "center", gap: "6px",
              }}>{t.icon} {t.label}</button>
            ))}
          </div>

          <h1 style={{ fontFamily: ff, fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: "white", lineHeight: 1.1, margin: "0 0 8px" }}>
            Desi <span style={{ color: SAFFRON, fontStyle: "italic" }}>Community</span>
          </h1>
          <p style={{ fontFamily: ff, fontSize: "clamp(14px, 2vw, 18px)", fontWeight: 300, color: "rgba(255,255,255,0.6)", margin: "0 0 24px", fontStyle: "italic" }}>
            {tab === "orgs" ? "Cultural associations, professional networks & organizations" : "Connect with your community on WhatsApp"}
          </p>

          <form onSubmit={e => { e.preventDefault(); if (searchQuery.trim()) triggerChat(searchQuery); }} style={{ maxWidth: "560px", margin: "0 auto", position: "relative" }}>
            <Search size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#A89888" }} />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder={tab === "orgs" ? "Find a community organization..." : "Find a WhatsApp group to join..."}
              style={{ width: "100%", padding: "14px 150px 14px 44px", borderRadius: "14px", border: "none", fontSize: "15px", fontFamily: fb, background: "white", boxShadow: "0 6px 24px rgba(0,0,0,0.2)", boxSizing: "border-box", outline: "none" }} />
            <button type="submit" style={{ position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)", background: SAFFRON, color: "white", border: "none", borderRadius: "10px", padding: "10px 20px", fontFamily: fb, fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>Ask Adda {"\u2728"}</button>
          </form>
          <div style={{ maxWidth: "600px", margin: "14px auto 0" }}>
            <ScrollingChips chips={CHIPS} onChipClick={(chip) => triggerChat(`${chip.emoji} ${chip.text}`)} variant="light" />
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "30px 20px" }}>
        {tab === "orgs" ? (
          <>
            <p style={{ fontSize: "13px", color: COLORS.textFaint, marginBottom: "16px" }}>{filtered.length} organizations</p>
            <div style={{ display: "grid", gap: "14px" }}>
              {filtered.map(org => (
                <div key={org.id} style={{ background: "white", borderRadius: "14px", padding: "20px 24px", border: "1px solid #EDE6DE", transition: "box-shadow 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.05)"}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                  <h3 style={{ fontFamily: ff, fontSize: "17px", fontWeight: 700, margin: "0 0 6px", color: "#2D2420" }}>{org.name}</h3>
                  {org.subcategories?.length > 0 && (
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "8px" }}>
                      {org.subcategories.map(s => <span key={s} style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "10px", fontWeight: 600, background: "#E8F5E9", color: "#2E7D32" }}>{s}</span>)}
                    </div>
                  )}
                  {org.city && <p style={{ fontSize: "12px", color: COLORS.textMuted, margin: "0 0 4px", display: "flex", alignItems: "center", gap: "4px" }}><MapPin size={11} /> {org.city}</p>}
                  {org.description && <p style={{ fontSize: "13px", color: "#6B5B4F", margin: "6px 0 0", lineHeight: 1.5 }}>{org.description}</p>}
                  {org.website && <a href={org.website.startsWith("http") ? org.website : `https://${org.website}`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", color: COLORS.primary, fontWeight: 600, marginTop: "8px", textDecoration: "none" }}><Globe size={11} /> Visit Website <ExternalLink size={10} /></a>}
                </div>
              ))}
            </div>
            {filtered.length === 0 && <div style={{ textAlign: "center", padding: "60px 20px", color: "#8A7968" }}><p style={{ fontFamily: ff, fontSize: "18px" }}>No organizations found</p></div>}
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: "56px", marginBottom: "16px" }}>{"\u{1F4AC}"}</div>
            <h2 style={{ fontFamily: ff, fontSize: "24px", fontWeight: 700, margin: "0 0 8px", color: "#2D2420" }}>WhatsApp Groups — Coming Soon</h2>
            <p style={{ fontSize: "14px", color: COLORS.textMuted, maxWidth: "400px", margin: "0 auto", lineHeight: 1.6 }}>
              We&apos;re compiling the best desi WhatsApp groups in Metro Detroit — new arrivals, parents, professionals, language-specific, and more. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
