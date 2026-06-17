import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getPublishedPosts } from "@/lib/data/posts";
import { getComments } from "@/lib/data/comments";
import { getLikeCount } from "@/lib/data/likes";
import { LikeButton } from "@/components/LikeButton";
import { CommentsSection } from "@/components/CommentsSection";
import { trip } from "@/content/trip";
import { formatDate, excerptOf, cardBackground } from "@/lib/format";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: excerptOf(post) || undefined };
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const [comments, likes, all] = await Promise.all([
    getComments(post.id),
    getLikeCount(post.id),
    getPublishedPosts(),
  ]);

  const idx = all.findIndex((p) => p.id === post.id);
  const next = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;

  return (
    <article className="how-fade">
      {/* Hero */}
      <section style={{ position: "relative", minHeight: "48vh", display: "flex", alignItems: "flex-end", background: cardBackground(post), overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(25,24,23,.15),rgba(25,24,23,.78))" }} />
        <div style={{ position: "relative", maxWidth: 820, margin: "0 auto", padding: "0 24px 56px", width: "100%" }}>
          <Link href="/blog" style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "#fff", textDecoration: "none", display: "inline-block", marginBottom: 22, opacity: 0.85 }}>← Back to blog</Link>
          <div style={{ fontFamily: "var(--font-heading)", fontSize: 12, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#fff", background: "var(--brand)", padding: "6px 12px", display: "inline-block", marginBottom: 18 }}>{post.category}</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", lineHeight: 0.98, letterSpacing: "-.01em", fontSize: "clamp(34px,5.5vw,66px)", color: "#fff", margin: 0 }}>{post.title}</h1>
          <div style={{ fontFamily: "var(--font-heading)", fontSize: 13.5, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase", color: "rgba(255,255,255,.85)", marginTop: 20 }}>{post.author_name} · {formatDate(post.published_at)}</div>
        </div>
      </section>

      {/* Body */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "clamp(40px,6vw,72px) 24px" }}>
        {post.excerpt?.trim() && (
          <p style={{ fontFamily: "var(--font-body)", fontSize: 21, lineHeight: 1.6, color: "var(--ink)", fontWeight: 600, margin: "0 0 32px" }}>{post.excerpt}</p>
        )}
        <div
          className="rich"
          style={{ fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.8, color: "var(--gray-700)" }}
          dangerouslySetInnerHTML={{ __html: post.body }}
        />

        {/* Walk with us */}
        <div style={{ marginTop: 48, padding: 32, background: "var(--paper-soft)", borderLeft: "4px solid var(--brand)" }}>
          <div style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--brand)", marginBottom: 10 }}>Walk with us</div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.6, color: "var(--gray-700)", margin: "0 0 18px" }}>Your prayers and giving are part of this story. Thank you for sending us.</p>
          <a href={trip.donateUrl} target="_blank" rel="noopener noreferrer" className="btn-solid" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 26px", fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", border: "2px solid var(--brand)", background: "var(--brand)", color: "#fff", textDecoration: "none" }}>Support the team</a>
        </div>

        {/* Likes + nav */}
        <div style={{ marginTop: 40, borderTop: "1px solid var(--line)", paddingTop: 28, display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
          <LikeButton postId={post.id} initialCount={likes} />
          {next ? (
            <Link href={`/blog/${next.slug}`} style={{ fontFamily: "var(--font-heading)", fontSize: 14, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--ink)", textDecoration: "none", textAlign: "right" }}>Next: {next.title} →</Link>
          ) : (
            <Link href="/blog" style={{ fontFamily: "var(--font-heading)", fontSize: 14, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--brand)", textDecoration: "none" }}>← All entries</Link>
          )}
        </div>

        <CommentsSection postId={post.id} initialComments={comments} />
      </div>
    </article>
  );
}
