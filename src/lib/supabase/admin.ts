import { createClient } from "./server";

export async function checkAdmin(): Promise<{ loggedIn: boolean; isAdmin: boolean }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { loggedIn: false, isAdmin: false };

  const { data: isAdmin } = await supabase.rpc("claim_admin");
  return { loggedIn: true, isAdmin: !!isAdmin };
}
