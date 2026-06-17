"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Post } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { uploadImage } from "@/lib/storage";
import { useToast } from "./Toast";

/* eslint-disable @next/next/no-img-element */

function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 80) || "post"
  );
}

function exec(cmd: string, value?: string) {
  try {
    document.execCommand(cmd, false, value);
  } catch {
    /* execCommand is deprecated but still the simplest rich-text primitive */
  }
}

export function PostEditor({
  mode,
  post,
  authors,
  categories,
}: {
  mode: "new" | "edit";
  post?: Post;
  authors: string[];
  categories: readonly string[];
}) {
  const router = useRouter();
  const { node: toast, show } = useToast();
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState(post?.title ?? "");
  const [author, setAuthor] = useState(post?.author_name ?? authors[0] ?? "");
  const [category, setCategory] = useState(post?.category ?? categories[0] ?? "Update");
  const [status, setStatus] = useState<"Draft" | "Published">(post?.published ? "Published" : "Draft");
  const [date, setDate] = useState(
    (post?.published_at ?? post?.created_at ?? new Date().toISOString()).slice(0, 10)
  );
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [cover, setCover] = useState(post?.cover_image ?? "");

  // Load the body into the uncontrolled contenteditable once.
  useEffect(() => {
    if (editorRef.current) editorRef.current.innerHTML = post?.body ?? "";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onCover(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f || !isSupabaseConfigured()) return;
    try {
      const { url } = await uploadImage(f, "covers");
      setCover(url);
    } catch {
      show("Cover upload failed");
    }
  }

  async function onInlineImg(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f || !isSupabaseConfigured()) return;
    try {
      const { url } = await uploadImage(f, "inline");
      editorRef.current?.focus();
      exec("insertImage", url);
    } catch {
      show("Image upload failed");
    }
  }

  async function save(publish: boolean) {
    if (!isSupabaseConfigured()) {
      show("Connect Supabase to save");
      return;
    }
    if (saving) return;
    setSaving(true);

    const supabase = createClient();
    const body = editorRef.current?.innerHTML ?? "";
    const publishedAt = date ? new Date(date + "T12:00:00").toISOString() : new Date().toISOString();
    const row = {
      title: title.trim() || "Untitled",
      author_name: author || authors[0] || "Howick 2026 Team",
      category,
      excerpt: excerpt.trim() || null,
      cover_image: cover || null,
      body,
      published: publish,
      published_at: publish ? publishedAt : post?.published_at ?? null,
    };

    let error;
    if (mode === "edit" && post) {
      ({ error } = await supabase.from("posts").update(row).eq("id", post.id));
    } else {
      let slug = slugify(title);
      let res = await supabase.from("posts").insert({ ...row, slug });
      if (res.error && res.error.code === "23505") {
        slug = `${slug}-${Date.now().toString(36).slice(-4)}`;
        res = await supabase.from("posts").insert({ ...row, slug });
      }
      error = res.error;
    }

    setSaving(false);
    if (error) {
      show(`Save failed: ${error.message}`);
      return;
    }
    show(publish ? "Post published" : "Draft saved");
    router.push("/admin/posts");
    router.refresh();
  }

  const tbBtn = { } as const;

  return (
    <div style={{ maxWidth: 880 }}>
      <Link href="/admin/posts" style={{ fontFamily: "var(--font-heading)", fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--gray-600)", textDecoration: "none", display: "inline-block", marginBottom: 18 }}>← Back to posts</Link>

      <div style={{ background: "#fff", border: "1px solid var(--line)", padding: 30 }}>
        <label className="ad-lab">Post title</label>
        <input className="ad-in" placeholder="Give this update a headline" style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 700, padding: 13, marginBottom: 20 }} value={title} onChange={(e) => setTitle(e.target.value)} />

        <div className="editor-grid" style={{ display: "grid", gap: 14, marginBottom: 22 }}>
          <div>
            <label className="ad-lab">Author</label>
            <select className="ad-in" value={author} onChange={(e) => setAuthor(e.target.value)}>
              {authors.map((a) => (<option key={a} value={a}>{a}</option>))}
            </select>
          </div>
          <div>
            <label className="ad-lab">Category</label>
            <select className="ad-in" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => (<option key={c} value={c}>{c}</option>))}
            </select>
          </div>
          <div>
            <label className="ad-lab">Date</label>
            <input className="ad-in" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div>
            <label className="ad-lab">Status</label>
            <select className="ad-in" value={status} onChange={(e) => setStatus(e.target.value as "Draft" | "Published")}>
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>
        </div>

        <label className="ad-lab">Excerpt</label>
        <input className="ad-in" placeholder="One-line summary shown on the blog cards" style={{ marginBottom: 22 }} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />

        <label className="ad-lab">Cover image</label>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
          <div style={{ width: 120, height: 74, background: "var(--paper-soft)", border: "1px dashed var(--line-strong)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flex: "none" }}>
            {cover ? <img src={cover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontFamily: "var(--font-heading)", fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--mute)" }}>No cover</span>}
          </div>
          <label style={{ fontFamily: "var(--font-heading)", fontSize: 12, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--brand)", cursor: "pointer", border: "1.5px solid var(--brand)", padding: "9px 16px" }}>
            Upload cover
            <input type="file" accept="image/*" onChange={onCover} style={{ display: "none" }} />
          </label>
        </div>

        <label className="ad-lab">Body</label>
        <div style={{ border: "1px solid var(--line-strong)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", padding: 8, borderBottom: "1px solid var(--line)", background: "var(--paper-soft)" }}>
            <select className="ad-in" style={{ width: "auto", padding: "6px 8px", fontSize: 13 }} title="Text style" defaultValue="p" onChange={(e) => { exec("formatBlock", e.target.value); e.target.value = "p"; }}>
              <option value="p">Paragraph</option>
              <option value="h2">Heading</option>
              <option value="blockquote">Quote</option>
            </select>
            <select className="ad-in" style={{ width: "auto", padding: "6px 8px", fontSize: 13 }} title="Font" defaultValue="Open Sans" onChange={(e) => { exec("fontName", e.target.value); e.target.value = "Open Sans"; }}>
              <option value="Open Sans">Body font</option>
              <option value="Montserrat">Heading font</option>
              <option value="Oswald">Display font</option>
            </select>
            <span style={{ width: 1, height: 22, background: "var(--line-strong)", margin: "0 2px" }} />
            <button type="button" className="ad-tb" style={{ ...tbBtn, fontWeight: 700 }} onMouseDown={(e) => e.preventDefault()} onClick={() => exec("bold")}>B</button>
            <button type="button" className="ad-tb" style={{ ...tbBtn, fontStyle: "italic" }} onMouseDown={(e) => e.preventDefault()} onClick={() => exec("italic")}>i</button>
            <button type="button" className="ad-tb" style={{ ...tbBtn, textDecoration: "underline" }} onMouseDown={(e) => e.preventDefault()} onClick={() => exec("underline")}>U</button>
            <button type="button" className="ad-tb" style={{ fontSize: 13 }} onMouseDown={(e) => e.preventDefault()} onClick={() => exec("insertUnorderedList")}>• List</button>
            <button type="button" className="ad-tb" style={{ fontSize: 13 }} onMouseDown={(e) => e.preventDefault()} onClick={() => { const u = window.prompt("Link URL"); if (u) exec("createLink", u); }}>🔗</button>
            <label className="ad-tb" style={{ fontSize: 12 }}>
              🖼 Photo
              <input type="file" accept="image/*" onChange={onInlineImg} style={{ display: "none" }} />
            </label>
          </div>
          <div
            ref={editorRef}
            className="rich"
            contentEditable
            suppressContentEditableWarning
            data-empty
            data-ph="Write the story here. Use the toolbar to add headings, formatting, and inline photos."
            style={{ minHeight: 300, padding: 22, fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.7, color: "var(--ink)" }}
          />
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "flex-end" }}>
          <button type="button" disabled={saving} onClick={() => save(false)} style={{ padding: "12px 24px", fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase", border: "2px solid var(--line-strong)", background: "#fff", color: "var(--ink)", cursor: "pointer" }}>Save draft</button>
          <button type="button" disabled={saving} onClick={() => save(true)} style={{ padding: "12px 24px", fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase", border: "2px solid var(--brand)", background: "var(--brand)", color: "#fff", cursor: "pointer" }}>Publish</button>
        </div>
      </div>
      {toast}
    </div>
  );
}
