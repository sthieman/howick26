import Link from "next/link";
import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/data/posts";

export const metadata: Metadata = { title: "Blog" };

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogIndex() {
  const posts = await getPublishedPosts();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="font-display text-sm font-medium uppercase tracking-[0.25em] text-brand">
        Howick 2026
      </p>
      <h1 className="mt-2 font-heading text-4xl font-bold text-ink sm:text-5xl">The Blog</h1>
      <p className="mt-4 text-lg text-gray-600">
        Updates from the team as the trip unfolds.
      </p>

      {posts.length === 0 ? (
        <p className="mt-16 rounded-lg bg-paper-soft p-8 text-center text-mute">
          No posts yet. Check back soon — the team will be sharing updates here.
        </p>
      ) : (
        <ul className="mt-12 divide-y divide-line">
          {posts.map((post) => (
            <li key={post.id} className="py-8">
              <Link href={`/blog/${post.slug}`} className="group block">
                <time className="text-sm font-semibold uppercase tracking-wide text-mute">
                  {formatDate(post.published_at)}
                </time>
                <h2 className="mt-1 font-heading text-2xl font-bold text-ink transition-colors group-hover:text-brand">
                  {post.title}
                </h2>
                {post.excerpt && <p className="mt-2 text-gray-700">{post.excerpt}</p>}
                <span className="mt-3 inline-block font-heading text-sm font-semibold uppercase tracking-wide text-brand">
                  Read more →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
