"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

const CATEGORIES = [
  { value: "roommates", label: "Roommates" },
  { value: "housing", label: "Housing" },
  { value: "jobs", label: "Jobs" },
  { value: "for-sale", label: "For Sale" },
  { value: "services", label: "Services" },
  { value: "carpool", label: "Carpool" },
  { value: "events", label: "Events" },
  { value: "babysitting", label: "Babysitting" },
  { value: "home-cooked-meals", label: "Home Cooked Meals" },
  { value: "misc", label: "Misc" },
];

export default function PostClassifiedPage() {
  const [form, setForm] = useState({ category: "", title: "", body: "", author: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const { error: err } = await supabase.from("classifieds").insert({
      title: form.title,
      body: form.body,
      author: form.author,
      email: form.email,
      category: form.category,
      status: "pending",
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
            Post Submitted!
          </h2>
          <p style={{ fontSize: "14px", color: "#5A4A3F", margin: "0 0 24px" }}>
            Your post is pending review and will appear on the community board once approved.
          </p>
          <Link href="/community" style={{
            display: "inline-block", padding: "10px 24px", borderRadius: "12px",
            background: COLORS.primary, color: "white", fontFamily: FONTS.body,
            fontWeight: 600, fontSize: "14px", textDecoration: "none",
          }}>
            Back to Community Board
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{ background: "white", borderBottom: "1px solid #EDE6DE", padding: "12px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
        <Link href="/community" style={{ display: "flex", alignItems: "center", gap: "6px", color: COLORS.primary, fontFamily: FONTS.body, fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
          <ArrowLeft size={18} /> Back to Community
        </Link>
      </div>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "30px 20px" }}>
        <h1 style={{ fontFamily: FONTS.heading, fontSize: "28px", fontWeight: 700, margin: "0 0 4px" }}>
          Post to Community Board
        </h1>
        <p style={{ fontSize: "14px", color: "#8A7968", margin: "0 0 24px" }}>
          Share with the Detroit desi community. Posts are reviewed before going live.
        </p>

        <form onSubmit={handleSubmit} style={{
          background: "white", borderRadius: "16px", padding: "32px",
          border: "1px solid #EDE6DE",
        }}>
          <div style={{ display: "grid", gap: "20px" }}>
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
              <label style={labelStyle}>Title *</label>
              <input required type="text" value={form.title} onChange={update("title")} placeholder="e.g. Looking for roommate near Troy" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Description *</label>
              <textarea required value={form.body} onChange={update("body")} placeholder="Provide details about your post..." rows={5} style={{ ...inputStyle, resize: "vertical" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Your Name *</label>
                <input required type="text" value={form.author} onChange={update("author")} placeholder="Your name" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Email *</label>
                <input required type="email" value={form.email} onChange={update("email")} placeholder="your@email.com" style={inputStyle} />
              </div>
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
            {submitting ? "Submitting..." : "Submit Post"}
          </button>
        </form>
      </div>
    </>
  );
}
