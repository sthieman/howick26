import "server-only";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { Comment } from "@/lib/types";

/** Comments for a post, oldest first. */
export async function getComments(postId: string): Promise<Comment[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });
  if (error) {
    console.error("getComments:", error.message);
    return [];
  }
  return data ?? [];
}
