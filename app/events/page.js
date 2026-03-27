"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import { fetchEvents } from "@/lib/data";

export default function EventsPage() {
  const [_data, _setData] = useState(null);
  useEffect(() => { fetchEvents().then(_setData); }, []);
  if (!_data) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>;
  const EVENTS = _data;

  return (
    <>
      <div style={{ background: "white", borderBottom: "1px solid #EDE6DE", padding: "12px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "6px", color: COLORS.primary, fontFamily: FONTS.body, fontWeight: 600, fontSize: "14px" }}>
          <ArrowLeft size={18} /> Back
        </Link>
      </div>

      <div style={{
        background: `linear-gradient(135deg, #7B1FA212, #7B1FA206)`,
        padding: "40px 20px 30px", borderBottom: "1px solid #EDE6DE",
      }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
            <div style={{
              width: 48, height: 48, borderRadius: "14px", background: "#7B1FA2",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <Calendar size={24} color="white" />
            </div>
            <div>
              <h1 style={{ fontFamily: FONTS.heading, fontSize: "28px", fontWeight: 700, margin: "0 0 4px" }}>
                Events
              </h1>
              <p style={{ fontSize: "14px", color: "#6B5B4F", margin: 0, maxWidth: "600px" }}>
                Garba, Diwali melas, comedy shows, concerts — everything happening in Detroit&apos;s desi community.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "30px 20px" }}>
        <div style={{ display: "grid", gap: "14px" }}>
          {EVENTS.map((ev, i) => (
            <div key={i} style={{
              background: "white", borderRadius: "16px", padding: "20px 24px",
              border: "1px solid #EDE6DE", display: "flex", alignItems: "flex-start", gap: "16px",
            }}>
              <span style={{ fontSize: "32px", flexShrink: 0 }}>{ev.icon}</span>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: FONTS.heading, fontSize: "18px", fontWeight: 600, margin: "0 0 4px" }}>
                  {ev.name}
                </h3>
                <p style={{ fontSize: "13px", color: "#5A4A3F", margin: "0 0 8px", lineHeight: 1.5 }}>
                  {ev.desc}
                </p>
                <div style={{ display: "flex", gap: "12px", fontSize: "13px", color: "#8A7968" }}>
                  <span>
                    <Calendar size={13} style={{ display: "inline", verticalAlign: "middle" }} /> {ev.date}
                  </span>
                  <span>
                    <MapPin size={13} style={{ display: "inline", verticalAlign: "middle" }} /> {ev.where}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
