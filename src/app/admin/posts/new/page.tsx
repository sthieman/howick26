import type { Metadata } from "next";
import { getTeamMembers } from "@/lib/data/team";
import { POST_CATEGORIES, teamFallback } from "@/content/trip";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { PostEditor } from "@/components/admin/PostEditor";

export const metadata: Metadata = { title: "New Post" };

export default async function NewPostPage() {
  const rows = await getTeamMembers();
  const authors = rows.length ? rows.map((m) => m.name) : teamFallback;

  return (
    <>
      <AdminHeader title="New Post" />
      <div style={{ padding: 32, flex: 1 }}>
        <PostEditor mode="new" authors={authors} categories={POST_CATEGORIES} />
      </div>
    </>
  );
}
