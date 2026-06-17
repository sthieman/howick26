import "server-only";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { Post } from "@/lib/types";

/** Published posts, newest first. Empty array until Supabase is configured. */
export async function getPublishedPosts(): Promise<Post[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (error) {
    console.error("getPublishedPosts:", error.message);
    return [];
  }
  return data ?? [];
}

/** A single published post by slug, or null. */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) {
    console.error("getPostBySlug:", error.message);
    return null;
  }
  return data;
}

/** All posts incl. drafts — for the team admin list (requires auth via RLS). */
export async function getAllPostsForAdmin(): Promise<Post[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("getAllPostsForAdmin:", error.message);
    return [];
  }
  return data ?? [];
}
