"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export async function createPost(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim() || null;
  const authorName = String(formData.get("author_name") ?? "").trim() || "Howick 2026 Team";
  const coverImage = String(formData.get("cover_image") ?? "").trim() || null;
  const publish = formData.get("published") === "on";

  if (!title || !body) {
    throw new Error("Title and body are required.");
  }

  const slug = slugify(String(formData.get("slug") ?? "").trim() || title);

  const { error } = await supabase.from("posts").insert({
    title,
    slug,
    body,
    excerpt,
    author_name: authorName,
    cover_image: coverImage,
    published: publish,
    published_at: publish ? new Date().toISOString() : null,
  });

  if (error) {
    throw new Error(`Could not save post: ${error.message}`);
  }

  revalidatePath("/blog");
  revalidatePath("/admin");
  revalidatePath("/");
  redirect("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
