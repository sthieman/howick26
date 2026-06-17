"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { uploadImage } from "@/lib/storage";
import { useToast } from "./Toast";

/* eslint-disable @next/next/no-img-element */

export function TeamPhotoUploader({ initial }: { initial: string | null }) {
  const { node: toast, show } = useToast();
  const [photo, setPhoto] = useState<string | null>(initial);
  const [busy, setBusy] = useState(false);

  async function save(url: string | null) {
    if (!isSupabaseConfigured()) return;
    setPhoto(url);
    const { error } = await createClient()
      .from("site_settings")
      .update({ team_photo: url, updated_at: new Date().toISOString() })
      .eq("id", 1);
    if (error) show("Could not save");
    else show(url ? "Group photo updated" : "Group photo removed");
  }

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f || !isSupabaseConfigured()) return;
    setBusy(true);
    try {
      const { url } = await uploadImage(f, "hero");
      await save(url);
    } catch {
      show("Upload failed");
    }
    setBusy(false);
  }

  return (
    <div style={{ background: "#fff", border: "1px solid var(--line)", padding: 24, marginBottom: 24 }}>
      <div style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--gray-600)", marginBottom: 4 }}>Home hero — group photo</div>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "var(--gray-600)", margin: "0 0 16px" }}>
        Shown on the home page in the &ldquo;The ones being sent — Meet the team&rdquo; reveal. A wide landscape photo of the whole team works best.
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
        <div style={{ width: 240, aspectRatio: "16 / 9", background: "var(--paper-soft)", border: "1px dashed var(--line-strong)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
          {photo ? (
            <img src={photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--mute)" }}>No photo yet</span>
          )}
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <label style={{ fontFamily: "var(--font-heading)", fontSize: 12, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase", color: "#fff", cursor: busy ? "wait" : "pointer", border: "2px solid var(--brand)", background: "var(--brand)", padding: "10px 18px", opacity: busy ? 0.7 : 1 }}>
            {busy ? "Uploading…" : photo ? "Replace photo" : "Upload group photo"}
            <input type="file" accept="image/*" onChange={onUpload} style={{ display: "none" }} disabled={busy} />
          </label>
          {photo && (
            <button onClick={() => save(null)} style={{ fontFamily: "var(--font-heading)", fontSize: 12, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--gray-700)", background: "#fff", border: "2px solid var(--line-strong)", padding: "10px 18px", cursor: "pointer" }}>Remove</button>
          )}
        </div>
      </div>
      {toast}
    </div>
  );
}
