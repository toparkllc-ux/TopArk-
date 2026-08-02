import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/lib/supabase/types";

export type NewsPost = Tables<"news_posts">;

export async function getPublishedNewsPosts(limit?: number): Promise<NewsPost[]> {
  const supabase = await createClient();
  let query = supabase
    .from("news_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (limit) query = query.limit(limit);
  const { data } = await query;
  return data ?? [];
}

export async function getPublishedNewsPostBySlug(slug: string): Promise<NewsPost | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("news_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  return data ?? null;
}

export function formatNewsMeta(post: NewsPost) {
  const date = post.published_at ?? post.created_at;
  return new Date(date).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}
