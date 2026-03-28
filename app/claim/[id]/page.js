"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Star, Image, FileText, Globe, Award, TrendingUp } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

export default function ClaimProfilePage() {
  const { id } = useParams();
  const [professional, setProfessional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  useEffect(() => {
    if (!id) return;
    supabase
      .from("professionals")
      .select("*")
      .eq("id", parseInt(id))
      .single()
      .then(({ data, error }) => {
        if (error) console.error("Error fetching professional:", error);
        setProfessional(data);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error: insertError } = await supabase.from("claims").insert({
      professional_id: parseInt(id),
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
      status: "pending",
    });

    if (insertError) {
      console.error("Error submitting claim:", insertError);
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
      return;
    }

    setSubmitted(true);
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        Loading...
      </div>
    );
  }

  if (!professional) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <h1 style={{ fontFamily: FONTS.heading, fontSize: "24px" }}>Professional not found</h1>
        <Link href="/professionals" style={{ color: COLORS.primary, fontWeight: 600, marginTop: "12px", display: "inline-block" }}>
          ← Back to professionals
        </Link>
      </div>
    );
  }

  const p = professional;

  const premiumFeatures = [
    { icon: Image, text: "Professional photo on your listing" },
    { icon: FileText, text: "Custom bio and description" },
    { icon: Globe, text: "Direct website link" },
    { icon: Award, text: "Featured badge on your profile" },
    { icon: TrendingUp, text: "Top placement in search results" },
  ];

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "30px 20px" }}>
      {/* Back link */}
      <Link
        href="/professionals"
        style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          color: COLORS.textSecondary, fontSize: "14px", fontFamily: FONTS.body,
          textDecoration: "none", marginBottom: "20px", fontWeight: 500,
        }}
      >
        <ArrowLeft size={16} /> Back to Professionals
      </Link>

      {/* Page title */}
      <h1 style={{
        fontFamily: FONTS.heading, fontSize: "28px", fontWeight: 700,
        margin: "0 0 6px", color: COLORS.text,
      }}>
        Claim Your Profile
      </h1>
      <p style={{ fontSize: "14px", color: COLORS.textMuted, margin: "0 0 24px" }}>
        Upgrade to a premium listing and stand out to the community.
      </p>

      {/* Current listing info */}
      <div style={{
        background: "white", borderRadius: "16px", padding: "24px",
        border: "1px solid #EDE6DE", marginBottom: "20px",
      }}>
        <p style={{
          fontSize: "11px", fontWeight: 600, textTransform: "uppercase",
          letterSpacing: "0.05em", color: COLORS.textMuted, margin: "0 0 12px",
        }}>
          Your Current Listing
        </p>
        <h2 style={{
          fontFamily: FONTS.heading, fontSize: "20px", fontWeight: 600,
          margin: "0 0 4px", color: COLORS.text,
        }}>
          {p.name}{p.title ? `, ${p.title}` : ""}
        </h2>
        {p.practice_name && (
          <p style={{ fontSize: "14px", color: COLORS.textSecondary, margin: "0 0 6px", fontWeight: 500 }}>
            {p.practice_name}
          </p>
        )}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "16px",
          fontSize: "13px", color: COLORS.textMuted, marginBottom: "8px",
        }}>
          {p.city && <span>{p.city}</span>}
          {p.specialty && (
            <span style={{
              display: "inline-block", padding: "2px 10px", borderRadius: "999px",
              fontSize: "11px", fontWeight: 600, background: "#ECEFF1", color: "#37474F",
            }}>
              {p.specialty}
            </span>
          )}
        </div>
        {p.bio && (
          <p style={{ fontSize: "13px", color: COLORS.textMuted, margin: "8px 0 0", lineHeight: 1.5 }}>
            {p.bio}
          </p>
        )}
      </div>

      {/* What Premium Includes */}
      <div style={{
        background: "white", borderRadius: "16px", padding: "24px",
        border: "1px solid #EDE6DE", marginBottom: "20px",
      }}>
        <h2 style={{
          fontFamily: FONTS.heading, fontSize: "20px", fontWeight: 600,
          margin: "0 0 16px", color: COLORS.text,
        }}>
          What Premium Includes
        </h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {premiumFeatures.map((feature, i) => (
            <li key={i} style={{
              display: "flex", alignItems: "center", gap: "12px",
              padding: "10px 0",
              borderBottom: i < premiumFeatures.length - 1 ? "1px solid #F5EDE4" : "none",
            }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "10px",
                background: "#F5EDE4", display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <feature.icon size={18} color={COLORS.textSecondary} />
              </div>
              <span style={{ fontSize: "14px", color: COLORS.text, fontFamily: FONTS.body, fontWeight: 500 }}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
        <div style={{
          marginTop: "20px", padding: "16px", borderRadius: "12px",
          background: "linear-gradient(135deg, #FFF8E1, #FFF3E0)",
          textAlign: "center",
        }}>
          <span style={{ fontSize: "14px", color: COLORS.textSecondary, fontFamily: FONTS.body }}>
            Premium listing for just
          </span>
          <div style={{
            fontFamily: FONTS.heading, fontSize: "36px", fontWeight: 700,
            color: COLORS.text, margin: "4px 0",
          }}>
            $29<span style={{ fontSize: "16px", fontWeight: 500, color: COLORS.textMuted }}>/month</span>
          </div>
        </div>
      </div>

      {/* Claim form or success message */}
      {submitted ? (
        <div style={{
          background: "white", borderRadius: "16px", padding: "40px 24px",
          border: "1px solid #EDE6DE", textAlign: "center",
        }}>
          <CheckCircle size={48} color="#2E7D32" style={{ marginBottom: "16px" }} />
          <h2 style={{
            fontFamily: FONTS.heading, fontSize: "22px", fontWeight: 600,
            margin: "0 0 10px", color: COLORS.text,
          }}>
            Claim Request Submitted!
          </h2>
          <p style={{
            fontSize: "14px", color: COLORS.textSecondary, lineHeight: 1.6,
            maxWidth: "460px", margin: "0 auto 20px",
          }}>
            We'll verify your identity and activate your premium profile within 24 hours.
          </p>
          <Link
            href="/professionals"
            style={{
              display: "inline-block", padding: "10px 24px", borderRadius: "10px",
              background: "#37474F", color: "white", fontFamily: FONTS.body,
              fontWeight: 600, fontSize: "14px", textDecoration: "none",
            }}
          >
            Back to Professionals
          </Link>
        </div>
      ) : (
        <div style={{
          background: "white", borderRadius: "16px", padding: "24px",
          border: "1px solid #EDE6DE",
        }}>
          <h2 style={{
            fontFamily: FONTS.heading, fontSize: "20px", fontWeight: 600,
            margin: "0 0 16px", color: COLORS.text,
          }}>
            Claim This Profile
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gap: "14px" }}>
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label style={labelStyle}>Email Address *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  style={inputStyle}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label style={labelStyle}>Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  style={inputStyle}
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label style={labelStyle}>Message (optional)</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  style={{ ...inputStyle, resize: "vertical" }}
                  placeholder="Tell us about your practice or anything else we should know..."
                />
              </div>
            </div>
            {error && (
              <p style={{ color: "#C62828", fontSize: "13px", marginTop: "12px" }}>{error}</p>
            )}
            <button
              type="submit"
              disabled={submitting}
              style={{
                marginTop: "18px", width: "100%", padding: "14px",
                borderRadius: "12px", border: "none", background: COLORS.primary,
                color: "white", fontFamily: FONTS.body, fontWeight: 700,
                fontSize: "15px", cursor: submitting ? "not-allowed" : "pointer",
                opacity: submitting ? 0.7 : 1, transition: "opacity 0.2s",
              }}
            >
              {submitting ? "Submitting..." : "Submit Claim Request"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

const labelStyle = {
  display: "block", fontSize: "13px", fontWeight: 600,
  color: COLORS.textSecondary, fontFamily: FONTS.body, marginBottom: "6px",
};

const inputStyle = {
  width: "100%", padding: "10px 14px", borderRadius: "10px",
  border: "1px solid #E0D8CF", fontSize: "14px", fontFamily: FONTS.body,
  color: COLORS.text, background: "white", outline: "none",
  boxSizing: "border-box",
};
