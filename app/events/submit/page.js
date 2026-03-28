"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

const EVENT_TYPES = [
  { value: "Festival", label: "Festival" },
  { value: "Garba", label: "Garba" },
  { value: "Concert", label: "Concert" },
  { value: "Comedy", label: "Comedy" },
  { value: "Religious", label: "Religious" },
  { value: "Cultural", label: "Cultural" },
  { value: "Sports", label: "Sports" },
  { value: "Other", label: "Other" },
];

export default function SubmitEventPage() {
  const [form, setForm] = useState({ name: "", type: "", event_date: "", location: "", description: "", organizer: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const { error: err } = await supabase.from("events").insert({
      name: form.name,
      type: form.type,
      event_date: form.event_date,
      location: form.location,
      description: form.description,
      author: form.organizer,
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
            Event Submitted!
          </h2>
          <p style={{ fontSize: "14px", color: "#5A4A3F", margin: "0 0 24px" }}>
            Your event is pending review and will appear on the events page once approved.
          </p>
          <Link href="/events" style={{
            display: "inline-block", padding: "10px 24px", borderRadius: "12px",
            background: COLORS.primary, color: "white", fontFamily: FONTS.body,
            fontWeight: 600, fontSize: "14px", textDecoration: "none",
          }}>
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{ background: "white", borderBottom: "1px solid #EDE6DE", padding: "12px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
        <Link href="/events" style={{ display: "flex", alignItems: "center", gap: "6px", color: COLORS.primary, fontFamily: FONTS.body, fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
          <ArrowLeft size={18} /> Back to Events
        </Link>
      </div>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "30px 20px" }}>
        <h1 style={{ fontFamily: FONTS.heading, fontSize: "28px", fontWeight: 700, margin: "0 0 4px" }}>
          Submit an Event
        </h1>
        <p style={{ fontSize: "14px", color: "#8A7968", margin: "0 0 24px" }}>
          Hosting a desi event in Detroit? Submit it here and we will feature it on our events page.
        </p>

        <form onSubmit={handleSubmit} style={{
          background: "white", borderRadius: "16px", padding: "32px",
          border: "1px solid #EDE6DE",
        }}>
          <div style={{ display: "grid", gap: "20px" }}>
            <div>
              <label style={labelStyle}>Event Name *</label>
              <input required type="text" value={form.name} onChange={update("name")} placeholder="e.g. Diwali Mela 2026" style={inputStyle} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Event Type *</label>
                <select required value={form.type} onChange={update("type")} style={{ ...inputStyle, cursor: "pointer" }}>
                  <option value="">Select a type</option>
                  {EVENT_TYPES.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Event Date *</label>
                <input required type="date" value={form.event_date} onChange={update("event_date")} style={inputStyle} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Location *</label>
              <input required type="text" value={form.location} onChange={update("location")} placeholder="e.g. Suburban Collection Showplace, Novi" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Description *</label>
              <textarea required value={form.description} onChange={update("description")} placeholder="Tell us about the event..." rows={4} style={{ ...inputStyle, resize: "vertical" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Organizer Name *</label>
                <input required type="text" value={form.organizer} onChange={update("organizer")} placeholder="Your name or org name" style={inputStyle} />
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
            {submitting ? "Submitting..." : "Submit Event"}
          </button>
        </form>
      </div>
    </>
  );
}
