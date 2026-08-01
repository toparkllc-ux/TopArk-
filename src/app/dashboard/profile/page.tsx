import { getCurrentUser } from "@/lib/supabase/queries";
import ProfileForm from "./ProfileForm";

export default async function ProfilePage() {
  const current = await getCurrentUser();
  if (!current || current.accountType !== "athlete") return null;

  return <ProfileForm profile={current.profile} userId={current.user.id} />;
}
