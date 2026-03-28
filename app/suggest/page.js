"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

const CATEGORIES = [
  { value: "restaurant", label: "Restaurant" },
  { value: "grocery", label: "Grocery" },
  { value: "temple", label: "Temple" },
  { value: "wedding vendor", label: "Wedding Vendor" },
  { value: "event hall", label: "Event Hall" },
  { value: "professional", label: "Professional" },
  { value: "other", label: "Other" },
];

export default function SuggestBusinessPage() {
  const [form, setForm] = useState({ business_name: "", category: "", city: "", website: "", notes: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const { error: err } = await supabase.from("submissions").insert({
      business_name: form.business_name,
      category: form.category,
      city: form.city,
      website: form.website,
      notes: form.notes,
      email: form.email,
      status: "pending",
      metro: "detroit",
    });

    setSubmitting(false);
    if (err) {
      setError("Something went wrong. Please try again.");
    } else {
      setSuccess(true);
    }
  };

  const labelStyle = {
    display: "block", fontSize: "13px", fontWeight: 600, color: "#5A4A3F",
    fontFamily: FONTS.body, marginBottom: "6px",
  };

  const inputStyle = {
    width: "100%", padding: "12px 16px", borderRadius: "10px",
    border: "1px solid #E0D8CF", fontSize: "14px", fontFamily: FONTS.body,
    outline: "none", boxSizing: "border-box",
  };

  if (success) {
    return (
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "30px 20px" }}>
        <div style={{
          background: "white", borderRadius: "16px", padding: "48px 32px",
          border: "1px solid #EDE6DE", textAlign: "center",
        }}>
          <CheckCircle size={48} color="#2E7D32" style={{ marginBottom: "16px" }} />
          <h2 style={{ fontFamily: FONTS.heading, fontSize: "24px", fontWeight: 700, margin: "0 0 8px" }}>
            Suggestion Submitted!
          </h2>
          <p style={{ fontSize: "14px", color: "#5A4A3F", margin: "0 0 24px" }}>
            Thank you for suggesting a business. We will review it and add it to the directory.
          </p>
          <Link href="/" style={{
            display: "inline-block", padding: "10px 24px", borderRadius: "12px",
            background: COLORS.primary, color: "white", fontFamily: FONTS.body,
            fontWeight: 600, fontSize: "14px", textDecoration: "none",
          }}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{ background: "white", borderBottom: "1px solid #EDE6DE", padding: "12px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "6px", color: COLORS.primary, fontFamily: FONTS.body, fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
          <ArrowLeft size={18} /> Back
        </Link>
      </div>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "30px 20px" }}>
        <h1 style={{ fontFamily: FONTS.heading, fontSize: "28px", fontWeight: 700, margin: "0 0 4px" }}>
          Suggest a Business
        </h1>
        <p style={{ fontSize: "14px", color: "#8A7968", margin: "0 0 24px" }}>
          Know a great desi business in Detroit? Let us know and we will add it to our directory.
        </p>

        <form onSubmit={handleSubmit} style={{
          background: "white", borderRadius: "16px", padding: "32px",
          border: "1px solid #EDE6DE",
        }}>
          <div style={{ display: "grid", gap: "20px" }}>
            <div>
              <label style={labelStyle}>Business Name *</label>
              <input required type="text" value={form.business_name} onChange={update("business_name")} placeholder="e.g. Shalimar Restaurant" style={inputStyle} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Category *</label>
                <select required value={form.category} onChange={update("category")} style={{ ...inputStyle, cursor: "pointer" }}>
                  <option value="">Select a category</option>
                  {CATEGORIES.map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>City *</label>
                <input required type="text" value={form.city} onChange={update("city")} placeholder="e.g. Troy, MI" style={inputStyle} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Website</label>
              <input type="url" value={form.website} onChange={update("website")} placeholder="https://..." style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Notes</label>
              <textarea value={form.notes} onChange={update("notes")} placeholder="Tell us what makes this business great..." rows={4} style={{ ...inputStyle, resize: "vertical" }} />
            </div>

            <div>
              <label style={labelStyle}>Your Email *</label>
              <input required type="email" value={form.email} onChange={update("email")} placeholder="your@email.com" style={inputStyle} />
            </div>
          </div>

          {error && (
            <p style={{ color: "#C62828", fontSize: "13px", marginTop: "16px" }}>{error}</p>
          )}

          <button type="submit" disabled={submitting} style={{
            marginTop: "24px", padding: "12px 32px", borderRadius: "12px",
            background: submitting ? "#ccc" : COLORS.primary, color: "white",
            border: "none", fontFamily: FONTS.body, fontWeight: 600,
            fontSize: "14px", cursor: submitting ? "not-allowed" : "pointer",
          }}>
            {submitting ? "Submitting..." : "Submit Suggestion"}
          </button>
        </form>
      </div>
    </>
  );
}
