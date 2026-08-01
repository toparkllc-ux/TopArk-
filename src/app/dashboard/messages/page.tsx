import { getCurrentUser } from "@/lib/supabase/queries";
import { getConversationSummaries } from "@/lib/messaging/getConversationSummaries";
import MessagingClient from "@/components/messaging/MessagingClient";

export default async function AthleteMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string }>;
}) {
  const current = await getCurrentUser();
  if (!current || current.accountType !== "athlete") return null;

  const { c } = await searchParams;
  const conversations = await getConversationSummaries(current.user.id, "athlete");

  const isPaid = current.profile.membership_tier !== "free";
  const isVerified = current.profile.verification_status === "verified";
  const canSend = isPaid && isVerified;
  const cantSendReason = !isPaid
    ? "Free members can't send messages — upgrade to Elite to message teams directly."
    : "You must be verified before messaging teams. Submit for verification in My Profile.";

  return (
    <MessagingClient
      initialConversations={conversations}
      myId={current.user.id}
      canSend={canSend}
      cantSendReason={cantSendReason}
      initialSelectedId={c}
    />
  );
}
