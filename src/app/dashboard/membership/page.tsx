import { getCurrentUser } from "@/lib/supabase/queries";
import MembershipClient from "./MembershipClient";

export default async function MembershipPage() {
  const current = await getCurrentUser();
  if (!current || current.accountType !== "athlete") return null;

  return <MembershipClient currentTier={current.profile.membership_tier} />;
}
