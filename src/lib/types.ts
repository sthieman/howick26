/** Database row shapes. Mirrors supabase/schema.sql. */

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string; // markdown
  cover_image: string | null;
  author_name: string; // display name the team member posts under
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Comment = {
  id: string;
  post_id: string;
  author_name: string; // public commenter's name
  body: string;
  created_at: string;
};

export type GalleryPhoto = {
  id: string;
  storage_path: string; // path within the `gallery` storage bucket
  caption: string | null;
  sort_order: number;
  created_at: string;
};

/** Aggregate like count for a post (from the `post_like_counts` view). */
export type PostLikeCount = {
  post_id: string;
  likes: number;
};
