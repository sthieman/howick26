"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BraveLogo } from "@/components/BraveLogo";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const NAV = [
  { label: "Dashboard", href: "/admin", icon: "◧", exact: true },
  { label: "Blog Posts", href: "/admin/posts", icon: "✎", exact: false },
  { label: "Photos", href: "/admin/photos", icon: "▥", exact: false },
  { label: "Team", href: "/admin/team", icon: "☻", exact: false },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Close the drawer whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  async function signOut() {
    if (isSupabaseConfigured()) await createClient().auth.signOut();
    router.push("/login");
    router.refresh();
  }

  // Shared inner content (brand + nav + footer) used by the desktop sidebar and
  // the mobile drawer.
  const inner = (
    <>
      <div className="admin-brand" style={{ padding: "22px 20px", borderBottom: "1px solid rgba(255,255,255,.1)", display: "flex", alignItems: "center", gap: 9, color: "var(--brand-tint)" }}>
        <BraveLogo height={20} />
        <span style={{ fontFamily: "var(--font-heading)", fontSize: 10, fontWeight: 700, letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(255,255,255,.45)" }}>Admin</span>
      </div>

      <nav style={{ padding: "14px 12px", display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
        {NAV.map((n) => {
          const active = n.exact ? pathname === n.href : pathname.startsWith(n.href);
          return (
            <Link key={n.href} href={n.href} className="ad-navx" style={{ background: active ? "var(--brand)" : "transparent", color: active ? "#fff" : "rgba(255,255,255,.72)", textDecoration: "none" }}>
              <span style={{ width: 18, textAlign: "center", fontSize: 16 }}>{n.icon}</span>
              {n.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: 16, borderTop: "1px solid rgba(255,255,255,.1)", display: "flex", flexDirection: "column", gap: 10 }}>
        <a href="/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-heading)", fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "rgba(255,255,255,.7)", textDecoration: "none" }}>↗ View live site</a>
        <button onClick={signOut} style={{ fontFamily: "var(--font-heading)", fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "rgba(255,255,255,.5)", cursor: "pointer", background: "none", border: "none", padding: 0, textAlign: "left" }}>Sign out</button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop: fixed sidebar */}
      <aside
        className="admin-sidebar-desktop"
        style={{ width: 248, flex: "none", background: "var(--ink-deep)", color: "#fff", flexDirection: "column", position: "sticky", top: 0, height: "100vh" }}
      >
        {inner}
      </aside>

      {/* Mobile: top bar with hamburger */}
      <div className="admin-mobilebar">
        <button type="button" aria-label="Open menu" onClick={() => setOpen(true)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 4, display: "inline-flex" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" />
          </svg>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--brand-tint)" }}>
          <BraveLogo height={16} />
          <span style={{ fontFamily: "var(--font-heading)", fontSize: 10, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(255,255,255,.5)" }}>Admin</span>
        </div>
      </div>

      {/* Mobile: slide-in drawer + overlay */}
      <div className={`admin-drawer-overlay${open ? " open" : ""}`} onClick={() => setOpen(false)} aria-hidden />
      <aside className={`admin-drawer${open ? " open" : ""}`}>
        <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} style={{ position: "absolute", top: 14, right: 14, background: "none", border: "none", color: "rgba(255,255,255,.7)", cursor: "pointer", fontSize: 24, lineHeight: 1, padding: 4 }}>×</button>
        {inner}
      </aside>
    </>
  );
}
