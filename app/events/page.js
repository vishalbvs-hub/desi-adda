"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin, Plus, Calendar, List, ExternalLink, Search } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import ScrollingChips from "@/components/ScrollingChips";

const SAFFRON = "#C4943D";
const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const TYPE_COLORS = {
  Cultural: "#E8832A", Festival: "#E8832A",
  Religious: "#8B1A2B",
  Concert: "#6A1B9A", Comedy: "#6A1B9A", Entertainment: "#6A1B9A",
  Sports: "#2E7D32",
  Food: "#795548",
  Music: "#1565C0",
  Family: "#2D5A3D",
  Garba: "#E8832A",
};

function getTypeColor(type) {
  return TYPE_COLORS[type] || "#6B6B6B";
}

function tryParseDate(d) {
  if (!d) return null;
  const iso = new Date(d + "T00:00:00");
  if (!isNaN(iso.getTime())) return iso;
  return null;
}

function formatDateLong(d) {
  if (!d) return "";
  const parsed = tryParseDate(d);
  if (parsed) return parsed.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  return d;
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

export default function EventsPage() {
  const [events, setEvents] = useState(null);
  const [viewMode, setViewMode] = useState("calendar");
  const [selectedDay, setSelectedDay] = useState(null);
  const now = new Date();
  const [calMonth, setCalMonth] = useState(now.getMonth());
  const [calYear, setCalYear] = useState(now.getFullYear());

  useEffect(() => {
    supabase.from("events").select("*").eq("status", "approved").order("name")
      .then(({ data }) => setEvents(data || []));
  }, []);

  // Detect mobile for default view
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      setViewMode("list");
    }
  }, []);

  if (!events) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>;

  // Map events to calendar dates
  const eventsByDate = {};
  for (const ev of events) {
    const parsed = tryParseDate(ev.event_date);
    if (parsed) {
      const key = `${parsed.getFullYear()}-${parsed.getMonth()}-${parsed.getDate()}`;
      if (!eventsByDate[key]) eventsByDate[key] = [];
      eventsByDate[key].push(ev);
    }
  }

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
    else setCalMonth(calMonth - 1);
    setSelectedDay(null);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
    else setCalMonth(calMonth + 1);
    setSelectedDay(null);
  };

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);
  const today = now.getDate();
  const isCurrentMonth = calMonth === now.getMonth() && calYear === now.getFullYear();
  const monthName = new Date(calYear, calMonth).toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const selectedEvents = selectedDay ? (eventsByDate[`${calYear}-${calMonth}-${selectedDay}`] || []) : [];

  // Group events by month for list view
  const groupedByMonth = {};
  for (const ev of events) {
    const parsed = tryParseDate(ev.event_date);
    const key = parsed
      ? parsed.toLocaleDateString("en-US", { month: "long", year: "numeric" })
      : "Other Dates";
    if (!groupedByMonth[key]) groupedByMonth[key] = [];
    groupedByMonth[key].push(ev);
  }

  const ff = FONTS.body;
  const fb = FONTS.body;

  const toggleStyle = (active) => ({
    padding: "8px 20px", fontSize: "13px", fontFamily: fb, fontWeight: 600,
    cursor: "pointer", border: "none", display: "flex", alignItems: "center", gap: "5px",
    borderRadius: active ? "10px" : "10px",
    background: active ? SAFFRON : "transparent",
    color: active ? "white" : "#6B6B6B",
    transition: "all 0.2s",
  });

  return (
    <div style={{ background: "#F5F2EB", minHeight: "100vh" }}>
      {/* HERO */}
      <section style={{
        background: "linear-gradient(135deg, #2D1B4E 0%, #4A2574 40%, #6B35A0 100%)",
        minHeight: "280px", padding: "40px 20px 36px", textAlign: "center",
        position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ position: "absolute", top: "10%", left: "6%", fontSize: "40px", opacity: 0.06 }}>{"\u{1F389}"}</div>
        <div style={{ position: "absolute", top: "20%", right: "8%", fontSize: "50px", opacity: 0.05 }}>{"\u{1F3B6}"}</div>
        <div style={{ position: "absolute", bottom: "15%", left: "12%", fontSize: "44px", opacity: 0.05 }}>{"\u{1F3AD}"}</div>
        <div style={{ position: "absolute", bottom: "8%", right: "20%", fontSize: "36px", opacity: 0.04 }}>{"\u{1F3AA}"}</div>
        <div style={{ position: "absolute", top: "50%", left: "3%", fontSize: "38px", opacity: 0.04 }}>{"\u{1F3A4}"}</div>

        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <h1 style={{ fontFamily: ff, fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: "white", lineHeight: 1.1, margin: "0 0 8px" }}>
            Desi <span style={{ color: "#C4943D", fontStyle: "italic" }}>Events</span>
          </h1>
          <p style={{ fontFamily: ff, fontSize: "clamp(14px, 2vw, 18px)", fontWeight: 300, color: "rgba(255,255,255,0.6)", margin: "0 0 24px", fontStyle: "italic" }}>
            Everything happening in Detroit&apos;s desi community
          </p>
          <form onSubmit={e => { e.preventDefault(); const v = document.getElementById("events-search").value; if (v.trim()) { window.dispatchEvent(new CustomEvent("askadda", { detail: v })); document.getElementById("events-search").value = ""; } }} style={{ maxWidth: "560px", margin: "0 auto", position: "relative" }}>
            <Search size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#999999" }} />
            <input id="events-search" placeholder="Find events... garba night? Diwali mela? comedy show?"
              style={{ width: "100%", padding: "14px 150px 14px 44px", borderRadius: "14px", border: "none", fontSize: "15px", fontFamily: fb, background: "white", boxShadow: "0 6px 24px rgba(0,0,0,0.2)", boxSizing: "border-box", outline: "none" }} />
            <button type="submit" style={{ position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)", background: "#C4943D", color: "white", border: "none", borderRadius: "10px", padding: "10px 20px", fontFamily: fb, fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>Ask Adda {"\u2728"}</button>
          </form>
          <div style={{ maxWidth: "600px", margin: "14px auto 0" }}>
            <ScrollingChips chips={[
              { emoji: "\u{1F389}", text: "desi events this weekend" },
              { emoji: "\u{1F483}", text: "garba night Metro Detroit" },
              { emoji: "\u{1F386}", text: "Diwali celebrations 2026" },
              { emoji: "\u{1F3A4}", text: "comedy shows near me" },
              { emoji: "\u{1F3B6}", text: "Bollywood concerts Michigan" },
              { emoji: "\u{1F54C}", text: "Eid events Detroit" },
              { emoji: "\u{1F6D5}", text: "temple festivals this month" },
              { emoji: "\u{1F37D}\uFE0F", text: "desi food festivals" },
              { emoji: "\u{1F3AD}", text: "cultural programs for kids" },
              { emoji: "\u{1F389}", text: "Holi celebrations nearby" },
            ]} onChipClick={(chip) => window.dispatchEvent(new CustomEvent("askadda", { detail: `${chip.emoji} ${chip.text}` }))} variant="light" />
          </div>
        </div>
      </section>

      {/* VIEW TOGGLE + SUBMIT */}
      <div style={{ background: "white", borderBottom: "1px solid #E2DFD8", padding: "12px 20px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "4px", background: "#F5F2EB", padding: "4px", borderRadius: "12px", border: "1px solid #E2DFD8" }}>
            <button onClick={() => setViewMode("calendar")} style={toggleStyle(viewMode === "calendar")}>
              <Calendar size={14} /> Calendar
            </button>
            <button onClick={() => setViewMode("list")} style={toggleStyle(viewMode === "list")}>
              <List size={14} /> List
            </button>
          </div>
          <Link href="/events/submit" style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "8px 16px", borderRadius: "10px", background: COLORS.primary, color: "white", fontFamily: fb, fontWeight: 600, fontSize: "13px", textDecoration: "none" }}>
            <Plus size={14} /> Submit Event
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "28px 20px" }}>

        {viewMode === "calendar" ? (
          <>
            {/* Calendar */}
            <div style={{ background: "white", borderRadius: "16px", border: "1px solid #E2DFD8", overflow: "hidden" }}>
              {/* Month nav */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #E2DFD8" }}>
                <button onClick={prevMonth} style={{ background: "none", border: "none", cursor: "pointer", padding: "6px" }}>
                  <ChevronLeft size={20} color="#6B6B6B" />
                </button>
                <h2 style={{ fontFamily: ff, fontSize: "20px", fontWeight: 700, margin: 0 }}>{monthName}</h2>
                <button onClick={nextMonth} style={{ background: "none", border: "none", cursor: "pointer", padding: "6px" }}>
                  <ChevronRight size={20} color="#6B6B6B" />
                </button>
              </div>

              {/* Day labels */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderBottom: "1px solid #E2DFD8" }}>
                {DAY_LABELS.map(d => (
                  <div key={d} style={{ padding: "10px 0", textAlign: "center", fontSize: "12px", fontWeight: 600, color: "#6B6B6B", fontFamily: fb }}>
                    {d}
                  </div>
                ))}
              </div>

              {/* Day cells */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
                {/* Empty cells for days before month start */}
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} style={{ padding: "12px 4px", minHeight: "64px", borderBottom: "1px solid #F5F2EB", borderRight: "1px solid #F5F2EB" }} />
                ))}
                {/* Actual days */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dateKey = `${calYear}-${calMonth}-${day}`;
                  const dayEvents = eventsByDate[dateKey] || [];
                  const isToday = isCurrentMonth && day === today;
                  const isSelected = selectedDay === day;
                  return (
                    <div
                      key={day}
                      onClick={() => dayEvents.length > 0 && setSelectedDay(isSelected ? null : day)}
                      style={{
                        padding: "8px 6px", minHeight: "64px", cursor: dayEvents.length > 0 ? "pointer" : "default",
                        borderBottom: "1px solid #F5F2EB", borderRight: "1px solid #F5F2EB",
                        background: isSelected ? `${SAFFRON}15` : isToday ? `${SAFFRON}08` : "transparent",
                        transition: "background 0.15s",
                      }}
                    >
                      <span style={{
                        display: "inline-flex", width: "28px", height: "28px", alignItems: "center", justifyContent: "center",
                        borderRadius: "50%", fontSize: "13px", fontWeight: isToday ? 700 : 500, fontFamily: fb,
                        color: isToday ? "white" : "#1A1A1A",
                        background: isToday ? SAFFRON : "transparent",
                      }}>{day}</span>
                      {dayEvents.length > 0 && (
                        <div style={{ display: "flex", gap: "3px", marginTop: "4px", flexWrap: "wrap" }}>
                          {dayEvents.slice(0, 3).map((ev, j) => (
                            <div key={j} style={{ width: "6px", height: "6px", borderRadius: "50%", background: getTypeColor(ev.type) }} />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected day events */}
            {selectedDay && (
              <div style={{ marginTop: "20px" }}>
                <h3 style={{ fontFamily: ff, fontSize: "18px", fontWeight: 700, margin: "0 0 12px" }}>
                  {new Date(calYear, calMonth, selectedDay).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                </h3>
                <div style={{ display: "grid", gap: "10px" }}>
                  {selectedEvents.map(ev => <EventCard key={ev.id} ev={ev} />)}
                </div>
              </div>
            )}

            {/* Legend */}
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "16px", fontSize: "11px", color: "#6B6B6B" }}>
              {Object.entries({ Cultural: "#E8832A", Religious: "#8B1A2B", Entertainment: "#6A1B9A", Sports: "#2E7D32", Other: "#6B6B6B" }).map(([label, color]) => (
                <span key={label} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: color, display: "inline-block" }} /> {label}
                </span>
              ))}
            </div>
          </>
        ) : (
          /* List View */
          <div>
            {Object.entries(groupedByMonth).map(([month, evts]) => (
              <div key={month} style={{ marginBottom: "28px" }}>
                <h3 style={{ fontFamily: ff, fontSize: "20px", fontWeight: 700, margin: "0 0 12px", color: "#1A1A1A", borderBottom: `2px solid ${SAFFRON}30`, paddingBottom: "6px" }}>
                  {month}
                </h3>
                <div style={{ display: "grid", gap: "10px" }}>
                  {evts.map(ev => <EventCard key={ev.id} ev={ev} />)}
                </div>
              </div>
            ))}
          </div>
        )}

        {events.length === 0 && (
          <div style={{ padding: "60px 20px", textAlign: "center", background: "white", borderRadius: "16px", border: "1px solid #E2DFD8" }}>
            <p style={{ fontFamily: ff, fontSize: "20px", fontWeight: 600, margin: "0 0 8px" }}>No events yet</p>
            <p style={{ fontSize: "14px", color: "#6B6B6B", margin: "0 0 16px" }}>Be the first to add one!</p>
            <Link href="/events/submit" style={{ color: COLORS.primary, fontWeight: 600, fontSize: "14px", fontFamily: fb, textDecoration: "none" }}>
              Submit an Event →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function EventCard({ ev }) {
  const ff = FONTS.body;
  const fb = FONTS.body;
  const typeColor = getTypeColor(ev.type);
  const shareText = encodeURIComponent(`${ev.name} — ${ev.event_date} at ${ev.location}. Check it out on Desi Adda!`);

  return (
    <div style={{
      background: "white", borderRadius: "14px", padding: "18px 22px",
      border: "1px solid #E2DFD8", borderLeft: `3px solid ${typeColor}`,
      transition: "box-shadow 0.2s",
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", flexWrap: "wrap" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "6px", flexWrap: "wrap" }}>
            <span style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 600, background: typeColor + "15", color: typeColor }}>{ev.type}</span>
            <span style={{ fontSize: "12px", color: "#6B6B6B" }}>{formatDateLong(ev.event_date)}</span>
          </div>
          <h4 style={{ fontFamily: ff, fontSize: "17px", fontWeight: 600, margin: "0 0 4px" }}>
            {ev.icon && <span style={{ marginRight: "6px" }}>{ev.icon}</span>}
            {ev.name}
          </h4>
          {ev.location && (
            <p style={{ fontSize: "13px", color: "#6B6B6B", margin: "0 0 4px", display: "flex", alignItems: "center", gap: "4px" }}>
              <MapPin size={12} /> {ev.location}
            </p>
          )}
          {ev.description && (
            <p style={{ fontSize: "13px", color: "#6B6B6B", margin: "4px 0 0", lineHeight: 1.4 }}>{ev.description}</p>
          )}
        </div>
        <div style={{ display: "flex", gap: "8px", flexShrink: 0, alignItems: "center" }}>
          {ev.url && (
            <a href={ev.url} target="_blank" rel="noopener noreferrer" style={{
              fontSize: "12px", color: COLORS.primary, fontWeight: 600, fontFamily: fb,
              textDecoration: "none", display: "flex", alignItems: "center", gap: "3px",
            }}>
              More Info <ExternalLink size={11} />
            </a>
          )}
          <a
            href={`https://wa.me/?text=${shareText}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              width: "32px", height: "32px", borderRadius: "8px", background: "#25D366",
              display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none",
            }}
            title="Share on WhatsApp"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.524 5.857L0 24l6.335-1.652A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.875 0-3.636-.519-5.142-1.416l-.369-.218-3.823.998 1.023-3.734-.24-.381A9.698 9.698 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
