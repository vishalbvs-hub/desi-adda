"use client";
import { useRef, useEffect } from "react";
import { FONTS } from "@/lib/constants";

const fb = FONTS.body;

export default function ScrollingChips({ chips, onChipClick, variant = "light", noPause = false }) {
  const scrollRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let scrollPos = 0;
    const speed = 0.5;
    let paused = false;

    const animate = () => {
      if (!paused) {
        scrollPos += speed;
        if (scrollPos >= el.scrollWidth / 2) scrollPos = 0;
        el.scrollLeft = scrollPos;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    if (!noPause) {
      el.addEventListener("mouseenter", () => { paused = true; });
      el.addEventListener("mouseleave", () => { paused = false; });
      el.addEventListener("touchstart", () => { paused = true; });
      el.addEventListener("touchend", () => { setTimeout(() => { paused = false; }, 2000); });
    }

    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [noPause]);

  const isLight = variant === "light";
  const chipStyle = {
    padding: "7px 16px", borderRadius: "999px", fontSize: "12px", fontFamily: fb,
    fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
    background: isLight ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.04)",
    border: isLight ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(0,0,0,0.08)",
    color: isLight ? "white" : "#1A1A1A",
    transition: "background 0.2s",
  };
  const chipHoverBg = isLight ? "rgba(255,255,255,0.25)" : "rgba(45,36,32,0.12)";

  // Duplicate chips for seamless loop
  const allChips = [...chips, ...chips];

  return (
    <div
      ref={scrollRef}
      style={{
        display: "flex", gap: "8px", overflow: "hidden",
        scrollbarWidth: "none", maskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      {allChips.map((chip, i) => (
        <button
          key={`${chip.text}-${i}`}
          onClick={() => onChipClick(chip)}
          style={chipStyle}
          onMouseEnter={e => e.currentTarget.style.background = chipHoverBg}
          onMouseLeave={e => e.currentTarget.style.background = chipStyle.background}
        >
          {chip.emoji} {chip.text}
        </button>
      ))}
    </div>
  );
}
