"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Send, Star, MessageSquare } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";

const ff = FONTS.heading;
const fb = FONTS.body;
const SAFFRON = "#E8A317";

export default function AskAdda() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, chatLoading]);

  useEffect(() => {
    if (chatOpen) { document.body.style.overflow = "hidden"; }
    else { document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [chatOpen]);

  const sendChat = async (msg) => {
    const q = msg.trim();
    if (!q) return;
    setChatMessages(prev => [...prev, { role: "user", content: q, listings: [] }]);
    setChatLoading(true);
    setChatInput("");
    try {
      const history = chatMessages.length > 0
        ? chatMessages.map(m => ({ role: m.role, content: m.content }))
        : null;
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, history }),
      });
      const data = await res.json();
      setChatMessages(prev => [...prev, { role: "assistant", content: data.response, listings: data.listings || [] }]);
    } catch {
      setChatMessages(prev => [...prev, { role: "assistant", content: "Something went wrong. Please try again.", listings: [] }]);
    }
    setChatLoading(false);
  };

  return (
    <>
      {/* Floating Ask Adda Button */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          style={{
            position: "fixed", bottom: "24px", right: "24px", zIndex: 9000,
            width: "56px", height: "56px", borderRadius: "50%",
            background: SAFFRON, border: "none", cursor: "pointer",
            boxShadow: "0 4px 20px rgba(232,163,23,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(232,163,23,0.5)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(232,163,23,0.4)"; }}
          title="Ask Adda"
        >
          <MessageSquare size={24} color="white" fill="white" />
        </button>
      )}

      {/* Chat Overlay */}
      <style>{`
        @keyframes askPulse { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes chatSlideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes chatOverlayIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
      {chatOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
          animation: "chatOverlayIn 0.2s ease",
        }} onClick={e => { if (e.target === e.currentTarget) { setChatOpen(false); setChatMessages([]); } }}>
          <div style={{
            width: "min(660px, 95vw)", maxHeight: "min(78vh, 700px)", display: "flex", flexDirection: "column",
            background: "#FFFBF5", borderRadius: "20px", overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.25)", animation: "chatSlideIn 0.3s ease",
          }}>
            {/* Header */}
            <div style={{ background: "#2D2420", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: ff, fontSize: "18px", fontWeight: 700, color: "white", display: "flex", alignItems: "center", gap: "8px" }}>
                {"\u2728"} Ask Adda
              </span>
              <button onClick={() => { setChatOpen(false); setChatMessages([]); }} style={{
                background: "none", border: "none", color: "rgba(255,255,255,0.7)", fontSize: "20px", cursor: "pointer", padding: "4px 8px", lineHeight: 1,
              }}>{"\u2715"}</button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
              {chatMessages.length === 0 && !chatLoading && (
                <div style={{ textAlign: "center", padding: "30px 0", color: "#8A7968" }}>
                  <p style={{ fontFamily: ff, fontSize: "16px", fontWeight: 600, margin: "0 0 4px" }}>Hi! I&apos;m your desi directory concierge.</p>
                  <p style={{ fontSize: "13px" }}>Ask me anything — &ldquo;best biryani in Troy&rdquo;, &ldquo;Telugu temples near me&rdquo;, &ldquo;new Telugu movies on Netflix&rdquo;...</p>
                </div>
              )}
              {chatMessages.map((msg, i) => (
                <div key={i} style={{
                  display: "flex", flexDirection: "column",
                  alignItems: msg.role === "user" ? "flex-end" : "flex-start",
                  animation: "chatSlideIn 0.3s ease",
                }}>
                  <div style={{
                    maxWidth: "85%", padding: "12px 16px", borderRadius: "18px",
                    background: msg.role === "user" ? SAFFRON : "white",
                    color: msg.role === "user" ? "white" : "#2D2420",
                    border: msg.role === "user" ? "none" : "1px solid #EDE6DE",
                    fontSize: "14px", lineHeight: 1.6, whiteSpace: "pre-line",
                    borderBottomRightRadius: msg.role === "user" ? "6px" : "18px",
                    borderBottomLeftRadius: msg.role === "assistant" ? "6px" : "18px",
                  }}
                    dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }}
                  />
                  {msg.role === "assistant" && msg.listings?.length > 0 && (
                    <div style={{ display: "flex", gap: "8px", overflowX: "auto", scrollbarWidth: "none", padding: "10px 0 2px", maxWidth: "85%" }}>
                      {msg.listings.map((l, j) => {
                        const catSlug = l._table === "restaurants" ? "food" : l._table === "temples" ? "religious" : l._table === "groceries" ? "grocery" : l._table === "wedding_vendors" ? "weddings" : l._table === "event_halls" ? "event-halls" : l._table === "kids" ? "family" : l._table === "health_wellness" ? "wellness" : l._table === "beauty_brands" ? "beauty" : l._table === "community_networking" ? "community" : "food";
                        const base = l._table === "professionals" ? "/professionals" : `/category/${catSlug}`;
                        return (
                          <Link key={`${l._table}-${l.id}-${j}`} href={`${base}?q=${encodeURIComponent(l.name)}`}
                            onClick={() => { setChatOpen(false); setChatMessages([]); }}
                            style={{
                              flexShrink: 0, width: "180px", padding: "10px 12px", borderRadius: "12px",
                              background: "white", border: "1px solid #EDE6DE", borderLeft: `3px solid ${SAFFRON}`,
                              textDecoration: "none", color: "inherit", transition: "box-shadow 0.2s",
                            }}
                            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 3px 10px rgba(0,0,0,0.06)"}
                            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                          >
                            <div style={{ fontFamily: ff, fontSize: "12px", fontWeight: 600, margin: "0 0 3px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.name}</div>
                            <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", color: "#8A7968" }}>
                              <span style={{ padding: "1px 5px", borderRadius: "999px", background: `${SAFFRON}15`, color: SAFFRON, fontWeight: 600 }}>{l._category}</span>
                              {l.rating && <span><Star size={9} fill={SAFFRON} color={SAFFRON} style={{ display: "inline", verticalAlign: "middle" }} /> {l.rating}</span>}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
              {chatLoading && (
                <div style={{ display: "flex", alignItems: "flex-start", animation: "chatSlideIn 0.3s ease" }}>
                  <div style={{ padding: "14px 18px", borderRadius: "18px 18px 18px 6px", background: "white", border: "1px solid #EDE6DE", display: "flex", gap: "5px", alignItems: "center" }}>
                    {[0, 1, 2].map(i => (
                      <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: SAFFRON, animation: `askPulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={e => { e.preventDefault(); sendChat(chatInput); }} style={{
              padding: "12px 16px", borderTop: "1px solid #EDE6DE", background: "white",
              display: "flex", gap: "8px",
            }}>
              <input
                value={chatInput} onChange={e => setChatInput(e.target.value)}
                placeholder="Ask me anything..."
                autoFocus
                style={{
                  flex: 1, padding: "12px 16px", borderRadius: "12px", border: "1px solid #E0D8CF",
                  fontSize: "14px", fontFamily: fb, outline: "none", background: "#FFFBF5",
                }}
              />
              <button type="submit" disabled={chatLoading} style={{
                padding: "10px 18px", borderRadius: "12px", background: chatLoading ? "#ccc" : SAFFRON,
                color: "white", border: "none", fontFamily: fb, fontWeight: 600, fontSize: "13px",
                cursor: chatLoading ? "not-allowed" : "pointer",
              }}>
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
