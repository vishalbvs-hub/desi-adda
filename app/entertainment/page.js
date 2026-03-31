"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Play, ExternalLink, MapPin } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

const ff = FONTS.heading;
const fb = FONTS.body;
const SAFFRON = "#E8A317";

const PLATFORM_COLORS = { Netflix: "#E50914", "Prime Video": "#00A8E1", "Disney+ Hotstar": "#1A2C5B", Aha: "#FF3C58", "Sun NXT": "#FFA500", Spotify: "#1DB954", "Apple Music": "#FC3C44", "YouTube Music": "#FF0000" };

export default function EntertainmentPage() {
  return <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>}><EntertainmentContent /></Suspense>;
}

function EntertainmentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [tab, setTab] = useState(searchParams.get("tab") || "watch");
  const [langFilter, setLangFilter] = useState("All");
  const [ott, setOtt] = useState([]);
  const [lists, setLists] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [musicEvents, setMusicEvents] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    Promise.all([
      supabase.from("ott_releases").select("*").eq("release_type", "new").order("release_date", { ascending: false }),
      supabase.from("curated_lists").select("*").order("title"),
      supabase.from("curated_playlists").select("*").order("name"),
      supabase.from("community_events").select("*, community_networking(name, slug)").gte("event_date", today).order("event_date").limit(10),
    ]).then(([o, l, p, me]) => {
      setOtt(o.data || []);
      setLists(l.data || []);
      setPlaylists(p.data || []);
      const musicKw = /music|concert|garba|dandiya|sangeet|karaoke|bhajan|kirtan/i;
      setMusicEvents((me.data || []).filter(e => musicKw.test(e.event_name) || musicKw.test(e.event_description || "")));
    });
  }, []);

  const changeTab = (t) => { setTab(t); router.replace(`/entertainment?tab=${t}`, { scroll: false }); };

  return (
    <div style={{ background: "#FFFBF5", minHeight: "100vh" }}>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 20px" }}>
        <h1 style={{ fontFamily: ff, fontSize: "clamp(28px, 5vw, 36px)", fontWeight: 700, margin: "0 0 4px", color: "#2D2420" }}>Entertainment</h1>
        <p style={{ fontSize: "14px", color: "#8A7968", margin: "0 0 20px" }}>What to watch, what to listen to.</p>

        <div style={{ display: "flex", gap: "6px", marginBottom: "28px" }}>
          {[{ id: "watch", label: "Watch" }, { id: "listen", label: "Listen" }].map(t => (
            <button key={t.id} onClick={() => changeTab(t.id)} style={{
              padding: "8px 24px", borderRadius: "999px", fontSize: "14px", fontFamily: fb, fontWeight: 600, cursor: "pointer",
              border: tab === t.id ? `2px solid ${SAFFRON}` : "2px solid #EDE6DE",
              background: tab === t.id ? SAFFRON : "white",
              color: tab === t.id ? "#2D2420" : "#8A7968", transition: "all 0.2s",
            }}>{t.label}</button>
          ))}
        </div>

        {/* Language filter */}
        <div style={{ marginBottom: "20px" }}>
          <select value={langFilter} onChange={e => setLangFilter(e.target.value)} style={{
            padding: "8px 14px", borderRadius: "10px", border: "1px solid #E0D8CF", fontSize: "13px", fontFamily: fb, color: "#5A4A3F", background: "white", cursor: "pointer",
          }}>
            {["All", "Telugu", "Hindi", "Tamil", "Malayalam", "Kannada", "Punjabi", "Bengali"].map(l => <option key={l} value={l}>{l === "All" ? "All Languages" : l}</option>)}
          </select>
        </div>

        {tab === "watch" && (() => {
          const filterLang = (items) => langFilter === "All" ? items : items.filter(m => m.language === langFilter);
          return (
          <>
            <section style={{ marginBottom: "40px" }}>
              <h2 style={{ fontFamily: ff, fontSize: "22px", fontWeight: 700, margin: "0 0 16px", color: "#2D2420" }}>New on OTT</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px" }}>
                {filterLang(ott).map(m => <MovieCard key={m.id} movie={m} />)}
              </div>
            </section>

            <section>
              <h2 style={{ fontFamily: ff, fontSize: "22px", fontWeight: 700, margin: "0 0 16px", color: "#2D2420" }}>Recommendations</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "14px" }}>
                {lists.map(l => (
                  <Link key={l.id} href={`/entertainment/lists/${l.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <div style={{ background: "white", borderRadius: "16px", padding: "24px", border: "1px solid #EDE6DE", borderLeft: `4px solid ${SAFFRON}`, transition: "box-shadow 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"}
                      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                      <h3 style={{ fontFamily: ff, fontSize: "18px", fontWeight: 700, margin: "0 0 6px", color: "#2D2420" }}>{l.title}</h3>
                      <p style={{ fontSize: "13px", color: "#8A7968", margin: "0 0 10px", lineHeight: 1.5 }}>{l.subtitle}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "12px", color: "#A89888" }}>{l.film_count} films</span>
                        <span style={{ fontSize: "13px", fontWeight: 600, color: COLORS.primary }}>View list {"\u2192"}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </>
          );
        })()}

        {tab === "listen" && (() => {
          const filterLang = (items) => langFilter === "All" ? items : items.filter(p => p.language === langFilter || p.language === "Multi");
          return (
          <>
            <section style={{ marginBottom: "40px" }}>
              <h2 style={{ fontFamily: ff, fontSize: "22px", fontWeight: 700, margin: "0 0 16px", color: "#2D2420" }}>Curated Playlists</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px" }}>
                {filterLang(playlists).map(p => {
                  const pc = PLATFORM_COLORS[p.platform] || "#333";
                  return (
                    <a key={p.id} href={p.playlist_url} target="_blank" rel="noopener noreferrer" style={{ background: "white", borderRadius: "16px", padding: "20px", border: "1px solid #EDE6DE", textDecoration: "none", color: "inherit", transition: "box-shadow 0.2s", display: "flex", flexDirection: "column", gap: "10px" }}
                      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"}
                      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "10px", fontWeight: 600, background: `${SAFFRON}15`, color: SAFFRON }}>{p.language}</span>
                        <span style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "10px", fontWeight: 600, background: `${pc}15`, color: pc }}>{p.platform}</span>
                      </div>
                      <h3 style={{ fontFamily: ff, fontSize: "16px", fontWeight: 700, margin: 0, color: "#2D2420" }}>{p.name}</h3>
                      <p style={{ fontSize: "12px", color: "#8A7968", margin: 0, lineHeight: 1.5 }}>{p.description}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                        <span style={{ fontSize: "11px", color: "#A89888" }}>{p.song_count} songs</span>
                        <span style={{ fontSize: "12px", fontWeight: 600, color: pc, display: "flex", alignItems: "center", gap: "3px" }}>Listen <ExternalLink size={10} /></span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </section>

            <section>
              <h2 style={{ fontFamily: ff, fontSize: "22px", fontWeight: 700, margin: "0 0 16px", color: "#2D2420" }}>Live Near You</h2>
              {musicEvents.length > 0 ? (
                <div style={{ display: "grid", gap: "10px" }}>
                  {musicEvents.map((ev, i) => {
                    const d = new Date(ev.event_date + "T00:00:00");
                    return (
                      <div key={`me-${ev.id}-${i}`} style={{ display: "flex", gap: "14px", padding: "14px 16px", background: "white", borderRadius: "12px", border: "1px solid #EDE6DE", alignItems: "center" }}>
                        <div style={{ width: "48px", textAlign: "center", flexShrink: 0, padding: "6px", borderRadius: "10px", background: "#FFF3E0" }}>
                          <div style={{ fontSize: "10px", fontWeight: 700, color: "#BF360C", textTransform: "uppercase" }}>{d.toLocaleDateString("en-US", { month: "short" })}</div>
                          <div style={{ fontSize: "18px", fontWeight: 700, fontFamily: ff }}>{d.getDate()}</div>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: fb, fontSize: "14px", fontWeight: 600, color: "#2D2420" }}>{ev.event_name}</div>
                          {ev.community_networking?.name && <Link href={`/community/${ev.community_networking.slug}`} style={{ fontSize: "12px", color: COLORS.primary, textDecoration: "none", fontWeight: 600 }}>{ev.community_networking.name}</Link>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "40px 20px", background: "white", borderRadius: "16px", border: "1px solid #EDE6DE" }}>
                  <p style={{ fontSize: "15px", color: "#8A7968", margin: "0 0 8px" }}>No upcoming music events. Check back soon!</p>
                  <Link href="/events/submit" style={{ color: COLORS.primary, fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>Submit an event {"\u2192"}</Link>
                </div>
              )}
            </section>
          </>
          );
        })()}
      </div>
    </div>
  );
}

function MovieCard({ movie: m }) {
  const pc = PLATFORM_COLORS[m.platform] || "#333";
  return (
    <div style={{ background: "white", borderRadius: "14px", overflow: "hidden", border: "1px solid #EDE6DE", transition: "box-shadow 0.2s", display: "flex", flexDirection: "column" }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
      <div style={{ width: "100%", aspectRatio: "2/3", overflow: "hidden", position: "relative", background: "#F5EDE4" }}>
        {m.poster_url ? <img src={m.poster_url} alt={m.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.onerror = null; e.target.style.display = "none"; }} /> : null}
        {!m.poster_url && <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px" }}>{"\u{1F3AC}"}</div>}
        <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(m.title + " official trailer")}`} target="_blank" rel="noopener noreferrer" style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.2s", textDecoration: "none" }}
          onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0}>
          <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Play size={18} fill={COLORS.primary} color={COLORS.primary} style={{ marginLeft: "2px" }} />
          </div>
        </a>
      </div>
      <div style={{ padding: "12px 14px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontFamily: ff, fontSize: "14px", fontWeight: 700, margin: "0 0 6px", color: "#2D2420", lineHeight: 1.3 }}>{m.title}</h3>
        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "8px" }}>
          {m.language && <span style={{ padding: "2px 6px", borderRadius: "999px", fontSize: "9px", fontWeight: 600, background: `${SAFFRON}12`, color: SAFFRON }}>{m.language}</span>}
          {m.platform && m.platform !== "Coming Soon" && <span style={{ padding: "2px 6px", borderRadius: "999px", fontSize: "9px", fontWeight: 600, background: `${pc}12`, color: pc }}>{m.platform}</span>}
        </div>
        <div style={{ display: "flex", gap: "6px", marginTop: "auto" }}>
          {m.streaming_url && <a href={m.streaming_url} target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: "7px 10px", borderRadius: "8px", background: pc, color: "white", fontSize: "11px", fontWeight: 700, fontFamily: fb, textDecoration: "none", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "3px" }}><Play size={10} /> Watch</a>}
          <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(m.title + " official trailer")}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: "7px 10px", borderRadius: "8px", background: "#2D2420", color: "white", fontSize: "11px", fontWeight: 700, fontFamily: fb, textDecoration: "none", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "3px" }}><Play size={10} /> Trailer</a>
        </div>
      </div>
    </div>
  );
}
