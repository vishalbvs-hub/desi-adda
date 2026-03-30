"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { FONTS, COLORS } from "@/lib/constants";
import ScrollingChips from "./ScrollingChips";

const fb = FONTS.body;
const SAFFRON = "#E8A317";

export default function InlineAskBar({ chips, placeholder }) {
  const [query, setQuery] = useState("");

  const triggerChat = (q) => {
    window.dispatchEvent(new CustomEvent("askadda", { detail: q }));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    triggerChat(query);
    setQuery("");
  };

  const handleChip = (chip) => {
    triggerChat(`${chip.emoji} ${chip.text}`);
  };

  return (
    <div style={{
      background: "white", borderBottom: "1px solid #EDE6DE",
      padding: "20px 20px 16px",
    }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <form onSubmit={handleSubmit} style={{ position: "relative", marginBottom: "12px" }}>
          <Search size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#A89888" }} />
          <input
            value={query} onChange={e => setQuery(e.target.value)}
            placeholder={placeholder || "Ask me anything..."}
            style={{
              width: "100%", padding: "13px 140px 13px 44px", borderRadius: "14px",
              border: "1px solid #EDE6DE", fontSize: "14px", fontFamily: fb,
              background: "#FFFBF5", boxSizing: "border-box", outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={e => e.target.style.borderColor = SAFFRON}
            onBlur={e => e.target.style.borderColor = "#EDE6DE"}
          />
          <button type="submit" style={{
            position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)",
            background: SAFFRON, color: "white", border: "none", borderRadius: "10px",
            padding: "9px 18px", fontFamily: fb, fontWeight: 600, fontSize: "13px", cursor: "pointer",
          }}>Ask Adda {"\u2728"}</button>
        </form>
        <ScrollingChips chips={chips} onChipClick={handleChip} variant="dark" />
      </div>
    </div>
  );
}
