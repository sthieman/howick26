"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { Comment } from "@/lib/types";
import { Button } from "./Button";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function CommentsSection({
  postId,
  initialComments,
}: {
  postId: string;
  initialComments: Comment[];
}) {
  const configured = isSupabaseConfigured();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!configured || pending) return;
    if (!name.trim() || !body.trim()) {
      setError("Please add your name and a comment.");
      return;
    }
    setPending(true);
    setError(null);

    const supabase = createClient();
    const { data, error } = await supabase
      .from("comments")
      .insert({ post_id: postId, author_name: name.trim(), body: body.trim() })
      .select("*")
      .single();

    if (error) {
      setError("Could not post your comment. Please try again.");
      console.error("add comment:", error.message);
    } else if (data) {
      setComments((c) => [...c, data]);
      setBody("");
    }
    setPending(false);
  }

  return (
    <section className="mt-16 border-t border-line pt-10">
      <h2 className="font-heading text-2xl font-bold text-ink">
        Comments {comments.length > 0 && <span className="text-mute">({comments.length})</span>}
      </h2>

      <ul className="mt-8 space-y-6">
        {comments.length === 0 && (
          <li className="text-mute">Be the first to leave an encouragement.</li>
        )}
        {comments.map((c) => (
          <li key={c.id} className="rounded-lg bg-paper-soft p-5">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-heading font-semibold text-ink">{c.author_name}</span>
              <time className="text-xs uppercase tracking-wide text-mute">
                {formatDate(c.created_at)}
              </time>
            </div>
            <p className="mt-2 whitespace-pre-wrap text-gray-700">{c.body}</p>
          </li>
        ))}
      </ul>

      <form onSubmit={submit} className="mt-10 space-y-4">
        <h3 className="font-heading text-lg font-semibold text-ink">Leave a comment</h3>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={80}
          disabled={!configured}
          className="w-full rounded-md border border-line-strong px-4 py-3 outline-none focus:border-brand"
        />
        <textarea
          placeholder="Share an encouragement…"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={4000}
          rows={4}
          disabled={!configured}
          className="w-full rounded-md border border-line-strong px-4 py-3 outline-none focus:border-brand"
        />
        {error && <p className="text-sm text-brand">{error}</p>}
        {!configured && (
          <p className="text-sm text-mute">Connect Supabase to enable comments.</p>
        )}
        <Button type="submit" disabled={!configured || pending}>
          {pending ? "Posting…" : "Post Comment"}
        </Button>
      </form>
    </section>
  );
}
