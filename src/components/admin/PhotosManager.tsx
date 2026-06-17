"use client";

import { useState } from "react";
import type { GalleryItem } from "@/lib/data/gallery";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { uploadImage, deleteImage, publicUrl } from "@/lib/storage";
import { PHOTO_CATEGORIES } from "@/content/trip";
import { useToast } from "./Toast";

/* eslint-disable @next/next/no-img-element */

const th = { padding: "14px 16px", fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" as const, color: "var(--gray-600)" };

export function PhotosManager({ photos: initial }: { photos: GalleryItem[] }) {
  const { node: toast, show } = useToast();
  const [photos, setPhotos] = useState<GalleryItem[]>(initial);
  const [busy, setBusy] = useState(false);

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length || !isSupabaseConfigured()) return;
    setBusy(true);
    const supabase = createClient();
    const added: GalleryItem[] = [];
    let order = photos.length;
    for (const f of files) {
      try {
        const { path } = await uploadImage(f, "gallery");
        const { data, error } = await supabase
          .from("gallery_photos")
          .insert({ storage_path: path, caption: "", category: PHOTO_CATEGORIES[0], sort_order: order++ })
          .select("*")
          .single();
        if (!error && data) added.push({ ...data, url: publicUrl(path) });
      } catch {
        /* skip this file */
      }
    }
    setPhotos((p) => [...p, ...added]);
    setBusy(false);
    show(`${added.length} photo(s) added`);
  }

  async function patch(id: string, field: "caption" | "category", value: string) {
    setPhotos((p) => p.map((x) => (x.id === id ? { ...x, [field]: value } : x)));
    if (isSupabaseConfigured()) {
      await createClient().from("gallery_photos").update({ [field]: value }).eq("id", id);
    }
  }

  async function remove(item: GalleryItem) {
    if (!confirm("Delete this photo?")) return;
    setPhotos((p) => p.filter((x) => x.id !== item.id));
    if (isSupabaseConfigured()) {
      await createClient().from("gallery_photos").delete().eq("id", item.id);
      await deleteImage(item.storage_path);
    }
    show("Photo deleted");
  }

  return (
    <div>
      <div style={{ marginBottom: 18 }}>
        <label style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 22px", fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase", border: "2px solid var(--brand)", background: "var(--brand)", color: "#fff", cursor: busy ? "wait" : "pointer", opacity: busy ? 0.7 : 1 }}>
          {busy ? "Uploading…" : "+ Upload photos"}
          <input type="file" accept="image/*" multiple onChange={onUpload} style={{ display: "none" }} disabled={busy} />
        </label>
      </div>

      <div className="table-scroll" style={{ background: "#fff", border: "1px solid var(--line)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--paper-soft)", textAlign: "left" }}>
              <th style={{ ...th, padding: "14px 20px", width: 120 }}>Photo</th>
              <th style={th}>Caption</th>
              <th style={{ ...th, width: 180 }}>Category</th>
              <th style={{ ...th, padding: "14px 20px", textAlign: "right", width: 90 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {photos.map((ph) => (
              <tr key={ph.id} style={{ borderTop: "1px solid var(--line)" }}>
                <td style={{ padding: "12px 20px" }}>
                  <div style={{ width: 84, height: 56, background: "var(--paper-soft)", overflow: "hidden" }}>
                    <img src={ph.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <input className="ad-in" defaultValue={ph.caption ?? ""} placeholder="Describe this photo" onBlur={(e) => patch(ph.id, "caption", e.target.value)} />
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <select className="ad-in" value={ph.category} onChange={(e) => patch(ph.id, "category", e.target.value)}>
                    {PHOTO_CATEGORIES.map((c) => (<option key={c} value={c}>{c}</option>))}
                  </select>
                </td>
                <td style={{ padding: "12px 20px", textAlign: "right" }}>
                  <button onClick={() => remove(ph)} style={{ fontFamily: "var(--font-heading)", fontSize: 12, fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--mute)", background: "none", border: "none", cursor: "pointer" }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {photos.length === 0 && (
          <div style={{ padding: "48px 20px", textAlign: "center", fontFamily: "var(--font-body)", color: "var(--gray-600)" }}>
            No photos yet. Click <strong>Upload photos</strong> to add some from Howick.
          </div>
        )}
      </div>
      {toast}
    </div>
  );
}
