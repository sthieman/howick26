"use client";

import { createClient } from "@/lib/supabase/client";
import { SUPABASE_URL } from "@/lib/supabase/config";

const BUCKET = "gallery";

/** Public URL for an object path inside the gallery bucket. */
export function publicUrl(path: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
}

function ext(file: File): string {
  const m = /\.([a-z0-9]+)$/i.exec(file.name);
  return (m?.[1] || "jpg").toLowerCase();
}

/** Random-ish path within a folder, stable enough without Math.random in scripts. */
function keyFor(folder: string, file: File): string {
  const stamp = Date.now().toString(36);
  const rand = (crypto.randomUUID?.() ?? `${stamp}`).replace(/-/g, "").slice(0, 8);
  return `${folder}/${stamp}-${rand}.${ext(file)}`;
}

/**
 * Upload an image to the gallery bucket under `folder/`. Returns the storage
 * path and its public URL. Used by the admin (covers, team photos, gallery,
 * inline post images) — runs as the authenticated shared team session.
 */
export async function uploadImage(
  file: File,
  folder: "gallery" | "covers" | "team" | "inline"
): Promise<{ path: string; url: string }> {
  const supabase = createClient();
  const path = keyFor(folder, file);
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false, contentType: file.type });
  if (error) throw new Error(error.message);
  return { path, url: publicUrl(path) };
}

/** Delete an object by storage path (best-effort). */
export async function deleteImage(path: string): Promise<void> {
  const supabase = createClient();
  await supabase.storage.from(BUCKET).remove([path]);
}
