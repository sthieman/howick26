import Link from "next/link";
import { trip } from "@/content/trip";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Photos", href: "/gallery" },
  { label: "Team", href: "/about" },
];

export function SiteFooter() {
  return (
    <footer style={{ background: "var(--ink)", color: "var(--paper)" }}>
      <div
        style={{
          maxWidth: 1152,
          margin: "0 auto",
          padding: "56px 24px",
          display: "flex",
          flexWrap: "wrap",
          gap: 32,
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div style={{ maxWidth: "34ch" }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 24,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "-.01em",
            }}
          >
            {trip.title}
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.6, color: "var(--line-strong)", margin: "10px 0 0" }}>
            {trip.church} · {trip.location}
            <br />
            {trip.dates}
          </p>
        </div>
        <nav style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: ".06em",
                textTransform: "uppercase",
                color: "var(--paper)",
                textDecoration: "none",
              }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={trip.donateUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: ".06em",
              textTransform: "uppercase",
              color: "var(--brand-tint)",
              textDecoration: "none",
            }}
          >
            Give
          </a>
        </nav>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,.1)" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto", padding: "18px 24px", fontFamily: "var(--font-body)", fontSize: 12.5, color: "var(--mute)" }}>
          Following the {trip.title} mission team to South Africa.
        </div>
      </div>
    </footer>
  );
}
