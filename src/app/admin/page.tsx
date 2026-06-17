import type { Metadata } from "next";
import { getAllPostsForAdmin } from "@/lib/data/posts";
import { Button } from "@/components/Button";
import { signOut } from "./actions";

export const metadata: Metadata = { title: "Team Dashboard" };

export default async function AdminPage() {
  const posts = await getAllPostsForAdmin();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-ink">Team Dashboard</h1>
          <p className="mt-1 text-gray-600">Write updates and manage posts.</p>
        </div>
        <form action={signOut}>
          <button className="font-heading text-sm font-semibold uppercase tracking-wide text-mute hover:text-brand">
            Sign out
          </button>
        </form>
      </div>

      <div className="mt-8">
        <Button href="/admin/new">+ New Post</Button>
      </div>

      <ul className="mt-10 divide-y divide-line">
        {posts.length === 0 && (
          <li className="py-8 text-mute">No posts yet. Write your first update.</li>
        )}
        {posts.map((post) => (
          <li key={post.id} className="flex items-center justify-between gap-4 py-5">
            <div>
              <p className="font-heading font-semibold text-ink">{post.title}</p>
              <p className="text-sm text-mute">/{post.slug}</p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                post.published ? "bg-brand text-white" : "bg-line text-gray-700"
              }`}
            >
              {post.published ? "Published" : "Draft"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
