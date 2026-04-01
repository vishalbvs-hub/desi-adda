import Link from "next/link";
import { FONTS, COLORS } from "@/lib/constants";

export const metadata = {
  title: "About Desi Adda",
  description:
    "Learn about Desi Adda — a free, community-maintained directory for the desi community in Metro Detroit.",
};

export default function AboutPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: COLORS.bg,
        fontFamily: FONTS.body,
        color: COLORS.text,
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
          backgroundColor: COLORS.surface,
          borderRadius: 12,
          border: `1px solid ${COLORS.border}`,
          padding: "40px 36px",
        }}
      >
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            fontFamily: FONTS.heading,
            marginTop: 0,
            marginBottom: 28,
          }}
        >
          About Desi Adda
        </h1>

        {/* Photo placeholder */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            backgroundColor: COLORS.border,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: COLORS.textSecondary,
            fontSize: 13,
            marginBottom: 28,
          }}
        >
          Photo coming soon
        </div>

        <p style={{ lineHeight: 1.7, marginBottom: 20, color: COLORS.text }}>
          Hi, I&rsquo;m Vishal. I built Desi Adda because I was tired of
          searching five different outdated websites and twenty WhatsApp groups
          just to find basic information about the desi community in Metro
          Detroit. Where&rsquo;s the best biryani? When&rsquo;s the next garba
          night? Who&rsquo;s a good Telugu-speaking pediatrician? This
          information existed, but it was scattered everywhere and nowhere at the
          same time.
        </p>

        <p style={{ lineHeight: 1.7, marginBottom: 20, color: COLORS.text }}>
          So I built the thing I wished existed. A single place where every desi
          business, temple, community organization, and event in Metro Detroit
          lives &mdash; with real photos, real reviews, and real information
          that&rsquo;s actually kept up to date.
        </p>

        <p style={{ lineHeight: 1.7, marginBottom: 32, color: COLORS.text }}>
          Desi Adda is free, community-maintained, and independent. No ads, no
          sponsors, no paywalls. Just useful information for our community.
        </p>

        {/* Contact */}
        <p
          style={{
            marginBottom: 8,
            color: COLORS.textSecondary,
            fontSize: 15,
          }}
        >
          Contact:{" "}
          <a
            href="mailto:hello@desiadda.com"
            style={{ color: COLORS.primary, textDecoration: "none" }}
          >
            hello@desiadda.com
          </a>
        </p>

        <p
          style={{
            lineHeight: 1.7,
            marginBottom: 20,
            color: COLORS.textSecondary,
            fontSize: 15,
          }}
        >
          Want to help? Submit corrections, nominate a business for a spotlight,
          or add a WhatsApp group.
        </p>

        {/* Links */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Link
            href="/suggest"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              backgroundColor: COLORS.primary,
              color: "#FFFFFF",
              borderRadius: 8,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Suggest a business
          </Link>
          <Link
            href="/community"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              backgroundColor: COLORS.surface,
              color: COLORS.primary,
              borderRadius: 8,
              border: `1px solid ${COLORS.primary}`,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Submit a group
          </Link>
        </div>
      </div>
    </div>
  );
}
