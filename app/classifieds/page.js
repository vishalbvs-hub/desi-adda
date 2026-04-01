"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Plus, Users, ExternalLink, CheckCircle } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

const ff = FONTS.heading;
const fb = FONTS.body;
const SAFFRON = "#E8A317";

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "Housing & Roommates", label: "Housing & Roommates" },
  { value: "Jobs & Careers", label: "Jobs & Careers" },
  { value: "Buy/Sell/Trade", label: "Buy/Sell/Trade" },
  { value: "Social & Networking", label: "Social & Networking" },
  { value: "Parents & Families", label: "Parents & Families" },
  { value: "Language-Specific", label: "Language-Specific" },
  { value: "Students", label: "Students" },
];

const PLATFORMS = ["All", "facebook", "whatsapp", "telegram", "meetup", "discord", "other"];
const PLATFORM_LABELS = { facebook: "Facebook", whatsapp: "WhatsApp", telegram: "Telegram", meetup: "Meetup", discord: "Discord", other: "Website / Other" };
const LANG_FILTER = ["All", "Telugu", "Hindi", "Tamil", "Gujarati", "Marathi", "Malayalam", "Kannada", "Bengali", "Punjabi", "Urdu", "Multi"];

const PLATFORM_STYLES = {
  facebook: { color: "#1877F2", bg: "#E7F0FD", icon: "\uD83D\uDC65", border: "#1877F2" },
  whatsapp: { color: "#25D366", bg: "#E8F8EE", icon: "\uD83D\uDCAC", border: "#25D366" },
  telegram: { color: "#0088CC", bg: "#E3F2FD", icon: "\u2708\uFE0F", border: "#0088CC" },
  meetup:   { color: "#ED1C40", bg: "#FDE8EC", icon: "\uD83E\uDD1D", border: "#ED1C40" },
  discord:  { color: "#5865F2", bg: "#EDEEFE", icon: "\uD83C\uDFAE", border: "#5865F2" },
  other:    { color: "#6B5B4F", bg: "#F5EDE4", icon: "\uD83C\uDF10", border: "#8A7968" },
};

const CAT_COLORS = {
  "Housing & Roommates": { bg: "#E8F5E9", color: "#2E7D32" },
  "Jobs & Careers":      { bg: "#E3F2FD", color: "#1565C0" },
  "Buy/Sell/Trade":      { bg: "#FFF3E0", color: "#E65100" },
  "Social & Networking": { bg: "#F3E5F5", color: "#7B1FA2" },
  "Parents & Families":  { bg: "#FCE4EC", color: "#C2185B" },
  "Language-Specific":   { bg: "#FFF8E1", color: "#F57F17" },
  "Students":            { bg: "#E0F7FA", color: "#00838F" },
};

function ctaLabel(platform) {
  if (platform === "facebook") return "View on Facebook";
  if (platform === "other") return "Visit site";
  return "Join";
}

function platformLabel(p) {
  return PLATFORM_LABELS[p] || p;
}

export default function GroupsPage() {
  return <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>}><GroupsInner /></Suspense>;
}

function GroupsInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [groups, setGroups] = useState([]);
  const [cat, setCat] = useState(searchParams.get("cat") || "all");
  const [platform, setPlatform] = useState("All");
  const [lang, setLang] = useState("All");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    supabase.from("groups").select("*").eq("is_active", true).order("name")
      .then(({ data }) => setGroups(data || []));
  }, []);

  const filtered = groups.filter(g => {
    if (cat !== "all" && g.category !== cat) return false;
    if (platform !== "All" && g.platform !== platform) return false;
    if (lang !== "All" && g.language !== lang) return false;
    return true;
  });

  const pillStyle = (active) => ({
    padding: "6px 14px", borderRadius: "999px", fontSize: "12px", fontFamily: fb, fontWeight: 600,
    cursor: "pointer", border: active ? `2px solid ${SAFFRON}` : "2px solid #EDE6DE",
    background: active ? SAFFRON : "white", color: active ? "#2D2420" : "#8A7968",
    transition: "all 0.2s", whiteSpace: "nowrap",
  });

  const selectStyle = {
    padding: "6px 12px", borderRadius: "10px", border: "1px solid #E0D8CF", fontSize: "12px",
    fontFamily: fb, color: "#5A4A3F", background: "white", cursor: "pointer",
  };

  return (
    <div style={{ background: "#FFFBF5", minHeight: "100vh" }}>
      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg, #2D2420 0%, #3E2F26 40%, #5A4435 100%)", padding: "36px 20px 28px", textAlign: "center" }}>
        <h1 style={{ fontFamily: ff, fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 700, color: "white", margin: "0 0 6px" }}>
          Find your <span style={{ color: SAFFRON, fontStyle: "italic" }}>people</span>
        </h1>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", margin: 0, fontFamily: fb, maxWidth: "560px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.5 }}>
          Every WhatsApp group, Facebook group, and online community for desi life in Metro Detroit — in one place.
        </p>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px 20px" }}>
        {/* TOP CTA */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
          <p style={{ fontSize: "14px", color: "#8A7968", margin: 0, fontFamily: fb }}>
            <strong style={{ color: "#2D2420" }}>{groups.length} groups</strong> and counting
          </p>
          <button onClick={() => { setShowForm(!showForm); if (!showForm) setTimeout(() => document.getElementById("submit-form")?.scrollIntoView({ behavior: "smooth" }), 100); }} style={{
            padding: "8px 18px", borderRadius: "10px", background: COLORS.primary, color: "white",
            border: "none", fontFamily: fb, fontWeight: 600, fontSize: "13px", cursor: "pointer",
            display: "flex", alignItems: "center", gap: "6px",
          }}>
            <Plus size={14} /> Submit a Group
          </button>
        </div>

        {/* FILTERS */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px", alignItems: "center" }}>
          {CATEGORIES.map(c => (
            <button key={c.value} onClick={() => setCat(c.value)} style={pillStyle(cat === c.value)}>{c.label}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
          <select value={platform} onChange={e => setPlatform(e.target.value)} style={selectStyle}>
            <option value="All">Platform</option>
            {PLATFORMS.filter(p => p !== "All").map(p => <option key={p} value={p}>{platformLabel(p)}</option>)}
          </select>
          <select value={lang} onChange={e => setLang(e.target.value)} style={selectStyle}>
            {LANG_FILTER.map(l => <option key={l} value={l}>{l === "All" ? "Language" : l}</option>)}
          </select>
        </div>

        {/* WhatsApp notice */}
        {(platform === "All" || platform === "whatsapp") && (
          <p style={{ fontSize: "11px", color: "#A89888", margin: "0 0 16px", fontStyle: "italic" }}>
            WhatsApp links may expire. If a link doesn&apos;t work, use the Submit form to let us know.
          </p>
        )}

        {/* GROUP LISTINGS */}
        <div style={{ display: "grid", gap: "12px" }}>
          {filtered.map(g => {
            const ps = PLATFORM_STYLES[g.platform] || PLATFORM_STYLES.other;
            const cc = CAT_COLORS[g.category] || { bg: "#F5EDE4", color: "#8A7968" };
            const langVal = g.language || "Multi";

            return (
              <div key={g.id} style={{
                background: "white", borderRadius: "14px", padding: "20px 22px",
                border: "1px solid #EDE6DE", borderLeft: `4px solid ${ps.border}`,
                transition: "box-shadow 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.05)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              >
                <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  {/* Platform icon */}
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "12px", background: ps.bg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "22px", flexShrink: 0,
                  }}>
                    {ps.icon}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Badges */}
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px", flexWrap: "wrap" }}>
                      <span style={{ padding: "2px 8px", borderRadius: "999px", fontSize: "10px", fontWeight: 700, background: ps.bg, color: ps.color }}>{platformLabel(g.platform)}</span>
                      <span style={{ padding: "2px 8px", borderRadius: "999px", fontSize: "10px", fontWeight: 600, background: cc.bg, color: cc.color }}>{g.category}</span>
                      {langVal !== "Multi" && (
                        <span style={{ padding: "2px 7px", borderRadius: "999px", fontSize: "9px", fontWeight: 600, background: `${SAFFRON}15`, color: SAFFRON }}>{langVal}</span>
                      )}
                      {langVal === "Multi" && (
                        <span style={{ padding: "2px 7px", borderRadius: "999px", fontSize: "9px", fontWeight: 600, background: "#F5EDE4", color: "#8A7968" }}>Multi-language</span>
                      )}
                    </div>

                    {/* Name */}
                    <h3 style={{ fontFamily: ff, fontSize: "16px", fontWeight: 700, margin: "0 0 4px", color: "#2D2420" }}>{g.name}</h3>

                    {/* Member count */}
                    {g.member_count && (
                      <p style={{ fontSize: "12px", color: "#8A7968", margin: "0 0 4px", display: "flex", alignItems: "center", gap: "4px" }}>
                        <Users size={11} /> {g.member_count.toLocaleString()} members
                      </p>
                    )}

                    {/* Description */}
                    {g.description && (
                      <p style={{ fontSize: "13px", color: "#6B5B4F", margin: "0 0 10px", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {g.description}
                      </p>
                    )}

                    {/* Bottom row */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                      {g.invite_url && (
                        <a href={g.invite_url} target="_blank" rel="noopener noreferrer" style={{
                          padding: "7px 16px", borderRadius: "8px", background: ps.color, color: "white",
                          fontSize: "12px", fontWeight: 700, fontFamily: fb, textDecoration: "none",
                          display: "inline-flex", alignItems: "center", gap: "5px",
                        }}>
                          {ctaLabel(g.platform)} <ExternalLink size={11} />
                        </a>
                      )}
                      {g.verified_date && (
                        <span style={{ fontSize: "10px", color: "#A89888" }}>
                          Last verified: {new Date(g.verified_date + "T00:00:00").toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 20px", background: "white", borderRadius: "16px", border: "1px solid #EDE6DE" }}>
              <p style={{ fontFamily: ff, fontSize: "18px", color: "#8A7968", margin: "0 0 8px" }}>No groups found</p>
              <p style={{ fontSize: "13px", color: "#A89888" }}>Try adjusting your filters or submit a group below.</p>
            </div>
          )}
        </div>

        {/* SUBMIT FORM */}
        <div id="submit-form" style={{ marginTop: "40px" }}>
          <SubmitGroupForm onSuccess={() => {
            supabase.from("groups").select("*").eq("is_active", true).order("name")
              .then(({ data }) => setGroups(data || []));
          }} />
        </div>
      </div>
    </div>
  );
}

/* ═══ SUBMIT GROUP FORM ═══ */
function SubmitGroupForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: "", platform: "", invite_url: "", category: "", language: "Multi", description: "", submitter_email: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const { error: err } = await supabase.from("groups").insert({
      name: form.name,
      platform: form.platform,
      invite_url: form.invite_url,
      category: form.category,
      language: form.language || "Multi",
      description: form.description || null,
      is_active: false,
      verified_date: null,
    });

    setSubmitting(false);
    if (err) setError("Something went wrong. Please try again.");
    else setSuccess(true);
  };

  const labelStyle = { display: "block", fontSize: "13px", fontWeight: 600, color: "#5A4A3F", fontFamily: fb, marginBottom: "6px" };
  const inputStyle = { width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #E0D8CF", fontSize: "14px", fontFamily: fb, outline: "none", boxSizing: "border-box" };

  if (success) {
    return (
      <div style={{ background: "#E8F5E9", borderRadius: "14px", padding: "28px", textAlign: "center" }}>
        <CheckCircle size={36} color="#2E7D32" style={{ marginBottom: "10px" }} />
        <p style={{ fontFamily: ff, fontSize: "18px", fontWeight: 700, color: "#2E7D32", margin: "0 0 4px" }}>Thanks!</p>
        <p style={{ fontSize: "13px", color: "#5A4A3F", margin: 0 }}>We&apos;ll verify and add this group within 24 hours.</p>
      </div>
    );
  }

  return (
    <div style={{ background: "white", borderRadius: "16px", padding: "28px", border: "1px solid #EDE6DE" }}>
      <h3 style={{ fontFamily: ff, fontSize: "20px", fontWeight: 700, margin: "0 0 4px", color: "#2D2420" }}>Know a group we&apos;re missing?</h3>
      <p style={{ fontSize: "13px", color: "#8A7968", margin: "0 0 20px" }}>Add it below. We&apos;ll verify the link and publish it.</p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>
        <div>
          <label style={labelStyle}>Group Name *</label>
          <input required type="text" value={form.name} onChange={update("name")} placeholder="e.g. Michigan Telugu Association" style={inputStyle} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <label style={labelStyle}>Platform *</label>
            <select required value={form.platform} onChange={update("platform")} style={{ ...inputStyle, cursor: "pointer" }}>
              <option value="">Select platform</option>
              {PLATFORMS.filter(p => p !== "All").map(p => <option key={p} value={p}>{platformLabel(p)}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Category *</label>
            <select required value={form.category} onChange={update("category")} style={{ ...inputStyle, cursor: "pointer" }}>
              <option value="">Select category</option>
              {CATEGORIES.filter(c => c.value !== "all").map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label style={labelStyle}>Invite Link / URL *</label>
          <input required type="url" value={form.invite_url} onChange={update("invite_url")} placeholder="https://chat.whatsapp.com/... or https://facebook.com/groups/..." style={inputStyle} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <label style={labelStyle}>Language</label>
            <select value={form.language} onChange={update("language")} style={{ ...inputStyle, cursor: "pointer" }}>
              {LANG_FILTER.filter(l => l !== "All").map(l => <option key={l} value={l}>{l === "Multi" ? "Multi-language" : l}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Your Email (for verification)</label>
            <input type="email" value={form.submitter_email} onChange={update("submitter_email")} placeholder="Not displayed publicly" style={inputStyle} />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Description (optional)</label>
          <textarea value={form.description} onChange={update("description")} rows={3} placeholder="What's this group about?" style={{ ...inputStyle, resize: "vertical" }} />
        </div>

        {error && <p style={{ color: "#C62828", fontSize: "13px", margin: 0 }}>{error}</p>}

        <button type="submit" disabled={submitting} style={{
          padding: "12px 32px", borderRadius: "12px",
          background: submitting ? "#ccc" : COLORS.primary, color: "white",
          border: "none", fontFamily: fb, fontWeight: 700, fontSize: "14px",
          cursor: submitting ? "not-allowed" : "pointer", justifySelf: "start",
        }}>
          {submitting ? "Submitting..." : "Submit Group"}
        </button>
      </form>
    </div>
  );
}
