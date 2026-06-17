import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostByIdForAdmin } from "@/lib/data/posts";
import { getTeamMembers } from "@/lib/data/team";
import { POST_CATEGORIES, teamFallback } from "@/content/trip";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { PostEditor } from "@/components/admin/PostEditor";

export const metadata: Metadata = { title: "Edit Post" };

type Params = { params: Promise<{ id: string }> };

export default async function EditPostPage({ params }: Params) {
  const { id } = await params;
  const [post, rows] = await Promise.all([getPostByIdForAdmin(id), getTeamMembers()]);
  if (!post) notFound();
  const authors = rows.length ? rows.map((m) => m.name) : teamFallback;

  return (
    <>
      <AdminHeader title="Edit Post" />
      <div style={{ padding: 32, flex: 1 }}>
        <PostEditor mode="edit" post={post} authors={authors} categories={POST_CATEGORIES} />
      </div>
    </>
  );
}
