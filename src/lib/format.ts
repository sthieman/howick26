import type { Post } from "@/lib/types";

/** "Jun 21, 2026" */
export function formatDate(iso: string | null): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

/** Strip tags to plain text (for excerpts + reading time). */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Rough reading time in minutes (≈200 wpm), min 1. */
export function readingMinutes(html: string): number {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Fallback gradient tones for cards/heroes without a cover image. */
const TONES = [
  "linear-gradient(135deg,#aa1f23,#5e1416)", // brand
  "linear-gradient(135deg,#3a3433,#141312)", // ink
  "linear-gradient(135deg,#7c7775,#3a3735)", // gray
];

/** Deterministic tone for a post lacking a cover (varies by category). */
export function toneFor(key: string): string {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return TONES[h % TONES.length];
}

/** CSS background for a post card/hero: the cover image if set, else a tone. */
export function cardBackground(post: Pick<Post, "cover_image" | "category">): string {
  if (post.cover_image) {
    return `center/cover no-repeat url("${post.cover_image}")`;
  }
  return toneFor(post.category || "Update");
}

/** Excerpt fallback derived from the body when none was written. */
export function excerptOf(post: Pick<Post, "excerpt" | "body">): string {
  const e = (post.excerpt ?? "").trim();
  if (e) return e;
  const text = stripHtml(post.body);
  return text.length > 160 ? text.slice(0, 157).trimEnd() + "…" : text;
}
