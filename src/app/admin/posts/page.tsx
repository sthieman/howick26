import Link from "next/link";
import type { Metadata } from "next";
import { getAllPostsForAdmin } from "@/lib/data/posts";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { PostsTable } from "@/components/admin/PostsTable";

export const metadata: Metadata = { title: "Blog Posts" };

export default async function AdminPostsPage() {
  const posts = await getAllPostsForAdmin();

  return (
    <>
      <AdminHeader
        title="Blog Posts"
        actions={
          <Link href="/admin/posts/new" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "11px 20px", fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase", border: "2px solid var(--brand)", background: "var(--brand)", color: "#fff", textDecoration: "none" }}>
            + New post
          </Link>
        }
      />
      <div style={{ padding: 32, flex: 1 }}>
        <PostsTable posts={posts} />
      </div>
    </>
  );
}
