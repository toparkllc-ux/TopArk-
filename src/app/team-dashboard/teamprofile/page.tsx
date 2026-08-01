import { getCurrentUser } from "@/lib/supabase/queries";
import TeamProfileForm from "./TeamProfileForm";

export default async function TeamProfilePage() {
  const current = await getCurrentUser();
  if (!current || current.accountType !== "team") return null;

  return <TeamProfileForm profile={current.profile} userId={current.user.id} />;
}
