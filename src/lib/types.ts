/** Database row shapes. Mirrors supabase/schema.sql. */

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string; // rich HTML from the admin editor
  cover_image: string | null; // public Storage URL
  author_name: string; // team member selected as the author
  category: string;
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
  category: string;
  sort_order: number;
  created_at: string;
};

export type TeamMember = {
  id: string;
  name: string;
  bio: string;
  photo: string | null; // public Storage URL
  sort_order: number;
  created_at: string;
};

export type SiteSettings = {
  id: number;
  team_photo: string | null; // public Storage URL for the home hero
  updated_at: string;
};

/** Aggregate like count for a post (from the `post_like_counts` view). */
export type PostLikeCount = {
  post_id: string;
  likes: number;
};
