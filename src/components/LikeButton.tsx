"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getVisitorId } from "@/lib/visitor";

export function LikeButton({
  postId,
  initialCount,
}: {
  postId: string;
  initialCount: number;
}) {
  const configured = isSupabaseConfigured();
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);
  const [pending, setPending] = useState(false);

  // On mount, find out whether this visitor already liked the post.
  useEffect(() => {
    if (!configured) return;
    const visitorId = getVisitorId();
    const supabase = createClient();
    supabase
      .from("likes")
      .select("post_id", { head: true, count: "exact" })
      .eq("post_id", postId)
      .eq("visitor_id", visitorId)
      .then(({ count }) => setLiked((count ?? 0) > 0));
  }, [configured, postId]);

  async function toggle() {
    if (!configured || pending) return;
    setPending(true);
    const supabase = createClient();
    const visitorId = getVisitorId();

    // Optimistic.
    const next = !liked;
    setLiked(next);
    setCount((c) => c + (next ? 1 : -1));

    const { error } = next
      ? await supabase.from("likes").insert({ post_id: postId, visitor_id: visitorId })
      : await supabase
          .from("likes")
          .delete()
          .eq("post_id", postId)
          .eq("visitor_id", visitorId);

    if (error) {
      // Roll back on failure.
      setLiked(!next);
      setCount((c) => c + (next ? -1 : 1));
      console.error("like toggle:", error.message);
    }
    setPending(false);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={!configured || pending}
      aria-pressed={liked}
      className={`inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 font-heading text-sm font-semibold uppercase tracking-wide transition-colors duration-200 disabled:cursor-not-allowed ${
        liked
          ? "border-brand bg-brand text-white"
          : "border-line-strong bg-paper text-ink hover:border-brand hover:text-brand"
      }`}
      title={configured ? undefined : "Connect Supabase to enable likes"}
    >
      <span aria-hidden>{liked ? "♥" : "♡"}</span>
      <span>{count}</span>
    </button>
  );
}
