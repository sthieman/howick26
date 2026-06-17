import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/data/posts";
import { trip } from "@/content/trip";
import { BlogList } from "@/components/BlogList";

export const metadata: Metadata = {
  title: "Field Journal",
  description: `Updates from the Howick 2026 mission team in ${trip.location}.`,
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="how-fade">
      <section style={{ background: "var(--paper-soft)", borderBottom: "1px solid var(--line)", padding: "clamp(48px,7vw,88px) 0" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--brand)", marginBottom: 14 }}>The story as it unfolds</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", lineHeight: 0.95, letterSpacing: "-.01em", fontSize: "clamp(44px,7vw,92px)", margin: 0, color: "var(--ink)" }}>Field journal</h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.6, color: "var(--gray-600)", maxWidth: "52ch", margin: "20px 0 0" }}>Updates from the team in {trip.location}, the people, the partners, and the honest middle of it all.</p>
        </div>
      </section>

      <section style={{ maxWidth: 1152, margin: "0 auto", padding: "clamp(40px,5vw,64px) 24px" }}>
        {posts.length === 0 ? (
          <div style={{ border: "1px dashed var(--line-strong)", padding: "clamp(56px,9vw,110px) 24px", textAlign: "center", background: "var(--paper)", maxWidth: 640, margin: "0 auto" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px,4vw,44px)", fontWeight: 700, textTransform: "uppercase", color: "var(--ink)", lineHeight: 1 }}>No entries yet</div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.6, color: "var(--gray-600)", margin: "16px auto 0", maxWidth: "46ch" }}>This journal will fill with stories once the team is on the ground in Howick this July. Every word will be theirs. Until then, walk with us in prayer and giving.</p>
            <a href={trip.donateUrl} target="_blank" rel="noopener noreferrer" className="btn-solid" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 26, padding: "13px 26px", fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", border: "2px solid var(--brand)", background: "var(--brand)", color: "#fff", textDecoration: "none" }}>Support the team</a>
          </div>
        ) : (
          <BlogList posts={posts} />
        )}
      </section>
    </div>
  );
}
