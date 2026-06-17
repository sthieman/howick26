import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug } from "@/lib/data/posts";
import { getComments } from "@/lib/data/comments";
import { getLikeCount } from "@/lib/data/likes";
import { LikeButton } from "@/components/LikeButton";
import { CommentsSection } from "@/components/CommentsSection";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt ?? undefined };
}

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const [comments, likes] = await Promise.all([
    getComments(post.id),
    getLikeCount(post.id),
  ]);

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <Link
        href="/blog"
        className="font-heading text-sm font-semibold uppercase tracking-wide text-brand hover:text-brand-shade"
      >
        ← All posts
      </Link>

      <header className="mt-6">
        <time className="text-sm font-semibold uppercase tracking-wide text-mute">
          {formatDate(post.published_at)}
        </time>
        <h1 className="mt-2 font-heading text-4xl font-bold leading-tight text-ink sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-3 text-sm uppercase tracking-wide text-gray-600">
          By {post.author_name}
        </p>
      </header>

      {post.cover_image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.cover_image}
          alt=""
          className="mt-8 w-full rounded-lg object-cover"
        />
      )}

      {/* Markdown body rendered as prose paragraphs. /design-sync can swap in a
          full markdown renderer (e.g. react-markdown) for rich formatting. */}
      <div className="mt-10 space-y-5 text-lg leading-relaxed text-gray-700">
        {post.body
          .split(/\n{2,}/)
          .filter((p) => p.trim())
          .map((para, i) => (
            <p key={i} className="whitespace-pre-wrap">
              {para}
            </p>
          ))}
      </div>

      <div className="mt-12 flex items-center gap-4 border-t border-line pt-8">
        <LikeButton postId={post.id} initialCount={likes} />
        <span className="text-sm text-mute">Tap the heart to encourage the team.</span>
      </div>

      <CommentsSection postId={post.id} initialComments={comments} />
    </article>
  );
}
