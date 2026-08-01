import { createClient } from "./server";
import type { Tables } from "./types";

export type CurrentUser =
  | { accountType: "athlete"; user: { id: string; email: string }; profile: Tables<"athlete_profiles"> }
  | { accountType: "team"; user: { id: string; email: string }; profile: Tables<"team_profiles"> }
  | null;

export async function getCurrentUser(): Promise<CurrentUser> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profileRow } = await supabase
    .from("profiles")
    .select("account_type")
    .eq("id", user.id)
    .single();

  if (!profileRow) return null;

  if (profileRow.account_type === "athlete") {
    const { data } = await supabase
      .from("athlete_profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    if (!data) return null;
    return { accountType: "athlete", user: { id: user.id, email: user.email ?? "" }, profile: data };
  }

  const { data } = await supabase.from("team_profiles").select("*").eq("id", user.id).single();
  if (!data) return null;
  return { accountType: "team", user: { id: user.id, email: user.email ?? "" }, profile: data };
}
