import "server-only";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { TeamMember } from "@/lib/types";

/** Team members in display order. Empty until Supabase is configured + seeded. */
export async function getTeamMembers(): Promise<TeamMember[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) {
    console.error("getTeamMembers:", error.message);
    return [];
  }
  return data ?? [];
}
