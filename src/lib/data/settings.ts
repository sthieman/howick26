import "server-only";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { SiteSettings } from "@/lib/types";

/** The single site_settings row, or null when unconfigured/empty. */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  if (error) {
    console.error("getSiteSettings:", error.message);
    return null;
  }
  return data;
}
