"use client";

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

  async function signOut() {
    if (isSupabaseConfigured()) {
      await createClient().auth.signOut();
    }
    router.push("/login");
    router.refresh();
  }

  return (
    <aside
      style={{
        width: 248,
        flex: "none",
        background: "var(--ink-deep)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        height: "100vh",
      }}
    >
      <div style={{ padding: "22px 20px", borderBottom: "1px solid rgba(255,255,255,.1)", display: "flex", alignItems: "center", gap: 9, color: "var(--brand-tint)" }}>
        <BraveLogo height={20} />
        <span style={{ fontFamily: "var(--font-heading)", fontSize: 10, fontWeight: 700, letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(255,255,255,.45)" }}>Admin</span>
      </div>

      <nav style={{ padding: "14px 12px", display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
        {NAV.map((n) => {
          const active = n.exact ? pathname === n.href : pathname.startsWith(n.href);
          return (
            <Link
              key={n.href}
              href={n.href}
              className="ad-navx"
              style={{
                background: active ? "var(--brand)" : "transparent",
                color: active ? "#fff" : "rgba(255,255,255,.72)",
                textDecoration: "none",
              }}
            >
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
    </aside>
  );
}
