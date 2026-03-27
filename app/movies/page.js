"use client";
import Link from "next/link";
import { ArrowLeft, Film, Ticket } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import { fetchMovies } from "@/lib/data";

export default function MoviesPage() {
  const [_data, _setData] = useState(null);
  useEffect(() => { fetchMovies().then(_setData); }, []);
  if (!_data) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>;
  const MOVIES = _data;

  return (
    <>
      <div style={{ background: "white", borderBottom: "1px solid #EDE6DE", padding: "12px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "6px", color: COLORS.primary, fontFamily: FONTS.body, fontWeight: 600, fontSize: "14px" }}>
          <ArrowLeft size={18} /> Back
        </Link>
      </div>

      <div style={{
        background: `linear-gradient(135deg, #6A1B9A12, #6A1B9A06)`,
        padding: "40px 20px 30px", borderBottom: "1px solid #EDE6DE",
      }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
            <div style={{
              width: 48, height: 48, borderRadius: "14px", background: "#6A1B9A",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <Film size={24} color="white" />
            </div>
            <div>
              <h1 style={{ fontFamily: FONTS.heading, fontSize: "28px", fontWeight: 700, margin: "0 0 4px" }}>
                Indian Movies
              </h1>
              <p style={{ fontSize: "14px", color: "#6B5B4F", margin: 0, maxWidth: "600px" }}>
                Bollywood, Tollywood, Kollywood — what&apos;s playing in Detroit.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "30px 20px" }}>
        <div style={{ display: "grid", gap: "14px" }}>
          {MOVIES.map((m, i) => (
            <div key={i} style={{ background: "white", borderRadius: "16px", padding: "20px 24px", border: "1px solid #EDE6DE" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                    <h3 style={{ fontFamily: FONTS.heading, fontSize: "18px", fontWeight: 700, margin: 0 }}>{m.title}</h3>
                    <span style={{
                      padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 600,
                      background: m.status === "Now Showing" ? "#E8F5E9" : "#FFF3E0",
                      color: m.status === "Now Showing" ? "#2E7D32" : "#E65100",
                    }}>{m.status}</span>
                  </div>
                  <div style={{ display: "flex", gap: "12px", fontSize: "13px", color: "#8A7968", marginBottom: "8px" }}>
                    <span><Film size={13} style={{ display: "inline", verticalAlign: "middle" }} /> {m.language}</span>
                    <span>{m.genre}</span>
                    <span>{m.rating}</span>
                  </div>
                  <div style={{ fontSize: "13px", color: "#5A4A3F" }}>
                    <strong style={{ color: "#8A7968", fontWeight: 500 }}>Showing at: </strong>
                    {m.theaters.join(" · ")}
                  </div>
                </div>
                <a
                  href={m.url} target="_blank" rel="noopener noreferrer"
                  style={{
                    padding: "8px 18px", borderRadius: "10px", background: "#6A1B9A",
                    color: "white", fontFamily: FONTS.body, fontWeight: 600, fontSize: "13px",
                    textDecoration: "none", display: "flex", alignItems: "center", gap: "5px",
                    whiteSpace: "nowrap", flexShrink: 0,
                  }}
                ><Ticket size={14} /> Tickets</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
