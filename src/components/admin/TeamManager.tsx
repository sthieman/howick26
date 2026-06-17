"use client";

import { useState } from "react";
import type { TeamMember } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { uploadImage } from "@/lib/storage";
import { useToast } from "./Toast";

/* eslint-disable @next/next/no-img-element */

const th = { padding: "14px 16px", fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" as const, color: "var(--gray-600)" };

export function TeamManager({ team: initial }: { team: TeamMember[] }) {
  const { node: toast, show } = useToast();
  const [team, setTeam] = useState<TeamMember[]>(initial);

  async function patch(id: string, field: "name" | "bio" | "photo", value: string) {
    setTeam((t) => t.map((m) => (m.id === id ? { ...m, [field]: value } : m)));
    if (isSupabaseConfigured()) {
      await createClient().from("team_members").update({ [field]: value }).eq("id", id);
    }
  }

  async function onPhoto(id: string, e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f || !isSupabaseConfigured()) return;
    try {
      const { url } = await uploadImage(f, "team");
      await patch(id, "photo", url);
      show("Photo updated");
    } catch {
      show("Upload failed");
    }
  }

  async function add() {
    if (!isSupabaseConfigured()) return;
    const { data, error } = await createClient()
      .from("team_members")
      .insert({ name: "", bio: "", sort_order: team.length + 1 })
      .select("*")
      .single();
    if (!error && data) setTeam((t) => [...t, data]);
  }

  async function remove(m: TeamMember) {
    if (!confirm(`Remove ${m.name || "this member"}?`)) return;
    setTeam((t) => t.filter((x) => x.id !== m.id));
    if (isSupabaseConfigured()) await createClient().from("team_members").delete().eq("id", m.id);
    show("Member removed");
  }

  return (
    <div>
      <div className="table-scroll" style={{ background: "#fff", border: "1px solid var(--line)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--paper-soft)", textAlign: "left" }}>
              <th style={{ ...th, padding: "14px 20px", width: 90 }}>Photo</th>
              <th style={{ ...th, width: 200 }}>Name</th>
              <th style={{ ...th, padding: "14px 20px" }}>Bio</th>
              <th style={{ ...th, width: 70, textAlign: "right" }} />
            </tr>
          </thead>
          <tbody>
            {team.map((m) => (
              <tr key={m.id} style={{ borderTop: "1px solid var(--line)", verticalAlign: "top" }}>
                <td style={{ padding: "14px 20px" }}>
                  <label style={{ cursor: "pointer", display: "block" }}>
                    <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--paper-soft)", overflow: "hidden", border: "1px solid var(--line-strong)" }}>
                      {m.photo ? <img src={m.photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", fontSize: 18, color: "var(--mute)" }}>☻</span>}
                    </div>
                    <input type="file" accept="image/*" onChange={(e) => onPhoto(m.id, e)} style={{ display: "none" }} />
                  </label>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <input className="ad-in" defaultValue={m.name} placeholder="Name" onBlur={(e) => patch(m.id, "name", e.target.value)} />
                </td>
                <td style={{ padding: "14px 20px" }}>
                  <textarea className="ad-in" rows={2} defaultValue={m.bio} placeholder="Short bio for the team page" style={{ resize: "vertical", fontFamily: "var(--font-body)" }} onBlur={(e) => patch(m.id, "bio", e.target.value)} />
                </td>
                <td style={{ padding: "14px 16px", textAlign: "right" }}>
                  <button onClick={() => remove(m)} style={{ fontFamily: "var(--font-heading)", fontSize: 12, fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--mute)", background: "none", border: "none", cursor: "pointer" }}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 16 }}>
        <button onClick={add} className="btn-ghost-brand" style={{ padding: "11px 20px", fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase", border: "2px solid var(--brand)", background: "transparent", color: "var(--brand)", cursor: "pointer" }}>+ Add team member</button>
      </div>
      {toast}
    </div>
  );
}
