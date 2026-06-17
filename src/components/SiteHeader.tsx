"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BraveLogo } from "./BraveLogo";
import { trip } from "@/content/trip";

const NAV = [
  { label: "Home", href: "/", match: (p: string) => p === "/" },
  { label: "Blog", href: "/blog", match: (p: string) => p.startsWith("/blog") },
  { label: "Photos", href: "/gallery", match: (p: string) => p.startsWith("/gallery") },
  { label: "Team", href: "/about", match: (p: string) => p.startsWith("/about") },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "rgba(255,255,255,.95)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div
        style={{
          maxWidth: 1152,
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <a
            href="https://brave.org"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Brave Church — brave.org"
            style={{ display: "flex", alignItems: "center", color: "var(--brand)", lineHeight: 0 }}
          >
            <BraveLogo height={20} />
          </a>
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: ".18em",
              color: "var(--mute)",
              textDecoration: "none",
            }}
          >
            {trip.title}
          </Link>
        </div>

        <nav style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {NAV.map((item) => {
            const active = item.match(pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="navlink"
                data-active={active}
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 13.5,
                  fontWeight: 600,
                  letterSpacing: ".06em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  color: active ? "var(--brand)" : "var(--ink)",
                }}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={trip.donateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-solid"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 20px",
              fontFamily: "var(--font-heading)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: ".06em",
              textTransform: "uppercase",
              border: "2px solid var(--brand)",
              background: "var(--brand)",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            Give
          </a>
        </nav>
      </div>
    </header>
  );
}
