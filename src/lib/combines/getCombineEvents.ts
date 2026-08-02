import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/lib/supabase/types";

export type CombineEvent = Tables<"combine_event_public">;

export async function getUpcomingCombineEvents(): Promise<CombineEvent[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("combine_event_public")
    .select("*")
    .order("event_date", { ascending: true });
  return data ?? [];
}

export async function getCombineEventBySlug(slug: string): Promise<CombineEvent | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("combine_event_public").select("*").eq("slug", slug).single();
  return data ?? null;
}

export function formatEventDate(isoDate: string) {
  return new Date(isoDate).toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function spotsRemaining(event: CombineEvent): number | null {
  if (event.capacity == null) return null;
  return Math.max(0, event.capacity - (event.registered_count ?? 0));
}
