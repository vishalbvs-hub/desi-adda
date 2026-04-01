"use client";
import { useState } from "react";
import { FONTS, COLORS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

const ff = FONTS.body;
const fb = FONTS.body;
const SAFFRON = "#C4943D";
const TEMPLE_RED = "#BF360C";

function generateICS(event, orgAddress) {
  const formatDate = (dateStr, timeStr) => {
    const d = new Date(dateStr + "T00:00:00");
    if (!timeStr) return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    let hours = parseInt(match[1]);
    const mins = parseInt(match[2]);
    if (match[3].toUpperCase() === "PM" && hours !== 12) hours += 12;
    if (match[3].toUpperCase() === "AM" && hours === 12) hours = 0;
    d.setHours(hours, mins, 0);
    return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };

  const dtStart = formatDate(event.event_date, event.start_time);
  const dtEnd = formatDate(event.event_date, event.end_time || event.start_time);

  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Desi Adda//EN",
    "BEGIN:VEVENT",
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${event.event_name}`,
    `DESCRIPTION:${(event.event_description || "").replace(/\n/g, "\\n")}`,
    `LOCATION:${orgAddress}`,
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${event.event_name.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function CommunityClient({ org, events }) {
  const [filter, setFilter] = useState("90days");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const eventMonths = [...new Set(events.map(e => e.event_date.substring(0, 7)))].sort();
  const filterOptions = [
    { value: "90days", label: "Next 90 days" },
    { value: "all", label: "All upcoming" },
    ...eventMonths.map(ym => {
      const [y, m] = ym.split("-");
      return { value: ym, label: new Date(parseInt(y), parseInt(m) - 1).toLocaleDateString("en-US", { month: "long", year: "numeric" }) };
    }),
  ];

  const now = new Date();
  const in90 = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
  const filteredEvents = events.filter(e => {
    const d = new Date(e.event_date + "T00:00:00");
    if (filter === "90days") return d >= now && d <= in90;
    if (filter === "all") return d >= now;
    return e.event_date.startsWith(filter);
  });

  const formatEventDate = (dateStr) => {
    const d = new Date(dateStr + "T00:00:00");
    return {
      month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
      day: d.getDate(),
      weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
    };
  };

  const handleSubscribe = async () => {
    if (!email.includes("@")) return;
    await supabase.from("community_subscriptions").insert({ email: email.trim().toLowerCase(), org_id: org.id });
    setSubscribed(true);
  };

  return (
    <>
      {/* ═══ UPCOMING EVENTS ═══ */}
      <div style={{ background: "white", borderRadius: "10px", padding: "24px", border: "1px solid #E2DFD8", marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
          <h3 style={{ fontFamily: ff, fontSize: "20px", fontWeight: 700, margin: 0, color: "#1A1A1A" }}>
            Upcoming Events
          </h3>
          <select value={filter} onChange={e => setFilter(e.target.value)} style={{
            padding: "6px 12px", borderRadius: "8px", border: "1px solid #E2DFD8",
            fontSize: "13px", fontFamily: fb, color: "#6B6B6B", background: "white", cursor: "pointer",
          }}>
            {filterOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {filteredEvents.length > 0 ? (
          <div style={{ display: "grid", gap: "10px" }}>
            {filteredEvents.map(ev => {
              const d = formatEventDate(ev.event_date);
              return (
                <div key={ev.id} style={{
                  display: "flex", gap: "16px", alignItems: "center",
                  padding: "14px 16px", borderRadius: "12px", border: "1px solid #E2DFD8",
                  transition: "border-color 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = TEMPLE_RED + "60"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#E2DFD8"}
                >
                  {/* Date block */}
                  <div style={{
                    width: "56px", textAlign: "center", flexShrink: 0,
                    padding: "8px 4px", borderRadius: "10px", background: "#F5F2EB",
                  }}>
                    <div style={{ fontSize: "10px", fontWeight: 700, color: TEMPLE_RED, fontFamily: fb, textTransform: "uppercase" }}>{d.month}</div>
                    <div style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", fontFamily: ff, lineHeight: 1.1 }}>{d.day}</div>
                    <div style={{ fontSize: "10px", color: "#6B6B6B", fontFamily: fb }}>{d.weekday}</div>
                  </div>

                  {/* Event info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: fb, fontSize: "15px", fontWeight: 600, color: "#1A1A1A", marginBottom: "2px" }}>{ev.event_name}</div>
                    {ev.event_description && (
                      <div style={{ fontSize: "13px", color: "#6B6B6B", lineHeight: 1.4, marginBottom: "2px" }}>{ev.event_description}</div>
                    )}
                    <div style={{ fontSize: "12px", color: "#999999" }}>
                      {ev.is_all_day ? "All day" : `${ev.start_time}${ev.end_time ? " – " + ev.end_time : ""}`}
                    </div>
                  </div>

                  {/* Calendar button */}
                  <button
                    onClick={() => generateICS(ev, org.address)}
                    style={{
                      flexShrink: 0, padding: "6px 12px", borderRadius: "8px",
                      background: `${SAFFRON}10`, border: `1px solid ${SAFFRON}30`,
                      color: SAFFRON, fontSize: "11px", fontWeight: 600, fontFamily: fb,
                      cursor: "pointer", whiteSpace: "nowrap",
                    }}
                  >
                    + Calendar
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "24px 0", color: "#6B6B6B" }}>
            <p style={{ fontSize: "14px", margin: "0 0 8px" }}>No upcoming events listed yet.</p>
            <p style={{ fontSize: "12px", margin: 0, lineHeight: 1.6 }}>
              {org.website ? (
                <>Visit <a href={org.website.startsWith("http") ? org.website : `https://${org.website}`} target="_blank" rel="noopener noreferrer" style={{ color: COLORS.primary, textDecoration: "none", fontWeight: 600 }}>{org.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</a> for updates, or </>
              ) : null}
              <a href="/suggest" style={{ color: COLORS.primary, textDecoration: "none", fontWeight: 600 }}>let us know</a> about upcoming events.
            </p>
          </div>
        )}
      </div>

      {/* ═══ EMAIL SIGNUP ═══ */}
      <div style={{
        borderRadius: "10px", padding: "28px", marginBottom: "20px",
        background: `linear-gradient(135deg, ${TEMPLE_RED}12, ${SAFFRON}08)`,
        border: "1px solid #E2DFD8",
      }}>
        {subscribed ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>🙏</div>
            <p style={{ fontFamily: ff, fontSize: "16px", fontWeight: 600, color: "#1A1A1A", margin: "0 0 4px" }}>You&apos;re subscribed!</p>
            <p style={{ fontSize: "13px", color: "#6B6B6B", margin: 0 }}>We&apos;ll notify you about events at {org.name}.</p>
          </div>
        ) : (
          <>
            <h4 style={{ fontFamily: ff, fontSize: "18px", fontWeight: 700, margin: "0 0 6px", color: "#1A1A1A" }}>
              Never miss an event at {org.name}
            </h4>
            <p style={{ fontSize: "13px", color: "#6B6B6B", margin: "0 0 14px" }}>
              Get notified about upcoming pujas, festivals, and community events.
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  flex: 1, padding: "10px 14px", borderRadius: "10px",
                  border: "1px solid #E2DFD8", fontSize: "14px", fontFamily: fb,
                  outline: "none", background: "white",
                }}
              />
              <button onClick={handleSubscribe} style={{
                padding: "10px 20px", borderRadius: "10px", background: TEMPLE_RED,
                color: "white", border: "none", fontFamily: fb, fontWeight: 600,
                fontSize: "13px", cursor: "pointer", whiteSpace: "nowrap",
              }}>Subscribe</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
