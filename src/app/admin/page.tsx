import Link from "next/link";
import type { Metadata } from "next";
import { getAllPostsForAdmin } from "@/lib/data/posts";
import { getGalleryPhotos } from "@/lib/data/gallery";
import { daysToDeparture } from "@/content/trip";
import { AdminHeader } from "@/components/admin/AdminHeader";

export const metadata: Metadata = { title: "Dashboard" };

const statCard = { background: "#fff", border: "1px solid var(--line)", padding: 22 } as const;
const statValue = { fontFamily: "var(--font-display)", fontSize: 42, fontWeight: 700, color: "var(--brand)", lineHeight: 1 } as const;
const statLabel = { fontFamily: "var(--font-heading)", fontSize: 12, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" as const, color: "var(--gray-600)", marginTop: 8 };

export default async function AdminDashboard() {
  const [posts, photos] = await Promise.all([getAllPostsForAdmin(), getGalleryPhotos()]);
  const published = posts.filter((p) => p.published).length;
  const countdown = daysToDeparture();

  const stats = [
    { value: posts.length, label: "Total posts" },
    { value: published, label: "Published" },
    { value: photos.length, label: "Photos" },
    { value: countdown, label: "Days to trip" },
  ];

  return (
    <>
      <AdminHeader title="Dashboard" />
      <div style={{ padding: 32, flex: 1 }}>
        <div className="stat-grid" style={{ display: "grid", gap: 18, marginBottom: 28 }}>
          {stats.map((s) => (
            <div key={s.label} style={statCard}>
              <div style={statValue}>{s.value}</div>
              <div style={statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#fff", border: "1px solid var(--line)", padding: 26, marginBottom: 24 }}>
          <div style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--gray-600)", marginBottom: 16 }}>Quick actions</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/admin/posts/new" style={{ padding: "12px 22px", fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase", border: "2px solid var(--brand)", background: "var(--brand)", color: "#fff", textDecoration: "none" }}>Write a post</Link>
            <Link href="/admin/photos" className="btn-ghost-brand" style={{ padding: "12px 22px", fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase", border: "2px solid var(--brand)", background: "transparent", color: "var(--brand)", textDecoration: "none" }}>Upload photos</Link>
            <Link href="/admin/team" style={{ padding: "12px 22px", fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase", border: "2px solid var(--line-strong)", background: "#fff", color: "var(--ink)", textDecoration: "none" }}>Edit team</Link>
          </div>
        </div>

        <div style={{ background: "#fff", border: "1px solid var(--line)", padding: 26 }}>
          <div style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--gray-600)", marginBottom: 6 }}>Trip countdown</div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--gray-700)" }}>
            Departure: July 5, 2026 · <strong style={{ color: "var(--brand)" }}>{countdown} days</strong> to go. Keep the blog warm with updates and prayer requests.
          </div>
        </div>
      </div>
    </>
  );
}
