"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Post } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { formatDate } from "@/lib/format";
import { useToast } from "./Toast";

const th = { padding: "14px 16px", fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" as const, color: "var(--gray-600)" };

export function PostsTable({ posts: initial }: { posts: Post[] }) {
  const router = useRouter();
  const { node: toast, show } = useToast();
  const [posts, setPosts] = useState(initial);

  async function remove(id: string) {
    if (!isSupabaseConfigured()) return;
    if (!confirm("Delete this post? This can't be undone.")) return;
    setPosts((p) => p.filter((x) => x.id !== id));
    const { error } = await createClient().from("posts").delete().eq("id", id);
    if (error) {
      show("Could not delete");
      setPosts(initial);
    } else {
      show("Post deleted");
      router.refresh();
    }
  }

  return (
    <div style={{ background: "#fff", border: "1px solid var(--line)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-body)" }}>
        <thead>
          <tr style={{ background: "var(--paper-soft)", textAlign: "left" }}>
            <th style={{ ...th, padding: "14px 20px" }}>Title</th>
            <th style={th}>Author</th>
            <th style={th}>Category</th>
            <th style={th}>Status</th>
            <th style={th}>Date</th>
            <th style={{ ...th, padding: "14px 20px", textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.id} style={{ borderTop: "1px solid var(--line)" }}>
              <td style={{ padding: "16px 20px", fontFamily: "var(--font-heading)", fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>{p.title}</td>
              <td style={{ padding: "16px", fontSize: 14, color: "var(--gray-700)" }}>{p.author_name}</td>
              <td style={{ padding: "16px" }}>
                <span style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--gray-700)", background: "var(--paper-soft)", padding: "4px 10px" }}>{p.category}</span>
              </td>
              <td style={{ padding: "16px" }}>
                <span style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: p.published ? "#1f8a5b" : "var(--gray-600)", background: p.published ? "rgba(31,138,91,.12)" : "var(--paper-soft)", padding: "4px 10px" }}>{p.published ? "Published" : "Draft"}</span>
              </td>
              <td style={{ padding: "16px", fontSize: 13.5, color: "var(--gray-600)" }}>{formatDate(p.published_at ?? p.created_at)}</td>
              <td style={{ padding: "16px 20px", textAlign: "right", whiteSpace: "nowrap" }}>
                <Link href={`/admin/posts/${p.id}/edit`} style={{ fontFamily: "var(--font-heading)", fontSize: 12, fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--brand)", padding: "4px 8px", textDecoration: "none" }}>Edit</Link>
              <button onClick={() => remove(p.id)} style={{ fontFamily: "var(--font-heading)", fontSize: 12, fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--mute)", background: "none", border: "none", cursor: "pointer", padding: "4px 8px" }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {posts.length === 0 && (
        <div style={{ padding: "48px 20px", textAlign: "center", fontFamily: "var(--font-body)", color: "var(--gray-600)" }}>
          No posts yet. Click <strong>New post</strong> to write the first entry.
        </div>
      )}
      {toast}
    </div>
  );
}
