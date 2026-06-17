"use client";

import { useEffect, useState } from "react";
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

const linkBase = {
  fontFamily: "var(--font-heading)",
  fontWeight: 600,
  letterSpacing: ".06em",
  textTransform: "uppercase" as const,
  textDecoration: "none",
};

const giveStyle = {
  ...linkBase,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  border: "2px solid var(--brand)",
  background: "var(--brand)",
  color: "#fff",
};

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

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
      <div style={{ maxWidth: 1152, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
          <a href="https://brave.org" target="_blank" rel="noopener noreferrer" aria-label="Brave Church — brave.org" style={{ display: "flex", alignItems: "center", color: "var(--brand)", lineHeight: 0 }}>
            <BraveLogo height={20} />
          </a>
          <Link href="/" style={{ ...linkBase, fontSize: 11, fontWeight: 700, letterSpacing: ".18em", color: "var(--mute)", whiteSpace: "nowrap" }}>
            {trip.title}
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="nav-desktop" style={{ alignItems: "center", gap: 28 }}>
          {NAV.map((item) => {
            const active = item.match(pathname);
            return (
              <Link key={item.href} href={item.href} className="navlink" data-active={active} style={{ ...linkBase, fontSize: 13.5, color: active ? "var(--brand)" : "var(--ink)" }}>
                {item.label}
              </Link>
            );
          })}
          <a href={trip.donateUrl} target="_blank" rel="noopener noreferrer" className="btn-solid" style={{ ...giveStyle, padding: "10px 20px", fontSize: 13 }}>Give</a>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="nav-mobile-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 6, color: "var(--ink)", flex: "none" }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            {open ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown panel */}
      {open && (
        <nav className="nav-mobile-panel" style={{ borderTop: "1px solid var(--line)", background: "var(--paper)", padding: "8px 24px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
          {NAV.map((item) => {
            const active = item.match(pathname);
            return (
              <Link key={item.href} href={item.href} style={{ ...linkBase, fontSize: 15, color: active ? "var(--brand)" : "var(--ink)", padding: "12px 0", borderBottom: "1px solid var(--line)" }}>
                {item.label}
              </Link>
            );
          })}
          <a href={trip.donateUrl} target="_blank" rel="noopener noreferrer" style={{ ...giveStyle, padding: "13px 20px", fontSize: 14, marginTop: 12 }}>Give</a>
        </nav>
      )}
    </header>
  );
}
