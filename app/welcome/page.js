"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FONTS, COLORS } from "@/lib/constants";

const CHECKLIST_ITEMS = [
  { label: "Find housing or a roommate", href: "/community?tab=groups&cat=Housing+%26+Roommates" },
  { label: "Find an Indian grocery nearby", href: "/groceries" },
  { label: "Register at a temple", href: "/temples" },
  { label: "Join your language community", href: "/community?tab=orgs" },
  { label: "Find an Indian doctor", href: "/professionals" },
  { label: "Find a CPA for tax filing", href: "/professionals" },
  { label: "Enroll kids in dance/music classes", href: "/kids" },
  { label: "Discover local restaurants", href: "/restaurants" },
  { label: "Find upcoming community events", href: "/community?tab=events" },
  { label: "Join WhatsApp/Facebook groups", href: "/community?tab=groups" },
];

const STORAGE_KEY = "adda_welcome_checklist";

function loadChecked() {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveChecked(checked) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  } catch {}
}

export default function WelcomePage() {
  const [checked, setChecked] = useState({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setChecked(loadChecked());
    setMounted(true);
  }, []);

  function toggle(index) {
    const next = { ...checked, [index]: !checked[index] };
    setChecked(next);
    saveChecked(next);
  }

  const completedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: COLORS.bg,
        fontFamily: FONTS.body,
        padding: "40px 16px 80px",
      }}
    >
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: COLORS.text,
            margin: 0,
            fontFamily: FONTS.body,
          }}
        >
          Welcome to Metro Detroit
        </h1>

        <p
          style={{
            fontSize: 14,
            color: COLORS.textSecondary,
            margin: "8px 0 0",
            fontFamily: FONTS.body,
          }}
        >
          Everything you need to get settled, in one place.
        </p>

        {mounted && (
          <p
            style={{
              fontSize: 13,
              color: COLORS.textSecondary,
              margin: "24px 0 16px",
              fontFamily: FONTS.body,
            }}
          >
            {completedCount} of {CHECKLIST_ITEMS.length} completed
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {CHECKLIST_ITEMS.map((item, i) => {
            const isChecked = !!checked[i];

            return (
              <Link
                key={i}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  toggle(i);
                  window.location.href = item.href;
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 16px",
                  backgroundColor: COLORS.surface,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 8,
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "border-color 0.15s",
                }}
              >
                {/* Checkbox */}
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 4,
                    border: isChecked
                      ? `2px solid ${COLORS.primary}`
                      : `2px solid ${COLORS.border}`,
                    backgroundColor: isChecked ? COLORS.primary : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.15s",
                  }}
                >
                  {isChecked && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 7L6 10L11 4"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>

                {/* Label */}
                <span
                  style={{
                    flex: 1,
                    fontSize: 15,
                    fontFamily: FONTS.body,
                    color: isChecked ? COLORS.textSecondary : COLORS.text,
                    textDecoration: isChecked ? "line-through" : "none",
                    lineHeight: 1.4,
                  }}
                >
                  {item.label}
                </span>

                {/* Arrow */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ flexShrink: 0 }}
                >
                  <path
                    d="M6 4L10 8L6 12"
                    stroke={COLORS.textSecondary}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
