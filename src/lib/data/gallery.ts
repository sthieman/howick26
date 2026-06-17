import "server-only";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured, SUPABASE_URL } from "@/lib/supabase/config";
import type { GalleryPhoto } from "@/lib/types";

export type GalleryItem = GalleryPhoto & { url: string };

/** Gallery photos with resolved public URLs, in display order. */
export async function getGalleryPhotos(): Promise<GalleryItem[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery_photos")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) {
    console.error("getGalleryPhotos:", error.message);
    return [];
  }
  return (data ?? []).map((photo) => ({
    ...photo,
    url: galleryPublicUrl(photo.storage_path),
  }));
}

/** Public URL for an object in the `gallery` storage bucket. */
export function galleryPublicUrl(storagePath: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/gallery/${storagePath}`;
}
