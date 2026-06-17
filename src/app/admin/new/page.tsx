import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { createPost } from "../actions";

export const metadata: Metadata = { title: "New Post" };

const field = "w-full rounded-md border border-line-strong px-4 py-3 outline-none focus:border-brand";
const label = "block font-heading text-sm font-semibold uppercase tracking-wide text-ink";

export default function NewPostPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <Link
        href="/admin"
        className="font-heading text-sm font-semibold uppercase tracking-wide text-brand hover:text-brand-shade"
      >
        ← Dashboard
      </Link>
      <h1 className="mt-6 font-heading text-3xl font-bold text-ink">New Post</h1>

      <form action={createPost} className="mt-8 space-y-6">
        <div className="space-y-2">
          <label className={label} htmlFor="title">Title</label>
          <input id="title" name="title" required className={field} />
        </div>

        <div className="space-y-2">
          <label className={label} htmlFor="author_name">Author name</label>
          <input id="author_name" name="author_name" placeholder="Howick 2026 Team" className={field} />
        </div>

        <div className="space-y-2">
          <label className={label} htmlFor="slug">Slug (optional)</label>
          <input id="slug" name="slug" placeholder="auto-generated from title" className={field} />
        </div>

        <div className="space-y-2">
          <label className={label} htmlFor="excerpt">Excerpt (optional)</label>
          <input id="excerpt" name="excerpt" className={field} />
        </div>

        <div className="space-y-2">
          <label className={label} htmlFor="cover_image">Cover image URL (optional)</label>
          <input id="cover_image" name="cover_image" className={field} />
        </div>

        <div className="space-y-2">
          <label className={label} htmlFor="body">Body (Markdown)</label>
          <textarea id="body" name="body" required rows={14} className={field} />
        </div>

        <label className="flex items-center gap-3">
          <input type="checkbox" name="published" defaultChecked className="h-5 w-5 accent-brand" />
          <span className="font-heading text-sm font-semibold text-ink">Publish immediately</span>
        </label>

        <Button type="submit">Save Post</Button>
      </form>
    </div>
  );
}
